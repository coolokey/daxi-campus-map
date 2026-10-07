import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {buildCampus,createAvatar} from '../scene/buildCampus';
import {clampToCampus,movementFromKeys} from '../scene/walk-controls';
import {campusSceneTheme,overviewCamera} from '../scene/scene-theme';
import {birdseyeFocusFor} from '../scene/camera-focus';
import type {Place} from '../data/campus';

export default function CampusScene3D({places,onSelect}:{places:Place[];onSelect:(p:Place)=>void}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!ref.current)return;const host=ref.current,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,host.clientWidth/host.clientHeight,.1,300),renderer=new THREE.WebGLRenderer({antialias:true});
  scene.background=new THREE.Color(campusSceneTheme.sky);scene.fog=new THREE.Fog(campusSceneTheme.fog,78,175);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);buildCampus(scene,places);
  const avatar=createAvatar();avatar.position.set(0,0,0);scene.add(avatar);const desiredPosition=new THREE.Vector3(...overviewCamera.position),desiredTarget=new THREE.Vector3(...overviewCamera.target),lookTarget=desiredTarget.clone();camera.position.copy(desiredPosition);camera.lookAt(lookTarget);
  const keys=new Set<string>();let walking=false,yaw=0,pitch=-.25;
  const focus=(event:Event)=>{const place=(event as CustomEvent<Place>).detail;if(!place)return;const next=birdseyeFocusFor(place);desiredPosition.set(next.position[0],next.position[1],next.position[2]);desiredTarget.set(next.target[0],next.target[1],next.target[2]);walking=false;document.exitPointerLock?.()};
  const toggleWalk=()=>{walking=!walking;if(walking)renderer.domElement.requestPointerLock?.()};
  const key=(e:KeyboardEvent)=>{if(['w','a','s','d','W','A','S','D','Shift'].includes(e.key)){e.preventDefault();keys.add(e.key.toLowerCase())}if(e.key==='Escape')walking=false};const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());const move=(e:MouseEvent)=>{if(walking){yaw-=e.movementX*.002;pitch=Math.max(-1.1,Math.min(.5,pitch-e.movementY*.002))}};
  const resize=()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};renderer.domElement.addEventListener('dblclick',toggleWalk);renderer.domElement.addEventListener('mousemove',move);window.addEventListener('campus-focus',focus);window.addEventListener('campus-toggle-walk',toggleWalk);addEventListener('keydown',key);addEventListener('keyup',up);addEventListener('resize',resize);
  let frame=0;const animate=()=>{frame=requestAnimationFrame(animate);if(walking){const delta=movementFromKeys(keys,yaw,keys.has('shift')?.28:.14),pos=clampToCampus({x:avatar.position.x+delta.x,z:avatar.position.z+delta.z});avatar.position.set(pos.x,0,pos.z);avatar.rotation.y=yaw;camera.position.set(avatar.position.x+Math.sin(yaw)*5,3.3,avatar.position.z+Math.cos(yaw)*5);camera.rotation.order='YXZ';camera.rotation.y=yaw;camera.rotation.x=pitch}else{camera.position.lerp(desiredPosition,.055);lookTarget.lerp(desiredTarget,.055);camera.lookAt(lookTarget)}renderer.render(scene,camera)};animate();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('campus-focus',focus);window.removeEventListener('campus-toggle-walk',toggleWalk);removeEventListener('keydown',key);removeEventListener('keyup',up);removeEventListener('resize',resize);renderer.dispose();host.removeChild(renderer.domElement)};
 },[places,onSelect]);
 return <div id="scene" className="scene-wrap" ref={ref}><div className="scene-hint">3D 校園鳥瞰 · 點選目的地聚焦 · 人物漫遊可自由行走</div></div>;
}
