import * as THREE from 'three';
import type { Place } from '../data/campus';
const mat=(color:number)=>new THREE.MeshStandardMaterial({color,roughness:.82});
export function buildCampus(scene:THREE.Scene,places:Place[]){
 const ground=new THREE.Mesh(new THREE.BoxGeometry(116,1,82),mat(0x9fca4a)); ground.position.y=-.5; scene.add(ground);
 const road=new THREE.Mesh(new THREE.BoxGeometry(88,.12,8),mat(0x9a4e36)); road.position.set(8,.08,-25); scene.add(road);
 const field=new THREE.Mesh(new THREE.BoxGeometry(58,.15,30),mat(0x79b52c)); field.position.set(-35,.1,19); scene.add(field);
 const track=new THREE.Mesh(new THREE.RingGeometry(16,21,64),new THREE.MeshStandardMaterial({color:0xd73532,side:THREE.DoubleSide})); track.rotation.x=-Math.PI/2; track.scale.set(1.45,.75,1); track.position.set(-35,.2,19); scene.add(track);
 places.filter(p=>!['正門','操場及綜合球場','通廊'].includes(p.name)).forEach((p,i)=>{const h=p.name.includes('大樓')?5.5:p.name.includes('館')?4.2:3.3; const b=new THREE.Mesh(new THREE.BoxGeometry(10, h, 7),mat([0x2f6f8f,0x7b4f38,0x416b47,0x8d5a9a][i%4])); b.position.set(p.world[0],h/2,p.world[1]); b.userData.placeId=p.id; scene.add(b); const pin=new THREE.Mesh(new THREE.ConeGeometry(.45,1.5,12),mat(0xf6c453)); pin.position.set(p.entrance[0],1,p.entrance[1]); pin.userData.placeId=p.id; scene.add(pin);});
 const light=new THREE.HemisphereLight(0xd9f4ff,0x32402c,2.2); scene.add(light); const sun=new THREE.DirectionalLight(0xffffff,2); sun.position.set(-20,40,20); scene.add(sun); return {ground};
}
