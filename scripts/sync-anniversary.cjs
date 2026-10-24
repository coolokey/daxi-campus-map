/* Keep the embedded proposal campus on the same fireworks engine; preserve other assets. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=path.join(root,'public/campus-explorer'),target=path.join(root,'public/proposal/campus/campus-explorer');
fs.copyFileSync(path.join(source,'mobile-layout.css'),path.join(target,'mobile-layout.css'));
for(const file of ['anniversary-model.js','firework-text-targets.js','firework-audio.js','firework-scene.js','anniversary-fireworks.js','anniversary-fireworks.css','explorer.js','proposal-bridge.js','field-guide.js','field-guide.css','navigation-guide-model.js','floor-exhibit.js','floor-exhibit.css'])fs.copyFileSync(path.join(source,file),path.join(target,file));
for(const file of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','gym-world.js','spatial-world.js','photo-facade.js','photo-reference.js','photo-teaching.js','photo-roofs.js','art-direction.js','landscape-world.js','outdoor-world.js','grid-search.js','room-layout-model.js','room-layout.js','static-batching.js','spatial-ui-tools.js'])fs.copyFileSync(path.join(source,file),path.join(target,file));
// The embedded copy used a previously bundled HTML entry. Rebuild from source,
// otherwise copying the modules would leave the old hashed bundle running.
fs.copyFileSync(path.join(source,'index.html'),path.join(target,'index.html'));
fs.copyFileSync(path.join(source,'creator-avatar.png'),path.join(target,'creator-avatar.png'));
const html=fs.readFileSync(path.join(target,'index.html'),'utf8');
for(const file of ['gate.html','gate-guide.css','gate-guide.js','gate-guide-model.js'])fs.copyFileSync(path.join(source,file),path.join(target,file));
for(const file of ['staff-data.js','campus-people.js','campus-people.css'])fs.copyFileSync(path.join(source,file),path.join(target,file));
const staffTarget=path.join(target,'assets/staff');fs.mkdirSync(staffTarget,{recursive:true});
for(const file of fs.readdirSync(path.join(source,'assets/staff')))fs.copyFileSync(path.join(source,'assets/staff',file),path.join(staffTarget,file));
for(const file of ['avatar-appearance-ui.js','avatar-appearance.css'])fs.copyFileSync(path.join(source,file),path.join(target,file));
for(const match of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)){
  const file=match[1];fs.copyFileSync(path.join(source,file),path.join(target,file));
}
const fontSource=path.join(source,'assets/fonts'),fontTarget=path.join(target,'assets/fonts');fs.mkdirSync(fontTarget,{recursive:true});
for(const file of fs.readdirSync(fontSource))fs.copyFileSync(path.join(fontSource,file),path.join(fontTarget,file));
const soundSource=path.join(source,'assets/sounds'),soundTarget=path.join(target,'assets/sounds');fs.mkdirSync(soundTarget,{recursive:true});
for(const file of fs.readdirSync(soundSource))if(/\.(mp3|json|md)$/.test(file))fs.copyFileSync(path.join(soundSource,file),path.join(soundTarget,file));
const rpgIndex=path.join(root,'public/proposal/rpg/index.html');let rpg=fs.readFileSync(rpgIndex,'utf8');
rpg=rpg.replaceAll('"/assets/','"./assets/');
if(!rpg.includes('anniversary-reward.js'))rpg=rpg.replace('</body>','<script defer src="./anniversary-reward.js"></script></body>');fs.writeFileSync(rpgIndex,rpg);
console.log('Synced anniversary modules and recording assets to the embedded proposal campus.');
