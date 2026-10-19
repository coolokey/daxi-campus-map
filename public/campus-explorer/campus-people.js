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
 const intro=make('p','campus-people-note',`${data.year||115} 學年度教職員名冊。已核對照片的 ${people.filter(p=>p.portrait).length} 位老師分批輪替，在校園或辦公室內走動，位置為導覽示意。警衛與學生為一般示意人物，聊天與問候為校園情境示意。`);
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
 const blockedPoint=p=>!Number.isFinite(p.y)||!!((window.campusPeopleCollisionIndex||window.campusCollisionIndex)?.hit?.(p.x,p.y,p.z)||window.campusCollisionIndex?.pointHit?.(p.x,p.y+1,p.z));
 const clearance=1.36;
 const near=(a,b)=>Math.abs(a.y-b.y)<1.8&&Math.hypot(a.x-b.x,a.z-b.z)<clearance;
 function occupied(p,except){return actors.some(a=>a!==except&&near(a.position,p))||near(api.getPlayerPosition?.()||api.camera.position,p)}
 function outdoors(p){return !(window.campusWalkWorld?.layouts||[]).some(l=>p.x>l.bounds.x0-.8&&p.x<l.bounds.x1+.8&&p.z>l.bounds.z0-.8&&p.z<l.bounds.z1+.8)}
 function safe(p){return outdoors(p)&&!blockedPoint(p)&&Math.abs(p.y)<.25}
 function ground(p){return window.campusWalkWorld?.ground(p)??0}
 // Find the initial position once. Walking never teleports to a new route point.
 function place(x,z,index){for(let ring=0;ring<=6;ring++)for(let n=0;n<(ring?12:1);n++){const angle=(n+index*.37)*Math.PI/6,p={x:x+Math.cos(angle)*ring*1.8,y:0,z:z+Math.sin(angle)*ring*1.8};p.y=ground(p);if(safe(p)&&!actors.some(a=>Math.hypot(a.position.x-p.x,a.position.z-p.z)<clearance))return p}return null}
 const guardPoint=CampusOutdoorPlan.entrance.world(-8,-1),guardPosition=place(guardPoint.x,guardPoint.z,0);
 if(guardPosition)actors.push({id:'gate-guard',label:'警衛先生',stationary:true,position:guardPosition,spec:{role:'guard',gender:'male',hairStyle:'short',outfit:'casual',shirtColor:0x465e76,hairColor:0x45403b}});
 zones.forEach((z,i)=>{const companion=i%4===1?actors.filter(a=>a.spec.role==='student').at(-1):null;const position=(companion&&place(companion.position.x+2.4,companion.position.z,i))||place(z[0],z[1],i);if(position)actors.push({id:'student-'+i,position,start:{...position},direction:1,axis:z[2]?'x':'z',length:z[2]||z[3],speed:.85+(i%3)*.12,nextWalk:0,spec:{gender:i%2?'female':'male',outfit:'uniform',role:'student'}})});
 const roster=people.filter(p=>p.portrait),teacherLimit=()=>Math.min(roster.length,window.innerWidth<=768?3:6);
 let bag=[],age=0,retryAt=0;
 function nextTeacher(){
  if(!bag.length){bag=roster.slice();for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}}
  const i=bag.findIndex(p=>!actors.some(a=>a.person?.id===p.id));return i<0?null:bag.splice(i,1)[0];
 }
 function inRoom(actor,p){const q=actor.layout.local(p.x,p.z),r=actor.room;
  // Shifted entrances reserve the door-to-destination lane for visitors.
  if(r.entranceOffset&&r.door&&r.center){const a=r.door,b=r.center,dx=b.x-a.x,dz=b.z-a.z,len=dx*dx+dz*dz,t=len?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/len)):0;if(Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz)<clearance+.24)return false;}
  return Math.abs(p.y-(r.floor-1)*3.6)<.24&&q.u>r.u0+.65&&q.u<r.u1-.65&&q.v>r.v0+.65&&q.v<r.v1-.65}
 function allowed(actor,p){return !blockedPoint(p)&&(actor.room?inRoom(actor,p):safe(p))}
 function roomPoint(layout,room){return layout.world(room.u0+.8+Math.random()*Math.max(0,room.u1-room.u0-1.6),room.v0+.8+Math.random()*Math.max(0,room.v1-room.v0-1.6),(room.floor-1)*3.6)}
 function spawnTeacher(){
  const person=nextTeacher();if(!person)return false;
  const look=String(person.id).split('').reduce((n,c)=>n+c.charCodeAt(0),0),clothingStyle=['blazer','cardigan','shirt','polo'][look%4];
  const actor={id:person.id,person,born:age,speed:.55+Math.random()*.25,direction:Math.random()<.5?-1:1,expires:age+24+Math.random()*14,spec:{...(person.appearance||{}),gender:person.appearance?.gender||person.gender||'male',role:'teacher',clothingStyle,pantsColor:[0x514b48,0x49545c,0x716755,0x535c51][look%4]}};
  const roomId=api.rooms?.[person.destination]?.aliasFor||person.destination;
  if(Math.random()<.5){for(const layout of window.campusWalkWorld?.layouts||[]){const room=layout.rooms?.find(r=>r.id===roomId);if(!room||!layout.local||!layout.world)continue;
   actor.layout=layout;actor.room=room;
   for(let n=0;n<30;n++){const p=roomPoint(layout,room);if(allowed(actor,p)&&Math.abs(ground(p)-p.y)<.24&&!occupied(p)){actor.position=p;break}}
   if(actor.position)break;delete actor.room;delete actor.layout;
  }}
  if(!actor.position){for(let n=0;n<zones.length;n++){const zone=zones[Math.floor(Math.random()*zones.length)],p=place(zone[0],zone[1],n);if(p&&!occupied(p)){actor.position=p;break}}}
  if(!actor.position){bag.unshift(person);return false}
  actor.start={...actor.position};actor.axis=Math.random()<.5?'x':'z';actor.length=3;actor.nextWalk=0;actors.push(actor);return true;
 }
 function removeActor(actor){if(walkSearch?.actor===actor)walkSearch=null;actor.tag?.remove();actor.bubble?.remove();if(actor.root){api.scene.remove(actor.root);const materials=new Set();actor.root.traverse(n=>{if(n.userData.campusOwnedGeometry)n.geometry?.dispose();for(const m of Array.isArray(n.material)?n.material:[n.material])if(m)materials.add(m)});materials.forEach(m=>m.dispose())}actors.splice(actors.indexOf(actor),1)}
 function rotateTeachers(){
  const teachers=actors.filter(a=>a.person),limit=teacherLimit();
  for(const actor of teachers){if(actors.filter(a=>a.person).length>limit||(age>=actor.expires&&!actor.conversation))removeActor(actor)}
  if(age<retryAt)return;
  while(actors.filter(a=>a.person).length<limit)if(!spawnTeacher()){retryAt=age+2;break}
 }
 rotateTeachers();
 const THREE=window.THREE;
 function ensureRoot(actor){if(actor.root||!THREE||!api.createCharacter)return;actor.root=api.createCharacter(actor.spec);actor.root.userData.campusPerson=actor;actor.root.position.set(actor.position.x,actor.position.y,actor.position.z);api.scene.add(actor.root);actor.root.rotation.y=actor.heading||0;actor.limbs=['avatar-arm-left','avatar-arm-right','avatar-leg-left','avatar-leg-right'].map(n=>actor.root.getObjectByName(n));if(actor.person||actor.label){actor.tag=make('span','campus-person-tag',actor.person?.name||actor.label);actor.tag.hidden=true;tags.append(actor.tag)}}
 let lastSelection=-1,active=[];
 function choose(time,player){if(time-lastSelection<.35&&lastSelection>=0)return;lastSelection=time;const max=window.innerWidth<=768?7:14;
  const floor=document.body.dataset.controlMode==='bird'?(api.getFloorFilter?.()??'all'):'all';
  active=actors.map(actor=>({actor,distance:Math.hypot(actor.position.x-player.x,actor.position.z-player.z)})).filter(a=>a.distance<85&&(floor==='all'||!a.actor.room||a.actor.room.floor===Number(floor))&&(!near(a.actor.position,player)||a.actor.root?.visible)).sort((a,b)=>a.distance-b.distance).slice(0,max).map(a=>a.actor);
  for(const actor of actors){const visible=active.includes(actor);if(visible)ensureRoot(actor);if(actor.root)actor.root.visible=visible;if(actor.tag)actor.tag.hidden=true}
 }
 function canMove(actor,from,to){const d=Math.hypot(to.x-from.x,to.z-from.z),steps=Math.max(1,Math.ceil(d/.06));for(let i=0;i<=steps;i++){const p={x:from.x+(to.x-from.x)*i/steps,y:from.y,z:from.z+(to.z-from.z)*i/steps};p.y=ground(p);if(Math.abs(p.y-from.y)>.24||!(actor?allowed(actor,p):safe(p)))return false}return true}
 function clearWalk(from,to){return canMove(null,from,to)}
 // One search frontier advances at most 400 cells per frame, shared by all students.
 let nextWalkPlan=0,walkSearch=null,lastSearchAge=-1,plannerCandidate=null;
 function finishWalk(actor,origin,destination,path){
  if(path){actor.walkOrigin=origin;actor.walkDestination=destination;actor.previousZone=destination.zone;actor.walkPath=path;actor.walkIndex=1;actor.walkBlocked=0}
  actor.nextWalk=age+1+Math.random();
 }
 function advanceWalkSearch(){
  if(!walkSearch||lastSearchAge===age)return;lastSearchAge=age;
  const job=walkSearch,points=window.CampusGridSearch.path(job.state,job.cell,job.free,400);
  if(!points&&job.state.head<job.state.queue.length&&job.state.head<130000)return;
  let path=null;
  if(points){const route=points.map(p=>({x:job.origin.x+p.x,y:0,z:job.origin.z+p.z}));route.push(job.destination);if(route.every((p,i)=>!i||clearWalk(route[i-1],p)))path=route}
  finishWalk(job.actor,job.origin,job.destination,path);walkSearch=null;
 }
 function planWalk(actor){
  if(walkSearch||actor!==plannerCandidate)return;
  if(age<actor.nextWalk||age<nextWalkPlan)return;nextWalkPlan=age+.15;
  actor.lastPlan=age;
  const candidates=zones.map((z,i)=>({x:z[0],y:0,z:z[1],zone:i})).filter(p=>Math.hypot(p.x-actor.position.x,p.z-actor.position.z)>=18&&p.zone!==actor.previousZone&&safe(p));
  if(!candidates.length){actor.nextWalk=age+2;return}
  const destination=candidates[Math.floor(Math.random()*candidates.length)],origin={...actor.position},grid=window.CampusGridSearch;
  if(clearWalk(origin,destination))finishWalk(actor,origin,destination,[origin,destination]);
  else if(grid){
   const step=1,cell={x:Math.round((destination.x-origin.x)/step),z:Math.round((destination.z-origin.z)/step)};
   const free=(x,z)=>{const p={x:origin.x+x*step,y:0,z:origin.z+z*step};return p.x>=-118&&p.x<=48&&p.z>=-62&&p.z<=83&&safe(p)};
   walkSearch={actor,origin,destination,cell,free,state:grid.create({x:0,z:0})};
  }else actor.nextWalk=age+2;
 }
 function syncActor(actor,moved,time){if(!actor.root)return;const p=actor.position;actor.root.position.set(p.x,p.y,p.z);actor.root.rotation.y=actor.heading||0;for(let i=0;i<actor.limbs.length;i++)if(actor.limbs[i])actor.limbs[i].rotation.x=moved?Math.sin(time*5+((i===0||i===3)?0:Math.PI))*.22:0}
 function roomTarget(actor){for(let i=0;i<20;i++){const p=roomPoint(actor.layout,actor.room);if(Math.hypot(p.x-actor.position.x,p.z-actor.position.z)>.7&&canMove(actor,actor.position,p)&&!occupied(p,actor))return p}return null}
 function move(actor,delta,time){
  if(actor.stationary||actor.conversation||age<(actor.idleUntil||0)){syncActor(actor,false,time);return}
  const p=actor.position,walker=!actor.room;let remaining=Math.min(delta,.1)*actor.speed,moved=false;
  actor.activity='walking';
  if(walker){
   if(!actor.walkPath)planWalk(actor);
   actor.target=actor.walkPath?.[actor.walkIndex]||null;
   if(actor.target&&Math.hypot(actor.target.x-p.x,actor.target.z-p.z)<.08){actor.walkIndex++;actor.target=actor.walkPath[actor.walkIndex]||null;if(!actor.target){actor.walkPath=null;actor.nextWalk=age+2+Math.random()*3;actor.idleUntil=actor.nextWalk;actor.activity='idle'}}
   if(!actor.target)remaining=0;
  }
  if(actor.room&&(!actor.target||Math.hypot(actor.target.x-p.x,actor.target.z-p.z)<.2))actor.target=roomTarget(actor);
  while(remaining>0){const step=Math.min(remaining,.035),next={...p};next[actor.axis]+=step*actor.direction;next.y=ground(next);
   if(actor.target){const dx=actor.target.x-p.x,dz=actor.target.z-p.z,d=Math.hypot(dx,dz);next.x=p.x+dx/Math.max(d,.001)*step;next.z=p.z+dz/Math.max(d,.001)*step;next.y=ground(next)}
   if(!canMove(actor,p,next)||occupied(next,actor)){
    if(walker){actor.walkBlocked=(actor.walkBlocked||0)+Math.min(delta,.1);if(actor.walkBlocked>1.8){actor.walkPath=null;actor.target=null;actor.nextWalk=age+.5+Math.random()}}
    else{actor.direction*=-1;actor.target=null;actor.idleUntil=age+.6}break;
   }
   actor.walkBlocked=0;actor.heading=Math.atan2(next.x-p.x,next.z-p.z);Object.assign(p,next);remaining-=step;moved=true;
  }
  syncActor(actor,moved,time);
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
  const hits=ray.intersectObjects(api.scene.children,true);ray.far=Infinity;return hits.some(hit=>{let node=hit.object;while(node){if(!node.visible||node.userData?.campusPerson)return false;node=node.parent}return hit.object.visible&&hit.object.material?.transparent!==true});
 }
 // Conversations reserve existing, collision-safe positions. No actor is
 // teleported into a group; both participants stop and face one another.
 const conversations=[],playerSpeaker={id:'player',label:'你',spec:{role:'student'},position:{x:0,y:0,z:0}};
 const dialogueLog=make('div');dialogueLog.id='campus-dialogue-log';dialogueLog.className='campus-dialogue-log';dialogueLog.setAttribute('role','log');dialogueLog.setAttribute('aria-live','polite');dialogueLog.setAttribute('aria-label','校園互動對話');document.body.append(dialogueLog);
 let nextSocial=.5,nextGreeting=0;
 function canConverse(a,b){if(Math.abs(a.y-b.y)>.35)return false;const d=Math.hypot(a.x-b.x,a.z-b.z),n=Math.max(1,Math.ceil(d/.08));for(let i=0;i<=n;i++){const t=i/n;if(window.campusCollisionIndex?.pointHit?.(a.x+(b.x-a.x)*t,a.y+1.35,a.z+(b.z-a.z)*t))return false}return true}
 const personLabel=a=>a===playerSpeaker?'你':a.person?.name||a.label||(a.spec.role==='teacher'?'老師':'同學');
 function say(actor,text){actor.speech={text,until:age+2.2};const line=make('p','',personLabel(actor)+'：'+text);dialogueLog.append(line);while(dialogueLog.children.length>12)dialogueLog.firstElementChild.remove();}
 function endConversation(c){for(const a of c.members)a.speech=null;for(const a of c.members)if(a!==playerSpeaker&&a.conversation===c){a.conversation=null;a.activity='idle';a.idleUntil=age+.6;}const i=conversations.indexOf(c);if(i>=0)conversations.splice(i,1);}
 function startConversation(a,b,lines,greeting=false){
  if(!a||!b||a.conversation||b.conversation||!canConverse(a.position,b.position))return null;
  if(conversations.length>=(window.innerWidth<=768?1:2))return null;
  const c={members:[a,b],lines,index:0,nextAt:age,finishAt:age+lines.length*2.2,greeting};conversations.push(c);
  for(const actor of c.members)if(actor!==playerSpeaker){actor.conversation=c;actor.activity=greeting?'greeting':'chat';actor.nextSocial=c.finishAt+18+Math.random()*12;if(actor.person)actor.expires=Math.max(actor.expires,c.finishAt+1);}
  return c;
 }
 function greet(actor){
  if(!actor||document.body.dataset.controlMode==='bird'||age<nextGreeting||actor.greetArmed===false)return false;
  playerSpeaker.position=api.getPlayerPosition?.()||playerSpeaker.position;
  if(Math.hypot(actor.position.x-playerSpeaker.position.x,actor.position.z-playerSpeaker.position.z)>2.8||!canConverse(actor.position,playerSpeaker.position))return false;
  if(actor.conversation)endConversation(actor.conversation);
  // A player greeting takes priority over ambient small talk on small screens.
  if(conversations.length>=(window.innerWidth<=768?1:2)){const ambient=conversations.find(c=>!c.greeting);if(ambient)endConversation(ambient);}
  const guard=actor.spec.role==='guard',teacher=!!actor.person,lines=[{speaker:playerSpeaker,text:teacher?'老師好！':guard?'警衛先生好！':'嗨，同學好！'},{speaker:actor,text:teacher?'同學好！今天也要加油。':guard?'同學好，進出校門注意安全。':'你好！一起加油！'}];
  if(!startConversation(playerSpeaker,actor,lines,true))return false;actor.greetArmed=false;nextGreeting=age+12;return true;
 }
 function updateSocial(player){
  playerSpeaker.position=player;
  for(const actor of actors)if(Math.hypot(actor.position.x-player.x,actor.position.z-player.z)>4)actor.greetArmed=true;
  if(document.body.dataset.controlMode!=='bird'&&age>=nextGreeting){const nearby=actors.filter(a=>(a.person||a.spec.role==='guard')&&a.greetArmed!==false&&Math.hypot(a.position.x-player.x,a.position.z-player.z)<2.8).sort((a,b)=>Math.hypot(a.position.x-player.x,a.position.z-player.z)-Math.hypot(b.position.x-player.x,b.position.z-player.z));for(const actor of nearby)if(greet(actor))break;}
  if(age>=nextSocial){nextSocial=age+3;const pool=actors.filter(a=>!a.stationary&&!a.conversation&&age>=(a.nextSocial||0)&&Math.hypot(a.position.x-player.x,a.position.z-player.z)<24&&(!a.person||age<a.expires-1));let paired=false;
   for(let i=0;i<pool.length&&!paired;i++)for(let j=i+1;j<pool.length;j++){const a=pool[i],b=pool[j],d=Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z);if(d<1.6||d>3.5||!canConverse(a.position,b.position))continue;
    const teacherA=!!a.person,teacherB=!!b.person;let lines;
    if(teacherA&&teacherB)lines=[{speaker:a,text:'老師好，辛苦了！'},{speaker:b,text:'您也是，一起加油。'},{speaker:a,text:'下節課見！'}];
    else if(teacherA||teacherB){const teacher=teacherA?a:b,student=teacherA?b:a;lines=[{speaker:student,text:'老師好！'},{speaker:teacher,text:'同學好！有問題都可以問老師。'},{speaker:student,text:'謝謝老師！'}];}
    else lines=[{speaker:a,text:'下課一起去操場嗎？'},{speaker:b,text:'好啊，等一下見！'},{speaker:a,text:'上課也一起加油！'}];
    paired=!!startConversation(a,b,lines);if(paired)break;
   }
  }
  for(const c of [...conversations]){const [a,b]=c.members;if(c.members.some(a=>a!==playerSpeaker&&!actors.includes(a))||!canConverse(a.position,b.position)||(c.greeting&&Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z)>5)||age>=c.finishAt){endConversation(c);continue;}
   for(const [actor,other] of [[a,b],[b,a]])if(actor!==playerSpeaker)actor.heading=Math.atan2(other.position.x-actor.position.x,other.position.z-actor.position.z);
   if(age>=c.nextAt&&c.index<c.lines.length){const line=c.lines[c.index++];say(line.speaker,line.text);c.nextAt=age+2.2;}
  }
 }
 function renderSpeech(player,time){
  const speakers=[...actors,playerSpeaker];for(const actor of speakers){if(actor.bubble)actor.bubble.hidden=true;if(!actor.speech||age>=actor.speech.until||document.body.dataset.controlMode==='bird')continue;
   if(actor!==playerSpeaker&&(!actor.root?.visible||Math.hypot(actor.position.x-player.x,actor.position.z-player.z)>18))continue;
   if(!actor.bubble){actor.bubble=make('div','campus-speech'+(actor===playerSpeaker?' campus-speech-player':''));actor.bubble.setAttribute('aria-hidden','true');document.body.append(actor.bubble);}
   actor.bubble.textContent=personLabel(actor)+'：'+actor.speech.text;
   // In first person the avatar is behind the camera. Anchor its reply beside
   // the visible conversation partner instead of projecting the camera itself.
   const firstPersonReply=actor===playerSpeaker&&document.body.dataset.controlMode==='firstperson';
   const anchor=firstPersonReply?conversations.find(c=>c.members.includes(playerSpeaker))?.members.find(a=>a!==playerSpeaker):actor;
   if(!anchor)continue;
   {const point=new THREE.Vector3(anchor.position.x,anchor.position.y+(anchor.person?2.3:2.05),anchor.position.z),screen=point.clone().project(api.camera);if(screen.z< -1||screen.z>1||Math.abs(screen.x)>1||Math.abs(screen.y)>1)continue;
    if(actor.nextSpeechOcclusion===undefined||time>=actor.nextSpeechOcclusion){actor.speechOccluded=occluded(point);actor.nextSpeechOcclusion=time+.25;}if(actor.speechOccluded)continue;
    const rect=api.renderer.domElement.getBoundingClientRect();let left=rect.left+(screen.x+1)*rect.width/2,top=rect.top+(1-screen.y)*rect.height/2;
    if(firstPersonReply){left+=(screen.x>0?-1:1)*Math.min(80,rect.width*.18);top+=48;}
    actor.bubble.hidden=false;
    const halfWidth=actor.bubble.offsetWidth/2,headroom=actor.bubble.offsetHeight*1.1+8;
    left=Math.max(rect.left+halfWidth+8,Math.min(rect.left+rect.width-halfWidth-8,left));
    top=Math.max(rect.top+headroom,Math.min(rect.top+rect.height-8,top));
    actor.bubble.style.left=`${left}px`;actor.bubble.style.top=`${top}px`;
   }
   actor.bubble.hidden=false;if(actor.tag)actor.tag.hidden=true;
  }
 }
 function update(delta,time){const paused=document.hidden||dialog.open||document.getElementById('guide-landing')?.open||api.motionBlocked?.();
  if(paused){for(const actor of [...actors,playerSpeaker]){if(actor.tag)actor.tag.hidden=true;if(actor.bubble)actor.bubble.hidden=true;}return}
  age+=Math.min(delta,.1);rotateTeachers();advanceWalkSearch();
  plannerCandidate=actors.filter(a=>!a.stationary&&!a.room&&!a.conversation&&!a.walkPath&&age>=(a.nextWalk||0)).sort((a,b)=>(a.lastPlan??-1)-(b.lastPlan??-1))[0];
  const player=api.getPlayerPosition?.()||api.camera?.position||{x:0,y:0,z:0};choose(time,player);updateSocial(player);
  for(const actor of actors){move(actor,delta,time);fade(actor)}
  for(const actor of active){if(!actors.includes(actor)||!actor.tag)continue;actor.tag.hidden=true;if(actor.speech&&age<actor.speech.until)continue;
   if(document.body.dataset.controlMode==='bird'||Math.hypot(actor.position.x-player.x,actor.position.z-player.z)>12)continue;
   projected.set(actor.position.x,actor.position.y+2.05,actor.position.z).project(api.camera);
   if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1||Math.abs(projected.y)>1)continue;
   if(actor.nextOcclusion===undefined||time>=actor.nextOcclusion){
    actor.isOccluded=occluded(new THREE.Vector3(actor.position.x,actor.position.y+2.05,actor.position.z));actor.nextOcclusion=time+.25;
   }
   if(actor.isOccluded)continue;
   const rect=api.renderer.domElement.getBoundingClientRect();actor.tag.style.left=`${rect.left+(projected.x+1)*rect.width/2}px`;actor.tag.style.top=`${rect.top+(1-projected.y)*rect.height/2}px`;actor.tag.hidden=false;
  }
  renderSpeech(player,time);
 }
 function isTap(start,end){return !!start&&Math.hypot(end.x-start.x,end.y-start.y)<=6&&end.time-start.time<=450}
 let pointer=null;const canvas=api.renderer?.domElement;
 canvas?.addEventListener('pointerdown',event=>{pointer=event.isPrimary===false||(event.button!==undefined&&event.button!==0)?null:{id:event.pointerId,x:event.clientX,y:event.clientY,time:event.timeStamp,moved:false}});
 canvas?.addEventListener('pointermove',event=>{if(pointer&&Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>6)pointer.moved=true});
 canvas?.addEventListener('pointercancel',()=>pointer=null);
 canvas?.addEventListener('pointerup',event=>{const start=pointer;pointer=null;if(!start||start.moved||event.pointerId!==start.id||!isTap(start,{x:event.clientX,y:event.clientY,time:event.timeStamp})||!ray||dialog.open||document.body.dataset.controlMode==='bird')return;
  const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;ray.setFromCamera({x:(event.clientX-rect.left)/rect.width*2-1,y:1-(event.clientY-rect.top)/rect.height*2},api.camera);
  // Raycast the whole scene so a wall in front of a teacher prevents selection.
  const hits=ray.intersectObjects(api.scene.children,true);for(const hit of hits){if(!hit.object.visible)continue;let node=hit.object,actor=null,hidden=false;while(node){if(!node.visible)hidden=true;if(node.userData?.campusPerson)actor=node.userData.campusPerson;node=node.parent}if(hidden)continue;if(actor?.person){open(actor.person.id);return}if(actor){greet(actor);return}if(hit.object.material?.transparent!==true)return}
 });
 renderList();renderProfile(null);window.campusPeople={update,open,close,actors,isTap,blocksPlayer,canMove,canConverse,conversations,interact:id=>greet(actors.find(a=>a.id===id))};
})();

