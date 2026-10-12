/* Appearance choices remain local to this device. */
(()=>{
 const api=window.campusExplorer;if(!api?.setAvatarAppearance)return;
 const dialog=document.createElement('dialog');dialog.id='avatar-appearance-dialog';dialog.setAttribute('aria-labelledby','avatar-appearance-title');
 dialog.innerHTML='<form method="dialog"><small>DAXI · MY CAMPUS CHARACTER</small><h2 id="avatar-appearance-title">選擇你的校園人物</h2><p>性別與服裝可以自由搭配，套用後可在第三人稱查看造型。</p><fieldset><legend>人物性別</legend><label><input type="radio" name="avatar-gender" value="male">男生<span>短髮造型</span></label><label><input type="radio" name="avatar-gender" value="female">女生<span>長髮造型</span></label></fieldset><fieldset><legend>穿著選擇</legend><label><input type="radio" name="avatar-outfit" value="uniform">穿制服<span>既有大溪藍色校服造型</span></label><label><input type="radio" name="avatar-outfit" value="casual">穿便服<span>暖橘上衣與深色短褲</span></label></fieldset><p class="avatar-local-note">這台裝置會記住你的選擇。</p><div class="avatar-appearance-actions"><button type="button" id="avatar-appearance-cancel">取消</button><button type="button" id="avatar-appearance-apply">套用造型</button></div></form>';
 document.body.append(dialog);let opener=null;
 function open(event){
  opener=event.currentTarget;api.manualTakeover();
  const state=api.getAvatarAppearance();
  for(const key of ['gender','outfit'])dialog.querySelector('[name="avatar-'+key+'"][value="'+state[key]+'"]').checked=true;
  dialog.showModal();dialog.querySelector('input:checked').focus();
 }
 const button=document.createElement('button');button.id='btn-avatar-appearance';button.type='button';button.textContent='人物';button.setAttribute('aria-label','設定人物性別與服裝');button.onclick=open;
 document.getElementById('avatar-bottom-controls').append(button);
 const tool=document.createElement('button');tool.type='button';tool.className='guide-link';tool.textContent='人物性別與服裝';tool.onclick=open;document.getElementById('guide-tools')?.append(tool);
 document.getElementById('avatar-appearance-cancel').onclick=()=>dialog.close();
 document.getElementById('avatar-appearance-apply').onclick=()=>{
  api.setAvatarAppearance({gender:dialog.querySelector('[name="avatar-gender"]:checked').value,outfit:dialog.querySelector('[name="avatar-outfit"]:checked').value});dialog.close();
 };
 dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus({preventScroll:true});});
})();
