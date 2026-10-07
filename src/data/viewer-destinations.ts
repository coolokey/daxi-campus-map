export type ViewerFloor='全'|'4F'|'3F'|'2F'|'1F';

export const quickDestinations=[
 {id:'admin',label:'教務處',icon:'📚'},
 {id:'student-center',label:'體育館禮堂',icon:'🏀'},
 {id:'track',label:'操場',icon:'🏃'},
 {id:'technology',label:'科技館',icon:'🧪'},
 {id:'art',label:'藝術館',icon:'🎨'},
] as const;

export const resolveFloorState=(floor:ViewerFloor)=>floor==='全'
 ? {floor,available:true,label:'顯示全棟外觀'}
 : {floor,available:false,label:'室內導覽規劃中'};
