import { beforeAll, afterAll, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';

let dom:JSDOM,context:vm.Context;
const root='public/campus-explorer/';
const run=(s:string)=>vm.runInContext(s,context,{timeout:180000});
it('creates a hat-free adult guard with a badge and long trousers',()=>{
 run(`window.guard=campusExplorer.createCharacter({role:'guard',gender:'male',outfit:'casual',shirtColor:0x465e76});`);
 expect(run(`!!guard.getObjectByName('avatar-guard-badge')`)).toBe(true);
 expect(run(`guard.scale.x`)).toBe(.72);
 expect(run(`guard.getObjectByName('avatar-shorts-left').scale.y`)).toBe(.48);
 expect(run(`guard.getObjectByName('avatar-torso').material[4].map`)).toBeNull();
 expect(run(`guard.children.some(o=>/hat|cap/.test(o.name))`)).toBe(false);
 expect(run(`!!guard.getObjectByName('security-tie')&&!!guard.getObjectByName('security-pocket-left')&&!!guard.getObjectByName('security-belt')`)).toBe(true);
 expect(run(`guard.getObjectByName('avatar-shoulder-trim').visible`)).toBe(false);
});
it('teacher outfits have distinct silhouettes and hide student uniform trims',()=>{
 run(`window.teacherStyles=['blazer','cardigan','shirt','polo'].map(clothingStyle=>campusExplorer.createCharacter({role:'teacher',clothingStyle,shirtColor:0x899b8e}));`);
 expect(run(`teacherStyles.map(t=>t.userData.clothingStyle)`)).toEqual(['blazer','cardigan','shirt','polo']);
 expect(run(`teacherStyles.every(t=>!t.getObjectByName('avatar-shoulder-trim').visible&&!t.getObjectByName('avatar-shorts-trim').visible&&!t.getObjectByName('avatar-sock').visible)`)).toBe(true);
 expect(run(`!!teacherStyles[0].getObjectByName('teacher-lapel-left')&&!!teacherStyles[1].getObjectByName('teacher-cardigan-panel-left')&&!!teacherStyles[2].getObjectByName('teacher-shirt-buttons')&&!!teacherStyles[3].getObjectByName('teacher-polo-placket')`)).toBe(true);
});
beforeAll(()=>{
 dom=new JSDOM(readFileSync(root+'index.html','utf8'),{url:'https://example.test',runScripts:'outside-only',pretendToBeVisual:true});
 // These engine tests exercise movement after the visitor has entered the guide.
 dom.window.document.getElementById('guide-landing')?.removeAttribute('open');
 const w=dom.window as any;context=dom.getInternalVMContext();
 w.requestAnimationFrame=()=>1;w.alert=()=>{};w.matchMedia=()=>({matches:false});
 w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:(t:string)=>({width:t.length*15}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}})};
 const file=(f:string)=>run(readFileSync(root+f,'utf8'));
 file('vendor/three.min.js');
 w.THREE.WebGLRenderer=class{domElement:any;shadowMap={};capabilities={getMaxAnisotropy:()=>1};constructor({canvas}:any){this.domElement=canvas}setSize(){}setPixelRatio(){}render(){}};
 file('vendor/OrbitControls.js');
 w.localStorage.setItem('daxi-avatar-appearance',JSON.stringify({gender:'female',outfit:'casual'}));
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','explorer.js','walk-world-math.js','room-layout-model.js','gym-world.js','spatial-world.js'])file(f);
},180000);
afterAll(()=>dom.window.close());
it('keeps native button Space activation while retaining WASD movement',()=>{
 const result=run(`(()=>{const b=document.createElement('button');document.body.append(b);const original=triggerJump;let jumps=0;triggerJump=()=>jumps++;setControlMode('avatar');const e=new KeyboardEvent('keydown',{key:' ',code:'Space',bubbles:true,cancelable:true});b.dispatchEvent(e);b.dispatchEvent(new KeyboardEvent('keydown',{key:'w',code:'KeyW',bubbles:true,cancelable:true}));const forward=moveInput.forward;b.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));triggerJump=original;b.remove();return {jumps,cancelled:e.defaultPrevented,forward}})()`);
 expect(result).toEqual({jumps:0,cancelled:false,forward:true});
});
it('rejects inherited room names in every public selection entry without altering a valid route',()=>{
 const result=run(`(()=>{navigateToRoom('academic');const route=currentNavPoints,focus=focusedBuildingId,bad=[];for(const id of ['__proto__','constructor','toString']){try{navigateToRoom(id);onSelectSearchRoom(id);if(currentNavPoints!==route||focusedBuildingId!==focus)bad.push(id)}catch{bad.push(id)}}clearNavigation();return bad})()`);expect(result).toEqual([]);
});
it('creates independent campus characters without changing player appearance or route',()=>{
 run(`window.playerSnapshot=avatarGroup.position.clone();window.playerHair=avatarGroup.getObjectByName('avatar-short-hair').material.color.clone();window.teacher=campusExplorer.createCharacter({role:'teacher',gender:'male',glasses:true,hairColor:0x77716b,shirtColor:0x859a88});window.student=campusExplorer.createCharacter({role:'student',gender:'female',outfit:'uniform'});`);
 expect(run(`teacher!==avatarGroup&&teacher.parent===null&&avatarGroup.position.equals(playerSnapshot)`)).toBe(true);
 expect(run(`teacher.getObjectByName('avatar-arm-left')!==avatarLeftArm`)).toBe(true);
 expect(run(`teacher.getObjectByName('avatar-short-hair').material!==avatarGroup.getObjectByName('avatar-short-hair').material`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-short-hair').material.color.equals(playerHair)`)).toBe(true);
 expect(run(`teacher.getObjectByName('avatar-glasses')?.isGroup`)).toBe(true);
 expect(run(`student.getObjectByName('avatar-long-hair').visible`)).toBe(true);
 expect(run(`!!student.getObjectByName('avatar-torso').material[4].map`)).toBe(true);
 expect(run(`teacher.getObjectByName('avatar-torso').material[4].map===null`)).toBe(true);
});
it('restores saved appearance at startup and still applies when storage is unavailable',()=>{
 expect(run(`avatarGroup.getObjectByName('avatar-short-hair')?.isMesh`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-cap')`)).toBeUndefined();
 expect(run(`campusExplorer.getAvatarAppearance()`)).toEqual({gender:'female',outfit:'casual'});
 expect(run(`avatarGroup.getObjectByName('avatar-long-hair').visible`)).toBe(true);
 run(`window.savedStorageSetter=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new Error('unavailable')};campusExplorer.setAvatarAppearance({gender:'male',outfit:'uniform'});Storage.prototype.setItem=savedStorageSetter;`);
 expect(run(`campusExplorer.getAvatarAppearance()`)).toEqual({gender:'male',outfit:'uniform'});
});
it('changes gender and clothes independently without replacing the avatar or its route',()=>{
 run(`avatarGroup.position.set(-10,0,96);navigateToRoom('academic');startAutoWalk();window.beforeAvatar=avatarGroup;window.beforePosition=avatarGroup.position.clone();window.beforeRoute=currentNavPoints;campusExplorer.setAvatarAppearance({gender:'female',outfit:'casual'});`);
 expect(run(`campusExplorer.getAvatarAppearance()`)).toEqual({gender:'female',outfit:'casual'});
 expect(run(`avatarGroup===beforeAvatar&&avatarGroup.position.equals(beforePosition)&&currentNavPoints===beforeRoute&&isAutoWalking`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-long-hair').visible`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-torso').material[4].map===null`)).toBe(true);
 expect(run(`JSON.parse(localStorage.getItem('daxi-avatar-appearance'))`)).toEqual({gender:'female',outfit:'casual'});
 run(`campusExplorer.setAvatarAppearance({outfit:'uniform'});`);
 expect(run(`campusExplorer.getAvatarAppearance().gender`)).toBe('female');
 expect(run(`!!avatarGroup.getObjectByName('avatar-torso').material[4].map`)).toBe(true);
 run(`campusExplorer.setAvatarAppearance({gender:'unknown',outfit:'unknown'});`);
 expect(run(`campusExplorer.getAvatarAppearance()`)).toEqual({gender:'female',outfit:'uniform'});
 run(`campusExplorer.setAvatarAppearance({gender:'male',outfit:'uniform'});clearNavigation();`);
});
it('keeps calibrated clothing colors stable across repeated outfit switches',()=>{
 run(`campusExplorer.setAvatarAppearance({outfit:'uniform'});window.clothing=avatarGroup.getObjectByName('avatar-sleeve-left').material;clothing.color.convertSRGBToLinear();clothing.userData.campusColorCalibrated=true;window.expectedNavy=clothing.color.clone();campusExplorer.setAvatarAppearance({outfit:'casual'});window.expectedCasual=new THREE.Color(0xc98b6c).convertSRGBToLinear();`);
 expect(run(`clothing.color.equals(expectedCasual)`)).toBe(true);
 run(`campusExplorer.setAvatarAppearance({gender:'female',outfit:'uniform'});`);
 expect(run(`clothing.color.equals(expectedNavy)`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-boy-fringe').visible`)).toBe(false);
 run(`campusExplorer.setAvatarAppearance({gender:'male',outfit:'uniform'});`);
 expect(run(`clothing.color.equals(expectedNavy)`)).toBe(true);
 expect(run(`avatarGroup.getObjectByName('avatar-boy-fringe').visible`)).toBe(true);
});
it('navigation marker stays near its target rather than accumulating a vertical offset',()=>{
 run(`setControlMode('bird');renderNavigationPath([new THREE.Vector3(-10,.6,90),new THREE.Vector3(-10,.6,96)]);clock.getElapsedTime=()=>Math.PI/8;for(let i=0;i<120;i++)animate();`);
 expect(run('navTargetPoint.position.y')).toBeCloseTo(3.2,0);
 run('clearNavigation()');
});
it('free look rotates the camera without moving or turning the standing avatar in either perspective',()=>{
 for(const mode of ['avatar','firstperson']){
  run(`stopAutoWalk();resetManualInput();setControlMode('${mode}');clock.getDelta=()=>.1;avatarAngle=0;avatarGroup.rotation.y=0;walkPitch=0;avatarGroup.position.set(-10,0,96);applyManualCameraRotation(Math.PI/.0035,0);animate();`);
  expect(run('avatarGroup.rotation.y')).toBe(0);
  expect(run('avatarGroup.position.x')).toBe(-10);expect(run('avatarGroup.position.z')).toBe(96);
  expect(run('avatarAngle')).toBeCloseTo(-Math.PI);
  if(mode==='avatar')expect(run('camera.position.z')).toBeGreaterThan(96);
  else expect(run('camera.position.z')).toBe(96);
 }
});
it('walking after free look faces and moves along the viewed direction',()=>{
 run(`stopAutoWalk();resetManualInput();setControlMode('avatar');avatarGroup.position.set(-10,0,96);avatarAngle=0;avatarGroup.rotation.y=0;walkPitch=0;applyManualCameraRotation(Math.PI/.0035,0);moveInput.forward=true;clock.getDelta=()=>.1;animate();`);
 expect(run('avatarGroup.position.z')).toBeLessThan(96);
 expect(run('avatarGroup.rotation.y')).toBeCloseTo(-Math.PI);
 run('resetManualInput()');
});
it('movement immediately takes over auto walking but typing in search does not',()=>{
 expect(run(`navigateToRoom('academic');startAutoWalk();document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));isAutoWalking`)).toBe(true);
 expect(run(`document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));isAutoWalking`)).toBe(false);
 expect(run(`document.getElementById('nav-hud').classList.contains('visible')`)).toBe(true);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));`);
});
it('resumes from the current position and preserves first person',()=>{
 run(`stopAutoWalk();avatarGroup.position.set(-10,0,96);setControlMode('firstperson');startAutoWalk();`);
 expect(run(`currentMode`)).toBe('firstperson');
 expect(run(`currentNavPoints[0].x`)).toBe(-10);
 expect(run(`currentNavPoints[0].z`)).toBe(96);
});
it('a new destination stops old walking until the user starts it',()=>{
 run(`navigateToRoom('901');`);
 expect(run(`isAutoWalking`)).toBe(false);
 expect(run(`document.getElementById('hud-target-name').textContent`)).toContain('901');
});
it('blur and mode switching stop walking and clear held inputs',()=>{
 run(`startAutoWalk();moveInput.forward=true;window.dispatchEvent(new Event('blur'));`);
 expect(run(`isAutoWalking||moveInput.forward`)).toBe(false);
 run(`startAutoWalk();moveInput.right=true;setControlMode('bird');`);
 expect(run(`isAutoWalking||moveInput.right`)).toBe(false);
});
it('direction buttons preserve first person and take over walking',()=>{
 run(`setControlMode('firstperson');startAutoWalk();document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown',{bubbles:true}));`);
 expect(run(`isAutoWalking`)).toBe(false);
 expect(run(`currentMode`)).toBe('firstperson');
 run(`document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));`);
});
it('existing settings overlays stop automatic and keyboard movement',async()=>{
 run(`setControlMode('avatar');startAutoWalk();document.getElementById('modal-speed-ctrl').classList.add('open');`);
 await Promise.resolve();
 expect(run(`isAutoWalking`)).toBe(false);
 run(`document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));`);
 expect(run(`moveInput.forward`)).toBe(false);
 run(`document.getElementById('modal-speed-ctrl').classList.remove('open');`);
});
it('analog movement keeps partial speed, caps diagonal speed and uses collision',()=>{
 run(`stopAutoWalk();setControlMode('avatar');window.campusMobileControls={move:{x:0,y:0},look:{x:0,y:0},reset(){this.move.x=this.move.y=this.look.x=this.look.y=0}};clock.getDelta=()=>.1;avatarGroup.position.set(-10,0,96);avatarAngle=Math.PI;campusMobileControls.move.y=.5;animate();`);
 expect(run(`96-avatarGroup.position.z`)).toBeCloseTo(.9);
 run(`avatarGroup.position.set(-10,0,96);campusMobileControls.move.x=1;campusMobileControls.move.y=1;animate();`);
 expect(run(`Math.hypot(avatarGroup.position.x+10,avatarGroup.position.z-96)`)).toBeCloseTo(1.8);
 run(`window.artLayout=campusWalkWorld.layouts.find(l=>l.id==='art-building');window.artRoom=artLayout.rooms.find(r=>r.floor===4);avatarGroup.position.copy(artRoom.center);avatarAngle=Math.PI/2;campusMobileControls.move.x=0;campusMobileControls.move.y=1;for(let i=0;i<10;i++)animate();`);
 const stoppedX=run(`avatarGroup.position.x`);
 run(`for(let i=0;i<10;i++)animate();`);
 expect(run(`avatarGroup.position.x`)).toBe(stoppedX);
 expect(stoppedX).toBeLessThan(run(`artLayout.bounds.x1`));
});
it('releasing a direction button does not release a held keyboard direction',()=>{
 run(`setControlMode('avatar');resetManualInput();document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown'));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup'));`);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown'));document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));`);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup'));`);
});
it('starting first-person walking cancels a previously scheduled bird-view tween',()=>{
 run(`document.getElementById('modal-speed-ctrl').classList.remove('open');window.qaFrames=[];requestAnimationFrame=fn=>(qaFrames.push(fn),1);setControlMode('bird');navigateToRoom('academic');setControlMode('firstperson');startAutoWalk();const oldFrames=qaFrames.slice();oldFrames.forEach(fn=>fn(performance.now()+2000));`);
 expect(run(`camera.position.distanceTo(avatarGroup.position.clone().add(new THREE.Vector3(0,1.55,0)))`)).toBeLessThan(.3);
 run(`requestAnimationFrame=()=>1;`);
});
it('repeated pause calls do not cause feedback mutations in a blocked overlay',async()=>{
 run(`stopAutoWalk();window.qaMutationCount=0;window.qaObserver=new MutationObserver(records=>qaMutationCount+=records.length);qaObserver.observe(document.getElementById('btn-auto-walk'),{subtree:true,attributes:true,childList:true});stopAutoWalk();stopAutoWalk();stopAutoWalk();`);
 await Promise.resolve();
 expect(run(`qaMutationCount`)).toBe(0);
 run(`qaObserver.disconnect();`);
});

it('publishes walking, paused, arrived and cancelled from actual route execution',()=>{
 run(`resetManualInput();stopAutoWalk();window.campusMobileControls?.reset();avatarGroup.position.set(-10,0,96);window.navigationEvents=[];window.addEventListener('campus:navigation',e=>navigationEvents.push(e.detail.status));navigateToRoom('academic');startAutoWalk();`);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('walking');
 run(`manualTakeover();`);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('paused');
 expect(run(`navigationEvents.includes('arrived')`)).toBe(false);
 run(`startAutoWalk();clock.getDelta=()=>.1;for(let i=0;i<1500&&isAutoWalking;i++)animate();`);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('arrived');
 expect(run(`avatarGroup.position.distanceTo(currentNavPoints.at(-1).clone().add(new THREE.Vector3(0,-.6,0)))`)).toBeLessThan(.1);
 run(`clearNavigation();for(let i=0;i<5;i++)animate();`);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('cancelled');
 expect(run(`navigationEvents.at(-1)`)).toBe('cancelled');
},20000);
it('a collision stops navigation without claiming arrival',()=>{
 run(`avatarGroup.position.set(-10,0,96);navigateToRoom('academic');startAutoWalk();window.savedCollision=moveAvatarWithCollision;moveAvatarWithCollision=()=>true;animate();moveAvatarWithCollision=savedCollision;`);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('blocked');
 expect(run(`isAutoWalking`)).toBe(false);
 run(`clearNavigation()`);
});
it('an unreachable new destination replaces the old route instead of resuming the old target',()=>{
 run(`avatarGroup.position.set(-10,0,96);navigateToRoom('academic');window.savedRoute=campusWalkWorld.route;campusWalkWorld.route=()=>null;navigateToRoom('library');campusWalkWorld.route=savedRoute;`);
 expect(run(`campusExplorer.getNavigationState().destination`)).toBe('library');
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('blocked');
 expect(run(`currentNavPoints.length`)).toBe(0);
 expect(run(`navTargetPoint.visible`)).toBe(false);
 expect(run(`document.getElementById('hud-target-name').textContent`)).toContain('圖書');
 run(`clearNavigation()`);
});
it('player movement consults people collisions and automatic walking waits instead of cancelling',()=>{
 run(`avatarGroup.position.set(-10,0,96);window.campusPeople={blocksPlayer:()=>true,update:()=>{}};window.peoplePosition=avatarGroup.position.clone();moveAvatarWithCollision(avatarGroup.position,8,0);`);
 expect(run(`avatarGroup.position.equals(peoplePosition)`)).toBe(true);
 run(`navigateToRoom('academic');startAutoWalk();animate();`);
 expect(run(`isAutoWalking`)).toBe(true);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('walking');
 run(`for(let i=0;i<35;i++)animate();`);
 expect(run(`isAutoWalking`)).toBe(false);
 expect(run(`campusExplorer.getNavigationState().status`)).toBe('blocked');
 expect(run(`document.getElementById('mode-toast').textContent`)).toContain('前方有人');
 run(`delete window.campusPeople;clearNavigation();`);
});
it('walking across the side of a stair cannot drop the player to a lower floor',()=>{
 run(`window.stairFalls=[];for(const l of campusWalkWorld.layouts)for(const r of l.ramps||[])for(const direction of [-1,1])for(const jumping of [false,true]){
 const middle=CampusWalkMath.rampPoint(r,.55);avatarGroup.position.set(middle.x,middle.y+(jumping?.55:0),middle.z);isJumping=jumping;
 moveAvatarWithCollision(avatarGroup.position,r.axis==='z'?direction*4:0,r.axis==='x'?direction*4:0);
 const support=campusWalkWorld.ground(avatarGroup.position);
 if(support<middle.y-.35)stairFalls.push({building:l.id,floor:r.floor,from:middle.y,to:support,jumping,direction});
 }isJumping=false;`);
 expect(run(`stairFalls`)).toEqual([]);
});
it('every stair flight and switchback landing supports ordinary walking up and down',()=>{
 run(`window.stairWalkIssues=[];for(const l of campusWalkWorld.layouts)for(const s of l.stairs||[])for(let f=1;f<l.b.floors;f++){
 const ramps=l.ramps.filter(r=>r.stairId===s.id&&r.floor===f),points=[];
 for(const r of ramps)for(let i=0;i<=36;i++)points.push(CampusWalkMath.rampPoint(r,i/36));
 for(const route of [points,[...points].reverse()])for(const automatic of [false,true]){
 avatarGroup.position.set(route[0].x,route[0].y,route[0].z);isJumping=false;
 for(const p of route.slice(1)){moveAvatarWithCollision(avatarGroup.position,p.x-avatarGroup.position.x,p.z-avatarGroup.position.z,automatic?p.y-avatarGroup.position.y:0);
 if(Math.abs(avatarGroup.position.y-p.y)>.2||Math.hypot(avatarGroup.position.x-p.x,avatarGroup.position.z-p.z)>.2){stairWalkIssues.push({stair:s.id,floor:f,expected:p,actual:avatarGroup.position.clone()});break}}
 }} `);
 expect(run(`stairWalkIssues`)).toEqual([]);
},20000);
it('diagonal joystick drift slides along the stair edge while keeping forward movement',()=>{
 run(`window.stairSlideIssues=[];for(const l of campusWalkWorld.layouts)for(const r of l.ramps||[])for(const side of [-1,1]){
 const p=CampusWalkMath.rampPoint(r,.5),axis=r.axis,forward=Math.sign(r.end[axis]-r.start[axis])*.5;
 avatarGroup.position.set(p.x,p.y,p.z);isJumping=false;
 moveAvatarWithCollision(avatarGroup.position,axis==='x'?forward:side*3,axis==='z'?forward:side*3);
 if(Math.abs(avatarGroup.position[axis]-p[axis]-forward)>.15||campusWalkWorld.ground(avatarGroup.position)<p.y-.35)stairSlideIssues.push({building:l.id,floor:r.floor});
 }`);
 expect(run(`stairSlideIssues`)).toEqual([]);
});
it('real campus teacher patrols respect walls, furniture and office floor boundaries',()=>{
 // Physics simulation in bird view avoids unrelated name-tag occlusion raycasts.
 run(`document.body.dataset.controlMode='bird';`);
 run(`window.walkSeed=29;Math.random=()=>{walkSeed=walkSeed*16807%2147483647;return walkSeed/2147483647};`);
 run(readFileSync(root+'staff-data.js','utf8'));
 run(readFileSync(root+'campus-people.js','utf8'));
 run(`window.initialTeacherPositions=new Map(campusPeople.actors.filter(a=>a.person).map(a=>[a.id,{...a.position}]));window.initialStudentPositions=new Map(campusPeople.actors.filter(a=>a.spec.role==='student').map(a=>[a.id,{...a.position}]));window.invalidPeople=[];
 for(let i=0;i<200;i++){
 campusPeople.update(.1,i*.1);
 for(const a of campusPeople.actors){
 if(campusCollisionIndex.hit(a.position.x,a.position.y,a.position.z))invalidPeople.push(a.id);
 if(a.room){const q=a.layout.local(a.position.x,a.position.z);if(q.u<=a.room.u0+.6||q.u>=a.room.u1-.6||q.v<=a.room.v0+.6||q.v>=a.room.v1-.6)invalidPeople.push(a.id)}
 for(const b of campusPeople.actors)if(a!==b&&Math.abs(a.position.y-b.position.y)<1.8&&Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z)<1.05)invalidPeople.push(a.id+' overlaps '+b.id);
 }} `);
 expect(run(`invalidPeople`)).toEqual([]);
 expect(run(`campusPeople.actors.filter(a=>a.person).length`)).toBe(6);
 expect(run(`campusPeople.actors.some(a=>a.person&&Math.hypot(a.position.x-initialTeacherPositions.get(a.id).x,a.position.z-initialTeacherPositions.get(a.id).z)>.1)`)).toBe(true);
 run(`window.studentRanges=new Map();for(let i=200;i<1000;i++){campusPeople.update(.1,i*.1);for(const a of campusPeople.actors){
 if(campusCollisionIndex.hit(a.position.x,a.position.y,a.position.z))invalidPeople.push(a.id);
 for(const b of campusPeople.actors)if(a!==b&&Math.abs(a.position.y-b.position.y)<1.8&&Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z)<1.05)invalidPeople.push(a.id+' overlaps '+b.id);
 if(a.spec.role==='student'){const start=initialStudentPositions.get(a.id);studentRanges.set(a.id,Math.max(studentRanges.get(a.id)||0,Math.hypot(a.position.x-start.x,a.position.z-start.z)))}}}`);
 expect(run(`invalidPeople`)).toEqual([]);
 expect(run(`[...studentRanges.values()].filter(d=>d>18).length`)).toBeGreaterThanOrEqual(8);
 run(`delete window.campusPeople;`);
},60000);
