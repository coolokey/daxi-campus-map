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
  s.api.update(.1,1);expect(s.api.actors.filter((a:any)=>a.root?.visible)).toHaveLength(14);
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
