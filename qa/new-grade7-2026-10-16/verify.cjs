const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
(async()=>{
 const out=__dirname,browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 const report={errors:[],warnings:[],views:[]};
 for(const before of [true,false]){
  const page=await browser.newPage({viewport:{width:1440,height:960}});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());if(m.type()==='warning')report.warnings.push(m.text());});
  if(before)for(const file of ['campus-data.js','spatial-world.js','photo-teaching.js','static-batching.js']){
   const body=execFileSync('git',['show','HEAD:public/campus-explorer/'+file],{encoding:'utf8'});
   await page.route('**/campus-explorer/'+file,route=>route.fulfill({body,contentType:'text/javascript'}));
  }
  await page.goto('http://127.0.0.1:5186/campus-explorer/index.html?view=overview',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.campusWalkWorld&&window.campusExplorer);
  await page.evaluate(()=>{document.querySelector('#guide-landing')?.remove();document.querySelector('#welcome-card')?.remove();});
  await page.waitForTimeout(1200);
  const show=async(pos,target)=>{
   await page.evaluate(({pos,target})=>{cameraAnimating=false;isWalkingMode=false;const a=window.campusExplorer;a.setFloorFilter('all');a.camera.position.set(...pos);a.controls.target.set(...target);a.controls.update();},{pos,target});
   await page.waitForTimeout(800);
  };
  await show([46,19,-24],[80,4,-56]);
  await page.screenshot({path:path.join(out,before?'before-desktop.png':'after-desktop.png')});
  await page.addStyleTag({content:'#top-nav,#quick-bar,#bottom-toolbar,#scene-toolbar,#labels-container,#guide-panel,#spatial-room-panel,#avatar-nametag,#minimap-panel,.floor-panel,#guide-tools,#right-tools-dock{visibility:hidden!important}'});
  await show([52,12,-30],[76,4.7,-52]);
  await page.screenshot({path:path.join(out,before?'before-detail.png':'after-detail.png')});
  if(!before){
   report.rooms=await page.evaluate(()=>{const a=window.campusExplorer;return Object.values(a.rooms).filter(r=>r.buildingId==='new-grade7').map(r=>({id:r.id,reachable:!!a.findShortestPath('gate',r.node)}));});
   await page.setViewportSize({width:390,height:844});await show([46,24,-15],[80,4,-56]);
   await page.screenshot({path:path.join(out,'after-mobile.png')});
   report.views.push({viewport:'390x844',horizontalOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
   report.details=await page.evaluate(()=>({groups:window.campusExplorer.scene.children.filter(o=>o.name.startsWith('photo-new7-')).map(o=>({name:o.name,building:o.userData.buildingId,floor:o.userData.floorNum})),rooms:window.campusWalkWorld.layouts.find(l=>l.id==='new-grade7').rooms.length}));
  }
  await page.close();
 }
 fs.writeFileSync(path.join(out,'browser-verification.json'),JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;
})();
