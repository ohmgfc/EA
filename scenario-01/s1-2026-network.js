'use strict';
// 2026 actor network for Scenario 01, adapted from the "Scenario 1 - VCS in 2026" relationship diagram (East Asia.pdf).
// Same format as the 2070 network (s1-2070-network.js): nodes, arrowed links by type, and a brief panel per actor.
// Member cities follow S1_worldview.docx (Sendai, Wonju, Cebu) for continuity with 2070. Panel wording is a DRAFT
// based on the worldview's 2026–2035 section; edit it here.
(()=>{
const stage=window.SCENARIO_TIMELINE[2026];

stage.focus='cityA';            // selected when the 2026 network first appears
stage.eyebrow='ACTORS & RELATIONSHIPS / 2026';
stage.kinds=[['public','Public sector'],['industry','Industry'],['individual','Individual']];
stage.linkTypes=[['economic','Economic','Economic & Material'],['technology','Technology','Technology & Knowledge'],['governance','Governance','Governance & Urban Planning'],['social','Social','Social & Symbolic']];

stage.nodes={
 govA:{x:491,y:130,kind:'public',label:'Central Gov A',sub:'e.g. Japan'},
 providers:{x:240,y:325,w:168,h:62,kind:'industry',label:'Regional Service\nProviders',sub:'e.g. mobility, healthcare'},
 cityA:{x:491,y:281,kind:'public',label:'City in Country A',sub:'e.g. Sendai'},
 outskirt:{x:735,y:262,kind:'public',label:'Outskirt Towns',sub:'Neighbouring areas'},
 others:{x:735,y:330,kind:'public',label:'Other Cities',sub:'in Country A'},
 cityB:{x:324,y:487,kind:'public',label:'City in Country B',sub:'e.g. Wonju'},
 cityC:{x:674,y:487,kind:'public',label:'City in Country C',sub:'e.g. Cebu'},
 govB:{x:90,y:567,kind:'public',label:'Central Gov B',sub:'e.g. South Korea'},
 govC:{x:910,y:567,kind:'public',label:'Central Gov C',sub:'e.g. the Philippines'}
};

const disputes='Potential territorial disputes\nand alliance politics';
// Labels sit along their own line: at = position along the curve (0–1), off = gap from the line in diagram units;
// a positive off takes the side the line bends towards. The label box is kept clear of its line whatever the angle.
stage.links=[
 // Ends are pinned with pa / pb: [side, offset from the box centre], side t / r / b / l, positive offset = right or down.
 // Two types between the same actors get the same shift at both ends, so they run parallel 10 units apart;
 // at each actor, links of the same colour sit next to each other.
 // Between national governments: visas (governance, outer) and alliance politics (social, inner), as the diagram's outer arcs.
 {a:'govA',b:'govB',type:'governance',pa:['l',-6],pb:['t',-36],bend:240,both:true,label:'Visa',at:.5,off:7},
 {a:'govA',b:'govB',type:'social',pa:['l',6],pb:['t',-24],bend:240,both:true,label:disputes,at:.72,off:-5},
 {a:'govA',b:'govC',type:'governance',pa:['r',-6],pb:['t',36],bend:-240,both:true,label:'Visa',at:.5,off:-7},
 {a:'govA',b:'govC',type:'social',pa:['r',6],pb:['t',24],bend:-240,both:true,label:disputes,at:.72,off:5},
 {a:'govB',b:'govC',type:'governance',pa:['r',6],pb:['l',6],both:true,label:'Visa',at:.5,off:-6},
 {a:'govB',b:'govC',type:'social',pa:['r',16],pb:['l',16],both:true,label:disputes,at:.5,off:6},
 // Each government and its city: governance and taxation side by side; the red governance lines sit next to the red visa lines.
 {a:'govA',b:'cityA',type:'governance',pa:['b',-5],pb:['t',-5],both:true,label:'Governance',at:.5,off:6},
 {a:'govA',b:'cityA',type:'economic',pa:['b',5],pb:['t',5],both:true,label:'Taxation',at:.5,off:-6},
 {a:'govB',b:'cityB',type:'economic',pa:['r',-16],pb:['l',0],both:true,label:'Taxation',at:.5,off:-6},
 {a:'govB',b:'cityB',type:'governance',pa:['r',-6],pb:['l',10],both:true,label:'Governance',at:.5,off:6},
 {a:'govC',b:'cityC',type:'economic',pa:['l',-16],pb:['r',0],both:true,label:'Taxation',at:.5,off:6},
 {a:'govC',b:'cityC',type:'governance',pa:['l',-6],pb:['r',10],both:true,label:'Governance',at:.5,off:-6},
 // Service providers: the three economic links leave together around the box's right side and lower right corner; each carries its own label.
 // The box sits as far left as the outer Gov A–Gov B arcs allow.
 {a:'govA',b:'providers',type:'technology',pa:['b',-50],pb:['t',10],bend:30,both:true,label:'Negotiate / collaborate',at:.5,off:-6},
 {a:'providers',b:'cityA',type:'economic',pa:['r',-22],pb:['l',10],both:true,label:'Goods / talent\ntrade and service',at:.5,off:-4},
 {a:'providers',b:'cityB',type:'economic',pa:['b',30],pb:['t',-20],both:true,label:'Goods / talent\ntrade and service',at:.3,on:true},
 {a:'providers',b:'cityC',type:'economic',pa:['b',60],pb:['t',-40],bend:20,both:true,label:'Goods / talent\ntrade and service',at:.55,on:true},
 // Between cities.
 {a:'cityA',b:'cityB',type:'economic',pa:['b',-40],pb:['t',20],bend:-15,both:true,label:'Education, tourism,\ncultural exchange',at:.72,on:true},
 {a:'cityA',b:'outskirt',type:'economic',pa:['r',-6],pb:['l',13],both:true,label:'Resource compete',at:.5,off:-6},
 {a:'cityA',b:'others',type:'economic',pa:['r',8],pb:['l',-14],both:true,label:'Resource compete',at:.5,off:6}
];

// DRAFT panel wording (2026–2035 in S1_worldview.docx). Only heading and description show in the panel.
const p=(name,code,category,role,description)=>({name,code,category,role,description,tension:'',relations:[]});
stage.countries={
 govA:p('Central Gov A','NATIONAL','PUBLIC SECTOR','Japan, approaching its peak in deaths','Japan’s annual number of deaths is expected to peak around 2040. The national government holds governance over its cities and receives their taxation, while visas and alliance politics shape its relations with South Korea and the Philippines.'),
 govB:p('Central Gov B','NATIONAL','PUBLIC SECTOR','South Korea, ageing faster','South Korea is a generation behind Japan, but its population is ageing more rapidly. Arrangements for recruiting care workers from abroad are still in their infancy.'),
 govC:p('Central Gov C','NATIONAL','PUBLIC SECTOR','The Philippines','The national government holds governance over its cities and receives their taxation. Visas and alliance politics shape its relations with Japan and South Korea.'),
 cityA:p('City in Country A','CITY','PUBLIC SECTOR','Sendai: finding its own solutions','One of the starting points. To address the caring needs of ageing people, Sendai works with neighbouring local authorities, hospitals and operators to convert buildings near healthcare and transport hubs into care accommodation.'),
 cityB:p('City in Country B','CITY','PUBLIC SECTOR','Wonju: growing, but ageing fast','An inland city in Gangwon Province and a major centre for South Korea’s medical device industry. Its population is still growing, but the proportion of older residents is rising rapidly, and the city government begins looking for additional care options for retirees and other residents.'),
 cityC:p('City in Country C','CITY','PUBLIC SECTOR','Cebu, linked through trade and exchange','A city in the Philippines connected to the other cities through goods, talent, services and exchange. Cross-border care is not yet part of these ties.'),
 providers:p('Regional Service Providers','SERVICES','INDUSTRY','Mobility, healthcare, education and more','Service providers trade goods, talent and services with cities across the region and negotiate and collaborate with national government.'),
 outskirt:p('Outskirt Towns','NEIGHBOURING AREAS','PUBLIC SECTOR','Ageing alongside the city','Neighbouring areas are also ageing. Outskirt towns compete with the city for the same resources: beds, funding and care workers.'),
 others:p('Other Cities in Country A','OTHER CITIES','PUBLIC SECTOR','Similar pressures, different pace','Population ageing, labour shortages and vacant buildings emerge at different rates across cities. Other cities in the same country compete for resources rather than share them.')
};
})();
