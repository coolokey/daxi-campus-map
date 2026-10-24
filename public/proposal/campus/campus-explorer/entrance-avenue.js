/* Photo-derived exterior approach. Dimensions are illustrative, not a survey. */
const CampusEntranceAvenue = (() => {
  const plan = {x:CampusOutdoorPlan.entrance.gate.x,z0:89,z1:171,width:9,gateZ:86};
  const palms = Array.from({length:20},(_,i)=>({x:plan.x+(i%2?6.5:-6.5),z:96+Math.floor(i/2)*7.7,height:13.6+(i*7%9)*.35,rotation:i*2.399}));
  // Photo-confirmed entrance landmark; only the visible first stretch is modeled.
  // Latest gate aerial: the lettering faces the guardhouse across the forecourt.
  const signAnchor={x:-61,z:84,yaw:Math.PI/2};
  const trailPoint=(dx,dz)=>({x:signAnchor.x+dx,z:signAnchor.z+dz});
  const signPoint=(along,front)=>({x:signAnchor.x+Math.cos(signAnchor.yaw)*along+Math.sin(signAnchor.yaw)*front,z:signAnchor.z-Math.sin(signAnchor.yaw)*along+Math.cos(signAnchor.yaw)*front});
  // Anchor the entire entrance to the gym corner identified in the photos.
  // The photographed shelter is a location reference only, not a new model.
  const trail={name:'街口溪生態步道',entry:{...trailPoint(7.5,6.5),y:0},width:4.2,sign:signAnchor,approach:[[.5,-2.8],[9,-2.8],[12,2],[21,2],[21,10],[1.2,10],[1.2,4.2],[.5,4.2]].map(([x,z])=>trailPoint(x,z)),path:[[7.5,6.5],[-4,6.5],[-20,5.5],[-37,1.5]].map(([x,z])=>trailPoint(x,z))};
  const distanceToSegment=(x,z,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a.x-t*dx,z-a.z-t*dz)};
  const inPolygon=(x,z,polygon)=>{let inside=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a.z>z)!==(b.z>z)&&x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x)inside=!inside;}return inside;};
  const trailContains=(x,z)=>!CampusOutdoorPlan.perimeter.contains(x,z)&&(inPolygon(x,z,trail.approach)||trail.path.slice(1).some((b,i)=>distanceToSegment(x,z,trail.path[i],b)<=trail.width/2+.2));
  const contains = (x,z) => (x>=plan.x-9&&x<=plan.x+9&&z>=89&&z<=174)||trailContains(x,z);
  function renderTrail(scene,registerCollider,asphalt){
    const pathAsphalt=asphalt.clone();pathAsphalt.color.setHex(0x777b74);pathAsphalt.side=THREE.DoubleSide;
    const group=new THREE.Group();group.name='jiekou-trail-entrance';group.userData.source='User-confirmed name and four entrance photos; illustrative dimensions';scene.add(group);
    const stone=new THREE.MeshStandardMaterial({color:0xc1c2b8,roughness:1}),soil=new THREE.MeshStandardMaterial({color:0x64704a,roughness:1}),wood=new THREE.MeshStandardMaterial({color:0x755a4b,roughness:.95});
    const greens=[0x52743e,0x6d864c,0x7c9656].map(color=>new THREE.MeshStandardMaterial({color,roughness:1}));
    function box(name,w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.name=name;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m}
    function segment(name,a,b,width,height,y,mat,solid=false){const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz),m=box(name,length,height,width,(a.x+b.x)/2,y,(a.z+b.z)/2,mat);m.rotation.y=-Math.atan2(dz,dx);if(solid){registerCollider(Math.min(a.x,b.x)-width/2,Math.max(a.x,b.x)+width/2,Math.min(a.z,b.z)-width/2,Math.max(a.z,b.z)+width/2,y-height/2,y+height/2);if(typeof WALL_COLLIDERS!=='undefined')WALL_COLLIDERS.at(-1).segment={ax:a.x,az:a.z,bx:b.x,bz:b.z,thickness:width};}return m}
    // A level entrance surface: the photographs do not establish a surveyed grade.
    const approachShape=new THREE.Shape();trail.approach.forEach((p,i)=>i?approachShape.lineTo(p.x,p.z):approachShape.moveTo(p.x,p.z));approachShape.closePath();
    const approach=new THREE.Mesh(new THREE.ShapeGeometry(approachShape),pathAsphalt);approach.name='jiekou-trail-approach';approach.rotation.x=Math.PI/2;approach.position.y=.0675;approach.receiveShadow=true;group.add(approach);
    for(let i=1;i<trail.path.length;i++){const a=trail.path[i-1],b=trail.path[i];segment('jiekou-trail-asphalt',a,b,trail.width,.055,.05,pathAsphalt);}
    for(const p of trail.path.slice(1,-1)){const m=new THREE.Mesh(new THREE.CylinderGeometry(trail.width/2,trail.width/2,.055,20),pathAsphalt);m.position.set(p.x,.05,p.z);group.add(m);}
    // An irregular stone-edged planted island, with collision only on its edges.
    const polygon=[[-3.9,-4],[2.9,-4],[3.4,-2.4],[3.4,.75],[-3.4,.75],[-3.9,-.2]].map(([along,front])=>{const p=signPoint(along,front);return [p.x,p.z]}),shape=new THREE.Shape();
    polygon.forEach(([x,z],i)=>i?shape.lineTo(x,z):shape.moveTo(x,z));shape.closePath();
    const bed=new THREE.Mesh(new THREE.ShapeGeometry(shape),soil);bed.name='jiekou-trail-planter';bed.rotation.x=Math.PI/2;bed.position.y=.16;bed.material.side=THREE.DoubleSide;group.add(bed);
    for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length];segment('jiekou-trail-stone-curb',{x:a[0],z:a[1]},{x:b[0],z:b[1]},.22,.32,.16,stone,true);}
    const sign=new THREE.Group();sign.name='jiekou-trail-sign';sign.userData.text=trail.name;sign.position.set(trail.sign.x,.18,trail.sign.z);sign.rotation.y=trail.sign.yaw;group.add(sign);
    const slatGeometry=new THREE.BoxGeometry(.105,2.75,.12),slats=new THREE.InstancedMesh(slatGeometry,wood,29),dummy=new THREE.Object3D();
    for(let i=0;i<29;i++){dummy.position.set(-3.08+i*.22,1.375,0);dummy.updateMatrix();slats.setMatrixAt(i,dummy.matrix);}slats.castShadow=true;sign.add(slats);
    const titleCanvas=document.createElement('canvas');titleCanvas.width=1536;titleCanvas.height=192;const title=titleCanvas.getContext('2d');title.fillStyle='#49382e';title.fillRect(0,0,1536,192);title.fillStyle='#f4f0e4';title.font='110px KaiTi, DFKai-SB, serif';title.textAlign='center';title.textBaseline='middle';title.fillText(trail.name,768,100,1450);
    const titleTexture=new THREE.CanvasTexture(titleCanvas),titleBoard=new THREE.Mesh(new THREE.BoxGeometry(6.5,.78,.14),wood);titleBoard.position.set(0,1.64,.09);titleBoard.rotation.z=.20;sign.add(titleBoard);
    const letters=new THREE.Mesh(new THREE.PlaneGeometry(6.5,.78),new THREE.MeshStandardMaterial({map:titleTexture,roughness:.95}));letters.name='jiekou-trail-lettering';letters.position.set(0,1.64,.166);letters.rotation.z=.20;sign.add(letters);
    // Include the slats, angled title board and its forward lettering plane.
    const solidCenter=signPoint(0,.055),dx=Math.cos(trail.sign.yaw)*3.3,dz=-Math.sin(trail.sign.yaw)*3.3,padX=Math.abs(Math.sin(trail.sign.yaw))*.12,padZ=Math.abs(Math.cos(trail.sign.yaw))*.12;
    registerCollider(solidCenter.x-Math.abs(dx)-padX,solidCenter.x+Math.abs(dx)+padX,solidCenter.z-Math.abs(dz)-padZ,solidCenter.z+Math.abs(dz)+padZ,0,3);
    if(typeof WALL_COLLIDERS!=='undefined')WALL_COLLIDERS.at(-1).segment={ax:solidCenter.x-dx,az:solidCenter.z-dz,bx:solidCenter.x+dx,bz:solidCenter.z+dz,thickness:.24};
    const shrubGeometry=new THREE.IcosahedronGeometry(1,1);
    function shrub(x,z,sx,sy,sz,index,baseY=.2){const m=new THREE.Mesh(shrubGeometry,greens[index%3]);m.position.set(x,baseY+sy*.6,z);m.scale.set(sx,sy,sz);m.castShadow=true;group.add(m)}
    for(const [along,index] of [[-2.8,0],[2.6,1]]){const p=signPoint(along,-2.5);shrub(p.x,p.z,index ? .75 : 1.1,index ? .65 : .85,index ? .7 : .9,index);}
    for(let i=0;i<16;i++){const p=signPoint(-2.8+i*.36,.4+Math.sin(i*.9)*.1);shrub(p.x,p.z,.34,.3,.34,i);}
    // Tall grasses behind the sign keep the foreground lettering unobstructed.
    const reeds=new THREE.BufferGeometry(),positions=[];
    for(let i=0;i<60;i++){const {x,z}=signPoint(-2.7+(i%20)*.28,-1.3-Math.floor(i/20)*.18);positions.push(x,.2,z,x+.1*Math.sin(i),1.1+(i%4)*.16,z+.08);}
    reeds.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));group.add(new THREE.LineSegments(reeds,new THREE.LineBasicMaterial({color:0x71824e})));
    const outerA=trailPoint(-1,9.9),outerB=trailPoint(-35,5.9);segment('jiekou-trail-low-wall',outerA,outerB,.3,.68,.34,stone,true);
    for(let i=0;i<11;i++){const t=i/10,x=outerA.x+(outerB.x-outerA.x)*t,z=outerA.z+(outerB.z-outerA.z)*t;const pot=box('jiekou-trail-wall-pot',.42,.23,.42,x,.8,z,stone);shrub(x,z,.46,.38,.4,i,.9);}
    for(let i=0;i<7;i++){const x=signAnchor.x-5-i*4.7,z=signAnchor.z+13.5-i*.22;box('jiekou-trail-tree-trunk',.32,3,.32,x,1.5,z,wood);shrub(x,z,2.4,3.2,2.1,i);}
  }
  function crownGeometry() {
    const positions=[],colors=[],green=new THREE.Color();
    function triangle(a,b,c,tone){positions.push(...a,...b,...c);green.setHex(tone);for(let i=0;i<3;i++)colors.push(green.r,green.g,green.b);}
    for(let f=0;f<11;f++) {
      const angle=f*Math.PI*2/11,length=3.8+(f%3)*.45;
      const point=t=>[Math.cos(angle)*length*t, .95*Math.sin(Math.PI*t)-2.25*t*t, Math.sin(angle)*length*t];
      const tangent=[-Math.sin(angle),0,Math.cos(angle)];
      for(let j=1;j<18;j++) {
        const t=j/18,base=point(t),next=point(Math.min(1,t+.055));
        triangle([base[0]-.035,base[1],base[2]],next,[base[0]+.035,base[1],base[2]],0x486449);
        for(const sign of [-1,1]) {
          const reach=(.24+Math.sin(Math.PI*t)*.78)*(1-.25*t);
          const tip=[base[0]+tangent[0]*reach*sign-Math.cos(angle)*.24,base[1]-.15-reach*.4,base[2]+tangent[2]*reach*sign-Math.sin(angle)*.24];
          const middle=[(base[0]+tip[0])/2, (base[1]+tip[1])/2+.045,(base[2]+tip[2])/2];
          triangle(base,middle,[tip[0]+Math.cos(angle)*.045,tip[1],tip[2]+Math.sin(angle)*.045],f%3?0x285539:0x456845);
          triangle(base,[tip[0]-Math.cos(angle)*.045,tip[1],tip[2]-Math.sin(angle)*.045],middle,0x244632);
        }
      }
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
  }
  function render(scene,registerCollider) {
    const offset=plan.x+10,collider=(x0,x1,...rest)=>registerCollider(x0+offset,x1+offset,...rest);
    const group=new THREE.Group();group.name='entrance-palm-avenue';group.position.x=offset;scene.add(group);
    const materials=new Map(),material=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.95}));return materials.get(color);};
    function box(w,h,d,x,y,z,color){
      const geometry=new THREE.BoxGeometry(w,h,d);
      if(color?.map){const p=geometry.attributes.position,n=geometry.attributes.normal,uv=geometry.attributes.uv;
        for(let i=0;i<p.count;i++)uv.setXY(i,(Math.abs(n.getX(i))>.5?p.getZ(i)+z:p.getX(i)+x)/4,(Math.abs(n.getY(i))>.5?p.getZ(i)+z:p.getY(i)+y)/4);
      }
      const m=new THREE.Mesh(geometry,color?.isMaterial?color:material(color));m.position.set(x,y,z);m.receiveShadow=true;group.add(m);return m;
    }
    function groundTexture(grass=false){
      const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
      g.fillStyle=grass?'#889174':'#777a76';g.fillRect(0,0,256,256);
      let seed=grass?931:642;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
      for(let i=0;i<18000;i++){
        const v=Math.floor(random()*48),x=random()*256,y=random()*256;
        g.fillStyle=grass?`rgba(${86+v},${103+v},${66+v},.28)`:`rgba(${80+v*2},${83+v*2},${79+v*2},.3)`;
        g.fillRect(x,y,grass?.6+random():.5+random()*1.5,grass?1+random()*3:.5+random()*1.5);
      }
      const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t;
    }
    const asphaltTexture=groundTexture(),grassTexture=groundTexture(true);
    const asphalt=new THREE.MeshStandardMaterial({map:asphaltTexture,bumpMap:asphaltTexture,bumpScale:.026,roughness:.98});
    const verge=new THREE.MeshStandardMaterial({map:grassTexture,roughness:1});
    const length=plan.z1-plan.z0,mid=(plan.z1+plan.z0)/2;
    box(18,.04,length,-10,.012,mid,verge).name='avenue-grass-shoulders';
    box(9,.045,length,-10,.04,mid,asphalt).name='avenue-asphalt';
    // Flush drainage margins stay below the existing road surface. They add
    // depth cues without creating new motor steps or narrowing the route.
    for(const x of [-14.76,-5.24]){
      box(.5,.035,length,x,.021,mid,0xb8b8a8).name='avenue-flush-curb';
      box(.08,.009,length,x+(x<-10?.29:-.29),.043,mid,0x6f7668).name='avenue-drainage-seam';
    }
    for(const x of [-14.4,-5.6])box(.12,.012,length,x,.069,mid,0xba5145);
    for(let z=91;z<plan.z1-2;z+=6)box(.11,.012,2.8,-10,.07,z,0xe8bc53);
    for(const x of [-10.2,-9.8])box(.10,.012,17,x,.074,160.5,0xe8bc53);
    // Shared textured trunks and instanced crowns keep the avenue inexpensive to draw.
    const canvas=document.createElement('canvas');canvas.width=64;canvas.height=512;const ctx=canvas.getContext('2d');
    ctx.fillStyle='#a3a397';ctx.fillRect(0,0,64,512);
    for(let y=0;y<512;y+=17){ctx.fillStyle='#81877a';ctx.fillRect(0,y,64,1);ctx.fillStyle='#b7b6a8';ctx.fillRect(0,y+2,64,2);}
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.25,.42,1,10),new THREE.MeshStandardMaterial({map:texture,roughness:1}),palms.length);
    const shafts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.24,.28,1,10),material(0x6a8053),palms.length);
    const crowns=new THREE.InstancedMesh(crownGeometry(),new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:1}),palms.length);
    trunks.name='royal-palm-trunks';crowns.name='feathered-palm-crowns';
    const dummy=new THREE.Object3D();
    for(const [i,p] of palms.entries()) {
      dummy.rotation.set(0,p.rotation,0);dummy.position.set(p.x-offset,p.height/2,p.z);dummy.scale.set(1,p.height,1);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+.65;dummy.scale.set(1,1.3,1);dummy.updateMatrix();shafts.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+1.1;dummy.scale.set(1,1,1);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);
      collider(p.x-offset-.44,p.x-offset+.44,p.z-.44,p.z+.44,0,p.height);
    }
    for(const mesh of [trunks,shafts,crowns]){mesh.castShadow=true;mesh.receiveShadow=true;mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;group.add(mesh);}
    // Low open fence on the left and darker boundary on the right, as in the photos.
    box(.14,1.45,77,-.9,.725,132.5,0x494f45);
    collider(-1.05,-.75,94,171,0,1.45);
    const fencePoints=[];
    for(let z=94;z<=171;z+=3.5){box(.065,1.1,.065,-19.1,.55,z,0x657566);fencePoints.push(new THREE.Vector3(-19.1,0,z),new THREE.Vector3(-19.1,1.1,z));}
    for(let y=.15;y<1.1;y+=.2)fencePoints.push(new THREE.Vector3(-19.1,y,94),new THREE.Vector3(-19.1,y,171));
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(fencePoints),new THREE.LineBasicMaterial({color:0x819589})));
    collider(-19.2,-19,94,171,0,1.1);
    // Generic landscape only: no undocumented houses, shops or street names.
    // These layers begin outside the existing fences and never enter the
    // eighteen-unit avenue footprint or register a new walking collider.
    const backdrop=new THREE.Group();backdrop.name='avenue-outer-landscape';group.add(backdrop);
    // One non-repeating mask softens each patch into the original lawn.
    // Keep this UV space independent of the repeating grass grain below.
    const fadeCanvas=document.createElement('canvas');fadeCanvas.width=fadeCanvas.height=128;
    const fadeContext=fadeCanvas.getContext('2d'),fadeX=fadeContext.createLinearGradient(0,0,128,0);
    fadeX.addColorStop(0,'#000');fadeX.addColorStop(.16,'#fff');fadeX.addColorStop(.84,'#fff');fadeX.addColorStop(1,'#000');
    fadeContext.fillStyle=fadeX;fadeContext.fillRect(0,0,128,128);
    const fadeY=fadeContext.createLinearGradient(0,0,0,128);
    fadeY.addColorStop(0,'#000');fadeY.addColorStop(.12,'#fff');fadeY.addColorStop(.88,'#fff');fadeY.addColorStop(1,'#000');
    fadeContext.globalCompositeOperation='multiply';fadeContext.fillStyle=fadeY;fadeContext.fillRect(0,0,128,128);
    const terrainAlpha=new THREE.CanvasTexture(fadeCanvas);
    for(const [x,w] of [[-48,57],[29,59]]){
      // r128 shares uvTransform across color and alpha maps. Bake the fine
      // grass repeats into the image so both maps retain the same 0–1 UVs.
      const terrainCanvas=document.createElement('canvas');terrainCanvas.width=512;terrainCanvas.height=1024;
      const terrainContext=terrainCanvas.getContext('2d'),tileWidth=512*4/w,tileHeight=1024*4/152;
      for(let y=0;y<1024;y+=tileHeight)for(let x=0;x<512;x+=tileWidth)terrainContext.drawImage(grassTexture.image,x,y,tileWidth,tileHeight);
      const terrainMaterial=verge.clone();terrainMaterial.map=new THREE.CanvasTexture(terrainCanvas);terrainMaterial.map.encoding=THREE.sRGBEncoding;terrainMaterial.map.anisotropy=4;
      terrainMaterial.color.setHex(0xc9d4c9);terrainMaterial.alphaMap=terrainAlpha;terrainMaterial.transparent=true;terrainMaterial.opacity=.82;
      terrainMaterial.depthWrite=false;terrainMaterial.polygonOffset=true;terrainMaterial.polygonOffsetFactor=-1;terrainMaterial.polygonOffsetUnits=-2;
      const terrain=new THREE.Mesh(new THREE.PlaneGeometry(w,152),terrainMaterial);terrain.rotation.x=-Math.PI/2;terrain.position.set(x,.018,170);
      terrain.receiveShadow=true;backdrop.add(terrain);
    }
    const foliage=[material(0x71836c),material(0x7d8d78),material(0x8e9b86)];
    const crownShape=new THREE.IcosahedronGeometry(1,1),trunkShape=new THREE.CylinderGeometry(.16,.24,3.6,6);
    for(const side of [-1,1])for(let i=0;i<15;i++){
      const row=i%3,x=-10+side*(17+row*10+Math.sin(i*2.3)*3),z=108+Math.floor(i/3)*25+row*6;
      // Replace generic placeholder trees where the photographed trail now exists.
      if(trailContains(x+offset,z)||Math.hypot(x+offset-trail.sign.x,z-trail.sign.z)<12)continue;
      const tree=new THREE.Group();tree.name='avenue-distant-tree';tree.position.set(x,0,z);
      const trunk=new THREE.Mesh(trunkShape,material(0x858775));trunk.position.y=1.8;tree.add(trunk);
      const crown=new THREE.Mesh(crownShape,foliage[row]);crown.position.y=4.8+row*.4;crown.scale.set(3.1+row*.45,3.3+row*.5,3.0);tree.add(crown);backdrop.add(tree);
    }
    // Muted low silhouettes dissolve into the scene's existing distance fog.
    const hillShape=new THREE.SphereGeometry(1,12,8),hillMaterial=material(0x9ba99a);
    for(let i=0;i<6;i++){
      const hill=new THREE.Mesh(hillShape,hillMaterial);hill.name='avenue-distant-ridge';hill.position.set(-130+i*48,-6,265+(i%2)*22);hill.scale.set(36,17+(i%3)*5,24);backdrop.add(hill);
    }
    renderTrail(scene,registerCollider,asphalt);
    window.campusEntranceAvenue={plan,palms,trail,group};return group;
  }
  return {plan,palms,trail,trailContains,contains,crownGeometry,render};
})();
