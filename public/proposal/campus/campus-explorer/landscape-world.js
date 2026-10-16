/* Build physical landscape before collision indexing and navigation. */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,camera,controls}=api;
  const palette={stone:0xd0c9bd,brick:0xb88d84,leaf:0x567657,soil:0x8d7761};
  const materials=new Map();
  const mat=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.86}));return materials.get(color)};
  const decor=new THREE.Group();decor.name='campus-landscape-refinement';scene.add(decor);
  function box(w,h,d,x,y,z,color,solid=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;decor.add(m);if(solid)m.userData.campusSolid=true;return m}
  function tiledTexture(wall=false){
    const cvs=document.createElement('canvas');cvs.width=cvs.height=256;
    const ctx=cvs.getContext('2d');ctx.fillStyle=wall?'#b88d84':'#a1a79b';ctx.fillRect(0,0,256,256);
    const size=wall?16:32;
    for(let y=0;y<256;y+=size)for(let x=0;x<256;x+=size){
      const brightness=wall?136+(x+y)%24:148+(x*3+y)%13;
      ctx.fillStyle=wall?`rgb(${brightness+25},${brightness},${brightness-7})`:`rgb(${brightness+8},${brightness+8},${brightness+1})`;
      ctx.fillRect(x+1,y+1,size-2,size-2);
    }
    const texture=new THREE.CanvasTexture(cvs);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(wall?3:8,wall?2:8);texture.encoding=THREE.sRGBEncoding;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
  }
  const paver=new THREE.MeshStandardMaterial({map:tiledTexture(),roughness:.93});
  function paved(w,d,x,z){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,d),paver);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.035,z);mesh.receiveShadow=true;decor.add(mesh)}
  // 前庭與銅像廣場，以及校舍之間可通行的硬鋪面。
  paved(56,30,-32,61);paved(28,26,-40,32);paved(22,42,15,28);
  paved(8,118,44,8);paved(42,7,12,51);paved(40,7,12,6);
  function planter(x,z,w,d){
    box(w,.32,d,x,.17,z,0xbfc7af,true);box(w-.35,.08,d-.35,x,.37,z,palette.soil);
    const count=Math.max(2,Math.floor(w/1.5));
    for(let i=0;i<count;i++){
      const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.66,1),mat(i%2?0x557a52:0x719461));leaf.scale.set(1,.65,.85);leaf.position.set(x-w/2+.7+i*(w-1.4)/(count-1),.77,z);leaf.castShadow=true;leaf.userData.campusSolid=true;decor.add(leaf);
    }
  }
  // Keep the 907 doorway and teaching-block corridors clear of planters.
  for(const x of [15,19.5])for(const z of [16,29,41])planter(x,z,2,4);
  for(const x of [-43,-27])planter(x,44,6,1.8);
  for(const z of [40,52,64,76])planter(-53,z,2,4);
  // 柔和綠籬與座椅形成中庭尺度，保留縱向通廊。
  for(const z of [22,35]){
    // Turn benches along the east edge, keeping the center walking lane open.
    box(.75,.18,3.2,20.4,.72,z,0x997554,true);
    box(.65,.6,.16,20.4,.34,z-1.2,0x52615a,true);box(.65,.6,.16,20.4,.34,z+1.2,0x52615a,true);
  }
  // The plan-derived outdoor perimeter now owns the visible northern barrier
  // and its collision. Keep the trees, avoiding a second non-solid decor wall.
  // Track-side shade, tree wells and low brick seating from the 2019 series.
  paved(86,2.2,-88,5.4);
  for(let x=-126;x<=-79;x+=7.8){
    box(2.1,.3,1.6,x,.16,7.6,0x987867,true);box(1.75,.03,1.3,x,.32,7.6,palette.soil);
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.2,3.3,8),mat(0x76644c));trunk.position.set(x,1.65,7.6);trunk.userData.campusSolid=true;decor.add(trunk);
    for(let i=0;i<2;i++){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),mat(i?0x6d8351:0x587849));leaf.position.set(x+(i?.45:-.3),3.6+i*.6,7.6);leaf.scale.y=.8;decor.add(leaf)}
    box(2,.12,.45,x,.48,8.55,0x9e8468,true);
  }
  for(let i=0;i<30;i++){
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(3.2+(i%3)*.7,1),mat([0x365b47,0x416851,0x51765a][i%3]));
    crown.position.set(-135+i*7.5,4.2+(i%4)*.7,-82-(i%2)*4);crown.scale.y=1.2;crown.castShadow=true;decor.add(crown);
  }
  for(let i=0;i<12;i++){
    const hill=new THREE.Mesh(new THREE.SphereGeometry(18+(i%3)*6,16,10),mat([0x365b47,0x416851,0x51765a][i%3]));
    hill.position.set(-155+i*25,-3,-110-(i%2)*10);hill.scale.set(1.2,.55,1);hill.receiveShadow=true;decor.add(hill);
  }
  // 補上車道標線，採低對比標線避免畫面喧賓奪主。
  for(let z=-66;z<79;z+=10)box(.18,.015,3.5,52.5,.045,z,0xdfdecd);
  for(let x=2;x<90;x+=10)box(3.5,.015,.18,x,.045,86,0xdfdecd);
  for(let i=0;i<7;i++)box(1,.015,7,-19+i*2,.055,79,0xf0efdf);

  // Register only physical parts. Ground paint, tree canopies and distant hills
  // remain visual; bounding the whole group would close surrounding paths.
  scene.updateMatrixWorld(true);
  const statue=scene.getObjectByName('photo-statue-courtyard');
  statue?.traverse(mesh=>{
    if(mesh.isMesh&&/^(stone-|front-|bust-|hedge-stone-edge-|trimmed-shrub-)/.test(mesh.name))mesh.userData.campusSolid=true;
  });
  scene.traverse(mesh=>{
    if(!mesh.isMesh||!mesh.userData.campusSolid)return;
    const bounds=new THREE.Box3().setFromObject(mesh);
    registerWallCollider(bounds.min.x,bounds.max.x,bounds.min.z,bounds.max.z,bounds.min.y,bounds.max.y);
    const collider=WALL_COLLIDERS[WALL_COLLIDERS.length-1];
    collider.landmark=true;collider.source=mesh.name||mesh.geometry.type;
  });
})();
