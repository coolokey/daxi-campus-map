const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/',out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/lan-pavilion-banks-20261020/local');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',cases:[],errors:[]};
 try{
  for(const route of ['','proposal/campus/'])for(const profile of [{width:1440,height:900,touch:false},{width:390,height:844,touch:true}]){
   const label=(route?'proposal':'main')+'-'+profile.width,page=await browser.newPage({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch});
   page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(label+': '+m.text())});page.on('response',r=>{if(r.status()>=400)report.errors.push(label+': '+r.status()+' '+r.url())});
   await page.goto(base+route+'?v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusWalkWorld,null,{timeout:60000});
   await page.locator('.campus-loading').waitFor({state:'hidden',timeout:60000});
   const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));await frame.locator('#guide-start').click();
   await frame.evaluate(()=>{campusExplorer.clearNavigation();campusExplorer.setControlMode('bird');cancelCameraTween();document.body.classList.add('guide-collapsed');document.body.classList.remove('guide-tools-open');camera.position.set(-43,100,18);controls.target.set(-43,0,-66);controls.update()});
   await frame.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   await page.screenshot({path:path.join(out,label+'-overview.png')});
   if(!profile.touch){
    await frame.addStyleTag({content:'body.qa-clean-capture *{visibility:hidden!important}body.qa-clean-capture #webgl-canvas{visibility:visible!important}'});
    await frame.evaluate(()=>document.body.classList.add('qa-clean-capture'));
    await page.screenshot({path:path.join(out,label+'-overview-clean.png')});
    await frame.evaluate(()=>document.body.classList.remove('qa-clean-capture'));
   }
   const row={label,geometry:await frame.evaluate(()=>{scene.updateMatrixWorld(true);const tiers=[];scene.traverse(o=>{if(o.userData.lanBankTread)tiers.push(new THREE.Box3().setFromObject(o))});return{tiers:tiers.length,wall:!!scene.getObjectByName('lan-left-retaining-wall'),ground:CampusOutdoorPlan.lanBanks.steps.count*CampusOutdoorPlan.lanBanks.steps.rise,framing:[[-80,1,-75],[23.5,1,-73]].map(([x,y,z])=>new THREE.Vector3(x,y,z).project(camera).toArray())}})};
   report.cases.push(row);assert.equal(row.geometry.tiers,12);assert(row.geometry.wall);
   if(!profile.touch)assert(row.geometry.framing.every(p=>Math.abs(p[0])<.95&&Math.abs(p[1])<.95&&p[2]<1),'bank overview must frame both structures');
   if(!profile.touch){
    await frame.evaluate(()=>{camera.position.set(38,12,-53);controls.target.set(22,1,-73);controls.update()});await frame.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));await page.screenshot({path:path.join(out,label+'-steps.png')});
   }
   row.physics=await frame.evaluate(()=>{
    isJumping=false;stopAutoWalk();const s=CampusOutdoorPlan.lanBanks.steps,w=CampusOutdoorPlan.lanBanks.wall,bad=[],p={x:23.5,y:0,z:s.z1+1};let peak=0;
    for(const end of [s.z0+.5,s.z1+1]){const start=p.z,n=Math.ceil(Math.abs(end-start)/.08);for(let i=1;i<=n;i++){const z=start+(end-start)*i/n;if(moveAvatarWithCollision(p,0,z-p.z,0,true))bad.push({...p});peak=Math.max(peak,p.y)}}
    const side={x:s.x0+2,y:CampusOutdoorPlan.ground({x:s.x0+2,z:s.z0+1}),z:s.z0+1},sideBlocked=moveAvatarWithCollision(side,-4,0,0,true),wall={x:-80,y:0,z:w.z1+2},wallBlocked=moveAvatarWithCollision(wall,0,-6,0,true);
    const ray=new THREE.Raycaster(new THREE.Vector3(23.5,10,s.z0+.5),new THREE.Vector3(0,-1,0),0,12),treads=[];scene.traverse(o=>{if(o.userData.lanBankTread)treads.push(o)});const top=ray.intersectObjects(treads)[0]?.point.y;
    return{bad,peak,end:p,sideBlocked,sideOverlap:checkWallCollision(side.x,side.y,side.z),wallBlocked,wallOverlap:checkWallCollision(wall.x,wall.y,wall.z),visibleTop:top,cameraBlocked:campusWalkWorld.cameraBlocked({x:-80,y:1,z:(w.z0+w.z1)/2})};
   });
   assert.deepEqual(row.physics.bad,[]);assert(Math.abs(row.physics.peak-row.geometry.ground)<.01);assert.equal(row.physics.end.y,0);assert(row.physics.sideBlocked&&!row.physics.sideOverlap);assert(row.physics.wallBlocked&&!row.physics.wallOverlap);assert(Math.abs(row.physics.visibleTop-row.geometry.ground)<.01);assert(row.physics.cameraBlocked);
   await frame.evaluate(()=>{const s=CampusOutdoorPlan.lanBanks.steps;campusExplorer.setControlMode('avatar');cancelCameraTween();avatarGroup.position.set(23.5,CampusOutdoorPlan.ground({x:23.5,z:s.z0+.5}),s.z0+.5);prevAvatarPos.copy(avatarGroup.position);avatarAngle=Math.PI;campusWalkWorld.updateCamera();document.body.classList.add('guide-collapsed')});
   row.location=await frame.evaluate(()=>campusMinimap.locate());assert.equal(row.location.floor,1);assert.equal(row.location.label,'蘭亭旁階梯');
   await frame.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));await page.screenshot({path:path.join(out,label+'-ground.png')});
   if(profile.touch){for(const id of ['mobile-move-stick','mobile-look-stick','anniversary-launch'])assert(await frame.evaluate(id=>{const e=document.getElementById(id),r=e.getBoundingClientRect();return r.width>40&&e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))},id),'covered control '+id);}
   assert(await frame.evaluate(()=>campusExplorer.navigateToRoom('lan-pavilion',false)));await frame.locator('#btn-auto-walk').click();
   row.navigation=await frame.evaluate(()=>{const raf=requestAnimationFrame,render=renderer.render,delta=clock.getDelta;requestAnimationFrame=()=>0;renderer.render=()=>{};clock.getDelta=()=>.05;try{let frames=0;while(isAutoWalking&&frames++<4000)animate();return{frames,status:campusExplorer.getNavigationState().status,end:campusExplorer.getPlayerPosition()}}finally{requestAnimationFrame=raf;renderer.render=render;clock.getDelta=delta}});
   assert.equal(row.navigation.status,'arrived');await page.screenshot({path:path.join(out,label+'-arrived.png')});await page.close();console.log(label+' passed: appearance, ascent/descent, solid edges, camera, navigation');
   fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));
  }
  assert.deepEqual(report.errors,[]);
 }catch(e){report.errors.push(e.message);throw e}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2))}
 console.log(JSON.stringify({cases:report.cases.length,errors:report.errors,out},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
