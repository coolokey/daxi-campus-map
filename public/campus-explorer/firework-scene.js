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
    const stars=cloud(8500),smoke=cloud(90,true),text=cloud(800),textGroup=new THREE.Group();
    group.add(smoke.points,stars.points,textGroup);textGroup.add(text.points);textGroup.position.set(0,119,-145);
    textGroup.quaternion.copy(api.camera.quaternion);
    const flash=new THREE.PointLight(0xffd399,0,520,1.3);flash.name='anniversary-burst-light';flash.castShadow=false;group.add(flash);
    const fill=new THREE.HemisphereLight(0xffd49a,0x284568,0);group.add(fill);
    api.scene.add(group);
    const targets=model.eightyTargets(),textOrigins=targets.map(()=>({x:(Math.random()-.5)*190,y:-65-Math.random()*35,z:(Math.random()-.5)*70}));
    let particles=[],rockets=[],clouds=[],bursts=0,disposed=false,quality=initialQuality,flashValue=0,flashColor=[1,.7,.28];
    const palettes=[[1,.66,.2],[.35,.7,1],[1,.18,.3],[.3,1,.63],[.8,.45,1]];
    const statistics={bursts:0,launched:0,textPoints:0,active:0,smoke:0,drawPoints:0,tier:quality.tier};
    function launch(cue){
      if(disposed||rockets.length>=10)return;
      const position={x:cue.x*.55,y:15,z:-110-Math.random()*45};
      const rocket={position,origin:{...position},target:{x:cue.x,y:cue.height,z:-140-Math.random()*35},age:0,duration:1.3+Math.random()*.55,kind:cue.kind,color:cue.kind==='willow'||cue.kind==='chrysanthemum'?[1,.68,.22]:palettes[Math.floor(Math.random()*palettes.length)],sound:null};
      rocket.sound=callbacks.launch?.(rocket.position);rockets.push(rocket);statistics.launched++;
    }
    function burst(rocket){
      bursts++;statistics.bursts=bursts;
      const position=rocket.target,count=Math.round(quality.stars*(rocket.kind==='willow'?1.15:1));
      for(const v of model.burstVectors(rocket.kind,count)){
        if(particles.length>=Math.floor(quality.maxParticles/3))break;
        particles.push({x:position.x,y:position.y,z:position.z,vx:v.x,vy:v.y,vz:v.z,life:v.life,age:0,seed:Math.random()*30,color:rocket.color,willow:rocket.kind==='willow'});
      }
      for(let i=0;i<5&&clouds.length<quality.smoke;i++)clouds.push({x:position.x+(Math.random()-.5)*15,y:position.y+(Math.random()-.5)*10,z:position.z,age:0,life:5+Math.random()*2,size:14+Math.random()*10});
      flash.position.set(position.x,position.y,position.z);flashValue=Math.min(1,flashValue+.75);flashColor=rocket.color;flash.color.setRGB(...flashColor);
      callbacks.burst?.(position,rocket.kind);
    }
    function update(delta,elapsed,reduced=false){
      if(disposed)return;
      const dt=Math.min(delta,.1);stars.count=0;smoke.count=0;text.count=0;
      for(const cloud of [stars,smoke,text])cloud.points.material.uniforms.uScale.value=(window.innerHeight||960)*Math.min(window.devicePixelRatio||1,2)*.65;
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
          add(stars,p.x,p.y,p.z,p.color,p.willow?4.6:5.6,fade*twinkle);
          const trail=p.willow?3:2;
          for(let j=1;j<=trail;j++)add(stars,p.x-p.vx*.035*j,p.y-p.vy*.035*j,p.z-p.vz*.035*j,p.color,4.8-j*.65,fade*twinkle*(1-j/(trail+1))*.65);
        }
        particles=particles.filter(p=>p.age<p.life&&p.y>0);
        for(const c of clouds){c.age+=delta;c.x+=dt*2.2;c.y+=dt*1.5;const fade=Math.sin(Math.min(1,c.age/c.life)*Math.PI);add(smoke,c.x,c.y,c.z,[.18+flashValue*.2,.21+flashValue*.12,.27],c.size+c.age*5,fade*.16);}
        clouds=clouds.filter(c=>c.age<c.life);
      }
      flashValue*=Math.exp(-delta*6);flash.intensity=reduced?0:flashValue*4;fill.intensity=reduced?0:flashValue*.26;
      if(elapsed>=22000){
        const t=reduced?1:Math.min(1,(elapsed-22000)/2400),ease=t*t*(3-2*t),fade=elapsed<28000?1:Math.max(0,(30000-elapsed)/2000);
        targets.forEach((p,i)=>{const origin=textOrigins[i];add(text,origin.x+(p.x-origin.x)*ease,origin.y+(p.y-origin.y)*ease,origin.z+(p.z-origin.z)*ease,[1,.76,.35],3.8,fade*(reduced?.8:.72+.28*Math.sin(i+elapsed*.003)**2));});
      }
      commit(stars);commit(smoke);commit(text);
      Object.assign(statistics,{active:particles.length+rockets.length,textPoints:text.count,smoke:clouds.length,drawPoints:stars.count,tier:quality.tier,flash:flash.intensity});
    }
    function setQuality(value){quality=value;if(particles.length>quality.maxParticles/3)particles.length=Math.floor(quality.maxParticles/3);}
    function dispose(){disposed=true;particles=[];rockets=[];clouds=[];api.scene.remove(group);group.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});Object.assign(statistics,{active:0,smoke:0,drawPoints:0,textPoints:0,flash:0});}
    return {group,launch,update,setQuality,dispose,alignText:()=>textGroup.quaternion.copy(api.camera.quaternion),stats:()=>({...statistics})};
  }
  window.CampusFireworkScene=Object.freeze({create});
})();
