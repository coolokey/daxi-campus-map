import {describe,expect,it} from 'vitest';
import {buildingStyleFor} from './building-style';
describe('building styles',()=>{it('assigns the photographed administrative building its white gray red roof style',()=>expect(buildingStyleFor('admin')).toBe('white-gray-red-roof'))});
