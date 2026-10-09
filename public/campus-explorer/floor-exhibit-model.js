/* Display-only rules; physical rectangles remain owned by CampusSpatialPlan. */
(()=>{
 const meshVisible=(data,floor,total)=>floor==='all'||(data.roof?Number(floor)>total:(data.floorNum||1)<=Number(floor));
 const rooms=(layouts,db,floor)=>layouts.flatMap(l=>l.rooms.filter(r=>r.floor===Number(floor)&&db[r.id]&&!db[r.id].aliasFor).map(r=>({...r,name:db[r.id].name,buildingId:l.id,buildingName:l.b.name})));
 const color=(name,cat)=>{const match=String(name).match(/^([789])\d{2}(?:\s|$)/);return match?({'7':'#63b54f','8':'#409ed1','9':'#e86482'})[match[1]]:({admin:'#8470dc',special:'#b95bc2'})[cat]||'#69889a'};
 const overlap=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 function pack(candidates,width,height,reserved=[]){const occupied=[...reserved],result=[];for(const c of candidates){const rect={x:c.x-c.w/2,y:c.y-c.h/2,w:c.w,h:c.h};if(c.behind||rect.x<8||rect.y<8||rect.x+c.w>width-8||rect.y+c.h>height-8||occupied.some(r=>overlap(rect,r)))continue;occupied.push(rect);result.push(c)}return result}
 window.CampusFloorExhibitModel={meshVisible,rooms,color,pack};
})();
