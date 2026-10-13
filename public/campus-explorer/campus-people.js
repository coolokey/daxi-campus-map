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
 const intro=make('p','campus-people-note',`${data.year||115} 學年度教職員名冊。已核對照片的 ${people.filter(p=>p.portrait).length} 位老師分批輪替，在校園或辦公室內走動，位置為導覽示意。警衛與學生為一般示意人物。`);
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
 const blockedPoint=p=>!Number.isFinite(p.y)||!!(window.campusCollisionIndex?.hit?.(p.x,p.y,p.z)||window.campusCollisionIndex?.pointHit?.(p.x,p.y+1,p.z));
 const clearance=1.1;
 const near=(a,b)=>Math.abs(a.y-b.y)<1.8&&Math.hypot(a.x-b.x,a.z-b.z)<clearance;
 function occupied(p,except){return actors.some(a=>a!==except&&near(a.position,p))||near(api.getPlayerPosition?.()||api.camera.position,p)}
 function outdoors(p){return !(window.campusWalkWorld?.layouts||[]).some(l=>p.x>l.bounds.x0-.8&&p.x<l.bounds.x1+.8&&p.z>l.bounds.z0-.8&&p.z<l.bounds.z1+.8)}
 function safe(p){return outdoors(p)&&!blockedPoint(p)&&Math.abs(p.y)<.25}
 function ground(p){return window.campusWalkWorld?.ground(p)??0}
 // Find the initial position once. Walking never teleports to a new route point.
 function place(x,z,index){for(let ring=0;ring<=6;ring++)for(let n=0;n<(ring?12:1);n++){const angle=(n+index*.37)*Math.PI/6,p={x:x+Math.cos(angle)*ring*1.8,y:0,z:z+Math.sin(angle)*ring*1.8};p.y=ground(p);if(safe(p)&&!actors.some(a=>Math.hypot(a.position.x-p.x,a.position.z-p.z)<1.3))return p}return null}
 const guardPosition=place(-18,87,0);
 if(guardPosition)actors.push({id:'gate-guard',label:'警衛先生',stationary:true,position:guardPosition,spec:{role:'guard',gender:'male',hairStyle:'short',outfit:'casual',shirtColor:0x465e76,hairColor:0x45403b}});
 zones.forEach((z,i)=>{const position=place(z[0],z[1],i);if(position)actors.push({id:'student-'+i,position,start:{...position},direction:1,axis:z[2]?'x':'z',length:z[2]||z[3],speed:.55+(i%3)*.12,spec:{gender:i%2?'female':'male',outfit:'uniform',role:'student'}})});
 const roster=people.filter(p=>p.portrait),teacherLimit=()=>Math.min(roster.length,window.innerWidth<=768?3:6);
 let bag=[],age=0,retryAt=0;
 function nextTeacher(){
  if(!bag.length){bag=roster.slice();for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}}
  const i=bag.findIndex(p=>!actors.some(a=>a.person?.id===p.id));return i<0?null:bag.splice(i,1)[0];
 }
 function inRoom(actor,p){const q=actor.layout.local(p.x,p.z),r=actor.room;return Math.abs(p.y-(r.floor-1)*3.6)<.24&&q.u>r.u0+.65&&q.u<r.u1-.65&&q.v>r.v0+.65&&q.v<r.v1-.65}
 function allowed(actor,p){return !blockedPoint(p)&&(actor.room?inRoom(actor,p):safe(p))}
 function roomPoint(layout,room){return layout.world(room.u0+.8+Math.random()*Math.max(0,room.u1-room.u0-1.6),room.v0+.8+Math.random()*Math.max(0,room.v1-room.v0-1.6),(room.floor-1)*3.6)}
 function spawnTeacher(){
  const person=nextTeacher();if(!person)return false;
  const actor={id:person.id,person,born:age,speed:.55+Math.random()*.25,direction:Math.random()<.5?-1:1,expires:age+24+Math.random()*14,spec:{...(person.appearance||{}),gender:person.appearance?.gender||person.gender||'male',role:'teacher'}};
  const roomId=api.rooms?.[person.destination]?.aliasFor||person.destination;
  if(Math.random()<.5){for(const layout of window.campusWalkWorld?.layouts||[]){const room=layout.rooms?.find(r=>r.id===roomId);if(!room||!layout.local||!layout.world)continue;
   actor.layout=layout;actor.room=room;
   for(let n=0;n<30;n++){const p=roomPoint(layout,room);if(allowed(actor,p)&&Math.abs(ground(p)-p.y)<.24&&!occupied(p)){actor.position=p;break}}
   if(actor.position)break;delete actor.room;delete actor.layout;
  }}
  if(!actor.position){for(let n=0;n<zones.length;n++){const zone=zones[Math.floor(Math.random()*zones.length)],p=place(zone[0],zone[1],n);if(p&&!occupied(p)){actor.position=p;break}}}
  if(!actor.position){bag.unshift(person);return false}
  actor.start={...actor.position};actor.axis=Math.random()<.5?'x':'z';actor.length=3;actors.push(actor);return true;
 }
 function removeActor(actor){actor.tag?.remove();if(actor.root){api.scene.remove(actor.root);const materials=new Set();actor.root.traverse(n=>{if(n.userData.campusOwnedGeometry)n.geometry?.dispose();for(const m of Array.isArray(n.material)?n.material:[n.material])if(m)materials.add(m)});materials.forEach(m=>m.dispose())}actors.splice(actors.indexOf(actor),1)}
 function rotateTeachers(){
  const teachers=actors.filter(a=>a.person),limit=teacherLimit();
  for(const actor of teachers){if(actors.filter(a=>a.person).length>limit||age>=actor.expires)removeActor(actor)}
  if(age<retryAt)return;
  while(actors.filter(a=>a.person).length<limit)if(!spawnTeacher()){retryAt=age+2;break}
 }
 rotateTeachers();
 const THREE=window.THREE;
 function ensureRoot(actor){if(actor.root||!THREE||!api.createCharacter)return;actor.root=api.createCharacter(actor.spec);actor.root.userData.campusPerson=actor;actor.root.position.set(actor.position.x,actor.position.y,actor.position.z);api.scene.add(actor.root);actor.limbs=['avatar-arm-left','avatar-arm-right','avatar-leg-left','avatar-leg-right'].map(n=>actor.root.getObjectByName(n));if(actor.person||actor.label){actor.tag=make('span','campus-person-tag',actor.person?.name||actor.label);actor.tag.hidden=true;tags.append(actor.tag)}}
 let lastSelection=-1,active=[];
 function choose(time,player){if(time-lastSelection<.35&&lastSelection>=0)return;lastSelection=time;const max=window.innerWidth<=768?7:14;
  const floor=api.getFloorFilter?.()??'all';
  active=actors.map(actor=>({actor,distance:Math.hypot(actor.position.x-player.x,actor.position.z-player.z)})).filter(a=>a.distance<85&&(floor==='all'||!a.actor.room||a.actor.room.floor===Number(floor))&&(!near(a.actor.position,player)||a.actor.root?.visible)).sort((a,b)=>a.distance-b.distance).slice(0,max).map(a=>a.actor);
  for(const actor of actors){const visible=active.includes(actor);if(visible)ensureRoot(actor);if(actor.root)actor.root.visible=visible;if(actor.tag)actor.tag.hidden=true}
 }
 function move(actor,delta,time){if(actor.stationary)return;const p=actor.position;let remaining=Math.min(delta,.1)*actor.speed,moved=false;
  if(actor.person&&actor.room&&(!actor.target||Math.hypot(actor.target.x-p.x,actor.target.z-p.z)<.2))actor.target=roomPoint(actor.layout,actor.room);
  while(remaining>0){const step=Math.min(remaining,.035),next={...p};next[actor.axis]+=step*actor.direction;next.y=ground(next);
   if(actor.target){const dx=actor.target.x-p.x,dz=actor.target.z-p.z,d=Math.hypot(dx,dz);next.x=p.x+dx/Math.max(d,.001)*step;next.z=p.z+dz/Math.max(d,.001)*step;next.y=ground(next)}
   if((!actor.room&&Math.abs(next[actor.axis]-actor.start[actor.axis])>actor.length)||Math.abs(next.y-p.y)>.24||!allowed(actor,next)||occupied(next,actor)){actor.direction*=-1;actor.target=null;break}
   actor.heading=Math.atan2(next.x-p.x,next.z-p.z);Object.assign(p,next);remaining-=step;moved=true;
  }
  if(actor.root){actor.root.position.set(p.x,p.y,p.z);if(moved)actor.root.rotation.y=actor.heading;for(let i=0;i<actor.limbs.length;i++)if(actor.limbs[i])actor.limbs[i].rotation.x=moved?Math.sin(time*5+((i===0||i===3)?0:Math.PI))*.22:0}
 }
 function fade(actor){if(!actor.person||!actor.root)return;
  if(!actor.fadeMaterials){const materials=new Set();actor.root.traverse(n=>{for(const m of Array.isArray(n.material)?n.material:[n.material])if(m)materials.add(m)});actor.fadeMaterials=[...materials].map(m=>({m,opacity:m.opacity,transparent:m.transparent}))}
  const opacity=Math.max(0,Math.min(1,(age-actor.born)/.8,(actor.expires-age)/.8));
  for(const entry of actor.fadeMaterials){const transparent=entry.transparent||opacity<1;if(entry.m.transparent!==transparent){entry.m.transparent=transparent;entry.m.needsUpdate=true}entry.m.opacity=entry.opacity*opacity}
 }
 // Sweep the whole movement segment so sprinting or dropped frames cannot tunnel through a person.
 function blocksPlayer(from,to){return actors.some(actor=>{
  if(!actor.root?.visible)return false;const p=actor.position,dx=to.x-from.x,dz=to.z-from.z,d=dx*dx+dz*dz;
  const t=d?Math.max(0,Math.min(1,((p.x-from.x)*dx+(p.z-from.z)*dz)/d)):0;
  const nearest={x:from.x+t*dx,y:from.y+(to.y-from.y)*t,z:from.z+t*dz};
  // Allow an already touching player to back away.
  return near(nearest,p)&&!(near(from,p)&&Math.hypot(to.x-p.x,to.z-p.z)>Math.hypot(from.x-p.x,from.z-p.z));
 })}
 const ray=THREE?new THREE.Raycaster():null,projected=THREE?new THREE.Vector3():null;
 function occluded(position){if(!ray)return false;const direction=position.clone().sub(api.camera.position),distance=direction.length();ray.set(api.camera.position,direction.normalize());ray.far=distance-.4;
  const hits=ray.intersectObjects(api.scene.children,true);ray.far=Infinity;return hits.some(hit=>{let node=hit.object;while(node){if(node.userData?.campusPerson)return false;node=node.parent}return hit.object.visible&&hit.object.material?.transparent!==true});
 }
 function update(delta,time){const paused=document.hidden||dialog.open||document.getElementById('guide-landing')?.open||api.motionBlocked?.();
  if(paused){for(const actor of actors)if(actor.tag)actor.tag.hidden=true;return}
  age+=Math.min(delta,.1);rotateTeachers();
  const player=api.getPlayerPosition?.()||api.camera?.position||{x:0,y:0,z:0};choose(time,player);
  for(const actor of actors){move(actor,delta,time);fade(actor)}
  for(const actor of active){if(!actors.includes(actor)||!actor.tag)continue;actor.tag.hidden=true;
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
 renderList();renderProfile(null);window.campusPeople={update,open,close,actors,isTap,blocksPlayer};
})();

