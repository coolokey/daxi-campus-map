/* Aerial-corrected tree ground, roadside tree row and adjacent parking. */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,rooms,nodes}=api;
  const plan={
    gate:{x:-10,z:86,inwardZ:-1},
    parking:{x0:-36,x1:-25,z0:55,z1:75},
    approach:{x0:-12,x1:-8,z0:50,z1:86},
    // The main planted ground replaces the previously misplaced painted bays.
    planting:{x0:-23,x1:-13,z0:55,z1:75},
    southTreeRow:{x0:-4,x1:40,z0:68,z1:72},
    driveway:{x0:-65,x1:93,z0:81.5,z1:90.5}
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
  box('forecourt-parking-paving',11,.02,20,-30.5,.055,65,0x858b89);
  // Six schematic bays sit outside the restored tree ground, facing their aisle.
  // Gate access at x=-10 and the original south driveway remain open.
  const stalls=Array.from({length:6},(_,i)=>({id:i+1,x:-32.5,z:56.75+i*3,width:5,depth:2.7}));
  for(const stall of stalls){
    const {id,x,z,width,depth}=stall;
    box(`forecourt-stall-${id}-back`,.1,.015,depth,x-width/2,.077,z,0xf0edde);
    for(const side of [-1,1])box(`forecourt-stall-${id}-side-${side}`,width,.015,.1,x,.077,z+side*depth/2,0xf0edde);
  }
  box('forecourt-tree-bed-soil',10,.025,20,-18,.055,65,0x8b7257);
  box('forecourt-tree-bed-grass',9.35,.018,19.35,-18,.079,65,0x8a9c66);
  box('south-wing-tree-strip-soil',44,.025,4,18,.055,70,0x8b7257);
  box('south-wing-tree-strip-grass',43.4,.018,3.4,18,.079,70,0x8a9c66);
  const trees=[];
  function plant(x,z,zone){
    const id=trees.length+1;
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.26,3.4,9),material(0x77604a));
    trunk.name=`forecourt-tree-${id}-trunk`;trunk.position.set(x,1.7,z);trunk.castShadow=true;trunk.receiveShadow=true;
    trunk.userData.campusSolid=true;group.add(trunk);
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1.65,1),material(id%2?0x547850:0x64875b));
    crown.name=`forecourt-tree-${id}-canopy`;crown.position.set(x,4,z);crown.scale.set(1,.9,1);crown.castShadow=true;group.add(crown);
    trees.push({id,x,z,zone,trunk,crown});
  }
  for(const z of [57.5,64,71.5])for(const x of [-20.5,-16])plant(x,z,'main');
  for(let x=0;x<=36;x+=6)plant(x,70,'south-row');
  // Reference the original road without replacing its geometry or markings.
  const drivewayMesh=scene.children.find(m=>m.isMesh&&m.geometry.parameters.width===158&&m.geometry.parameters.height===9&&m.position.z===86);
  rooms['forecourt-parking']={id:'forecourt-parking',code:'PARK-F',name:'前庭停車區',buildingId:'gate',buildingName:'校門前庭',floor:1,cat:'admin',node:'forecourt-parking'};
  nodes['forecourt-parking']={id:'forecourt-parking',x:-27.5,y:0,z:65,neighbors:['gate','plaza-center']};
  for(const id of ['gate','plaza-center'])if(nodes[id]&&!nodes[id].neighbors.includes('forecourt-parking'))nodes[id].neighbors.push('forecourt-parking');
  window.campusForecourt={plan,stalls,trees,group,drivewayMesh};
})();
