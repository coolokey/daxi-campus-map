/* Keep the embedded proposal campus on the same fireworks engine; preserve other assets. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=path.join(root,'public/campus-explorer'),target=path.join(root,'public/proposal/campus/campus-explorer');
for(const file of ['anniversary-model.js','firework-text-targets.js','firework-audio.js','firework-scene.js','anniversary-fireworks.js','anniversary-fireworks.css','explorer.js','proposal-bridge.js'])fs.copyFileSync(path.join(source,file),path.join(target,file));
// The embedded copy used a previously bundled HTML entry. Rebuild from source,
// otherwise copying the modules would leave the old hashed bundle running.
fs.copyFileSync(path.join(source,'index.html'),path.join(target,'index.html'));
const html=fs.readFileSync(path.join(target,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)){
  const file=match[1];if(!fs.existsSync(path.join(target,file)))fs.copyFileSync(path.join(source,file),path.join(target,file));
}
const fontSource=path.join(source,'assets/fonts'),fontTarget=path.join(target,'assets/fonts');fs.mkdirSync(fontTarget,{recursive:true});
for(const file of fs.readdirSync(fontSource))fs.copyFileSync(path.join(fontSource,file),path.join(fontTarget,file));
const soundSource=path.join(source,'assets/sounds'),soundTarget=path.join(target,'assets/sounds');fs.mkdirSync(soundTarget,{recursive:true});
for(const file of fs.readdirSync(soundSource))if(/\.(mp3|json|md)$/.test(file))fs.copyFileSync(path.join(soundSource,file),path.join(soundTarget,file));
const rpgIndex=path.join(root,'public/proposal/rpg/index.html');let rpg=fs.readFileSync(rpgIndex,'utf8');
rpg=rpg.replaceAll('"/assets/','"./assets/');
if(!rpg.includes('anniversary-reward.js'))rpg=rpg.replace('</body>','<script defer src="./anniversary-reward.js"></script></body>');fs.writeFileSync(rpgIndex,rpg);
console.log('Synced anniversary modules and recording assets to the embedded proposal campus.');
