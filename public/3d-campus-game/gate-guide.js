/* The text page loads no WebGL. Preview is created only on an explicit request. */
(()=>{
 'use strict';
 const el=id=>document.getElementById(id),M=window.CampusGateGuide;
 if(!M||typeof BUILDINGS_CONFIG==='undefined'||typeof CampusSpatialData==='undefined'||typeof CampusRoomLayout==='undefined'){
  el('gate-feedback').textContent='處室資料未能載入，請重新整理，或向校門口警衛室詢問。';el('gate-search').disabled=true;return;
 }
 const raw=BUILDINGS_CONFIG.flatMap(b=>b.rooms.map(r=>({...r,name:r.name.replace(/\s*\(\d+F\)/,'')})));
 let saved={};
 try{saved=CampusRoomLayout.migrateConfirmedNames(CampusRoomLayout.parse(localStorage.getItem(CampusRoomLayout.key(115)),raw,CampusSpatialData.aliases),CampusSpatialData.confirmedNames);}catch{/* Text guidance remains available when browser storage is disabled. */}
 const rooms=M.catalog(BUILDINGS_CONFIG,saved),byId=new Map(rooms.map(r=>[r.id,r]));
 let room=null,guide=null,state={index:0,complete:false},previewTimer=null;
 const meta=r=>`${r.buildingName} · ${r.floor}F`;
 const version=document.querySelector('meta[name="campus-build"]')?.content||'source';
 function focus(id){el(id).focus({preventScroll:true});el(id).scrollIntoView({block:'nearest',behavior:'instant'});}
 function show(stage){for(const key of ['select','confirm','route'])el('gate-'+key).hidden=key!==stage;}
 function setQuery(id){const url=new URL(location.href);if(id)url.searchParams.set('to',id);else url.searchParams.delete('to');history.replaceState(null,'',url);}
 function removePreview(){clearTimeout(previewTimer);previewTimer=null;el('gate-preview').open=false;el('gate-preview-host').replaceChildren();el('gate-preview-status').textContent='';}
 function renderSearch(){
  const q=el('gate-search').value.trim();el('gate-clear').hidden=!q;
  const list=q?M.search(rooms,q):rooms.filter(r=>r.common);
  el('gate-results-heading').textContent=q?'搜尋結果':'常用處室';
  el('gate-count').textContent=q?(list.length===12?'最多顯示 12 筆':`${list.length} 個地點`):'點選查看位置';
  el('gate-results').replaceChildren();
  for(const r of list){
   const b=document.createElement('button');b.type='button';b.className='gate-room';b.dataset.room=r.id;
   const text=document.createElement('span'),name=document.createElement('strong'),place=document.createElement('small'),arrow=document.createElement('span');
   name.textContent=r.name;place.textContent=meta(r);arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
   text.append(name,place);b.append(text,arrow);b.addEventListener('click',()=>select(r));el('gate-results').append(b);
  }
  if(!list.length){const p=document.createElement('p');p.className='gate-empty';p.textContent='找不到相符的處室。請改用處室或教室名稱；若不確定承辦單位，請向校門口警衛室詢問。';el('gate-results').append(p);}
 }
 function select(r,moveFocus=true){
  removePreview();room=r;guide=M.guide(r);state=M.advance(null,'restart',guide.steps.length);el('gate-feedback').textContent='';setQuery(r.id);
  el('gate-destination').textContent=r.name;el('gate-place').textContent=meta(r);
  el('gate-canonical').hidden=r.name===r.canonicalName;el('gate-canonical').textContent='此瀏覽器顯示名稱；圖面名稱：'+r.canonicalName;
  el('gate-confirm-notice').textContent=guide.notice;
  el('gate-start').firstChild.textContent=guide.status==='incomplete'?'查看已知位置與詢問提示 ':'從校門開始帶路 ';
  show('confirm');if(moveFocus)focus('gate-destination');
 }
 function reset(){
  removePreview();room=null;guide=null;state={index:0,complete:false};setQuery(null);el('gate-feedback').textContent='';
  show('select');renderSearch();focus('gate-search');
 }
 function renderStep(moveFocus=true){
  const total=guide.steps.length,step=guide.steps[state.index],last=state.index===total-1;
  el('gate-active').hidden=state.complete;el('gate-done').hidden=!state.complete;
  el('gate-progress').textContent=`第 ${state.index+1}／${total} 步`;
  el('gate-progress-bar').max=total;el('gate-progress-bar').value=state.index+1;
  el('gate-step-number').textContent=String(state.index+1).padStart(2,'0');
  el('gate-step-title').textContent=step.title;el('gate-step-body').textContent=step.body;
  el('gate-prev').disabled=state.index===0;el('gate-next').hidden=last;el('gate-finish').hidden=!last;
  // An incomplete route is information only. It cannot claim an arrival.
  if(guide.status==='incomplete'){el('gate-finish').hidden=true;el('gate-prev').hidden=true;}else el('gate-prev').hidden=false;
  [...el('gate-all-steps').children].forEach((li,i)=>{if(i===state.index)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
  if(moveFocus)focus(state.complete?'gate-done-title':'gate-step-title');
 }
 function start(){
  if(!room)return;
  state=M.advance(null,'restart',guide.steps.length);el('gate-route-name').textContent=room.name;el('gate-route-place').textContent=meta(room);
  el('gate-route-notice').textContent=guide.notice;el('gate-source').textContent='參考資料：'+guide.source+'。非實測路線，也不代表無障礙通行路線。';
  el('gate-all-steps').replaceChildren(...guide.steps.map(step=>{const li=document.createElement('li'),title=document.createElement('strong');title.textContent=step.title;li.append(title,document.createTextNode(step.body));return li;}));
  el('gate-overview').open=false;el('gate-photo').hidden=!guide.photo;
  if(guide.photo){el('gate-photo-image').src=guide.photo.src;el('gate-photo-image').alt=guide.photo.caption;el('gate-photo-caption').textContent=guide.photo.caption+' 拍攝日期未提供，現況請依現場確認。';}
  else{el('gate-photo-image').removeAttribute('src');el('gate-photo-image').alt='';el('gate-photo-caption').textContent='';}
  el('gate-preview-link').href='index.html?'+new URLSearchParams({to:room.id,build:version}).toString();
  show('route');renderStep();
 }
 for(const [id,action] of [['gate-prev','previous'],['gate-next','next'],['gate-finish','confirm']])el(id).onclick=()=>{if(guide){state=M.advance(state,action,guide.steps.length);renderStep();}};
 for(const id of ['gate-change','gate-reselect','gate-reset'])el(id).onclick=reset;
 el('gate-start').onclick=start;
 el('gate-search').addEventListener('input',renderSearch);
 el('gate-clear').onclick=()=>{el('gate-search').value='';renderSearch();el('gate-search').focus();};
 el('gate-preview').addEventListener('toggle',()=>{
  if(!el('gate-preview').open){removePreview();return;}
  if(!room||el('gate-preview-host').firstChild)return;
  const frame=document.createElement('iframe');frame.title=room.name+' 3D 路線預覽';frame.allow='fullscreen';
  frame.src='index.html?'+new URLSearchParams({to:room.id,gatePreview:'1',build:version}).toString();
  el('gate-preview-status').textContent='正在載入 3D；您仍可繼續使用上方文字指引。';
  frame.addEventListener('load',()=>{clearTimeout(previewTimer);el('gate-preview-status').textContent='若預覽未正常顯示，可收合後繼續使用文字指引，或另開完整導覽。';});
  frame.addEventListener('error',()=>{clearTimeout(previewTimer);el('gate-preview-status').textContent='3D 未能載入，請繼續使用文字指引。';});
  previewTimer=setTimeout(()=>{el('gate-preview-status').textContent='3D 載入較久，您可繼續使用上方文字指引，或另開完整導覽。';},15000);
  el('gate-preview-host').append(frame);
 });
 renderSearch();
 const input=new URLSearchParams(location.search).get('to');
 if(input){const id=Object.hasOwn(CampusSpatialData.aliases,input)?CampusSpatialData.aliases[input]:input;const target=byId.get(id);if(target)select(target,false);else el('gate-feedback').textContent='找不到連結指定的目的地，請重新選擇處室。';}
})();
