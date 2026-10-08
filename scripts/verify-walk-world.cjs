const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.CAMPUS_QA_URL||'http://127.0.0.1:5178/',{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForSelector('iframe');const frame=page.frames().find(f=>f.url().includes('campus-explorer'));
  await frame.waitForFunction(()=>!!window.campusWalkWorld);
  await page.screenshot({path:'qa/12-walk-interior-welcome.png'});
  const graph=await frame.evaluate(()=>({nodes:Object.keys(NAV_NODES).length,unreachable:Object.values(ROOMS_DB).filter(r=>!findShortestPath('gate',r.node)).map(r=>r.id)}));assert.deepEqual(graph.unreachable,[]);console.log('Graph ready',graph.nodes);
  await frame.locator('#welcome-btn-enter').click();await page.waitForTimeout(1000);
  await frame.evaluate(()=>{avatarSpeedMultiplier=.5});await page.keyboard.down('w');await page.waitForTimeout(700);await page.keyboard.up('w');
  await page.keyboard.down('a');await page.waitForTimeout(450);await page.keyboard.up('a');
  const direction=await frame.evaluate(()=>{const d=new THREE.Vector3();camera.getWorldDirection(d);return {dot:d.x*Math.sin(avatarAngle)+d.z*Math.cos(avatarAngle),behind:(camera.position.x-avatarGroup.position.x)*Math.sin(avatarAngle)+(camera.position.z-avatarGroup.position.z)*Math.cos(avatarAngle)}});assert(direction.dot>.8);assert(direction.behind<0);
  await page.screenshot({path:'qa/13-forward-camera.png'});
  // Exercise every generated stair flight using the exact movement/ground engine.
  const geometry=await frame.evaluate(()=>{
   const failures=[];
   for(const l of campusWalkWorld.layouts)for(const r of l.ramps){
    const p={...r.start};
    for(let i=1;i<=80;i++){const target=CampusWalkMath.rampPoint(r,i/80);if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)||Math.abs(p.y-target.y)>.12){failures.push({building:l.id,floor:r.floor,step:i,p,target});break;}}
    for(let i=79;i>=0;i--){const target=CampusWalkMath.rampPoint(r,i/80);if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)||Math.abs(p.y-target.y)>.12){failures.push({building:l.id,down:true,step:i,p,target});break;}}
   }
   return{flights:campusWalkWorld.layouts.reduce((n,l)=>n+l.ramps.length,0),failures};
  });assert.deepEqual(geometry.failures,[]);console.log('Stair geometry passed',geometry.flights);
  const jumping=await frame.evaluate(async()=>{
   const original=avatarGroup.position.clone(),heading=avatarAngle;
   const ramp=campusWalkWorld.layouts.find(l=>l.id==='admin-front').ramps[0],start=CampusWalkMath.rampPoint(ramp,.1);
   avatarGroup.position.set(start.x,start.y,start.z);avatarAngle=Math.atan2(ramp.end.x-ramp.start.x,ramp.end.z-ramp.start.z);
   window.qaRender=renderer.render;renderer.render=()=>{};avatarSpeedMultiplier=.16;moveInput.forward=true;triggerJump();
   let frames=0;while(isJumping&&frames++<240)await new Promise(requestAnimationFrame);
   moveInput.forward=false;const p=avatarGroup.position;
   const result={startY:start.y,y:p.y,ground:campusWalkWorld.ground(p),jumping:isJumping,hit:checkWallCollision(p.x,p.y,p.z)};
   avatarGroup.position.copy(original);avatarAngle=heading;avatarSpeedMultiplier=1;renderer.render=window.qaRender;return result;
  });assert.equal(jumping.jumping,false);assert(jumping.y>jumping.startY+.35,JSON.stringify(jumping));assert(Math.abs(jumping.y-jumping.ground)<.05);assert.equal(jumping.hit,false);console.log('Jump landing',jumping);
  // Use actual auto-walk from the entrance, up real ramps, through office doors.
  const travel=async(id)=>{
   await frame.evaluate(id=>{window.qaRender=renderer.render;renderer.render=()=>{};navigateToRoom(id);avatarSpeedMultiplier=2.5;startAutoWalk()},id);
   try{await frame.waitForFunction(()=>!isAutoWalking,{},{timeout:60000});}catch(e){console.log({errors});console.log(await frame.evaluate(()=>({p:avatarGroup.position,index:autoWalkIndex,count:currentNavPoints.length,target:currentNavPoints[autoWalkIndex+1],draws:renderer.info.render.calls,speed:avatarSpeedMultiplier,toast:document.getElementById('mode-toast').textContent})));throw e}
   const result=await frame.evaluate(id=>{const target=NAV_NODES[ROOMS_DB[id].node],p=avatarGroup.position;return{id,y:p.y,distance:Math.hypot(p.x-target.x,p.y-target.y,p.z-target.z),floor:campusMinimap.locate().floor,hit:checkWallCollision(p.x,p.y,p.z)}},id);
   await frame.evaluate(()=>{renderer.render=window.qaRender});await page.waitForTimeout(250);
   assert(result.distance<.2,JSON.stringify(result));assert.equal(result.hit,false);console.log('Reached',result);return result;
  };
  const office=await travel('academic');assert.equal(office.floor,2);await page.screenshot({path:'qa/14-office-2f.png'});
  // Drive the real manual keyboard state along the return route; no Y teleport.
  const manual=await frame.evaluate(async()=>{
   const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),room={node:'admin-front-entry-1'},points=campusWalkWorld.route(avatarGroup.position,room);
   if(!points)throw Error('No return route');setFloorFilter('all');window.qaRender=renderer.render;renderer.render=()=>{};
   for(const target of points){let n=0;
    while(Math.hypot(target.x-avatarGroup.position.x,target.z-avatarGroup.position.z)>.025){
     if(++n>500)throw Error('Manual movement stalled '+JSON.stringify({target,p:avatarGroup.position}));
     const dx=target.x-avatarGroup.position.x,dz=target.z-avatarGroup.position.z;avatarAngle=Math.atan2(dx,dz);
     avatarSpeedMultiplier=Math.min(3,Math.max(.005,Math.hypot(dx,dz)/1.8));moveInput.forward=true;
     await new Promise(requestAnimationFrame);
    }
    moveInput.forward=false;
   }
   avatarSpeedMultiplier=1;renderer.render=window.qaRender;return{y:avatarGroup.position.y,floor:campusMinimap.locate().floor};
  });assert(Math.abs(manual.y)<.1);assert.equal(manual.floor,1);
  const classroom=await travel('901');assert.equal(classroom.floor,3);await page.screenshot({path:'qa/15-classroom-3f.png'});
  const art=await travel('art-4f');assert.equal(art.floor,4);await page.screenshot({path:'qa/16-art-4f.png'});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(400);
  const heading=await frame.evaluate(()=>avatarAngle);await frame.locator('#dpad-left').dispatchEvent('touchstart');await page.waitForTimeout(350);await frame.locator('#dpad-left').dispatchEvent('touchend');
  const mobile=await frame.evaluate(()=>({heading:avatarAngle,cameraY:camera.position.y,floor:campusMinimap.locate().floor}));assert.notEqual(mobile.heading,heading);assert.equal(mobile.floor,4);await page.screenshot({path:'qa/17-mobile-room.png'});
  assert.deepEqual(errors,[]);const result={graph,direction,geometry,jumping,office,manual,classroom,art,mobile,errors};fs.writeFileSync('qa/walk-world-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
