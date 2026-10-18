const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/';
const out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/admin-vertical-alignment-20261018/local');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',entries:[],errors:[]};
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 try{for(const route of ['', 'proposal/campus/']){
  const label=route?'proposal':'main',page=await browser.newPage({viewport:{width:1000,height:760}}),entry={label,url:'',routes:[]};report.entries.push(entry);
  page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(label+': '+m.text()+' '+JSON.stringify(m.location()));});page.on('response',r=>{if(r.status()>=400)report.errors.push(r.status()+' '+r.url());});
  await page.goto(base+route+'?view=overview&v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});entry.url=page.url();
  await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusWalkWorld,null,{timeout:60000});
  const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));assert(frame);await page.waitForTimeout(1200);
  entry.geometry=await frame.evaluate(()=>{
   const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='admin-front');stopAutoWalk();cancelCameraTween();document.getElementById('guide-landing')?.remove();document.getElementById('welcome-card')?.classList.add('hidden');
   a.renderer.setPixelRatio(.65);
   const s=l.stairs[0],oil=l.rooms.find(r=>r.id==='reception'),zones=l.rooms.filter(r=>r.sharedEntrance),start=l.world(s.innerU,s.centerV-s.sign*1.25,3.6),shell=l.cells.find(c=>c.id==='admin-office-suite');
   const eye=new THREE.Vector3(start.x,start.y+1.55,start.z),target=new THREE.Vector3(oil.door.x,oil.door.y+1.55,oil.door.z);a.setControlMode('bird');cancelCameraTween();a.setFloorFilter('2');a.scene.updateMatrixWorld(true);
   const ray=new THREE.Raycaster(eye,target.clone().sub(eye).normalize(),.05,eye.distanceTo(target)-.15),opaque=ray.intersectObjects(a.scene.children,true).filter(h=>{let p=h.object;while(p){if(!p.visible)return false;p=p.parent;}return h.object.isMesh&&!Array.isArray(h.object.material)&&!h.object.material.transparent&&h.object.material.opacity>.85;});
   const rect=c=>[c.u0,c.u1,c.v0,c.v1],room=id=>l.rooms.find(r=>r.id===id),principal=room('principal'),west=room('admin-g89-staff'),east=room('admin-g89-staff-east'),wc=f=>l.cells.find(c=>c.floor===f&&c.kind==='wc'&&!c.accessible);const alignment={west:rect(west),upperWest:[oil.u0,oil.u1,oil.v0,principal.v1],connected:oil.v1===principal.v0&&oil.u0===principal.u0&&oil.u1===principal.u1,east:rect(east),upperEast:rect(room('academic')),lowerWC:rect(wc(1)),upperWC:rect(wc(2))};const signs=[];a.scene.traverse(o=>{if(o.userData.roomId===shell.id&&o.userData.nameplateStyle)signs.push(o.userData.nameplateStyle);});
   return {alignment,stairs:l.stairs.map(s=>({id:s.id,from:s.fromFloor,to:s.toFloor})),ramps:l.ramps.length,sharedEntrances:[...new Set(zones.map(r=>r.sharedEntrance.id))],zones:zones.map(r=>({id:r.id,name:a.rooms[r.id].name,u:r.u,v:r.v,entryHint:a.rooms[r.id].entryHint})),wcCount:l.cells.filter(c=>c.floor===2&&c.kind==='wc').length,unreachable:Object.values(a.rooms).filter(r=>!a.findShortestPath('gate',r.node)).map(r=>r.id),oilSightlineOpaqueHits:opaque.map(h=>({name:h.object.name,distance:h.distance})),signs};
  });
  assert.deepEqual(entry.geometry.alignment.upperWest,entry.geometry.alignment.west);assert.equal(entry.geometry.alignment.connected,true);assert.deepEqual(entry.geometry.alignment.upperEast,entry.geometry.alignment.east);assert.deepEqual(entry.geometry.alignment.upperWC,entry.geometry.alignment.lowerWC);assert.equal(entry.geometry.stairs.length,1);assert.equal(entry.geometry.stairs[0].from,1);assert.equal(entry.geometry.stairs[0].to,3);assert.equal(entry.geometry.ramps,4);assert.equal(entry.geometry.sharedEntrances.length,1);assert.equal(entry.geometry.zones.length,3);assert.equal(entry.geometry.wcCount,1);assert.deepEqual(entry.geometry.unreachable,[]);assert.deepEqual(entry.geometry.oilSightlineOpaqueHits,[]);assert(entry.geometry.signs.includes('wall'));assert.equal(entry.geometry.signs.filter(s=>s==='projecting').length,2);
  const clean=await frame.addStyleTag({content:'body *{visibility:hidden!important}canvas[data-qa-scene]{visibility:visible!important}'});
  const aim=async(which)=>{
   await frame.evaluate(which=>{const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='admin-front');a.renderer.domElement.dataset.qaScene='';a.setControlMode('bird');cancelCameraTween();a.setFloorFilter('2');
    if(which==='plan'){const p=l.world(-5,-5,3.6);a.camera.position.set(p.x-16,32,p.z+20);a.controls.target.set(p.x,3.6,p.z);}
    else if(which==='entry'){const e=l.rooms.find(r=>r.id==='general').sharedEntrance;a.camera.position.set(e.corridor.x,e.corridor.y+1.55,e.corridor.z);a.controls.target.set(e.door.x,e.door.y+1.55,e.door.z);}
    else{const s=l.stairs[0],p=l.world(s.innerU,s.centerV-s.sign*1.25,3.6),oil=l.rooms.find(r=>r.id==='reception');a.camera.position.set(p.x,p.y+1.55,p.z);a.controls.target.set(oil.door.x,oil.door.y+1.55,oil.door.z);}
    a.controls.update();},which);await page.waitForTimeout(350);await page.screenshot({path:path.join(out,label+'-'+which+'.png')});
  };
  await aim('plan');await aim('entry');await aim('stair');await clean.evaluate(n=>n.remove());
  const auto=async(id,fromGate=false,device='desktop')=>{
   const start=Date.now(),attempts=[];
   console.log(label+' '+device+' starting '+id);
   await frame.evaluate(({id,fromGate})=>{const a=window.campusExplorer;a.clearNavigation();if(fromGate){const p=NAV_NODES.gate;avatarGroup.position.set(p.x,p.y,p.z);if(typeof prevAvatarPos!=='undefined')prevAvatarPos.copy(avatarGroup.position);jumpBaseY=p.y;isJumping=false;}
    a.setControlMode('avatar');cancelCameraTween();avatarSpeedMultiplier=2;
    if(!a.navigateToRoom(id,false))throw new Error('Could not plan '+id);document.getElementById('btn-auto-walk').click();},{id,fromGate});
   for(let retry=0;retry<1;retry++){
    try{await frame.waitForFunction(()=>['arrived','blocked'].includes(window.campusExplorer.getNavigationState().status),null,{timeout:60000});}
    catch(e){const state=await frame.evaluate(()=>({navigation:window.campusExplorer.getNavigationState().status,remaining:window.campusExplorer.getNavigationState().remaining,position:window.campusExplorer.getPlayerPosition()}));throw new Error(id+' timed out '+JSON.stringify(state));}
    const state=await frame.evaluate(()=>({status:window.campusExplorer.getNavigationState().status,remaining:window.campusExplorer.getNavigationState().remaining,position:window.campusExplorer.getPlayerPosition(),personBlocked:avatarPersonBlocked,next:currentNavPoints[autoWalkIndex+1],nearbyPeople:window.campusPeople?.actors.filter(a=>Math.hypot(a.position.x-avatarGroup.position.x,a.position.z-avatarGroup.position.z)<3).map(a=>({id:a.id,position:a.position})),message:document.getElementById('guide-route-status')?.textContent}));attempts.push(state);
    if(state.status==='arrived')break;
   }
   const last=attempts.at(-1),check=await frame.evaluate(id=>{const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),r=l.rooms.find(r=>r.id===id),p=a.getPlayerPosition();return {distance:p.distanceTo(new THREE.Vector3(r.center.x,r.center.y,r.center.z)),floor:Math.round(p.y/3.6)+1,entryHint:document.getElementById('guide-place-hint')?.textContent,inside:campusWalkWorld.roomAt(p)?.id};},id);
   entry.routes.push({id,device,fromGate,elapsedMs:Date.now()-start,attempts,...check});
   fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));
   console.log(label+' '+device+' '+id+': '+last.status+' floor='+check.floor+' distance='+check.distance.toFixed(2));
   assert.equal(last.status,'arrived');assert(check.distance<.35);assert.equal(check.inside,id);
  };
  const destinations=label==='main'?['general','accounting','personnel-accounting','teacher-study','reception','principal','academic','admin-reception-1f']:['academic','teacher-study','reception','principal'];
  for(const [i,id]of destinations.entries())await auto(id,i===0);
  for(const floor of ['1','3','2']){await frame.evaluate(f=>window.campusExplorer.setFloorFilter(f),floor);assert.equal(await frame.evaluate(()=>String(window.campusExplorer.getFloorFilter())),floor);}
  entry.floorSwitches=[1,3,2];
  await page.setViewportSize({width:390,height:844});await auto(label==='main'?'personnel-accounting':'general',true,'mobile');
  await page.screenshot({path:path.join(out,label+'-mobile-arrived.png')});
  entry.mobile=await frame.evaluate(()=>({width:innerWidth,bodyWidth:document.body.getBoundingClientRect().width,canvasWidth:document.querySelector('canvas').getBoundingClientRect().width,overflowX:getComputedStyle(document.body).overflowX}));assert.equal(entry.mobile.bodyWidth,390);assert.equal(entry.mobile.canvasWidth,390);assert(['hidden','clip'].includes(entry.mobile.overflowX));await page.close();
 }}catch(e){report.errors.push(e.message);throw e;}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));}
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify({revision:report.revision,entries:report.entries.length,routes:report.entries.reduce((n,e)=>n+e.routes.length,0),errors:report.errors,out},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
