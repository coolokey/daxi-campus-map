import {describe,expect,it} from 'vitest';
import {getEvidenceForBuilding} from './visual-evidence';
describe('campus visual evidence',()=>{it('keeps photo evidence for the administrative building',()=>{expect(getEvidenceForBuilding('admin').length).toBeGreaterThan(0)})});
