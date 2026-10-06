import {describe,expect,it} from 'vitest';
import {movementFromKeys,clampToCampus} from './walk-controls';
describe('first-person walk controls',()=>{it('maps WASD to horizontal movement without a visible avatar',()=>{expect(movementFromKeys(new Set(['w','d']),0,1)).toEqual({x:1,z:-1})});it('keeps the camera inside campus bounds',()=>{expect(clampToCampus({x:70,z:-50})).toEqual({x:54,z:-38})})});
