/* The score application stays in its own window; no student data is read here. */
(()=>{
 const tracker=CampusScoreStationModel.create(),url=CampusScoreStationModel.url;
 const card=document.createElement('aside');card.id='score-station-card';card.hidden=true;card.setAttribute('aria-label','教務處成績查詢電腦');
 card.innerHTML='<button type="button" class="score-station-close" aria-label="關閉成績查詢提示">×</button><strong>歷屆段考成績查詢</strong><p role="status" aria-live="polite"></p><button type="button" class="score-station-open">開啟成績查詢新視窗 ↗</button><a class="score-station-link" target="_blank" rel="noopener">另開查詢頁面 ↗</a>';
 document.body.append(card);const status=card.querySelector('p'),open=card.querySelector('.score-station-open'),link=card.querySelector('a');link.href=url;
 let outcome='',lastText='';
 function message(text){if(text!==lastText){status.textContent=text;lastText=text;}}
 function launch(){
  // Omitting the noopener feature retains a success handle (noopener itself
  // returns null). Clear opener immediately, without reading the external page.
  let child=null;try{child=window.open(url,'_blank','popup=yes,width=1100,height=780');if(child)child.opener=null;}catch{}
  outcome=child?'opened':'blocked';card.hidden=false;link.hidden=!!child;
  message(child?'已另開成績查詢視窗；校園導覽會保留在原視窗。':'瀏覽器攔截了自動視窗，請按下方按鈕開啟。');
 }
 open.addEventListener('click',()=>{tracker.dismiss();launch()});
 card.querySelector('.score-station-close').addEventListener('click',()=>{tracker.dismiss();outcome='dismissed';card.hidden=true});
 document.addEventListener('visibilitychange',()=>tracker.pause());window.addEventListener('blur',()=>tracker.pause());
 window.campusScoreStation={pause(){tracker.pause();card.hidden=true},update(now,state){
  const room=window.campusWalkWorld?.layouts.flatMap(l=>l.rooms).find(r=>r.id==='academic');if(!room)return;
  const p=state.position,d=Math.hypot(p.x-room.center.x,p.z-room.center.z),near=Math.abs(p.y-room.center.y)<.35&&d<(tracker.visiting?1.8:1.25);
  const result=tracker.update(now,{...state,near});
  if(!near){outcome='';card.hidden=true;return;}
  if(!state.walking||state.suspended){card.hidden=true;return;}
  if(result.fire){launch();return;}
  if(outcome==='dismissed'){card.hidden=true;return;}
  if(outcome){card.hidden=false;return;}
  card.hidden=!result.show;if(result.show){link.hidden=true;message(`站在電腦旁不動 ${result.seconds} 秒後，另開成績查詢新視窗。`);}
 }};
})();
