/* Execute the actual scene, surfaces and collision motor without a GPU. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {JSDOM}=require('jsdom'),root=path.resolve(__dirname,'../public/campus-explorer');
const out=path.resolve(process.env.NAV_AUDIT_OUT||'qa/touch-navigation-20261020/navigation-audit.json');fs.mkdirSync(path.dirname(out),{recursive:true});
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'http://localhost/campus-explorer/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext();
w.requestAnimationFrame=()=>1;w.alert=()=>{};w.matchMedia=()=>({matches:false});w.document.getElementById('guide-landing').removeAttribute('open');
w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:t=>({width:String(t).length*15}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),getImageData:()=>({data:new Uint8ClampedArray(4)})},{get:(o,k)=>k in o?o[k]:()=>{}})};
function file(name){const source=process.env.NAV_AUDIT_BASELINE&&['explorer.js','spatial-plan.js','spatial-world.js'].includes(name)?execFileSync('git',['show',process.env.NAV_AUDIT_BASELINE+':public/campus-explorer/'+name],{encoding:'utf8'}):fs.readFileSync(path.join(root,name),'utf8');vm.runInContext(source,context,{filename:name,timeout:180000})}
file('vendor/three.min.js');w.THREE.WebGLRenderer=class{constructor({canvas}){this.domElement=canvas;this.shadowMap={};this.capabilities={getMaxAnisotropy:()=>1}}setSize(){}setPixelRatio(){}render(){}};file('vendor/OrbitControls.js');
try{
for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','navigation-arrows.js','explorer.js','walk-world-math.js','room-layout-model.js','gym-world.js','photo-facade.js','campus-forecourt.js','landscape-world.js','spatial-world.js'])file(f);
 w.auditFilter=process.env.NAV_AUDIT_FILTER||'';
const report=vm.runInContext(`(()=>{
 const world=campusWalkWorld,origins=[],targets=['academic','library','901','704','art-4f','gym','grandstand','palm-avenue'].filter(id=>ROOMS_DB[id]),rows=[],failures=[];
 isJumping=false;resetManualInput();
 for(const l of world.layouts){
  for(const r of l.rooms)origins.push({label:'room/'+r.id,p:r.center});
  for(const r of l.ramps)for(const t of [.23,.5,.77])origins.push({label:'stair/'+l.id+'/'+r.stairId+'/'+r.floor+'/'+r.h0+'/'+t,p:CampusWalkMath.rampPoint(r,t)});
  for(const p of l.platforms.filter(p=>p.stairId)){const q={x:(p.x0+p.x1)/2,y:p.y,z:(p.z0+p.z1)/2};if(!checkWallCollision(q.x,q.y,q.z))origins.push({label:'landing/'+l.id+'/'+p.stairId+'/'+p.y,p:q});}
  for(const c of l.corridors)for(const t of [.2,.5,.8]){const p=l.world(c.u0+(c.u1-c.u0)*t,(c.v0+c.v1)/2,(c.floor-1)*FH);if(!checkWallCollision(p.x,p.y,p.z)&&Math.abs(world.ground(p)-p.y)<.1)origins.push({label:'corridor/'+l.id+'/'+c.floor+'/'+t,p});}
 }
 for(let x=-110;x<=110;x+=22)for(let z=-90;z<=108;z+=22){const p={x,y:0,z};if((CampusOutdoorPlan.perimeter.contains(x,z)||CampusEntranceAvenue.contains(x,z))&&!checkWallCollision(x,0,z)&&!CampusOutdoorPlan.reserved(p)&&!world.layouts.some(l=>world.insideFloor(l,x,z,1))&&Math.abs(world.ground(p))<.1)origins.push({label:'outdoor/'+x+'/'+z,p});}
 function verify(origin,id){if(window.auditFilter&&!origin.label.includes(window.auditFilter))return;const p={...origin.p},t=performance.now(),points=world.route(p,ROOMS_DB[id]),ms=performance.now()-t;let error=null,length=0;
  if(!points||points.length<2)error='no route';
  else if(Math.hypot(points[0].x-p.x,points[0].y-p.y,points[0].z-p.z)>.01)error='start changed';
  else for(const q of points.slice(1)){length+=Math.hypot(q.x-p.x,q.y-p.y,q.z-p.z);if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||Math.abs(p.y-q.y)>.14||Math.hypot(p.x-q.x,p.z-q.z)>.03){error={kind:'motor blocked',at:{...p},target:{x:q.x,y:q.y,z:q.z}};break}}
  const row={origin:origin.label,start:origin.p,target:id,points:points?.length||0,ms,length,error};rows.push(row);if(error)failures.push(row);
 }
 origins.forEach((o,i)=>verify(o,targets[i%targets.length]));
 for(const room of Object.values(ROOMS_DB).filter(r=>!r.aliasFor))verify({label:'gate',p:world.graph.gate},room.id);
 const timing=rows.map(r=>r.ms).sort((a,b)=>a-b);
 return{cases:rows.length,origins:origins.length,targets:targets.length,medianMs:timing[Math.floor(timing.length*.5)],p95Ms:timing[Math.floor(timing.length*.95)],maxMs:timing.at(-1),failures,rows};
})()`,context,{timeout:180000});
fs.writeFileSync(out,JSON.stringify(report,null,2));console.log(JSON.stringify({...report,rows:undefined,failures:report.failures.slice(0,25)},null,2));assert.equal(report.failures.length,0);
}finally{dom.window.close()}
