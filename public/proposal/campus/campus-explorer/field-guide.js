/* Original Daxi field-guide interface; retain the existing walking and routing engine. */
(()=>{
 const api=window.campusExplorer;if(!api)return;
 const el=id=>document.getElementById(id);
 document.body.classList.add('field-guide');
 el('welcome-card').classList.add('hidden');
 const panel=document.createElement('aside');panel.id='guide-panel';panel.setAttribute('aria-label','大溪校園手冊');
 panel.innerHTML='<div class="guide-mast"><span class="guide-seal">溪</span><div><small>DAXI FIELD GUIDE</small><h1>校園探索手冊</h1></div></div><p class="guide-intro">沿著一條路，認識一座校園。</p><button id="guide-cover" class="guide-link">← 回到手冊首頁</button><div id="guide-search"></div><section class="guide-section"><h2>探索方式</h2><div id="guide-controls"></div></section><section class="guide-section"><h2>樓層透視</h2><div id="guide-floors"></div></section><div id="guide-route"></div><section class="guide-section" id="guide-stories"><h2>校園散步提案</h2><p>選一站，看看校園裡不同的日常。</p></section><details class="guide-section"><summary>視角與工具</summary><div id="guide-tools"></div></details><footer>桃園市立大溪國中 · 115 學年度<br>位置依校園平面圖校對，模型為導覽示意。</footer>';
 document.body.append(panel);
 el('guide-search').append(document.querySelector('.search-box'));
 el('guide-controls').append(el('campus-main-controls'));
 el('guide-floors').append(el('floor-selector'));
 const tools=document.createElement('nav');tools.id='guide-quick-tools';tools.setAttribute('aria-label','校園導覽快捷工具');
 tools.innerHTML='<div id="guide-quick-main"></div><div id="guide-quick-floors"></div>';
 document.body.append(tools);
 const toolsToggle=document.createElement('button');toolsToggle.id='guide-tools-toggle';toolsToggle.type='button';toolsToggle.textContent='工具';toolsToggle.setAttribute('aria-label','開啟導覽工具');toolsToggle.setAttribute('aria-controls','guide-quick-tools');document.body.append(toolsToggle);
 function setToolsOpen(open){if(open&&isCompact())setPanel(false);document.body.classList.toggle('guide-tools-open',open);toolsToggle.setAttribute('aria-expanded',String(open));toolsToggle.setAttribute('aria-label',open?'收合導覽工具':'開啟導覽工具');toolsToggle.textContent=open?'收合':'工具'}
 toolsToggle.onclick=()=>setToolsOpen(!document.body.classList.contains('guide-tools-open'));
 tools.addEventListener('click',event=>{if(document.body.classList.contains('guide-tools-open')&&event.target.closest('#campus-main-controls button,.floor-btn,#fe-list-toggle'))setToolsOpen(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('guide-tools-open')){setToolsOpen(false);toolsToggle.focus();}});
 setToolsOpen(false);
 el('guide-quick-main').append(document.querySelector('.search-box'),el('campus-main-controls'));
 el('guide-quick-floors').append(el('floor-selector'));
 el('guide-search').remove();el('guide-controls').closest('section').remove();el('guide-floors').closest('section').remove();
 const route=el('guide-route'),hud=el('nav-hud');
 route.setAttribute('aria-label','目前目的地');route.hidden=true;
 document.body.append(route);route.append(hud);
 const notes=document.createElement('details');notes.id='guide-place-notes';
 notes.innerHTML='<summary>目的地筆記與實景</summary><p id="guide-place-meta"></p><p id="guide-place-hint"></p><figure id="guide-place-figure" hidden><img id="guide-place-photo" alt="" loading="lazy"><figcaption id="guide-place-caption"></figcaption></figure>';
 route.append(notes);
 const status=document.createElement('p');status.id='guide-route-status';status.setAttribute('role','status');
 const steps=document.createElement('ol');steps.id='guide-route-steps';steps.setAttribute('aria-label','導航階段');
 hud.before(status,steps);
 const arrival=document.createElement('section');arrival.id='guide-arrival';arrival.hidden=true;
 arrival.innerHTML='<div class="guide-arrival-heading"><span>已抵達</span><button id="guide-arrival-close" aria-label="關閉抵達資訊">×</button></div><h2 id="guide-arrival-title"></h2><p id="guide-arrival-meta"></p><p>已到達導覽模型中的目的地。請依現場門牌確認入口。</p><button id="guide-arrival-search">繼續找下一站 ↗</button>';
 notes.before(arrival);
 el('guide-tools').append(el('scene-toolbar'),document.querySelector('.top-actions'));
 const stories=[['woodwork-1','01','木藝與創作','走向木藝教室，認識校園的創作空間。'],['library','02','閱讀的停靠站','到圖書館，為下一段學習找一本書。'],['grandstand','03','操場上的日常','走到司令台，從另一個角度看校園。'],['palm-avenue','04','椰林迎賓大道','沿著校門外的雙排椰林，回望大溪的入口。']];
 for(const [id,num,title,copy]of stories){const b=document.createElement('button');b.className='guide-story';b.innerHTML='<span>'+num+'</span><div><strong>'+title+'</strong><p>'+copy+'</p></div><b>↗</b>';b.onclick=()=>api.navigateToRoom(id);el('guide-stories').append(b)}
 const toggle=document.createElement('button');toggle.id='guide-toggle';toggle.textContent='校園手冊';toggle.setAttribute('aria-controls','guide-panel');document.body.append(toggle);
 function isCompact(){return innerWidth<=768||innerHeight<=500||matchMedia('(hover:none) and (pointer:coarse)').matches}
 function setPanel(open){if(open&&isCompact())setToolsOpen(false);document.body.classList.toggle('guide-collapsed',!open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'收合手冊':'開啟手冊'}
 toggle.onclick=()=>setPanel(document.body.classList.contains('guide-collapsed'));
 setPanel(innerWidth>=1100&&!isCompact());
 let compactBefore=isCompact(),landscapeBefore=innerWidth>innerHeight;
 window.addEventListener('resize',()=>{
  const compact=isCompact(),landscape=innerWidth>innerHeight;
  if(compact&&(!compactBefore||landscape!==landscapeBefore)){setPanel(false);setToolsOpen(false)}
  compactBefore=compact;landscapeBefore=landscape;
 });
 document.addEventListener('click',event=>{
  if(isCompact()&&event.target.closest('#anniversary-launch,.anniversary-cover-entry')){setPanel(false);setToolsOpen(false)}
 });
 let shownDestination=null,navigation=null,plan=[],lastPoints=null;
 const setText=(node,text)=>{if(node.textContent!==text)node.textContent=text;};
 function displayNavigation(state){
  const previousStatus=navigation?.status;
  navigation=state;
  if(state.status==='cancelled'){route.hidden=true;arrival.hidden=true;shownDestination=null;return;}
  const room=api.rooms[state.destination];if(!room)return;
  if(state.status==='ready'&&isCompact()){setToolsOpen(false);setPanel(false);}
  route.hidden=false;route.dataset.status=state.status;
  arrival.hidden=state.status!=='arrived';hud.hidden=state.status==='arrived';
  const labels={ready:'路線已備妥，選擇自動帶路或沿路線走訪。',walking:'自動帶路中 · 手動移動或轉頭可接管',paused:'帶路已暫停 · 可手動探索，或按繼續帶路',blocked:'路線受阻 · 請移到走廊或入口，再按繼續帶路',arrived:'已抵達目的地'};
  setText(status,labels[state.status]||labels.ready);
  if(lastPoints!==state.points||shownDestination!==state.destination){
   lastPoints=state.points;plan=window.CampusNavigationGuide.steps(state.points||[],room);
   steps.replaceChildren(...plan.map(s=>{const li=document.createElement('li');li.textContent=s.label;return li;}));
  }
  const current=window.CampusNavigationGuide.active(plan,state.index||0,state.status);
  [...steps.children].forEach((li,i)=>{const value=i===current?'step':null;if(li.getAttribute('aria-current')!==value){if(value)li.setAttribute('aria-current',value);else li.removeAttribute('aria-current');}li.classList.toggle('complete',i<current);});
  if(state.remaining!=null&&state.status!=='arrived')setText(el('hud-dist-val'),state.status==='blocked'?'—':String(Math.round(state.remaining)));
  if(state.status==='walking'&&previousStatus!=='walking')setPanel(false);
  syncDestination();
  if(state.status==='arrived'){
   setText(el('guide-arrival-title'),room.name);
   setText(el('guide-arrival-meta'),el('guide-place-meta').textContent);
   el('guide-place-hint').textContent='位置、樓層與編號供現場查找；模型尺度及路線距離為示意。';
  }
 }
 function syncDestination(){
  const visible=hud.classList.contains('visible')||navigation?.status==='arrived';route.hidden=!visible;
  if(!visible){shownDestination=null;return;}
  const id=navigation?.destination||hud.dataset.destination,room=api.rooms[id];
  if(!room)return;
  const changed=id!==shownDestination;shownDestination=id;
  if(!changed)return;
  const outdoor=room.code?.startsWith('OUT-')||id==='track';
  el('guide-place-meta').textContent=[room.buildingName,outdoor?'戶外景點':room.floor?room.floor+'F':null,room.code?'固定編號：'+room.code:null].filter(Boolean).join(' · ');
  el('guide-place-hint').textContent=room.entryHint||(room.floor>1?'帶路將經由走廊與樓梯前往此樓層；手動移動可隨時接管。':'選擇「自動帶路」前往；也可沿著場景中的路線自行走訪。');
  let photo=null;
  if(id==='grandstand')photo=['stage-2019','司令台正面','2019 年 10 月 22 日實景紀錄；現況可能已有變更。'];
  else if(id==='track')photo=['track-2019','操場與跑道','2019 年 10 月 22 日實景紀錄；鋪面配色依現版平面圖呈現。'];
  else if(room.buildingId==='admin-front')photo=['admin-front','行政大樓外觀','外觀對照照片，拍攝日期未提供；非所選處室內景。'];
  el('guide-place-figure').hidden=!photo;
  notes.querySelector('summary').textContent=photo?'目的地筆記與實景':'目的地筆記';
  if(photo){el('guide-place-photo').src='photos/'+photo[0]+'.jpg';el('guide-place-photo').alt=photo[1];el('guide-place-caption').textContent=photo[2];}
  else{el('guide-place-photo').removeAttribute('src');el('guide-place-caption').textContent='';}
  if(changed){notes.open=false;if(isCompact()){setToolsOpen(false);setPanel(false);el('btn-auto-walk').focus({preventScroll:true});}}
 }
 window.addEventListener('campus:navigation',event=>displayNavigation(event.detail));
 new MutationObserver(()=>{
  if(hud.classList.contains('visible')&&hud.dataset.destination!==navigation?.destination)displayNavigation({destination:hud.dataset.destination,status:'ready',points:[],index:0});
  else if(navigation?.status!=='cancelled')syncDestination();
 }).observe(hud,{attributes:true,attributeFilter:['class','data-destination']});
 function dismissArrival(search){
  if(api.clearNavigation)api.clearNavigation();else el('btn-cancel-nav').click();
  navigation=null;shownDestination=null;arrival.hidden=true;route.hidden=true;hud.hidden=false;
  (search?el('search-input'):toggle).focus({preventScroll:true});
 }
 el('guide-arrival-close').onclick=()=>dismissArrival(false);
 el('guide-arrival-search').onclick=()=>dismissArrival(true);
 if(api.getNavigationState?.().destination)displayNavigation(api.getNavigationState());else syncDestination();
 el('btn-cancel-nav').addEventListener('click',()=>{if(route.contains(document.activeElement))toggle.focus({preventScroll:true});});
 const cover=el('guide-landing');
 let previousFocus=null;
 function openCover(){previousFocus=document.activeElement;api.manualTakeover();if(cover.open)cover.close();cover.showModal();const featured=el('guide-anniversary');(featured&&!featured.disabled?featured:el('guide-start')).focus()}
 function enter(chapter){cover.close();if(chapter==='first')el('btn-walk').click();el('welcome-card').classList.add('hidden');setPanel(chapter==='stories'||chapter==='first'&&innerWidth>=769);if(chapter==='search')el('search-input').focus();else if(chapter==='stories'){el('guide-stories').scrollIntoView({block:'nearest'});el('guide-stories').querySelector('button').focus()}else toggle.focus()}
 el('guide-start').onclick=()=>enter('first');cover.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>enter(b.dataset.chapter));el('guide-cover').onclick=openCover;
 cover.addEventListener('cancel',()=>{if(previousFocus?.isConnected)previousFocus.focus();else toggle.focus()});
 cover.querySelectorAll('button:not(#guide-anniversary)').forEach(button=>button.disabled=false);
 if(!new URLSearchParams(location.search).has('to')&&!new URLSearchParams(location.search).has('view'))openCover();else cover.close();
})();
