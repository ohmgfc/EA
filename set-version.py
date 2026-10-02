"""Stamp one version on every local script, stylesheet and scenario page reference (?v=...).

GitHub Pages lets browsers cache each file for 10 minutes. Without a shared version, a browser can mix an
old outer page with a new scenario page (or old scripts with new markup). Run this before each publish:
    python3 set-version.py            # uses today's date and time
    python3 set-version.py 2026-10-02a
"""
import re, sys, datetime, pathlib
root = pathlib.Path(__file__).parent
version = sys.argv[1] if len(sys.argv) > 1 else datetime.datetime.now().strftime('%Y%m%d%H%M')
pages = [root / 'index.html'] + sorted(root.glob('scenario-*/index.html'))
pattern = re.compile(r'((?:src|href|data-src)=")((?!https?:|data:|#|\.\./)[^"?]+\.(?:js|css|html))(?:\?v=[^"]*)?(")')
for page in pages:
    text = page.read_text(encoding='utf-8')
    stamped, count = pattern.subn(lambda m: f'{m.group(1)}{m.group(2)}?v={version}{m.group(3)}', text)
    page.write_text(stamped, encoding='utf-8')
    print(f'{page.relative_to(root)}: {count} references -> v={version}')
