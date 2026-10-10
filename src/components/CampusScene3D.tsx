import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {buildCampus,createAvatar} from '../scene/buildCampus';
import {clampToCampus,movementFromKeys,frameScale} from '../scene/walk-controls';
import {campusSceneTheme,overviewCamera} from '../scene/scene-theme';
import {birdseyeFocusFor} from '../scene/camera-focus';
import {movementSpeed,turnSensitivity} from '../scene/avatar-settings';
import type {Place} from '../data/campus';

export default function CampusScene3D({places}:{places:Place[]}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!ref.current)return;const host=ref.current,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,host.clientWidth/host.clientHeight,.1,300),renderer=new THREE.WebGLRenderer({antialias:true});
  scene.background=new THREE.Color(campusSceneTheme.sky);scene.fog=new THREE.Fog(campusSceneTheme.fog,78,175);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);buildCampus(scene,places);
  const avatar=createAvatar();avatar.position.set(0,0,0);scene.add(avatar);const desiredPosition=new THREE.Vector3(...overviewCamera.position),desiredTarget=new THREE.Vector3(...overviewCamera.target),lookTarget=desiredTarget.clone();camera.position.copy(desiredPosition);camera.lookAt(lookTarget);
  const keys=new Set<string>();let walking=false,yaw=0,pitch=-.25,speed=100,turn=100;
  const focus=(event:Event)=>{const place=(event as CustomEvent<Place>).detail;if(!place)return;const next=birdseyeFocusFor(place);desiredPosition.set(next.position[0],next.position[1],next.position[2]);desiredTarget.set(next.target[0],next.target[1],next.target[2]);walking=false;document.exitPointerLock?.()};
  const toggleWalk=()=>{walking=!walking;if(walking)renderer.domElement.requestPointerLock?.()?.catch(()=>{})};
  const clearKeys=()=>keys.clear();
  const key=(e:KeyboardEvent)=>{if(e.target instanceof Element&&e.target.closest('input,textarea,select,[contenteditable]'))return;if(['w','a','s','d','W','A','S','D','Shift'].includes(e.key)){e.preventDefault();keys.add(e.key.toLowerCase())}if(e.key==='Escape')walking=false};const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());const move=(e:MouseEvent)=>{if(walking){yaw-=e.movementX*turnSensitivity(turn);pitch=Math.max(-1.1,Math.min(.5,pitch-e.movementY*turnSensitivity(turn)))}};
  const setSpeed=(event:Event)=>{speed=(event as CustomEvent<number>).detail};const setTurn=(event:Event)=>{turn=(event as CustomEvent<number>).detail};const resize=()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};renderer.domElement.addEventListener('dblclick',toggleWalk);renderer.domElement.addEventListener('mousemove',move);window.addEventListener('campus-focus',focus);window.addEventListener('campus-toggle-walk',toggleWalk);window.addEventListener('avatar-speed',setSpeed);window.addEventListener('avatar-turn',setTurn);addEventListener('keydown',key);addEventListener('keyup',up);addEventListener('resize',resize);addEventListener('blur',clearKeys);
  let frame=0,last=0;const animate=(now=performance.now())=>{frame=requestAnimationFrame(animate);const scale=frameScale(last?(now-last)/1000:0);last=now;if(document.hidden){keys.clear();return;}if(walking){const base=movementSpeed(speed)*scale,delta=movementFromKeys(keys,yaw,keys.has('shift')?base*2:base),pos=clampToCampus({x:avatar.position.x+delta.x,z:avatar.position.z+delta.z});avatar.position.set(pos.x,0,pos.z);avatar.rotation.y=yaw;camera.position.set(avatar.position.x+Math.sin(yaw)*5,3.3,avatar.position.z+Math.cos(yaw)*5);camera.rotation.order='YXZ';camera.rotation.y=yaw;camera.rotation.x=pitch}else{const damping=1-Math.pow(1-.055,scale);camera.position.lerp(desiredPosition,damping);lookTarget.lerp(desiredTarget,damping);camera.lookAt(lookTarget)}renderer.render(scene,camera)};animate();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('campus-focus',focus);window.removeEventListener('campus-toggle-walk',toggleWalk);window.removeEventListener('avatar-speed',setSpeed);window.removeEventListener('avatar-turn',setTurn);removeEventListener('keydown',key);removeEventListener('keyup',up);removeEventListener('resize',resize);removeEventListener('blur',clearKeys);
   renderer.domElement.removeEventListener('dblclick',toggleWalk);renderer.domElement.removeEventListener('mousemove',move);
   if(document.pointerLockElement===renderer.domElement)document.exitPointerLock?.();
   const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
   scene.traverse(object=>{const mesh=object as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);if(mesh.material)for(const mat of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(mat)});
   for(const mat of materials){for(const value of Object.values(mat))if(value instanceof THREE.Texture)textures.add(value);mat.dispose()}
   textures.forEach(texture=>texture.dispose());geometries.forEach(geometry=>geometry.dispose());renderer.dispose();host.removeChild(renderer.domElement)};
 },[places]);
 return <div id="scene" className="scene-wrap" ref={ref}><div className="scene-hint">3D 校園鳥瞰 · 點選目的地聚焦 · 人物漫遊可自由行走</div></div>;
}
