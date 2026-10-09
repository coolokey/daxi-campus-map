/* Broad phase only; the established avatar AABB and vertical rules are unchanged. */
const CampusCollisionGrid={
 create(walls,radius=.42,height=1.8,size=4){
  const cells=new Map(),key=(x,z)=>`${x},${z}`;
  for(const c of walls)for(let x=Math.floor((c.minX-radius)/size);x<=Math.floor((c.maxX+radius)/size);x++)for(let z=Math.floor((c.minZ-radius)/size);z<=Math.floor((c.maxZ+radius)/size);z++){
   const k=key(x,z);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(c);
  }
  return {hit(x,y,z){return(cells.get(key(Math.floor(x/size),Math.floor(z/size)))||[]).some(c=>y+height-.2>=c.minY&&y+.2<=c.maxY&&x+radius>c.minX&&x-radius<c.maxX&&z+radius>c.minZ&&z-radius<c.maxZ)},cells};
 }
};
