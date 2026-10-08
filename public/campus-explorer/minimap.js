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
  rect(-65,81.5,170,9,'#626668');rect(48,-72,9,154,'#626668');
  rect(-60,43,62,35,'#a5a697');rect(-52,18,37,27,'#a5a697');rect(8,6,14,47,'#adae9f');
  c.strokeStyle='#bba765';c.lineWidth=.22;c.setLineDash([2.2,2.6]);
  c.beginPath();c.moveTo(-60,86);c.lineTo(105,86);c.moveTo(52.5,-70);c.lineTo(52.5,81);c.stroke();c.setLineDash([]);
  c.strokeStyle='#d3d2c8';c.lineWidth=.45;
  c.beginPath();c.moveTo(48,-72);c.lineTo(48,82);c.moveTo(57,-72);c.lineTo(57,81);c.moveTo(-65,81.5);c.lineTo(105,81.5);c.stroke();
  for(let i=0;i<7;i++)rect(-19+i*2,77,1,9,'#eeeede');
  // 操場採直道＋半圓彎道，不使用與模型不符的橢圓。
  function stadium(radius){c.beginPath();c.moveTo(-109,-25-radius);c.lineTo(-59,-25-radius);c.arc(-59,-25,radius,-Math.PI/2,Math.PI/2);c.lineTo(-109,-25+radius);c.arc(-109,-25,radius,Math.PI/2,Math.PI*1.5);c.closePath()}
  stadium(27);c.fillStyle='#45494b';c.fill();stadium(18);c.fillStyle='#7e915f';c.fill();
  for(let r=20;r<27;r+=1.7){stadium(r);c.strokeStyle='#d6d8d0';c.lineWidth=.16;c.stroke()}
  rect(-74,-38,14,24,'#a65b51');rect(-29,-52,14,28,'#718c6c');rect(-11,-55,46,34,'#897660');
  for(let i=0;i<3;i++){rect(-10+i*14.6,-53.8,12.6,28,'#739078');c.strokeStyle='#e0e4d5';c.lineWidth=.15;c.strokeRect(-10+i*14.6,-53.8,12.6,28);c.beginPath();c.arc(-3.7+i*14.6,-39.8,2.5,0,Math.PI*2);c.stroke()}
  rect(-70,8,16,7.5,'#94a3a8');rect(-50,18,8,5,'#a7987d');
  // 建築輪廓與所在樓層分間，鄰棟以低對比保留方向辨識。
  for(const b of api.buildings){
   const x=b.x-b.width/2,z=b.z-b.depth/2;
   rect(x+.7,z+.7,b.width,b.depth,'#435448');rect(x,z,b.width,b.depth,b.isGymSpecial?'#ae9990':'#b6b7ac');
   c.strokeStyle='#eeeee2';c.lineWidth=.3;c.strokeRect(x,z,b.width,b.depth);
   if(floor<=b.floors){
    const horizontal=b.width>=b.depth,rooms=b.rooms.filter(r=>r.floor===floor),count=Math.max(1,rooms.length);
    const corridor=horizontal?z+b.depth-2.6:x+2.6;
    c.strokeStyle='#e8e8db';c.lineWidth=.28;c.beginPath();
    if(horizontal){c.moveTo(x,corridor);c.lineTo(x+b.width,corridor)}else{c.moveTo(corridor,z);c.lineTo(corridor,z+b.depth)}c.stroke();
    for(let i=1;i<count;i++){c.beginPath();if(horizontal){c.moveTo(x+i*b.width/count,z);c.lineTo(x+i*b.width/count,corridor)}else{c.moveTo(corridor,z+i*b.depth/count);c.lineTo(x+b.width,z+i*b.depth/count)}c.stroke()}
   }
  }
  // 警衛室、停車區與停車格。
  rect(3,83,6,6,'#a6574b');rect(62,74,30,8,'#797d79');
  for(let i=0;i<7;i++){c.strokeStyle='#d4d7cd';c.lineWidth=.18;c.strokeRect(64+i*3.7,74.5,3.4,6.5)}
  c.fillStyle='#e2e4d9';c.font='bold 2.8px sans-serif';c.fillText('P',65,78);
  for(let i=0;i<6;i++){c.fillStyle=['#76555e','#6f88a0','#536454'][i%3];c.fillRect(66+i*3.7,75.5,1.5,3.2)}
  layers.set(floor,layer);return layer;
 }
 let lastTime=0,lastCaption='';
 function render(force=false){
  const now=performance.now();if(!force&&now-lastTime<70)return;lastTime=now;
  const position=avatarGroup.position,location=CampusMinimapMath.locate(position,api.buildings);
  api.camera.getWorldDirection(cameraDirection);
  const heading=Math.atan2(cameraDirection.x,-cameraDirection.z),size=Math.round(card.clientWidth*Math.min(devicePixelRatio||1,2));
  if(canvas.width!==size){canvas.width=canvas.height=size}
  const scale=size/172*2.5,centerY=size*.6;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#2b3644';ctx.fillRect(0,0,size,size);
  ctx.translate(size/2,centerY);ctx.rotate(-heading);ctx.scale(scale,scale);ctx.translate(-position.x,-position.z);
  ctx.drawImage(layers.get(location.floor)||makeLayer(location.floor),origin.x,origin.z,worldSize,worldSize);
  if(currentNavPoints.length){
   ctx.beginPath();currentNavPoints.forEach((p,i)=>i?ctx.lineTo(p.x,p.z):ctx.moveTo(p.x,p.z));ctx.strokeStyle='#302a15';ctx.lineWidth=1.9;ctx.stroke();ctx.strokeStyle='#eed06b';ctx.lineWidth=.85;ctx.stroke();
  }
  ctx.setTransform(1,0,0,1,0,0);
  const unit=size/172,arrowAngle=Math.atan2(Math.sin(avatarAngle),-Math.cos(avatarAngle))-heading;
  ctx.save();ctx.translate(size/2,centerY);ctx.rotate(arrowAngle);
  ctx.beginPath();ctx.moveTo(0,-10*unit);ctx.lineTo(7*unit,8*unit);ctx.lineTo(0,4*unit);ctx.lineTo(-7*unit,8*unit);ctx.closePath();ctx.fillStyle='#fff';ctx.strokeStyle='#101923';ctx.lineWidth=2*unit;ctx.fill();ctx.stroke();ctx.restore();
  floorBadge.textContent=`${location.floor}F`;
  const text=`${location.label}・${location.floor}F`;
  if(text!==lastCaption){caption.textContent=text;card.setAttribute('aria-label',`目前位置：${text}`);lastCaption=text}
  const r=card.clientWidth*.42,x=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth/2-Math.sin(heading)*r)),y=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth*.6-Math.cos(heading)*r));
  compass.style.left=`${x}px`;compass.style.top=`${y}px`;compass.title='校園平面圖的上方方向';
  card.dataset.worldX=position.x.toFixed(2);card.dataset.worldZ=position.z.toFixed(2);card.dataset.heading=heading.toFixed(3);card.dataset.floor=String(location.floor);card.dataset.location=location.label;
 }
 // 取代原本整校總覽；每幀由既有主迴圈呼叫，依 70ms 節流。
 renderMinimap=()=>render();
 window.campusMinimap={render:()=>render(true),locate:()=>CampusMinimapMath.locate(avatarGroup.position,api.buildings)};
 render(true);
})();
