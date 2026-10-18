/* Aerial-corrected tree ground, roadside tree row and adjacent parking. */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,rooms,nodes}=api;
  const entrance=CampusOutdoorPlan.entrance;
  const corners=[-6,6].flatMap(c=>[16,38].map(d=>entrance.world(c,d)));
  const plan={
    gate:entrance.gate,
    parking:{x0:Math.min(...corners.map(p=>p.x)),x1:Math.max(...corners.map(p=>p.x)),z0:Math.min(...corners.map(p=>p.z)),z1:Math.max(...corners.map(p=>p.z))},
    approach:{cross0:-1.8,cross1:1.8,near:0,far:38},
    // Keep planting beside the gate-to-statue axis, clear of the south building.
    planting:{x0:-11,x1:-7,z0:66,z1:78},
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
  const parking=new THREE.Group();parking.name='forecourt-parking-aligned';
  const center=entrance.world(0,27);parking.position.set(center.x,0,center.z);parking.rotation.y=entrance.yaw;group.add(parking);
  const paving=box('forecourt-parking-paving',12,.02,22,0,.055,0,0x858b89);parking.add(paving);
  const stalls=[-3.9,3.9].flatMap(cross=>[19.5,25.5,31.5].map(inward=>({cross,inward,...entrance.world(cross,inward),width:4.2,depth:2.7}))).map((s,i)=>({...s,id:i+1}));
  for(const stall of stalls){
    const {id,cross,inward,width,depth}=stall;
    const back=box(`forecourt-stall-${id}-back`,.1,.015,depth,cross+Math.sign(cross)*width/2,.077,27-inward,0xf0edde);parking.add(back);
    for(const side of [-1,1]){const line=box(`forecourt-stall-${id}-side-${side}`,width,.015,.1,cross,.077,27-inward+side*depth/2,0xf0edde);parking.add(line);}
  }
  box('forecourt-tree-bed-soil',4,.025,12,-9,.055,72,0x8b7257);
  box('forecourt-tree-bed-grass',3.35,.018,11.35,-9,.079,72,0x8a9c66);
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
  for(const z of [67.5,72,76.5])for(const x of [-10,-8])plant(x,z,'main');
  for(let x=0;x<=36;x+=6)plant(x,70,'south-row');
  // Reference the original road without replacing its geometry or markings.
  const drivewayMesh=scene.children.find(m=>m.isMesh&&m.geometry.parameters.width===158&&m.geometry.parameters.height===9&&m.position.z===86);
  rooms['forecourt-parking']={id:'forecourt-parking',code:'PARK-F',name:'前庭停車區',buildingId:'gate',buildingName:'校門前庭',floor:1,cat:'admin',node:'forecourt-parking'};
  nodes['forecourt-parking']={id:'forecourt-parking',...entrance.world(0,27),neighbors:['gate','plaza-center']};
  for(const id of ['gate','plaza-center'])if(nodes[id]&&!nodes[id].neighbors.includes('forecourt-parking'))nodes[id].neighbors.push('forecourt-parking');
  window.campusForecourt={plan,stalls,trees,group,drivewayMesh};
})();
