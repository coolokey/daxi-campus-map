import {it,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root=process.cwd();
it('updates an existing referenced stylesheet in the embedded release',()=>{
 const copies:string[]=[],writes=new Map<string,string>();
 const fake={...fs,copyFileSync:(a:string,b:string)=>{copies.push(path.basename(a));writes.set(b,fs.readFileSync(a,'utf8'))},writeFileSync:()=>{},mkdirSync:()=>{},existsSync:()=>true};
 vm.runInNewContext(fs.readFileSync('scripts/sync-anniversary.cjs','utf8'),{require:(name:string)=>name==='node:fs'?fake:name==='node:path'?path:null,__dirname:path.join(root,'scripts'),console:{log(){}}});
 expect(copies).toContain('art-direction.css');expect(copies).toContain('firework-scene.js');
});
it('rebuilds the nested shell with its current bundle and resolves shared legacy assets',()=>{
 const files=new Map<string,string>(),dist=path.join(root,'dist');
 files.set(path.join(dist,'index.html'),'<html><head><link href="./assets/main.css" rel="stylesheet"><script type="module" src="./assets/main.js"></script></head><body><div id="root"></div></body></html>');
 const fake={readFileSync:(p:string)=>files.has(p)?files.get(p):fs.readFileSync(p.startsWith(dist+path.sep)?p.replace(dist,path.join(root,'public')):p,'utf8'),writeFileSync:(p:string,s:string)=>files.set(p,s)};
 vm.runInNewContext(fs.readFileSync('scripts/package-explorer.cjs','utf8'),{require:(name:string)=>({'node:fs':fake,'node:path':path,'node:crypto':crypto,'node:vm':vm}[name]),__dirname:path.join(root,'scripts'),console:{log(){}}});
 const shell=files.get(path.join(dist,'proposal/campus/index.html'));expect(shell).toBeDefined();
 const bundled=files.get(path.join(dist,'proposal/campus/campus-explorer/index.html'))!;const bundle=/src="(campus\.[^"]+\.js)"/.exec(bundled)![1];
 expect(shell).toContain('./campus-explorer/'+bundle);expect(shell).toContain('../../assets/main.js');expect(shell).toContain('../../assets/main.css');
});
