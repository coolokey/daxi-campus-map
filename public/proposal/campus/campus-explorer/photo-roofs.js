/* Roof appearance from 1151015 aerials 125655, 125842 and 125931.
 * Dimensions remain schematic. Existing footprints, rooms and routes are authoritative.
 * admin-front is handled independently by photo-facade.js.
 */
const CampusPhotoRoofs=(()=>{
 const ids=new Set(['admin-front','grade8-front','grade8-mid','grade9-back','art-building','tech-building','health-bld']);
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
   // photo-facade owns the entire administrative hip roof, including the
   // inner/connector body. Cleanup above still removes its inherited sheets.
   if(!ids.has(l.id)||l.id==='admin-front')continue;
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
    const p=l.world(u,v),reverse=l.b.spatialProfile.orientation==='statue';box(l.horizontal?length:depth,h,l.horizontal?depth:length,p.x,cy,p.z,color,l.horizontal?slope:0,l.horizontal?0:(reverse?slope:-slope));
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
   function detail(name,u,v,length,depth,h,cy,color,parent=g){const p=l.world(u,v,cy),m=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?length:depth,h,l.horizontal?depth:length),material(color));m.name=name;m.position.set(p.x,p.y,p.z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
   function faces(name,polygons,color,parent=g){const points=[];for(const polygon of polygons){const p=polygon.map(([u,v,h])=>l.world(u,v,h));for(let i=1;i<p.length-1;i++)for(const q of [p[0],p[i],p[i+1]])points.push(q.x,q.y,q.z);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));geo.computeVertexNormals();const m=new THREE.Mesh(geo,material(color));m.name=name;m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
   const top=l.footprints.filter(p=>p.floor===l.b.floors);
   if(l.id==='grade9-back'){
    for(const p of top){
     if(p.part==='grade9-classroom-body')pitched(p,{color:0xd9d0a3,rise:.58});
     else if(p.part==='grade9-side-service'){
      const u=(p.u0+p.u1)/2,v=(p.v0+p.v1)/2;
      localBox(u,v,p.u1-p.u0,p.v1-p.v0,.16,y+.08,0x969b94);
      for(const side of [p.v0+.07,p.v1-.07])localBox(u,side,p.u1-p.u0,.14,.4,y+.2,0x858d87);
     }
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
    // The new aerial resolves a small flat-roof stair head and scattered vents.
    const main=top.find(p=>p.u0<0);if(main){detail('tech-roof-stair-head',-4.3,3.6,3.2,2.5,.68,y+.48,0xd7dad4);for(const [u,v] of [[-13,-8],[-9,8]]){const q=l.world(u,v,y+.29),vent=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.3,10),material(0xc4c9c3));vent.position.set(q.x,q.y,q.z);vent.name='tech-flat-roof-vent';g.add(vent);}}
   }else if(l.id==='art-building'){
    // Near the technology wing, the yellow roof stops before a flat service terrace.
    const p=top[0];if(p){
     const end=p.u0+2.7,v=(p.v0+p.v1)/2;
     pitched({...p,u0:end},{color:0xd8ce99,rise:.95,tiles:true,overhang:.22,endColor:0xbd6557});
     const terrace=detail('art-roof-service-terrace',(p.u0+end)/2,v,end-p.u0,p.v1-p.v0,.16,y+.08,0x949a93);
     for(const side of [p.v0+.07,p.v1-.07])detail('art-service-parapet',(p.u0+end)/2,side,end-p.u0,.14,.38,y+.19,0xb8bcb4);
     detail('art-service-parapet',p.u0+.07,v,.14,p.v1-p.v0,.38,y+.19,0xb8bcb4);
     const tank=new THREE.Group();tank.name='art-roof-water-tank';g.add(tank);
     const q=l.world(p.u0+1.15,v,y+.66),shell=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,1,18),material(0xb9c1bd));shell.position.set(q.x,q.y,q.z);shell.castShadow=true;tank.add(shell);
     for(const h of [-.36,-.12,.12,.36]){const band=new THREE.Mesh(new THREE.TorusGeometry(.485,.018,5,18),material(0x808f8c));band.rotation.x=Math.PI/2;band.position.set(q.x,q.y+h,q.z);tank.add(band);}
    }
   }else if(l.id==='health-bld'){
    // Two-storey shared clinic/cooperative block: low red hip roof, not a tall blue gable.
    const halfL=l.L/2+.65,halfD=l.D/2+.65,rise=1.7,ridge=halfL-halfD,base=y+.15;
    const a=[-halfL,halfD,base],b=[halfL,halfD,base],c=[halfL,-halfD,base],d=[-halfL,-halfD,base],left=[-ridge,0,base+rise],right=[ridge,0,base+rise];
    faces('health-red-hip-roof',[[a,b,right,left],[c,d,left,right],[b,c,right],[d,a,left]],0xd84b43);
    const h=v=>base+rise*(1-Math.abs(v)/halfD);
    for(let v=.65;v<halfD;v+=.65)for(const side of [-1,1])localBox(0,side*v,2*(ridge+v),.028,.015,h(v)+.012,0xb8443d);
    localBox(0,0,ridge*2,.11,.12,base+rise+.035,0xbb403b);
    for(const u of [-6,6])for(const side of [-1,1]){
     const vent=new THREE.Group();vent.name='health-roof-vent';g.add(vent);
     const front=side*3.2,back=side*2.2,lo=h(front)+.025,peak=lo+.58,backH=h(back)+.03;
     faces('health-triangular-vent',[[[u-.6,front,lo],[u+.6,front,lo],[u,front,peak]]],0x625a50,vent);
     faces('health-vent-roof',[[[u-.64,front,lo+.045],[u,front,peak+.045],[u,back,backH]],[[u,front,peak+.045],[u+.64,front,lo+.045],[u,back,backH]]],0xe66a5b,vent);
    }
    for(const v of [-halfD,halfD])localBox(0,v,halfL*2,.16,.16,base-.04,0xdfdcd0);
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
