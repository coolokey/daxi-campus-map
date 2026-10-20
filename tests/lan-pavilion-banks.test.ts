import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {runInContext} from 'node:vm';
import {afterAll,expect,it} from 'vitest';

const script=fileURLToPath(new URL('../scripts/verify-spatial-world.cjs',import.meta.url));
const prefix=readFileSync(script,'utf8').split('const report=vm.runInContext')[0];
const require=createRequire(script);
const {context,dom}=new Function('require','__dirname',`${prefix};return {context,dom};`)(require,fileURLToPath(new URL('../scripts',import.meta.url)));
const run=(s:string)=>runInContext(s,context,{timeout:180000});
afterAll(()=>dom.window.close());

it('places visible ascending tiers to the right and a continuous wall to the left, clear of pavilion and courts',()=>{
 const r=run(`(()=>{const p=CampusOutdoorPlan.lanBanks;if(!p)return null;scene.updateMatrixWorld(true);const tiers=[];scene.traverse(o=>{if(o.userData.lanBankTread)tiers.push(new THREE.Box3().setFromObject(o))});return {wall:p.wall,steps:p.steps,tiers:tiers.map(b=>({min:b.min,max:b.max})),wallVisible:!!scene.getObjectByName('lan-left-retaining-wall'),pavilionClear:!checkWallCollision(-18,0,-66),courtClear:!checkWallCollision(12,0,-60)}})()`);
 expect(r).not.toBeNull();expect(r.wall.x1).toBeLessThan(-23);expect(r.steps.x0).toBeGreaterThan(7);
 expect(r.steps.z1).toBeLessThan(-63);expect(r.tiers.length).toBeGreaterThanOrEqual(6);expect(r.wallVisible).toBe(true);
 expect(r.pavilionClear).toBe(true);expect(r.courtClear).toBe(true);
 for(let i=1;i<r.tiers.length;i++){expect(r.tiers[i].max.y).toBeGreaterThan(r.tiers[i-1].max.y);expect(r.tiers[i].max.z).toBeLessThanOrEqual(r.tiers[i-1].min.z+.01);}
});

it('blocks the retaining wall at speed and during jumping without blocking the running track',()=>{
 const r=run(`(()=>{if(!CampusOutdoorPlan.lanBanks)return null;const w=CampusOutdoorPlan.lanBanks.wall;return {hits:[0,1].map(y=>{const p={x:-80,y,z:w.z1+2};isJumping=y>0;const blocked=moveAvatarWithCollision(p,0,-6);isJumping=false;return {blocked,p,overlap:checkWallCollision(p.x,p.y,p.z)}}),trackClear:!checkWallCollision(-80,0,-51)}})()`);
 expect(r).not.toBeNull();expect(r.trackClear).toBe(true);for(const h of r.hits){expect(h.blocked).toBe(true);expect(h.overlap).toBe(false);}
});

it('supports real walking up and down every tier instead of floating above or entering the steps',()=>{
 const r=run(`(()=>{const s=CampusOutdoorPlan.lanBanks?.steps;if(!s)return null;const p={x:(s.x0+s.x1)/2,y:0,z:s.z1+1},bad=[];let peak=0;isJumping=false;for(const end of [s.z0+.5,s.z1+1]){const begin=p.z,n=Math.ceil(Math.abs(end-begin)/.08);for(let i=1;i<=n;i++){const z=begin+(end-begin)*i/n;if(moveAvatarWithCollision(p,0,z-p.z)||Math.abs(p.y-CampusOutdoorPlan.ground(p))>.01)bad.push({...p});peak=Math.max(peak,p.y);}}return {bad,p,peak,top:s.count*s.rise}})()`);
 expect(r).not.toBeNull();expect(r.bad).toEqual([]);expect(r.peak).toBeCloseTo(r.top);expect(r.p.y).toBeCloseTo(0);
});

it('can navigate from low, middle and top treads through the actual collision motor',()=>{
 const r=run(`(()=>{const s=CampusOutdoorPlan.lanBanks?.steps;if(!s)return null;const bad=[];for(const t of [.12,.5,.9])for(const id of ['lan-pavilion','academic']){const p={x:s.x0+3,y:0,z:s.z1-(s.z1-s.z0)*t};p.y=CampusOutdoorPlan.ground(p);const path=campusWalkWorld.route(p,ROOMS_DB[id]);if(!path){bad.push({t,id,reason:'no route'});continue}if(Math.hypot(path[0].x-p.x,path[0].y-p.y,path[0].z-p.z)>.01)bad.push({t,id,reason:'start changed'});for(const q of path.slice(1)){if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z)>.14){bad.push({t,id,p:{...p},target:q});break;}}}return bad})()`);
 expect(r).not.toBeNull();expect(r).toEqual([]);
});

it('keeps a standing student inside the terrace edges and obstructs cameras at the new solid walls',()=>{
 const r=run(`(()=>{const s=CampusOutdoorPlan.lanBanks.steps,w=CampusOutdoorPlan.lanBanks.wall,z=s.z0+1,y=CampusOutdoorPlan.ground({x:s.x0+2,z}),p={x:s.x0+2,y,z};const blocked=moveAvatarWithCollision(p,-4,0,0,true);return {blocked,overlap:checkWallCollision(p.x,p.y,p.z),x:p.x,min:s.x0,camera:campusWalkWorld.cameraBlocked({x:(w.x0+w.x1)/2,y:1,z:(w.z0+w.z1)/2})}})()`);
 expect(r.blocked).toBe(true);expect(r.overlap).toBe(false);expect(r.x).toBeGreaterThan(r.min+.4);expect(r.camera).toBe(true);
});

it('labels the raised outdoor treads as ground-level landscape rather than a building second floor',()=>{
 const r=run(`(()=>{const old=avatarGroup.position.clone();try{const s=CampusOutdoorPlan.lanBanks.steps,z=s.z0+.5;avatarGroup.position.set(23.5,CampusOutdoorPlan.ground({x:23.5,z}),z);return campusMinimap.locate()}finally{avatarGroup.position.copy(old)}})()`);
 expect(r.floor).toBe(1);expect(r.label).toBe('蘭亭旁階梯');
});
