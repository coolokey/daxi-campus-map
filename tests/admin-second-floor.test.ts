import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';CampusSpatialPlan.layout(BUILDINGS_CONFIG.find(b=>b.id==="admin-front"))');
const overlaps=(a:any,b:any)=>a.u0<b.u1-1e-6&&a.u1>b.u0+1e-6&&a.v0<b.v1-1e-6&&a.v1>b.v0+1e-6;
it('stacks oil printing in front of the principal, with doors onto the arrival circulation',()=>{
 const l=load(),oil=l.rooms.find((r:any)=>r.id==='reception'),principal=l.rooms.find((r:any)=>r.id==='principal');
 expect(oil.name).toBe('油印室 (2F)');expect(oil.u0).toBe(principal.u0);expect(oil.u1).toBe(principal.u1);expect(oil.v1).toBeLessThanOrEqual(principal.v0);
 expect(oil.doorSide).toBe('u1');
 for(const r of [oil,principal])expect(l.corridors.some((c:any)=>c.floor===2&&c.rect.x0<=r.corridor.x&&c.rect.x1>=r.corridor.x&&c.rect.z0<=r.corridor.z&&c.rect.z1>=r.corridor.z)).toBe(true);
});
it('separates the rear offices and puts the only 2F WC in front of personnel/accounting',()=>{
 const l=load(),general=l.rooms.find((r:any)=>r.id==='general'),personnel=l.rooms.find((r:any)=>r.id==='personnel-accounting'),wcs=l.cells.filter((c:any)=>c.floor===2&&c.kind==='wc');
 expect(general.name).toBe('總務處 (2F)');expect(personnel?.name).toBe('人事室／會計室 (2F)');expect(wcs).toHaveLength(1);
 expect(wcs[0].u0).toBe(personnel.u0);expect(wcs[0].u1).toBe(personnel.u1);expect(wcs[0].v0).toBe(personnel.v1);expect(wcs[0].doorSide).toBe('v1');
});
it('keeps 2F rooms, WC, corridors and the live stair opening disjoint',()=>{
 const l=load(),rooms=l.cells.filter((c:any)=>c.floor===2&&['room','wc'].includes(c.kind));
 for(const r of rooms){for(const q of rooms)if(q!==r)expect(overlaps(r,q),r.id+' '+q.id).toBe(false);for(const c of l.corridors.filter((c:any)=>c.floor===2))expect(overlaps(r,c),r.id+' corridor').toBe(false);for(const h of l.holes.filter((h:any)=>2>=(h.fromFloor||1)&&2<=(h.toFloor||Infinity)))expect(overlaps(r,h),r.id+' stair hole').toBe(false);}
});
it('shows each 2F office once without obsolete empty configuration rows',()=>{
 const l=load(),w:any={};runInNewContext(readFileSync('public/campus-explorer/spatial-ui-tools.js','utf8'),{window:w});
 const rows=w.CampusSpatialUI.rows(l,2);expect(rows.every((r:any)=>r.cells.some((c:any)=>c.kind!=='void'))).toBe(true);
 const ids=rows.flatMap((r:any)=>r.cells.filter((c:any)=>c.kind==='room').map((c:any)=>c.id));expect(ids.sort()).toEqual(l.rooms.filter((r:any)=>r.floor===2).map((r:any)=>r.id).sort());
});
