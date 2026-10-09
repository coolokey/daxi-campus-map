/* Opt-in browser diagnostics, including the first completed WebGL frame. */
if(new URLSearchParams(location.search).has('profile')){const builtMs=Math.round(performance.now());requestAnimationFrame(()=>{
 const resources=performance.getEntriesByType('resource');
 const readyMs=Math.round(performance.now());
 console.info('CAMPUS_STARTUP '+JSON.stringify({builtMs,readyMs,requests:resources.length,scriptRequests:resources.filter(r=>r.initiatorType==='script').length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,groups:scene.children.map(g=>{let meshes=0;g.traverse(o=>{if(o.isMesh)meshes++});return{name:g.name,type:g.type,meshes}}).filter(g=>g.meshes>10).sort((a,b)=>b.meshes-a.meshes).slice(0,16),resources:resources.map(r=>({name:r.name.split('/').at(-1),ms:Math.round(r.duration),bytes:r.transferSize}))}));
 parent!==window&&parent.postMessage({type:'campus-ready',readyMs},'*');
});}
