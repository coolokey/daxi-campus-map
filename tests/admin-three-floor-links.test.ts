import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';BUILDINGS_CONFIG.map(CampusSpatialPlan.layout)');
it('connects administration on every floor to the corridor beside 907, 904 and 902',()=>{
 const all=load(),a=all.find((l:any)=>l.id==='admin-front'),nine=all.find((l:any)=>l.id==='grade9-back');
 expect(a.externalLinks).toHaveLength(3);
 for(const [i,id] of ['907','904','902'].entries()){
  const link=a.externalLinks[i],r=nine.rooms.find((r:any)=>r.id===id);
  expect(link.floor).toBe(i+1);expect(link.targetRoom).toBe(id);expect(link.path.length).toBe(2);
  expect(r.corridor.x).toBeLessThan(r.center.x);expect(link.path.at(-1)).toEqual(r.corridor);
  for(const p of link.path)expect(p.y).toBeCloseTo(i*3.6);
  for(let n=1;n<link.path.length;n++)for(let t=0;t<=20;t++){
   const p=link.path[n-1],q=link.path[n],x=p.x+(q.x-p.x)*t/20,z=p.z+(q.z-p.z)*t/20;
   expect(a.footprints.some((f:any)=>f.floor===i+1&&x>=f.rect.x0&&x<=f.rect.x1&&z>=f.rect.z0&&z<=f.rect.z1)).toBe(true);
  }
 }
});
it('keeps the activity center configuration and geometry in the existing place',()=>{
 const gym=load().find((l:any)=>l.id==='gym-bld');expect([gym.b.x,gym.b.z,gym.b.width,gym.b.depth,gym.b.floors,gym.b.roofHeight]).toEqual([-80,58,34,36,2,9.6]);
 expect(gym.bounds).toEqual({x0:-97,x1:-55.7,z0:40,z1:76});expect(gym.stairs).toHaveLength(2);
});

it('aligns both west body edges and all three central bridges without a sideways jog',()=>{
 const all=load(),a=all.find((l:any)=>l.id==='admin-front'),n=all.find((l:any)=>l.id==='grade9-back'),west=a.b.z-a.b.depth/2;
 expect(n.b.z-n.b.depth/2).toBeCloseTo(west);
 for(const [i,id] of ['907','904','902'].entries()){
  const r=n.rooms.find((r:any)=>r.id===id),link=a.externalLinks[i];expect(r.corridor.z).toBeCloseTo(a.b.z);
  for(const p of link.path){expect(p.z).toBeCloseTo(a.b.z);expect(p.y).toBeCloseTo(i*3.6);}
 }
});
