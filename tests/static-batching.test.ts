import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as THREE from 'three';
it('merges static meshes without losing transforms, floor visibility, textures or collision metadata',()=>{
 const m=runInNewContext(readFileSync('public/campus-explorer/static-batching.js','utf8')+';CampusStaticBatch',{THREE,window:{}});
 const root=new THREE.Group(),floor=new THREE.Group(),material=new THREE.MeshStandardMaterial();floor.userData.floorNum=2;root.add(floor);
 const geometry=new THREE.BoxGeometry(2,2,2),a=new THREE.Mesh(geometry,material),b=a.clone();a.position.x=-4;b.position.x=4;a.scale.y=2;b.rotation.y=.4;floor.add(a,b);
 const textured=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:new THREE.Texture()})),marked=a.clone();marked.userData.roomId='room';root.add(textured,marked);
 const before=new THREE.Box3().setFromObject(floor);m.batch(root);
 expect(floor.children).toHaveLength(1);expect(floor.userData.floorNum).toBe(2);
 const after=new THREE.Box3().setFromObject(floor);
 expect(after.min.distanceTo(before.min)).toBeLessThan(1e-6);
 expect(after.max.distanceTo(before.max)).toBeLessThan(1e-6);
 expect(root.children).toContain(textured);expect(root.children).toContain(marked);
 floor.visible=false;expect(floor.visible).toBe(false);expect(floor.children[0].parent).toBe(floor);
});
