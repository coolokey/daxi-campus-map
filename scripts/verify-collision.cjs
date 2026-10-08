const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.CAMPUS_QA_URL||'http://127.0.0.1:5178/',{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForSelector('iframe');
  const frame=page.frames().find(f=>f.url().includes('campus-explorer'));
  await frame.waitForFunction(()=>Boolean(window.campusExplorer));
  await frame.locator('#welcome-btn-enter').click();
  await page.waitForTimeout(1600);
  await frame.evaluate(()=>{
   stopAutoWalk();avatarGroup.position.set(-12,0,36);prevAvatarPos.copy(avatarGroup.position);
   camera.position.set(-12,5,26);controls.target.set(-12,1.8,36);controls.update();
   avatarAngle=0;moveInput.forward=true;moveInput.sprint=true;avatarSpeedMultiplier=3;
  });
  await page.waitForTimeout(1600);
  const keyboard=await frame.evaluate(()=>{moveInput.forward=false;moveInput.sprint=false;return {z:avatarGroup.position.z,hit:checkWallCollision(avatarGroup.position.x,avatarGroup.position.y,avatarGroup.position.z)}});
  assert(keyboard.z<=38.4601&&keyboard.z>=36,JSON.stringify(keyboard));assert.equal(keyboard.hit,false);
  const audit=await frame.evaluate(()=>{
   const guard={x:6,y:0,z:92};moveAvatarWithCollision(guard,0,-15);
   const door={x:-12,y:0,z:53};moveAvatarWithCollision(door,0,-5);
   const upper={x:-12,y:3.6,z:36};moveAvatarWithCollision(upper,0,8);
   const entrance={x:-10,y:0,z:96};moveAvatarWithCollision(entrance,0,-17);
   const stairs=STAIR_ZONES[0],elevation=checkStairElevation(stairs.worldX,stairs.baseY,stairs.worldZ);
   return {guardZ:guard.z,doorZ:door.z,upperZ:upper.z,entranceZ:entrance.z,stairs:elevation.onStair,colliders:WALL_COLLIDERS.length};
  });
  assert(audit.guardZ>=89.22-1e-6);assert(audit.doorZ<49);assert(audit.upperZ<39);assert(audit.stairs);
  assert(Math.abs(audit.entranceZ-79)<1e-6);
  await frame.evaluate(()=>{
   avatarGroup.position.set(-12,0,36);prevAvatarPos.copy(avatarGroup.position);
   currentNavPoints=[{x:-12,y:.6,z:36},{x:-12,y:.6,z:44}];autoWalkIndex=0;isAutoWalking=true;
  });
  await page.waitForTimeout(1000);
  const auto=await frame.evaluate(()=>({walking:isAutoWalking,z:avatarGroup.position.z,hit:checkWallCollision(avatarGroup.position.x,avatarGroup.position.y,avatarGroup.position.z)}));
  assert.equal(auto.walking,false);assert(auto.z<39);assert.equal(auto.hit,false);
  await page.setViewportSize({width:390,height:844});
  await frame.evaluate(()=>{avatarGroup.position.set(-12,0,36);prevAvatarPos.copy(avatarGroup.position);avatarAngle=0;moveInput.forward=true});
  await page.waitForTimeout(800);
  const mobile=await frame.evaluate(()=>{moveInput.forward=false;return avatarGroup.position.z});assert(mobile<39);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({keyboard,audit,auto,mobile,errors}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
