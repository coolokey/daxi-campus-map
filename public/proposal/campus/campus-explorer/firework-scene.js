/* Depth-tested fireworks inside the existing campus renderer. No overlay canvas. */
(() => {
  const vertex=`uniform float uScale; attribute float aSize; attribute float aAlpha; varying vec3 vColor; varying float vAlpha; varying float vSeed;
    void main(){vColor=color;vAlpha=aAlpha;vSeed=dot(position,vec3(.17,.31,.23));vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(1.0,-mv.z),1.0,96.0);}`;
  const fragment=`varying vec3 vColor; varying float vAlpha;
    void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;if(d>1.0)discard;
    float edge=1.0-smoothstep(.55,1.0,d),halo=exp(-d*d*3.5)*edge;
    float core=exp(-d*d*35.0),shoulder=exp(-d*d*10.0);
    gl_FragColor=vec4(vColor*(.85+shoulder*.65)+vec3(1.0,.91,.73)*core*.9,vAlpha*(halo*.45+shoulder*.65+core*.75));}`;
  const smokeFragment=`uniform float uTime; varying vec3 vColor; varying float vAlpha; varying float vSeed;
    void main(){float d=length(gl_PointCoord-vec2(.5))*2.0;if(d>1.0)discard;
    vec2 p=gl_PointCoord*2.0-1.0;
    float fold=sin(p.x*7.0+p.y*3.0+vSeed+uTime*.24)*sin(p.y*8.0-p.x*2.0+vSeed*.7);
    float wisps=.72+.28*sin(p.x*15.0+p.y*11.0+fold*2.0);
    float edge=pow(max(0.0,1.0-d*d),2.1);
    gl_FragColor=vec4(vColor,vAlpha*edge*(.72+.28*fold)*wisps);}`;
  function cloud(capacity,smoke=false){
    const geometry=new THREE.BufferGeometry(),data={position:new Float32Array(capacity*3),color:new Float32Array(capacity*3),aSize:new Float32Array(capacity),aAlpha:new Float32Array(capacity)};
    for(const [key,array] of Object.entries(data)){const attribute=new THREE.BufferAttribute(array,key==='position'||key==='color'?3:1);attribute.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute(key,attribute);}
    geometry.setDrawRange(0,0);
    const material=new THREE.ShaderMaterial({uniforms:{uScale:{value:600},uTime:{value:0}},vertexShader:vertex,fragmentShader:smoke?smokeFragment:fragment,vertexColors:true,transparent:true,depthTest:true,depthWrite:false,blending:smoke?THREE.NormalBlending:THREE.AdditiveBlending});
    const points=new THREE.Points(geometry,material);points.frustumCulled=false;points.renderOrder=smoke?1:2;
    return {points,data,capacity,count:0};
  }
  function add(c,x,y,z,color,size,alpha){
    if(c.count>=c.capacity)return;const i=c.count++;
    const j=i*3;c.data.position[j]=x;c.data.position[j+1]=y;c.data.position[j+2]=z;c.data.color.set(color,j);c.data.aSize[i]=size;c.data.aAlpha[i]=Math.max(0,alpha);
  }
  function upload(a,count){if(!count)return;if(a.addUpdateRange){a.clearUpdateRanges();a.addUpdateRange(0,count*a.itemSize)}else{a.updateRange.offset=0;a.updateRange.count=count*a.itemSize;}a.needsUpdate=true;}
  function commit(c){c.points.geometry.setDrawRange(0,c.count);for(const a of Object.values(c.points.geometry.attributes))upload(a,c.count);}
  // One instanced quad per trail segment, rather than disconnected round dots.
  // Thin screen-facing ribbons retain depth occlusion without a bloom pass.
  function streakCloud(capacity){
    const geometry=new THREE.InstancedBufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute([-1,0,0,1,0,0,-1,1,0,1,1,0],3));geometry.setIndex([0,1,2,2,1,3]);
    const data={aStart:new Float32Array(capacity*3),aEnd:new Float32Array(capacity*3),aColor:new Float32Array(capacity*3),aWidth:new Float32Array(capacity),aAlpha:new Float32Array(capacity*2)};
    for(const [key,array] of Object.entries(data)){const a=new THREE.InstancedBufferAttribute(array,['aStart','aEnd','aColor'].includes(key)?3:key==='aAlpha'?2:1);a.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute(key,a)}geometry.instanceCount=0;
    const material=new THREE.ShaderMaterial({uniforms:{uScale:{value:600},uViewport:{value:new THREE.Vector2(1280,960)}},transparent:true,depthTest:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
      vertexShader:`uniform float uScale;uniform vec2 uViewport;attribute vec3 aStart;attribute vec3 aEnd;attribute vec3 aColor;attribute float aWidth;attribute vec2 aAlpha;varying vec2 vUv;varying vec3 vColor;varying float vAlpha;
      void main(){vUv=position.xy;vColor=aColor;vAlpha=mix(aAlpha.x,aAlpha.y,position.y);vec4 a=modelViewMatrix*vec4(aStart,1.0),b=modelViewMatrix*vec4(aEnd,1.0);if(a.z>-.5||b.z>-.5){vAlpha=0.0;gl_Position=vec4(2.0,2.0,2.0,1.0);return;}vec4 ca=projectionMatrix*a,cb=projectionMatrix*b;
      vec2 direction=(cb.xy/max(.001,cb.w)-ca.xy/max(.001,ca.w))*uViewport;float lengthPx=length(direction);vec2 normal=lengthPx>.01?vec2(-direction.y,direction.x)/lengthPx:vec2(1.0,0.0);
      vec4 clip=mix(ca,cb,position.y);float widthPx=clamp(aWidth*uScale/max(1.0,-mix(a.z,b.z,position.y)),.65,12.0);
      clip.xy+=normal*position.x*widthPx/uViewport*clip.w;gl_Position=clip;}`,
      fragmentShader:`varying vec2 vUv;varying vec3 vColor;varying float vAlpha;void main(){float core=exp(-vUv.x*vUv.x*5.5),soft=exp(-vUv.x*vUv.x*2.4);gl_FragColor=vec4(vColor*(1.05+.75*core),vAlpha*(core*.8+soft*.3));}`});
    const mesh=new THREE.Mesh(geometry,material);mesh.name='anniversary-continuous-trails';mesh.frustumCulled=false;mesh.renderOrder=2;
    return {mesh,data,capacity,count:0};
  }
  function streak(c,ax,ay,az,bx,by,bz,color,width,alpha,tailAlpha){
    if(c.count>=c.capacity||Math.hypot(bx-ax,by-ay,bz-az)<1e-5)return false;const i=c.count++,j=i*3;
    c.data.aStart[j]=ax;c.data.aStart[j+1]=ay;c.data.aStart[j+2]=az;c.data.aEnd[j]=bx;c.data.aEnd[j+1]=by;c.data.aEnd[j+2]=bz;c.data.aColor.set(color,j);c.data.aWidth[i]=width;c.data.aAlpha[i*2]=Math.max(0,tailAlpha);c.data.aAlpha[i*2+1]=Math.max(0,alpha);return true;
  }
  // Exact linear-drag / gravity solution, sampled by age. This keeps both the
  // flower radius and curved trail stable when rendering slows down.
  function flight(p,age,out,decay){const travel=(1-decay)/p.drag;out.x=p.ox+p.vx*travel;out.y=p.oy+(p.vy+p.gravity/p.drag)*travel-p.gravity/p.drag*age;out.z=p.oz+p.vz*travel;return out;}
  function sparkColor(p){
    const hot=Math.exp(-p.age*9),cool=Math.max(0,(p.age/p.life-.48)/.52)*.35;
    const warm=p.willow||p.gold;
    for(let i=0;i<3;i++){const ember=warm?(i===0?1:i===1?.31:.045):p.color[i]*(i===0?1:i===1?.76:.6),white=i===0?1:i===1?.94:.77,base=p.color[i]*(1-cool)+ember*cool;p.renderColor[i]=base*(1-hot)+white*hot;}return p.renderColor;
  }
  function create(api,initialQuality,callbacks={}){
    const model=window.CampusAnniversary,group=new THREE.Group();group.name='daxi-anniversary-fireworks';
    const stars=cloud(8500),smoke=cloud(90,true),glow=cloud(12),text=cloud(16000),textGroup=new THREE.Group();
    stars.points.name='anniversary-spark-heads';smoke.points.name='anniversary-lit-smoke';
    const instancing=!!THREE.InstancedBufferGeometry&&(api.renderer?.capabilities?.isWebGL2||api.renderer?.extensions?.has?.('ANGLE_instanced_arrays')!==false),ribbons=instancing?streakCloud(8500):null;
    if(ribbons)group.add(ribbons.mesh);
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
    const scratch={x:0,y:0,z:0},smokeColor=[0,0,0];
    const tailDecay={willow:Array.from({length:6},(_,i)=>Math.exp(.22*.14*i)),spark:Array.from({length:6},(_,i)=>Math.exp(.65*.085*i))};
    function trail(ax,ay,az,bx,by,bz,color,width,alpha,tailAlpha=alpha){
      if(stars.count+(ribbons?.count||0)>=quality.maxParticles)return false;
      if(ribbons)return streak(ribbons,ax,ay,az,bx,by,bz,color,width,alpha,tailAlpha);
      add(stars,ax,ay,az,color,width,alpha);return true;
    }
    function rocketAt(r,age,out){const t=Math.max(0,Math.min(1,age/r.duration)),ease=1-Math.pow(1-t,1.4);out.x=r.origin.x+(r.target.x-r.origin.x)*ease;out.y=r.origin.y+(r.target.y-r.origin.y)*ease;out.z=r.origin.z+(r.target.z-r.origin.z)*ease;return out;}
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
      const innerColor=rocket.kind==='chrysanthemum'?[1,.8,.4]:palettes[(palettes.indexOf(rocket.color)+2)%palettes.length],tilt=rocket.kind==='ring'?(Math.random()-.5)*.9:0,cos=Math.cos(tilt),sin=Math.sin(tilt);
      for(const [i,v] of model.burstVectors(rocket.kind,total).entries()){
        const inner=(rocket.kind==='sphere'&&i%4===0)||(rocket.kind==='chrysanthemum'&&i%6===0),factor=inner?.52:1,willow=rocket.kind==='willow';
        particles.push({ox:position.x,oy:position.y,oz:position.z,x:position.x,y:position.y,z:position.z,vx:v.x*factor*cos-v.z*factor*sin,vy:v.y*factor,vz:v.x*factor*sin+v.z*factor*cos,drag:willow?.22:.65,gravity:willow?8:10,life:v.life,age:0,firstStep:Math.max(0,rocket.age-rocket.duration),seed:Math.random()*30,color:inner?innerColor:rocket.color,renderColor:[0,0,0],trail:new Float32Array(18),trailCount:0,gold:rocket.kind==='chrysanthemum',willow});
      }
      if(flares.length>=10)flares.shift();flares.push({...position,age:0,color:rocket.color});
      for(let i=0;i<5&&clouds.length<quality.smoke;i++)clouds.push({x:position.x+(Math.random()-.5)*15,y:position.y+(Math.random()-.5)*10,z:position.z,age:0,life:5+Math.random()*2,size:14+Math.random()*10,color:rocket.color});
      flash.position.set(position.x,position.y,position.z);flashValue=Math.min(1,flashValue+.75);flashColor=rocket.color;flash.color.setRGB(...flashColor);
      if(rocket.textLine!==undefined){const projected=new THREE.Vector3(position.x,position.y,position.z).project(api.camera);textBursts[rocket.textLine][rocket.textSlot]={x:projected.x,y:projected.y};}
      callbacks.burst?.(position,rocket.kind,rocket.decorative?.45:rocket.kind==='comet'?.6:1);
    }
    function update(delta,elapsed,reduced=false){
      if(disposed)return;
      const dt=Math.max(0,delta),pixelRatio=api.renderer?.getPixelRatio?.()||Math.min(window.devicePixelRatio||1,2);stars.count=0;smoke.count=0;glow.count=0;text.count=0;if(ribbons)ribbons.count=0;let trailPoints=0;
      const pointScale=(window.innerHeight||960)*pixelRatio*.65;
      for(const cloud of [stars,smoke,glow,text]){cloud.points.material.uniforms.uScale.value=pointScale;cloud.points.material.uniforms.uTime.value=elapsed/1000;}
      if(ribbons){ribbons.mesh.material.uniforms.uScale.value=pointScale;ribbons.mesh.material.uniforms.uViewport.value.set((window.innerWidth||1280)*pixelRatio,(window.innerHeight||960)*pixelRatio);}
      if(!reduced){
        for(const r of rockets){
          r.age+=dt;const t=Math.min(1,r.age/r.duration);rocketAt(r,r.age,r.position);
          add(stars,r.position.x,r.position.y,r.position.z,[1,.86,.5],6.5,.95);
          let bx=r.position.x,by=r.position.y,bz=r.position.z;
          for(let j=1;j<12;j++){rocketAt(r,r.age-j*.024,scratch);if(trail(scratch.x,scratch.y,scratch.z,bx,by,bz,r.color,3.4-j*.16,(1-j/12)*.75))trailPoints++;bx=scratch.x;by=scratch.y;bz=scratch.z;}
          callbacks.move?.(r.sound,r.position);
          if(t>=1)burst(r);
        }
        rockets=rockets.filter(r=>r.age<r.duration);
        for(const p of particles){
          p.age+=p.firstStep??dt;p.firstStep=null;const decay=Math.exp(-p.drag*p.age);flight(p,p.age,p,decay);
          const fade=Math.pow(Math.max(0,1-p.age/p.life),.85),flicker=Math.sin(p.seed+p.age*17)*Math.sin(p.seed*1.7+p.age*29),twinkle=p.age>p.life*.5?.58+.42*flicker*flicker:1;
          p.alpha=fade*twinkle;
          sparkColor(p);add(stars,p.x,p.y,p.z,p.renderColor,p.willow?5.8:6.4,fade*twinkle);
          const spacing=p.willow?.14:.085,multipliers=p.willow?tailDecay.willow:tailDecay.spark;
          p.trail[0]=p.x;p.trail[1]=p.y;p.trail[2]=p.z;p.trailCount=Math.min(trailSamples(),Math.floor((p.age+1e-9)/spacing));
          for(let j=1;j<=p.trailCount;j++){const age=Math.max(0,p.age-j*spacing),travel=(1-decay*multipliers[j])/p.drag,k=j*3;p.trail[k]=p.ox+p.vx*travel;p.trail[k+1]=p.oy+(p.vy+p.gravity/p.drag)*travel-p.gravity/p.drag*age;p.trail[k+2]=p.oz+p.vz*travel;}
        }
        particles=particles.filter(p=>p.age<p.life&&p.y>0);
        // Draw all heads before spending the remaining budget on trails. Long-lived
        // willow tails get first choice, so older flowers survive dense volleys.
        for(const willow of [true,false])for(let j=0;j<trailSamples();j++)for(const p of particles){
          if(stars.count+(ribbons?.count||0)>=quality.maxParticles)break;if(p.willow!==willow)continue;
          if(p.trailCount<=j)continue;const a=(j+1)*3,b=j*3;
          if(trail(p.trail[a],p.trail[a+1],p.trail[a+2],p.trail[b],p.trail[b+1],p.trail[b+2],p.renderColor,(p.willow?4.1:3.5)-j*.55,p.alpha*(1-j/(trailSamples()+1))*.95,p.alpha*(1-(j+1)/(trailSamples()+1))*.95))trailPoints++;
        }
        for(const c of clouds){c.age+=dt;c.x+=dt*2.2;c.y+=dt*1.5;const fade=Math.sin(Math.min(1,c.age/c.life)*Math.PI),light=Math.exp(-c.age*2.6);smokeColor[0]=.1+c.color[0]*light*.65;smokeColor[1]=.12+c.color[1]*light*.55;smokeColor[2]=.16+c.color[2]*light*.45;
          for(const f of flares){const dx=c.x-f.x,dy=c.y-f.y,dz=c.z-f.z,gain=Math.exp(-f.age*8)*.55/(1+(dx*dx+dy*dy+dz*dz)/1600);for(let i=0;i<3;i++)smokeColor[i]+=f.color[i]*gain;}
          add(smoke,c.x,c.y,c.z,smokeColor,c.size+c.age*5,fade*.2);}
        clouds=clouds.filter(c=>c.age<c.life);
        for(const f of flares){f.age+=dt;add(glow,f.x,f.y,f.z,f.color,20+f.age*35,Math.exp(-f.age*20)*.3);add(glow,f.x,f.y,f.z,f.color,62+f.age*90,Math.exp(-f.age*12)*.13)}flares=flares.filter(f=>f.age<.35);
      }
      flashValue*=Math.exp(-delta*6);flash.intensity=reduced?0:flashValue*5;fill.intensity=reduced?0:flashValue*.32;
      alignText();
      const width=window.innerWidth||1280,height=window.innerHeight||960;
      const layout=model.textLayout(width,height,textLines,callbacks.textPanel?.());
      const scale=layout.scale;
      const worldPerPixel=2*textDepth*Math.tan(THREE.MathUtils.degToRad(api.camera.fov||50)/2)/height;
      const textTop=layout.top,lineGap=layout.gap,drift=reduced?0:Math.max(0,(elapsed-27000)/1000);
      text.points.material.uniforms.uScale.value=pixelRatio;
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
      if(ribbons){ribbons.mesh.geometry.instanceCount=ribbons.count;for(const key of Object.keys(ribbons.data))upload(ribbons.mesh.geometry.getAttribute(key),ribbons.count);}
      Object.assign(statistics,{active:particles.length+rockets.length,textPoints:text.count,smoke:clouds.length,drawPoints:stars.count+(ribbons?.count||0),budget:quality.maxParticles,trailPoints,trailMode:ribbons?'ribbon':'points',flashPoints:glow.count,tier:quality.tier,flash:flash.intensity,textLines:textLines.map(l=>l.label),formedLines:reduced||elapsed>=23000?2:elapsed>=21000?1:0,textDrift:drift,textBounds:layout});
    }
    function setQuality(value){quality=value;if(particles.length>particleLimit())particles.length=particleLimit();if(clouds.length>quality.smoke)clouds.length=quality.smoke;}
    function dispose(){disposed=true;particles=[];rockets=[];clouds=[];flares=[];api.scene.remove(group);group.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});Object.assign(statistics,{active:0,smoke:0,drawPoints:0,trailPoints:0,flashPoints:0,textPoints:0,flash:0});}
    return {group,launch,update,setQuality,dispose,alignText,stats:()=>({...statistics})};
  }
  window.CampusFireworkScene=Object.freeze({create});
})();
