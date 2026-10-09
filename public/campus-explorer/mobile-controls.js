(function () {
  'use strict';
  if (window.campusMobileControls) return;
  const math = window.CampusMobileControlMath;
  const controls = { move: { x: 0, y: 0 }, look: { x: 0, y: 0 }, reset };
  const dialogSelector = 'dialog[open], [role="dialog"].open, .avatar-setting-modal.open, #help-modal.open, #campus-map-modal.open, #reference-panel.open';
  const root = document.createElement('section');
  root.id = 'campus-mobile-controls';
  root.setAttribute('aria-label', '手機步行控制');
  root.innerHTML = '<p id="mobile-control-instructions" class="mobile-control-sr">左搖桿向上前進、向下後退、左右側移；右搖桿左右轉頭、上下調整視線。可同時使用兩指，放開即停止。鍵盤可使用 W、A、S、D 或方向鍵。</p>';
  document.body.append(root);
  const sticks = [];
  window.campusMobileControls = controls;

  function available() {
    return ['avatar', 'firstperson'].includes(document.body.dataset.controlMode) && !(window.campusExplorer?.motionBlocked?.() ?? document.querySelector(dialogSelector));
  }
  function paint(stick, x, y) {
    stick.el.dataset.x = String(controls[stick.kind].x);
    stick.el.dataset.y = String(controls[stick.kind].y);
    stick.el.dataset.active = String(stick.pointer !== null);
    stick.thumb.style.transform = `translate(${x}px, ${y}px)`;
  }
  function clear(stick) {
    const pointer = stick.pointer;
    // Clear ownership before release: lostpointercapture can fire synchronously.
    stick.pointer = null;
    stick.takenOver = false;
    controls[stick.kind].x = controls[stick.kind].y = 0;
    paint(stick, 0, 0);
    if (pointer !== null) {
      try { stick.el.releasePointerCapture(pointer); } catch (_) { /* Capture may already be lost. */ }
    }
  }
  function reset() { sticks.forEach(clear); }
  function update(stick, event) {
    if (!available()) { reset(); return; }
    const rect = stick.el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2), dy = event.clientY - (rect.top + rect.height / 2);
    const axis = math.vector(dx, dy);
    Object.assign(controls[stick.kind], axis);
    const length = Math.hypot(dx, dy), scale = length > math.radius ? math.radius / length : 1;
    paint(stick, dx * scale, dy * scale);
    if (!stick.takenOver && (axis.x !== 0 || axis.y !== 0)) {
      stick.takenOver = true;
      window.campusExplorer?.manualTakeover();
    }
  }
  for (const [kind, label, directions] of [['move', '移動', '前進／側移'], ['look', '轉頭', '左右／上下']]) {
    const group = document.createElement('div');
    group.className = `mobile-stick-group mobile-stick-${kind}`;
    const el = document.createElement('div');
    el.id = `mobile-${kind}-stick`;
    el.className = 'mobile-stick';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', `${label}搖桿`);
    el.setAttribute('aria-describedby', 'mobile-control-instructions');
    el.innerHTML = '<span class="mobile-stick-cross" aria-hidden="true"></span><span class="mobile-stick-thumb" aria-hidden="true"></span>';
    const caption = document.createElement('div');
    caption.className = 'mobile-stick-caption';
    caption.innerHTML = `<strong>${label}</strong><span>${directions}</span>`;
    group.append(el, caption);
    root.append(group);
    const stick = { kind, el, thumb: el.querySelector('.mobile-stick-thumb'), pointer: null, takenOver: false };
    sticks.push(stick);
    paint(stick, 0, 0);
    el.addEventListener('pointerdown', event => {
      if (!available() || stick.pointer !== null || (event.button !== undefined && event.button !== 0)) return;
      // A pointer belongs to one stick even if dragged over its neighbour.
      if (sticks.some(other => other.pointer === event.pointerId)) return;
      event.preventDefault();
      event.stopPropagation();
      stick.pointer = event.pointerId;
      try { el.setPointerCapture(event.pointerId); } catch (_) { /* Window release handlers remain available. */ }
      update(stick, event);
    });
    el.addEventListener('pointermove', event => {
      if (event.pointerId !== stick.pointer) return;
      event.preventDefault();
      event.stopPropagation();
      update(stick, event);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(type, event => {
      if (event.pointerId === stick.pointer) clear(stick);
    });
  }
  for (const type of ['pointerup', 'pointercancel']) window.addEventListener(type, event => {
    sticks.forEach(stick => { if (event.pointerId === stick.pointer) clear(stick); });
  });
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  new MutationObserver(records => {
    const changedMode = records.some(record => record.target === document.body && record.attributeName === 'data-control-mode');
    if (changedMode || !available()) reset();
    root.dataset.blocked = String(!available());
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-control-mode', 'open', 'class'] });
  root.dataset.blocked = String(!available());
})();
