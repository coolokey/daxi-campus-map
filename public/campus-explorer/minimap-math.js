/* 世界座標 x 向右、z 向圖下；小地圖朝向使用視線方向，樓層使用人物高度。 */
const CampusMinimapMath={
 worldToMini(x,z,state,size,scale){
  const dx=x-state.x,dz=z-state.z,c=Math.cos(state.heading),s=Math.sin(state.heading);
  return {x:size/2+(dx*c+dz*s)*scale,y:size*.6+(-dx*s+dz*c)*scale};
 },
 locate(position,buildings){
  const building=buildings.find(b=>Math.abs(position.x-b.x)<=b.width/2+1.2&&Math.abs(position.z-b.z)<=b.depth/2+1.2);
  const floor=Math.max(1,Math.min(building?.floors??4,Math.round(Math.max(0,position.y)/3.6)+1));
  if(building)return {floor,label:building.name,buildingId:building.id};
  let label='校園步道';
  if(position.z>100&&position.z<175&&position.x>-20&&position.x<0)label='校門椰林大道';
  else if(position.z>74&&position.x<34)label='正門廣場';
  else if(position.x>47&&position.x<59)label='東側車道';
  else if(position.x<-32&&position.z>17&&position.z<75)label='迎賓廣場';
  else if(position.x<-36&&position.z<12)label='操場及綜合球場';
  else if(position.z<-20&&position.x>-33&&position.x<42)label='戶外球場';
  else if(position.x>7&&position.x<23&&position.z>7&&position.z<51)label='教學區中庭';
  return {floor,label,buildingId:null};
 }
};
