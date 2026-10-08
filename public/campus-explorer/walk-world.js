/* Interior details follow the supplied 3D photographs; circulation is schematic. */
(() => {
 const M=CampusWalkMath,layouts=BUILDINGS_CONFIG.map(M.layout),graph={},roomTargets={},oldNodes={...NAV_NODES};
 const node=(id,p)=>{graph[id]={id,...p,neighbors:[]};return id};
 const link=(a,b)=>{graph[a].neighbors.push(b);graph[b].neighbors.push(a)};
 const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.85});
 const colors={wall:material(0xf3f0e7),blue:material(0x9cbecb),floor:material(0xc5c1b5),stair:material(0xc7c4b9),wood:material(0x956941),green:material(0x315748),steel:material(0x61717a),light:material(0xfff9dd),glass:new THREE.MeshStandardMaterial({color:0xb0ced6,transparent:true,opacity:.45})};
 colors.light.emissive.setHex(0x8a8467);colors.light.emissiveIntensity=.4;
 const box=(group,l,u0,u1,v0,v1,y0,y1,mat,solid=false)=>{
  const r=l.rect(u0,u1,v0,v1),mesh=new THREE.Mesh(new THREE.BoxGeometry(r.x1-r.x0,y1-y0,r.z1-r.z0),mat);
  mesh.position.set((r.x0+r.x1)/2,(y0+y1)/2,(r.z0+r.z1)/2);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  if(solid){registerWallCollider(r.x0,r.x1,r.z0,r.z1,y0,y1);WALL_COLLIDERS[WALL_COLLIDERS.length-1].buildingId=l.id;}
  return mesh;
 };
 // Replace only the old interiors and their collision data, retaining roofs and special facades.
 for(let i=WALL_COLLIDERS.length-1;i>=0;i--)if(WALL_COLLIDERS[i].buildingId)WALL_COLLIDERS.splice(i,1);
 STAIR_ZONES.length=0;
 for(const l of layouts){
  const b=l.b,parent=scene.children.find(g=>g.userData.buildingId===b.id);
  for(const child of [...parent.children])if(child.name.startsWith('floor-')||child.userData.oldStairs){parent.remove(child);child.traverse(o=>{if(o.geometry)o.geometry.dispose()});const i=floorMeshes.indexOf(child);if(i>=0)floorMeshes.splice(i,1);}
  const roots=[];
  for(let f=1;f<=b.floors;f++){
   const y=(f-1)*FH,g=new THREE.Group();g.name=`floor-${f}`;g.userData={buildingId:b.id,floorNum:f};scene.add(g);floorMeshes.push(g);
   const hole0=-l.L/2+.4,hole1=l.nearU;
   const slab=(height)=>{
    if(f===1&&height===y)box(g,l,-l.L/2,l.L/2,-l.D/2,l.D/2,height-.18,height,colors.floor);
    else{
     box(g,l,-l.L/2,hole0,-l.D/2,l.D/2,height-.18,height,colors.floor);
     box(g,l,hole1,l.L/2,-l.D/2,l.D/2,height-.18,height,colors.floor);
     box(g,l,hole0,hole1,-l.D/2,-2.3,height-.18,height,colors.floor);
     box(g,l,hole0,hole1,2.3,l.D/2,height-.18,height,colors.floor);
    }
   };
   slab(y);if(f===b.floors)box(g,l,-l.L/2,l.L/2,-l.D/2,l.D/2,y+FH-.18,y+FH,colors.wall);
   // Outer walls, open 1F entrance, and upper-floor parapets.
   box(g,l,-l.L/2-.12,-l.L/2+.12,-l.D/2,l.D/2,y,y+FH,colors.wall,true);
   box(g,l,l.L/2-.12,l.L/2+.12,-l.D/2,l.D/2,y,y+FH,colors.wall,true);
   const back=-l.outerV;
   const rear=box(g,l,-l.L/2,l.L/2,back-.12,back+.12,y,y+FH,colors.wall,true);rear.visible=false;
   box(g,l,-l.L/2,l.L/2,back-.12,back+.12,y,y+1.05,colors.blue);
   box(g,l,-l.L/2,l.L/2,back-.12,back+.12,y+2.7,y+FH,colors.wall);
   if(f===1){for(const [a,c] of [[-l.L/2,-2],[2,l.L/2]])box(g,l,a,c,l.outerV-.12,l.outerV+.12,y,y+1.1,colors.wall,true);}
   else box(g,l,-l.L/2,l.L/2,l.outerV-.12,l.outerV+.12,y,y+1.1,colors.wall,true);
   for(let u=-l.L/2+.2;u<=l.L/2;u+=6)if(f!==1||Math.abs(u)>2)box(g,l,u-.18,u+.18,l.outerV-.18,l.outerV+.18,y,y+FH,colors.wall,true);
   // Tiled corridor, classroom door gaps, pale-blue wainscots and barred windows.
   for(let u=-l.L/2+.8;u<l.L/2;u+=1.2)box(g,l,u-.01,u+.01,l.cV-1.2,l.cV+1.2,y+.002,y+.012,colors.steel);
   const root=node(`${b.id}-walk-${f}`,l.world(l.stairU,l.cV,y));roots.push(root);
   const junctions=[root,node(`${b.id}-entry-${f}`,l.world(0,l.cV,y))];
   for(const r of l.rooms.filter(r=>r.floor===f)){
    const v0=Math.min(back,l.wallV),v1=Math.max(back,l.wallV);
    for(const [a,c] of [[r.u0,r.u-.95],[r.u+.95,r.u1]])if(c>a)box(g,l,a,c,l.wallV-.1,l.wallV+.1,y,y+FH,colors.wall,true);
    box(g,l,r.u-.95,r.u+.95,l.wallV-.1,l.wallV+.1,y+2.2,y+FH,colors.wall,true);
    if(r.u0> -l.L/2+1)box(g,l,r.u0-.1,r.u0+.1,v0,v1,y,y+FH,colors.wall,true);
    box(g,l,r.u0+.2,r.u1-.2,back+l.sign*.08,back+l.sign*.2,y,y+1.05,colors.blue);
    const windowV=back+l.sign*.16;
    box(g,l,r.u0+.4,r.u1-.4,windowV-.04,windowV+.04,y+1.15,y+2.65,colors.glass);
    for(let u=r.u0+.5;u<r.u1-.4;u+=.55)box(g,l,u-.025,u+.025,windowV-.09,windowV+.09,y+1.15,y+2.65,colors.steel);
    const plate=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(2.5,r.u1-r.u0-.25),.38),new THREE.MeshBasicMaterial({map:createRoomNameplateTexture(r.name),side:THREE.DoubleSide}));
    const pp=l.world(r.u,l.wallV+l.sign*.12,y+2.5);plate.position.set(pp.x,pp.y,pp.z);if(!l.horizontal)plate.rotation.y=Math.PI/2;g.add(plate);
    const office=r.cat==='admin'||/辦公|教務|學務|總務|校長|人事|會計/.test(r.name);
    // Keep a clear central aisle from each door; furniture sits beside it.
    for(const side of [-1,1]){
     const u=r.u+side*Math.max(1.1,(r.u1-r.u0)*.28),v=(back+l.wallV)/2;
     if(Math.abs(u-r.u)<(r.u1-r.u0)/2-.5){box(g,l,u-.4,u+.4,v-.55,v+.55,y+.72,y+.8,colors.wood,true);
      for(const du of [-.3,.3])box(g,l,u+du-.025,u+du+.025,v-.45,v-.4,y,y+.72,colors.steel);
      box(g,l,u-.28,u+.28,v+.62,v+.9,y+.4,y+.48,colors.wood,true);
      if(office)box(g,l,u-.45,u+.45,v-.58,v-.52,y+.8,y+1.35,colors.blue,true);
     }
    }
    const boardU=r.u1-.17;box(g,l,boardU-.06,boardU,v0+.7,v1-.7,y+1.05,y+2.3,office?colors.wall:colors.green);
    box(g,l,r.u0+.25,r.u0+.8,back+l.sign*.9,back+l.sign*.3,y,y+1,colors.wood);
    box(g,l,r.u-.7,r.u+.7,(back+l.wallV)/2-.13,(back+l.wallV)/2+.13,y+FH-.22,y+FH-.2,colors.light);
    const corridor=node(`walk-${r.id}-corridor`,r.corridor),door=node(`walk-${r.id}-door`,r.door),target=node(`walk-${r.id}`,r.center);
    link(corridor,door);link(door,target);junctions.push(corridor);roomTargets[r.id]=target;
    ROOMS_DB[r.id].node=target;const badge=roomBadgeElements.find(e=>e.element&&e.nodeId===r.node);if(badge)badge.nodeId=target;
   }
   junctions.sort((a,c)=>l.horizontal?graph[a].x-graph[c].x:graph[a].z-graph[c].z);
   for(let i=1;i<junctions.length;i++)link(junctions[i-1],junctions[i]);
  }
  for(let f=1;f<b.floors;f++){
   const g=new THREE.Group();g.name=`floor-stairs-${f+1}`;g.userData={buildingId:b.id,floorNum:f+1};scene.add(g);floorMeshes.push(g);
   const ramps=l.ramps.filter(r=>r.floor===f),p=l.platforms[f-1];
   for(const r of ramps)registerStairZone((r.x0+r.x1)/2,(r.z0+r.z1)/2,r.x1-r.x0,r.z1-r.z0,r.h0,r.h1,f,f+1,r.axis,r.axis==='x'?Math.sign(r.end.x-r.start.x):Math.sign(r.end.z-r.start.z));
   const platform=new THREE.Mesh(new THREE.BoxGeometry(p.x1-p.x0,.16,p.z1-p.z0),colors.stair);platform.position.set((p.x0+p.x1)/2,p.y-.08,(p.z0+p.z1)/2);g.add(platform);
   let previous=roots[f-1];
   const approach=node(`${b.id}-stair-approach-${f}`,l.world(l.stairU,l.sign*1.25,(f-1)*FH));link(previous,approach);previous=approach;
   for(let ri=0;ri<2;ri++){
    const ramp=ramps[ri];
    if(ri===1){const turn=node(`${b.id}-stair-turn-${f}`,l.world(l.farU, -l.sign*1.25,(f-1)*FH+FH/2));link(previous,turn);previous=turn;}
    for(let s=0;s<=18;s++){
     const point=M.rampPoint(ramp,s/18),id=node(`${b.id}-stair-${f}-${ri}-${s}`,point);link(previous,id);previous=id;
     if(s<18){const mid=M.rampPoint(ramp,(s+.5)/18),r=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?4.2/18:1.6,.16,l.horizontal?1.6:4.2/18),colors.stair);r.position.set(mid.x,mid.y-.08,mid.z);g.add(r);}
    }
   }
   const exit=node(`${b.id}-stair-exit-${f}`,l.world(l.stairU,-l.sign*1.25,f*FH));link(previous,exit);link(exit,roots[f]);
   // Visible metal side rails follow each slope, with open landings.
   for(const r of ramps)for(const side of [-1,1]){
    const a=new THREE.Vector3(r.start.x,r.start.y+.9,r.start.z),c=new THREE.Vector3(r.end.x,r.end.y+.9,r.end.z);
    if(l.horizontal){a.z+=side*.78;c.z+=side*.78}else{a.x+=side*.78;c.x+=side*.78}
    const rail=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,a.distanceTo(c),8),colors.steel);rail.position.copy(a).add(c).multiplyScalar(.5);rail.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),c.sub(a).normalize());g.add(rail);
   }
  }
 }
 // Batch static furniture/walls by floor and material to keep mobile draw calls low.
 for(const g of scene.children.filter(g=>g.userData.buildingId&&g.type==='Group'&&g.name!=='') ){
  if(!g.name.startsWith('floor-'))continue;
  const batches=new Map();
  for(const mesh of [...g.children])if(mesh.isMesh&&mesh.visible&&!mesh.material.map&&!Array.isArray(mesh.material)){
   mesh.updateMatrix();const geo=(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone()).applyMatrix4(mesh.matrix);
   if(!batches.has(mesh.material))batches.set(mesh.material,{p:[],n:[],uv:[]});const data=batches.get(mesh.material);
   for(const [name,key] of [['position','p'],['normal','n'],['uv','uv']]){const attribute=geo.getAttribute(name);if(attribute)for(const value of attribute.array)data[key].push(value);}
   geo.dispose();mesh.geometry.dispose();g.remove(mesh);
  }
  for(const [mat,data] of batches){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));if(data.uv.length)geo.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);}
 }
 // Outdoor routes stay outside building footprints and share the wall collision engine.
 function gridPath(start,end,y=0,interior=null){
  const step=interior?.5:1,origin={x:-130,z:-100},key=(x,z)=>`${x},${z}`,round=p=>({x:Math.round((p.x-origin.x)/step),z:Math.round((p.z-origin.z)/step)}),a=round(start),b=round(end),queue=[a],parents=new Map([[key(a.x,a.z),null]]),cache=new Map();
  const free=(x,z)=>{const k=key(x,z);if(cache.has(k))return cache.get(k);const wx=origin.x+x*step,wz=origin.z+z*step;
   const valid=wx>=-125&&wx<=115&&wz>=-100&&wz<=108&&!checkWallCollision(wx,y,wz)&&(interior?M.inside(interior.bounds,wx,wz)&&Math.abs(M.groundAt(interior,wx,wz,y)-y)<.15:!layouts.some(l=>wx>l.bounds.x0-.45&&wx<l.bounds.x1+.45&&wz>l.bounds.z0-.45&&wz<l.bounds.z1+.45));cache.set(k,valid);return valid;};
  for(let i=0;i<queue.length&&i<130000;i++){
   const c=queue[i];if(c.x===b.x&&c.z===b.z){const result=[];let k=key(c.x,c.z);while(k){const [x,z]=k.split(',').map(Number);result.push({x:origin.x+x*step,y,z:origin.z+z*step});k=parents.get(k)}result.reverse();result[0]={...start};result[result.length-1]={...end};return result;}
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=c.x+dx,z=c.z+dz,k=key(x,z);if(!parents.has(k)&&free(x,z)){parents.set(k,key(c.x,c.z));queue.push({x,z});}}
  }
  return null;
 }
 const gate=node('gate',{x:-10,y:0,z:96});
 for(const l of layouts){
  const entry=node(`${l.id}-outside`,l.entrance),indoor=`${l.id}-entry-1`;link(entry,indoor);
  const points=gridPath(graph[gate],l.entrance);if(points){let prev=gate;points.slice(1,-1).forEach((p,i)=>{const id=node(`${l.id}-outside-${i}`,p);link(prev,id);prev=id});link(prev,entry);}
 }
 for(const room of Object.values(ROOMS_DB))if(!roomTargets[room.id]&&room.node!=='gate'){
  const old=oldNodes[room.node];if(!old)continue;let p=room.id==='guard'?{x:6,y:0,z:90}:{x:old.x,y:0,z:old.z};const l=layouts.find(l=>M.inside(l.bounds,p.x,p.z));if(l)p=l.entrance;
  const target=node(room.node,p),points=gridPath(graph[gate],p);if(points){let prev=gate;points.slice(1,-1).forEach((p,i)=>{const id=node(`${room.node}-out-${i}`,p);link(prev,id);prev=id});link(prev,target);}
 }
 Object.keys(NAV_NODES).forEach(k=>delete NAV_NODES[k]);Object.assign(NAV_NODES,graph);
 const ground=(p)=>{const l=layouts.find(l=>M.inside(l.bounds,p.x,p.z));return l?M.groundAt(l,p.x,p.z,p.y):0};
 function route(position,room){
  const target=graph[room.node];if(!target)return null;
  const l=layouts.find(l=>M.inside(l.bounds,position.x,position.z));
  let connector=null,start=null;
  const candidates=Object.values(graph).filter(n=>Math.abs(n.y-position.y)<.36&&(l?n.id.startsWith(l.id)||n.id.startsWith('walk-'):n.id==='gate'||n.id.endsWith('-outside'))).sort((a,b)=>Math.hypot(a.x-position.x,a.z-position.z)-Math.hypot(b.x-position.x,b.z-position.z));
  for(const n of candidates.slice(0,12)){const path=gridPath(position,n,position.y,l);if(path){start=n.id;connector=path;break}}
  if(!start)return null;const ids=findShortestPath(start,room.node);return ids?[...connector,...ids.slice(1).map(id=>graph[id])]:null;
 }
 function updateCamera(){
  const pose=M.cameraPose(avatarGroup.position,avatarAngle,walkPitch,currentMode==='firstperson');
  const eye=new THREE.Vector3(avatarGroup.position.x,avatarGroup.position.y+1.55,avatarGroup.position.z),desired=new THREE.Vector3(pose.position.x,pose.position.y,pose.position.z);
  const ceiling=(Math.floor((avatarGroup.position.y+.1)/FH)+1)*FH-.3;
  const l=layouts.find(l=>M.inside(l.bounds,avatarGroup.position.x,avatarGroup.position.z));if(l){desired.y=Math.min(desired.y,ceiling);if(currentMode==='avatar')desired.lerp(eye,.5);}
  const fov=l?70:60;if(camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix()}
  let clear=1;
  if(currentMode==='avatar')for(let i=1;i<=22;i++){
   const p=eye.clone().lerp(desired,i/22);
   if(WALL_COLLIDERS.some(c=>p.x>c.minX-.08&&p.x<c.maxX+.08&&p.z>c.minZ-.08&&p.z<c.maxZ+.08&&p.y>c.minY&&p.y<c.maxY)){clear=Math.max(.06,(i-1)/22);break;}
  }
  camera.position.copy(eye).lerp(desired,clear);controls.target.set(pose.target.x,pose.target.y,pose.target.z);camera.lookAt(controls.target);
  avatarGroup.visible=currentMode==='avatar'&&clear>.2;
 }
 // Touch dragging turns the same heading as keyboard controls.
 let touch=null;
 renderer.domElement.addEventListener('touchstart',e=>{if(currentMode!=='bird'&&e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
 renderer.domElement.addEventListener('touchmove',e=>{if(!touch||currentMode==='bird')return;const p=e.touches[0];if(!p)return;applyManualCameraRotation(p.clientX-touch.x,p.clientY-touch.y);touch={x:p.clientX,y:p.clientY};e.preventDefault()},{passive:false});
 renderer.domElement.addEventListener('touchend',()=>touch=null);
 const roomAt=p=>{const l=layouts.find(l=>M.inside(l.bounds,p.x,p.z));if(!l)return null;const u=l.horizontal?p.x-l.b.x:p.z-l.b.z,v=l.horizontal?p.z-l.b.z:p.x-l.b.x;return l.rooms.find(r=>r.floor===Math.floor((p.y+.15)/FH)+1&&u>r.u0&&u<r.u1&&v>Math.min(-l.outerV,l.wallV)&&v<Math.max(-l.outerV,l.wallV))||null};
 window.campusWalkWorld={layouts,graph,ground,route,gridPath,updateCamera,roomAt};
})();
