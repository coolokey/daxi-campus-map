/* admin-front match: S__66011285–95 + aerial 05/11. Room names/floors stay in the plan.
 * Attachments are independent of the replaced legacy floor groups.
 */
(()=>{
 const api=window.campusExplorer,b=BUILDINGS_CONFIG.find(b=>b.id==='admin-front');if(!api||!b)return;
 const materials=new Map(),mat=c=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.97}));return materials.get(c)};
 function group(f,name){const g=new THREE.Group();g.name=name;g.userData={buildingId:b.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);return g}
 function box(g,w,h,d,x,y,z,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),c?.isMaterial?c:mat(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);return m}
 const frontZ=b.z+b.depth/2,cream=CampusSurfacePalette.forBuilding(b).exterior,white=0xb4b8ae,teal=0x447b79;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#aaa9a1';ctx.fillRect(0,0,128,128);
 for(let i=0;i<1800;i++){const n=(i*73)%128,m=(i*37+Math.floor(i/128)*11)%128;ctx.fillStyle=i%3?'#b8b7b0':'#818781';ctx.fillRect(n,m,1,1);}
 const stoneTexture=new THREE.CanvasTexture(canvas);stoneTexture.wrapS=stoneTexture.wrapT=THREE.RepeatWrapping;stoneTexture.encoding=THREE.sRGBEncoding;
 const stone=new THREE.MeshStandardMaterial({color:0xd1d0c7,map:stoneTexture,roughness:.98});
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
 // The new close-up shows a two-storey stone porch, not a low canopy.
 // Its posts and open glass leaves preserve the existing central route.
 for(const x of [b.x-2.8,b.x+2.8]){
  box(entrance,.55,6.85,.55,x,3.425,frontZ+1.65,stone).name='admin-porch-column';
  registerWallCollider(x-.275,x+.275,frontZ+1.375,frontZ+1.925,0,6.85);WALL_COLLIDERS.at(-1).buildingId=b.id;
  for(let y=1.3;y<6.7;y+=1.35)box(entrance,.557,.012,.557,x,y,frontZ+1.65,0x787d78);
 }
 const canopy=box(entrance,6.5,.22,2.55,b.x,6.96,frontZ+.8,stone);canopy.name='admin-porch-canopy';
 box(entrance,5.7,.08,2.2,b.x,6.8,frontZ+.8,0xb0aa97);
 // Open sliding glass leaves flank the central clear passage.
 const glass=new THREE.MeshStandardMaterial({color:0x9bbbc2,transparent:true,opacity:.35,roughness:.2});
 for(const sign of [-1,1]){
  const x=b.x+sign*1.65,pane=box(entrance,.85,2.25,.035,x,1.18,frontZ+.15,glass);
  for(const dx of [-.425,.425])box(entrance,.045,2.25,.06,x+dx,1.18,frontZ+.15,white);
  for(const y of [.06,.85,2.3])box(entrance,.85,.04,.06,x,y,frontZ+.15,white);
  registerWallCollider(x-.425,x+.425,frontZ+.12,frontZ+.18,0,2.3);WALL_COLLIDERS.at(-1).buildingId=b.id;
 }
 box(entrance,4.15,.58,.035,b.x,2.64,frontZ+.15,glass).name='admin-entrance-transom';
 for(const y of [2.32,2.94])box(entrance,4.2,.045,.06,b.x,y,frontZ+.15,white);
 for(const x of [b.x-2.1,b.x,b.x+2.1])box(entrance,.045,.62,.06,x,2.63,frontZ+.15,white);
 // The entrance photo places the trophy case beside the door and a noticeboard
 // opposite it. Neither occupies the doorway or either corridor-end entrance.
 const trophies=box(entrance,.62,2.1,.38,b.x+2.63,1.1,frontZ+.15,0x856647);trophies.name='admin-trophy-cabinet';
 box(entrance,.55,1.95,.025,b.x+2.63,1.1,frontZ+.355,glass);
 for(const y of [.12,.78,1.43,2.1])box(entrance,.63,.045,.4,b.x+2.63,y,frontZ+.15,0x725e45);
 for(let row=0;row<3;row++)for(let col=0;col<2;col++){
  const x=b.x+2.48+col*.28,y=.3+row*.65;
  box(entrance,.14,.04,.12,x,y,frontZ+.22,0x574e3c);box(entrance,.04,.18,.04,x,y+.11,frontZ+.22,0xb7974d);
  const cup=new THREE.Mesh(new THREE.ConeGeometry(.09,.16,8),mat(0xb7974d));cup.rotation.z=Math.PI;cup.position.set(x,y+.27,frontZ+.22);entrance.add(cup);
 }
 box(entrance,.8,1.1,.05,b.x-2.7,1.55,frontZ+.18,0x344c51).name='admin-entrance-noticeboard';
 for(const [a,c] of [[b.x-b.width/2+.3,b.x-3.65],[b.x+3.65,b.x+b.width/2-.3]]){
  box(entrance,c-a,1.03,.12,(a+c)/2,.515,frontZ,stone);
  box(entrance,c-a,.7,.12,(a+c)/2,3.25,frontZ,stone);
  box(entrance,c-a,1.55,.025,(a+c)/2,1.85,frontZ+.04,glass);
  for(let x=a+.2;x<c;x+=.5)box(entrance,.035,1.6,.06,x,1.85,frontZ+.075,white);
  for(const y of [1.05,1.6,2.65])box(entrance,c-a,.035,.06,(a+c)/2,y,frontZ+.075,white);
  registerWallCollider(a,c,frontZ-.08,frontZ+.08,0,FH);WALL_COLLIDERS.at(-1).buildingId=b.id;
 }
 window.campusCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,AVATAR_COLLISION_RADIUS,AVATAR_HEIGHT);
 window.campusPeopleCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,.64,2.15);
 // Low entrance threshold and flank ramp are visual guides at the existing zero-level entrance.
 box(entrance,4.1,.045,1.15,b.x,.025,frontZ+.65,0x93978d);
 const ramp=box(entrance,1.2,.08,3.1,b.x+4.35,.06,frontZ+1.5,0x93978d);ramp.rotation.x=-.02;
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
  const panel=box(roof,b.width+1.6,.1,length,b.x,h+.15+rise/2,b.z+sign*halfDepth/2,sign>0?0xb76f62:0xb9b28b);panel.rotation.x=sign*slope;
 }
 // Ribs share the slope and elevation of the roof panels.
 for(let x=b.x-b.width/2;x<=b.x+b.width/2;x+=.6)for(const sign of [-1,1]){
  const rib=box(roof,.025,.025,length,x,h+.22+rise/2,b.z+sign*halfDepth/2,sign>0?0x9a665a:0x96967b);rib.rotation.x=sign*slope;
 }
 // Source-backed garden landmarks stay clear of the central route.
 const garden=group(1,'photo-admin-garden');
 for(const x of [b.x-5,b.x+7.5]){
  box(garden,2.4,.28,2.5,x,.14,frontZ+4.4,0x9c9e80);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.22,3.1,8),mat(0x705c46));trunk.position.set(x,1.55,frontZ+4.4);garden.add(trunk);
  for(let i=0;i<3;i++){const crown=new THREE.Mesh(new THREE.ConeGeometry(1.3-i*.2,3.2,8),mat(i%2?0x4b6c43:0x567c45));crown.position.set(x,3.2+i*.8,frontZ+4.4);garden.add(crown)}
 }
 const cube=new THREE.Group();cube.name='photo-admin-rubiks-cube';cube.rotation.set(.45,.35,.3);garden.add(cube);
 box(cube,1.6,1.6,1.6,0,0,0,0x27312e).name='cube-core';
 const stickerColours=[0xc8564c,0xd2b649,0x659575,0x536c8e,0xd9d9cd,0xc67c3e];
 for(let face=0;face<6;face++)for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const tile=new THREE.Mesh(new THREE.PlaneGeometry(.368,.368),mat(stickerColours[(face*3+row*5+col*7)%6]));tile.name='cube-tile';
  const a=(col-1.5)*.4,c=(row-1.5)*.4;
  if(face<2){tile.position.set(a,c,face===0?.803:-.803);tile.rotation.y=face===0?0:Math.PI;}
  else if(face<4){tile.position.set(face===2?.803:-.803,c,a);tile.rotation.y=face===2?Math.PI/2:-Math.PI/2;}
  else{tile.position.set(a,face===4?.803:-.803,c);tile.rotation.x=face===4?-Math.PI/2:Math.PI/2;}
  cube.add(tile);
 }
 cube.position.y=.1-new THREE.Box3().setFromObject(cube).min.y;cube.position.x=b.x+9;cube.position.z=frontZ+4.1;
 const peacock=new THREE.Mesh(new THREE.CircleGeometry(.85,12,0,Math.PI),mat(0x568374));peacock.position.set(b.x-9,.25,frontZ+4);garden.add(peacock);
 // The source only demonstrates the shape, not botanical or equipment identities.
})();
