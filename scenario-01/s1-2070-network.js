'use strict';
// 2070 actor network for Scenario 01, adapted from the "Scenario 1 - VCS in 2070" relationship diagram (East Asia.pdf).
// Nodes, link labels and directions follow the diagram. The panel wording (role, description, tension, relation notes)
// is a DRAFT written from the diagram and S1_worldview.docx (Sendai, Wonju and Cebu as the member cities); edit it here. 2026 and 2050 keep the city-role network in s1-data.js.
//
// Node kinds follow the diagram legend: public (Public Sector), industry, individual, institution (Social Institution), hub.
// Link types follow the diagram's line legend: economic (Economic & Material), technology (Technology & Knowledge),
// governance (Governance & Urban Planning), social (Social & Symbolic). Each link runs from a to b (arrow at b);
// both:true draws arrows at both ends. bend curves the line (in diagram units).
(()=>{
const stage=window.SCENARIO_TIMELINE[2070];
// 2050's network is still being written: the canvas shows this note instead of the diagram.
window.SCENARIO_TIMELINE[2050].placeholder='Under development';
Object.assign(window.SCENARIO_TIMELINE[2050],{title:'Under development',note:'Under development'});
// The side panel shows the same note for every 2050 city role.
Object.values(window.SCENARIO_TIMELINE[2050].countries).forEach(c=>Object.assign(c,{name:'Under development',code:'',category:'',role:'',description:'',tension:'',relations:[]}));

stage.entry='cityA';            // selecting this node twice opens the care building
stage.focus='compacts';         // selected when the 2070 network first appears
stage.eyebrow='ACTORS & RELATIONSHIPS / 2070';
stage.kinds=[['public','Public sector'],['industry','Industry'],['individual','Individual']];
// [type, short button label, full name from the diagram legend]
stage.linkTypes=[['economic','Economic','Economic & Material'],['technology','Technology','Technology & Knowledge'],['governance','Governance','Governance & Urban Planning'],['social','Social','Social & Symbolic']];
stage.ring={cx:434,cy:427,rx:172,ry:172,node:'compacts',members:['cityA','cityB','cityC']};   // the compact boundary; selecting node lights it and the links among members

stage.nodes={
 compacts:{x:434,y:262,w:170,h:40,kind:'hub',label:'City Compacts'},
 govA:{x:434,y:128,kind:'public',label:'Central Gov A',sub:'e.g. Japan'},
 capital:{x:165,y:182,kind:'public',label:'Capital cities',sub:'e.g. Tokyo'},
 providers:{x:112,y:290,w:168,h:62,kind:'industry',label:'Regional Commercial\nProviders',sub:'e.g. mobility, healthcare'},
 ageing:{x:105,y:400,kind:'individual',label:'Ageing society',sub:'Older residents'},
 govB:{x:95,y:548,kind:'public',label:'Central Gov B',sub:'e.g. South Korea'},
 cityA:{x:434,y:338,kind:'public',label:'City in Country A',sub:'e.g. Sendai'},
 cityB:{x:300,y:482,kind:'public',label:'City in Country B',sub:'e.g. Wonju'},
 cityC:{x:568,y:482,kind:'public',label:'City in Country C',sub:'e.g. Cebu'},
 govC:{x:790,y:560,kind:'public',label:'Central Gov C',sub:'e.g. the Philippines'},
 noncompact:{x:800,y:196,kind:'public',label:'Non-compact Cities',sub:'Outside the compact'},
 migrants:{x:905,y:272,kind:'individual',label:'Migrant Workers',sub:'Talent inflow'},
 outskirt:{x:800,y:348,kind:'public',label:'Outskirt Towns',sub:'At the urban edge'},
 climate:{x:905,y:430,kind:'individual',label:'Climate Immigrant',sub:'Talent inflow'}
};

stage.links=[
 // Each government–city pair: national powers down to the city, taxation back. Labels sit just beside their own line
 // (anchor: 'start' or 'end' sets which side of lx the text runs).
 {a:'govA',b:'cityA',type:'governance',bend:-14,label:'National powers',lx:448,ly:200,anchor:'start'},
 {a:'cityA',b:'govA',type:'economic',bend:-14,label:'Taxation',lx:420,ly:200,anchor:'end'},
 {a:'govB',b:'cityB',type:'governance',bend:12,label:'National powers',lx:226,ly:536,anchor:'start'},
 {a:'cityB',b:'govB',type:'economic',bend:12,label:'Taxation',lx:184,ly:494},
 {a:'govC',b:'cityC',type:'governance',bend:-12,label:'National powers',lx:690,ly:556,anchor:'end'},
 {a:'cityC',b:'govC',type:'economic',bend:-12,label:'Taxation',lx:692,ly:500},
 {a:'govA',b:'noncompact',type:'economic',bend:-60,label:'Subsidy'},
 {a:'govA',b:'outskirt',type:'economic',bend:-120,label:'Subsidy'},
 {a:'compacts',b:'capital',type:'economic',bend:25,label:'Partial membership'},
 {a:'compacts',b:'providers',type:'technology',bend:18,label:'Negotiate / collaborate'},
 {a:'compacts',b:'ageing',type:'economic',bend:-30,label:'Care responsibility'},
 {a:'compacts',b:'noncompact',type:'economic',bend:-22,label:'Limited resources'},
 {a:'noncompact',b:'compacts',type:'economic',bend:-12,label:'Talent inflow'},
 {a:'migrants',b:'compacts',type:'economic',bend:10,label:'Talent inflow'},
 {a:'climate',b:'compacts',type:'economic',bend:22,label:'Talent inflow'},
 // The member-city exchanges carry one shared label each, as in the diagram: economic inside the triangle, governance
 // below it. They show when any member city (or the compact) is selected. \n breaks a label into lines.
 {a:'cityA',b:'cityB',type:'economic',bend:18,both:true},
 {a:'cityA',b:'cityB',type:'governance',bend:44,both:true},
 {a:'cityA',b:'cityC',type:'economic',bend:-18,both:true},
 {a:'cityA',b:'cityC',type:'governance',bend:-44,both:true},
 {a:'cityB',b:'cityC',type:'economic',bend:18,both:true,label:'Talent Training, Recruitment,\nTechnology Support, Infrastructure\nInvestment and Standards',lx:434,ly:416,group:'cityA cityB cityC compacts'},
 {a:'cityB',b:'cityC',type:'governance',bend:46,both:true,label:'Joint Working Passport, Shared\nEnvironmental Standards, Shared Goods\nTrade and Mobility Standards, Pension Policy',lx:434,ly:530,group:'cityA cityB cityC compacts'}
];

// DRAFT panel wording, following S1_worldview.docx. Relation buttons jump to the related node.
const national='keeps authority over immigration, defence and security, and receives taxation';
const cityA={name:'City in Country A',code:'CARE CITY',category:'PUBLIC SECTOR',
 role:'Sendai: care at the heart of the compact',
 description:'Sendai was one of the starting points. It converted buildings near healthcare and transport hubs into care accommodation, and later filled care facilities left vacant after Japan’s peak in deaths. With cooler summers and milder winters, it offers older residents from other cities beds, care services and a safer climate. The care building in this scenario is here.',
 tension:'The care is shared, but the places are limited: the dispute is who can move in next.',
 relations:[['govA','National powers and taxation',`Japan’s government ${national} from the city.`],
  ['cityB','Care places for energy and equipment','Wonju and Gangwon send hydrogen, ammonia, care robots and medical equipment; Sendai provides long-term care places.'],
  ['cityC','Care training and local care funding','Cebu’s training institutions design care and language courses with Sendai, which helps fund local care provision in Cebu.'],
  ['ageing','Older residents','Older people referred from member cities live and receive care here.']]};
const cityB={name:'City in Country B',code:'ENERGY & EQUIPMENT',category:'PUBLIC SECTOR',
 role:'Wonju: equipment and energy for care places',
 description:'Wonju, an inland city in Gangwon Province and a centre of South Korea’s medical device industry, first referred older residents to Sendai when local beds, funding and care workers ran short. As heatwaves and winter cold made staying risky for older people, it became a founding member. Its automated factories supply care robots and medical equipment, while hydrogen and ammonia from Gangwon’s east coast are shipped through the Port of Donghae.',
 tension:'Long-term access to care depends on continuing to deliver energy and equipment.',
 relations:[['govB','National powers and taxation',`South Korea’s government ${national} from the city.`],
  ['cityA','Energy and equipment for care places','Exchanged for long-term access to care in Sendai.'],
  ['cityC','Shared standards and talent','Member cities share the passport, standards and pension policy.']]};
const cityC={name:'City in Country C',code:'CARE TRAINING',category:'PUBLIC SECTOR',
 role:'Cebu: training the care workforce',
 description:'Training institutions in Cebu, in the Philippines, began working with Japanese local authorities to recruit care workers, then became a founding member of the compact. They design care and language courses with Sendai, and Sendai helps fund local care provision in Cebu in return.',
 tension:'Care workers can carry their qualifications between cities, but leaving a contract can unsettle work, home and schooling at once.',
 relations:[['govC','National powers and taxation',`The Philippine government ${national} from the city.`],
  ['cityA','Courses and recruitment for care funding','Care workers trained in Cebu work in Sendai; Sendai funds local care in Cebu.'],
  ['migrants','Care workers','Graduates join the compact’s care workforce.']]};
const gov=(country,name,city,cityName)=>({
 name:`Central Gov ${country}`,code:'NATIONAL',category:'PUBLIC SECTOR',
 role:'Sets the national limits of the compact',
 description:`The government of ${name} retains authority over immigration, defence and security, and receives taxation from ${cityName}. Within pre-authorised regulatory sandboxes, city arrangements that meet financial, medical and labour standards can operate without approval for every decision, and foreign nationals with compact contracts find it easier to obtain visas.`,
 tension:'Cities coordinate care across borders, but national law still decides who can enter.',
 relations:[[city,cityName,'National powers flow to the city; taxation flows back.']]
});
const govA=gov('A','Japan','cityA','Sendai');
govA.description+=' It also tries to narrow the gaps for cities outside the compact through subsidies and basic guarantees.';
govA.relations.push(['noncompact','Subsidy','Subsidies and basic guarantees for cities left outside.'],['outskirt','Subsidy','Support for towns at the edge of compact cities.']);

stage.countries={
 compacts:{name:'City Compacts',code:'SILVER CITY COMPACT',category:'CITY ALLIANCE',
  role:'Cities exchange care capacity across borders',
  description:'Sendai, Wonju and Cebu formed the first Silver City Compact, with a permanent fund, joint decision-making and continuing obligations. Care workers carry their qualifications and years of service between member cities, and housing and school transfers are arranged. Insurers and investors give compact cities more favourable credit assessments.',
  tension:'Everyday life is now embedded in the compact: ending a single agreement can affect a family’s employment, home and care at once.',
  relations:[['cityA','Member cities','Sendai, Wonju and Cebu stand for the member cities.'],['capital','Partial membership','Finance and trade capitals take part on limited terms.'],['providers','Negotiate and collaborate','Care operators and service providers work with the compact.'],['ageing','Care responsibility','The compact carries responsibility for older residents.'],['noncompact','Limited resources','Cities that did not join receive fewer shared resources.'],['migrants','Talent inflow','Care workers and other newcomers move into compact cities.']]},
 govA,govB:gov('B','South Korea','cityB','Wonju'),govC:gov('C','the Philippines','cityC','Cebu'),
 cityA,cityB,cityC,
 capital:{name:'Capital cities',code:'PARTIAL MEMBER',category:'PUBLIC SECTOR',
  role:'Finance and trade, inside on limited terms',
  description:'A few cities, such as Tokyo, still attract working populations through finance and trade. They hold partial membership, connecting with the compact without taking on all of its shared obligations.',
  tension:'Partial membership brings access without the full set of shared obligations.',
  relations:[['compacts','Partial membership','Capital cities join the compact on limited terms.']]},
 providers:{name:'Regional Commercial Providers',code:'SERVICES',category:'INDUSTRY',
  role:'Services negotiated with the compact',
  description:'Operators of the “silver agencies”, mobility, healthcare and education services negotiate and collaborate with the compact. Their services range from independent living and rehabilitation to dementia care and round-the-clock medical assistance, with robots handling deliveries, cleaning and routine checks.',
  tension:'Commercial providers shape access to services that the compact does not run itself.',
  relations:[['compacts','Negotiate and collaborate','Service agreements are negotiated with the compact.']]},
 ageing:{name:'Ageing society',code:'CARE NEED',category:'INDIVIDUAL',
  role:'The people the compact is built around',
  description:'Population ageing and a changing climate placed pressures on national governments that they could not manage alone. Older residents, including those for whom heat and cold made staying at home a risk, are referred to care cities, where care resources and diagnostic equipment are concentrated in one place.',
  tension:'Existing care continues, but differences in contributions and needs decide who can move in next.',
  relations:[['compacts','Care responsibility','The compact is responsible for their care.'],['cityA','Care in Sendai','Older residents move to the care city.']]},
 noncompact:{name:'Non-compact Cities',code:'OUTSIDE',category:'PUBLIC SECTOR',
  role:'Excluded, or building their own compacts',
  description:'Some cities succeed in joining; some create their own compacts; some are excluded. Cities outside receive limited resources from the compact and subsidies and basic guarantees from their national government, while talent moves from them into compact cities.',
  tension:'National governments must negotiate the allocation of resources with existing members.',
  relations:[['compacts','Limited resources and talent outflow','Resources arrive in limited amounts while talent moves into the compact.'],['govA','Subsidy','Subsidies and basic guarantees.']]},
 outskirt:{name:'Outskirt Towns',code:'SUBURBS & RURAL',category:'PUBLIC SECTOR',
  role:'Where office workers now live',
  description:'Urban housing offers poor value for money, and remote medical consultations and digital work are well developed, so most office workers live in suburbs and rural communities with more space and lower costs. These towns receive national subsidies.',
  tension:'Subsidies may not keep pace with the loss of working-age residents.',
  relations:[['govA','Subsidy','National support for outskirt towns.']]},
 migrants:{name:'Migrant Workers',code:'CARE WORKFORCE',category:'INDIVIDUAL',
  role:'Hands-on care from other cities',
  description:'Care workers still provide personal care, rehabilitation, help with eating and companionship, and keep in touch with families. Most come from other cities under compact agreements, which safeguard their residency status and recognise their years of service.',
  tension:'Their security depends on the compact: leaving a contract can unsettle work, home and a child’s schooling together.',
  relations:[['compacts','Talent inflow','Care workers move into compact cities.'],['cityC','Training in Cebu','Many are trained through Cebu’s care and language courses.']]},
 climate:{name:'Climate Immigrant',code:'CLIMATE PRESSURE',category:'INDIVIDUAL',
  role:'Moving as heat and cold make cities harder to live in',
  description:'Extreme weather has become more frequent, with longer heatwave seasons and severe cold spells straining heating and electricity. People leave cities where life has become increasingly unsuitable, and join the inflow into compact cities.',
  tension:'They arrive with need as well as skill; the compact decides who counts as talent.',
  relations:[['compacts','Talent inflow','Climate immigrants move into compact cities.']]}
};

// "Trace the relationship" from each care-building level returns to this 2070 node.
stage.placeCountry={committee:'compacts',social:'ageing',rehab:'migrants',continuity:'providers',emergency:'cityA',mortuary:'cityB'};
})();
