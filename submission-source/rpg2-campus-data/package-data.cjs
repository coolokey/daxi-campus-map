const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {validateCampus}=require('./export-campus.cjs'),{validateRuntime}=require('./validate-runtime.cjs');
const root=path.resolve(__dirname,'../..'),shared=JSON.parse(fs.readFileSync(path.join(__dirname,'campus.shared.json'),'utf8')),runtime=JSON.parse(fs.readFileSync(path.join(__dirname,'campus.runtime.json'),'utf8'));
const errors=[...validateCampus(shared).errors,...validateRuntime(runtime,root)];if(errors.length)throw new Error(errors.join('\n'));
const dir=path.join(root,'public/proposal/rpg/data');fs.mkdirSync(dir,{recursive:true});
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function put(prefix,data){const bytes=Buffer.from(JSON.stringify(data)+'\n'),sha256=hash(bytes),file=prefix+'.'+sha256.slice(0,12)+'.json';fs.writeFileSync(path.join(dir,file),bytes);return{file,bytes:bytes.length,sha256};}
const nodes=new Map(runtime.navigation.nodes.map(n=>[n.id,n]));
const techPortalIds=new Set([...shared.stairs.filter(s=>s.buildingId==='tech-building'),...shared.entrances.filter(e=>e.buildingId==='tech-building')].flatMap(item=>item.portalIds));
const pilot={formatVersion:1,status:'route-geometry-checked-not-playable',coordinateUnit:'guide-unit',sourceRoomId:'computer-lab-2',canonicalRoomId:shared.aliases['computer-lab-2'],
  building:shared.buildings.find(b=>b.id==='tech-building'),floors:shared.floors.filter(f=>f.buildingId==='tech-building'),rooms:shared.rooms.filter(r=>r.buildingId==='tech-building'),
  doors:shared.doors.filter(d=>d.floorId.startsWith('tech-building:')),stairs:shared.stairs.filter(s=>s.buildingId==='tech-building'),entrances:shared.entrances.filter(e=>e.buildingId==='tech-building'),
  portals:shared.portals.filter(p=>techPortalIds.has(p.id)),challenges:shared.challenges,npcPlacements:shared.npcPlacements,
  route:runtime.pilotRoute.nodeIds.map(id=>nodes.get(id)),collisionCheck:runtime.pilotRoute.collisionCheck,
  collisionVolumes:runtime.collisionVolumes.filter(c=>c.buildingId==='tech-building'),notes:['Floor blocked arrays and door widths remain pending adapter conversion.','Collision volumes are height-aware; do not flatten lintels into floor obstacles.','Existing submitted websites and URLs are unchanged in this data phase.']};
const files={campus:put('campus-115',shared),navigation:put('navigation-115',runtime),technologyPilot:put('technology-pilot',pilot)};
const manifest={schemaVersion:1,stage:'shared-data-ready',playablePilot:false,dataVersion:shared.dataVersion,sourceCommit:require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),
  coordinateUnit:'guide-unit',measured:false,files,counts:{buildings:shared.buildings.length,rooms:shared.rooms.length,unknownRoomNames:shared.rooms.filter(r=>r.nameStatus==='unverified').length,stairs:shared.stairs.length,candidateEntrances:shared.entrances.length,navigationNodes:runtime.navigation.nodes.length,navigationEdges:runtime.navigation.edges.length,collisionVolumes:runtime.collisionVolumes.length},
  checks:{sourceVersionMatched:true,allRoomsReachable:true,pilotCollisionBlockedSegments:runtime.pilotRoute.collisionCheck.blockedSegments.length},notes:['The existing game does not yet load this dataset.','Full graph is deferred data; the existing entry page does not download it.','A future stage will connect the Phaser/Canvas scene adapters and task flow without changing existing URLs.']};
fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log(JSON.stringify(manifest,null,2));
