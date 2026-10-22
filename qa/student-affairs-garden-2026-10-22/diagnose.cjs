const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{createRequire}=require('node:module');
const script=path.resolve(__dirname,'../../scripts/verify-spatial-world.cjs');
const prefix=fs.readFileSync(script,'utf8').split('const report=vm.runInContext')[0];
const {context,dom}=new Function('require','__dirname',prefix+';return {context,dom};')(createRequire(script),path.dirname(script));
const report=vm.runInContext(`(()=>{
 scene.updateMatrixWorld(true);
 const beds=[];scene.traverse(o=>{if(o.isMesh&&/^(admin-(left|right)-flowerbed|forecourt-tree-bed-soil|south-wing-tree-strip-soil)/.test(o.name)){const b=new THREE.Box3().setFromObject(o);beds.push({name:o.name,min:b.min,max:b.max,solid:!!o.userData.campusSolid});}});
 const start={x:avatarGroup.position.x,y:avatarGroup.position.y,z:avatarGroup.position.z},room=ROOMS_DB['student-affairs'];
 const points=campusWalkWorld.route(start,room),crossings=[];let blocked=false,p={...start};
 if(points)for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j],n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.1));for(let i=1;i<=n;i++){const t=i/n,q={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t};for(const bed of beds)if(q.y<.3&&q.x>bed.min.x&&q.x<bed.max.x&&q.z>bed.min.z&&q.z<bed.max.z&&!crossings.some(c=>c.bed===bed.name))crossings.push({bed:bed.name,at:q,segment:j});blocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||blocked;}}
 return {start,room:{id:room.id,node:room.node},points,beds,crossings,blocked,end:p};
})()`,context,{timeout:180000});
console.log(JSON.stringify(report,null,2));fs.writeFileSync(path.join(__dirname,'diagnosis.json'),JSON.stringify(report,null,2));dom.window.close();
