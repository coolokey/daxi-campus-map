/* CPU-only scene profile: the same jsdom/WebGL stubs as spatial verification.
 * Optional first argument: a Git commit to use for spatial-world.js baseline.
 */
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const baseline=process.argv[2];if(baseline&&!/^[a-f0-9]{7,40}$/.test(baseline))throw Error('Use a commit SHA');
const old=baseline?cp.execFileSync('git',['show',`${baseline}:public/campus-explorer/spatial-world.js`],{cwd:path.resolve(__dirname,'..'),encoding:'utf8'}):null;
const verifier=fs.readFileSync(path.join(__dirname,'verify-spatial-world.cjs'),'utf8');
let source=verifier.slice(0,verifier.indexOf('const report='));
source=source.replace('function run(file){vm.runInContext', 'const timings=[];function run(file){const started=performance.now();vm.runInContext');
source=source.replace("fs.readFileSync(path.join(root,file),'utf8'),context", "file==='spatial-world.js'&&baselineSource!==null?baselineSource:fs.readFileSync(path.join(root,file),'utf8'),context");
source=source.replace('timeout:180000})}', 'timeout:180000});timings.push({file,ms:Math.round(performance.now()-started)})}');
source+='console.log(JSON.stringify({baseline:baselineLabel,timings,totalMs:timings.reduce((n,t)=>n+t.ms,0)},null,2));dom.window.close();';
new Function('require','__dirname','baselineSource','baselineLabel',source)(require,__dirname,old,baseline||'optimized');
