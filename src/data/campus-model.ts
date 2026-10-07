export type RoofType='pitched-red'|'pitched-blue'|'flat-green'|'flat-purple'|'flat-red'|'flat-dome';
export type CampusModel={id:string;placeId:string;name:string;position:[number,number];dimensions:[number,number,number];floors:number;roof:RoofType;entrance:[number,number];photo?:'academic-exterior'|'academic-entrance'};

export const campusModels:CampusModel[]=[
 {id:'admin-front',placeId:'admin',name:'行政大樓前棟',position:[8,38],dimensions:[28,14,10.8],floors:3,roof:'pitched-red',entrance:[8,46],photo:'academic-entrance'},
 {id:'admin-back',placeId:'admin',name:'行政大樓後棟',position:[-28,38],dimensions:[28,14,10.8],floors:3,roof:'pitched-red',entrance:[-28,46],photo:'academic-exterior'},
 {id:'gym-bld',placeId:'student-center',name:'學生活動中心',position:[-58,62],dimensions:[32,42,13.5],floors:3,roof:'flat-dome',entrance:[-45,62]},
 {id:'grade8-front',placeId:'multifunction',name:'八年級前棟',position:[48,44],dimensions:[38,12,10.8],floors:3,roof:'pitched-red',entrance:[38,44]},
 {id:'grade8-mid',placeId:'multifunction',name:'八年級中棟',position:[48,24],dimensions:[38,12,10.8],floors:3,roof:'pitched-red',entrance:[38,24]},
 {id:'grade9-back',placeId:'multifunction',name:'九年級後棟',position:[48,4],dimensions:[38,12,10.8],floors:3,roof:'pitched-red',entrance:[38,4]},
 {id:'tech-building',placeId:'technology',name:'科技館',position:[96,12],dimensions:[16,36,7.6],floors:2,roof:'flat-green',entrance:[86,12]},
 {id:'multi-building',placeId:'multifunction',name:'綜合大樓',position:[96,54],dimensions:[16,40,7.6],floors:2,roof:'flat-purple',entrance:[86,54]},
 {id:'art-building',placeId:'art',name:'藝術館',position:[96,-28],dimensions:[16,32,14.8],floors:4,roof:'flat-red',entrance:[86,-28]},
 {id:'new-grade7',placeId:'special',name:'七年級新大樓',position:[75,-68],dimensions:[46,16,11.2],floors:3,roof:'pitched-blue',entrance:[65,-68]},
];
export const campusModelForPlace=(placeId:string)=>campusModels.filter(model=>model.placeId===placeId);
