const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:5189';
 const out=path.resolve(__dirname,process.env.CAMPUS_QA_OUT||'../qa/landmark-collision-local');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader']});
 try{
 const results=[];
 for(const route of ['campus-explorer/','proposal/campus/campus-explorer/']){
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url=`${base.replace(/\/$/,'')}/${route}index.html?view=bird&v=${process.env.CAMPUS_QA_VERSION||'landmark-collision'}`;
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:120000});
  try{await page.waitForFunction(()=>Boolean(window.campusWalkWorld),null,{timeout:120000});}
  catch(e){throw new Error(`${e.message}; page errors: ${JSON.stringify(errors)}; url: ${page.url()}; body: ${(await page.locator('body').innerText()).slice(0,250)}`)}
  const result=await page.evaluate(()=>{
   stopAutoWalk();
   const tests=[['石柱',-36,28.5],['左灌木',-38.4,27.6],['右灌木',-33.6,29.4],['柏樹',-42,24],['闊葉樹',15,28],['操場樹幹',-126,7.6],['長椅',20.4,22],['花台',-43,44],['旗桿1',-52,9],['旗桿2',-49.5,9],['旗桿3',-47,9],['排球柱1',-29,-38],['排球柱2',-15,-38]];
   tests.push(['行政庭園左樹幹',-17,53.4],['行政庭園右樹幹',-4.5,53.4]);
   const probes=tests.map(([name,x,z])=>({name,hit:checkWallCollision(x,0,z)}));
   const movement=[[0,-7,-36,32],[0,7,-36,25],[8,0,-40,28.5],[-8,0,-32,28.5],[8,-7,-40,32]].map(([dx,dz,x,z])=>{const p={x,y:0,z};const blocked=moveAvatarWithCollision(p,dx,dz);return {blocked,end:p,overlap:checkWallCollision(p.x,p.y,p.z)}});
   const start={x:-36,y:0,z:24},route=campusWalkWorld.gridPath(start,{x:-36,y:0,z:32});let routeBlocked=false;
   if(route)for(const q of route)routeBlocked=moveAvatarWithCollision(start,q.x-start.x,q.z-start.z)||routeBlocked;
   const ids=findShortestPath('gate','statue-node'),p={...NAV_NODES.gate};let gateRouteBlocked=false;
   if(ids)for(const id of ids.slice(1)){const q=NAV_NODES[id];gateRouteBlocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)||gateRouteBlocked;}
   setControlMode('avatar');avatarGroup.position.set(-36,0,32);prevAvatarPos.copy(avatarGroup.position);avatarAngle=Math.PI;
   return {probes,movement,routeFound:!!route,routeBlocked,routeEnd:start,gateRouteFound:!!ids,gateRouteBlocked,gateRouteEnd:p,landmarks:WALL_COLLIDERS.filter(c=>c.landmark).length};
  });
  assert(result.landmarks>20);for(const p of result.probes)assert(p.hit,p.name);
  for(const m of result.movement){assert(m.blocked);assert(!m.overlap)}
  assert(result.routeFound);assert(!result.routeBlocked);assert(result.gateRouteFound);assert(!result.gateRouteBlocked);
  await page.evaluate(()=>{document.getElementById('guide-landing')?.close();document.getElementById('welcome-card')?.classList.add('hidden');});
  await page.waitForTimeout(500);
  await page.keyboard.down('w');await page.waitForTimeout(2200);await page.keyboard.up('w');
  const desktop=await page.evaluate(()=>({p:avatarGroup.position.toArray(),angle:avatarAngle,blocked:motionBlocked(),overlap:checkWallCollision(avatarGroup.position.x,avatarGroup.position.y,avatarGroup.position.z)}));console.log(JSON.stringify({desktop}));assert(!desktop.overlap);assert(desktop.p[2]>29.6&&desktop.p[2]<32);
  await page.screenshot({path:path.join(out,route.startsWith('proposal')?'embedded-desktop.png':'desktop-statue-blocked.png')});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{stopAutoWalk();avatarGroup.position.set(-36,0,32);prevAvatarPos.copy(avatarGroup.position);avatarAngle=Math.PI;});
  const stick=await page.locator('#mobile-move-stick').boundingBox();assert(stick);
  await page.mouse.move(stick.x+stick.width/2,stick.y+stick.height/2);await page.mouse.down();
  await page.mouse.move(stick.x+stick.width/2,stick.y+stick.height/2-40);await page.waitForTimeout(1600);await page.mouse.up();
  const mobile=await page.evaluate(()=>{moveInput.forward=false;moveInput.sprint=false;return {p:avatarGroup.position.toArray(),overlap:checkWallCollision(avatarGroup.position.x,avatarGroup.position.y,avatarGroup.position.z)}});assert(!mobile.overlap);assert(mobile.p[2]>29.6&&mobile.p[2]<32);
  await page.screenshot({path:path.join(out,route.startsWith('proposal')?'embedded-mobile.png':'mobile-statue-blocked.png')});
  assert.deepEqual(errors,[]);results.push({url,...result,desktop,mobile,errors});await page.close();
 }
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
