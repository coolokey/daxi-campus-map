import {expect,it} from 'vitest';
import {movementSpeed,turnSensitivity} from './avatar-settings';
it('converts visible avatar settings into safe movement values',()=>{expect(movementSpeed(100)).toBeCloseTo(.14);expect(turnSensitivity(100)).toBeCloseTo(.002)});
