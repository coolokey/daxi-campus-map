const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/';
const out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/admin-second-floor-20261018/local');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',entries:[],errors:[]};
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 try{for(const route of ['', 'proposal/campus/']){
  const label=route?'proposal':'main',page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(label+': '+m.text()+' '+JSON.stringify(m.location()));});page.on('response',r=>{if(r.status()>=400)report.errors.push(r.status()+' '+r.url());});
  await page.goto(base+route+'?view=overview&v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusWalkWorld,null,{timeout:60000});
  const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));assert(frame);
  await page.waitForTimeout(1800); // Let the initial overview camera transition finish.
  const result=await frame.evaluate(()=>{
   stopAutoWalk();cancelCameraTween();document.getElementById('guide-landing')?.remove();document.getElementById('welcome-card')?.classList.add('hidden');
   const a=window.campusExplorer,l=window.campusWalkWorld.layouts.find(l=>l.id==='admin-front'),s=l.stairs.find(s=>s.toFloor===2),start=l.world(s.innerU,s.centerV-s.sign*1.25,3.6),oil=l.rooms.find(r=>r.id==='reception'),principal=l.rooms.find(r=>r.id==='principal'),personnel=l.rooms.find(r=>r.id==='personnel-accounting'),wcs=l.cells.filter(c=>c.floor===2&&c.kind==='wc');
   const failures=[];for(const r of l.cells.filter(c=>c.floor===2&&['room','wc'].includes(c.kind))){const path=campusWalkWorld.gridPath(start,r.corridor,3.6,l);if(!path){failures.push(r.id+' no approach');continue;}const p={...start};for(const q of [...path.slice(1),r.door,r.center])if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)){failures.push(r.id+' blocked');break;}}
   const eye=new THREE.Vector3(start.x,start.y+1.55,start.z),target=new THREE.Vector3(oil.door.x,oil.door.y+1.55,oil.door.z),ray=new THREE.Raycaster(eye,target.clone().sub(eye).normalize(),.05,eye.distanceTo(target)-.15);
   a.setControlMode('bird');a.setFloorFilter('2');a.scene.updateMatrixWorld(true);
   const opaque=ray.intersectObjects(a.scene.children,true).filter(h=>h.object.visible&&h.object.isMesh&&!Array.isArray(h.object.material)&&!h.object.material.transparent&&h.object.material.opacity>.85);
   const unreachable=Object.values(a.rooms).filter(r=>!a.findShortestPath('gate',r.node)).map(r=>r.id);
   const pos=l.world(0,-5,3.6);a.camera.position.set(pos.x-24,44,pos.z+30);a.controls.target.set(pos.x,3.6,pos.z);a.controls.update();
   return {failures,unreachable,wcs:wcs.map(c=>({id:c.id,u0:c.u0,u1:c.u1,v0:c.v0,v1:c.v1})),oil:{name:oil.name,u0:oil.u0,u1:oil.u1,v0:oil.v0,v1:oil.v1,doorSide:oil.doorSide},principal:{u0:principal.u0,u1:principal.u1,v0:principal.v0,v1:principal.v1},personnel:{name:personnel.name,u0:personnel.u0,u1:personnel.u1,v0:personnel.v0,v1:personnel.v1},oilSightlineOpaqueHits:opaque.map(h=>({name:h.object.name,distance:h.distance})),start};
  });
  assert.deepEqual(result.failures,[]);assert.deepEqual(result.unreachable,[]);assert.deepEqual(result.oilSightlineOpaqueHits,[]);assert.equal(result.wcs.length,1);assert.equal(result.oil.u0,result.principal.u0);assert(result.oil.v1<=result.principal.v0);assert.equal(result.wcs[0].v0,result.personnel.v1);
  await page.waitForTimeout(800);await page.screenshot({path:path.join(out,label+'-desktop-2f.png')});
  const clean=await frame.addStyleTag({content:'body > :not(canvas){visibility:hidden!important}'});
  await page.screenshot({path:path.join(out,label+'-building-2f.png')});
  await frame.evaluate(()=>{const a=window.campusExplorer,l=window.campusWalkWorld.layouts.find(l=>l.id==='admin-front'),s=l.stairs.find(s=>s.toFloor===2),p=l.world(s.innerU,s.centerV-s.sign*1.25,3.6),oil=l.rooms.find(r=>r.id==='reception');a.camera.position.set(p.x,p.y+1.55,p.z);a.controls.target.set(oil.door.x,oil.door.y+1.55,oil.door.z);a.controls.update();});
  await page.waitForTimeout(400);await page.screenshot({path:path.join(out,label+'-stair-arrival.png')});await clean.evaluate(n=>n.remove());
  for(const floor of ['1','3','2']){await frame.evaluate(f=>window.campusExplorer.setFloorFilter(f),floor);assert.equal(await frame.evaluate(()=>String(window.campusExplorer.getFloorFilter())),floor);}
  await page.setViewportSize({width:390,height:844});
  await frame.evaluate(()=>{const a=window.campusExplorer,l=window.campusWalkWorld.layouts.find(l=>l.id==='admin-front'),p=l.world(0,-5,3.6);a.camera.position.set(p.x-30,52,p.z+38);a.controls.target.set(p.x,3.6,p.z);a.controls.update();});
  await page.waitForTimeout(600);await page.screenshot({path:path.join(out,label+'-mobile-2f.png')});
  const overflow=await frame.evaluate(()=>({width:innerWidth,bodyWidth:document.body.getBoundingClientRect().width,canvasWidth:document.querySelector('canvas').getBoundingClientRect().width,overflowX:getComputedStyle(document.body).overflowX}));assert.equal(overflow.bodyWidth,overflow.width);assert.equal(overflow.canvasWidth,overflow.width);assert(['hidden','clip'].includes(overflow.overflowX));
  report.entries.push({label,url:page.url(),...result,overflow,floorSwitches:[1,3,2]});await page.close();
 }}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));}
 console.log(JSON.stringify(report,null,2));assert.deepEqual(report.errors,[]);
})().catch(e=>{console.error(e);process.exitCode=1;});
