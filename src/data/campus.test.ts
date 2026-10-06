import { describe, expect, it } from 'vitest';
import { campus, findPlaceById, getInitialPlaceFromUrl, searchPlaces } from './campus';
describe('campus data',()=>{
 it('has unique ids and required places',()=>{const ids=campus.places.map(p=>p.id); expect(new Set(ids).size).toBe(ids.length); expect(findPlaceById('admin')?.name).toBe('行政大樓');});
 it('searches names and categories',()=>{expect(searchPlaces('科技')[0].id).toBe('technology'); expect(searchPlaces('入口')[0].id).toBe('main-gate');});
 it('reads direct place urls',()=>{expect(getInitialPlaceFromUrl('?to=track')?.name).toBe('操場及綜合球場'); expect(getInitialPlaceFromUrl('?to=bad')).toBeUndefined();});
});
