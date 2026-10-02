'use strict';
(()=>{
 const {countries,nodes,places}=window.SCENARIO_DATA;
 const stages=window.SCENARIO_TIMELINE;let currentYear=2026;
 const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)],NS='http://www.w3.org/2000/svg';
 const svg=(tag,attrs={})=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));return e};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const baseBox=[0,90,1000,563],closeBox=[566,202.96,160,90.08];
 const world=q('#world-map'),graphic=q('#graphic'),cityArt=q('#city-art'),finalImage=q('#city-final'),ground=q('.scene-ground'),hotspots=q('#hotspots'),caption=q('#canvas-caption');
 let koreaReady=false,yearChanging=false,pendingYear=2026;
 const years=[2026,2050,2070],slider=q('#year-slider');
 let state='map',selected='korea',filter='all',currentPlace=0,transitionID=0,frameID=0,animations=[];
 const visited=new Set();
 const districts=window.CITY_CONTOURS.map(d=>({...d}));
 // SVG clip paths preserve exact image registration at every responsive size.
 districts.forEach(d=>{const el=document.createElement('div');el.className='district';el.dataset.district=d.id;const layer=svg('svg',{viewBox:'0 0 1672 941','aria-hidden':'true'});const defs=svg('defs'),clip=svg('clipPath',{id:'subject-'+d.id,clipPathUnits:'userSpaceOnUse'});clip.append(svg('path',{d:d.path,'clip-rule':'evenodd'}));defs.append(clip);const image=svg('image',{href:finalImage.getAttribute('src'),width:1672,height:941,'clip-path':'url(#subject-'+d.id+')'});layer.append(defs,image);el.append(layer);q('#districts').append(el);d.el=el});
 (window.GEOGRAPHY||[]).forEach(f=>{const el=svg('path',{d:f.d,class:'land'+(['korea','taiwan','japan'].includes(f.id)?' shield':''),'aria-hidden':'true'});if(f.id){el.dataset.country=f.id;el.addEventListener('click',()=>activateCountry(f.id))}q('#geography').append(el)});
 function drawLinks(){q('#connections').replaceChildren();stages[currentYear].links.forEach(([a,b,type,c])=>{const A=nodes[a],B=nodes[b];const shield=['korea','taiwan','japan'];const el=svg('path',{d:`M${A.x} ${A.y} Q${(A.x+B.x)/2+c*.15} ${(A.y+B.y)/2+c} ${B.x} ${B.y}`,class:`map-link ${type}`+(shield.includes(a)&&shield.includes(b)?' shield-link':'')});el.dataset.a=a;el.dataset.b=b;el.dataset.type=type;q('#connections').append(el)})}
 function mapCaption(){caption.innerHTML='<span class="legend-chip"></span>'+stages[currentYear].caption+'<span class="caption-right">'+currentYear+' / Select a country</span>'}
 function lockTimeline(locked){q('#timeline').classList.toggle('locked',locked);slider.disabled=locked;qa('[data-year]').forEach(b=>b.disabled=locked)}
 function renderYear(year){
  currentYear=year;koreaReady=false;graphic.dataset.year=String(year);
  q('#timeline-note').textContent=stages[year].note;q('#scale-label').textContent='01 / THE WORLD · '+year;
  qa('[data-year]').forEach(b=>{const active=Number(b.dataset.year)===year;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  world.setAttribute('aria-label',`Country relationships in ${year}. Select a country for information.`+(year===2070?' Select South Korea twice to see the scene within the shield.':''));
  q('#load-error').hidden=true;drawLinks();selectCountry(selected);mapCaption();
  q('#announcer').textContent=year+'. '+stages[year].title+'. '+stages[year].note+(year===2070?' Within the Shield is available through South Korea.':'');
 }

 function sliderPosition(value){slider.value=String(value);slider.style.setProperty('--progress',value/2*100+'%');const year=years[Math.round(value)];slider.setAttribute('aria-valuetext',year+' — '+stages[year].title)}
 async function selectYear(year){
  if(state!=='map'||!stages[year])return;
  pendingYear=year;
  if(yearChanging||year===currentYear)return;
  yearChanging=true;koreaReady=false;graphic.setAttribute('aria-busy','true');q('#country-panel').inert=true;enableMap(false);
  const surfaces=[q('#connections'),caption,q('#country-panel'),q('#timeline-note')];
  async function fade(from,to,duration){const batch=surfaces.map(el=>el.animate([{opacity:from},{opacity:to}],{duration:reduced.matches?60:duration,easing:'ease-in-out',fill:'forwards'}));await Promise.allSettled(batch.map(a=>a.finished));surfaces.forEach(el=>el.style.opacity=String(to));batch.forEach(a=>a.cancel())}
  try{
   while(pendingYear!==currentYear){
    await fade(1,0,220);
    renderYear(pendingYear);
    await fade(0,1,340);
   }
  }finally{
   surfaces.forEach(el=>el.style.opacity='1');yearChanging=false;graphic.setAttribute('aria-busy','false');q('#country-panel').inert=false;enableMap(true);
  }
 }
 slider.addEventListener('input',()=>{if(state!=='map')return;sliderPosition(Number(slider.value));selectYear(years[Math.round(Number(slider.value))])});
 slider.addEventListener('change',()=>{if(state!=='map')return;const index=Math.round(Number(slider.value));sliderPosition(index);selectYear(years[index])});
 slider.addEventListener('keydown',e=>{if(state!=='map')return;const offsets={ArrowLeft:-1,ArrowDown:-1,ArrowRight:1,ArrowUp:1};if(!(e.key in offsets)&&e.key!=='Home'&&e.key!=='End')return;e.preventDefault();const index=e.key==='Home'?0:e.key==='End'?2:Math.max(0,Math.min(2,Math.round(Number(slider.value))+offsets[e.key]));sliderPosition(index);selectYear(years[index])});
 qa('[data-year]').forEach((b,i)=>{b.addEventListener('click',()=>{if(state!=='map')return;sliderPosition(i);selectYear(years[i])});b.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(e.key)||state!=='map')return;e.preventDefault();const buttons=qa('[data-year]');const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;buttons[next].focus();sliderPosition(next);selectYear(years[next])})});
 Object.entries(nodes).forEach(([id,n])=>{const g=svg('g',{class:'node'+(n.external?' external':''),role:'button',tabindex:0,'aria-label':id==='korea'?'South Korea: view country information':`Explore ${countries[id].name}`,'aria-pressed':'false'});g.dataset.country=id;if(id==='korea')g.append(svg('rect',{x:615,y:190,width:190,height:88,rx:8,class:'country-hit'}));
  if(n.external){g.append(svg('rect',{x:n.x-66,y:n.y-18,width:138,height:36,rx:3}));const t=svg('text',{x:n.x+3,y:n.y+5,'text-anchor':'middle',class:'node-label'});t.textContent=n.label;g.append(t)}
  else{g.append(svg('circle',{cx:n.x,cy:n.y,r:27,class:'hit'}),svg('circle',{cx:n.x,cy:n.y,r:20,class:'halo'}));if(id==='korea')g.append(svg('circle',{cx:n.x,cy:n.y,r:16,class:'korea-ring'}));g.append(svg('circle',{cx:n.x,cy:n.y,r:id==='korea'?8:6,class:'dot'}));const t=svg('text',{x:n.lx,y:n.ly,class:'node-label'});t.textContent=n.label;g.append(t);if(n.sub){const t2=svg('text',{x:n.lx,y:n.ly+17,class:'node-sub'});t2.textContent=n.sub;g.append(t2)}}
  g.addEventListener('click',()=>activateCountry(id));g.addEventListener('keydown',e=>{if(e.repeat)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();activateCountry(id)}});q('#countries').append(g)
 });
 function updateKoreaHint(){
  const available=currentYear===2070,ready=available&&selected==='korea'&&koreaReady;
  const node=q('.node[data-country="korea"]');
  node.setAttribute('aria-label',ready?'South Korea: activate again to see the scene within the shield':'South Korea: view country information');
  if(state==='map'||state==='exiting'){
   q('#instruction').classList.toggle('click-prompt',available);q('#instruction').innerHTML=available?(ready?'Click <strong>South Korea</strong> again to see the scene within the shield.':'Click <strong>South Korea</strong> to view its information.'):'Explore country relationships.';
   q('.korea-tip').innerHTML=!available?'Explore this year’s country information.':ready?'Read South Korea’s information here. Click <strong>South Korea</strong> again when you’re ready to see the scene within the shield.':'Select <strong>South Korea</strong> to read its country information. Click it again to see the scene within the shield.';
  }
 }
 function activateCountry(id){
  if(state!=='map'||yearChanging)return;
  if(currentYear===2070&&id==='korea'&&selected==='korea'&&koreaReady){enterCity();return}
  selectCountry(id);koreaReady=currentYear===2070&&id==='korea';updateKoreaHint();
  if(koreaReady)q('#announcer').textContent='South Korea information is displayed. Activate South Korea again to see the scene within the shield.';
 }
 function selectCountry(id){if(!countries[id])return;koreaReady=false;selected=id;const c=stages[currentYear].countries[id];['name','code','category','role','description','tension'].forEach(key=>q('#country-'+key).textContent=c[key]);q('#relationships').replaceChildren();c.relations.forEach(([target,name,description])=>{const b=document.createElement('button');b.className='relationship';const strong=document.createElement('b');strong.textContent=name;const text=document.createElement('span');text.textContent=description;b.append(strong,text);b.dataset.targetCountry=target;b.addEventListener('click',()=>activateCountry(target));q('#relationships').append(b)});qa('[data-country]').forEach(el=>{const active=el.dataset.country===id;el.classList.toggle('selected',active);if(el.getAttribute('role')==='button')el.setAttribute('aria-pressed',String(active))});updateLinks();updateKoreaHint()}
 function updateLinks(){qa('.map-link').forEach(el=>{el.classList.toggle('focused',el.dataset.a===selected||el.dataset.b===selected);el.classList.toggle('filtered',filter!=='all'&&el.dataset.type!==filter)})}
 qa('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;qa('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});updateLinks()}));
 function enableMap(enabled){world.style.pointerEvents=enabled?'auto':'none';world.setAttribute('aria-hidden',String(!enabled));qa('.node').forEach(n=>n.setAttribute('tabindex',enabled?'0':'-1'))}
 function enableCity(enabled){hotspots.inert=!enabled;hotspots.setAttribute('aria-hidden',String(!enabled));hotspots.classList.toggle('ready',enabled);cityArt.setAttribute('aria-hidden',String(!enabled))}
 function cancelAnimations(){transitionID++;cancelAnimationFrame(frameID);animations.forEach(a=>a.cancel());animations=[];return transitionID}
 function play(el,frames,options){const a=el.animate(frames,{fill:'both',...options});animations.push(a);return a.finished.catch(()=>{})}
 function tweenBox(from,to,duration,id){return new Promise(resolve=>{const start=performance.now();function step(now){if(id!==transitionID){resolve();return}const t=Math.min(1,(now-start)/duration),e=1-Math.pow(1-t,3);world.setAttribute('viewBox',from.map((n,i)=>(n+(to[i]-n)*e).toFixed(3)).join(' '));if(t<1)frameID=requestAnimationFrame(step);else resolve()}frameID=requestAnimationFrame(step)})}
 function setHeader(city){q('#scale-label').textContent=city?'02 / SOUTH KOREA · 2070':'01 / THE WORLD · '+currentYear;q('#page-title').textContent=city?'Within the Shield.':'The Silicon Shield.';q('#instruction').classList.remove('click-prompt');q('#instruction').innerHTML=city?'Select a place to explore everyday life.':'Click <strong>South Korea</strong> to view its information.';q('#country-panel').hidden=city;q('#city-panel').hidden=!city;q('#filters').hidden=city;q('#footer-note').textContent=city?'Six places. One possible future.':'Thematic relationships, not physical routes.';q('.info-panel').scrollTop=0;if(!city)updateKoreaHint()}
 function imageReady(){if(finalImage.complete)return Promise.resolve(finalImage.naturalWidth>0);return new Promise(resolve=>{finalImage.addEventListener('load',()=>resolve(true),{once:true});finalImage.addEventListener('error',()=>resolve(false),{once:true})})}
 async function enterCity(){if(state!=='map'||yearChanging||currentYear!==2070)return;state='loading';lockTimeline(true);graphic.dataset.view='loading';q('#instruction').classList.remove('click-prompt');q('#instruction').textContent='';q('#return-map').hidden=false;q('#announcer').textContent='Opening Within the Shield.';graphic.setAttribute('aria-busy','true');const loaded=await imageReady();if(state!=='loading')return;if(!loaded){state='map';lockTimeline(false);graphic.dataset.view='map';setHeader(false);q('#return-map').hidden=true;graphic.setAttribute('aria-busy','false');q('#load-error').hidden=false;return}
  const id=cancelAnimations(),short=reduced.matches;state='entering';graphic.dataset.view='entering';enableMap(false);enableCity(false);q('#return-map').hidden=false;q('#return-map').focus({preventScroll:true});cityArt.style.visibility='visible';finalImage.style.opacity='0';q('#load-error').hidden=true;
  const work=[play(world,[{opacity:1},{opacity:1,offset:.35},{opacity:0}],{duration:short?170:1050,easing:'ease-in-out'}),tweenBox(baseBox,closeBox,short?1:1050,id),play(ground,[{opacity:0},{opacity:1}],{duration:short?160:800,delay:short?0:380}),play(caption,[{opacity:1},{opacity:0}],{duration:short?70:280}),play(q('#filters'),[{opacity:1},{opacity:0}],{duration:short?70:280})];
  districts.forEach(d=>work.push(play(d.el,[{opacity:0,transform:short?'none':`translate(${d.x}%,${d.y}%)`},{opacity:1,transform:'translate(0%,0%) scale(1)'}],{duration:short?180:850,delay:short?0:360,easing:'cubic-bezier(.16,1,.3,1)'})));
  work.push(play(finalImage,[{opacity:0},{opacity:1}],{duration:short?160:320,delay:short?0:900,easing:'ease-in-out'}));
  await Promise.allSettled(work);if(id!==transitionID)return;animations.forEach(a=>a.cancel());animations=[];ground.style.opacity='1';world.style.opacity='0';caption.style.opacity='0';finalImage.style.opacity='1';districts.forEach(d=>d.el.style.opacity='0');state='city';graphic.dataset.view='city';setHeader(true);caption.innerHTML='<span class="legend-chip"></span>WITHIN THE SHIELD / 2070<span class="caption-right">Explore the six places</span>';enableCity(true);graphic.setAttribute('aria-busy','false');play(caption,[{opacity:0},{opacity:1}],{duration:short?1:250});await play(hotspots,[{opacity:0},{opacity:1}],{duration:short?1:340});if(id===transitionID)q('#announcer').textContent='Within the Shield is open. Six places are available to explore.';
 }
 async function returnMap(country=selected){if(state==='map')return;const previous=state;const id=cancelAnimations(),short=reduced.matches;state='exiting';lockTimeline(true);graphic.dataset.view='exiting';graphic.setAttribute('aria-busy','true');enableCity(false);enableMap(false);q('#load-error').hidden=true;selectCountry(country);setHeader(false);hotspots.style.opacity='0';caption.style.opacity='0';ground.style.opacity='1';finalImage.style.opacity='1';world.setAttribute('viewBox',closeBox.join(' '));
  const work=[play(world,[{opacity:0},{opacity:1}],{duration:short?140:750,delay:short?0:180}),tweenBox(closeBox,baseBox,short?1:980,id),play(ground,[{opacity:1},{opacity:0}],{duration:short?120:600,delay:short?0:200}),play(finalImage,[{opacity:1},{opacity:0}],{duration:short?100:250}),play(q('#filters'),[{opacity:0},{opacity:1}],{duration:short?100:400,delay:short?0:600})];
  if(previous==='city'&&!short)districts.forEach((d,i)=>work.push(play(d.el,[{opacity:1,transform:'translate(0%,0%)'},{opacity:0,transform:`translate(${d.x*.45}%,${d.y*.45}%)`}],{duration:540,delay:i*28,easing:'ease-in'})));
  await Promise.allSettled(work);if(id!==transitionID)return;cancelAnimations();state='map';lockTimeline(false);graphic.dataset.view='map';world.style.opacity='1';world.setAttribute('viewBox',baseBox.join(' '));ground.style.opacity='0';cityArt.style.visibility='hidden';finalImage.style.opacity='0';districts.forEach(d=>d.el.style.opacity='0');hotspots.style.opacity='0';caption.style.opacity='1';mapCaption();q('#return-map').hidden=true;enableMap(true);graphic.setAttribute('aria-busy','false');q(`.node[data-country="${country}"]`).focus({preventScroll:true});q('#announcer').textContent='World map restored. Select South Korea to read its information, then activate it again to see the scene within the shield.';
 }
 q('#return-map').addEventListener('click',()=>returnMap());q('#retry-image').addEventListener('click',()=>{q('#load-error').hidden=true;const src='assets/samsung-city-2070-v3.webp';finalImage.src=src;districts.forEach(d=>d.el.querySelector('image').setAttribute('href',src));enterCity()});
 places.forEach((p,i)=>{const b=document.createElement('button');b.className='pin'+(p.x>=75?' left':'');b.style.left=p.x+'%';b.style.top=p.y+'%';b.dataset.place=p.id;b.setAttribute('aria-label',`Explore ${p.label}`);b.setAttribute('aria-haspopup','dialog');b.innerHTML='<span class="pin-circle">+</span><span class="pin-label"></span>';b.querySelector('.pin-label').textContent=p.label;b.addEventListener('click',()=>openPlace(i));hotspots.append(b);const list=document.createElement('button');list.dataset.place=p.id;list.setAttribute('aria-haspopup','dialog');const num=document.createElement('span');num.textContent=String(i+1).padStart(2,'0');list.append(num,document.createTextNode(p.label));list.addEventListener('click',()=>openPlace(i));q('#place-list').append(list)});
 const placeDialog=q('#place-dialog');
 function openPlace(i){if(state!=='city')return;currentPlace=i;const p=places[i];visited.add(p.id);q('#place-category').textContent=p.category;q('#place-location').textContent=p.location;q('#place-title').textContent=p.title;q('#place-moment').textContent=p.moment;q('#place-explanation').textContent=p.explanation;q('#place-progress').textContent=String(i+1).padStart(2,'0')+' / 06';q('#next-place').textContent=i===5?'First place':'Next place';q('#explored').textContent=visited.size+' / 6 explored';qa('[data-place]').forEach(el=>{const v=visited.has(el.dataset.place);el.classList.toggle('visited',v)});if(!placeDialog.open)placeDialog.showModal();placeDialog.scrollTop=0;placeDialog.querySelector('.close-dialog').focus({preventScroll:true})}
 q('#next-place').addEventListener('click',()=>openPlace((currentPlace+1)%places.length));q('#trace').addEventListener('click',()=>fadeClose(placeDialog,()=>returnMap(places[currentPlace].country)));
 // Dialogs fade in through CSS and fade out here before they actually close; the timer closes them even if
 // the browser skips the animation (for example in a background tab).
 function fadeClose(d,then){if(!d.open||d.classList.contains('closing'))return;let finished=false;const done=()=>{if(finished)return;finished=true;d.classList.remove('closing');d.close();if(then)then()};if(reduced.matches){done();return}d.classList.add('closing');d.addEventListener('animationend',e=>{if(e.target===d)done()},{once:true});setTimeout(done,300)}
 qa('dialog').forEach(d=>{d.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();fadeClose(d)}});d.addEventListener('cancel',e=>{e.preventDefault();fadeClose(d)});d.addEventListener('close',()=>d.classList.remove('closing'));d.querySelector('.close-dialog').addEventListener('click',()=>fadeClose(d));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)fadeClose(d)}})});q('#about-button').addEventListener('click',()=>q('#about-dialog').showModal());document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!qa('dialog').some(d=>d.open)&&state!=='map')returnMap()});
 // The canvas fills the area inside an even margin; the map or diagram is centred in it, and the city illustration
 // (with its cut-outs and pins) keeps its 1672 × 941 proportions in a centred box given by --img-*.
 // On wider screens the relationship filters sit inside the canvas, so the map's base view gains room underneath
 // them (in map units, which depend on the canvas size) and nothing in the map or diagram sits behind the buttons.
 function reserveFilterRoom(w,h){const f=q('#filters');if(!f||!matchMedia('(min-width:681px)').matches){baseBox[3]=563;return}const px=f.offsetHeight+20,first=px*563/Math.max(1,h-px),scale=Math.min(w/1000,h/(563+first));baseBox[3]=563+px/scale;if(state==='map'&&!yearChanging)world.setAttribute('viewBox',baseBox.join(' '))}
 function fitGraphic(){const area=q('.visual-area'),cs=getComputedStyle(area),w=Math.max(1,area.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)),h=Math.max(1,area.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)),iw=Math.min(w,h*1672/941),ih=iw*941/1672;graphic.style.width=w+'px';graphic.style.height=h+'px';graphic.style.setProperty('--img-w',iw+'px');graphic.style.setProperty('--img-h',ih+'px');graphic.style.setProperty('--img-x',(w-iw)/2+'px');graphic.style.setProperty('--img-y',(h-ih)/2+'px');reserveFilterRoom(w,h)}new ResizeObserver(fitGraphic).observe(q('.visual-area'));fitGraphic();renderYear(2026);sliderPosition(0);enableCity(false);
})();
