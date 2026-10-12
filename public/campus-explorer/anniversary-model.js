/* Pure timeline and normalized burst geometry, shared by the renderer and tests. */
(() => {
  const phaseAt = ms => ms < 3000 ? 'countdown' : ms < 5000 ? 'night' : ms < 12000 ? 'sparse' : ms < 22000 ? 'dense' : ms < 25000 ? 'eighty' : ms < 28000 ? 'blessing' : ms < 30000 ? 'fade' : 'finished';
  function shapePoints(shape, count) {
    return Array.from({length: count}, (_, i) => {
      const a = i / count * Math.PI * 2;
      if (shape === 'heart') return {x: Math.pow(Math.sin(a), 3), y: -(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))/16};
      const r = shape === 'star' ? .72 + .28 * Math.cos(5*a) : 1;
      return {x: Math.sin(a)*r, y: Math.cos(a)*r};
    });
  }
  function frameStep(now,last){
    const elapsedMs=last?Math.max(0,now-last):0;
    return {elapsedMs,simulationSeconds:Math.min(elapsedMs/1000,.06)};
  }
  function qualityFor({width=1280,cores=4,memory=4,reduced=false,low=false}={}){
    const tier=reduced||low?'low':width<600||cores<=4||memory<=2?'mobile':width<1100||memory<=4?'medium':'high';
    return {tier,maxParticles:{low:1000,mobile:2800,medium:5200,high:8500}[tier],stars:{low:65,mobile:150,medium:240,high:360}[tier],smoke:{low:12,mobile:25,medium:45,high:65}[tier]};
  }
  function burstVectors(kind,count,random=Math.random){
    const golden=Math.PI*(3-Math.sqrt(5));
    return Array.from({length:count},(_,i)=>{
      const y=1-2*(i+.5)/count,a=i*golden,r=Math.sqrt(1-y*y),speed=(kind==='willow'?25:kind==='chrysanthemum'?34:30)*(.83+random()*.3);
      if(kind==='fan'){const angle=-1.1+2.2*i/Math.max(1,count-1);return{x:Math.sin(angle)*speed,y:Math.cos(angle)*speed,z:(random()-.5)*8,life:2.1+random()};}
      return{x:Math.cos(a)*r*speed,y:y*speed,z:Math.sin(a)*r*speed,life:kind==='willow'?4+random()*1.5:2+random()*1.8};
    });
  }
  function createCues(random=Math.random){
    const cues=[],kinds=['chrysanthemum','sphere','willow','fan','comet'];
    for(let i=0;i<6;i++)cues.push({at:5000+i*1100,kind:kinds[i%5],x:(random()-.5)*180,height:80+random()*45});
    for(let i=0;i<28;i++){
      const at=12000+i*320,kind=kinds[i%5];
      cues.push({at,kind,x:(random()-.5)*210,height:75+random()*75});
      if(kind==='fan')for(let j=-2;j<=2;j++)if(j)cues.push({at:at+Math.abs(j)*80,kind:'fan',x:j*32,height:75+Math.abs(j)*7});
      if(kind==='comet')for(let j=1;j<=3;j++)cues.push({at:at+j*120,kind:'comet',x:(i%2?1:-1)*(j*25),height:100+j*12});
    }
    return cues.sort((a,b)=>a.at-b.at);
  }
  // Two dotted elliptical loops form each digit; 80 is geometry, not a DOM overlay.
  function eightyTargets(){
    const points=[];
    for(const [cx,cy,rx,ry] of [[-24,11,13,13],[-24,-12,14,15],[22,0,17,28]]){
      for(let ring=-1;ring<=1;ring++)for(let i=0;i<82;i++){
        const a=i/82*Math.PI*2;points.push({x:cx+Math.cos(a)*(rx+ring*.7),y:cy+Math.sin(a)*(ry+ring*.7),z:ring*.2});
      }
    }
    return points;
  }
  function spatialAudio(position,camera){
    const listener=camera.position||camera,dx=position.x-listener.x,dy=position.y-listener.y,dz=position.z-listener.z;
    const distance=Math.hypot(dx,dy,dz),q=camera.quaternion;
    // Project onto the camera's local right vector, including free-look rotation.
    const right=q?{x:1-2*(q.y*q.y+q.z*q.z),y:2*(q.x*q.y+q.w*q.z),z:2*(q.x*q.z-q.w*q.y)}:{x:1,y:0,z:0};
    return {distance,delay:distance/343,gain:1/(1+(distance/180)**2),pan:Math.max(-.9,Math.min(.9,(dx*right.x+dy*right.y+dz*right.z)/Math.max(100,distance)))};
  }
  window.CampusAnniversary = Object.freeze({phaseAt, shapePoints, frameStep,qualityFor,burstVectors,createCues,eightyTargets,spatialAudio});
})();
