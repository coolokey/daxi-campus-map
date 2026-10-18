import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const expected=[
 ['reception','ADM-F-2C',2,'油印室'],['pe-office','521',2,'檔案室（521）'],['pe-storage','522',2,'檔案室（522）'],
 ['mid-315','315',1,'體育器材室'],['wood-craft-206','314',1,'輕艇隊訓練室'],['mid-325','325',2,'志工／校友辦公室'],['mid-324','324',2,'訓育組備用器材室'],['math-research','323',2,'教學設備器材室'],
 ['native-lang','335',3,'生涯發展教室'],['inter-disc','332',3,'教材製作室'],['woodwork-front','431',3,'本土語教室'],
 ['math-lab','A21',2,'家長會辦公室'],['sped-classroom','A31',3,'教師會辦公室'],
 ['multi-622','622',2,'資訊機房'],['it-server','623',2,'諮商會議室'],['sped-614','614',1,'特教班'],['sped-612','612',1,'資源班 1／2'],
 ['tech-sw-1','TC-SW-1',1,'生物實驗室'],['tech-nw-2','TC-NW-2',2,'科中辦公室／自造中心辦公室'],['maker-lab','TC-SW-2',2,'科技智慧教室'],['tech-smart','TC-NE-2',2,'科技創作教室'],
 ['music-2f','ART-2',2,'音樂教室（第一音樂教室）'],['music-3f','ART-3',3,'音樂教室（第二音樂教室）']
];
const load=()=>vm.runInNewContext('const window={};'+['campus-data.js','spatial-plan-data.js','spatial-plan.js','room-layout-model.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';({buildings:BUILDINGS_CONFIG,data:CampusSpatialData,plan:CampusSpatialPlan,model:CampusRoomLayout})');
it('uses all confirmed names without changing their immutable space codes and floors',()=>{
 const {buildings}=load(),rooms=buildings.flatMap((b:any)=>b.rooms);
 for(const [id,code,floor,name] of expected)expect(rooms.find((r:any)=>r.id===id),String(id)).toMatchObject({spaceCode:code,floor,name:`${name} (${floor}F)`});
});
it('retains the approved administrative ground layout and destinations',()=>{
 const {buildings,plan}=load(),b=buildings.find((b:any)=>b.id==='admin-front'),l=plan.layout(b);
 expect(b.spatialProfile.groundPlan).toBe('approved-crosshall');
 expect(l.rooms.find((r:any)=>r.id==='admin-reception-1f')).toMatchObject({floor:1,name:'會客室 (1F)'});
 expect(l.rooms.find((r:any)=>r.id==='coach-room')).toMatchObject({floor:1,name:'教練室 (1F)'});
 expect(l.cells.find((c:any)=>c.accessible).label).toBe('無障礙廁所');
});
it('migrates exact old defaults while retaining custom local room names',()=>{
 const {data,model}=load(),saved:any={};for(const [id] of expected)saved[id]=data.confirmedNames?.[id]?.previous||'舊名稱';
 saved['mid-315']='老師自訂器材庫';saved['music-2f']='音樂老師的教室';
 const actual=model.migrateConfirmedNames(saved,data.confirmedNames);
 for(const [id,,,name] of expected)expect(actual[id]).toBe(id==='mid-315'?'老師自訂器材庫':id==='music-2f'?'音樂老師的教室':name);
 expect(saved.reception).not.toBe(actual.reception);
});
