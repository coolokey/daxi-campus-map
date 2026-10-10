// @vitest-environment jsdom
import {it,expect,vi} from 'vitest';
import {act,createElement} from 'react';
import {createRoot} from 'react-dom/client';
const audit=vi.hoisted(()=>({renderers:[] as any[],resources:[] as any[]}));
vi.mock('three',async()=>{
 const actual=await vi.importActual<any>('three');
 return {...actual,WebGLRenderer:class{
  domElement=document.createElement('canvas');shadowMap={};dispose=vi.fn();
  constructor(){audit.renderers.push(this)}setPixelRatio(){}setSize(){}render(){}
 }};
});
vi.mock('../scene/buildCampus',async()=>{
 const THREE=await import('three');
 return {createAvatar:()=>new THREE.Group(),buildCampus:(scene:any)=>{
  const geometry=new THREE.BoxGeometry(),material=new THREE.MeshBasicMaterial(),texture=new THREE.Texture();material.map=texture;
  const resource={geometry:vi.spyOn(geometry,'dispose'),material:vi.spyOn(material,'dispose'),texture:vi.spyOn(texture,'dispose')};audit.resources.push(resource);
  scene.add(new THREE.Mesh(geometry,material),new THREE.Mesh(geometry,material));
 }};
});
import CampusScene3D from './CampusScene3D';
it('parent rerenders preserve the scene and unmount releases shared GPU resources once',async()=>{
 vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.stubGlobal('requestAnimationFrame',()=>1);vi.stubGlobal('cancelAnimationFrame',()=>{});
 const host=document.createElement('div');document.body.append(host);const root=createRoot(host),places:any[]=[];
 const render=()=>createElement(CampusScene3D,{places,onSelect:()=>{}} as any);
 await act(async()=>root.render(render()));const count=audit.renderers.length;
 await act(async()=>root.render(render()));expect(audit.renderers.length).toBe(count);
 await act(async()=>root.unmount());
 const resources=audit.resources[audit.resources.length-1];for(const dispose of Object.values(resources) as any[])expect(dispose).toHaveBeenCalledTimes(1);
 expect(audit.renderers[audit.renderers.length-1].dispose).toHaveBeenCalledTimes(1);host.remove();vi.unstubAllGlobals();
});
