"""Apply the collision fix to the imported scene, also after regeneration."""
from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'public/campus-explorer/explorer.js'
source = path.read_text(encoding='utf-8')
if 'function moveAvatarWithCollision' not in source:
    engine = '''    // 每次最多前進 0.18 m，避免高速／掉幀時跨過薄牆。
    // 自動帶路與鍵盤、手機共用人物體積及碰撞體。
    function moveAvatarWithCollision(position, dx, dz, dy = 0) {
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy, dz) / 0.18));
      const sx = dx / steps, sz = dz / steps, sy = dy / steps;
      let blocked = false;
      for (let step = 0; step < steps; step++) {
        const y = position.y + sy;
        if (!checkWallCollision(position.x + sx, y, position.z)) position.x += sx;
        else if (sx !== 0) blocked = true;
        if (!checkWallCollision(position.x, y, position.z + sz)) position.z += sz;
        else if (sz !== 0) blocked = true;
        if (!checkWallCollision(position.x, y, position.z)) position.y = y;
        else if (sy !== 0) blocked = true;
      }
      return blocked;
    }

'''
    source = source.replace('    function checkStairElevation', engine + '    function checkStairElevation', 1)
    start = source.index('          // 1. Sliding Collision')
    end = source.index('          // 2. Staircase Ascend', start)
    source = source[:start] + '''          // 1. Sliding Collision Check against Walls
          const beforeX = curPos.x, beforeZ = curPos.z;
          moveAvatarWithCollision(curPos, dx, dz);
          isMoving = Math.hypot(curPos.x-beforeX, curPos.z-beforeZ) > 0.0001;

''' + source[end:]
    source = source.replace('            curPos.copy(targetPos);', '''            if (moveAvatarWithCollision(curPos, targetPos.x-curPos.x, targetPos.z-curPos.z, targetPos.y-curPos.y)) {
              stopAutoWalk();
              showToast('前方有牆壁，帶路已停止。請沿走廊或門口通行。');
              return;
            }''', 1)
    source = source.replace('            curPos.addScaledVector(dir, stepDist);', '''            if (moveAvatarWithCollision(curPos, dir.x*stepDist, dir.z*stepDist, dir.y*stepDist)) {
              stopAutoWalk();
              showToast('前方有牆壁，帶路已停止。請沿走廊或門口通行。');
            }''', 1)
    source = source.replace('      scene.add(guardGroup);', '''      scene.add(guardGroup);
      registerWallCollider(3.2, 8.8, 83.2, 88.8, 0, 3.2);
      // 門柱是實體；中央入口保留通行空間。
      registerWallCollider(-22.2, -19.8, 84.8, 87.2, 0, 6.2);
      registerWallCollider(-0.2, 2.2, 84.8, 87.2, 0, 6.2);''', 1)
    source = source.replace('const delta = clock.getDelta();', 'const delta = Math.min(clock.getDelta(), 0.1);', 1)
    path.write_text(source, encoding='utf-8')

if '// 入口採開門狀態' not in source:
    source = source.replace('avatarGroup.position.set(0, 0, 96);', 'avatarGroup.position.set(-10, 0, 96);', 1)
    source = source.replace('new THREE.BoxGeometry(18, 1.6, 0.15)', 'new THREE.BoxGeometry(3, 1.6, 0.15)', 1)
    source = source.replace('slidingGate.position.set(0, 0.8, 10);', '''// 入口採開門狀態，收起的門仍有碰撞體。
      slidingGate.position.set(-7.5, 0.8, 10);
      registerWallCollider(-19, -16, 85.9, 86.1, 0, 1.6);''', 1)
    source = source.replace('          floorGroup.add(rail);', '''          if (f === 1) {
            // 1F 的可通行門口必須與畫面護欄的開口一致。
            const length = (isHoriz ? cfg.width : cfg.depth) / 2 - 2;
            for (const sign of [-1, 1]) {
              const part = new THREE.Mesh(new THREE.BoxGeometry(isHoriz ? length : .16, 1.1, isHoriz ? .16 : length), rail.material);
              part.position.copy(rail.position);
              if (isHoriz) part.position.x = sign * (length / 2 + 2);
              else part.position.z = sign * (length / 2 + 2);
              floorGroup.add(part);
            }
          } else floorGroup.add(rail);''')
    source = source.replace('            floorGroup.add(colMesh);', '            if (f !== 1 || Math.abs(isHoriz ? colMesh.position.x : colMesh.position.z) >= 2) floorGroup.add(colMesh);')
    path.write_text(source, encoding='utf-8')
