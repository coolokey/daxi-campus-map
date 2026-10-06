import {describe,expect,it} from 'vitest';
import {campusSceneTheme,overviewCamera} from './scene-theme';

describe('campus scene theme',()=>{
 it('uses a warm campus palette and elevated overview camera',()=>{
  expect(campusSceneTheme.redRoof).not.toBe(campusSceneTheme.darkRoof);
  expect(overviewCamera.position[1]).toBeGreaterThan(overviewCamera.target[1]);
 });
});
