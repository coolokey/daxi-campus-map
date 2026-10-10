/* Geometry compiler shared by scene, physics, navigation, classroom matrix and map. */
const CampusSpatialPlan = (() => {
 const H=3.6,eps=1e-6;
 const contains=(r,u,v)=>u>=r.u0-eps&&u<=r.u1+eps&&v>=r.v0-eps&&v<=r.v1+eps;
 function layout(b){
  const p=b.spatialProfile;if(!p)return null;
  const horizontal=p.shape==='tech'||b.id==='art-building'?false:b.width>=b.depth,L=horizontal?b.width:b.depth,D=horizontal?b.depth:b.width,sign=p.sign||1;
  const world=(u,v,y=0)=>horizontal?{x:b.x+u,z:b.z+v,y}:{x:b.x+v,z:b.z+u,y};
  const rect=(u0,u1,v0,v1)=>{const a=world(u0,v0),c=world(u1,v1);return{x0:Math.min(a.x,c.x),x1:Math.max(a.x,c.x),z0:Math.min(a.z,c.z),z1:Math.max(a.z,c.z)}};
  const local=(x,z)=>horizontal?{u:x-b.x,v:z-b.z}:{u:z-b.z,v:x-b.x};
  const cells=[],corridors=[],footprints=[],stairs=[],ramps=[],platforms=[],holes=[],entrances=[],displayRows=[];
  const addRect=(target,r)=>{const a={...r,rect:rect(r.u0,r.u1,r.v0,r.v1)};target.push(a);return a};
  function addCell(item,floor,u0,u1,v0,v1,row='main',doorSide='v1',corridorValue){
   const r=item.kind==='room'?b.rooms.find(r=>r.id===item.id):null;
   const c=addRect(cells,{...item,...r,id:item.id||`${b.id}-${item.kind}-${floor}-${cells.length}`,floor,u0,u1,v0,v1,row,span:u1-u0,spaceCode:r?.spaceCode||item.spaceCode||'',label:item.label||r?.name||'',kind:item.kind});
   if(item.kind==='room'||item.kind==='wc'){
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
   const cv=(v0+v1)/2,far=u0+.8,near=u1-1,inner=u1-.7;
   s.farU=far;s.nearU=near;s.innerU=inner;s.centerV=cv;s.sign=side;
   s.hole={u0:u0+.2,u1:near,v0:cv-2.3,v1:cv+2.3};holes.push(s.hole);
   for(let f=1;f<b.floors;f++){
    const y=(f-1)*H;
    for(const [start,end] of [[world(near,cv+side*1.25,y),world(far,cv+side*1.25,y+H/2)],[world(far,cv-side*1.25,y+H/2),world(near,cv-side*1.25,y+H)]]){
     const bounds=horizontal?{x0:Math.min(start.x,end.x),x1:Math.max(start.x,end.x),z0:start.z-.8,z1:start.z+.8}:{x0:start.x-.8,x1:start.x+.8,z0:Math.min(start.z,end.z),z1:Math.max(start.z,end.z)};
     ramps.push({...bounds,start,end,h0:start.y,h1:end.y,axis:horizontal?'x':'z',floor:f,stairId:s.id});
    }
    platforms.push({...rect(u0+.2,far+.08,cv-2.3,cv+2.3),y:y+H/2,floor:f,stairId:s.id});
   }
   return s;
  }
  const outerV=sign*D/2,wallV=sign*(D/2-2.8),cV=sign*(D/2-1.4);
  if(b.id==='art-building'){
   displayRows.push({id:'main',label:'圖面左 → 右',axis:'v',start:-D/2,end:D/2});
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,-2,1);
    addCell({kind:'stair',id:'main',label:'西側樓梯'},f,-3,3,-D/2,-2,'main');
    addCell({kind:'passage',label:'走廊'},f,-L/2,L/2,-2,1,'main');
    addCell({...b.rooms.find(r=>r.floor===f),kind:'room'},f,-L/2,L/2,1,D/2,'main','v0',-.5);
   }
   addStair('main','藝術館西側樓梯',-3,3,-D/2,-2,1);
   entrances.push({floor:1,inside:world(L/2-.6,-.5),outside:world(L/2+1.2,-.5)});
  }else if(!p.shape){
   displayRows.push({id:'main',label:horizontal?'圖面左 → 右':'圖面上 → 下',axis:'u',start:-L/2,end:L/2});
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,Math.min(wallV,outerV),Math.max(wallV,outerV));
    const items=p.floors[f],fixed=items.reduce((n,c)=>n+(c.len||0),0),unit=(L-fixed)/items.reduce((n,c)=>n+(c.len?0:c.units||1),0);let u=-L/2;
    for(const item of items){const u1=u+(item.len||unit*(item.units||1));
     const back=-outerV,v0=Math.min(back,wallV),v1=Math.max(back,wallV);
     addCell(item,f,u,u1,item.kind==='stair'?-D/2:v0,item.kind==='stair'?D/2:v1,'main',sign===1?'v1':'v0',cV);
     if(item.kind==='stair'&&f===1)addStair(item.id,item.label,u,u1,-D/2,D/2);
     if(item.kind==='passage')co(f,u,u1,-D/2,D/2);
     u=u1;
    }
    if(f===1){entrances.push({floor:1,inside:world(0,cV),outside:world(0,outerV+sign*1.2)});
     // Corridor ends are usable entrances and inter-wing connections.
     for(const side of [-1,1])entrances.push({floor:1,inside:world(side*(L/2-.6),cV),outside:world(side*(L/2+1.2),cV)});
    }
   }
  }else{
   // The non-linear wings preserve the central outdoor space. Rectangles are proportional.
   const a=-L/2,A=L/2,d=-D/2,B=D/2;
   if(p.shape==='new7'){
    const vSplit=B-6,west=a+6,wing=A-8,mainEnd=wing;
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
    addStair('west','西側示意樓梯',a,west,d,B,1,p.confidence);
    entrances.push({floor:1,inside:world(0,(B+vSplit)/2),outside:world(0,B+1.2)});
   }
   if(p.shape==='multi'){
    const left=d,right=B,east=B-6,inner=east-2.8,north=a+7,south=A-7;
    displayRows.push({id:'north',label:'北翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'east',label:'東翼・圖面上 → 下',axis:'u',start:a,end:A},{id:'south',label:'南翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'history',label:'校史室獨立區',axis:'v',start:left,end:right});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,north,left,east);fp(f,south,A,left,right);fp(f,a,A,inner,right);
     co(f,north-2.8,north,left,right);co(f,south,south+2.8,left,right);co(f,a,A,inner,east);
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
     for(const u0 of [a,south])addCell({kind:'stair',label:'停車場側樓梯'},f,u0,u0+6,east+1,right,'east');
     addCell({kind:'wc',label:'廁所'},f,south+6,A,east,right,'east','v0',east-1.4);
     addCell({kind:'void',label:'停車場・留空'},f,north,south,left,inner,'parking');
    }
    // Stairwells sit at the ends of the courtyard's east circulation strip.
    addStair('north','停車場東北側梯',a,a+6,east+1,right,-1);addStair('south','停車場東南側梯',south,south+6,east+1,right,-1);
    entrances.push({floor:1,inside:world(south+1.4,left+1),outside:world(south+1.4,left-1.2)});
   }
   if(p.shape==='tech'){
    const east=B-5,inner=east-2.8,north=a+6,south=A-6;
    displayRows.push({id:'north',label:'北翼・圖面左 → 右',axis:'v',start:d,end:B},{id:'east',label:'東翼・圖面上 → 下',axis:'u',start:a,end:A},{id:'south',label:'南翼・圖面左 → 右',axis:'v',start:d,end:B});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,north,d,B);fp(f,south,A,d,B);fp(f,a,A,inner,B);co(f,north-2.8,north,d,B);co(f,south,south+2.8,d,B);co(f,a,A,inner,east);
     const byId=id=>({...b.rooms.find(r=>r.id===id),kind:'room'}),half=(d+inner)/2;
     if(f===1){addCell(byId('audiovisual-1f'),f,a,north-2.8,d,half,'north','u1',north-1.4);addCell(byId('life-tech-1'),f,a,north-2.8,half,inner,'north','u1',north-1.4);}
     else{addCell(byId('tech-nw-2'),f,a,north-2.8,d,d+(inner-d)*.25,'north','u1',north-1.4);addCell(byId('physics-lab'),f,a,north-2.8,d+(inner-d)*.25,inner,'north','u1',north-1.4);}
     addCell(byId(f===1?'tech-sw-1':'maker-lab'),f,south+2.8,A,d,inner-6,'south','u0',south+1.4);
     addCell({kind:'wc',label:'廁所'},f,south+2.8,A,inner-6,inner-3,'south','u0',south+1.4);
     addCell({kind:'stair',label:'科技館樓梯'},f,south,A,east-1,B,'south');
     const mid=(a+A)/2;
     addCell(byId(f===1?'life-tech-2':'tech-smart'),f,a,mid,east,B,'east','v0',east-1.4);
     addCell(byId(f===1?'computer-lab-1':'computer-lab-2'),f,mid,south,east,B,'east','v0',east-1.4);
     addCell({kind:'passage',label:'通廊'},f,north,south,d,inner,'courtyard');
    }
    addStair('main','科技館南翼樓梯',south,A,east-1,B,-1);
    entrances.push({floor:1,inside:world(north-1.4,d+1),outside:world(north-1.4,d-1.2)},{floor:1,inside:world(south+1.4,d+1),outside:world(south+1.4,d-1.2)});
   }
  }
  const bounds={x0:Math.min(...footprints.map(p=>p.rect.x0)),x1:Math.max(...footprints.map(p=>p.rect.x1)),z0:Math.min(...footprints.map(p=>p.rect.z0)),z1:Math.max(...footprints.map(p=>p.rect.z1))};
  return{id:b.id,b,horizontal,L,D,sign,cV,wallV,outerV,world,local,rect,bounds,cells,corridors,footprints,displayRows,stairs,ramps,platforms,holes,rooms:cells.filter(c=>c.kind==='room'),entrances,entrance:entrances[0]?.outside,confidence:p.confidence||'依平面圖房間順序；未測量尺度'};
 }
 function groundAt(l,x,z,currentY){
  const {u,v}=l.local(x,z);let best=0;
  for(const p of l.footprints){const y=(p.floor-1)*H;
   if(y<=currentY+.35&&contains(p,u,v)&&(p.floor===1||!l.holes.some(h=>contains(h,u,v))))best=Math.max(best,y);
  }
  for(const p of l.platforms)if(x>=p.x0-eps&&x<=p.x1+eps&&z>=p.z0-eps&&z<=p.z1+eps&&p.y<=currentY+.35)best=Math.max(best,p.y);
  for(const r of l.ramps)if(x>=r.x0-eps&&x<=r.x1+eps&&z>=r.z0-eps&&z<=r.z1+eps){
   const start=r.axis==='x'?r.start.x:r.start.z,end=r.axis==='x'?r.end.x:r.end.z,t=Math.max(0,Math.min(1,((r.axis==='x'?x:z)-start)/(end-start))),y=r.h0+t*(r.h1-r.h0);
   if(y<=currentY+.35)best=Math.max(best,y);
  }
  return best;
 }
 function galleries(layouts){
  const front=layouts.find(l=>l.id==='admin-front'),back=layouts.find(l=>l.id==='admin-back');
  if(!front||!back)return [];
  const x=front.bounds.x0-1.8,z0=back.b.z+back.cV,z1=front.b.z+front.cV,footprints=[],paths=[],rails=[];
  for(let floor=1;floor<=Math.min(front.b.floors,back.b.floors);floor++){
   const y=(floor-1)*H,rects=[{x0:x-1.4,x1:x+1.4,z0,z1},{x0:x-1.4,x1:front.bounds.x0+1.4,z0:z0-1.4,z1:z0+1.4},{x0:x-1.4,x1:front.bounds.x0+1.4,z0:z1-1.4,z1:z1+1.4}];
   for(const rect of rects)footprints.push({floor,u0:rect.x0,u1:rect.x1,v0:rect.z0,v1:rect.z1,rect});
   paths.push({floor,points:[back.world(-back.L/2+.6,back.cV,y),{x,y,z:z0},{x,y,z:z1},front.world(-front.L/2+.6,front.cV,y)]});
   if(floor>1)for(const side of [-1,1])rails.push({floor,u0:x+side*1.4-.06,u1:x+side*1.4+.06,v0:z0+1.4,v1:z1-1.4});
  }
  const bounds={x0:x-1.4,x1:front.bounds.x0+1.4,z0:z0-1.4,z1:z1+1.4};
  return[{id:'admin-gallery',b:{id:'admin-gallery',name:'行政大樓連通廊',floors:front.b.floors,rooms:[]},bounds,horizontal:true,world:(u,v,y=0)=>({x:u,z:v,y}),local:(x,z)=>({u:x,v:z}),rect:(u0,u1,v0,v1)=>({x0:u0,x1:u1,z0:v0,z1:v1}),cells:[],rooms:[],stairs:[],ramps:[],holes:[],platforms:[],entrances:[],footprints,corridors:footprints,paths,rails,displayRows:[]}];
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
 return{layout,groundAt,contains,galleries,ribbon};
})();
