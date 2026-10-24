const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4189/';
const revision=process.env.CAMPUS_RELEASE_SHA||'arrows-20261024';
const out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/navigation-arrows-2026-10-24/local');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 const report={base,revision,cases:[],errors:[]};
 try{
  for(const profile of [
   {name:'desktop',route:'',width:1280,height:800},
   {name:'mobile',route:'',width:390,height:844},
   {name:'embedded',route:'proposal/campus/',width:1280,height:800},
   {name:'reduced-motion',route:'proposal/campus/',width:390,height:844,reducedMotion:'reduce'}
  ]){
   const page=await browser.newPage({viewport:{width:profile.width,height:profile.height},reducedMotion:profile.reducedMotion||'no-preference'});
   page.on('pageerror',e=>report.errors.push(profile.name+': '+e.message));
   page.on('console',m=>{if(m.type()==='error')report.errors.push(profile.name+': '+m.text())});
   page.on('response',r=>{if(r.status()>=400)report.errors.push(profile.name+': '+r.status()+' '+r.url())});
   await page.goto(base+profile.route+'?v='+encodeURIComponent(revision),{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusExplorer,null,{timeout:60000});
   await page.locator('.campus-loading').waitFor({state:'hidden',timeout:60000});
   const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));
   await frame.locator('#guide-start').click();
   const row={name:profile.name};report.cases.push(row);
   row.ready=await frame.evaluate(()=>{
    campusExplorer.setControlMode('avatar');avatarGroup.position.copy(CampusOutdoorPlan.entrance.spawn);
    const ok=campusExplorer.navigateToRoom('academic',false),g=scene.getObjectByName('navigation-ground-arrows');
    return {ok,visible:g.visible,meshes:g.children.length,arrows:g.children[1]?.count,sloped:currentNavPoints.some((p,i)=>i&&Math.abs(p.y-currentNavPoints[i-1].y)>.1)};
   });assert(row.ready.ok);assert(row.ready.visible);assert.equal(row.ready.meshes,2);assert(row.ready.arrows>0);assert(row.ready.sloped);
   await frame.locator('#btn-auto-walk').click();
   row.walking=await frame.evaluate(()=>({status:navigationStatus}));assert.equal(row.walking.status,'walking');
   // Check phase behavior without relying on software WebGL frame timing.
   row.pulse=await frame.evaluate(()=>{
    const state={status:'walking',index:0},mesh=navigationArrows.group.children[1],sample=time=>{navigationArrows.update(time,state,navigationReducedMotion.matches);return Array.from(mesh.instanceColor.array)};
    const first=sample(0),second=sample(.4);return{changed:JSON.stringify(first)!==JSON.stringify(second),reduced:navigationReducedMotion.matches};
   });assert.equal(row.pulse.changed,!row.pulse.reduced);
   await frame.evaluate(()=>{
    const raf=requestAnimationFrame,render=renderer.render,getDelta=clock.getDelta;
    requestAnimationFrame=()=>0;renderer.render=()=>{};clock.getDelta=()=>.05;
    try{for(let n=0;n<50&&isAutoWalking;n++)animate();}
    finally{requestAnimationFrame=raf;renderer.render=render;clock.getDelta=getDelta;renderer.render(scene,camera)}
   });
   await page.screenshot({path:path.join(out,profile.name+'-walking.png')});
   await frame.locator('#btn-auto-walk').click();assert.equal(await frame.evaluate(()=>navigationStatus),'paused');
   row.pause=await frame.evaluate(()=>{const state={status:navigationStatus,index:autoWalkIndex},mesh=navigationArrows.group.children[1];navigationArrows.update(0,state,false);const a=Array.from(mesh.instanceColor.array);navigationArrows.update(1,state,false);return JSON.stringify(a)===JSON.stringify(Array.from(mesh.instanceColor.array))});assert(row.pause);
   await frame.locator('#btn-auto-walk').click();
   row.stairs=await frame.evaluate(()=>{
    const raf=requestAnimationFrame,render=renderer.render,getDelta=clock.getDelta;
    requestAnimationFrame=()=>0;renderer.render=()=>{};clock.getDelta=()=>.05;
    try{
     let frames=0;while(isAutoWalking&&avatarGroup.position.y<.9&&frames++<8000)animate();
     stopAutoWalk();return{status:navigationStatus,height:avatarGroup.position.y,visible:navigationArrows.group.visible};
    }finally{requestAnimationFrame=raf;renderer.render=render;clock.getDelta=getDelta;renderer.render(scene,camera)}
   });assert.equal(row.stairs.status,'paused');assert(row.stairs.height>=.9);assert(row.stairs.visible);
   await page.screenshot({path:path.join(out,profile.name+'-stairs.png')});
   await frame.locator('#btn-auto-walk').click();
   row.arrival=await frame.evaluate(()=>{
    const raf=requestAnimationFrame,render=renderer.render,getDelta=clock.getDelta;
    requestAnimationFrame=()=>0;renderer.render=()=>{};clock.getDelta=()=>.05;
    try{let frames=0;while(isAutoWalking&&frames++<8000)animate();return{status:navigationStatus,frames,visible:navigationArrows.group.visible,position:campusExplorer.getPlayerPosition()};}
    finally{requestAnimationFrame=raf;renderer.render=render;clock.getDelta=getDelta;renderer.render(scene,camera)}
   });assert.equal(row.arrival.status,'arrived');assert.equal(row.arrival.visible,false);
   await page.screenshot({path:path.join(out,profile.name+'-arrived.png')});
   row.cancel=await frame.evaluate(()=>{campusExplorer.navigateToRoom('guard',false);campusExplorer.clearNavigation();return{status:navigationStatus,meshes:navigationArrows.group.children.length,visible:navigationArrows.group.visible}});assert.equal(row.cancel.status,'cancelled');assert.equal(row.cancel.meshes,0);assert.equal(row.cancel.visible,false);
   console.log(profile.name+' passed: route, arrows, pulse, pause/resume, stairs/arrival, cleanup');
   fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));await page.close();
  }
  assert.deepEqual(report.errors,[]);
 }catch(e){report.errors.push(e.message);throw e;}
 finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1});
