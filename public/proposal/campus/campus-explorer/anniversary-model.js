/* Pure timeline and normalized burst geometry, shared by the renderer and tests. */
(() => {
  const phaseAt = ms => ms < 3000 ? 'countdown' : ms < 10000 ? 'sparse' : ms < 18000 ? 'dense' : ms < 23000 ? 'formation' : ms < 27000 ? 'blessing' : ms < 30000 ? 'fade' : 'finished';
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
  function textLayout(width,height,lines,panel){
    const gap=26,totalHeight=lines[0].height+gap+lines[1].height;
    let center=width/2,top=Math.max(95,height*.14),areaWidth=Math.min(820,width*.76);
    let scale=areaWidth/lines[1].width;
    if(panel&&height<600&&width>600){
      areaWidth=Math.max(240,panel.left-40);center=20+areaWidth/2;
      scale=Math.min(areaWidth/lines[1].width,(height-top-30)/totalHeight);
    }else if(panel&&top+totalHeight*scale>panel.top-16){
      scale=Math.min(scale,Math.max(.3,(panel.top-16-top)/totalHeight));
    }
    return {scale,center,top,gap,left:center-lines[1].width*scale/2,right:center+lines[1].width*scale/2,bottom:top+totalHeight*scale};
  }
  function qualityFor({width=1280,cores=4,memory=4,reduced=false,low=false,preset='auto'}={}){
    const tier=reduced||low||preset==='battery'?'low':preset==='high'?'high':preset==='standard'?'medium':width<600||cores<=4||memory<=2?'mobile':width<1100||memory<=4?'medium':'high';
    return {tier,maxParticles:{low:1000,mobile:2800,medium:5200,high:8500}[tier],stars:{low:65,mobile:150,medium:240,high:360}[tier],smoke:{low:12,mobile:25,medium:45,high:65}[tier]};
  }
  function burstVectors(kind,count,random=Math.random){
    const golden=Math.PI*(3-Math.sqrt(5));
    return Array.from({length:count},(_,i)=>{
      const y=1-2*(i+.5)/count,a=i*golden,r=Math.sqrt(1-y*y),speed=(kind==='willow'?25:kind==='chrysanthemum'?34:30)*(.83+random()*.3);
      if(kind==='ring'){const angle=i/count*Math.PI*6, radius=speed*(i%3===0?.7:1.15);return{x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,z:(random()-.5)*2,life:2.8+random()};}
      if(kind==='fan'){const angle=-1.1+2.2*i/Math.max(1,count-1);return{x:Math.sin(angle)*speed,y:Math.cos(angle)*speed,z:(random()-.5)*8,life:2.1+random()};}
      return{x:Math.cos(a)*r*speed,y:y*speed,z:Math.sin(a)*r*speed,life:kind==='willow'?4+random()*1.5:2+random()*1.8};
    });
  }
  function createCues(random=Math.random){
    const cues=[],kinds=['chrysanthemum','sphere','willow','fan','comet','ring'];
    for(let i=0;i<8;i++)cues.push({at:3000+i*760+random()*120,kind:kinds[i%6],x:(random()-.5)*180,height:90+random()*45});
    for(let i=0;i<25;i++){
      const at=10000+i*235+random()*100,kind=kinds[i%6];
      cues.push({at,kind,x:(random()-.5)*230,height:90+random()*70});
      if(kind==='fan'||kind==='comet')for(let j=1;j<=3;j++)cues.push({at:at+j*100,kind,x:(i%2?1:-1)*j*30,height:100+j*12});
    }
    for(let line=0;line<2;line++)for(let i=0;i<4+line;i++)cues.push({at:18000+line*2000+i*50,kind:'chrysanthemum',x:(i-(3+line)/2)*36,height:125-line*23,textLine:line,textSlot:i,textSlots:4+line,duration:1.05});
    for(const at of [23600,25200])cues.push({at,kind:'ring',x:(at===23600?-1:1)*220,height:90,decorative:true});
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
  window.CampusAnniversary = Object.freeze({phaseAt, shapePoints, frameStep,textLayout,qualityFor,burstVectors,createCues,eightyTargets,spatialAudio});
})();
