export const AVATAR_HEIGHT=1.7;
export function avatarCameraPosition(pos:{x:number;z:number},yaw:number){return {x:pos.x+Math.sin(yaw)*5,y:3.3,z:pos.z+Math.cos(yaw)*5}}
