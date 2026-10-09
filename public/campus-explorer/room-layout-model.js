const CampusRoomLayout = (() => {
 const key=year=>`daxi-room-layout-v1-${year}`;
 const clean=name=>String(name??'').trim().slice(0,60);
 function normalize(value,rooms,aliases={}){
  const source=value&&typeof value==='object'?{...value}:{},legacy={},known=new Set(rooms.map(r=>r.id));
  for(const [oldId,id] of Object.entries(aliases))if(known.has(id)&&Object.hasOwn(source,oldId)){
   legacy[oldId]=clean(source[oldId]);
   if(!Object.hasOwn(source,id))source[id]=source[oldId];
  }
  const names={...legacy};for(const r of rooms)names[r.id]=clean(Object.hasOwn(source,r.id)?source[r.id]:r.name)||r.name;return names;
 }
 function parse(value,rooms,aliases={}){try{return normalize(JSON.parse(value),rooms,aliases)}catch{return normalize(null,rooms,aliases)}}
 function category(name,cat){const match=clean(name).match(/^([789])\d{2}(?:\s|$)/);return match?`grade${match[1]}`:cat==='admin'?'admin':cat==='special'?'special':'other';}
 return {key,normalize,parse,category};
})();
