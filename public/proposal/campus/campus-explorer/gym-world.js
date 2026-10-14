/* Photo-informed activity center. Layout/support/navigation remain in CampusSpatialPlan. */
const CampusGymWorld={
 build({l,scene,floorMeshes,box,slab,surfaceMaterials,cameraVolume}){
  const base=surfaceMaterials(l),mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.94,metalness:0,...extra});
  const c={...base,mint:mat(0xc6d3c6),frame:mat(0xe0e5df),concrete:mat(0x93968f),pink:mat(0xbd9187),tile:mat(0xd5beb0),tower:mat(0xb4b3a9),court:mat(0x28724c),white:mat(0xe4e6cf),yellow:mat(0xd9b849),curtain:mat(0x526c60),curtainFold:mat(0x60796c),red:mat(0x6e2032),redFold:mat(0x84283b),duct:mat(0xa7aca7),solar:mat(0x253d50,{roughness:.75}),net:mat(0xb8bcae),black:mat(0x414947),gold:mat(0xc3a66a)};
  const group=(name,floor=1,ceiling=false)=>{const g=new THREE.Group();g.name=name;g.userData={buildingId:l.id,floorNum:floor,...(ceiling?{campusCeiling:true}:{})};scene.add(g);floorMeshes.push(g);return g};
  const B=(g,u0,u1,v0,v1,y0,y1,paint,solid=false)=>box(g,l,u0,u1,v0,v1,y0,y1,paint,solid);
  const beam=(g,a,b,r,paint)=>{const p=l.world(a[0],a[1]),q=l.world(b[0],b[1]),start=new THREE.Vector3(p.x,a[2],p.z),end=new THREE.Vector3(q.x,b[2],q.z),d=end.clone().sub(start),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),6),paint);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());g.add(m);return m};
  const guard=(g,u0,u1,v0,v1,y)=>{const proxy=B(g,u0,u1,v0,v1,y,y+1.08,c.steel,true);if(proxy)proxy.visible=false;B(g,u0,u1,v0,v1,y,y+.14,c.pink);B(g,u0,u1,v0,v1,y+1.02,y+1.09,c.handrail||c.steel);const along=u1-u0>v1-v0,n=Math.ceil((along?u1-u0:v1-v0)/.32);for(let i=0;i<=n;i++){const u=along?u0+(u1-u0)*i/n:(u0+u1)/2,v=along?(v0+v1)/2:v0+(v1-v0)*i/n;B(g,u-.018,u+.018,v-.018,v+.018,y+.12,y+1.04,c.frame)}};
  const sign=(name,text,u,v,y,width,height,paint,floor=2)=>{const g=group(name,floor),canvas=document.createElement('canvas');canvas.width=1024;canvas.height=128;const ctx=canvas.getContext('2d');if(ctx){ctx.fillStyle=paint;ctx.font='bold 96px "Noto Sans TC", "Microsoft JhengHei", sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,66,1000)}const map=new THREE.CanvasTexture(canvas),m=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map,side:THREE.DoubleSide,transparent:true,alphaTest:.05,depthWrite:false})),p=l.world(u,v);m.position.set(p.x,y,p.z);m.rotation.y=Math.PI/2;g.add(m);return g};

  // Tall main-hall shell. Glass panes are framed openings in a solid exterior envelope.
  const hall=group('gym-hall-envelope');
  B(hall,-18,18,-17.12,-16.9,0,9.3,c.mint,true);
  for(const side of [-1,1]){
   const u=side*17.95,proxy=B(hall,u-.1,u+.1,-17,9,0,9.3,c.mint,true);proxy.visible=false;
   B(hall,u-.12,u+.12,-17,9,0,.88,c.mint);B(hall,u-.12,u+.12,-17,9,3.08,3.72,c.mint);B(hall,u-.12,u+.12,-17,9,7.9,9.3,c.mint);
   for(let v=-16.6;v<8.5;v+=3.2){
    for(const [a,b] of [[.88,3.08],[4.0,7.9]]){B(hall,u-.07,u+.07,v,v+2.85,a,b,c.glass);for(let t=0;t<=3;t++)B(hall,u-.12,u+.12,v+t*.95-.025,v+t*.95+.025,a,b,c.frame);B(hall,u-.12,u+.12,v,v+2.85,(a+b)/2-.025,(a+b)/2+.025,c.frame)}
    B(hall,u-.16,u+.16,v+2.85,v+3.2,0,9.3,c.mint,true);
    // Gathered green side curtains, leaving the glass readable.
    for(const h of [1,4.05])for(let fold=0;fold<4;fold++)B(hall,u-side*.18-.035,u-side*.18+.035,v+fold*.095,v+fold*.095+.08,h,h+(h===1?1.95:3.75),fold%2?c.curtain:c.curtainFold);
   }
  }
  const stairWindows=group('gym-stair-outer-window-walls');
  for(const side of [-1,1]){const u=side*18,proxy=B(stairWindows,u-.06,u+.06,9,17,0,9.3,c.mint,true);proxy.visible=false;
   B(stairWindows,u-.065,u+.065,9,17,0,.9,c.mint);B(stairWindows,u-.065,u+.065,9,17,7.9,9.3,c.mint);
   for(const [y0,y1] of [[.9,3.25],[3.6,7.9]]){B(stairWindows,u-.035,u+.035,9,17,y0,y1,c.glass);for(let v=9;v<=17;v+=.8)B(stairWindows,u-.07,u+.07,v-.025,v+.025,y0,y1,c.frame);B(stairWindows,u-.07,u+.07,9,17,(y0+y1)/2-.025,(y0+y1)/2+.025,c.frame)}
   B(stairWindows,u-.07,u+.07,9,17,3.25,3.6,c.mint);
  }
  // Extend the actual switchback landing toward the curved tower window;
  // the short approach edge at v13.9 is left entirely open.
  const windowLandings=group('gym-curved-window-landings'),windowLandingRails=group('gym-curved-window-landing-guards');
  for(const [a,b] of [[-17.2,-15.42],[10.8,12.58]]){
   B(windowLandings,a,b,13.9,19.3,0,1.65,c.mint,true);B(windowLandings,a,b,13.9,19.3,1.65,1.8,c.stair);
   for(let u=a+.45;u<b;u+=.45)B(windowLandings,u-.008,u+.008,13.9,19.3,1.8,1.804,c.concrete);
   for(let v=14.35;v<19.3;v+=.45)B(windowLandings,a,b,v-.008,v+.008,1.8,1.804,c.concrete);
   guard(windowLandingRails,a-.025,a+.025,13.94,19.3,1.8);guard(windowLandingRails,b-.025,b+.025,13.94,19.3,1.8);guard(windowLandingRails,a,b,19.275,19.325,1.8);
  }
  // Central portal stays open from the entrance hall into the court.
  for(const [a,b] of [[-15,-2],[2,15]])B(hall,a,b,6.88,7.08,0,3.6,c.mint,true);
  B(hall,-15,15,6.88,7.08,2.9,3.6,c.mint,true);
  const stage=group('gym-stage');B(stage,-14,14,-17,-13,0,.6,c.wood);
  for(const [a,b] of [[-14,-1.1],[1.1,14]])B(stage,a,b,-13.1,-13,0,.6,c.wood,true);
  // The walking ramp is provided by the shared support model. Shallow timber
  // risers follow it visually without adding conflicting solid volumes.
  for(let i=0;i<6;i++)B(stage,-1,1,-11-(i+1)/3,-11-i/3,0,(i+1)*.1,c.wood);
  B(stage,-14.1,-14,-17,-13,0,.6,c.wood,true);B(stage,14,14.1,-17,-13,0,.6,c.wood,true);
  const curtain=group('gym-stage-curtain');
  for(let i=0;i<104;i++)B(curtain,-14+i*.27,-13.75+i*.27,-16.77+(i%2)*.09,-16.65+(i%2)*.09,.65,7.8,i%2?c.red:c.redFold);
  B(curtain,-14,14,-16.9,-16.55,7.5,8.1,c.red);B(curtain,-14,14,-16.53,-16.49,7.58,7.65,c.gold);
  const courts=group('gym-badminton-courts'),nets=group('gym-court-nets');
  // Four indicative courts, proportioned to the available hall; not an as-built survey.
  for(const u of [-7.2,7.2])for(const v of [-7,2]){
   const a=u-5.7,b=u+5.7,d=v-3.05,e=v+3.05;B(courts,a,b,d,e,.048,.063,c.court);
   const netBarrier=B(nets,u-.045,u+.045,d-.15,e+.15,.08,1.55,c.net,true);netBarrier.visible=false;
   for(const t of [a,a+4.35,u,b-4.35,b])B(courts,t-.025,t+.025,d,e,.064,.076,c.white);
   for(const t of [d,d+.46,v,e-.46,e])B(courts,a,b,t-.025,t+.025,.064,.076,c.white);
   for(const t of [d-.12,e+.12])B(courts,a-.12,b+.12,t-.018,t+.018,.064,.078,c.yellow);
   for(const edge of [d-.12,e+.12]){B(nets,u-.045,u+.045,edge-.045,edge+.045,.07,1.55,c.steel);B(nets,u-.28,u+.28,edge-.16,edge+.16,.07,.14,c.black)}
   B(nets,u-.018,u+.018,d-.12,e+.12,1.47,1.52,c.white);
   for(let t=d;t<e;t+=.18)B(nets,u-.009,u+.009,t,t+.012,.8,1.47,c.net);
   for(let h=.8;h<1.46;h+=.15)B(nets,u-.009,u+.009,d,e,h,h+.012,c.net);
  }
  const tiers=group('gym-gallery-tiers',2),rails=group('gym-gallery-guards',2);
  for(const [a,b] of [[-9,-1.2],[1.2,9]])for(let i=0;i<3;i++){const y=3.75+i*.15;B(tiers,a,b,11+i,12+i,3.6,y,c.concrete);B(tiers,a,b,11+i,11.035+i,y-.04,y+.008,c.stair)}
  guard(rails,-15.08,-14.98,-17,7,3.6);guard(rails,14.98,15.08,-17,7,3.6);guard(rails,-15,15,6.93,7.03,3.6);
  for(const u of [-14,-7,0,7,14])B(rails,u-.12,u+.12,6.88,7.12,3.6,7.85,c.mint,true);
  // Entrance fittings are deliberately kept clear of the 2.4 m central passage.
  const entrance=group('gym-entrance-table-tennis');
  const lobbyCeiling=group('gym-entrance-ceiling',1,true);
  B(lobbyCeiling,-10,10,7.1,16.7,3.34,3.39,c.frame);
  for(let u=-10;u<=10;u+=.6)B(lobbyCeiling,u-.009,u+.009,7.1,16.7,3.325,3.34,c.concrete);
  for(let v=7.1;v<=16.7;v+=.6)B(lobbyCeiling,-10,10,v-.009,v+.009,3.325,3.34,c.concrete);
  for(const u of [-6,0,6])for(const v of [9.8,14.6]){B(lobbyCeiling,u-.5,u+.5,v-.27,v+.27,3.29,3.33,c.duct);B(lobbyCeiling,u-.45,u+.45,v-.2,v+.2,3.28,3.29,c.white);for(let t=-.4;t<.45;t+=.1)B(lobbyCeiling,u+t,u+t+.012,v-.2,v+.2,3.27,3.28,c.steel)}
  for(const u of [-5.5,-3]){B(entrance,u-.72,u+.72,8.15,10.7,.74,.81,mat(0x31566b),true);for(const a of [-.55,.55])for(const v of [8.45,10.4])B(entrance,u+a-.035,u+a+.035,v-.035,v+.035,0,.74,c.steel);B(entrance,u-.72,u+.72,9.4,9.45,.81,.98,c.net)}
  const wc=group('gym-entrance-washroom');B(wc,5.2,9,8.1,8.25,0,3.2,c.mint,true);B(wc,8.85,9,8.25,12,0,3.2,c.mint,true);B(wc,5.2,5.35,8.25,9.5,0,3.2,c.mint,true);B(wc,5.2,5.35,11.1,12,0,3.2,c.mint,true);B(wc,5.2,5.35,9.5,11.1,2.3,3.2,c.mint,true);B(wc,6.5,8,8.25,8.75,.72,.9,c.frame,true);
  sign('gym-washroom-label','洗手間',5.08,10.3,2.6,1.25,.28,'#315748',1);
  const fountain=group('gym-drinking-fountain');B(fountain,7.3,8.15,12.4,13,.08,1.35,c.duct,true);B(fountain,7.35,8.1,12.35,12.43,.78,1.1,c.black);for(const u of [7.48,7.74,7.98])B(fountain,u-.025,u+.025,12.30,12.43,.98,1.06,c.steel);
  const cabinets=group('gym-window-wood-cabinets');B(cabinets,-8.8,-2.8,16.15,16.75,.08,.86,c.wood,true);for(let u=-8.7;u<-2.8;u+=.75){B(cabinets,u,u+.018,16.13,16.15,.12,.81,c.black);B(cabinets,u+.55,u+.62,16.11,16.15,.55,.59,c.steel)}
  const fire=group('gym-entrance-fire-equipment');B(fire,8.5,9,13.15,13.8,.1,1.5,c.red,true);B(fire,8.45,8.5,13.25,13.7,.7,1.15,c.frame);
  const service=group('gym-fire-room-shell');
  B(service,14.95,15.08,1,4.5,0,3.35,c.mint,true);B(service,15,17.5,.92,1.08,0,3.35,c.mint,true);
  for(const [a,b] of [[15,15.3],[17.2,17.5]])B(service,a,b,4.42,4.58,0,3.35,c.mint,true);
  B(service,15.3,17.2,4.42,4.58,2.3,3.35,c.mint,true);
  sign('gym-fire-room-label','消防機房',16.25,4.62,2.65,1.65,.3,'#34413c',1);

  // Roof is high over the hall. There is no 7.2 m low general-purpose ceiling.
  const roof=group('gym-roof-trusses',2,true);B(roof,-18.2,18.2,-17.2,17.2,9.3,9.6,c.tower);
  for(let v=-15;v<=15;v+=5){B(roof,-17.9,17.9,v-.1,v+.1,8.45,8.62,c.steel);B(roof,-17.9,17.9,v-.08,v+.08,9.12,9.28,c.steel);for(let u=-17;u<17;u+=4){beam(roof,[u,v,8.5],[u+2,v,9.2],.045,c.steel);beam(roof,[u+2,v,9.2],[u+4,v,8.5],.045,c.steel)}}
  for(const u of [-8,8]){B(roof,u-.22,u+.22,-15,14,8.03,8.42,c.duct);for(let v=-14;v<14;v+=3)B(roof,u-.29,u+.29,v-.04,v+.04,7.99,8.46,c.frame)}
  for(const u of [-11,0,11])for(let v=-10;v<15;v+=7)B(roof,u-.65,u+.65,v-.22,v+.22,8.0,8.08,c.frame);

  const facade=group('gym-front-facade');
  // Lower front windows / open central doors and separate high clerestory.
  for(const [a,b] of [[-10,-1.85],[1.85,10]]){B(facade,a,b,16.9,17.12,0,.38,c.tile,true);B(facade,a,b,16.94,17.02,.38,3.1,c.glass,true);for(let u=a;u<b;u+=.8)B(facade,u-.025,u+.025,16.9,17.1,.38,3.1,c.frame);B(facade,a,b,16.9,17.1,1.8,1.85,c.frame)}
  B(facade,-10,10,16.8,17.1,3.1,6.1,c.tile,true);B(facade,-10,10,16.8,17.05,6.1,7.6,c.glass,true);
  for(let u=-10;u<=10;u+=1)B(facade,u-.035,u+.035,16.75,17.1,6.1,7.6,c.frame);
  for(const u of [-10,-3.4,3.4,10])B(facade,u-.16,u+.16,16.8,17.35,0,8.6,c.tile,true);
  const canopy=group('gym-entrance-canopy',2,true);B(canopy,-11,11,16.6,18.7,7.7,8,c.tower);B(canopy,-11,11,18.45,18.7,8,8.85,c.tile);
  for(let u=-10;u<=10;u+=2.5)B(canopy,u-.08,u+.08,16.6,18.7,7.35,7.7,c.frame);
  sign('gym-sign-chinese','大溪國中學生活動中心',0,18.72,8.43,19,.66,'#34413c');
  sign('gym-sign-english','Student Activity Center',0,17.13,5.05,12,.9,'#c4a66b');
  // Fine facade tile joints remain geometry, so no external photo request occurs.
  for(let y=3.25;y<6;y+=.24)B(facade,-10,10,17.101,17.108,y,y+.008,c.pink);
  for(let u=-9.9;u<10;u+=.3)B(facade,u,u+.008,17.101,17.108,3.1,6.1,c.pink);
  const towers=group('gym-rounded-stair-towers');
  for(const center of [-14,14])for(let i=0;i<24;i++){
   const a=-Math.PI/2+i*Math.PI/24,b=a+Math.PI/24,mid=(a+b)/2,u=center+Math.sin(mid)*4,v=17.1+Math.cos(mid)*4;
   const panel=(y0,y1,paint)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.13,y1-y0,2*4*Math.sin(Math.PI/48)+.02),paint),p=l.world(u,v);m.position.set(p.x,(y0+y1)/2,p.z);m.rotation.y=-mid;towers.add(m);return m};
   for(const [a,b,paint] of [[0,.8,c.tower],[.8,1.35,c.pink],[1.35,1.7,c.tower],[2.35,2.7,c.pink],[6.55,6.85,c.pink],[6.85,7.3,c.tower],[8,8.6,c.tower],[8.6,8.85,c.pink],[8.85,10.1,c.tower]])panel(a,b,paint);
   for(const [a,b] of [[1.7,2.35],[2.7,6.55],[7.3,8]]){const glass=panel(a,b,c.glass);if(a===2.7)glass.name='gym-tower-main-window';beam(towers,[u,v,a],[u,v,b],.035,c.frame);for(const y of [a,(a+b)/2,b])panel(y,y+.035,c.frame)}
  }
  // Full-height solid shell proxies remain outside the stair bays / rectangular
  // footprint; the visible arc carries the same window and masonry boundary.
  for(const center of [-14,14])for(let i=0;i<24;i++){const t=-Math.PI/2+(i+.5)*Math.PI/24,u=center+Math.sin(t)*4,v=17.1+Math.cos(t)*4;const m=B(towers,u-.28,u+.28,Math.max(17,v-.28),v+.28,0,10.1,c.tower,true);m.visible=false}
  const towerCaps=group('gym-tower-caps',2,true),capMaterial=c.tower.clone();capMaterial.side=THREE.DoubleSide;
  for(const center of [-14,14]){const vertices=[],origin=l.world(center,17.1);for(let i=0;i<32;i++){const a=-Math.PI/2+i*Math.PI/32,b=a+Math.PI/32,p=l.world(center+Math.sin(a)*4,17.1+Math.cos(a)*4),q=l.world(center+Math.sin(b)*4,17.1+Math.cos(b)*4);vertices.push(origin.x,10.1,origin.z,p.x,10.1,p.z,q.x,10.1,q.z)}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();towerCaps.add(new THREE.Mesh(geometry,capMaterial));cameraVolume(l.rect(center-4,center+4,17.1,21.1),10.02,10.12)}
  // Shallow forecourt platform: these visible surfaces follow the shared
  // .12 m threshold / support profile rather than lifting the indoor floor.
  const plinth=group('gym-front-plinth'),steps=group('gym-front-steps'),ramp=group('gym-access-ramp'),frontRails=group('gym-front-handrails');
  B(plinth,-11,11,17,18.3,-.025,.12,c.concrete);
  for(let u=-10;u<=10;u+=1)B(plinth,u-.008,u+.008,17,18.3,.12,.124,c.tile);
  for(const [v0,v1,y] of [[18.3,19,.08],[19,19.7,.04],[19.7,20.5,0]]){B(steps,-5,5,v0,v1,-.025,y+.006,c.concrete);for(const d of [.045,.095,.145])B(steps,-5,5,v1-d-.009,v1-d,y+.006,y+.01,c.black)}
  const p0=l.world(-10,18.3),p1=l.world(-6,18.3),p2=l.world(-10,24.3),p3=l.world(-6,24.3),positions=[p0.x,.126,p0.z,p2.x,.006,p2.z,p1.x,.126,p1.z,p1.x,.126,p1.z,p2.x,.006,p2.z,p3.x,.006,p3.z],rampGeometry=new THREE.BufferGeometry();
  rampGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));rampGeometry.computeVertexNormals();const rampSurface=new THREE.Mesh(rampGeometry,c.concrete);rampSurface.material=c.concrete.clone();rampSurface.material.side=THREE.DoubleSide;ramp.add(rampSurface);
  for(let v=18.5;v<24.3;v+=.3){const y=.12*(24.3-v)/6+.007;B(ramp,-9.96,-6.04,v-.012,v+.012,y,y+.002,c.tower)}
  const slopingRail=(u,v0,v1,h0,h1)=>{beam(frontRails,[u,v0,h0+.96],[u,v1,h1+.96],.035,c.steel);beam(frontRails,[u,v0,h0+.53],[u,v1,h1+.53],.022,c.steel);const n=Math.ceil(v1-v0);for(let i=0;i<=n;i++){const v=v0+(v1-v0)*i/n,y=h0+(h1-h0)*i/n;beam(frontRails,[u,v,y+.02],[u,v,y+.96],.026,c.steel)}for(let i=0;i<n;i++){const a=v0+(v1-v0)*i/n,b=v0+(v1-v0)*(i+1)/n,y0=h0+(h1-h0)*i/n,y1=h0+(h1-h0)*(i+1)/n,proxy=B(frontRails,u-.045,u+.045,a,b,Math.min(y0,y1),Math.max(y0,y1)+1,c.steel,true);proxy.visible=false}};
  for(const u of [-10,-6])slopingRail(u,18.3,24.3,.12,0);
  for(const u of [-5,5])slopingRail(u,18.35,20.5,.08,0);
  // The central 10 m stair approach and ramp mouths are deliberately open.
  for(const [a,b] of [[-11,-10.1],[-5.9,-5.1],[5.1,11]]){beam(frontRails,[a,18.25,1.08],[b,18.25,1.08],.035,c.steel);for(let u=a;u<=b;u+=.65)beam(frontRails,[u,18.25,.14],[u,18.25,1.08],.025,c.steel);const proxy=B(frontRails,a,b,18.21,18.29,.12,1.12,c.steel,true);proxy.visible=false}
  const solar=group('gym-solar-array',2,true);
  for(const u of [-12,-6,0,6,12])for(const v of [-9,-3,3,9]){for(const du of [-2.5,2.5])beam(solar,[u+du,v-2,9.6],[u+du,v-2,10.4],.055,c.steel);const p=l.world(u,v),m=new THREE.Mesh(new THREE.BoxGeometry(4.6,.09,5.6),c.solar);m.position.set(p.x,10.55,p.z);m.rotation.z=.14;solar.add(m);for(const du of [-2.8,0,2.8])beam(solar,[u+du,v-2.3,10.25],[u+du,v+2.3,10.89],.035,c.frame)}
  cameraVolume(l.rect(-18.2,18.2,-17.2,17.2),9.3,9.6);
 }
};
