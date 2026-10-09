"""Keep walk-camera/interior integration reproducible after source import."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
if 'spatial-world.js' in (root/'public/campus-explorer/index.html').read_text(encoding='utf-8'):
    print('Shared spatial world is active; legacy importer skipped.')
    raise SystemExit(0)
path=root/'public/campus-explorer/explorer.js'
s=path.read_text(encoding='utf-8')
if 'let collisionBuildingId' not in s:
    s=s.replace('const WALL_COLLIDERS = [];','const WALL_COLLIDERS = [];\n    let collisionBuildingId = null;')
    s=s.replace('        minX: Math.min(minX, maxX),','        buildingId: collisionBuildingId,\n        minX: Math.min(minX, maxX),',1)
    s=s.replace('    BUILDINGS_CONFIG.forEach(cfg => {','    BUILDINGS_CONFIG.forEach(cfg => {\n      collisionBuildingId=cfg.id;',1)
    s=s.replace('      bldGroup.position.set(cfg.x, 0, cfg.z);','      bldGroup.position.set(cfg.x, 0, cfg.z);\n      bldGroup.userData.buildingId=cfg.id;',1)
    s=s.replace('          bldGroup.add(stMesh);','          stMesh.userData.oldStairs=true;\n          bldGroup.add(stMesh);',1)
    s=s.replace('      scene.add(bldGroup);','      scene.add(bldGroup);\n      collisionBuildingId=null;',1)
    s=s.replace('let walkAnimCycle = 0;', 'let walkAnimCycle = 0;\n    let walkPitch = 0;')
    s=s.replace('avatarGroup = new THREE.Group();', 'avatarGroup = new THREE.Group();\n      avatarGroup.scale.setScalar(.65);',1)
    s=s.replace('avatarGroup.position.clone().add(new THREE.Vector3(0, 3.2, 0))','avatarGroup.position.clone().add(new THREE.Vector3(0, 2.1, 0))')
    s=s.replace('WASD 跑步漫遊。','W／S 前進後退，A／D 轉向。')
    s=s.replace('el.addEventListener("touchend", end, { passive: false });','el.addEventListener("touchend", end, { passive: false });\n      el.addEventListener("touchcancel", end, { passive: false });')
    s=s.replace('    bindDpad("dpad-up", "forward");','''    window.addEventListener('blur',()=>{Object.keys(moveInput).forEach(k=>moveInput[k]=false)});
    bindDpad("dpad-up", "forward");''',1)
    start=s.index('      // 1. AUTO-WALK')
    end=s.index('      // 2. MANUAL KEYBOARD',start)
    s=s[:start]+'''      // 1. AUTO-WALK：每幀用完行走距離，可跨越數個相鄰節點。
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
'''+s[end:]
    s=s.replace('      currentMode = mode;', '      currentMode = mode;\n      controls.enabled=mode==="bird";\n      camera.near=mode===\'bird\'?1:.08;camera.fov=mode===\'bird\'?45:60;camera.updateProjectionMatrix();',1)
    start=s.index('        const camDir = new THREE.Vector3();',s.index('// 2. MANUAL KEYBOARD'))
    end=s.index('        if (moveVec.lengthSq()',start)
    s=s[:start]+'''        // A/D 轉向，W/S 沿人物面朝的方向前進／後退。
        avatarAngle += ((moveInput.left ? 1 : 0)-(moveInput.right ? 1 : 0))*1.9*turnSensitivityMultiplier*delta;
        avatarGroup.rotation.y=avatarAngle;
        const forward=new THREE.Vector3(Math.sin(avatarAngle),0,Math.cos(avatarAngle));
        const moveVec=forward.multiplyScalar((moveInput.forward?1:0)-(moveInput.backward?1:0));

'''+s[end:]
    s=s.replace('          avatarAngle = Math.atan2(moveVec.x, moveVec.z);\n          avatarGroup.rotation.y = avatarAngle;','          avatarGroup.rotation.y = avatarAngle;',1)
    start=s.index('          // 2. Staircase Ascend')
    end=s.index('      // Space-bar Jump Hop',start)
    s=s[:start]+'''          // 梯面、平台及樓板由相同的可行走配置提供高度。
        }
      }
      if (window.campusWalkWorld && avatarGroup && !isJumping && (currentMode==='avatar'||currentMode==='firstperson')) {
        const groundY=window.campusWalkWorld.ground(avatarGroup.position);
        avatarGroup.position.y=Math.max(groundY,avatarGroup.position.y-8*delta);
        jumpBaseY=avatarGroup.position.y;
      }

'''+s[end:]
    start=s.index('        avatarGroup.position.y += jumpVelocity * delta;')
    end=s.index('      // ',start)
    s=s[:start]+'''        // 查詢下降前腳底高度，落在目前梯面而非起跳樓層。
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

'''+s[end:]
    start=s.index('        // Camera Follow in Avatar')
    end=s.index('        prevAvatarPos.copy(avatarGroup.position);',start)
    s=s[:start]+'''        // 人物、鏡頭與行進方向共用 heading；鳥瞰獨立操作。
        if(window.campusWalkWorld && currentMode!=='bird' && !isCameraAnimating)window.campusWalkWorld.updateCamera();
'''+s[end:]
    s=s.replace('    function applyManualCameraRotation(deltaX, deltaY) {','''    function applyManualCameraRotation(deltaX, deltaY) {
      if(currentMode!=='bird'){
        avatarAngle-=deltaX*.0035*turnSensitivityMultiplier;
        walkPitch=Math.max(-.35,Math.min(.4,walkPitch-deltaY*.0035*(isInvertY?-1:1)));
        avatarGroup.rotation.y=avatarAngle;
        return;
      }''',1)
    s=s.replace('if (mouseTurnMode === "move" && (currentMode === "avatar" || currentMode === "firstperson")) {','if ((mouseTurnMode === "move" || isMouseDownDragging) && (currentMode === "avatar" || currentMode === "firstperson")) {',1)
    s=s.replace('        controls.update();\n      }\n\n      // Dynamic Labels', '        if(currentMode===\'bird\')controls.update();\n      }\n\n      // Dynamic Labels')
    s=s.replace('      if (!isCameraAnimating) {\n        controls.update();', '      if (!isCameraAnimating && currentMode===\'bird\') {\n        controls.update();',1)
    # Replace the old graph route with geometry-consistent room circulation.
    s=s.replace('      renderNavigationPath(pathPoints);', '''      if(window.campusWalkWorld){
        const actual=window.campusWalkWorld.route(avatarGroup.position,room);
        if(!actual){showToast('目前位置無可通行路徑，請先移到走廊或入口。');return;}
        pathPoints.length=0;actual.forEach(p=>pathPoints.push(new THREE.Vector3(p.x,p.y+.6,p.z)));
      }
      renderNavigationPath(pathPoints);''',1)
    path.write_text(s,encoding='utf-8')
html=root/'public/campus-explorer/index.html'
h=html.read_text(encoding='utf-8')
if 'walk-world.js' not in h:
    h=h.replace('<script src="art-direction.js">','<script src="walk-world-math.js"></script>\n<script src="walk-world.js"></script>\n<script src="art-direction.js">')
    h=h.replace('W／A／S／D 移動，Shift 加速','W／S 前進後退，A／D 轉向，Shift 加速')
    h=h.replace('或方向鍵視角相對走動','或方向鍵前進後退、轉向')
    h=h.replace('<li>','<li>',1)
    html.write_text(h,encoding='utf-8')
