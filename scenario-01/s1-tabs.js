// Scenario tabs inside a scenario page (the same file sits in scenario-01/ and scenario-02/).
// Shown inside ../index.html, the outer page switches scenarios; opened on its own, another tab goes to ../index.html.
(()=>{const embedded=window.self!==window.top,tabs=[...document.querySelectorAll('.scenario-tabs [role=tab]')],own=tabs.find(t=>t.getAttribute('aria-selected')==='true');
// The current tab scrolls the page back to the top (Scenario 01 scrolls inside body).
function toTop(){const smooth=!matchMedia('(prefers-reduced-motion: reduce)').matches;[document.body,document.documentElement].forEach(el=>el.scrollTo({top:0,behavior:smooth?'smooth':'auto'}))}
function go(id){if(id===own.dataset.scenario){toTop();return}if(embedded)parent.postMessage({scenarioTab:id},'*');else location.href='../index.html#scenario-'+id}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>go(t.dataset.scenario));t.addEventListener('keydown',e=>{const n={ArrowLeft:i-1,ArrowRight:i+1,Home:0,End:tabs.length-1}[e.key];if(n===undefined)return;e.preventDefault();go(tabs[(n+tabs.length)%tabs.length].dataset.scenario)})});
addEventListener('message',e=>{if(e.source===parent&&e.data&&e.data.focusTab)own.focus()})})();
