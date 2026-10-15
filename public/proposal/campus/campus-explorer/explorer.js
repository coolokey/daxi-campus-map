/* ==========================================================================
       1. CAMPUS DATA & CONFIGURATION (115學年度大溪國中)
       ========================================================================== */
        const CATEGORY_COLORS = {
      admin: "#e63946",
      grade7: "#2980b9",
      grade8: "#e67e22",
      grade9: "#27ae60",
      special: "#16a085",
      sports: "#8e44ad"
    };

    /* ==========================================================================
       2. THREE.JS SCENE SETUP & PROCEDURAL PBR TEXTURES
       ========================================================================== */
    const canvas = document.getElementById("webgl-canvas");
    function createCampusRenderer(){
      try{return new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});}
      catch(error){
        const fallback=document.createElement('section');fallback.id='campus-webgl-fallback';fallback.setAttribute('role','alert');
        fallback.style.cssText='position:fixed;inset:0;z-index:100000;background:#172e38;color:#f5f0df;display:grid;place-content:center;gap:20px;padding:24px;text-align:center;font:18px system-ui';
        const message=document.createElement('p');message.textContent='暫時無法啟動立體場景。請重新載入，或先查看校園平面圖。';
        const retry=document.createElement('button');retry.textContent='重新載入';retry.onclick=()=>location.reload();
        const plan=document.createElement('a');plan.href='campus_plan_115.jpg';plan.textContent='查看校園平面圖';plan.style.color='#f4c971';
        fallback.append(message,retry,plan);document.body.append(fallback);
        if(parent!==window)parent.postMessage({type:'campus-startup-error'},location.origin);
        throw error;
      }
    }
    const renderer = createCampusRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .88;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbdcbd0);
    scene.fog = new THREE.Fog(0xbdcbd0, 260, 640);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    const OVERVIEW_CAM = new THREE.Vector3(-160, 168, 225);
    const OVERVIEW_TARGET = new THREE.Vector3(-15, 0, 6);
    camera.position.copy(OVERVIEW_CAM);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(OVERVIEW_TARGET);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 6;
    controls.maxDistance = 420;

    const hemiLight = new THREE.HemisphereLight(0xdbe2e5, 0x686b5e, .72);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xf2eee5, .25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3e3, 1.05);
    sunLight.position.set(85, 160, 90);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = window.innerWidth < 768 ? 1024 : 2048;
    sunLight.shadow.mapSize.height = window.innerWidth < 768 ? 1024 : 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 460;
    const sD = 185;
    sunLight.shadow.camera.left = -sD;
    sunLight.shadow.camera.right = sD;
    sunLight.shadow.camera.top = sD;
    sunLight.shadow.camera.bottom = -sD;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    function createPaverTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 256; cvs.height = 256;
      const ctx = cvs.getContext("2d");
      ctx.fillStyle = "#a8ada9";
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      const step = 32;
      for (let x = 0; x <= 256; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
      }
      for (let y = 0; y <= 256; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 12);
      return tex;
    }
    const paverTex = createPaverTexture();

/* ==========================================================================
       3. 3D STUDENT AVATAR (五官表情與大溪國中校服精準建模)
       ========================================================================== */
    let avatarGroup = null;
    let avatarLeftArm = null, avatarRightArm = null;
    let avatarLeftLeg = null, avatarRightLeg = null;
    let avatarAngle = 0;
    let prevAvatarPos = new THREE.Vector3(0, 0, 96);
    const avatarSpeed = 18;
    const avatarRunSpeed = 28;

    // Soft face texture; hair is modeled separately so both hairstyles have a rounded outline.
    function createHeadTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 1024; cvs.height = 512;
      const ctx = cvs.getContext("2d");

      // 溫潤白皙膚色基底
      ctx.fillStyle = "#efd0ba";
      ctx.fillRect(0, 0, 1024, 512);

      // 黑亮雙眼 (黑眼珠 + 白色純淨眼神高光)
      function drawEye(cx, cy) {
        ctx.fillStyle = "#392e2d";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 24, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // 眼神高光
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx - 7, cy - 9, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();ctx.arc(cx + 7, cy + 10, 3, 0, Math.PI * 2);ctx.fill();
      }
      drawEye(423, 294);
      drawEye(601, 294);

      // 可愛粉嫩腮紅
      function drawBlush(cx, cy) {
        ctx.fillStyle = "rgba(209, 119, 111, 0.32)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 32, 15, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      drawBlush(373, 335);
      drawBlush(651, 335);

      // 可愛小嘴
      ctx.strokeStyle = "#925b55";ctx.lineWidth=5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(492,345);ctx.quadraticCurveTo(512,364,532,345);ctx.stroke();

      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    }

    // 2. 大溪國中運動外套/校服紋理 (參考 media_1791355647345.png & media_1791355660385.png)
    function createUniformTorsoTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 512; cvs.height = 512;
      const ctx = cvs.getContext("2d");

      // 深丈青色基底
      ctx.fillStyle = "#3d5874";
      ctx.fillRect(0, 0, 512, 512);

      // 兩側與肩膀淺水藍 (Sky Blue) 拼接飾片
      ctx.fillStyle = "#9fc4d4";
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(100, 0); ctx.lineTo(80, 512); ctx.lineTo(0, 512);
      ctx.closePath(); ctx.fill();

      ctx.beginPath();
      ctx.moveTo(512, 0); ctx.lineTo(412, 0); ctx.lineTo(432, 512); ctx.lineTo(512, 512);
      ctx.closePath(); ctx.fill();

      // 白色/淺灰立領內襯
      ctx.fillStyle = "#f1f5f9";
      ctx.beginPath();
      ctx.moveTo(195, 0); ctx.lineTo(256, 75); ctx.lineTo(317, 0);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 3; ctx.stroke();

      // 中央金屬拉鍊軌道
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(256, 68); ctx.lineTo(256, 512);
      ctx.stroke();

      // 拉鍊拉頭
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(252, 135, 8, 14);

      // 右胸學號名牌 (淡藍底藍框，11011 大溪國中)
      ctx.fillStyle = "#7dd3fc";
      ctx.fillRect(125, 145, 92, 44);
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 3;
      ctx.strokeRect(125, 145, 92, 44);
      ctx.fillStyle = "#0c4a6e";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("11011", 171, 164);
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("大溪國中", 171, 181);

      // 左胸金色草寫 Dxjh 校名刺繡
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.font = "italic bold 32px 'Brush Script MT', 'Palatino', serif";
      ctx.textAlign = "center";
      ctx.fillText("Dxjh", 355, 172);
      ctx.shadowColor = "transparent";

      // 下擺縮口羅紋
      ctx.fillStyle = "#1e295b";
      ctx.fillRect(0, 482, 512, 30);

      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    }

    // Smooth storybook proportions, with the existing arm/leg pivots retained for walking.
    function createStudentAvatar() {
      avatarGroup = new THREE.Group();
      avatarGroup.scale.setScalar(.65);
      avatarGroup.position.set(-10, 0, 90);
      avatarAngle = Math.PI;
      avatarGroup.rotation.y = avatarAngle;
      prevAvatarPos.copy(avatarGroup.position);
      const material=color=>new THREE.MeshStandardMaterial({color,roughness:.9,metalness:0});
      const skin=material(0xefd0ba),hair=material(0x3e332e),navy=material(0x3d5874),sky=material(0x9fc4d4),cream=material(0xeee9dc);
      const sphere=new THREE.SphereGeometry(1,20,14);
      function oval(parent,name,mat,x,y,z,sx,sy,sz){
        const mesh=new THREE.Mesh(sphere,mat);mesh.name=name;mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;parent.add(mesh);return mesh;
      }
      const shadow=new THREE.Mesh(new THREE.CircleGeometry(.68,28),new THREE.MeshBasicMaterial({color:0x292e31,transparent:true,opacity:.18,depthWrite:false}));
      shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;avatarGroup.add(shadow);

      // A softly tapered lathed shirt avoids the rectangular silhouette of a block figure.
      const profile=new THREE.SplineCurve([new THREE.Vector2(.27,-.45),new THREE.Vector2(.34,-.41),new THREE.Vector2(.38,-.22),new THREE.Vector2(.41,.12),new THREE.Vector2(.35,.34),new THREE.Vector2(.22,.45)]).getPoints(24);
      const torsoGeo=new THREE.LatheGeometry(profile,32);
      const uv=torsoGeo.attributes.uv;
      for(let i=0;i<uv.count;i++)uv.setX(i,(uv.getX(i)-.25)*2);
      torsoGeo.clearGroups();
      for(let i=0;i<32;i++)torsoGeo.addGroup(i*24*6,24*6,i>=8&&i<24?4:5);
      const torsoMaterials=Array.from({length:6},()=>material(0x3d5874));
      torsoMaterials[4]=new THREE.MeshStandardMaterial({map:createUniformTorsoTexture(),roughness:.95});
      const torso=new THREE.Mesh(torsoGeo,torsoMaterials);torso.name='avatar-torso';torso.position.y=1.39;torso.rotation.y=Math.PI;torso.scale.z=.66;torso.castShadow=true;avatarGroup.add(torso);
      const collar=new THREE.Mesh(new THREE.TorusGeometry(.205,.055,10,24),navy.clone());collar.name='avatar-collar';collar.rotation.x=Math.PI/2;collar.position.y=1.84;avatarGroup.add(collar);
      oval(avatarGroup,'avatar-neck',skin,0,1.88,0,.155,.16,.145);

      const head=new THREE.Group();head.name='avatar-head';head.position.y=2.29;avatarGroup.add(head);
      const face=new THREE.Mesh(new THREE.SphereGeometry(.49,32,24),new THREE.MeshStandardMaterial({map:createHeadTexture(),roughness:.95}));
      face.name='avatar-face';face.scale.set(1,.98,.94);face.rotation.y=-Math.PI/2;face.castShadow=true;head.add(face);
      for(const side of [-1,1])oval(head,'avatar-ear',skin,side*.475,-.055,.015,.085,.105,.075);
      oval(head,'avatar-nose',skin,0,-.12,.455,.038,.045,.035);
      const hairCap=new THREE.Mesh(new THREE.SphereGeometry(.507,28,18,0,Math.PI*2,0,Math.PI*.47),hair);hairCap.name='avatar-short-hair';hairCap.scale.z=.95;hairCap.castShadow=true;head.add(hairCap);
      oval(head,'avatar-back-hair',hair,0,-.08,-.18,.49,.48,.34);
      const boyFringe=new THREE.Group();boyFringe.name='avatar-boy-fringe';head.add(boyFringe);
      for(const [x,y,z,sx,sy,sz,tilt]of [[-.28,.24,.34,.21,.14,.14,-.5],[-.06,.29,.41,.23,.14,.14,-.3],[.18,.29,.37,.21,.12,.15,.15],[.31,.15,.26,.14,.20,.12,.4]]){
        oval(boyFringe,'avatar-hair-lock',hair,x,y,z,sx,sy,sz).rotation.z=tilt;
      }
      oval(boyFringe,'avatar-crown-lock',hair,-.12,.49,-.06,.14,.12,.16).rotation.z=-.3;
      const longHair=new THREE.Group();longHair.name='avatar-long-hair';longHair.visible=false;head.add(longHair);
      oval(longHair,'avatar-rounded-bob',hair,0,-.17,-.28,.47,.45,.245);
      for(const side of [-1,1]){
        oval(longHair,'avatar-side-lock',hair,side*.415,-.18,.025,.14,.36,.205).rotation.z=side*.1;
        oval(longHair,'avatar-fringe',hair,side*.19,.27,.37,.26,.14,.15).rotation.z=side*.18;
        oval(longHair,'avatar-hair-clip',sky,side*.405,.10,.205,.045,.055,.035);
      }

      function buildArm(left){
        const side=left?-1:1,arm=new THREE.Group();arm.position.set(side*.49,1.72,0);arm.rotation.z=side*.07;
        arm.name='avatar-arm-'+(left?'left':'right');
        oval(arm,'avatar-sleeve-'+(left?'left':'right'),navy.clone(),side*.015,-.12,0,.18,.235,.185);
        oval(arm,'avatar-shoulder-trim',sky,side*.135,-.08,.02,.055,.16,.13);
        oval(arm,'avatar-forearm',skin,side*.025,-.41,.015,.105,.26,.11);
        oval(arm,'avatar-hand',skin,side*.025,-.64,.025,.12,.135,.115);
        avatarGroup.add(arm);return arm;
      }
      avatarLeftArm=buildArm(true);avatarRightArm=buildArm(false);
      function buildLeg(left){
        const side=left?-1:1,leg=new THREE.Group();leg.position.set(side*.21,.96,0);
        leg.name='avatar-leg-'+(left?'left':'right');
        oval(leg,'avatar-shorts-'+(left?'left':'right'),navy.clone(),0,-.13,0,.19,.25,.19);
        oval(leg,'avatar-shorts-trim',sky,side*.155,-.12,.015,.028,.18,.08);
        oval(leg,'avatar-calf',skin,0,-.43,0,.12,.24,.125);
        oval(leg,'avatar-sock',cream,0,-.65,.015,.126,.13,.14);
        oval(leg,'avatar-shoe',navy,0,-.80,.09,.17,.135,.26);
        oval(leg,'avatar-shoe-sole',cream,0,-.895,.10,.177,.045,.265);
        oval(leg,'avatar-shoe-toe',cream,0,-.795,.265,.13,.065,.085);
        avatarGroup.add(leg);return leg;
      }
      avatarLeftLeg=buildLeg(true);avatarRightLeg=buildLeg(false);
      scene.add(avatarGroup);
    }

    // Initialize 3D student avatar
    createStudentAvatar();

    // Change only appearance: retain the same animated body, position and route.
    let avatarAppearance={gender:'male',outfit:'uniform'};
    const avatarTorso=avatarGroup.getObjectByName('avatar-torso');
    const avatarUniformTexture=avatarTorso.material[4].map;
    function setAvatarColor(material,color){
      material.color.setHex(color);
      if(material.userData.campusColorCalibrated)material.color.convertSRGBToLinear();
    }
    function getAvatarAppearance(){return {...avatarAppearance};}
    function setAvatarAppearance(value={}){
      if(['male','female'].includes(value.gender))avatarAppearance.gender=value.gender;
      if(['uniform','casual'].includes(value.outfit))avatarAppearance.outfit=value.outfit;
      const uniform=avatarAppearance.outfit==='uniform';
      avatarGroup.getObjectByName('avatar-long-hair').visible=avatarAppearance.gender==='female';
      avatarGroup.getObjectByName('avatar-boy-fringe').visible=avatarAppearance.gender==='male';
      avatarTorso.material.forEach((material,index)=>{
        material.map=index===4&&uniform?avatarUniformTexture:null;
        setAvatarColor(material,uniform?(index===4?0xffffff:0x3d5874):0xc98b6c);
        material.needsUpdate=true;
      });
      setAvatarColor(avatarGroup.getObjectByName('avatar-collar').material,uniform?0x3d5874:0xae745c);
      for(const side of ['left','right']){
        setAvatarColor(avatarGroup.getObjectByName('avatar-sleeve-'+side).material,uniform?0x3d5874:0xc98b6c);
        setAvatarColor(avatarGroup.getObjectByName('avatar-shorts-'+side).material,uniform?0x3d5874:0x586267);
      }
      try{localStorage.setItem('daxi-avatar-appearance',JSON.stringify(avatarAppearance));}catch(_){/* Session-only appearance still works. */}
      return getAvatarAppearance();
    }
    try{const saved=JSON.parse(localStorage.getItem('daxi-avatar-appearance')||'null');if(saved&&typeof saved==='object')setAvatarAppearance(saved);}catch(_){/* Keep default on unavailable or invalid storage. */}

    // Geometry/textures are shared, but each person owns materials and animated joints.
    function createCharacter(spec={}){
      const root=avatarGroup.clone(true),materials=new Map();
      root.name='campus-character';root.position.set(0,0,0);root.rotation.set(0,0,0);root.visible=true;
      const adult=spec.role==='teacher'||spec.role==='guard';
      root.scale.setScalar(adult?.72:.65);
      root.traverse(node=>{
        if(!node.material)return;
        const own=material=>{if(!materials.has(material))materials.set(material,material.clone());return materials.get(material)};
        node.material=Array.isArray(node.material)?node.material.map(own):own(node.material);
      });
      const female=spec.hairStyle?spec.hairStyle==='long':spec.gender==='female';
      root.getObjectByName('avatar-long-hair').visible=female;
      root.getObjectByName('avatar-boy-fringe').visible=!female;
      const uniform=!adult&&spec.outfit!=='casual',shirt=spec.shirtColor??0x899b8e;
      root.getObjectByName('avatar-torso').material.forEach((material,index)=>{
        material.map=uniform&&index===4?avatarUniformTexture:null;
        setAvatarColor(material,uniform?(index===4?0xffffff:0x3d5874):shirt);material.needsUpdate=true;
      });
      for(const name of ['avatar-collar','avatar-sleeve-left','avatar-sleeve-right'])setAvatarColor(root.getObjectByName(name).material,uniform?0x3d5874:shirt);
      for(const side of ['left','right']){
        const pants=root.getObjectByName('avatar-shorts-'+side);setAvatarColor(pants.material,uniform?0x3d5874:0x586267);
        if(adult){pants.position.y=-.34;pants.scale.y=.48;}
      }
      if(adult){
        // Adult clothes have their own cut and accessories, without school sportswear trims.
        const style=spec.role==='guard'?'security':(spec.clothingStyle||'shirt');root.userData.clothingStyle=style;
        root.traverse(node=>{if(['avatar-shoulder-trim','avatar-shorts-trim','avatar-sock','avatar-calf','avatar-shoe-toe'].includes(node.name))node.visible=false});
        const cloth=color=>{const m=new THREE.MeshStandardMaterial({color,roughness:.94});m.color.convertSRGBToLinear();m.userData.campusColorCalibrated=true;return m};
        const outer=cloth(shirt),light=cloth(0xe4ddcd),dark=cloth(spec.role==='guard'?0x293743:(spec.pantsColor||0x514b48));
        const detail=(name,geo,mat,x,y,z,parent=root)=>{const mesh=new THREE.Mesh(geo,mat);mesh.name=name;mesh.userData.campusOwnedGeometry=true;mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh};
        const panel=(name,points,mat,z)=>{const s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return detail(name,new THREE.ShapeGeometry(s),mat,0,0,z)};
        const block=(name,w,h,d,x,y,z,mat,parent)=>detail(name,new THREE.BoxGeometry(w,h,d),mat,x,y,z,parent);
        root.traverse(node=>{
          if(node.name.startsWith('avatar-shorts-'))setAvatarColor(node.material,spec.role==='guard'?0x293743:(spec.pantsColor||0x514b48));
          if(node.name==='avatar-shoe')node.material=dark;
          if(node.name==='avatar-shoe-sole'){node.scale.y=.028;node.material=dark;}
        });
        root.getObjectByName('avatar-collar').visible=false;
        for(const side of ['left','right']){
          const sleeve=root.getObjectByName('avatar-sleeve-'+side);
          if(style!=='polo'){sleeve.position.y=-.25;sleeve.scale.y=.37;}
        }
        if(style==='security'){
          // Navy trousers, pale blue button shirt, epaulettes, tie, pockets and duty belt.
          root.getObjectByName('avatar-torso').material.forEach(m=>setAvatarColor(m,0x9eafb7));
          for(const side of ['left','right'])setAvatarColor(root.getObjectByName('avatar-sleeve-'+side).material,0x9eafb7);
          for(const side of [-1,1]){
            const label=side<0?'left':'right';
            panel('security-collar-'+label,[[side*.035,1.84],[side*.20,1.75],[side*.105,1.61]],light,.245);
            block('security-pocket-'+label,.16,.14,.035,side*.22,1.48,.257,outer);
            block('security-pocket-flap-'+label,.18,.035,.045,side*.22,1.56,.28,dark);
            block('security-epaulette-'+label,.24,.045,.20,side*.40,1.76,0,dark);
          }
          panel('security-tie',[[0,1.77],[-.055,1.68],[-.045,1.40],[0,1.35],[.045,1.40],[.055,1.68]],dark,.283);
          block('security-belt',.64,.085,.38,0,1.01,0,dark);
          block('security-buckle',.10,.075,.035,0,1.01,.215,cloth(0xb49b68));
          block('security-radio',.10,.19,.10,.36,1.14,.13,dark);
        }else{
          for(const side of [-1,1]){
            const label=side<0?'left':'right';
            panel('teacher-collar-'+label,[[side*.025,1.83],[side*.19,1.75],[side*.09,1.64]],style==='polo'?outer:light,.247);
          }
          if(style==='blazer'){
            panel('teacher-inner-shirt',[[-.13,1.77],[.13,1.77],[.095,1.22],[-.095,1.22]],light,.279);
            for(const side of [-1,1])panel('teacher-lapel-'+(side<0?'left':'right'),[[side*.15,1.82],[side*.32,1.67],[side*.20,1.58],[side*.25,1.50],[side*.025,1.18]],outer,.30);
            block('teacher-blazer-pocket',.13,.028,.035,-.23,1.43,.275,light);
          }else if(style==='cardigan'){
            panel('teacher-knit-inner',[[-.12,1.77],[.12,1.77],[.11,1.1],[-.11,1.1]],light,.28);
            for(const side of [-1,1])panel('teacher-cardigan-panel-'+(side<0?'left':'right'),[[side*.18,1.80],[side*.33,1.62],[side*.30,1.02],[side*.05,1.02],[side*.04,1.40]],outer,.30);
          }else if(style==='polo')block('teacher-polo-placket',.065,.22,.025,0,1.62,.27,light);
          if(style!=='polo'){
            const buttons=new THREE.Group();buttons.name='teacher-shirt-buttons';root.add(buttons);
            for(const y of [1.53,1.37,1.21])detail('teacher-button',new THREE.SphereGeometry(.018,8,6),style==='shirt'?dark:light,0,y,.305,buttons);
          }
          block('teacher-waistband',.58,.06,.34,0,1.0,0,dark);
        }
      }
      if(spec.hairColor!=null){
        const hairMaterial=root.getObjectByName('avatar-short-hair').material;
        setAvatarColor(hairMaterial,spec.hairColor);
      }
      if(spec.role==='guard'){
        const badgeMaterial=new THREE.MeshStandardMaterial({color:0xb69b5e,roughness:.9});badgeMaterial.color.convertSRGBToLinear();
        const badge=new THREE.Mesh(new THREE.CircleGeometry(.075,6),badgeMaterial);badge.userData.campusOwnedGeometry=true;badge.name='avatar-guard-badge';badge.position.set(-.22,1.64,.29);root.add(badge);
      }
      if(spec.glasses){
        const glasses=new THREE.Group();glasses.name='avatar-glasses';glasses.position.set(0,-.045,.445);
        const frame=new THREE.MeshStandardMaterial({color:0x514a43,roughness:.95});frame.color.convertSRGBToLinear();
        for(const x of [-.17,.17]){const rim=new THREE.Mesh(new THREE.TorusGeometry(.118,.015,6,20),frame);rim.position.x=x;rim.scale.y=.83;glasses.add(rim)}
        const bridge=new THREE.Mesh(new THREE.CylinderGeometry(.013,.013,.11,6),frame);bridge.rotation.z=Math.PI/2;glasses.add(bridge);
        glasses.traverse(node=>{if(node.geometry)node.userData.campusOwnedGeometry=true});
        root.getObjectByName('avatar-head').add(glasses);
      }
      return root;
    }

    /* ==========================================================================
       4. CAMPUS ENVIRONMENT, STAIRCASES & ARCHITECTURE
       ========================================================================== */
    const floorMeshes = [];
    const labelElements = [];
    const roomBadgeElements = [];
    const labelsContainer = document.getElementById("labels-container");
    const ROOMS_DB = {};
    let focusedBuildingId=null;

    // 4.0 Collision & Multi-Floor Staircase Engine (AABB 碰撞體與階梯升降系統)
    const WALL_COLLIDERS = [];
    let collisionBuildingId = null;
    const STAIR_ZONES = [];
    const AVATAR_COLLISION_RADIUS = 0.42;
    const AVATAR_HEIGHT = 1.8;

    function registerWallCollider(minX, maxX, minZ, maxZ, minY, maxY) {
      WALL_COLLIDERS.push({
        buildingId: collisionBuildingId,
        minX: Math.min(minX, maxX),
        maxX: Math.max(minX, maxX),
        minZ: Math.min(minZ, maxZ),
        maxZ: Math.max(minZ, maxZ),
        minY: minY !== undefined ? minY : -0.5,
        maxY: maxY !== undefined ? maxY : 24
      });
    }

    function registerStairZone(worldX, worldZ, width, depth, baseY, topY, fromFloor, toFloor, axis = 'z', dir = 1) {
      STAIR_ZONES.push({
        worldX, worldZ,
        minX: worldX - width / 2,
        maxX: worldX + width / 2,
        minZ: worldZ - depth / 2,
        maxZ: worldZ + depth / 2,
        baseY, topY,
        fromFloor, toFloor,
        axis, dir
      });
    }

    function checkWallCollision(x, y, z) {
      if(typeof window!=='undefined'&&window.campusCollisionIndex)return window.campusCollisionIndex.hit(x,y,z);
      const r = AVATAR_COLLISION_RADIUS;
      const avatarMinX = x - r;
      const avatarMaxX = x + r;
      const avatarMinZ = z - r;
      const avatarMaxZ = z + r;
      const avatarMinY = y + 0.2;
      const avatarMaxY = y + AVATAR_HEIGHT - 0.2;

      for (let i = 0; i < WALL_COLLIDERS.length; i++) {
        const c = WALL_COLLIDERS[i];
        if (avatarMaxY >= c.minY && avatarMinY <= c.maxY) {
          if (avatarMaxX > c.minX && avatarMinX < c.maxX &&
              avatarMaxZ > c.minZ && avatarMinZ < c.maxZ) {
            return true;
          }
        }
      }
      return false;
    }

    // 每次最多前進 0.18 m，避免高速／掉幀時跨過薄牆。
    // 自動帶路與鍵盤、手機共用人物體積及碰撞體。
    let avatarPersonBlocked=false,autoPeopleWait=0;
    function moveAvatarWithCollision(position, dx, dz, dy = 0) {
      avatarPersonBlocked=false;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy, dz) / 0.18));
      const sx = dx / steps, sz = dz / steps, sy = dy / steps;
      let blocked = false;
      for (let step = 0; step < steps; step++) {
        const world=typeof window!=='undefined'?window.campusWalkWorld:null,followsGround=world&&!isJumping;
        const tryStep=(x,z)=>{
          const surface=world?.stepHeight?world.stepHeight(position,x,z):world?.ground({x,y:position.y,z});
          if(surface===null){blocked=true;return}
          const y=followsGround?surface:position.y+sy;
          if(followsGround&&typeof CampusOutdoorPlan!=='undefined'&&(CampusOutdoorPlan.reserved(position)||CampusOutdoorPlan.reserved({x,z}))&&Math.abs(y-position.y)>.24){blocked=true;return}
          const person=typeof window!=='undefined'&&window.campusPeople?.blocksPlayer(position,{x,y,z})===true;
          if(person)avatarPersonBlocked=true;
          if(checkWallCollision(x,y,z)||person){blocked=true;return}
          position.x=x;position.z=z;if(followsGround)position.y=y;
        };
        // Validate each sliding axis with its own support height, not the height
        // of an unaccepted diagonal destination beyond the edge of the stair.
        if(sx!==0)tryStep(position.x+sx,position.z);
        if(sz!==0)tryStep(position.x,position.z+sz);
        const y=followsGround?world.ground(position):position.y+sy;
        if (!checkWallCollision(position.x, y, position.z)) position.y = y;
        else if (sy !== 0) blocked = true;
      }
      return blocked;
    }

    function checkStairElevation(x, y, z) {
      for (let i = 0; i < STAIR_ZONES.length; i++) {
        const sz = STAIR_ZONES[i];
        if (x >= sz.minX && x <= sz.maxX && z >= sz.minZ && z <= sz.maxZ) {
          if (y >= sz.baseY - 0.6 && y <= sz.topY + 0.8) {
            let t = 0;
            if (sz.axis === 'z') {
              t = sz.dir === 1 ? (z - sz.minZ) / (sz.maxZ - sz.minZ) : (sz.maxZ - z) / (sz.maxZ - sz.minZ);
            } else {
              t = sz.dir === 1 ? (x - sz.minX) / (sz.maxX - sz.minX) : (sz.maxX - x) / (sz.maxX - sz.minX);
            }
            t = Math.max(0, Math.min(1, t));
            const elev = sz.baseY + t * (sz.topY - sz.baseY);
            return { onStair: true, elevation: elev, floor: t > 0.6 ? sz.toFloor : sz.fromFloor };
          }
        }
      }
      return { onStair: false };
    }

    function getBuildingAt(x, z) {
      for (let i = 0; i < BUILDINGS_CONFIG.length; i++) {
        const b = BUILDINGS_CONFIG[i];
        if (Math.abs(x - b.x) <= b.width / 2 + 0.8 && Math.abs(z - b.z) <= b.depth / 2 + 0.8) {
          return b;
        }
      }
      return null;
    }

    function createRoomNameplateTexture(text, bgColor = "#1e3a8a") {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(4, 4, 248, 56, 8);
      } else {
        ctx.rect(4, 4, 248, 56);
      }
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fbbf24";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.replace(/\s*\(\d+F\)/, ''), 128, 32, 228);

      const tex = new THREE.CanvasTexture(canvas);
      tex.encoding=THREE.sRGBEncoding;
      return tex;
    }

    // Photo reference: blue-and-white, metal-framed double-sided corridor signs.
    function createProjectingRoomSignTexture(label) {
      const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;
      const ctx=canvas.getContext('2d');ctx.fillStyle=label.color;ctx.fillRect(0,0,256,128);
      ctx.strokeStyle='#e2e4dc';ctx.lineWidth=3;ctx.strokeRect(7,7,242,114);
      ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';
      const count=label.lines.length,space=label.subtitle?86:106,top=label.subtitle?12:11;
      const font=Math.min(count===1?64:38,Math.floor(space/count*.85),Math.floor(224/Math.max(...label.lines.map(s=>Array.from(s).length))));
      ctx.font=`bold ${font}px 'Noto Sans TC', sans-serif`;
      label.lines.forEach((line,i)=>ctx.fillText(line,128,top+space*(i+.5)/count,224));
      if(label.subtitle){ctx.font="bold 17px 'Noto Sans TC', sans-serif";ctx.fillText(label.subtitle,128,108,220);}
      const tex=new THREE.CanvasTexture(canvas);tex.encoding=THREE.sRGBEncoding;return tex;
    }

    function createBuildingTitleTexture(text, bgColor = "#0f172a") {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 96;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(6, 6, 500, 84, 12);
      } else {
        ctx.rect(6, 6, 500, 84);
      }
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#f59e0b";
      ctx.stroke();

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 34px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 48);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }

    // 專屬大門門柱紋理 (藍黃波浪圓弧彩繪＋金色校名)
    function createGatePylonTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ecece7";
      ctx.fillRect(0, 0, 512, 1024);
      // 原照片兩側是連續的淡藍波紋及黃色半圓，中央為內縮字板。
      for (const side of [0, 512]) {
        const inward = side === 0 ? 1 : -1;
        ctx.fillStyle = "#99bac7";
        ctx.beginPath();
        ctx.moveTo(side, 0);
        ctx.lineTo(side + inward * 55, 0);
        for (let y = 0; y < 1024; y += 128) {
          ctx.bezierCurveTo(side + inward * 115, y + 40, side + inward * 14, y + 90, side + inward * 55, y + 128);
        }
        ctx.lineTo(side, 1024);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#d8bc5c";
        for (let y = 38; y < 1024; y += 192) {
          ctx.beginPath();
          ctx.arc(side, y, 55, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = "#a6aaa8";
      ctx.fillRect(89, 148, 334, 735);
      ctx.fillStyle = "#dddeda";
      ctx.fillRect(97, 160, 318, 715);
      ctx.font = "bold 64px 'DFKai-SB', 'BiauKai', 'Noto Serif TC', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#a48c50";
      ctx.shadowColor = "#626258";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 2;
      // 逐字依校門口.jpg：右列大雁乘風飛萬里，左列溪聲向學步高峰。
      for (const [text, x] of [["大雁乘風飛萬里", 325], ["溪聲向學步高峰", 190]]) {
        [...text].forEach((character, i) => ctx.fillText(character, x, 230 + i * 94));
      }
      return new THREE.CanvasTexture(canvas);
    }

    // 「禮義廉恥」正楷校訓匾額
    function createLiYiLianChiTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, 512, 128);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(6, 6, 500, 116);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 60px 'Noto Sans TC', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("禮  義  廉  恥", 256, 64);
      return new THREE.CanvasTexture(canvas);
    }

    // 紅色電子 LED 滾動跑馬燈
    function createLedMarqueeTexture(text = "大溪國中 歡迎光臨！ 實踐品格、創新共好 ★") {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, 512, 64);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#27272a";
      ctx.strokeRect(2, 2, 508, 60);

      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 26px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 32);
      return new THREE.CanvasTexture(canvas);
    }

    // 活動中心立體招牌紋理 (中英文)
    function createGymSignTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.clearRect(0, 0, 512, 128);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("學 生 活 動 中 心", 256, 52);

      ctx.fillStyle = "#334155";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("Student Activity Center", 256, 96);
      return new THREE.CanvasTexture(canvas);
    }

    // 4.1 Ground Lawn & Driveways
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(460, 380),
      new THREE.MeshStandardMaterial({ color: 0x5f7652 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 南側主幹道 (東西向車道, z=86)
    const southRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(170, 9),
      new THREE.MeshStandardMaterial({ color: 0x8c4c3a })
    );
    southRoad.rotation.x = -Math.PI / 2;
    southRoad.position.set(20, 0.02, 86);
    southRoad.receiveShadow = true;
    scene.add(southRoad);

    // 中央南北主車道 (直通北側, x=52)
    const centralRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 154),
      new THREE.MeshStandardMaterial({ color: 0x8c4c3a })
    );
    centralRoad.rotation.x = -Math.PI / 2;
    centralRoad.position.set(52, 0.025, 12);
    centralRoad.receiveShadow = true;
    scene.add(centralRoad);

    // 4.2 正門迎賓廣場、彩繪大門柱、金色圓球、黃牆紅瓦警衛室與大王椰子樹林蔭大道
    function createMainEntrancePlaza() {
      const plazaGroup = new THREE.Group();
      plazaGroup.position.set(-10, 0.03, 76);

      // 迎賓鋪面 (人字拼紅灰高質感地磚)
      const plaza = new THREE.Mesh(
        new THREE.PlaneGeometry(54, 24),
        new THREE.MeshStandardMaterial({ map: paverTex, color: 0xc5c7bd, roughness: 1 })
      );
      plaza.rotation.x = -Math.PI / 2;
      plaza.receiveShadow = true;
      plazaGroup.add(plaza);

      // 1. 大溪國中真實彩繪大門立柱 (白色方柱＋藍黃波浪圓圈彩繪＋金色校名)
      const gateTex = createGatePylonTexture();
      const pylonMat = new THREE.MeshStandardMaterial({ map: gateTex });
      const pylonGeo = new THREE.BoxGeometry(2.4, 6.2, 2.4);

      const pL = new THREE.Mesh(pylonGeo, pylonMat);
      pL.position.set(-11, 3.1, 10);
      pL.castShadow = true;
      plazaGroup.add(pL);

      const pR = new THREE.Mesh(pylonGeo, pylonMat);
      pR.position.set(11, 3.1, 10);
      pR.castShadow = true;
      plazaGroup.add(pR);

      // 門柱頂端金黃色金屬裝飾球 (金色球形裝置)
      const goldSphereGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const goldSphereMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
      const sphereL = new THREE.Mesh(goldSphereGeo, goldSphereMat);
      sphereL.position.set(-11, 6.8, 10);
      plazaGroup.add(sphereL);
      const sphereR = new THREE.Mesh(goldSphereGeo, goldSphereMat);
      sphereR.position.set(11, 6.8, 10);
      plazaGroup.add(sphereR);

      // 電動伸縮大門 (折疊鋁合金門)
      const slidingGate = new THREE.Mesh(
        new THREE.BoxGeometry(3, 1.6, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xd4d4d8, wireframe: false })
      );
      // 入口採開門狀態，收起的門仍有碰撞體。
      slidingGate.position.set(-7.5, 0.8, 10);
      registerWallCollider(-19, -16, 85.9, 86.1, 0, 1.6);
      slidingGate.castShadow = true;
      plazaGroup.add(slidingGate);

      scene.add(plazaGroup);

      // 2. 警衛室 (正門右側 x=6, z=86)：黃色外牆、紅色斜瓦屋頂、電子LED跑馬燈
      const guardGroup = new THREE.Group();
      guardGroup.position.set(6, 0, 86);

      const guardBody = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 3.2, 5.6),
        new THREE.MeshStandardMaterial({ color: 0xfef08a }) // 照片實況：亮黃色外牆
      );
      guardBody.position.y = 1.6;
      guardBody.castShadow = true;
      guardGroup.add(guardBody);

      // 警衛室紅色中式四坡斜瓦屋頂
      const gRoofShape = new THREE.Shape();
      gRoofShape.moveTo(-3.4, 0);
      gRoofShape.lineTo(0, 1.4);
      gRoofShape.lineTo(3.4, 0);
      gRoofShape.closePath();
      const gRoof = new THREE.Mesh(
        new THREE.ExtrudeGeometry(gRoofShape, { depth: 6.8, bevelEnabled: false }),
        new THREE.MeshStandardMaterial({ color: 0xa6262c })
      );
      gRoof.position.set(0, 3.2, -3.4);
      gRoof.rotation.y = Math.PI / 2;
      gRoof.castShadow = true;
      guardGroup.add(gRoof);

      // 警衛室紅色 LED 滾動字幕跑馬燈
      const ledSign = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 0.5),
        new THREE.MeshBasicMaterial({ map: createLedMarqueeTexture("大溪國中警衛室 ★ 請出示證件換證登記"), side: THREE.DoubleSide })
      );
      ledSign.position.set(0, 3.0, 2.85);
      guardGroup.add(ledSign);

      scene.add(guardGroup);
      registerWallCollider(3.2, 8.8, 83.2, 88.8, 0, 3.2);
      // 門柱是實體；中央入口保留通行空間。
      registerWallCollider(-22.2, -19.8, 84.8, 87.2, 0, 6.2);
      registerWallCollider(-0.2, 2.2, 84.8, 87.2, 0, 6.2);

      ROOMS_DB["guard"] = {
        id: "guard",
        code: "GATE-01",
        name: "正門警衛室",
        buildingId: "gate",
        buildingName: "校門口設施",
        floor: 1,
        cat: "admin",
        node: "gate-guard"
      };

      // 照片中的椰林大道位於校門外，保留中央入校動線。
      CampusEntranceAvenue.render(scene, registerWallCollider);
      ROOMS_DB['palm-avenue'] = {id:'palm-avenue',code:'OUT-PALM',name:'校門椰林大道',buildingId:'entrance-avenue',buildingName:'校門外通道',floor:1,cat:'special',node:'palm-avenue-end'};

      // 機車與腳踏車停車棚
      const motoCanopy = new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      motoCanopy.position.set(26, 3.0, 90);
      motoCanopy.castShadow = true;
      scene.add(motoCanopy);

      const bikeCanopy = new THREE.Mesh(new THREE.BoxGeometry(26, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x475569 }));
      bikeCanopy.position.set(80, 3.0, 90);
      bikeCanopy.castShadow = true;
      scene.add(bikeCanopy);

      ROOMS_DB["bike-shed"] = {
        id: "bike-shed",
        code: "PARK-BIKE",
        name: "學生腳踏車停車棚",
        buildingId: "park",
        buildingName: "校園停車設施",
        floor: 1,
        cat: "admin",
        node: "bike-shed"
      };
    }
    createMainEntrancePlaza();

    // 4.3 蔣公銅像庭園 (位於行政大樓西側庭院 x=-36, z=32)
    function createStatueCourtyard() {
      const statueGroup = new THREE.Group();
      statueGroup.name = "photo-statue-courtyard";
      // 尺寸沿既有模型比例；本體後移，保留 z=32 的既有前方觀賞目的地。
      statueGroup.position.set(-36, 0.02, 28.5);
      const stoneCanvas = document.createElement("canvas");
      stoneCanvas.width = stoneCanvas.height = 128;
      const stoneCtx = stoneCanvas.getContext("2d");
      stoneCtx.fillStyle = "#aeb0b0";
      stoneCtx.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 1500; i++) {
        stoneCtx.fillStyle = i % 3 ? "#74787b" : "#d4d4d0";
        stoneCtx.fillRect((i * 47) % 128, (i * 31 + Math.floor(i / 128) * 17) % 128, 1, 1);
      }
      const stone = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(stoneCanvas), roughness: 0.98 });
      const bronze = new THREE.MeshStandardMaterial({ color: 0x303337, metalness: 0.55, roughness: 0.64 });
      const shadowBronze = new THREE.MeshStandardMaterial({ color: 0x222529, metalness: 0.45, roughness: 0.74 });
      const addPart = (name, geometry, material, x, y, z) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        mesh.position.set(x, y, z);
        mesh.castShadow = mesh.receiveShadow = true;
        statueGroup.add(mesh);
        return mesh;
      };
      const box = (name, w, h, d, material, x, y, z) => addPart(name, new THREE.BoxGeometry(w, h, d), material, x, y, z);
      const oval = (name, sx, sy, sz, material, x, y, z) => {
        const mesh = addPart(name, new THREE.SphereGeometry(1, 24, 16), material, x, y, z);
        mesh.scale.set(sx, sy, sz);
        return mesh;
      };
      box("stone-bottom-step", 4.2, 0.22, 3.4, stone, 0, 0.11, 0);
      box("stone-upper-step", 3.7, 0.22, 2.9, stone, 0, 0.33, 0);
      box("front-step", 2.1, 0.16, 0.65, stone, 0, 0.08, 2.02);
      box("front-upper-step", 2.1, 0.24, 0.55, stone, 0, 0.18, 1.55);
      box("stone-plinth", 3, 2.35, 2.2, stone, 0, 1.615, 0);
      box("stone-cap-lower", 3.1, 0.15, 2.3, stone, 0, 2.865, 0);
      box("stone-cap-upper", 2.5, 0.14, 1.85, stone, 0, 3.01, 0);
      box("bust-foot", 1.9, 0.13, 1.05, shadowBronze, 0, 3.145, 0);

      // 深色半身銅像：肩／胸、頸、頭、耳鼻與立領，非圓柱替身。
      oval("bust-shoulders", 1.02, 0.52, 0.44, bronze, 0, 3.91, 0);
      const torso = addPart("bust-torso", new THREE.CylinderGeometry(0.84, 0.85, 1.12, 24), bronze, 0, 3.73, 0);
      torso.scale.z = 0.48;
      oval("bust-neck", 0.24, 0.32, 0.23, bronze, 0, 4.47, 0);
      oval("bust-head", 0.37, 0.52, 0.32, bronze, 0, 5.02, 0.015);
      oval("bust-hair", 0.37, 0.24, 0.315, shadowBronze, 0, 5.32, -0.018);
      oval("bust-ear-left", 0.075, 0.17, 0.09, bronze, -0.365, 4.99, 0.02);
      oval("bust-ear-right", 0.075, 0.17, 0.09, bronze, 0.365, 4.99, 0.02);
      oval("bust-nose", 0.075, 0.13, 0.13, bronze, 0, 5.01, 0.308);
      for (const side of [-1, 1]) {
        oval(`bust-brow-${side}`, 0.105, 0.028, 0.034, shadowBronze, side * 0.16, 5.14, 0.295);
        oval(`bust-eye-${side}`, 0.065, 0.025, 0.022, shadowBronze, side * 0.16, 5.08, 0.307);
        oval(`bust-moustache-${side}`, 0.09, 0.035, 0.03, shadowBronze, side * 0.075, 4.88, 0.322);
      }
      oval("bust-mouth", 0.12, 0.018, 0.026, shadowBronze, 0, 4.83, 0.302);
      for (const [side, x] of [["left", -0.17], ["right", 0.17]]) {
        const collar = box(`bust-collar-${side}`, 0.28, 0.22, 0.09, bronze, x, 4.45, 0.265);
        collar.rotation.z = x < 0 ? -0.26 : 0.26;
        box(`bust-pocket-${side}`, 0.46, 0.37, 0.045, bronze, x * 2.65, 3.91, 0.395);
        box(`bust-pocket-flap-${side}`, 0.48, 0.085, 0.06, shadowBronze, x * 2.65, 4.09, 0.417);
      }
      box("bust-button-seam", 0.035, 1.1, 0.025, shadowBronze, 0, 3.8, 0.42);
      for (let i = 0; i < 4; i++) oval(`bust-button-${i}`, 0.037, 0.037, 0.025, bronze, 0, 4.23 - i * 0.25, 0.448);

      const plaqueCanvas = document.createElement("canvas");
      plaqueCanvas.width = 256;
      plaqueCanvas.height = 384;
      const ctx = plaqueCanvas.getContext("2d");
      ctx.fillStyle = "#17191b";
      ctx.fillRect(0, 0, 256, 384);
      ctx.fillStyle = "#bc9b52";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 71px 'DFKai-SB', 'BiauKai', 'Noto Serif TC', serif";
      [..."民族救星"].forEach((character, i) => ctx.fillText(character, 128, 55 + i * 89));
      const plaqueMaterial = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(plaqueCanvas), roughness: 0.75 });
      addPart("statue-plaque", new THREE.PlaneGeometry(1.75, 2.03), plaqueMaterial, 0, 1.66, 1.112);

      const soil = new THREE.MeshStandardMaterial({ color: 0x625b4a, roughness: 1 });
      const foliage = new THREE.MeshStandardMaterial({ color: 0x395740, roughness: 0.95 });
      for (const side of [-1, 1]) {
        box(`hedge-bed-${side}`, 1.15, 0.12, 2.8, soil, side * 2.4, 0.06, 0);
        for (const z of [-0.9, 0.9]) {
          box(`hedge-stone-edge-${side}-${z}`, 1.3, 0.2, 0.14, stone, side * 2.4, 0.1, z * 1.6);
          oval(`trimmed-shrub-${side}-${z}`, 0.57, 0.47, 0.57, foliage, side * 2.4, 0.52, z);
        }
      }

      scene.add(statueGroup);

      ROOMS_DB["statue"] = {
        id: "statue",
        code: "LAND-STATUE",
        name: "蔣公銅像紀念庭園",
        buildingId: "garden",
        buildingName: "校園景觀庭園",
        floor: 1,
        cat: "special",
        node: "statue-node"
      };

      // 庭園周邊植栽
      [-42, -30].forEach(tx => {
        [24, 40].forEach(tz => {
          scene.add(createCypressTree(tx, tz));
        });
      });
    }
    createStatueCourtyard();

    function createCypressTree(x, z) {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
      trunk.position.y = 0.75;
      trunk.castShadow = true;
      tree.add(trunk);
      const fol1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.8, 8), new THREE.MeshStandardMaterial({ color: 0x2d6a4f }));
      fol1.position.y = 2.8;
      fol1.castShadow = true;
      tree.add(fol1);
      const fol2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x40916c }));
      fol2.position.y = 4.4;
      fol2.castShadow = true;
      tree.add(fol2);
      return tree;
    }

    function createBroadleafTree(x, z, scale = 1) {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.set(scale, scale, scale);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 2.4, 8), new THREE.MeshStandardMaterial({ color: 0x4a3728 }));
      trunk.position.y = 1.2;
      trunk.castShadow = true;
      tree.add(trunk);
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(2.8, 1), new THREE.MeshStandardMaterial({ color: 0x386641, roughness: 0.8 }));
      crown.position.y = 4.2;
      crown.castShadow = true;
      tree.add(crown);
      return tree;
    }

    // 景觀綠樹植栽
    [
      { x: 15, z: 28 }, { x: 15, z: 12 }, { x: 15, z: 46 },
      { x: -12, z: 2 }, { x: 38, z: 2 }, { x: 38, z: 54 },
      { x: 74, z: -2 }, { x: 74, z: 28 }, { x: 92, z: 28 }
    ].forEach(pos => {
      scene.add(createBroadleafTree(pos.x, pos.z, 1.05));
    });

    // 4.4 3D Physical Staircase Mesh Generator (實體多樓層可攀爬樓梯間)
    function create3DStaircaseMesh(x, z, totalFloors, bldWorldX, bldWorldZ) {
      const stairGroup = new THREE.Group();
      stairGroup.position.set(x, 0, z);
      const worldX = (bldWorldX !== undefined) ? bldWorldX + x : x;
      const worldZ = (bldWorldZ !== undefined) ? bldWorldZ + z : z;

      for (let f = 1; f < totalFloors; f++) {
        const baseH = (f - 1) * FH;
        const stepCount = 10;
        const stepDepth = 0.4;
        const stairWidth = 2.4;
        const flightLength = stepCount * stepDepth;

        // Steps
        for (let s = 0; s < stepCount; s++) {
          const stepMesh = new THREE.Mesh(
            new THREE.BoxGeometry(stairWidth, 0.22, stepDepth),
            new THREE.MeshStandardMaterial({ color: 0xd1d5db })
          );
          stepMesh.position.set(0, baseH + (s + 0.5) * (FH / stepCount), -s * stepDepth);
          stepMesh.castShadow = true;
          stepMesh.receiveShadow = true;
          stairGroup.add(stepMesh);
        }

        // Side Rails & Posts
        [-stairWidth / 2 + 0.08, stairWidth / 2 - 0.08].forEach(rx => {
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.08, flightLength * 1.3),
            new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
          );
          rail.position.set(rx, baseH + FH * 0.5 + 0.9, -flightLength * 0.5);
          rail.rotation.x = 0.65;
          stairGroup.add(rail);

          const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          post1.position.set(rx, baseH + 0.5, 0);
          stairGroup.add(post1);

          const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          post2.position.set(rx, baseH + FH + 0.5, -flightLength);
          stairGroup.add(post2);
        });

        // Top Landing Platform (上層休息平台)
        const landing = new THREE.Mesh(
          new THREE.BoxGeometry(stairWidth + 0.4, 0.25, 2.2),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        landing.position.set(0, f * FH, -flightLength - 0.9);
        landing.castShadow = true;
        landing.receiveShadow = true;
        stairGroup.add(landing);

        // 註冊攀爬梯區 (Z 軸向內走梯，方向 -1 表示往 -Z 上升)
        registerStairZone(worldX, worldZ - flightLength * 0.5, stairWidth + 0.6, flightLength + 1.8, baseH, f * FH, f, f + 1, 'z', -1);
      }

      return stairGroup;
    }

    // 4.5 200m 操場及綜合球場（平面圖紅色跑道＋清晰白標線＋足球草坪；司令台保留照片細節）
    function createTrackAndPlatform() { CampusOutdoorWorld.render(scene); }
    createTrackAndPlatform();

    // 4.6 戶外排球場 (位於操場與籃球場之間 x=-22, z=-38，綠色地坪)
    function createVolleyballCourt() {
      const vbGroup = new THREE.Group();
      vbGroup.position.set(-22, 0.04, -38);

      const vbFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 28),
        new THREE.MeshStandardMaterial({ color: 0x7b9555 })
      );
      vbFloor.rotation.x = -Math.PI / 2;
      vbFloor.receiveShadow = true;
      vbGroup.add(vbFloor);

      const vbBorder = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 26),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      );
      vbBorder.rotation.x = -Math.PI / 2;
      vbBorder.position.y = 0.01;
      vbGroup.add(vbBorder);

      // 排球柱與球網
      const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      post1.position.set(-7, 1.6, 0);
      vbGroup.add(post1);
      const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      post2.position.set(7, 1.6, 0);
      vbGroup.add(post2);

      const net = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.2), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
      net.position.set(0, 2.4, 0);
      vbGroup.add(net);

      scene.add(vbGroup);

      ROOMS_DB["volleyball-out"] = {
        id: "volleyball-out",
        code: "OUT-VB",
        name: "戶外排球場",
        buildingId: "court",
        buildingName: "綜合運動設施",
        floor: 1,
        cat: "sports",
        node: "vb-outer"
      };
    }
    createVolleyballCourt();

    // 4.7 戶外籃球場群（依 115 平面圖上下排列；保留照片中的藍色場面與紅色禁區）
    function createBasketballComplex() {
      const courtGroup = new THREE.Group();
      courtGroup.name = "basketball-court-complex";
      courtGroup.position.set(12, 0.04, -38);

      // 1. 外圍與球場緩衝隔離帶：高彩度草綠色 (Lime Green Buffer)
      const greenBuffer = new THREE.Mesh(
        new THREE.PlaneGeometry(34, 46),
        new THREE.MeshStandardMaterial({ color: 0x65a30d })
      );
      greenBuffer.rotation.x = -Math.PI / 2;
      greenBuffer.receiveShadow = true;
      courtGroup.add(greenBuffer);

      // 2. 三面全場籃球場（依平面圖上下排列，長邊左右）
      [-14, 0, 14].forEach(courtZ => {
        // 天藍色主要活動球場面（左右長邊 28m × 上下寬 12.6m）
        const blueFloor = new THREE.Mesh(
          new THREE.PlaneGeometry(28, 12.6),
          new THREE.MeshStandardMaterial({ color: 0x0284c7 })
        );
        blueFloor.userData.mapCourt = true;
        blueFloor.rotation.x = -Math.PI / 2;
        blueFloor.position.set(0, 0.01, courtZ);
        blueFloor.receiveShadow = true;
        courtGroup.add(blueFloor);

        // 磚紅色禁區三秒區 (Terracotta Red Key Areas: 4.8m x 5.8m on both ends)
        [-11.1, 11.1].forEach(keyX => {
          const redKey = new THREE.Mesh(
            new THREE.PlaneGeometry(5.8, 4.8),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          redKey.rotation.x = -Math.PI / 2;
          redKey.position.set(keyX, 0.015, courtZ);
          courtGroup.add(redKey);

          // 禁區罰球半圓弧 (Free-throw circle arc)
          const ftCircle = new THREE.Mesh(
            new THREE.CircleGeometry(1.8, 24),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          ftCircle.rotation.x = -Math.PI / 2;
          ftCircle.position.set(keyX + (keyX < 0 ? 2.9 : -2.9), 0.016, courtZ);
          courtGroup.add(ftCircle);
        });

        // 磚紅色跳球中圈 (Terracotta Red Center Jump Circle: R=1.8m)
        const centerCircle = new THREE.Mesh(
          new THREE.CircleGeometry(1.8, 32),
          new THREE.MeshStandardMaterial({ color: 0xdc2626 })
        );
        centerCircle.rotation.x = -Math.PI / 2;
        centerCircle.position.set(0, 0.015, courtZ);
        courtGroup.add(centerCircle);

        // 白色全場劃線 (Pure White Boundary Lines & Half-court Line)
        const boundaryLine = new THREE.Mesh(
          new THREE.PlaneGeometry(27.8, 12.4),
          new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        );
        boundaryLine.rotation.x = -Math.PI / 2;
        boundaryLine.position.set(0, 0.02, courtZ);
        courtGroup.add(boundaryLine);

        // 中場白線 (Half Court Line)
        const halfLine = new THREE.Mesh(
          new THREE.PlaneGeometry(0.12, 12.4),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        halfLine.rotation.x = -Math.PI / 2;
        halfLine.position.set(0, 0.022, courtZ);
        courtGroup.add(halfLine);
      });

      // 3. 專業標準籃球架 (White Backboards with Red Rims & Steel Posts)
      function createHoop(x, z, rot) {
        const hoop = new THREE.Group();
        hoop.position.set(x, 0, z);
        hoop.rotation.y = rot;

        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.4, 12), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        post.position.y = 2.2;
        hoop.add(post);

        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.4, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        arm.position.set(0, 3.8, 0.5);
        arm.rotation.x = Math.PI / 4;
        hoop.add(arm);

        const board = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.08), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        board.position.set(0, 3.9, 1.0);
        hoop.add(board);

        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 8, 20), new THREE.MeshStandardMaterial({ color: 0xe63946 }));
        rim.position.set(0, 3.6, 1.3);
        rim.rotation.x = Math.PI / 2;
        hoop.add(rim);

        return hoop;
      }

      for (const courtZ of [-14, 0, 14]) {
        courtGroup.add(createHoop(-14.2, courtZ, Math.PI / 2));
        courtGroup.add(createHoop(14.2, courtZ, -Math.PI / 2));
      }

      scene.add(courtGroup);

      ROOMS_DB["court-bb"] = {
        id: "court-bb",
        code: "OUT-BB",
        name: "戶外籃球場群 (三面全場)",
        buildingId: "court",
        buildingName: "綜合運動設施",
        floor: 1,
        cat: "sports",
        node: "bb-gate"
      };
    }
    createBasketballComplex();

    // 4.7.1 北側後山擋土牆與青翠林木護坡 (Back Mountain Terrain & Retaining Wall)
    function createBackMountainBackdrop() {
      const mountainGroup = new THREE.Group();
      mountainGroup.position.set(-30, 0, -85);

      // 混凝土護坡擋土牆 (Retaining Wall along northern boundary)
      const wallGeo = new THREE.BoxGeometry(160, 4.2, 2.0);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.y = 2.1;
      wallMesh.castShadow = true;
      mountainGroup.add(wallMesh);

      // 後山青翠斜坡山巒 (Lush Green Mountain Slopes)
      const hillGeo = new THREE.BoxGeometry(170, 16, 25);
      const hillMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
      const hillMesh = new THREE.Mesh(hillGeo, hillMat);
      hillMesh.position.set(0, 8, -12);
      mountainGroup.add(hillMesh);

      // 山坡茂密樹冠群 (Dense Tree Clusters)
      for (let t = -75; t <= 75; t += 12) {
        const treeCone = new THREE.Mesh(
          new THREE.ConeGeometry(4.2 + Math.random() * 2, 8 + Math.random() * 3, 7),
          new THREE.MeshStandardMaterial({ color: 0x14532d })
        );
        treeCone.position.set(t + (Math.random() - 0.5) * 6, 10 + Math.random() * 4, -8 + (Math.random() - 0.5) * 8);
        mountainGroup.add(treeCone);
      }

      scene.add(mountainGroup);
    }
    // 後山植栽由 art-direction.js 製作，避免原版巨大方塊遮蔽地景。

    // 4.8 蘭亭 & 訓平池 (位於北側圍牆景觀區)
    function createLanPavilion() {
      const gardenGroup = new THREE.Group();
      gardenGroup.position.set(-18, 0, -66);

      // 六角紅柱涼亭 (蘭亭)
      const pavilion = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.0, 8), new THREE.MeshStandardMaterial({ color: 0x991b1b }));
        pillar.position.set(Math.cos(i * Math.PI / 3) * 3.2, 2.0, Math.sin(i * Math.PI / 3) * 3.2);
        pavilion.add(pillar);
      }
      const pRoof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.8, 6), new THREE.MeshStandardMaterial({ color: 0x8e2d2a }));
      pRoof.position.y = 5.2;
      pavilion.add(pRoof);
      gardenGroup.add(pavilion);

      // 訓平池 (荷花睡蓮池 x=16 相對亭位即 x=-2)
      const pool = new THREE.Mesh(
        new THREE.CylinderGeometry(8.5, 8.5, 0.6, 32),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.88, roughness: 0.1 })
      );
      pool.position.set(16, 0.25, 0);
      gardenGroup.add(pool);

      for (let i = 0; i < 7; i++) {
        const pad = new THREE.Mesh(new THREE.CircleGeometry(0.7 + Math.random() * 0.4, 12), new THREE.MeshStandardMaterial({ color: 0x15803d }));
        pad.rotation.x = -Math.PI / 2;
        pad.position.set(16 + (Math.random() - 0.5) * 9, 0.58, (Math.random() - 0.5) * 9);
        gardenGroup.add(pad);
      }

      scene.add(gardenGroup);

      ROOMS_DB["lan-pavilion"] = {
        id: "lan-pavilion",
        code: "OUT-LAN",
        name: "蘭亭與訓平池 (生態池)",
        buildingId: "garden",
        buildingName: "校園景觀生態區",
        floor: 1,
        cat: "special",
        node: "lan-pond-gate"
      };
    }
    createLanPavilion();

    // 4.9 連通風雨走廊 (Breezeways)
    function createBreezeway(x, z, width, depth) {
      const bw = new THREE.Group();
      bw.position.set(x, 0, z);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(width, 0.35, depth), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
      roof.position.y = 4.0;
      roof.castShadow = true;
      bw.add(roof);

      for (let px of [-width / 2 + 0.4, width / 2 - 0.4]) {
        for (let pz of [-depth / 2 + 0.4, depth / 2 - 0.4]) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 4.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          col.position.set(px, 2.0, pz);
          col.castShadow = true;
          bw.add(col);
        }
      }
      scene.add(bw);
    }
    // 行政大樓至後方校舍的窄橋由共享 spatial-plan / spatial-world 生成。
    // 舊的一樓大頂棚會穿過二樓橋面以上的行走空間，故不再疊加。
    createBreezeway(15, 8, 26, 4);   // 九年級與八年級中棟北端橫向通廊
    createBreezeway(15, 52, 26, 4);  // 九年級與八年級中棟南端橫向通廊
    createBreezeway(12, 2, 4, 8);    // 通往健康中心棟通廊

    // 4.10 綜合大樓中庭平面停車場 (Parking Lot P)
    function createMultiBuildingParking() {
      const pLot = new THREE.Mesh(new THREE.PlaneGeometry(24, 15), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      pLot.rotation.x = -Math.PI / 2;
      pLot.position.set(74, 0.03, -23);
      pLot.receiveShadow = true;
      scene.add(pLot);

      ROOMS_DB["parking-lot"] = {
        id: "parking-lot",
        code: "PARK-P",
        name: "綜合大樓平面停車場",
        buildingId: "multi-building",
        buildingName: "綜合大樓設施",
        floor: 1,
        cat: "admin",
        node: "parking-lot"
      };
    }
    createMultiBuildingParking();

    // 4.8 Buildings Construction (中空可進入建築、大樓入口、走廊、樓梯與隔間空教室)
    BUILDINGS_CONFIG.forEach(cfg => {
      collisionBuildingId=cfg.id;
      const bldGroup = new THREE.Group();
      bldGroup.position.set(cfg.x, 0, cfg.z);
      bldGroup.userData.buildingId=cfg.id;
      const totalH = cfg.floors * FH;
      const isHoriz = cfg.width >= cfg.depth;
      const corridorWidth = 2.6;

      // Common architectural materials
      const extWallMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: .95 });
      const intWallMat = new THREE.MeshStandardMaterial({ color: 0xc9c6bc, roughness: .95 });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0xa8ada9, roughness: 1 });
      const corridorFloorMat = new THREE.MeshStandardMaterial({ color: 0xb6b9b1, roughness: 1 });
      const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xcecdc3, roughness: 1, side: THREE.DoubleSide });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x3b525b, transparent: true, opacity: 0.78 });
      const chalkboardMat = new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.85 });
      const whiteboardMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const woodTrimMat = new THREE.MeshStandardMaterial({ color: 0xa16207 });
      const canopyMat = new THREE.MeshStandardMaterial({ color: cfg.roofColor || 0x1e3a8a });

      for (let f = 1; f <= cfg.floors; f++) {
        const floorGroup = new THREE.Group();
        floorGroup.name = `floor-${f}`;
        const fBaseY = (f - 1) * FH;
        const fCenterY = (f - 0.5) * FH;
        const fTopY = f * FH;
        const floorRooms = cfg.rooms.filter(r => r.floor === f);

        // A. 地板與天花板 (Floor Slab & Ceiling Slab)
        const slabY = (f === 1) ? 0.08 : fBaseY + 0.1;
        const floorSlab = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width, 0.2, cfg.depth),
          floorMat
        );
        floorSlab.position.set(0, slabY, 0);
        floorSlab.receiveShadow = true;
        floorGroup.add(floorSlab);

        const ceilingSlab = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width, 0.2, cfg.depth),
          ceilingMat
        );
        ceilingSlab.position.set(0, fTopY - 0.1, 0);
        floorGroup.add(ceilingSlab);

        // B. 走廊與隔間教室配置 (Corridor & Empty Classrooms Architecture)
        if (isHoriz) {
          // 橫向大樓 (東西走向，走廊在北側或南側)
          const isNorthCorridor = (cfg.id === "grade8-front");
          const cZ = isNorthCorridor ? (-cfg.depth / 2 + corridorWidth / 2) : (cfg.depth / 2 - corridorWidth / 2);
          const cWallZ = isNorthCorridor ? (-cfg.depth / 2 + corridorWidth) : (cfg.depth / 2 - corridorWidth);
          const outerZ = isNorthCorridor ? -cfg.depth / 2 : cfg.depth / 2;
          const backZ = isNorthCorridor ? cfg.depth / 2 : -cfg.depth / 2;

          // 1. 走廊外側陽台護欄與柱列 (Corridor Veranda Railing & Columns)
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width, 1.1, 0.16),
            new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
          );
          rail.position.set(0, fBaseY + 0.55, outerZ);
          if (f === 1) {
            // 1F 的可通行門口必須與畫面護欄的開口一致。
            const length = (isHoriz ? cfg.width : cfg.depth) / 2 - 2;
            for (const sign of [-1, 1]) {
              const part = new THREE.Mesh(new THREE.BoxGeometry(isHoriz ? length : .16, 1.1, isHoriz ? .16 : length), rail.material);
              part.position.copy(rail.position);
              if (isHoriz) part.position.x = sign * (length / 2 + 2);
              else part.position.z = sign * (length / 2 + 2);
              floorGroup.add(part);
            }
          } else floorGroup.add(rail);

          // 柱列
          const colCount = Math.max(3, Math.round(cfg.width / 7));
          const colStep = cfg.width / colCount;
          for (let c = 0; c <= colCount; c++) {
            const colMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.45, FH, 0.45),
              new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            colMesh.position.set(-cfg.width / 2 + c * colStep, fCenterY, outerZ);
            colMesh.castShadow = true;
            if (f !== 1 || Math.abs(isHoriz ? colMesh.position.x : colMesh.position.z) >= 2) floorGroup.add(colMesh);
          }

          // 走廊外牆碰撞體 (1F 入口處保持開放無碰撞體，其餘護欄與樓層均阻擋穿透)
          if (f === 1) {
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x - 2.0, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);
            registerWallCollider(cfg.x + 2.0, cfg.x + cfg.width / 2, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);

            // 1F 大樓主入口門廊雨遮與金字校名門牌 (Entrance Canopy & Title Sign)
            const canopy = new THREE.Mesh(
              new THREE.BoxGeometry(5.2, 0.35, 3.2),
              canopyMat
            );
            canopy.position.set(0, fBaseY + 3.4, outerZ + (isNorthCorridor ? -1.6 : 1.6));
            canopy.castShadow = true;
            floorGroup.add(canopy);

            [-2.4, 2.4].forEach(px => {
              const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.4, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
              pCol.position.set(px, fBaseY + 1.7, outerZ + (isNorthCorridor ? -2.8 : 2.8));
              pCol.castShadow = true;
              floorGroup.add(pCol);
            });

            // 大樓入口招牌 (Building Title Plate)
            const titleMesh = new THREE.Mesh(
              new THREE.PlaneGeometry(4.0, 0.75),
              new THREE.MeshBasicMaterial({ map: createBuildingTitleTexture(cfg.name), side: THREE.DoubleSide })
            );
            titleMesh.position.set(0, fBaseY + 3.8, outerZ + (isNorthCorridor ? -1.65 : 1.65));
            if (isNorthCorridor) titleMesh.rotation.y = Math.PI;
            floorGroup.add(titleMesh);

            // 行政大樓專屬真實細節 (對應照片 05_行政教學大樓主入口門廊_禮義廉恥與無障礙坡道)
            if (cfg.id === "admin-front") {
              // 「禮義廉恥」黑字石匾
              const lianChiMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(3.6, 0.9),
                new THREE.MeshBasicMaterial({ map: createLiYiLianChiTexture(), side: THREE.DoubleSide })
              );
              lianChiMesh.position.set(0, fBaseY + 2.8, outerZ + 0.15);
              floorGroup.add(lianChiMesh);

              // 紅色 LED 滾動跑馬燈字幕機
              const ledMarquee = new THREE.Mesh(
                new THREE.PlaneGeometry(3.6, 0.38),
                new THREE.MeshBasicMaterial({ map: createLedMarqueeTexture("大溪國中行政大樓 ★ 勤學、勵志、熱情、感恩"), side: THREE.DoubleSide })
              );
              ledMarquee.position.set(0, fBaseY + 2.2, outerZ + 0.16);
              floorGroup.add(ledMarquee);

              // 右側不鏽鋼無障礙坡道雙層扶手 (Stainless Ramp Railing)
              const rampRail = new THREE.Mesh(
                new THREE.BoxGeometry(0.08, 0.9, 3.2),
                new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 })
              );
              rampRail.position.set(2.4, fBaseY + 0.45, outerZ + 1.6);
              floorGroup.add(rampRail);

              // 門廊古典石雕花缽 (Classical Stone Flower Urns flanking entrance)
              [-2.8, 2.8].forEach(ux => {
                const urn = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.25, 0.9, 12), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
                urn.position.set(ux, fBaseY + 0.45, outerZ + 1.2);
                const flower = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
                flower.position.set(ux, fBaseY + 1.0, outerZ + 1.2);
                floorGroup.add(urn);
                floorGroup.add(flower);
              });
            }
          } else {
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);
          }

          // 2. 背面外牆與窗戶 (Back Exterior Wall & Windows)
          const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width, FH, 0.3),
            extWallMat
          );
          backWall.position.set(0, fCenterY, backZ);
          floorGroup.add(backWall);

          const backWindow = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width - 1.2, 1.4, 0.35),
            glassMat
          );
          backWindow.position.set(0, fCenterY + 0.2, backZ);
          floorGroup.add(backWindow);
          registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + backZ - 0.25, cfg.z + backZ + 0.25, fBaseY, fTopY);

          // 3. 東西兩端外側側牆 (West & East End Exterior Walls)
          [-cfg.width / 2, cfg.width / 2].forEach(wx => {
            const endWall = new THREE.Mesh(
              new THREE.BoxGeometry(0.3, FH, cfg.depth),
              extWallMat
            );
            endWall.position.set(wx, fCenterY, 0);
            floorGroup.add(endWall);
            registerWallCollider(cfg.x + wx - 0.25, cfg.x + wx + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);
          });

          // 4. 隔間教室與內走廊隔間牆 (Partitions & Classrooms)
          const usableMinX = -cfg.width / 2 + 1.2;
          const usableMaxX = cfg.width / 2 - 1.2;
          const usableW = usableMaxX - usableMinX;

          if (floorRooms.length > 0) {
            const roomW = usableW / floorRooms.length;
            for (let i = 0; i < floorRooms.length; i++) {
              const rMinX = usableMinX + i * roomW;
              const rMaxX = usableMinX + (i + 1) * roomW;
              const rCenterX = (rMinX + rMaxX) / 2;
              const room = floorRooms[i];

              // 門兩側之內走廊隔間牆 (Wall segments beside classroom door)
              const seg1W = Math.max(0.2, (rCenterX - 0.9) - rMinX);
              const seg1Mesh = new THREE.Mesh(new THREE.BoxGeometry(seg1W, FH, 0.2), intWallMat);
              seg1Mesh.position.set(rMinX + seg1W / 2, fCenterY, cWallZ);
              floorGroup.add(seg1Mesh);
              registerWallCollider(cfg.x + rMinX, cfg.x + rCenterX - 0.9, cfg.z + cWallZ - 0.2, cfg.z + cWallZ + 0.2, fBaseY, fTopY);

              const seg2W = Math.max(0.2, rMaxX - (rCenterX + 0.9));
              const seg2Mesh = new THREE.Mesh(new THREE.BoxGeometry(seg2W, FH, 0.2), intWallMat);
              seg2Mesh.position.set(rMaxX - seg2W / 2, fCenterY, cWallZ);
              floorGroup.add(seg2Mesh);
              registerWallCollider(cfg.x + rCenterX + 0.9, cfg.x + rMaxX, cfg.z + cWallZ - 0.2, cfg.z + cWallZ + 0.2, fBaseY, fTopY);

              // 門眉過樑 (Door Lintel above 2.4m door)
              const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.8, FH - 2.4, 0.2), intWallMat);
              lintel.position.set(rCenterX, fBaseY + 2.4 + (FH - 2.4) / 2, cWallZ);
              floorGroup.add(lintel);

              // 門牌 (3D Room Nameplate)
              const nameplate = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 0.38),
                new THREE.MeshBasicMaterial({ map: createRoomNameplateTexture(room.name, (room.cat === "admin" ? "#991b1b" : "#1e3a8a")), side: THREE.DoubleSide })
              );
              nameplate.position.set(rCenterX, fBaseY + 2.65, cWallZ + (isNorthCorridor ? -0.12 : 0.12));
              if (isNorthCorridor) nameplate.rotation.y = Math.PI;
              floorGroup.add(nameplate);

              // 隔間牆 (Divider Wall between adjacent rooms)
              if (i > 0) {
                const divDepth = Math.abs(backZ - cWallZ);
                const divMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, divDepth), intWallMat);
                divMesh.position.set(rMinX, fCenterY, (backZ + cWallZ) / 2);
                floorGroup.add(divMesh);
                registerWallCollider(cfg.x + rMinX - 0.2, cfg.x + rMinX + 0.2, cfg.z + Math.min(backZ, cWallZ), cfg.z + Math.max(backZ, cWallZ), fBaseY, fTopY);
              }

              // 空教室內部細節：照片實況「下層粉天藍色護壁板、上層白牆」雙色粉刷
              const wainscotMesh = new THREE.Mesh(
                new THREE.BoxGeometry(roomW - 0.2, 1.3, 0.04),
                new THREE.MeshStandardMaterial({ color: 0x7dd3fc }) // 教室專屬天藍色踢腳護壁
              );
              wainscotMesh.position.set(rCenterX, fBaseY + 0.65, isNorthCorridor ? (cWallZ + 0.78) : (cWallZ - 0.78));
              floorGroup.add(wainscotMesh);

              // 空教室內部細節：滑動大黑板 / 白板 (Chalkboard with Chalk Tray)
              const boardW = Math.min(3.4, roomW - 1.2);
              const isOffice = (room.cat === "admin");
              const boardMesh = new THREE.Mesh(
                new THREE.BoxGeometry(boardW, 1.4, 0.06),
                isOffice ? whiteboardMat : chalkboardMat
              );
              boardMesh.position.set(rCenterX, fBaseY + 1.8, isNorthCorridor ? (cWallZ + 0.8) : (cWallZ - 0.8));
              floorGroup.add(boardMesh);

              const trim = new THREE.Mesh(new THREE.BoxGeometry(boardW + 0.1, 1.5, 0.04), woodTrimMat);
              trim.position.copy(boardMesh.position);
              trim.position.z += isNorthCorridor ? -0.02 : 0.02;
              floorGroup.add(trim);

              // 講桌 (Teacher's Wooden Podium Desk)
              const podium = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.7), woodTrimMat);
              podium.position.set(rCenterX, fBaseY + 0.45, isNorthCorridor ? (cWallZ + 1.8) : (cWallZ - 1.8));
              floorGroup.add(podium);

              // 天花板柔和照明燈盤 (Ceiling Light Panel)
              const lightPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(2.0, 1.0),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
              );
              lightPanel.rotation.x = Math.PI / 2;
              lightPanel.position.set(rCenterX, fTopY - 0.12, (backZ + cWallZ) / 2);
              floorGroup.add(lightPanel);
            }
          }
        } else {
          // 直立縱向大樓 (南北走向，如九年級棟、八年級中棟、藝術館、活動中心)
          const isEastCorridor = (cfg.id === "grade9-back");
          const cX = isEastCorridor ? (cfg.width / 2 - corridorWidth / 2) : (-cfg.width / 2 + corridorWidth / 2);
          const cWallX = isEastCorridor ? (cfg.width / 2 - corridorWidth) : (-cfg.width / 2 + corridorWidth);
          const outerX = isEastCorridor ? cfg.width / 2 : -cfg.width / 2;
          const backX = isEastCorridor ? -cfg.width / 2 : cfg.width / 2;

          // 走廊護欄與柱列
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.16, 1.1, cfg.depth),
            new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
          );
          rail.position.set(outerX, fBaseY + 0.55, 0);
          if (f === 1) {
            // 1F 的可通行門口必須與畫面護欄的開口一致。
            const length = (isHoriz ? cfg.width : cfg.depth) / 2 - 2;
            for (const sign of [-1, 1]) {
              const part = new THREE.Mesh(new THREE.BoxGeometry(isHoriz ? length : .16, 1.1, isHoriz ? .16 : length), rail.material);
              part.position.copy(rail.position);
              if (isHoriz) part.position.x = sign * (length / 2 + 2);
              else part.position.z = sign * (length / 2 + 2);
              floorGroup.add(part);
            }
          } else floorGroup.add(rail);

          const colCount = Math.max(3, Math.round(cfg.depth / 7));
          const colStep = cfg.depth / colCount;
          for (let c = 0; c <= colCount; c++) {
            const colMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.45, FH, 0.45),
              new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            colMesh.position.set(outerX, fCenterY, -cfg.depth / 2 + c * colStep);
            colMesh.castShadow = true;
            if (f !== 1 || Math.abs(isHoriz ? colMesh.position.x : colMesh.position.z) >= 2) floorGroup.add(colMesh);
          }

          // 外側碰撞體 (1F 入口處保持開放)
          if (f === 1) {
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z - cfg.depth / 2, cfg.z - 2.0, fBaseY, fTopY);
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z + 2.0, cfg.z + cfg.depth / 2, fBaseY, fTopY);

            // 大樓入口雨遮與標誌
            const canopy = new THREE.Mesh(
              new THREE.BoxGeometry(3.2, 0.35, 5.2),
              canopyMat
            );
            canopy.position.set(outerX + (isEastCorridor ? 1.6 : -1.6), fBaseY + 3.4, 0);
            canopy.castShadow = true;
            floorGroup.add(canopy);

            const titleMesh = new THREE.Mesh(
              new THREE.PlaneGeometry(4.0, 0.75),
              new THREE.MeshBasicMaterial({ map: createBuildingTitleTexture(cfg.name), side: THREE.DoubleSide })
            );
            titleMesh.position.set(outerX + (isEastCorridor ? 1.65 : -1.65), fBaseY + 3.8, 0);
            titleMesh.rotation.y = isEastCorridor ? Math.PI / 2 : -Math.PI / 2;
            floorGroup.add(titleMesh);
          } else {
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);
          }

          // 背面外牆與南北兩端外牆
          const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, FH, cfg.depth), extWallMat);
          backWall.position.set(backX, fCenterY, 0);
          floorGroup.add(backWall);
          registerWallCollider(cfg.x + backX - 0.25, cfg.x + backX + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);

          [-cfg.depth / 2, cfg.depth / 2].forEach(ez => {
            const endWall = new THREE.Mesh(new THREE.BoxGeometry(cfg.width, FH, 0.3), extWallMat);
            endWall.position.set(0, fCenterY, ez);
            floorGroup.add(endWall);
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + ez - 0.25, cfg.z + ez + 0.25, fBaseY, fTopY);
          });

          // 隔間教室 (縱向分割)
          const usableMinZ = -cfg.depth / 2 + 1.2;
          const usableMaxZ = cfg.depth / 2 - 1.2;
          const usableD = usableMaxZ - usableMinZ;

          if (floorRooms.length > 0) {
            const roomD = usableD / floorRooms.length;
            for (let i = 0; i < floorRooms.length; i++) {
              const rMinZ = usableMinZ + i * roomD;
              const rMaxZ = usableMinZ + (i + 1) * roomD;
              const rCenterZ = (rMinZ + rMaxZ) / 2;
              const room = floorRooms[i];

              // 門兩側隔間牆
              const seg1D = Math.max(0.2, (rCenterZ - 0.9) - rMinZ);
              const seg1Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, seg1D), intWallMat);
              seg1Mesh.position.set(cWallX, fCenterY, rMinZ + seg1D / 2);
              floorGroup.add(seg1Mesh);
              registerWallCollider(cfg.x + cWallX - 0.2, cfg.x + cWallX + 0.2, cfg.z + rMinZ, cfg.z + rCenterZ - 0.9, fBaseY, fTopY);

              const seg2D = Math.max(0.2, rMaxZ - (rCenterZ + 0.9));
              const seg2Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, seg2D), intWallMat);
              seg2Mesh.position.set(cWallX, fCenterY, rMaxZ - seg2D / 2);
              floorGroup.add(seg2Mesh);
              registerWallCollider(cfg.x + cWallX - 0.2, cfg.x + cWallX + 0.2, cfg.z + rCenterZ + 0.9, cfg.z + rMaxZ, fBaseY, fTopY);

              // 門眉過樑
              const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH - 2.4, 1.8), intWallMat);
              lintel.position.set(cWallX, fBaseY + 2.4 + (FH - 2.4) / 2, rCenterZ);
              floorGroup.add(lintel);

              // 門牌
              const nameplate = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 0.38),
                new THREE.MeshBasicMaterial({ map: createRoomNameplateTexture(room.name, (room.cat === "admin" ? "#991b1b" : "#1e3a8a")), side: THREE.DoubleSide })
              );
              nameplate.position.set(cWallX + (isEastCorridor ? 0.12 : -0.12), fBaseY + 2.65, rCenterZ);
              nameplate.rotation.y = isEastCorridor ? -Math.PI / 2 : Math.PI / 2;
              floorGroup.add(nameplate);

              // 橫向隔間牆
              if (i > 0) {
                const divW = Math.abs(backX - cWallX);
                const divMesh = new THREE.Mesh(new THREE.BoxGeometry(divW, FH, 0.2), intWallMat);
                divMesh.position.set((backX + cWallX) / 2, fCenterY, rMinZ);
                floorGroup.add(divMesh);
                registerWallCollider(cfg.x + Math.min(backX, cWallX), cfg.x + Math.max(backX, cWallX), cfg.z + rMinZ - 0.2, cfg.z + rMinZ + 0.2, fBaseY, fTopY);
              }

              // 空教室黑板
              const boardD = Math.min(3.4, roomD - 1.2);
              const boardMesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.06, 1.4, boardD),
                chalkboardMat
              );
              boardMesh.position.set(isEastCorridor ? (cWallX - 0.8) : (cWallX + 0.8), fBaseY + 1.8, rCenterZ);
              floorGroup.add(boardMesh);

              // 天花板照明
              const lightPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(1.0, 2.0),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
              );
              lightPanel.rotation.x = Math.PI / 2;
              lightPanel.position.set((backX + cWallX) / 2, fTopY - 0.12, rCenterZ);
              floorGroup.add(lightPanel);
            }
          }
        }

        floorGroup.userData = { buildingId: cfg.id, floorNum: f };
        bldGroup.add(floorGroup);
        floorMeshes.push(floorGroup);
      }

      // 4.9 樓梯間 (Staircases connected to corridors)
      if (cfg.stairs) {
        cfg.stairs.forEach(st => {
          const stMesh = create3DStaircaseMesh(st.x - cfg.x, st.z - cfg.z, st.floors, cfg.x, cfg.z);
          stMesh.userData.oldStairs=true;
          bldGroup.add(stMesh);
        });
      }

      // 4.10 體育館特徵 (依據照片 LINE_ALBUM_3D_261007_58 真實重現：粉橘磁磚＋三層白色弧形格窗塔樓＋太陽能板光電陣列＋中英文大字立體招牌)
      if (cfg.isGymSpecial) {
        // 雙圓柱樓梯塔樓 (Twin Cylindrical Stair Towers)
        [-14, 14].forEach(offsetZ => {
          const tower = new THREE.Mesh(
            new THREE.CylinderGeometry(4.6, 4.6, totalH + 1.8, 32, 1, true, Math.asin(1/4.6), Math.PI-2*Math.asin(1/4.6)),
            new THREE.MeshStandardMaterial({ color: 0xe89286 }) // 照片真實現況：粉橘紅細磁磚
          );
          tower.position.set(cfg.width / 2 - 1, (totalH + 1.8) / 2, offsetZ);
          tower.castShadow = true;
          bldGroup.add(tower);
          // Keep the original exterior bulge, but no opaque back shell or caps
          // may occupy the real interior stair/landing volume.
          const capShape=new THREE.Shape(),capAngle=Math.acos(1/4.6);
          capShape.absarc(0,0,4.6,-capAngle,capAngle,false);capShape.closePath();
          const cap=new THREE.Mesh(new THREE.ShapeGeometry(capShape),tower.material);cap.rotation.x=-Math.PI/2;cap.position.set(cfg.width/2-1,totalH+1.8,offsetZ);cap.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};bldGroup.add(cap);floorMeshes.push(cap);


          // 圓柱塔身 3 層樓環狀多格白色玻璃窗 (Multi-Pane Curved Panoramic Windows)
          for (let floorIdx = 1; floorIdx <= 3; floorIdx++) {
            const winBand = new THREE.Mesh(
              new THREE.CylinderGeometry(4.65, 4.65, 1.6, 32, 1, true, Math.asin(1/4.65), Math.PI-2*Math.asin(1/4.65)),
              new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
            );
            winBand.position.set(cfg.width / 2 - 1, (floorIdx - 0.5) * FH, offsetZ);
            bldGroup.add(winBand);
          }

          // 塔樓底座半圓形不鏽鋼防護欄杆
          const baseRail = new THREE.Mesh(
            new THREE.CylinderGeometry(4.9, 4.9, 1.1, 24, 1, true, Math.asin(1/4.9), Math.PI-2*Math.asin(1/4.9)),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1, side: THREE.DoubleSide })
          );
          baseRail.position.set(cfg.width / 2 - 1, 0.55, offsetZ);
          bldGroup.add(baseRail);
        });

        // 正門上方中英文立體招牌：「學生活動中心 / Student Activity Center」
        const gymSign = new THREE.Mesh(
          new THREE.PlaneGeometry(16, 4.0),
          new THREE.MeshBasicMaterial({ map: createGymSignTexture(), transparent: true, side: THREE.DoubleSide })
        );
        gymSign.position.set(cfg.width / 2 + 0.15, totalH - 1.2, 0);
        gymSign.rotation.y = Math.PI / 2;
        bldGroup.add(gymSign);

        // 1F 大門白色多格落地玻璃門 (White Multi-Pane Entrance Glass Doors)
        const doorMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(14, 3.2),
          new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, side: THREE.DoubleSide })
        );
        doorMesh.position.set(cfg.width / 2 + 0.1, 1.6, 0);
        doorMesh.rotation.y = Math.PI / 2;
        bldGroup.add(doorMesh);

        // 屋頂太陽能光電板陣列 (Rooftop Photovoltaic Solar Panel Arrays - 綠能校園特色)
        const solarGroup = new THREE.Group();
        solarGroup.position.set(0, totalH + 0.8, 0);
        const solarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 });

        for (let row = -10; row <= 10; row += 6) {
          const solarRow = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width - 6, 0.15, 3.8),
            solarMat
          );
          solarRow.position.set(0, 0, row);
          solarRow.rotation.x = -0.32; // 傾斜朝南吸收日照
          solarRow.castShadow = true;
          solarGroup.add(solarRow);
        }
        solarGroup.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(solarGroup);
        bldGroup.add(solarGroup);
      }

      // 八年級南橫棟西側半圓弧樓梯塔 (平面圖特徵)
      if (cfg.id === "grade8-front") {
        const roundTower = new THREE.Mesh(
          new THREE.CylinderGeometry(5.2, 5.2, totalH, 24, 1, false, Math.PI, Math.PI),
          new THREE.MeshStandardMaterial({ color: cfg.color })
        );
        roundTower.position.set(-cfg.width / 2, totalH / 2, 0);
        roundTower.castShadow = true;
        bldGroup.add(roundTower);
      }

      // 屋頂 (Pitched Roof or Flat Roof)
      if (cfg.hasPitchedRoof) {
        const roofShape = new THREE.Shape();
        roofShape.moveTo(-cfg.depth / 2 - 0.8, 0);
        roofShape.lineTo(0, 3.6);
        roofShape.lineTo(cfg.depth / 2 + 0.8, 0);
        roofShape.closePath();
        const pRoof = new THREE.Mesh(
          new THREE.ExtrudeGeometry(roofShape, { depth: cfg.width + 1.6, bevelEnabled: false }),
          new THREE.MeshStandardMaterial({ color: cfg.roofColor, roughness: 1 })
        );
        pRoof.position.set(-cfg.width / 2 - 0.8, totalH + 0.1, 0);
        pRoof.rotation.y = Math.PI / 2;

        // 縱向棟屋脊沿長邊，水平棟 extrusion 起點由西側開始。
        if(!isHoriz){
          const section=new THREE.Shape();
          section.moveTo(-cfg.width/2-.8,0);section.lineTo(0,2.4);section.lineTo(cfg.width/2+.8,0);section.closePath();
          pRoof.geometry.dispose();
          pRoof.geometry=new THREE.ExtrudeGeometry(section,{depth:cfg.depth+1.6,bevelEnabled:false});
          pRoof.rotation.y=0;pRoof.position.set(0,totalH+.1,-cfg.depth/2-.8);
        }
        pRoof.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(pRoof);
        pRoof.castShadow = true;
        bldGroup.add(pRoof);
      } else {
        const roofMesh = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width + 0.8, 0.8, cfg.depth + 0.8),
          new THREE.MeshStandardMaterial({ color: cfg.roofColor, roughness: 1 })
        );
        roofMesh.position.y = totalH + 0.4;
        roofMesh.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(roofMesh);
        roofMesh.castShadow = true;
        bldGroup.add(roofMesh);
      }

      scene.add(bldGroup);
      collisionBuildingId=null;

      cfg.rooms.forEach(r => {
        const roomObj = {
          id: r.id,
          code: r.code || r.id,
          name: r.name,
          buildingId: cfg.id,
          buildingName: cfg.name,
          floor: r.floor,
          cat: r.cat || cfg.category || "academic",
          node: r.node
        };
        ROOMS_DB[r.id] = roomObj;

        const badgeDiv = document.createElement("div");
        badgeDiv.className = "room-badge";
        const catColor = CATEGORY_COLORS[roomObj.cat] || "#2563eb";
        badgeDiv.innerHTML = `
          <span class="rb-tag" style="background:${catColor};">${r.floor}F</span>
          <span>${r.name.replace(/\s*\(\d+F\)/, '')}</span>
        `;
        badgeDiv.onclick = (e) => {
          e.stopPropagation();
          navigateToRoom(r.id);
        };
        labelsContainer.appendChild(badgeDiv);

        roomBadgeElements.push({
          element: badgeDiv,
          buildingId: cfg.id,
          floor: r.floor,
          nodeId: r.node
        });
      });

      const labelDiv = document.createElement("div");
      labelDiv.className = "building-label";
      labelDiv.textContent = cfg.name;
      labelDiv.onclick = () => focusBuilding(cfg);
      labelsContainer.appendChild(labelDiv);

      labelElements.push({
        element: labelDiv,
        buildingId: cfg.id,
        worldPos: new THREE.Vector3(cfg.x, totalH + 3.6, cfg.z)
      });
    });

    // 4.3 Ground Landmark Pills (操場, 司令台, 排球場, 籃球場, 蘭亭, 校大門, 警衛室, 停車場等)
    const LANDMARKS = [
      { name: "操場及綜合球場", x: -84, y: 1.8, z: -25 },
      { name: "司令台", x: -62, y: 3.5, z: 12 },
      { name: "蔣公銅像", x: -36, y: 2.5, z: 32 },
      { name: "戶外排球場", x: -22, y: 1.8, z: -38 },
      { name: "籃球場群", x: 12, y: 1.8, z: -38 },
      { name: "蘭亭訓平池", x: -18, y: 2.2, z: -66 },
      { name: "校大門", x: -10, y: 3.5, z: 86 },
      { name: "警衛室", x: 6, y: 3.2, z: 86 },
      { name: "學生活動中心", x: -80, y: 6.0, z: 58 },
      { name: "行政大樓", x: -12, y: 6.0, z: 32 },
      { name: "八年級棟 (南棟)", x: 16, y: 6.0, z: 60 },
      { name: "九年級棟 (縱向)", x: 7.5, y: 6.0, z: 28 },
      { name: "八年級中棟 (縱向)", x: 28, y: 6.0, z: 28 },
      { name: "健康中心棟", x: 12, y: 4.5, z: -4 },
      { name: "七年級新大樓", x: 80, y: 6.0, z: -58 },
      { name: "綜合大樓/圖書館", x: 74, y: 4.5, z: -23 },
      { name: "科技館", x: 74, y: 4.5, z: 12 },
      { name: "藝術館", x: 74, y: 8.0, z: 46 }
    ];
    const landmarkElements = [];

    LANDMARKS.filter(lm=>!['學生活動中心','行政大樓','八年級棟 (南棟)','九年級棟 (縱向)','八年級中棟 (縱向)','健康中心棟','七年級新大樓','綜合大樓/圖書館','科技館','藝術館'].includes(lm.name)).forEach(lm => {
      const pill = document.createElement("div");
      pill.className = "landmark-pill";
      pill.textContent = lm.name;
      pill.title = `點擊聚焦：${lm.name}`;
      pill.onclick = () => {
        const targetPos = new THREE.Vector3(lm.x, lm.y, lm.z);
        const camPos = targetPos.clone().add(new THREE.Vector3(15, 25, 30));
        animateCameraTo(camPos, targetPos);
        showToast(`聚焦地標：${lm.name}`);
      };
      labelsContainer.appendChild(pill);
      landmarkElements.push({
        element: pill,
        worldPos: new THREE.Vector3(lm.x, lm.y, lm.z)
      });
    });

    /* ==========================================================================
       5. A* NAVIGATION GRAPH & WAYPOINTS
       ========================================================================== */
    const NAV_NODES = {
  // 1. 正門、迎賓廣場、銅像
  "gate": { id: "gate", x: -10, y: 0, z: 86, neighbors: ["gate-guard", "plaza-center", "driveway-s1"] },
  "gate-guard": { id: "gate-guard", x: 6, y: 0, z: 86, neighbors: ["gate", "plaza-center", "driveway-s1"] },
  "plaza-center": { id: "plaza-center", x: -10, y: 0, z: 72, neighbors: ["gate", "gate-guard", "statue-node", "admin-f-porch", "g8f-porch"] },
  "statue-node": { id: "statue-node", x: -36, y: 0, z: 32, neighbors: ["plaza-center", "gym-path-1", "admin-f-porch", "stand-front"] },

  // 2. 西側：學生活動中心 & 資源回收室
  "gym-path-1": { id: "gym-path-1", x: -60, y: 0, z: 58, neighbors: ["statue-node", "gym-1f-hall", "gym-fire-1f", "gym-stair-s-1f", "recycle-path"] },
  "gym-1f-hall": { id: "gym-1f-hall", x: -80, y: 0, z: 58, neighbors: ["gym-path-1"] },
  "gym-fire-1f": { id: "gym-fire-1f", x: -66, y: 0, z: 72, neighbors: ["gym-path-1"] },
  "gym-stair-s-1f": { id: "gym-stair-s-1f", x: -65, y: 0, z: 46, neighbors: ["gym-path-1", "gym-stair-s-mid1"] },
  "gym-stair-s-mid1": { id: "gym-stair-s-mid1", x: -65, y: 1.8, z: 46, neighbors: ["gym-stair-s-1f", "gym-stair-s-2f"] },
  "gym-stair-s-2f": { id: "gym-stair-s-2f", x: -65, y: 3.6, z: 46, neighbors: ["gym-stair-s-mid1", "gym-stair-s-mid2"] },
  "gym-stair-s-mid2": { id: "gym-stair-s-mid2", x: -65, y: 5.4, z: 46, neighbors: ["gym-stair-s-2f", "gym-stair-s-3f"] },
  "gym-stair-s-3f": { id: "gym-stair-s-3f", x: -65, y: 7.2, z: 46, neighbors: ["gym-stair-s-mid2"] },

  "recycle-path": { id: "recycle-path", x: -95, y: 0, z: 58, neighbors: ["gym-path-1", "recycle-1f"] },
  "recycle-1f": { id: "recycle-1f", x: -106, y: 0, z: 58, neighbors: ["recycle-path"] },

  // 3. 操場、司令台、排球場、蘭亭訓平池
  "stand-front": { id: "stand-front", x: -62, y: 0, z: 18, neighbors: ["statue-node", "stand-podium", "track-center", "vb-outer"] },
  "stand-podium": { id: "stand-podium", x: -62, y: 1.8, z: 12, neighbors: ["stand-front"] },
  "track-center": { id: "track-center", x: -84, y: 0, z: -25, neighbors: ["stand-front", "vb-inner"] },
  "vb-inner": { id: "vb-inner", x: -65, y: 0, z: -25, neighbors: ["track-center", "vb-outer"] },
  "vb-outer": { id: "vb-outer", x: -22, y: 0, z: -38, neighbors: ["stand-front", "vb-inner", "bb-gate", "lan-pond-gate"] },
  "bb-gate": { id: "bb-gate", x: 12, y: 0, z: -38, neighbors: ["vb-outer", "lan-pond-gate", "driveway-n1", "health-porch"] },
  "lan-pond-gate": { id: "lan-pond-gate", x: -18, y: 0, z: -66, neighbors: ["vb-outer", "bb-gate"] },

  // 4. 行政大樓與後方處室區（舊節點 ID 保留相容）
  "admin-f-porch": { id: "admin-f-porch", x: -12, y: 0, z: 50, neighbors: ["plaza-center", "statue-node", "admin-f-1f-w", "admin-f-1f-e", "admin-f-stair-1f", "admin-bridge"] },
  "admin-f-1f-w": { id: "admin-f-1f-w", x: -18, y: 0, z: 44, neighbors: ["admin-f-porch"] },
  "admin-f-1f-e": { id: "admin-f-1f-e", x: -6, y: 0, z: 44, neighbors: ["admin-f-porch"] },
  "admin-f-stair-1f": { id: "admin-f-stair-1f", x: -22, y: 0, z: 44, neighbors: ["admin-f-porch", "admin-f-stair-mid1"] },
  "admin-f-stair-mid1": { id: "admin-f-stair-mid1", x: -22, y: 1.8, z: 44, neighbors: ["admin-f-stair-1f", "admin-f-stair-2f"] },
  "admin-f-stair-2f": { id: "admin-f-stair-2f", x: -22, y: 3.6, z: 44, neighbors: ["admin-f-stair-mid1", "admin-f-2f-w", "admin-f-stair-mid2"] },
  "admin-f-2f-w": { id: "admin-f-2f-w", x: -18, y: 3.6, z: 44, neighbors: ["admin-f-stair-2f", "admin-f-2f-c"] },
  "admin-f-2f-c": { id: "admin-f-2f-c", x: -12, y: 3.6, z: 44, neighbors: ["admin-f-2f-w", "admin-f-2f-e"] },
  "admin-f-2f-e": { id: "admin-f-2f-e", x: -6, y: 3.6, z: 44, neighbors: ["admin-f-2f-c"] },
  "admin-f-stair-mid2": { id: "admin-f-stair-mid2", x: -22, y: 5.4, z: 44, neighbors: ["admin-f-stair-2f", "admin-f-stair-3f"] },
  "admin-f-stair-3f": { id: "admin-f-stair-3f", x: -22, y: 7.2, z: 44, neighbors: ["admin-f-stair-mid2", "admin-f-3f-w"] },
  "admin-f-3f-w": { id: "admin-f-3f-w", x: -18, y: 7.2, z: 44, neighbors: ["admin-f-stair-3f", "admin-f-3f-e"] },
  "admin-f-3f-e": { id: "admin-f-3f-e", x: -6, y: 7.2, z: 44, neighbors: ["admin-f-3f-w"] },

  "admin-bridge": { id: "admin-bridge", x: -12, y: 0, z: 32, neighbors: ["admin-f-porch", "admin-b-porch", "breezeway-west"] },

  "admin-b-porch": { id: "admin-b-porch", x: -12, y: 0, z: 14, neighbors: ["admin-bridge", "admin-b-1f-w", "admin-b-1f-c", "admin-b-1f-e", "admin-b-stair-1f"] },
  "admin-b-1f-w": { id: "admin-b-1f-w", x: -18, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-1f-c": { id: "admin-b-1f-c", x: -12, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-1f-e": { id: "admin-b-1f-e", x: -6, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-stair-1f": { id: "admin-b-stair-1f", x: -22, y: 0, z: 20, neighbors: ["admin-b-porch", "admin-b-stair-mid1"] },
  "admin-b-stair-mid1": { id: "admin-b-stair-mid1", x: -22, y: 1.8, z: 20, neighbors: ["admin-b-stair-1f", "admin-b-stair-2f"] },
  "admin-b-stair-2f": { id: "admin-b-stair-2f", x: -22, y: 3.6, z: 20, neighbors: ["admin-b-stair-mid1", "admin-b-2f-w", "admin-b-stair-mid2"] },
  "admin-b-2f-w": { id: "admin-b-2f-w", x: -14, y: 3.6, z: 20, neighbors: ["admin-b-stair-2f", "admin-b-2f-e"] },
  "admin-b-2f-e": { id: "admin-b-2f-e", x: -6, y: 3.6, z: 20, neighbors: ["admin-b-2f-w"] },
  "admin-b-stair-mid2": { id: "admin-b-stair-mid2", x: -22, y: 5.4, z: 20, neighbors: ["admin-b-stair-2f", "admin-b-stair-3f"] },
  "admin-b-stair-3f": { id: "admin-b-stair-3f", x: -22, y: 7.2, z: 20, neighbors: ["admin-b-stair-mid2", "admin-b-3f-w"] },
  "admin-b-3f-w": { id: "admin-b-3f-w", x: -16, y: 7.2, z: 20, neighbors: ["admin-b-stair-3f", "admin-b-3f-e"] },
  "admin-b-3f-e": { id: "admin-b-3f-e", x: -6, y: 7.2, z: 20, neighbors: ["admin-b-3f-w"] },

  // 5. 通廊 (Breezeways) 與中央庭園
  "breezeway-west": { id: "breezeway-west", x: -5, y: 0, z: 32, neighbors: ["admin-bridge", "g9-porch-s", "g9-porch-n"] },
  "breezeway-mid": { id: "breezeway-mid", x: 15, y: 0, z: 28, neighbors: ["g9-porch-s", "g8m-porch-s", "g9-porch-n", "g8m-porch-n"] },
  "breezeway-north": { id: "breezeway-north", x: 15, y: 0, z: 6, neighbors: ["health-porch", "g9-porch-n", "g8m-porch-n", "bb-gate"] },

  // 6. 健康中心棟 (北橫棟)
  "health-porch": { id: "health-porch", x: 12, y: 0, z: 2, neighbors: ["breezeway-north", "bb-gate", "health-1f-w", "health-1f-e", "health-stair-1f"] },
  "health-1f-w": { id: "health-1f-w", x: 6, y: 0, z: -4, neighbors: ["health-porch"] },
  "health-1f-e": { id: "health-1f-e", x: 18, y: 0, z: -4, neighbors: ["health-porch"] },
  "health-stair-1f": { id: "health-stair-1f", x: 0, y: 0, z: -4, neighbors: ["health-porch", "health-stair-mid"] },
  "health-stair-mid": { id: "health-stair-mid", x: 0, y: 1.8, z: -4, neighbors: ["health-stair-1f", "health-2f-w"] },
  "health-2f-w": { id: "health-2f-w", x: 6, y: 3.6, z: -4, neighbors: ["health-stair-mid", "health-2f-e"] },
  "health-2f-e": { id: "health-2f-e", x: 18, y: 3.6, z: -4, neighbors: ["health-2f-w"] },

  // 7. 八年級南棟 (南橫棟 / 幼兒園)
  "g8f-porch": { id: "g8f-porch", x: 16, y: 0, z: 53, neighbors: ["plaza-center", "g9-porch-s", "g8m-porch-s", "g8f-1f-k", "g8f-stair-w-1f"] },
  "g8f-1f-k": { id: "g8f-1f-k", x: 16, y: 0, z: 60, neighbors: ["g8f-porch"] },
  "g8f-stair-w-1f": { id: "g8f-stair-w-1f", x: -6, y: 0, z: 60, neighbors: ["g8f-porch", "g8f-stair-w-mid1"] },
  "g8f-stair-w-mid1": { id: "g8f-stair-w-mid1", x: -6, y: 1.8, z: 60, neighbors: ["g8f-stair-w-1f", "g8f-stair-w-2f"] },
  "g8f-stair-w-2f": { id: "g8f-stair-w-2f", x: -6, y: 3.6, z: 60, neighbors: ["g8f-stair-w-mid1", "g8f-2f-807", "g8f-stair-w-mid2"] },
  "g8f-2f-807": { id: "g8f-2f-807", x: 6, y: 3.6, z: 60, neighbors: ["g8f-stair-w-2f", "g8f-2f-801"] },
  "g8f-2f-801": { id: "g8f-2f-801", x: 14, y: 3.6, z: 60, neighbors: ["g8f-2f-807", "g8f-2f-802"] },
  "g8f-2f-802": { id: "g8f-2f-802", x: 22, y: 3.6, z: 60, neighbors: ["g8f-2f-801", "g8f-2f-803"] },
  "g8f-2f-803": { id: "g8f-2f-803", x: 30, y: 3.6, z: 60, neighbors: ["g8f-2f-802"] },
  "g8f-stair-w-mid2": { id: "g8f-stair-w-mid2", x: -6, y: 5.4, z: 60, neighbors: ["g8f-stair-w-2f", "g8f-stair-w-3f"] },
  "g8f-stair-w-3f": { id: "g8f-stair-w-3f", x: -6, y: 7.2, z: 60, neighbors: ["g8f-stair-w-mid2", "g8f-3f-wood"] },
  "g8f-3f-wood": { id: "g8f-3f-wood", x: 6, y: 7.2, z: 60, neighbors: ["g8f-stair-w-3f", "g8f-3f-806"] },
  "g8f-3f-806": { id: "g8f-3f-806", x: 14, y: 7.2, z: 60, neighbors: ["g8f-3f-wood", "g8f-3f-808"] },
  "g8f-3f-808": { id: "g8f-3f-808", x: 22, y: 7.2, z: 60, neighbors: ["g8f-3f-806", "g8f-3f-bg"] },
  "g8f-3f-bg": { id: "g8f-3f-bg", x: 30, y: 7.2, z: 60, neighbors: ["g8f-3f-808"] },

  // 8. 九年級教學棟 (中西縱向棟，直立南北向)
  "g9-porch-s": { id: "g9-porch-s", x: 2, y: 0, z: 50, neighbors: ["g8f-porch", "breezeway-west", "breezeway-mid", "g9-1f-908", "g9-stair-s-1f"] },
  "g9-porch-n": { id: "g9-porch-n", x: 2, y: 0, z: 8, neighbors: ["breezeway-west", "breezeway-mid", "breezeway-north", "g9-1f-906"] },
  "g9-1f-908": { id: "g9-1f-908", x: 2, y: 0, z: 42, neighbors: ["g9-porch-s", "g9-1f-907"] },
  "g9-1f-907": { id: "g9-1f-907", x: 2, y: 0, z: 28, neighbors: ["g9-1f-908", "g9-1f-906"] },
  "g9-1f-906": { id: "g9-1f-906", x: 2, y: 0, z: 14, neighbors: ["g9-1f-907", "g9-porch-n"] },

  "g9-stair-s-1f": { id: "g9-stair-s-1f", x: 2, y: 0, z: 46, neighbors: ["g9-porch-s", "g9-stair-s-mid1"] },
  "g9-stair-s-mid1": { id: "g9-stair-s-mid1", x: 2, y: 1.8, z: 46, neighbors: ["g9-stair-s-1f", "g9-stair-s-2f"] },
  "g9-stair-s-2f": { id: "g9-stair-s-2f", x: 2, y: 3.6, z: 46, neighbors: ["g9-stair-s-mid1", "g9-2f-905", "g9-stair-s-mid2"] },
  "g9-2f-905": { id: "g9-2f-905", x: 2, y: 3.6, z: 42, neighbors: ["g9-stair-s-2f", "g9-2f-904"] },
  "g9-2f-904": { id: "g9-2f-904", x: 2, y: 3.6, z: 28, neighbors: ["g9-2f-905", "g9-2f-clubs"] },
  "g9-2f-clubs": { id: "g9-2f-clubs", x: 2, y: 3.6, z: 14, neighbors: ["g9-2f-904"] },

  "g9-stair-s-mid2": { id: "g9-stair-s-mid2", x: 2, y: 5.4, z: 46, neighbors: ["g9-stair-s-2f", "g9-stair-s-3f"] },
  "g9-stair-s-3f": { id: "g9-stair-s-3f", x: 2, y: 7.2, z: 46, neighbors: ["g9-stair-s-mid2", "g9-3f-903"] },
  "g9-3f-903": { id: "g9-3f-903", x: 2, y: 7.2, z: 42, neighbors: ["g9-stair-s-3f", "g9-3f-902"] },
  "g9-3f-902": { id: "g9-3f-902", x: 2, y: 7.2, z: 28, neighbors: ["g9-3f-903", "g9-3f-901"] },
  "g9-3f-901": { id: "g9-3f-901", x: 2, y: 7.2, z: 14, neighbors: ["g9-3f-902"] },

  // 9. 八年級中棟與專科教室 (中東縱向棟，直立南北向)
  "g8m-porch-s": { id: "g8m-porch-s", x: 28, y: 0, z: 50, neighbors: ["g8f-porch", "breezeway-mid", "driveway-m1", "g8m-1f-wood", "g8m-stair-s-1f"] },
  "g8m-porch-n": { id: "g8m-porch-n", x: 28, y: 0, z: 8, neighbors: ["breezeway-mid", "breezeway-north", "driveway-m2", "g8m-1f-counsel"] },
  "g8m-1f-wood": { id: "g8m-1f-wood", x: 28, y: 0, z: 42, neighbors: ["g8m-porch-s", "g8m-1f-809"] },
  "g8m-1f-809": { id: "g8m-1f-809", x: 28, y: 0, z: 32, neighbors: ["g8m-1f-wood", "g8m-1f-wood206"] },
  "g8m-1f-wood206": { id: "g8m-1f-wood206", x: 28, y: 0, z: 22, neighbors: ["g8m-1f-809", "g8m-1f-counsel"] },
  "g8m-1f-counsel": { id: "g8m-1f-counsel", x: 28, y: 0, z: 14, neighbors: ["g8m-1f-wood206", "g8m-porch-n"] },

  "g8m-stair-s-1f": { id: "g8m-stair-s-1f", x: 28, y: 0, z: 46, neighbors: ["g8m-porch-s", "g8m-stair-s-mid1"] },
  "g8m-stair-s-mid1": { id: "g8m-stair-s-mid1", x: 28, y: 1.8, z: 46, neighbors: ["g8m-stair-s-1f", "g8m-stair-s-2f"] },
  "g8m-stair-s-2f": { id: "g8m-stair-s-2f", x: 28, y: 3.6, z: 46, neighbors: ["g8m-stair-s-mid1", "g8m-2f-804", "g8m-stair-s-mid2"] },
  "g8m-2f-804": { id: "g8m-2f-804", x: 28, y: 3.6, z: 42, neighbors: ["g8m-stair-s-2f", "g8m-2f-805"] },
  "g8m-2f-805": { id: "g8m-2f-805", x: 28, y: 3.6, z: 32, neighbors: ["g8m-2f-804", "g8m-2f-math-res"] },
  "g8m-2f-math-res": { id: "g8m-2f-math-res", x: 28, y: 3.6, z: 22, neighbors: ["g8m-2f-805"] },

  "g8m-stair-s-mid2": { id: "g8m-stair-s-mid2", x: 28, y: 5.4, z: 46, neighbors: ["g8m-stair-s-2f", "g8m-stair-s-3f"] },
  "g8m-stair-s-3f": { id: "g8m-stair-s-3f", x: 28, y: 7.2, z: 46, neighbors: ["g8m-stair-s-mid2", "g8m-3f-inter"] },
  "g8m-3f-inter": { id: "g8m-3f-inter", x: 28, y: 7.2, z: 38, neighbors: ["g8m-stair-s-3f", "g8m-3f-drama"] },
  "g8m-3f-drama": { id: "g8m-3f-drama", x: 28, y: 7.2, z: 26, neighbors: ["g8m-3f-inter", "g8m-3f-nl"] },
  "g8m-3f-nl": { id: "g8m-3f-nl", x: 28, y: 7.2, z: 14, neighbors: ["g8m-3f-drama"] },

  // 10. 中央南北向車道 (Main Driveway)
  "driveway-s1": { id: "driveway-s1", x: 30, y: 0, z: 86, neighbors: ["gate-guard", "driveway-m1", "bike-shed"] },
  "driveway-m1": { id: "driveway-m1", x: 52, y: 0, z: 48, neighbors: ["driveway-s1", "g8m-porch-s", "art-porch", "driveway-m2"] },
  "driveway-m2": { id: "driveway-m2", x: 52, y: 0, z: 12, neighbors: ["driveway-m1", "g8m-porch-n", "tech-porch", "driveway-n1"] },
  "driveway-n1": { id: "driveway-n1", x: 52, y: 0, z: -25, neighbors: ["driveway-m2", "bb-gate", "multi-porch", "parking-lot", "driveway-n2"] },
  "driveway-n2": { id: "driveway-n2", x: 52, y: 0, z: -58, neighbors: ["driveway-n1", "new7-porch"] },

  "bike-shed": { id: "bike-shed", x: 80, y: 0, z: 86, neighbors: ["driveway-s1", "art-porch"] },

  // 11. 東側：七年級新大樓＋特教園地 (NE)
  "new7-porch": { id: "new7-porch", x: 60, y: 0, z: -58, neighbors: ["driveway-n2", "new7-1f-fit", "new7-1f-709", "new7-1f-701", "new7-stair-1f"] },
  "new7-1f-fit": { id: "new7-1f-fit", x: 68, y: 0, z: -58, neighbors: ["new7-porch", "new7-1f-709"] },
  "new7-1f-709": { id: "new7-1f-709", x: 74, y: 0, z: -58, neighbors: ["new7-1f-fit", "new7-1f-701"] },
  "new7-1f-701": { id: "new7-1f-701", x: 80, y: 0, z: -58, neighbors: ["new7-1f-709", "new7-1f-res"] },
  "new7-1f-res": { id: "new7-1f-res", x: 86, y: 0, z: -58, neighbors: ["new7-1f-701", "new7-1f-704"] },
  "new7-1f-704": { id: "new7-1f-704", x: 92, y: 0, z: -58, neighbors: ["new7-1f-res", "new7-1f-708"] },
  "new7-1f-708": { id: "new7-1f-708", x: 98, y: 0, z: -58, neighbors: ["new7-1f-704"] },

  "new7-stair-1f": { id: "new7-stair-1f", x: 60, y: 0, z: -54, neighbors: ["new7-porch", "new7-stair-mid1"] },
  "new7-stair-mid1": { id: "new7-stair-mid1", x: 60, y: 1.8, z: -54, neighbors: ["new7-stair-1f", "new7-stair-2f"] },
  "new7-stair-2f": { id: "new7-stair-2f", x: 60, y: 3.6, z: -54, neighbors: ["new7-stair-mid1", "new7-2f-702", "new7-stair-mid2"] },
  "new7-2f-702": { id: "new7-2f-702", x: 72, y: 3.6, z: -58, neighbors: ["new7-stair-2f", "new7-2f-703"] },
  "new7-2f-703": { id: "new7-2f-703", x: 78, y: 3.6, z: -58, neighbors: ["new7-2f-702", "new7-2f-sped-off"] },
  "new7-2f-sped-off": { id: "new7-2f-sped-off", x: 84, y: 3.6, z: -58, neighbors: ["new7-2f-703", "new7-2f-705"] },
  "new7-2f-705": { id: "new7-2f-705", x: 90, y: 3.6, z: -58, neighbors: ["new7-2f-sped-off", "new7-2f-counseling"] },
  "new7-2f-counseling": { id: "new7-2f-counseling", x: 96, y: 3.6, z: -58, neighbors: ["new7-2f-705"] },

  "new7-stair-mid2": { id: "new7-stair-mid2", x: 60, y: 5.4, z: -54, neighbors: ["new7-stair-2f", "new7-stair-3f"] },
  "new7-stair-3f": { id: "new7-stair-3f", x: 60, y: 7.2, z: -54, neighbors: ["new7-stair-mid2", "new7-3f-math"] },
  "new7-3f-math": { id: "new7-3f-math", x: 72, y: 7.2, z: -58, neighbors: ["new7-stair-3f", "new7-3f-706"] },
  "new7-3f-706": { id: "new7-3f-706", x: 80, y: 7.2, z: -58, neighbors: ["new7-3f-math", "new7-3f-707"] },
  "new7-3f-707": { id: "new7-3f-707", x: 88, y: 7.2, z: -58, neighbors: ["new7-3f-706", "new7-3f-sped-cls"] },
  "new7-3f-sped-cls": { id: "new7-3f-sped-cls", x: 96, y: 7.2, z: -58, neighbors: ["new7-3f-707"] },

  // 12. 綜合大樓 (Multiservice Bld) & 平面停車場 & 校史室
  "multi-porch": { id: "multi-porch", x: 62, y: 0, z: -23, neighbors: ["driveway-n1", "multi-1f-food", "multi-1f-lib", "history-1f", "parking-lot", "multi-stair-1f"] },
  "parking-lot": { id: "parking-lot", x: 74, y: 0, z: -23, neighbors: ["driveway-n1", "multi-porch"] },
  "multi-1f-food": { id: "multi-1f-food", x: 74, y: 0, z: -35, neighbors: ["multi-porch"] },
  "multi-1f-lib": { id: "multi-1f-lib", x: 74, y: 0, z: -10, neighbors: ["multi-porch"] },
  "history-1f": { id: "history-1f", x: 92, y: 0, z: -35, neighbors: ["multi-porch"] },

  "multi-stair-1f": { id: "multi-stair-1f", x: 62, y: 0, z: -19, neighbors: ["multi-porch", "multi-stair-mid"] },
  "multi-stair-mid": { id: "multi-stair-mid", x: 62, y: 1.8, z: -19, neighbors: ["multi-stair-1f", "multi-2f-conf"] },
  "multi-2f-conf": { id: "multi-2f-conf", x: 74, y: 3.6, z: -35, neighbors: ["multi-stair-mid", "multi-2f-lpc"] },
  "multi-2f-lpc": { id: "multi-2f-lpc", x: 74, y: 3.6, z: -10, neighbors: ["multi-2f-conf", "multi-2f-srv"] },
  "multi-2f-srv": { id: "multi-2f-srv", x: 84, y: 3.6, z: -10, neighbors: ["multi-2f-lpc"] },

  // 13. 科技館 (Technology Building)
  "tech-porch": { id: "tech-porch", x: 62, y: 0, z: 12, neighbors: ["driveway-m2", "tech-1f-av", "tech-1f-lt1", "tech-1f-smart", "tech-1f-lt2", "tech-stair-1f"] },
  "tech-1f-av": { id: "tech-1f-av", x: 68, y: 0, z: 6, neighbors: ["tech-porch"] },
  "tech-1f-lt1": { id: "tech-1f-lt1", x: 76, y: 0, z: 6, neighbors: ["tech-porch"] },
  "tech-1f-smart": { id: "tech-1f-smart", x: 68, y: 0, z: 18, neighbors: ["tech-porch"] },
  "tech-1f-lt2": { id: "tech-1f-lt2", x: 76, y: 0, z: 18, neighbors: ["tech-porch"] },

  "tech-stair-1f": { id: "tech-stair-1f", x: 62, y: 0, z: 8, neighbors: ["tech-porch", "tech-stair-mid"] },
  "tech-stair-mid": { id: "tech-stair-mid", x: 62, y: 1.8, z: 8, neighbors: ["tech-stair-1f", "tech-2f-phy"] },
  "tech-2f-phy": { id: "tech-2f-phy", x: 70, y: 3.6, z: 6, neighbors: ["tech-stair-mid", "tech-2f-pc1"] },
  "tech-2f-pc1": { id: "tech-2f-pc1", x: 80, y: 3.6, z: 6, neighbors: ["tech-2f-phy"] },
  "tech-2f-pc2": { id: "tech-2f-pc2", x: 70, y: 3.6, z: 18, neighbors: ["tech-2f-phy", "tech-2f-maker"] },
  "tech-2f-maker": { id: "tech-2f-maker", x: 80, y: 3.6, z: 18, neighbors: ["tech-2f-pc2"] },

  // 14. 藝術館 (Art Building, 4層樓)
  "art-porch": { id: "art-porch", x: 66, y: 0, z: 46, neighbors: ["driveway-m1", "bike-shed", "art-1f-bw", "art-stair-1f"] },
  "art-1f-bw": { id: "art-1f-bw", x: 74, y: 0, z: 46, neighbors: ["art-porch"] },

  "art-stair-1f": { id: "art-stair-1f", x: 68, y: 0, z: 42, neighbors: ["art-porch", "art-stair-mid1"] },
  "art-stair-mid1": { id: "art-stair-mid1", x: 68, y: 1.8, z: 42, neighbors: ["art-stair-1f", "art-2f-m1"] },
  "art-2f-m1": { id: "art-2f-m1", x: 74, y: 3.6, z: 46, neighbors: ["art-stair-mid1", "art-stair-mid2"] },
  "art-stair-mid2": { id: "art-stair-mid2", x: 68, y: 5.4, z: 42, neighbors: ["art-2f-m1", "art-3f-m2"] },
  "art-3f-m2": { id: "art-3f-m2", x: 74, y: 7.2, z: 46, neighbors: ["art-stair-mid2", "art-stair-mid3"] },
  "art-stair-mid3": { id: "art-stair-mid3", x: 68, y: 9.0, z: 42, neighbors: ["art-3f-m2", "art-4f-art"] },
  "art-4f-art": { id: "art-4f-art", x: 74, y: 10.8, z: 46, neighbors: ["art-stair-mid3"] }
};

    NAV_NODES['palm-avenue-end']={x:-10,y:0,z:158,neighbors:['gate']};
    Object.keys(NAV_NODES).forEach(nid => {
      const node = NAV_NODES[nid];
      node.neighbors.forEach(neighId => {
        if (NAV_NODES[neighId] && !NAV_NODES[neighId].neighbors.includes(nid)) {
          NAV_NODES[neighId].neighbors.push(nid);
        }
      });
    });

    function findShortestPath(startNodeId, targetNodeId) {
      if (!NAV_NODES[startNodeId] || !NAV_NODES[targetNodeId]) return null;
      if (startNodeId === targetNodeId) return [startNodeId];

      const openSet = new Set([startNodeId]);
      const cameFrom = {};
      const gScore = {};
      const fScore = {};

      Object.keys(NAV_NODES).forEach(k => {
        gScore[k] = Infinity;
        fScore[k] = Infinity;
      });

      gScore[startNodeId] = 0;
      fScore[startNodeId] = dist3D(NAV_NODES[startNodeId], NAV_NODES[targetNodeId]);

      while (openSet.size > 0) {
        let current = null;
        let lowestF = Infinity;
        openSet.forEach(nodeId => {
          if (fScore[nodeId] < lowestF) {
            lowestF = fScore[nodeId];
            current = nodeId;
          }
        });

        if (current === targetNodeId) {
          const path = [current];
          while (cameFrom[current]) {
            current = cameFrom[current];
            path.unshift(current);
          }
          return path;
        }

        openSet.delete(current);
        const currNode = NAV_NODES[current];

        currNode.neighbors.forEach(neighborId => {
          const neighNode = NAV_NODES[neighborId];
          if (!neighNode) return;
          const tentativeG = gScore[current] + dist3D(currNode, neighNode);
          if (tentativeG < gScore[neighborId]) {
            cameFrom[neighborId] = current;
            gScore[neighborId] = tentativeG;
            fScore[neighborId] = tentativeG + dist3D(neighNode, NAV_NODES[targetNodeId]);
            openSet.add(neighborId);
          }
        });
      }
      return null;
    }

    function dist3D(p1, p2) {
      const dx = p1.x - p2.x;
      const dy = (p1.y || 0) - (p2.y || 0);
      const dz = p1.z - p2.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    function findClosestNavNode(pos) {
      let closestId = "gate";
      let minDist = Infinity;
      Object.keys(NAV_NODES).forEach(nid => {
        const n = NAV_NODES[nid];
        const d = Math.hypot(n.x - pos.x, (n.y || 0) - pos.y, n.z - pos.z);
        if (d < minDist) {
          minDist = d;
          closestId = nid;
        }
      });
      return closestId;
    }

    /* ==========================================================================
       6. 3D ROUTE & MULTI-FLOOR AUTO-WALK
       ========================================================================== */
    let navPathMesh = null;
    let navTargetPoint = null;
    let currentNavPoints = [];
    let isAutoWalking = false;
    let autoWalkIndex = 0;
    let activeNavigationId = null;
    let navigationStatus = 'cancelled',navigationProgressTime=0;

    function getNavigationState(){
      let index=Math.max(0,autoWalkIndex);
      if(!isAutoWalking&&avatarGroup&&currentNavPoints.length){
        let closest=Infinity;
        currentNavPoints.forEach((p,i)=>{const distance=Math.hypot(p.x-avatarGroup.position.x,p.y-.6-avatarGroup.position.y,p.z-avatarGroup.position.z);if(distance<closest){closest=distance;index=i;}});
      }
      index=Math.min(index,Math.max(0,currentNavPoints.length-2));
      let remaining=0;
      const next=currentNavPoints[index+1];
      if(next&&avatarGroup){remaining=Math.hypot(next.x-avatarGroup.position.x,next.y-.6-avatarGroup.position.y,next.z-avatarGroup.position.z);for(let i=index+1;i<currentNavPoints.length-1;i++)remaining+=currentNavPoints[i].distanceTo(currentNavPoints[i+1]);}
      return {status:navigationStatus,destination:activeNavigationId,points:currentNavPoints,index,remaining:navigationStatus==='arrived'?0:remaining};
    }
    function publishNavigation(status=navigationStatus){
      navigationStatus=status;
      window.dispatchEvent(new CustomEvent('campus:navigation',{detail:getNavigationState()}));
    }

    function renderNavigationPath(points) {
      if (navPathMesh) {
        scene.remove(navPathMesh);
        navPathMesh.geometry.dispose();
        navPathMesh.material.dispose();
        navPathMesh = null;
      }
      currentNavPoints = points || [];
      if (!points || points.length < 2) return;

      const tubeGeo = new THREE.BufferGeometry();
      tubeGeo.setAttribute('position',new THREE.Float32BufferAttribute(CampusSpatialPlan.ribbon(points),3));
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      navPathMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(navPathMesh);

      if (!navTargetPoint) {
        const pinGeo = new THREE.CylinderGeometry(0.1, 1.4, 3.2, 12);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        navTargetPoint = new THREE.Mesh(pinGeo, pinMat);
        scene.add(navTargetPoint);
      }
      const lastPt = points[points.length - 1];
      navTargetPoint.position.set(lastPt.x, lastPt.y + 2.6, lastPt.z);
      navTargetPoint.userData.baseY=lastPt.y+2.6;
      navTargetPoint.rotation.x = Math.PI;
      navTargetPoint.visible = true;
    }

    function clearNavigation() {
      activeNavigationId = null;
      if (navPathMesh) {
        scene.remove(navPathMesh);
        navPathMesh.geometry.dispose();
        navPathMesh.material.dispose();
        navPathMesh = null;
      }
      if (navTargetPoint) {
        navTargetPoint.visible = false;
      }
      document.getElementById("nav-hud").classList.remove("visible");
      stopAutoWalk();
      currentNavPoints = [];
      publishNavigation('cancelled');
    }

    const btnAutoWalk = document.getElementById("btn-auto-walk");
    btnAutoWalk.onclick = () => {
      if (isAutoWalking) {
        stopAutoWalk();
      } else {
        startAutoWalk();
      }
    };

    function startAutoWalk() {
      autoPeopleWait=0;
      if(motionBlocked())return;
      cancelCameraTween();
      resetManualInput();
      if (activeNavigationId && !navigateToRoom(activeNavigationId, false)) return;
      if (!currentNavPoints || currentNavPoints.length < 2) return;
      if(currentMode==='bird')setControlMode('avatar');
      window.campusWalkWorld?.updateCamera();
      isAutoWalking = true;
      const startPt = currentNavPoints[0];
      const startPos = new THREE.Vector3(startPt.x, (startPt.y || 0.6) - 0.6, startPt.z);
      if (avatarGroup && avatarGroup.position.distanceTo(startPos) > 2.0) {
        autoWalkIndex = -1; // Walk to start point first
      } else {
        autoWalkIndex = 0;
      }
      btnAutoWalk.classList.add("walking");
      btnAutoWalk.textContent = "⏹️ 停止帶路";
      publishNavigation('walking');
      showToast("🧑‍🎓 大溪同學啟動自動帶路，正帶您前往目的地！");
    }

    function stopAutoWalk() {
      const wasWalking=isAutoWalking;
      isAutoWalking = false;
      if(btnAutoWalk.classList.contains('walking'))btnAutoWalk.classList.remove('walking');
      const label=activeNavigationId ? "繼續帶路" : "🚶‍♂️ 自動帶路";
      if(btnAutoWalk.textContent!==label)btnAutoWalk.textContent=label;
      if(wasWalking&&navigationStatus==='walking')publishNavigation('paused');
    }

    function manualTakeover() {
      if(isAutoWalking){stopAutoWalk();showToast('已改為手動探索；按「繼續帶路」從目前位置出發。');}
    }
    function resetManualInput() {
      keyMovementKeys.clear();
      Object.keys(dpadInput).forEach(k=>dpadInput[k]=false);
      Object.keys(moveInput).forEach(k=>moveInput[k]=false);
      isMouseDownDragging=false;
      window.campusMobileControls?.reset();
      window.campusMouse?.reset();
      document.querySelectorAll('.dpad-btn.pressed').forEach(el=>el.classList.remove('pressed'));
    }
    function motionBlocked(){return !!document.querySelector('dialog[open],.avatar-setting-modal.open,#help-modal.open,#campus-map-modal.open,#reference-panel.open');}

    /* ==========================================================================
       7. CONTROL MODES & SMOOTH CAMERA
       ========================================================================== */
    let currentMode = "bird"; // Start in Overview Mode (鳥瞰全景) with Welcome Card
    const moveInput = { forward: false, backward: false, left: false, right: false, sprint: false };
    const keyMovementKeys=new Set(),dpadInput={forward:false,backward:false,left:false,right:false};
    const movementKeys={forward:['w','arrowup'],backward:['s','arrowdown'],left:['a','arrowleft'],right:['d','arrowright']};
    function syncMoveInput(){for(const [direction,keys] of Object.entries(movementKeys))moveInput[direction]=dpadInput[direction]||keys.some(k=>keyMovementKeys.has(k));}
    let walkAnimCycle = 0;
    let walkPitch = 0;
    let jumpVelocity = 0;
    let jumpBaseY = 0;
    let isJumping = false;

    function setControlMode(mode) {
      if(mode!==currentMode)resetManualInput();
      if(mode==='bird')stopAutoWalk();
      currentMode = mode;
      document.body.dataset.controlMode=mode;
      syncInteriorFloors();
      controls.enabled=mode==="bird";
      camera.near=mode==='bird'?1:.08;camera.fov=mode==='bird'?45:60;camera.updateProjectionMatrix();
      const btnIcon = document.getElementById("btn-mode-icon");
      const btnText = document.getElementById("btn-mode-text");
      const toggleBtn = document.getElementById("btn-mode-toggle");
      const bottomCtrls = document.getElementById("avatar-bottom-controls");

      if (mode === "avatar") {
        toggleBtn.classList.add("active");
        btnIcon.textContent = "🧑‍🎓";
        btnText.textContent = "第三人稱";
        toggleBtn.title = "目前為第三人稱漫遊，點擊切換為鳥瞰全景";
        if (avatarGroup) avatarGroup.visible = true;
        if (bottomCtrls) bottomCtrls.style.display = "flex";
        showToast("切換為「第三人稱視角」！W／S 前進後退，A／D 轉向。");
        if (avatarGroup) {
          const targetLookAt = avatarGroup.position.clone().add(new THREE.Vector3(0, 1.8, 0));
          const behindPos = avatarGroup.position.clone().add(new THREE.Vector3(0, 5.5, 12));
          cancelCameraTween();
          if(window.campusWalkWorld)window.campusWalkWorld.updateCamera();else animateCameraTo(behindPos,targetLookAt);
        }
      } else if (mode === "firstperson") {
        toggleBtn.classList.add("active");
        btnIcon.textContent = "👀";
        btnText.textContent = "第一人稱";
        toggleBtn.title = "目前為第一人稱視角，點擊切換為第三人稱";
        if (avatarGroup) avatarGroup.visible = false;
        if (bottomCtrls) bottomCtrls.style.display = "flex";
        showToast("切換為「第一人稱視角」！滑鼠環顧、WASD 漫遊。");
        if (avatarGroup) {
          const eyePos = avatarGroup.position.clone().add(new THREE.Vector3(0, 1.7, 0));
          const forwardVec = new THREE.Vector3(Math.sin(avatarAngle) * 10, 0, Math.cos(avatarAngle) * 10);
          cancelCameraTween();
          if(window.campusWalkWorld)window.campusWalkWorld.updateCamera();else animateCameraTo(eyePos,eyePos.clone().add(forwardVec),600);
        }
      } else {
        toggleBtn.classList.remove("active");
        btnIcon.textContent = "🦅";
        btnText.textContent = "鳥瞰全景";
        toggleBtn.title = "目前為鳥瞰模式，點擊切換為第三人稱角色漫遊";
        if (avatarGroup) avatarGroup.visible = true;
        if (bottomCtrls) bottomCtrls.style.display = "none";
        showToast("切換為「全校鳥瞰模式」！可 360° 俯瞰校園全貌。");
        animateCameraTo(OVERVIEW_CAM, OVERVIEW_TARGET);
      }
    }

    function togglePerspective() {
      if (currentMode === "firstperson") {
        setControlMode("avatar");
      } else {
        setControlMode("firstperson");
      }
    }

    function toggleBirdMode() {
      if (currentMode === "bird") {
        setControlMode("avatar");
      } else {
        setControlMode("bird");
      }
    }

    function triggerJump() {
      if (!isJumping && avatarGroup) {
        isJumping = true;
        jumpBaseY = avatarGroup.position.y;
        jumpVelocity = 7.5;
      }
    }

    document.getElementById("btn-mode-toggle").onclick = () => {
      setControlMode(currentMode === "bird" ? "avatar" : "bird");
    };

    function showToast(text) {
      const toast = document.getElementById("mode-toast");
      toast.textContent = text;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2800);
    }

    window.addEventListener("keydown", (e) => {
      if (e.target instanceof Element && e.target.closest("input,textarea,select,[contenteditable]")) return;
      if(motionBlocked())return;
      if(['w','s','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key.length===1?e.key.toLowerCase():e.key)){
        e.preventDefault();manualTakeover();
      }
      if (["w","s","a","d","W","S","A","D","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)&&currentMode==='bird')setControlMode('avatar');
      if(Object.values(movementKeys).flat().includes(e.key.toLowerCase())){keyMovementKeys.add(e.key.toLowerCase());syncMoveInput();}
      if (e.shiftKey) moveInput.sprint = true;
      if (e.code === "Space") {
        e.preventDefault();
        triggerJump();
      }
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        togglePerspective();
      }
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleBirdMode();
      }

    });

    window.addEventListener("keyup", (e) => {
      keyMovementKeys.delete(e.key.toLowerCase());syncMoveInput();
      if (!e.shiftKey) moveInput.sprint = false;
    });

    function bindDpad(btnId, directionKey) {
      const el = document.getElementById(btnId);
      const start = (e) => {
        e.preventDefault();
        if(motionBlocked())return;
        if(currentMode==='bird')setControlMode('avatar');
        manualTakeover();
        dpadInput[directionKey] = true;syncMoveInput();
        el.classList.add("pressed");
      };
      const end = (e) => {
        e.preventDefault();
        dpadInput[directionKey] = false;syncMoveInput();
        el.classList.remove("pressed");
      };
      el.addEventListener("mousedown", start);
      el.addEventListener("mouseup", end);
      el.addEventListener("mouseleave", end);
      el.addEventListener("touchstart", start, { passive: false });
      el.addEventListener("touchend", end, { passive: false });
      el.addEventListener("touchcancel", end, { passive: false });
    }
    window.addEventListener('blur',()=>{resetManualInput();stopAutoWalk()});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){resetManualInput();stopAutoWalk()}});
    let wasMotionBlocked=false;
    new MutationObserver(()=>{const blocked=motionBlocked();if(blocked&&!wasMotionBlocked){resetManualInput();stopAutoWalk()}wasMotionBlocked=blocked;}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open','class']});
    bindDpad("dpad-up", "forward");
    bindDpad("dpad-down", "backward");
    bindDpad("dpad-left", "left");
    bindDpad("dpad-right", "right");

    /* ==========================================================================
       8. NAVIGATION & CAMERA TRANSITIONS
       ========================================================================== */
    function navigateToRoom(roomId, focusCamera = true) {
      stopAutoWalk();
      const room = ROOMS_DB[roomId];
      if (!room) {
        alert("找不到此處室或教室: " + roomId);
        return;
      }

      focusedBuildingId=room.buildingId;
      const targetNodeId = room.node;
      const startNodeId = avatarGroup ? findClosestNavNode(avatarGroup.position) : "gate";
      const nodePath = findShortestPath(startNodeId, targetNodeId);

      const pathPoints = [];
      if (nodePath && nodePath.length > 0) {
        nodePath.forEach(nid => {
          const n = NAV_NODES[nid];
          pathPoints.push(new THREE.Vector3(n.x, (n.y || 0) + 0.6, n.z));
        });
      } else {
        const destNode = NAV_NODES[targetNodeId] || { x: 0, y: 0, z: 0 };
        pathPoints.push(new THREE.Vector3(0, 0.6, 96));
        pathPoints.push(new THREE.Vector3(destNode.x, (destNode.y || 0) + 0.6, destNode.z));
      }

      if(window.campusWalkWorld){
        const actual=window.campusWalkWorld.route(avatarGroup.position,room);
        if(!actual){
          renderNavigationPath([]);if(navTargetPoint)navTargetPoint.visible=false;
          activeNavigationId=roomId;autoWalkIndex=0;
          const hud=document.getElementById('nav-hud');hud.dataset.destination=roomId;hud.classList.add('visible');
          document.getElementById('hud-target-name').textContent=`[${room.buildingName} ${room.floor}F] ${room.name}`;
          document.getElementById('hud-route-desc').textContent='目前位置無可通行路徑，請先移到走廊或入口。';
          btnAutoWalk.textContent='重新規劃';publishNavigation('blocked');
          showToast('目前位置無可通行路徑，請先移到走廊或入口。');return;
        }
        pathPoints.length=0;actual.forEach(p=>pathPoints.push(new THREE.Vector3(p.x,p.y+.6,p.z)));
      }
      renderNavigationPath(pathPoints);
      activeNavigationId=roomId;

      let totalDist = 0;
      for (let i = 0; i < pathPoints.length - 1; i++) {
        totalDist += pathPoints[i].distanceTo(pathPoints[i + 1]);
      }
      const meters = Math.round(totalDist);

      const outdoorDestination = room.code?.startsWith('OUT-') || roomId === 'track';
      document.getElementById("hud-target-name").textContent = `[${room.buildingName} ${outdoorDestination ? '戶外' : room.floor+'F'}] ${room.name}`;
      document.getElementById("hud-route-desc").textContent = outdoorDestination
        ? `由當前位置 → 沿校園路線前往 ${room.name}`
        : `由當前位置 → 經由 ${room.buildingName} 走廊/樓梯至 ${room.floor} 樓`;
      document.getElementById("hud-dist-val").textContent = meters;
      document.getElementById("nav-hud").dataset.destination = roomId;
      document.getElementById("nav-hud").classList.add("visible");
      btnAutoWalk.textContent = "🚶‍♂️ 自動帶路";
      btnAutoWalk.classList.remove("walking");
      autoWalkIndex=0;
      publishNavigation('ready');

      if (room.floor > 1) {
        setFloorFilter(room.floor);
      } else {
        setFloorFilter("all");
      }

      // Smoothly focus camera towards destination node
      const destNode = NAV_NODES[targetNodeId];
      if (destNode && focusCamera && currentMode==='bird') {
        animateCameraTo(
          new THREE.Vector3(destNode.x + 24, (destNode.y || 0) + 18, destNode.z + 32),
          new THREE.Vector3(destNode.x, (destNode.y || 0) + 2, destNode.z)
        );
      }
      return true;
    }

    let isCameraAnimating = false;
    let cameraTweenGeneration=0;
    function cancelCameraTween(){cameraTweenGeneration++;isCameraAnimating=false;}
    function animateCameraTo(targetCamPos, targetLookAt, duration = 800) {
      const generation=++cameraTweenGeneration;
      if(matchMedia("(prefers-reduced-motion: reduce)").matches)duration=1;
      const startCamPos = camera.position.clone();
      const startLookAt = controls.target.clone();
      const startTime = performance.now();
      isCameraAnimating = true;

      function tween(now) {
        if(generation!==cameraTweenGeneration)return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        camera.position.lerpVectors(startCamPos, targetCamPos, ease);
        controls.target.lerpVectors(startLookAt, targetLookAt, ease);

        if (progress < 1) {
          requestAnimationFrame(tween);
        } else {
          camera.position.copy(targetCamPos);
          controls.target.copy(targetLookAt);
          controls.update();
          isCameraAnimating = false;
        }
      }
      requestAnimationFrame(tween);
    }

    /* ==========================================================================
       7.1 AVATAR SPEED & TURN CONTROLS (References: media_1791355815735/739/762)
       ========================================================================== */
    let avatarSpeedMultiplier = 1.0;
    let turnSensitivityMultiplier = 1.0;
    let mouseTurnMode = "left"; // "left" | "right" | "move"
    let isInvertY = false;
    let isMouseDownDragging = false;

    const btnSpeedCtrl = document.getElementById("btn-speed-ctrl");
    const btnTurnCtrl = document.getElementById("btn-turn-ctrl");
    const modalSpeedCtrl = document.getElementById("modal-speed-ctrl");
    const modalTurnCtrl = document.getElementById("modal-turn-ctrl");
    const btnCloseSpeedModal = document.getElementById("btn-close-speed-modal");
    const btnCloseTurnModal = document.getElementById("btn-close-turn-modal");
    const sliderSpeed = document.getElementById("slider-speed");
    const sliderTurn = document.getElementById("slider-turn");
    const valSpeedDisplay = document.getElementById("val-speed-display");
    const valTurnDisplay = document.getElementById("val-turn-display");
    const selectMouseTurn = document.getElementById("select-mouse-turn");
    const checkInvertY = document.getElementById("check-invert-y");
    const btnResetSpeed = document.getElementById("btn-reset-speed");
    const btnResetTurn = document.getElementById("btn-reset-turn");

    function updateSliderFill(slider) {
      if (!slider) return;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
      slider.style.background = `linear-gradient(to right, #facc15 0%, #facc15 ${pct}%, #334155 ${pct}%, #334155 100%)`;
    }

    if (sliderSpeed) {
      updateSliderFill(sliderSpeed);
      sliderSpeed.addEventListener("input", () => {
        const val = parseInt(sliderSpeed.value, 10);
        if (valSpeedDisplay) valSpeedDisplay.textContent = `${val}%`;
        if (btnSpeedCtrl) btnSpeedCtrl.textContent = `速度 ${val}%`;
        avatarSpeedMultiplier = val / 100;
        updateSliderFill(sliderSpeed);
      });
    }

    if (btnResetSpeed) {
      btnResetSpeed.addEventListener("click", () => {
        if (sliderSpeed) sliderSpeed.value = 100;
        if (valSpeedDisplay) valSpeedDisplay.textContent = "100%";
        if (btnSpeedCtrl) btnSpeedCtrl.textContent = "速度 100%";
        avatarSpeedMultiplier = 1.0;
        updateSliderFill(sliderSpeed);
      });
    }

    if (sliderTurn) {
      updateSliderFill(sliderTurn);
      sliderTurn.addEventListener("input", () => {
        const val = parseInt(sliderTurn.value, 10);
        if (valTurnDisplay) valTurnDisplay.textContent = `${val}%`;
        if (btnTurnCtrl) btnTurnCtrl.textContent = `轉頭 ${val}%`;
        turnSensitivityMultiplier = val / 100;
        controls.rotateSpeed = 1.0 * turnSensitivityMultiplier;
        updateSliderFill(sliderTurn);
      });
    }

    function applyMouseModeSettings() {
      controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    }

    if (selectMouseTurn) {
      selectMouseTurn.addEventListener("change", (e) => {
        mouseTurnMode = e.target.value;
        applyMouseModeSettings();
      });
    }

    if (checkInvertY) {
      checkInvertY.addEventListener("change", (e) => {
        isInvertY = e.target.checked;
      });
    }

    if (btnResetTurn) {
      btnResetTurn.addEventListener("click", () => {
        if (sliderTurn) sliderTurn.value = 100;
        if (valTurnDisplay) valTurnDisplay.textContent = "100%";
        if (btnTurnCtrl) btnTurnCtrl.textContent = "轉頭 100%";
        turnSensitivityMultiplier = 1.0;
        controls.rotateSpeed = 1.0;
        updateSliderFill(sliderTurn);

        if (selectMouseTurn) selectMouseTurn.value = "left";
        mouseTurnMode = "left";
        applyMouseModeSettings();

        if (checkInvertY) checkInvertY.checked = false;
        isInvertY = false;
      });
    }

    // Modal open/close toggles
    if (btnSpeedCtrl) {
      btnSpeedCtrl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalTurnCtrl) modalTurnCtrl.classList.remove("open");
        if (modalSpeedCtrl) modalSpeedCtrl.classList.toggle("open");
      });
    }

    if (btnTurnCtrl) {
      btnTurnCtrl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalSpeedCtrl) modalSpeedCtrl.classList.remove("open");
        if (modalTurnCtrl) modalTurnCtrl.classList.toggle("open");
      });
    }

    if (btnCloseSpeedModal) {
      btnCloseSpeedModal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalSpeedCtrl) modalSpeedCtrl.classList.remove("open");
      });
    }

    if (btnCloseTurnModal) {
      btnCloseTurnModal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalTurnCtrl) modalTurnCtrl.classList.remove("open");
      });
    }

    if (modalSpeedCtrl) modalSpeedCtrl.addEventListener("click", (e) => e.stopPropagation());
    if (modalTurnCtrl) modalTurnCtrl.addEventListener("click", (e) => e.stopPropagation());

    window.addEventListener("click", (e) => {
      if (modalSpeedCtrl && !e.target.closest("#modal-speed-ctrl") && !e.target.closest("#btn-speed-ctrl")) {
        modalSpeedCtrl.classList.remove("open");
      }
      if (modalTurnCtrl && !e.target.closest("#modal-turn-ctrl") && !e.target.closest("#btn-turn-ctrl")) {
        modalTurnCtrl.classList.remove("open");
      }
    });

    // Custom Mouse Look & Invert Y Rotation Handling
    function applyManualCameraRotation(deltaX, deltaY) {
      if(motionBlocked())return;
      if(currentMode!=='bird'){
        if(isCameraAnimating)cancelCameraTween();
        if(deltaX||deltaY)manualTakeover();
        avatarAngle-=deltaX*.0035*turnSensitivityMultiplier;
        walkPitch=Math.max(-1.25,Math.min(1.25,walkPitch-deltaY*.0035*turnSensitivityMultiplier*(isInvertY?-1:1)));
        return;
      }
      const rotSens = turnSensitivityMultiplier;
      const inv = isInvertY ? -1 : 1;
      const thetaAngle = -deltaX * 0.0035 * rotSens;
      const phiAngle = -deltaY * 0.0035 * rotSens * inv;

      const offset = camera.position.clone().sub(controls.target);
      if (Math.abs(thetaAngle) > 0.0001) {
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), thetaAngle);
      }
      if (Math.abs(phiAngle) > 0.0001) {
        const right = new THREE.Vector3().crossVectors(offset, new THREE.Vector3(0, 1, 0)).normalize();
        offset.applyAxisAngle(right, phiAngle);
      }
      const minD = controls.minDistance || 4;
      const maxD = controls.maxDistance || 300;
      offset.clampLength(minD, maxD);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }

    // Pointer capture, hover and pointer lock are owned by mouse-controls.js.

    function focusBuilding(cfg) {
      focusedBuildingId=cfg.id;
      const layout=window.campusWalkWorld?.layouts.find(l=>l.id===cfg.id);
      const cx=layout?(layout.bounds.x0+layout.bounds.x1)/2:cfg.x;
      const cz=layout?(layout.bounds.z0+layout.bounds.z1)/2:cfg.z;
      animateCameraTo(
        new THREE.Vector3(cx + 36, cfg.floors * FH + 30, cz + 45),
        new THREE.Vector3(cx, cfg.floors * FH / 2, cz)
      );
    }

    let currentFloorFilter = "all";
    function syncInteriorCeilings() {
      for(const group of floorMeshes)if(group.userData.campusCeiling)group.visible=currentMode!=="bird"||currentFloorFilter==="all";
    }
    function syncInteriorFloors() {
      // Floor cutaways are a bird-view display choice. Walking and descending
      // must never leave collidable walls invisible above the selected floor.
      const displayFloor=currentMode==='bird'?currentFloorFilter:'all';
      for(const group of floorMeshes){
        if(group.userData.campusCeiling)continue;
        const total=BUILDINGS_CONFIG.find(b=>b.id===group.userData.buildingId)?.floors||4;
        group.visible=CampusFloorExhibitModel.meshVisible(group.userData,displayFloor,total);
        group.traverse(o=>{if(o!==group&&o.userData.roof)o.visible=CampusFloorExhibitModel.meshVisible({roof:true},displayFloor,total)});
      }
      syncInteriorCeilings();
    }
    function setFloorFilter(floorVal) {
      currentFloorFilter = floorVal;
      const floorBadgeEl = document.getElementById("minimap-floor-badge");
      if (floorBadgeEl) {
        floorBadgeEl.textContent = floorVal === "all" ? "1F" : floorVal + "F";
      }

      document.querySelectorAll(".floor-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.f === String(floorVal));
      });

      syncInteriorFloors();
      roomBadgeElements.forEach(rb => {
        if (floorVal === "all") {
          rb.element.style.display = "flex";
        } else {
          rb.element.style.display = (rb.floor === Number(floorVal)) ? "flex" : "none";
        }
      });
      window.campusFloorExhibit?.refresh();
    }

    document.querySelectorAll(".floor-btn").forEach(btn => {
      btn.onclick = () => setFloorFilter(btn.dataset.f);
    });

    /* ==========================================================================
       9. SEARCH, QUICK CHIPS & 2D MINIMAP
       ========================================================================== */
    function escapeRoomText(value) {
      return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResults.style.display = "none";
        return;
      }
      const matches = Object.values(ROOMS_DB).filter(r => !r.aliasFor && (
        r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.buildingName.toLowerCase().includes(q) || (r.spaceCode||r.code||'').toLowerCase().includes(q)
      ));

      if (matches.length === 0) {
        searchResults.innerHTML = `<li style="color: var(--muted); cursor: default;">查無相符處室或教室</li>`;
      } else {
        searchResults.innerHTML = matches.slice(0, 8).map(r => {
          const catColor = CATEGORY_COLORS[r.cat] || "#2563eb";
          return `
            <li onclick="onSelectSearchRoom('${r.id}')">
              <span><b>${escapeRoomText(r.name)}</b> (${r.floor}F)</span>
              <div>
                <span class="rm-cat-tag" style="background:${catColor};">${r.floor}F</span>
                <span class="rm-bld">${r.buildingName}</span>
              </div>
            </li>
          `;
        }).join("");
      }
      searchResults.style.display = "block";
    });

    window.onSelectSearchRoom = (roomId) => {
      searchResults.style.display = "none";
      searchInput.value = ROOMS_DB[roomId].name;
      navigateToRoom(roomId);
    };

    document.querySelectorAll(".venue-chip").forEach(chip => {
      chip.onclick = () => navigateToRoom(chip.dataset.to);
    });

    document.getElementById("btn-cancel-nav").onclick = clearNavigation;

    // Welcome Guide Card Handlers (Matching media_1791335021168.png)
    const welcomeCard = document.getElementById("welcome-card");
    const btnEnterCampus = document.getElementById("welcome-btn-enter");
    const btnOverviewCampus = document.getElementById("welcome-btn-overview");
    const btnCloseWelcome = document.getElementById("btn-close-welcome");

    if (btnEnterCampus) {
      btnEnterCampus.onclick = () => {
        welcomeCard.classList.add("hidden");
        setControlMode("avatar");
      };
    }
    if (btnOverviewCampus) {
      btnOverviewCampus.onclick = () => {
        welcomeCard.classList.add("hidden");
        setControlMode("bird");
      };
    }
    if (btnCloseWelcome) {
      btnCloseWelcome.onclick = () => {
        welcomeCard.classList.add("hidden");
      };
    }

    document.getElementById("btn-home").onclick = () => {
      clearNavigation();
      setFloorFilter("all");
      welcomeCard.classList.remove("hidden");
      setControlMode("bird");
    };

    const helpModal = document.getElementById("help-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    document.getElementById("btn-help").onclick = () => {
      welcomeCard.classList.toggle("hidden");
    };
    document.getElementById("btn-close-help").onclick = () => {
      helpModal.classList.remove("open");
      modalBackdrop.classList.remove("open");
    };
    modalBackdrop.onclick = () => {
      helpModal.classList.remove("open");
      modalBackdrop.classList.remove("open");
      mapModal.classList.remove("open");
    };

    const mapModal = document.getElementById("campus-map-modal");
    document.getElementById("btn-map-overlay").onclick = () => {
      const mapImage = mapModal.querySelector("img[data-src]");
      if (mapImage && !mapImage.src) mapImage.src = mapImage.dataset.src;
      mapModal.classList.add("open");
    };
    document.getElementById("btn-close-map-modal").onclick = () => mapModal.classList.remove("open");

    // 2D High-Definition Minimap (115學年度官方平面圖精準繪製)
    const miniCanvas = document.getElementById("minimap-canvas");
    const miniCtx = miniCanvas.getContext("2d");
    miniCanvas.width = 360;
    miniCanvas.height = 360;

    const mapMinX = -135, mapMaxX = 115;
    const mapMinZ = -78, mapMaxZ = 102;
    const toMiniX = (x) => 16 + (x - mapMinX) / (mapMaxX - mapMinX) * 328;
    const toMiniZ = (z) => 16 + (z - mapMinZ) / (mapMaxZ - mapMinZ) * 328;

    function renderMinimap() {
      miniCtx.clearRect(0, 0, 360, 360);

      // 1. Campus Ground Base
      miniCtx.fillStyle = "#eeeade";
      miniCtx.fillRect(0, 0, 360, 360);

      // 2. Green Lawn Perimeter
      miniCtx.fillStyle = "#7b9555";
      miniCtx.fillRect(toMiniX(-130), toMiniZ(-74), toMiniX(110) - toMiniX(-130), toMiniZ(94) - toMiniZ(-74));

      // 3. Roads & Driveways (車道)
      miniCtx.fillStyle = "#8c4c3a";
      // 南側主幹道
      miniCtx.fillRect(0, toMiniZ(82), 360, toMiniZ(94) - toMiniZ(82));
      // 中央南北主車道 (直通北側)
      const roadW = 9 * (328 / 250);
      miniCtx.fillRect(toMiniX(48), toMiniZ(-74), roadW, toMiniZ(94) - toMiniZ(-74));

      // 車道白虛線
      miniCtx.strokeStyle = "#94a3b8";
      miniCtx.lineWidth = 1.2;
      miniCtx.setLineDash([4, 4]);
      miniCtx.beginPath();
      miniCtx.moveTo(toMiniX(52.5), toMiniZ(-70));
      miniCtx.lineTo(toMiniX(52.5), toMiniZ(84));
      miniCtx.moveTo(0, toMiniZ(88));
      miniCtx.lineTo(360, toMiniZ(88));
      miniCtx.stroke();
      miniCtx.setLineDash([]);

      // 斑馬線 (正門前)
      miniCtx.fillStyle = "#ffffff";
      for (let i = 0; i < 7; i++) {
        miniCtx.fillRect(toMiniX(-18 + i * 3), toMiniZ(82), 1.8, toMiniZ(94) - toMiniZ(82));
      }

      // 4. 操場及綜合球場 (西北側，水平橫向橢圓跑道)
      const trackCX = toMiniX(-84);
      const trackCZ = toMiniZ(-25);
      const trackW = 84 * (328 / 250) * 0.5;
      const trackH = 54 * (328 / 180) * 0.5;

      // 紅色PU跑道
      miniCtx.fillStyle = "#c93434";
      miniCtx.beginPath();
      miniCtx.ellipse(trackCX, trackCZ, trackW, trackH, 0, 0, Math.PI * 2);
      miniCtx.fill();

      // 白色跑道標線
      miniCtx.strokeStyle = "rgba(255,255,255,0.7)";
      miniCtx.lineWidth = 1.0;
      for (let r = 0.58; r < 0.96; r += 0.12) {
        miniCtx.beginPath();
        miniCtx.ellipse(trackCX, trackCZ, trackW * r, trackH * r, 0, 0, Math.PI * 2);
        miniCtx.stroke();
      }

      // 內圈綠色草皮
      miniCtx.fillStyle = "#22c55e";
      miniCtx.beginPath();
      miniCtx.ellipse(trackCX, trackCZ, trackW * 0.5, trackH * 0.5, 0, 0, Math.PI * 2);
      miniCtx.fill();

      // 操場內東半側綜合球場 / 排球場 (紅色)
      const inVbX = toMiniX(-84 + 10);
      const inVbZ = toMiniZ(-25 - 12);
      const inVbW = 16 * (328 / 250);
      const inVbH = 24 * (328 / 180);
      miniCtx.fillStyle = "#b91c1c";
      miniCtx.fillRect(inVbX, inVbZ, inVbW, inVbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1;
      miniCtx.strokeRect(inVbX, inVbZ, inVbW, inVbH);

      // 操場司令台 (位於南側直道下方)
      const standX = toMiniX(-62 - 8);
      const standZ = toMiniZ(12 - 3);
      const standW = 16 * (328 / 250);
      const standH = 7 * (328 / 180);
      miniCtx.fillStyle = "#3b82f6";
      miniCtx.fillRect(standX, standZ, standW, standH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.2;
      miniCtx.strokeRect(standX, standZ, standW, standH);

      // 5. 戶外排球場 (綠色, 位於操場與籃球場之間 x=-22, z=-38)
      const vbX = toMiniX(-22 - 7);
      const vbZ = toMiniZ(-38 - 14);
      const vbW = 14 * (328 / 250);
      const vbH = 28 * (328 / 180);
      miniCtx.fillStyle = "#16a34a";
      miniCtx.fillRect(vbX, vbZ, vbW, vbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.2;
      miniCtx.strokeRect(vbX, vbZ, vbW, vbH);

      // 6. 戶外籃球場群 (黃色, 3座全場, x=12, z=-38)
      const bbX = toMiniX(12 - 17);
      const bbZ = toMiniZ(-38 - 23);
      const bbW = 34 * (328 / 250);
      const bbH = 46 * (328 / 180);
      miniCtx.fillStyle = "#eab308";
      miniCtx.fillRect(bbX, bbZ, bbW, bbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.4;
      miniCtx.strokeRect(bbX, bbZ, bbW, bbH);

      // 7. 蘭亭與訓平池 (北側圍牆景觀區)
      const lanX = toMiniX(-18);
      const lanZ = toMiniZ(-66);
      miniCtx.fillStyle = "#44484b";
      miniCtx.beginPath();
      miniCtx.arc(lanX, lanZ, 5.5, 0, Math.PI * 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.stroke();

      const pondX = toMiniX(-2);
      const pondZ = toMiniZ(-66);
      miniCtx.fillStyle = "#0284c7";
      miniCtx.beginPath();
      miniCtx.arc(pondX, pondZ, 8, 0, Math.PI * 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#38bdf8";
      miniCtx.stroke();

      // 8. 蔣公銅像庭園 (x=-36, z=32)
      const statueX = toMiniX(-36);
      const statueZ = toMiniZ(32);
      miniCtx.fillStyle = "#b45309";
      miniCtx.beginPath();
      miniCtx.arc(statueX, statueZ, 4.5, 0, Math.PI * 2);
      miniCtx.fill();

      // 9. 綜合大樓平面停車場 (Parking Lot P, x=74, z=-23)
      const pLotX = toMiniX(74 - 12);
      const pLotZ = toMiniZ(-23 - 7.5);
      const pLotW = 24 * (328 / 250);
      const pLotH = 15 * (328 / 180);
      miniCtx.fillStyle = "#eeeade";
      miniCtx.fillRect(pLotX, pLotZ, pLotW, pLotH);
      miniCtx.strokeStyle = "#cbd5e1";
      miniCtx.lineWidth = 1;
      miniCtx.strokeRect(pLotX, pLotZ, pLotW, pLotH);

      // 10. Building Footprints
      BUILDINGS_CONFIG.forEach(cfg => {
        const bx = toMiniX(cfg.x - cfg.width / 2);
        const bz = toMiniZ(cfg.z - cfg.depth / 2);
        const bw = cfg.width * (328 / 250);
        const bh = cfg.depth * (328 / 180);

        const bldColors = {
          sports: "#b91c1c",
          admin: "#334155",
          grade8: "#d97706",
          grade9: "#059669",
          special: "#7c3aed",
          grade7: "#2563eb"
        };
        miniCtx.fillStyle = bldColors[cfg.category] || "#475569";
        miniCtx.fillRect(bx, bz, bw, bh);

        miniCtx.strokeStyle = "#ffffff";
        miniCtx.lineWidth = 1.5;
        miniCtx.strokeRect(bx, bz, bw, bh);

        // Building Label Text
        miniCtx.fillStyle = "#ffffff";
        miniCtx.font = "900 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        miniCtx.textAlign = "center";
        miniCtx.textBaseline = "middle";
        let miniName = cfg.name;
        if (cfg.id === "gym-bld") miniName = "活動中心";
        else if (cfg.id === "recycle-bld") miniName = "回收";
        else if (cfg.id === "admin-front") miniName = "行政大樓";

        else if (cfg.id === "health-bld") miniName = "健康/合作";
        else if (cfg.id === "grade8-front") miniName = "八年級(南棟)";
        else if (cfg.id === "grade9-back") miniName = "九年級";
        else if (cfg.id === "grade8-mid") miniName = "八年級(中)";
        else if (cfg.id === "art-building") miniName = "藝術館";
        else if (cfg.id === "tech-building") miniName = "科技館";
        else if (cfg.id === "multi-building") miniName = "綜合大樓";
        else if (cfg.id === "new-grade7") miniName = "七年級/特教";

        miniCtx.fillText(miniName, bx + bw / 2, bz + bh / 2);
      });

      // 八年級南棟西側半圓樓梯標記
      const roundStairX = toMiniX(16 - 22);
      const roundStairZ = toMiniZ(60);
      miniCtx.fillStyle = "#d97706";
      miniCtx.beginPath();
      miniCtx.arc(roundStairX, roundStairZ, 5 * (328 / 250), Math.PI / 2, 3 * Math.PI / 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.stroke();

      // Outdoor Venue Labels
      miniCtx.fillStyle = "#ffffff";
      miniCtx.font = "900 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      miniCtx.textAlign = "center";
      miniCtx.textBaseline = "middle";
      miniCtx.fillText("操場", trackCX - 12, trackCZ);
      miniCtx.fillText("排球", inVbX + inVbW / 2, inVbZ + inVbH / 2);
      miniCtx.fillText("司令台", standX + standW / 2, standZ + standH / 2);
      miniCtx.fillText("銅像", statueX, statueZ + 8);
      miniCtx.fillText("排球場", vbX + vbW / 2, vbZ + vbH / 2);
      miniCtx.fillText("籃球場", bbX + bbW / 2, bbZ + bbH / 2);
      miniCtx.fillText("蘭亭", lanX, lanZ - 8);
      miniCtx.fillText("訓平池", pondX, pondZ - 8);
      miniCtx.fillText("P 停車場", pLotX + pLotW / 2, pLotZ + pLotH / 2);
      miniCtx.fillText("正門", toMiniX(-10), toMiniZ(88));
      miniCtx.fillText("車道", toMiniX(52.5), toMiniZ(12));
    }

    // Interactive Minimap Clicking
    // 定位小地圖只顯示人物位置，避免點擊意外傳送。

    function checkUrlQueryTarget() {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) {
        setTimeout(() => {
          if(ROOMS_DB[to])navigateToRoom(to);
          else {
            const building=BUILDINGS_CONFIG.find(b=>b.id===(['admin-back','admin-gallery'].includes(to)?'admin-front':to));
            if(building){setControlMode('bird');focusBuilding(building)}
            else showToast('找不到此目的地，請使用上方搜尋');
          }
        },600);
      }
    }

    /* ==========================================================================
       10. MAIN ANIMATION LOOP
       ========================================================================== */
    const clock = new THREE.Clock();
    const avatarNametag = document.getElementById("avatar-nametag");

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      if(document.hidden || window.proposalHidden)return;
      if(motionBlocked()){resetManualInput();stopAutoWalk();}
      window.campusMouse?.update(delta);

      let isMoving = false;
      const baseSpeed = moveInput.sprint ? avatarRunSpeed : avatarSpeed;
      const currentSpeed = baseSpeed * avatarSpeedMultiplier * delta;

      // 1. AUTO-WALK：每幀用完行走距離，可跨越數個相鄰節點。
      if (isAutoWalking && currentNavPoints.length > 1) {
        let remaining=14*avatarSpeedMultiplier*delta;
        for(let n=0;n<64 && remaining>1e-6 && isAutoWalking;n++){
          const point=currentNavPoints[autoWalkIndex+1];
          if(!point){stopAutoWalk();break;}
          const target=new THREE.Vector3(point.x,point.y-.6,point.z),p=avatarGroup.position;
          const dir=target.clone().sub(p),distance=dir.length();
          if(distance>1e-6){
            const amount=Math.min(distance,remaining);dir.multiplyScalar(amount/distance);
            if(moveAvatarWithCollision(p,dir.x,dir.z,dir.y)){
              if(avatarPersonBlocked){
                autoPeopleWait+=delta;
                if(autoPeopleWait>=3){stopAutoWalk();publishNavigation('blocked');showToast('前方有人，帶路已暫停。請稍微繞開，再開始帶路。')}
                break;
              }
              stopAutoWalk();publishNavigation('blocked');showToast('前方有牆壁，帶路已停止。請沿走廊或門口通行。');break;
            }
            autoPeopleWait=0;isMoving=true;jumpBaseY=p.y;remaining-=amount;
            if(Math.hypot(dir.x,dir.z)>1e-6){avatarAngle=Math.atan2(dir.x,dir.z);avatarGroup.rotation.y=avatarAngle;}
            if(amount<distance-1e-6)break;
          }
          autoWalkIndex++;
          if(autoWalkIndex>=currentNavPoints.length-1){
            stopAutoWalk();if(navTargetPoint)navTargetPoint.visible=false;if(navPathMesh)navPathMesh.visible=false;
            document.getElementById('nav-hud').classList.remove('visible');showToast('已抵達目的地。');
            publishNavigation('arrived');
          }
        }
      }
      // 2. MANUAL KEYBOARD / DPAD CONTROLS (Camera-Relative Movement)
      else if (avatarGroup && (currentMode === "avatar" || currentMode === "firstperson")) {
        // 滑鼠只改視線；A/D 主動轉向，W/S 沿視線前進／後退。
        avatarAngle += ((moveInput.left ? 1 : 0)-(moveInput.right ? 1 : 0))*1.9*turnSensitivityMultiplier*delta;
        if(moveInput.left||moveInput.right)avatarGroup.rotation.y=avatarAngle;
        const mobile=window.campusMobileControls;
        if(mobile&&(mobile.look.x||mobile.look.y))applyManualCameraRotation(mobile.look.x*540*delta,-mobile.look.y*350*delta);
        const forwardAmount=((moveInput.forward?1:0)-(moveInput.backward?1:0))+(mobile?.move.y||0),sideAmount=mobile?.move.x||0;
        const moveVec=new THREE.Vector3(Math.sin(avatarAngle)*forwardAmount-Math.cos(avatarAngle)*sideAmount,0,Math.cos(avatarAngle)*forwardAmount+Math.sin(avatarAngle)*sideAmount);

        if (moveVec.lengthSq() > 0.001) {
          isMoving = true;
          if(moveVec.lengthSq()>1)moveVec.normalize();
          avatarGroup.rotation.y = Math.atan2(moveVec.x,moveVec.z);

          const dx = moveVec.x * currentSpeed;
          const dz = moveVec.z * currentSpeed;
          const curPos = avatarGroup.position;

          // 1. Sliding Collision Check against Walls
          const beforeX = curPos.x, beforeZ = curPos.z;
          moveAvatarWithCollision(curPos, dx, dz);
          isMoving = Math.hypot(curPos.x-beforeX, curPos.z-beforeZ) > 0.0001;

          // 梯面、平台及樓板由相同的可行走配置提供高度。
        }
      }
      if(activeNavigationId&&navigationStatus!=='arrived'&&performance.now()-navigationProgressTime>250){navigationProgressTime=performance.now();publishNavigation();}
      if (window.campusWalkWorld && avatarGroup && !isJumping && (currentMode==='avatar'||currentMode==='firstperson')) {
        const groundY=window.campusWalkWorld.ground(avatarGroup.position);
        avatarGroup.position.y=Math.max(groundY,avatarGroup.position.y-8*delta);
        jumpBaseY=avatarGroup.position.y;
      }

      // Space-bar Jump Hop (依據當前樓層地面高度落地，不穿破樓板)
      if (avatarGroup && isJumping) {
        // 查詢下降前腳底高度，落在目前梯面而非起跳樓層。
        const landingY=window.campusWalkWorld?window.campusWalkWorld.ground(avatarGroup.position):jumpBaseY;
        avatarGroup.position.y += jumpVelocity * delta;
        jumpVelocity -= 22 * delta;
        if (jumpVelocity <= 0 && avatarGroup.position.y <= landingY) {
          avatarGroup.position.y = landingY;
          jumpBaseY = landingY;
          jumpVelocity = 0;
          isJumping = false;
        }
      }

      // 3. AVATAR WALKING LIMB ANIMATION
      if (avatarGroup) {
        if (isMoving) {
          walkAnimCycle += delta * (moveInput.sprint ? 16 : 10);
          avatarLeftLeg.rotation.x = Math.sin(walkAnimCycle) * 0.65;
          avatarRightLeg.rotation.x = -Math.sin(walkAnimCycle) * 0.65;
          avatarLeftArm.rotation.x = -Math.sin(walkAnimCycle) * 0.55;
          avatarRightArm.rotation.x = Math.sin(walkAnimCycle) * 0.55;
        } else {
          avatarLeftLeg.rotation.x = 0;
          avatarRightLeg.rotation.x = 0;
          avatarLeftArm.rotation.x = 0;
          avatarRightArm.rotation.x = 0;
        }

        // 鏡頭依視線繞人物；人物面向實際行進方向，靜止時保持朝向。
        if(window.campusWalkWorld && currentMode!=='bird' && !isCameraAnimating)window.campusWalkWorld.updateCamera();
        prevAvatarPos.copy(avatarGroup.position);

        // Dynamic Floor Detection for Minimap Badge
        const currentAvatarY = avatarGroup.position.y;
        let detectedFloor = "1F";
        if (currentAvatarY >= 10.0) detectedFloor = "4F";
        else if (currentAvatarY >= 6.5) detectedFloor = "3F";
        else if (currentAvatarY >= 2.5) detectedFloor = "2F";
        const floorBadgeEl = document.getElementById("minimap-floor-badge");
        if (floorBadgeEl && currentFloorFilter === "all") {
          floorBadgeEl.textContent = detectedFloor;
        }

        // Nametag Screen Position
        const avatarScreenPos = avatarGroup.position.clone().add(new THREE.Vector3(0, 2.1, 0));
        avatarScreenPos.project(camera);
        if (avatarScreenPos.z > 1 || currentMode === "firstperson") {
          avatarNametag.style.display = "none";
        } else {
          avatarNametag.style.display = "block";
          const screenX = (avatarScreenPos.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(avatarScreenPos.y * 0.5) + 0.5) * window.innerHeight;
          avatarNametag.style.left = `${screenX}px`;
          avatarNametag.style.top = `${screenY}px`;
        }
      }

      // Always update OrbitControls so rotation/zoom NEVER freezes (skip during smooth camera tween)
      if (!isCameraAnimating && currentMode==='bird') {
        controls.update();
      }

      // 3D Floating Building Labels
      labelElements.forEach(item => {
        if(window.campusFloorExhibit?.active){item.element.style.display='none';return;}
        const wp = item.worldPos.clone();
        wp.project(camera);
        if (wp.z > 1 || currentMode !== "bird") {
          item.element.style.display = "none";
        } else {
          item.element.style.display = "block";
          const screenX = (wp.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(wp.y * 0.5) + 0.5) * window.innerHeight;
          item.element.style.left = `${screenX}px`;
          item.element.style.top = `${screenY}px`;
        }
      });

      // 3D Floating Landmark Pills (操場, 司令台, 籃球場, 大門, 停車場...)
      landmarkElements.forEach(item => {
        if (currentMode !== "bird") {
          item.element.style.display = "none";
          return;
        }
        const wp = item.worldPos.clone();
        wp.project(camera);
        if (wp.z > 1) {
          item.element.style.display = "none";
        } else {
          item.element.style.display = "block";
          const screenX = (wp.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(wp.y * 0.5) + 0.5) * window.innerHeight;
          item.element.style.left = `${screenX}px`;
          item.element.style.top = `${screenY}px`;
        }
      });

      // 3D Floating Room Badges Position Updating
      const camDist = camera.position.distanceTo(controls.target);

      let shownRoomBadges=0;
      roomBadgeElements.forEach(item => {
        const node=NAV_NODES[item.nodeId];
        const wp=node?new THREE.Vector3(node.x,(node.y||0)+2.2,node.z).project(camera):null;
        const floor=currentFloorFilter==='all'?1:Number(currentFloorFilter);
        const visible=!window.campusFloorExhibit?.active && wp && wp.z<1 && Math.abs(wp.x)<.93 && Math.abs(wp.y)<.88 &&
          item.buildingId===focusedBuildingId && item.floor===floor && camDist<140 &&
          shownRoomBadges<(window.innerWidth<768?4:8);
        item.element.style.display=visible?'flex':'none';
        if(visible){
          shownRoomBadges++;
          item.element.style.left=`${(wp.x*.5+.5)*window.innerWidth}px`;
          item.element.style.top=`${(-wp.y*.5+.5)*window.innerHeight}px`;
        }
      });

      if (navTargetPoint && navTargetPoint.visible) {
        navTargetPoint.position.y = navTargetPoint.userData.baseY + Math.sin(clock.elapsedTime * 4) * 0.25;
      }

      renderMinimap();
      window.campusFloorExhibit?.update();
      window.campusAnniversary?.update(performance.now());
      window.campusPeople?.update(delta,clock.elapsedTime);
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });


    Object.assign(ROOMS_DB,{
      gate:{id:'gate',name:'校大門',buildingName:'正門廣場',floor:1,cat:'admin',node:'gate'},
      track:{id:'track',name:'操場及綜合球場',buildingName:'操場',floor:1,cat:'sports',node:'track-center'},
      breezeway:{id:'breezeway',name:'中央通廊',buildingName:'教學區',floor:1,cat:'special',node:'breezeway-mid'}
    });
    window.campusExplorer = {scene,camera,renderer,controls,buildings:BUILDINGS_CONFIG,rooms:ROOMS_DB,nodes:NAV_NODES,findShortestPath,navigateToRoom,clearNavigation,getNavigationState,setFloorFilter,getFloorFilter:()=>currentFloorFilter,setControlMode,manualTakeover,resetManualInput,motionBlocked,getAvatarAppearance,setAvatarAppearance,createCharacter,getPlayerPosition:()=>avatarGroup.position.clone()};
    document.body.dataset.controlMode=currentMode;
    requestAnimationFrame(animate);
    checkUrlQueryTarget();

