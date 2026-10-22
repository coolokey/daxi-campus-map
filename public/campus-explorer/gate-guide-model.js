/* Text guidance is a plan reference. It never infers a visitor's location. */
window.CampusGateGuide = (() => {
 const commonIds=['academic','student-affairs','general','collab-conf','health','personnel-accounting','accounting'];
 const stripFloor=value=>String(value??'').trim().replace(/\s*[（(]\d+F[）)]\s*$/i,'').trim();
 const normalize=value=>String(value??'').trim().toLocaleLowerCase();
 // Copy only canonical aliases. User-edited display names cannot rewrite IDs.
 const aliases=new Map(Object.entries(typeof CampusSpatialData==='undefined'?{}:CampusSpatialData.aliases));

 function catalog(buildings,savedNames={}){
  return (Array.isArray(buildings)?buildings:[]).flatMap(building=>(Array.isArray(building.rooms)?building.rooms:[]).map(room=>{
   const canonicalName=stripFloor(room.name),saved=savedNames&&Object.hasOwn(savedNames,room.id)?savedNames[room.id]:'';
   return {id:room.id,name:stripFloor(typeof saved==='string'?saved:'')||canonicalName,canonicalName,
    buildingId:building.id,buildingName:building.name,floor:room.floor,code:room.spaceCode||room.code||'',
    entryHint:room.entryHint||'',common:commonIds.includes(room.id)};
  }));
 }

 function search(rooms,query){
  const q=normalize(query),alias=aliases.get(q);
  const rank=room=>room.common?0:/處|室|辦公|中心/.test(room.canonicalName)?1:2;
  return (Array.isArray(rooms)?rooms:[]).filter(room=>!q||room.id===alias||[room.id,room.name,room.canonicalName,room.buildingName,room.code].some(value=>normalize(value).includes(q)))
   .sort((a,b)=>rank(a)-rank(b)||((normalize(a.id)===q||a.id===alias)?-1:(normalize(b.id)===q||b.id===alias)?1:0))
   .slice(0,12);
 }

 function guide(room){
  const source='115 學年度校園平面圖與已確認處室資料';
  const notice='本指引為平面圖參考，尚未逐點現場實測；請以現場門牌為準，入口不明時請向警衛室詢問。';
  const known=room&&typeof room.id==='string'&&room.buildingName&&Number.isInteger(room.floor)&&room.floor>0;
  const location=known?`${room.buildingName} ${room.floor} 樓`:'目的地位置尚未確認';
  // Only approved administrative offices have enough entry evidence for cards.
  const admin=known&&room.buildingId==='admin-front'&&(room.id==='student-affairs'||Boolean(room.entryHint));
  if(!admin)return {status:'incomplete',source,notice:'詳細步行指引尚未確認，請向警衛室詢問。',steps:[{title:'請向警衛室確認路線',body:`${known?room.name+'：':''}${location}。詳細步行指引尚未確認，請向警衛室詢問入口與前往方式，抵達後請確認現場門牌。`}]};
  const upstairs=room.floor>1;
  return {status:'plan-reference',source,notice,photo:{src:'photos/admin-front.jpg',caption:'行政大樓外觀參考，非處室入口照片。'},steps:[
   {title:'在正門辨認行政大樓',body:'請對照校園空照圖與行政大樓外觀，先確認行政大樓的位置。若無法辨認，請向警衛室詢問。'},
   {title:upstairs?'確認穿堂與樓梯':'確認一樓穿堂',body:upstairs?`平面圖標示行政大樓一樓穿堂及連通一至三樓的連續樓梯；請先依現場標示確認入口，再前往 ${room.floor} 樓。入口或樓梯不明時，請向警衛室詢問。`:'平面圖標示行政大樓一樓穿堂；學務處位於一樓，請依現場門牌確認前往方式。入口不明時，請向警衛室詢問。'},
   {title:'請確認現場門牌',body:`${room.name}：${location}。${room.entryHint?room.entryHint+' ':''}請確認現場門牌與目的地相符，再按確認完成。`}
  ]};
 }

 function advance(state,action,total){
  const count=Number.isInteger(total)&&total>0?total:0;
  if(action==='restart'||!count)return {index:0,complete:false};
  const index=Math.max(0,Math.min(count-1,Number.isInteger(state?.index)?state.index:0));
  const current={index,complete:Boolean(state?.complete)&&index===count-1};
  if(action==='next')return {index:Math.min(count-1,index+1),complete:false};
  if(action==='previous')return {index:Math.max(0,index-1),complete:false};
  if(action==='confirm')return {index,complete:index===count-1};
  return current;
 }
 return {catalog,search,guide,advance};
})();
