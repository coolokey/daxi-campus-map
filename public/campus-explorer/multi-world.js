/* DSC05984–DSC06131: white tiled asymmetric wings around an open west court.
 * Photo proportions are schematic; room identities and shared circulation survive.
 * Built before collision indexes, so actual flower beds and tower skins are solid.
 */
const CampusMultiWorld={
 windowBand(s,f){return s.id.endsWith('north')?(f===1?null:[1.05,2.65]):(f===1?[1.9,3.1]:[1.05,2.65]);},
 build({l,scene,floorMeshes,box,surfaceMaterials}){
  const c=surfaceMaterials(l),mat=color=>new THREE.MeshStandardMaterial({color,roughness:.95});
  const white=mat(0xd7dcd5),red=mat(0xa76f63),brick=mat(0x936d64),blue=mat(0x447e9e),line=mat(0xe3e4d6),green=mat(0x52704a),pink=mat(0xc28a9f);
  const group=(name,floor=1,roof=false)=>{const g=new THREE.Group();g.name=name;g.userData={buildingId:l.id,floorNum:floor,...(roof?{campusCeiling:true}:{})};scene.add(g);floorMeshes.push(g);return g;};
  const B=(g,u0,u1,v0,v1,y0,y1,m,solid=false)=>box(g,l,u0,u1,v0,v1,y0,y1,m,solid);
  const tileCanvas=document.createElement('canvas');tileCanvas.width=tileCanvas.height=128;
  const ctx=tileCanvas.getContext('2d');if(ctx){ctx.fillStyle='#d9ddd6';ctx.fillRect(0,0,128,128);ctx.strokeStyle='#bdc4bd';ctx.lineWidth=1;for(let i=0;i<=128;i+=16){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,128);ctx.moveTo(0,i);ctx.lineTo(128,i);ctx.stroke();}}
  const tileMap=new THREE.CanvasTexture(tileCanvas);tileMap.wrapS=tileMap.wrapT=THREE.RepeatWrapping;tileMap.repeat.set(3,3);
  const tiled=new THREE.MeshStandardMaterial({map:tileMap,color:0xffffff,roughness:.97});
  c.wall.map=tileMap;c.exterior.map=tileMap;
  const left=-l.D/2,east=l.D/2-6,north=-l.L/2+9,south=l.L/2-9;
  // The north classroom has no second storey. Its roof belongs to 1F filtering.
  const northRoof=group('multi-north-single-storey-roof',1,true);
  B(northRoof,-l.L/2,north,left,east,3.45,3.65,white);
  const top=group('multi-south-and-east-roof',2,true);
  for(const p of l.footprints.filter(p=>p.floor===2))B(top,p.u0,p.u1,p.v0,p.v1,7.04,7.2,white);
  // Waved fascia are short curved bays, following the courtyard photographs.
  for(const f of [1,2]){
   const g=group('multi-wave-fascia-'+f,f),y=f*3.6;
   for(const side of f===1?[-1,1]:[1]){
    const u=side<0?north:south,step=(east-left)/6;
    for(let bay=0;bay<6;bay++){
     const a=left+bay*step;
     for(let i=0;i<12;i++){const v0=a+i*step/12,v1=v0+step/12+.008,depth=.27+.35*Math.sin(Math.PI*(i+.5)/12);B(g,u-(side>0?depth:.03),u+(side<0?depth:.03),v0,v1,y-.48,y+.08,tiled);}
     // Thin piers stay at the outer edge, clear of the corridor center line.
     B(g,u-.12,u+.12,a-.11,a+.11,(f-1)*3.6,y-.47,c.blue,true);
    }
    B(g,u-.12,u+.12,east-.11,east+.11,(f-1)*3.6,y-.47,c.blue,true);
   }
  }
  // Photo-supported mosaic skirts and cream upper sunshades. Door openings
  // are explicitly omitted; these panels follow the existing room wall faces.
  for(const f of [1,2]){
   const facade=group('multi-photo-wall-details-'+f,f),paints=[mat(0xb1b889),mat(0xb99885),mat(0x91aeb2),mat(0xc2b895)],cream=mat(0xcac7b0);
   for(const room of l.rooms.filter(r=>r.floor===f&&r.doorSide?.startsWith('u')&&r.row!=='history')){
    const u=room.doorSide==='u0'?room.u0-.11:room.u1+.11,door=l.local(room.door.x,room.door.z).v;
    for(let v=room.v0+.35;v<room.v1-.9;v+=1.25){if(Math.abs(v+.5-door)<1.55)continue;
     if(f===1)for(let i=0;i<4;i++)B(facade,u-.018,u+.018,v+i*.22,v+i*.22+.2,.3,.83-(i%2)*.13,paints[i]);
     else for(let y=4.85;y<6.18;y+=.14)B(facade,u-.024,u+.024,v,v+.98,y,y+.09,cream);
    }
   }
  }
  // Two bowed stair fronts wrap around the real, walkable stair shafts.
  for(const [index,s] of l.stairs.entries())for(const f of [1,2]){
   const g=group('multi-rounded-'+(index===0?'north':'south')+(f===1?'':'-upper'),f),y=(f-1)*3.6,center=(s.u0+s.nearU-.14)/2,r=(s.nearU-.14-s.u0)/2;
   const bow=u=>s.v0-2.5*Math.sqrt(Math.max(0,1-((u-center)/r)**2));
   const band=this.windowBand(s,f),n=32,towerRoof=f===2?group('multi-tower-roof-'+(index===0?'north':'south'),2,true):null;
   for(let i=0;i<n;i++){
    const u0=s.u0+i*2*r/n,u1=s.u0+(i+1)*2*r/n,v=bow((u0+u1)/2),proxy=B(g,u0,u1,v-.065,v+.065,y,y+3.6,tiled,true);
    if(band){proxy.visible=false;B(g,u0,u1,v-.07,v+.07,y,y+band[0],tiled);B(g,u0,u1,v-.07,v+.07,y+band[1],y+3.6,tiled);B(g,u0,u1,v-.04,v+.04,y+band[0],y+band[1],c.glass);if(i%2===0)B(g,u0,u0+.035,v-.09,v+.09,y+band[0],y+band[1],white);B(g,u0,u1,v-.09,v+.09,y+(band[0]+band[1])/2-.025,y+(band[0]+band[1])/2+.025,white);}
    if(f===2){const h=index===0?7.65:8.25;B(towerRoof,u0,u1,v-.07,s.v0,7.2,h,tiled);B(towerRoof,u0,u1,v-.12,s.v1+.1,h,h+.13,red);}
   }
   if(f===1){
    // Faded colored mosaic tiles suggest the child/balloon murals, without
    // reproducing people or inventing readable school signage.
    const paints=[mat(0xafba82),mat(0xc39f88),mat(0x96b5ba),mat(0xc7b889)];
    for(let i=0;i<16;i++){const u=center-2+i*.25,v=bow(u)-.09;B(g,u,u+.23,v-.025,v+.025,.3+(i%3)*.15,.65+(i%4)*.12,paints[i%4]);}
   }
  }
  // Courtyard paving: interlocking pavers and faded rectangular parking bays.
  const paving=group('multi-courtyard-paving'),canvas=document.createElement('canvas');canvas.width=canvas.height=256;const pctx=canvas.getContext('2d');
  if(pctx){pctx.fillStyle='#a8a393';pctx.fillRect(0,0,256,256);for(let row=0;row<16;row++)for(let col=-1;col<9;col++){pctx.fillStyle=['#b4ae9e','#a6a393','#aaa696'][(row*3+col+12)%3];pctx.fillRect(col*32+(row%2)*16+1,row*16+1,30,14);}}
  const pmap=new THREE.CanvasTexture(canvas);pmap.wrapS=pmap.wrapT=THREE.RepeatWrapping;pmap.repeat.set(5,3);
  B(paving,north,south,left-2,east-2.8,.047,.062,new THREE.MeshStandardMaterial({map:pmap,roughness:1}));
  const mark=mat(0xa57d71);
  for(let v=left+1;v<east-6;v+=4){for(const u of [north+1,south-1])B(paving,u-.035,u+.035,v,v+3.5,.063,.072,mark);B(paving,north+1,south-1,v-.035,v+.035,.063,.072,mark);}
  const bay=group('multi-accessible-bay'),u0=north+.7,u1=north+3.8,v0=east-8,v1=east-3;
  B(bay,u0,u1,v0,v1,.075,.083,blue);for(const u of [u0,u1])B(bay,u-.035,u+.035,v0,v1,.084,.09,line);for(const v of [v0,v1])B(bay,u0,u1,v-.035,v+.035,.084,.09,line);
  const icon=document.createElement('canvas');icon.width=icon.height=128;const ictx=icon.getContext('2d');if(ictx){ictx.fillStyle='#f1f1df';ictx.font='100px sans-serif';ictx.textAlign='center';ictx.textBaseline='middle';ictx.fillText('♿',64,66);}
  const im=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(icon),transparent:true,depthWrite:false})),ip=l.world((u0+u1)/2,(v0+v1)/2);im.rotation.x=-Math.PI/2;im.position.set(ip.x,.095,ip.z);bay.add(im);
  // The low court-side bed stops before the south entrance and never seals it.
  const bed=group('multi-court-flowerbed');B(bed,north+.5,south-3,left-2.4,left-1.1,0,.38,brick,true);B(bed,north+.6,south-3.1,left-2.3,left-1.2,.38,.44,green);
  for(let u=north+.8;u<south-3.3;u+=.45)for(const v of [left-2.05,left-1.55]){const flower=new THREE.Mesh(new THREE.SphereGeometry(.13,5,4),pink),p=l.world(u,v);flower.position.set(p.x,.53,p.z);bed.add(flower);}
  for(let u=north+.6;u<south-3.1;u+=.45)B(bed,u,u+.018,left-2.405,left-2.395,.03,.35,c.grout);
 }
};
