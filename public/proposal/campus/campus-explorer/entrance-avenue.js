/* Photo-derived exterior approach. Dimensions are illustrative, not a survey. */
const CampusEntranceAvenue = (() => {
  const plan = {x:CampusOutdoorPlan.entrance.gate.x,z0:89,z1:171,width:9,gateZ:86};
  const palms = Array.from({length:20},(_,i)=>({x:plan.x+(i%2?6.5:-6.5),z:96+Math.floor(i/2)*7.7,height:13.6+(i*7%9)*.35,rotation:i*2.399}));
  const contains = (x,z) => x>=plan.x-9&&x<=plan.x+9&&z>=89&&z<=174;
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
      const tree=new THREE.Group();tree.name='avenue-distant-tree';tree.position.set(x,0,z);
      const trunk=new THREE.Mesh(trunkShape,material(0x858775));trunk.position.y=1.8;tree.add(trunk);
      const crown=new THREE.Mesh(crownShape,foliage[row]);crown.position.y=4.8+row*.4;crown.scale.set(3.1+row*.45,3.3+row*.5,3.0);tree.add(crown);backdrop.add(tree);
    }
    // Muted low silhouettes dissolve into the scene's existing distance fog.
    const hillShape=new THREE.SphereGeometry(1,12,8),hillMaterial=material(0x9ba99a);
    for(let i=0;i<6;i++){
      const hill=new THREE.Mesh(hillShape,hillMaterial);hill.name='avenue-distant-ridge';hill.position.set(-130+i*48,-6,265+(i%2)*22);hill.scale.set(36,17+(i%3)*5,24);backdrop.add(hill);
    }
    window.campusEntranceAvenue={plan,palms,group};return group;
  }
  return {plan,palms,contains,crownGeometry,render};
})();
