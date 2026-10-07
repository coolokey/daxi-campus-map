import {expect,it} from 'vitest';
import {birdseyeFocusFor} from './camera-focus';

it('returns an elevated focus position for a selected campus place',()=>{
 const focus=birdseyeFocusFor({world:[0,-23]});
 expect(focus.position[1]).toBeGreaterThan(20);
 expect(focus.target).toEqual([0,0,-23]);
});
