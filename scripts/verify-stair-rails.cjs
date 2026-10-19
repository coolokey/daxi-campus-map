const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/',out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/stair-rail-body-20261019/local');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',entries:[],errors:[]};
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 try{for(const route of (process.env.CAMPUS_QA_ENTRY==='proposal'?['proposal/campus/']:['', 'proposal/campus/'])){
  const label=route?'proposal':'main',page=await browser.newPage({viewport:{width:1000,height:760}}),entry={label,routes:[]};report.entries.push(entry);
  page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(label+': '+m.text());});page.on('response',r=>{if(r.status()>=400)report.errors.push(r.status()+' '+r.url());});
  await page.goto(base+route+'?view=overview&v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusWalkWorld,null,{timeout:60000});
  const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));assert(frame);
  entry.rails=await frame.evaluate(()=>{
   const a=window.campusExplorer;stopAutoWalk();cancelCameraTween();document.getElementById('guide-landing')?.remove();document.getElementById('welcome-card')?.classList.add('hidden');a.renderer.setPixelRatio(.65);
   const failures=[];let samples=0;
   for(const l of campusWalkWorld.layouts)for(const r of l.ramps.filter(r=>l.stairs.some(s=>s.id===r.stairId)))for(const t of [.25,.5,.75])for(const side of [-1,1]){
    const start=CampusWalkMath.rampPoint(r,t),p={...start},axis=r.axis==='x'?'z':'x',blocked=moveAvatarWithCollision(p,axis==='x'?side*.9:0,axis==='z'?side*.9:0);samples++;
    if(!blocked||Math.abs(p[axis]-start[axis])>.34)failures.push({stair:r.stairId,t,side,p});
   }
   return {samples,failures,colliders:WALL_COLLIDERS.filter(c=>c.stairRail).length};
  });assert(entry.rails.samples>100);assert.deepEqual(entry.rails.failures,[]);assert(entry.rails.colliders>100);
  entry.clearance=await frame.evaluate(()=>{
   scene.updateMatrixWorld(true);const meshes=[],failures=[];let samples=0,flights=0;scene.traverse(o=>{if(o.isMesh&&!o.material.transparent)meshes.push(o)});
   for(const l of campusWalkWorld.layouts)for(const r of l.ramps.filter(r=>l.stairs.some(s=>s.id===r.stairId))){
    flights++;const points=[];for(let i=4;i<=36;i++)for(const offset of [-.2,0,.2]){const p=CampusWalkMath.rampPoint(r,i/40);p[r.axis==='x'?'z':'x']+=offset;points.push(p)}
    const s=l.stairs.find(s=>s.id===r.stairId),landing=l.platforms.find(p=>p.stairId===s.id&&p.floor===r.floor);for(const v of [s.centerV-1.25,s.centerV,s.centerV+1.25])points.push(l.world(s.turnU,v,landing.y));
    for(const p of points){if(checkWallCollision(p.x,p.y,p.z))continue;samples++;const ray=new THREE.Raycaster(new THREE.Vector3(p.x,p.y+.3,p.z),new THREE.Vector3(0,1,0),0,AVATAR_HEIGHT-.3);if(ray.intersectObjects(meshes,false).some(h=>Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.9))failures.push({building:l.id,stair:r.stairId,floor:r.floor,p});}
    const p={...r.start};for(const indices of [Array.from({length:80},(_,i)=>i+1),Array.from({length:80},(_,i)=>79-i)])for(const i of indices){const q=CampusWalkMath.rampPoint(r,i/80);if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)||Math.abs(p.y-q.y)>.12){failures.push({building:l.id,stair:r.stairId,floor:r.floor,movement:i});break;}}
   }return {flights,samples,failures};
  });assert(entry.clearance.samples>4000);assert.deepEqual(entry.clearance.failures,[]);
  // Real keyboard movement toward an administrative flight side, no altered collision rules.
  await frame.locator('canvas').first().click({position:{x:12,y:12}});
  const start=await frame.evaluate(()=>{
   const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),r=l.ramps.find(r=>r.floor===1),p=CampusWalkMath.rampPoint(r,.5),axis=r.axis==='x'?'z':'x';
   a.clearNavigation();a.setControlMode('avatar');cancelCameraTween();a.setFloorFilter('all');avatarGroup.position.set(p.x,p.y,p.z);prevAvatarPos.copy(avatarGroup.position);jumpBaseY=p.y;isJumping=false;avatarAngle=axis==='x'?Math.PI/2:0;avatarGroup.rotation.y=avatarAngle;return {p,axis};
  });
  await frame.evaluate(()=>{const c=window.campusExplorer.renderer.domElement;c.tabIndex=0;c.focus();});
  await page.bringToFront();await frame.locator('canvas').first().focus();await page.waitForTimeout(300);await frame.locator('canvas').first().press('w',{delay:1200});
  const manualResult=()=>frame.evaluate(({p,axis})=>({offset:Math.abs(avatarGroup.position[axis]-p[axis]),heightError:Math.abs(avatarGroup.position.y-p.y),position:window.campusExplorer.getPlayerPosition(),mode:currentMode,motionBlocked:window.campusExplorer.motionBlocked()}),start);
  entry.manual=await manualResult();
  // A long geometry audit can leave the first render/input frame pending.
  // Retry the real key gesture after rendering resumes; never accept no motion.
  if(entry.manual.offset===0){await page.waitForTimeout(1200);await page.bringToFront();await frame.locator('canvas').first().click({position:{x:12,y:12}});await frame.locator('canvas').first().focus();await frame.locator('canvas').first().press('w',{delay:1500});entry.manual=await manualResult();}
  assert(entry.manual.offset>.05&&entry.manual.offset<=.34);assert(entry.manual.heightError<.01);await page.screenshot({path:path.join(out,label+'-manual-side-stop.png')});
  await frame.evaluate(()=>{const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),r=l.ramps.find(r=>r.floor===1),p=avatarGroup.position,dx=r.end.x-r.start.x,dz=r.end.z-r.start.z,len=Math.hypot(dx,dz);a.setControlMode('bird');cancelCameraTween();a.setFloorFilter('all');a.camera.position.set(p.x-dx/len*4.5+.5,p.y+2,p.z-dz/len*4.5);a.controls.target.set(p.x,p.y+.8,p.z);a.controls.update();});
  await page.waitForTimeout(400);await page.screenshot({path:path.join(out,label+'-stair-body-clearance.png')});

  const auto=async(id,fromGate,device)=>{
   console.log(label+' '+device+' starting '+id);
   await frame.evaluate(({id,fromGate})=>{const a=window.campusExplorer;a.clearNavigation();if(fromGate){const p=NAV_NODES.gate;avatarGroup.position.set(p.x,p.y,p.z);prevAvatarPos.copy(avatarGroup.position);jumpBaseY=p.y;isJumping=false;}a.setControlMode('avatar');cancelCameraTween();avatarSpeedMultiplier=2;if(!a.navigateToRoom(id,false))throw Error('No route '+id);document.getElementById('btn-auto-walk').click();},{id,fromGate});
   await frame.waitForFunction(()=>['arrived','blocked'].includes(window.campusExplorer.getNavigationState().status),null,{timeout:90000});
   const result=await frame.evaluate(()=>({status:window.campusExplorer.getNavigationState().status,room:campusWalkWorld.roomAt(avatarGroup.position)?.id,position:window.campusExplorer.getPlayerPosition()}));entry.routes.push({id,device,...result});
   fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));console.log(label+' '+device+' '+id+': '+result.status);assert.equal(result.status,'arrived');assert.equal(result.room,id);
  };
  await auto('teacher-study',true,'desktop');await auto('admin-g89-staff',false,'desktop');
  await auto('904',true,'desktop');await auto('902',false,'desktop');await auto('907',false,'desktop');
  await frame.evaluate(()=>{const a=window.campusExplorer,l=campusWalkWorld.layouts.find(l=>l.id==='grade9-back'),r=l.ramps.filter(r=>r.floor===1)[1],p=CampusWalkMath.rampPoint(r,.9);a.clearNavigation();a.setControlMode('bird');cancelCameraTween();a.setFloorFilter('all');avatarGroup.visible=true;avatarGroup.position.set(p.x,p.y,p.z);a.camera.position.set(p.x+2.1,p.y+1.9,p.z+4);a.controls.target.set(p.x,p.y+.8,p.z);a.controls.update();});
  await page.waitForTimeout(400);await page.screenshot({path:path.join(out,label+'-grade9-cleared.png')});
  await page.setViewportSize({width:390,height:844});await auto('reception',true,'mobile');await auto('admin-g89-staff',false,'mobile');await page.screenshot({path:path.join(out,label+'-mobile-arrived.png')});
  await auto('902',true,'mobile');await auto('907',false,'mobile');
  entry.mobile=await frame.evaluate(()=>({width:innerWidth,body:document.body.getBoundingClientRect().width}));assert.equal(entry.mobile.body,390);await page.close();
 }}catch(e){report.errors.push(e.message);throw e;}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));}
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify({revision:report.revision,entries:report.entries.length,routes:report.entries.reduce((n,e)=>n+e.routes.length,0),errors:report.errors,out},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
