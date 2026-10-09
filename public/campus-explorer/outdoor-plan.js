/* Outdoor dimensions are guide units, not surveyed measurements.
 * Appearance: 2019 photos describe the stage; track colour retains the undated 3D source.
 */
const CampusOutdoorPlan=(()=>{
 const palette={track:0x23272f,lawn:0x7b9555,court:0xb91c1c,line:0xf2f0e4,stage:0x83b0bf,step:0xd9bf6f,roof:0x9e5148};
 const track={x:-84,z:-25,halfStraight:25,outerRadius:27,innerRadius:18};
 const stage={id:'grandstand',x0:-70,x1:-54,z0:8.1,z1:15.8,height:1.4,center:{x:-62,y:1.4,z:11},foot:{x:-62,y:0,z:4.3},stairs:{x0:-69,x1:-55,z0:4.5,z1:8.1}};
 const inside=(r,p)=>p.x>=r.x0&&p.x<=r.x1&&p.z>=r.z0&&p.z<=r.z1;
 const stairWidth=p=>14-Math.min(6,Math.max(0,Math.floor((p.z-4.5)/3.6*7)))*.38;
 const onStairs=p=>inside(stage.stairs,p)&&Math.abs(p.x+62)<=stairWidth(p)/2;
 function ground(p){if(inside(stage,p))return stage.height;if(onStairs(p))return (p.z-stage.stairs.z0)/(stage.stairs.z1-stage.stairs.z0)*stage.height;return 0}
 const onStage=p=>(inside(stage,p)||onStairs(p))&&Math.abs(p.y-ground(p))<.35;
 const reserved=p=>inside(stage,p)||inside(stage.stairs,p);
 const stairsPath=()=>Array.from({length:37},(_,i)=>({x:-62,z:4.5+i*.1,y:stage.height*i/36}));
 function exitPath(p){if(!onStage(p))return null;const points=[{x:p.x,y:p.y,z:p.z},{x:-62,y:ground(p),z:p.z}];if(p.z>8.1)points.push({x:-62,y:1.4,z:8.1});for(const q of stairsPath().reverse())if(q.z<p.z)points.push(q);points.push({...stage.foot});return points}
 const courts=[{x0:-74,x1:-60,z0:-37,z1:-27},{x0:-74,x1:-60,z0:-23,z1:-13}];
 return{palette,track,stage,courts,inside,ground,onStage,onStairs,stairWidth,reserved,stairsPath,exitPath};
})();
