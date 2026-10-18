import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';

const outdoorPlan=new Function(readFileSync(new URL('../public/campus-explorer/outdoor-plan.js',import.meta.url),'utf8')+';return CampusOutdoorPlan;')();
const source = readFileSync(new URL('../public/campus-explorer/explorer.js', import.meta.url), 'utf8');
function extract(name: string, next: string) {
  return source.slice(source.indexOf(`function ${name}()`), source.indexOf(next, source.indexOf(`function ${name}()`)));
}
function canvasDocument() {
  const text: string[] = [];
  const context = new Proxy({ fillText(value: string) { text.push(value); } }, {
    get(target, key) { return key in target ? target[key as keyof typeof target] : () => {}; },
    set(target, key, value) { (target as any)[key] = value; return true; },
  });
  return { text, document: { createElement: () => ({ width: 0, height: 0, getContext: () => context }) } };
}

describe('photo confirmed gate and statue landmarks', () => {
  it('paints both confirmed seven-character gate couplets in the photo order', () => {
    const mock = canvasDocument();
    const texture = new Function('THREE', 'document', `${extract('createGatePylonTexture', '// 「禮義廉恥」')} return createGatePylonTexture();`)(THREE, mock.document);
    expect(texture).toBeInstanceOf(THREE.CanvasTexture);
    expect(mock.text.join('')).toBe('大雁乘風飛萬里溪聲向學步高峰');
  });

  it('builds a square stepped stone plinth and an articulated dark bust with its black and gold plaque', () => {
    const scene = new THREE.Scene();
    const rooms: Record<string, any> = {};
    const mock = canvasDocument();
    new Function('THREE', 'document', 'scene', 'ROOMS_DB', 'createCypressTree', 'CampusOutdoorPlan', `${extract('createStatueCourtyard', '    createStatueCourtyard();')} createStatueCourtyard();`)(THREE, mock.document, scene, rooms, () => new THREE.Group(), outdoorPlan);
    const group = scene.children.find(child => child.name === 'photo-statue-courtyard')!;
    expect(group).toBeDefined();
    for (const name of ['stone-plinth', 'front-step', 'bust-head', 'bust-nose', 'bust-ear-left', 'bust-ear-right', 'bust-shoulders', 'bust-collar-left', 'bust-collar-right', 'statue-plaque']) {
      expect(group.getObjectByName(name), name).toBeDefined();
    }
    expect((group.getObjectByName('stone-plinth') as THREE.Mesh).geometry).toBeInstanceOf(THREE.BoxGeometry);
    expect(mock.text.join('')).toContain('民族救星');
    expect(rooms.statue.node).toBe('statue-node');
    // The existing destination is the viewing point, beyond every decorative part.
    const bounds = new THREE.Box3().setFromObject(group);
    expect(bounds.max.z).toBeLessThan(31.5);
    expect(bounds.containsPoint(new THREE.Vector3(-36, 0, 32))).toBe(false);
    const head = group.getObjectByName('bust-head') as THREE.Mesh;
    expect((head.material as THREE.MeshStandardMaterial).color.getHex()).toBe(0x303337);
  });
  it('sculpts a bald continuous head with eyelids, smile folds and a fitted Zhongshan collar',()=>{
    const scene=new THREE.Scene(),mock=canvasDocument();
    new Function('THREE','document','scene','ROOMS_DB','createCypressTree','CampusOutdoorPlan',`${extract('createStatueCourtyard','    createStatueCourtyard();')} createStatueCourtyard();`)(THREE,mock.document,scene,{},()=>new THREE.Group(),outdoorPlan);
    const g=scene.getObjectByName('photo-statue-courtyard')!,head=g.getObjectByName('bust-head') as THREE.Mesh;
    expect(head.geometry.type).toBe('BufferGeometry');expect(g.getObjectByName('bust-hair')).toBeUndefined();
    for(const name of ['bust-upper-lid--1','bust-upper-lid-1','bust-smile-fold--1','bust-smile-fold-1','bust-mouth','bust-chin','bust-collar-left','bust-collar-right'])expect(g.getObjectByName(name),name).toBeDefined();
    expect(head.geometry.attributes.position.count).toBeGreaterThan(1500);
    const positions=head.geometry.attributes.position,normals=head.geometry.attributes.normal,seen=new Map<string,THREE.Vector3>();
    for(let i=0;i<positions.count;i++){
      const key=[positions.getX(i),positions.getY(i),positions.getZ(i)].map(n=>Math.round(n*1e6)).join(','),normal=new THREE.Vector3().fromBufferAttribute(normals,i);
      if(seen.has(key))expect(normal.dot(seen.get(key)!),`head seam ${key}`).toBeGreaterThan(.9999);else seen.set(key,normal);
    }
  });
});
