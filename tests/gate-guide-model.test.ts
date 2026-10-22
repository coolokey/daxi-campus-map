import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';

function load(){
 const modelPath='public/campus-explorer/gate-guide-model.js';
 const source=['campus-data.js','spatial-plan-data.js'].map(file=>readFileSync('public/campus-explorer/'+file,'utf8')).join('\n');
 return vm.runInNewContext('const window={};'+source+'\n'+(existsSync(modelPath)?readFileSync(modelPath,'utf8'):'')+';({model:window.CampusGateGuide,buildings:BUILDINGS_CONFIG})');
}
const setup=()=>{const data=load();expect(data.model,'pure gate guide API exists').toBeDefined();return {...data,rooms:data.model.catalog(data.buildings)};};

describe('gate guide catalog and search',()=>{
 it('uses canonical counseling location and its immutable old ID alias',()=>{
  const {model,rooms}=setup();
  expect(model.search(rooms,'counseling')[0]).toMatchObject({id:'collab-conf',name:'輔導室',canonicalName:'輔導室',buildingId:'multi-building',floor:2,code:'624',common:true});
  expect(model.search(rooms,'輔導室')[0].id).toBe('collab-conf');
 });
 it('preserves custom display names without changing canonical search or input data',()=>{
  const {model,buildings}=setup(),saved={'collab-conf':'家長諮詢室 (2F)'};
  const rooms=model.catalog(buildings,saved),room=model.search(rooms,'輔導室')[0];
  expect(room.name).toBe('家長諮詢室');
  expect(room.canonicalName).toBe('輔導室');
  expect(model.search(rooms,'counseling')[0].id).toBe('collab-conf');
  expect(saved['collab-conf']).toBe('家長諮詢室 (2F)');
  expect(buildings.find((b:any)=>b.id==='multi-building').rooms.find((r:any)=>r.id==='collab-conf').name).toBe('輔導室 (2F)');
 });
 it('returns no guessed registration or transfer assignment and rejects unknown IDs safely',()=>{
  const {model,rooms}=setup();
  for(const query of ['註冊','轉學','registration','transfer','__proto__','constructor','not-a-room'])expect(model.search(rooms,query)).toEqual([]);
  expect(model.guide(undefined).status).toBe('incomplete');
 });
 it('matches room codes and building names and prioritizes common offices',()=>{
  const {model,rooms}=setup();
  expect(model.search(rooms,'ADM-F-2E')[0].id).toBe('academic');
  expect(model.search(rooms,'行政')[0].common).toBe(true);
  expect(model.search(rooms,'').every((r:any,i:number)=>i>6||r.common)).toBe(true);
  expect(model.search(rooms,'').length).toBeLessThanOrEqual(12);
  for(const id of ['academic','student-affairs','general','collab-conf','health','personnel-accounting','accounting'])expect(rooms.find((r:any)=>r.id===id).common).toBe(true);
 });
 it('ignores inherited saved names',()=>{
  const {model,buildings}=setup(),saved=Object.create({academic:'繼承的錯誤名稱'});
  expect(model.catalog(buildings,saved).find((r:any)=>r.id==='academic').name).toBe('教務處');
 });
});

describe('evidence bounded reference cards',()=>{
 it('labels admin route as untested plan reference and uses the exact confirmed entry hint',()=>{
  const {model,rooms}=setup(),room=rooms.find((r:any)=>r.id==='academic'),guide=model.guide(room);
  expect(guide.status).toBe('plan-reference');
  expect(guide.source).toMatch(/平面圖/);
  expect(guide.notice).toMatch(/未.*現場/);
  expect(guide.steps).toHaveLength(3);
  expect(guide.steps[1].body).toMatch(/穿堂/);
  expect(guide.steps[1].body).toMatch(/連續樓梯/);
  expect(guide.steps[2].body).toContain(room.entryHint);
  expect(guide.steps[2].body).toContain('2 樓');
  expect(guide.photo.src).toMatch(/admin-front\.jpg$/);
  expect(guide.photo.caption).toMatch(/外觀/);
  expect(guide.photo.caption).toMatch(/非處室入口/);
 });
 it('keeps first floor student affairs guidance on the ground floor',()=>{
  const {model,rooms}=setup(),guide=model.guide(rooms.find((r:any)=>r.id==='student-affairs'));
  expect(guide.status).toBe('plan-reference');
  expect(guide.steps.map((s:any)=>s.body).join('')).not.toMatch(/樓梯|上樓|往上/);
  expect(guide.steps.at(-1).body).toContain('1 樓');
 });
 it('makes missing non-admin routes explicit while retaining known building and floor',()=>{
  const {model,rooms}=setup(),room=rooms.find((r:any)=>r.id==='collab-conf'),guide=model.guide(room);
  expect(guide.status).toBe('incomplete');
  expect(guide.notice).toContain('詳細步行指引尚未確認');
  expect(guide.notice).toContain('警衛室');
  expect(guide.steps).toHaveLength(1);
  expect(guide.steps[0].body).toContain(room.buildingName);
  expect(guide.steps[0].body).toContain('2 樓');
  expect(guide.photo).toBeUndefined();
 });
});

describe('manual card progress',()=>{
 it('bounds next and previous and completes only after confirmation on the last card',()=>{
  const {model}=setup(),initial={index:0,complete:false};
  expect(model.advance(initial,'confirm',3)).toEqual(initial);
  expect(model.advance(initial,'previous',3)).toEqual(initial);
  const middle=model.advance(initial,'next',3),last=model.advance(middle,'next',3);
  expect(last).toEqual({index:2,complete:false});
  expect(model.advance(last,'next',3)).toEqual(last);
  expect(model.advance(last,'confirm',3)).toEqual({index:2,complete:true});
  expect(model.advance({index:2,complete:true},'restart',3)).toEqual(initial);
  expect(initial).toEqual({index:0,complete:false});
 });
 it('does not advance on avatar arrival or malformed totals',()=>{
  const {model}=setup(),state={index:1,complete:false};
  for(const event of ['arrival','arrived','navigation-arrived',undefined])expect(model.advance(state,event,3)).toEqual(state);
  for(const total of [0,-1,NaN,Infinity,undefined])expect(model.advance(state,'confirm',total)).toEqual({index:0,complete:false});
 });
});
