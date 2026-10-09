/* 美術層：配置與路徑沿用 campus-data.js / explorer.js，裝飾不提供碰撞。 */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,camera,controls}=api;
  const palette={stone:0xe5e2d9,brick:0xcfa9a2,leaf:0x567657,soil:0x8d7761};
  const materials=new Map();
  const mat=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.86}));return materials.get(color)};
  const decor=new THREE.Group();decor.name='campus-landscape-refinement';scene.add(decor);
  function box(w,h,d,x,y,z,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;decor.add(m);return m}
  function tiledTexture(wall=false){
    const cvs=document.createElement('canvas');cvs.width=cvs.height=256;
    const ctx=cvs.getContext('2d');ctx.fillStyle=wall?'#d1ada6':'#c7c8b7';ctx.fillRect(0,0,256,256);
    const size=wall?16:32;
    for(let y=0;y<256;y+=size)for(let x=0;x<256;x+=size){
      const brightness=wall?170+(x+y)%29:180+(x*3+y)%19;
      ctx.fillStyle=wall?`rgb(${brightness+30},${brightness},${brightness-5})`:`rgb(${brightness+14},${brightness+14},${brightness+2})`;
      ctx.fillRect(x+1,y+1,size-2,size-2);
    }
    const texture=new THREE.CanvasTexture(cvs);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(wall?3:8,wall?2:8);texture.encoding=THREE.sRGBEncoding;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
  }
  const paver=new THREE.MeshStandardMaterial({map:tiledTexture(),roughness:.93});
  function paved(w,d,x,z){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,d),paver);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.035,z);mesh.receiveShadow=true;decor.add(mesh)}
  // 前庭與銅像廣場，以及校舍之間可通行的硬鋪面。
  paved(56,30,-32,61);paved(28,26,-40,32);paved(22,42,15,28);
  paved(8,118,44,8);paved(42,7,12,51);paved(40,7,12,6);
  function planter(x,z,w,d){
    box(w,.32,d,x,.17,z,0xbfc7af);box(w-.35,.08,d-.35,x,.37,z,palette.soil);
    for(let i=0;i<Math.max(2,Math.floor(w/1.5));i++){
      const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.66,1),mat(i%2?0x557a52:0x719461));leaf.scale.set(1,.65,.85);leaf.position.set(x-w/2+.85+i*1.3,.77,z);leaf.castShadow=true;decor.add(leaf);
    }
  }
  for(const x of [11,19])for(const z of [16,29,41])planter(x,z,3.4,4);
  for(const x of [-43,-27])planter(x,44,6,1.8);
  for(const z of [40,52,64,76])planter(-53,z,2,4);
  // 柔和綠籬與座椅形成中庭尺度，保留縱向通廊。
  for(const z of [17,37]){
    box(3.2,.18,.75,15,.72,z,0x997554);
    box(.16,.6,.65,13.8,.34,z,0x52615a);box(.16,.6,.65,16.2,.34,z,0x52615a);
  }
  // 後側擋土牆與坡地樹叢，呼應操場照片。
  for(let i=0;i<14;i++){
    const wall=box(14.7,2.7+(i%3)*.12,.85,-126+i*15,1.3,-75,0x818b7f);wall.rotation.x=-.15;
    box(14.8,.12,1.05,-126+i*15,2.7,-75.2,0xa1aa94);
    for(const x of [-129+i*15,-123+i*15])box(.1,.55,.08,x,1.1,-74.5,0x536456);
  }
  // Track-side shade, tree wells and low brick seating from the 2019 series.
  paved(86,2.2,-88,5.4);
  for(let x=-126;x<=-79;x+=7.8){
    box(2.1,.3,1.6,x,.16,7.6,0x987867);box(1.75,.03,1.3,x,.32,7.6,palette.soil);
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.2,3.3,8),mat(0x76644c));trunk.position.set(x,1.65,7.6);decor.add(trunk);
    for(let i=0;i<2;i++){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),mat(i?0x6d8351:0x587849));leaf.position.set(x+(i?.45:-.3),3.6+i*.6,7.6);leaf.scale.y=.8;decor.add(leaf)}
    box(2,.12,.45,x,.48,8.55,0x9e8468);
  }
  for(let i=0;i<30;i++){
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(3.2+(i%3)*.7,1),mat([0x365b47,0x416851,0x51765a][i%3]));
    crown.position.set(-135+i*7.5,4.2+(i%4)*.7,-82-(i%2)*4);crown.scale.y=1.2;crown.castShadow=true;decor.add(crown);
  }
  for(let i=0;i<12;i++){
    const hill=new THREE.Mesh(new THREE.SphereGeometry(18+(i%3)*6,16,10),mat([0x365b47,0x416851,0x51765a][i%3]));
    hill.position.set(-155+i*25,-3,-110-(i%2)*10);hill.scale.set(1.2,.55,1);hill.receiveShadow=true;decor.add(hill);
  }
  // 補上車道標線，採低對比標線避免畫面喧賓奪主。
  for(let z=-66;z<79;z+=10)box(.18,.015,3.5,52.5,.045,z,0xdfdecd);
  for(let x=2;x<101;x+=10)box(3.5,.015,.18,x,.045,86,0xdfdecd);
  for(let i=0;i<7;i++)box(1,.015,7,-19+i*2,.055,79,0xf0efdf);
  const gymTexture=tiledTexture(true);
  for(const group of scene.children){
    const cfg=api.buildings.find(b=>group.position.x===b.x&&group.position.z===b.z&&group.type==='Group');
    if(!cfg)continue;
    group.userData.buildingId=cfg.id;
    group.traverse(obj=>{
      if(!obj.isMesh)return;
      obj.receiveShadow=true;
      if(obj.material?.color?.getHex()===palette.brick){obj.material.map=gymTexture;obj.material.needsUpdate=true}
    });
    // 屋頂薄框與立面水平帶，讓高樓層陰影與結構更清晰。
    const roofY=cfg.floors*FH;
    for(const side of [-1,1]){
      const trim=box(cfg.width+.6,.17,.28,cfg.x,roofY-.1,cfg.z+side*cfg.depth/2,0xa0a99e);
      trim.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};floorMeshes.push(trim);
    }
  }
  // 校內統一光源與地面接觸陰影。
  const calibratedMaterials=new Set();
  scene.traverse(obj=>{
    if(obj.isMesh&&!obj.material?.transparent)obj.receiveShadow=true;
    const list=obj.material?(Array.isArray(obj.material)?obj.material:[obj.material]):[];
    for(const material of list){
      if(calibratedMaterials.has(material))continue;calibratedMaterials.add(material);
      // r128 的十六進位材質色尚未自動從 sRGB 轉線性；輸出 sRGB 前先校準。
      material.color?.convertSRGBToLinear();
      if(material.map)material.map.encoding=THREE.sRGBEncoding;
      material.needsUpdate=true;
    }
  });
  const toolbar=document.createElement('nav');toolbar.id='scene-toolbar';toolbar.setAttribute('aria-label','場景視角與美術對照');
  const views=[['全校鳥瞰',[-160,168,225],[-15,0,6]],['校門廣場',[-62,34,121],[-26,3,54]],['中庭漫遊',[15,64,82],[15,0,28]],['運動園區',[-128,77,56],[-65,0,-25]]];
  let activeView='全校鳥瞰';
  function fly(position,target){
    focusedBuildingId=null;
    if(activeView==='中庭漫遊'&&innerWidth<768)position=[15,100,112];
    api.setControlMode('bird');
    document.getElementById('welcome-card').classList.add('hidden');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){camera.position.set(...position);controls.target.set(...target);controls.update()}
    else animateCameraTo(new THREE.Vector3(...position),new THREE.Vector3(...target));
  }
  for(const [name,position,target] of views){const button=document.createElement('button');button.className='scene-view-btn';button.textContent=name;button.onclick=()=>{activeView=name;toolbar.querySelectorAll('button').forEach(b=>b.classList.remove('active'));button.classList.add('active');fly(position,target)};toolbar.append(button)}
  window.addEventListener('resize',()=>{if(activeView==='中庭漫遊'){camera.position.set(...(innerWidth<768?[15,100,112]:[15,64,82]));controls.target.set(15,0,28);controls.update()}});
  let evening=false;
  const lightButton=document.createElement('button');lightButton.className='scene-view-btn';lightButton.textContent='暖陽';lightButton.onclick=()=>{
    evening=!evening;lightButton.textContent=evening?'晨光':'暖陽';
    sunLight.color.setHex(evening?0xffc993:0xffedd1);sunLight.position.set(evening?-110:85,evening?85:160,90);
    scene.background.setHex(evening?0xe7d9c1:0xd5e4de);scene.fog.color.copy(scene.background);renderer.toneMappingExposure=evening?1.02:1.08;
  };toolbar.append(lightButton);
  const referenceButton=document.createElement('button');referenceButton.className='scene-view-btn';referenceButton.textContent='實景對照';toolbar.append(referenceButton);document.body.append(toolbar);
  const caption=document.createElement('div');caption.id='scene-caption';caption.textContent='依 115 平面圖配置・實景材質・空間示意';document.body.append(caption);
  const panel=document.createElement('section');panel.id='reference-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','校園照片對照');panel.innerHTML='<button type="button">關閉</button><h2>從實景認識校園</h2><img data-src="reference-aerial.jpg" alt="大溪國中空拍實景，供建築與球場對照"><p>平面图校對位置與樓層，實景照片校對建築外觀。立體模型為導覽示意，尺寸與路徑距離未經現地測量。</p><p><a href="campus_plan_115.jpg" target="_blank" rel="noopener">開啟 115 學年度平面圖</a>　<a href="campus-illustration.png" target="_blank" rel="noopener" id="concept-link">查看校園手繪美術圖</a></p>';
  document.body.append(panel);referenceButton.onclick=()=>{panel.querySelector('img').src='reference-aerial.jpg';panel.classList.add('open');panel.querySelector('button').focus()};panel.querySelector('button').onclick=()=>{panel.classList.remove('open');referenceButton.focus()};
  const sourceNote=document.createElement('p');sourceNote.className='map-source-note';sourceNote.textContent='平面圖為樓層、配置與跑道色彩依據；3D 場景為示意模型，照片用於校對外觀與年代差異。';document.getElementById('campus-map-modal').append(sourceNote);
  // 原版圖面座標不是測量值，因此距離採示意單位。
  document.querySelector('.nav-dist small').textContent='示意單位';
  document.addEventListener('keydown',e=>{if(e.key==='Escape')panel.classList.remove('open')});
  // 可聚焦的原版 div 操作鈕支援鍵盤 Enter／空白鍵。
  for(const element of document.querySelectorAll('.venue-chip,.brand-btn')){
    element.tabIndex=0;element.setAttribute('role','button');element.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();element.click()}});
  }
  for(const button of document.querySelectorAll('.dpad-btn'))button.setAttribute('aria-label',({ 'dpad-up':'向前移動','dpad-left':'向左轉','dpad-right':'向右轉','dpad-down':'向後移動'})[button.id]);
  document.getElementById('search-input').setAttribute('aria-label','搜尋處室或教室');
  // 移除密集裝飾 emoji，只保留文字操作資訊。
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const textNodes=[];while(walker.nextNode())if(!['SCRIPT','STYLE'].includes(walker.currentNode.parentElement.tagName))textNodes.push(walker.currentNode);
  for(const node of textNodes)node.nodeValue=node.nodeValue.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,'').replace('平面图','平面圖').replace('实拍','實拍');
  for(const [id,symbol] of Object.entries({'dpad-up':'↑','dpad-left':'←','dpad-right':'→','dpad-down':'↓'}))document.getElementById(id).textContent=symbol;
  document.getElementById('mode-toast').setAttribute('role','status');
  if(new URLSearchParams(location.search).get('view')==='plan'){
    const plan=document.getElementById('campus-map-modal'),img=plan?.querySelector('img[data-src]');
    if(img)img.src=img.dataset.src;
    plan?.classList.add('open');
  }
  if(new URLSearchParams(location.search).has('to'))document.getElementById('welcome-card').classList.add('hidden');
})();
