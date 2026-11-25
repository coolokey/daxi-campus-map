/* Route descriptions follow the actual path, including descending before ascending. */
window.CampusNavigationGuide=(()=>{
 function steps(points,room){
  const kinds=[];
  for(let i=0;i<points.length-1;i++){
   const dy=points[i+1].y-points[i].y;
   kinds.push(dy>.05?'up':dy<-.05?'down':'flat');
  }
  // A level landing between flights belongs to the same stair stage.
  for(let i=0;i<kinds.length;i++)if(kinds[i]==='flat'){
   let end=i;while(kinds[end]==='flat')end++;
   if(i>0&&kinds[i-1]===kinds[end])for(let j=i;j<end;j++)kinds[j]=kinds[end];
   i=end-1;
  }
  // Shallow entrance thresholds belong to the approach, not a storey change.
  for(let start=0;start<kinds.length;){
   let end=start+1;while(kinds[end]===kinds[start])end++;
   if(kinds[start]!=='flat'&&Math.abs(points[end].y-points[start].y)<.3)
    for(let i=start;i<end;i++)kinds[i]='flat';
   start=end;
  }
  const result=[];
  for(let start=0;start<kinds.length;){
   let end=start+1;while(kinds[end]===kinds[start])end++;
   const type=kinds[start],kind=type==='flat'?(end===kinds.length?'destination':'approach'):type;
   const floor=Math.max(1,Math.round((points[end].y-.6)/3.6)+1);
   const outdoor=room.code?.startsWith('OUT-');
   const label=kind==='up'?(outdoor?'沿階梯走上平台':`沿樓梯上樓至 ${floor}F`):kind==='down'?(outdoor?'沿階梯走下平台':`沿樓梯下樓至 ${floor}F`):kind==='approach'?(outdoor?'沿路線前往階梯':'沿路線前往樓梯'):`沿路線前往${room.name}`;
   result.push({kind,label,start,end});start=end;
  }
  if(!result.length)result.push({kind:'destination',label:`前往${room.name}`,start:0,end:1});
  result.push({kind:'arrival',label:'確認目的地門牌',start:Math.max(0,points.length-1),end:Infinity});
  return result;
 }
 function active(steps,index,status){
  if(status==='arrived')return steps.length-1;
  return Math.max(0,steps.slice(0,-1).findIndex(s=>index<s.end));
 }
 // x/y are the physical anchor projected into viewport pixels; labels are centred
 // on this anchor, never moved to invent a clearer but incorrect room position.
 function selectWalkingLabels(candidates,{floor,width,height,mobile=false,destinationId=null,reserved=[]}){
  if(![floor,width,height].every(Number.isFinite)||width<=0||height<=0)return [];
  const overlaps=(a,b)=>a.left<b.right+6&&a.right>b.left-6&&a.top<b.bottom+6&&a.bottom>b.top-6;
  const boxes=reserved.filter(b=>b&&[b.left,b.top,b.right,b.bottom].every(Number.isFinite)&&b.right>b.left&&b.bottom>b.top).slice();
  const eligible=candidates.filter(c=>c&&c.floor===floor&&[c.distance,c.x,c.y,c.z,c.width,c.height].every(Number.isFinite)&&c.distance>=0&&c.distance<=(c.id===destinationId?65:24)&&c.z>=-1&&c.z<=1&&c.width>0&&c.height>0)
   .sort((a,b)=>Number(b.id===destinationId)-Number(a.id===destinationId)||a.distance-b.distance||String(a.id).localeCompare(String(b.id)));
  const selected=[];
  for(const c of eligible){
   const box={left:c.x-c.width/2,right:c.x+c.width/2,top:c.y-c.height/2,bottom:c.y+c.height/2};
   if(box.left<8||box.top<8||box.right>width-8||box.bottom>height-8||boxes.some(b=>overlaps(box,b)))continue;
   selected.push(c);boxes.push(box);
   if(selected.length>=(mobile?3:5))break;
  }
  return selected;
 }
 return {steps,active,selectWalkingLabels};
})();
