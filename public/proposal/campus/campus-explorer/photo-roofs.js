/* Roof appearance from 1151015 aerials 125655, 125842 and 125931.
 * Dimensions remain schematic. Existing footprints, rooms and routes are authoritative.
 * admin-front is handled independently by photo-facade.js.
 */
const CampusPhotoRoofs=(()=>{
 const ids=new Set(['admin-front','grade8-front','grade8-mid','grade9-back','art-building','tech-building']);
 function build({scene,layouts,floorMeshes,height=3.6}){
  const materials=new Map(),material=color=>{
   if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.97,side:THREE.DoubleSide}));
   return materials.get(color);
  };
  // Some spatial roofs carry only roof:true; their floor group owns buildingId.
  // Only explicit roof objects are removed: floor slabs and corridor ceilings stay.
  const obsolete=[];
  scene.traverse(o=>{if(!o.userData?.roof||o.name==='photo-admin-roof')return;let owner=o;while(owner&&!owner.userData?.buildingId)owner=owner.parent;if(ids.has(owner?.userData.buildingId))obsolete.push(o)});
  for(const o of obsolete){o.parent?.remove(o);const i=floorMeshes.indexOf(o);if(i>=0)floorMeshes.splice(i,1);o.traverse(c=>c.geometry?.dispose())}
  const built=[];
  for(const l of layouts){
   if(!ids.has(l.id))continue;
   const g=new THREE.Group();g.name='photo-roof-'+l.id;g.userData={buildingId:l.id,floorNum:l.b.floors,roof:true};
   const y=l.b.floors*height,batches=new Map();
   // Merge opaque details per colour into one static mesh, including tile lines.
   function add(geometry,color,x=0,h=0,z=0,rx=0,rz=0){
    const matrix=new THREE.Matrix4().compose(new THREE.Vector3(x,h,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,0,rz)),new THREE.Vector3(1,1,1));
    const geom=geometry.index?geometry.toNonIndexed():geometry;geom.applyMatrix4(matrix);
    if(!batches.has(color))batches.set(color,{positions:[],normals:[]});
    const data=batches.get(color);data.positions.push(...geom.attributes.position.array);data.normals.push(...geom.attributes.normal.array);
    geom.dispose();if(geom!==geometry)geometry.dispose();
   }
   function box(w,h,d,x,cy,z,color,rx=0,rz=0){add(new THREE.BoxGeometry(w,h,d),color,x,cy,z,rx,rz)}
   function localBox(u,v,length,depth,h,cy,color,slope=0){
    const p=l.world(u,v);box(l.horizontal?length:depth,h,l.horizontal?depth:length,p.x,cy,p.z,color,l.horizontal?slope:0,l.horizontal?0:-slope);
   }
   function pitched(p,{color=0xd8cd9c,rise=.72,overhang=.25,endColor=0xb66c5b,tiles=false}={}){
    const u=(p.u0+p.u1)/2,v=(p.v0+p.v1)/2,length=p.u1-p.u0+overhang*2,half=(p.v1-p.v0)/2+overhang;
    const angle=Math.atan2(rise,half),slopeLength=Math.hypot(half,rise);
    for(const sign of [-1,1]){
     localBox(u,v+sign*half/2,length,slopeLength,.09,y+.1+rise/2,color,sign*angle);
     localBox(u,v+sign*half,length,.14,.12,y+.1,endColor);
    }
    // Small triangular end faces close the shallow gable, without extruding walls.
    for(const end of [p.u0-overhang,p.u1+overhang]){
     const pts=[[end,v-half,y+.1],[end,v+half,y+.1],[end,v,y+.1+rise]].map(([a,b,h])=>l.world(a,b,h));
     const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(pts.flatMap(q=>[q.x,q.y,q.z]),3));geom.computeVertexNormals();add(geom,endColor);
    }
    localBox(u,v,length,.09,.08,y+.14+rise,0xc3b789);
    // A sparse rib/tile rhythm is visible from the aerial; batch rather than per-tile draws.
    const spacing=tiles?.65:1.4;
    for(let a=p.u0;a<=p.u1;a+=spacing)for(const sign of [-1,1])localBox(a,v+sign*half/2,.026,slopeLength,.022,y+.16+rise/2,tiles?0xb6aa7f:0xc4ba8e,sign*angle);
    if(tiles)for(let d=.75;d<half;d+=.75)for(const sign of [-1,1])localBox(u,v+sign*d,length,.025,.018,y+.17+rise*(1-d/half),0xb9ad81);
   }
   const top=l.footprints.filter(p=>p.floor===l.b.floors);
   if(l.id==='admin-front'){
    // The front hip roof belongs to photo-facade; the connected roof reaches it.
    for(const p of top.filter(p=>p.part==='inner'))pitched(p,{color:0xd9b38d,rise:.65,overhang:.16});
    for(const p of top.filter(p=>p.part==='connector')){
     const half=(p.u1-p.u0)/2+.16,len=p.v1-p.v0+.5,rise=.28,angle=Math.atan2(rise,half),depth=Math.hypot(half,rise),x=(p.u0+p.u1)/2,z=(p.v0+p.v1)/2;
     for(const sign of [-1,1])box(depth,.09,len,l.b.x+x+sign*half/2,y+.1+rise/2,l.b.z+z,0xd9b38d,0,-sign*angle);
    }
   }else if(l.id==='tech-building'){
    // Each white flat roof occupies one existing wing. No rectangle spans the courtyard.
    for(const p of top){
     const u=(p.u0+p.u1)/2,v=(p.v0+p.v1)/2,L=p.u1-p.u0,D=p.v1-p.v0;
     localBox(u,v,L,D,.14,y+.07,0xe3e3da);
     for(const a of [p.u0+.07,p.u1-.07])localBox(a,v,.14,D,.36,y+.18,0xc6c9c3);
     for(const a of [p.v0+.07,p.v1-.07])localBox(u,a,L,.14,.36,y+.18,0xc6c9c3);
    }
    const nose=l.facadeFeatures?.roundedNose;if(nose){const p=l.world(nose.u,nose.v);add(new THREE.CylinderGeometry(nose.radius,nose.radius,.14,24,1,false,0,Math.PI),0xe3e3da,p.x,y+.07,p.z);}
   }else if(l.id==='art-building'){
    for(const p of top)pitched(p,{rise:.95,tiles:true,overhang:.22});
    // Only a modest grey equipment box can be identified; no speculative towers.
    const p=top[0];if(p)localBox(p.u0+2,(p.v0+p.v1)/2,2.4,2.1,.7,y+1.25,0x9d9f98);
   }else if(l.id==='admin-gallery'){
    // Gallery layout uses world x/z as u/v; each narrow strip has its own ridge.
    for(const p of top){
     if(p.u1-p.u0>=p.v1-p.v0)pitched(p,{color:0xd6b08b,rise:.24,overhang:.08});
     else{
      // Rotate the helper's local axes for the long north/south bridge only.
      // Use a separate local builder rather than mutate the shared navigation layout.
      const half=(p.u1-p.u0)/2+.08,len=p.v1-p.v0+.16,rise=.24,angle=Math.atan2(rise,half),depth=Math.hypot(half,rise);
      const x=(p.u0+p.u1)/2,z=(p.v0+p.v1)/2;
      for(const sign of [-1,1]){box(depth,.09,len,x+sign*half/2,y+.1+rise/2,z,0xd6b08b,0,-sign*angle);box(.12,.12,len,x+sign*half,y+.1,z,0xb66c5b)}
     }
    }
   }else for(const p of top)pitched(p,{color:l.id==='admin-back'?0xd9b38d:0xd9d0a3,rise:l.id==='admin-back'?.65:.58});
   for(const [color,data] of batches){const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(data.positions,3));geom.setAttribute('normal',new THREE.Float32BufferAttribute(data.normals,3));geom.computeBoundingSphere();const mesh=new THREE.Mesh(geom,material(color));mesh.castShadow=mesh.receiveShadow=true;g.add(mesh)}
   scene.add(g);floorMeshes.push(g);built.push(g);
  }
  return built;
 }
 return{build};
})();
(()=>{const api=window.campusExplorer,world=window.campusWalkWorld;if(api&&world)CampusPhotoRoofs.build({scene:api.scene,layouts:world.layouts,floorMeshes,height:typeof FH==='undefined'?3.6:FH})})();
