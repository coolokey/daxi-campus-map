import {describe,expect,it} from 'vitest'; import {getInitialPlaceFromUrl} from './data/campus';
describe('direct navigation',()=>{it('opens a valid place',()=>expect(getInitialPlaceFromUrl('?to=main-gate')?.name).toBe('正門'));it('falls back for an invalid place',()=>expect(getInitialPlaceFromUrl('?to=missing')).toBeUndefined())});
