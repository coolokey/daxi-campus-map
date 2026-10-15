/* 2026-10-15 courtyard photos: grilles, blue lines and shallow curved fascia.
 * This layer adds no floor area, doors or collisions. The existing safety edge
 * remains behind the rounded cladding, so it cannot become an unsupported exit.
 */
(()=>{
 const api=window.campusExplorer,layouts=window.campusWalkWorld?.layouts;if(!api||!layouts)return;
 const cache=new Map(),mat=c=>{if(!cache.has(c))cache.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.97}));return cache.get(c)};
 function box(g,l,u,v,y,w,h,d,c){const p=l.world(u,v,y),m=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?w:d,h,l.horizontal?d:w),mat(c));m.position.set(p.x,p.y,p.z);m.castShadow=m.receiveShadow=true;g.add(m);return m;}
 const ids=['grade8-front','grade8-mid','grade9-back'];
 for(const l of layouts.filter(l=>ids.includes(l.id)))for(let f=1;f<=l.b.floors;f++){
  const y=(f-1)*FH,g=new THREE.Group();g.name=`photo-teaching-${l.id}-${f}`;g.userData={buildingId:l.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);
  const grilles=new THREE.Group();grilles.name='teaching-window-grilles';g.add(grilles);
  for(const r of l.rooms.filter(r=>r.floor===f))for(const side of ['u0','u1','v0','v1']){
   if(side===r.doorSide)continue;
   const alongU=side[0]==='v',fixed=r[side],a=alongU?r.u0:r.v0,b=alongU?r.u1:r.v1;
   const q={u:alongU?(a+b)/2:fixed,v:alongU?fixed:(a+b)/2};q[side[0]]+=side.endsWith('0')?-.15:.15;
   if(l.footprints.some(p=>p.floor===f&&CampusSpatialPlan.contains(p,q.u,q.v)))continue;
   const out=side.endsWith('0')?-.115:.115;
   for(const h of [1.08,1.65,2.62])box(grilles,l,alongU?(a+b)/2:fixed+out,alongU?fixed+out:(a+b)/2,y+h,alongU?b-a-.3:.035,.035,alongU?.035:b-a-.3,0xaab1a6);
  }
  if(l.id==='grade8-front'){
   const lines=new THREE.Group();lines.name='teaching-blue-courtyard-lines';g.add(lines);
   for(const u of [-l.L/2+.6,-l.L/2+7.3])box(lines,l,u,l.outerV-.13,y+FH/2,.065,FH,.065,0x497d99);
   for(const h of [.25,FH-.2])box(lines,l,-l.L/2+3.95,l.outerV-.13,y+h,6.7,.055,.055,0x497d99);
   if(f>1){
    const curved=new THREE.Group();curved.name='teaching-curved-balcony-cladding';g.add(curved);
    const center=6.2,points=[],wall=[],cap=[],R=2.1;
    const vertex=(u,v,h)=>{const p=l.world(u,v,h);return[p.x,p.y,p.z]};
    for(let i=0;i<=24;i++){const angle=i*Math.PI/24,u=center+Math.cos(angle)*R,v=l.outerV+l.sign*Math.sin(angle)*.48;points.push(new THREE.Vector3(...vertex(u,v,y+1.17)));
     if(i){const prev=(i-1)*Math.PI/24,pu=center+Math.cos(prev)*R,pv=l.outerV+l.sign*Math.sin(prev)*.48;
      const a=vertex(pu,pv,y),b=vertex(u,v,y),c=vertex(u,v,y+1.05),d=vertex(pu,pv,y+1.05);wall.push(...a,...b,...c,...a,...c,...d);
      const e=vertex(pu,l.outerV,y+1.05),n=vertex(u,l.outerV,y+1.05);cap.push(...d,...c,...n,...d,...n,...e);
     }
    }
    for(const vertices of [wall,cap]){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();const material=mat(0x989d97);material.side=THREE.DoubleSide;const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=mesh.receiveShadow=true;curved.add(mesh);}
    const rail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.025,6,false),mat(0x747f79));curved.add(rail);
   }
  }
 }
})();
