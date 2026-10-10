const {chromium}=require(process.env.CAMPUS_PLAYWRIGHT_PATH || 'C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const output=path.resolve(__dirname,'../qa/anniversary');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.__qaAudio=[];
   if(window.AudioContext)window.AudioContext=new Proxy(window.AudioContext,{construct(Target,args){const instance=new Target(...args);window.__qaAudio.push(instance);return instance;}});
  });
  await page.goto(process.env.CAMPUS_QA_URL || 'http://127.0.0.1:5186/',{waitUntil:'networkidle'});
  const frame=page.frames().find(f=>f.url().includes('campus-explorer'));
  assert(frame);await frame.waitForFunction(()=>Boolean(window.campusExplorer&&document.getElementById('anniversary-launch')));
  await page.screenshot({path:path.join(output,'01-entry.png')});
  const snapshot=()=>frame.evaluate(()=>({background:window.campusExplorer.scene.background.getHex(),camera:window.campusExplorer.camera.position.toArray(),target:window.campusExplorer.controls.target.toArray(),enabled:window.campusExplorer.controls.enabled}));
  const before=await snapshot();
  await frame.locator('.anniversary-cover-entry').click();
  const dialog=frame.locator('#anniversary-dialog');await dialog.waitFor({state:'visible'});
  assert.equal(await frame.evaluate(()=>window.__qaAudio.length),0,'muted opening must not create audio');
  assert.equal(await frame.locator('#anniversary-sound').getAttribute('aria-pressed'),'false');
  await frame.locator('#anniversary-sound').click();
  await frame.waitForFunction(()=>window.__qaAudio[0]?.state==='running');
  assert.equal(await frame.locator('#anniversary-sound').getAttribute('aria-pressed'),'true');
  await frame.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
  await frame.waitForFunction(()=>window.__qaAudio[0]?.state==='suspended');
  const pausedProgress=await frame.locator('.anniversary-track i').getAttribute('style');
  await page.waitForTimeout(300);
  assert.equal(await frame.locator('.anniversary-track i').getAttribute('style'),pausedProgress,'background pauses timeline');
  await frame.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
  await frame.waitForFunction(()=>window.__qaAudio[0]?.state==='running');
  await frame.waitForFunction(()=>document.getElementById('anniversary-dialog').dataset.phase==='show');
  await page.waitForTimeout(4000);await page.screenshot({path:path.join(output,'02-fireworks.png')});
  await frame.waitForFunction(()=>document.getElementById('anniversary-dialog').dataset.phase==='finale',{},{timeout:25000});
  await page.waitForTimeout(1600);await page.screenshot({path:path.join(output,'03-eighty.png')});
  const hasGold=await frame.evaluate(()=>{
   const c=document.querySelector('#anniversary-dialog canvas'),p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;
   let count=0;for(let i=0;i<p.length;i+=4)if(p[i]>200&&p[i+1]>150&&p[i+3]>80)count++;return count>300;
  });assert(hasGold,'canvas has golden fireworks and anniversary particles');
  await frame.waitForFunction(()=>document.getElementById('anniversary-dialog').dataset.phase==='free',{},{timeout:20000});
  await frame.locator('#anniversary-fire').click();await page.waitForTimeout(1200);
  await frame.locator('#anniversary-dialog canvas').click({position:{x:320,y:220}});
  await frame.locator('#anniversary-sound').click();
  await frame.waitForFunction(()=>window.__qaAudio[0]?.state==='suspended');
  await frame.locator('#anniversary-replay').click();assert.equal(await dialog.getAttribute('data-phase'),'night');
  await frame.locator('#anniversary-close').click();
  await frame.waitForFunction(()=>document.getElementById('guide-landing').open);
  assert.equal(await frame.locator('#guide-landing').evaluate(e=>e.open),true);
  const after=await snapshot();assert.equal(after.background,before.background);assert.equal(after.enabled,before.enabled);
  before.camera.forEach((v,i)=>assert(Math.abs(v-after.camera[i])<.1,'camera restored'));
  before.target.forEach((v,i)=>assert(Math.abs(v-after.target[i])<.1,'camera target restored'));
  await frame.locator('#guide-start').click();await frame.locator('#anniversary-launch').click();
  await page.keyboard.press('Escape');assert.equal(await dialog.evaluate(e=>e.open),false);
  await frame.waitForFunction(()=>document.activeElement===document.getElementById('anniversary-launch'));
  assert.equal(await frame.locator('#anniversary-launch').evaluate(e=>e===document.activeElement),true);
  await page.setViewportSize({width:390,height:844});await frame.locator('#anniversary-launch').click();
  await frame.locator('#anniversary-sound').click();await frame.waitForFunction(()=>window.__qaAudio[0]?.state==='running');
  await page.waitForTimeout(8000);await page.screenshot({path:path.join(output,'04-mobile-fireworks.png')});
  await frame.waitForFunction(()=>document.getElementById('anniversary-dialog').dataset.phase==='finale',{},{timeout:22000});
  await page.waitForTimeout(1800);await page.screenshot({path:path.join(output,'05-mobile-eighty.png')});
  for(const id of ['sound','close','replay']){
   const box=await frame.locator('#anniversary-'+id).boundingBox();assert(box&&box.x>=0&&box.x+box.width<=390&&box.y>=0&&box.y+box.height<=844,'mobile '+id+' is reachable');
  }
  await frame.locator('#anniversary-close').click();
  await frame.waitForFunction(()=>!document.body.classList.contains('anniversary-open'));
  await page.emulateMedia({reducedMotion:'reduce'});await frame.locator('#anniversary-launch').click();
  await frame.waitForFunction(()=>document.getElementById('anniversary-dialog').dataset.phase==='free');
  await frame.locator('#anniversary-fire').click();assert((await frame.locator('#anniversary-status').textContent()).includes('收到你的祝福'));
  await page.screenshot({path:path.join(output,'06-reduced-motion.png')});await page.keyboard.press('Escape');
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'verification.json'),JSON.stringify({passed:true,checks:['muted by default','opt-in audio running','mute suspends audio','background pauses audio and timeline','night/show/finale/free timeline','gold canvas particles','sky pointer launch','keyboard-accessible launch','replay','background and camera restored','cover restored','Escape and focus return','mobile controls fit viewport','reduced motion'],errors},null,2));
  console.log('Anniversary verification passed; screenshots and report: '+output);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
