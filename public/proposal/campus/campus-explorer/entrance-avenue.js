/* Photo-derived exterior approach. Dimensions are illustrative, not a survey. */
const CampusEntranceAvenue = (() => {
  const plan = {x:-10,z0:89,z1:171,width:9,gateZ:86};
  const palms = Array.from({length:20},(_,i)=>({x:plan.x+(i%2?6.5:-6.5),z:96+Math.floor(i/2)*7.7,height:13.6+(i*7%9)*.35,rotation:i*2.399}));
  const contains = (x,z) => x>=-19&&x<=-1&&z>=89&&z<=174;
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
  function render(scene,collider) {
    const group=new THREE.Group();group.name='entrance-palm-avenue';scene.add(group);
    const material=color=>new THREE.MeshStandardMaterial({color,roughness:.95});
    function box(w,h,d,x,y,z,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));m.position.set(x,y,z);m.receiveShadow=true;group.add(m);return m;}
    const length=plan.z1-plan.z0,mid=(plan.z1+plan.z0)/2;
    box(18,.04,length,-10,.012,mid,0x73796a);
    box(9,.045,length,-10,.04,mid,0x666864);
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
      dummy.rotation.set(0,p.rotation,0);dummy.position.set(p.x,p.height/2,p.z);dummy.scale.set(1,p.height,1);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+.65;dummy.scale.set(1,1.3,1);dummy.updateMatrix();shafts.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+1.1;dummy.scale.set(1,1,1);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);
      collider(p.x-.44,p.x+.44,p.z-.44,p.z+.44,0,p.height);
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
    window.campusEntranceAvenue={plan,palms,group};return group;
  }
  return {plan,palms,contains,crownGeometry,render};
})();
