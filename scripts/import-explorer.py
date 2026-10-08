"""Reproducible import of the user's supplied campus scene; originals stay intact."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
source = (root / 'docs/scene-rebuild/source-original.html').read_text(encoding='utf-8-sig')
target = root / 'public/campus-explorer'
style = re.search(r'<style>([\s\S]*?)</style>', source).group(1)
script = re.search(r'<script>\s*([\s\S]*?)</script>\s*</body>', source).group(1)
config = re.search(r'const FH = [\s\S]*?(?=    const CATEGORY_COLORS)', script).group(0)
script = script.replace(config, '')
config += '''
// 115 學年度平面圖校對：導航節點名稱是內部識別碼，以房間資料為準。
const grade9Plan = {
 '908':[1,'g9-1f-906'], '905':[1,'g9-1f-907'], '903':[1,'g9-1f-908'],
 '907':[2,'g9-2f-clubs'], '904':[2,'g9-2f-904'], '902':[2,'g9-2f-905'],
 '906':[3,'g9-3f-901'], '901':[3,'g9-3f-902']
};
const grade9 = BUILDINGS_CONFIG.find(b=>b.id==='grade9-back');
// 原示意座標使縱棟穿入行政教室，校正相接邊界以保留真實可通行室內。
grade9.x = 7.5;
grade9.rooms = grade9.rooms.filter(r=>grade9Plan[r.id]);
for(const room of grade9.rooms){
 const [floor,node]=grade9Plan[room.id];
 Object.assign(room,{floor,node,name:`${room.id} 教室 (${floor}F)`});
}
grade9.rooms.sort((a,b)=>a.floor-b.floor || Number(b.id)-Number(a.id));
const grade8 = BUILDINGS_CONFIG.find(b=>b.id==='grade8-mid');
const room804=grade8.rooms.find(r=>r.id==='804');
Object.assign(room804,{floor:1,node:'g8m-1f-counsel',name:'804 教室 (1F)'});
grade8.rooms=grade8.rooms.filter(r=>r.id!=='counseling-act');
BUILDINGS_CONFIG.find(b=>b.id==='new-grade7').rooms.find(r=>r.id==='706').name='706 教室 (3F)';
BUILDINGS_CONFIG.find(b=>b.id==='new-grade7').rooms.find(r=>r.id==='math-lab').name='數學研究室 (3F)';
for(const building of BUILDINGS_CONFIG){
 building.color=building.isGymSpecial?0xcfa9a2:0xe5e2d9;
 building.roofColor=building.hasPitchedRoof?(building.id==='admin-front'?0xa94e45:0xc8bd91):0x899b96;
}
'''
script = script.replace('new THREE.MeshLambertMaterial(', 'new THREE.MeshStandardMaterial(')
script = script.replace('0x16a34a', '0x7b9555').replace('0x3f6b2d', '0x68805c')
script = script.replace('color: 0x38bdf8, transparent: true, opacity: 0.55', 'color: 0x3b525b, transparent: true, opacity: 0.78')
script = script.replace('const OVERVIEW_CAM = new THREE.Vector3(0, 110, 155);', 'const OVERVIEW_CAM = new THREE.Vector3(-160, 168, 225);')
script = script.replace('const OVERVIEW_TARGET = new THREE.Vector3(0, 8, 15);', 'const OVERVIEW_TARGET = new THREE.Vector3(-15, 0, 6);')
script = script.replace('renderer.toneMappingExposure = 1.05;', 'renderer.toneMappingExposure = 1.08;\n    renderer.outputEncoding = THREE.sRGBEncoding;')
script = script.replace('scene.background = new THREE.Color(0x99c7e0);', 'scene.background = new THREE.Color(0xd5e4de);')
script = script.replace('scene.fog = new THREE.FogExp2(0x99c7e0, 0.0028);', 'scene.fog = new THREE.Fog(0xd5e4de, 260, 640);')
script = script.replace('const hemiLight = new THREE.HemisphereLight(0xe8f4f8, 0x3d4e33, 0.65);', 'const hemiLight = new THREE.HemisphereLight(0xd9e7f0, 0x536449, 0.8);')
script = script.replace('const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);', 'const ambientLight = new THREE.AmbientLight(0xfff3df, 0.2);')
script = script.replace('new THREE.DirectionalLight(0xfffaec, 1.15)', 'new THREE.DirectionalLight(0xffedd1, 1.5)')
script = script.replace('sunLight.shadow.mapSize.width = 2048;', 'sunLight.shadow.mapSize.width = window.innerWidth < 768 ? 1024 : 2048;')
script = script.replace('sunLight.shadow.mapSize.height = 2048;', 'sunLight.shadow.mapSize.height = window.innerWidth < 768 ? 1024 : 2048;')
for old,new in [('y: 1.85','y: 1.8'),('y: 3.7','y: 3.6'),('y: 5.55','y: 5.4'),('y: 7.4','y: 7.2'),('y: 9.25','y: 9.0'),('y: 11.1','y: 10.8')]:
 script=script.replace(old,new)
for line in script.splitlines():
 if line.lstrip().startswith('"gym-stair-'):
  fixed=line.replace('y: 2.25','y: 1.8').replace('y: 4.5','y: 3.6').replace('y: 6.75','y: 5.4').replace('y: 9.0','y: 7.2')
  script=script.replace(line,fixed)
# 消除兩套同位置標籤；地標只負責戶外設施，建築使用獨立標籤。
script = script.replace('LANDMARKS.forEach(lm => {', "LANDMARKS.filter(lm=>!['學生活動中心','行政大樓','八年級棟 (南棟)','九年級棟 (縱向)','八年級中棟 (縱向)','健康中心棟','七年級新大樓','綜合大樓/圖書館','科技館','藝術館'].includes(lm.name)).forEach(lm => {")
script = script.replace('const ROOMS_DB = {};', 'const ROOMS_DB = {};\n    let focusedBuildingId=null;')
script = script.replace('element: badgeDiv,', 'element: badgeDiv,\n          buildingId: cfg.id,')
script = script.replace('const targetNodeId = room.node;', 'focusedBuildingId=room.buildingId;\n      const targetNodeId = room.node;')
script = script.replace('function focusBuilding(cfg) {', 'function focusBuilding(cfg) {\n      focusedBuildingId=cfg.id;')
script = re.sub(r'      roomBadgeElements.forEach\(item => \{[\s\S]*?\n      \}\);', '''
      let shownRoomBadges=0;
      roomBadgeElements.forEach(item => {
        const node=NAV_NODES[item.nodeId];
        const wp=node?new THREE.Vector3(node.x,(node.y||0)+2.2,node.z).project(camera):null;
        const floor=currentFloorFilter==='all'?1:Number(currentFloorFilter);
        const visible=wp && wp.z<1 && Math.abs(wp.x)<.93 && Math.abs(wp.y)<.88 &&
          item.buildingId===focusedBuildingId && item.floor===floor && camDist<140 &&
          shownRoomBadges<(window.innerWidth<768?4:8);
        item.element.style.display=visible?'flex':'none';
        if(visible){
          shownRoomBadges++;
          item.element.style.left=`${(wp.x*.5+.5)*window.innerWidth}px`;
          item.element.style.top=`${(-wp.y*.5+.5)*window.innerHeight}px`;
        }
      });''',script,count=1)
script = script.replace('miniCtx.fillStyle = "#dc2626";', 'miniCtx.fillStyle = "#44484b";')
script = script.replace('miniCtx.fillStyle = "#1e293b";', 'miniCtx.fillStyle = "#eeeade";')
script = script.replace('miniCtx.fillStyle = "#166534";', 'miniCtx.fillStyle = "#7b9555";')
script = script.replace('    createBackMountainBackdrop();', '    // 後山植栽由 art-direction.js 製作，避免原版巨大方塊遮蔽地景。')
script = script.replace('pRoof.position.set(cfg.width / 2 + 0.8, totalH + 0.1, 0);', '''pRoof.position.set(-cfg.width / 2 - 0.8, totalH + 0.1, 0);''')
script = script.replace('        pRoof.castShadow = true;', '''
        // 縱向棟屋脊沿長邊，水平棟 extrusion 起點由西側開始。
        if(!isHoriz){
          const section=new THREE.Shape();
          section.moveTo(-cfg.width/2-.8,0);section.lineTo(0,2.4);section.lineTo(cfg.width/2+.8,0);section.closePath();
          pRoof.geometry.dispose();
          pRoof.geometry=new THREE.ExtrudeGeometry(section,{depth:cfg.depth+1.6,bevelEnabled:false});
          pRoof.rotation.y=0;pRoof.position.set(0,totalH+.1,-cfg.depth/2-.8);
        }
        pRoof.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(pRoof);
        pRoof.castShadow = true;''')
script = script.replace('        roofMesh.castShadow = true;', '        roofMesh.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};\n        floorMeshes.push(roofMesh);\n        roofMesh.castShadow = true;')
script = script.replace('        bldGroup.add(solarGroup);', '        solarGroup.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};\n        floorMeshes.push(solarGroup);\n        bldGroup.add(solarGroup);')
script = script.replace('grp.visible = grp.userData.floorNum <= Number(floorVal);', 'grp.visible = grp.userData.roof ? Number(floorVal)>=BUILDINGS_CONFIG.find(b=>b.id===grp.userData.buildingId).floors : grp.userData.floorNum <= Number(floorVal);')
script = script.replace('duration = 800) {', 'duration = 800) {\n      if(matchMedia("(prefers-reduced-motion: reduce)").matches)duration=1;')
script = script.replace('    animate();', """
    Object.assign(ROOMS_DB,{
      gate:{id:'gate',name:'校大門',buildingName:'正門廣場',floor:1,cat:'admin',node:'gate'},
      track:{id:'track',name:'操場及綜合球場',buildingName:'操場',floor:1,cat:'sports',node:'track-center'},
      breezeway:{id:'breezeway',name:'中央通廊',buildingName:'教學區',floor:1,cat:'special',node:'breezeway-mid'}
    });
    window.campusExplorer = {scene,camera,controls,buildings:BUILDINGS_CONFIG,rooms:ROOMS_DB,nodes:NAV_NODES,findShortestPath,navigateToRoom,setFloorFilter,setControlMode};
    animate();""", 1)
script = script.replace('setTimeout(() => navigateToRoom(to), 600);', '''setTimeout(() => {
          if(ROOMS_DB[to])navigateToRoom(to);
          else {
            const building=BUILDINGS_CONFIG.find(b=>b.id===to);
            if(building){setControlMode('bird');focusBuilding(building)}
            else showToast('找不到此目的地，請使用上方搜尋');
          }
        },600);''')
(target / 'campus-data.js').write_text(config, encoding='utf-8')
script = re.sub(r'    miniCanvas.addEventListener\("click", \(e\) => \{[\s\S]*?\n    \}\);', '    // 定位小地圖只顯示人物位置，避免點擊意外傳送。', script, count=1)
(target / 'explorer.js').write_text(script, encoding='utf-8')
(target / 'base.css').write_text(style, encoding='utf-8')
html = re.sub(r'<style>[\s\S]*?</style>', '<link rel="stylesheet" href="base.css">\n<link rel="stylesheet" href="art-direction.css">', source, count=1)
html = re.sub(r'<script>\s*[\s\S]*?</script>\s*</body>', '<script src="campus-data.js"></script>\n<script src="explorer.js"></script>\n<script src="art-direction.js"></script>\n</body>', html, count=1)
html = html.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'vendor/three.min.js')
html = html.replace('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', 'vendor/OrbitControls.js')
html = re.sub(r' onerror="[^"]*"', '', html)
html = html.replace('115學年度 3D 智慧校園導覽','115 學年度・立體校園探索')
html = html.replace('901 教室 (中西棟3F)','901 教室 (中西棟 3F)')
html = html.replace('class="minimap-compass" title="指北標記">北', 'class="minimap-compass" title="圖面上方，非地理北向">圖上')
html = html.replace('預設跑步（Shift 加速、空白鍵跳）','W／A／S／D 移動，Shift 加速')
html = html.replace('手機用左搖桿移動、右半邊滑動轉頭','手機用方向鍵移動，拖曳畫面轉頭')
html = html.replace('鳥瞰全校、逐層查看','開啟校園平面圖')
html = html.replace('黃色路線會帶你走到門口。','金色路線會帶你探索校園。')
html = html.replace('<div class="welcome-badge">115 學年度</div>', '<div class="welcome-badge">DAXI · CAMPUS FIELD NOTES</div>')
html = html.replace('<div class="welcome-actions">','<div class="welcome-actions">')
html = html.replace('name="description" content="依據大溪國中115學年度官方校園平面圖與真實空拍影像高精度重構', 'name="description" content="依據大溪國中 115 學年度校園平面圖與實景照片製作的示意導覽')
html = html.replace('</head>', '<meta name="color-scheme" content="light dark"></head>')
html = html.replace('</head>', '<link rel="stylesheet" href="minimap.css"></head>')
html = html.replace('</body>', '<script src="minimap-math.js"></script>\n<script src="minimap.js"></script>\n</body>')
(target / 'index.html').write_text(html, encoding='utf-8')

# Keep collision fixes when rebuilding the user's supplied scene.
import runpy
runpy.run_path(str(root / 'scripts/patch-collision.py'))
runpy.run_path(str(root / 'scripts/patch-walk-world.py'))
