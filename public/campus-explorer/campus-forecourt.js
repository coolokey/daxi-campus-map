/* Approved gate-facing parking and retained planting; load before landscape indexing. */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,rooms,nodes}=api;
  const plan={
    gate:{x:-10,z:86,inwardZ:-1},
    parking:{x0:-23,x1:-8,z0:55,z1:75},
    approach:{x0:-12,x1:-8,z0:50,z1:86},
    // The existing grade-eight south wing occupies z=55..65. Keep the bed
    // south of that footprint while retaining space before the guard at z=86.
    planting:{x0:2,x1:16,z0:68,z1:78}
  };
  const group=new THREE.Group();group.name='campus-forecourt';scene.add(group);
  const materials=new Map();
  const material=color=>{
    if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.94}));
    return materials.get(color);
  };
  function box(name,w,h,d,x,y,z,color){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));
    mesh.name=name;mesh.position.set(x,y,z);mesh.receiveShadow=true;group.add(mesh);return mesh;
  }
  box('forecourt-parking-paving',15,.02,20,-15.5,.055,65,0x858b89);
  // One row of six simple bays. Their open ends face the aisle at x=-10;
  // paint is visual and the full gate-to-administration approach stays open.
  const stalls=Array.from({length:6},(_,i)=>({id:i+1,x:-19.5,z:56.75+i*3,width:5,depth:2.7}));
  for(const stall of stalls){
    const {id,x,z,width,depth}=stall;
    box(`forecourt-stall-${id}-back`,.1,.015,depth,x-width/2,.077,z,0xf0edde);
    for(const side of [-1,1])box(`forecourt-stall-${id}-side-${side}`,width,.015,.1,x,.077,z+side*depth/2,0xf0edde);
  }
  box('forecourt-tree-bed-soil',14,.025,10,9,.055,73,0x8b7257);
  box('forecourt-tree-bed-grass',13.35,.018,9.35,9,.079,73,0x8a9c66);
  const trees=[];
  for(const z of [70.6,75.4])for(const x of [4.2,9,13.8]){
    const id=trees.length+1;
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.26,3.4,9),material(0x77604a));
    trunk.name=`forecourt-tree-${id}-trunk`;trunk.position.set(x,1.7,z);trunk.castShadow=true;trunk.receiveShadow=true;
    // Only real trunks participate in landscape-world's collider registration.
    trunk.userData.campusSolid=true;group.add(trunk);
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1.65,1),material(id%2?0x547850:0x64875b));
    crown.name=`forecourt-tree-${id}-canopy`;crown.position.set(x,4,z);crown.scale.set(1,.9,1);crown.castShadow=true;group.add(crown);
    trees.push({id,x,z,trunk,crown});
  }
  rooms['forecourt-parking']={id:'forecourt-parking',code:'PARK-F',name:'前庭停車區',buildingId:'gate',buildingName:'校門前庭',floor:1,cat:'admin',node:'forecourt-parking'};
  nodes['forecourt-parking']={id:'forecourt-parking',x:-10,y:0,z:65,neighbors:['gate','plaza-center']};
  for(const id of ['gate','plaza-center'])if(nodes[id]&&!nodes[id].neighbors.includes('forecourt-parking'))nodes[id].neighbors.push('forecourt-parking');
  window.campusForecourt={plan,stalls,trees,group};
})();
