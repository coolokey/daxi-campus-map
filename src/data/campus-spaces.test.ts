import {expect,it} from 'vitest';
import {campusSpaces,spacesOnFloor} from './campus-spaces';
it('keeps searchable spaces attached to existing models and floors',()=>{expect(campusSpaces.every(space=>space.buildingId.length>0)).toBe(true);expect(spacesOnFloor(2).map(space=>space.id)).toContain('academic')});
