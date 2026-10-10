import {describe,expect,it} from 'vitest';
import {movementFromKeys,clampToCampus,frameScale} from './walk-controls';
describe('first-person walk controls',()=>{it('maps WASD to horizontal movement without a visible avatar',()=>{expect(movementFromKeys(new Set(['w','d']),0,1)).toEqual({x:1,z:-1})});it('keeps the camera inside campus bounds',()=>{expect(clampToCampus({x:70,z:-50})).toEqual({x:54,z:-38})})});

it('30, 60 and 120 Hz walking covers the same distance and bounds long frame delays',()=>{
 for(const hz of [30,60,120]){let z=0;for(let i=0;i<hz;i++)z+=movementFromKeys(new Set(['w']),0,.14*frameScale(1/hz)).z;expect(z).toBeCloseTo(-8.4);}
 expect(frameScale(10)).toBe(6);expect(frameScale(-1)).toBe(0);
});
