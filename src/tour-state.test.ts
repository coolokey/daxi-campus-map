import {describe,expect,it} from 'vitest';
import {getInitialTourState,advanceTour} from './tour-state';
describe('3D tour opening flow',()=>{it('starts with opening tour on the home page',()=>expect(getInitialTourState('')).toBe('opening'));it('starts exploration when a direct place is requested',()=>expect(getInitialTourState('?to=admin')).toBe('explore'));it('advances from opening to third-person exploration',()=>expect(advanceTour('opening')).toBe('explore'))});
