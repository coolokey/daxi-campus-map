import * as THREE from 'three';
import type {Place} from '../data/campus';
import {campusModels,type CampusModel} from '../data/campus-model';
import {campusSceneTheme as tone} from './scene-theme';

const material=(color:number,roughness=.76)=>new THREE.MeshStandardMaterial({color,roughness,metalness:.04});
const add=(scene:THREE.Scene,object:THREE.Object3D)=>scene.add(object);

const roofColor=(roof:CampusModel['roof'])=>roof==='pitched-red'||roof==='flat-red'?tone.redRoof:roof==='pitched-blue'?0x426e86:roof==='flat-purple'?0x76548d:roof==='flat-green'?0x386655:tone.darkRoof;

function building(scene:THREE.Scene,model:CampusModel){
 const [width,depth,height]=model.dimensions,group=new THREE.Group();group.position.set(model.position[0],0,model.position[1]);
 const plinth=new THREE.Mesh(new THREE.BoxGeometry(width+.7,.42,depth+.7),material(0x74786e));plinth.position.y=.21;group.add(plinth);
 const facade=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),material(0xe5e5dc));facade.position.y=height/2+.4;facade.castShadow=facade.receiveShadow=true;facade.userData.modelId=model.id;group.add(facade);
 const roof=new THREE.Mesh(new THREE.BoxGeometry(width+.9,.5,depth+.9),material(roofColor(model.roof),.65));roof.position.y=height+.65;roof.castShadow=true;group.add(roof);
 const windowMaterial=material(tone.window,.25),columns=Math.max(4,Math.floor(width/3));
 for(let floor=0;floor<model.floors;floor++){
  const band=new THREE.Mesh(new THREE.BoxGeometry(width+.04,.12,depth+.05),material(0xc3c8c2));band.position.y=1.15+floor*(height/model.floors);group.add(band);
  for(let column=0;column<columns;column++)for(const side of [-1,1]){const window=new THREE.Mesh(new THREE.BoxGeometry(1.45,1.08,.1),windowMaterial);window.position.set(-width/2+1.5+column*(width-3)/(columns-1),1.85+floor*(height/model.floors),side*(depth/2+.06));group.add(window)}
 }
 const entrance=new THREE.Mesh(new THREE.BoxGeometry(3,2.7,.3),material(0x315e64));entrance.position.set(0,1.75,depth/2+.17);group.add(entrance);
 const canopy=new THREE.Mesh(new THREE.BoxGeometry(4.2,.18,1.2),material(roofColor(model.roof)));canopy.position.set(0,3.2,depth/2+.58);group.add(canopy);
 const marker=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,1.25,10),material(0xe7bf71));marker.position.set(model.entrance[0]-model.position[0],.78,model.entrance[1]-model.position[1]);group.add(marker);
 add(scene,group);
}

function tree(scene:THREE.Scene,x:number,z:number,scale=1){const group=new THREE.Group(),trunk=new THREE.Mesh(new THREE.CylinderGeometry(.14*scale,.22*scale,1.8*scale,7),material(0x654837)),crown=material(0x29583c);trunk.position.y=.9*scale;group.add(trunk);for(const [dx,dy,size] of [[0,2.6,1],[.42,2.3,.72],[-.36,2.25,.68]]){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.95*scale*size,1),crown);leaf.position.set(dx*scale,dy*scale,0);leaf.castShadow=true;group.add(leaf)}group.position.set(x,0,z);add(scene,group)}

function outdoors(scene:THREE.Scene){
 const field=new THREE.Mesh(new THREE.BoxGeometry(78,.14,42),material(tone.field));field.position.set(-88,.12,-16);add(scene,field);
 const track=new THREE.Mesh(new THREE.RingGeometry(25,32,96),material(tone.track));track.rotation.x=-Math.PI/2;track.scale.set(1.5,.78,1);track.position.set(-88,.18,-16);add(scene,track);
 const stand=new THREE.Mesh(new THREE.BoxGeometry(30,3.2,6),material(0xe6e1d5));stand.position.set(-118,1.6,-16);add(scene,stand);
 const standRoof=new THREE.Mesh(new THREE.BoxGeometry(32,.55,8),material(tone.redRoof));standRoof.position.set(-118,3.5,-16);add(scene,standRoof);
 for(const [x,z,w,d] of [[0,76,20,120],[30,-20,9,130],[72,20,8,160],[-22,25,85,8]] as number[][]){const road=new THREE.Mesh(new THREE.BoxGeometry(w,.1,d),material(tone.road));road.position.set(x,.06,z);road.receiveShadow=true;add(scene,road)}
 const court=new THREE.Mesh(new THREE.BoxGeometry(45,.12,27),material(0xbd7440));court.position.set(-4,.1,-40);add(scene,court);
 for(let index=0;index<86;index++)tree(scene,-145+(index%15)*19,-105+Math.floor(index/15)*42,.8+(index%4)*.12);
 for(let index=0;index<9;index++){const hill=new THREE.Mesh(new THREE.IcosahedronGeometry(26+(index%3)*9,2),material(index%2?0x315d42:0x416d48));hill.scale.y=.48;hill.position.set(-155+index*39,-4,112+(index%2)*17);add(scene,hill)}
}

export function createAvatar(){const avatar=new THREE.Group(),body=new THREE.Mesh(new THREE.CapsuleGeometry(.39,.95,5,10),material(0x315f7d)),head=new THREE.Mesh(new THREE.SphereGeometry(.29,16,10),material(0xe8aa86));body.position.y=1.05;head.position.y=1.86;avatar.add(body,head);return avatar}

export function buildCampus(scene:THREE.Scene,_places:Place[]){
 const ground=new THREE.Mesh(new THREE.BoxGeometry(330,.8,280),material(tone.ground));ground.position.set(-10,-.42,0);ground.receiveShadow=true;add(scene,ground);
 outdoors(scene);campusModels.forEach(model=>building(scene,model));
 add(scene,new THREE.HemisphereLight(0xd7e9f4,0x314a2b,2.1));const sun=new THREE.DirectionalLight(tone.sun,3.2);sun.position.set(-55,80,35);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);add(scene,sun);return {ground};
}
