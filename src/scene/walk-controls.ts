export type Position={x:number;z:number};
export function movementFromKeys(keys:Set<string>,yaw:number,step:number):Position{const forward=(keys.has('w')?1:0)-(keys.has('s')?1:0);const strafe=(keys.has('d')?1:0)-(keys.has('a')?1:0);return {x:(Math.sin(yaw)*forward+Math.cos(yaw)*strafe)*step,z:(-Math.cos(yaw)*forward+Math.sin(yaw)*strafe)*step}}
export function clampToCampus(pos:Position):Position{return {x:Math.max(-54,Math.min(54,pos.x)),z:Math.max(-38,Math.min(38,pos.z))}}

export function frameScale(seconds:number):number{return Math.max(0,Math.min(.1,seconds))*60}
