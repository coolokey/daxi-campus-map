/* 美術層：配置與路徑沿用 campus-data.js / explorer.js，實體景觀由 landscape-world 建立與登記碰撞。 */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,camera,controls}=api;
  const palette={stone:0xd0c9bd,brick:0xb88d84,leaf:0x567657,soil:0x8d7761};
  const materials=new Map();
  const mat=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.86}));return materials.get(color)};
  const decor=scene.getObjectByName('campus-landscape-refinement');
  function box(w,h,d,x,y,z,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;decor.add(m);return m}
  function tiledTexture(wall=false){
    const cvs=document.createElement('canvas');cvs.width=cvs.height=256;
    const ctx=cvs.getContext('2d');ctx.fillStyle=wall?'#b88d84':'#a1a79b';ctx.fillRect(0,0,256,256);
    const size=wall?16:32;
    for(let y=0;y<256;y+=size)for(let x=0;x<256;x+=size){
      const brightness=wall?136+(x+y)%24:148+(x*3+y)%13;
      ctx.fillStyle=wall?`rgb(${brightness+25},${brightness},${brightness-7})`:`rgb(${brightness+8},${brightness+8},${brightness+1})`;
      ctx.fillRect(x+1,y+1,size-2,size-2);
    }
    const texture=new THREE.CanvasTexture(cvs);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(wall?3:8,wall?2:8);texture.encoding=THREE.sRGBEncoding;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
  }
  const gymTexture=tiledTexture(true);
  for(const group of scene.children){
    const cfg=api.buildings.find(b=>group.position.x===b.x&&group.position.z===b.z&&group.type==='Group'&&!group.userData.floorNum);
    if(!cfg)continue;
    group.userData.buildingId=cfg.id;
    group.traverse(obj=>{
      if(!obj.isMesh)return;
      obj.receiveShadow=true;
      if(obj.material?.color?.getHex()===palette.brick){obj.material.map=gymTexture;obj.material.needsUpdate=true}
    });
    // 屋頂薄框與立面水平帶，讓高樓層陰影與結構更清晰。
    if(['multi-building','new-grade7'].includes(cfg.id))continue; // Photo module owns each asymmetric wing roof.
    const roofY=cfg.roofHeight||cfg.floors*FH;
    for(const side of [-1,1]){
      const trim=box(cfg.width+.6,.17,.28,cfg.x,roofY-.1,cfg.z+side*cfg.depth/2,0x71827a);
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
      material.userData.campusColorCalibrated=true;
      if(material.map)material.map.encoding=THREE.sRGBEncoding;
      material.needsUpdate=true;
    }
  });
  const toolbar=document.createElement('nav');toolbar.id='scene-toolbar';toolbar.setAttribute('aria-label','場景視角與美術對照');
  const views=[['全校鳥瞰',[-160,168,225],[-15,0,6]],['校門廣場',[-62,34,121],[-26,3,54]],['校門近景',[-18,9,108],[-23,4,86]],['警衛室校內側',[-12,7,69],[-21,2,84]],['校門俯視',[-27,50,128],[-40,0,86]],['街口溪步道',[-35,7,93],[-61,1.5,84]],['中庭漫遊',[15,64,82],[15,0,28]],['運動園區',[-128,77,56],[-65,0,-25]],['北側建築群',[12,60,8],[74,2,-42]],['七年級新大樓',[44,17,-28],[77,4,-55]],['圖書館與輔導室',[35,17,-25],[80,2.8,-23]],['圖書館廣場',[50,5,-24],[84,2.8,-23]],['科技館與藝術館',[34,46,68],[73,4,21]],['科技館門口',[49,4,14.3],[60,1.6,14.5]],['健康中心與合作社',[25,19,15],[12,3,-4]]];
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
    sunLight.color.setHex(evening?0xf1d7b9:0xfff3e3);sunLight.position.set(evening?-110:85,evening?85:160,90);
    scene.background.setHex(evening?0xbeb4a5:0xbdcbd0);scene.fog.color.copy(scene.background);renderer.toneMappingExposure=evening?.84:.88;
  };toolbar.append(lightButton);
  const referenceButton=document.createElement('button');referenceButton.className='scene-view-btn';referenceButton.textContent='實景對照';toolbar.append(referenceButton);document.body.append(toolbar);
  const caption=document.createElement('div');caption.id='scene-caption';caption.textContent='依 115 平面圖配置・實景材質・空間示意';document.body.append(caption);
  const panel=document.createElement('section');panel.id='reference-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','校園照片對照');panel.innerHTML='<button type="button">關閉</button><h2>從實景認識校園</h2><img data-src="reference-aerial.jpg" alt="大溪國中空拍實景，供建築與球場對照"><p>平面圖校對位置與樓層，實景照片校對建築外觀。立體模型為導覽示意，尺寸與路徑距離未經現地測量。</p><p><a href="campus_plan_115.jpg" target="_blank" rel="noopener">開啟 115 學年度平面圖</a>　<a href="campus-illustration.png" target="_blank" rel="noopener" id="concept-link">查看校園手繪美術圖</a></p>';
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
