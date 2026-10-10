/* Merge only declared static decorations, inside their existing visibility groups. */
const CampusStaticBatch = (() => {
 function batch(group) {
  for(const child of [...group.children])if(child.isGroup)batch(child);
  const batches=new Map();
  for(const mesh of group.children){
   if(!mesh.isMesh||mesh.isInstancedMesh||mesh.isSkinnedMesh||!mesh.visible||mesh.name||Object.keys(mesh.userData).length||Array.isArray(mesh.material)||mesh.material.map||mesh.material.transparent||mesh.geometry.morphAttributes.position||mesh.geometry.drawRange.count!==Infinity)continue;
   const geometry=mesh.geometry;
   if(!geometry.attributes.position||!geometry.attributes.normal||Object.keys(geometry.attributes).some(key=>!['position','normal','uv'].includes(key)))continue;
   const key=[mesh.material.uuid,mesh.castShadow,mesh.receiveShadow,mesh.renderOrder,mesh.layers.mask,!!geometry.attributes.uv].join('/');
   if(!batches.has(key))batches.set(key,[]);batches.get(key).push(mesh);
  }
  for(const meshes of batches.values()){
   if(meshes.length<2)continue;
   const data={position:[],normal:[],uv:[]},first=meshes[0];
   for(const mesh of meshes){
    mesh.updateMatrix();const geometry=(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone()).applyMatrix4(mesh.matrix);
    for(const name of ['position','normal','uv'])if(geometry.attributes[name])for(const n of geometry.attributes[name].array)data[name].push(n);
    geometry.dispose();group.remove(mesh);
    // Original geometries may be shared by retained objects; let unreferenced CPU data be collected.
   }
   const geometry=new THREE.BufferGeometry();
   for(const name of ['position','normal','uv'])if(data[name].length)geometry.setAttribute(name,new THREE.Float32BufferAttribute(data[name],name==='uv'?2:3));
   geometry.computeBoundingSphere();
   const merged=new THREE.Mesh(geometry,first.material);merged.name='batched-static-decoration';
   merged.castShadow=first.castShadow;merged.receiveShadow=first.receiveShadow;merged.renderOrder=first.renderOrder;merged.layers.mask=first.layers.mask;
   group.add(merged);
  }
 }
 return {batch};
})();
(() => {
 const scene=window.campusExplorer?.scene;if(!scene)return;
 const names=['campus-landscape-refinement','photo-outdoor','basketball-court-complex','entrance-palm-avenue'];
 for(const group of scene.children)if(names.includes(group.name)||group.name.startsWith('photo-admin-'))CampusStaticBatch.batch(group);
})();
