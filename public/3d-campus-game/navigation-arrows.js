/* Ground chevrons follow the same polyline as auto-walk, including stair slopes. */
window.CampusNavigationArrows = (() => {
  function create(THREE) {
    const group = new THREE.Group();
    group.name = 'navigation-ground-arrows';
    const matrix = new THREE.Matrix4(), color = new THREE.Color();
    const mint = new THREE.Color(0x28e0bc);
    let samples = [], lastPhase = -1;

    function clear() {
      for (const mesh of [...group.children]) {
        group.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        mesh.dispose?.();
      }
      samples = [];
      lastPhase = -1;
      delete group.userData.appliedIndex;
      delete group.userData.routeIndex;
    }

    function setPath(points) {
      clear();
      // Sample by accumulated horizontal distance so dense graph nodes still get arrows.
      // Keep a full arrow away from corners so its footprint cannot cut across a wall.
      const turns = [];
      let routeDistance = 0;
      for (let j = 1; j < points.length; j++) {
        const p = points[j - 1], q = points[j], r = points[j + 1];
        routeDistance += Math.hypot(q.x - p.x, q.z - p.z);
        if (!r) continue;
        const incoming = new THREE.Vector3().subVectors(q, p), outgoing = new THREE.Vector3().subVectors(r, q);
        const n = incoming.length() * outgoing.length();
        if (n > 1e-8 && incoming.dot(outgoing) / n < .98) turns.push(routeDistance);
      }
      let travelled = 0, next = 1.3;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1], b = points[i];
        const length = Math.hypot(b.x - a.x, b.z - a.z);
        if (length < 1e-6) continue;
        const forward = new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z).normalize();
        const right = new THREE.Vector3(forward.z, 0, -forward.x).normalize();
        const up = new THREE.Vector3().crossVectors(forward, right);
        while (next < travelled + length) {
          const t = (next - travelled) / length;
          if (!turns.some(distance => Math.abs(next - distance) < .8)) {
            // Visible stair treads and nosings rise up to .168 above the smooth
            // walking ramp. Lift only sloped arrows to keep the whole marker clear.
            const lift = Math.abs(forward.y) > .15 ? .16 : 0;
            samples.push({
              matrix: new THREE.Matrix4().makeBasis(right, up, forward).setPosition(
                a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t - .6 + .067 + lift, a.z + (b.z - a.z) * t),
              segment: i - 1, distance: next
            });
          }
          next += 2.4;
        }
        travelled += length;
      }
      if (!samples.length) return;
      const vertices = [-.42,0,-.5, 0,0,-.16, .42,0,-.5, .42,0,-.05, 0,0,.5, -.42,0,-.05];
      for (const [layer, hex] of [[0, 0x243b75], [1, 0xffffff]]) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setIndex([0,1,5, 1,4,5, 1,2,3, 1,3,4]);
        const material = new THREE.MeshBasicMaterial({color:hex,side:THREE.DoubleSide,
          polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
        const mesh = new THREE.InstancedMesh(geometry, material, samples.length);
        mesh.name = layer ? 'mint-chevron' : 'indigo-chevron-border';
        mesh.renderOrder = 8 + layer;
        // Older bundled Three.js does not calculate InstancedMesh bounds.
        mesh.frustumCulled = false;
        samples.forEach((sample, index) => {
          matrix.copy(sample.matrix);
          if (!layer) matrix.scale(new THREE.Vector3(1.22, 1, 1.22));
          else matrix.elements[13] += .008;
          mesh.setMatrixAt(index, matrix);
          if (layer) mesh.setColorAt(index, mint);
        });
        group.add(mesh);
      }
      group.visible = true;
    }

    function update(time, state, reducedMotion = false) {
      group.visible = samples.length > 0 && !['arrived', 'cancelled'].includes(state.status);
      if (!group.visible) return;
      const moving = state.status === 'walking' && !reducedMotion;
      const phase = moving ? Math.floor(time * 24) : -2;
      const index = state.index ?? 0;
      if (phase === lastPhase && group.userData.routeIndex === index) return;
      lastPhase = phase;
      group.userData.routeIndex = index;
      const mesh = group.children[1];
      const progressChanged = group.userData.appliedIndex !== index;
      samples.forEach((sample, i) => {
        const pulse = moving ? .66 + .34 * Math.cos(sample.distance * 1.4 - phase / 24 * 4) : 1;
        if (progressChanged) {
          for (let layer = 0; layer < 2; layer++) {
            matrix.copy(sample.matrix);
            const scale = sample.segment < index ? 0 : layer ? 1 : 1.22;
            matrix.scale(new THREE.Vector3(scale, scale, scale));
            if (layer) matrix.elements[13] += .008;
            group.children[layer].setMatrixAt(i, matrix);
          }
        }
        color.copy(mint).multiplyScalar(pulse);
        mesh.setColorAt(i, color);
      });
      group.userData.appliedIndex = index;
      if (progressChanged) for (const layer of group.children) layer.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
    }
    return {group, setPath, update, clear};
  }
  return {create};
})();
