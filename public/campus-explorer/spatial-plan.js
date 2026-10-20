/* Geometry compiler shared by scene, physics, navigation, classroom matrix and map. */
const CampusSpatialPlan = (() => {
 const H=3.6,eps=1e-6;
 const onFloor=(item,floor)=>floor>=(item.fromFloor||1)&&floor<=(item.toFloor||Infinity);
 const contains=(r,u,v)=>u>=r.u0-eps&&u<=r.u1+eps&&v>=r.v0-eps&&v<=r.v1+eps&&(r.kind!=='tower'||(u-r.centerU)**2+(v-r.centerV)**2<=r.radius**2+eps);
 function layout(b){
  const p=b.spatialProfile;if(!p)return null;
  const statueFacing=p.orientation==='statue';
  const horizontal=statueFacing?false:p.shape==='admin'?true:p.shape==='tech'||b.id==='art-building'?false:b.width>=b.depth,L=horizontal?b.width:b.depth,D=horizontal?b.depth:b.width,sign=p.sign||1;
  const world=(u,v,y=0)=>statueFacing?{x:b.x-v,z:b.z+u,y}:horizontal?{x:b.x+u,z:b.z+v,y}:{x:b.x+v,z:b.z+u,y};
  const rect=(u0,u1,v0,v1)=>{const a=world(u0,v0),c=world(u1,v1);return{x0:Math.min(a.x,c.x),x1:Math.max(a.x,c.x),z0:Math.min(a.z,c.z),z1:Math.max(a.z,c.z)}};
  const local=(x,z)=>statueFacing?{u:z-b.z,v:b.x-x}:horizontal?{u:x-b.x,v:z-b.z}:{u:z-b.z,v:x-b.x};
  const cells=[],corridors=[],footprints=[],stairs=[],ramps=[],platforms=[],holes=[],entrances=[],displayRows=[],externalLinks=[];
  const addRect=(target,r)=>{const a={...r,rect:rect(r.u0,r.u1,r.v0,r.v1)};target.push(a);return a};
  function addCell(item,floor,u0,u1,v0,v1,row='main',doorSide='v1',corridorValue){
   const r=item.kind==='room'?b.rooms.find(r=>r.id===item.id):null;
   const c=addRect(cells,{...item,...r,id:item.id||`${b.id}-${item.kind}-${floor}-${cells.length}`,floor,u0,u1,v0,v1,row,span:u1-u0,spaceCode:r?.spaceCode||item.spaceCode||'',label:item.label||r?.name||'',kind:item.kind});
   if(item.kind==='room'||item.kind==='wc'||item.kind==='office-suite'){
    const u=(u0+u1)/2,v=(v0+v1)/2,y=(floor-1)*H,side=doorSide;
    const du=side==='u0'?u0:side==='u1'?u1:u,dv=side==='v0'?v0:side==='v1'?v1:v;
    const cv=corridorValue??(side==='v0'?v0-1.4:side==='v1'?v1+1.4:side==='u0'?u0-1.4:u1+1.4);
    c.u=u;c.v=v;c.doorSide=side;c.center=world(u,v,y);c.door=world(du,dv,y);c.corridor=side.startsWith('v')?world(u,cv,y):world(cv,v,y);
   }
   return c;
  }
  const fp=(f,u0,u1,v0,v1)=>addRect(footprints,{floor:f,u0,u1,v0,v1});
  const co=(f,u0,u1,v0,v1)=>addRect(corridors,{floor:f,u0,u1,v0,v1});
  function addStair(id,name,u0,u1,v0,v1,side=sign,confidence='圖面位置／示意梯段'){
   const s=addRect(stairs,{id:`${b.id}-${id}`,name,u0,u1,v0,v1,floors:b.floors,confidence});
   const cv=(v0+v1)/2,far=u0+2.5,near=u1-1.8,inner=u1-.9;
   s.farU=far;s.nearU=near;s.innerU=inner;s.centerV=cv;s.sign=side;s.turnU=u0+1.35;
   s.hole={u0:u0+.2,u1:near,v0:cv-2.3,v1:cv+2.3};holes.push(s.hole);
   for(let f=1;f<b.floors;f++){
    const y=(f-1)*H;
    for(const [start,end] of [[world(near,cv+side*1.25,y),world(far,cv+side*1.25,y+H/2)],[world(far,cv-side*1.25,y+H/2),world(near,cv-side*1.25,y+H)]]){
     const bounds=horizontal?{x0:Math.min(start.x,end.x),x1:Math.max(start.x,end.x),z0:start.z-.8,z1:start.z+.8}:{x0:start.x-.8,x1:start.x+.8,z0:Math.min(start.z,end.z),z1:Math.max(start.z,end.z)};
     ramps.push({...bounds,start,end,h0:start.y,h1:end.y,axis:horizontal?'x':'z',floor:f,stairId:s.id});
    }
    platforms.push({...rect(u0+.2,far+.08,cv-2.3,cv+2.3),u0:u0+.2,u1:far+.08,v0:cv-2.3,v1:cv+2.3,y:y+H/2,floor:f,stairId:s.id});
   }
   return s;
  }
  const outerV=sign*D/2,wallV=sign*(D/2-2.8),cV=sign*(D/2-1.4);
  if(p.shape==='admin'){
   // Compile both office rows into one coordinate frame, one building and one graph.
   const front=layout({...b,spatialProfile:p.front}),rear=layout({...b,...p.rearBody,id:'admin-inner',spatialProfile:p.rear});
   function merge(part,name){
    const shift=local(part.b.x,part.b.z).v;
    const localRect=q=>({...q,v0:q.v0+shift,v1:q.v1+shift,part:name});
    for(const key of ['cells','corridors','footprints','platforms','holes'])for(const q of part[key]){
     const r=localRect(q);if(key==='cells')r.row=name;if(r.v!==undefined)r.v+=shift;
     // center/door/corridor and rect are already expressed in world coordinates.
     ({cells,corridors,footprints,platforms,holes})[key].push(r);
    }
    for(const q of part.stairs)stairs.push({...localRect(q),centerV:q.centerV+shift,hole:localRect(q.hole)});
    ramps.push(...part.ramps);entrances.push(...part.entrances);
   }
   // Root circulation starts beside the real stairwell; ground-floor parts have outdoor access.
   merge(rear,'inner');merge(front,'entrance');
   if(p.groundPlan==='approved-crosshall'){
    // The approved drawing rotates only the ground-floor topology, not the doors.
    for(const list of [cells,corridors,footprints])for(let i=list.length-1;i>=0;i--)if(list[i].floor===1)list.splice(i,1);
    for(let i=entrances.length-1;i>=0;i--)if(!['main','side'].includes(entrances[i].kind))entrances.splice(i,1);
    const byId=id=>({kind:'room',id}),path=(u0,u1,v0,v1,part)=>{Object.assign(fp(1,u0,u1,v0,v1),{part});Object.assign(co(1,u0,u1,v0,v1),{part})};
    fp(1,-13,13,-15.5,5);
    addCell(byId('admin-reception-1f'),1,-13,-8.8,-15.5,-7.5,'approved-back','v1',-6.1);
    addCell(byId('coach-room'),1,-8.8,-4.6,-15.5,-7.5,'approved-back','v1',-6.1);
    addCell({kind:'wc',label:'男女廁所'},1,-4.6,-1.6,-15.5,-7.5,'approved-back','v1',-6.1);
    addCell({kind:'wc',label:'無障礙廁所',accessible:true},1,1.6,5.2,-15.5,-7.5,'approved-back','v1',-6.1);
    addCell(byId('admin-g89-staff-east'),1,5.2,10.8,-15.5,-7.5,'approved-back','v1',-6.1);
    addCell(byId('student-affairs'),1,-13,-7.8,-4.7,2.2,'approved-front','v0',-6.1);
    addCell(byId('admin-g89-staff'),1,3.6,10.8,-4.7,2.2,'approved-front','v0',-6.1);
    path(-1.6,1.6,-15.5,5,'central-through-hall');
    path(-13,15,-7.5,-4.7,'east-breezeway');
    path(10.8,13,-15.5,5,'front-side-passage');
    path(-13,13,2.2,5,'front-corridor');
    path(-7.8,3.6,-4.7,-.1,'stair-approach');path(-1.6,3.6,-4.7,5,'stair-approach');
    // Photos 47/49 confirm one switchback core, not a different shaft above 2F.
    for(const list of [stairs,ramps,platforms,holes])list.length=0;
    const ground=addStair('ground-central','行政大樓連續樓梯',-7.8,-1.6,-4.6,.6);ground.fromFloor=1;ground.toFloor=3;ground.hole.fromFloor=2;ground.hole.toFloor=3;
    addCell({kind:'stair',id:'admin-central-ground-stair',label:'中段樓梯'},1,ground.u0,ground.u1,ground.v0,ground.v1,'approved-front');
    path(ground.nearU,ground.u1,ground.v0,ground.v1,'stair-ground-landing');
    // Retain 3F uses while clearing the same shaft at every storey.
    const language=cells.find(c=>c.id==='lang-lab');cells.splice(cells.indexOf(language),1);
    addCell(byId('lang-lab'),3,language.u0,ground.u0,language.v0,language.v1,'entrance','v1',front.cV);
    for(let i=cells.length-1;i>=0;i--)if(cells[i].kind==='stair'&&cells[i].floor>1)cells.splice(i,1);
    for(const f of [2,3]){addCell({kind:'stair',label:'連續樓梯（1F–3F）'},f,ground.u0,ground.u1,ground.v0,ground.v1,'entrance');co(f,ground.nearU,ground.u1,ground.v0,ground.v1);}
    entrances.push({floor:1,kind:'east-breezeway',inside:world(14,-6.75),outside:world(16.4,-6.75)});
    entrances.push({floor:1,kind:'rear-link',inside:world(0,-14.3),outside:world(0,-16.7),building:'grade9-back'});
    displayRows.push({id:'approved-back',label:'後側：會客室・教練室・廁所・導師室',axis:'u',start:-13,end:10.8},{id:'approved-front',label:'入口側：學務處・樓梯・導師室',axis:'u',start:-13,end:10.8});
   }
   displayRows.push({id:'entrance',label:'入口側處室',axis:'u',start:-L/2,end:L/2},{id:'inner',label:'內側處室',axis:'u',start:-12,end:12});
   const passage=front.cells.find(c=>c.floor===2&&c.kind==='passage'),u=(passage.u0+passage.u1)/2;
   const v0=rear.cV+local(rear.b.x,rear.b.z).v-.1,v1=-D/2+.1;
   for(let f=2;f<=b.floors;f++){
    Object.assign(fp(f,u-1.7,u+1.7,v0,v1),{part:'connector'});
    Object.assign(co(f,u-1.7,u+1.7,v0,front.cV),{part:'connector'});
   }
   if(p.secondFloorPlan==='approved-offices'){
    // One shared office doorway; open desk zones keep their individual destinations.
    for(const list of [cells,corridors])for(let i=list.length-1;i>=0;i--)if(list[i].floor===2)list.splice(i,1);
    const office=id=>({kind:'room',id}),route=(u0,u1,v0,v1)=>co(2,u0,u1,v0,v1);
    const ground=stairs[0];
    // Latest user correction: upper uses must align with the confirmed 1F uses.
    const west=cells.find(c=>c.id==='admin-g89-staff'),east=cells.find(c=>c.id==='admin-g89-staff-east'),lowerWC=cells.find(c=>c.floor===1&&c.kind==='wc'&&!c.accessible),split=7.8;
    // Rotate the adjoining pair within the confirmed west-side footprint.
    const oil=addCell(office('reception'),2,west.u0,split,west.v0,west.v1,'second-west','u0',1);
    const landingV=ground.centerV;
    oil.door=world(west.u0,landingV,H);oil.corridor=world(1,landingV,H);oil.entranceOffset=landingV-oil.v;
    const principal=addCell(office('principal'),2,split,west.u1,west.v0,west.v1,'second-west','v0',-6.1);
    const academic=addCell(office('academic'),2,east.u0,east.u1,east.v0,east.v1,'second-east','v1',-6.1);
    // Opposing doors share one axis across the public corridor.
    academic.door=world(principal.u,east.v1,H);academic.corridor=world(principal.u,-6.1,H);academic.entranceOffset=principal.u-academic.u;
    const general=addCell(office('general'),2,-13,-7.8,-4.7,2.2,'second-general','v0',-6.1);
    const personnel=addCell(office('personnel-accounting'),2,-13,-7.8,-15.5,-7.5,'second-suite','v1',-6.1);
    const accounting=addCell(office('accounting'),2,-7.8,lowerWC.u0,-15.5,-7.5,'second-suite','v1',-6.1);
    const shell=addCell({kind:'office-suite',id:'admin-office-suite',name:'總務處／會計室／人事室',label:'共用辦公區入口'},2,-13,lowerWC.u0,-15.5,-4.7,'second-suite-shell','u1',lowerWC.u0+1.4);
    shell.v=-6.1;shell.door=world(lowerWC.u0,-6.1,H);shell.corridor=world(lowerWC.u0+1.4,-6.1,H);shell.inside=world(lowerWC.u0-1.4,-6.1,H);shell.omitSides=['v1'];
    const annex=addCell({kind:'office-suite',id:'admin-office-suite-annex'},2,-13,-7.8,-4.7,2.2,'second-suite-shell');annex.doorSide=null;annex.omitSides=['v0'];
    // The remaining L-corner boundary closes the office against the stairwell.
    const corner=addCell({kind:'office-suite',id:'admin-office-suite-corner'},2,-7.8,lowerWC.u0,-4.7,-4.7,'second-suite-shell');corner.doorSide=null;corner.omitSides=['u0','u1','v0'];
    const shared={id:shell.id,door:shell.door,corridor:shell.corridor,inside:shell.inside};
    for(const zone of [general,accounting,personnel]){zone.openOffice=true;zone.sharedEntrance=shared;}
    addCell({kind:'wc',label:'男女廁所'},2,lowerWC.u0,lowerWC.u1,lowerWC.v0,lowerWC.v1,'second-wc','v1',-6.1);
    addCell({kind:'stair',label:'連續樓梯（1F–3F）'},2,ground.u0,ground.u1,ground.v0,ground.v1,'second-stair');
    Object.assign(fp(2,-13,lowerWC.u0,-7.5,-4.7),{part:'office-suite'});
    Object.assign(fp(2,lowerWC.u0,13,-7.5,-4.7),{part:'public-corridor'});
    route(lowerWC.u0,13,-7.5,-4.7);route(-13,lowerWC.u0,-7.5,-4.7);
    route(-1.6,1.6,-15.5,-4.7);route(-1.6,west.u0,-4.7,west.v1);route(-7.8,west.u0,.6,west.v1);
    route(-13,13,west.v1,5);route(west.u1,13,-5,5);
    route(ground.nearU,ground.u1,ground.v0,ground.v1);
    for(const row of displayRows)row.floors=row.id.startsWith('approved-')?[1]:[1,3];
    displayRows.push({id:'second-general',label:'共用入口內左側：總務處（學務處上方）',axis:'u',start:-13,end:-7.8,floor:2},
     {id:'second-suite',label:'共用入口內右側：內側人事室・入口側會計室',axis:'u',start:-13,end:lowerWC.u0,floor:2},
     {id:'second-stair',label:'總務處旁：一至三樓連續樓梯',axis:'u',start:-7.8,end:-1.6,floor:2},
     {id:'second-west',label:'西側導師室正上方：油印室朝樓梯・校長室朝教務處',axis:'u',start:west.u0,end:west.u1,floor:2},
     {id:'second-east',label:'東側導師室正上方：教務處',axis:'u',start:east.u0,end:east.u1,floor:2},
     {id:'second-wc',label:'一樓男女廁正上方：二樓男女廁',axis:'u',start:lowerWC.u0,end:lowerWC.u1,floor:2});
   }
   // All three bridges follow one straight central axis into the middle classroom corridor.
   const nine=layout(BUILDINGS_CONFIG.find(q=>q.id==='grade9-back'));
   for(const [index,id] of ['907','904','902'].entries()){
    const floor=index+1,y=index*H,room=nine.rooms.find(r=>r.id===id);
    const path=[world(0,-14.6,y),{...room.corridor}];
    const bridge={id:floor===1?'admin-rear':`admin-rear-${floor}`,floor,a:b.id,b:nine.id,targetRoom:id,path,start:path[0],end:path.at(-1)};externalLinks.push(bridge);
    for(let i=1;i<path.length;i++){
     const a=path[i-1],z=path[i],half=1.2;
     const x0=Math.min(a.x,z.x)-half,x1=Math.max(a.x,z.x)+half,z0=Math.min(a.z,z.z)-half,z1=Math.max(a.z,z.z)+half;
     const q=local(x0,z0),r=local(x1,z1),u0=Math.min(q.u,r.u),u1=Math.max(q.u,r.u),v0=Math.min(q.v,r.v),v1=Math.max(q.v,r.v);
     Object.assign(fp(floor,u0,u1,v0,v1),{part:'admin-grade9-bridge'});Object.assign(co(floor,u0,u1,v0,v1),{part:'admin-grade9-bridge'});
    }
   }
  }else if(p.shape==='grade9'){
   // Three equal classroom bays form the aerial-visible main body. Services
   // occupy the separate side tower instead of displacing the middle bay.
   const u0=-L/2,u1=L/2,serviceEnd=u1+11,stairStart=u1+3,roomV0=wallV,roomV1=-outerV;
   displayRows.push({id:'main',label:'三間教室主體',axis:'u',start:u0,end:u1},{id:'service',label:'側邊通廊・廁所・樓梯',axis:'u',start:u1,end:serviceEnd});
   for(let f=1;f<=b.floors;f++){
    Object.assign(fp(f,u0,u1,-D/2,D/2),{part:'grade9-classroom-body'});
    Object.assign(fp(f,u1,serviceEnd,-D/2,D/2),{part:'grade9-side-service'});
    co(f,u0,serviceEnd,outerV,wallV);
    const list=p.floors[f].filter(item=>item.kind==='room'),span=(u1-u0)/list.length;
    list.forEach((item,i)=>addCell(item,f,u0+i*span,u0+(i+1)*span,roomV0,roomV1,'main','v0',cV));
    addCell({kind:'passage',label:'側邊通廊'},f,u1,stairStart,outerV,wallV,'service');
    addCell({kind:'wc',label:'廁所'},f,u1,stairStart,wallV,-outerV,'service','v0',cV);
    addCell({kind:'stair',label:'南端樓梯'},f,stairStart,serviceEnd,wallV,wallV+5.2,'service');
   }
   addStair('south','九年級側邊連續樓梯',stairStart,serviceEnd,wallV,wallV+5.2,-1);
   entrances.push({floor:1,inside:world(0,cV),outside:world(0,outerV-1.2)},
    {floor:1,inside:world(u0+.6,cV),outside:world(u0-1.2,cV)},
    {floor:1,inside:world(serviceEnd-.6,cV),outside:world(serviceEnd+1.2,cV)});
  }else if(p.shape==='gym'){
   // Photo-confirmed 1F foyer/hall and 2F U-shaped balcony. The outer
   // shell height is independent of the number of usable floors.
   displayRows.push({id:'main',label:'活動中心前廳／主館／二樓看台',axis:'u',start:-L/2,end:L/2});
   fp(1,-18,18,-17,17);co(1,-15.4,10.8,14.2,17);
   const porch=fp(1,-11,11,17,20.5);porch.kind='porch';const access=fp(1,-10,-6,20.5,24.3);access.kind='porch';
   for(const centerU of [-14,14])Object.assign(fp(1,centerU-4,centerU+4,17,21.1),{kind:'tower',centerU,centerV:17.1,radius:4});
   fp(2,-18,18,7,17);fp(2,-18,-15,-17,7);fp(2,15,18,-17,7);
   co(2,-15.4,10.8,14.2,17);co(2,-18,18,7,9.2);co(2,-18,-15,-17,7);co(2,15,18,-17,7);
   addCell({kind:'room',id:'gym'},1,-15,15,-17,7,'main','v1',10.6);
   addCell({kind:'room',id:'weight-room'},1,-9,9,7,14.2,'main','v1',15.6);
   addCell({kind:'room',id:'fire-room'},1,15,17.5,1,4.5,'main','v1',5.9);
   addCell({kind:'room',id:'gym-balcony'},2,-10,10,7,10,'main','v1',10.6);
   for(const [id,u0,u1] of [['north',-18,-10],['south',10,18]]){
    addCell({kind:'stair',id,label:'活動中心圓塔樓梯'},1,u0,u1,9,14.2);
    addCell({kind:'stair',id,label:'活動中心圓塔樓梯'},2,u0,u1,9,14.2);
    const s=addStair(id,'活動中心'+(id==='north'?'北':'南')+'側樓梯',u0,u1,9,14.2);
    const extension={u0:u0+.8,u1:s.farU+.08,v0:13.9,v1:19.3};s.windowLanding=extension;
    holes.push({...extension});platforms.push({...rect(extension.u0,extension.u1,extension.v0,extension.v1),...extension,y:1.8,floor:1,stairId:s.id,kind:'windowLanding'});
   }
   for(let tier=0;tier<3;tier++)for(const [u0,u1] of [[-9,-1.2],[1.2,9]]){
    const v0=11+tier,v1=v0+1;platforms.push({...rect(u0,u1,v0,v1),u0,u1,v0,v1,y:H+.15*(tier+1),floor:2,kind:'bleacher'});
   }
   platforms.push({...rect(-14,14,-17,-13),u0:-14,u1:14,v0:-17,v1:-13,y:.6,floor:1,kind:'stage'});
   const stageStart=world(0,-11,0),stageEnd=world(0,-13,.6);
   ramps.push({...rect(-1,1,-13,-11),start:stageStart,end:stageEnd,h0:0,h1:.6,axis:'x',floor:1,stairId:'gym-stage'});
   for(const [v0,v1,y] of [[17,18.3,.12],[18.3,19,.08],[19,19.7,.04]])platforms.push({...rect(v0===17?-11:-5,v0===17?11:5,v0,v1),y,floor:1,kind:'porch'});
   const accessStart=world(-8,18.3,.12),accessEnd=world(-8,24.3,0);
   ramps.push({...rect(-10,-6,18.3,24.3),start:accessStart,end:accessEnd,h0:.12,h1:0,axis:'x',floor:1,stairId:'gym-access'});
   entrances.push({floor:1,inside:world(0,16),outside:world(0,21.3),path:[world(0,16),world(0,17),world(0,17.5,.12),world(0,18.3,.12),world(0,19,.08),world(0,19.7,.04),world(0,20.5),world(0,21.3)]});
  }else if(b.id==='art-building'){
   displayRows.push({id:'main',label:'圖面左 → 右',axis:'v',start:-D/2,end:D/2});
   const corridor0=-D/2+5.2,corridor1=corridor0+2.8,cv=(corridor0+corridor1)/2;
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,corridor0,corridor1);
    addCell({kind:'stair',id:'main',label:'西側樓梯'},f,-4,4,-D/2,corridor0,'main');
    addCell({kind:'passage',label:'走廊'},f,-L/2,L/2,corridor0,corridor1,'main');
    addCell({...b.rooms.find(r=>r.floor===f),kind:'room'},f,-L/2,L/2,corridor1,D/2,'main','v0',cv);
   }
   addStair('main','藝術館西側樓梯',-4,4,-D/2,corridor0,1);
   entrances.push({floor:1,inside:world(L/2-.6,cv),outside:world(L/2+1.2,cv)});
  }else if(!p.shape){
   displayRows.push({id:'main',label:horizontal?'圖面左 → 右':'圖面上 → 下',axis:'u',start:-L/2,end:L/2});
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,Math.min(wallV,outerV),Math.max(wallV,outerV));
    const items=p.floors[f],fixed=items.reduce((n,c)=>n+(c.len||0),0),unit=(L-fixed)/items.reduce((n,c)=>n+(c.len?0:c.units||1),0);let u=-L/2;
    for(const item of items){const u1=u+(item.len||unit*(item.units||1));
     const back=-outerV,v0=Math.min(back,wallV),v1=Math.max(back,wallV);
     const roomEnd=p.sideEntrance&&f===1&&item.kind==='room'?Math.min(u1,L/2-p.sideEntrance.width):u1;
     addCell(item,f,u,roomEnd,item.kind==='stair'?-D/2:v0,item.kind==='stair'?D/2:v1,'main',sign===1?'v1':'v0',cV);
     if(item.kind==='stair'&&f===1)addStair(item.id,item.label,u,u1,Math.min(wallV,wallV-sign*5.2),Math.max(wallV,wallV-sign*5.2));
     if(item.kind==='passage')co(f,u,u1,-D/2,D/2);
     u=u1;
    }
    if(f===1){entrances.push({floor:1,kind:p.sideEntrance?'main':undefined,inside:world(0,cV),outside:world(0,outerV+sign*1.2)});
     // Corridor ends are usable entrances and inter-wing connections.
     if(p.sideEntrance){
      co(1,L/2-p.sideEntrance.width,L/2,-D/2,D/2);
      entrances.push({floor:1,kind:'side',inside:world(L/2-p.sideEntrance.width/2,p.sideEntrance.v),outside:world(L/2+1.4,p.sideEntrance.v)});
     }else for(const side of [-1,1])entrances.push({floor:1,inside:world(side*(L/2-.6),cV),outside:world(side*(L/2+1.2),cV)});
    }
   }
  }else{
   // The non-linear wings preserve the central outdoor space. Rectangles are proportional.
   const a=-L/2,A=L/2,d=-D/2,B=D/2;
   if(p.shape==='new7'){
    const vSplit=B-6,west=a+8,wing=A-8,mainEnd=wing;
    displayRows.push({id:'main',label:'主翼・圖面左 → 右',axis:'u',start:a,end:mainEnd},{id:'east',label:'右翼・圖面上 → 下',axis:'v',start:d,end:B});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,A,d,B);co(f,a,A,vSplit,B);co(f,wing,A,d,B);
     const list=b.rooms.filter(r=>r.floor===f),byCode=code=>list.find(r=>r.spaceCode===code);
     const prefix=f===1?'A1':f===2?'A2':'A3',w=(mainEnd-west)/3;
     addCell({kind:'stair',id:'west',label:'西側樓梯（示意）'},f,a,west,d,vSplit,'main');
     if(f===1){addCell({kind:'passage',label:'廣場'},f,west,west+w,d,vSplit,'main');}
     else addCell({...byCode(prefix+'1'),kind:'room'},f,west,west+w,d,vSplit,'main','v1',(B+vSplit)/2);
     for(let i=2;i<=3;i++)addCell({...byCode(prefix+i),kind:'room'},f,west+(i-1)*w,west+i*w,d,vSplit,'main','v1',(B+vSplit)/2);
     const mid=(d+B)/2;
     for(const [last,v0,v1] of [['4',d,mid],['5',mid,B]])addCell({...byCode(prefix+last),kind:'room'},f,wing+2.8,A,v0,v1,'east','u0',wing+1.4);
     // 圖面廁所在獨立外側區塊；未量定座標前不在教室範圍內生成重疊空間。
    }
    addStair('west','西側示意樓梯',a,west,vSplit-5.2,vSplit,1,p.confidence);
    entrances.push({floor:1,inside:world(0,(B+vSplit)/2),outside:world(0,B+1.2)});
   }
   if(p.shape==='multi'){
    const left=d,right=B,east=B-6,inner=east-2.8,north=a+9,south=A-9;
    displayRows.push({id:'north',label:'北翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'east',label:'東翼・圖面上 → 下',axis:'u',start:a,end:A},{id:'south',label:'南翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'history',label:'校史室獨立區',axis:'v',start:left,end:right});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,north,left,east);fp(f,south,A,left,right);fp(f,a,A,inner,right);
     co(f,north-2.8,north,left,right);co(f,south,south+2.8,left,east);co(f,a,A,inner,east);
     // Keep a body-width passage between the library wall and south stair shaft.
     co(f,south,south+8,east,east+1.4);
     const byId=id=>({...b.rooms.find(r=>r.id===id),kind:'room'});
     if(f===1){
      addCell(byId('food-classroom'),f,a,north-2.8,left,east,'north','u1',north-1.4);
      addCell(byId('library'),f,south+2.8,A,left,east,'south','u0',south+1.4);
      for(const [id,u0,u1] of [['sped-614',north,north+(south-north)/3],['sped-office',north+(south-north)/3,north+2*(south-north)/3],['sped-612',north+2*(south-north)/3,south]])addCell(byId(id),f,u0,u1,east,right,'east','v0',east-1.4);
      // Separate history room stays detached from the parking courtyard.
      const h=addCell(byId('history-room'),f,a-6,a-1,right-7,right,'history','u1',a-.2);
      fp(f,a-6,a,right-7,right);co(f,a-1,a,right-7,right);
      entrances.push({floor:1,inside:h.corridor,outside:world(a+.7,(h.v0+h.v1)/2)});
     }else{
      const w=(east-left)/3;
      for(const [i,id] of ['large-computer','multi-622','it-server'].entries())addCell(byId(id),f,south+2.8,A,left+i*w,left+(i+1)*w,'south','u0',south+1.4);
      addCell(byId('collab-conf'),f,(north+south)/2,south,east,right,'east','v0',east-1.4);
      addCell({kind:'void',label:'上方未標示教室'},f,a,north,left,east,'north');
     }
     for(const u0 of [a,south])addCell({kind:'stair',label:'停車場側樓梯'},f,u0,u0+8,east+1,right,'east');
     addCell({kind:'wc',label:'廁所'},f,south+8,A,east,right,'east','v0',east-1.4);
     addCell({kind:'void',label:'停車場・留空'},f,north,south,left,inner,'parking');
    }
    // Stairwells sit at the ends of the courtyard's east circulation strip.
    addStair('north','停車場東北側梯',a,a+8,east+1,right,-1);addStair('south','停車場東南側梯',south,south+8,east+1.6,right,-1);
    entrances.push({floor:1,inside:world(south+1.4,left+1),outside:world(south+1.4,left-1.2)});
   }
   if(p.shape==='tech'){
    // A broad main body and one projecting narrow wing, as in the aerials.
    // Room IDs survive; the previous north/east/south courtyard is removed.
    const join=0,c0=B-8,c1=c0+2.8,cv=(c0+c1)/2,stairEnd=a+8;
    displayRows.push({id:'main',label:'寬主體',axis:'u',start:a,end:join},{id:'wing',label:'綠窗帶長翼',axis:'u',start:join,end:A});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,join,d,B);fp(f,join,A,c0,B);co(f,a,A,c0,c1);
     const byId=id=>({...b.rooms.find(r=>r.id===id),kind:'room'}),ids=f===1?['audiovisual-1f','life-tech-1','tech-sw-1']:['tech-nw-2','physics-lab','maker-lab'];
     const unit=(join-a)/3;
     ids.forEach((id,i)=>addCell(byId(id),f,a+i*unit,a+(i+1)*unit,d,c0,'main','v1',cv));
     addCell({kind:'stair',label:'科技館樓梯'},f,a,stairEnd,c1,B,'main');
     addCell({kind:'wc',label:'廁所'},f,stairEnd,join,c1,B,'main','v0',cv);
     const wing=f===1?['life-tech-2','computer-lab-1']:['tech-smart','computer-lab-2'];
     const span=(A-join)/wing.length;wing.forEach((id,i)=>addCell(byId(id),f,join+i*span,join+(i+1)*span,c1,B,'wing','v0',cv));
    }
    addStair('main','科技館主體樓梯',a,stairEnd,c1,B,1);
    entrances.push({floor:1,inside:world(a+.6,cv),outside:world(a-1.2,cv)},{floor:1,inside:world(A-.6,cv),outside:world(A+1.2,cv)});
   }
  }
  const bounds={x0:Math.min(...footprints.map(p=>p.rect.x0)),x1:Math.max(...footprints.map(p=>p.rect.x1)),z0:Math.min(...footprints.map(p=>p.rect.z0)),z1:Math.max(...footprints.map(p=>p.rect.z1))};
  return{id:b.id,b,facadeFeatures:p.shape==='tech'?{roundedNose:{u:0,v:D/2,radius:1.4}}:null,horizontal,L,D,sign,cV,wallV,outerV,world,local,rect,bounds,cells,corridors,footprints,displayRows,stairs,ramps,platforms,holes,externalLinks,rooms:cells.filter(c=>c.kind==='room'),entrances,entrance:entrances[0]?.outside,confidence:p.confidence||'依平面圖房間順序；未測量尺度'};
 }
 function groundAt(l,x,z,currentY){
  const {u,v}=l.local(x,z);let best=0;
  for(const p of l.footprints){const y=(p.floor-1)*H;
   if(y<=currentY+.35&&contains(p,u,v)&&(p.floor===1||!l.holes.some(h=>onFloor(h,p.floor)&&contains(h,u,v))))best=Math.max(best,y);
  }
  for(const p of l.platforms)if(x>=p.x0-eps&&x<=p.x1+eps&&z>=p.z0-eps&&z<=p.z1+eps&&p.y<=currentY+.35)best=Math.max(best,p.y);
  for(const r of l.ramps)if(x>=r.x0-eps&&x<=r.x1+eps&&z>=r.z0-eps&&z<=r.z1+eps){
   const start=r.axis==='x'?r.start.x:r.start.z,end=r.axis==='x'?r.end.x:r.end.z,t=Math.max(0,Math.min(1,((r.axis==='x'?x:z)-start)/(end-start))),y=r.h0+t*(r.h1-r.h0);
   if(y<=currentY+.35)best=Math.max(best,y);
  }
  return best;
 }
 // Kept as an empty compatibility API: administrative circulation now lives in one layout.
 function galleries(){return []}
 function junctions(layouts){
  const a=layouts.find(l=>l.id==='grade8-mid'),b=layouts.find(l=>l.id==='grade8-front');if(!a||!b)return [];
  const result=[];
  for(let floor=1;floor<=Math.min(a.b.floors,b.b.floors);floor++){
   const c=a.corridors.find(c=>c.floor===floor),r=c.rect,x=(r.x0+r.x1)/2,z=a.bounds.z1,y=(floor-1)*H;
   if(Math.abs(z-b.bounds.z0)>.01)continue;
   result.push({floor,a:a.id,b:b.id,start:{x,y,z:z-.6},end:{x,y,z:z+.6}});
  }
  const admin=layouts.find(l=>l.id==='admin-front');
  result.push(...(admin?.externalLinks||[]));
  return result;
 }
 function ribbon(points,width=.28){
  const vertices=[];
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<1e-6)continue;
   const nx=-dz/len*width,nz=dx/len*width,A=[a.x+nx,a.y-.55,a.z+nz],B=[a.x-nx,a.y-.55,a.z-nz],C=[b.x+nx,b.y-.55,b.z+nz],D=[b.x-nx,b.y-.55,b.z-nz];
   vertices.push(...A,...B,...C,...B,...D,...C);
  }
  return vertices;
 }
 return{layout,groundAt,contains,onFloor,galleries,junctions,ribbon};
})();
