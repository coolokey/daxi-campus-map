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

/* Seven-grade wing: DSC05982–DSC06123, 2026-10-25.
 * Photo-backed finishes on the existing plan; no new floor, route or collider.
 * The shared plan and new7-world.js own the photo hall, stair tower and supported
 * courtyard steps/ramp. This layer follows their main/east facade edges only.
 */
(()=>{
 const api=window.campusExplorer,l=window.campusWalkWorld?.layouts.find(l=>l.id==='new-grade7');if(!api||!l)return;
 const materials=new Map(),mat=c=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.97}));return materials.get(c)};
 const cvs=document.createElement('canvas');cvs.width=cvs.height=128;const ctx=cvs.getContext('2d');ctx.fillStyle='#a2a49f';ctx.fillRect(0,0,128,128);
 let seed=701;for(let i=0;i<7000;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const x=seed%128;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const z=seed%128;ctx.fillStyle=['#767b77','#c0c1ba','#929690'][i%3];ctx.fillRect(x,z,1,1);}
 const aggregate=new THREE.CanvasTexture(cvs);aggregate.wrapS=aggregate.wrapT=THREE.RepeatWrapping;aggregate.encoding=THREE.sRGBEncoding;
 // Update only this building's shared stone finishes, before colour calibration.
 api.scene.traverse(o=>{const m=o.material;if(m?.userData?.campusBuildingId===l.id&&['wall','exterior'].includes(m.userData.campusSurface)){m.map=aggregate;m.needsUpdate=true;}});
 function box(g,u,v,y,w,h,d,c){const p=l.world(u,v,y),m=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?w:d,h,l.horizontal?d:w),mat(c));m.position.set(p.x,p.y,p.z);m.castShadow=m.receiveShadow=true;g.add(m);return m;}
 const B=1,a=-l.L/2,A=l.L/2,wing=A-8,end=15,stone=0x949792,green=0x24805e,brown=0x4b4038,cream=0xc9c8b9;
 for(let f=1;f<=l.b.floors;f++){
  const y=(f-1)*FH,g=new THREE.Group();g.name=`photo-new7-${f}`;g.userData={buildingId:l.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);
  // Deep fascia and projecting flat eaves; all pieces stay at the slab line.
  box(g,(a+wing)/2,B+.13,y+FH-.24,wing-a+.3,.45,.32,stone);
  box(g,wing-.13,(B+end)/2,y+FH-.24,.32,.45,end-B+.3,stone);
  box(g,(wing+A)/2,end-.08,y+FH-.24,A-wing,.45,.16,stone);
  if(f>1){
   const rail=new THREE.Group();rail.name='new7-green-rail';g.add(rail);
   // Main facade: masonry parapet with a brown top rail and green stanchions.
   box(rail,(a+wing)/2,B+.12,y+1.2,wing-a,.065,.07,brown);
   box(rail,wing-.12,(B+end)/2,y+1.2,.07,.065,end-B,brown);
   for(let u=a+.35;u<wing;u+=2.4)box(rail,u,B+.12,y+1.12,.045,.19,.045,green);
   // End bay: an open green grille section as shown in the corner close-up.
   const lo=wing+.3,hi=A-.4;
   for(const h of [1.09,1.85])box(rail,(lo+hi)/2,end-.12,y+h,hi-lo,.05,.065,h>1.5?brown:green);
   for(let u=lo;u<=hi;u+=.38)box(rail,u,end-.12,y+1.47,.035,.76,.045,green);
  }
  // Structural columns and the real stair tower now belong to new7-world.js,
  // which is built before collision indexing. Keep this post-build layer to trim.
  for(const [u,v] of [[a+.3,B+.29],[wing-.29,end-.3]])box(g,u,v,y+FH/2,.07,FH,.07,0xcdd0c8);
  for(const r of l.rooms.filter(r=>r.floor===f)){
   const axis=r.doorSide[0],out=r.doorSide.endsWith('0')?-1:1,du=axis==='v'?1:0,dv=axis==='u'?1:0;
   const u=(r.u0+r.u1)/2+(axis==='u'?out*(r.u1-r.u0)/2:0),v=(r.v0+r.v1)/2+(axis==='v'?out*(r.v1-r.v0)/2:0);
   // Retracted pale-green sliding leaf beside the opening, leaving the route clear.
   const offset=1.28,pu=u+du*offset+(axis==='u'?out*.13:0),pv=v+dv*offset+(axis==='v'?out*.13:0);
   box(g,pu,pv,y+1.13,axis==='v'?.56:.045,2.2,axis==='u'?.56:.045,0xb0c49b);
   box(g,pu,pv,y+1.62,axis==='v'?.16:.055,.6,axis==='u'?.16:.055,0x526c62);
   // Silver security grille over the corridor window wings, clear of the door.
   const length=axis==='v'?r.u1-r.u0:r.v1-r.v0;
   for(const sign of [-1,1])for(let t=1.75;t<length/2-.25;t+=.36){
    const qu=u+du*sign*t+(axis==='u'?out*.14:0),qv=v+dv*sign*t+(axis==='v'?out*.14:0);
    box(g,qu,qv,y+1.85,.025,1.55,.025,0xc0c5bf);
   }
  }
 }
})();
