(function () {
  'use strict';
  const radius = 40, deadzone = 0.12;
  function vector(dx, dy) {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return { x: 0, y: 0 };
    const length = Math.hypot(dx, dy), strength = Math.min(length / radius, 1);
    if (strength <= deadzone) return { x: 0, y: 0 };
    const amount = (strength - deadzone) / (1 - deadzone);
    return { x: dx === 0 ? 0 : dx / length * amount, y: dy === 0 ? 0 : -dy / length * amount };
  }
  window.CampusMobileControlMath = { radius, deadzone, vector };
})();
