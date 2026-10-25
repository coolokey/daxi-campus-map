/* Shared outdoor geometry. The stage walls, stairs and navigation use outdoor-plan. */
const CampusOutdoorWorld=(()=>{
 const P=CampusOutdoorPlan,matCache=new Map();
 const mat=(color)=>{if(!matCache.has(color))matCache.set(color,new THREE.MeshStandardMaterial({color,roughness:.9}));return matCache.get(color)};
 function box(g,w,h,d,x,y,z,color,solid=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);if(solid)registerWallCollider(x-w/2,x+w/2,z-d/2,z+d/2,y-h/2,y+h/2);return m}
 function floor(g,w,d,x,z,color,y=.035){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat(color));m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;g.add(m);return m}
 function loop(g,points,y,color){const geo=new THREE.BufferGeometry().setFromPoints(points.map(([x,z])=>new THREE.Vector3(x,y,z)));const m=new THREE.LineLoop(geo,new THREE.LineBasicMaterial({color}));g.add(m)}
 function stadium(radius){const s=new THREE.Shape(),t=P.track,a=t.halfStraight;s.moveTo(-a,-radius);s.lineTo(a,-radius);s.absarc(a,0,radius,-Math.PI/2,Math.PI/2,false);s.lineTo(-a,radius);s.absarc(-a,0,radius,Math.PI/2,Math.PI*1.5,false);s.closePath();return s}
 // A repeating masonry bay drawn from the user's wall photograph. Texture
 // repetition avoids adding thousands of individual decorative brick meshes.
 function masonryMaterial(repeats=1,pier=false){
  const cv=document.createElement('canvas');cv.width=512;cv.height=256;const c=cv.getContext('2d');c.fillStyle='#77766b';c.fillRect(0,0,512,256);
  const brickWidth=pier?256:32;
  for(let row=0;row<12;row++)for(let col=-1;col<(pier?3:17);col++){
   const bx=col*brickWidth+(row%2)*brickWidth/2,by=row*22;
   const distance=Math.abs((bx+16)-256)/32+Math.abs(row-6),diamond=distance>=1.4&&distance<3;
   c.fillStyle=pier||diamond?['#82574b','#916355','#a06b58'][(row+col+18)%3]:['#a6a395','#b3ad9e','#aaa697'][(row+col+18)%3];c.fillRect(bx+1,by+1,brickWidth-2,20);
  }
  const tex=new THREE.CanvasTexture(cv);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(repeats,1);return new THREE.MeshStandardMaterial({map:tex,color:0xffffff,roughness:.98});
 }
 function renderPerimeter(parent){
  const g=new THREE.Group();g.name='campus-perimeter';g.userData.source='115 campus plan IPAD v.3 — illustrative dimensions';parent.add(g);
  const stone=0x888f82,cap=0xb0b3a4,steel=0x465b50,p=P.perimeter,pierMaterial=masonryMaterial(1,true);
  for(const s of p.segments){
   const dx=s.bx-s.ax,dz=s.bz-s.az,length=Math.hypot(dx,dz),angle=Math.atan2(dz,dx),x=(s.ax+s.bx)/2,z=(s.az+s.bz)/2;
   const beam=(w,h,d,y,color)=>{const m=box(g,w,h,d,x,y,z,color);m.rotation.y=-angle;return m};
   // All front/gate runs retain their existing metal bars and dimensions.
   const gateMetal=s.az>=78&&s.bz>=78;
   if(gateMetal){
    const wall=beam(length,1.5,p.thickness,.75,stone);wall.userData.wallStyle='gate-metal';beam(length,.14,p.thickness+.16,1.55,cap);
    beam(length,.09,.09,1.72,steel);beam(length,.09,.09,2.84,steel);
    const bars=Math.ceil(length/.65);for(let i=0;i<=bars;i++){const t=i/bars;box(g,.065,1.2,.065,s.ax+dx*t,2.24,s.az+dz*t,steel)}
   }else{
    const bays=Math.max(1,Math.round(length/5.8)),wall=beam(length,2.65,p.thickness,1.325,0xaaa697);wall.material=masonryMaterial(bays);wall.userData.wallStyle='photo-masonry';
    beam(length,.16,p.thickness+.16,2.73,0x794d42);
    for(let i=1;i<bays;i++){const t=i/bays,m=box(g,.9,2.96,.9,s.ax+dx*t,1.48,s.az+dz*t,0x916355);m.material=pierMaterial;m.rotation.y=-angle;g.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(m);registerWallCollider(bounds.min.x,bounds.max.x,bounds.min.z,bounds.max.z,-.2,2.96);WALL_COLLIDERS.at(-1).perimeter=true;const top=box(g,1.02,.12,1.02,s.ax+dx*t,3,s.az+dz*t,0x794d42);top.rotation.y=-angle;}
   }
   // One rotated collider per wall, independent of decorative railing density.
   const px=Math.abs(dz/length)*p.thickness/2,pz=Math.abs(dx/length)*p.thickness/2;
   registerWallCollider(Math.min(s.ax,s.bx)-px,Math.max(s.ax,s.bx)+px,Math.min(s.az,s.bz)-pz,Math.max(s.az,s.bz)+pz,-.2,p.height);
   Object.assign(WALL_COLLIDERS.at(-1),{perimeter:true,segment:s});
  }
  // Posts close acute corners and prevent diagonal leaks between fence runs.
  for(const [x,z] of p.outline){const post=box(g,.9,2.96,.9,x,1.48,z,z>=78?stone:0x916355);if(z<78)post.material=pierMaterial;box(g,1.02,.12,1.02,x,3,z,z>=78?cap:0x794d42);registerWallCollider(x-.45,x+.45,z-.45,z+.45,-.2,3.06);WALL_COLLIDERS.at(-1).perimeter=true;}
  // Gate posts, tower feet and lintel register their exact perimeter volumes in
  // explorer.js. A second full-height box here would seal the photographed opening.
  return g;
 }
 function renderLanPavilion(parent){
  const g=new THREE.Group();g.name='lan-photo-pavilion';parent.add(g);
  const cream=0xe7dfc2,red=0xa42f29,stone=0x969d91,tile=0x804638;
  const mesh=(geometry,color,name)=>{const m=new THREE.Mesh(geometry,mat(color));m.name=name;m.castShadow=m.receiveShadow=true;g.add(m);return m};
  const block=(name,w,h,d,x,y,z,color)=>{const m=box(g,w,h,d,x,y,z,color);m.name=name;return m};
  const solid=m=>{parent.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(m);registerWallCollider(b.min.x,b.max.x,b.min.z,b.max.z,b.min.y,b.max.y);Object.assign(WALL_COLLIDERS.at(-1),{landmark:true,source:m.name});};
  // A shallow raised plinth is within the existing ground motor's step tolerance.
  const base=mesh(new THREE.CylinderGeometry(4.25,4.25,.3,6),stone,'lan-stone-plinth');base.rotation.y=Math.PI/6;base.position.y=-.03;
  for(let i=0;i<2;i++)block(i?'lan-front-upper-step':'lan-front-steps',2.6,.06*(i+1),.52,0,.03*(i+1),4.12-i*.5,stone);
  const edge=(name,r,y,h,d,color,skipFront=false)=>{
   for(let i=0;i<6;i++){const a=i*Math.PI/3,b=(i+1)*Math.PI/3,x=r*(Math.cos(a)+Math.cos(b))/2,z=r*(Math.sin(a)+Math.sin(b))/2;
    if(skipFront&&i===1)continue;const m=block(name,r,h,d,x,y,z,color);m.rotation.y=-Math.atan2(Math.sin(b)-Math.sin(a),Math.cos(b)-Math.cos(a));if(name==='lan-stone-seat')solid(m);
   }
  };
  for(let i=0;i<6;i++){
   const a=i*Math.PI/3,x=Math.cos(a)*3.2,z=Math.sin(a)*3.2;
   const foot=block('lan-column-foot',.58,.2,.58,x,.2,z,0x5b625b);solid(foot);
   const p=mesh(new THREE.CylinderGeometry(.22,.24,3.82,12),red,'lan-red-column');p.position.set(x,2.12,z);solid(p);
   block('lan-column-cap',.6,.25,.6,x,4.06,z,cream);
  }
  edge('lan-cream-ring-beam',3.45,4.12,.4,.28,cream);edge('lan-stone-seat',2.7,.56,.14,.45,stone,true);
  // Cream upper lattice: three horizontal bars with evenly spaced uprights.
  for(let i=0;i<6;i++){
   const a=i*Math.PI/3,b=(i+1)*Math.PI/3,dx=Math.cos(b)-Math.cos(a),dz=Math.sin(b)-Math.sin(a),angle=-Math.atan2(dz,dx);
   for(const y of [3.25,3.48,3.7]){const m=block('lan-cream-lattice',2.85,.07,.09,3.2*(Math.cos(a)+Math.cos(b))/2,y,3.2*(Math.sin(a)+Math.sin(b))/2,cream);m.rotation.y=angle;}
   for(let j=1;j<8;j++){const t=j/8,x=3.2*(Math.cos(a)+dx*t),z=3.2*(Math.sin(a)+dz*t),m=block('lan-lattice-upright',.065,.52,.09,x,3.48,z,cream);m.rotation.y=angle;}
  }
  // Hexagonal curved roof profile, including a rising outer lip at the eaves.
  const profile=[[.1,6.95],[.7,6.2],[1.8,5.25],[3.35,4.6],[4.3,4.42],[4.75,4.58]],verts=[],segments=48;
  const point=(r,y,k)=>{const a=(Math.floor(k/8)%6)*Math.PI/3,t=(k%8)/8,b=a+Math.PI/3;return new THREE.Vector3(r*((1-t)*Math.cos(a)+t*Math.cos(b)),y,r*((1-t)*Math.sin(a)+t*Math.sin(b)));};
  for(let j=0;j<profile.length-1;j++)for(let k=0;k<segments;k++){
   const [r,y]=profile[j],[r2,y2]=profile[j+1],a=point(r,y,k),b=point(r,y,(k+1)%segments),c=point(r2,y2,k),d=point(r2,y2,(k+1)%segments);
   for(const p of [a,c,b,b,c,d])verts.push(p.x,p.y,p.z);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.computeVertexNormals();const roof=mesh(geo,tile,'lan-curved-tile-roof');roof.material=new THREE.MeshStandardMaterial({color:tile,roughness:.86,side:THREE.DoubleSide});
  for(let k=0;k<segments;k++){
   const curve=new THREE.CatmullRomCurve3(profile.map(([r,y])=>point(r,y+.035,k)));mesh(new THREE.TubeGeometry(curve,14,k%8===0?.095:.045,5,false),k%8===0?0xa5684c:0x9a5a43,'lan-tile-rib');
  }
  // Upturned corner ornaments and the rounded ridge finial.
  for(let i=0;i<6;i++){const a=i*Math.PI/3,curve=new THREE.CatmullRomCurve3([[4.1,4.5],[4.8,4.58],[5,4.98]].map(([r,y])=>new THREE.Vector3(r*Math.cos(a),y,r*Math.sin(a))));mesh(new THREE.TubeGeometry(curve,8,.11,6,false),tile,'lan-upturned-eave');}
  const finial=mesh(new THREE.SphereGeometry(.22,10,8),tile,'lan-roof-finial');finial.scale.y=1.65;finial.position.y=7.13;
  const cv=document.createElement('canvas');cv.width=256;cv.height=128;const c=cv.getContext('2d');c.fillStyle='#30372c';c.fillRect(0,0,256,128);c.fillStyle='#d4aa50';c.font='bold 76px serif';c.textAlign='center';c.fillText('蘭亭',128,91);
  const plaque=mesh(new THREE.PlaneGeometry(1.18,.58),cream,'lan-name-plaque');plaque.material=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),side:THREE.DoubleSide});plaque.position.set(0,3.96,3.02);
  return g;
 }
 function renderVolleyballCourts(parent,courts,id,color){
  const g=new THREE.Group();g.name='volleyball-'+id+'-courts';parent.add(g);
  if(id==='outer'){const p=P.volleyball.outerPad;floor(g,p.x1-p.x0,p.z1-p.z0,(p.x0+p.x1)/2,(p.z0+p.z1)/2,0xa45f59,.057)}
  for(const [i,r] of courts.entries()){
   const x=(r.x0+r.x1)/2,z=(r.z0+r.z1)/2,w=r.x1-r.x0,d=r.z1-r.z0,longX=w>d;
   const surface=floor(g,w,d,x,z,color,.068);surface.name='volleyball-'+id+'-'+(i+1);surface.userData.volleyballCourt={...r};
   loop(g,[[r.x0,r.z0],[r.x1,r.z0],[r.x1,r.z1],[r.x0,r.z1]],.08,P.palette.line);
   for(const offset of [-3,0,3])floor(g,longX?.08:w,longX?d:.08,x+(longX?offset:0),z+(longX?0:offset),P.palette.line,.082);
   // Only the existing outdoor net is retained; the aerial red courts show surface markings.
   if(id==='outer'){
    for(const px of [r.x0-1,r.x1+1]){const post=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,2.6,8),mat(0x465b50));post.position.set(px,1.3,z);post.userData.campusSolid=true;g.add(post)}
    const net=new THREE.Mesh(new THREE.PlaneGeometry(w+2,1),new THREE.MeshBasicMaterial({color:0xf2f0e4,wireframe:true,side:THREE.DoubleSide,transparent:true,opacity:.7}));net.position.set(x,2.1,z);g.add(net);
   }
  }
  return g;
 }
 function render(scene){
  const g=new THREE.Group();g.name='photo-outdoor';scene.add(g);const t=P.track,c=P.palette;
  renderPerimeter(g);
  function ring(r,color,y){const mesh=new THREE.Mesh(new THREE.ShapeGeometry(stadium(r)),mat(color));mesh.rotation.x=-Math.PI/2;mesh.position.set(t.x,y,t.z);mesh.receiveShadow=true;g.add(mesh)}
  ring(t.outerRadius,c.track,.032);ring(t.innerRadius,c.lawn,.05);
  for(let i=0;i<=6;i++){const r=t.innerRadius+i*(t.outerRadius-t.innerRadius)/6;loop(g,stadium(r).getPoints(96).map(p=>[p.x+t.x,p.y+t.z]),.065,c.line)}
  // Reusable subtle grain, avoiding thousands of small meshes.
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#888';ctx.fillRect(0,0,128,128);
  for(let i=0;i<2400;i++){ctx.fillStyle=i%2?'#767676':'#999';ctx.fillRect((i*37)%128,(i*73+Math.floor(i/128)*11)%128,1,1)}
  const bump=new THREE.CanvasTexture(canvas);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(36,24);mat(c.track).bumpMap=bump;mat(c.track).bumpScale=.028;
  for(let lane=1;lane<=6;lane++){
   const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d');x.fillStyle='#f3f0e6';x.font='bold 100px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(lane),64,64);
   const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(t.x-20,.075,t.z+18+(lane-.5)*1.5);g.add(m);
   floor(g,.1,1.5,t.x-22+(lane-1)*.35,t.z+18+(lane-.5)*1.5,c.line,.07);
  }
  // Hard court apron follows the inner bend, leaving the running lanes clear.
  const apronShape=new THREE.Shape();apronShape.moveTo(14,-18);apronShape.lineTo(25,-18);apronShape.absarc(25,0,18,-Math.PI/2,Math.PI/2,false);apronShape.lineTo(14,18);apronShape.closePath();
  const apron=new THREE.Mesh(new THREE.ShapeGeometry(apronShape),mat(0x7b8778));apron.name='volleyball-inner-apron';apron.rotation.x=-Math.PI/2;apron.position.set(t.x,.056,t.z);apron.receiveShadow=true;g.add(apron);
  floor(g,1.2,32,-70,t.z,0xc58e87,.06);
  renderVolleyballCourts(g,P.courts,'inner',c.court);

  // Goals retain the guide's existing sports-field landmarks.
  for(const x of [t.x-22,-72]){const goal=new THREE.Group();goal.position.set(x,0,t.z);goal.rotation.y=Math.PI/2;g.add(goal);box(goal,.1,2.4,.1,-2.5,1.2,0,c.line);box(goal,.1,2.4,.1,2.5,1.2,0,c.line);box(goal,5.1,.1,.1,0,2.4,0,c.line)}
  const s=P.stage,h=s.height,st=new THREE.Group();st.name='stage-photo-model';g.add(st);
  box(st,16,h,7.7,-62,h/2,11.95,c.stage);
  // Ground movement is a continuous stair envelope; visible treads remain stepped.
  for(let i=0;i<7;i++){const z0=4.5+i*3.6/7,y=(i+1)*h/7,w=14-i*.38;box(st,w,y,3.6/7,-62,y/2,z0+3.6/14,c.step);box(st,w,.025,.12,-62,y+.015,z0+.04,c.line)}
  // Stage recess: walls and framing rather than a solid blue box.
  box(st,.24,4.2,7.7,s.x0+.12,h+2.1,11.95,c.stage,true);box(st,.24,4.2,7.7,s.x1-.12,h+2.1,11.95,c.stage,true);
  box(st,16,4.2,.24,-62,h+2.1,s.z1-.12,c.stage,true);
  // Side / back blocks also stop approaching a raised platform from ground level.
  registerWallCollider(s.x0-.12,s.x0+.24,s.z0,s.z1,-.1,h+4.2);registerWallCollider(s.x1-.24,s.x1+.12,s.z0,s.z1,-.1,h+4.2);registerWallCollider(s.x0,s.x1,s.z1-.24,s.z1+.12,-.1,h+4.2);
  for(const x of [-67.2,-56.8])box(st,.35,4.2,.45,x,h+2.1,8.5,c.line,true);
  box(st,16.6,.48,8.3,-62,h+4.45,11.8,c.line);
  const roof=box(st,16.5,.12,8.3,-62,h+4.78,11.8,c.roof);roof.rotation.x=.035;
  box(st,16.6,.72,.18,-62,h+4.65,7.7,c.line);
  for(let x=-69.8;x<-54.1;x+=.25)box(st,.11,.53,.1,x,h+4.68,7.55,c.roof);
  box(st,9.8,2.7,.05,-62,h+1.65,15.52,0x6a9197);
  // Back elevation: four framed windows from the matching 3D rear views.
  for(const x of [-67.2,-63.7,-60.3,-56.8]){
   box(st,2.3,1.5,.07,x,1.25,15.96,c.line);box(st,2.05,1.28,.09,x,1.25,16.01,0x63808a);
   for(let dx=-.84;dx<1;dx+=.28)box(st,.035,1.28,.11,x+dx,1.25,16.07,c.line);box(st,2.05,.045,.11,x,1.25,16.07,c.line);
  }
  // Actual sports mosaic on the exterior rear wall, above the four windows.
  // UV corners select the mural from the original photo without inventing details.
  box(st,7.0,3.5,.09,-62,3.8,16.03,c.line);
  const muralGeometry=new THREE.PlaneGeometry(6.6,3.2);
  muralGeometry.attributes.uv.setXY(0,367/1280,1-354/960);
  muralGeometry.attributes.uv.setXY(1,842/1280,1-327/960);
  muralGeometry.attributes.uv.setXY(2,343/1280,1-585/960);
  muralGeometry.attributes.uv.setXY(3,842/1280,1-592/960);
  const muralMaterial=new THREE.MeshBasicMaterial({color:0xffffff});
  const mural=new THREE.Mesh(muralGeometry,muralMaterial);mural.name='stage-rear-sports-mural';mural.position.set(-62,3.8,16.09);st.add(mural);
  // Fetch after the first view is usable; the wall itself never blocks startup.
  const loadMural=()=>new THREE.TextureLoader().load('photos/stage-rear-mural.jpg',texture=>{
   texture.encoding=THREE.sRGBEncoding;texture.anisotropy=4;muralMaterial.map=texture;muralMaterial.needsUpdate=true;
  },undefined,()=>{muralMaterial.color.setHex(0x8b9c9a);});
  if(typeof requestIdleCallback==='function')requestIdleCallback(loadMural,{timeout:2500});else setTimeout(loadMural,600);
  // Flag poles stand on the viewer's left (+x for a -z-facing stage).
  floor(st,7,2.5,-49.5,9,c.line,.07);
  for(const [i,x] of [-52,-49.5,-47].entries()){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,10+i%2,10),mat(0xbdc7c8));pole.position.set(x,(10+i%2)/2,9);pole.userData.campusSolid=true;st.add(pole)}
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.1),new THREE.MeshBasicMaterial({color:0xa9443d,side:THREE.DoubleSide}));flag.position.set(-48.65,10.25,9);st.add(flag);
  const canton=new THREE.Mesh(new THREE.PlaneGeometry(.85,.55),new THREE.MeshBasicMaterial({color:0x344e7b,side:THREE.DoubleSide}));canton.position.set(-49.075,10.525,8.99);st.add(canton);
  const sun=new THREE.Mesh(new THREE.CircleGeometry(.17,12),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));sun.position.set(-49.075,10.525,8.98);st.add(sun);
  ROOMS_DB.grandstand={id:'grandstand',code:'OUT-STAND',name:'操場司令台（升旗台）',buildingId:'track',buildingName:'操場及綜合球場',floor:1,cat:'sports',node:'stand-podium'};
  return g;
 }
 return{render,renderVolleyballCourts,renderLanPavilion};
})();
