const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const revision=process.env.CAMPUS_RELEASE_SHA;assert(revision,'CAMPUS_RELEASE_SHA required');
 const base='https://coolokey.github.io/daxi-campus-map/',report={revision,errors:[],warnings:[],entries:[]};
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 for(const [label,route] of [['main',''],['proposal','proposal/campus/']]){
  const page=await browser.newPage({viewport:{width:1440,height:960}});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());if(m.type()==='warning')report.warnings.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`)});
  await page.goto(base+route+'?view=overview&v='+revision,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusWalkWorld,{timeout:60000});
  const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));assert(frame);
  await frame.waitForFunction(()=>window.campusWalkWorld&&window.campusExplorer);
  await frame.evaluate(()=>{document.querySelector('#guide-landing')?.remove();document.querySelector('#welcome-card')?.remove();});
  await page.waitForTimeout(1600);
  const stats=await frame.evaluate(()=>{
   const a=window.campusExplorer,l=window.campusWalkWorld.layouts.find(l=>l.id==='new-grade7');
   return {groups:a.scene.children.filter(g=>g.name.startsWith('photo-new7-')).map(g=>({name:g.name,floor:g.userData.floorNum,building:g.userData.buildingId})),roofColor:l.b.roofColor,unreachable:Object.values(a.rooms).filter(r=>!a.findShortestPath('gate',r.node)).map(r=>r.id),roomCount:Object.keys(a.rooms).length};
  });
  assert.equal(stats.groups.length,3);assert.equal(stats.roofColor,0x91968f);assert.deepEqual(stats.unreachable,[]);
  const scripts=await frame.locator('script[src]').evaluateAll(s=>s.map(n=>n.src));
  let hasFacade=false;for(const url of scripts){const response=await page.request.get(url);if((await response.text()).includes('photo-new7-'))hasFacade=true;}assert(hasFacade,'published bundle includes new facade');
  const aim=async(position,target)=>{await frame.evaluate(({position,target})=>{cameraAnimating=false;isWalkingMode=false;const a=window.campusExplorer;a.setFloorFilter('all');a.camera.position.set(...position);a.controls.target.set(...target);a.controls.update();},{position,target});await page.waitForTimeout(800);};
  await aim([57,12,-40],[77,5,-54]);await page.screenshot({path:path.join(__dirname,`published-${label}-desktop.png`)});
  const clean=await frame.addStyleTag({content:'body > :not(canvas){visibility:hidden!important}'});
  await page.screenshot({path:path.join(__dirname,`published-${label}-building.png`)});await clean.evaluate(n=>n.remove());
  await page.setViewportSize({width:390,height:844});await aim([58,22,-26],[78,4,-54]);
  await page.screenshot({path:path.join(__dirname,`published-${label}-mobile.png`)});
  const overflow=await frame.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
  await frame.evaluate(()=>window.campusExplorer.setFloorFilter(2));await page.waitForTimeout(500);
  const floor=await frame.evaluate(()=>({active:window.campusExplorer.getFloorFilter(),visible:window.campusExplorer.scene.children.filter(g=>g.name.startsWith('photo-new7-')&&g.visible).map(g=>g.userData.floorNum)}));
  assert(floor.visible.every(f=>f===2));assert(floor.visible.includes(2));
  report.entries.push({label,url:page.url(),...stats,overflow,floor,bundleVerified:hasFacade});await page.close();
 }
 await browser.close();fs.writeFileSync(path.join(__dirname,'release-verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));assert.deepEqual(report.errors,[]);assert.deepEqual(report.warnings,[]);
})().catch(e=>{console.error(e);process.exitCode=1;});
