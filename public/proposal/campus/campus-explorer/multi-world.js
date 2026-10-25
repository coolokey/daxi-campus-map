/* DSC05984–DSC06131: white tiled asymmetric wings around an open west court.
 * Photo proportions are schematic; room identities and shared circulation survive.
 * Built before collision indexes, so actual flower beds and tower skins are solid.
 */
const CampusMultiWorld={
 windowBand(s,f){return s.id.endsWith('north')?(f===1?null:[.1,1.4]):(f===1?[1.9,3.1]:[1.05,2.65]);},
 build({l,scene,floorMeshes,box,surfaceMaterials}){
  const c=surfaceMaterials(l),mat=color=>new THREE.MeshStandardMaterial({color,roughness:.95});
  const white=mat(0xd7dcd5),red=mat(0xa76f63),brick=mat(0x936d64),blue=mat(0x447e9e),line=mat(0xe3e4d6),green=mat(0x52704a),pink=mat(0xc28a9f);
  const group=(name,floor=1,roof=false)=>{const g=new THREE.Group();g.name=name;g.userData={buildingId:l.id,floorNum:floor,...(roof?{campusCeiling:true}:{})};scene.add(g);floorMeshes.push(g);return g;};
  const B=(g,u0,u1,v0,v1,y0,y1,m,solid=false)=>box(g,l,u0,u1,v0,v1,y0,y1,m,solid);
  const tileCanvas=document.createElement('canvas');tileCanvas.width=tileCanvas.height=128;
  const ctx=tileCanvas.getContext('2d');if(ctx){ctx.fillStyle='#d9ddd6';ctx.fillRect(0,0,128,128);ctx.strokeStyle='#bdc4bd';ctx.lineWidth=1;for(let i=0;i<=128;i+=16){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,128);ctx.moveTo(0,i);ctx.lineTo(128,i);ctx.stroke();}}
  const tileMap=new THREE.CanvasTexture(tileCanvas);tileMap.wrapS=tileMap.wrapT=THREE.RepeatWrapping;tileMap.repeat.set(1,1);
  const tiled=new THREE.MeshStandardMaterial({map:tileMap,color:0xffffff,roughness:.97});
  c.wall.map=tileMap;c.exterior.map=tileMap;
  const left=-l.D/2,east=6,north=-l.L/2+9,south=l.L/2-9;
  // The north classroom has no second storey. Its roof belongs to 1F filtering.
  const northRoof=group('multi-north-single-storey-roof',1,true);
  B(northRoof,-l.L/2,north,left,east,3.45,3.65,mat(0xbdcdd0));
  const top=group('multi-south-and-east-roof',2,true);
  for(const p of l.footprints.filter(p=>p.floor===2&&(p.part==='south-wing'||p.part==='rear-upper-room'||p.u0===11.8)))B(top,p.u0,p.u1,p.v0,p.v1,7.04,7.2,white);
  const low=group('multi-low-connector-roof',1,true);B(low,-3,3,6,14.2,3.45,3.6,white);
  const historyRoof=group('multi-history-flat-roof',1,true);B(historyRoof,-23,-18,9,16,3.45,3.65,mat(0xb0b6af));
  for(const u of [-22.9,-18.1])B(historyRoof,u-.06,u+.06,9,16,3.65,3.95,white);
  for(const v of [9.1,15.9])B(historyRoof,-23,-18,v-.06,v+.06,3.65,3.95,white);
  for(let v=-14;v<5;v+=3)B(top,15.8,16.05,v-.13,v+.13,7.2,7.8,mat(0x626b64));
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
  // True curved surfaces, not disconnected boxes: each nose projects into
  // the court and ends before its side landing. Shared shaft support stays real.
  for(const [index,s] of l.stairs.entries()){
   const label=index===0?'north':'south',height=s.photoTower.height,depth=s.photoTower.depth;
   const end=s.nearU-.14,center=(s.u0+end)/2,r=(end-s.u0)/2,n=48;
   const point=t=>{const u=s.u0+t*(end-s.u0);return {u,v:s.v0-depth*Math.sqrt(Math.max(0,1-((u-center)/r)**2))};};
   const curved=(g,lo,hi,m,mural=false)=>{
    if(hi<=lo)return;const vertices=[],uv=[];
    for(let i=0;i<n;i++){const a=point(i/n),b=point((i+1)/n);for(const [q,y,t] of [[a,lo,i/n],[b,lo,(i+1)/n],[b,hi,(i+1)/n],[a,lo,i/n],[b,hi,(i+1)/n],[a,hi,i/n]]){const p=l.world(q.u,q.v-(mural?.012:0),y);vertices.push(p.x,p.y,p.z);uv.push(mural?t:t*(end-s.u0)/1.2,mural?(y-lo)/(hi-lo):y/1.2);}}
    const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geom.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geom.computeVertexNormals();const mesh=new THREE.Mesh(geom,m);mesh.castShadow=mesh.receiveShadow=true;g.add(mesh);return mesh;
   };
   const skin=tiled.clone();skin.side=THREE.DoubleSide;
   for(const f of [1,2]){
    const y=(f-1)*3.6,top=Math.min(f*3.6,height),g=group('multi-rounded-'+label+(f===1?'':'-upper'),f),band=this.windowBand(s,f);
    if(!band)curved(g,y,top,skin);else{const lo=y+band[0],hi=Math.min(y+band[1],top);curved(g,y,lo,skin);curved(g,hi,top,skin);const glass=c.glass.clone();glass.side=THREE.DoubleSide;curved(g,lo,hi,glass);
     for(const h of [lo,(lo+hi)/2,hi])curved(g,h-.025,h+.025,white);
     for(let i=0;i<=12;i++){const q=point(i/12);B(g,q.u-.026,q.u+.026,q.v-.065,q.v+.065,lo,hi,white);}
    }
    for(let i=0;i<n;i++){const a=point(i/n),b=point((i+1)/n),proxy=B(g,a.u,b.u,Math.min(a.v,b.v)-.06,Math.max(a.v,b.v)+.06,y,top,skin,true);proxy.visible=false;}
   }
   // Blank upper parapet on the taller tower, with a shallow red hip cap.
   const cap=group('multi-tower-roof-'+label,2,true);if(height>7.2)curved(cap,7.2,height,skin);
   const outline=Array.from({length:n+1},(_,i)=>point(i/n));outline.push({u:end,v:s.v1},{u:s.u0,v:s.v1});
   const points=[];for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length];for(const q of [l.world(center,s.v0+1.4,height+.38),l.world(a.u,a.v,height),l.world(b.u,b.v,height)])points.push(q.x,q.y,q.z);}
   const roofGeo=new THREE.BufferGeometry();roofGeo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));roofGeo.computeVertexNormals();const roofPaint=red.clone();roofPaint.side=THREE.DoubleSide;const roof=new THREE.Mesh(roofGeo,roofPaint);roof.name='multi-red-shaped-cap-'+label;roof.castShadow=roof.receiveShadow=true;cap.add(roof);curved(cap,height-.1,height,white);
   // Photo-informed balloons/children mural, procedural and free of personal photos.
   const cv=document.createElement('canvas');cv.width=512;cv.height=256;const mc=cv.getContext('2d');if(mc){
    const paints=['#2968be','#e24b46','#71b654','#e8bb3b'];for(let i=0;i<4;i++){const x=170+i*50;mc.fillStyle=paints[i];mc.beginPath();mc.ellipse(x,54+(i%2)*10,21,30,0,0,Math.PI*2);mc.fill();mc.strokeStyle='#667870';mc.beginPath();mc.moveTo(x,84);mc.lineTo(240+i*8,169);mc.stroke();}
    mc.strokeStyle='#31589a';mc.fillStyle='#31589a';mc.lineWidth=5;for(let i=0;i<(index===0?2:4);i++){const x=200+i*35;mc.beginPath();mc.arc(x,174,7,0,Math.PI*2);mc.fill();for(const [a,b,c0,d0] of [[x,181,x,212],[x,190,x-13,181],[x,190,x+14,176],[x,212,x-10,237],[x,212,x+12,235]]){mc.beginPath();mc.moveTo(a,b);mc.lineTo(c0,d0);mc.stroke();}}
   }
   const mural=new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(cv),transparent:true,alphaTest:.05,side:THREE.DoubleSide,roughness:.96});curved(scene.getObjectByName('multi-rounded-'+label),.25,2.35,mural,true);
  }
  // Green service terrace follows the already supported rear connection.
  const serviceWalk=group('multi-green-rear-connection',2);B(serviceWalk,-4.7,10.9,14.3,16.9,3.605,3.62,mat(0x638c76));B(serviceWalk,-4.7,-3.1,9,14.3,3.605,3.62,mat(0x638c76));
  // Courtyard paving: interlocking pavers and faded rectangular parking bays.
  const paving=group('multi-courtyard-paving'),canvas=document.createElement('canvas');canvas.width=canvas.height=256;const pctx=canvas.getContext('2d');
  if(pctx){pctx.fillStyle='#a8a393';pctx.fillRect(0,0,256,256);for(let row=0;row<16;row++)for(let col=-1;col<9;col++){pctx.fillStyle=['#b4ae9e','#a6a393','#aaa696'][(row*3+col+12)%3];pctx.fillRect(col*32+(row%2)*16+1,row*16+1,30,14);}}
  const pmap=new THREE.CanvasTexture(canvas);pmap.wrapS=pmap.wrapT=THREE.RepeatWrapping;pmap.repeat.set(5,3);
  B(paving,north,south,left-2,9,.047,.062,new THREE.MeshStandardMaterial({map:pmap,roughness:1}));
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
