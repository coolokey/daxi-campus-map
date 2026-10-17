/* Outdoor dimensions are guide units, not surveyed measurements.
 * Appearance: the 115 campus plan is the layout authority; the red track and court
 * placement follow the plan with volleyball refined by aerial photos 05 / 12.
 */
const CampusOutdoorPlan=(()=>{
 const palette={track:0xc93434,lawn:0x7b9555,court:0xb91c1c,line:0xf2f0e4,stage:0x83b0bf,step:0xd9bf6f,roof:0x9e5148};
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
 // Aerial 05 / 12: red pair in the basketball-side inner bend, green pair in the adjacent strip.
 const courts=[{x0:-67,x1:-49,z0:-36,z1:-27},{x0:-67,x1:-49,z0:-23,z1:-14}];
 const outerCourts=[{x0:-24,x1:-15,z0:-57,z1:-39},{x0:-24,x1:-15,z0:-35,z1:-17}];
 const volleyball={innerCenter:{x:-58,z:-25},outerCenter:{x:-19.5,z:-37},outerPad:{x0:-29,x1:-10,z0:-60,z1:-14}};
 // Trace of the user's IPAD v.3 plan, fitted to existing campus landmarks.
 // Coordinates, fence height and finishes are illustrative, not surveyed.
 // The open polyline ends at the outside edges of the existing gate pylons.
 const outline=[[-22.2,86],[-22.2,100],[-40,100],[-95,91],[-112,83],[-127,57],[-123,54],[-141,20],[-144,22],[-149,12],[-152,-25],[-151,-52],[-142,-64],[-123,-71],[-121,-79],[111,-79],[114,-75],[111,-65],[109,-12],[111,-3],[103,2],[106,14],[108,24],[107,34],[99,39],[99,64],[98,86],[94,99],[66,94],[2.2,100],[2.2,86]];
 const perimeter={height:2.9,thickness:.7,outline,segments:outline.slice(1).map(([bx,bz],i)=>({ax:outline[i][0],az:outline[i][1],bx,bz,thickness:.7}))};
 perimeter.contains=(x,z)=>{let inside=false;for(let i=0,j=outline.length-1;i<outline.length;j=i++){const [ax,az]=outline[i],[bx,bz]=outline[j];if((az>z)!==(bz>z)&&x<(bx-ax)*(z-az)/(bz-az)+ax)inside=!inside;}return inside};
 return{palette,track,stage,courts,outerCourts,volleyball,perimeter,inside,ground,onStage,onStairs,stairWidth,reserved,stairsPath,exitPath};
})();
