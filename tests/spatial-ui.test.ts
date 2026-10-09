import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import vm from 'node:vm'
import { JSDOM } from 'jsdom'

const path = 'public/campus-explorer/spatial-ui-tools.js'
const context = vm.createContext({ window: {} })
if (existsSync(path)) vm.runInContext(readFileSync(path, 'utf8'), context)
const tools = context.window.CampusSpatialUI

describe('shared spatial UI', () => {
  it('preserves physical offsets, unequal spans and empty spaces across floors', () => {
    expect(tools?.rows).toBeTypeOf('function')
    const layout = { displayRows: [{ id: 'main', label: '主棟', axis: 'u', start: 0, end: 20 }], cells: [
      { id: 'r', kind: 'room', floor: 2, u0: 4, u1: 12 },
      { id: 's', kind: 'stair', floor: 2, u0: 12, u1: 16 },
      { id: 'low', kind: 'room', floor: 1, u0: 0, u1: 20 },
    ] }
    const upper = tools.rows(layout, 2)[0]
    expect(upper.cells.map((c: any) => [c.kind, c.start, c.end])).toEqual([
      ['void', 0, 4], ['room', 4, 12], ['stair', 12, 16], ['void', 16, 20],
    ])
    expect(upper.start).toBe(tools.rows(layout, 1)[0].start)
    expect(upper.end).toBe(tools.rows(layout, 1)[0].end)
  })
  it('keeps separate wings on their declared axis', () => {
    expect(tools?.rows).toBeTypeOf('function')
    const rows = tools.rows({ displayRows: [{ id: 'east', label: '東翼', axis: 'v', start: 0, end: 10 }], cells: [
      { id: 'a', kind: 'room', row: 'east', floor: 1, v0: 2, v1: 8, u0: 0, u1: 1 },
    ] }, 1)
    expect(rows[0].label).toBe('東翼')
    expect(rows[0].cells[1]).toMatchObject({ id: 'a', start: 2, end: 8 })
  })
  it('clips routes to the active floor and excludes other-floor segments', () => {
    expect(tools?.routeSegments).toBeTypeOf('function')
    const points = [{x:0,z:0,y:0},{x:3,z:0,y:0},{x:3,z:0,y:10.8},{x:8,z:0,y:10.8}]
    const segments = tools.routeSegments(points, 1)
    expect(segments).toHaveLength(2)
    expect(segments.every((s: any[]) => s.every(p => p.y <= 1.8))).toBe(true)
    expect(tools.routeSegments(points.slice(2), 1)).toEqual([])
  })
  it('locates wings from shared footprints and leaves bounding-box gaps outdoors', () => {
    expect(tools?.locate).toBeTypeOf('function')
    const layouts = [{ id: 'wing', b: { id: 'wing', name: '雙翼樓', floors: 2 }, footprints: [
      { floor: 1, rect: { x0: 0, x1: 5, z0: 0, z1: 20 } },
      { floor: 2, rect: { x0: 0, x1: 5, z0: 0, z1: 20 } },
    ] }]
    const fallback = () => ({ floor: 1, label: '校園步道', buildingId: null })
    expect(tools.locate({ x: 2, y: 3.6, z: 10 }, layouts, fallback)).toMatchObject({ floor: 2, buildingId: 'wing' })
    expect(tools.locate({ x: 8, y: 0, z: 10 }, layouts, fallback).buildingId).toBeNull()
  })
})

it('renders only editable rooms at fixed physical slots and saves names without moving them', () => {
  const dom = new JSDOM(`<div class="top-actions"></div><button id="btn-mode-toggle"></button><button id="btn-help"></button><div class="search-box"><input id="search-input"><span class="search-icon"></span></div><div id="quick-bar"></div><span id="btn-mode-text"></span><div id="welcome-card"></div>`, { url: 'https://example.test', runScripts: 'outside-only' })
  const w = dom.window as any
  const rooms = ['computer-lab-2','audiovisual-1f','history-room','library'].map((id,i) => ({id,name:`房間 ${i}`,floor:1,cat:'special',spaceCode:`A1${i}`,code:`legacy-${i}`,node:id}))
  const b = {id:'admin-front',name:'行政大樓',floors:2,rooms}
  const cells = rooms.map((r,i)=>({...r,kind:'room',row:'main',u0:i*4,u1:i*4+4}))
  const layout = {id:b.id,b,rooms:cells,cells:[...cells,{kind:'stair',floor:1,row:'main',u0:16,u1:18,label:'樓梯'}],displayRows:[{id:'main',label:'主棟',axis:'u',start:0,end:20}]}
  let invalidations=0
  Object.assign(w,{CampusSpatialData:{aliases:{'legacy-lab':'computer-lab-2'}},campusExplorer:{buildings:[b],rooms:{...Object.fromEntries(rooms.map(r=>[r.id,{...r}])),'legacy-lab':{...rooms[0],id:'legacy-lab'}},scene:{traverse:()=>{}},setControlMode:()=>{}},campusWalkWorld:{layouts:[layout]},campusMinimap:{invalidate:()=>invalidations++},roomBadgeElements:[],currentMode:'avatar',moveInput:{},stopAutoWalk:()=>{}})
  w.localStorage.setItem('daxi-room-layout-v1-115',JSON.stringify({'legacy-lab':'舊實驗室名稱'}))
  w.localStorage.setItem('daxi-room-layout-v1-116',JSON.stringify({'legacy-lab':'應保留的舊鍵值','computer-lab-2':'116 年度實驗室'}))
  const context = dom.getInternalVMContext()
  for(const file of ['room-layout-model.js','spatial-ui-tools.js','room-layout.js'])vm.runInContext(readFileSync(`public/campus-explorer/${file}`,'utf8'),context)
  const dialog=w.document.getElementById('room-layout-dialog');dialog.showModal=()=>{dialog.open=true}
  w.campusRoomLayout.open()
  const inputs=dialog.querySelectorAll('.rl-room input')
  expect(inputs.length).toBe(b.rooms.length)
  expect(inputs[0].value).toBe('舊實驗室名稱')
  expect(w.campusExplorer.rooms['legacy-lab'].name).toBe('舊實驗室名稱')
  expect(dialog.querySelector('.rl-room small').textContent).toBe('A10')
  expect(dialog.querySelector('[data-kind="stair"]').style.left).toBe('528px')
  expect(dialog.querySelector('[data-floor="2"] .rl-void').style.width).toBe('660px')
  inputs[0].value='801';inputs[0].dispatchEvent(new w.Event('input'))
  dialog.querySelector('#rl-save').click()
  expect(w.campusExplorer.rooms[rooms[0].id].name).toBe('801')
  expect(rooms[0].floor).toBe(1)
  expect(JSON.parse(w.localStorage.getItem('daxi-room-layout-v1-115'))[rooms[0].id]).toBe('801')
  expect(JSON.parse(w.localStorage.getItem('daxi-room-layout-v1-115'))['legacy-lab']).toBe('舊實驗室名稱')
  expect(w.campusExplorer.rooms['legacy-lab'].name).toBe('801')
  expect(invalidations).toBe(2)
  const year=dialog.querySelector('#rl-year');year.value='116';year.dispatchEvent(new w.Event('change'))
  expect(w.campusExplorer.rooms['legacy-lab'].name).toBe('116 年度實驗室')
  const nextInput=dialog.querySelector('.rl-room input');nextInput.value='116 年度更新';nextInput.dispatchEvent(new w.Event('input'));dialog.querySelector('#rl-save').click()
  expect(JSON.parse(w.localStorage.getItem('daxi-room-layout-v1-116'))['legacy-lab']).toBe('應保留的舊鍵值')
  year.value='115';year.dispatchEvent(new w.Event('change'))
  expect(w.campusExplorer.rooms['legacy-lab'].name).toBe('801')
  dom.window.close()
})

it('draws shared floor rectangles and rebuilds the cached layer when names change', () => {
  const dom = new JSDOM('<div id="minimap-card"><canvas id="minimap-canvas"></canvas><span class="minimap-compass"></span></div><span id="minimap-floor-badge"></span>', {url:'https://example.test',runScripts:'outside-only'})
  const w=dom.window as any, draws:any[]=[],contexts:any[]=[]
  w.HTMLCanvasElement.prototype.getContext=function(){
    const context:any=new Proxy({fillStyle:'',fillRect(x:number,z:number,width:number,depth:number){draws.push({x,z,width,depth,color:this.fillStyle})}}, {get(target,key){return key in target?target[key]:()=>{}}})
    contexts.push(context);return context
  }
  Object.defineProperty(w.document.getElementById('minimap-card'),'clientWidth',{value:172})
  const rect={x0:11,x1:18,z0:21,z1:26}
  const b={id:'wing',name:'測試翼',floors:1,x:14,z:23,width:100,depth:100,rooms:[]}
  const room={id:'r',name:'701',cat:'special',floor:1}
  Object.assign(w,{THREE:{Vector3:class{}},campusExplorer:{buildings:[b],rooms:{r:room},camera:{getWorldDirection:(d:any)=>Object.assign(d,{x:0,z:-1})}},campusWalkWorld:{layouts:[{id:b.id,b,footprints:[{floor:1,rect}],corridors:[],cells:[{...room,kind:'room',rect,door:{x:14,z:26}}]}],roomAt:()=>room},avatarGroup:{position:{x:14,y:0,z:23}},avatarAngle:0,currentNavPoints:[],renderMinimap:()=>{}})
  const context=dom.getInternalVMContext()
  for(const file of ['outdoor-plan.js','room-layout-model.js','minimap-math.js','spatial-ui-tools.js','minimap.js'])vm.runInContext(readFileSync(`public/campus-explorer/${file}`,'utf8'),context)
  expect(draws).toContainEqual({x:11,z:21,width:7,depth:5,color:'#63b54f'})
  const initial=contexts.length
  w.campusMinimap.render();expect(contexts.length).toBe(initial)
  room.name='801';w.campusMinimap.invalidate()
  expect(contexts.length).toBe(initial+1)
  expect(draws).toContainEqual({x:11,z:21,width:7,depth:5,color:'#409ed1'})
  expect(w.campusMinimap.locate().buildingId).toBe('wing')
  dom.window.close()
})
