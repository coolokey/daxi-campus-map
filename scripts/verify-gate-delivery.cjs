/* Read-only delivery checks. Run after build; set CAMPUS_QA_URL for Pages. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:5189/';
const paths=['campus-explorer/','proposal/campus/campus-explorer/'];
(async()=>{
 const result={base,checkedAt:new Date().toISOString(),pages:[],errors:[]};
 for(const folder of paths){
  const url=new URL(folder+'gate.html',base),response=await fetch(url),html=await response.text();
  const page={url:String(url),status:response.status,assets:[]};result.pages.push(page);
  try{
   assert.equal(response.status,200);assert(html.includes('id="gate-search"'),'lightweight gate page exists');
   assert(!/vendor\/three|campus\.[a-f0-9]+\.js/.test(html),'text guide does not load WebGL');
   for(const asset of [...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|webp)(?:\?[^"#]*)?)"/g)].map(m=>m[1]).concat('photos/admin-front.jpg')){
    const target=new URL(asset,url),r=await fetch(target,{method:'HEAD'});page.assets.push({url:String(target),status:r.status});assert.equal(r.status,200,'asset '+asset);
   }
   assert.equal(page.assets.length,8);
   const index=await fetch(new URL(folder+'index.html',base));const indexHtml=await index.text();assert(indexHtml.includes('href="gate.html"'),'homepage offers gate entry');
  }catch(error){result.errors.push(error.message);}
 }
 const output=path.join(root,'qa/gate-office-guide-2026-10-22');fs.mkdirSync(output,{recursive:true});
 fs.writeFileSync(path.join(output,process.env.CAMPUS_QA_URL?'published-assets.json':'local-assets.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));assert.deepEqual(result.errors,[]);
})().catch(error=>{console.error(error);process.exitCode=1});
