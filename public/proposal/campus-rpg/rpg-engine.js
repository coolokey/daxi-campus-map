// 桃園市立大溪國中 真實版 RPG - 核心遊戲與渲染引擎 (RPG Engine)
// 支援高解析度 Canvas、攝影機跟隨、八方向人物動畫、金色路徑尋路、自動導航、建築室內外透視、粒子煙火

class RpgEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // World Dimensions (1920 x 1080 authentic 3D campus map)
    this.worldWidth = 1920;
    this.worldHeight = 1080;
    
    // Game Mode & Location
    this.viewMode = 'outdoor'; // 'outdoor' | 'indoor'
    this.currentBuilding = null; // Building object when indoor
    this.currentFloor = 1;
    this.lastOutdoorPos = { x: 1530, y: 920 };
    
    // Player State
    this.player = {
      x: 1530,
      y: 920,
      radius: 18,
      speed: 210, // px per sec
      speedMultiplier: 1.0,
      direction: 'up-left',
      facingAngle: -Math.PI * 0.75,
      isMoving: false,
      animFrame: 0,
      animTimer: 0,
      avatarKey: 'player-male-uniform',
      name: '大溪同學'
    };
    
    // Camera Viewport
    this.camera = {
      x: 1530,
      y: 920,
      zoom: 1.0,
      targetZoom: 1.0,
      viewportWidth: 1280,
      viewportHeight: 720
    };
    
    // Input State
    this.keys = {};
    this.virtualInput = { x: 0, y: 0 };
    
    // Navigation / Route
    this.navigationTarget = null; // { id, name, x, y, buildingId, floor, isOutdoor }
    this.routeWaypoints = [];
    this.autoWalking = false;
    this.routePulseTimer = 0;
    
    // Indoor Map Canvas & Cache
    this.indoorBounds = { width: 900, height: 520 };
    
    // Fireworks System
    this.fireworks = [];
    this.fireworkTexts = [];
    
    // Texture / Image Cache
    this.images = {};
    this.imageStatuses = {};
    
    // NPCs List (cloned from CampusRpgData)
    this.npcs = [];
    
    // Nearest Interactive Target
    this.nearestTarget = null;
    
    this.lastTime = performance.now();
    this.isRunning = false;
    
    this.preloadAssets();
  }

  preloadAssets() {
    const assetList = [
      { key: 'map-realistic', src: 'assets/daxi-3d-campus-map.png', fallback: 'assets/daxi-3d-campus-map.png' },
      { key: 'player-male-uniform', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/player-male-uniform.webp', fallback: '../rpg/assets/characters/guide-rpg/player-male-uniform.png' },
      { key: 'player-female-uniform', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/player-female-uniform.webp', fallback: '../rpg/assets/characters/guide-rpg/player-female-uniform.png' },
      { key: 'player-male-casual', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/player-male-casual.webp', fallback: '../rpg/assets/characters/guide-rpg/player-male-casual.png' },
      { key: 'player-female-casual', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/player-female-casual.webp', fallback: '../rpg/assets/characters/guide-rpg/player-female-casual.png' },
      { key: 'gate-guard', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/gate-guard.webp', fallback: '../rpg/assets/characters/guide-rpg/gate-guard.png' },
      { key: 'staff-001', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-001.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-001.png' },
      { key: 'staff-004', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-004.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-004.png' },
      { key: 'staff-007', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-007.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-007.png' },
      { key: 'staff-009', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-009.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-009.png' },
      { key: 'staff-010', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-010.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-010.png' },
      { key: 'staff-016', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-016.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-016.png' },
      { key: 'staff-020', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-020.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-020.png' },
      { key: 'staff-030', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/staff-030.webp', fallback: '../rpg/assets/characters/guide-rpg/staff-030.png' },
      { key: 'student-0', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/student-0.webp', fallback: '../rpg/assets/characters/guide-rpg/student-0.png' },
      { key: 'student-1', src: '../rpg/assets/characters/guide-rpg/style-v4-webp/student-1.webp', fallback: '../rpg/assets/characters/guide-rpg/student-1.png' }
    ];

    assetList.forEach(asset => {
      const img = new Image();
      this.imageStatuses[asset.key] = 'loading';
      img.onload = () => {
        this.images[asset.key] = img;
        this.imageStatuses[asset.key] = 'ready';
      };
      img.onerror = () => {
        if (asset.fallback && img.src !== asset.fallback) {
          img.src = asset.fallback;
        } else {
          this.imageStatuses[asset.key] = 'error';
        }
      };
      img.src = asset.src;
    });
  }

  init(data) {
    this.data = data;
    if (data.worldBounds) {
      this.worldWidth = data.worldBounds.width;
      this.worldHeight = data.worldBounds.height;
    }
    if (data.spawnPoint) {
      this.player.x = data.spawnPoint.x;
      this.player.y = data.spawnPoint.y;
      this.camera.x = data.spawnPoint.x;
      this.camera.y = data.spawnPoint.y;
      this.lastOutdoorPos = { x: data.spawnPoint.x, y: data.spawnPoint.y };
    }
    this.npcs = (data.npcs || []).map(npc => ({
      ...npc,
      currentX: npc.x,
      currentY: npc.y,
      originX: npc.x,
      originY: npc.y,
      direction: 'down',
      wanderTimer: Math.random() * 3,
      wanderTarget: null
    }));

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.start();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.camera.viewportWidth = w;
    this.camera.viewportHeight = h;

    this.ctx.scale(dpr, dpr);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  loop(currentTime) {
    if (!this.isRunning) return;
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame(t => this.loop(t));
  }

  update(dt) {
    this.updatePlayerMovement(dt);
    this.updateCamera(dt);
    this.updateNpcs(dt);
    this.updateNavigation(dt);
    this.updateFireworks(dt);
    this.checkInteractions();
  }

  setAvatar(key) {
    this.player.avatarKey = key;
  }

  setSpeedMultiplier(mult) {
    this.player.speedMultiplier = mult;
  }

  updatePlayerMovement(dt) {
    let dx = 0;
    let dy = 0;

    if (this.autoWalking && this.routeWaypoints.length > 0) {
      // Auto-walk along current route
      const wp = this.routeWaypoints[0];
      const dist = Math.hypot(wp.x - this.player.x, wp.y - this.player.y);
      if (dist < 12) {
        this.routeWaypoints.shift();
        if (this.routeWaypoints.length === 0) {
          this.autoWalking = false;
          window.dispatchEvent(new CustomEvent('campus:arrived', { detail: this.navigationTarget }));
          if (window.rpgAudio) window.rpgAudio.playQuestFanfare();
        }
      } else {
        dx = (wp.x - this.player.x) / dist;
        dy = (wp.y - this.player.y) / dist;
      }
    } else {
      // Manual controls
      if (this.keys['KeyW'] || this.keys['ArrowUp']) dy -= 1;
      if (this.keys['KeyS'] || this.keys['ArrowDown']) dy += 1;
      if (this.keys['KeyA'] || this.keys['ArrowLeft']) dx -= 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight']) dx += 1;

      // Virtual D-pad / Joystick input
      if (Math.hypot(this.virtualInput.x, this.virtualInput.y) > 0.1) {
        dx = this.virtualInput.x;
        dy = this.virtualInput.y;
      }

      // Interrupt auto-walking if manual input
      if (dx !== 0 || dy !== 0) {
        this.autoWalking = false;
      }
    }

    const moving = dx !== 0 || dy !== 0;
    this.player.isMoving = moving;

    if (moving) {
      // Normalize speed
      const len = Math.hypot(dx, dy);
      const ndx = dx / len;
      const ndy = dy / len;

      let speed = this.player.speed * this.player.speedMultiplier;
      if (this.keys['ShiftLeft'] || this.keys['ShiftRight']) {
        speed *= 1.45; // Run
      }

      const nextX = this.player.x + ndx * speed * dt;
      const nextY = this.player.y + ndy * speed * dt;

      // Determine 8-directional facing
      this.player.direction = this.getDirectionName(ndx, ndy);
      this.player.facingAngle = Math.atan2(ndy, ndx);

      // Check collision
      if (this.viewMode === 'outdoor') {
        const bounds = { minX: 40, maxX: this.worldWidth - 40, minY: 40, maxY: this.worldHeight - 40 };
        const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, nextX));
        const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, nextY));

        if (!this.isOutdoorBlocked(clampedX, clampedY)) {
          this.player.x = clampedX;
          this.player.y = clampedY;
        } else if (!this.isOutdoorBlocked(clampedX, this.player.y)) {
          this.player.x = clampedX;
        } else if (!this.isOutdoorBlocked(this.player.x, clampedY)) {
          this.player.y = clampedY;
        }
      } else {
        // Indoor bounds
        const bld = this.currentBuilding;
        const fl = bld ? bld.floorLayouts[this.currentFloor] : null;
        const maxW = fl ? fl.width : 900;
        const maxH = fl ? fl.height : 520;

        const clampedX = Math.max(30, Math.min(maxW - 30, nextX));
        const clampedY = Math.max(30, Math.min(maxH - 30, nextY));

        this.player.x = clampedX;
        this.player.y = clampedY;
      }

      // Animation cycle & footstep audio
      this.player.animTimer += dt * (speed / 120);
      this.player.animFrame = Math.floor(this.player.animTimer % 3);

      if (window.rpgAudio) {
        window.rpgAudio.playFootstep();
      }
    } else {
      this.player.animFrame = 0; // idle pose
    }
  }

  getDirectionName(dx, dy) {
    const angle = Math.atan2(dy, dx);
    const octant = Math.round((8 * angle) / (2 * Math.PI) + 8) % 8;
    // octant: 0: right, 1: down-right, 2: down, 3: down-left, 4: left, 5: up-left, 6: up, 7: up-right
    const dirs = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'];
    return dirs[octant] || 'down';
  }

  isOutdoorBlocked(x, y) {
    // Map edges
    if (x < 50 || x > 1870 || y < 60 || y > 1040) {
      return true;
    }

    // Check against building footprints (unless at entrance door)
    for (const b of this.data.buildings) {
      const bx = b.bounds.x;
      const by = b.bounds.y;
      const bw = b.bounds.w;
      const bh = b.bounds.h;

      // Allow walking into entrance zone
      const entDist = Math.hypot(x - b.entrance.x, y - b.entrance.y);
      if (entDist < 42) continue;

      if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
        return true;
      }
    }

    return false;
  }

  updateCamera(dt) {
    const targetX = this.player.x;
    const targetY = this.player.y;

    // Smooth camera damping
    this.camera.x += (targetX - this.camera.x) * Math.min(dt * 8, 1);
    this.camera.y += (targetY - this.camera.y) * Math.min(dt * 8, 1);

    // Clamp camera within world bounds in outdoor mode
    if (this.viewMode === 'outdoor') {
      const halfW = (this.camera.viewportWidth / 2) / this.camera.zoom;
      const halfH = (this.camera.viewportHeight / 2) / this.camera.zoom;

      if (this.worldWidth > halfW * 2) {
        this.camera.x = Math.max(halfW, Math.min(this.worldWidth - halfW, this.camera.x));
      }
      if (this.worldHeight > halfH * 2) {
        this.camera.y = Math.max(halfH, Math.min(this.worldHeight - halfH, this.camera.y));
      }
    }
  }

  updateNpcs(dt) {
    this.npcs.forEach(npc => {
      if (npc.wander) {
        npc.wanderTimer -= dt;
        if (npc.wanderTimer <= 0) {
          npc.wanderTimer = 2 + Math.random() * 4;
          const range = 60;
          npc.wanderTarget = {
            x: npc.originX + (Math.random() * 2 - 1) * range,
            y: npc.originY + (Math.random() * 2 - 1) * range
          };
        }

        if (npc.wanderTarget) {
          const ddx = npc.wanderTarget.x - npc.currentX;
          const ddy = npc.wanderTarget.y - npc.currentY;
          const dist = Math.hypot(ddx, ddy);
          if (dist > 4) {
            const step = Math.min(dist, 40 * dt);
            npc.currentX += (ddx / dist) * step;
            npc.currentY += (ddy / dist) * step;
            npc.direction = this.getDirectionName(ddx, ddy);
          } else {
            npc.wanderTarget = null;
          }
        }
      }
    });
  }

  updateNavigation(dt) {
    this.routePulseTimer += dt * 3.5;
  }

  updateFireworks(dt) {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const p = this.fireworks[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      p.alpha -= p.fadeSpeed * dt;
      if (p.alpha <= 0) {
        this.fireworks.splice(i, 1);
      }
    }

    for (let i = this.fireworkTexts.length - 1; i >= 0; i--) {
      const ft = this.fireworkTexts[i];
      ft.alpha -= dt * 0.45;
      ft.y -= dt * 15;
      if (ft.alpha <= 0) {
        this.fireworkTexts.splice(i, 1);
      }
    }
  }

  checkInteractions() {
    this.nearestTarget = null;

    if (this.viewMode === 'outdoor') {
      // Check building entrances
      for (const b of this.data.buildings) {
        const dist = Math.hypot(this.player.x - b.entrance.x, this.player.y - b.entrance.y);
        if (dist < 48) {
          this.nearestTarget = {
            type: 'building-entrance',
            data: b,
            prompt: `按 E 進入 ${b.title.split(' ')[0]}`
          };
          return;
        }
      }

      // Check outdoor NPCs
      for (const npc of this.npcs) {
        const dist = Math.hypot(this.player.x - npc.currentX, this.player.y - npc.currentY);
        if (dist < 56) {
          this.nearestTarget = {
            type: 'npc',
            data: npc,
            prompt: `按 E 與 ${npc.name} (${npc.title}) 交談`
          };
          return;
        }
      }

      // Check outdoor destinations
      for (const dest of this.data.outdoorDestinations) {
        const dist = Math.hypot(this.player.x - dest.anchor.x, this.player.y - dest.anchor.y);
        if (dist < 60) {
          this.nearestTarget = {
            type: 'outdoor-dest',
            data: dest,
            prompt: `按 E 探索 ${dest.name}`
          };
          return;
        }
      }
    } else {
      // Indoor: Check rooms and exit stairs
      const bld = this.currentBuilding;
      const fl = bld ? bld.floorLayouts[this.currentFloor] : null;
      if (!fl) return;

      // Check exit door
      const exitDist = Math.hypot(this.player.x - fl.entrance.x, this.player.y - fl.entrance.y);
      if (exitDist < 44) {
        this.nearestTarget = {
          type: 'building-exit',
          data: bld,
          prompt: `按 E 返回校園室外`
        };
        return;
      }

      // Check stairs
      for (const st of fl.stairs) {
        const stDist = Math.hypot(this.player.x - st.x, this.player.y - st.y);
        if (stDist < 50) {
          this.nearestTarget = {
            type: 'indoor-stairs',
            data: st,
            prompt: `按 E 切換樓層 (目前 ${this.currentFloor}F)`
          };
          return;
        }
      }

      // Check room doors
      for (const rm of fl.rooms) {
        const rDist = Math.hypot(this.player.x - rm.door.x, this.player.y - rm.door.y);
        if (rDist < 46) {
          this.nearestTarget = {
            type: 'room',
            data: rm,
            prompt: `按 E 查看 ${rm.name}`
          };
          return;
        }
      }
    }
  }

  interact() {
    if (!this.nearestTarget) return;

    if (window.rpgAudio) window.rpgAudio.playSelect();

    const t = this.nearestTarget;
    if (t.type === 'building-entrance') {
      this.enterBuilding(t.data.id, 1);
    } else if (t.type === 'building-exit') {
      this.exitBuilding();
    } else if (t.type === 'indoor-stairs') {
      this.cycleFloor();
    } else if (t.type === 'npc') {
      window.dispatchEvent(new CustomEvent('campus:npc-talk', { detail: t.data }));
    } else if (t.type === 'outdoor-dest') {
      window.dispatchEvent(new CustomEvent('campus:outdoor-inspect', { detail: t.data }));
    } else if (t.type === 'room') {
      window.dispatchEvent(new CustomEvent('campus:room-inspect', { detail: t.data }));
    }
  }

  enterBuilding(buildingId, floor = 1) {
    const bld = this.data.buildings.find(b => b.id === buildingId);
    if (!bld) return;

    if (this.viewMode === 'outdoor') {
      this.lastOutdoorPos = { x: this.player.x, y: this.player.y };
    }

    this.viewMode = 'indoor';
    this.currentBuilding = bld;
    this.currentFloor = floor;

    const fl = bld.floorLayouts[floor];
    if (fl) {
      this.player.x = fl.entrance.x;
      this.player.y = fl.entrance.y;
    }

    window.dispatchEvent(new CustomEvent('campus:mode-change', {
      detail: { mode: 'indoor', building: bld, floor: this.currentFloor }
    }));
  }

  exitBuilding() {
    this.viewMode = 'outdoor';
    this.player.x = this.lastOutdoorPos.x;
    this.player.y = this.lastOutdoorPos.y;
    this.currentBuilding = null;

    window.dispatchEvent(new CustomEvent('campus:mode-change', {
      detail: { mode: 'outdoor', building: null, floor: null }
    }));
  }

  setFloor(floorNum) {
    if (!this.currentBuilding) return;
    if (!this.currentBuilding.floors.includes(floorNum)) return;
    this.currentFloor = floorNum;

    const fl = this.currentBuilding.floorLayouts[floorNum];
    if (fl) {
      this.player.x = fl.entrance.x;
      this.player.y = fl.entrance.y;
    }

    window.dispatchEvent(new CustomEvent('campus:floor-change', {
      detail: { floor: this.currentFloor }
    }));
  }

  cycleFloor() {
    if (!this.currentBuilding) return;
    const floors = this.currentBuilding.floors;
    const idx = floors.indexOf(this.currentFloor);
    const nextFloor = floors[(idx + 1) % floors.length];
    this.setFloor(nextFloor);
  }

  navigateTo(destId) {
    // Look up destination
    let target = null;
    let bld = null;
    let room = this.data.rooms.find(r => r.id === destId || r.spaceCode.toLowerCase() === destId.toLowerCase());
    
    if (room) {
      bld = this.data.buildings.find(b => b.id === room.buildingId);
      target = {
        id: room.id,
        name: room.name,
        buildingId: room.buildingId,
        buildingTitle: bld ? bld.title : '',
        floor: room.floor,
        x: bld ? bld.entrance.x : 1260,
        y: bld ? bld.entrance.y : 1200,
        isOutdoor: false,
        roomData: room
      };
    } else {
      const bldMatch = this.data.buildings.find(b => b.id === destId);
      if (bldMatch) {
        target = {
          id: bldMatch.id,
          name: bldMatch.title,
          buildingId: bldMatch.id,
          buildingTitle: bldMatch.title,
          floor: 1,
          x: bldMatch.entrance.x,
          y: bldMatch.entrance.y,
          isOutdoor: false
        };
      } else {
        const outMatch = this.data.outdoorDestinations.find(o => o.id === destId || o.code === destId);
        if (outMatch) {
          target = {
            id: outMatch.id,
            name: outMatch.name,
            x: outMatch.anchor.x,
            y: outMatch.anchor.y,
            isOutdoor: true,
            outdoorData: outMatch
          };
        }
      }
    }

    if (!target) return;

    this.navigationTarget = target;

    // Calculate path waypoints
    if (this.viewMode === 'outdoor') {
      this.routeWaypoints = this.calculateOutdoorPath(
        { x: this.player.x, y: this.player.y },
        { x: target.x, y: target.y }
      );
    } else {
      this.routeWaypoints = [{ x: target.x, y: target.y }];
    }

    window.dispatchEvent(new CustomEvent('campus:navigation-start', { detail: this.navigationTarget }));
  }

  calculateOutdoorPath(start, goal) {
    // Generate simple obstacle-avoiding campus walkway waypoints
    const points = [{ x: start.x, y: start.y }];
    const mainAvenueX = 1260;

    // If far apart horizontally, route through central concourse/avenue
    if (Math.abs(start.x - goal.x) > 300) {
      const midY = (start.y + goal.y) / 2;
      points.push({ x: start.x, y: midY });
      points.push({ x: goal.x, y: midY });
    }

    points.push({ x: goal.x, y: goal.y });
    return points;
  }

  startAutoWalk() {
    if (!this.navigationTarget) return;
    this.autoWalking = true;
  }

  cancelNavigation() {
    this.navigationTarget = null;
    this.routeWaypoints = [];
    this.autoWalking = false;
    window.dispatchEvent(new CustomEvent('campus:navigation-cancel'));
  }

  triggerAnniversaryFireworks() {
    if (window.rpgAudio) window.rpgAudio.playFireworkBurst();

    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#fde047'];
    const burstCount = 6;

    for (let b = 0; b < burstCount; b++) {
      const cx = 580 + (Math.random() * 2 - 1) * 220;
      const cy = 480 + (Math.random() * 2 - 1) * 160;

      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 70 + Math.random() * 190;
        this.fireworks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 48,
          alpha: 1.0,
          fadeSpeed: 0.65 + Math.random() * 0.45,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2.5 + Math.random() * 2.5
        });
      }
    }

    const messages = ['🎉 桃園市立大溪國中 🎉', '✨ 115 學年度校慶誌慶 ✨', '🏆 自強不息 · 敦品勵學 🏆'];
    messages.forEach((msg, idx) => {
      this.fireworkTexts.push({
        text: msg,
        x: 580,
        y: 420 + idx * 42,
        alpha: 1.0
      });
    });
  }

  // --- Rendering Functions ---

  render() {
    const ctx = this.ctx;
    const w = this.camera.viewportWidth;
    const h = this.camera.viewportHeight;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    // Center camera on player
    ctx.translate(w / 2, h / 2);
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.x, -this.camera.y);

    if (this.viewMode === 'outdoor') {
      this.renderOutdoorWorld();
    } else {
      this.renderIndoorWorld();
    }

    // Render Navigation Route
    if (this.navigationTarget) {
      this.renderNavigationRoute();
    }

    // Render Fireworks
    this.renderFireworks();

    ctx.restore();
  }

  renderOutdoorWorld() {
    const ctx = this.ctx;

    // 1. Base Map (Photo-realistic webp map or high-detail vector fallback)
    const baseImg = this.images['map-realistic'];
    if (baseImg && this.imageStatuses['map-realistic'] === 'ready') {
      ctx.drawImage(baseImg, 0, 0, this.worldWidth, this.worldHeight);
    } else {
      // High detail fallback vector rendering
      this.renderProceduralOutdoorMap();
    }

    // 2. Outdoor Landmark Labels & Banners
    this.renderOutdoorLandmarks();

    // 3. Buildings Footprints, Roof Highlights & Name Badges
    this.renderBuildingBadges();

    // 4. Render NPCs
    this.renderNpcs();

    // 5. Render Player
    this.renderCharacter(this.player.x, this.player.y, this.player.direction, this.player.animFrame, this.player.avatarKey, this.player.name, true);

    // 6. Interaction Prompts
    if (this.nearestTarget) {
      this.renderInteractionBadge(this.nearestTarget.prompt);
    }
  }

  renderProceduralOutdoorMap() {
    const ctx = this.ctx;

    // Lawn Base
    ctx.fillStyle = '#4c7c4f';
    ctx.fillRect(0, 0, this.worldWidth, this.worldHeight);

    // Campus Main Walkway & Courtyards
    ctx.fillStyle = '#b7b4a7';
    ctx.fillRect(1150, 200, 240, 1400); // Main Avenue
    ctx.fillRect(1000, 750, 900, 120);  // Central Concourse

    // 200m PU Athletic Track (Red)
    ctx.fillStyle = '#c24136';
    ctx.beginPath();
    ctx.ellipse(580, 550, 310, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner Green Turf
    ctx.fillStyle = '#3e8945';
    ctx.beginPath();
    ctx.ellipse(580, 550, 220, 140, 0, 0, Math.PI * 2);
    ctx.fill();

    // Track White Lane Markings
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (const r of [235, 255, 275, 295]) {
      ctx.beginPath();
      ctx.ellipse(580, 550, r, r * 0.71, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Grandstand (司令台)
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(670, 720, 140, 60);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(665, 715, 150, 12); // Roof trim
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('🏫 操場司令台', 740, 755);

    // Basketball Courts
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(1454, 244, 419, 392);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(1470, 260, 180, 350);
    ctx.strokeRect(1670, 260, 180, 350);
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 15px system-ui';
    ctx.fillText('🏀 北側雙籃球場', 1660, 440);

    // Volleyball Court
    ctx.fillStyle = '#15803d';
    ctx.fillRect(1259, 249, 197, 384);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(1275, 270, 165, 340);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🏐 排球場', 1357, 440);

    // Palm Avenue Trees
    for (let y = 1350; y <= 1520; y += 45) {
      for (const x of [1180, 1340]) {
        ctx.fillStyle = '#166534';
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  renderOutdoorLandmarks() {
    const ctx = this.ctx;
    ctx.textAlign = 'center';

    // Render pins for outdoor destinations
    if (this.data && this.data.outdoorDestinations) {
      for (const dest of this.data.outdoorDestinations) {
        const ax = dest.anchor.x;
        const ay = dest.anchor.y;

        // Draw pin icon and label
        ctx.font = 'bold 11px system-ui';
        const label = dest.name;
        const tw = ctx.measureText(label).width + 20;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.fillRect(ax - tw / 2, ay - 14, tw, 24);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(ax - tw / 2, ay - 14, tw, 24);

        // Pin marker dot
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(ax, ay + 14, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e0f2fe';
        ctx.fillText(label, ax, ay + 2);
      }
    }
  }

  renderBuildingBadges() {
    const ctx = this.ctx;

    for (const b of this.data.buildings) {
      const bx = b.bounds.x;
      const by = b.bounds.y;
      const bw = b.bounds.w;
      const bh = b.bounds.h;

      // Draw subtle architectural roof overlay if vector fallback
      if (!this.images['map-realistic'] || this.imageStatuses['map-realistic'] !== 'ready') {
        ctx.fillStyle = b.roofColor || '#873e39';
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(bx, by, bw, bh);
      }

      // Building Entrance Indicator
      const ex = b.entrance.x;
      const ey = b.entrance.y;
      
      // Entrance glowing ring
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.beginPath();
      ctx.arc(ex, ey, 12 + Math.sin(this.routePulseTimer * 2) * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(ex, ey, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Building Name Badge
      const cx = bx + bw / 2;
      const cy = by + bh / 2;
      const tagW = Math.max(110, Math.min(bw + 10, 180));
      const tagH = 34;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(cx - tagW / 2, cy - tagH / 2, tagW, tagH);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(cx - tagW / 2, cy - tagH / 2, tagW, tagH);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px system-ui';
      ctx.fillText(b.title.split(' ')[0], cx, cy - 2, tagW - 8);

      ctx.fillStyle = '#fde68a';
      ctx.font = '10px system-ui';
      ctx.fillText(b.subtitle.split('·')[0], cx, cy + 11, tagW - 8);
    }
  }

  renderNpcs() {
    for (const npc of this.npcs) {
      this.renderCharacter(
        npc.currentX,
        npc.currentY,
        npc.direction || 'down',
        0,
        npc.sprite || 'staff-001',
        `${npc.name} (${npc.title})`,
        false
      );
    }
  }

  renderCharacter(x, y, direction, frame, spriteKey, name, isPlayer) {
    const ctx = this.ctx;
    const img = this.images[spriteKey];

    ctx.save();
    ctx.translate(x, y);

    // Drop Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 15, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    let drawnFromSprite = false;

    if (img && this.imageStatuses[spriteKey] === 'ready') {
      try {
        // Sprite sheet: 8 columns (directions), 3 rows (poses)
        // tile: 64 x 88
        const dirIndexMap = {
          'down': 0, 'down-left': 1, 'left': 2, 'up-left': 3,
          'up': 4, 'up-right': 5, 'right': 6, 'down-right': 7
        };
        const col = dirIndexMap[direction] ?? 0;
        const row = Math.min(2, Math.max(0, frame));

        const tileW = 64;
        const tileH = 88;
        const drawW = 44;
        const drawH = 60;

        ctx.drawImage(
          img,
          col * tileW, row * tileH, tileW, tileH,
          -drawW / 2, -drawH + 16, drawW, drawH
        );
        drawnFromSprite = true;
      } catch (e) {}
    }

    if (!drawnFromSprite) {
      // Fallback stylized vector token
      const bodyColor = isPlayer ? '#3b82f6' : (name.includes('警衛') ? '#d97706' : '#10b981');
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.arc(0, -4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Facing Nose/Dot
      const noseDist = 13;
      const nx = Math.cos(this.player.facingAngle || 0) * noseDist;
      const ny = Math.sin(this.player.facingAngle || 0) * noseDist;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(nx, -4 + ny, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overhead Nametag Badge
    const tagText = isPlayer ? `🧑‍🎓 ${name}` : name;
    ctx.font = 'bold 11px system-ui';
    const tw = ctx.measureText(tagText).width + 12;
    ctx.fillStyle = isPlayer ? 'rgba(30, 58, 138, 0.92)' : 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(-tw / 2, -68, tw, 20);
    ctx.strokeStyle = isPlayer ? '#fbbf24' : '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(-tw / 2, -68, tw, 20);

    ctx.fillStyle = isPlayer ? '#fef08a' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(tagText, 0, -54);

    ctx.restore();
  }

  renderIndoorWorld() {
    const ctx = this.ctx;
    const bld = this.currentBuilding;
    if (!bld) return;

    const floor = this.currentFloor;
    const fl = bld.floorLayouts[floor];
    if (!fl) return;

    const w = fl.width;
    const h = fl.height;

    // Indoor Room Backdrop & Walls
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-100, -100, w + 200, h + 200);

    // Floor Base (Polished Terrazzo / Wood Tile)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, w, h);

    // Corridor
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(fl.corridor.x, fl.corridor.y, fl.corridor.w, fl.corridor.h);

    // Corridor Label
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`🏢 ${bld.title} · ${floor}F 穿廊通道`, fl.corridor.x + fl.corridor.w / 2, fl.corridor.y + fl.corridor.h / 2 + 5);

    // Exit Door
    ctx.fillStyle = '#15803d';
    ctx.fillRect(fl.entrance.x - 40, fl.entrance.y - 15, 80, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui';
    ctx.fillText('🚪 出口 (回室外)', fl.entrance.x, fl.entrance.y + 5);

    // Stairs to other floors
    for (const st of fl.stairs) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(st.x - 30, st.y - 20, 60, 40);
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText('🪜 樓梯間', st.x, st.y + 4);
    }

    // Rooms
    for (const rm of fl.rooms) {
      // Room floor & walls
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(rm.x, rm.y, rm.w, rm.h);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(rm.x, rm.y, rm.w, rm.h);

      // Blackboard on back wall
      ctx.fillStyle = '#164e63';
      ctx.fillRect(rm.x + 20, rm.y + 8, rm.w - 40, 14);

      // Desks in room
      ctx.fillStyle = '#d97706';
      for (let dx = rm.x + 25; dx < rm.x + rm.w - 30; dx += 45) {
        for (let dy = rm.y + 40; dy < rm.y + rm.h - 35; dy += 35) {
          ctx.fillRect(dx, dy, 26, 16);
        }
      }

      // Door threshold
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(rm.door.x - 18, rm.door.y - 5, 36, 10);

      // Room Nameplate
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(rm.x + rm.w / 2 - 65, rm.y + rm.h / 2 - 16, 130, 32);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1;
      ctx.strokeRect(rm.x + rm.w / 2 - 65, rm.y + rm.h / 2 - 16, 130, 32);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(rm.name, rm.x + rm.w / 2, rm.y + rm.h / 2 - 1, 120);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui';
      ctx.fillText(rm.spaceCode, rm.x + rm.w / 2, rm.y + rm.h / 2 + 12);
    }

    // Render Player inside building
    this.renderCharacter(this.player.x, this.player.y, this.player.direction, this.player.animFrame, this.player.avatarKey, this.player.name, true);

    // Interaction Prompts inside building
    if (this.nearestTarget) {
      this.renderInteractionBadge(this.nearestTarget.prompt);
    }
  }

  renderNavigationRoute() {
    const ctx = this.ctx;
    const target = this.navigationTarget;
    if (!target) return;

    ctx.save();

    // Pulse Ring around Goal
    const pulse = 18 + Math.sin(this.routePulseTimer) * 6;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(target.x, target.y, pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(target.x, target.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Golden Dotted Route Line
    if (this.routeWaypoints.length > 0) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 5;
      ctx.setLineDash([12, 8]);
      ctx.lineDashOffset = -this.routePulseTimer * 12;

      ctx.beginPath();
      ctx.moveTo(this.player.x, this.player.y);
      for (const wp of this.routeWaypoints) {
        ctx.lineTo(wp.x, wp.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }

  renderFireworks() {
    const ctx = this.ctx;

    for (const p of this.fireworks) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;

    for (const ft of this.fireworkTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.font = 'bold 22px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  renderInteractionBadge(promptText) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.player.x, this.player.y - 88);

    ctx.font = 'bold 13px system-ui';
    const tw = ctx.measureText(promptText).width + 24;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(-tw / 2, -14, tw, 28);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(-tw / 2, -14, tw, 28);

    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.fillText(promptText, 0, 5);

    ctx.restore();
  }
}

window.RpgEngine = RpgEngine;
