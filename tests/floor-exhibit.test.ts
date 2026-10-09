import {describe,it,expect} from 'vitest'
import {existsSync,readFileSync} from 'node:fs'
import vm from 'node:vm'
import {JSDOM} from 'jsdom'
const context=vm.createContext({window:{}})
const file='public/campus-explorer/floor-exhibit-model.js'
if(existsSync(file))vm.runInContext(readFileSync(file,'utf8'),context)
const model=context.window.CampusFloorExhibitModel
describe('bird floor exhibition',()=>{
 it('cuts above the floor, opens even the top roof, and restores the full exterior',()=>{
  expect(model?.meshVisible).toBeTypeOf('function')
  expect(model.meshVisible({floorNum:3},2,3)).toBe(false)
  expect(model.meshVisible({floorNum:1},2,3)).toBe(true)
  expect(model.meshVisible({floorNum:3,roof:true},3,3)).toBe(false)
  expect(model.meshVisible({floorNum:2,roof:true},3,2)).toBe(true)
  expect(model.meshVisible({floorNum:3,roof:true},'all',3)).toBe(true)
 })
 it('selects physical rooms only and anchors at their shared room centres',()=>{
  expect(model?.rooms).toBeTypeOf('function')
  const rooms={a:{name:'701'},b:{name:'801'},old:{name:'別名',aliasFor:'a'}}
  const layouts=[{id:'wing',b:{name:'教學樓'},rooms:[{id:'a',floor:1,x:5,z:8},{id:'b',floor:2,x:7,z:9},{id:'old',floor:1,x:5,z:8}]}]
  expect(model.rooms(layouts,rooms,1)).toEqual([{id:'a',floor:1,x:5,z:8,name:'701',buildingId:'wing',buildingName:'教學樓'}])
 })
 it('uses middle-school colours without confusing fixed codes with class names',()=>{
  expect(model?.color).toBeTypeOf('function')
  expect(model.color('701','special')).toBe('#63b54f')
  expect(model.color('801 教室','special')).toBe('#409ed1')
  expect(model.color('901','special')).toBe('#e86482')
  expect(model.color('教務處','admin')).toBe('#8470dc')
 })
 it('keeps labels on screen, away from controls and from one another',()=>{
  expect(model?.pack).toBeTypeOf('function')
  const candidates=[{id:'a',x:100,y:100,w:80,h:25},{id:'b',x:105,y:102,w:80,h:25},{id:'c',x:400,y:200,w:80,h:25},{id:'behind',x:100,y:100,w:80,h:25,behind:true}]
  const packed=model.pack(candidates,500,400,[{x:350,y:170,w:100,h:80}])
  expect(packed.map((p:any)=>p.id)).toEqual(['a'])
 })
})
it('switches to bird display, lists every floor room, opens a card without moving, and navigates only on request',()=>{
 const dom=new JSDOM('<div id="welcome-card"></div><div id="floor-selector"><button class="floor-btn" data-f="all"></button><button class="floor-btn" data-f="2"></button></div>',{runScripts:'outside-only',url:'https://example.test'})
 const w=dom.window as any,c=dom.getInternalVMContext();
 vm.runInContext(readFileSync('public/campus-explorer/vendor/three.min.js','utf8'),c)
 const r={id:'801',name:'801 教室',floor:2,spaceCode:'422',cat:'grade8',center:{x:0,y:3.6,z:0},rect:{x0:-2,x1:2,z0:-2,z1:2}}
 const layout={id:'wing',b:{id:'wing',name:'八年級棟',x:0,z:0,floors:3},rooms:[r]};let navigations=0
 Object.assign(w,{currentMode:'avatar',currentFloorFilter:'all',focusedBuildingId:null,campusWalkWorld:{layouts:[layout]},campusRoomLayout:{year:115},animateCameraTo:()=>{},focusBuilding:()=>{},campusExplorer:{buildings:[layout.b],rooms:{'801':r},scene:new w.THREE.Scene(),camera:new w.THREE.PerspectiveCamera(),setControlMode:(mode:string)=>w.currentMode=mode,setFloorFilter:(f:string)=>{w.currentFloorFilter=f;w.campusFloorExhibit?.refresh()},navigateToRoom:()=>navigations++}})
 for(const file of ['floor-exhibit-model.js','floor-exhibit.js'])vm.runInContext(readFileSync(`public/campus-explorer/${file}`,'utf8'),c)
 w.document.querySelector('[data-f="2"]').click()
 expect(w.currentMode).toBe('bird');expect(w.currentFloorFilter).toBe('2')
 w.document.getElementById('fe-list-toggle').click();expect(w.document.getElementById('fe-list').hidden).toBe(false)
 const item=w.document.querySelector('#fe-list [data-room="801"]');expect(item.textContent).toContain('422');item.click()
 expect(navigations).toBe(0);expect(w.document.querySelector('#fe-card h2').textContent).toBe('801 教室')
 w.campusExplorer.rooms['801'].name='802 教室';w.campusFloorExhibit.refresh();expect(w.document.querySelector('#fe-card h2').textContent).toBe('802 教室')
 w.document.querySelector('.fe-card-actions button:last-child').click();expect(navigations).toBe(1);expect(w.currentMode).toBe('avatar')
 w.document.querySelector('[data-f="all"]').click();expect(w.document.getElementById('fe-card').hidden).toBe(true);expect(w.document.getElementById('floor-exhibit-labels').hidden).toBe(true)
 dom.window.close()
})
