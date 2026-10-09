/* admin-front match: S__66011285–95 + aerial 05/11. Room names/floors stay in the plan.
 * Attachments are independent of the replaced legacy floor groups.
 */
(()=>{
 const api=window.campusExplorer,b=BUILDINGS_CONFIG.find(b=>b.id==='admin-front');if(!api||!b)return;
 const materials=new Map(),mat=c=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.85}));return materials.get(c)};
 function group(f,name){const g=new THREE.Group();g.name=name;g.userData={buildingId:b.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);return g}
 function box(g,w,h,d,x,y,z,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);return m}
 const frontZ=b.z+b.depth/2,cream=0xece9df,white=0xe9e9e3,teal=0x447b79;
 // The circulation facade is open at 1F. No glass sheet or pillar closes a doorway.
 for(let f=1;f<=b.floors;f++){
  const g=group(f,`photo-admin-facade-${f}`),y=(f-1)*FH;
  box(g,b.width,.22,.24,b.x,y+FH-.05,frontZ+.13,cream);
  for(const x of [b.x-b.width/2+.4,b.x+b.width/2-.4])box(g,.38,FH,.3,x,y+FH/2,frontZ+.05,white);
  if(f>1)for(let x=b.x-b.width/2+.9;x<b.x+b.width/2-1.3;x+=1.25){
   const l=api.walkWorld?.layouts?.find(l=>l.id===b.id)||window.campusWalkWorld.layouts.find(l=>l.id===b.id);
   const q=l.local(x+.58,frontZ),cell=l.cells.find(c=>c.floor===f&&q.u>=c.u0&&q.u<=c.u1);
   if(cell?.kind==='passage'||cell?.kind==='stair')continue;
   for(const dx of [0,1.15])box(g,.045,1.35,.12,x+dx,y+1.85,frontZ+.17,white);
   for(const dy of [-.67,0,.67])box(g,1.15,.045,.12,x+.58,y+1.85+dy,frontZ+.17,white);
  }
 }
 const entrance=group(1,'photo-admin-entrance');
 // Two entrance columns flank the existing clear central path (x ± 2.1).
 for(const x of [b.x-2.65,b.x+2.65]){
  box(entrance,.25,3.25,.3,x,1.625,frontZ+1.6,cream);
  registerWallCollider(x-.125,x+.125,frontZ+1.45,frontZ+1.75,0,3.25);
 }
 window.campusCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,AVATAR_COLLISION_RADIUS,AVATAR_HEIGHT);
 box(entrance,6.2,.18,2.05,b.x,3.3,frontZ+.85,cream);
 // Open sliding glass leaves flank the central clear passage.
 const glass=new THREE.MeshStandardMaterial({color:0x9bbbc2,transparent:true,opacity:.35,roughness:.2});
 for(const sign of [-1,1]){
  const x=b.x+sign*1.75,pane=new THREE.Mesh(new THREE.BoxGeometry(.8,2.2,.035),glass);pane.position.set(x,1.15,frontZ+.15);entrance.add(pane);
  for(const dx of [-.4,.4])box(entrance,.035,2.2,.06,x+dx,1.15,frontZ+.15,teal);
  box(entrance,.8,.035,.06,x,2.25,frontZ+.15,teal);
 }
 for(const x of [b.x-3.35,b.x+3.35]){
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,2.8,12,1,false,0,Math.PI),mat(cream));wall.position.set(x,1.4,frontZ+.35);entrance.add(wall);
 }
 // Low entrance threshold and flank ramp are visual guides at the existing zero-level entrance.
 box(entrance,4.1,.045,1.15,b.x,.025,frontZ+.65,0xc4c0b5);
 const ramp=box(entrance,1.2,.08,3.1,b.x+4.35,.06,frontZ+1.5,0xc4c0b5);ramp.rotation.x=-.02;
 for(const x of [b.x+3.75,b.x+4.95])for(const h of [.55,.9]){
  box(entrance,.035,.035,3.1,x,h,frontZ+1.5,0xaab5b4);
  for(const z of [frontZ+.1,frontZ+1.5,frontZ+2.9])box(entrance,.035,h,.035,x,h/2,z,0xaab5b4);
 }
 for(const x of [b.x-3.9,b.x+5.9]){const urn=new THREE.Mesh(new THREE.CylinderGeometry(.36,.2,.6,12),mat(0xcdcec4));urn.position.set(x,.3,frontZ+.65);entrance.add(urn)}
 // Two-colour low roof surfaces follow the matched aerial, retaining roof-cut controls.
 const oldRoofs=[];api.scene.traverse(o=>{if(o.userData?.buildingId===b.id&&o.userData.roof)oldRoofs.push(o)});
 for(const o of oldRoofs){o.parent?.remove(o);const i=floorMeshes.indexOf(o);if(i>=0)floorMeshes.splice(i,1);o.geometry?.dispose()}
 const roof=group(b.floors,'photo-admin-roof');roof.userData.roof=true;
 const h=b.floors*FH,rise=1.35,halfDepth=b.depth/2+.55,slope=Math.atan2(rise,halfDepth),length=Math.hypot(halfDepth,rise);
 for(const z of [b.z-b.depth/2-.55,b.z+b.depth/2+.55])box(roof,b.width+1.6,.1,.17,b.x,h+.04,z,teal);
 for(const sign of [-1,1]){
  const panel=box(roof,b.width+1.6,.1,length,b.x,h+.15+rise/2,b.z+sign*halfDepth/2,sign>0?0xb65f54:0xc9c5a5);panel.rotation.x=sign*slope;
 }
 // Ribs share the slope and elevation of the roof panels.
 for(let x=b.x-b.width/2;x<=b.x+b.width/2;x+=.6)for(const sign of [-1,1]){
  const rib=box(roof,.025,.025,length,x,h+.22+rise/2,b.z+sign*halfDepth/2,sign>0?0xb16b5e:0xb8b398);rib.rotation.x=sign*slope;
 }
 // Source-backed garden landmarks stay clear of the central route.
 const garden=group(1,'photo-admin-garden');
 for(const x of [b.x-5,b.x+7.5]){
  box(garden,2.4,.28,2.5,x,.14,frontZ+4.4,0x9c9e80);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.22,3.1,8),mat(0x705c46));trunk.position.set(x,1.55,frontZ+4.4);garden.add(trunk);
  for(let i=0;i<3;i++){const crown=new THREE.Mesh(new THREE.ConeGeometry(1.3-i*.2,3.2,8),mat(i%2?0x4b6c43:0x567c45));crown.position.set(x,3.2+i*.8,frontZ+4.4);garden.add(crown)}
 }
 const cube=new THREE.Group();cube.position.set(b.x+9,.8,frontZ+4.1);cube.rotation.set(.25,.35,.25);garden.add(cube);
 for(let x=0;x<3;x++)for(let y=0;y<3;y++)for(let z=0;z<3;z++)if(x===0||x===2||y===0||y===2||z===0||z===2)box(cube,.35,.35,.35,(x-1)*.38,(y-1)*.38,(z-1)*.38,[0xb94a44,0xc9aa48,0x518663,0x538a9b][(x+y+z)%4]);
 const peacock=new THREE.Mesh(new THREE.CircleGeometry(.85,12,0,Math.PI),mat(0x568374));peacock.position.set(b.x-9,.25,frontZ+4);garden.add(peacock);
 // The source only demonstrates the shape, not botanical or equipment identities.
})();
