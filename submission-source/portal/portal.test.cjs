const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('../future-campus-rpg/node_modules/jsdom');
function setup(){
 const dom=new JSDOM(fs.readFileSync(__dirname+'/index.html','utf8'),{url:'https://example.test/proposal/#home',runScripts:'outside-only',pretendToBeVisual:true});
 dom.window.scrollTo=()=>{};
 dom.window.eval(fs.readFileSync(__dirname+'/app.js','utf8'));
 const route=hash=>{dom.window.history.replaceState(null,'',hash);dom.window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));};
 return {dom,route,doc:dom.window.document};
}
test('returning to RPG retains the original iframe and homepage DOM',()=>{
 const {dom,route,doc}=setup();try{
 const hero=doc.querySelector('.hero');route('#rpg');const frame=doc.querySelector('iframe');
 route('#home');assert.equal(doc.querySelector('.hero'),hero);
 route('#rpg');assert.equal(doc.querySelector('iframe'),frame);assert.equal(frame.isConnected,true);
 }finally{dom.window.close();}
});
test('campus opens the explorer directly and retains it across destination changes',()=>{
 const {dom,route,doc}=setup();try{
 route('#campus');const frame=doc.querySelector('iframe');assert.match(frame.src,/campus\/campus-explorer\/index.html/);
 route('#campus?to=academic');assert.equal(doc.querySelector('iframe'),frame);
 }finally{dom.window.close();}
});
