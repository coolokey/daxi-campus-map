const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validateRuntime}=require('./validate-runtime.cjs'),root=path.resolve(__dirname,'../..');
const fixture=()=>JSON.parse(fs.readFileSync(path.join(__dirname,'campus.runtime.json'),'utf8'));
test('accepts the source-bound final graph and real pilot path',()=>assert.deepEqual(validateRuntime(fixture(),root),[]));
test('rejects a fabricated room identity',()=>{const d=fixture();d.navigation.roomTargets[0].sourceRoomId='nonexistent-room';assert.notDeepEqual(validateRuntime(d,root),[]);});
test('rejects disconnected room targets rather than trusting reachable flags',()=>{const d=fixture(),target=d.navigation.roomTargets[0].nodeId;d.navigation.edges=d.navigation.edges.filter(e=>e.from!==target&&e.to!==target);assert.notDeepEqual(validateRuntime(d,root),[]);});
test('rejects an invented path between existing nodes',()=>{const d=fixture();d.pilotRoute.nodeIds=['gate','walk-computer-lab-2'];assert.notDeepEqual(validateRuntime(d,root),[]);});
test('rejects pilot collision failures',()=>{const d=fixture();d.pilotRoute.collisionCheck.blockedSegments=[{from:'gate',to:'fake'}];assert.notDeepEqual(validateRuntime(d,root),[]);});
test('rejects source version drift',()=>{const d=fixture();d.sources[0].sha256='0'.repeat(64);assert.notDeepEqual(validateRuntime(d,root),[]);});
test('capture refuses runtime from a server with a different source version',async()=>{
 const http=require('node:http'),{verifySources}=require('./capture-runtime.cjs');
 const server=http.createServer((_req,res)=>{res.writeHead(200,{'Content-Type':'text/javascript'});res.end('// different source version');});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{await assert.rejects(verifySources(`http://127.0.0.1:${server.address().port}/`,path.join(root,'public/campus-explorer')),/version mismatch/);}
 finally{await new Promise(resolve=>server.close(resolve));}
});
