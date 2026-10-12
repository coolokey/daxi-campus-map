const {chromium}=require(process.env.CAMPUS_PLAYWRIGHT_PATH||'C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const out=path.resolve(process.env.FIREWORK_QA_OUTPUT||path.join(__dirname,'../qa/immersive-fireworks'));fs.mkdirSync(out,{recursive:true});
const base=(process.env.CAMPUS_QA_URL||'http://127.0.0.1:5187/').replace(/\/?$/,'/');
const allProfiles=[{name:'desktop',width:1440,height:960},{name:'ipad',width:1024,height:768,touch:true},{name:'mobile',width:390,height:844,touch:true}];
const profiles=process.env.FIREWORK_QA_PROFILE?allProfiles.filter(p=>p.name===process.env.FIREWORK_QA_PROFILE):allProfiles;
const expectedSounds=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/campus-explorer/assets/sounds/manifest.json'),'utf8'));
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});const report=[];
 try{
  for(const profile of profiles){
   const page=await browser.newPage({viewport:{width:profile.width,height:profile.height},hasTouch:!!profile.touch}),errors=[],missing=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error'&&/THREE.WebGLProgram|shader error/i.test(m.text()))errors.push(m.text());});
   page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))missing.push(r.status()+' '+r.url());});
   await page.goto(base,{waitUntil:'networkidle',timeout:60000});
   const frame=page.frames().find(f=>f.url().includes('campus-explorer'));assert(frame);
   await frame.waitForFunction(()=>!!window.campusAnniversary);
   const original=await frame.evaluate(()=>({bg:campusExplorer.scene.background.getHex(),exposure:campusExplorer.renderer.toneMappingExposure}));
   await frame.locator('.anniversary-cover-entry').click();
   assert.equal(await frame.evaluate(()=>document.querySelectorAll('dialog[open]').length),0,'non-modal');
   assert.equal(await frame.evaluate(()=>document.querySelectorAll('canvas').length),await frame.evaluate(()=>document.querySelectorAll('canvas:not(#anniversary-dialog canvas)').length),'no effect canvas');
   await frame.locator('#anniversary-sound').click();await frame.waitForFunction(()=>campusAnniversary.stats().soundEnabled&&campusAnniversary.stats().audio.loaded===18,null,{timeout:30000});
   console.log(profile.name+': 18 recordings decoded and sound enabled');
   const recordings=await frame.evaluate(async expected=>{
    const url=new URL('assets/sounds/manifest.json',document.baseURI);
    const manifest=await (await fetch(url,{cache:'no-cache'})).json();
    if(manifest.revision!==expected.revision)throw new Error('Outdated recording manifest');
    const entries=Object.values(expected.layers).flat();
    await Promise.all(entries.map(async entry=>{
     const resource=new URL(entry.file,url);resource.searchParams.set('v',entry.sha256.slice(0,16));
     const response=await fetch(resource);if(!response.ok)throw new Error('Audio HTTP '+response.status);
     const digest=await crypto.subtle.digest('SHA-256',await response.arrayBuffer());
     const hash=Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
     if(hash!==entry.sha256)throw new Error('Outdated/corrupt audio '+entry.file);
    }));
    return {revision:manifest.revision,verifiedHashes:entries.length,crowdSources:manifest.layers.crowd.map(e=>e.source)};
   },expectedSounds);
   // Background pauses the real controller and stops queued delayed sources.
   await frame.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
   const paused=await frame.evaluate(()=>campusAnniversary.stats().elapsed);await page.waitForTimeout(350);
   assert.equal(await frame.evaluate(()=>campusAnniversary.stats().elapsed),paused);
   assert.equal(await frame.evaluate(()=>campusAnniversary.stats().audio.active),0);
   await frame.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
   await frame.waitForFunction(()=>campusAnniversary.stats().soundEnabled);
   // Exercise actual player movement during the performance.
   await frame.evaluate(()=>{campusExplorer.setControlMode('avatar');document.activeElement.blur();});
   const before=await frame.evaluate(()=>avatarGroup.position.toArray());
   if(profile.touch){
    const box=await frame.locator('#mobile-move-stick').boundingBox();assert(box);
    const x=box.x+box.width/2,y=box.y+box.height/2;
    const cdp=await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-40,id:1}]});
    await page.waitForTimeout(650);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   }else{await page.keyboard.down('w');await page.waitForTimeout(650);await page.keyboard.up('w');}
   const after=await frame.evaluate(()=>avatarGroup.position.toArray());assert(Math.hypot(...after.map((v,i)=>v-before[i]))>.1,'player moves while fireworks run');
   assert.equal(await frame.evaluate(()=>campusExplorer.motionBlocked()),false);
   await frame.locator('#anniversary-view').click();
   await frame.waitForFunction(()=>campusAnniversary.stats().phase==='dense',null,{timeout:25000});
   await page.waitForTimeout(2000);await page.screenshot({path:path.join(out,profile.name+'-dense.png')});
   const dense=await frame.evaluate(()=>{const s=campusAnniversary.stats();return {...s,audio:{...s.audio,played:s.audio.played.slice(-5)}}});
   assert(dense.visual.bursts>0);assert(dense.audio.played.some(s=>s.kind==='near'||s.kind==='far'||s.kind==='launch'));
   await frame.waitForFunction(()=>campusAnniversary.stats().phase==='blessing',null,{timeout:25000});
   await page.screenshot({path:path.join(out,profile.name+'-eighty.png')});
   const finale=await frame.evaluate(()=>campusAnniversary.stats());assert(finale.visual.textPoints>150);
   assert((await frame.locator('#anniversary-banner').textContent()).includes('大溪國中 80 週年校慶快樂！'));
   for(const id of ['close','sound','quality','volume']){
    const b=await frame.locator('#anniversary-'+id).boundingBox();assert(b&&b.x>=0&&b.x+b.width<=profile.width+1&&b.y>=0&&b.y+b.height<=profile.height+1,'reachable '+id);
   }
   await frame.waitForFunction(()=>!campusAnniversary.stats().running,null,{timeout:15000});
   assert.equal(await frame.evaluate(()=>campusAnniversary.stats().audio.active),0);
   const restored=await frame.evaluate(()=>({bg:campusExplorer.scene.background.getHex(),exposure:campusExplorer.renderer.toneMappingExposure,fx:campusExplorer.scene.getObjectByName('daxi-anniversary-fireworks')}));
   assert.equal(restored.bg,original.bg);assert.equal(restored.exposure,original.exposure);assert(!restored.fx);
   await frame.locator('#anniversary-replay').click();assert.equal(await frame.evaluate(()=>campusAnniversary.stats().phase),'countdown');
   await page.keyboard.press('Escape');assert.equal(await frame.evaluate(()=>campusAnniversary.stats().running),false);
   assert.equal(await frame.evaluate(()=>campusAnniversary.stats().audio.active),0);
   await page.emulateMedia({reducedMotion:'reduce'});await frame.locator('#anniversary-launch').click();
   await frame.waitForFunction(()=>campusAnniversary.stats().elapsed>=5500);
   const low=await frame.evaluate(()=>campusAnniversary.stats());assert.equal(low.visual.bursts,0);assert(low.visual.textPoints>150);
   await page.screenshot({path:path.join(out,profile.name+'-reduced.png')});await frame.locator('#anniversary-close').click();
   let mix=null;
   if(profile.name==='desktop'){
    mix=await frame.evaluate(async()=>{
     const c=new OfflineAudioContext(2,44100*6,44100),engine=CampusFireworkAudio.create(c,c.destination);await engine.load();engine.setVolume(1);
     const kinds=['near','far','crackle','tail','launch','crowd'];for(let i=0;i<18;i++)engine.play(kinds[i%6]);
     const b=await c.startRendering();let peak=0,power=0;for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(const v of d){peak=Math.max(peak,Math.abs(v));power+=v*v;}}
     const result={peak,rms:Math.sqrt(power/(b.length*2)),played:engine.stats().played.length};engine.dispose();return result;
    });assert(mix.peak<.98&&mix.rms>.00001&&mix.played===18,'decoded recording mix has signal without clipping');
   }
   const meaningfulMissing=missing.filter(s=>!s.includes('favicon.ico'));
   assert.deepEqual(meaningfulMissing,[]);assert.deepEqual(errors,[]);
   report.push({profile:profile.name,passed:true,recordings,dense:{visual:dense.visual,quality:dense.quality,audio:dense.audio},mix,missing,errors});
   console.log(profile.name+': visual/audio, walking, controls, replay, reduced motion and cleanup passed');await page.close();
  }
  if(!process.env.FIREWORK_QA_PROFILE||process.env.FIREWORK_QA_PROFILE==='desktop'){
   const p=await browser.newPage({viewport:{width:1280,height:960}});await p.goto(base+'proposal/#rpg',{waitUntil:'networkidle',timeout:60000});
   const rpg=p.frames().find(f=>f.url().includes('/rpg/'));assert(rpg);await rpg.locator('#quest-start').click();
   for(const answer of [2,2,2,1,1])await rpg.locator('.choice-button').nth(answer).click();
   await rpg.locator('#anniversary-reward a').waitFor({state:'visible'});await rpg.locator('#anniversary-reward a').click();
   await p.waitForSelector('iframe[title="大溪國中立體校園導覽"]');
   const campus=await (await p.locator('iframe[title="大溪國中立體校園導覽"]').elementHandle()).contentFrame();
   await campus.waitForFunction(()=>window.campusAnniversary?.stats().unlocked===true,null,{timeout:30000});
   await campus.locator('.anniversary-cover-entry').click();assert.equal(await campus.evaluate(()=>campusAnniversary.stats().running),true);
   await campus.locator('#anniversary-close').click();report.push({profile:'proposal-rpg-reward',passed:true});console.log('Explicit RPG quest completion unlocks the embedded campus reward');await p.close();
  }
  fs.writeFileSync(path.join(out,(process.env.FIREWORK_QA_PROFILE||'all')+'-verification.json'),JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
