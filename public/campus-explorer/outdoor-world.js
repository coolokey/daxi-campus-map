/* Shared outdoor geometry. The stage walls, stairs and navigation use outdoor-plan. */
const CampusOutdoorWorld=(()=>{
 const P=CampusOutdoorPlan,matCache=new Map();
 const mat=(color)=>{if(!matCache.has(color))matCache.set(color,new THREE.MeshStandardMaterial({color,roughness:.9}));return matCache.get(color)};
 function box(g,w,h,d,x,y,z,color,solid=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);if(solid)registerWallCollider(x-w/2,x+w/2,z-d/2,z+d/2,y-h/2,y+h/2);return m}
 function floor(g,w,d,x,z,color,y=.035){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat(color));m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;g.add(m);return m}
 function loop(g,points,y,color){const geo=new THREE.BufferGeometry().setFromPoints(points.map(([x,z])=>new THREE.Vector3(x,y,z)));const m=new THREE.LineLoop(geo,new THREE.LineBasicMaterial({color}));g.add(m)}
 function stadium(radius){const s=new THREE.Shape(),t=P.track,a=t.halfStraight;s.moveTo(-a,-radius);s.lineTo(a,-radius);s.absarc(a,0,radius,-Math.PI/2,Math.PI/2,false);s.lineTo(-a,radius);s.absarc(-a,0,radius,Math.PI/2,Math.PI*1.5,false);s.closePath();return s}
 function render(scene){
  const g=new THREE.Group();g.name='photo-outdoor';scene.add(g);const t=P.track,c=P.palette;
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
  for(const r of P.courts){floor(g,r.x1-r.x0,r.z1-r.z0,(r.x0+r.x1)/2,(r.z0+r.z1)/2,c.court,.068);loop(g,[[r.x0,r.z0],[r.x1,r.z0],[r.x1,r.z1],[r.x0,r.z1]],.075,c.line);floor(g,r.x1-r.x0,.08,(r.x0+r.x1)/2,(r.z0+r.z1)/2,c.line,.08)}
  // Goals retain the guide's existing sports-field landmarks.
  for(const x of [t.x-22,t.x+22]){const goal=new THREE.Group();goal.position.set(x,0,t.z);goal.rotation.y=Math.PI/2;g.add(goal);box(goal,.1,2.4,.1,-2.5,1.2,0,c.line);box(goal,.1,2.4,.1,2.5,1.2,0,c.line);box(goal,5.1,.1,.1,0,2.4,0,c.line)}
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
   box(st,2.3,1.5,.07,x,h+1.6,15.96,c.line);box(st,2.05,1.28,.09,x,h+1.6,16.01,0x63808a);
   box(st,.045,1.28,.11,x,h+1.6,16.07,c.line);box(st,2.05,.045,.11,x,h+1.6,16.07,c.line);
  }
  box(st,12.5,.85,.08,-62,h+3.2,15.98,0xe1d5ad);
  for(let i=0;i<7;i++)box(st,1.15,.42,.09,-67+i*1.65,h+3.2,16.04,[0x6a9375,0xa86e50,0x829eb0][i%3]);
  // Flag poles stand on the viewer's left (+x for a -z-facing stage).
  floor(st,7,2.5,-49.5,9,c.line,.07);
  for(const [i,x] of [-52,-49.5,-47].entries()){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,10+i%2,10),mat(0xbdc7c8));pole.position.set(x,(10+i%2)/2,9);st.add(pole)}
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.1),new THREE.MeshBasicMaterial({color:0xa9443d,side:THREE.DoubleSide}));flag.position.set(-48.65,10.25,9);st.add(flag);
  const canton=new THREE.Mesh(new THREE.PlaneGeometry(.85,.55),new THREE.MeshBasicMaterial({color:0x344e7b,side:THREE.DoubleSide}));canton.position.set(-49.075,10.525,8.99);st.add(canton);
  const sun=new THREE.Mesh(new THREE.CircleGeometry(.17,12),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));sun.position.set(-49.075,10.525,8.98);st.add(sun);
  ROOMS_DB.grandstand={id:'grandstand',code:'OUT-STAND',name:'操場司令台（升旗台）',buildingId:'track',buildingName:'操場及綜合球場',floor:1,cat:'sports',node:'stand-podium'};
  return g;
 }
 return{render};
})();
