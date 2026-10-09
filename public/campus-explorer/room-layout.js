/* Local annual room names; immutable destination IDs keep navigation stable. */
(() => {
 const M=CampusRoomLayout,api=campusExplorer;
 const aliases=()=>typeof CampusSpatialData==='undefined'?{}:CampusSpatialData.aliases||{};
 const order=['admin-front','admin-back','new-grade7','grade8-front','grade8-mid','grade9-back','multi-building','tech-building','art-building','health-bld','gym-bld','recycle-bld'];
 const buildings=[...api.buildings].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
 const rooms=buildings.flatMap(b=>b.rooms.map(r=>({...r,name:r.name.replace(/\s*\(\d+F\)/,'')}))),base=M.normalize(null,rooms);
 const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
 let year=115,filter='all',saved={},draft={},saveError='',lastFocus=null;
 const drafts=new Map(),originalNames=new Map(Object.values(api.rooms).map(r=>[r.id,r.name]));
 function read(){try{saveError='';return M.parse(localStorage.getItem(M.key(year)),rooms,aliases())}catch{saveError='瀏覽器無法使用本機儲存，仍可檢視配置。';return {...base}}}
 const dirty=()=>rooms.some(r=>draft[r.id]!==saved[r.id]);
 const actions=document.querySelector('.top-actions');
 document.getElementById('btn-mode-toggle').hidden=true;
 const controls=document.createElement('div');controls.id='campus-main-controls';
 controls.innerHTML='<button id="btn-walk" type="button">步行</button><button id="btn-bird" type="button">鳥瞰 <kbd>M</kbd></button><button id="btn-perspective" type="button"><span>第三人稱</span> <kbd>V</kbd></button><button id="btn-room-layout" type="button">編輯教室</button>';
 actions.prepend(controls);
 const help=document.getElementById('btn-help');help.textContent='？';help.setAttribute('aria-label','操作說明');
 const search=document.getElementById('search-input');search.placeholder='找教室或地點：701、健康中心、教務處…';
 const icon=document.querySelector('.search-icon');icon.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>';
 const quick=document.getElementById('quick-bar');
 quick.replaceChildren();const quickTitle=document.createElement('p');quickTitle.textContent='常用研習與會議場地';quick.append(quickTitle);
 for(const id of ['computer-lab-2','audiovisual-1f','history-room','library']){const btn=document.createElement('button');btn.type='button';btn.dataset.to=id;btn.textContent=api.rooms[id].name.replace(/\s*\(\d+F\)/,'');btn.onclick=()=>{api.navigateToRoom(id);quick.classList.remove('open')};quick.append(btn);}
 document.querySelector('.search-box').append(quick);
 search.addEventListener('focus',()=>quick.classList.toggle('open',!search.value));
 search.addEventListener('input',()=>quick.classList.toggle('open',document.activeElement===search&&!search.value));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.search-box'))quick.classList.remove('open')});
 function sync(){document.getElementById('btn-walk').classList.toggle('selected',currentMode!=='bird');document.getElementById('btn-bird').classList.toggle('selected',currentMode==='bird');document.querySelector('#btn-perspective span').textContent=currentMode==='firstperson'?'第一人稱':'第三人稱';for(const id of ['btn-walk','btn-bird'])document.getElementById(id).setAttribute('aria-pressed',document.getElementById(id).classList.contains('selected'));}
 const mode=m=>{document.getElementById('welcome-card').classList.add('hidden');api.setControlMode(m);sync()};
 document.getElementById('btn-walk').onclick=()=>mode(currentMode==='firstperson'?'firstperson':'avatar');
 document.getElementById('btn-bird').onclick=()=>mode('bird');
 document.getElementById('btn-perspective').onclick=()=>mode(currentMode==='firstperson'?'avatar':'firstperson');
 new MutationObserver(sync).observe(document.getElementById('btn-mode-text'),{childList:true,subtree:true,characterData:true});sync();
 const dialog=document.createElement('dialog');dialog.id='room-layout-dialog';dialog.setAttribute('aria-labelledby','room-layout-title');
 dialog.innerHTML='<header class="rl-header"><div class="rl-title-row"><h2 id="room-layout-title">教室配置</h2><label><input id="rl-year" type="number" value="115" min="100" max="200" aria-label="學年度"> 學年度</label></div><p>格子左上角為固定空間編號；中間的名稱可以直接修改。<br>輸入三碼班級（例如 701）會自動套用年級顏色。</p><button id="rl-close" type="button" aria-label="關閉教室配置">×</button></header><div class="rl-storage"><p>目前使用本機配置，修改只儲存在此瀏覽器。</p><a href="campus_plan_115.jpg" target="_blank" rel="noopener">115 校園平面圖 ↗</a></div><nav id="rl-tabs" aria-label="篩選校舍"></nav><div class="rl-scroll"><div class="rl-legend"></div><div id="rl-buildings"></div></div><footer class="rl-footer"><span id="rl-status" role="status"></span><button id="rl-restore" type="button">還原</button><button id="rl-save" type="button">儲存</button></footer>';
 document.body.append(dialog);
 const tabs=dialog.querySelector('#rl-tabs'),list=dialog.querySelector('#rl-buildings'),status=dialog.querySelector('#rl-status');
 for(const [cat,text] of Object.entries({grade7:'七年級',grade8:'八年級',grade9:'九年級',admin:'處室',special:'專科・館室',other:'其他空間'})){const item=document.createElement('span'),dot=document.createElement('i');dot.style.background=colors[cat];item.append(dot,document.createTextNode(text));dialog.querySelector('.rl-legend').append(item);}
 function updateStatus(){const changed=dirty();status.textContent=saveError|| (changed?'有未儲存的修改':year===115?(rooms.some(r=>saved[r.id]!==base[r.id])?'已載入本機配置':'尚未修改・依 115 學年度配置'):`${year} 學年度・以 115 空間配置為基礎`);dialog.querySelector('#rl-save').disabled=!changed;dialog.querySelector('#rl-restore').disabled=!changed;}
 function renderTabs(){tabs.replaceChildren();for(const [id,name] of [['all','全部'],...buildings.map(b=>[b.id,b.name.replace(/\s*\/\s*/g,'・')])]){const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('aria-pressed',id===filter);button.classList.toggle('selected',id===filter);button.onclick=()=>{filter=id;renderTabs();renderBuildings()};tabs.append(button);}}
 function paint(cell,name,cat){cell.style.setProperty('--room-color',colors[M.category(name,cat)]);}
 function renderBuildings(){list.replaceChildren();for(const b of buildings.filter(b=>filter==='all'||b.id===filter)){
  const section=document.createElement('section');section.className='rl-building';section.dataset.building=b.id;
  const heading=document.createElement('h3');heading.textContent=b.name;const range=document.createElement('small');range.textContent=b.floors===1?'1F':`1F–${b.floors}F`;heading.append(range);section.append(heading);
  const scroll=document.createElement('div');scroll.className='rl-floor-scroll';const grid=document.createElement('div');grid.className='rl-floor-grid';
  const layout=campusWalkWorld.layouts.find(l=>l.id===b.id);
  const spans=layout.cells.filter(c=>c.kind==='room').map(c=>{const row=layout.displayRows.find(r=>r.id===(c.row||'main'));return c[`${row.axis}1`]-c[`${row.axis}0`]}).filter(n=>n>0);
  const unit=132/Math.max(.1,Math.min(...spans));
  const rowLength=Math.max(...layout.displayRows.map(r=>r.end-r.start));
  grid.style.setProperty('--plan-width',`${rowLength*unit}px`);
  for(let floor=b.floors;floor>=1;floor--){
   for(const physicalRow of CampusSpatialUI.rows(layout,floor)){
    const row=document.createElement('div');row.className='rl-floor-row';row.dataset.floor=String(floor);row.dataset.row=physicalRow.id;
    const label=document.createElement('strong');label.className='rl-floor-label';label.textContent=`${floor}F`;if(layout.displayRows.length>1){const wing=document.createElement('small');wing.textContent=physicalRow.label;label.append(wing)}row.append(label);
    const track=document.createElement('div');track.className='rl-plan-track';track.style.width=`${(physicalRow.end-physicalRow.start)*unit}px`;
    for(const r of physicalRow.cells){
     const editable=r.kind==='room',cell=document.createElement(editable?'label':'div');cell.className=editable?'rl-room':`rl-space rl-${r.kind}`;
     cell.style.left=`${(r.start-physicalRow.start)*unit}px`;cell.style.width=`${(r.end-r.start)*unit}px`;cell.dataset.kind=r.kind;
     if(editable){
      cell.dataset.room=r.id;paint(cell,draft[r.id],r.cat);const code=document.createElement('small');code.textContent=r.spaceCode||r.code||r.id;code.title=r.codeSource==='assigned'?'導覽用固定編號（平面圖未標示）':'平面圖固定空間編號';
      const input=document.createElement('input');input.type='text';input.value=draft[r.id];input.maxLength=60;input.title=draft[r.id];input.setAttribute('aria-label',`${b.name} ${floor}F ${code.textContent} 教室名稱`);
      input.addEventListener('input',()=>{draft[r.id]=input.value;input.title=input.value;paint(cell,input.value,r.cat);saveError='';updateStatus()});
      input.addEventListener('blur',()=>{draft[r.id]=input.value.trim()||saved[r.id];input.value=draft[r.id];input.title=input.value;paint(cell,input.value,r.cat);updateStatus()});cell.append(code,input);
     }else{
      const code=document.createElement('small');code.textContent=r.spaceCode||r.code||'';
      const name=document.createElement('span');name.textContent=r.label||({stair:'樓梯',wc:'廁所',passage:'穿堂',void:'空缺'})[r.kind];cell.append(code,name);
     }track.append(cell);
    }row.append(track);grid.append(row);
   }
  }scroll.append(grid);section.append(scroll);list.append(section);
 }updateStatus();}
 function applyNames(){for(const r of rooms){const name=saved[r.id];api.rooms[r.id].name=name;for(const b of api.buildings){const original=b.rooms.find(a=>a.id===r.id);if(original)original.name=name;}for(const l of campusWalkWorld.layouts){const current=l.rooms.find(a=>a.id===r.id);if(current)current.name=name;}const badge=roomBadgeElements.find(a=>a.nodeId===api.rooms[r.id].node);if(badge){badge.element.lastElementChild.textContent=name.replace(/\s*\(\d+F\)/,'');badge.element.firstElementChild.style.background=colors[M.category(name,r.cat)];}}
  for(const [oldId,id] of Object.entries(aliases()))if(api.rooms[oldId]&&api.rooms[id])api.rooms[oldId].name=api.rooms[id].name;
  api.scene.traverse(o=>{if(o.userData.roomId&&o.material?.map){const name=saved[o.userData.roomId];o.material.map.dispose();o.material.map=createRoomNameplateTexture(name,colors[M.category(name,api.rooms[o.userData.roomId].cat)]);o.material.needsUpdate=true;}});
  for(const btn of quick.querySelectorAll('[data-to]'))btn.textContent=api.rooms[btn.dataset.to].name.replace(/\s*\(\d+F\)/,'');
  search.dispatchEvent(new Event('input'));campusMinimap.invalidate();
 }
 function clearMotion(){Object.keys(moveInput).forEach(k=>moveInput[k]=false);stopAutoWalk();}
 function open(){lastFocus=document.activeElement;quick.classList.remove('open');clearMotion();renderTabs();renderBuildings();dialog.showModal();dialog.querySelector('#rl-close').focus();}
 function close(){dialog.close();clearMotion();lastFocus?.focus();}
 document.getElementById('btn-room-layout').onclick=open;dialog.querySelector('#rl-close').onclick=close;
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
 dialog.querySelector('#rl-restore').onclick=()=>{draft={...saved};saveError='';renderBuildings()};
 dialog.querySelector('#rl-save').onclick=()=>{const names=M.normalize(draft,rooms,aliases());try{localStorage.setItem(M.key(year),JSON.stringify(names));saved=names;draft={...saved};applyNames();renderBuildings();status.textContent=`${year} 學年度配置已儲存在此瀏覽器。`;}catch{saveError='儲存失敗，瀏覽器未允許本機儲存；修改仍保留在面板。';updateStatus();}};
 dialog.querySelector('#rl-year').addEventListener('change',e=>{const next=Number(e.target.value);if(next===year)return;if(!Number.isInteger(next)||next<100||next>200){e.target.value=year;return;}drafts.set(year,{...draft});year=next;saved=read();draft=drafts.get(year)||{...saved};applyNames();renderBuildings();});
 // Capture before legacy WASD listeners, and keep focus within the modal.
 window.addEventListener('keydown',e=>{if(dialog.open){if(e.key==='Escape'){e.preventDefault();close();}else if(e.key==='Tab'){const items=[...dialog.querySelectorAll('button:not(:disabled),input,a[href]')].filter(el=>el.getClientRects().length),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}e.stopImmediatePropagation();}},true);
 saved=read();draft={...saved};applyNames();
 window.campusRoomLayout={open,close,get year(){return year},get dirty(){return dirty()},originalNames};
})();
