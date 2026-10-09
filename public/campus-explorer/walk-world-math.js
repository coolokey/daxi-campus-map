/* Walkable interior geometry is schematic; room floors follow campus-data.js. */
const CampusWalkMath = (() => {
 const H=3.6;
 const inside=(r,x,z)=>x>=r.x0-1e-6&&x<=r.x1+1e-6&&z>=r.z0-1e-6&&z<=r.z1+1e-6;
 function layout(b){
  if(typeof CampusSpatialPlan!=='undefined'&&b.spatialProfile)return CampusSpatialPlan.layout(b);
  const horizontal=b.width>=b.depth,L=horizontal?b.width:b.depth,D=horizontal?b.depth:b.width;
  const sign=(b.id==='grade8-front')?-1:(!horizontal&&b.id!=='grade9-back'&&b.id!=='gym-bld'?-1:1);
  const world=(u,v,y=0)=>horizontal?{x:b.x+u,z:b.z+v,y}:{x:b.x+v,z:b.z+u,y};
  const rect=(u0,u1,v0,v1)=>{const a=world(u0,v0),c=world(u1,v1);return{x0:Math.min(a.x,c.x),x1:Math.max(a.x,c.x),z0:Math.min(a.z,c.z),z1:Math.max(a.z,c.z)}};
  const cV=sign*(D/2-1.4),wallV=sign*(D/2-2.8),outerV=sign*D/2;
  const stairU=-L/2+6.4,farU=-L/2+1.2,nearU=-L/2+5.4;
  const floorHole=rect(-L/2+.4,nearU,-2.3,2.3),ramps=[],platforms=[],rooms=[];
  for(let f=1;f<b.floors;f++){
   const y=(f-1)*H;
   const a=world(nearU,sign*1.25,y),c=world(farU,sign*1.25,y+H/2);
   const d=world(farU,-sign*1.25,y+H/2),e=world(nearU,-sign*1.25,y+H);
   for(const [start,end] of [[a,c],[d,e]]){
    const bounds=rect(Math.min(horizontal?start.x-b.x:start.z-b.z,horizontal?end.x-b.x:end.z-b.z),Math.max(horizontal?start.x-b.x:start.z-b.z,horizontal?end.x-b.x:end.z-b.z), (horizontal?start.z-b.z:start.x-b.x)-.8,(horizontal?start.z-b.z:start.x-b.x)+.8);
    ramps.push({...bounds,start,end,h0:start.y,h1:end.y,axis:horizontal?'x':'z',floor:f});
   }
   platforms.push({...rect(-L/2+.4,farU+.08,-2.3,2.3),y:y+H/2});
  }
  const usable0=b.floors>1?-L/2+8:-L/2+1,usable1=L/2-1;
  for(let f=1;f<=b.floors;f++){
   const list=b.rooms.filter(r=>r.floor===f),w=(usable1-usable0)/Math.max(1,list.length);
   list.forEach((r,i)=>{const u0=usable0+i*w,u1=u0+w,u=(u0+u1)/2,y=(f-1)*H;
    rooms.push({...r,u0,u1,u,door:world(u,wallV,y),corridor:world(u,cV,y),center:world(u,(wallV-sign*D/2)/2,y)});
   });
  }
  return {id:b.id,b,horizontal,L,D,sign,cV,wallV,outerV,world,rect,stairU,farU,nearU,floorHole,ramps,platforms,rooms,entrance:world(0,outerV+sign*1.2),bounds:rect(-L/2,L/2,-D/2,D/2)};
 }
 function rampPoint(r,t){return{x:r.start.x+(r.end.x-r.start.x)*t,z:r.start.z+(r.end.z-r.start.z)*t,y:r.h0+(r.h1-r.h0)*t}}
 function groundAt(l,x,z,currentY){
  if(l.cells)return CampusSpatialPlan.groundAt(l,x,z,currentY);
  let best=0;
  if(inside(l.bounds,x,z))for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*H;
   if(y<=currentY+.35&&(f===1||!inside(l.floorHole,x,z)))best=Math.max(best,y);
  }
  for(const p of l.platforms)if(inside(p,x,z)&&p.y<=currentY+.35)best=Math.max(best,p.y);
  for(const r of l.ramps)if(inside(r,x,z)){
   const t=Math.max(0,Math.min(1,((r.axis==='x'?x:z)-(r.axis==='x'?r.start.x:r.start.z))/((r.axis==='x'?r.end.x:r.end.z)-(r.axis==='x'?r.start.x:r.start.z))));
   const y=r.h0+t*(r.h1-r.h0);if(y<=currentY+.35)best=Math.max(best,y);
  }
  return best;
 }
 function cameraPose(p,angle,pitch,first,distance=6.5){
  const sx=Math.sin(angle),sz=Math.cos(angle),eye=p.y+1.55,cp=Math.cos(pitch),sp=Math.sin(pitch);
  const position=first?{x:p.x,y:eye,z:p.z}:{x:p.x-sx*cp*distance,y:Math.max(p.y+.35,eye+1.0-sp*distance),z:p.z-sz*cp*distance};
  return{position,target:{x:p.x+sx*cp*6,y:eye+sp*6-(first?0:.3),z:p.z+sz*cp*6}};
 }
 return{layout,groundAt,rampPoint,cameraPose,inside};
})();
