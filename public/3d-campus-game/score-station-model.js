/* One automatic external-window attempt per physical visit. */
const CampusScoreStationModel=(()=>{
 const url='https://coolokey.github.io/dsjh-score/';
 function create(){
  let anchor=null,start=null,fired=false,visiting=false;
  const pause=()=>{anchor=null;start=null};
  return{pause,dismiss(){fired=true;pause()},get visiting(){return visiting},update(now,s){
   if(!s.near){pause();fired=false;visiting=false;return{show:false,fire:false};}
   visiting=true;
   if(!s.walking||s.moving||s.suspended){pause();return{show:false,fire:false};}
   if(fired)return{show:false,fire:false};
   const p=s.position;
   if(!anchor||Math.hypot(p.x-anchor.x,p.y-anchor.y,p.z-anchor.z)>.06){anchor={...p};start=now;}
   const elapsed=Math.max(0,now-start);
   if(elapsed>=3000){fired=true;return{show:true,fire:true,seconds:0};}
   return{show:true,fire:false,seconds:Math.ceil((3000-elapsed)/1000)};
  }};
 }
 return{url,create};
})();
