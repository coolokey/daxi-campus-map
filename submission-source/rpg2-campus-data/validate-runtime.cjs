const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function validateRuntime(data,root){
  const errors=[],finite=(...values)=>values.every(Number.isFinite),nodes=new Map();
  for(const n of data.navigation.nodes){
    if(nodes.has(n.id))errors.push('duplicate node '+n.id);nodes.set(n.id,n);
    if(!finite(n.position.x,n.position.z,n.position.height))errors.push('invalid position '+n.id);
    if(n.level!==null&&Math.abs(n.position.height-(n.level-1)*3.6)>.001)errors.push('stair landing incorrectly assigned a floor '+n.id);
  }
  for(const e of data.navigation.edges){if(!nodes.has(e.from)||!nodes.has(e.to)||!finite(e.cost)||e.cost<0)errors.push('invalid edge '+e.id);}
  const shared=JSON.parse(fs.readFileSync(path.join(root,'submission-source/rpg2-campus-data/campus.shared.json'),'utf8'));
  const canonicalRooms=new Map(shared.rooms.map(r=>[r.id,r])),adjacency=new Map([...nodes.keys()].map(id=>[id,[]]));
  for(const e of data.navigation.edges){if(nodes.has(e.from)&&nodes.has(e.to)){adjacency.get(e.from).push(e.to);if(e.bidirectional)adjacency.get(e.to).push(e.from);}}
  const reached=new Set(['gate']),queue=['gate'];for(let i=0;i<queue.length;i++)for(const id of adjacency.get(queue[i])??[])if(!reached.has(id)){reached.add(id);queue.push(id);}
  for(const c of data.collisionVolumes){if(!finite(c.minX,c.maxX,c.minZ,c.maxZ,c.minHeight,c.maxHeight)||c.minX>c.maxX||c.minZ>c.maxZ||c.minHeight>c.maxHeight)errors.push('invalid collision volume');}
  const rooms=new Set();for(const r of data.navigation.roomTargets){
    const canonical=canonicalRooms.get(shared.aliases[r.sourceRoomId]);
    if(rooms.has(r.sourceRoomId)||!nodes.has(r.nodeId)||!canonical||canonical.buildingId!==r.buildingId)errors.push('invalid room target '+r.sourceRoomId);
    if(!reached.has(r.nodeId)||r.reachable!==true)errors.push('unreachable room '+r.sourceRoomId);
    rooms.add(r.sourceRoomId);
  }
  if(rooms.size!==92)errors.push('expected 92 room targets');
  if(!data.pilotRoute.nodeIds.length)errors.push('missing pilot route');
  if(data.pilotRoute.nodeIds.some(id=>!nodes.has(id)))errors.push('unknown pilot node');
  const route=data.pilotRoute.nodeIds,target=data.navigation.roomTargets.find(r=>r.sourceRoomId===data.pilotRoute.targetSourceRoomId);
  if(route[0]!=='gate'||route.at(-1)!==target?.nodeId)errors.push('invalid pilot endpoints');
  for(let i=1;i<route.length;i++)if(!adjacency.get(route[i-1])?.includes(route[i]))errors.push('disconnected pilot path');
  if(data.pilotRoute.collisionCheck.blockedSegments.length)errors.push('pilot route has blocked segments');
  for(const s of data.sources){const p=path.join(root,'public/campus-explorer',s.file),sha=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');if(sha!==s.sha256)errors.push('source changed: '+s.file);}
  return errors;
}
module.exports={validateRuntime};
if(require.main===module){const file=process.argv[2]||path.join(__dirname,'campus.runtime.json'),root=process.argv[3]||path.resolve(__dirname,'../..');const data=JSON.parse(fs.readFileSync(file,'utf8')),errors=validateRuntime(data,root);console.log(JSON.stringify({errors,nodeCount:data.navigation.nodes.length,roomCount:data.navigation.roomTargets.length,pilotBlockedSegments:data.pilotRoute.collisionCheck.blockedSegments},null,2));if(errors.length)process.exitCode=1;}
