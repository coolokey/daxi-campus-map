/* Depth-tested fireworks inside the existing campus renderer. No overlay canvas. */
(() => {
  const vertex=`uniform float uScale; attribute float aSize; attribute float aAlpha; varying vec3 vColor; varying float vAlpha;
    void main(){vColor=color;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(1.0,-mv.z),1.0,96.0);}`;
  const fragment=`varying vec3 vColor; varying float vAlpha;
    void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;if(d>1.0)discard;
    float halo=pow(max(0.0,1.0-d),1.7);float core=exp(-d*d*22.0);
    gl_FragColor=vec4(vColor+vec3(core*.85),vAlpha*(halo*.8+core));}`;
  const smokeFragment=`varying vec3 vColor; varying float vAlpha;
    void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;if(d>1.0)discard;
    float edge=pow(max(0.0,1.0-d*d),2.5);gl_FragColor=vec4(vColor,vAlpha*edge);}`;
  function cloud(capacity,smoke=false){
    const geometry=new THREE.BufferGeometry(),data={position:new Float32Array(capacity*3),color:new Float32Array(capacity*3),aSize:new Float32Array(capacity),aAlpha:new Float32Array(capacity)};
    for(const [key,array] of Object.entries(data)){const attribute=new THREE.BufferAttribute(array,key==='position'||key==='color'?3:1);attribute.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute(key,attribute);}
    geometry.setDrawRange(0,0);
    const material=new THREE.ShaderMaterial({uniforms:{uScale:{value:600}},vertexShader:vertex,fragmentShader:smoke?smokeFragment:fragment,vertexColors:true,transparent:true,depthTest:true,depthWrite:false,blending:smoke?THREE.NormalBlending:THREE.AdditiveBlending});
    const points=new THREE.Points(geometry,material);points.frustumCulled=false;points.renderOrder=smoke?1:2;
    return {points,data,capacity,count:0};
  }
  function add(c,x,y,z,color,size,alpha){
    if(c.count>=c.capacity)return;const i=c.count++;
    c.data.position.set([x,y,z],i*3);c.data.color.set(color,i*3);c.data.aSize[i]=size;c.data.aAlpha[i]=Math.max(0,alpha);
  }
  function commit(c){c.points.geometry.setDrawRange(0,c.count);for(const a of Object.values(c.points.geometry.attributes))a.needsUpdate=true;}
  function create(api,initialQuality,callbacks={}){
    const model=window.CampusAnniversary,group=new THREE.Group();group.name='daxi-anniversary-fireworks';
    const stars=cloud(8500),smoke=cloud(90,true),glow=cloud(12),text=cloud(16000),textGroup=new THREE.Group();
    group.add(smoke.points,stars.points,glow.points,textGroup);textGroup.add(text.points);text.points.name='anniversary-text-particles';text.points.material.depthTest=false;text.points.renderOrder=20;
    text.points.material.vertexShader=vertex.replace('clamp(aSize*uScale/max(1.0,-mv.z),1.0,96.0)','aSize*uScale');
    text.points.material.fragmentShader=`varying vec3 vColor; varying float vAlpha;
      void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;if(d>1.0)discard;
      gl_FragColor=vec4(vColor*2.2,vAlpha*(1.0-smoothstep(.25,1.0,d)));}`;
    textGroup.quaternion.copy(api.camera.quaternion);
    const flash=new THREE.PointLight(0xffd399,0,520,1.3);flash.name='anniversary-burst-light';flash.castShadow=false;group.add(flash);
    const fill=new THREE.HemisphereLight(0xffd49a,0x284568,0);group.add(fill);
    api.scene.add(group);
    const textLines=window.CampusFireworkText.lines;
    const textBursts=[[],[]],textDepth=150;
    const targets=textLines.flatMap((line,lineIndex)=>line.points.map((p,i)=>({x:p[0],y:p[1],line:lineIndex,slot:i%(4+lineIndex),seed:Math.random()*Math.PI*2,speed:12+Math.random()*26})));
    function alignText(){textGroup.quaternion.copy(api.camera.quaternion);textGroup.position.copy(api.camera.position).add(new THREE.Vector3(0,0,-textDepth).applyQuaternion(api.camera.quaternion));}
    let particles=[],rockets=[],clouds=[],flares=[],bursts=0,disposed=false,quality=initialQuality,flashValue=0,flashColor=[1,.7,.28];
    const trailSamples=()=>quality.trailSamples||3,particleLimit=()=>Math.max(30,Math.floor((quality.maxParticles-120)/2.6));
    const palettes=[[1,.66,.2],[.35,.7,1],[1,.18,.3],[.3,1,.63],[.8,.45,1]];
    const statistics={bursts:0,launched:0,textPoints:0,active:0,smoke:0,drawPoints:0,tier:quality.tier};
    function launch(cue){
      if(disposed||rockets.length>=10)return;
      if((window.innerWidth||1280)<600&&cue.decorative)cue={...cue,x:Math.sign(cue.x)*Math.min(140,Math.abs(cue.x))};
      const position={x:cue.x*.55,y:15,z:-110-Math.random()*45};
      const rocket={position,origin:{...position},target:{x:cue.x,y:cue.height,z:-140-Math.random()*35},age:0,duration:cue.duration||1.3+Math.random()*.55,textLine:cue.textLine,textSlot:cue.textSlot,decorative:cue.decorative,kind:cue.kind,color:cue.kind==='willow'||cue.kind==='chrysanthemum'?[1,.68,.22]:palettes[Math.floor(Math.random()*palettes.length)],sound:null};
      rocket.sound=callbacks.launch?.(rocket.position);rockets.push(rocket);statistics.launched++;
    }
    function burst(rocket){
      bursts++;statistics.bursts=bursts;
      const position=rocket.target,count=Math.round(quality.stars*(rocket.kind==='willow'?1.15:1));
      const limit=particleLimit(),total=Math.min(count,limit);
      if(particles.length+total>limit){particles.sort((a,b)=>a.age/a.life-b.age/b.life);particles.length=Math.max(0,limit-total);}
      const innerColor=palettes[(palettes.indexOf(rocket.color)+2)%palettes.length];
      for(const [i,v] of model.burstVectors(rocket.kind,total).entries()){
        const inner=rocket.kind==='sphere'&&i%4===0,factor=inner?.52:1,history=new Float32Array(15);
        for(let j=0;j<5;j++)history.set([position.x,position.y,position.z],j*3);
        particles.push({x:position.x,y:position.y,z:position.z,vx:v.x*factor,vy:v.y*factor,vz:v.z*factor,life:v.life,age:0,seed:Math.random()*30,color:inner?innerColor:rocket.color,willow:rocket.kind==='willow',history,historyCount:0,historyClock:0});
      }
      if(flares.length>=10)flares.shift();flares.push({...position,age:0,color:rocket.color});
      for(let i=0;i<5&&clouds.length<quality.smoke;i++)clouds.push({x:position.x+(Math.random()-.5)*15,y:position.y+(Math.random()-.5)*10,z:position.z,age:0,life:5+Math.random()*2,size:14+Math.random()*10});
      flash.position.set(position.x,position.y,position.z);flashValue=Math.min(1,flashValue+.75);flashColor=rocket.color;flash.color.setRGB(...flashColor);
      if(rocket.textLine!==undefined){const projected=new THREE.Vector3(position.x,position.y,position.z).project(api.camera);textBursts[rocket.textLine][rocket.textSlot]={x:projected.x,y:projected.y};}
      callbacks.burst?.(position,rocket.kind,rocket.decorative?.45:rocket.kind==='comet'?.6:1);
    }
    function update(delta,elapsed,reduced=false){
      if(disposed)return;
      const dt=Math.min(delta,.1);stars.count=0;smoke.count=0;glow.count=0;text.count=0;let trailPoints=0;
      for(const cloud of [stars,smoke,glow,text])cloud.points.material.uniforms.uScale.value=(window.innerHeight||960)*Math.min(window.devicePixelRatio||1,2)*.65;
      if(!reduced){
        for(const r of rockets){
          r.age+=delta;const t=Math.min(1,r.age/r.duration),ease=1-Math.pow(1-t,1.4);
          const previous={...r.position};r.position.x=r.origin.x+(r.target.x-r.origin.x)*ease;r.position.y=r.origin.y+(r.target.y-r.origin.y)*ease;r.position.z=r.origin.z+(r.target.z-r.origin.z)*ease;
          for(let j=0;j<12;j++)add(stars,r.position.x-(r.position.x-previous.x)*j*.18+(Math.random()-.5)*.2,r.position.y-j*.8,r.position.z,[1,.6,.15],6-j*.3,(1-j/12)*.95);
          callbacks.move?.(r.sound,r.position);
          if(t>=1)burst(r);
        }
        rockets=rockets.filter(r=>r.age<r.duration);
        for(const p of particles){
          p.age+=delta;const drag=Math.exp(-dt*(p.willow?.22:.65));p.vx*=drag;p.vy=p.vy*drag-dt*(p.willow?8:10);p.vz*=drag;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
          const fade=Math.pow(Math.max(0,1-p.age/p.life),.75),twinkle=p.age>p.life*.5?.55+.45*Math.sin(p.seed+p.age*31)**2:1;
          p.alpha=fade*twinkle;
          add(stars,p.x,p.y,p.z,p.color,p.willow?5.8:7,fade*twinkle);
          p.historyClock+=dt;
          if(p.historyClock>=.09){p.history.copyWithin(3,0,12);p.history.set([p.x,p.y,p.z],0);p.historyCount=Math.min(5,p.historyCount+1);p.historyClock%=.09;}
        }
        particles=particles.filter(p=>p.age<p.life&&p.y>0);
        // Draw all heads before spending the remaining budget on trails. Long-lived
        // willow tails get first choice, so older flowers survive dense volleys.
        for(const willow of [true,false])for(let j=0;j<trailSamples();j++)for(const p of particles){
          if(stars.count>=quality.maxParticles)break;if(p.willow!==willow||p.historyCount<=j)continue;
          add(stars,p.history[j*3],p.history[j*3+1],p.history[j*3+2],p.color,5.2-j*.7,p.alpha*(1-(j+1)/(trailSamples()+1))*.85);trailPoints++;
        }
        for(const c of clouds){c.age+=delta;c.x+=dt*2.2;c.y+=dt*1.5;const fade=Math.sin(Math.min(1,c.age/c.life)*Math.PI);add(smoke,c.x,c.y,c.z,[.18+flashValue*.2,.21+flashValue*.12,.27],c.size+c.age*5,fade*.16);}
        clouds=clouds.filter(c=>c.age<c.life);
        for(const f of flares){f.age+=dt;add(glow,f.x,f.y,f.z,f.color,32+f.age*80,Math.exp(-f.age*18)*.24)}flares=flares.filter(f=>f.age<.35);
      }
      flashValue*=Math.exp(-delta*6);flash.intensity=reduced?0:flashValue*5;fill.intensity=reduced?0:flashValue*.32;
      alignText();
      const width=window.innerWidth||1280,height=window.innerHeight||960;
      const layout=model.textLayout(width,height,textLines,callbacks.textPanel?.());
      const scale=layout.scale;
      const worldPerPixel=2*textDepth*Math.tan(THREE.MathUtils.degToRad(api.camera.fov||50)/2)/height;
      const textTop=layout.top,lineGap=layout.gap,drift=reduced?0:Math.max(0,(elapsed-27000)/1000);
      text.points.material.uniforms.uScale.value=Math.min(window.devicePixelRatio||1,2);
      if(elapsed>=18000||reduced){
        targets.forEach((p,i)=>{
          const start=18000+p.line*2000+1050+p.slot*50;
          if(!reduced&&elapsed<start)return;
          const age=Math.max(0,(elapsed-start)/1000),t=reduced?1:Math.min(1,Math.max(0,(age-.22)/1.25)),ease=t*t*(3-2*t);
          const targetX=layout.center-width/2+p.x*scale,targetY=height/2-textTop-(p.y+(p.line?textLines[0].height+lineGap:0))*scale;
          const origin=textBursts[p.line][p.slot]||{x:(p.slot/(3+p.line)-.5)*1.2,y:-.2+p.line*.15};
          const spread=Math.min(age,.3)*p.speed;
          const ox=origin.x*width/2+Math.cos(p.seed)*spread,oy=origin.y*height/2+Math.sin(p.seed)*spread;
          const x=ox+(targetX-ox)*ease+Math.sin(p.seed)*drift*7;
          const y=oy+(targetY-oy)*ease-drift*drift*9;
          const fade=Math.max(0,(30000-elapsed)/3000),twinkle=reduced?.85:.78+.22*Math.sin(i+elapsed*.0025)**2;
          add(text,x*worldPerPixel,y*worldPerPixel,0,i%17===0?[1,.28,.16]:[1,.72,.25],Math.max(2.4,3.2*scale),Math.min(1,fade)*twinkle*(reduced?1:Math.min(1,age*4)));
        });
      }
      commit(stars);commit(smoke);commit(glow);commit(text);
      Object.assign(statistics,{active:particles.length+rockets.length,textPoints:text.count,smoke:clouds.length,drawPoints:stars.count,trailPoints,flashPoints:glow.count,tier:quality.tier,flash:flash.intensity,textLines:textLines.map(l=>l.label),formedLines:reduced||elapsed>=23000?2:elapsed>=21000?1:0,textDrift:drift,textBounds:layout});
    }
    function setQuality(value){quality=value;if(particles.length>particleLimit())particles.length=particleLimit();}
    function dispose(){disposed=true;particles=[];rockets=[];clouds=[];flares=[];api.scene.remove(group);group.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});Object.assign(statistics,{active:0,smoke:0,drawPoints:0,trailPoints:0,flashPoints:0,textPoints:0,flash:0});}
    return {group,launch,update,setQuality,dispose,alignText,stats:()=>({...statistics})};
  }
  window.CampusFireworkScene=Object.freeze({create});
})();
