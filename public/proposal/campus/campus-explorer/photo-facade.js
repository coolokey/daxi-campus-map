/* admin-front match: S__66011285–95 + aerial 05/11. Room names/floors stay in the plan.
 * Attachments are independent of the replaced legacy floor groups.
 */
(()=>{
 const api=window.campusExplorer,actual=BUILDINGS_CONFIG.find(b=>b.id==='admin-front');if(!api||!actual)return;
 const frame=CampusSpatialPlan.layout(actual),b={...actual,x:0,z:0,width:frame.L,depth:frame.D};
 const materials=new Map(),mat=c=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.97}));return materials.get(c)};
 function group(f,name){const g=new THREE.Group();g.name=name;g.userData={buildingId:b.id,floorNum:f};g.position.set(actual.x,0,actual.z);g.rotation.y=-Math.PI/2;api.scene.add(g);floorMeshes.push(g);return g}
 function photoCollider(x0,x1,z0,z1,y0,y1){const r=frame.rect(x0,x1,z0,z1);registerWallCollider(r.x0,r.x1,r.z0,r.z1,y0,y1);Object.assign(WALL_COLLIDERS.at(-1),{buildingId:b.id,persistent:true});}
 function box(g,w,h,d,x,y,z,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),c?.isMaterial?c:mat(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);return m}
 const frontZ=b.z+b.depth/2,white=0xb4b8ae,teal=0x447b79;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#aaa9a1';ctx.fillRect(0,0,128,128);
 for(let i=0;i<1800;i++){const n=(i*73)%128,m=(i*37+Math.floor(i/128)*11)%128;ctx.fillStyle=i%3?'#b8b7b0':'#818781';ctx.fillRect(n,m,1,1);}
 const stoneTexture=new THREE.CanvasTexture(canvas);stoneTexture.wrapS=stoneTexture.wrapT=THREE.RepeatWrapping;stoneTexture.encoding=THREE.sRGBEncoding;
 const stone=new THREE.MeshStandardMaterial({color:0xd1d0c7,map:stoneTexture,roughness:.98});
 const windowGlass=new THREE.MeshStandardMaterial({color:0x647e85,transparent:true,opacity:.72,roughness:.26});
 // The upper corridors are inside this closed stone-and-window envelope.
 // Only the existing ground-floor central and end entrances stay open.
 for(let f=1;f<=b.floors;f++){
  const g=group(f,`photo-admin-facade-${f}`),y=(f-1)*FH;
  box(g,b.width,.22,.24,b.x,y+FH-.05,frontZ+.13,stone);
  for(const x of [b.x-b.width/2+.4,b.x+b.width/2-.4])box(g,.38,FH,.3,x,y+FH/2,frontZ+.05,white);
  if(f>1){
   box(g,b.width,.95,.24,b.x,y+.475,frontZ+.04,stone).name='admin-window-stone-sill';
   box(g,b.width,FH-2.75,.24,b.x,y+(FH+2.75)/2,frontZ+.04,stone).name='admin-window-stone-lintel';
   const bays=12,pitch=b.width/bays,pier=.34;
   for(let i=0;i<=bays;i++){
    const x=b.x-b.width/2+i*pitch;
    box(g,pier,FH,.34,x,y+FH/2,frontZ+.02,stone).name='admin-window-stone-pier';
    if(i===bays)continue;
    const center=x+pitch/2,width=pitch-pier;
    box(g,width,1.8,.045,center,y+1.85,frontZ+.025,windowGlass).name='admin-reflective-window';
    for(const dx of [-width/2,0,width/2])box(g,.045,1.8,.09,center+dx,y+1.85,frontZ+.08,white);
    for(const dy of [-.9,.42,.9])box(g,width,.045,.09,center,y+1.85+dy,frontZ+.08,white);
   }
   photoCollider(b.x-b.width/2,b.x+b.width/2,frontZ-.08,frontZ+.08,y,y+FH);
  }
 }
 const entrance=group(1,'photo-admin-entrance');
 // The new close-up shows a two-storey stone porch, not a low canopy.
 // Its posts and open glass leaves preserve the existing central route.
 for(const x of [b.x-2.8,b.x+2.8]){
  box(entrance,.55,6.85,.55,x,3.425,frontZ+1.65,stone).name='admin-porch-column';
  photoCollider(x-.275,x+.275,frontZ+1.375,frontZ+1.925,0,6.85);
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
  photoCollider(x-.425,x+.425,frontZ+.12,frontZ+.18,0,2.3);
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
  photoCollider(a,c,frontZ-.08,frontZ+.08,0,FH);
 }
 // The shared spatial model builds both indexes after all physical scenery.
 // Low entrance threshold and flank ramp are visual guides at the existing zero-level entrance.
 box(entrance,4.1,.045,1.15,b.x,.025,frontZ+.65,0x93978d);
 const ramp=box(entrance,1.2,.08,3.1,b.x+4.35,.06,frontZ+1.5,0x93978d);ramp.rotation.x=-.02;
 for(const x of [b.x+3.75,b.x+4.95])for(const h of [.55,.9]){
  box(entrance,.035,.035,3.1,x,h,frontZ+1.5,0xaab5b4);
  for(const z of [frontZ+.1,frontZ+1.5,frontZ+2.9])box(entrance,.035,h,.035,x,h/2,z,0xaab5b4);
 }
 for(const x of [b.x-3.9,b.x+5.9]){const urn=new THREE.Mesh(new THREE.CylinderGeometry(.36,.2,.6,12),mat(0xcdcec4));urn.position.set(x,.3,frontZ+.65);entrance.add(urn)}
 // S__66011292: the small entrance is on the gate-side short wall, under a low dark awning.
 // Its exact dimensions/interior arrangement are schematic; it is distinct from the tall main porch.
 const side=group(1,'photo-admin-side-entrance'),sideU=b.width/2,sideV=actual.spatialProfile.front.sideEntrance.v;
 // The same gate-side end wall is closed above the awning in S__66011292.
 for(let f=2;f<=b.floors;f++){
  const wall=group(f,`photo-admin-side-wall-${f}`),y=(f-1)*FH;
  box(wall,.18,FH,b.depth,sideU+.13,y+FH/2,0,stone).name='admin-gate-side-stone-wall';
  photoCollider(sideU+.04,sideU+.22,-b.depth/2,b.depth/2,y,y+FH);
 }
 for(const [a,c] of [[-b.depth/2,sideV-.95],[sideV+.95,b.depth/2]]){
  box(side,.16,FH,c-a,sideU,FH/2,(a+c)/2,stone).name='admin-side-wall';photoCollider(sideU-.08,sideU+.08,a,c,0,FH);
 }
 box(side,.16,FH-2.25,1.9,sideU,(FH+2.25)/2,sideV,stone);
 photoCollider(sideU-.08,sideU+.08,sideV-.95,sideV+.95,2.25,FH);
 for(const z of [sideV-.95,sideV+.95])box(side,.18,2.25,.045,sideU,1.125,z,white);
 const sideCanopy=box(side,1.5,.12,2.4,sideU+.7,2.65,sideV,0x354b50);sideCanopy.rotation.z=-.12;sideCanopy.name='admin-side-canopy';
 box(side,1.4,.04,1.9,sideU+.65,.025,sideV,0x93978d).name='admin-side-threshold';
 // The new side passage has no photo-confirmed rear exit.
 const passageStart=sideU-actual.spatialProfile.front.sideEntrance.width;
 box(side,sideU-passageStart,FH,.16,(passageStart+sideU)/2,FH/2,-b.depth/2,stone).name='admin-side-passage-back-wall';
 photoCollider(passageStart,sideU,-b.depth/2-.08,-b.depth/2+.08,0,FH);
 // Close the unconfirmed opposite corridor end instead of duplicating the main entrance.
 box(side,.16,FH,2.8,-sideU,FH/2,frontZ-1.4,stone);photoCollider(-sideU-.08,-sideU+.08,frontZ-2.8,frontZ,0,FH);
 // Two-colour low roof surfaces follow the matched aerial, retaining roof-cut controls.
 const oldRoofs=[];api.scene.traverse(o=>{if(o.userData?.buildingId===b.id&&o.userData.roof)oldRoofs.push(o)});
 for(const o of oldRoofs){o.parent?.remove(o);const i=floorMeshes.indexOf(o);if(i>=0)floorMeshes.splice(i,1);o.geometry?.dispose()}
 const roof=group(b.floors,'photo-admin-roof');roof.userData.roof=true;
 const h=b.floors*FH,rise=1.35,halfDepth=b.depth/2+.45,halfWidth=b.width/2+.45,ridgeHalf=halfWidth-halfDepth;
 // Four planes share their hip edges and one inset ridge: no rectangular
 // slope projects past the two triangular end roofs into an adjacent wing.
 const lf=[-halfWidth,0,halfDepth],rf=[halfWidth,0,halfDepth],lb=[-halfWidth,0,-halfDepth],rb=[halfWidth,0,-halfDepth];
 const rl=[-ridgeHalf,rise,0],rr=[ridgeHalf,rise,0],positions=[],roofGeometry=new THREE.BufferGeometry();
 for(const [i,vertices] of [[lf,rf,rr,rl],[rb,lb,rl,rr],[rf,rb,rr],[lb,lf,rl]].entries()){
  const start=positions.length/3;
  for(let t=1;t<vertices.length-1;t++)positions.push(...vertices[0],...vertices[t],...vertices[t+1]);
  roofGeometry.addGroup(start,positions.length/3-start,i);
 }
 roofGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));roofGeometry.computeVertexNormals();
 const panel=new THREE.Mesh(roofGeometry,[mat(0xb76f62),mat(0xb9b28b),mat(0xb9b28b),mat(0xb9b28b)]);
 panel.name='admin-hip-roof';panel.position.set(b.x,h+.15,b.z);panel.castShadow=panel.receiveShadow=true;roof.add(panel);
 for(const z of [b.z-halfDepth,b.z+halfDepth])box(roof,halfWidth*2,.12,.12,b.x,h+.08,z,teal);
 for(const x of [b.x-halfWidth,b.x+halfWidth])box(roof,.12,.12,halfDepth*2,x,h+.08,b.z,teal);
 // S__66011287.jpg fixes the front-view order and outer-bed placement:
 // peacock left, cube right, both beyond the main cypresses. Units are schematic.
 const garden=group(1,'photo-admin-garden');
 const beds=[{name:'admin-left-flowerbed',min:b.x-b.width/2-1,max:b.x-3.5},
  {name:'admin-right-flowerbed',min:b.x+5.5,max:b.x+b.width/2+1}];
 for(const bed of beds){
  const center=(bed.min+bed.max)/2,width=bed.max-bed.min;
  box(garden,width,.16,3.9,center,.08,frontZ+3.55,0x5b703f).name=bed.name;
  // Low edging encloses each planting strip without crossing either approach.
  for(const z of [frontZ+1.6,frontZ+5.5])box(garden,width,.14,.12,center,.07,z,0x9c927e);
  for(const x of [bed.min,bed.max])box(garden,.12,.14,3.9,x,.07,frontZ+3.55,0x9c927e);
 }
 for(const x of [b.x-5,b.x+7.5]){
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.22,3.1,8),mat(0x705c46));trunk.position.set(x,1.55,frontZ+4.4);trunk.userData.campusSolid=true;garden.add(trunk);
  for(let i=0;i<3;i++){const crown=new THREE.Mesh(new THREE.ConeGeometry(1.3-i*.2,3.2,8),mat(i%2?0x4b6c43:0x567c45));crown.position.set(x,3.2+i*.8,frontZ+4.4);garden.add(crown)}
 }
 const cube=new THREE.Group();cube.name='photo-admin-rubiks-cube';cube.rotation.set(.45,.35,.3);garden.add(cube);
 const core=box(cube,1.6,1.6,1.6,0,0,0,0x27312e);core.name='cube-core';core.userData.campusSolid=true;
 const stickerColours=[0xc8564c,0xd2b649,0x659575,0x536c8e,0xd9d9cd,0xc67c3e];
 for(let face=0;face<6;face++)for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const tile=new THREE.Mesh(new THREE.PlaneGeometry(.368,.368),mat(stickerColours[(face*3+row*5+col*7)%6]));tile.name='cube-tile';
  const a=(col-1.5)*.4,c=(row-1.5)*.4;
  if(face<2){tile.position.set(a,c,face===0?.803:-.803);tile.rotation.y=face===0?0:Math.PI;}
  else if(face<4){tile.position.set(face===2?.803:-.803,c,a);tile.rotation.y=face===2?Math.PI/2:-Math.PI/2;}
  else{tile.position.set(a,face===4?.803:-.803,c);tile.rotation.x=face===4?-Math.PI/2:Math.PI/2;}
  cube.add(tile);
 }
 cube.position.y=.18-new THREE.Box3().setFromObject(cube).min.y;cube.position.x=b.x+b.width*.46;cube.position.z=frontZ+4.1;
 const peacock=new THREE.Mesh(new THREE.CircleGeometry(.85,12,0,Math.PI),mat(0x568374));peacock.name='photo-admin-peacock';peacock.position.set(b.x-b.width*.46,.18,frontZ+4.8);garden.add(peacock);
 // The source only demonstrates the shape, not botanical or equipment identities.
})();
