import {it,expect} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {JSDOM} from 'jsdom';
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
 files.set(path.join(dist,'proposal/campus/campus-explorer/explorer.js'),fs.readFileSync('public/proposal/campus/campus-explorer/explorer.js','utf8')+'\n// independent embedded revision\n');
 const fake={readFileSync:(p:string)=>files.has(p)?files.get(p):fs.readFileSync(p.startsWith(dist+path.sep)?p.replace(dist,path.join(root,'public')):p,'utf8'),writeFileSync:(p:string,s:string)=>files.set(p,s)};
 vm.runInNewContext(fs.readFileSync('scripts/package-explorer.cjs','utf8'),{require:(name:string)=>({'node:fs':fake,'node:path':path,'node:crypto':crypto,'node:vm':vm}[name]),__dirname:path.join(root,'scripts'),console:{log(){}}});
 const shell=files.get(path.join(dist,'proposal/campus/index.html'));expect(shell).toBeDefined();
 const bundled=files.get(path.join(dist,'proposal/campus/campus-explorer/index.html'))!;const bundle=/src="(campus\.[^"]+\.js)"/.exec(bundled)![1];
 expect(shell).toContain('./campus-explorer/'+bundle);expect(shell).toContain('../../assets/main.js');expect(shell).toContain('../../assets/main.css');
 for(const [entry,viewer,base] of [['index.html','campus-explorer/index.html','https://campus.test/'],['proposal/campus/index.html','proposal/campus/campus-explorer/index.html','https://campus.test/proposal/campus/']]){
  const html=files.get(path.join(dist,entry))!,viewerHtml=files.get(path.join(dist,viewer))!,expected=crypto.createHash('sha256').update(viewerHtml).digest('hex').slice(0,12);
  const dom=new JSDOM(html,{url:base+'?view=bird',runScripts:'outside-only'});
  dom.window.eval(dom.window.document.querySelector('script:not([src])')!.textContent!);
  const url=new URL(dom.window.document.querySelector('iframe')!.src);
  expect(url.searchParams.get('build'),entry).toBe(expected);expect(url.searchParams.get('view')).toBe('bird');dom.window.close();
 }
 const portal=files.get(path.join(dist,'proposal/app.js'))!;
 expect(portal).toContain('./campus/campus-explorer/index.html?build='+crypto.createHash('sha256').update(bundled).digest('hex').slice(0,12));
 expect(files.get(path.join(dist,'proposal/index.html'))).toContain('src="./app.js?build='+crypto.createHash('sha256').update(portal).digest('hex').slice(0,12)+'"');
 for(const suffix of ['css','html']){
  const changed=new Map<string,string>(),fakeChanged={readFileSync:(p:string)=>{
   if(changed.has(p))return changed.get(p);
   if(p===path.join(dist,'index.html'))return '<html><head><script type="module" src="./assets/main.js"></script></head><body><div id="root"></div></body></html>';
   let value=fs.readFileSync(p.startsWith(dist+path.sep)?p.replace(dist,path.join(root,'public')):p,'utf8');
   if(p.endsWith('field-guide.css')&&suffix==='css')value+='\n.audit-change{color:red}';
   if(p.endsWith('campus-explorer'+path.sep+'index.html')&&suffix==='html')value=value.replace('</head>','<meta name="audit-change"></head>');
   return value;
  },writeFileSync:(p:string,s:string)=>changed.set(p,s)};
  vm.runInNewContext(fs.readFileSync('scripts/package-explorer.cjs','utf8'),{require:(name:string)=>({'node:fs':fakeChanged,'node:path':path,'node:crypto':crypto,'node:vm':vm}[name]),__dirname:path.join(root,'scripts'),console:{log(){}}});
  for(const entry of ['index.html','proposal/campus/index.html']){
   const token=(s:string)=>/build=([a-f0-9]{12})/.exec(s)?.[1];
   expect(token(changed.get(path.join(dist,entry))!),suffix+' '+entry).toBeTruthy();
   expect(token(changed.get(path.join(dist,entry))!),suffix+' '+entry).not.toBe(token(files.get(path.join(dist,entry))!));
  }
 }
});
