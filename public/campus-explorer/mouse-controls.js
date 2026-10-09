/* Mouse-only input. OrbitControls owns bird gestures; touch keeps the mobile motor. */
(()=>{
 const canvas=renderer.domElement,M=CampusMouseModel,key='daxi-mouse-settings-v1';
 let pointer=null,last=null,inside=false,x=0,paused=false,pendingX=0,pendingY=0,distance=6.5,fallback=false,lockedAt=0;
 const walking=()=>currentMode==='avatar'||currentMode==='firstperson';
 const blocked=()=>motionBlocked()||!!document.querySelector('#fe-card:not([hidden]),#fe-list:not([hidden])');
 const hint=document.createElement('div');hint.id='mouse-look-hint';hint.setAttribute('role','status');document.body.append(hint);
 canvas.tabIndex=0;canvas.setAttribute('aria-label','校園場景：鳥瞰可拖曳旋轉與平移；步行可拖曳轉頭');
 const option=document.createElement('option');option.value='lock';option.textContent='點擊鎖定游標轉頭（Esc 解除）';selectMouseTurn.append(option);
 selectMouseTurn.querySelector('[value="move"]').textContent='移動滑鼠轉頭（點擊或 Esc 暫停）';
 function show(){const locked=document.pointerLockElement===canvas;hint.hidden=blocked()||(currentMode==='bird'&&window.campusFloorExhibit?.active);const text=currentMode==='bird'?'左鍵旋轉 · 右鍵／Shift＋左鍵平移 · 滾輪縮放':locked?'移動滑鼠轉頭 · Esc 解除鎖定 · [／] 靈敏度':mouseTurnMode==='move'?(paused?'轉頭已暫停，點一下場景繼續':'移動滑鼠轉頭 · 左右邊緣持續轉向 · 點擊／Esc 暫停'):mouseTurnMode==='lock'?(fallback?'游標鎖定不可用，按住左鍵拖曳轉頭':'點一下場景鎖定游標 · 也可按住左鍵拖曳 · Esc 解除'):`按住${mouseTurnMode==='right'?'右':'左'}鍵拖曳轉頭 · 放開停止${currentMode==='avatar'?' · 滾輪調整跟隨距離':''}`;if(hint.textContent!==text)hint.textContent=text;}
 function save(){try{localStorage.setItem(key,JSON.stringify({mode:mouseTurnMode,sens:turnSensitivityMultiplier,invert:isInvertY,speed:avatarSpeedMultiplier}))}catch{}}
 function clear(exit=true){const id=pointer;pointer=null;last=null;inside=false;pendingX=pendingY=0;if(id!==null)try{if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id)}catch{}if(exit&&document.pointerLockElement===canvas)document.exitPointerLock?.();show()}
 function reset(){paused=mouseTurnMode==='move';clear()}
 function add(dx,dy){if(!Number.isFinite(dx)||!Number.isFinite(dy)||Math.hypot(dx,dy)>3000)return;if(dx||dy){manualTakeover();pendingX+=dx;pendingY+=dy}}
 function lock(){fallback=false;if(!canvas.requestPointerLock){fallback=true;show();return}try{const result=canvas.requestPointerLock();result?.catch?.(()=>{fallback=true;show()})}catch{fallback=true;show()}}
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||!walking()||blocked())return;canvas.focus({preventScroll:true});
  if(mouseTurnMode==='move'){if(e.button===0){paused=!paused;pendingX=pendingY=0;last={x:e.clientX,y:e.clientY};inside=!paused;x=e.clientX;show()}return}
  if(e.button!==(mouseTurnMode==='right'?2:0))return;
  pointer=e.pointerId;last={x:e.clientX,y:e.clientY};inside=true;x=e.clientX;try{canvas.setPointerCapture(e.pointerId)}catch{}
  if(mouseTurnMode==='lock'&&document.pointerLockElement!==canvas)lock();
 });
 canvas.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!walking()||blocked())return;
  if(document.pointerLockElement===canvas){if(performance.now()-lockedAt>120)add(e.movementX||0,e.movementY||0);return}
  if(mouseTurnMode==='move'){if(!paused&&last)add(e.clientX-last.x,e.clientY-last.y);last={x:e.clientX,y:e.clientY};inside=!paused;x=e.clientX;return}
  if(pointer!==e.pointerId||!last)return;add(e.clientX-last.x,e.clientY-last.y);last={x:e.clientX,y:e.clientY};x=e.clientX;
 });
 function release(e){if(e.pointerId!==pointer)return;if(e.type==='pointerup'&&walking()&&!blocked()&&document.pointerLockElement!==canvas&&(pendingX||pendingY))applyManualCameraRotation(pendingX,pendingY);clear(false)}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,release);
 canvas.addEventListener('pointerleave',()=>{if(pointer===null){inside=false;last=null;pendingX=pendingY=0}});
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 canvas.addEventListener('wheel',e=>{if(!walking())return;e.preventDefault();if(!blocked()&&currentMode==='avatar')distance=M.zoom(distance,e.deltaY,e.deltaMode)},{passive:false});
 document.addEventListener('pointerlockchange',()=>{lockedAt=performance.now();clear(false);show()});
 document.addEventListener('pointerlockerror',()=>{fallback=true;clear(false);show()});
 window.addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
 for(const el of [sliderTurn,sliderSpeed,checkInvertY,selectMouseTurn])el.addEventListener(el.tagName==='SELECT'||el.type==='checkbox'?'change':'input',()=>{if(el===selectMouseTurn){clear();paused=false;fallback=false}save();show()});
 btnResetTurn.addEventListener('click',()=>{clear();paused=false;fallback=false;save();show()});btnResetSpeed.addEventListener('click',save);
 document.addEventListener('keydown',e=>{if(e.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;if(e.key==='Escape'&&walking()){paused=true;clear();show()}if(walking()&&!blocked()&&(e.key==='['||e.key===']')){e.preventDefault();sliderTurn.value=String(Math.max(20,Math.min(300,Number(sliderTurn.value)+(e.key===']'?5:-5))));sliderTurn.dispatchEvent(new Event('input',{bubbles:true}));}});
 function update(dt){if(!walking()||blocked()){if(pointer!==null||inside||pendingX||pendingY||document.pointerLockElement===canvas)reset();show();return}
  const locked=document.pointerLockElement===canvas;if(!locked&&inside&&((mouseTurnMode==='move'&&!paused&&!isAutoWalking)||pointer!==null)){const rect=canvas.getBoundingClientRect(),edge=M.edge(x-rect.left,rect.width,turnSensitivityMultiplier);if(edge)add(edge*dt/.0035/Math.max(.2,turnSensitivityMultiplier),0)}
  const t=M.damp(dt),dx=pendingX*t,dy=pendingY*t;pendingX-=dx;pendingY-=dy;if(Math.abs(pendingX)+Math.abs(pendingY)<.001)pendingX=pendingY=0;if(dx||dy)applyManualCameraRotation(dx,dy);show();
 }
 try{const prefs=JSON.parse(localStorage.getItem(key));if(prefs&&typeof prefs==='object'){selectMouseTurn.value=['left','right','move','lock'].includes(prefs.mode)?prefs.mode:'left';sliderTurn.value=String(Math.max(20,Math.min(300,Number(prefs.sens)*100||100)));sliderSpeed.value=String(Math.max(50,Math.min(200,Number(prefs.speed)*100||100)));checkInvertY.checked=prefs.invert===true;for(const el of [selectMouseTurn,sliderTurn,sliderSpeed,checkInvertY])el.dispatchEvent(new Event(el===selectMouseTurn||el===checkInvertY?'change':'input',{bubbles:true}));}}catch{}
 window.campusMouse={reset,update,get distance(){return distance},get paused(){return paused}};show();
})();
