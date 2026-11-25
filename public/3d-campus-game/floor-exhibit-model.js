/* Display-only rules; physical rectangles remain owned by CampusSpatialPlan. */
(()=>{
 const meshVisible=(data,floor,total)=>floor==='all'||(data.roof?Number(floor)>total:(data.floorNum||1)<=Number(floor));
 const rooms=(layouts,db,floor)=>layouts.flatMap(l=>l.rooms.filter(r=>r.floor===Number(floor)&&db[r.id]&&!db[r.id].aliasFor).map(r=>({...r,name:db[r.id].name,buildingId:l.id,buildingName:l.b.name})));
 const color=(name,cat)=>{const match=String(name).match(/^([789])\d{2}(?:\s|$)/);return match?({'7':'#63b54f','8':'#409ed1','9':'#e86482'})[match[1]]:({admin:'#8470dc',special:'#b95bc2'})[cat]||'#69889a'};
 const overlap=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 function pack(candidates,width,height,reserved=[]){
  const occupied=[...reserved],result=[];
  for(const c of candidates){
   const x=Math.max(8,Math.min(width-c.w-8,Number.isFinite(c.x)?c.x-c.w/2:8));
   const y=Math.max(8,Math.min(height-c.h-8,Number.isFinite(c.y)?c.y-c.h/2:8));
   const free=r=>r.x>=8&&r.y>=8&&r.x+r.w<=width-8&&r.y+r.h<=height-8&&!occupied.some(o=>overlap(r,o));
   let rect={x,y,w:c.w,h:c.h};
   if(!free(rect)){
    let best=null,distance=Infinity;
    // Search screen space instead of silently dropping a room on collision.
    for(let sy=8;sy<=height-c.h-8;sy+=c.h+4){
     for(let sx=8;sx<=width-c.w-8;sx+=8){
      const r={x:sx,y:sy,w:c.w,h:c.h},d=(sx-x)**2+(sy-y)**2;
      if(d<distance&&free(r)){best=r;distance=d;}
     }
    }
    if(!best)continue; // The always-open floor index covers small-screen overflow.
    rect=best;
   }
   occupied.push(rect);result.push({...c,x:rect.x+c.w/2,y:rect.y+c.h/2});
  }
  return result;
 }
 window.CampusFloorExhibitModel={meshVisible,rooms,color,pack};
})();
