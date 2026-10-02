// Shows one scenario frame at a time and keeps the choice in the URL hash (#scenario-01 / #scenario-02).
// The tabs live inside each scenario page; they post {scenarioTab:id} here to switch.
(()=>{const frames=[...document.querySelectorAll('iframe[id^="scenario-"]')];
function show(id,focus){const frame=frames.find(f=>f.id==='scenario-'+id)||frames[frames.length-1];frames.forEach(f=>f.hidden=f!==frame);document.title=frame.dataset.title;history.replaceState(null,'','#'+frame.id);if(focus){frame.focus();frame.contentWindow.postMessage({focusTab:true},'*')}}
addEventListener('message',e=>{if(frames.some(f=>f.contentWindow===e.source)&&e.data&&e.data.scenarioTab)show(e.data.scenarioTab,true)});
const fromHash=()=>{const m=location.hash.match(/^#scenario-(\d+)$/);return m?m[1]:'01'};addEventListener('hashchange',()=>show(fromHash()));show(fromHash())})();
