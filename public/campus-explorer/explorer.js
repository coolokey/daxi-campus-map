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
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd5e4de);
    scene.fog = new THREE.Fog(0xd5e4de, 260, 640);

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

    const hemiLight = new THREE.HemisphereLight(0xd9e7f0, 0x536449, 0.8);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xfff3df, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd1, 1.5);
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
      ctx.fillStyle = "#d4d8de";
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

    // 1. 五官紋理生成 (參考 media_1791355365994.png：黑亮大眼、高光眼神、腮紅粉頰、微笑小嘴)
    // 1. 五官與頭部紋理生成 (完美還原 media_1791355365994.png)
    function createHeadTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 1024; cvs.height = 512;
      const ctx = cvs.getContext("2d");

      // 溫潤白皙膚色基底
      ctx.fillStyle = "#ffdcc7";
      ctx.fillRect(0, 0, 1024, 512);

      // 後腦勺短黑髮 (兩側延伸至後方，z < 0)
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(0, 90, 260, 380);
      ctx.fillRect(764, 90, 260, 380);

      // 前額齊瀏海 (小黃帽帽沿下自然露出的黑髮弧線)
      ctx.beginPath();
      ctx.moveTo(300, 120);
      ctx.lineTo(724, 120);
      ctx.lineTo(724, 280);
      ctx.quadraticCurveTo(512, 300, 300, 280);
      ctx.closePath();
      ctx.fill();

      // 黑亮雙眼 (黑眼珠 + 白色純淨眼神高光)
      function drawEye(cx, cy) {
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 18, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        // 眼神高光
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 6, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      drawEye(420, 315);
      drawEye(604, 315);

      // 可愛粉嫩腮紅
      function drawBlush(cx, cy) {
        ctx.fillStyle = "rgba(255, 71, 87, 0.85)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 26, 22, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      drawBlush(370, 355);
      drawBlush(654, 355);

      // 可愛小嘴
      ctx.fillStyle = "#991b1b";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(494, 375, 36, 12, 6);
      else ctx.rect(494, 375, 36, 12);
      ctx.fill();

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
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(0, 0, 512, 512);

      // 兩側與肩膀淺水藍 (Sky Blue) 拼接飾片
      ctx.fillStyle = "#38bdf8";
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

    function createStudentAvatar() {
      avatarGroup = new THREE.Group();
      avatarGroup.scale.setScalar(.65);
      avatarGroup.position.set(-10, 0, 96);
      avatarAngle = Math.PI; // 預設面向校園北側 (朝前)
      avatarGroup.rotation.y = avatarAngle;
      prevAvatarPos.copy(avatarGroup.position);

      const headTex = createHeadTexture();
      const uniformTex = createUniformTorsoTexture();

      // 地面陰影
      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(0.68, 16),
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.04;
      avatarGroup.add(shadow);

      // 身體軀幹 (Box 搭配六面材質，胸前為校服貼圖)
      const torsoMatArray = [
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), // +X (水藍側邊)
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), // -X (水藍側邊)
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a }), // +Y (肩膀)
        new THREE.MeshStandardMaterial({ color: 0x1e295b }), // -Y (下擺)
        new THREE.MeshStandardMaterial({ map: uniformTex }),   // +Z (大溪國中校服正面)
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a })  // -Z (深藍背面)
      ];
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 1.15, 0.46),
        torsoMatArray
      );
      torso.position.y = 1.45;
      torso.castShadow = true;
      avatarGroup.add(torso);

      // 立領結構 (內白外深藍)
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.16, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
      );
      collar.position.y = 2.05;
      avatarGroup.add(collar);

      // 頭部 (圓形球體直接貼附五官與黑髮紋理，完全無紙面片接縫，完美還原 media_1791355365994.png)
      const headGroup = new THREE.Group();
      headGroup.position.y = 2.42;

      const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const headMat = new THREE.MeshStandardMaterial({ map: headTex });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.rotation.y = -Math.PI / 2; // 正面五官對齊局部 +Z
      headMesh.castShadow = true;
      headGroup.add(headMesh);

      // 雙側小耳朵
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdcc7 });
      const earL = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), skinMat);
      earL.position.set(-0.38, -0.02, 0);
      headGroup.add(earL);
      const earR = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), skinMat);
      earR.position.set(0.38, -0.02, 0);
      headGroup.add(earR);

      // 標誌性小黃帽 (圓球帽頂 + 前沿遮陽帽舌，完美還原 media_1791355365994.png)
      const capMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
      const capDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.395, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52),
        capMat
      );
      capDome.position.y = 0.02;
      headGroup.add(capDome);

      // 帽頂小圓鈕扣
      const capBtn = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xeab308 })
      );
      capBtn.position.y = 0.435;
      headGroup.add(capBtn);

      // 前向遮陽帽沿 (黃色弧形遮陽板，緊密貼合帽頂下緣)
      const visor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.41, 0.024, 24, 1, false, -Math.PI * 0.30, Math.PI * 0.60),
        capMat
      );
      visor.position.set(0, 0.02, 0.16);
      visor.rotation.x = 0.10;
      visor.castShadow = true;
      headGroup.add(visor);

      avatarGroup.add(headGroup);

      // 手臂結構 (左臂 / 右臂：深藍袖身＋水藍側條，膚色小臂與手掌)
      const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });

      function buildArm(isLeft) {
        const armGroup = new THREE.Group();
        const sideSign = isLeft ? -1 : 1;
        armGroup.position.set(sideSign * 0.52, 1.95, 0);

        // 短袖肩膀
        const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.115, 0.36, 12), sleeveMat);
        sleeve.position.y = -0.18;
        sleeve.castShadow = true;
        armGroup.add(sleeve);

        // 水藍色肩飾條
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.12), stripeMat);
        stripe.position.set(sideSign * 0.11, -0.18, 0);
        armGroup.add(stripe);

        // 膚色前臂
        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.44, 12), skinMat);
        forearm.position.y = -0.54;
        forearm.castShadow = true;
        armGroup.add(forearm);

        // 手掌
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 10), skinMat);
        hand.position.y = -0.78;
        hand.castShadow = true;
        armGroup.add(hand);

        return armGroup;
      }

      avatarLeftArm = buildArm(true);
      avatarGroup.add(avatarLeftArm);
      avatarRightArm = buildArm(false);
      avatarGroup.add(avatarRightArm);

      // 腿部結構 (深藍運動短褲＋側邊白條，膚色膝腿，純白運動短襪，黑底白邊運動鞋)
      const shortsMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const shoeBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

      function buildLeg(isLeft) {
        const legGroup = new THREE.Group();
        const sideSign = isLeft ? -1 : 1;
        legGroup.position.set(sideSign * 0.22, 0.9, 0);

        // 大溪國中運動短褲
        const shorts = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.145, 0.44, 12), shortsMat);
        shorts.position.y = -0.22;
        shorts.castShadow = true;
        legGroup.add(shorts);

        // 短褲外側白邊飾條 (如 media_1791355660385.png)
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.44, 0.11), whiteMat);
        stripe.position.set(sideSign * 0.145, -0.22, 0);
        legGroup.add(stripe);

        // 膚色小腿
        const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.32, 12), skinMat);
        calf.position.y = -0.52;
        calf.castShadow = true;
        legGroup.add(calf);

        // 白色學生運動襪 (純白襪筒)
        const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.115, 0.22, 12), whiteMat);
        sock.position.y = -0.68;
        sock.castShadow = true;
        legGroup.add(sock);

        // 運動鞋 (深藍黑鞋身＋白色橡膠大底，完全符合 media_1791355365994.png)
        const shoeBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.44), shoeBodyMat);
        shoeBody.position.set(0, -0.81, 0.08);
        shoeBody.castShadow = true;
        legGroup.add(shoeBody);

        const shoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.07, 0.46), whiteMat);
        shoeSole.position.set(0, -0.87, 0.08);
        legGroup.add(shoeSole);

        return legGroup;
      }

      avatarLeftLeg = buildLeg(true);
      avatarGroup.add(avatarLeftLeg);
      avatarRightLeg = buildLeg(false);
      avatarGroup.add(avatarRightLeg);

      scene.add(avatarGroup);
    }

    // Initialize 3D student avatar
    createStudentAvatar();

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
    function moveAvatarWithCollision(position, dx, dz, dy = 0) {
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy, dz) / 0.18));
      const sx = dx / steps, sz = dz / steps, sy = dy / steps;
      let blocked = false;
      for (let step = 0; step < steps; step++) {
        let y = position.y + sy;
        const followsGround = typeof window!=='undefined' && window.campusWalkWorld && dy===0 && !isJumping;
        if(followsGround)y=window.campusWalkWorld.ground({x:position.x+sx,y:position.y,z:position.z+sz});
        // Entering a high stair edge sideways cannot teleport the character upward.
        if(followsGround&&typeof CampusOutdoorPlan!=='undefined'&&(CampusOutdoorPlan.reserved(position)||CampusOutdoorPlan.reserved({x:position.x+sx,z:position.z+sz}))&&Math.abs(y-position.y)>.24){blocked=true;continue;}
        if (!checkWallCollision(position.x + sx, y, position.z)) position.x += sx;
        else if (sx !== 0) blocked = true;
        if (!checkWallCollision(position.x, y, position.z + sz)) position.z += sz;
        else if (sz !== 0) blocked = true;
        if(followsGround)y=window.campusWalkWorld.ground(position);
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
      ctx.fillText(text.replace(/\s*\(\d+F\)/, ''), 128, 32);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
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
      canvas.width = 256;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 256, 512);

      // 兩側大溪國中標誌性藍黃波浪圓圈彩繪
      for (let y = 30; y < 490; y += 75) {
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(28, y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(28, y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(228, y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(228, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // 中央金色楷書校名
      ctx.fillStyle = "#b45309";
      ctx.font = "bold 32px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      const txt = ["桃", "園", "市", "立", "大", "溪", "國", "中"];
      for (let i = 0; i < txt.length; i++) {
        ctx.fillText(txt[i], 128, 70 + i * 48);
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
      new THREE.MeshStandardMaterial({ color: 0x68805c })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 南側主幹道 (東西向車道, z=86)
    const southRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(170, 9),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    southRoad.rotation.x = -Math.PI / 2;
    southRoad.position.set(20, 0.02, 86);
    southRoad.receiveShadow = true;
    scene.add(southRoad);

    // 中央南北主車道 (直通北側, x=52)
    const centralRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 154),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
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
        new THREE.MeshStandardMaterial({ map: paverTex, color: 0xf1f5f9 })
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
        new THREE.MeshStandardMaterial({ color: 0xd63031 })
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

      // 3. 迎賓林蔭大道大王椰子樹 (Royal Palms along entrance avenue)
      function createRoyalPalmTree(px, pz) {
        const palm = new THREE.Group();
        palm.position.set(px, 0, pz);

        // 灰褐節紋環狀直立樹幹
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.45, 9.5, 12),
          new THREE.MeshStandardMaterial({ color: 0x78716c })
        );
        trunk.position.y = 4.75;
        trunk.castShadow = true;
        palm.add(trunk);

        // 頂部羽狀熱帶綠色大王椰子葉冠
        for (let i = 0; i < 9; i++) {
          const angle = (i * Math.PI * 2) / 9;
          const frond = new THREE.Mesh(
            new THREE.ConeGeometry(0.7, 4.2, 6),
            new THREE.MeshStandardMaterial({ color: 0x15803d })
          );
          frond.position.set(Math.cos(angle) * 1.8, 9.8, Math.sin(angle) * 1.8);
          frond.rotation.z = Math.cos(angle) * 0.7;
          frond.rotation.x = Math.sin(angle) * 0.7;
          palm.add(frond);
        }
        scene.add(palm);
      }

      // 迎賓車道兩側整齊排列椰子樹 (對應照片 04_入校通道與兩側椰子樹行道樹)
      [-18, 18].forEach(xOff => {
        for (let zOff = 68; zOff >= 38; zOff -= 10) {
          createRoyalPalmTree(xOff - 6, zOff);
        }
      });

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
      statueGroup.position.set(-36, 0.02, 32);

      const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.8, 0.4, 24), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      baseRing.position.y = 0.2;
      baseRing.receiveShadow = true;
      statueGroup.add(baseRing);

      const flowerBed = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.6, 24), new THREE.MeshStandardMaterial({ color: 0x2e7d32 }));
      flowerBed.position.y = 0.5;
      statueGroup.add(flowerBed);

      const base2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 2.4), new THREE.MeshStandardMaterial({ color: 0xd1d5db }));
      base2.position.y = 2.1;
      base2.castShadow = true;
      statueGroup.add(base2);

      const bronze = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 2.2, 16), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
      bronze.position.y = 4.4;
      bronze.castShadow = true;
      statueGroup.add(bronze);

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

    // 4.5 200m 操場及綜合球場 (真實照片特徵：深灰黑瀝青橡膠跑道＋清晰白標線＋足球草坪＋藍磁磚紅浪板司令台＋三面銀旗桿)
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

    // 4.7 戶外籃球場群 (依照片 04_戶外PU籃球場劃線與配色垂直鳥瞰 真實重現：天藍主場＋磚紅禁區中圈＋草綠緩衝走道＋純白專業劃線)
    function createBasketballComplex() {
      const courtGroup = new THREE.Group();
      courtGroup.position.set(12, 0.04, -38);

      // 1. 外圍與球場緩衝隔離帶：高彩度草綠色 (Lime Green Buffer)
      const greenBuffer = new THREE.Mesh(
        new THREE.PlaneGeometry(46, 34),
        new THREE.MeshStandardMaterial({ color: 0x65a30d })
      );
      greenBuffer.rotation.x = -Math.PI / 2;
      greenBuffer.receiveShadow = true;
      courtGroup.add(greenBuffer);

      // 2. 三面全場籃球場 (Offset X: -14, 0, 14)
      [-14, 0, 14].forEach(courtX => {
        // 天藍色主要活動球場面 (Vivid Ocean Blue Playing Area: 12.6m x 28m)
        const blueFloor = new THREE.Mesh(
          new THREE.PlaneGeometry(12.6, 28),
          new THREE.MeshStandardMaterial({ color: 0x0284c7 })
        );
        blueFloor.rotation.x = -Math.PI / 2;
        blueFloor.position.set(courtX, 0.01, 0);
        blueFloor.receiveShadow = true;
        courtGroup.add(blueFloor);

        // 磚紅色禁區三秒區 (Terracotta Red Key Areas: 4.8m x 5.8m on both ends)
        [-11.1, 11.1].forEach(keyZ => {
          const redKey = new THREE.Mesh(
            new THREE.PlaneGeometry(4.8, 5.8),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          redKey.rotation.x = -Math.PI / 2;
          redKey.position.set(courtX, 0.015, keyZ);
          courtGroup.add(redKey);

          // 禁區罰球半圓弧 (Free-throw circle arc)
          const ftCircle = new THREE.Mesh(
            new THREE.CircleGeometry(1.8, 24),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          ftCircle.rotation.x = -Math.PI / 2;
          ftCircle.position.set(courtX, 0.016, keyZ + (keyZ < 0 ? 2.9 : -2.9));
          courtGroup.add(ftCircle);
        });

        // 磚紅色跳球中圈 (Terracotta Red Center Jump Circle: R=1.8m)
        const centerCircle = new THREE.Mesh(
          new THREE.CircleGeometry(1.8, 32),
          new THREE.MeshStandardMaterial({ color: 0xdc2626 })
        );
        centerCircle.rotation.x = -Math.PI / 2;
        centerCircle.position.set(courtX, 0.015, 0);
        courtGroup.add(centerCircle);

        // 白色全場劃線 (Pure White Boundary Lines & Half-court Line)
        const boundaryLine = new THREE.Mesh(
          new THREE.PlaneGeometry(12.4, 27.8),
          new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        );
        boundaryLine.rotation.x = -Math.PI / 2;
        boundaryLine.position.set(courtX, 0.02, 0);
        courtGroup.add(boundaryLine);

        // 中場白線 (Half Court Line)
        const halfLine = new THREE.Mesh(
          new THREE.PlaneGeometry(12.4, 0.12),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        halfLine.rotation.x = -Math.PI / 2;
        halfLine.position.set(courtX, 0.022, 0);
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

      for (let offset of [-14, 0, 14]) {
        courtGroup.add(createHoop(offset, -14.2, 0));
        courtGroup.add(createHoop(offset, 14.2, Math.PI));
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
      const pRoof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.8, 6), new THREE.MeshStandardMaterial({ color: 0xb91c1c }));
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
    createBreezeway(-12, 32, 6, 14); // 行政前後棟中央通道
    createBreezeway(-5, 32, 8, 4);   // 行政棟通往中庭通廊
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
      const extWallMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.65 });
      const intWallMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0xd8dee9, roughness: 0.7 });
      const corridorFloorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });
      const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9, side: THREE.DoubleSide });
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
            new THREE.CylinderGeometry(4.6, 4.6, totalH + 1.8, 32),
            new THREE.MeshStandardMaterial({ color: 0xe89286 }) // 照片真實現況：粉橘紅細磁磚
          );
          tower.position.set(cfg.width / 2 - 1, (totalH + 1.8) / 2, offsetZ);
          tower.castShadow = true;
          bldGroup.add(tower);

          // 圓柱塔身 3 層樓環狀多格白色玻璃窗 (Multi-Pane Curved Panoramic Windows)
          for (let floorIdx = 1; floorIdx <= 3; floorIdx++) {
            const winBand = new THREE.Mesh(
              new THREE.CylinderGeometry(4.65, 4.65, 1.6, 32, 1, false, -Math.PI / 2, Math.PI),
              new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
            );
            winBand.position.set(cfg.width / 2 - 1, (floorIdx - 0.5) * FH, offsetZ);
            bldGroup.add(winBand);
          }

          // 塔樓底座半圓形不鏽鋼防護欄杆
          const baseRail = new THREE.Mesh(
            new THREE.CylinderGeometry(4.9, 4.9, 1.1, 24, 1, true, -Math.PI / 2, Math.PI),
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
          new THREE.CylinderGeometry(5.2, 5.2, totalH, 24, 1, false, Math.PI / 2, Math.PI),
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
          new THREE.MeshStandardMaterial({ color: cfg.roofColor })
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
          new THREE.MeshStandardMaterial({ color: cfg.roofColor })
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
      { name: "九年級棟 (縱向)", x: 2, y: 6.0, z: 28 },
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

  // 4. 行政大樓 (前棟與後棟)
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
      showToast("🧑‍🎓 大溪同學啟動自動帶路，正帶您前往目的地！");
    }

    function stopAutoWalk() {
      isAutoWalking = false;
      if(btnAutoWalk.classList.contains('walking'))btnAutoWalk.classList.remove('walking');
      const label=activeNavigationId ? "繼續帶路" : "🚶‍♂️ 自動帶路";
      if(btnAutoWalk.textContent!==label)btnAutoWalk.textContent=label;
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
        if(!actual){showToast('目前位置無可通行路徑，請先移到走廊或入口。');return;}
        pathPoints.length=0;actual.forEach(p=>pathPoints.push(new THREE.Vector3(p.x,p.y+.6,p.z)));
      }
      renderNavigationPath(pathPoints);
      activeNavigationId=roomId;

      let totalDist = 0;
      for (let i = 0; i < pathPoints.length - 1; i++) {
        totalDist += pathPoints[i].distanceTo(pathPoints[i + 1]);
      }
      const meters = Math.round(totalDist);

      document.getElementById("hud-target-name").textContent = `[${room.buildingName} ${room.floor}F] ${room.name}`;
      document.getElementById("hud-route-desc").textContent = `由當前位置 → 經由 ${room.buildingName} 走廊/樓梯至 ${room.floor} 樓`;
      document.getElementById("hud-dist-val").textContent = meters;
      document.getElementById("nav-hud").classList.add("visible");
      btnAutoWalk.textContent = "🚶‍♂️ 自動帶路";
      btnAutoWalk.classList.remove("walking");

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
        avatarGroup.rotation.y=avatarAngle;
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
      animateCameraTo(
        new THREE.Vector3(cfg.x + 36, cfg.floors * FH + 30, cfg.z + 45),
        new THREE.Vector3(cfg.x, cfg.floors * FH / 2, cfg.z)
      );
    }

    let currentFloorFilter = "all";
    function setFloorFilter(floorVal) {
      currentFloorFilter = floorVal;
      const floorBadgeEl = document.getElementById("minimap-floor-badge");
      if (floorBadgeEl) {
        floorBadgeEl.textContent = floorVal === "all" ? "1F" : floorVal + "F";
      }

      document.querySelectorAll(".floor-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.f === String(floorVal));
      });

      floorMeshes.forEach(grp => {
        if (floorVal === "all") {
          grp.visible = true;
        } else {
          grp.visible = CampusFloorExhibitModel.meshVisible(grp.userData,floorVal,BUILDINGS_CONFIG.find(b=>b.id===grp.userData.buildingId)?.floors||4);
        }
        grp.traverse(o=>{if(o!==grp&&o.userData.roof)o.visible=CampusFloorExhibitModel.meshVisible({roof:true},floorVal,BUILDINGS_CONFIG.find(b=>b.id===grp.userData.buildingId)?.floors||4)});
      });

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
    document.getElementById("btn-map-overlay").onclick = () => mapModal.classList.add("open");
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
      miniCtx.fillStyle = "#334155";
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
      miniCtx.fillStyle = "#44484b";
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
      const bbX = toMiniX(12 - 22);
      const bbZ = toMiniZ(-38 - 16);
      const bbW = 44 * (328 / 250);
      const bbH = 32 * (328 / 180);
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
        else if (cfg.id === "admin-front") miniName = "行政前棟";
        else if (cfg.id === "admin-back") miniName = "行政後棟";
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
            const building=BUILDINGS_CONFIG.find(b=>b.id===to);
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
              stopAutoWalk();showToast('前方有牆壁，帶路已停止。請沿走廊或門口通行。');break;
            }
            isMoving=true;jumpBaseY=p.y;remaining-=amount;
            if(Math.hypot(dir.x,dir.z)>1e-6){avatarAngle=Math.atan2(dir.x,dir.z);avatarGroup.rotation.y=avatarAngle;}
            if(amount<distance-1e-6)break;
          }
          autoWalkIndex++;
          if(autoWalkIndex>=currentNavPoints.length-1){
            stopAutoWalk();if(navTargetPoint)navTargetPoint.visible=false;if(navPathMesh)navPathMesh.visible=false;
            document.getElementById('nav-hud').classList.remove('visible');showToast('已抵達目的地。');
          }
        }
      }
      // 2. MANUAL KEYBOARD / DPAD CONTROLS (Camera-Relative Movement)
      else if (avatarGroup && (currentMode === "avatar" || currentMode === "firstperson")) {
        // A/D 轉向，W/S 沿人物面朝的方向前進／後退。
        avatarAngle += ((moveInput.left ? 1 : 0)-(moveInput.right ? 1 : 0))*1.9*turnSensitivityMultiplier*delta;
        avatarGroup.rotation.y=avatarAngle;
        const mobile=window.campusMobileControls;
        if(mobile&&(mobile.look.x||mobile.look.y))applyManualCameraRotation(mobile.look.x*540*delta,-mobile.look.y*350*delta);
        const forwardAmount=((moveInput.forward?1:0)-(moveInput.backward?1:0))+(mobile?.move.y||0),sideAmount=mobile?.move.x||0;
        const moveVec=new THREE.Vector3(Math.sin(avatarAngle)*forwardAmount-Math.cos(avatarAngle)*sideAmount,0,Math.cos(avatarAngle)*forwardAmount+Math.sin(avatarAngle)*sideAmount);

        if (moveVec.lengthSq() > 0.001) {
          isMoving = true;
          if(moveVec.lengthSq()>1)moveVec.normalize();
          avatarGroup.rotation.y = avatarAngle;

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

        // 人物、鏡頭與行進方向共用 heading；鳥瞰獨立操作。
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
        navTargetPoint.position.y += Math.sin(clock.getElapsedTime() * 4) * 0.015;
      }

      renderMinimap();
      window.campusFloorExhibit?.update();
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
    window.campusExplorer = {scene,camera,controls,buildings:BUILDINGS_CONFIG,rooms:ROOMS_DB,nodes:NAV_NODES,findShortestPath,navigateToRoom,setFloorFilter,setControlMode,manualTakeover,resetManualInput,motionBlocked};
    document.body.dataset.controlMode=currentMode;
    animate();
    checkUrlQueryTarget();

