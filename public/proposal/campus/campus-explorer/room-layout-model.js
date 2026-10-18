const CampusRoomLayout = (() => {
 const key=year=>`daxi-room-layout-v1-${year}`;
 const clean=name=>String(name??'').trim().slice(0,60);
 function normalize(value,rooms,aliases={}){
  const source=value&&typeof value==='object'?{...value}:{},legacy={},known=new Set(rooms.map(r=>r.id));
  for(const [oldId,id] of Object.entries(aliases))if(known.has(id)&&Object.hasOwn(source,oldId)){
   legacy[oldId]=clean(source[oldId]);
   if(!Object.hasOwn(source,id))source[id]=source[oldId];
  }
  const names={...legacy};for(const r of rooms)names[r.id]=clean(Object.hasOwn(source,r.id)?source[r.id]:r.name)||r.name;return names;
 }
 function parse(value,rooms,aliases={}){try{return normalize(JSON.parse(value),rooms,aliases)}catch{return normalize(null,rooms,aliases)}}
 function migrateConfirmedNames(names,corrections={}){
  const result={...names};for(const [id,rule] of Object.entries(corrections))if(Object.hasOwn(result,id)&&clean(result[id])===rule.previous)result[id]=rule.name;
  return result;
 }
 function category(name,cat){const match=clean(name).match(/^([789])\d{2}(?:\s|$)/);return match?`grade${match[1]}`:cat==='admin'?'admin':cat==='special'?'special':'other';}
 const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
 function nameplate(name,cat){const text=clean(name).replace(/\s*\(\d+F\)/,''),color=colors[category(text,cat)];return{text,color,key:text+'|'+color};}
 function projectingNameplate(name,cat){
  const text=nameplate(name,cat).text.replace(/\s*\/\s*/g,'／'),grade=text.match(/^([789]\d{2})(?:\s|$)/),unknown=/名稱待確認/.test(text);
  let title=text,subtitle='',lines;
  if(grade){title=grade[1];subtitle=text.slice(3).trim()||'教室';}
  else if(unknown){title=text.replace(/（名稱待確認）/g,'').replace(/\s+/g,'');subtitle='名稱待確認';}
  const chunks=s=>Array.from(s).reduce((a,c,i)=>{if(i%6===0)a.push('');a[a.length-1]+=c;return a},[]);
  if(title.includes('／'))lines=title.split('／').flatMap(chunks);
  else{const suffix=title.match(/^(.+?)(導師室|辦公室[一二三]?|研究室|教室|中心)$/);lines=title.length>6&&suffix&&suffix[1].length<=6?[suffix[1],suffix[2]]:chunks(title);}
  return {text,lines,subtitle,color:'#173c7a',key:'projecting|'+text};
 }
 // Furnishings are schematic. Door-oriented coordinates keep the center aisle
 // shared by navigation, rendered furniture and physical collision.
 function roomKind(r){
  const n=r.name||'';
  if(/名稱待確認/.test(n))return 'unconfirmed';
  if(/^grade[789]$/.test(r.cat||'')||/^[789]\d{2}(?:\s|$)/.test(n))return 'classroom';
  if(/幼兒園/.test(n))return 'classroom';
  if(/機房|回收/.test(n))return 'utility';
  if(/圖書/.test(n))return 'library';
  if(/健康中心/.test(n))return 'health';
  if(/合作社/.test(n))return 'shop';
  if(/校史/.test(n))return 'exhibit';
  if(/會客|會議|研習中心/.test(n))return 'meeting';
  if(/導師|辦公|研究室|教練室|校長|教務|學務|總務|人事|會計|輔導室/.test(n))return 'office';
  if(/電腦/.test(n))return 'computer';
  if(/理化|實驗/.test(n))return 'lab';
  if(/木工|木藝|科技|生科|創作|美術/.test(n))return 'workshop';
  if(/音樂/.test(n))return 'music';
  if(/烹飪|餐飲/.test(n))return 'kitchen';
  if(/體適能|體能|柔道|重訓|禮堂|看台/.test(n)||r.cat==='sports')return 'sports';
  return /教室|班|語言/.test(n)||/^grade[789]$/.test(r.cat||'')?'classroom':r.cat==='admin'?'office':'classroom';
 }
 function furnishings(r){
  const alongU=r.doorSide.startsWith('u'),w=alongU?r.v1-r.v0:r.u1-r.u0,d=alongU?r.u1-r.u0:r.v1-r.v0,kind=roomKind(r),parts=[];
  const point=(x,z)=>alongU?{u:r.doorSide==='u0'?r.u0+z:r.u1-z,v:r.v+x}:{u:r.u+x,v:r.doorSide==='v0'?r.v0+z:r.v1-z};
  const add=(role,x,z,sx,sz,y0,y1,paint='wood',solid=false)=>{
   if(sx<=0||sz<=0||x-sx/2<-w/2+.13||x+sx/2>w/2-.13||z-sz/2<.13||z+sz/2>d-.13)return;
   const a=point(x-sx/2,z-sz/2),b=point(x+sx/2,z+sz/2);
   parts.push({role,u0:Math.min(a.u,b.u),u1:Math.max(a.u,b.u),v0:Math.min(a.v,b.v),v1:Math.max(a.v,b.v),y0,y1,paint,solid});
  };
  const chair=(role,x,z)=>{add(role,x,z,.48,.45,.42,.49,'wood',true);add(role+'-back',x,z-.2,.48,.055,.48,.91,'blue',true);for(const a of [-.17,.17])for(const b of [-.15,.15])add('chair-leg',x+a,z+b,.035,.035,0,.43,'steel');};
  const desk=(role,x,z,sx=.72,sz=.5)=>{add(role,x,z,sx,sz,.72,.8,'wood',true);for(const a of [-1,1])for(const b of [-1,1])add('desk-leg',x+a*(sx/2-.07),z+b*(sz/2-.07),.045,.045,0,.73,'steel');};
  const monitor=(x,z)=>{add('monitor',x,z,.42,.055,.85,1.17,'screen');add('monitor-stand',x,z,.1,.16,.8,.87,'steel');add('keyboard',x,z-.16,.34,.12,.8,.82,'steel');};
  const shelf=(role,x,z)=>{add(role,x,z,.64,.38,0,1.75,'blue',true);for(const y of [.35,.8,1.25]){add('shelf-front',x,z-.2,.6,.04,y,y+.035,'wood');for(let i=0;i<4;i++)add('files',x-.22+i*.145,z-.225,.09,.06,y+.04,y+.34,i%2?'wood':'paper');}};
  const sideX=Math.max(1.04,w/2-.58),hasSides=sideX+.4<w/2-.12;
  const board=()=>{add('blackboard',0,d-.2,Math.min(w-.5,4.2),.08,1.05,2.3,'green');add('chalk-tray',0,d-.29,Math.min(w-.6,4.1),.14,1.03,1.08,'steel');};
  const rows=(role,spacing,work)=>{if(!hasSides)return;const columns=Math.max(1,Math.min(3,Math.floor((w/2-.85)/1.05)));for(let row=0,z=1.25;z<(d>4.5?d-2:d-.9);row++,z+=spacing)for(const sign of [-1,1])for(let col=0;col<columns;col++){const x=sign*(1.04+col*1.05);if(Math.abs(x)+.4>w/2-.13)continue;desk(role,x,z);chair(role==='student-desk'?'student-chair':'office-chair',x,z-.58);if(work)monitor(x,z+.08);}};
  if(['classroom','computer','lab','workshop','music','kitchen'].includes(kind)){
   board();
   // The teaching platform is beyond the navigation destination, leaving the
   // full doorway-to-center route flat and unobstructed.
   if(d>4.5){add('platform',0,d-.9,Math.min(w-.5,4.6),1.1,0,.16,'wood',true);desk('teacher-desk',Math.min(1.15,w/2-.65),d-1.05,1,.56);}
   rows('student-desk',kind==='classroom'||kind==='computer'?1.3:1.6,kind==='computer');
   if(hasSides){shelf(kind==='workshop'?'materials-cabinet':'bookcase',-sideX,d-.5);}
   if(kind==='lab'||kind==='kitchen')for(const sign of [-1,1]){desk('workbench',sign*sideX,Math.max(1.1,d-2.4),.8,.6);add(kind==='lab'?'sink':'hob',sign*sideX,Math.max(1.1,d-2.4),.48,.4,.8,.85,'steel');}
   if(kind==='music'){desk('piano',-sideX,Math.max(1,d-2.5),.8,.6);add('piano-keys',-sideX,Math.max(1,d-2.8),.7,.15,.8,.83,'paper');}
  }else if(kind==='office'||kind==='meeting'){
   if(kind==='office')rows('office-desk',1.7,true);
   else if(hasSides)for(const s of [-1,1])for(let z=1.4;z<d-1.5;z+=1.4){desk('meeting-table',s*sideX,z,.8,.7);chair('meeting-chair',s*sideX,z-.65);}
   if(hasSides){for(const s of [-1,1])shelf('file-cabinet',s*sideX,d-.5);desk('printer-stand',sideX,Math.max(.9,d-1.6),.75,.5);add('printer',sideX,Math.max(.9,d-1.6),.56,.38,.8,1.08,'paper');add('paper-tray',sideX,Math.max(.9,d-1.6)-.05,.36,.24,1.08,1.1,'paper');}
   add('notice-board',0,d-.2,Math.min(2.5,w-.5),.06,1.1,2.1,'wood');
  }else if(hasSides){
   if(kind==='health'){for(const s of [-1,1]){add('bed',s*sideX,d/2,.75,1.8,.32,.55,'paper',true);add('pillow',s*sideX,d/2+.6,.56,.3,.55,.65,'blue');}shelf('medical-cabinet',-sideX,d-.5);desk('nurse-desk',sideX,1,.75,.5);monitor(sideX,1);}
   else if(kind==='sports'){for(const s of [-1,1]){add('bench',s*sideX,d/2,.65,Math.min(3,d-1),.35,.45,'wood',true);shelf('equipment-cabinet',s*sideX,d-.5);}}
   else{for(const s of [-1,1]){shelf(kind==='library'?'bookcase':kind==='exhibit'?'display-case':kind==='shop'?'shop-shelf':'storage-cabinet',s*sideX,d-.5);for(let z=1.3;z<d-1.5;z+=1.7){if(kind==='library'){desk('reading-table',s*sideX,z);chair('reading-chair',s*sideX,z-.6);}else shelf(kind==='utility'?'equipment-rack':'display-shelf',s*sideX,z);}}}
  }
  if(!parts.length)add('wall-equipment',0,d-.25,Math.min(1,w-.4),.2,.9,1.7,'steel');
  return {kind,parts,aisleWidth:1.3};
 }
 return {key,normalize,parse,migrateConfirmedNames,category,colors,nameplate,projectingNameplate,roomKind,furnishings};
})();
