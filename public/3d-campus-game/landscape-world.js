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
  function tiledTexture(){
    const cvs=document.createElement('canvas');cvs.width=cvs.height=256;
    const ctx=cvs.getContext('2d');ctx.fillStyle='#8b9087';ctx.fillRect(0,0,256,256);
    let seed=731;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    // Eight half-unit slabs per four-unit tile; restrained joints avoid a grid
    // dominating the forecourt, and each slab has a slightly different tone.
    for(let y=0;y<256;y+=32)for(let x=0;x<256;x+=32){
      const brightness=166+Math.floor(random()*16);
      ctx.fillStyle=`rgb(${brightness+5},${brightness+5},${brightness-3})`;ctx.fillRect(x+.6,y+.6,30.8,30.8);
      ctx.fillStyle='rgba(242,241,224,.22)';ctx.fillRect(x+1,y+1,30,1);
    }
    for(let i=0;i<13000;i++){const shade=random()>.5?255:65;ctx.fillStyle=`rgba(${shade},${shade},${shade},.055)`;ctx.fillRect(random()*256,random()*256,1,1);}
    const texture=new THREE.CanvasTexture(cvs);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.encoding=THREE.sRGBEncoding;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
  }
  const paverTexture=tiledTexture(),paver=new THREE.MeshStandardMaterial({map:paverTexture,bumpMap:paverTexture,bumpScale:.018,roughness:.94});
  function paved(w,d,x,z){
    const geometry=new THREE.PlaneGeometry(w,d),p=geometry.attributes.position,uv=geometry.attributes.uv;
    // World-aligned UVs share both density and seam position across all aprons.
    for(let i=0;i<p.count;i++)uv.setXY(i,(x+p.getX(i))/4,(z-p.getY(i))/4);
    const mesh=new THREE.Mesh(geometry,paver);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.035,z);mesh.receiveShadow=true;decor.add(mesh);
  }
  // 前庭與銅像廣場，以及校舍之間可通行的硬鋪面。
  paved(56,30,-32,61);paved(28,26,-40,32);paved(22,42,15,28);
  paved(8,118,44,8);paved(42,7,12,51);paved(40,7,12,6);
  // User-approved parking concept. Shared footprints keep roofs and vehicles
  // inside campus, with the main driveway and shelter aisle left unobstructed.
  (()=>{
    const P=CampusOutdoorPlan.parking,T=P.twoWheel,C=P.cars;
    const group=(name,parent=decor)=>{const g=new THREE.Group();g.name=name;parent.add(g);return g;};
    const two=group('gate-two-wheel-parking'),cars=group('art-car-parking');
    const B=(g,name,x,z,w,d,y,h,color,solid=false)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.name=name;m.position.set(x,y+h/2,z);m.castShadow=m.receiveShadow=true;m.userData.parkingPhysical=solid||name.includes('roof');if(solid)m.userData.campusSolid=true;g.add(m);return m;};
    const beam=(g,a,b,r,color)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,start.distanceTo(end),6),mat(color));m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(...b).sub(new THREE.Vector3(...a)).normalize());g.add(m);return m;};
    const sign=(g,text,x,y,z,width)=>{const cv=document.createElement('canvas');cv.width=768;cv.height=128;const ctx=cv.getContext('2d');ctx.fillStyle='#234454';ctx.fillRect(0,0,768,128);ctx.fillStyle='#fff9e8';ctx.font='bold 66px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,384,67);const m=new THREE.Mesh(new THREE.PlaneGeometry(width,.46),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),side:THREE.DoubleSide}));m.position.set(x,y,z);m.rotation.y=Math.PI;g.add(m);return m;};
    function shelter(g,name,x0,x1,z,depth,label,backSide=null){
      B(g,name+'-roof',(x0+x1)/2,z,x1-x0,depth,3.05,.16,0x536d83);
      // Cantilever supports stay behind the two-wheel rows, leaving a continuous aisle.
      for(let x=x0+.3;x<x1;x+=5.8)for(const side of backSide===null?[-1,1]:[backSide])B(g,name+'-post',x,z+side*(depth/2-.12),.09,.09,0,3.05,0xaebbb8,true);
      B(g,name+'-fascia',(x0+x1)/2,z-depth/2,x1-x0,.08,2.87,.18,0x718b9b);
      sign(g,label,(x0+x1)/2,2.62,z-depth/2-.06,Math.min(8,x1-x0-1));
    }
    B(two,'two-wheel-paving',19.5,93.5,33,6,.033,.018,0xaaa99e);
    B(two,'two-wheel-aisle',19.5,T.aisleZ,32,1.65,.055,.012,0xc2beb0);
    shelter(two,'student-bicycle',T.x0,T.x1,T.bikeZ,T.roofDepth,'學生自行車棚',-1);
    shelter(two,'staff-scooter',T.x0,T.x1,T.motoZ,T.roofDepth,'教職員機車棚',1);
    const bikeRow=group('student-bicycle-row',two),motoRow=group('staff-scooter-row',two);
    function wheel(g,x,y,z,r=.3){const m=new THREE.Mesh(new THREE.TorusGeometry(r,.045,5,12),mat(0x283632));m.position.set(x,y,z);m.rotation.y=Math.PI/2;g.add(m);}
    for(let i=0,x=5.6;x<34.2;x+=1.35,i++){
      const g=group('bicycle-'+i,bikeRow);g.position.set(x,0,T.bikeZ);
      for(const z of [-.6,.6])wheel(g,0,.34,z);
      const paint=[0x4c7395,0x8f624d,0x6c895b,0xadb5ac][i%4];
      for(const [a,b] of [[ [0,.34,-.6],[0,.8,-.2] ],[[0,.8,-.2],[0,.34,.25]],[[0,.34,.25],[0,.34,-.6]],[[0,.8,-.2],[0,.85,.4]],[[0,.85,.4],[0,.34,.25]],[[0,.85,.4],[0,.34,.6]]])beam(g,a,b,.028,paint);
      B(g,'bicycle-seat',0,-.2,.24,.35,.85,.07,0x303a34);beam(g,[0,.85,.4],[0,1.04,.52],.026,0xb6c1bd);beam(g,[-.22,1.04,.52],[.22,1.04,.52],.027,0xb6c1bd);
      const proxy=B(g,'bicycle-body',0,0,.54,1.65,0,1.1,0x333333,true);proxy.visible=false;
      B(two,'bicycle-bay-line',x-.6,T.bikeZ,.025,1.65,.057,.01,0xe0dfcf);
    }
    for(let i=0,x=5.7;x<34.2;x+=1.8,i++){
      const g=group('scooter-'+i,motoRow);g.position.set(x,0,T.motoZ);
      for(const z of [-.61,.61])wheel(g,0,.3,z,.25);
      B(g,'scooter-body',0,.1,.53,1.05,.35,.4,[0x647d91,0x9c6d63,0xb6bcb2,0x3b4b48][i%4]);B(g,'scooter-seat',0,.2,.5,.72,.78,.11,0x303a34);B(g,'scooter-front',0,-.57,.5,.17,.4,.63,0xa8b6b6);beam(g,[-.3,1.02,-.6],[.3,1.02,-.6],.035,0x536363);
      const proxy=B(g,'scooter-body-clearance',0,0,.7,1.8,0,1.2,0x333333,true);proxy.visible=false;
      B(two,'scooter-bay-line',x-.83,T.motoZ,.028,1.8,.057,.01,0xe0dfcf);
    }
    // Preserve bike-shed links, but move their destination to the actual bicycle
    // aisle. Add separate staff and car destinations at clear pedestrian points.
    NAV_NODES['bike-shed']={...NAV_NODES['bike-shed'],x:19,y:0,z:T.aisleZ};
    for(const [id,name,x,z] of [['staff-moto-parking','教職員機車停車棚',28,T.aisleZ],['art-car-parking','藝術館旁汽車停車區',C.aisleX,76]]){
      NAV_NODES[id]={id,x,y:0,z,neighbors:[]};ROOMS_DB[id]={id,name,code:id==='staff-moto-parking'?'PARK-MOTO':'PARK-CAR',floor:1,buildingId:'park',buildingName:'校園停車設施',cat:'admin',node:id};
    }
    B(cars,'car-park-paving',(C.x0+C.x1)/2,(C.z0+C.z1)/2,C.x1-C.x0,C.z1-C.z0,.034,.02,0x858e88);
    B(cars,'pedestrian-sidewalk',60.4,66.9,1.9,27.4,.056,.014,0xcec9b9);
    B(cars,'art-connecting-walk',71.2,54.1,29,1.5,.056,.014,0xcec9b9);
    function bay(x,z,w=6,d=3.5){for(const side of [-1,1]){B(cars,'parking-line',x+side*w/2,z,.045,d,.059,.013,0xe8e6d6);B(cars,'parking-line',x,z+side*d/2,w,.045,.059,.013,0xe8e6d6);}}
    B(cars,'art-accessible-bay',C.westX,57.5,6,4.4,.059,.015,0x4f85a8);bay(C.westX,57.5,6,4.4);
    for(let z=59.9;z<61.4;z+=.32){const line=B(cars,'accessible-hatch',C.westX,z,6,.04,.059,.016,0xe8e6d6);line.rotation.y=.07;}
    const cv=document.createElement('canvas');cv.width=cv.height=128;const ctx=cv.getContext('2d');ctx.fillStyle='#fff8e3';ctx.font='100px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('♿',64,66);const icon=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.7),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true}));icon.rotation.x=-Math.PI/2;icon.position.set(C.westX,.09,57.5);cars.add(icon);
    function car(x,z,color,heading=Math.PI/2){
      const g=group('parked-car',cars);g.position.set(x,0,z);g.rotation.y=heading;
      B(g,'car-body',0,0,1.65,3.8,.3,.62,color);B(g,'car-cabin',0,-.1,1.45,1.9,.92,.6,0x52656d);B(g,'car-roof',0,-.12,1.48,1.5,1.52,.1,color);
      for(const xx of [-.86,.86])for(const zz of [-1.18,1.18]){const tire=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,.16,8),mat(0x2e3734));tire.rotation.z=Math.PI/2;tire.position.set(xx,.33,zz);g.add(tire);}
      for(const zz of [-1.92,1.92])B(g,'car-light',0,zz,1.3,.045,.55,.17,zz<0?0xe9e4c6:0x9f5e52);
      const proxy=B(g,'car-clearance',0,0,1.8,4.1,0,1.65,0x333333,true);proxy.visible=false;
    }
    for(const [i,z] of [63.5,67.2,70.9,74.6,78.3].entries()){bay(C.westX,z);car(C.westX,z,[0xb8c6ca,0x477797,0x9a685b,0xc3bda8,0x485851][i],Math.PI/2);}
    for(const [i,z] of [57.3,61,64.7,68.4,72.1,75.8].entries()){bay(C.eastX,z);if(i!==4)car(C.eastX,z,[0xb2b9b0,0x535f64,0x99605a,0xd0ccba,0x78927a,0x54768f][i%6],-Math.PI/2);}
    // The narrow strip south of the driveway accommodates a parallel covered
    // row, keeping cars/posts out of the existing red vehicle lane.
    B(cars,'covered-row-paving',(C.coveredX0+C.coveredX1)/2,C.coveredZ,C.coveredX1-C.coveredX0,2.8,.033,.02,0x929a91);
    shelter(cars,'existing-blue-car-canopy',C.coveredX0,C.coveredX1,C.coveredZ,2.65,'汽車停車棚');
    for(let i=0,x=70.6;x<92;x+=4.8,i++){bay(x,C.coveredZ,4.7,2.35);car(x,C.coveredZ,[0xb8c2bc,0x4c667a,0xb6afa0,0x895e55,0x425e51][i%5]);}
    // Flat arrows, not posts in the manoeuvring aisle.
    for(const [x,z,dir] of [[71.6,69,-1],[74.9,66,1]]){
      B(cars,'aisle-arrow-stem',x,z,.12,1.3,.06,.01,0xe8e6d6);
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([x-.45,.075,z+dir*.45,x+.45,.075,z+dir*.45,x,.075,z+dir*1.2],3));geometry.computeVertexNormals();cars.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xe8e6d6,side:THREE.DoubleSide})));
    }
    sign(cars,'藝術館旁汽車停車區',84.8,1.5,80.4,6);
  })();
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
  // Aerial reference: retain the existing fence behind a continuous west bank
  // and low stepped east bank, with the pavilion/pond gap left open.
  const banks=CampusOutdoorPlan.lanBanks,bankStone=0x8b9387,bankCap=0xb4b9ac;
  const bankBox=(name,w,h,d,x,y,z,color,solid=true)=>{const m=box(w,h,d,x,y,z,color,solid);m.name=name;m.userData.lanBank=true;return m};
  const w=banks.wall,wallX=(w.x0+w.x1)/2,wallZ=(w.z0+w.z1)/2;
  bankBox('lan-left-retaining-wall',w.x1-w.x0,w.height,w.z1-w.z0,wallX,w.height/2,wallZ,bankStone);
  bankBox('lan-left-wall-cap',w.x1-w.x0+.18,.16,w.z1-w.z0+.24,wallX,w.height+.08,wallZ,bankCap);
  for(let x=w.x0+.25;x<w.x1;x+=7.8){
    bankBox('lan-left-wall-buttress',.42,w.height,.28,x,w.height/2,w.z1+.1,0x7a8478);
    bankBox('lan-left-wall-joint',.035,w.height-.2,.016,x+.65,w.height/2,w.z1+.012,0x697569,false);
  }
  const s=banks.steps,run=(s.z1-s.z0)/s.count;
  for(let i=0;i<s.count;i++){
    const h=(i+1)*s.rise,z=s.z1-(i+.5)*run;
    // Treads share their exact elevations with the support/movement model.
    const tread=bankBox('lan-right-tread-'+(i+1),s.x1-s.x0,h,run,(s.x0+s.x1)/2,h/2,z,i%2?0x929b8f:0x9da598,false);
    tread.userData.lanBankTread=true;
    bankBox('lan-right-tread-nosing-'+(i+1),s.x1-s.x0,.018,.055,(s.x0+s.x1)/2,h+.009,z+run/2-.04,bankCap,false);
  }
  const backHeight=s.count*s.rise+.9;
  bankBox('lan-right-bank-back-wall',s.x1-s.x0+.4,backHeight,.4,(s.x0+s.x1)/2,backHeight/2,s.z0-.2,bankStone);
  bankBox('lan-right-bank-back-cap',s.x1-s.x0+.6,.13,.55,(s.x0+s.x1)/2,backHeight+.065,s.z0-.2,bankCap);
  // Low side cheeks ascend with the treads; they prevent leaving a high tier
  // sideways while leaving the full front edge open toward the court apron.
  for(const x of [s.x0,s.x1])for(let i=0;i<s.count;i++){
    const h=(i+1)*s.rise+.42;
    bankBox('lan-right-bank-side',.3,h,run,x,h/2,s.z1-(i+.5)*run,bankStone);
  }
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
  for(let i=0;i<7;i++)box(1,.015,7,CampusEntranceAvenue.plan.x-9+i*2,.055,79,0xf0efdf);

  // Register only physical parts. Ground paint, tree canopies and distant hills
  // remain visual; bounding the whole group would close surrounding paths.
  scene.updateMatrixWorld(true);
  const statue=scene.getObjectByName('photo-statue-courtyard');
  statue?.traverse(mesh=>{
    if(mesh.isMesh&&/^(stone-|front-|bust-|hedge-stone-edge-|trimmed-shrub-)/.test(mesh.name))mesh.userData.campusSolid=true;
  });
  scene.traverse(mesh=>{
    if(!mesh.isMesh||(!mesh.userData.campusSolid&&!mesh.userData.campusPlanting))return;
    const bounds=new THREE.Box3().setFromObject(mesh);
    // Planting is not paving: low soil meshes otherwise sit below the motor's
    // 0.2 foot tolerance. Use their exact footprint with a low ground barrier,
    // before building all player, people and navigation collision indices.
    const top=mesh.userData.campusPlanting?Math.max(bounds.max.y,bounds.min.y+.35):bounds.max.y;
    registerWallCollider(bounds.min.x,bounds.max.x,bounds.min.z,bounds.max.z,bounds.min.y,top);
    const collider=WALL_COLLIDERS[WALL_COLLIDERS.length-1];
    collider.landmark=true;collider.source=mesh.name||mesh.geometry.type;
    if(mesh.userData.campusPlanting)collider.planting=true;
    if(mesh.userData.lanBank)collider.lanBank=true;
  });
})();
