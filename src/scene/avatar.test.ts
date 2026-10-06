import {describe,expect,it} from 'vitest';
import {AVATAR_HEIGHT,avatarCameraPosition} from './avatar';
describe('tour avatar',()=>{it('uses a human-scale height',()=>expect(AVATAR_HEIGHT).toBeCloseTo(1.7));it('places third-person camera behind the avatar',()=>expect(avatarCameraPosition({x:0,z:0},0)).toEqual({x:0,y:3.3,z:5}) )});
