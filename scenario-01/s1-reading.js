'use strict';
// Tabs for the reading section under the map: Worldview, Timeline and Personal story, plus the peek band that opens them.
document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('.reading-tabs [role=tab]')];
 if(!tabs.length)return;
 function show(tab,focus){tabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on});if(focus)tab.focus()}
 // The peek band under the map opens a tab and scrolls down to the reading section.
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('.reading-peek [data-read]').forEach(b=>b.addEventListener('click',()=>{show(document.getElementById(b.dataset.read));document.getElementById('reading').scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'})}));
 tabs.forEach((t,i)=>{
  t.addEventListener('click',()=>show(t));
  t.addEventListener('keydown',e=>{const keys={ArrowLeft:i-1,ArrowRight:i+1,Home:0,End:tabs.length-1};if(!(e.key in keys))return;e.preventDefault();show(tabs[(keys[e.key]+tabs.length)%tabs.length],true)});
 });
});
