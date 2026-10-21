const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const base=(process.env.CAMPUS_QA_URL||'http://127.0.0.1:4187/').replace(/\/?$/,'/'),out=path.resolve(process.env.CAMPUS_QA_OUT||'qa/full-audit-20261021/recovery-local');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});const report={revision:process.env.CAMPUS_RELEASE_SHA||'local',cases:[],errors:[]};try{
 for(const route of ['','proposal/campus/']){
  const label=route?'proposal':'main';
  {
   const page=await browser.newPage({viewport:{width:1024,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+route+'?view=plan&v='+report.revision,{waitUntil:'domcontentloaded',timeout:90000});await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.campusExplorer,null,{timeout:90000});await page.locator('.campus-loading').waitFor({state:'hidden',timeout:90000});const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));
   await frame.locator('#campus-map-modal').waitFor({state:'visible'});await frame.waitForFunction(()=>document.querySelector('#campus-map-modal img').naturalWidth>1000);assert.equal(await frame.locator('#guide-landing').evaluate(e=>e.open),false);await frame.locator('#btn-close-map-modal').click();assert.deepEqual(errors,[]);report.cases.push({label:label+'-plan-deep-link',passed:true,errors});await page.close();
  }
  {
   const page=await browser.newPage({viewport:{width:390,height:844}}),expected=[];page.on('pageerror',e=>expected.push(e.message));
   await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /^(webgl2?|experimental-webgl)$/.test(type)?null:get.call(this,type,...args)}});
   await page.goto(base+route+'?v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>document.querySelector('.campus-loading.has-error'),null,{timeout:30000});const frame=page.frames().find(f=>f.url().includes('/campus-explorer/'));
   assert(await frame.locator('#campus-webgl-fallback').isVisible());const action=page.locator('.campus-loading-actions');assert(await action.isVisible());assert(await action.locator('button').isVisible());const href=await action.locator('a').getAttribute('href'),response=await page.request.get(href);assert(response.ok());assert(expected.every(e=>/WebGL|context/i.test(e)));await page.screenshot({path:path.join(out,label+'-webgl-recovery.png')});report.cases.push({label:label+'-webgl-unavailable',passed:true,expectedErrors:expected,planStatus:response.status()});await page.close();
  }
  {
   const page=await browser.newPage({viewport:{width:390,height:844}});
   await page.route('**/campus.*.js',route=>route.abort('failed'));await page.goto(base+route+'?v='+report.revision,{waitUntil:'domcontentloaded',timeout:60000});const action=page.locator('.campus-loading-actions');await action.waitFor({state:'visible',timeout:20000});assert.match(await page.locator('.campus-loading-note').innerText(),/載入時間較長/);assert(await action.locator('button').isVisible());assert((await page.request.get(await action.locator('a').getAttribute('href'))).ok());report.cases.push({label:label+'-blocked-bundle',passed:true});await page.close();
  }
  {
   const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
   await page.goto(base+route+'?viewer=legacy&v='+report.revision,{waitUntil:'domcontentloaded',timeout:90000});await page.waitForFunction(()=>document.getElementById('root')?.textContent.includes('大溪'),null,{timeout:60000});await page.waitForLoadState('networkidle',{timeout:30000});assert.deepEqual(errors,[]);report.cases.push({label:label+'-legacy-compatibility',passed:true,errors});await page.close();
  }
  fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));console.log(label+' passed: plan, unsupported WebGL, blocked bundle and legacy entry');
 }
}catch(e){report.errors.push(e.message);throw e}finally{await browser.close();fs.writeFileSync(path.join(out,'release-verification.json'),JSON.stringify(report,null,2))}console.log(JSON.stringify({cases:report.cases.length,errors:report.errors,out},null,2));})().catch(e=>{console.error(e);process.exitCode=1});
