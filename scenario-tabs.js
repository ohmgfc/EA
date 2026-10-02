// Shows one scenario frame at a time and keeps the choice in the URL hash (#scenario-01 / #scenario-02).
// The tabs live inside each scenario page; they post {scenarioTab:id} here to switch.
// Nothing loads until the password screen is passed; each frame loads the first time it is shown.
(()=>{const frames=[...document.querySelectorAll('iframe[id^="scenario-"]')];
function show(id,focus){const frame=frames.find(f=>f.id==='scenario-'+id)||frames[0];if(!frame.getAttribute('src'))frame.src=frame.dataset.src;frames.forEach(f=>f.hidden=f!==frame);document.title=frame.dataset.title;history.replaceState(null,'','#'+frame.id);if(focus){frame.focus();frame.contentWindow.postMessage({focusTab:true},'*')}}
const fromHash=()=>{const m=location.hash.match(/^#scenario-(\d+)$/);return m?m[1]:'01'};
function start(){addEventListener('message',e=>{if(frames.some(f=>f.contentWindow===e.source)&&e.data&&e.data.scenarioTab)show(e.data.scenarioTab,true)});addEventListener('hashchange',()=>show(fromHash()));show(fromHash())}
if(document.documentElement.classList.contains('unlocked'))start();else addEventListener('ea-unlock',start,{once:true})})();
