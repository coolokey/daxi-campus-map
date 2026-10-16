const {chromium}=require('C:/Users/MAO YU REN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('node:path');
(async()=>{
const b=await chromium.launch({channel:'msedge',headless:true,args:['--use-angle=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://127.0.0.1:5186/campus-explorer/index.html?view=overview',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.campusWalkWorld&&window.campusExplorer);await p.waitForTimeout(1800);
await p.addStyleTag({content:'body > :not(canvas){visibility:hidden!important}'});
await p.evaluate(()=>{cameraAnimating=false;isWalkingMode=false;const a=window.campusExplorer;a.camera.fov=65;a.camera.updateProjectionMatrix();a.camera.position.set(57,12,-40);a.controls.target.set(77,5,-54);a.controls.update();});
await p.waitForTimeout(1200);await p.screenshot({path:path.join(__dirname,'after-building.png')});await b.close();
})();
