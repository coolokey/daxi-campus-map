/* Pure timeline and normalized burst geometry, shared by the renderer and tests. */
(() => {
  const phaseAt = ms => ms < 1800 ? 'night' : ms < 14000 ? 'show' : ms < 20000 ? 'finale' : 'free';
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
  window.CampusAnniversary = Object.freeze({phaseAt, shapePoints, frameStep});
})();
