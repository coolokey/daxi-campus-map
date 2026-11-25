(()=>{
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const edge=(x,width,sens)=>{const band=clamp(width*.06,40,96),t=x<band?-(1-clamp(x,0,band)/band):x>width-band?1-clamp(width-x,0,band)/band:0;return t*Math.abs(t)*2.4*clamp(sens,.5,1.6)};
 const zoom=(distance,delta,mode=0)=>clamp(distance*Math.exp(delta*(mode===1?16:mode===2?800:1)*.0012),1.8,9);
 const cameraClear=(eye,desired,ground,wall)=>{for(let i=1;i<=44;i++){const t=i/44,p={x:eye.x+(desired.x-eye.x)*t,y:eye.y+(desired.y-eye.y)*t,z:eye.z+(desired.z-eye.z)*t};if(p.y<ground(p)+.18||wall(p))return Math.max(0,(i-1)/44)}return 1};
 window.CampusMouseModel={edge,zoom,cameraClear,damp:dt=>1-Math.exp(-36*Math.max(0,dt))};
})();
