/* User aerials 2026-10-24 175154/175226/175254/175305.
 * Photo-backed exterior skin only. Room footprints, stairs, exits and collision
 * stay with the shared spatial model; dimensions below remain illustrative.
 */
(()=>{
 const api=window.campusExplorer,layouts=window.campusWalkWorld?.layouts;if(!api||!layouts)return;
 const cache=new Map(),mat=color=>{if(!cache.has(color))cache.set(color,new THREE.MeshStandardMaterial({color,roughness:.97}));return cache.get(color)};
 function group(l,f,name){const g=new THREE.Group();g.name=name;g.userData={buildingId:l.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);return g;}
 function box(g,l,name,u,v,y,length,height,depth,color){const p=l.world(u,v,y),m=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?length:depth,height,l.horizontal?depth:length),mat(color));m.name=name;m.position.set(p.x,p.y,p.z);m.castShadow=m.receiveShadow=true;g.add(m);return m;}
 const tech=layouts.find(l=>l.id==='tech-building');
 if(tech){
  const g=group(tech,2,'photo-tech-green-awning'),start=2.1,end=tech.L/2-.35,B=tech.D/2,points=[];
  const curve=t=>({v:B+.18+1.12*Math.sin(t*Math.PI/2),y:2*FH-.07-.85*(1-Math.cos(t*Math.PI/2))});
  const vertex=(u,t)=>{const p=curve(t),q=tech.world(u,p.v,p.y);return[q.x,q.y,q.z]};
  for(let i=1;i<=16;i++){const t=(i-1)/16,n=i/16,a=vertex(start,t),b=vertex(end,t),c=vertex(end,n),d=vertex(start,n);points.push(...a,...b,...c,...a,...c,...d);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));geo.computeVertexNormals();
  const green=new THREE.MeshStandardMaterial({color:0x228c78,roughness:.65,transparent:true,opacity:.86,side:THREE.DoubleSide}),sheet=new THREE.Mesh(geo,green);sheet.name='tech-continuous-green-shade';sheet.castShadow=sheet.receiveShadow=true;g.add(sheet);
  for(let u=start;u<end+.01;u+=1.05){const nodes=Array.from({length:13},(_,i)=>new THREE.Vector3(...vertex(Math.min(u,end),i/12))),rib=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(nodes),12,.026,5,false),mat(0xbac7bf));rib.name='tech-awning-silver-rib';g.add(rib);}
  for(const t of [0,1]){const p=curve(t);box(g,tech,'tech-awning-edge',(start+end)/2,p.v,p.y,end-start,.055,.055,0xc0cbc5);}
 }
 for(const l of layouts.filter(l=>['art-building','health-bld'].includes(l.id)))for(let f=1;f<=l.b.floors;f++){
  const y=(f-1)*FH,g=group(l,f,`photo-special-${l.id}-${f}`),a=-l.L/2,A=l.L/2,B=l.D/2;
  if(l.id==='art-building'){
   // Thin grey floor bands preserve the closed tower, rather than adding balconies.
   for(const side of [-1,1]){box(g,l,'art-floor-band',0,side*(B+.13),y+FH-.14,l.L+.2,.18,.12,0x929b97);box(g,l,'art-floor-band',side*(l.L/2+.13),0,y+FH-.14,.12,.18,l.D+.2,0x929b97);}
   // Narrow stair-side dark recess visible on the face toward the technology wing.
   // Kept above the ground floor and clear of the actual central corridor door.
   if(f>1){const recess=new THREE.Group();recess.name='art-recessed-stair-windows';g.add(recess);box(recess,l,'art-stair-window',a-.13,-1.95,y+1.8,.065,1.65,1.15,0x596561);for(const v of [-2.57,-1.33])box(recess,l,'art-stair-window-reveal',a-.17,v,y+1.8,.14,1.85,.08,0x9da69e);}
  }else{
   // Long white floor edges and a shaded upper gallery match the court-facing aerial.
   for(const side of [-1,1])box(g,l,'health-floor-edge',0,side*(B+.13),y+FH-.13,l.L+.2,.24,.18,0xd0d1c7);
   if(f===2){box(g,l,'health-upper-corridor-fascia',0,l.outerV+.13,y+.53,l.L,.96,.16,0xc9ccc2);box(g,l,'health-upper-shade-line',0,l.outerV+.14,y+2.92,l.L,.34,.18,0x596760);}
   // End-face horizontal lines; no speculative exterior staircase is added.
   for(const u of [a-.12,A+.12])box(g,l,'health-end-floor-band',u,0,y+FH-.13,.16,.24,l.D,0xc9ccc2);
  }
 }
})();
