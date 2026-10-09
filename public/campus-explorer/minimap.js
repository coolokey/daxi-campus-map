/* 人物定位小地圖：靜態樓層圖快取＋即時相機朝向與人物位置。 */
(() => {
 const api=window.campusExplorer;if(!api)return;
 const card=document.getElementById('minimap-card'),canvas=document.getElementById('minimap-canvas'),ctx=canvas.getContext('2d');
 const floorBadge=document.getElementById('minimap-floor-badge'),compass=card.querySelector('.minimap-compass');
 card.title='目前位置與視線方向；人物走動時，小地圖同步更新';
 card.setAttribute('role','img');card.style.cursor='default';
 const caption=document.createElement('div');caption.className='minimap-location';caption.setAttribute('aria-live','polite');card.append(caption);
 const cameraDirection=new THREE.Vector3(),layers=new Map(),origin={x:-170,z:-130},worldSize=320,pixelsPerUnit=4;
 function makeLayer(floor){
  const layer=document.createElement('canvas');layer.width=layer.height=worldSize*pixelsPerUnit;
  const c=layer.getContext('2d');c.scale(pixelsPerUnit,pixelsPerUnit);c.translate(-origin.x,-origin.z);
  c.fillStyle='#2b3644';c.fillRect(origin.x,origin.z,worldSize,worldSize);
  c.fillStyle='#6f805d';c.fillRect(-144,-89,257,190);
  const rect=(x,z,w,d,color)=>{c.fillStyle=color;c.fillRect(x,z,w,d)};
  // 與場景相同的主車道、校門鋪面、縱向通廊。
  rect(-65,81.5,170,9,'#9e5842');rect(48,-72,9,154,'#9e5842');
  rect(-60,43,62,35,'#a5a697');rect(-52,18,37,27,'#a5a697');rect(8,6,14,47,'#adae9f');
  c.strokeStyle='#bba765';c.lineWidth=.22;c.setLineDash([2.2,2.6]);
  c.beginPath();c.moveTo(-60,86);c.lineTo(105,86);c.moveTo(52.5,-70);c.lineTo(52.5,81);c.stroke();c.setLineDash([]);
  c.strokeStyle='#d3d2c8';c.lineWidth=.45;
  c.beginPath();c.moveTo(48,-72);c.lineTo(48,82);c.moveTo(57,-72);c.lineTo(57,81);c.moveTo(-65,81.5);c.lineTo(105,81.5);c.stroke();
  for(let i=0;i<7;i++)rect(-19+i*2,77,1,9,'#eeeede');
  // 操場採直道＋半圓彎道，不使用與模型不符的橢圓。
  function stadium(radius){c.beginPath();c.moveTo(-109,-25-radius);c.lineTo(-59,-25-radius);c.arc(-59,-25,radius,-Math.PI/2,Math.PI/2);c.lineTo(-109,-25+radius);c.arc(-109,-25,radius,Math.PI/2,Math.PI*1.5);c.closePath()}
  const outdoor=CampusOutdoorPlan,hex=n=>'#'+n.toString(16).padStart(6,'0');
  stadium(outdoor.track.outerRadius);c.fillStyle=hex(outdoor.palette.track);c.fill();stadium(outdoor.track.innerRadius);c.fillStyle=hex(outdoor.palette.lawn);c.fill();
  for(let r=20;r<27;r+=1.7){stadium(r);c.strokeStyle='#d6d8d0';c.lineWidth=.16;c.stroke()}
  for(const r of outdoor.courts){rect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0,hex(outdoor.palette.court));c.strokeStyle=hex(outdoor.palette.line);c.lineWidth=.12;c.strokeRect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0)}
  rect(-29,-52,14,28,'#718c6c');rect(-5,-61,34,46,'#897660');
  for(const z of [-52,-38,-24]){rect(-2,z-6.3,28,12.6,'#739078');c.strokeStyle='#e0e4d5';c.lineWidth=.15;c.strokeRect(-2,z-6.3,28,12.6);c.beginPath();c.arc(-8.5,z,2.5,0,Math.PI*2);c.stroke();c.beginPath();c.arc(24.5,z,2.5,0,Math.PI*2);c.stroke()}
  const stage=outdoor.stage;rect(stage.x0,stage.z0,stage.x1-stage.x0,stage.z1-stage.z0,hex(outdoor.palette.stage));rect(stage.stairs.x0,stage.stairs.z0,stage.stairs.x1-stage.stairs.x0,stage.stairs.z1-stage.stairs.z0,hex(outdoor.palette.step));
  for(let z=stage.stairs.z0;z<stage.stairs.z1;z+=.5){c.strokeStyle='#eee8cc';c.lineWidth=.1;c.beginPath();c.moveTo(stage.stairs.x0,z);c.lineTo(stage.stairs.x1,z);c.stroke()}
  rect(-50,18,8,5,'#a7987d');
  // 世界矩形與樓層格子來自步行模型，包含多翼、穿堂和實際空缺。
  const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
  const fill=(r,color)=>rect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0,color);
  const outline=r=>c.strokeRect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0);
  for(const l of window.campusWalkWorld.layouts){
   const active=l.footprints.filter(f=>f.floor===floor),footprints=active.length?active:l.footprints.filter(f=>f.floor===1);
   for(const footprint of footprints){fill(footprint.rect,active.length?'#b6b7ac':'#647169');c.strokeStyle=active.length?'#eeeee2':'#809087';c.lineWidth=.3;outline(footprint.rect)}
   if(!active.length)continue;
   for(const corridor of l.corridors.filter(corridor=>corridor.floor===floor))fill(corridor.rect,'#d7d6c2');
   for(const cell of l.cells.filter(cell=>cell.floor===floor)){
    if(cell.kind==='void')continue;
    const r=cell.rect;
    if(cell.kind==='room'){
     const room=api.rooms[cell.id]||cell,name=room.name;
     fill(r,colors[CampusRoomLayout.category(name,room.cat)]);c.strokeStyle='#eeeede';c.lineWidth=.3;outline(r);
     const door=cell.door;
     if(door){
      const sides=[{d:Math.abs(door.x-r.x0),x0:r.x0,z0:door.z-.65,x1:r.x0,z1:door.z+.65},{d:Math.abs(door.x-r.x1),x0:r.x1,z0:door.z-.65,x1:r.x1,z1:door.z+.65},{d:Math.abs(door.z-r.z0),x0:door.x-.65,z0:r.z0,x1:door.x+.65,z1:r.z0},{d:Math.abs(door.z-r.z1),x0:door.x-.65,z0:r.z1,x1:door.x+.65,z1:r.z1}];
      const side=sides.sort((a,b)=>a.d-b.d)[0];c.beginPath();c.moveTo(side.x0,side.z0);c.lineTo(side.x1,side.z1);c.strokeStyle='#d7d6c2';c.lineWidth=.65;c.stroke();
     }
    }else if(cell.kind==='stair'){
     fill(r,'#647584');c.strokeStyle='#d9e4e6';c.lineWidth=.16;
     for(let i=1;i<7;i++){c.beginPath();if(r.x1-r.x0>r.z1-r.z0){const x=r.x0+(r.x1-r.x0)*i/7;c.moveTo(x,r.z0);c.lineTo(x,r.z1)}else{const z=r.z0+(r.z1-r.z0)*i/7;c.moveTo(r.x0,z);c.lineTo(r.x1,z)}c.stroke()}
    }else if(cell.kind==='wc'){
     fill(r,'#7894ad');c.fillStyle='#f0f5ed';c.font='bold 1.7px sans-serif';c.textAlign='center';c.fillText('WC',(r.x0+r.x1)/2,(r.z0+r.z1)/2+.6);c.textAlign='start';
    }else if(cell.kind==='passage')fill(r,'#90a38a');
   }
  }
  // 警衛室、停車區與停車格。
  rect(3,83,6,6,'#a6574b');rect(62,74,30,8,'#797d79');
  for(let i=0;i<7;i++){c.strokeStyle='#d4d7cd';c.lineWidth=.18;c.strokeRect(64+i*3.7,74.5,3.4,6.5)}
  c.fillStyle='#e2e4d9';c.font='bold 2.8px sans-serif';c.fillText('P',65,78);
  for(let i=0;i<6;i++){c.fillStyle=['#76555e','#6f88a0','#536454'][i%3];c.fillRect(66+i*3.7,75.5,1.5,3.2)}
  layers.set(floor,layer);return layer;
 }
 const locate=position=>CampusSpatialUI.locate(position,window.campusWalkWorld.layouts,p=>CampusOutdoorPlan.onStage(p)?{floor:1,label:'操場司令台',buildingId:null}:CampusMinimapMath.locate(p,[]));
 let lastTime=0,lastCaption='';
 function render(force=false){
  const now=performance.now();if(!force&&now-lastTime<70)return;lastTime=now;
  const position=avatarGroup.position,location=locate(position);
  api.camera.getWorldDirection(cameraDirection);
  const heading=Math.atan2(cameraDirection.x,-cameraDirection.z),size=Math.round(card.clientWidth*Math.min(devicePixelRatio||1,2));
  if(canvas.width!==size){canvas.width=canvas.height=size}
  const scale=size/172*2.5,centerY=size*.6;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#2b3644';ctx.fillRect(0,0,size,size);
  ctx.translate(size/2,centerY);ctx.rotate(-heading);ctx.scale(scale,scale);ctx.translate(-position.x,-position.z);
  ctx.drawImage(layers.get(location.floor)||makeLayer(location.floor),origin.x,origin.z,worldSize,worldSize);
  const segments=CampusSpatialUI.routeSegments(currentNavPoints,location.floor);
  if(segments.length){
   ctx.beginPath();for(const [a,b] of segments){ctx.moveTo(a.x,a.z);ctx.lineTo(b.x,b.z)}ctx.strokeStyle='#302a15';ctx.lineWidth=1.9;ctx.stroke();ctx.strokeStyle='#eed06b';ctx.lineWidth=.85;ctx.stroke();
  }
  ctx.setTransform(1,0,0,1,0,0);
  const unit=size/172,arrowAngle=Math.atan2(Math.sin(avatarAngle),-Math.cos(avatarAngle))-heading;
  ctx.save();ctx.translate(size/2,centerY);ctx.rotate(arrowAngle);
  ctx.beginPath();ctx.moveTo(0,-10*unit);ctx.lineTo(7*unit,8*unit);ctx.lineTo(0,4*unit);ctx.lineTo(-7*unit,8*unit);ctx.closePath();ctx.fillStyle='#fff';ctx.strokeStyle='#101923';ctx.lineWidth=2*unit;ctx.fill();ctx.stroke();ctx.restore();
  floorBadge.textContent=`${location.floor}F`;
  const room=window.campusWalkWorld?.roomAt(position);
  const text=`${room?room.name.replace(/\s*\(\d+F\)/,''):location.label}・${location.floor}F`;
  if(text!==lastCaption){caption.textContent=text;card.setAttribute('aria-label',`目前位置：${text}`);lastCaption=text}
  const r=card.clientWidth*.42,x=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth/2-Math.sin(heading)*r)),y=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth*.6-Math.cos(heading)*r));
  compass.style.left=`${x}px`;compass.style.top=`${y}px`;compass.title='校園平面圖的上方方向';
  card.dataset.worldX=position.x.toFixed(2);card.dataset.worldZ=position.z.toFixed(2);card.dataset.heading=heading.toFixed(3);card.dataset.floor=String(location.floor);card.dataset.location=location.label;
 }
 // 取代原本整校總覽；每幀由既有主迴圈呼叫，依 70ms 節流。
 renderMinimap=()=>render();
 window.campusMinimap={render:()=>render(true),invalidate:()=>{layers.clear();render(true)},locate:()=>locate(avatarGroup.position)};
 render(true);
})();
