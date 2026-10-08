const {chromium}=require(process.env.CAMPUS_PLAYWRIGHT_PATH||'C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader']});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.CAMPUS_QA_URL||'http://127.0.0.1:5179/',{waitUntil:'networkidle'});
 const frame=page.frames().find(f=>f.url().includes('campus-explorer'));
 await frame.waitForFunction(()=>Boolean(window.campusMinimap));
 await frame.locator('#welcome-btn-enter').click();await page.waitForTimeout(1000);
 const state=()=>frame.evaluate(()=>({...document.getElementById('minimap-card').dataset}));
 const start=await state();assert.equal(start.location,'正門廣場');
 await page.keyboard.down('w');await page.waitForTimeout(700);await page.keyboard.up('w');await page.waitForTimeout(100);
 const moved=await state();assert.notEqual(moved.worldZ,start.worldZ);
 await page.screenshot({path:'qa/08-position-minimap.png'});
 await frame.locator('#minimap-card').screenshot({path:'qa/09-minimap-detail.png'});
 await frame.evaluate(()=>{const p=avatarGroup.position;camera.position.set(p.x+12,p.y+6,p.z);controls.target.copy(p);controls.update();window.campusMinimap.render()});
 const rotated=await state();assert.notEqual(rotated.heading,moved.heading);assert.equal(rotated.worldX,moved.worldX);
 await frame.evaluate(()=>{avatarGroup.position.set(-12,3.6,44);setFloorFilter(4);window.campusMinimap.render()});
 assert.equal(await frame.locator('#minimap-floor-badge').innerText(),'2F');
 assert.match(await frame.locator('.minimap-location').innerText(),/行政大樓.*2F/);
 await frame.evaluate(()=>{avatarGroup.position.set(-12,7.2,44);window.campusMinimap.render()});
 assert.equal(await frame.locator('#minimap-floor-badge').innerText(),'3F');
 await frame.evaluate(()=>{avatarGroup.position.set(0,0,96);setFloorFilter('all');setControlMode('avatar');window.campusMinimap.render()});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(1400);
 const size=await frame.locator('#minimap-card').boundingBox();assert(size.width>=120&&size.x>=0&&size.y+size.height<=844);
 await page.screenshot({path:'qa/10-minimap-mobile.png'});
 await frame.locator('#minimap-card').screenshot({path:'qa/11-minimap-mobile-detail.png'});
 const result={positionUpdates:true,headingUpdates:true,actualFloorOverridesViewer:true,mobileVisible:true,errors};
 assert.deepEqual(errors,[]);fs.writeFileSync('qa/minimap-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
