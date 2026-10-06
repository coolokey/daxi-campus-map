import * as THREE from 'three';
import type { Place } from '../data/campus';
const mat=(color:number)=>new THREE.MeshStandardMaterial({color,roughness:.82});
export function buildCampus(scene:THREE.Scene,places:Place[]){
 const ground=new THREE.Mesh(new THREE.BoxGeometry(116,1,82),mat(0x9fca4a));ground.position.y=-.5;scene.add(ground);
 const road=mat(0x283b43);for(const [x,z,w,d] of [[8,-25,88,8],[31,7,7,55],[-8,-2,48,5]] as number[][]){const r=new THREE.Mesh(new THREE.BoxGeometry(w,.12,d),road);r.position.set(x,.08,z);scene.add(r)}
 const field=new THREE.Mesh(new THREE.BoxGeometry(58,.15,30),mat(0x78b934));field.position.set(-35,.1,19);scene.add(field);
 const track=new THREE.Mesh(new THREE.RingGeometry(16,21,64),new THREE.MeshStandardMaterial({color:0x242f37,side:THREE.DoubleSide}));track.rotation.x=-Math.PI/2;track.scale.set(1.45,.75,1);track.position.set(-35,.2,19);scene.add(track);
 const court=new THREE.Mesh(new THREE.BoxGeometry(21,.2,12),mat(0xdcae31));court.position.set(18,.2,29);scene.add(court);
 places.filter(p=>!['正門','操場及綜合球場','通廊'].includes(p.name)).forEach((p,i)=>{const h=p.name.includes('大樓')?5.5:p.name.includes('館')?4.2:3.3;const color=p.id==='student-center'?0xe4a38e:p.id==='admin'?0xd8b06a:p.id==='art'?0xb65d65:[0x2f6f8f,0x7b4f38,0x416b47,0x8d5a9a][i%4];const size=p.id==='student-center'?15:10;const depth=p.id==='student-center'?10:7;const b=new THREE.Mesh(new THREE.BoxGeometry(size,h,depth),mat(color));b.position.set(p.world[0],h/2,p.world[1]);b.userData.placeId=p.id;scene.add(b);const roof=new THREE.Mesh(new THREE.BoxGeometry(size,.5,depth),mat(p.id==='student-center'?0xf0c2bd:0xc9574c));roof.position.set(p.world[0],h+.25,p.world[1]);scene.add(roof);const pin=new THREE.Mesh(new THREE.ConeGeometry(.45,1.5,12),mat(0xf6c453));pin.position.set(p.entrance[0],1,p.entrance[1]);pin.userData.placeId=p.id;scene.add(pin)});
 for(let i=0;i<28;i++){const tree=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.15,.2,1.5,8),mat(0x6f4931));const crown=new THREE.Mesh(new THREE.SphereGeometry(1.1,10,8),mat(0x1f6b46));trunk.position.y=.75;crown.position.y=2;tree.add(trunk,crown);tree.position.set(-54+(i%7)*17,0,-36+Math.floor(i/7)*22);scene.add(tree)}
 const light=new THREE.HemisphereLight(0xd9f4ff,0x32402c,2.2);scene.add(light);const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(-20,40,20);scene.add(sun);return {ground};
}
