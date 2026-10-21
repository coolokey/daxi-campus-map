/* Bundle classic scripts without changing their shared global scope or order. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),dir=path.join(dist,'campus-explorer');
let html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)];
const styles=[...html.matchAll(/<link\b[^>]*>/g)].filter(m=>/rel="stylesheet"/.test(m[0]));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,12);
const js=scripts.map(m=>`\n/* ${m[1]} */\n${fs.readFileSync(path.join(dir,m[1]),'utf8')}\n;`).join('');
new vm.Script(js); // Catch incompatible global declarations before publishing.
const css=styles.map(m=>fs.readFileSync(path.join(dir,/href="([^"]+)"/.exec(m[0])[1]),'utf8')).join('\n');
const jsName=`campus.${hash(js)}.js`,cssName=`campus.${hash(css)}.css`;
fs.writeFileSync(path.join(dir,jsName),js);fs.writeFileSync(path.join(dir,cssName),css);
for(const m of scripts)html=html.replace(m[0],'');for(const m of styles)html=html.replace(m[0],'');
html=html.replace('</head>',`<link rel="stylesheet" href="${cssName}"></head>`).replace('</body>',`<script defer src="${jsName}"></script></body>`);
fs.writeFileSync(path.join(dir,'index.html'),html);
const buildVersion=hash(html);
// Start the iframe directly from HTML; load the React entry only for legacy mode.
const entryFile=path.join(dist,'index.html');let entry=fs.readFileSync(entryFile,'utf8');
const moduleTag=entry.match(/<script\b[^>]*type="module"[^>]*><\/script>/)[0],moduleUrl=/src="([^"]+)"/.exec(moduleTag)[1];
const urlSource=fs.readFileSync(path.join(root,'src/explorer-routing.js'),'utf8').replace('export function','function');
const loadingSource=fs.readFileSync(path.join(root,'src/loading-state.js'),'utf8').replace('export function','function');
const boot=`(()=>{${urlSource}
${loadingSource}
if(new URLSearchParams(location.search).get('viewer')==='legacy'){const s=document.createElement('script');s.type='module';s.src=${JSON.stringify(moduleUrl)};document.head.append(s);return;}
const p=document.createElement('link');p.rel='preload';p.as='script';p.href='./campus-explorer/${jsName}';document.head.append(p);
const shell=document.createElement('main'),frame=document.createElement('iframe'),loading=document.createElement('div');
shell.className='campus-explorer-shell';frame.className='campus-explorer-frame';frame.title='大溪國中立體校園探索';frame.allow='fullscreen';frame.src=explorerUrl('./',location.search);frame.src+=(frame.src.includes('?')?'&':'?')+'build=${buildVersion}';
loading.className='campus-loading';loading.setAttribute('role','status');loading.setAttribute('aria-live','polite');
attachCampusLoading(frame,loading);shell.append(frame,loading);document.getElementById('root').replaceChildren(shell);})();`;
new vm.Script(boot);
entry=entry.replace(moduleTag,'').replace('</body>',`<script>${boot}</script></body>`);fs.writeFileSync(entryFile,entry);
console.log(`Campus delivery: ${scripts.length} scripts + ${styles.length} styles -> 1 script + 1 stylesheet; HTML starts viewer directly.`);
const embedded=path.join(dist,'proposal/campus/campus-explorer');
let embeddedHtml=fs.readFileSync(path.join(embedded,'index.html'),'utf8');
const embeddedScripts=[...embeddedHtml.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)];
const embeddedStyles=[...embeddedHtml.matchAll(/<link\b[^>]*>/g)].filter(m=>/rel="stylesheet"/.test(m[0]));
const embeddedJs=embeddedScripts.map(m=>`\n/* ${m[1]} */\n${fs.readFileSync(path.join(embedded,m[1]),'utf8')}\n;`).join('');
new vm.Script(embeddedJs);
const embeddedCss=embeddedStyles.map(m=>fs.readFileSync(path.join(embedded,/href="([^"]+)"/.exec(m[0])[1]),'utf8')).join('\n');
const embeddedJsName=`campus.${hash(embeddedJs)}.js`,embeddedCssName=`campus.${hash(embeddedCss)}.css`;
fs.writeFileSync(path.join(embedded,embeddedJsName),embeddedJs);fs.writeFileSync(path.join(embedded,embeddedCssName),embeddedCss);
for(const m of [...embeddedScripts,...embeddedStyles])embeddedHtml=embeddedHtml.replace(m[0],'');
embeddedHtml=embeddedHtml.replace('</head>',`<link rel="stylesheet" href="${embeddedCssName}"></head>`).replace('</body>',`<script defer src="${embeddedJsName}"></script></body>`);
fs.writeFileSync(path.join(embedded,'index.html'),embeddedHtml);
// Rebuild the alternate outer shell too; its bundle hint and routing must not fossilize.
const embeddedVersion=hash(embeddedHtml);
const nestedEntry=entry.replaceAll('./assets/','../../assets/').replaceAll(jsName,embeddedJsName).replace('build='+buildVersion,'build='+embeddedVersion);
fs.writeFileSync(path.join(dist,'proposal/campus/index.html'),nestedEntry);
const portalFile=path.join(dist,'proposal/app.js'),portalEntry=path.join(dist,'proposal/index.html');
const portal=fs.readFileSync(portalFile,'utf8').replace('./campus/campus-explorer/index.html','./campus/campus-explorer/index.html?build='+embeddedVersion);
fs.writeFileSync(portalFile,portal);
fs.writeFileSync(portalEntry,fs.readFileSync(portalEntry,'utf8').replace(/src="\.\/app\.js(?:\?[^"]*)?"/,'src="./app.js?build='+hash(portal)+'"'));
console.log('Embedded proposal campus bundled with the same anniversary engine.');
