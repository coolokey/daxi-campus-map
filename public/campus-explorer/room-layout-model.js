const CampusRoomLayout = (() => {
 const key=year=>`daxi-room-layout-v1-${year}`;
 const clean=name=>String(name??'').trim().slice(0,60);
 function normalize(value,rooms){const names={};for(const r of rooms)names[r.id]=clean(value&&Object.hasOwn(value,r.id)?value[r.id]:r.name)||r.name;return names;}
 function parse(value,rooms){try{return normalize(JSON.parse(value),rooms)}catch{return normalize(null,rooms)}}
 function category(name,cat){const match=clean(name).match(/^([789])\d{2}(?:\s|$)/);return match?`grade${match[1]}`:cat==='admin'?'admin':cat==='special'?'special':'other';}
 return {key,normalize,parse,category};
})();
