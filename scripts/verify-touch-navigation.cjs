const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/',out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/touch-navigation-20261020/local');
const profiles=(process.env.TOUCH_QA_PROFILES||'390x844,820x1180,1024x768,1180x820,1366x1024,844x390').split(',').map(p=>{const [width,height]=p.split('x').map(Number);return{width,height}});
fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',cases:[],errors:[]};
try{for(const route of (process.env.TOUCH_QA_MAIN_ONLY?['']:['','proposal/campus/']))for(const profile of profiles){
 const label=(route?'proposal':'main')+'-'+profile.width+'x'+profile.height,page=await browser.newPage({viewport:profile,hasTouch:true});const row={label};report.cases.push(row);
 page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(label+': '+m.text())});page.on('response',r=>{if(r.status()>=400)report.errors.push(label+': '+r.status()+' '+r.url())});
 await page.goto(base+route+'?v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusMobileControls,null,{timeout:60000});await page.locator('.campus-loading').waitFor({state:'hidden',timeout:60000});
 const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));await frame.locator('#guide-start').click();
 await frame.evaluate(()=>{campusExplorer.clearNavigation();campusExplorer.setControlMode('avatar');document.body.classList.add('guide-collapsed');document.body.classList.remove('guide-tools-open');avatarGroup.position.copy(CampusOutdoorPlan.entrance.spawn)});
 await page.waitForTimeout(100);
 row.layout=await frame.evaluate(()=>{const rect=id=>{const e=document.getElementById(id),r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,display:getComputedStyle(e).display}};return{launch:rect('anniversary-launch'),move:rect('mobile-move-stick'),look:rect('mobile-look-stick'),coarse:matchMedia('(pointer:coarse)').matches}});
 await page.screenshot({path:path.join(out,label+'-controls.png')});
 const {launch,move,look}=row.layout;assert(move.w>40&&look.w>40&&move.display!=='none');
 const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
 assert(!overlaps(launch,look),'fireworks launcher overlaps right joystick');assert(!overlaps(launch,move),'fireworks launcher overlaps left joystick');
 for(const selector of ['#anniversary-launch','#guide-tools-toggle','#mobile-move-stick','#mobile-look-stick'])assert(await frame.evaluate(selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))},selector),'control hit target is covered: '+selector);
 const cdp=await page.context().newCDPSession(page),mb=await frame.locator('#mobile-move-stick').boundingBox(),lb=await frame.locator('#mobile-look-stick').boundingBox();
 const first={id:1,x:mb.x+mb.width/2,y:mb.y+mb.height/2-35},second={id:2,x:lb.x+lb.width/2+35,y:lb.y+lb.height/2};
 await frame.evaluate(()=>{window.touchQAEvents=[];for(const type of ['pointerdown','pointerup','pointercancel','touchstart','touchend','touchcancel'])document.addEventListener(type,e=>touchQAEvents.push({type,id:e.pointerId,target:e.target.id,changed:Array.from(e.changedTouches||[],t=>t.identifier),touches:Array.from(e.touches||[],t=>t.identifier),axes:structuredClone({move:campusMobileControls.move,look:campusMobileControls.look})}),true)});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[first]});await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[first,second]});
 await frame.waitForFunction(()=>campusMobileControls.move.y>.5&&campusMobileControls.look.x>.5);
 // CDP touchEnd lists the released contacts, not the contacts still held.
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[first]});
 row.firstRelease=await frame.evaluate(()=>({move:structuredClone(campusMobileControls.move),look:structuredClone(campusMobileControls.look),events:touchQAEvents}));
 assert(await frame.evaluate(()=>campusMobileControls.move.y===0&&campusMobileControls.look.x>.5),'one finger release must preserve other stick');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
 assert(await frame.evaluate(()=>Object.values(campusMobileControls.move).every(v=>v===0)&&Object.values(campusMobileControls.look).every(v=>v===0)));
 row.nativeMultitouch=true;
 const extra={id:3,x:first.x+8,y:first.y+3};
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[first]});await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[first,extra]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[extra]});assert(await frame.evaluate(()=>campusMobileControls.move.y>.5),'second finger release cancels the original owner');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});row.nativeSameStick=true;
 for(let i=0;i<3;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[first]});await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]})}
 row.release=await frame.evaluate(()=>({axes:structuredClone(campusMobileControls.move),active:document.getElementById('mobile-move-stick').dataset.active,position:campusExplorer.getPlayerPosition()}));
 await page.waitForTimeout(350);row.stopDrift=await frame.evaluate(p=>campusExplorer.getPlayerPosition().distanceTo(new THREE.Vector3(p.x,p.y,p.z)),row.release.position);assert(row.stopDrift<.02,'avatar keeps moving after release');
 // Actual UI start from a stair, pause, resume from its current position, arrive.
 await frame.locator('#guide-tools-toggle').click();assert(await frame.evaluate(()=>document.body.classList.contains('guide-tools-open')));
 row.plan=await frame.evaluate(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='multi-building'),r=l.ramps.find(r=>r.stairId.endsWith('-south')),p=CampusWalkMath.rampPoint(r,.43);avatarGroup.position.set(p.x,p.y,p.z);const t=performance.now(),ok=campusExplorer.navigateToRoom('academic',false);return{ok,ms:performance.now()-t,points:campusExplorer.getNavigationState().points.length}});assert(row.plan.ok);
 await frame.waitForFunction(()=>!document.body.classList.contains('guide-tools-open'));await frame.locator('#btn-auto-walk').click();await frame.waitForFunction(()=>campusExplorer.getNavigationState().status==='walking');
 await page.waitForTimeout(300);await frame.locator('#btn-auto-walk').click();assert.equal(await frame.evaluate(()=>campusExplorer.getNavigationState().status),'paused');
 await frame.locator('#btn-auto-walk').click();assert.equal(await frame.evaluate(()=>campusExplorer.getNavigationState().status),'walking');
 if(!process.env.TOUCH_QA_MOTOR_ONCE||profile===profiles[0]){
  row.motor=await frame.evaluate(()=>{const realRAF=requestAnimationFrame,realRender=renderer.render,realDelta=clock.getDelta;requestAnimationFrame=()=>0;renderer.render=()=>{};clock.getDelta=()=>.05;try{let frames=0;while(isAutoWalking&&frames++<8000)animate();return{frames,status:campusExplorer.getNavigationState().status,end:campusExplorer.getPlayerPosition()}}finally{requestAnimationFrame=realRAF;renderer.render=realRender;clock.getDelta=realDelta}});assert.equal(row.motor.status,'arrived');
 }else{
  const before=await frame.evaluate(()=>campusExplorer.getPlayerPosition());
  // Software WebGL may not produce a frame inside a fixed 350 ms window.
  // Require real movement, with a bounded deadline, instead of assuming frame timing.
  await frame.waitForFunction(p=>campusExplorer.getPlayerPosition().distanceTo(new THREE.Vector3(p.x,p.y,p.z))>.02,before,{timeout:10000});
  row.progress=await frame.evaluate(p=>({distance:campusExplorer.getPlayerPosition().distanceTo(new THREE.Vector3(p.x,p.y,p.z)),status:campusExplorer.getNavigationState().status}),before);assert(row.progress.distance>.02);assert.equal(row.progress.status,'walking');
  await frame.locator('#btn-auto-walk').click();assert.equal(await frame.evaluate(()=>campusExplorer.getNavigationState().status),'paused');
 }
 await page.screenshot({path:path.join(out,label+(row.motor?'-arrived.png':'-paused.png'))});await page.close();console.log(label+' passed: layout, native multitouch, release, stair start/resume/'+(row.motor?'arrival':'progress/stop'));fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));
 }
 assert.deepEqual(report.errors,[]);
}catch(e){report.errors.push(e.message);throw e}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2))}
console.log(JSON.stringify({cases:report.cases.length,errors:report.errors,out},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
