/* Explicit task completion event; never infer completion from DOM text. */
window.addEventListener('campus:quest-complete',event=>{
  if(event.detail?.questId!=='energy-core')return;
  window.parent.postMessage({type:'proposal:quest-complete',questId:'energy-core'},location.origin);
  if(document.getElementById('anniversary-reward'))return;
  const reward=document.createElement('p');reward.id='anniversary-reward';reward.setAttribute('role','status');
  const link=document.createElement('a');link.textContent='已解鎖校慶獎勵：前往校園，欣賞 80 週年煙火秀 ↗';link.href='../#campus';link.target='_top';link.style.cssText='display:inline-block;padding:14px 18px;border-radius:8px;background:#174b45;color:#fff8dc;font:600 14px/1.8 sans-serif';
  reward.append(link);document.querySelector('#quest')?.prepend(reward);
});
