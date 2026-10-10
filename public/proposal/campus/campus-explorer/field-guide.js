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
 const route=el('guide-route'),hud=el('nav-hud');
 route.setAttribute('aria-label','目前目的地');route.hidden=true;
 document.body.append(route);route.append(hud);
 const notes=document.createElement('details');notes.id='guide-place-notes';
 notes.innerHTML='<summary>目的地筆記與實景</summary><p id="guide-place-meta"></p><p id="guide-place-hint"></p><figure id="guide-place-figure" hidden><img id="guide-place-photo" alt="" loading="lazy"><figcaption id="guide-place-caption"></figcaption></figure>';
 route.append(notes);
 el('guide-tools').append(el('scene-toolbar'),document.querySelector('.top-actions'));
 const stories=[['woodwork-1','01','木藝與創作','走向木藝教室，認識校園的創作空間。'],['library','02','閱讀的停靠站','到圖書館，為下一段學習找一本書。'],['grandstand','03','操場上的日常','走到司令台，從另一個角度看校園。'],['palm-avenue','04','椰林迎賓大道','沿著校門外的雙排椰林，回望大溪的入口。']];
 for(const [id,num,title,copy]of stories){const b=document.createElement('button');b.className='guide-story';b.innerHTML='<span>'+num+'</span><div><strong>'+title+'</strong><p>'+copy+'</p></div><b>↗</b>';b.onclick=()=>api.navigateToRoom(id);el('guide-stories').append(b)}
 const toggle=document.createElement('button');toggle.id='guide-toggle';toggle.textContent='校園手冊';toggle.setAttribute('aria-controls','guide-panel');document.body.append(toggle);
 function setPanel(open){document.body.classList.toggle('guide-collapsed',!open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'收合手冊':'開啟手冊'}
 toggle.onclick=()=>setPanel(document.body.classList.contains('guide-collapsed'));
 setPanel(innerWidth>=769);
 let shownDestination=null;
 function syncDestination(){
  const visible=hud.classList.contains('visible');route.hidden=!visible;
  if(!visible){shownDestination=null;return;}
  const id=hud.dataset.destination,room=api.rooms[id];
  if(!room)return;
  const changed=id!==shownDestination;shownDestination=id;
  const outdoor=room.code?.startsWith('OUT-')||id==='track';
  el('guide-place-meta').textContent=[room.buildingName,outdoor?'戶外景點':room.floor?room.floor+'F':null,room.code?'固定編號：'+room.code:null].filter(Boolean).join(' · ');
  el('guide-place-hint').textContent=room.floor>1?'帶路將經由走廊與樓梯前往此樓層；手動移動可隨時接管。':'選擇「自動帶路」前往；也可沿著場景中的路線自行走訪。';
  let photo=null;
  if(id==='grandstand')photo=['stage-2019','司令台正面','2019 年 10 月 22 日實景紀錄；現況可能已有變更。'];
  else if(id==='track')photo=['track-2019','操場與跑道','2019 年 10 月 22 日實景紀錄；鋪面配色依現版平面圖呈現。'];
  else if(room.buildingId==='admin-front')photo=['admin-front','行政前棟外觀','外觀對照照片，拍攝日期未提供；非所選處室內景。'];
  el('guide-place-figure').hidden=!photo;
  notes.querySelector('summary').textContent=photo?'目的地筆記與實景':'目的地筆記';
  if(photo){el('guide-place-photo').src='photos/'+photo[0]+'.jpg';el('guide-place-photo').alt=photo[1];el('guide-place-caption').textContent=photo[2];}
  else{el('guide-place-photo').removeAttribute('src');el('guide-place-caption').textContent='';}
  if(changed){notes.open=false;if(innerWidth<769){setPanel(false);el('btn-auto-walk').focus({preventScroll:true});}}
 }
 new MutationObserver(syncDestination).observe(hud,{attributes:true,attributeFilter:['class','data-destination']});
 syncDestination();
 el('btn-cancel-nav').addEventListener('click',()=>{if(route.contains(document.activeElement))toggle.focus({preventScroll:true});});
 const cover=document.createElement('dialog');cover.id='guide-landing';cover.setAttribute('aria-labelledby','guide-title');
 cover.innerHTML='<header><div class="guide-mast"><span class="guide-seal">溪</span><div><small>桃園市立大溪國中</small><strong>115 學年度 · 校園探索手冊</strong></div></div><span class="guide-edition">山城・木藝・校園日常</span></header><main class="guide-hero"><div class="guide-copy"><p class="guide-eyebrow">打開手冊，從大溪出發</p><h1 id="guide-title">每一條路，<br>都有大溪的故事。</h1><p>從校門到教室，從閱讀到創作。<br>用自己的步調，認識我們的校園。</p><button id="guide-start" class="guide-primary">翻開校園手冊　↗</button><small>實景照片 × 立體探索 × 校園路線</small></div><figure><img src="reference-aerial.webp" decoding="async" width="1280" height="720" alt="大溪國中校園空拍實景"><figcaption>FIELD NOTES / 大溪國中實景</figcaption></figure></main><nav class="guide-chapters" aria-label="探索入口"><button data-chapter="first"><span>01</span><h2>第一次來大溪</h2><p>從正門開始，認識校園與常用處室。</p><b>開始走訪 ↗</b></button><button data-chapter="search"><span>02</span><h2>找教室與處室</h2><p>輸入教室或地點，讓路線帶你前往。</p><b>尋找目的地 ↗</b></button><button data-chapter="stories"><span>03</span><h2>認識校園故事</h2><p>木藝、閱讀與操場，探索校園的日常。</p><b>選一段散步 ↗</b></button></nav><footer>大溪校園探索手冊<span>依 115 學年度平面圖建置</span></footer>';
 document.body.append(cover);
 let previousFocus=null;
 function openCover(){previousFocus=document.activeElement;api.manualTakeover();cover.showModal();el('guide-start').focus()}
 function enter(chapter){cover.close();if(chapter==='first')el('btn-walk').click();setPanel(chapter!=='first'||innerWidth>=769);if(chapter==='search')el('search-input').focus();else if(chapter==='stories'){el('guide-stories').scrollIntoView({block:'nearest'});el('guide-stories').querySelector('button').focus()}else toggle.focus()}
 el('guide-start').onclick=()=>enter('first');cover.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>enter(b.dataset.chapter));el('guide-cover').onclick=openCover;
 cover.addEventListener('cancel',()=>{if(previousFocus?.isConnected)previousFocus.focus();else toggle.focus()});
 if(!new URLSearchParams(location.search).has('to')&&!new URLSearchParams(location.search).has('view'))openCover();
})();
