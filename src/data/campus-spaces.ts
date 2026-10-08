export type CampusSpace={id:string;name:string;buildingId:string;floor:1|2|3|4;position:[number,number,number];category:'行政處室'|'班級教室'|'專科教室'|'場館'};

export const campusSpaces:CampusSpace[]=[
 {id:'principal',name:'校長室',buildingId:'admin-front',floor:2,position:[14,5.4,38],category:'行政處室'},
 {id:'academic',name:'教務處',buildingId:'admin-front',floor:2,position:[8,5.4,38],category:'行政處室'},
 {id:'student-affairs',name:'學務處',buildingId:'admin-back',floor:1,position:[-34,1.8,38],category:'行政處室'},
 {id:'general',name:'總務處',buildingId:'admin-back',floor:2,position:[-28,5.4,38],category:'行政處室'},
 {id:'health',name:'健康中心',buildingId:'admin-back',floor:1,position:[-22,1.8,38],category:'行政處室'},
 {id:'gym',name:'學生活動中心大禮堂',buildingId:'gym-bld',floor:1,position:[-58,2.2,62],category:'場館'},
 {id:'library',name:'圖書館',buildingId:'multi-building',floor:1,position:[96,1.9,62],category:'專科教室'},
 {id:'physics-lab',name:'理化實驗室',buildingId:'tech-building',floor:2,position:[96,5.7,2],category:'專科教室'},
 {id:'music',name:'音樂教室',buildingId:'art-building',floor:2,position:[96,5.5,-28],category:'專科教室'},
 {id:'701',name:'701 教室',buildingId:'new-grade7',floor:1,position:[61,1.8,-68],category:'班級教室'},
 {id:'801',name:'801 教室',buildingId:'grade8-front',floor:2,position:[44,5.4,44],category:'班級教室'},
 {id:'901',name:'901 教室',buildingId:'grade9-back',floor:3,position:[56,9,4],category:'班級教室'},
];
export const spacesOnFloor=(floor:number)=>campusSpaces.filter(space=>space.floor===floor);
