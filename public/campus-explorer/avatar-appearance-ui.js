/* Appearance choices remain local to this device. */
(()=>{
 const api=window.campusExplorer;if(!api?.setAvatarAppearance)return;
 const choices=document.createElement('section');choices.id='avatar-quick-choices';choices.setAttribute('aria-label','人物性別與穿著，點選立即套用');
 choices.innerHTML='<fieldset><legend>性別</legend><label><input type="radio" name="avatar-gender" value="male"><span>男生</span></label><label><input type="radio" name="avatar-gender" value="female"><span>女生</span></label></fieldset><fieldset><legend>穿著</legend><label><input type="radio" name="avatar-outfit" value="uniform"><span>制服</span></label><label><input type="radio" name="avatar-outfit" value="casual"><span>便服</span></label></fieldset>';
 document.getElementById('guide-quick-floors').prepend(choices);
 const state=api.getAvatarAppearance();
 for(const key of ['gender','outfit'])choices.querySelector('[name="avatar-'+key+'"][value="'+state[key]+'"]').checked=true;
 choices.addEventListener('change',event=>{
  const input=event.target;if(!input.matches('input[type="radio"]'))return;
  const key=input.name==='avatar-gender'?'gender':'outfit';api.setAvatarAppearance({[key]:input.value});
 });
 const movement=document.createElement('div');movement.id='guide-movement-settings';
 for(const id of ['btn-speed-ctrl','btn-turn-ctrl']){const button=document.getElementById(id);if(button)movement.append(button);}
 document.getElementById('guide-tools')?.append(movement);
})();
