/* Reuse BFS work only while constructing the unchanged static navigation graph. */
(()=>{
 const key=(x,z)=>`${x},${z}`;
 const create=start=>({queue:[start],head:0,parents:new Map([[key(start.x,start.z),null]]),cache:new Map()});
 function path(state,target,free){
  const end=key(target.x,target.z);
  while(!state.parents.has(end)&&state.head<state.queue.length&&state.head<130000){
   const c=state.queue[state.head++];
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=c.x+dx,z=c.z+dz,k=key(x,z);if(state.parents.has(k))continue;if(!state.cache.has(k))state.cache.set(k,free(x,z));if(state.cache.get(k)){state.parents.set(k,key(c.x,c.z));state.queue.push({x,z})}}
  }
  if(!state.parents.has(end))return null;
  const result=[];let k=end;while(k!==null){const [x,z]=k.split(',').map(Number);result.push({x,z});k=state.parents.get(k)}return result.reverse();
 }
 window.CampusGridSearch={create,path};
})();
