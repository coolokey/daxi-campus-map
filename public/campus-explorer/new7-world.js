/* DSC05982/05983, DSC06075–06123 and the aerial: photo-proportional massing.
 * Call before collision indexes. The low hall adds no guessed room identity.
 * Shared-plan steps/ramp supply ground support; all blocking shells have solids.
 */
const CampusNew7World={
 build({l,scene,floorMeshes,box,surfaceMaterials}){
  const c=surfaceMaterials(l),mat=color=>new THREE.MeshStandardMaterial({color,roughness:.94});
  const stone=c.exterior,cream=mat(0xc9c8b9),silver=mat(0xc3cdca),green=mat(0x287357),brown=mat(0x4b4038),roof=mat(0x92978f),red=mat(0xb48d83),grass=mat(0x71835c);
  const glass=new THREE.MeshStandardMaterial({color:0x8eaaa5,transparent:true,opacity:.48,roughness:.24});
  const group=(name,floor=1,ceiling=false)=>{const g=new THREE.Group();g.name=name;g.userData={buildingId:l.id,floorNum:floor,...(ceiling?{campusCeiling:true}:{})};scene.add(g);floorMeshes.push(g);return g;};
  const B=(g,u0,u1,v0,v1,y0,y1,m,solid=false)=>box(g,l,u0,u1,v0,v1,y0,y1,m,solid);
  const a=-l.L/2,A=l.L/2,wing=A-8,front=1,end=15,H=3.6,s=l.stairs[0];
  // Generic roof meshes are replaced with independent ceiling groups, so floor
  // cutaways hide the canopy without removing the visible upper-floor facade.
  for(const g of floorMeshes.filter(g=>g.userData.buildingId===l.id))for(const child of [...g.children])if(child.userData.roof){g.remove(child);child.geometry?.dispose();}
  const top=group('new7-main-segmented-roof',l.b.floors,true),topY=l.b.floors*H;
  B(top,a-.25,wing+.25,-7.25,1.35,topY,topY+.2,roof);
  B(top,wing-.25,A+.25,-7.25,10.5,topY+.18,topY+.38,roof);
  // End canopy rises in short planes, echoing the visibly independent pitched cap.
  const cap=group('new7-east-raised-end-canopy',l.b.floors,true);
  const lo=wing-.25,hi=A+.25,mid=(lo+hi)/2,eave=topY+.45,peak=eave+.75,polygons=[
   [[lo,10.5,eave],[mid,10.5,peak],[mid,15,peak],[lo,15,eave]],
   [[mid,10.5,peak],[hi,10.5,eave],[hi,15,eave],[mid,15,peak]],
   [[lo,10.5,eave-.14],[hi,10.5,eave-.14],[mid,10.5,peak]],
   [[hi,15,eave-.14],[lo,15,eave-.14],[mid,15,peak]]
  ],vertices=[];
  for(const polygon of polygons)for(let i=1;i<polygon.length-1;i++)for(const q of [polygon[0],polygon[i],polygon[i+1]]){const p=l.world(...q);vertices.push(p.x,p.y,p.z);}
  const capGeometry=new THREE.BufferGeometry();capGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));capGeometry.computeVertexNormals();const capPaint=cream.clone();capPaint.side=THREE.DoubleSide;const capMesh=new THREE.Mesh(capGeometry,capPaint);capMesh.name='new7-east-continuous-pitched-cap';capMesh.castShadow=capMesh.receiveShadow=true;cap.add(capMesh);
  const cameraEnvelope=B(cap,lo,hi,10.5,15,eave-.14,peak,cream);cameraEnvelope.visible=false;
  const posts=group('new7-main-round-columns');
  for(const [u,v] of [...[-22,-16,-10,-4,4,10].map(u=>[u,front-.05]),...[4,10,14.4].map(v=>[wing+.15,v])]){
   const post=B(posts,u-.15,u+.15,v-.15,v+.15,0,H,cream,true);post.geometry.dispose();post.geometry=new THREE.CylinderGeometry(.15,.15,H,12);
  }
  const low=group('new7-low-high-window-hall'),lowRoof=group('new7-low-hall-terrace-roof',1,true),hallLeft=a-8,hallEnd=-15,face=13.5,height=5.5;
  // Three real opaque boundaries; front windows have the same full-height
  // collision surface as the walls, while their visual material stays glass.
  B(low,hallLeft,hallLeft+.2,front,face,0,height,stone,true);B(low,hallEnd-.2,hallEnd,front,face,0,height,stone,true);
  B(low,hallLeft,hallEnd,front,front+.2,0,height,stone,true);
  B(low,hallLeft,hallEnd,face-.12,face+.12,0,.6,stone,true);B(low,hallLeft,hallEnd,face-.12,face+.12,.6,4.7,glass,true);B(low,hallLeft,hallEnd,face-.12,face+.12,4.7,height,stone,true);
  for(let u=hallLeft+.3;u<hallEnd;u+=1.05)B(low,u-.035,u+.035,face-.15,face+.15,.6,4.7,silver);
  for(let h=.65;h<4.7;h+=.48)B(low,hallLeft,hallEnd,face-.16,face+.16,h,h+.04,silver);
  B(lowRoof,hallLeft-.35,hallEnd+.3,front,15,height,height+.22,stone);
  for(const v of [front+.1,face-.2])B(lowRoof,hallLeft,hallEnd,v-.08,v+.08,height+.22,height+.95,stone);
  for(const u of [hallLeft+.1,hallEnd-.1])B(lowRoof,u-.08,u+.08,front,face,height+.22,height+.95,stone);
  for(let u=hallLeft+.8;u<hallEnd-.5;u+=4.4){
   // Cylinder mesh plus a conservative square solid keep body/corner clearance.
   const proxy=B(low,u-.24,u+.24,14.35,14.83,0,height,cream,true);proxy.geometry.dispose();proxy.geometry=new THREE.CylinderGeometry(.24,.24,height,16);
  }
  // Glaze the actual west stair wall, preserving the registered wall collision
  // and its existing open landing mouth instead of inventing another stair.
  const stop=s.nearU-.14;
  for(const g of floorMeshes.filter(g=>g.userData.buildingId===l.id&&g.name.startsWith('floor-')))for(const mesh of g.children){
   if(!mesh.isMesh)continue;const p=l.local(mesh.position.x,mesh.position.z);
   if(Math.abs(p.v-s.v1)<.01&&p.u>s.u0&&p.u<stop&&Math.abs(mesh.geometry.parameters?.height-H)<.01){mesh.material=glass;mesh.name='new7-actual-stair-glazing';}
  }
  for(let f=1;f<=l.b.floors;f++){
   const g=group('new7-glass-stair-tower-'+f,f),y=(f-1)*H,v=2.1;
   // This glazed projection surrounds the corridor in front of the true core.
   // Side walls start at v=1, leaving the full main corridor open behind it.
   B(g,s.u0,stop,1.96,2.04,y,y+H,glass,true);
   for(const u of [s.u0,stop])B(g,u-.055,u+.055,1,2,y,y+H,glass,true);
   for(let u=s.u0+.15;u<stop;u+=.9)B(g,u-.025,u+.025,v-.04,v+.04,y,y+H,silver);
   for(let h=0;h<H;h+=.6)B(g,s.u0,stop,v-.05,v+.05,y+h,y+h+.045,silver);
   // Dense horizontal brown fins stay on the tower's west half, clear of exit.
   for(let h=.15;h<H;h+=.17)B(g,s.u0+.08,s.u0+2.65,v+.02,v+.25,y+h,y+h+.055,brown);
  }
  const towerRoof=group('new7-glass-tower-cap',l.b.floors,true);B(towerRoof,s.u0-.2,stop+.18,s.v0-.2,2.35,topY+.2,topY+.42,cream);
  // Court is paved, with sparse long red strips and discrete tree pits. Keep
  // the central level entrance and the east access ramp entirely unobstructed.
  const court=group('new7-photo-courtyard'),canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');
  if(ctx){ctx.fillStyle='#b3b5ae';ctx.fillRect(0,0,128,128);ctx.strokeStyle='#91978f';ctx.lineWidth=1;for(let row=0;row<8;row++){ctx.beginPath();ctx.moveTo(0,row*16);ctx.lineTo(128,row*16);ctx.stroke();for(let col=0;col<4;col++){const x=col*32+(row%2)*16;ctx.beginPath();ctx.moveTo(x,row*16);ctx.lineTo(x,row*16+16);ctx.stroke();}}}
  const map=new THREE.CanvasTexture(canvas);map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(8,4);
  B(court,hallLeft,A,front,16.5,.046,.058,new THREE.MeshStandardMaterial({map,roughness:1}));
  for(let u=-5;u<14;u+=3.2)for(const v of [4.5,8,12])B(court,u,u+.33,v,v+2,.059,.065,red);
  for(const [u,v] of [[-4,10.5],[7.5,10.5],[-3.5,14.7],[8.4,14.7]]){
   B(court,u-.65,u+.65,v-.65,v+.65,.066,.085,grass);
   for(const dv of [-.69,.69])B(court,u-.73,u+.73,v+dv-.04,v+dv+.04,.06,.14,stone,true);
   for(const du of [-.69,.69])B(court,u+du-.04,u+du+.04,v-.65,v+.65,.06,.14,stone,true);
   const trunk=B(court,u-.11,u+.11,v-.11,v+.11,.08,2.5,brown,true);trunk.geometry.dispose();trunk.geometry=new THREE.CylinderGeometry(.09,.11,2.42,8);
   const tree=new THREE.Mesh(new THREE.SphereGeometry(.85,7,5),grass),p=l.world(u,v,2.8);tree.position.set(p.x,p.y,p.z);tree.scale.set(1,1.35,1);court.add(tree);
  }
  for(const p of l.platforms.filter(p=>p.kind==='new7-court-step'))B(court,p.u0,p.u1,p.v0,p.v1,.058,p.y,stone);
  const ramp=l.ramps.find(r=>r.stairId==='new7-court-access');
  if(ramp){
   const vertex=(u,v,h)=>{const p=l.world(u,v,h);return[p.x,p.y,p.z]},vertices=[...vertex(ramp.u0,ramp.v0,ramp.h0),...vertex(ramp.u1,ramp.v0,ramp.h0),...vertex(ramp.u1,ramp.v1,ramp.h1),...vertex(ramp.u0,ramp.v0,ramp.h0),...vertex(ramp.u1,ramp.v1,ramp.h1),...vertex(ramp.u0,ramp.v1,ramp.h1)];
   const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();const paint=stone.clone();paint.side=THREE.DoubleSide;court.add(new THREE.Mesh(geometry,paint));
   // End posts + short rails along the slope; never cross the access path.
   for(const u of [ramp.u0,ramp.u1])for(let i=0;i<8;i++){const v=ramp.v0+(ramp.v1-ramp.v0)*i/7,h=ramp.h0+(ramp.h1-ramp.h0)*i/7;B(court,u-.025,u+.025,v-.025,v+.025,h,h+.95,green,true);if(i<7)B(court,u-.035,u+.035,v,v+(ramp.v1-ramp.v0)/7,h+.9-.03,h+.95,green);}
  }
 }
};
