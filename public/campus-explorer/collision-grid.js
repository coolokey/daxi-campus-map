/* Broad phase only; the established avatar AABB and vertical rules are unchanged. */
const CampusCollisionGrid={
 // SAT: an axis-aligned character footprint against the actual rotated wall.
 // Keep the original AABB rules for existing buildings and stair guards.
 overlaps(c,x,z,radius=0,padding=0){
  // Route interpolation can turn an exact tangent into a 1e-14 overlap.
  // Ignore only numerical noise; real penetration still blocks the full body.
  const r=radius+padding,epsilon=1e-8;
  if(!(x+r>c.minX+epsilon&&x-r<c.maxX-epsilon&&z+r>c.minZ+epsilon&&z-r<c.maxZ-epsilon))return false;
  if(!c.segment)return true;
  const s=c.segment,dx=s.bx-s.ax,dz=s.bz-s.az,length=Math.hypot(dx,dz),ux=dx/length,uz=dz/length;
  const px=x-(s.ax+s.bx)/2,pz=z-(s.az+s.bz)/2,foot=radius*(Math.abs(ux)+Math.abs(uz))+padding;
  return Math.abs(px*ux+pz*uz)<length/2+foot-epsilon&&Math.abs(-px*uz+pz*ux)<s.thickness/2+foot-epsilon;
 },
 create(walls,radius=.42,height=1.8,size=4){
  const cells=new Map(),key=(x,z)=>`${x},${z}`;
  for(const c of walls)for(let x=Math.floor((c.minX-radius-.08)/size);x<=Math.floor((c.maxX+radius+.08)/size);x++)for(let z=Math.floor((c.minZ-radius-.08)/size);z<=Math.floor((c.maxZ+radius+.08)/size);z++){
   const k=key(x,z);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(c);
  }
  return {hit(x,y,z){return(cells.get(key(Math.floor(x/size),Math.floor(z/size)))||[]).some(c=>y+height-.2>=c.minY&&y+.2<=c.maxY&&CampusCollisionGrid.overlaps(c,x,z,radius))},
   pointHit(x,y,z){return(cells.get(key(Math.floor(x/size),Math.floor(z/size)))||[]).some(c=>y>c.minY&&y<c.maxY&&CampusCollisionGrid.overlaps(c,x,z,0,.08))},cells};
 }
};
