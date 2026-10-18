/* 115 學年度圖面：座標比例為示意，樓層與固定空間碼由原圖校對。
 * Stable destination IDs remain compatible with saved names and shared URLs.
 */
const CampusSpatialData = (() => {
 const room=(id,code,units=1,name)=>({id,spaceCode:code,kind:'room',units,name});
 const stair=(id,label='樓梯')=>({id,label,kind:'stair',len:8});
 const wc=(units=.32)=>({kind:'wc',label:'廁所',units});
 const passage=(units=.5,label='穿堂')=>({kind:'passage',label,units});
 const vacant=(units=1,label='通道')=>({kind:'void',label,units});
 const profiles={
  'grade9-back':{sign:-1,floors:{
   1:[room('906','213'),room('907','212'),room('908','211'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')],
   2:[room('g9-clubs','223',1,'社團教室'),room('904','222'),room('905','221'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')],
   3:[room('901','233'),room('902','232'),room('903','231'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')]
  }},
  'grade8-mid':{sign:-1,floors:{
   1:[room('mid-315','315',1,'空間 315（名稱待確認）'),room('wood-craft-206','314',1,'空間 314（名稱待確認）'),room('909','313',1,'909 教室'),room('woodwork-1','312',1,'木藝教室'),room('mid-311','311',1,'木藝教室'),wc(.45),stair('south','南端共用樓梯')],
   2:[room('mid-325','325',1,'空間 325（名稱待確認）'),room('mid-324','324',1,'空間 324（名稱待確認）'),room('math-research','323',1,'空間 323（名稱待確認）'),room('805','322'),room('804','321'),wc(.45),stair('south','南端共用樓梯')],
   3:[room('native-lang','335',1,'空間 335（名稱待確認）'),room('drama-room','333–334',2,'表藝教室'),room('inter-disc','332',1,'空間 332（名稱待確認）'),room('809','331',1,'809 教室'),wc(.45),stair('south','南端共用樓梯')]
  }},
  'grade8-front':{sign:-1,floors:{
   1:[stair('west','西側半圓梯'),room('kindergarten','411–414',4),stair('east','東側共用樓梯')],
   2:[stair('west','西側半圓梯'),room('807','421'),room('801','422'),room('802','423'),room('803','424'),stair('east','東側共用樓梯')],
   3:[stair('west','西側半圓梯'),room('woodwork-front','431',1,'空間 431（名稱待確認）'),room('806','432'),room('808','433'),room('boardgame','434',1,'桌遊教室'),stair('east','東側共用樓梯')]
  }},
  'admin-back':{sign:1,floors:{
   1:[room('student-affairs','ADM-B-1W',.6),room('coach-room','ADM-B-1C',.6),stair('central','中段折返梯'),wc(.35),room('weimei-room','ADM-B-1E1',.65,'東側空間一（名稱待確認）'),room('admin-back-east','ADM-B-1E2',.65,'東側空間二（名稱待確認）')],
   2:[room('general','ADM-B-2W',1.2),stair('central','中段折返梯'),wc(.35),passage(1.3,'總務・人事・會計辦公區')],
   3:[room('spec-staff-back','ADM-B-3W',1.2),stair('central','中段折返梯'),wc(.35),room('teacher-study','ADM-B-3E',1.3)]
  }},
  'admin-front':{sign:1,floors:{
   1:[room('admin-g89-staff','ADM-F-1',3.2)],
   2:[room('principal','ADM-F-2W',.9),room('reception','ADM-F-2C',.3,'校長室旁空間（名稱待確認）'),passage(.7),room('academic','ADM-F-2E',1.3)],
   3:[room('lang-lab','ADM-F-3W',1.2),passage(.7),room('spec-staff-3','ADM-F-3E',1.3)]
  }},
  'health-bld':{sign:1,floors:{1:[room('health','511'),room('coop','512'),stair('east','東側樓梯')],2:[room('pe-office','521',1,'空間 521（名稱待確認）'),room('pe-storage','522',1,'空間 522（名稱待確認）'),stair('east','東側樓梯')]}},
  'art-building':{sign:-1,floors:Object.fromEntries(['broadwood','music-2f','music-3f','art-4f'].map((id,i)=>[i+1,[stair('main','藝術館樓梯'),room(id,`ART-${i+1}`,1,['樂活教室','音樂教室','音樂教室','美術教室'][i])]]))},
  'gym-bld':{shape:'gym',sign:1,confidence:'照片與使用者確認：一樓球場、舞台及入口附屬空間；二樓看台。尺度按照片比例示意'},
  'recycle-bld':{sign:1,floors:{1:[room('recycling','REC-1')]}},
  'new-grade7':{shape:'new7',sign:1,confidence:'班級與固定碼由圖校對；西側上下樓梯段採示意尺度'},
  'multi-building':{shape:'multi',sign:-1},
  'tech-building':{shape:'tech',sign:-1}
 };
 const extras={
  'g9-clubs':{name:'社團教室',cat:'special'},'909':{name:'909 教室',cat:'grade9'},'new7-staff':{name:'導師室',cat:'admin'},
  'sped-office':{name:'特教辦公室',cat:'admin'},'sped-614':{name:'特教教室',cat:'special'},'sped-612':{name:'特教相關教室',cat:'special'},
  'multi-622':{name:'空間 622（名稱待確認）',cat:'admin'},'tech-nw-2':{name:'空間 TC-NW-2（名稱待確認）',cat:'special'},
  'tech-sw-1':{name:'空間 TC-SW-1（名稱待確認）',cat:'special'}
 };
 const aliases={'spec-staff-1':'admin-g89-staff','scout-judo':'general','counseling':'collab-conf','fitness-room':'709','counseling-act':'mid-315'};
 const custom={
  gym:[[1,room('gym','GYM-1'),room('fire-room','GYM-F'),room('weight-room','GYM-2',1,'活動中心入口大廳／桌球區')],[2,room('gym-balcony','GYM-3',1,'活動中心階梯看台')]],
  new7:[
   [1,room('709','A12'),room('701','A13'),room('resource-room','A14',1,'資源班 3／4 教室'),room('sped-leader','A15',1,'特教教室')],
   [2,room('math-lab','A21',1,'空間 A21（名稱待確認）'),room('702','A22'),room('703','A23'),room('704','A24'),room('705','A25')],
   [3,room('sped-classroom','A31',1,'空間 A31（名稱待確認）'),room('706','A32'),room('707','A33'),room('708','A34'),room('new7-staff','A35')]
  ],
  multi:[
   [1,room('food-classroom','615',1,'餐飲教室'),room('library','611',1,'圖書室'),room('history-room','HST-1',1,'校史室'),room('sped-614','614'),room('sped-office','613'),room('sped-612','612')],
   [2,room('large-computer','621',1,'大電腦教室'),room('multi-622','622'),room('it-server','623',1,'空間 623（名稱待確認）'),room('collab-conf','624',1,'輔導室')]
  ],
  tech:[
   [1,room('audiovisual-1f','TC-NW-1',1,'視聽教室'),room('life-tech-1','TC-N-1',1,'生科教室一'),room('tech-sw-1','TC-SW-1'),room('life-tech-2','TC-NE-1',1,'生科教室二'),room('computer-lab-1','TC-SE-1',1,'電腦教室一')],
   [2,room('tech-nw-2','TC-NW-2'),room('physics-lab','TC-N-2',1,'理化實驗室'),room('maker-lab','TC-SW-2',1,'空間 TC-SW-2（名稱待確認）'),room('tech-smart','TC-NE-2',1,'科技教室（名稱待確認）'),room('computer-lab-2','TC-SE-2',1,'電腦教室二')]
  ]
 };
 // One building owns every office. Parts are geometry only, never separate destinations.
 const adminFront=profiles['admin-front'],adminRear=profiles['admin-back'];
 // User-approved rotated plan: full student affairs, accessible WC and through-hall.
 adminFront.floors[1]=[room('admin-g89-staff','ADM-F-1W',1,'八、九年級導師室（西側）'),room('admin-g89-staff-east','ADM-F-1E',1,'八、九年級導師室（東側）')];
 adminRear.floors[1]=[room('student-affairs','ADM-B-1W',1.2),stair('central','中段折返梯'),wc(.35),room('admin-reception-1f','ADM-B-1E1',.65,'會客室'),room('coach-room','ADM-B-1E2',.65)];
 // Approved 2026-10-18 second-floor design; rectangles are compiled separately.
 adminRear.floors[2]=[room('general','ADM-B-2W',1.2),room('personnel-accounting','ADM-B-2E',.65,'人事室／會計室'),room('accounting','ADM-B-2A',.65,'會計室')];
 aliases['weimei-room']='admin-reception-1f';aliases['admin-back-east']='coach-room';

 adminFront.orientation=adminRear.orientation='statue';adminFront.sideEntrance={v:-1.2,width:2.2};
 profiles['admin-front']={shape:'admin',orientation:'statue',sign:1,groundPlan:'approved-crosshall',secondFloorPlan:'approved-offices',front:adminFront,rear:adminRear,
  rearBody:{x:-9.5,z:28.5,width:8,depth:24},
  confidence:'依使用者確認上下對位：西側導師室上方為相連的油印與校長室，東側導師室上方為教務，男女廁上下同址；總務、人事、會計共用入口；同一梯井連通一至三樓；尺寸為示意'};
 custom.admin=[1,2,3].map(f=>[f,...[...adminFront.floors[f],...adminRear.floors[f]].filter(c=>c.kind==='room')]);
 Object.assign(extras,{
  'admin-g89-staff-east':{name:'八、九年級導師室（東側）',cat:'admin'},'admin-reception-1f':{name:'會客室',cat:'admin'},
  'student-affairs':{name:'學務處',cat:'admin'},'coach-room':{name:'教練室',cat:'sports'},
  'general':{name:'總務處 / 人事室 / 會計室',cat:'admin'},
  'personnel-accounting':{name:'人事室／會計室',cat:'admin'},
  'accounting':{name:'會計室',cat:'admin'},
  'spec-staff-back':{name:'專任辦公室',cat:'admin'},'teacher-study':{name:'教師研習中心',cat:'admin'}
 });
 delete profiles['admin-back'];
 for(const b of BUILDINGS_CONFIG){
  const p=profiles[b.id],old=new Map(b.rooms.map(r=>[r.id,r]));
  const rows=p.shape?custom[p.shape]:Object.entries(p.floors).map(([f,cells])=>[Number(f),...cells.filter(c=>c.kind==='room')]);
  b.rooms=rows.flatMap(([f,...cells])=>cells.map(c=>{
   const previous=old.get(c.id)||extras[c.id]||{name:c.name,cat:'special'};
   return{...previous,id:c.id,spaceCode:c.spaceCode,code:c.spaceCode,codeSource:/^(ADM|GYM|ART|REC|TC|HST)/.test(c.spaceCode)?'assigned':'plan',legacyCode:previous.code,floor:f,name:(c.name||previous.name||c.id).replace(/\s*\(\d+F\)/,'')+` (${f}F)`,node:previous.node||`space-${c.id}`};
  }));
  b.spatialProfile=p;
 }
 // Names confirmed by the user's 2026-10-17 space-code comparison table.
 // Keep IDs, floors and physical geometry independent from these corrections.
 const namesById={
  'reception':'油印室','general':'總務處','personnel-accounting':'人事室','pe-office':'檔案室（521）','pe-storage':'檔案室（522）',
  'mid-315':'體育器材室','wood-craft-206':'輕艇隊訓練室','mid-325':'志工／校友辦公室','mid-324':'訓育組備用器材室','math-research':'教學設備器材室',
  'native-lang':'生涯發展教室','inter-disc':'教材製作室','woodwork-front':'本土語教室',
  'math-lab':'家長會辦公室','sped-classroom':'教師會辦公室',
  'multi-622':'資訊機房','it-server':'諮商會議室','sped-614':'特教班','sped-612':'資源班 1／2',
  'tech-sw-1':'生物實驗室','tech-nw-2':'科中辦公室／自造中心辦公室','maker-lab':'科技智慧教室','tech-smart':'科技創作教室',
  'music-2f':'音樂教室（第一音樂教室）','music-3f':'音樂教室（第二音樂教室）'
 },confirmedNames={};
 for(const b of BUILDINGS_CONFIG)for(const r of b.rooms)if(namesById[r.id]){
  confirmedNames[r.id]={previous:r.name.replace(/\s*\(\d+F\)/,''),name:namesById[r.id]};
  r.name=`${namesById[r.id]} (${r.floor}F)`;
 }
 const officeHints={general:'總務處、人事室與會計室共用入口；進門後左側為總務處。',accounting:'總務處、人事室與會計室共用入口；進門後右側靠入口為會計室。','personnel-accounting':'總務處、人事室與會計室共用入口；進門後右側較內側為人事室。',reception:'油印室與校長室相連，位於一樓西側八、九年級導師室正上方；油印室門口正對連續樓梯。',principal:'校長室與油印室相連，位於一樓西側八、九年級導師室正上方；校長室與教務處門口面對面。',academic:'教務處位於一樓東側八、九年級導師室正上方，門口與校長室面對面。'};
 for(const b of BUILDINGS_CONFIG)for(const r of b.rooms)if(officeHints[r.id])r.entryHint=officeHints[r.id];
 return {profiles,custom,aliases,confirmedNames};
})();
