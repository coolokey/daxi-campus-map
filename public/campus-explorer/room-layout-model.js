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
 const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
 function nameplate(name,cat){const text=clean(name).replace(/\s*\(\d+F\)/,''),color=colors[category(text,cat)];return{text,color,key:text+'|'+color};}
 return {key,normalize,parse,category,colors,nameplate};
})();
