/* Presentation adapters consume shared geometry without changing physical cells. */
window.CampusSpatialUI = (() => {
 function rows(layout,floor){
  return layout.displayRows.map(row=>{
   const axis=row.axis||'u',cells=layout.cells.filter(c=>c.floor===floor&&(c.row||'main')===row.id)
    .map(c=>({...c,start:c[`${axis}0`],end:c[`${axis}1`]})).sort((a,b)=>a.start-b.start);
   const filled=[];let cursor=row.start;
   for(const cell of cells){if(cell.start>cursor+.001)filled.push({kind:'void',start:cursor,end:cell.start});filled.push(cell);cursor=Math.max(cursor,cell.end)}
   if(cursor<row.end-.001)filled.push({kind:'void',start:cursor,end:row.end});
   return {...row,cells:filled};
  });
 }
 function routeSegments(points,floor){
  const height=(floor-1)*3.6,min=Math.max(0,height-1.8),max=height+1.8,result=[];
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],ay=a.y||0,by=b.y||0,dy=by-ay;let from=0,to=1;
   if(Math.abs(dy)<.0001){if(ay<min||ay>max)continue}
   else{const t0=(min-ay)/dy,t1=(max-ay)/dy;from=Math.max(0,Math.min(t0,t1));to=Math.min(1,Math.max(t0,t1));if(from>=to)continue}
   const at=t=>({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t,y:ay+dy*t});result.push([at(from),at(to)]);
  }return result;
 }
 function locate(position,layouts,fallback){
  const floor=Math.max(1,Math.round(Math.max(0,position.y)/3.6)+1);
  const layout=layouts.find(l=>l.footprints.some(f=>f.floor===floor&&position.x>=f.rect.x0&&position.x<=f.rect.x1&&position.z>=f.rect.z0&&position.z<=f.rect.z1));
  return layout?{floor,label:layout.b.name,buildingId:layout.id}:fallback(position);
 }
 return {rows,routeSegments,locate};
})();
