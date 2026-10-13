import { describe, expect, it, vi } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import * as THREE from 'three';

function setup(width=1280, configure?: (w:any)=>void) {
 const dom=new JSDOM('<body data-control-mode="avatar"><div id="guide-quick-main"></div><canvas></canvas></body>',{runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window as any;w.innerWidth=width;w.THREE=THREE;
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};
 w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'))};
 w.CampusStaffData={year:115,people:[
  {id:'a',name:'張致信',title:'教務主任',portrait:'assets/staff/a.jpg',destination:'academic',appearance:{gender:'male'}},
  {id:'b',name:'張智鈞',title:'總務主任',portrait:null,destination:'general'},
  {id:'c',name:'林老師',title:'數學教師',portrait:null,destination:'missing'},
  {id:'d',name:'<img onerror="alert(1)">',title:'教師',portrait:null},
 ]};
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera();camera.position.set(-10,5,80);
 w.campusExplorer={scene,camera,renderer:{domElement:w.document.querySelector('canvas')},rooms:{academic:{id:'academic'},general:{id:'general'}},
  getPlayerPosition:()=>new THREE.Vector3(-10,0,78),navigateToRoom:vi.fn(),manualTakeover:vi.fn(),motionBlocked:()=>false,
  createCharacter:()=>new THREE.Group()};
 w.campusCollisionIndex={pointHit:()=>false};w.campusWalkWorld={ground:()=>0};
 configure?.(w);
 w.eval(readFileSync('public/campus-explorer/grid-search.js','utf8'));
 const path='public/campus-explorer/campus-people.js';
 if(existsSync(path))w.eval(readFileSync(path,'utf8'));
 return {w,dom,d:w.document,api:w.campusPeople};
}
describe('校園師生名冊',()=>{
 it('正式名冊保留校正職稱，只有具來源登錄的照片可以公開',()=>{
  const source=readFileSync('public/campus-explorer/staff-data.js','utf8');
  const data=JSON.parse(source.slice(source.indexOf('window.CampusStaffData=')+'window.CampusStaffData='.length).trim().replace(/;$/,''));
  const register=JSON.parse(readFileSync('docs/staff/photo-register.json','utf8'));
  expect(data.people).toHaveLength(91);expect(new Set(data.people.map((p:any)=>p.name)).size).toBe(91);
  expect(data.people.find((p:any)=>p.name==='張致信')).toMatchObject({title:'教務主任',portrait:null});
  expect(data.people.find((p:any)=>p.name==='張智鈞')).toMatchObject({title:'總務主任',portrait:null});
  expect(data.people.filter((p:any)=>p.portrait)).toHaveLength(55);
  for(const p of data.people.filter((p:any)=>p.portrait)){
   expect(existsSync('public/campus-explorer/'+p.portrait)).toBe(true);
   expect(register.find((r:any)=>r.id===p.id)).toMatchObject({name:p.name,currentTitle:p.title,status:'name-labelled-photo'});
  }
 });
 it('搜尋姓名與現任職稱，保留校正主任姓名並以文字安全呈現',()=>{
  const s=setup();expect(s.api).toBeDefined();s.d.getElementById('campus-people-open').click();
  const search=s.d.getElementById('campus-people-search');search.value='張';search.dispatchEvent(new s.w.Event('input'));
  expect(s.d.getElementById('campus-people-list').textContent).toContain('張致信');expect(s.d.getElementById('campus-people-list').textContent).toContain('張智鈞');
  search.value='數學';search.dispatchEvent(new s.w.Event('input'));expect(s.d.getElementById('campus-people-list').textContent).toContain('林老師');
  search.value='';search.dispatchEvent(new s.w.Event('input'));expect(s.d.getElementById('campus-people-list').querySelector('img')).toBeNull();s.dom.window.close();
 });
 it('未核對照片明示待補，未知處室不提供導航，空搜尋有提示',()=>{
  const s=setup();expect(s.api).toBeDefined();s.api.open('c');
  expect(s.d.getElementById('campus-people-profile').textContent).toContain('照片待補');
  expect(s.d.getElementById('campus-people-profile').textContent).toContain('校園導覽示意，非即時位置');
  expect(s.d.getElementById('campus-people-go').disabled).toBe(true);
  const search=s.d.getElementById('campus-people-search');search.value='不存在';search.dispatchEvent(new s.w.Event('input'));
  expect(s.d.getElementById('campus-people-list').textContent).toContain('找不到');s.dom.window.close();
 });
 it('核對照片、前往處室、Escape 及關閉後焦點還原',()=>{
  const s=setup();expect(s.api).toBeDefined();const opener=s.d.getElementById('campus-people-open');opener.focus();s.api.open('a');
  expect(s.d.querySelector('#campus-people-profile img').getAttribute('src')).toBe('assets/staff/a.jpg');
  s.d.getElementById('campus-people-go').click();expect(s.w.campusExplorer.navigateToRoom).toHaveBeenCalledWith('academic');
  expect(s.d.getElementById('campus-people-dialog').open).toBe(false);expect(s.d.activeElement).toBe(opener);
  opener.click();s.d.getElementById('campus-people-dialog').dispatchEvent(new s.w.Event('cancel',{cancelable:true}));
  expect(s.d.getElementById('campus-people-dialog').open).toBe(false);expect(s.d.activeElement).toBe(opener);s.dom.window.close();
 });
});
describe('示意人物效能與碰撞',()=>{
 it('手機最多顯示 7 位，老師僅建立核對照片者，開啟名冊時停止走動',()=>{
  const s=setup(390);expect(s.api).toBeDefined();s.api.update(.1,1);
  expect(s.api.actors.filter((a:any)=>a.person)).toHaveLength(1);expect(s.api.actors.filter((a:any)=>a.spec.role==='student')).toHaveLength(12);
  expect(s.api.actors.filter((a:any)=>a.root?.visible).length).toBeLessThanOrEqual(7);
  s.api.open();const before=s.api.actors.map((a:any)=>({...a.position}));s.api.update(.1,2);
  expect(s.api.actors.map((a:any)=>({...a.position}))).toEqual(before);s.dom.window.close();
 });
 it('牆面與過高落差拒絕學生移動，拖曳及長按不當作點擊',()=>{
  const s=setup();expect(s.api).toBeDefined();s.api.update(.1,1);const student=s.api.actors.find((a:any)=>a.spec.role==='student'&&a.root.visible);const before={...student.position};
  s.w.campusCollisionIndex.pointHit=()=>true;s.api.update(.1,2);expect(student.position).toEqual(before);
  s.w.campusCollisionIndex.pointHit=()=>false;s.w.campusWalkWorld.ground=()=>4;s.api.update(.1,3);expect(student.position).toEqual(before);
  expect(s.api.isTap({x:1,y:1,time:0},{x:20,y:1,time:100})).toBe(false);
  expect(s.api.isTap({x:1,y:1,time:0},{x:1,y:1,time:900})).toBe(false);
  expect(s.api.isTap({x:1,y:1,time:0},{x:3,y:2,time:100})).toBe(true);s.dom.window.close();
 });
});

describe('人物場景安全邊界',()=>{
 it('校門口有不戴帽子、穿深藍服裝的固定警衛先生，手機亦可見',()=>{
  const s=setup(390,w=>{w.campusExplorer.getPlayerPosition=()=>new THREE.Vector3(-10,0,90)});s.api.update(.1,1);
  const guard=s.api.actors.find((a:any)=>a.id==='gate-guard');expect(guard).toBeDefined();
  expect(guard.spec).toMatchObject({gender:'male',role:'guard',outfit:'casual'});expect(guard.root.visible).toBe(true);
  expect(Math.hypot(guard.position.x+10,guard.position.z-90)).toBeLessThan(12);
  const before={...guard.position};s.api.update(.1,2);expect(guard.position).toEqual(before);s.dom.window.close();
 });
 it('大量已核對老師在桌面最多顯示 14 位，配置不重疊',()=>{
  const s=setup(1280,w=>{for(let i=0;i<25;i++)w.CampusStaffData.people.push({id:'extra'+i,name:'核對教職員'+i,title:'教師',portrait:'assets/staff/'+i+'.jpg',destination:'academic'})});
  s.api.update(.1,1);expect(s.api.actors.filter((a:any)=>a.root?.visible).length).toBeLessThanOrEqual(14);
  expect(s.api.actors.filter((a:any)=>a.person).length).toBeLessThanOrEqual(6);
  const positions=s.api.actors.map((a:any)=>`${a.position.x.toFixed(2)},${a.position.z.toFixed(2)}`);
  expect(new Set(positions).size).toBe(positions.length);s.dom.window.close();
 });
 it('封面及背景分頁停止走動，移除阻擋後才繼續',()=>{
  const s=setup();s.api.update(.1,1);const cover=s.d.createElement('dialog');cover.id='guide-landing';s.d.body.append(cover);cover.showModal();
  const before=s.api.actors.map((a:any)=>({...a.position}));s.api.update(.1,2);expect(s.api.actors.map((a:any)=>({...a.position}))).toEqual(before);
  cover.close();Object.defineProperty(s.d,'hidden',{configurable:true,value:true});s.api.update(.1,3);expect(s.api.actors.map((a:any)=>({...a.position}))).toEqual(before);
  Object.defineProperty(s.d,'hidden',{configurable:true,value:false});s.api.update(.1,4);expect(s.api.actors.map((a:any)=>({...a.position}))).not.toEqual(before);s.dom.window.close();
 });
 it('無有效戶外位置時不把人物生成在牆內或室內',()=>{
  const s=setup(1280,w=>{w.campusCollisionIndex.pointHit=()=>true});s.api.update(.1,1);expect(s.api.actors).toHaveLength(0);s.dom.window.close();
 });
});

describe('老師輪替與人物避讓',()=>{
 it('學生走向遠處的校園目的地，持續移動超過原本短距離折返範圍',()=>{
  const s=setup(1280,w=>{let seed=17;w.Math.random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647}});
  const students=s.api.actors.filter((a:any)=>a.spec.role==='student'),initial=students.map((a:any)=>({...a.position}));
  let maxDisplacement=0;
  for(let tick=0;tick<550;tick++){
   s.api.update(.1,tick*.1);
   students.forEach((a:any,i:number)=>{maxDisplacement=Math.max(maxDisplacement,Math.hypot(a.position.x-initial[i].x,a.position.z-initial[i].z))});
  }
  expect(maxDisplacement).toBeGreaterThan(18);
  expect(students.some((a:any)=>a.walkDestination&&Math.hypot(a.walkDestination.x-a.walkOrigin.x,a.walkDestination.z-a.walkOrigin.z)>=18)).toBe(true);
  s.dom.window.close();
 },15000);
 it('55 位老師分批輪流出現，一輪內不重複，名冊仍完整',()=>{
  const s=setup(1280,w=>{w.CampusStaffData.people=Array.from({length:55},(_,i)=>({id:'t'+i,name:'老師'+i,portrait:'p.jpg',destination:'academic'}))});
  const seen=new Set<string>();let maxTeachers=0;
  for(let tick=0;tick<7000&&seen.size<55;tick++){
   s.api.update(.1,tick*.1);
   const teachers=s.api.actors.filter((a:any)=>a.person);maxTeachers=Math.max(maxTeachers,teachers.length);
   teachers.forEach((a:any)=>seen.add(a.id));
  }
  expect(maxTeachers).toBeLessThanOrEqual(6);expect(seen.size).toBe(55);expect(s.d.querySelectorAll('#campus-people-list button')).toHaveLength(55);s.dom.window.close();
 },15000);
 it('相向走動不重疊，玩家高速移動不能穿過人物，不同樓層互不阻擋',()=>{
  const s=setup();s.api.update(.1,1);
  const students=s.api.actors.filter((a:any)=>a.spec.role==='student');
  const [a,b]=students;a.position={x:-15,y:0,z:79};b.position={x:-13.8,y:0,z:79};
  a.start={...a.position};b.start={...b.position};a.axis=b.axis='x';a.direction=1;b.direction=-1;a.length=b.length=4;
  for(let i=0;i<100;i++)s.api.update(.1,2+i*.1);
  expect(Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z)).toBeGreaterThanOrEqual(1.05);
  a.root.visible=true;
  expect(s.api.blocksPlayer({x:a.position.x-3,y:0,z:a.position.z},{x:a.position.x+3,y:0,z:a.position.z})).toBe(true);
  expect(s.api.blocksPlayer({x:a.position.x-3,y:3.6,z:a.position.z},{x:a.position.x+3,y:3.6,z:a.position.z})).toBe(false);s.dom.window.close();
 });
 it('辦公室人物留在房間內，並尊重樓層顯示',()=>{
  const s=setup(1280,w=>{
   w.Math.random=()=>.2;
   w.campusExplorer.rooms.academic.aliasFor='actual-office';
   const room={id:'actual-office',floor:2,u0:-5,u1:5,v0:-4,v1:4};
   w.campusWalkWorld={ground:(p:any)=>p.x>20?3.6:0,layouts:[{bounds:{x0:25,x1:35,z0:36,z1:44},rooms:[room],local:(x:number,z:number)=>({u:x-30,v:z-40}),world:(u:number,v:number,y:number)=>({x:30+u,y,z:40+v})}]};
   w.campusExplorer.getFloorFilter=()=>2;
  });
  const teacher=s.api.actors.find((a:any)=>a.person);expect(teacher.room?.id).toBe('actual-office');const before={...teacher.position};
  s.w.Math.random=()=>.7;
  for(let i=0;i<60;i++)s.api.update(.1,i*.1);
  expect(teacher.position).not.toEqual(before);expect(teacher.position.y).toBe(3.6);
  expect(Math.abs(teacher.position.x-30)).toBeLessThan(4.4);expect(Math.abs(teacher.position.z-40)).toBeLessThan(3.4);
  s.w.campusExplorer.getFloorFilter=()=>1;s.api.update(.1,10);expect(teacher.root?.visible??false).toBe(false);s.dom.window.close();
 });
});

it('隱藏樓層的子牆面不會遮住人物姓名，可見牆面仍會遮擋',()=>{
 const parent=new THREE.Group(),wall=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial());parent.add(wall);parent.visible=false;
 const spy=vi.spyOn(THREE.Raycaster.prototype,'intersectObjects').mockReturnValue([{object:wall}] as any);
 const s=setup(1280,w=>{w.campusExplorer.camera.position.set(-18,3,95);w.campusExplorer.camera.lookAt(-18,2,87);w.campusExplorer.camera.updateMatrixWorld();w.campusExplorer.getPlayerPosition=()=>new THREE.Vector3(-18,0,92)});
 s.api.update(.1,1);const guard=s.api.actors.find((a:any)=>a.id==='gate-guard');expect(guard.isOccluded).toBe(false);
 parent.visible=true;s.api.update(.1,2);expect(guard.isOccluded).toBe(true);
 spy.mockRestore();s.dom.window.close();wall.geometry.dispose();(wall.material as THREE.Material).dispose();
});
