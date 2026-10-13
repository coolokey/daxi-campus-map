/** Read the final navigation/collision model from a locally served, isolated tour snapshot. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require(process.env.CAMPUS_PLAYWRIGHT_MODULE||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const SOURCE_FILES=['campus-data.js','spatial-plan-data.js','spatial-plan.js','spatial-world.js','explorer.js','collision-grid.js','grid-search.js','walk-world-math.js','outdoor-plan.js','entrance-avenue.js'];
async function verifySources(url,sourceDir){
  const sources=[];
  for(const file of SOURCE_FILES){
    const response=await fetch(new URL(file,url));assert.ok(response.ok,'Missing served source '+file);
    const actual=crypto.createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
    const expected=crypto.createHash('sha256').update(fs.readFileSync(path.join(sourceDir,file))).digest('hex');
    assert.equal(actual,expected,'Served source version mismatch: '+file);sources.push({file,sha256:actual});
  }
  return sources;
}
async function capture(url,output){
  const parsed=new URL(url);assert.ok(['127.0.0.1','localhost'].includes(parsed.hostname),'Capture must use a local source snapshot');
  const sourceDir=path.resolve(__dirname,'../../public/campus-explorer'),sources=await verifySources(url,sourceDir);
  const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:120000});
    await page.waitForFunction(()=>window.campusWalkWorld?.graph&&window.campusExplorer?.nodes?.['walk-computer-lab-2'],{},{timeout:120000});
    const result=await page.evaluate(()=>{
      const graph=window.campusWalkWorld.graph,visited=new Set(['gate']),queue=['gate'];
      for(let i=0;i<queue.length;i++)for(const id of graph[queue[i]].neighbors)if(!visited.has(id)){visited.add(id);queue.push(id);}
      const rooms=Object.values(window.campusExplorer.rooms).filter(r=>!r.aliasFor&&BUILDINGS_CONFIG.some(b=>b.rooms.some(br=>br.id===r.id)));
      const nodes=Object.entries(graph).map(([id,n])=>({id,position:{x:n.x,z:n.z,height:n.y??0},buildingId:n.buildingId??null,level:Math.abs((n.y??0)/3.6-Math.round((n.y??0)/3.6))<1e-6?Math.max(1,Math.round((n.y??0)/3.6)+1):null}));
      const edges=[];for(const [id,n] of Object.entries(graph))for(const other of n.neighbors)if(id<other){const q=graph[other];edges.push({id:id+'--'+other,from:id,to:other,bidirectional:true,cost:Math.hypot(n.x-q.x,n.z-q.z,(n.y??0)-(q.y??0)),kind:Math.abs((n.y??0)-(q.y??0))>.01?'stair':'walk'});}
      const route=window.campusExplorer.findShortestPath('gate',window.campusExplorer.rooms['computer-lab-2'].node);
      const blockedSegments=[];
      if(route)for(let j=1;j<route.length;j++){
        const a=graph[route[j-1]],b=graph[route[j]],steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z,(b.y??0)-(a.y??0))/.12));
        for(let i=0;i<=steps;i++){const t=i/steps;if(checkWallCollision(a.x+(b.x-a.x)*t,(a.y??0)+((b.y??0)-(a.y??0))*t,a.z+(b.z-a.z)*t)){blockedSegments.push({from:route[j-1],to:route[j]});break;}}
      }
      return {formatVersion:1,status:'runtime-derived',coordinateUnit:'guide-unit',surveyed:false,annualOverridesApplied:false,
        navigation:{nodes,edges,gateNodeId:'gate',roomTargets:rooms.map(r=>({sourceRoomId:r.id,buildingId:r.buildingId,level:r.floor,nodeId:r.node,reachable:visited.has(r.node)}))},
        collisionVolumes:WALL_COLLIDERS.map(w=>({buildingId:w.buildingId??null,minX:w.minX,maxX:w.maxX,minZ:w.minZ,maxZ:w.maxZ,minHeight:w.minY,maxHeight:w.maxY})),
        pilotRoute:{targetSourceRoomId:'computer-lab-2',nodeIds:route??[],collisionCheck:{step:.12,blockedSegments}},
        checks:{nodeCount:nodes.length,edgeCount:edges.length,roomCount:rooms.length,unreachableRooms:rooms.filter(r=>!visited.has(r.node)).map(r=>r.id)}};
    });
    assert.deepEqual(errors,[],'Source snapshot has JavaScript errors');assert.ok(result.pilotRoute.nodeIds.length>2,'Pilot room must be reachable');assert.equal(result.checks.roomCount,92);
    assert.deepEqual(await verifySources(url,sourceDir),sources,'Sources changed during capture');
    result.sources=sources;
    fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
    console.log(JSON.stringify({...result.checks,collisionVolumes:result.collisionVolumes.length,pilotRouteNodes:result.pilotRoute.nodeIds.length,pilotBlockedSegments:result.pilotRoute.collisionCheck.blockedSegments.length},null,2));
    return result;
  }finally{await browser.close();}
}
if(require.main===module)capture(process.argv[2]||'http://127.0.0.1:8770/campus-explorer/',process.argv[3]||path.join(__dirname,'campus.runtime.json')).catch(e=>{console.error(e);process.exitCode=1;});
module.exports={capture,verifySources};
