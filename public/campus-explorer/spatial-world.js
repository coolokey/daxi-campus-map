/* Shared spatial model → geometry, collision, floor surfaces and navigation. */
(() => {
 const M=CampusWalkMath,layouts=BUILDINGS_CONFIG.map(M.layout),graph={},roomTargets={},oldNodes={...NAV_NODES};
 const node=(id,p,buildingId)=>{graph[id]={id,...p,buildingId,neighbors:[]};return id};
 const link=(a,b)=>{if(a!==b&&!graph[a].neighbors.includes(b)){graph[a].neighbors.push(b);graph[b].neighbors.push(a)}};
 const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.96});
 const colors={wall:material(0xc9c5b9),blue:material(0x8da9ae),floor:material(0xa6aaa3),stair:material(0xb8bab0),wood:material(0x956941),green:material(0x315748),steel:material(0x61717a),light:material(0xfff9dd),glass:new THREE.MeshStandardMaterial({color:0x8fa5a9,transparent:true,opacity:.45})};
 colors.light.emissive.setHex(0x8a8467);colors.light.emissiveIntensity=.4;
 const safetyMeshMaterial=new THREE.LineBasicMaterial({color:0x7f8880,transparent:true,opacity:.45});
 const surfaces=new Map();
 function surfaceMaterials(l){
  if(surfaces.has(l.id))return surfaces.get(l.id);
  const p=CampusSurfacePalette.forBuilding(l.b),own={...colors};
  for(const [key,colour] of Object.entries(p)){
   const m=material(colour);m.name=`campus-surface-${l.id}-${key}`;m.userData={campusSurface:key,campusBuildingId:l.id};own[key==='band'?'blue':key]=m;
  }
  surfaces.set(l.id,own);return own;
 }
 const box=(group,l,u0,u1,v0,v1,y0,y1,mat,solid=false)=>{
  if(u1-u0<1e-5||v1-v0<1e-5||y1-y0<1e-5)return null;
  const r=l.rect(u0,u1,v0,v1),mesh=new THREE.Mesh(new THREE.BoxGeometry(r.x1-r.x0,y1-y0,r.z1-r.z0),mat);
  mesh.position.set((r.x0+r.x1)/2,(y0+y1)/2,(r.z0+r.z1)/2);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  if(solid){registerWallCollider(r.x0,r.x1,r.z0,r.z1,y0,y1);WALL_COLLIDERS.at(-1).buildingId=l.id;}
  return mesh;
 };
 const insideFloor=(l,x,z,floor)=>{const q=l.local(x,z);return l.footprints.some(p=>p.floor===floor&&CampusSpatialPlan.contains(p,q.u,q.v))};
 // Subtract the same stair holes that groundAt uses from every slab.
 function slab(g,l,p,y,paint=null,cutAtGround=false){
  const colors=surfaceMaterials(l);
  const xs=[p.u0,p.u1],zs=[p.v0,p.v1];
  for(const h of l.holes){if(h.u0>p.u0&&h.u0<p.u1)xs.push(h.u0);if(h.u1>p.u0&&h.u1<p.u1)xs.push(h.u1);if(h.v0>p.v0&&h.v0<p.v1)zs.push(h.v0);if(h.v1>p.v0&&h.v1<p.v1)zs.push(h.v1)}
  xs.sort((a,b)=>a-b);zs.sort((a,b)=>a-b);
  for(let i=1;i<xs.length;i++)for(let j=1;j<zs.length;j++)if((y===0&&!cutAtGround)||!l.holes.some(h=>CampusSpatialPlan.contains(h,(xs[i-1]+xs[i])/2,(zs[j-1]+zs[j])/2)))box(g,l,xs[i-1],xs[i],zs[j-1],zs[j],y-.18,y,paint||colors.floor);
 }
 function roomWall(g,l,c,side,y){
  const colors=surfaceMaterials(l),q={u:(c.u0+c.u1)/2,v:(c.v0+c.v1)/2};
  if(side==='u0')q.u=c.u0-.15;else if(side==='u1')q.u=c.u1+.15;else if(side==='v0')q.v=c.v0-.15;else q.v=c.v1+.15;
  const exposed=!l.footprints.some(p=>p.floor===c.floor&&CampusSpatialPlan.contains(p,q.u,q.v)),paint=exposed?colors.exterior:colors.wall;
  const alongU=side[0]==='v',fixed=side==='v0'?c.v0:side==='v1'?c.v1:side==='u0'?c.u0:c.u1;
  const start=alongU?c.u0:c.v0,end=alongU?c.u1:c.v1,center=(start+end)/2;
  const wall=(a,b,y0,y1,mat,solid=true)=>alongU?box(g,l,a,b,fixed-.09,fixed+.09,y0,y1,mat,solid):box(g,l,fixed-.09,fixed+.09,a,b,y0,y1,mat,solid);
  if(c.doorSide===side){
   const half=Math.min(.95,(end-start)/2-.16);
   wall(start,center-half,y,y+FH,paint);wall(center+half,end,y,y+FH,paint);wall(center-half,center+half,y+2.3,y+FH,paint);
  }else{
   const solid=wall(start,end,y,y+FH,colors.wall);if(solid)solid.visible=false;
   wall(start,end,y,y+1.05,colors.blue,false);wall(start,end,y+2.65,y+FH,paint,false);
   wall(start+.2,end-.2,y+1.05,y+2.65,colors.glass,false);
   for(let u=start+.35;u<end-.2;u+=.6)wall(u-.022,u+.022,y+1.05,y+2.65,colors.steel,false);
  }
  const trim=(a,b)=>alongU?box(g,l,a,b,fixed-.104,fixed+.104,y+.005,y+.125,colors.skirt):box(g,l,fixed-.104,fixed+.104,a,b,y+.005,y+.125,colors.skirt);
  if(c.doorSide===side){const half=Math.min(.95,(end-start)/2-.16);trim(start,center-half);trim(center+half,end)}else trim(start,end);

 }
 function details(g,l,r,y){
  const colors=surfaceMaterials(l);
  const pp={...r.door,y:y+2.55},width=Math.min(2.5,r.doorSide.startsWith('v')?r.u1-r.u0-.2:r.v1-r.v0-.2);
  const label=CampusRoomLayout.nameplate(r.name,r.cat);
  const plate=new THREE.Mesh(new THREE.PlaneGeometry(width,.38),new THREE.MeshBasicMaterial({map:createRoomNameplateTexture(label.text,label.color),side:THREE.DoubleSide}));
  plate.position.set(pp.x,pp.y,pp.z);plate.rotation.y=r.doorSide.startsWith('u')?(l.horizontal?Math.PI/2:0):(l.horizontal?0:Math.PI/2);plate.userData.roomId=r.id;plate.userData.nameplateKey=label.key;g.add(plate);
  const office=r.cat==='admin',w=r.u1-r.u0,d=r.v1-r.v0;
  for(const side of [-1,1]){
   const alongU=r.doorSide.startsWith('u'),u=r.u+(alongU?0:side*w*.3),v=r.v+(alongU?side*d*.3:0);
   if(w<2.8||d<2.4)continue;
   box(g,l,u-.4,u+.4,v-.5,v+.5,y+.72,y+.8,colors.wood,true);
   for(const du of [-.3,.3])box(g,l,u+du-.025,u+du+.025,v-.43,v-.38,y,y+.72,colors.steel);
   box(g,l,u-.26,u+.26,v+.58,v+.83,y+.4,y+.48,colors.wood,true);
   if(office)box(g,l,u-.42,u+.42,v-.55,v-.5,y+.8,y+1.3,colors.blue,true);
  }
  box(g,l,r.u1-.16,r.u1-.08,r.v0+.3,r.v1-.3,y+1.05,y+2.3,office?colors.wall:colors.green);
  box(g,l,r.u-.7,r.u+.7,r.v-.12,r.v+.12,y+FH-.22,y+FH-.2,colors.light);
 }
 // Retain existing outer ornament; replace old floors, stair meshes and roofs for shaped wings.
 for(let i=WALL_COLLIDERS.length-1;i>=0;i--)if(WALL_COLLIDERS[i].buildingId)WALL_COLLIDERS.splice(i,1);
 STAIR_ZONES.length=0;
 for(const l of layouts){
  const colors=surfaceMaterials(l);
  const roofMaterial=material(l.b.roofColor);
  const parent=scene.children.find(g=>g.userData.buildingId===l.id);
  for(const child of [...parent.children])if(child.name.startsWith('floor-')||child.userData.oldStairs||(l.b.spatialProfile.shape&&child.userData.roof)){
   parent.remove(child);child.traverse(o=>{if(o.geometry)o.geometry.dispose()});const i=floorMeshes.indexOf(child);if(i>=0)floorMeshes.splice(i,1);
  }
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,g=new THREE.Group();g.name=`floor-${f}`;g.userData={buildingId:l.id,floorNum:f};scene.add(g);floorMeshes.push(g);
   for(const p of l.footprints.filter(p=>p.floor===f)){slab(g,l,p,y);
    if(f===l.b.floors){const roof=box(g,l,p.u0,p.u1,p.v0,p.v1,y+FH-.18,y+FH,roofMaterial);if(roof)roof.userData.roof=true;}
   }
   // Rooms and WC use identical rectangles for visible walls and blocking volumes.
   for(const r of l.cells.filter(c=>c.floor===f&&(c.kind==='room'||c.kind==='wc'))){
    for(const side of ['u0','u1','v0','v1'])roomWall(g,l,r,side,y);
    if(r.kind==='room')details(g,l,r,y);
   }
   // Corridor edges: split against footprint intersections so internal joints stay open.
   const parts=l.footprints.filter(p=>p.floor===f),us=[...new Set(parts.flatMap(p=>[p.u0,p.u1]))].sort((a,b)=>a-b),vs=[...new Set(parts.flatMap(p=>[p.v0,p.v1]))].sort((a,b)=>a-b);
   const present=(u,v)=>parts.some(p=>u>p.u0+1e-5&&u<p.u1-1e-5&&v>p.v0+1e-5&&v<p.v1-1e-5);
   function edge(alongU,fixed,a,b){
    const u=alongU?(a+b)/2:fixed,v=alongU?fixed:(a+b)/2;
    const corridor=l.corridors.some(p=>p.floor===f&&CampusSpatialPlan.contains(p,u,v));if(!corridor)return;
    const min=alongU?a:fixed-.09,max=alongU?b:fixed+.09,v0=alongU?fixed-.09:a,v1=alongU?fixed+.09:b;
    // Open corridor ends, and all 1F access edges. Upper corridor parapets stay solid.
    const open=f===1||(!l.b.spatialProfile.shape&& !alongU);
    if(!open)box(g,l,min,max,v0,v1,y,y+1.05,colors.exterior,true);
    // Space columns away from doors and corridor ends.
    for(let t=a+1;t<b-1;t+=6)if(f!==1)box(g,l,alongU?t-.13:fixed-.13,alongU?t+.13:fixed+.13,alongU?fixed-.13:t-.13,alongU?fixed+.13:t+.13,y,y+FH,colors.exterior,true);
   }
   for(const v of vs)for(let i=1;i<us.length;i++){const u=(us[i]+us[i-1])/2;if(present(u,v-.02)!==present(u,v+.02))edge(true,v,us[i-1],us[i]);}
   for(const u of us)for(let i=1;i<vs.length;i++){const v=(vs[i]+vs[i-1])/2;if(present(u-.02,v)!==present(u+.02,v))edge(false,u,vs[i-1],vs[i]);}
   const ceiling=new THREE.Group();ceiling.name=`corridor-ceiling-${l.id}-${f}`;ceiling.userData={buildingId:l.id,floorNum:f,campusCeiling:true};scene.add(ceiling);floorMeshes.push(ceiling);
   for(const p of l.corridors.filter(p=>p.floor===f)){
    const longU=p.u1-p.u0>=p.v1-p.v0,lo=longU?p.u0:p.v0,hi=longU?p.u1:p.v1;
    // Keep the same stair holes clear in the ceiling as in the floor above.
    slab(ceiling,l,p,y+FH-.22,colors.ceiling,true);
    for(let t=lo+1.2;t<hi;t+=1.2)box(g,l,longU?t-.005:p.u0,longU?t+.005:p.u1,longU?p.v0:t-.005,longU?p.v1:t+.005,y+.002,y+.008,colors.grout);
    const acrossLo=longU?p.v0:p.u0,acrossHi=longU?p.v1:p.u1;
    for(let t=acrossLo+1.2;t<acrossHi;t+=1.2)box(g,l,longU?p.u0:t-.005,longU?p.u1:t+.005,longU?t-.005:p.v0,longU?t+.005:p.v1,y+.002,y+.008,colors.grout);
    for(let t=lo+2;t<hi-.6;t+=5){
     const u=longU?t:(p.u0+p.u1)/2,v=longU?(p.v0+p.v1)/2:t;
     // Skip any fixture whose footprint would extend over a stair opening.
     const beam={u0:longU?u-.12:p.u0,u1:longU?u+.12:p.u1,v0:longU?p.v0:v-.12,v1:longU?p.v1:v+.12},lamp={u0:longU?u-.7:u-.09,u1:longU?u+.7:u+.09,v0:longU?v-.09:v-.7,v1:longU?v+.09:v+.7};
     if(l.holes.some(h=>[beam,lamp].some(q=>q.u0<h.u1&&q.u1>h.u0&&q.v0<h.v1&&q.v1>h.v0)))continue;
     box(ceiling,l,longU?u-.12:p.u0,longU?u+.12:p.u1,longU?p.v0:v-.12,longU?p.v1:v+.12,y+FH-.58,y+FH-.4,colors.ceiling);
     box(ceiling,l,longU?u-.7:u-.09,longU?u+.7:u+.09,longU?v-.09:v-.7,longU?v+.09:v+.7,y+FH-.64,y+FH-.59,colors.light);
    }
   }
  }
  for(const s of l.stairs)for(let f=1;f<l.b.floors;f++){
   const g=new THREE.Group();g.name=`floor-stairs-${f+1}`;g.userData={buildingId:l.id,floorNum:f+1};scene.add(g);floorMeshes.push(g);
   const ramps=l.ramps.filter(r=>r.stairId===s.id&&r.floor===f),p=l.platforms.find(p=>p.stairId===s.id&&p.floor===f);
   box(g,l,s.u0+.2,s.farU+.08,s.centerV-2.3,s.centerV+2.3,p.y-.16,p.y,colors.stair);
   box(g,l,s.u0+.2,s.u0+.27,s.centerV-2.25,s.centerV+2.25,p.y+.85,p.y+.93,colors.handrail);
   for(let v=s.centerV-2.2;v<=s.centerV+2.2;v+=.55)box(g,l,s.u0+.215,s.u0+.255,v-.022,v+.022,p.y,p.y+.9,colors.steel);
   if(l.id==='gym-bld'){
    for(let v=s.centerV-1.9;v<s.centerV+2.3;v+=.4)box(g,l,s.u0+.2,s.farU+.08,v-.004,v+.004,p.y+.002,p.y+.008,colors.grout);
    for(let u=s.u0+.6;u<s.farU+.08;u+=.4)box(g,l,u-.004,u+.004,s.centerV-2.3,s.centerV+2.3,p.y+.002,p.y+.008,colors.grout);
   }


   for(const r of ramps){
    registerStairZone((r.x0+r.x1)/2,(r.z0+r.z1)/2,r.x1-r.x0,r.z1-r.z0,r.h0,r.h1,f,f+1,r.axis,r.axis==='x'?Math.sign(r.end.x-r.start.x):Math.sign(r.end.z-r.start.z));
    // Closed risers follow the existing smooth walk ramp; dimensions are schematic.
    const count=Math.ceil((r.h1-r.h0)/.15),runLength=Math.hypot(r.end.x-r.start.x,r.end.z-r.start.z),depth=runLength/count;
    const stepBox=(point,width,height,length,colour)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?length:width,height,l.horizontal?width:length),colour);mesh.position.set(point.x,point.y,point.z);mesh.castShadow=mesh.receiveShadow=true;g.add(mesh);return mesh};
    for(let i=0;i<count;i++){
     const mid=M.rampPoint(r,(i+.5)/count),front=M.rampPoint(r,i/count),top=r.h0+(i+1)/count*(r.h1-r.h0),bottom=r.h0-.12;
     stepBox({...mid,y:(top+bottom)/2},1.6,top-bottom,depth,colors.stair);
     stepBox({...front,y:top+.009},1.6,.018,.035,colors.edge);
     if(l.id==='gym-bld'){
      // Visible tile joints, anti-slip grooves and blue stepped side paint (photo 18).
      for(const offset of [-.4,0,.4]){const q={...mid,y:top+.004};q[l.horizontal?'z':'x']+=offset;stepBox(q,.007,.008,depth,colors.grout);}
      for(const t of [.05,.12]){const q=M.rampPoint(r,(i+t)/count);stepBox({...q,y:top+.006},1.45,.009,.008,colors.edge);}
      for(const side of [-1,1]){const q={...mid,y:top-.06};q[l.horizontal?'z':'x']+=side*.79;stepBox(q,.07,.12,depth,colors.skirt);}
     }
    }
    for(const side of [-1,1]){
     const shift=p=>{const q=new THREE.Vector3(p.x,p.y,p.z);q[l.horizontal?'z':'x']+=side*.78;return q};
     const rail=(a,c,colour,radius)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,a.distanceTo(c),8),colour);mesh.position.copy(a).add(c).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),c.clone().sub(a).normalize());g.add(mesh)};
     const a=shift(r.start),c=shift(r.end);a.y+=.9;c.y+=.9;rail(a,c,colors.handrail,.04);
     const posts=Math.max(2,Math.ceil(runLength/.8));for(let j=0;j<=posts;j++){const q=shift(M.rampPoint(r,j/posts));rail(q,q.clone().add(new THREE.Vector3(0,.9,0)),colors.steel,.022);}
     // Administrative stair safety mesh is schematic, without reproducing notices.
     if(l.id==='admin-back'){
      const points=[];
      // Diamond weave in the stair-side plane, clipped to the guard height.
      for(const direction of [-1,1])for(let k=-runLength-.7;k<runLength+.7;k+=.24){
       const x0=Math.max(0,direction===1?k:k-.7),x1=Math.min(runLength,direction===1?k+.7:k);if(x1<=x0)continue;
       const a=shift(M.rampPoint(r,x0/runLength)),c=shift(M.rampPoint(r,x1/runLength));a.y+=.12+direction*(x0-k);c.y+=.12+direction*(x1-k);points.push(a.x,a.y,a.z,c.x,c.y,c.z);
      }
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));g.add(new THREE.LineSegments(geo,safetyMeshMaterial));
     }
    }

   }
  }
 }
 // Administrative galleries are compiled once and shared with the map and ground engine.
 const galleries=CampusSpatialPlan.galleries(layouts),front=layouts.find(l=>l.id==='admin-front'),back=layouts.find(l=>l.id==='admin-back');
 for(const l of galleries){
  const colors=surfaceMaterials(l);
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,g=new THREE.Group();g.name=`floor-gallery-${f}`;g.userData={buildingId:'admin-front',floorNum:f};scene.add(g);floorMeshes.push(g);
   for(const p of l.footprints.filter(p=>p.floor===f))box(g,l,p.u0,p.u1,p.v0,p.v1,y-.18,y,colors.floor);
   for(const r of l.rails.filter(r=>r.floor===f))box(g,l,r.u0,r.u1,r.v0,r.v1,y,y+1,colors.wall,true);
  }
 }
 layouts.push(...galleries);
 // Static batching retains low draw calls despite the extra circulation details.
 for(const g of scene.children.filter(g=>g.type==='Group'&&(g.name.startsWith('floor-')||g.userData.campusCeiling))){
  const batches=new Map();for(const mesh of [...g.children])if(mesh.isMesh&&mesh.visible&&!mesh.userData.roof&&!mesh.material.map&&!Array.isArray(mesh.material)){
   mesh.updateMatrix();const geo=(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone()).applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,{p:[],n:[],uv:[]});const data=batches.get(mesh.material);
   for(const [name,key] of [['position','p'],['normal','n'],['uv','uv']]){const a=geo.getAttribute(name);if(a)for(const v of a.array)data[key].push(v)}geo.dispose();mesh.geometry.dispose();g.remove(mesh);
  }
  for(const [mat,data] of batches){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));if(data.uv.length)geo.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=mesh.receiveShadow=true;g.add(mesh)}
 }
 window.campusCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,AVATAR_COLLISION_RADIUS,AVATAR_HEIGHT);
 function floorAt(position){
  const y=position.y,l=layouts.find(l=>M.inside(l.bounds,position.x,position.z)&&insideFloor(l,position.x,position.z,Math.max(1,Math.round(y/FH)+1)));
  if(l)return M.groundAt(l,position.x,position.z,y);
  return CampusOutdoorPlan.ground(position);
 }
 // Keep the feet on a connected surface. Stair rails and slab edges must not
 // become a multi-floor drop when keyboard or joystick input drifts sideways.
 function stepHeight(from,x,z){
  const current=floorAt(from),next=floorAt({x,y:from.y,z});
  return Math.abs(next-current)<=.35+1e-6?next:null;
 }
 // Static graph requests share BFS work. Runtime searches use fresh state.
 const startupSearches=new Map();let buildingGraph=true;
 // Four-connected grid connectors reject blocked edges, floor holes and courtyard voids.
 function gridPath(start,end,y=0,interior=null,stageSurface=false){
  const step=(interior||stageSurface)?.35:1,origin=stageSurface?{x:CampusOutdoorPlan.stage.x0-1,z:CampusOutdoorPlan.stage.stairs.z0-1}:interior?{x:interior.bounds.x0-1,z:interior.bounds.z0-1}:{x:-130,z:-100},round=p=>({x:Math.round((p.x-origin.x)/step),z:Math.round((p.z-origin.z)/step)}),a=round(start),b=round(end),f=Math.round(y/FH)+1;
  const searchKey=`${stageSurface?'stage':interior?.id||'outdoor'}/${y}/${a.x},${a.z}`;
  let state=buildingGraph?startupSearches.get(searchKey):null;if(!state){state=CampusGridSearch.create(a);if(buildingGraph)startupSearches.set(searchKey,state)}
  const stageFree=(x,z)=>CampusOutdoorPlan.onStage({x,z,y})&&Math.abs(CampusOutdoorPlan.ground({x,z})-y)<.15;
  const free=(x,z)=>{const wx=origin.x+x*step,wz=origin.z+z*step;
   return ((wx>=-125&&wx<=115&&wz>=-100&&wz<=108)||CampusEntranceAvenue.contains(wx,wz))&&!checkWallCollision(wx,y,wz)&&(stageSurface?stageFree(wx,wz):interior?insideFloor(interior,wx,wz,f)&&Math.abs(M.groundAt(interior,wx,wz,y)-y)<.15:!CampusOutdoorPlan.reserved({x:wx,z:wz})&&!layouts.some(l=>insideFloor(l,wx,wz,1)))};
  const clear=(p,q)=>{const dist=Math.hypot(p.x-q.x,p.z-q.z),steps=Math.max(1,Math.ceil(dist/.12));for(let i=0;i<=steps;i++){const t=i/steps,x=p.x+(q.x-p.x)*t,z=p.z+(q.z-p.z)*t;if(checkWallCollision(x,y,z)||(stageSurface?!stageFree(x,z):!interior&&CampusOutdoorPlan.reserved({x,z}))||(interior&&(!insideFloor(interior,x,z,f)||Math.abs(M.groundAt(interior,x,z,y)-y)>.15)))return false}return true};
  const points=CampusGridSearch.path(state,b,free);if(points){const result=points.map(p=>({x:origin.x+p.x*step,y,z:origin.z+p.z*step}));
    if(result.length===1)return clear(start,end)?[{...start},{...end}]:null;
    if(!clear(start,result[1])||!clear(result.at(-2),end))return null;result[0]={...start};result[result.length-1]={...end};return result;
  }
  return null;
 }
 function attachPath(idA,idB,path,buildingId){if(!path)return false;let prev=idA;path.slice(1,-1).forEach((p,i)=>{const next=node(`${idA}-${idB}-p${i}`,p,buildingId);link(prev,next);prev=next});link(prev,idB);return true}
 const hubs={};
 for(const l of layouts){
  if(l.paths)continue;
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,c=l.corridors.find(c=>c.floor===f),p=l.world((c.u0+c.u1)/2,(c.v0+c.v1)/2,y),hub=node(`${l.id}-entry-${f}`,p,l.id);hubs[`${l.id}-${f}`]=hub;
   for(const r of l.rooms.filter(r=>r.floor===f)){
    const corridor=node(`walk-${r.id}-corridor`,r.corridor,l.id),door=node(`walk-${r.id}-door`,r.door,l.id),target=node(`walk-${r.id}`,r.center,l.id);link(corridor,door);link(door,target);roomTargets[r.id]=target;
    const old=ROOMS_DB[r.id].node;ROOMS_DB[r.id].node=target;ROOMS_DB[r.id].spaceCode=r.spaceCode;const badge=roomBadgeElements.find(e=>e.nodeId===old);if(badge)badge.nodeId=target;
    attachPath(hub,corridor,gridPath(p,r.corridor,y,l),l.id);
   }
   for(const s of l.stairs){
    for(const [label,v] of [['lower',s.centerV+s.sign*1.25],['upper',s.centerV-s.sign*1.25]]){
     const q=l.world(s.innerU,v,y),id=node(`${s.id}-${label}-${f}`,q,l.id);attachPath(hub,id,gridPath(p,q,y,l),l.id);
    }
   }
  }
  for(const s of l.stairs)for(let f=1;f<l.b.floors;f++){
   let previous=`${s.id}-lower-${f}`;
   for(const [ri,r] of l.ramps.filter(r=>r.stairId===s.id&&r.floor===f).entries()){
    if(ri===1){const turn=node(`${s.id}-turn-${f}`,l.world(s.farU,s.centerV-s.sign*1.25,(f-.5)*FH),l.id);link(previous,turn);previous=turn;}
    for(let i=0;i<=18;i++){const n=node(`${s.id}-ramp-${f}-${ri}-${i}`,M.rampPoint(r,i/18),l.id);link(previous,n);previous=n;}
   }
   link(previous,`${s.id}-upper-${f+1}`);
  }
 }
 for(const gallery of galleries)for(const {floor:f,points:pts} of gallery.paths){
  const y=(f-1)*FH;
  let previous=hubs[`admin-back-${f}`];
  const start=node(`admin-gallery-start-${f}`,pts[0],'admin-back');attachPath(previous,start,gridPath(graph[previous],pts[0],y,back),'admin-back');previous=start;
  for(let i=1;i<pts.length;i++){const id=node(`admin-gallery-${f}-${i}`,pts[i],gallery.id);link(previous,id);previous=id}
  attachPath(previous,hubs[`admin-front-${f}`],gridPath(pts.at(-1),graph[hubs[`admin-front-${f}`]],y,front),'admin-front');
 }
 const gate=node('gate',{x:-10,y:0,z:90});
 for(const l of layouts)for(const [i,e] of l.entrances.entries()){
  const steps=Math.ceil(Math.hypot(e.outside.x-e.inside.x,e.outside.z-e.inside.z)/.12);
  if(Array.from({length:steps+1},(_,j)=>j/steps).some(t=>checkWallCollision(e.inside.x+(e.outside.x-e.inside.x)*t,0,e.inside.z+(e.outside.z-e.inside.z)*t)))continue;
  const exterior=node(`${l.id}-outside-${i}`,e.outside),inside=node(`${l.id}-entrance-${i}`,e.inside,l.id);link(exterior,inside);
  const hub=hubs[`${l.id}-1`];attachPath(inside,hub,gridPath(e.inside,graph[hub],0,l),l.id);
  // Detached rooms get their own entrance; no route crosses the parking void.
  for(const r of l.rooms.filter(r=>r.floor===1))attachPath(inside,`walk-${r.id}-corridor`,gridPath(e.inside,r.corridor,0,l),l.id);
  attachPath(gate,exterior,gridPath(graph[gate],e.outside));
 }
 const stageFoot=node('stage-outdoor-foot',{...CampusOutdoorPlan.stage.foot});
 attachPath(gate,stageFoot,gridPath(graph[gate],graph[stageFoot]));
 let stagePrevious=stageFoot;
 for(const [i,p] of CampusOutdoorPlan.stairsPath().entries()){const id=node(`stage-outdoor-stair-${i}`,p);link(stagePrevious,id);stagePrevious=id;}
 const podium=node('stand-podium',{...CampusOutdoorPlan.stage.center});link(stagePrevious,podium);roomTargets.grandstand=podium;
 for(const room of Object.values(ROOMS_DB))if(!roomTargets[room.id]&&room.node!=='gate'){
  const old=oldNodes[room.node];if(!old)continue;let p=room.id==='guard'?{x:6,y:0,z:90}:{x:old.x,y:0,z:old.z};const l=layouts.find(l=>insideFloor(l,p.x,p.z,1));if(l)p=l.entrance;
  const target=node(room.node,p);attachPath(gate,target,gridPath(graph[gate],p));
 }
 for(const [alias,id] of Object.entries(CampusSpatialData.aliases))ROOMS_DB[alias]={...ROOMS_DB[id],id:alias,aliasFor:id};
 Object.keys(NAV_NODES).forEach(k=>delete NAV_NODES[k]);Object.assign(NAV_NODES,graph);
 buildingGraph=false;startupSearches.clear();
 function route(position,room){
  const target=graph[room.node];if(!target)return null;
  let stageExit=CampusOutdoorPlan.exitPath(position);
  if(stageExit){
   if(CampusOutdoorPlan.inside(CampusOutdoorPlan.stage,position)){
    const path=gridPath(position,{x:-62,y:1.4,z:8.1},1.4,null,true);if(!path)return null;
    stageExit=[...path,...CampusOutdoorPlan.stairsPath().reverse().slice(1),{...CampusOutdoorPlan.stage.foot}];
   }
   const ids=findShortestPath(stageFoot,room.node);return ids?[...stageExit,...ids.slice(1).map(id=>graph[id])]:null;
  }
  const f=Math.max(1,Math.round(position.y/FH)+1),l=layouts.find(l=>insideFloor(l,position.x,position.z,f));
  let connector=null,start=null;
  const candidates=Object.values(graph).filter(n=>Math.abs(n.y-position.y)<.36&&(l?n.buildingId===l.id:n.id==='gate'||n.id.includes('-outside-'))).sort((a,b)=>Math.hypot(a.x-position.x,a.z-position.z)-Math.hypot(b.x-position.x,b.z-position.z));
  for(const n of candidates.slice(0,20)){const path=gridPath(position,n,position.y,l);if(path){start=n.id;connector=path;break}}
  if(!start)return null;const ids=findShortestPath(start,room.node);return ids?[...connector,...ids.slice(1).map(id=>graph[id])]:null;
 }
 function updateCamera(){
  const pose=M.cameraPose(avatarGroup.position,avatarAngle,walkPitch,currentMode==='firstperson',window.campusMouse?.distance||6.5),eye=new THREE.Vector3(avatarGroup.position.x,avatarGroup.position.y+1.55,avatarGroup.position.z),desired=new THREE.Vector3(pose.position.x,pose.position.y,pose.position.z);
  const l=layouts.find(l=>insideFloor(l,avatarGroup.position.x,avatarGroup.position.z,Math.max(1,Math.round(avatarGroup.position.y/FH)+1)));
  if(l){desired.y=Math.min(desired.y,(Math.floor((avatarGroup.position.y+.1)/FH)+1)*FH-.3);if(currentMode==='avatar')desired.lerp(eye,.5)}
  const fov=l?70:60;if(camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix()}
  const cameraGround=p=>{let y=floorAt(p);for(const layout of layouts)for(const r of layout.ramps)if(M.inside(r,p.x,p.z)&&avatarGroup.position.y>=r.h0-.35&&avatarGroup.position.y<=r.h1+.35){const t=Math.max(0,Math.min(1,((r.axis==='x'?p.x:p.z)-(r.axis==='x'?r.start.x:r.start.z))/((r.axis==='x'?r.end.x:r.end.z)-(r.axis==='x'?r.start.x:r.start.z))));y=Math.max(y,r.h0+t*(r.h1-r.h0))}return y};
  const clear=currentMode==='avatar'?CampusMouseModel.cameraClear(eye,desired,cameraGround,p=>window.campusCollisionIndex.pointHit(p.x,p.y,p.z)):1;
  camera.position.copy(eye).lerp(desired,clear);controls.target.set(pose.target.x,pose.target.y,pose.target.z);camera.lookAt(controls.target);avatarGroup.visible=currentMode==='avatar'&&clear>.2;
 }
 let touch=null;renderer.domElement.addEventListener('touchstart',e=>{if(currentMode!=='bird'&&e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
 renderer.domElement.addEventListener('touchmove',e=>{if(!touch||currentMode==='bird')return;const p=e.touches[0];if(!p)return;applyManualCameraRotation(p.clientX-touch.x,p.clientY-touch.y);touch={x:p.clientX,y:p.clientY};e.preventDefault()},{passive:false});renderer.domElement.addEventListener('touchend',()=>touch=null);
 const roomAt=p=>{const f=Math.floor((p.y+.15)/FH)+1;for(const l of layouts){const q=l.local(p.x,p.z),r=l.rooms.find(r=>r.floor===f&&CampusSpatialPlan.contains(r,q.u,q.v));if(r)return r}return null};
 window.campusWalkWorld={layouts,graph,ground:floorAt,stepHeight,route,gridPath,updateCamera,roomAt,galleries,insideFloor};
})();
