/* 校園人物是導覽示意。個人資料只使用核對名冊與照片。 */
(()=>{
 'use strict';
 const api=window.campusExplorer,data=window.CampusStaffData;
 if(!api||!data||window.campusPeople)return;
 const people=Array.isArray(data.people)?data.people:[];
 const make=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node};
 const button=(text,id)=>{const b=make('button','',text);b.type='button';if(id)b.id=id;return b};
 const opener=button('校園師生','campus-people-open');opener.setAttribute('aria-haspopup','dialog');
 const rail=document.getElementById('guide-quick-main');(rail||document.body).append(opener);if(!rail)opener.classList.add('campus-people-floating');
 const dialog=make('dialog');dialog.id='campus-people-dialog';dialog.setAttribute('aria-labelledby','campus-people-title');
 const header=make('header'),heading=make('h2','', '校園師生');heading.id='campus-people-title';
 const closeButton=button('關閉','campus-people-close');header.append(heading,closeButton);
 const intro=make('p','campus-people-note',`${data.year||115} 學年度教職員名冊。場景學生為一般示意人物。`);
 const label=make('label','','搜尋姓名或職稱');label.htmlFor='campus-people-search';
 const search=make('input');search.id='campus-people-search';search.type='search';search.placeholder='姓名、職稱';search.autocomplete='off';
 const status=make('p','campus-people-status');status.id='campus-people-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const layout=make('div','campus-people-layout'),list=make('div'),profile=make('section');list.id='campus-people-list';list.setAttribute('aria-label','教職員搜尋結果');profile.id='campus-people-profile';profile.setAttribute('aria-label','教職員介紹');
 layout.append(list,profile);dialog.append(header,intro,label,search,status,layout);document.body.append(dialog);
 let selected=null,previousFocus=null;
 function renderProfile(person){
  selected=person;profile.replaceChildren();
  if(!person){profile.append(make('p','','選取一位教職員，查看介紹與處室。'));return}
  if(person.portrait){const image=make('img','campus-people-portrait');image.src=person.portrait;image.alt=person.name+'的核對照片';image.loading='lazy';image.addEventListener('error',()=>image.replaceWith(make('div','campus-people-placeholder','照片待補')),{once:true});profile.append(image)}
  else profile.append(make('div','campus-people-placeholder','照片待補'));
  profile.append(make('h3','',person.name),make('p','campus-people-role',person.title),make('p','campus-people-note','校園導覽示意，非即時位置'));
  const go=button('前往處室','campus-people-go');go.disabled=!person.destination||!api.rooms?.[person.destination];
  go.onclick=()=>{if(go.disabled)return;close();api.navigateToRoom(person.destination)};profile.append(go);
  if(go.disabled)profile.append(make('p','campus-people-note','此職務尚未設定導覽處室。'));
  for(const item of list.querySelectorAll('button'))item.setAttribute('aria-pressed',String(item.dataset.personId===String(person.id)));
 }
 function renderList(){
  const query=search.value.trim().toLocaleLowerCase();const matches=people.filter(p=>(String(p.name)+' '+String(p.title)).toLocaleLowerCase().includes(query));
  list.replaceChildren();status.textContent=`找到 ${matches.length} 位，共 ${people.length} 位教職員。`;
  for(const p of matches){const row=button('');row.dataset.personId=p.id;row.setAttribute('aria-pressed',String(selected?.id===p.id));row.append(make('strong','',p.name),make('span','',p.title));row.onclick=()=>renderProfile(p);list.append(row)}
  if(!matches.length)list.append(make('p','campus-people-empty','找不到符合的教職員，請試試姓名或職稱。'));
 }
 function close(){if(dialog.open)dialog.close();if(previousFocus?.isConnected)previousFocus.focus();else opener.focus()}
 function open(id){previousFocus=document.activeElement;api.manualTakeover?.();search.value='';renderProfile(people.find(p=>p.id===id)||null);renderList();if(!dialog.open)dialog.showModal();search.focus()}
 opener.onclick=()=>open();closeButton.onclick=close;search.oninput=renderList;
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus();else opener.focus()});
 const tags=make('div','campus-people-tags');tags.setAttribute('aria-hidden','true');document.body.append(tags);
 const actors=[];
 const zones=[[-17,79,4,0],[-4,78,3,0],[-12,70,4,0],[-1,72,2,0],[-92,-22,4,0],[-82,-15,3,0],[-78,-30,4,0],[-92,-37,3,0],[-34,47,3,0],[-40,37,2,0],[-6,75,0,3],[-24,71,0,3]];
 const blockedPoint=p=>!Number.isFinite(p.y)||!!window.campusCollisionIndex?.pointHit(p.x,p.y+1,p.z);
 function outdoors(p){return !(window.campusWalkWorld?.layouts||[]).some(l=>p.x>l.bounds.x0-.8&&p.x<l.bounds.x1+.8&&p.z>l.bounds.z0-.8&&p.z<l.bounds.z1+.8)}
 function safe(p){return outdoors(p)&&!blockedPoint(p)&&Math.abs(p.y)<.25}
 function ground(p){return window.campusWalkWorld?.ground(p)??0}
 // Find the initial position once. Walking never teleports to a new route point.
 function place(x,z,index){for(let ring=0;ring<=6;ring++)for(let n=0;n<(ring?12:1);n++){const angle=(n+index*.37)*Math.PI/6,p={x:x+Math.cos(angle)*ring*1.8,y:0,z:z+Math.sin(angle)*ring*1.8};p.y=ground(p);if(safe(p)&&!actors.some(a=>Math.hypot(a.position.x-p.x,a.position.z-p.z)<1.3))return p}return null}
 zones.forEach((z,i)=>{const position=place(z[0],z[1],i);if(position)actors.push({id:'student-'+i,position,start:{...position},direction:1,axis:z[2]?'x':'z',length:z[2]||z[3],speed:.55+(i%3)*.12,spec:{gender:i%2?'female':'male',outfit:'uniform',role:'student'}})});
 const destinations={academic:[-39,43],general:[-39,48],counseling:[-38,37],library:[59,-25],track:[-64,-20]};
 people.filter(p=>p.portrait).forEach((person,i)=>{let spot=destinations[person.destination];if(!spot){const r=api.rooms?.[person.destination],b=api.buildings?.find?.(b=>b.id===r?.buildingId);spot=b?[b.x-(b.w||b.width||20)/2-3,b.z]:[-39,42]}
  const offset=i%4,position=place(spot[0]-(offset%2)*2.3,spot[1]+Math.floor(offset/2)*2.3,i);if(position)actors.push({id:person.id,person,position,spec:{...(person.appearance||{}),gender:person.appearance?.gender||person.gender||'male',role:'teacher'}});
 });
 const THREE=window.THREE;
 function ensureRoot(actor){if(actor.root||!THREE||!api.createCharacter)return;actor.root=api.createCharacter(actor.spec);actor.root.userData.campusPerson=actor;actor.root.position.set(actor.position.x,actor.position.y,actor.position.z);api.scene.add(actor.root);actor.limbs=['avatar-arm-left','avatar-arm-right','avatar-leg-left','avatar-leg-right'].map(n=>actor.root.getObjectByName(n));if(actor.person){actor.tag=make('span','campus-person-tag',actor.person.name);actor.tag.hidden=true;tags.append(actor.tag)}}
 let lastSelection=-1,active=[];
 function choose(time,player){if(time-lastSelection<.35&&lastSelection>=0)return;lastSelection=time;const max=window.innerWidth<=768?7:14;
  active=actors.map(actor=>({actor,distance:Math.hypot(actor.position.x-player.x,actor.position.z-player.z)})).filter(a=>a.distance<85).sort((a,b)=>a.distance-b.distance).slice(0,max).map(a=>a.actor);
  for(const actor of actors){const visible=active.includes(actor);if(visible)ensureRoot(actor);if(actor.root)actor.root.visible=visible;if(actor.tag)actor.tag.hidden=true}
 }
 function move(actor,delta,time){if(actor.person)return;const p=actor.position;let remaining=Math.min(delta,.1)*actor.speed;
  while(remaining>0){const step=Math.min(remaining,.035),next={...p};next[actor.axis]+=step*actor.direction;next.y=ground(next);
   if(Math.abs(next[actor.axis]-actor.start[actor.axis])>actor.length||Math.abs(next.y-p.y)>.24||!safe(next)){actor.direction*=-1;break}
   Object.assign(p,next);remaining-=step;
  }
  if(actor.root){actor.root.position.set(p.x,p.y,p.z);actor.root.rotation.y=actor.axis==='x'?actor.direction*Math.PI/2:(actor.direction>0?0:Math.PI);for(let i=0;i<actor.limbs.length;i++)if(actor.limbs[i])actor.limbs[i].rotation.x=Math.sin(time*5+((i===0||i===3)?0:Math.PI))*.22}
 }
 const ray=THREE?new THREE.Raycaster():null,projected=THREE?new THREE.Vector3():null;
 function occluded(position){if(!ray)return false;const direction=position.clone().sub(api.camera.position),distance=direction.length();ray.set(api.camera.position,direction.normalize());ray.far=distance-.4;
  const hits=ray.intersectObjects(api.scene.children,true);ray.far=Infinity;return hits.some(hit=>{let node=hit.object;while(node){if(node.userData?.campusPerson)return false;node=node.parent}return hit.object.visible&&hit.object.material?.transparent!==true});
 }
 function update(delta,time){const paused=document.hidden||dialog.open||document.getElementById('guide-landing')?.open||api.motionBlocked?.();
  if(paused){for(const actor of actors)if(actor.tag)actor.tag.hidden=true;return}
  const player=api.getPlayerPosition?.()||api.camera?.position||{x:0,y:0,z:0};choose(time,player);
  for(const actor of active){move(actor,delta,time);if(!actor.tag)continue;actor.tag.hidden=true;
   if(document.body.dataset.controlMode==='bird'||Math.hypot(actor.position.x-player.x,actor.position.z-player.z)>12)continue;
   projected.set(actor.position.x,actor.position.y+2.05,actor.position.z).project(api.camera);
   if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1||Math.abs(projected.y)>1)continue;
   if(actor.nextOcclusion===undefined||time>=actor.nextOcclusion){
    actor.isOccluded=occluded(new THREE.Vector3(actor.position.x,actor.position.y+2.05,actor.position.z));actor.nextOcclusion=time+.25;
   }
   if(actor.isOccluded)continue;
   const rect=api.renderer.domElement.getBoundingClientRect();actor.tag.style.left=`${rect.left+(projected.x+1)*rect.width/2}px`;actor.tag.style.top=`${rect.top+(1-projected.y)*rect.height/2}px`;actor.tag.hidden=false;
  }
 }
 function isTap(start,end){return !!start&&Math.hypot(end.x-start.x,end.y-start.y)<=6&&end.time-start.time<=450}
 let pointer=null;const canvas=api.renderer?.domElement;
 canvas?.addEventListener('pointerdown',event=>{pointer=event.isPrimary===false?null:{id:event.pointerId,x:event.clientX,y:event.clientY,time:event.timeStamp,moved:false}});
 canvas?.addEventListener('pointermove',event=>{if(pointer&&Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>6)pointer.moved=true});
 canvas?.addEventListener('pointercancel',()=>pointer=null);
 canvas?.addEventListener('pointerup',event=>{const start=pointer;pointer=null;if(!start||start.moved||event.pointerId!==start.id||!isTap(start,{x:event.clientX,y:event.clientY,time:event.timeStamp})||!ray||dialog.open||document.body.dataset.controlMode==='bird')return;
  const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;ray.setFromCamera({x:(event.clientX-rect.left)/rect.width*2-1,y:1-(event.clientY-rect.top)/rect.height*2},api.camera);
  // Raycast the whole scene so a wall in front of a teacher prevents selection.
  const hits=ray.intersectObjects(api.scene.children,true);for(const hit of hits){if(!hit.object.visible)continue;let node=hit.object,actor=null,hidden=false;while(node){if(!node.visible)hidden=true;if(node.userData?.campusPerson)actor=node.userData.campusPerson;node=node.parent}if(hidden)continue;if(actor?.person){open(actor.person.id);return}if(hit.object.material?.transparent!==true)return}
 });
 renderList();renderProfile(null);window.campusPeople={update,open,close,actors,isTap};
})();

