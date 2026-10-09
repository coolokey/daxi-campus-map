/* No browser automation: execute the real scene and movement scripts in jsdom.
 * Only Canvas drawing/WebGL rendering are stubbed; geometry, graph and collision are real.
 */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom'),root=path.resolve(__dirname,'../public/campus-explorer');
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'http://localhost/campus-explorer/index.html',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,context=dom.getInternalVMContext(),errors=[];
w.requestAnimationFrame=()=>1;w.alert=message=>errors.push(message);w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:t=>({width:String(t).length*15}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),getImageData:()=>({data:new Uint8ClampedArray(4)}),setLineDash(){}},{get:(o,k)=>k in o?o[k]:()=>{},set:(o,k,v)=>(o[k]=v,true)})};
function run(file){vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file,timeout:180000})}
run('vendor/three.min.js');w.THREE.WebGLRenderer=class{constructor({canvas}){this.domElement=canvas;this.shadowMap={};this.capabilities={getMaxAnisotropy:()=>1};this.info={render:{calls:0}}}setSize(){}setPixelRatio(){}render(){}};
run('vendor/OrbitControls.js');
for(const file of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','explorer.js','walk-world-math.js','spatial-world.js','art-direction.js','minimap-math.js','spatial-ui-tools.js','room-layout-model.js','minimap.js','room-layout.js'])run(file);
const report=vm.runInContext(`(()=>{
 const world=campusWalkWorld,rooms=Object.values(ROOMS_DB),unreachable=rooms.filter(r=>!findShortestPath('gate',r.node)).map(r=>r.id),blockedEdges=[],stairs=[],doorFailures=[];
 for(const [id,a] of Object.entries(world.graph))for(const nid of a.neighbors){if(id>nid)continue;const b=world.graph[nid],distance=Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z),steps=Math.max(1,Math.ceil(distance/.15));
  for(let i=0;i<=steps;i++){const t=i/steps,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t,z=a.z+(b.z-a.z)*t;
   if(checkWallCollision(x,y,z)){blockedEdges.push({from:id,to:nid,at:{x,y,z}});break;}
  }
 }
 for(const l of world.layouts)for(const r of l.ramps){const p={...r.start};let error=null;
  for(let i=1;i<=80;i++){const target=CampusWalkMath.rampPoint(r,i/80);if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)||Math.abs(p.y-target.y)>.12){error={up:i,p:{...p},target};break}}
  if(!error)for(let i=79;i>=0;i--){const target=CampusWalkMath.rampPoint(r,i/80);if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)||Math.abs(p.y-target.y)>.12){error={down:i,p:{...p},target};break}}
  stairs.push({building:l.id,stair:r.stairId,floor:r.floor,error});
 }
 for(const l of world.layouts)for(const r of l.rooms){const points=[r.corridor,r.door,r.center],p={...points[0]};for(const target of points.slice(1))if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)){doorFailures.push({id:r.id,p:{...p},target});break}}
 const motorRoutes=[];
 for(const id of ['academic','901','804','704','computer-lab-1','art-4f']){
  const room=ROOMS_DB[id],ids=room&&findShortestPath('gate',room.node),p={...world.graph.gate};let error=null;
  if(!ids)error='missing route';else for(const nid of ids.slice(1)){
   const target=world.graph[nid],origin={...p},steps=Math.max(1,Math.ceil(Math.hypot(target.x-p.x,target.y-p.y,target.z-p.z)/.15));
   for(let i=1;i<=steps;i++){const t=i/steps,q={x:origin.x+(target.x-origin.x)*t,y:origin.y+(target.y-origin.y)*t,z:origin.z+(target.z-origin.z)*t};
    if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y)||Math.abs(p.y-q.y)>.14){error={node:nid,p:{...p},target:q};break}
   }if(error)break;
  }motorRoutes.push({id,error,end:{x:p.x,y:p.y,z:p.z}});
 }
 return {rooms:rooms.length,physicalRooms:world.layouts.reduce((n,l)=>n+l.rooms.length,0),nodes:Object.keys(world.graph).length,unreachable,blockedEdges,stairs,doorFailures,motorRoutes};
})()`,context,{timeout:180000});
fs.writeFileSync(path.resolve(__dirname,'../qa/spatial-world-verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({rooms:report.rooms,physicalRooms:report.physicalRooms,nodes:report.nodes,unreachable:report.unreachable,blockedEdges:report.blockedEdges.slice(0,30),badStairs:report.stairs.filter(s=>s.error),doorFailures:report.doorFailures,motorRoutes:report.motorRoutes,errors},null,2));
dom.window.close();
assert.equal(report.unreachable.length,0);assert.equal(report.blockedEdges.length,0);assert.equal(report.stairs.filter(s=>s.error).length,0);assert.equal(report.doorFailures.length,0);assert.deepEqual(errors,[]);
assert.equal(report.motorRoutes.filter(r=>r.error).length,0);
