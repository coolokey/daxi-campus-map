// 桃園市立大溪國中 真實版 RPG - 完整 UI 互動控制器 (RPG UI Manager)
// 管理搜尋自動補全、導航 HUD、對話系統、任務日誌、小地圖、115 平面圖彈窗、實景照片藝廊、換裝與行動端虛擬搖桿

class RpgUiManager {
  constructor(engine, data) {
    this.engine = engine;
    this.data = data;
    
    // Active Quests State
    this.questState = {
      activeQuestId: 'quest-1',
      completedQuests: {},
      questProgress: { 'quest-1': 0, 'quest-2': 0, 'quest-3': 0, 'quest-4': 0, 'quest-5': 0 }
    };

    this.typewriterTimer = null;
    this.currentDialogueNpc = null;
    
    this.bindDomElements();
    this.initEventListeners();
    this.initMinimap();
    this.updateQuestHud();
  }

  bindDomElements() {
    this.el = {
      // Top Nav
      searchInput: document.getElementById('search-input'),
      searchResults: document.getElementById('search-results'),
      btnMapOverlay: document.getElementById('btn-map-overlay'),
      btnPhotoGallery: document.getElementById('btn-photo-gallery'),
      btnHelp: document.getElementById('btn-help'),
      btnAvatar: document.getElementById('btn-avatar'),
      btnSound: document.getElementById('btn-sound'),
      btnFireworks: document.getElementById('btn-fireworks'),
      btnHome: document.getElementById('btn-home'),

      // Quick Bar
      quickBar: document.getElementById('quick-bar'),

      // Floor Selector
      floorSelector: document.getElementById('floor-selector'),
      floorBtns: document.querySelectorAll('.floor-btn'),

      // Navigation HUD
      navHud: document.getElementById('nav-hud'),
      hudTargetName: document.getElementById('hud-target-name'),
      hudRouteDesc: document.getElementById('hud-route-desc'),
      hudDistVal: document.getElementById('hud-dist-val'),
      btnAutoWalk: document.getElementById('btn-auto-walk'),
      btnCancelNav: document.getElementById('btn-cancel-nav'),

      // Minimap
      minimapCard: document.getElementById('minimap-card'),
      minimapCanvas: document.getElementById('minimap-canvas'),
      minimapFloorBadge: document.getElementById('minimap-floor-badge'),

      // Dialogue Box
      dialogueModal: document.getElementById('dialogue-modal'),
      dialoguePortrait: document.getElementById('dialogue-portrait'),
      dialogueSpeaker: document.getElementById('dialogue-speaker'),
      dialogueTitle: document.getElementById('dialogue-title'),
      dialogueText: document.getElementById('dialogue-text'),
      dialogueChoices: document.getElementById('dialogue-choices'),
      btnDialogueClose: document.getElementById('btn-dialogue-close'),

      // Modals
      mapModal: document.getElementById('campus-map-modal'),
      btnCloseMapModal: document.getElementById('btn-close-map-modal'),
      photoModal: document.getElementById('photo-modal'),
      btnClosePhotoModal: document.getElementById('btn-close-photo-modal'),
      photoGrid: document.getElementById('photo-grid'),
      helpModal: document.getElementById('help-modal'),
      btnCloseHelp: document.getElementById('btn-close-help'),
      avatarModal: document.getElementById('avatar-modal'),
      btnCloseAvatar: document.getElementById('btn-close-avatar'),
      modalBackdrop: document.getElementById('modal-backdrop'),

      // Quest Toast & Tracker
      questTracker: document.getElementById('quest-tracker'),
      questTitle: document.getElementById('quest-tracker-title'),
      questStep: document.getElementById('quest-tracker-step'),
      btnOpenQuestLog: document.getElementById('btn-open-quest-log'),
      questLogModal: document.getElementById('quest-log-modal'),
      btnCloseQuestLog: document.getElementById('btn-close-quest-log'),
      questLogList: document.getElementById('quest-log-list'),

      // Mobile D-Pad
      dpadUp: document.getElementById('dpad-up'),
      dpadDown: document.getElementById('dpad-down'),
      dpadLeft: document.getElementById('dpad-left'),
      dpadRight: document.getElementById('dpad-right'),
      dpadAction: document.getElementById('dpad-action')
    };
  }

  initEventListeners() {
    // Keyboard inputs
    window.addEventListener('keydown', e => {
      this.engine.keys[e.code] = true;
      if (e.code === 'KeyE' || e.code === 'Space') {
        if (!this.isAnyModalOpen()) {
          this.engine.interact();
        }
      }
      if (e.code === 'KeyM') {
        this.toggleMapModal();
      }
      if (e.code === 'Escape') {
        this.closeAllModals();
      }
    });

    window.addEventListener('keyup', e => {
      this.engine.keys[e.code] = false;
    });

    // Top search bar
    this.el.searchInput.addEventListener('input', () => this.handleSearch());
    this.el.searchInput.addEventListener('focus', () => this.handleSearch());
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-box')) {
        this.el.searchResults.style.display = 'none';
      }
    });

    // Quick bar venue chips
    this.el.quickBar.addEventListener('click', e => {
      const chip = e.target.closest('.venue-chip');
      if (chip && chip.dataset.to) {
        if (window.rpgAudio) window.rpgAudio.playSelect();
        this.engine.navigateTo(chip.dataset.to);
      }
    });

    // Floor Selector
    this.el.floorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.rpgAudio) window.rpgAudio.playSelect();
        this.el.floorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const f = btn.dataset.f;
        if (f === 'all') {
          if (this.engine.viewMode === 'indoor') {
            this.engine.exitBuilding();
          }
          this.el.minimapFloorBadge.textContent = '全校';
        } else {
          const floorNum = parseInt(f, 10);
          if (this.engine.viewMode === 'indoor') {
            this.engine.setFloor(floorNum);
          } else {
            // Find nearest building or default to admin-front
            this.engine.enterBuilding('admin-front', floorNum);
          }
          this.el.minimapFloorBadge.textContent = `${floorNum}F`;
        }
      });
    });

    // Navigation buttons
    this.el.btnAutoWalk.addEventListener('click', () => {
      if (window.rpgAudio) window.rpgAudio.playSelect();
      this.engine.startAutoWalk();
    });

    this.el.btnCancelNav.addEventListener('click', () => {
      if (window.rpgAudio) window.rpgAudio.playSelect();
      this.engine.cancelNavigation();
    });

    // Top Action Buttons
    this.el.btnMapOverlay.addEventListener('click', () => this.toggleMapModal());
    this.el.btnCloseMapModal.addEventListener('click', () => this.closeMapModal());

    this.el.btnPhotoGallery.addEventListener('click', () => this.openPhotoModal());
    this.el.btnClosePhotoModal.addEventListener('click', () => this.closePhotoModal());

    this.el.btnHelp.addEventListener('click', () => this.openHelpModal());
    this.el.btnCloseHelp.addEventListener('click', () => this.closeHelpModal());

    this.el.btnAvatar.addEventListener('click', () => this.openAvatarModal());
    this.el.btnCloseAvatar.addEventListener('click', () => this.closeAvatarModal());

    this.el.btnFireworks.addEventListener('click', () => {
      this.engine.triggerAnniversaryFireworks();
    });

    this.el.btnSound.addEventListener('click', () => {
      const isMuted = window.rpgAudio ? window.rpgAudio.toggleMute() : false;
      this.el.btnSound.innerHTML = isMuted ? '<span>🔇</span><span>靜音</span>' : '<span>🔊</span><span>音效</span>';
    });

    this.el.btnHome.addEventListener('click', () => {
      if (window.rpgAudio) window.rpgAudio.playSelect();
      if (this.engine.viewMode === 'indoor') {
        this.engine.exitBuilding();
      }
      this.engine.player.x = 1260;
      this.engine.player.y = 1440;
    });

    // Quest Log Modal
    this.el.btnOpenQuestLog.addEventListener('click', () => this.openQuestLogModal());
    this.el.btnCloseQuestLog.addEventListener('click', () => this.closeQuestLogModal());

    // Dialogue Modal
    this.el.btnDialogueClose.addEventListener('click', () => this.closeDialogue());

    // Backdrop click
    this.el.modalBackdrop.addEventListener('click', () => this.closeAllModals());

    // Mobile D-Pad Touch Handlers
    this.bindTouchControls();

    // Custom events from Engine
    window.addEventListener('campus:navigation-start', e => this.onNavigationStart(e.detail));
    window.addEventListener('campus:navigation-cancel', () => this.onNavigationCancel());
    window.addEventListener('campus:arrived', e => this.onNavigationArrived(e.detail));
    window.addEventListener('campus:npc-talk', e => this.openDialogue(e.detail));
    window.addEventListener('campus:outdoor-inspect', e => this.inspectOutdoorDest(e.detail));
    window.addEventListener('campus:room-inspect', e => this.inspectRoom(e.detail));
    window.addEventListener('campus:mode-change', e => this.onModeChange(e.detail));
    window.addEventListener('campus:floor-change', e => this.onFloorChange(e.detail));
  }

  bindTouchControls() {
    const bindBtn = (btn, dx, dy) => {
      if (!btn) return;
      const start = e => {
        e.preventDefault();
        this.engine.virtualInput = { x: dx, y: dy };
      };
      const end = e => {
        e.preventDefault();
        this.engine.virtualInput = { x: 0, y: 0 };
      };
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', end, { passive: false });
      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
      btn.addEventListener('mouseleave', end);
    };

    bindBtn(this.el.dpadUp, 0, -1);
    bindBtn(this.el.dpadDown, 0, 1);
    bindBtn(this.el.dpadLeft, -1, 0);
    bindBtn(this.el.dpadRight, 1, 0);

    if (this.el.dpadAction) {
      this.el.dpadAction.addEventListener('click', () => {
        this.engine.interact();
      });
    }
  }

  handleSearch() {
    const query = (this.el.searchInput.value || '').trim().toLowerCase();
    if (!query) {
      this.el.searchResults.style.display = 'none';
      return;
    }

    const matches = [];

    // Search rooms
    for (const r of this.data.rooms) {
      if (r.name.toLowerCase().includes(query) || r.spaceCode.toLowerCase().includes(query) || r.id.toLowerCase().includes(query)) {
        const b = this.data.buildings.find(bld => bld.id === r.buildingId);
        matches.push({
          id: r.id,
          title: r.name,
          subtitle: `${b ? b.title : ''} · ${r.floor}F (${r.spaceCode})`,
          type: 'room'
        });
      }
    }

    // Search buildings
    for (const b of this.data.buildings) {
      if (b.title.toLowerCase().includes(query) || b.subtitle.toLowerCase().includes(query)) {
        matches.push({
          id: b.id,
          title: `🏢 ${b.title}`,
          subtitle: b.subtitle,
          type: 'building'
        });
      }
    }

    // Search outdoor destinations
    for (const o of this.data.outdoorDestinations) {
      if (o.name.toLowerCase().includes(query) || o.description.toLowerCase().includes(query)) {
        matches.push({
          id: o.id,
          title: `🚩 ${o.name}`,
          subtitle: '校園戶外特色設施',
          type: 'outdoor'
        });
      }
    }

    if (matches.length === 0) {
      this.el.searchResults.innerHTML = '<li style="color:#94a3b8;cursor:default;">查無相符處室或地點</li>';
    } else {
      this.el.searchResults.innerHTML = matches.slice(0, 10).map(m => `
        <li data-id="${m.id}">
          <div style="font-weight:bold;color:#f8fafc;">${m.title}</div>
          <small style="color:#94a3b8;">${m.subtitle}</small>
        </li>
      `).join('');
    }

    this.el.searchResults.style.display = 'block';

    this.el.searchResults.querySelectorAll('li[data-id]').forEach(li => {
      li.addEventListener('click', () => {
        const id = li.dataset.id;
        this.el.searchInput.value = '';
        this.el.searchResults.style.display = 'none';
        if (window.rpgAudio) window.rpgAudio.playSelect();
        this.engine.navigateTo(id);
      });
    });
  }

  onNavigationStart(target) {
    this.el.navHud.classList.add('visible');
    this.el.hudTargetName.textContent = target.name;
    const floorInfo = target.isOutdoor ? '戶外景點' : `${target.buildingTitle || ''} · ${target.floor}F`;
    this.el.hudRouteDesc.textContent = `導航規劃中 · ${floorInfo}；可點擊自動帶路或自行前往`;
    this.updateNavDistance();
  }

  onNavigationCancel() {
    this.el.navHud.classList.remove('visible');
  }

  onNavigationArrived(target) {
    this.el.hudRouteDesc.textContent = '🚩 已抵達目的地！';
    this.el.hudDistVal.textContent = '0';

    // Show celebratory notification modal
    setTimeout(() => {
      alert(`🎉 恭喜抵達目的地：【${target.name}】！\n${target.roomData ? '空間固定編號：' + target.roomData.spaceCode : ''}`);
    }, 200);

    // If matching active quest, advance quest
    this.checkQuestAdvancement(target.id);
  }

  updateNavDistance() {
    if (!this.engine.navigationTarget) return;
    const target = this.engine.navigationTarget;
    const distPx = Math.hypot(target.x - this.engine.player.x, target.y - this.engine.player.y);
    // 1 guide unit ≈ 1 meter, canvas scale ~ 12 px/m
    const distMeters = Math.max(1, Math.round(distPx / 12));
    this.el.hudDistVal.textContent = String(distMeters);

    if (distPx < 30) {
      this.engine.cancelNavigation();
      window.dispatchEvent(new CustomEvent('campus:arrived', { detail: target }));
    }
  }

  onModeChange(detail) {
    if (detail.mode === 'indoor') {
      this.el.minimapFloorBadge.textContent = `${detail.floor}F`;
    } else {
      this.el.minimapFloorBadge.textContent = '全校';
    }
  }

  onFloorChange(detail) {
    this.el.minimapFloorBadge.textContent = `${detail.floor}F`;
  }

  // --- Dialogue System ---

  openDialogue(npc) {
    this.currentDialogueNpc = npc;
    this.el.dialogueModal.classList.add('open');
    this.el.dialogueSpeaker.textContent = npc.name;
    this.el.dialogueTitle.textContent = npc.title;

    // Portrait
    if (npc.portrait) {
      this.el.dialoguePortrait.src = npc.portrait;
      this.el.dialoguePortrait.style.display = 'block';
    } else {
      this.el.dialoguePortrait.style.display = 'none';
    }

    // Choices
    this.el.dialogueChoices.innerHTML = `
      <button class="choice-btn" id="btn-choice-dest">🚩 請帶我參觀校園</button>
      ${npc.questId ? `<button class="choice-btn primary" id="btn-choice-quest">📜 接取 / 回報校園任務</button>` : ''}
      <button class="choice-btn" id="btn-choice-close">再見！</button>
    `;

    document.getElementById('btn-choice-dest').addEventListener('click', () => {
      this.closeDialogue();
      this.engine.navigateTo('admin-front');
    });

    const qBtn = document.getElementById('btn-choice-quest');
    if (qBtn) {
      qBtn.addEventListener('click', () => {
        this.closeDialogue();
        this.advanceQuestByNpc(npc.id);
      });
    }

    document.getElementById('btn-choice-close').addEventListener('click', () => {
      this.closeDialogue();
    });

    // Animate text with typewriter effect
    this.typewriterText(npc.dialogue);
  }

  typewriterText(text) {
    clearInterval(this.typewriterTimer);
    this.el.dialogueText.textContent = '';
    let i = 0;

    this.typewriterTimer = setInterval(() => {
      if (i < text.length) {
        this.el.dialogueText.textContent += text[i];
        if (i % 2 === 0 && window.rpgAudio) window.rpgAudio.playDialogueBlip();
        i++;
      } else {
        clearInterval(this.typewriterTimer);
      }
    }, 28);
  }

  closeDialogue() {
    clearInterval(this.typewriterTimer);
    this.el.dialogueModal.classList.remove('open');
    this.currentDialogueNpc = null;
  }

  inspectOutdoorDest(dest) {
    this.openDialogue({
      name: dest.name,
      title: '校園戶外設施',
      portrait: dest.photo ? `../campus/campus-explorer/photos/${dest.photo}` : null,
      dialogue: dest.description
    });
  }

  inspectRoom(room) {
    const bld = this.engine.currentBuilding;
    const staffNames = (room.staff || []).map(s => `${s.name} (${s.title})`).join('、');
    const desc = `這裡是【${room.name}】（代碼：${room.spaceCode}）。` +
                 (staffNames ? `\n執掌教職員：${staffNames}。` : '') +
                 `\n位於 ${bld ? bld.title : ''} ${room.floor}F。歡迎前來洽公與學習！`;
    this.openDialogue({
      name: room.name,
      title: `${room.spaceCode} · ${room.floor}F`,
      portrait: null,
      dialogue: desc
    });
  }

  // --- Quest System ---

  advanceQuestByNpc(npcId) {
    const q = this.data.quests.find(quest => quest.id === this.questState.activeQuestId);
    if (!q) return;

    const curProgress = this.questState.questProgress[q.id] || 0;
    const curStep = q.steps[curProgress];

    if (curStep && curStep.target === npcId) {
      this.questState.questProgress[q.id] = curProgress + 1;
      if (window.rpgAudio) window.rpgAudio.playQuestFanfare();

      if (this.questState.questProgress[q.id] >= q.steps.length) {
        // Quest Completed!
        this.questState.completedQuests[q.id] = true;
        alert(`🏆 恭喜完成任務：【${q.title}】！\n榮獲獎勵：${q.reward}`);
        // Advance to next quest
        const qIdx = this.data.quests.findIndex(item => item.id === q.id);
        if (qIdx < this.data.quests.length - 1) {
          this.questState.activeQuestId = this.data.quests[qIdx + 1].id;
        } else {
          // All quests finished!
          this.engine.triggerAnniversaryFireworks();
          alert('🎖️ 令人驚嘆！您已全數完成大溪國中 115 學年度校園所有探索任務！\n獲得【大溪校園守護者】全通關總榮譽！');
        }
      } else {
        alert(`✨ 任務進度推進：${q.steps[this.questState.questProgress[q.id]].desc}`);
      }
      this.updateQuestHud();
    } else {
      alert(`此處非當前進行任務的目標對象哦！請查看右上角任務指示。`);
    }
  }

  checkQuestAdvancement(targetId) {
    const q = this.data.quests.find(quest => quest.id === this.questState.activeQuestId);
    if (!q) return;

    const curProgress = this.questState.questProgress[q.id] || 0;
    const curStep = q.steps[curProgress];
    if (curStep && (curStep.target === targetId || targetId.includes(curStep.target))) {
      this.advanceQuestByNpc(curStep.target);
    }
  }

  updateQuestHud() {
    const q = this.data.quests.find(quest => quest.id === this.questState.activeQuestId);
    if (!q) {
      this.el.questTitle.textContent = '🎉 全校探索任務已全數完成！';
      this.el.questStep.textContent = '榮登大溪校園探索達人！';
      return;
    }

    const progress = this.questState.questProgress[q.id] || 0;
    const step = q.steps[progress] || q.steps[q.steps.length - 1];

    this.el.questTitle.textContent = q.title;
    this.el.questStep.textContent = `進度 (${progress}/${q.steps.length})：${step.desc}`;
  }

  openQuestLogModal() {
    this.openModal(this.el.questLogModal);
    this.el.questLogList.innerHTML = this.data.quests.map((q, idx) => {
      const isDone = !!this.questState.completedQuests[q.id];
      const isActive = q.id === this.questState.activeQuestId;
      const statusBadge = isDone ? '✅ 已完成' : (isActive ? '⏳ 進行中' : '🔒 未開啟');
      const progress = this.questState.questProgress[q.id] || 0;

      return `
        <div class="quest-log-item ${isDone ? 'completed' : ''} ${isActive ? 'active' : ''}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h4 style="color:#fde047;margin:0 0 4px 0;">${q.title}</h4>
            <span class="quest-badge">${statusBadge}</span>
          </div>
          <p style="color:#cbd5e1;font-size:13px;margin:4px 0;">${q.description}</p>
          <div style="font-size:12px;color:#94a3b8;margin-top:6px;">
            <b>目標：</b>${q.steps.map((s, si) => `
              <span style="${si < progress || isDone ? 'text-decoration:line-through;color:#10b981;' : ''}">
                ${si + 1}. ${s.desc}
              </span>
            `).join(' → ')}
          </div>
          <div style="font-size:12px;color:#f59e0b;margin-top:6px;"><b>獎勵：</b>${q.reward}</div>
        </div>
      `;
    }).join('');
  }

  closeQuestLogModal() {
    this.closeModal(this.el.questLogModal);
  }

  // --- Minimap System ---

  initMinimap() {
    const canvas = this.el.minimapCanvas;
    canvas.width = 160;
    canvas.height = 110;
    this.minimapCtx = canvas.getContext('2d');

    // Click minimap to fast-travel
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (this.engine.viewMode === 'outdoor') {
        const wx = (clickX / rect.width) * this.engine.worldWidth;
        const wy = (clickY / rect.height) * this.engine.worldHeight;
        this.engine.player.x = wx;
        this.engine.player.y = wy;
        if (window.rpgAudio) window.rpgAudio.playSelect();
      }
    });

    setInterval(() => this.drawMinimap(), 100);
  }

  drawMinimap() {
    const ctx = this.minimapCtx;
    const w = 160;
    const h = 110;
    ctx.clearRect(0, 0, w, h);

    if (this.engine.viewMode === 'outdoor') {
      const mapImg = this.engine.images['map-realistic'];
      if (mapImg && this.engine.imageStatuses['map-realistic'] === 'ready') {
        ctx.drawImage(mapImg, 0, 0, w, h);
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, w, h);
      }

      const scaleX = w / this.engine.worldWidth;
      const scaleY = h / this.engine.worldHeight;

      // Buildings outline
      for (const b of this.data.buildings) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.35)';
        ctx.fillRect(b.bounds.x * scaleX, b.bounds.y * scaleY, b.bounds.w * scaleX, b.bounds.h * scaleY);
      }

      // NPCs
      for (const npc of this.engine.npcs) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(npc.currentX * scaleX, npc.currentY * scaleY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Target
      if (this.engine.navigationTarget) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(this.engine.navigationTarget.x * scaleX, this.engine.navigationTarget.y * scaleY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Player
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(this.engine.player.x * scaleX, this.engine.player.y * scaleY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    } else {
      // Indoor Minimap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      const bld = this.engine.currentBuilding;
      const fl = bld ? bld.floorLayouts[this.engine.currentFloor] : null;
      if (fl) {
        const sx = w / fl.width;
        const sy = h / fl.height;

        ctx.fillStyle = '#334155';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#64748b';
        ctx.fillRect(fl.corridor.x * sx, fl.corridor.y * sy, fl.corridor.w * sx, fl.corridor.h * sy);

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(this.engine.player.x * sx, this.engine.player.y * sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    this.updateNavDistance();
  }

  // --- Modals System ---

  openModal(modal) {
    this.closeAllModals();
    modal.classList.add('open');
    this.el.modalBackdrop.classList.add('open');
  }

  closeModal(modal) {
    modal.classList.remove('open');
    if (!this.isAnyModalOpen()) {
      this.el.modalBackdrop.classList.remove('open');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.rpg-modal').forEach(m => m.classList.remove('open'));
    this.el.modalBackdrop.classList.remove('open');
    this.closeDialogue();
  }

  isAnyModalOpen() {
    return !!document.querySelector('.rpg-modal.open') || this.el.dialogueModal.classList.contains('open');
  }

  toggleMapModal() {
    if (this.el.mapModal.classList.contains('open')) {
      this.closeMapModal();
    } else {
      this.openModal(this.el.mapModal);
    }
  }

  closeMapModal() {
    this.closeModal(this.el.mapModal);
  }

  openPhotoModal() {
    this.openModal(this.el.photoModal);
    this.el.photoGrid.innerHTML = this.data.photoExhibits.map(p => {
      const src = p.filename === 'reference-aerial.webp'
        ? `../campus/campus-explorer/reference-aerial.webp`
        : `../campus/campus-explorer/photos/${p.filename}`;
      return `
      <div class="photo-card glass">
        <img src="${src}" alt="${p.title}" loading="lazy">
        <div class="photo-info">
          <h4>${p.title}</h4>
          <span class="photo-date">📅 ${p.date}</span>
          <p>${p.desc}</p>
        </div>
      </div>
    `;
    }).join('');
  }

  closePhotoModal() {
    this.closeModal(this.el.photoModal);
  }

  openHelpModal() {
    this.openModal(this.el.helpModal);
  }

  closeHelpModal() {
    this.closeModal(this.el.helpModal);
  }

  openAvatarModal() {
    this.openModal(this.el.avatarModal);

    // Setup avatar options
    const options = [
      { key: 'player-male-uniform', label: '男生制服', desc: '大溪國中經典夏季學生制服' },
      { key: 'player-male-casual', label: '男生便服', desc: '活潑休閒藍色運動便服' },
      { key: 'player-female-uniform', label: '女生制服', desc: '大溪國中經典夏季女制服裙' },
      { key: 'player-female-casual', label: '女生便服', desc: '簡約清新休閒運動便服' }
    ];

    const container = document.getElementById('avatar-options-list');
    container.innerHTML = options.map(opt => `
      <div class="avatar-option-card ${this.engine.player.avatarKey === opt.key ? 'active' : ''}" data-key="${opt.key}">
        <img src="../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/${opt.key}.webp" alt="${opt.label}">
        <div>
          <b>${opt.label}</b>
          <p style="font-size:11px;color:#94a3b8;margin:2px 0 0 0;">${opt.desc}</p>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.avatar-option-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.avatar-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.engine.setAvatar(card.dataset.key);
        if (window.rpgAudio) window.rpgAudio.playSelect();
      });
    });

    // Speed slider
    const slider = document.getElementById('slider-speed');
    const label = document.getElementById('speed-display');
    slider.value = Math.round(this.engine.player.speedMultiplier * 100);
    label.textContent = `${slider.value}%`;
    slider.oninput = () => {
      label.textContent = `${slider.value}%`;
      this.engine.setSpeedMultiplier(slider.value / 100);
    };
  }

  closeAvatarModal() {
    this.closeModal(this.el.avatarModal);
  }
}

window.RpgUiManager = RpgUiManager;
