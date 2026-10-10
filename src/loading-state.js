/* Shared by Vite development and the HTML-first production shell. */
export function attachCampusLoading(frame, loading) {
 loading.innerHTML='<strong>大溪國中校園導覽</strong><span class="campus-loading-caption">正在整理校園地圖</span><span class="campus-loading-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="campus-loading-note">請稍候，即將走進校園</span>';
 const note=loading.querySelector('.campus-loading-note'),caption=loading.querySelector('.campus-loading-caption');
 const actions=document.createElement('div');actions.className='campus-loading-actions';actions.hidden=true;
 const retry=document.createElement('button');retry.type='button';retry.textContent='重新載入';retry.onclick=()=>window.location.reload();
 const plan=document.createElement('a');plan.textContent='先看校園平面圖';plan.href=new URL('campus_plan_115.jpg',frame.src).href;
 actions.append(retry,plan);loading.append(actions);
 const slowTimer=window.setTimeout(()=>{note.textContent='載入時間較長，可以繼續等候，或先查看平面圖。';actions.hidden=false;},12000);
 function onMessage(event){
  if(event.source!==frame.contentWindow||event.origin!==new URL(frame.src).origin)return;
  if(event.data?.type==='campus-ready'){
   window.clearTimeout(slowTimer);loading.classList.add('is-ready');window.removeEventListener('message',onMessage);
  }else if(event.data?.type==='campus-startup-error'){
   window.clearTimeout(slowTimer);caption.textContent='暫時無法啟動立體場景';
   note.textContent='請重新載入，或先查看校園平面圖。';actions.hidden=false;loading.classList.add('has-error');
  }
 }
 window.addEventListener('message',onMessage);
 return ()=>{window.clearTimeout(slowTimer);window.removeEventListener('message',onMessage);};
}
