const {chromium}=require(process.env.CAMPUS_PLAYWRIGHT_PATH||'C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[],report=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.CAMPUS_QA_URL||'http://127.0.0.1:5178/',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('iframe');const frame=await(await page.locator('iframe').elementHandle()).contentFrame();
  await frame.waitForFunction(()=>!!window.campusFloorExhibit);
  if(await frame.locator('#guide-start').isVisible())await frame.locator('#guide-start').click();
  for(const floor of ['1','2','3','4']){
   await frame.locator(`.floor-btn[data-f="${floor}"]`).click();
   await page.waitForTimeout(1800);
   const audit=await frame.evaluate(()=>{
    const rooms=CampusFloorExhibitModel.rooms(campusWalkWorld.layouts,campusExplorer.rooms,currentFloorFilter);
    const index=[...document.querySelectorAll('#fe-list [data-room]')].map(e=>e.dataset.room);
    const labels=[...document.querySelectorAll('#floor-exhibit-labels [data-room]:not([hidden])')].map(e=>e.dataset.room);
    return {floor:currentFloorFilter,total:rooms.length,index:index.length,labels:labels.length,missing:rooms.filter(r=>!index.includes(r.id)).map(r=>r.id),mapMissing:rooms.filter(r=>!labels.includes(r.id)).map(r=>r.id),open:!document.getElementById('fe-list').hidden};
   });
   assert(audit.open);assert.deepEqual(audit.missing,[]);assert.deepEqual(audit.mapMissing,[]);report.push(audit);
   if(floor==='3')await page.screenshot({path:'qa/floor-labels-complete-desktop.png'});
  }
  await frame.locator('.floor-btn[data-f="2"]').click();await page.waitForTimeout(1600);
  await frame.evaluate(()=>{campusExplorer.camera.position.set(0,60,-160);campusExplorer.camera.lookAt(14,4,20);campusExplorer.camera.updateMatrixWorld();campusFloorExhibit.update()});
  await page.waitForTimeout(250);
  const angle=await frame.evaluate(()=>({index:document.querySelectorAll('#fe-list [data-room]').length,labels:document.querySelectorAll('#floor-exhibit-labels [data-room]:not([hidden])').length}));
  assert.equal(angle.labels,angle.index);
  await page.setViewportSize({width:390,height:844});await frame.locator('.floor-btn[data-f="3"]').click();await page.waitForTimeout(1500);
  const mobile=await frame.evaluate(()=>{const list=document.getElementById('fe-list'),r=list.getBoundingClientRect();return {index:list.querySelectorAll('[data-room]').length,total:CampusFloorExhibitModel.rooms(campusWalkWorld.layouts,campusExplorer.rooms,3).length,left:r.left,right:r.right,bottom:r.bottom,height:innerHeight,open:!list.hidden}});
  assert(mobile.open);assert.equal(mobile.index,mobile.total);assert(mobile.left>=0&&mobile.right<=390&&mobile.bottom<=mobile.height);
  await page.screenshot({path:'qa/floor-labels-complete-mobile.png'});
  assert.deepEqual(errors,[]);console.log(JSON.stringify({url:page.url(),floors:report,angle,mobile,errors},null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
