import {describe,expect,it} from 'vitest';
import {quickDestinations,resolveFloorState} from './viewer-destinations';

describe('viewer destinations',()=>{
 it('only exposes confirmed quick destinations and keeps exterior floors explicit',()=>{
  expect(quickDestinations.map(item=>item.id)).toContain('admin');
  expect(resolveFloorState('3F')).toEqual({floor:'3F',available:false,label:'室內導覽規劃中'});
 });
});
