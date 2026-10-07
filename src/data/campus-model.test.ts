import {describe,expect,it} from 'vitest';
import {campusModels} from './campus-model';
describe('complete campus exterior data',()=>{it('has unique, placeable building models',()=>{expect(new Set(campusModels.map(model=>model.id)).size).toBe(campusModels.length);for(const model of campusModels){expect(model.dimensions.every(value=>value>0)).toBe(true);expect(model.entrance).toHaveLength(2)}})});
