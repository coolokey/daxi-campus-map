/* Bird-view floor labels and cards use the same room centres as walking and the map. */
(()=>{
 const api=campusExplorer,M=CampusFloorExhibitModel,selector=document.getElementById('floor-selector');
 selector.setAttribute('aria-label','鳥瞰樓層展示');
 const title=document.createElement('span');title.className='fe-selector-title';title.textContent='樓層';selector.prepend(title);
 const listToggle=document.createElement('button');listToggle.id='fe-list-toggle';listToggle.type='button';listToggle.textContent='教室清單';listToggle.setAttribute('aria-expanded','false');selector.append(listToggle);
 const layer=document.createElement('div');layer.id='floor-exhibit-labels';document.body.append(layer);
 const summary=document.createElement('div');summary.id='fe-summary';summary.setAttribute('role','status');document.body.append(summary);
 const list=document.createElement('section');list.id='fe-list';list.hidden=true;list.setAttribute('aria-label','所選樓層完整教室清單');document.body.append(list);
 const card=document.createElement('section');card.id='fe-card';card.hidden=true;card.setAttribute('aria-label','教室資訊');document.body.append(card);
 const group=new THREE.Group();group.name='floor-exhibit-tints';api.scene.add(group);
 const cache=new Map(),tints=new Map(),headers=new Map();let selected=null,lastUpdate=0,lastSignature='',previousActive=false,lastTrigger=null;
 const active=()=>currentMode==='bird'&&currentFloorFilter!=='all';
 function button(text,action){const el=document.createElement('button');el.type='button';el.textContent=text;el.onclick=action;return el}
 const visibleRooms=()=>M.rooms(campusWalkWorld.layouts,api.rooms,currentFloorFilter);
 const clean=name=>name.replace(/\s*\(\d+F\)/,'');
 const badgeName=name=>clean(name).replace(/^(\d{3})\s+教室$/,'$1');
 function closeCard(){card.hidden=true;selected=null;lastTrigger?.focus();}
 function focusRoom(r){focusedBuildingId=r.buildingId;const p=r.center;animateCameraTo(new THREE.Vector3(p.x+25,p.y+32,p.z+35),new THREE.Vector3(p.x,p.y+1,p.z));}
 function showCard(r,trigger){lastTrigger=trigger||document.activeElement;selected=r.id;card.replaceChildren();
  const close=button('×',closeCard);close.className='fe-close';close.setAttribute('aria-label','關閉教室資訊');
  const context=document.createElement('p');context.textContent=`${r.buildingName} · ${r.floor}F`;
  const heading=document.createElement('h2');heading.textContent=clean(api.rooms[r.id].name);
  const code=document.createElement('p');code.textContent=`固定空間編號：${r.spaceCode||r.code||'未標示'}${r.codeSource==='assigned'?'（導覽編號）':''}`;
  const note=document.createElement('small');const layout=campusWalkWorld.layouts.find(l=>l.id===r.buildingId);note.textContent=r.name.includes('待確認')?'圖面文字尚待確認；保留固定編號供查找。':layout?.confidence?.includes('上層')?layout.confidence:'依 115 學年度平面圖配置；室內尺度為導覽示意。';
  const actions=document.createElement('div');actions.className='fe-card-actions';actions.append(button('查看此教室',()=>focusRoom(r)),button('步行導航',()=>{card.hidden=true;list.hidden=true;api.setControlMode('avatar');api.navigateToRoom(r.id,false)}));
  card.append(close,context,heading,code,note,actions);card.hidden=false;close.focus();
 }
 function entry(r){const el=button('',()=>showCard(r,el));el.dataset.room=r.id;el.className='fe-room';const name=document.createElement('span'),code=document.createElement('small');el.append(name,code);paint(el,r);return el}
 function paint(el,r){const name=clean(api.rooms[r.id].name);el.firstElementChild.textContent=badgeName(name);el.lastElementChild.textContent=r.spaceCode||r.code||'';el.style.setProperty('--room-color',M.color(name,r.cat));el.setAttribute('aria-label',`${r.buildingName} ${r.floor}F ${name}，固定空間編號 ${r.spaceCode||r.code||'未標示'}`);el.title=el.getAttribute('aria-label');}
 function buildList(rooms){list.replaceChildren();const heading=document.createElement('h2');heading.textContent=`${currentFloorFilter}F 教室與處室`;list.append(button('關閉清單',()=>{list.hidden=true;listToggle.setAttribute('aria-expanded','false');listToggle.focus()}),heading);
  for(const b of api.buildings){const items=rooms.filter(r=>r.buildingId===b.id);if(!items.length)continue;const h=document.createElement('h3');h.textContent=b.name;list.append(h);for(const r of items)list.append(entry(r));}
 }
 function refresh(){
  const on=active(),rooms=on?visibleRooms():[];
  selector.querySelectorAll('.floor-btn').forEach(b=>{if(b.dataset.f==='all')b.textContent='全部';b.setAttribute('aria-pressed',String(b.dataset.f===String(currentFloorFilter)));b.setAttribute('aria-label',b.dataset.f==='all'?'全部樓層外觀':`${b.dataset.f}F 樓層展示`)});
  listToggle.hidden=!on;summary.hidden=!on;layer.hidden=!on;group.visible=on;
  if(!on){list.hidden=true;card.hidden=true;selected=null;listToggle.setAttribute('aria-expanded','false');return;}
  for(const r of rooms){if(!cache.has(r.id)){
    const el=entry(r);cache.set(r.id,el);layer.append(el);
    const rect=r.rect,mat=new THREE.MeshBasicMaterial({color:M.color(r.name,r.cat),transparent:true,opacity:.28,depthWrite:false});
    const tile=new THREE.Mesh(new THREE.PlaneGeometry(Math.max(.1,rect.x1-rect.x0-.2),Math.max(.1,rect.z1-rect.z0-.2)),mat);tile.rotation.x=-Math.PI/2;tile.position.set(r.center.x,r.center.y+.025,r.center.z);tile.userData.roomId=r.id;group.add(tile);tints.set(r.id,tile);
   }paint(cache.get(r.id),r);tints.get(r.id).material.color.set(M.color(r.name,r.cat));}
  for(const [id,el]of cache){el.hidden=true;tints.get(id).visible=rooms.some(r=>r.id===id);}
  for(const [id,el]of headers)el.hidden=true;
  for(const l of campusWalkWorld.layouts.filter(l=>l.b.floors>=Number(currentFloorFilter)&&l.rooms.some(r=>r.floor===Number(currentFloorFilter)))){if(!headers.has(l.id)){const el=button('',()=>{focusedBuildingId=l.id;focusBuilding(l.b)});el.className='fe-building';layer.append(el);headers.set(l.id,el)}headers.get(l.id).textContent=`${l.b.name} ${currentFloorFilter}F`;}
  buildList(rooms);summary.textContent=`${campusRoomLayout.year} 學年度 · ${currentFloorFilter}F · ${rooms.length} 間教室與處室｜縮放查看，點標籤辨識`;
  if(selected){const r=rooms.find(r=>r.id===selected);if(r){card.querySelector('h2').textContent=clean(r.name)}else{selected=null;card.hidden=true}}
 }
 listToggle.onclick=()=>{list.hidden=!list.hidden;card.hidden=true;listToggle.setAttribute('aria-expanded',String(!list.hidden))};
 selector.querySelectorAll('.floor-btn').forEach(b=>b.onclick=()=>{document.getElementById('welcome-card').classList.add('hidden');if(currentMode!=='bird')api.setControlMode('bird');api.setFloorFilter(b.dataset.f);if(b.dataset.f!=='all'){focusedBuildingId=null;const target=new THREE.Vector3(14,(Number(b.dataset.f)-1)*3.6,20);animateCameraTo(new THREE.Vector3(innerWidth<768?-110:-45,innerWidth<768?150:108,innerWidth<768?180:135),target)}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!card.hidden)closeCard();list.hidden=true;listToggle.setAttribute('aria-expanded','false')}});
 window.addEventListener('keydown',e=>{if((!card.hidden||!list.hidden)&&['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.stopImmediatePropagation()}},true);
 function reserved(){return ['top-nav','floor-selector','minimap-card','scene-toolbar','fe-summary','fe-list','fe-card'].flatMap(id=>{const el=document.getElementById(id);if(!el||el.hidden||!el.getClientRects().length)return [];const r=el.getBoundingClientRect();return[{x:r.x,y:r.y,w:r.width,h:r.height}]})}
 function update(){const on=active();if(on!==previousActive){previousActive=on;refresh()}if(!on)return;const now=performance.now();if(now-lastUpdate<80)return;lastUpdate=now;
  const rooms=visibleRooms(),signature=`${currentFloorFilter}|${campusRoomLayout.year}|${rooms.map(r=>r.name).join('|')}`;if(signature!==lastSignature){lastSignature=signature;refresh()}
  const w=innerWidth,h=innerHeight,candidates=[];const project=(p)=>{const v=new THREE.Vector3(p.x,p.y,p.z).project(api.camera);return{x:(v.x*.5+.5)*w,y:(-v.y*.5+.5)*h,behind:v.z>1||v.z< -1}};
  for(const [id,el]of cache)el.hidden=true;for(const [id,el]of headers)el.hidden=true;
  for(const l of campusWalkWorld.layouts){const el=headers.get(l.id);if(!el||!rooms.some(r=>r.buildingId===l.id))continue;el.title=`${l.b.name} ${currentFloorFilter}F`;el.textContent=`${l.b.name.split(' / ')[0].replace('教學棟','棟').replace('與特教園地','')} ${currentFloorFilter}F`;const p=project({x:l.b.x,y:(Number(currentFloorFilter)-1)*3.6+10,z:l.b.z});candidates.push({...p,id:`building:${l.id}`,el,w:Math.min(170,el.textContent.length*11+16),h:26})}
  for(const r of [...rooms].sort((a,b)=>Number(b.buildingId===focusedBuildingId)-Number(a.buildingId===focusedBuildingId))){const el=cache.get(r.id),p=project({...r.center,y:r.center.y+2});candidates.push({...p,id:r.id,el,w:Math.min(innerWidth<768?132:168,badgeName(r.name).length*(innerWidth<768?11:12)+String(r.spaceCode||r.code||'').length*7+24),h:28})}
  for(const c of M.pack(candidates,w,h,reserved())){c.el.hidden=false;c.el.style.left=`${c.x}px`;c.el.style.top=`${c.y}px`;c.el.style.width=`${c.w}px`;}
 }
 window.campusFloorExhibit={refresh,update,get active(){return active()}};refresh();
})();
