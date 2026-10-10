
/* vendor/three.min.js */
/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE={})}(this,(function(t){"use strict";const e="128",n=100,i=300,r=301,s=302,a=303,o=304,l=306,c=307,h=1e3,u=1001,d=1002,p=1003,m=1004,f=1005,g=1006,v=1007,y=1008,x=1009,_=1012,w=1014,b=1015,M=1016,S=1020,T=1022,E=1023,A=1026,L=1027,R=33776,C=33777,P=33778,D=33779,I=35840,N=35841,B=35842,z=35843,F=37492,O=37496,H=2300,G=2301,U=2302,k=2400,V=2401,W=2402,j=2500,q=2501,X=3e3,Y=3001,Z=3007,J=3002,Q=3004,K=3005,$=3006,tt=7680,et=35044,nt=35048,it="300 es";class rt{addEventListener(t,e){void 0===this._listeners&&(this._listeners={});const n=this._listeners;void 0===n[t]&&(n[t]=[]),-1===n[t].indexOf(e)&&n[t].push(e)}hasEventListener(t,e){if(void 0===this._listeners)return!1;const n=this._listeners;return void 0!==n[t]&&-1!==n[t].indexOf(e)}removeEventListener(t,e){if(void 0===this._listeners)return;const n=this._listeners[t];if(void 0!==n){const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}dispatchEvent(t){if(void 0===this._listeners)return;const e=this._listeners[t.type];if(void 0!==e){t.target=this;const n=e.slice(0);for(let e=0,i=n.length;e<i;e++)n[e].call(this,t);t.target=null}}}const st=[];for(let t=0;t<256;t++)st[t]=(t<16?"0":"")+t.toString(16);let at=1234567;const ot=Math.PI/180,lt=180/Math.PI;function ct(){const t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,n=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return(st[255&t]+st[t>>8&255]+st[t>>16&255]+st[t>>24&255]+"-"+st[255&e]+st[e>>8&255]+"-"+st[e>>16&15|64]+st[e>>24&255]+"-"+st[63&n|128]+st[n>>8&255]+"-"+st[n>>16&255]+st[n>>24&255]+st[255&i]+st[i>>8&255]+st[i>>16&255]+st[i>>24&255]).toUpperCase()}function ht(t,e,n){return Math.max(e,Math.min(n,t))}function ut(t,e){return(t%e+e)%e}function dt(t,e,n){return(1-n)*t+n*e}function pt(t){return 0==(t&t-1)&&0!==t}function mt(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function ft(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}var gt=Object.freeze({__proto__:null,DEG2RAD:ot,RAD2DEG:lt,generateUUID:ct,clamp:ht,euclideanModulo:ut,mapLinear:function(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)},inverseLerp:function(t,e,n){return t!==e?(n-t)/(e-t):0},lerp:dt,damp:function(t,e,n,i){return dt(t,e,1-Math.exp(-n*i))},pingpong:function(t,e=1){return e-Math.abs(ut(t,2*e)-e)},smoothstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*(3-2*t)},smootherstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){return void 0!==t&&(at=t%2147483647),at=16807*at%2147483647,(at-1)/2147483646},degToRad:function(t){return t*ot},radToDeg:function(t){return t*lt},isPowerOfTwo:pt,ceilPowerOfTwo:mt,floorPowerOfTwo:ft,setQuaternionFromProperEuler:function(t,e,n,i,r){const s=Math.cos,a=Math.sin,o=s(n/2),l=a(n/2),c=s((e+i)/2),h=a((e+i)/2),u=s((e-i)/2),d=a((e-i)/2),p=s((i-e)/2),m=a((i-e)/2);switch(r){case"XYX":t.set(o*h,l*u,l*d,o*c);break;case"YZY":t.set(l*d,o*h,l*u,o*c);break;case"ZXZ":t.set(l*u,l*d,o*h,o*c);break;case"XZX":t.set(o*h,l*m,l*p,o*c);break;case"YXY":t.set(l*p,o*h,l*m,o*c);break;case"ZYZ":t.set(l*m,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}});class vt{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return void 0!==e?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return void 0!==e?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,n){return void 0!==n&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*n-s*i+t.x,this.y=r*i+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}vt.prototype.isVector2=!0;class yt{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,r,s,a,o,l){const c=this.elements;return c[0]=t,c[1]=i,c[2]=a,c[3]=e,c[4]=r,c[5]=o,c[6]=n,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[3],o=n[6],l=n[1],c=n[4],h=n[7],u=n[2],d=n[5],p=n[8],m=i[0],f=i[3],g=i[6],v=i[1],y=i[4],x=i[7],_=i[2],w=i[5],b=i[8];return r[0]=s*m+a*v+o*_,r[3]=s*f+a*y+o*w,r[6]=s*g+a*x+o*b,r[1]=l*m+c*v+h*_,r[4]=l*f+c*y+h*w,r[7]=l*g+c*x+h*b,r[2]=u*m+d*v+p*_,r[5]=u*f+d*y+p*w,r[8]=u*g+d*x+p*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],l=t[7],c=t[8];return e*s*c-e*a*l-n*r*c+n*a*o+i*r*l-i*s*o}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=c*s-a*l,u=a*o-c*r,d=l*r-s*o,p=e*h+n*u+i*d;if(0===p)return this.set(0,0,0,0,0,0,0,0,0);const m=1/p;return t[0]=h*m,t[1]=(i*l-c*n)*m,t[2]=(a*n-i*s)*m,t[3]=u*m,t[4]=(c*e-i*o)*m,t[5]=(i*r-a*e)*m,t[6]=d*m,t[7]=(n*o-l*e)*m,t[8]=(s*e-n*r)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*s+l*a)+s+t,-i*l,i*o,-i*(-l*s+o*a)+a+e,0,0,1),this}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),i=this.elements,r=i[0],s=i[3],a=i[6],o=i[1],l=i[4],c=i[7];return i[0]=e*r+n*o,i[3]=e*s+n*l,i[6]=e*a+n*c,i[1]=-n*r+e*o,i[4]=-n*s+e*l,i[7]=-n*a+e*c,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let t=0;t<9;t++)if(e[t]!==n[t])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return(new this.constructor).fromArray(this.elements)}}let xt;yt.prototype.isMatrix3=!0;class _t{static getDataURL(t){if(/^data:/i.test(t.src))return t.src;if("undefined"==typeof HTMLCanvasElement)return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{void 0===xt&&(xt=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),xt.width=t.width,xt.height=t.height;const n=xt.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=xt}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}}let wt=0;class bt extends rt{constructor(t=bt.DEFAULT_IMAGE,e=bt.DEFAULT_MAPPING,n=1001,i=1001,r=1006,s=1008,a=1023,o=1009,l=1,c=3e3){super(),Object.defineProperty(this,"id",{value:wt++}),this.uuid=ct(),this.name="",this.image=t,this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=c,this.version=0,this.onUpdate=null}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return(new this.constructor).copy(this)}copy(t){return this.name=t.name,this.image=t.image,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this}toJSON(t){const e=void 0===t||"string"==typeof t;if(!e&&void 0!==t.textures[this.uuid])return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(void 0!==this.image){const i=this.image;if(void 0===i.uuid&&(i.uuid=ct()),!e&&void 0===t.images[i.uuid]){let e;if(Array.isArray(i)){e=[];for(let t=0,n=i.length;t<n;t++)i[t].isDataTexture?e.push(Mt(i[t].image)):e.push(Mt(i[t]))}else e=Mt(i);t.images[i.uuid]={uuid:i.uuid,url:e}}n.image=i.uuid}return e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==i)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case h:t.x=t.x-Math.floor(t.x);break;case u:t.x=t.x<0?0:1;break;case d:1===Math.abs(Math.floor(t.x)%2)?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x)}if(t.y<0||t.y>1)switch(this.wrapT){case h:t.y=t.y-Math.floor(t.y);break;case u:t.y=t.y<0?0:1;break;case d:1===Math.abs(Math.floor(t.y)%2)?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y)}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){!0===t&&this.version++}}function Mt(t){return"undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap?_t.getDataURL(t):t.data?{data:Array.prototype.slice.call(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}bt.DEFAULT_IMAGE=void 0,bt.DEFAULT_MAPPING=i,bt.prototype.isTexture=!0;class St{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this}add(t,e){return void 0!==e?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t,e){return void 0!==e?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*e+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*e+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*e+s[7]*n+s[11]*i+s[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const s=.01,a=.1,o=t.elements,l=o[0],c=o[4],h=o[8],u=o[1],d=o[5],p=o[9],m=o[2],f=o[6],g=o[10];if(Math.abs(c-u)<s&&Math.abs(h-m)<s&&Math.abs(p-f)<s){if(Math.abs(c+u)<a&&Math.abs(h+m)<a&&Math.abs(p+f)<a&&Math.abs(l+d+g-3)<a)return this.set(1,0,0,0),this;e=Math.PI;const t=(l+1)/2,o=(d+1)/2,v=(g+1)/2,y=(c+u)/4,x=(h+m)/4,_=(p+f)/4;return t>o&&t>v?t<s?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(t),i=y/n,r=x/n):o>v?o<s?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(o),n=y/i,r=_/i):v<s?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(v),n=x/r,i=_/r),this.set(n,i,r,e),this}let v=Math.sqrt((f-p)*(f-p)+(h-m)*(h-m)+(u-c)*(u-c));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(h-m)/v,this.z=(u-c)/v,this.w=Math.acos((l+d+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e,n){return void 0!==n&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}St.prototype.isVector4=!0;class Tt extends rt{constructor(t,e,n){super(),this.width=t,this.height=e,this.depth=1,this.scissor=new St(0,0,t,e),this.scissorTest=!1,this.viewport=new St(0,0,t,e),n=n||{},this.texture=new bt(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=1,this.texture.generateMipmaps=void 0!==n.generateMipmaps&&n.generateMipmaps,this.texture.minFilter=void 0!==n.minFilter?n.minFilter:g,this.depthBuffer=void 0===n.depthBuffer||n.depthBuffer,this.stencilBuffer=void 0!==n.stencilBuffer&&n.stencilBuffer,this.depthTexture=void 0!==n.depthTexture?n.depthTexture:null}setTexture(t){t.image={width:this.width,height:this.height,depth:this.depth},this.texture=t}setSize(t,e,n=1){this.width===t&&this.height===e&&this.depth===n||(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return(new this.constructor).copy(this)}copy(t){return this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}Tt.prototype.isWebGLRenderTarget=!0;class Et extends Tt{constructor(t,e,n){super(t,e,n),this.samples=4}copy(t){return super.copy.call(this,t),this.samples=t.samples,this}}Et.prototype.isWebGLMultisampleRenderTarget=!0;class At{constructor(t=0,e=0,n=0,i=1){this._x=t,this._y=e,this._z=n,this._w=i}static slerp(t,e,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(t,e,i)}static slerpFlat(t,e,n,i,r,s,a){let o=n[i+0],l=n[i+1],c=n[i+2],h=n[i+3];const u=r[s+0],d=r[s+1],p=r[s+2],m=r[s+3];if(0===a)return t[e+0]=o,t[e+1]=l,t[e+2]=c,void(t[e+3]=h);if(1===a)return t[e+0]=u,t[e+1]=d,t[e+2]=p,void(t[e+3]=m);if(h!==m||o!==u||l!==d||c!==p){let t=1-a;const e=o*u+l*d+c*p+h*m,n=e>=0?1:-1,i=1-e*e;if(i>Number.EPSILON){const r=Math.sqrt(i),s=Math.atan2(r,e*n);t=Math.sin(t*s)/r,a=Math.sin(a*s)/r}const r=a*n;if(o=o*t+u*r,l=l*t+d*r,c=c*t+p*r,h=h*t+m*r,t===1-a){const t=1/Math.sqrt(o*o+l*l+c*c+h*h);o*=t,l*=t,c*=t,h*=t}}t[e]=o,t[e+1]=l,t[e+2]=c,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,s){const a=n[i],o=n[i+1],l=n[i+2],c=n[i+3],h=r[s],u=r[s+1],d=r[s+2],p=r[s+3];return t[e]=a*p+c*h+o*d-l*u,t[e+1]=o*p+c*u+l*h-a*d,t[e+2]=l*p+c*d+a*u-o*h,t[e+3]=c*p-a*h-o*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=t._x,i=t._y,r=t._z,s=t._order,a=Math.cos,o=Math.sin,l=a(n/2),c=a(i/2),h=a(r/2),u=o(n/2),d=o(i/2),p=o(r/2);switch(s){case"XYZ":this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p;break;case"YXZ":this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p;break;case"ZXY":this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p;break;case"ZYX":this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p;break;case"YZX":this._x=u*c*h+l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h-u*d*p;break;case"XZY":this._x=u*c*h-l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h+u*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return!1!==e&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10],u=n+a+h;if(u>0){const t=.5/Math.sqrt(u+1);this._w=.25/t,this._x=(c-o)*t,this._y=(r-l)*t,this._z=(s-i)*t}else if(n>a&&n>h){const t=2*Math.sqrt(1+n-a-h);this._w=(c-o)/t,this._x=.25*t,this._y=(i+s)/t,this._z=(r+l)/t}else if(a>h){const t=2*Math.sqrt(1+a-n-h);this._w=(r-l)/t,this._x=(i+s)/t,this._y=.25*t,this._z=(o+c)/t}else{const t=2*Math.sqrt(1+h-n-a);this._w=(s-i)/t,this._x=(r+l)/t,this._y=(o+c)/t,this._z=.25*t}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ht(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(0===n)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return void 0!==e?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,s=t._w,a=e._x,o=e._y,l=e._z,c=e._w;return this._x=n*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-n*l,this._z=r*c+s*l+n*o-i*a,this._w=s*c-n*a-i*o-r*l,this._onChangeCallback(),this}slerp(t,e){if(0===e)return this;if(1===e)return this.copy(t);const n=this._x,i=this._y,r=this._z,s=this._w;let a=s*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=s,this._x=n,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const t=1-e;return this._w=t*s+e*this._w,this._x=t*n+e*this._x,this._y=t*i+e*this._y,this._z=t*r+e*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),h=Math.sin((1-e)*c)/l,u=Math.sin(e*c)/l;return this._w=s*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){this.copy(t).slerp(e,n)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}At.prototype.isQuaternion=!0;class Lt{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return void 0===n&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return void 0!==e?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return void 0!==e?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return void 0!==e?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Ct.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ct.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,s=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,s=t.y,a=t.z,o=t.w,l=o*e+s*i-a*n,c=o*n+a*e-r*i,h=o*i+r*n-s*e,u=-r*e-s*n-a*i;return this.x=l*o+u*-r+c*-a-h*-s,this.y=c*o+u*-s+h*-r-l*-a,this.z=h*o+u*-a+l*-s-c*-r,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t,e){return void 0!==e?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,s=e.x,a=e.y,o=e.z;return this.x=i*o-r*a,this.y=r*s-n*o,this.z=n*a-i*s,this}projectOnVector(t){const e=t.lengthSq();if(0===e)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rt.copy(this).projectOnVector(t),this.sub(Rt)}reflect(t){return this.sub(Rt.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(0===e)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,3*e)}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,n){return void 0!==n&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}Lt.prototype.isVector3=!0;const Rt=new Lt,Ct=new At;class Pt{constructor(t=new Lt(1/0,1/0,1/0),e=new Lt(-1/0,-1/0,-1/0)){this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,r=-1/0,s=-1/0,a=-1/0;for(let o=0,l=t.length;o<l;o+=3){const l=t[o],c=t[o+1],h=t[o+2];l<e&&(e=l),c<n&&(n=c),h<i&&(i=h),l>r&&(r=l),c>s&&(s=c),h>a&&(a=h)}return this.min.set(e,n,i),this.max.set(r,s,a),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,r=-1/0,s=-1/0,a=-1/0;for(let o=0,l=t.count;o<l;o++){const l=t.getX(o),c=t.getY(o),h=t.getZ(o);l<e&&(e=l),c<n&&(n=c),h<i&&(i=h),l>r&&(r=l),c>s&&(s=c),h>a&&(a=h)}return this.min.set(e,n,i),this.max.set(r,s,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=It.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t){return this.makeEmpty(),this.expandByObject(t)}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return void 0===t&&(console.warn("THREE.Box3: .getCenter() target is now required"),t=new Lt),this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return void 0===t&&(console.warn("THREE.Box3: .getSize() target is now required"),t=new Lt),this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t){t.updateWorldMatrix(!1,!1);const e=t.geometry;void 0!==e&&(null===e.boundingBox&&e.computeBoundingBox(),Nt.copy(e.boundingBox),Nt.applyMatrix4(t.matrixWorld),this.union(Nt));const n=t.children;for(let t=0,e=n.length;t<e;t++)this.expandByObject(n[t]);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return void 0===e&&(console.warn("THREE.Box3: .getParameter() target is now required"),e=new Lt),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,It),It.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ut),kt.subVectors(this.max,Ut),Bt.subVectors(t.a,Ut),zt.subVectors(t.b,Ut),Ft.subVectors(t.c,Ut),Ot.subVectors(zt,Bt),Ht.subVectors(Ft,zt),Gt.subVectors(Bt,Ft);let e=[0,-Ot.z,Ot.y,0,-Ht.z,Ht.y,0,-Gt.z,Gt.y,Ot.z,0,-Ot.x,Ht.z,0,-Ht.x,Gt.z,0,-Gt.x,-Ot.y,Ot.x,0,-Ht.y,Ht.x,0,-Gt.y,Gt.x,0];return!!jt(e,Bt,zt,Ft,kt)&&(e=[1,0,0,0,1,0,0,0,1],!!jt(e,Bt,zt,Ft,kt)&&(Vt.crossVectors(Ot,Ht),e=[Vt.x,Vt.y,Vt.z],jt(e,Bt,zt,Ft,kt)))}clampPoint(t,e){return void 0===e&&(console.warn("THREE.Box3: .clampPoint() target is now required"),e=new Lt),e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return It.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return void 0===t&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(t.center),t.radius=.5*this.getSize(It).length(),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()||(Dt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dt)),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}Pt.prototype.isBox3=!0;const Dt=[new Lt,new Lt,new Lt,new Lt,new Lt,new Lt,new Lt,new Lt],It=new Lt,Nt=new Pt,Bt=new Lt,zt=new Lt,Ft=new Lt,Ot=new Lt,Ht=new Lt,Gt=new Lt,Ut=new Lt,kt=new Lt,Vt=new Lt,Wt=new Lt;function jt(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Wt.fromArray(t,s);const a=r.x*Math.abs(Wt.x)+r.y*Math.abs(Wt.y)+r.z*Math.abs(Wt.z),o=e.dot(Wt),l=n.dot(Wt),c=i.dot(Wt);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const qt=new Pt,Xt=new Lt,Yt=new Lt,Zt=new Lt;class Jt{constructor(t=new Lt,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;void 0!==e?n.copy(e):qt.setFromPoints(t).getCenter(n);let i=0;for(let e=0,r=t.length;e<r;e++)i=Math.max(i,n.distanceToSquared(t[e]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return void 0===e&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),e=new Lt),e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return void 0===t&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),t=new Pt),this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){Zt.subVectors(t,this.center);const e=Zt.lengthSq();if(e>this.radius*this.radius){const t=Math.sqrt(e),n=.5*(t-this.radius);this.center.add(Zt.multiplyScalar(n/t)),this.radius+=n}return this}union(t){return Yt.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(Xt.copy(t.center).add(Yt)),this.expandByPoint(Xt.copy(t.center).sub(Yt)),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return(new this.constructor).copy(this)}}const Qt=new Lt,Kt=new Lt,$t=new Lt,te=new Lt,ee=new Lt,ne=new Lt,ie=new Lt;class re{constructor(t=new Lt,e=new Lt(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return void 0===e&&(console.warn("THREE.Ray: .at() target is now required"),e=new Lt),e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qt)),this}closestPointToPoint(t,e){void 0===e&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),e=new Lt),e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qt.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qt.copy(this.direction).multiplyScalar(e).add(this.origin),Qt.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Kt.copy(t).add(e).multiplyScalar(.5),$t.copy(e).sub(t).normalize(),te.copy(this.origin).sub(Kt);const r=.5*t.distanceTo(e),s=-this.direction.dot($t),a=te.dot(this.direction),o=-te.dot($t),l=te.lengthSq(),c=Math.abs(1-s*s);let h,u,d,p;if(c>0)if(h=s*o-a,u=s*a-o,p=r*c,h>=0)if(u>=-p)if(u<=p){const t=1/c;h*=t,u*=t,d=h*(h+s*u+2*a)+u*(s*h+u+2*o)+l}else u=r,h=Math.max(0,-(s*u+a)),d=-h*h+u*(u+2*o)+l;else u=-r,h=Math.max(0,-(s*u+a)),d=-h*h+u*(u+2*o)+l;else u<=-p?(h=Math.max(0,-(-s*r+a)),u=h>0?-r:Math.min(Math.max(-r,-o),r),d=-h*h+u*(u+2*o)+l):u<=p?(h=0,u=Math.min(Math.max(-r,-o),r),d=u*(u+2*o)+l):(h=Math.max(0,-(s*r+a)),u=h>0?r:Math.min(Math.max(-r,-o),r),d=-h*h+u*(u+2*o)+l);else u=s>0?-r:r,h=Math.max(0,-(s*u+a)),d=-h*h+u*(u+2*o)+l;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy($t).multiplyScalar(u).add(Kt),d}intersectSphere(t,e){Qt.subVectors(t.center,this.origin);const n=Qt.dot(this.direction),i=Qt.dot(Qt)-n*n,r=t.radius*t.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=n-s,o=n+s;return a<0&&o<0?null:a<0?this.at(o,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(0===e)return 0===t.distanceToPoint(this.origin)?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return null===n?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);if(0===e)return!0;return t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),c>=0?(r=(t.min.y-u.y)*c,s=(t.max.y-u.y)*c):(r=(t.max.y-u.y)*c,s=(t.min.y-u.y)*c),n>s||r>i?null:((r>n||n!=n)&&(n=r),(s<i||i!=i)&&(i=s),h>=0?(a=(t.min.z-u.z)*h,o=(t.max.z-u.z)*h):(a=(t.max.z-u.z)*h,o=(t.min.z-u.z)*h),n>o||a>i?null:((a>n||n!=n)&&(n=a),(o<i||i!=i)&&(i=o),i<0?null:this.at(n>=0?n:i,e)))}intersectsBox(t){return null!==this.intersectBox(t,Qt)}intersectTriangle(t,e,n,i,r){ee.subVectors(e,t),ne.subVectors(n,t),ie.crossVectors(ee,ne);let s,a=this.direction.dot(ie);if(a>0){if(i)return null;s=1}else{if(!(a<0))return null;s=-1,a=-a}te.subVectors(this.origin,t);const o=s*this.direction.dot(ne.crossVectors(te,ne));if(o<0)return null;const l=s*this.direction.dot(ee.cross(te));if(l<0)return null;if(o+l>a)return null;const c=-s*te.dot(ie);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return(new this.constructor).copy(this)}}class se{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,r,s,a,o,l,c,h,u,d,p,m,f){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=s,g[9]=a,g[13]=o,g[2]=l,g[6]=c,g[10]=h,g[14]=u,g[3]=d,g[7]=p,g[11]=m,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return(new se).fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ae.setFromMatrixColumn(t,0).length(),r=1/ae.setFromMatrixColumn(t,1).length(),s=1/ae.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,n=t.x,i=t.y,r=t.z,s=Math.cos(n),a=Math.sin(n),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),h=Math.sin(r);if("XYZ"===t.order){const t=s*c,n=s*h,i=a*c,r=a*h;e[0]=o*c,e[4]=-o*h,e[8]=l,e[1]=n+i*l,e[5]=t-r*l,e[9]=-a*o,e[2]=r-t*l,e[6]=i+n*l,e[10]=s*o}else if("YXZ"===t.order){const t=o*c,n=o*h,i=l*c,r=l*h;e[0]=t+r*a,e[4]=i*a-n,e[8]=s*l,e[1]=s*h,e[5]=s*c,e[9]=-a,e[2]=n*a-i,e[6]=r+t*a,e[10]=s*o}else if("ZXY"===t.order){const t=o*c,n=o*h,i=l*c,r=l*h;e[0]=t-r*a,e[4]=-s*h,e[8]=i+n*a,e[1]=n+i*a,e[5]=s*c,e[9]=r-t*a,e[2]=-s*l,e[6]=a,e[10]=s*o}else if("ZYX"===t.order){const t=s*c,n=s*h,i=a*c,r=a*h;e[0]=o*c,e[4]=i*l-n,e[8]=t*l+r,e[1]=o*h,e[5]=r*l+t,e[9]=n*l-i,e[2]=-l,e[6]=a*o,e[10]=s*o}else if("YZX"===t.order){const t=s*o,n=s*l,i=a*o,r=a*l;e[0]=o*c,e[4]=r-t*h,e[8]=i*h+n,e[1]=h,e[5]=s*c,e[9]=-a*c,e[2]=-l*c,e[6]=n*h+i,e[10]=t-r*h}else if("XZY"===t.order){const t=s*o,n=s*l,i=a*o,r=a*l;e[0]=o*c,e[4]=-h,e[8]=l*c,e[1]=t*h+r,e[5]=s*c,e[9]=n*h-i,e[2]=i*h-n,e[6]=a*c,e[10]=r*h+t}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(le,t,ce)}lookAt(t,e,n){const i=this.elements;return de.subVectors(t,e),0===de.lengthSq()&&(de.z=1),de.normalize(),he.crossVectors(n,de),0===he.lengthSq()&&(1===Math.abs(n.z)?de.x+=1e-4:de.z+=1e-4,de.normalize(),he.crossVectors(n,de)),he.normalize(),ue.crossVectors(de,he),i[0]=he.x,i[4]=ue.x,i[8]=de.x,i[1]=he.y,i[5]=ue.y,i[9]=de.y,i[2]=he.z,i[6]=ue.z,i[10]=de.z,this}multiply(t,e){return void 0!==e?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[4],o=n[8],l=n[12],c=n[1],h=n[5],u=n[9],d=n[13],p=n[2],m=n[6],f=n[10],g=n[14],v=n[3],y=n[7],x=n[11],_=n[15],w=i[0],b=i[4],M=i[8],S=i[12],T=i[1],E=i[5],A=i[9],L=i[13],R=i[2],C=i[6],P=i[10],D=i[14],I=i[3],N=i[7],B=i[11],z=i[15];return r[0]=s*w+a*T+o*R+l*I,r[4]=s*b+a*E+o*C+l*N,r[8]=s*M+a*A+o*P+l*B,r[12]=s*S+a*L+o*D+l*z,r[1]=c*w+h*T+u*R+d*I,r[5]=c*b+h*E+u*C+d*N,r[9]=c*M+h*A+u*P+d*B,r[13]=c*S+h*L+u*D+d*z,r[2]=p*w+m*T+f*R+g*I,r[6]=p*b+m*E+f*C+g*N,r[10]=p*M+m*A+f*P+g*B,r[14]=p*S+m*L+f*D+g*z,r[3]=v*w+y*T+x*R+_*I,r[7]=v*b+y*E+x*C+_*N,r[11]=v*M+y*A+x*P+_*B,r[15]=v*S+y*L+x*D+_*z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],s=t[1],a=t[5],o=t[9],l=t[13],c=t[2],h=t[6],u=t[10],d=t[14];return t[3]*(+r*o*h-i*l*h-r*a*u+n*l*u+i*a*d-n*o*d)+t[7]*(+e*o*d-e*l*u+r*s*u-i*s*d+i*l*c-r*o*c)+t[11]*(+e*l*h-e*a*d-r*s*h+n*s*d+r*a*c-n*l*c)+t[15]*(-i*a*c-e*o*h+e*a*u+i*s*h-n*s*u+n*o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11],p=t[12],m=t[13],f=t[14],g=t[15],v=h*f*l-m*u*l+m*o*d-a*f*d-h*o*g+a*u*g,y=p*u*l-c*f*l-p*o*d+s*f*d+c*o*g-s*u*g,x=c*m*l-p*h*l+p*a*d-s*m*d-c*a*g+s*h*g,_=p*h*o-c*m*o-p*a*u+s*m*u+c*a*f-s*h*f,w=e*v+n*y+i*x+r*_;if(0===w)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=v*b,t[1]=(m*u*r-h*f*r-m*i*d+n*f*d+h*i*g-n*u*g)*b,t[2]=(a*f*r-m*o*r+m*i*l-n*f*l-a*i*g+n*o*g)*b,t[3]=(h*o*r-a*u*r-h*i*l+n*u*l+a*i*d-n*o*d)*b,t[4]=y*b,t[5]=(c*f*r-p*u*r+p*i*d-e*f*d-c*i*g+e*u*g)*b,t[6]=(p*o*r-s*f*r-p*i*l+e*f*l+s*i*g-e*o*g)*b,t[7]=(s*u*r-c*o*r+c*i*l-e*u*l-s*i*d+e*o*d)*b,t[8]=x*b,t[9]=(p*h*r-c*m*r-p*n*d+e*m*d+c*n*g-e*h*g)*b,t[10]=(s*m*r-p*a*r+p*n*l-e*m*l-s*n*g+e*a*g)*b,t[11]=(c*a*r-s*h*r-c*n*l+e*h*l+s*n*d-e*a*d)*b,t[12]=_*b,t[13]=(c*m*i-p*h*i+p*n*u-e*m*u-c*n*f+e*h*f)*b,t[14]=(p*a*i-s*m*i-p*n*o+e*m*o+s*n*f-e*a*f)*b,t[15]=(s*h*i-c*a*i+c*n*o-e*h*o-s*n*u+e*a*u)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,s=t.x,a=t.y,o=t.z,l=r*s,c=r*a;return this.set(l*s+n,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+n,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n){return this.set(1,e,n,0,t,1,n,0,t,e,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,s=e._y,a=e._z,o=e._w,l=r+r,c=s+s,h=a+a,u=r*l,d=r*c,p=r*h,m=s*c,f=s*h,g=a*h,v=o*l,y=o*c,x=o*h,_=n.x,w=n.y,b=n.z;return i[0]=(1-(m+g))*_,i[1]=(d+x)*_,i[2]=(p-y)*_,i[3]=0,i[4]=(d-x)*w,i[5]=(1-(u+g))*w,i[6]=(f+v)*w,i[7]=0,i[8]=(p+y)*b,i[9]=(f-v)*b,i[10]=(1-(u+m))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ae.set(i[0],i[1],i[2]).length();const s=ae.set(i[4],i[5],i[6]).length(),a=ae.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],oe.copy(this);const o=1/r,l=1/s,c=1/a;return oe.elements[0]*=o,oe.elements[1]*=o,oe.elements[2]*=o,oe.elements[4]*=l,oe.elements[5]*=l,oe.elements[6]*=l,oe.elements[8]*=c,oe.elements[9]*=c,oe.elements[10]*=c,e.setFromRotationMatrix(oe),n.x=r,n.y=s,n.z=a,this}makePerspective(t,e,n,i,r,s){void 0===s&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,o=2*r/(e-t),l=2*r/(n-i),c=(e+t)/(e-t),h=(n+i)/(n-i),u=-(s+r)/(s-r),d=-2*s*r/(s-r);return a[0]=o,a[4]=0,a[8]=c,a[12]=0,a[1]=0,a[5]=l,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=u,a[14]=d,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,r,s){const a=this.elements,o=1/(e-t),l=1/(n-i),c=1/(s-r),h=(e+t)*o,u=(n+i)*l,d=(s+r)*c;return a[0]=2*o,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*l,a[9]=0,a[13]=-u,a[2]=0,a[6]=0,a[10]=-2*c,a[14]=-d,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let t=0;t<16;t++)if(e[t]!==n[t])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}se.prototype.isMatrix4=!0;const ae=new Lt,oe=new se,le=new Lt(0,0,0),ce=new Lt(1,1,1),he=new Lt,ue=new Lt,de=new Lt,pe=new se,me=new At;class fe{constructor(t=0,e=0,n=0,i=fe.DefaultOrder){this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._order=i||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e,n){const i=t.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],h=i[2],u=i[6],d=i[10];switch(e=e||this._order){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ht(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,!1!==n&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return pe.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pe,e,n)}setFromVector3(t,e){return this.set(t.x,t.y,t.z,e||this._order)}reorder(t){return me.setFromEuler(this),this.setFromQuaternion(me,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],void 0!==t[3]&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}toVector3(t){return t?t.set(this._x,this._y,this._z):new Lt(this._x,this._y,this._z)}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}fe.prototype.isEuler=!0,fe.DefaultOrder="XYZ",fe.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class ge{constructor(){this.mask=1}set(t){this.mask=1<<t|0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return 0!=(this.mask&t.mask)}}let ve=0;const ye=new Lt,xe=new At,_e=new se,we=new Lt,be=new Lt,Me=new Lt,Se=new At,Te=new Lt(1,0,0),Ee=new Lt(0,1,0),Ae=new Lt(0,0,1),Le={type:"added"},Re={type:"removed"};class Ce extends rt{constructor(){super(),Object.defineProperty(this,"id",{value:ve++}),this.uuid=ct(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DefaultUp.clone();const t=new Lt,e=new fe,n=new At,i=new Lt(1,1,1);e._onChange((function(){n.setFromEuler(e,!1)})),n._onChange((function(){e.setFromQuaternion(n,void 0,!1)})),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new se},normalMatrix:{value:new yt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Ce.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new ge,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return xe.setFromAxisAngle(t,e),this.quaternion.multiply(xe),this}rotateOnWorldAxis(t,e){return xe.setFromAxisAngle(t,e),this.quaternion.premultiply(xe),this}rotateX(t){return this.rotateOnAxis(Te,t)}rotateY(t){return this.rotateOnAxis(Ee,t)}rotateZ(t){return this.rotateOnAxis(Ae,t)}translateOnAxis(t,e){return ye.copy(t).applyQuaternion(this.quaternion),this.position.add(ye.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Te,t)}translateY(t){return this.translateOnAxis(Ee,t)}translateZ(t){return this.translateOnAxis(Ae,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(_e.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?we.copy(t):we.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),be.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_e.lookAt(be,we,this.up):_e.lookAt(we,be,this.up),this.quaternion.setFromRotationMatrix(_e),i&&(_e.extractRotation(i.matrixWorld),xe.setFromRotationMatrix(_e),this.quaternion.premultiply(xe.invert()))}add(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(null!==t.parent&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Le)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const e=this.children.indexOf(t);return-1!==e&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Re)),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(Re)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),_e.copy(this.matrixWorld).invert(),null!==t.parent&&(t.parent.updateWorldMatrix(!0,!1),_e.multiply(t.parent.matrixWorld)),t.applyMatrix4(_e),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const i=this.children[n].getObjectByProperty(t,e);if(void 0!==i)return i}}getWorldPosition(t){return void 0===t&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),t=new Lt),this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return void 0===t&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),t=new At),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(be,t,Me),t}getWorldScale(t){return void 0===t&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),t=new Lt),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(be,Se,t),t}getWorldDirection(t){void 0===t&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),t=new Lt),this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(!1===this.visible)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;null!==e&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(!0===t&&null!==n&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===e){const t=this.children;for(let e=0,n=t.length;e<n;e++)t[e].updateWorldMatrix(!1,!0)}}toJSON(t){const e=void 0===t||"string"==typeof t,n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};function r(e,n){return void 0===e[n.uuid]&&(e[n.uuid]=n.toJSON(t)),n.uuid}if(i.uuid=this.uuid,i.type=this.type,""!==this.name&&(i.name=this.name),!0===this.castShadow&&(i.castShadow=!0),!0===this.receiveShadow&&(i.receiveShadow=!0),!1===this.visible&&(i.visible=!1),!1===this.frustumCulled&&(i.frustumCulled=!1),0!==this.renderOrder&&(i.renderOrder=this.renderOrder),"{}"!==JSON.stringify(this.userData)&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),!1===this.matrixAutoUpdate&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(i.instanceColor=this.instanceColor.toJSON())),this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const e=this.geometry.parameters;if(void 0!==e&&void 0!==e.shapes){const n=e.shapes;if(Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const i=n[e];r(t.shapes,i)}else r(t.shapes,n)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),void 0!==this.material)if(Array.isArray(this.material)){const e=[];for(let n=0,i=this.material.length;n<i;n++)e.push(r(t.materials,this.material[n]));i.material=e}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let e=0;e<this.children.length;e++)i.children.push(this.children[e].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let e=0;e<this.animations.length;e++){const n=this.animations[e];i.animations.push(r(t.animations,n))}}if(e){const e=s(t.geometries),i=s(t.materials),r=s(t.textures),a=s(t.images),o=s(t.shapes),l=s(t.skeletons),c=s(t.animations);e.length>0&&(n.geometries=e),i.length>0&&(n.materials=i),r.length>0&&(n.textures=r),a.length>0&&(n.images=a),o.length>0&&(n.shapes=o),l.length>0&&(n.skeletons=l),c.length>0&&(n.animations=c)}return n.object=i,n;function s(t){const e=[];for(const n in t){const i=t[n];delete i.metadata,e.push(i)}return e}}clone(t){return(new this.constructor).copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)for(let e=0;e<t.children.length;e++){const n=t.children[e];this.add(n.clone())}return this}}Ce.DefaultUp=new Lt(0,1,0),Ce.DefaultMatrixAutoUpdate=!0,Ce.prototype.isObject3D=!0;const Pe=new Lt,De=new Lt,Ie=new yt;class Ne{constructor(t=new Lt(1,0,0),e=0){this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Pe.subVectors(n,e).cross(De.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return void 0===e&&(console.warn("THREE.Plane: .projectPoint() target is now required"),e=new Lt),e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){void 0===e&&(console.warn("THREE.Plane: .intersectLine() target is now required"),e=new Lt);const n=t.delta(Pe),i=this.normal.dot(n);if(0===i)return 0===this.distanceToPoint(t.start)?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(n).multiplyScalar(r).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return void 0===t&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),t=new Lt),t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ie.getNormalMatrix(t),i=this.coplanarPoint(Pe).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return(new this.constructor).copy(this)}}Ne.prototype.isPlane=!0;const Be=new Lt,ze=new Lt,Fe=new Lt,Oe=new Lt,He=new Lt,Ge=new Lt,Ue=new Lt,ke=new Lt,Ve=new Lt,We=new Lt;class je{constructor(t=new Lt,e=new Lt,n=new Lt){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){void 0===i&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new Lt),i.subVectors(n,e),Be.subVectors(t,e),i.cross(Be);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Be.subVectors(i,e),ze.subVectors(n,e),Fe.subVectors(t,e);const s=Be.dot(Be),a=Be.dot(ze),o=Be.dot(Fe),l=ze.dot(ze),c=ze.dot(Fe),h=s*l-a*a;if(void 0===r&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),r=new Lt),0===h)return r.set(-2,-1,-1);const u=1/h,d=(l*o-a*c)*u,p=(s*c-a*o)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Oe),Oe.x>=0&&Oe.y>=0&&Oe.x+Oe.y<=1}static getUV(t,e,n,i,r,s,a,o){return this.getBarycoord(t,e,n,i,Oe),o.set(0,0),o.addScaledVector(r,Oe.x),o.addScaledVector(s,Oe.y),o.addScaledVector(a,Oe.z),o}static isFrontFacing(t,e,n,i){return Be.subVectors(n,e),ze.subVectors(t,e),Be.cross(ze).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Be.subVectors(this.c,this.b),ze.subVectors(this.a,this.b),.5*Be.cross(ze).length()}getMidpoint(t){return void 0===t&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),t=new Lt),t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return void 0===t&&(console.warn("THREE.Triangle: .getPlane() target is now required"),t=new Ne),t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return je.getUV(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){void 0===e&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),e=new Lt);const n=this.a,i=this.b,r=this.c;let s,a;He.subVectors(i,n),Ge.subVectors(r,n),ke.subVectors(t,n);const o=He.dot(ke),l=Ge.dot(ke);if(o<=0&&l<=0)return e.copy(n);Ve.subVectors(t,i);const c=He.dot(Ve),h=Ge.dot(Ve);if(c>=0&&h<=c)return e.copy(i);const u=o*h-c*l;if(u<=0&&o>=0&&c<=0)return s=o/(o-c),e.copy(n).addScaledVector(He,s);We.subVectors(t,r);const d=He.dot(We),p=Ge.dot(We);if(p>=0&&d<=p)return e.copy(r);const m=d*l-o*p;if(m<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Ge,a);const f=c*p-d*h;if(f<=0&&h-c>=0&&d-p>=0)return Ue.subVectors(r,i),a=(h-c)/(h-c+(d-p)),e.copy(i).addScaledVector(Ue,a);const g=1/(f+m+u);return s=m*g,a=u*g,e.copy(n).addScaledVector(He,s).addScaledVector(Ge,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let qe=0;function Xe(){Object.defineProperty(this,"id",{value:qe++}),this.uuid=ct(),this.name="",this.type="Material",this.fog=!0,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tt,this.stencilZFail=tt,this.stencilZPass=tt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}Xe.prototype=Object.assign(Object.create(rt.prototype),{constructor:Xe,isMaterial:!0,onBuild:function(){},onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(t){if(void 0!==t)for(const e in t){const n=t[e];if(void 0===n){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if("shading"===e){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=1===n;continue}const i=this[e];void 0!==i?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n:console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.")}},toJSON:function(t){const e=void 0===t||"string"==typeof t;e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};function i(t){const e=[];for(const n in t){const i=t[n];delete i.metadata,e.push(i)}return e}if(n.uuid=this.uuid,n.type=this.type,""!==this.name&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),void 0!==this.roughness&&(n.roughness=this.roughness),void 0!==this.metalness&&(n.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(n.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&1!==this.emissiveIntensity&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),void 0!==this.shininess&&(n.shininess=this.shininess),void 0!==this.clearcoat&&(n.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,void 0!==this.combine&&(n.combine=this.combine)),void 0!==this.envMapIntensity&&(n.envMapIntensity=this.envMapIntensity),void 0!==this.reflectivity&&(n.reflectivity=this.reflectivity),void 0!==this.refractionRatio&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),void 0!==this.size&&(n.size=this.size),null!==this.shadowSide&&(n.shadowSide=this.shadowSide),void 0!==this.sizeAttenuation&&(n.sizeAttenuation=this.sizeAttenuation),1!==this.blending&&(n.blending=this.blending),0!==this.side&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),!0===this.transparent&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation&&0!==this.rotation&&(n.rotation=this.rotation),!0===this.polygonOffset&&(n.polygonOffset=!0),0!==this.polygonOffsetFactor&&(n.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&1!==this.linewidth&&(n.linewidth=this.linewidth),void 0!==this.dashSize&&(n.dashSize=this.dashSize),void 0!==this.gapSize&&(n.gapSize=this.gapSize),void 0!==this.scale&&(n.scale=this.scale),!0===this.dithering&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),!0===this.alphaToCoverage&&(n.alphaToCoverage=this.alphaToCoverage),!0===this.premultipliedAlpha&&(n.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(n.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(n.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(n.morphTargets=!0),!0===this.morphNormals&&(n.morphNormals=!0),!0===this.skinning&&(n.skinning=!0),!0===this.flatShading&&(n.flatShading=this.flatShading),!1===this.visible&&(n.visible=!1),!1===this.toneMapped&&(n.toneMapped=!1),"{}"!==JSON.stringify(this.userData)&&(n.userData=this.userData),e){const e=i(t.textures),r=i(t.images);e.length>0&&(n.textures=e),r.length>0&&(n.images=r)}return n},clone:function(){return(new this.constructor).copy(this)},copy:function(t){this.name=t.name,this.fog=t.fog,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(null!==e){const t=e.length;n=new Array(t);for(let i=0;i!==t;++i)n[i]=e[i].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(Xe.prototype,"needsUpdate",{set:function(t){!0===t&&this.version++}});const Ye={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ze={h:0,s:0,l:0},Je={h:0,s:0,l:0};function Qe(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+6*(e-t)*(2/3-n):t}function Ke(t){return t<.04045?.0773993808*t:Math.pow(.9478672986*t+.0521327014,2.4)}function $e(t){return t<.0031308?12.92*t:1.055*Math.pow(t,.41666)-.055}class tn{constructor(t,e,n){return void 0===e&&void 0===n?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):"number"==typeof t?this.setHex(t):"string"==typeof t&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,this}setRGB(t,e,n){return this.r=t,this.g=e,this.b=n,this}setHSL(t,e,n){if(t=ut(t,1),e=ht(e,0,1),n=ht(n,0,1),0===e)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+e):n+e-n*e,r=2*n-i;this.r=Qe(r,i,t+1/3),this.g=Qe(r,i,t),this.b=Qe(r,i,t-1/3)}return this}setStyle(t){function e(e){void 0!==e&&parseFloat(e)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let t;const i=n[1],r=n[2];switch(i){case"rgb":case"rgba":if(t=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(255,parseInt(t[1],10))/255,this.g=Math.min(255,parseInt(t[2],10))/255,this.b=Math.min(255,parseInt(t[3],10))/255,e(t[4]),this;if(t=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(100,parseInt(t[1],10))/100,this.g=Math.min(100,parseInt(t[2],10))/100,this.b=Math.min(100,parseInt(t[3],10))/100,e(t[4]),this;break;case"hsl":case"hsla":if(t=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)){const n=parseFloat(t[1])/360,i=parseInt(t[2],10)/100,r=parseInt(t[3],10)/100;return e(t[4]),this.setHSL(n,i,r)}}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const t=n[1],e=t.length;if(3===e)return this.r=parseInt(t.charAt(0)+t.charAt(0),16)/255,this.g=parseInt(t.charAt(1)+t.charAt(1),16)/255,this.b=parseInt(t.charAt(2)+t.charAt(2),16)/255,this;if(6===e)return this.r=parseInt(t.charAt(0)+t.charAt(1),16)/255,this.g=parseInt(t.charAt(2)+t.charAt(3),16)/255,this.b=parseInt(t.charAt(4)+t.charAt(5),16)/255,this}return t&&t.length>0?this.setColorName(t):this}setColorName(t){const e=Ye[t.toLowerCase()];return void 0!==e?this.setHex(e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copyGammaToLinear(t,e=2){return this.r=Math.pow(t.r,e),this.g=Math.pow(t.g,e),this.b=Math.pow(t.b,e),this}copyLinearToGamma(t,e=2){const n=e>0?1/e:1;return this.r=Math.pow(t.r,n),this.g=Math.pow(t.g,n),this.b=Math.pow(t.b,n),this}convertGammaToLinear(t){return this.copyGammaToLinear(this,t),this}convertLinearToGamma(t){return this.copyLinearToGamma(this,t),this}copySRGBToLinear(t){return this.r=Ke(t.r),this.g=Ke(t.g),this.b=Ke(t.b),this}copyLinearToSRGB(t){return this.r=$e(t.r),this.g=$e(t.g),this.b=$e(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(t){void 0===t&&(console.warn("THREE.Color: .getHSL() target is now required"),t={h:0,s:0,l:0});const e=this.r,n=this.g,i=this.b,r=Math.max(e,n,i),s=Math.min(e,n,i);let a,o;const l=(s+r)/2;if(s===r)a=0,o=0;else{const t=r-s;switch(o=l<=.5?t/(r+s):t/(2-r-s),r){case e:a=(n-i)/t+(n<i?6:0);break;case n:a=(i-e)/t+2;break;case i:a=(e-n)/t+4}a/=6}return t.h=a,t.s=o,t.l=l,t}getStyle(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"}offsetHSL(t,e,n){return this.getHSL(Ze),Ze.h+=t,Ze.s+=e,Ze.l+=n,this.setHSL(Ze.h,Ze.s,Ze.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ze),t.getHSL(Je);const n=dt(Ze.h,Je.h,e),i=dt(Ze.s,Je.s,e),r=dt(Ze.l,Je.l,e);return this.setHSL(n,i,r),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),!0===t.normalized&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}tn.NAMES=Ye,tn.prototype.isColor=!0,tn.prototype.r=1,tn.prototype.g=1,tn.prototype.b=1;class en extends Xe{constructor(t){super(),this.type="MeshBasicMaterial",this.color=new tn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this}}en.prototype.isMeshBasicMaterial=!0;const nn=new Lt,rn=new vt;class sn{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=t,this.itemSize=e,this.count=void 0!==t?t.length/e:0,this.normalized=!0===n,this.usage=et,this.updateRange={offset:0,count:-1},this.version=0,this.onUploadCallback=function(){}}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}copyColorsArray(t){const e=this.array;let n=0;for(let i=0,r=t.length;i<r;i++){let r=t[i];void 0===r&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),r=new tn),e[n++]=r.r,e[n++]=r.g,e[n++]=r.b}return this}copyVector2sArray(t){const e=this.array;let n=0;for(let i=0,r=t.length;i<r;i++){let r=t[i];void 0===r&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),r=new vt),e[n++]=r.x,e[n++]=r.y}return this}copyVector3sArray(t){const e=this.array;let n=0;for(let i=0,r=t.length;i<r;i++){let r=t[i];void 0===r&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),r=new Lt),e[n++]=r.x,e[n++]=r.y,e[n++]=r.z}return this}copyVector4sArray(t){const e=this.array;let n=0;for(let i=0,r=t.length;i<r;i++){let r=t[i];void 0===r&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),r=new St),e[n++]=r.x,e[n++]=r.y,e[n++]=r.z,e[n++]=r.w}return this}applyMatrix3(t){if(2===this.itemSize)for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix3(t),this.setXY(e,rn.x,rn.y);else if(3===this.itemSize)for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix3(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)nn.x=this.getX(e),nn.y=this.getY(e),nn.z=this.getZ(e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)nn.x=this.getX(e),nn.y=this.getY(e),nn.z=this.getZ(e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)nn.x=this.getX(e),nn.y=this.getY(e),nn.z=this.getZ(e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){return this.array[t*this.itemSize]}setX(t,e){return this.array[t*this.itemSize]=e,this}getY(t){return this.array[t*this.itemSize+1]}setY(t,e){return this.array[t*this.itemSize+1]=e,this}getZ(t){return this.array[t*this.itemSize+2]}setZ(t,e){return this.array[t*this.itemSize+2]=e,this}getW(t){return this.array[t*this.itemSize+3]}setW(t,e){return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return""!==this.name&&(t.name=this.name),this.usage!==et&&(t.usage=this.usage),0===this.updateRange.offset&&-1===this.updateRange.count||(t.updateRange=this.updateRange),t}}sn.prototype.isBufferAttribute=!0;class an extends sn{constructor(t,e,n){super(new Int8Array(t),e,n)}}class on extends sn{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class ln extends sn{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class cn extends sn{constructor(t,e,n){super(new Int16Array(t),e,n)}}class hn extends sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class un extends sn{constructor(t,e,n){super(new Int32Array(t),e,n)}}class dn extends sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pn extends sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}pn.prototype.isFloat16BufferAttribute=!0;class mn extends sn{constructor(t,e,n){super(new Float32Array(t),e,n)}}class fn extends sn{constructor(t,e,n){super(new Float64Array(t),e,n)}}function gn(t){if(0===t.length)return-1/0;let e=t[0];for(let n=1,i=t.length;n<i;++n)t[n]>e&&(e=t[n]);return e}const vn={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};function yn(t,e){return new vn[t](e)}let xn=0;const _n=new se,wn=new Ce,bn=new Lt,Mn=new Pt,Sn=new Pt,Tn=new Lt;class En extends rt{constructor(){super(),Object.defineProperty(this,"id",{value:xn++}),this.uuid=ct(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gn(t)>65535?dn:hn)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return void 0!==this.attributes[t]}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;void 0!==e&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(void 0!==n){const e=(new yt).getNormalMatrix(t);n.applyNormalMatrix(e),n.needsUpdate=!0}const i=this.attributes.tangent;return void 0!==i&&(i.transformDirection(t),i.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return wn.lookAt(t),wn.updateMatrix(),this.applyMatrix4(wn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bn).negate(),this.translate(bn.x,bn.y,bn.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const i=t[n];e.push(i.x,i.y,i.z||0)}return this.setAttribute("position",new mn(e,3)),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Pt);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute)return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),void this.boundingBox.set(new Lt(-1/0,-1/0,-1/0),new Lt(1/0,1/0,1/0));if(void 0!==t){if(this.boundingBox.setFromBufferAttribute(t),e)for(let t=0,n=e.length;t<n;t++){const n=e[t];Mn.setFromBufferAttribute(n),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new Jt);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute)return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),void this.boundingSphere.set(new Lt,1/0);if(t){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),e)for(let t=0,n=e.length;t<n;t++){const n=e[t];Sn.setFromBufferAttribute(n),this.morphTargetsRelative?(Tn.addVectors(Mn.min,Sn.min),Mn.expandByPoint(Tn),Tn.addVectors(Mn.max,Sn.max),Mn.expandByPoint(Tn)):(Mn.expandByPoint(Sn.min),Mn.expandByPoint(Sn.max))}Mn.getCenter(n);let i=0;for(let e=0,r=t.count;e<r;e++)Tn.fromBufferAttribute(t,e),i=Math.max(i,n.distanceToSquared(Tn));if(e)for(let r=0,s=e.length;r<s;r++){const s=e[r],a=this.morphTargetsRelative;for(let e=0,r=s.count;e<r;e++)Tn.fromBufferAttribute(s,e),a&&(bn.fromBufferAttribute(t,e),Tn.add(bn)),i=Math.max(i,n.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){const t=this.index,e=this.attributes;if(null===t||void 0===e.position||void 0===e.normal||void 0===e.uv)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.array,i=e.position.array,r=e.normal.array,s=e.uv.array,a=i.length/3;void 0===e.tangent&&this.setAttribute("tangent",new sn(new Float32Array(4*a),4));const o=e.tangent.array,l=[],c=[];for(let t=0;t<a;t++)l[t]=new Lt,c[t]=new Lt;const h=new Lt,u=new Lt,d=new Lt,p=new vt,m=new vt,f=new vt,g=new Lt,v=new Lt;function y(t,e,n){h.fromArray(i,3*t),u.fromArray(i,3*e),d.fromArray(i,3*n),p.fromArray(s,2*t),m.fromArray(s,2*e),f.fromArray(s,2*n),u.sub(h),d.sub(h),m.sub(p),f.sub(p);const r=1/(m.x*f.y-f.x*m.y);isFinite(r)&&(g.copy(u).multiplyScalar(f.y).addScaledVector(d,-m.y).multiplyScalar(r),v.copy(d).multiplyScalar(m.x).addScaledVector(u,-f.x).multiplyScalar(r),l[t].add(g),l[e].add(g),l[n].add(g),c[t].add(v),c[e].add(v),c[n].add(v))}let x=this.groups;0===x.length&&(x=[{start:0,count:n.length}]);for(let t=0,e=x.length;t<e;++t){const e=x[t],i=e.start;for(let t=i,r=i+e.count;t<r;t+=3)y(n[t+0],n[t+1],n[t+2])}const _=new Lt,w=new Lt,b=new Lt,M=new Lt;function S(t){b.fromArray(r,3*t),M.copy(b);const e=l[t];_.copy(e),_.sub(b.multiplyScalar(b.dot(e))).normalize(),w.crossVectors(M,e);const n=w.dot(c[t])<0?-1:1;o[4*t]=_.x,o[4*t+1]=_.y,o[4*t+2]=_.z,o[4*t+3]=n}for(let t=0,e=x.length;t<e;++t){const e=x[t],i=e.start;for(let t=i,r=i+e.count;t<r;t+=3)S(n[t+0]),S(n[t+1]),S(n[t+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(void 0!==e){let n=this.getAttribute("normal");if(void 0===n)n=new sn(new Float32Array(3*e.count),3),this.setAttribute("normal",n);else for(let t=0,e=n.count;t<e;t++)n.setXYZ(t,0,0,0);const i=new Lt,r=new Lt,s=new Lt,a=new Lt,o=new Lt,l=new Lt,c=new Lt,h=new Lt;if(t)for(let u=0,d=t.count;u<d;u+=3){const d=t.getX(u+0),p=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,d),r.fromBufferAttribute(e,p),s.fromBufferAttribute(e,m),c.subVectors(s,r),h.subVectors(i,r),c.cross(h),a.fromBufferAttribute(n,d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,m),a.add(c),o.add(c),l.add(c),n.setXYZ(d,a.x,a.y,a.z),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let t=0,a=e.count;t<a;t+=3)i.fromBufferAttribute(e,t+0),r.fromBufferAttribute(e,t+1),s.fromBufferAttribute(e,t+2),c.subVectors(s,r),h.subVectors(i,r),c.cross(h),n.setXYZ(t+0,c.x,c.y,c.z),n.setXYZ(t+1,c.x,c.y,c.z),n.setXYZ(t+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(t,e){if(!t||!t.isBufferGeometry)return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);void 0===e&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(void 0===t.attributes[i])continue;const r=n[i].array,s=t.attributes[i],a=s.array,o=s.itemSize*e,l=Math.min(a.length,r.length-o);for(let t=0,e=o;t<l;t++,e++)r[e]=a[t]}return this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Tn.fromBufferAttribute(t,e),Tn.normalize(),t.setXYZ(e,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(t,e){const n=t.array,i=t.itemSize,r=t.normalized,s=new n.constructor(e.length*i);let a=0,o=0;for(let t=0,r=e.length;t<r;t++){a=e[t]*i;for(let t=0;t<i;t++)s[o++]=n[a++]}return new sn(s,i,r)}if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new En,n=this.index.array,i=this.attributes;for(const r in i){const s=t(i[r],n);e.setAttribute(r,s)}const r=this.morphAttributes;for(const i in r){const s=[],a=r[i];for(let e=0,i=a.length;e<i;e++){const i=t(a[e],n);s.push(i)}e.morphAttributes[i]=s}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let t=0,n=s.length;t<n;t++){const n=s[t];e.addGroup(n.start,n.count,n.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),void 0!==this.parameters){const e=this.parameters;for(const n in e)void 0!==e[n]&&(t[n]=e[n]);return t}t.data={attributes:{}};const e=this.index;null!==e&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const e in n){const i=n[e];t.data.attributes[e]=i.toJSON(t.data)}const i={};let r=!1;for(const e in this.morphAttributes){const n=this.morphAttributes[e],s=[];for(let e=0,i=n.length;e<i;e++){const i=n[e];s.push(i.toJSON(t.data))}s.length>0&&(i[e]=s,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return null!==a&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return(new En).copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;null!==n&&this.setIndex(n.clone(e));const i=t.attributes;for(const t in i){const n=i[t];this.setAttribute(t,n.clone(e))}const r=t.morphAttributes;for(const t in r){const n=[],i=r[t];for(let t=0,r=i.length;t<r;t++)n.push(i[t].clone(e));this.morphAttributes[t]=n}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let t=0,e=s.length;t<e;t++){const e=s[t];this.addGroup(e.start,e.count,e.materialIndex)}const a=t.boundingBox;null!==a&&(this.boundingBox=a.clone());const o=t.boundingSphere;return null!==o&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}En.prototype.isBufferGeometry=!0;const An=new se,Ln=new re,Rn=new Jt,Cn=new Lt,Pn=new Lt,Dn=new Lt,In=new Lt,Nn=new Lt,Bn=new Lt,zn=new Lt,Fn=new Lt,On=new Lt,Hn=new vt,Gn=new vt,Un=new vt,kn=new Lt,Vn=new Lt;class Wn extends Ce{constructor(t=new En,e=new en){super(),this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),void 0!==t.morphTargetInfluences&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),void 0!==t.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const t=e[n[0]];if(void 0!==t){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,n=t.length;e<n;e++){const n=t[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=e}}}}else{const e=t.morphTargets;void 0!==e&&e.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;if(void 0===i)return;if(null===n.boundingSphere&&n.computeBoundingSphere(),Rn.copy(n.boundingSphere),Rn.applyMatrix4(r),!1===t.ray.intersectsSphere(Rn))return;if(An.copy(r).invert(),Ln.copy(t.ray).applyMatrix4(An),null!==n.boundingBox&&!1===Ln.intersectsBox(n.boundingBox))return;let s;if(n.isBufferGeometry){const r=n.index,a=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative,c=n.attributes.uv,h=n.attributes.uv2,u=n.groups,d=n.drawRange;if(null!==r)if(Array.isArray(i))for(let n=0,p=u.length;n<p;n++){const p=u[n],m=i[p.materialIndex];for(let n=Math.max(p.start,d.start),i=Math.min(p.start+p.count,d.start+d.count);n<i;n+=3){const i=r.getX(n),u=r.getX(n+1),d=r.getX(n+2);s=jn(this,m,t,Ln,a,o,l,c,h,i,u,d),s&&(s.faceIndex=Math.floor(n/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{for(let n=Math.max(0,d.start),u=Math.min(r.count,d.start+d.count);n<u;n+=3){const u=r.getX(n),d=r.getX(n+1),p=r.getX(n+2);s=jn(this,i,t,Ln,a,o,l,c,h,u,d,p),s&&(s.faceIndex=Math.floor(n/3),e.push(s))}}else if(void 0!==a)if(Array.isArray(i))for(let n=0,r=u.length;n<r;n++){const r=u[n],p=i[r.materialIndex];for(let n=Math.max(r.start,d.start),i=Math.min(r.start+r.count,d.start+d.count);n<i;n+=3){s=jn(this,p,t,Ln,a,o,l,c,h,n,n+1,n+2),s&&(s.faceIndex=Math.floor(n/3),s.face.materialIndex=r.materialIndex,e.push(s))}}else{for(let n=Math.max(0,d.start),r=Math.min(a.count,d.start+d.count);n<r;n+=3){s=jn(this,i,t,Ln,a,o,l,c,h,n,n+1,n+2),s&&(s.faceIndex=Math.floor(n/3),e.push(s))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}function jn(t,e,n,i,r,s,a,o,l,c,h,u){Cn.fromBufferAttribute(r,c),Pn.fromBufferAttribute(r,h),Dn.fromBufferAttribute(r,u);const d=t.morphTargetInfluences;if(e.morphTargets&&s&&d){zn.set(0,0,0),Fn.set(0,0,0),On.set(0,0,0);for(let t=0,e=s.length;t<e;t++){const e=d[t],n=s[t];0!==e&&(In.fromBufferAttribute(n,c),Nn.fromBufferAttribute(n,h),Bn.fromBufferAttribute(n,u),a?(zn.addScaledVector(In,e),Fn.addScaledVector(Nn,e),On.addScaledVector(Bn,e)):(zn.addScaledVector(In.sub(Cn),e),Fn.addScaledVector(Nn.sub(Pn),e),On.addScaledVector(Bn.sub(Dn),e)))}Cn.add(zn),Pn.add(Fn),Dn.add(On)}t.isSkinnedMesh&&e.skinning&&(t.boneTransform(c,Cn),t.boneTransform(h,Pn),t.boneTransform(u,Dn));const p=function(t,e,n,i,r,s,a,o){let l;if(l=1===e.side?i.intersectTriangle(a,s,r,!0,o):i.intersectTriangle(r,s,a,2!==e.side,o),null===l)return null;Vn.copy(o),Vn.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Vn);return c<n.near||c>n.far?null:{distance:c,point:Vn.clone(),object:t}}(t,e,n,i,Cn,Pn,Dn,kn);if(p){o&&(Hn.fromBufferAttribute(o,c),Gn.fromBufferAttribute(o,h),Un.fromBufferAttribute(o,u),p.uv=je.getUV(kn,Cn,Pn,Dn,Hn,Gn,Un,new vt)),l&&(Hn.fromBufferAttribute(l,c),Gn.fromBufferAttribute(l,h),Un.fromBufferAttribute(l,u),p.uv2=je.getUV(kn,Cn,Pn,Dn,Hn,Gn,Un,new vt));const t={a:c,b:h,c:u,normal:new Lt,materialIndex:0};je.getNormal(Cn,Pn,Dn,t.normal),p.face=t}return p}Wn.prototype.isMesh=!0;class qn extends En{constructor(t=1,e=1,n=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],h=[];let u=0,d=0;function p(t,e,n,i,r,s,p,m,f,g,v){const y=s/f,x=p/g,_=s/2,w=p/2,b=m/2,M=f+1,S=g+1;let T=0,E=0;const A=new Lt;for(let s=0;s<S;s++){const a=s*x-w;for(let o=0;o<M;o++){const u=o*y-_;A[t]=u*i,A[e]=a*r,A[n]=b,l.push(A.x,A.y,A.z),A[t]=0,A[e]=0,A[n]=m>0?1:-1,c.push(A.x,A.y,A.z),h.push(o/f),h.push(1-s/g),T+=1}}for(let t=0;t<g;t++)for(let e=0;e<f;e++){const n=u+e+M*t,i=u+e+M*(t+1),r=u+(e+1)+M*(t+1),s=u+(e+1)+M*t;o.push(n,i,s),o.push(i,r,s),E+=6}a.addGroup(d,E,v),d+=E,u+=T}p("z","y","x",-1,-1,n,e,t,s,r,0),p("z","y","x",1,-1,n,e,-t,s,r,1),p("x","z","y",1,1,t,n,e,i,s,2),p("x","z","y",1,-1,t,n,-e,i,s,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(o),this.setAttribute("position",new mn(l,3)),this.setAttribute("normal",new mn(c,3)),this.setAttribute("uv",new mn(h,2))}}function Xn(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Yn(t){const e={};for(let n=0;n<t.length;n++){const i=Xn(t[n]);for(const t in i)e[t]=i[t]}return e}const Zn={clone:Xn,merge:Yn};class Jn extends Xe{constructor(t){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,void 0!==t&&(void 0!==t.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xn(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.lights=t.lights,this.clipping=t.clipping,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const i=this.uniforms[n].value;i&&i.isTexture?e.uniforms[n]={type:"t",value:i.toJSON(t).uuid}:i&&i.isColor?e.uniforms[n]={type:"c",value:i.getHex()}:i&&i.isVector2?e.uniforms[n]={type:"v2",value:i.toArray()}:i&&i.isVector3?e.uniforms[n]={type:"v3",value:i.toArray()}:i&&i.isVector4?e.uniforms[n]={type:"v4",value:i.toArray()}:i&&i.isMatrix3?e.uniforms[n]={type:"m3",value:i.toArray()}:i&&i.isMatrix4?e.uniforms[n]={type:"m4",value:i.toArray()}:e.uniforms[n]={value:i}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const t in this.extensions)!0===this.extensions[t]&&(n[t]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}Jn.prototype.isShaderMaterial=!0;class Qn extends Ce{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){void 0===t&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),t=new Lt),this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return(new this.constructor).copy(this)}}Qn.prototype.isCamera=!0;class Kn extends Qn{constructor(t=50,e=1,n=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=null===t.view?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=2*lt*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(.5*ot*this.fov);return.5*this.getFilmHeight()/t}getEffectiveFOV(){return 2*lt*Math.atan(Math.tan(.5*ot*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,s){this.aspect=t/e,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(.5*ot*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const s=this.view;if(null!==this.view&&this.view.enabled){const t=s.fullWidth,a=s.fullHeight;r+=s.offsetX*i/t,e-=s.offsetY*n/a,i*=s.width/t,n*=s.height/a}const a=this.filmOffset;0!==a&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,null!==this.view&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}Kn.prototype.isPerspectiveCamera=!0;const $n=90;class ti extends Ce{constructor(t,e,n){if(super(),this.type="CubeCamera",!0!==n.isWebGLCubeRenderTarget)return void console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");this.renderTarget=n;const i=new Kn($n,1,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new Lt(1,0,0)),this.add(i);const r=new Kn($n,1,t,e);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new Lt(-1,0,0)),this.add(r);const s=new Kn($n,1,t,e);s.layers=this.layers,s.up.set(0,0,1),s.lookAt(new Lt(0,1,0)),this.add(s);const a=new Kn($n,1,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new Lt(0,-1,0)),this.add(a);const o=new Kn($n,1,t,e);o.layers=this.layers,o.up.set(0,-1,0),o.lookAt(new Lt(0,0,1)),this.add(o);const l=new Kn($n,1,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new Lt(0,0,-1)),this.add(l)}update(t,e){null===this.parent&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,s,a,o,l]=this.children,c=t.xr.enabled,h=t.getRenderTarget();t.xr.enabled=!1;const u=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,r),t.setRenderTarget(n,2),t.render(e,s),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,o),n.texture.generateMipmaps=u,t.setRenderTarget(n,5),t.render(e,l),t.setRenderTarget(h),t.xr.enabled=c}}class ei extends bt{constructor(t,e,n,i,s,a,o,l,c,h){super(t=void 0!==t?t:[],e=void 0!==e?e:r,n,i,s,a,o=void 0!==o?o:T,l,c,h),this._needsFlipEnvMap=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}ei.prototype.isCubeTexture=!0;class ni extends Tt{constructor(t,e,n){Number.isInteger(e)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),e=n),super(t,t,e),e=e||{},this.texture=new ei(void 0,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.generateMipmaps=void 0!==e.generateMipmaps&&e.generateMipmaps,this.texture.minFilter=void 0!==e.minFilter?e.minFilter:g,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.format=E,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:"\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",fragmentShader:"\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"},i=new qn(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:Xn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=e;const s=new Wn(i,r),a=e.minFilter;e.minFilter===y&&(e.minFilter=g);return new ti(1,10,this).update(t,s),e.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(r)}}ni.prototype.isWebGLCubeRenderTarget=!0;class ii extends bt{constructor(t,e,n,i,r,s,a,o,l,c,h,u){super(null,s,a,o,l,c,i,r,h,u),this.image={data:t||null,width:e||1,height:n||1},this.magFilter=void 0!==l?l:p,this.minFilter=void 0!==c?c:p,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}ii.prototype.isDataTexture=!0;const ri=new Jt,si=new Lt;class ai{constructor(t=new Ne,e=new Ne,n=new Ne,i=new Ne,r=new Ne,s=new Ne){this.planes=[t,e,n,i,r,s]}set(t,e,n,i,r,s){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],r=n[1],s=n[2],a=n[3],o=n[4],l=n[5],c=n[6],h=n[7],u=n[8],d=n[9],p=n[10],m=n[11],f=n[12],g=n[13],v=n[14],y=n[15];return e[0].setComponents(a-i,h-o,m-u,y-f).normalize(),e[1].setComponents(a+i,h+o,m+u,y+f).normalize(),e[2].setComponents(a+r,h+l,m+d,y+g).normalize(),e[3].setComponents(a-r,h-l,m-d,y-g).normalize(),e[4].setComponents(a-s,h-c,m-p,y-v).normalize(),e[5].setComponents(a+s,h+c,m+p,y+v).normalize(),this}intersectsObject(t){const e=t.geometry;return null===e.boundingSphere&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSprite(t){return ri.center.set(0,0,0),ri.radius=.7071067811865476,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let t=0;t<6;t++){if(e[t].distanceToPoint(n)<i)return!1}return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(si.x=i.normal.x>0?t.max.x:t.min.x,si.y=i.normal.y>0?t.max.y:t.min.y,si.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(si)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return(new this.constructor).copy(this)}}function oi(){let t=null,e=!1,n=null,i=null;function r(e,s){n(e,s),i=t.requestAnimationFrame(r)}return{start:function(){!0!==e&&null!==n&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(t){n=t},setContext:function(e){t=e}}}function li(t,e){const n=e.isWebGL2,i=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),i.get(t)},remove:function(e){e.isInterleavedBufferAttribute&&(e=e.data);const n=i.get(e);n&&(t.deleteBuffer(n.buffer),i.delete(e))},update:function(e,r){if(e.isGLBufferAttribute){const t=i.get(e);return void((!t||t.version<e.version)&&i.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version}))}e.isInterleavedBufferAttribute&&(e=e.data);const s=i.get(e);void 0===s?i.set(e,function(e,i){const r=e.array,s=e.usage,a=t.createBuffer();t.bindBuffer(i,a),t.bufferData(i,r,s),e.onUploadCallback();let o=5126;return r instanceof Float32Array?o=5126:r instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):r instanceof Uint16Array?e.isFloat16BufferAttribute?n?o=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):o=5123:r instanceof Int16Array?o=5122:r instanceof Uint32Array?o=5125:r instanceof Int32Array?o=5124:r instanceof Int8Array?o=5120:r instanceof Uint8Array&&(o=5121),{buffer:a,type:o,bytesPerElement:r.BYTES_PER_ELEMENT,version:e.version}}(e,r)):s.version<e.version&&(!function(e,i,r){const s=i.array,a=i.updateRange;t.bindBuffer(r,e),-1===a.count?t.bufferSubData(r,0,s):(n?t.bufferSubData(r,a.offset*s.BYTES_PER_ELEMENT,s,a.offset,a.count):t.bufferSubData(r,a.offset*s.BYTES_PER_ELEMENT,s.subarray(a.offset,a.offset+a.count)),a.count=-1)}(s.buffer,e,r),s.version=e.version)}}}class ci extends En{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,s=e/2,a=Math.floor(n),o=Math.floor(i),l=a+1,c=o+1,h=t/a,u=e/o,d=[],p=[],m=[],f=[];for(let t=0;t<c;t++){const e=t*u-s;for(let n=0;n<l;n++){const i=n*h-r;p.push(i,-e,0),m.push(0,0,1),f.push(n/a),f.push(1-t/o)}}for(let t=0;t<o;t++)for(let e=0;e<a;e++){const n=e+l*t,i=e+l*(t+1),r=e+1+l*(t+1),s=e+1+l*t;d.push(n,i,s),d.push(i,r,s)}this.setIndex(d),this.setAttribute("position",new mn(p,3)),this.setAttribute("normal",new mn(m,3)),this.setAttribute("uv",new mn(f,2))}}const hi={alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",alphatest_fragment:"#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",begin_vertex:"vec3 transformed = vec3( position );",beginnormal_vertex:"vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",bsdfs:"vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",color_fragment:"#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",color_pars_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",color_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",common:"#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",defaultnormal_vertex:"vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",encodings_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",encodings_pars_fragment:"\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",envmap_fragment:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",envmap_common_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",envmap_physical_pars_fragment:"#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",fog_vertex:"#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",gradientmap_pars_fragment:"#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",lightmap_fragment:"#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_vertex:"vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",lights_pars_begin:"uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",lights_toon_fragment:"ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",lights_toon_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_phong_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(\t\t0, 1,\t\t0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",lights_fragment_begin:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",logdepthbuf_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",map_particle_fragment:"#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",map_particle_pars_fragment:"#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",normal_fragment_begin:"float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",normal_fragment_maps:"#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif",clearcoat_normal_fragment_begin:"#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",clearcoat_normal_fragment_maps:"#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif",clearcoat_pars_fragment:"#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",project_vertex:"vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",dithering_fragment:"#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",dithering_pars_fragment:"#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",tonemapping_pars_fragment:"#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(\t1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,\t1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,\t1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",transmissionmap_fragment:"#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif",transmissionmap_pars_fragment:"#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif",uv_pars_fragment:"#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",uv_pars_vertex:"#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",uv_vertex:"#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",uv2_pars_fragment:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",uv2_pars_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",uv2_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",background_frag:"uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",background_vert:"varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",cube_frag:"#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",cube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",equirect_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",meshlambert_frag:"uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshlambert_vert:"#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshmatcap_frag:"#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshmatcap_vert:"#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",meshtoon_frag:"#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshtoon_vert:"#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphysical_frag:"#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphysical_vert:"#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",normal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",normal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",shadow_vert:"#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}"},ui={common:{diffuse:{value:new tn(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new yt},uv2Transform:{value:new yt},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tn(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new yt}},sprite:{diffuse:{value:new tn(15658734)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new yt}}},di={basic:{uniforms:Yn([ui.common,ui.specularmap,ui.envmap,ui.aomap,ui.lightmap,ui.fog]),vertexShader:hi.meshbasic_vert,fragmentShader:hi.meshbasic_frag},lambert:{uniforms:Yn([ui.common,ui.specularmap,ui.envmap,ui.aomap,ui.lightmap,ui.emissivemap,ui.fog,ui.lights,{emissive:{value:new tn(0)}}]),vertexShader:hi.meshlambert_vert,fragmentShader:hi.meshlambert_frag},phong:{uniforms:Yn([ui.common,ui.specularmap,ui.envmap,ui.aomap,ui.lightmap,ui.emissivemap,ui.bumpmap,ui.normalmap,ui.displacementmap,ui.fog,ui.lights,{emissive:{value:new tn(0)},specular:{value:new tn(1118481)},shininess:{value:30}}]),vertexShader:hi.meshphong_vert,fragmentShader:hi.meshphong_frag},standard:{uniforms:Yn([ui.common,ui.envmap,ui.aomap,ui.lightmap,ui.emissivemap,ui.bumpmap,ui.normalmap,ui.displacementmap,ui.roughnessmap,ui.metalnessmap,ui.fog,ui.lights,{emissive:{value:new tn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:hi.meshphysical_vert,fragmentShader:hi.meshphysical_frag},toon:{uniforms:Yn([ui.common,ui.aomap,ui.lightmap,ui.emissivemap,ui.bumpmap,ui.normalmap,ui.displacementmap,ui.gradientmap,ui.fog,ui.lights,{emissive:{value:new tn(0)}}]),vertexShader:hi.meshtoon_vert,fragmentShader:hi.meshtoon_frag},matcap:{uniforms:Yn([ui.common,ui.bumpmap,ui.normalmap,ui.displacementmap,ui.fog,{matcap:{value:null}}]),vertexShader:hi.meshmatcap_vert,fragmentShader:hi.meshmatcap_frag},points:{uniforms:Yn([ui.points,ui.fog]),vertexShader:hi.points_vert,fragmentShader:hi.points_frag},dashed:{uniforms:Yn([ui.common,ui.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:hi.linedashed_vert,fragmentShader:hi.linedashed_frag},depth:{uniforms:Yn([ui.common,ui.displacementmap]),vertexShader:hi.depth_vert,fragmentShader:hi.depth_frag},normal:{uniforms:Yn([ui.common,ui.bumpmap,ui.normalmap,ui.displacementmap,{opacity:{value:1}}]),vertexShader:hi.normal_vert,fragmentShader:hi.normal_frag},sprite:{uniforms:Yn([ui.sprite,ui.fog]),vertexShader:hi.sprite_vert,fragmentShader:hi.sprite_frag},background:{uniforms:{uvTransform:{value:new yt},t2D:{value:null}},vertexShader:hi.background_vert,fragmentShader:hi.background_frag},cube:{uniforms:Yn([ui.envmap,{opacity:{value:1}}]),vertexShader:hi.cube_vert,fragmentShader:hi.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:hi.equirect_vert,fragmentShader:hi.equirect_frag},distanceRGBA:{uniforms:Yn([ui.common,ui.displacementmap,{referencePosition:{value:new Lt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:hi.distanceRGBA_vert,fragmentShader:hi.distanceRGBA_frag},shadow:{uniforms:Yn([ui.lights,ui.fog,{color:{value:new tn(0)},opacity:{value:1}}]),vertexShader:hi.shadow_vert,fragmentShader:hi.shadow_frag}};function pi(t,e,n,i,r){const s=new tn(0);let a,o,c=0,h=null,u=0,d=null;function p(t,e){n.buffers.color.setClear(t.r,t.g,t.b,e,r)}return{getClearColor:function(){return s},setClearColor:function(t,e=1){s.set(t),c=e,p(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(t){c=t,p(s,c)},render:function(n,r,m,f){let g=!0===r.isScene?r.background:null;g&&g.isTexture&&(g=e.get(g));const v=t.xr,y=v.getSession&&v.getSession();y&&"additive"===y.environmentBlendMode&&(g=null),null===g?p(s,c):g&&g.isColor&&(p(g,1),f=!0),(t.autoClear||f)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===l)?(void 0===o&&(o=new Wn(new qn(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Xn(di.cube.uniforms),vertexShader:di.cube.vertexShader,fragmentShader:di.cube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),o.geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(t,e,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(o)),o.material.uniforms.envMap.value=g,o.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g._needsFlipEnvMap?-1:1,h===g&&u===g.version&&d===t.toneMapping||(o.material.needsUpdate=!0,h=g,u=g.version,d=t.toneMapping),n.unshift(o,o.geometry,o.material,0,0,null)):g&&g.isTexture&&(void 0===a&&(a=new Wn(new ci(2,2),new Jn({name:"BackgroundMaterial",uniforms:Xn(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(a)),a.material.uniforms.t2D.value=g,!0===g.matrixAutoUpdate&&g.updateMatrix(),a.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&u===g.version&&d===t.toneMapping||(a.material.needsUpdate=!0,h=g,u=g.version,d=t.toneMapping),n.unshift(a,a.geometry,a.material,0,0,null))}}}function mi(t,e,n,i){const r=t.getParameter(34921),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||null!==s,o={},l=d(null);let c=l;function h(e){return i.isWebGL2?t.bindVertexArray(e):s.bindVertexArrayOES(e)}function u(e){return i.isWebGL2?t.deleteVertexArray(e):s.deleteVertexArrayOES(e)}function d(t){const e=[],n=[],i=[];for(let t=0;t<r;t++)e[t]=0,n[t]=0,i[t]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:e,enabledAttributes:n,attributeDivisors:i,object:t,attributes:{},index:null}}function p(){const t=c.newAttributes;for(let e=0,n=t.length;e<n;e++)t[e]=0}function m(t){f(t,0)}function f(n,r){const s=c.newAttributes,a=c.enabledAttributes,o=c.attributeDivisors;if(s[n]=1,0===a[n]&&(t.enableVertexAttribArray(n),a[n]=1),o[n]!==r){(i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](n,r),o[n]=r}}function g(){const e=c.newAttributes,n=c.enabledAttributes;for(let i=0,r=n.length;i<r;i++)n[i]!==e[i]&&(t.disableVertexAttribArray(i),n[i]=0)}function v(e,n,r,s,a,o){!0!==i.isWebGL2||5124!==r&&5125!==r?t.vertexAttribPointer(e,n,r,s,a,o):t.vertexAttribIPointer(e,n,r,a,o)}function y(){x(),c!==l&&(c=l,h(c.object))}function x(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:function(r,l,u,y,x){let _=!1;if(a){const e=function(e,n,r){const a=!0===r.wireframe;let l=o[e.id];void 0===l&&(l={},o[e.id]=l);let c=l[n.id];void 0===c&&(c={},l[n.id]=c);let h=c[a];void 0===h&&(h=d(i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()),c[a]=h);return h}(y,u,l);c!==e&&(c=e,h(c.object)),_=function(t,e){const n=c.attributes,i=t.attributes;let r=0;for(const t in i){const e=n[t],s=i[t];if(void 0===e)return!0;if(e.attribute!==s)return!0;if(e.data!==s.data)return!0;r++}return c.attributesNum!==r||c.index!==e}(y,x),_&&function(t,e){const n={},i=t.attributes;let r=0;for(const t in i){const e=i[t],s={};s.attribute=e,e.data&&(s.data=e.data),n[t]=s,r++}c.attributes=n,c.attributesNum=r,c.index=e}(y,x)}else{const t=!0===l.wireframe;c.geometry===y.id&&c.program===u.id&&c.wireframe===t||(c.geometry=y.id,c.program=u.id,c.wireframe=t,_=!0)}!0===r.isInstancedMesh&&(_=!0),null!==x&&n.update(x,34963),_&&(!function(r,s,a,o){if(!1===i.isWebGL2&&(r.isInstancedMesh||o.isInstancedBufferGeometry)&&null===e.get("ANGLE_instanced_arrays"))return;p();const l=o.attributes,c=a.getAttributes(),h=s.defaultAttributeValues;for(const e in c){const i=c[e];if(i>=0){const s=l[e];if(void 0!==s){const e=s.normalized,r=s.itemSize,a=n.get(s);if(void 0===a)continue;const l=a.buffer,c=a.type,h=a.bytesPerElement;if(s.isInterleavedBufferAttribute){const n=s.data,a=n.stride,u=s.offset;n&&n.isInstancedInterleavedBuffer?(f(i,n.meshPerAttribute),void 0===o._maxInstanceCount&&(o._maxInstanceCount=n.meshPerAttribute*n.count)):m(i),t.bindBuffer(34962,l),v(i,r,c,e,a*h,u*h)}else s.isInstancedBufferAttribute?(f(i,s.meshPerAttribute),void 0===o._maxInstanceCount&&(o._maxInstanceCount=s.meshPerAttribute*s.count)):m(i),t.bindBuffer(34962,l),v(i,r,c,e,0,0)}else if("instanceMatrix"===e){const e=n.get(r.instanceMatrix);if(void 0===e)continue;const s=e.buffer,a=e.type;f(i+0,1),f(i+1,1),f(i+2,1),f(i+3,1),t.bindBuffer(34962,s),t.vertexAttribPointer(i+0,4,a,!1,64,0),t.vertexAttribPointer(i+1,4,a,!1,64,16),t.vertexAttribPointer(i+2,4,a,!1,64,32),t.vertexAttribPointer(i+3,4,a,!1,64,48)}else if("instanceColor"===e){const e=n.get(r.instanceColor);if(void 0===e)continue;const s=e.buffer,a=e.type;f(i,1),t.bindBuffer(34962,s),t.vertexAttribPointer(i,3,a,!1,12,0)}else if(void 0!==h){const n=h[e];if(void 0!==n)switch(n.length){case 2:t.vertexAttrib2fv(i,n);break;case 3:t.vertexAttrib3fv(i,n);break;case 4:t.vertexAttrib4fv(i,n);break;default:t.vertexAttrib1fv(i,n)}}}}g()}(r,l,u,y),null!==x&&t.bindBuffer(34963,n.get(x).buffer))},reset:y,resetDefaultState:x,dispose:function(){y();for(const t in o){const e=o[t];for(const t in e){const n=e[t];for(const t in n)u(n[t].object),delete n[t];delete e[t]}delete o[t]}},releaseStatesOfGeometry:function(t){if(void 0===o[t.id])return;const e=o[t.id];for(const t in e){const n=e[t];for(const t in n)u(n[t].object),delete n[t];delete e[t]}delete o[t.id]},releaseStatesOfProgram:function(t){for(const e in o){const n=o[e];if(void 0===n[t.id])continue;const i=n[t.id];for(const t in i)u(i[t].object),delete i[t];delete n[t.id]}},initAttributes:p,enableAttribute:m,disableUnusedAttributes:g}}function fi(t,e,n,i){const r=i.isWebGL2;let s;this.setMode=function(t){s=t},this.render=function(e,i){t.drawArrays(s,e,i),n.update(i,s,1)},this.renderInstances=function(i,a,o){if(0===o)return;let l,c;if(r)l=t,c="drawArraysInstanced";else if(l=e.get("ANGLE_instanced_arrays"),c="drawArraysInstancedANGLE",null===l)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");l[c](s,i,a,o),n.update(a,s,o)}}function gi(t,e,n){let i;function r(e){if("highp"===e){if(t.getShaderPrecisionFormat(35633,36338).precision>0&&t.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";e="mediump"}return"mediump"===e&&t.getShaderPrecisionFormat(35633,36337).precision>0&&t.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const s="undefined"!=typeof WebGL2RenderingContext&&t instanceof WebGL2RenderingContext||"undefined"!=typeof WebGL2ComputeRenderingContext&&t instanceof WebGL2ComputeRenderingContext;let a=void 0!==n.precision?n.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=!0===n.logarithmicDepthBuffer,c=t.getParameter(34930),h=t.getParameter(35660),u=t.getParameter(3379),d=t.getParameter(34076),p=t.getParameter(34921),m=t.getParameter(36347),f=t.getParameter(36348),g=t.getParameter(36349),v=h>0,y=s||e.has("OES_texture_float");return{isWebGL2:s,getMaxAnisotropy:function(){if(void 0!==i)return i;if(!0===e.has("EXT_texture_filter_anisotropic")){const n=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:r,precision:a,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:h,maxTextureSize:u,maxCubemapSize:d,maxAttributes:p,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:g,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:v&&y,maxSamples:s?t.getParameter(36183):0}}function vi(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Ne,o=new yt,l={value:null,needsUpdate:!1};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(t,n,i,r){const s=null!==t?t.length:0;let c=null;if(0!==s){if(c=l.value,!0!==r||null===c){const e=i+4*s,r=n.matrixWorldInverse;o.getNormalMatrix(r),(null===c||c.length<e)&&(c=new Float32Array(e));for(let e=0,n=i;e!==s;++e,n+=4)a.copy(t[e]).applyMatrix4(r,o),a.normal.toArray(c,n),c[n+3]=a.constant}l.value=c,l.needsUpdate=!0}return e.numPlanes=s,e.numIntersection=0,c}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(t,e,s){const a=0!==t.length||e||0!==i||r;return r=e,n=h(t,s,0),i=t.length,a},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1,c()},this.setState=function(e,a,o){const u=e.clippingPlanes,d=e.clipIntersection,p=e.clipShadows,m=t.get(e);if(!r||null===u||0===u.length||s&&!p)s?h(null):c();else{const t=s?0:i,e=4*t;let r=m.clippingState||null;l.value=r,r=h(u,a,e,o);for(let t=0;t!==e;++t)r[t]=n[t];m.clippingState=r,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=t}}}function yi(t){let e=new WeakMap;function n(t,e){return e===a?t.mapping=r:e===o&&(t.mapping=s),t}function i(t){const n=t.target;n.removeEventListener("dispose",i);const r=e.get(n);void 0!==r&&(e.delete(n),r.dispose())}return{get:function(r){if(r&&r.isTexture){const s=r.mapping;if(s===a||s===o){if(e.has(r)){return n(e.get(r).texture,r.mapping)}{const s=r.image;if(s&&s.height>0){const a=t.getRenderTarget(),o=new ni(s.height/2);return o.fromEquirectangularTexture(t,r),e.set(r,o),t.setRenderTarget(a),r.addEventListener("dispose",i),n(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}function xi(t){const e={};function n(n){if(void 0!==e[n])return e[n];let i;switch(n){case"WEBGL_depth_texture":i=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=t.getExtension(n)}return e[n]=i,i}return{has:function(t){return null!==n(t)},init:function(t){t.isWebGL2?n("EXT_color_buffer_float"):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float")},get:function(t){const e=n(t);return null===e&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),e}}}function _i(t,e,n,i){const r={},s=new WeakMap;function a(t){const o=t.target;null!==o.index&&e.remove(o.index);for(const t in o.attributes)e.remove(o.attributes[t]);o.removeEventListener("dispose",a),delete r[o.id];const l=s.get(o);l&&(e.remove(l),s.delete(o)),i.releaseStatesOfGeometry(o),!0===o.isInstancedBufferGeometry&&delete o._maxInstanceCount,n.memory.geometries--}function o(t){const n=[],i=t.index,r=t.attributes.position;let a=0;if(null!==i){const t=i.array;a=i.version;for(let e=0,i=t.length;e<i;e+=3){const i=t[e+0],r=t[e+1],s=t[e+2];n.push(i,r,r,s,s,i)}}else{const t=r.array;a=r.version;for(let e=0,i=t.length/3-1;e<i;e+=3){const t=e+0,i=e+1,r=e+2;n.push(t,i,i,r,r,t)}}const o=new(gn(n)>65535?dn:hn)(n,1);o.version=a;const l=s.get(t);l&&e.remove(l),s.set(t,o)}return{get:function(t,e){return!0===r[e.id]||(e.addEventListener("dispose",a),r[e.id]=!0,n.memory.geometries++),e},update:function(t){const n=t.attributes;for(const t in n)e.update(n[t],34962);const i=t.morphAttributes;for(const t in i){const n=i[t];for(let t=0,i=n.length;t<i;t++)e.update(n[t],34962)}},getWireframeAttribute:function(t){const e=s.get(t);if(e){const n=t.index;null!==n&&e.version<n.version&&o(t)}else o(t);return s.get(t)}}}function wi(t,e,n,i){const r=i.isWebGL2;let s,a,o;this.setMode=function(t){s=t},this.setIndex=function(t){a=t.type,o=t.bytesPerElement},this.render=function(e,i){t.drawElements(s,i,a,e*o),n.update(i,s,1)},this.renderInstances=function(i,l,c){if(0===c)return;let h,u;if(r)h=t,u="drawElementsInstanced";else if(h=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",null===h)return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");h[u](s,l,a,i*o,c),n.update(l,s,c)}}function bi(t){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case 4:e.triangles+=i*(t/3);break;case 1:e.lines+=i*(t/2);break;case 3:e.lines+=i*(t-1);break;case 2:e.lines+=i*t;break;case 0:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Mi(t,e){return t[0]-e[0]}function Si(t,e){return Math.abs(e[1])-Math.abs(t[1])}function Ti(t){const e={},n=new Float32Array(8),i=[];for(let t=0;t<8;t++)i[t]=[t,0];return{update:function(r,s,a,o){const l=r.morphTargetInfluences,c=void 0===l?0:l.length;let h=e[s.id];if(void 0===h){h=[];for(let t=0;t<c;t++)h[t]=[t,0];e[s.id]=h}for(let t=0;t<c;t++){const e=h[t];e[0]=t,e[1]=l[t]}h.sort(Si);for(let t=0;t<8;t++)t<c&&h[t][1]?(i[t][0]=h[t][0],i[t][1]=h[t][1]):(i[t][0]=Number.MAX_SAFE_INTEGER,i[t][1]=0);i.sort(Mi);const u=a.morphTargets&&s.morphAttributes.position,d=a.morphNormals&&s.morphAttributes.normal;let p=0;for(let t=0;t<8;t++){const e=i[t],r=e[0],a=e[1];r!==Number.MAX_SAFE_INTEGER&&a?(u&&s.getAttribute("morphTarget"+t)!==u[r]&&s.setAttribute("morphTarget"+t,u[r]),d&&s.getAttribute("morphNormal"+t)!==d[r]&&s.setAttribute("morphNormal"+t,d[r]),n[t]=a,p+=a):(u&&!0===s.hasAttribute("morphTarget"+t)&&s.deleteAttribute("morphTarget"+t),d&&!0===s.hasAttribute("morphNormal"+t)&&s.deleteAttribute("morphNormal"+t),n[t]=0)}const m=s.morphTargetsRelative?1:1-p;o.getUniforms().setValue(t,"morphTargetBaseInfluence",m),o.getUniforms().setValue(t,"morphTargetInfluences",n)}}}function Ei(t,e,n,i){let r=new WeakMap;function s(t){const e=t.target;e.removeEventListener("dispose",s),n.remove(e.instanceMatrix),null!==e.instanceColor&&n.remove(e.instanceColor)}return{update:function(t){const a=i.render.frame,o=t.geometry,l=e.get(t,o);return r.get(l)!==a&&(e.update(l),r.set(l,a)),t.isInstancedMesh&&(!1===t.hasEventListener("dispose",s)&&t.addEventListener("dispose",s),n.update(t.instanceMatrix,34962),null!==t.instanceColor&&n.update(t.instanceColor,34962)),l},dispose:function(){r=new WeakMap}}}di.physical={uniforms:Yn([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new vt(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new tn(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:hi.meshphysical_vert,fragmentShader:hi.meshphysical_frag};class Ai extends bt{constructor(t=null,e=1,n=1,i=1){super(null),this.image={data:t,width:e,height:n,depth:i},this.magFilter=p,this.minFilter=p,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}Ai.prototype.isDataTexture2DArray=!0;class Li extends bt{constructor(t=null,e=1,n=1,i=1){super(null),this.image={data:t,width:e,height:n,depth:i},this.magFilter=p,this.minFilter=p,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}Li.prototype.isDataTexture3D=!0;const Ri=new bt,Ci=new Ai,Pi=new Li,Di=new ei,Ii=[],Ni=[],Bi=new Float32Array(16),zi=new Float32Array(9),Fi=new Float32Array(4);function Oi(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Ii[r];if(void 0===s&&(s=new Float32Array(r),Ii[r]=s),0!==e){i.toArray(s,0);for(let i=1,r=0;i!==e;++i)r+=n,t[i].toArray(s,r)}return s}function Hi(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Gi(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ui(t,e){let n=Ni[e];void 0===n&&(n=new Int32Array(e),Ni[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function ki(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Vi(t,e){const n=this.cache;if(void 0!==e.x)n[0]===e.x&&n[1]===e.y||(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Hi(n,e))return;t.uniform2fv(this.addr,e),Gi(n,e)}}function Wi(t,e){const n=this.cache;if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z||(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(void 0!==e.r)n[0]===e.r&&n[1]===e.g&&n[2]===e.b||(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Hi(n,e))return;t.uniform3fv(this.addr,e),Gi(n,e)}}function ji(t,e){const n=this.cache;if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z&&n[3]===e.w||(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Hi(n,e))return;t.uniform4fv(this.addr,e),Gi(n,e)}}function qi(t,e){const n=this.cache,i=e.elements;if(void 0===i){if(Hi(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Gi(n,e)}else{if(Hi(n,i))return;Fi.set(i),t.uniformMatrix2fv(this.addr,!1,Fi),Gi(n,i)}}function Xi(t,e){const n=this.cache,i=e.elements;if(void 0===i){if(Hi(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Gi(n,e)}else{if(Hi(n,i))return;zi.set(i),t.uniformMatrix3fv(this.addr,!1,zi),Gi(n,i)}}function Yi(t,e){const n=this.cache,i=e.elements;if(void 0===i){if(Hi(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Gi(n,e)}else{if(Hi(n,i))return;Bi.set(i),t.uniformMatrix4fv(this.addr,!1,Bi),Gi(n,i)}}function Zi(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Ji(t,e){const n=this.cache;Hi(n,e)||(t.uniform2iv(this.addr,e),Gi(n,e))}function Qi(t,e){const n=this.cache;Hi(n,e)||(t.uniform3iv(this.addr,e),Gi(n,e))}function Ki(t,e){const n=this.cache;Hi(n,e)||(t.uniform4iv(this.addr,e),Gi(n,e))}function $i(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function tr(t,e){const n=this.cache;Hi(n,e)||(t.uniform2uiv(this.addr,e),Gi(n,e))}function er(t,e){const n=this.cache;Hi(n,e)||(t.uniform3uiv(this.addr,e),Gi(n,e))}function nr(t,e){const n=this.cache;Hi(n,e)||(t.uniform4uiv(this.addr,e),Gi(n,e))}function ir(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.safeSetTexture2D(e||Ri,r)}function rr(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Pi,r)}function sr(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.safeSetTextureCube(e||Di,r)}function ar(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Ci,r)}function or(t,e){t.uniform1fv(this.addr,e)}function lr(t,e){const n=Oi(e,this.size,2);t.uniform2fv(this.addr,n)}function cr(t,e){const n=Oi(e,this.size,3);t.uniform3fv(this.addr,n)}function hr(t,e){const n=Oi(e,this.size,4);t.uniform4fv(this.addr,n)}function ur(t,e){const n=Oi(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function dr(t,e){const n=Oi(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function pr(t,e){const n=Oi(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function mr(t,e){t.uniform1iv(this.addr,e)}function fr(t,e){t.uniform2iv(this.addr,e)}function gr(t,e){t.uniform3iv(this.addr,e)}function vr(t,e){t.uniform4iv(this.addr,e)}function yr(t,e){t.uniform1uiv(this.addr,e)}function xr(t,e){t.uniform2uiv(this.addr,e)}function _r(t,e){t.uniform3uiv(this.addr,e)}function wr(t,e){t.uniform4uiv(this.addr,e)}function br(t,e,n){const i=e.length,r=Ui(n,i);t.uniform1iv(this.addr,r);for(let t=0;t!==i;++t)n.safeSetTexture2D(e[t]||Ri,r[t])}function Mr(t,e,n){const i=e.length,r=Ui(n,i);t.uniform1iv(this.addr,r);for(let t=0;t!==i;++t)n.safeSetTextureCube(e[t]||Di,r[t])}function Sr(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=function(t){switch(t){case 5126:return ki;case 35664:return Vi;case 35665:return Wi;case 35666:return ji;case 35674:return qi;case 35675:return Xi;case 35676:return Yi;case 5124:case 35670:return Zi;case 35667:case 35671:return Ji;case 35668:case 35672:return Qi;case 35669:case 35673:return Ki;case 5125:return $i;case 36294:return tr;case 36295:return er;case 36296:return nr;case 35678:case 36198:case 36298:case 36306:case 35682:return ir;case 35679:case 36299:case 36307:return rr;case 35680:case 36300:case 36308:case 36293:return sr;case 36289:case 36303:case 36311:case 36292:return ar}}(e.type)}function Tr(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=function(t){switch(t){case 5126:return or;case 35664:return lr;case 35665:return cr;case 35666:return hr;case 35674:return ur;case 35675:return dr;case 35676:return pr;case 5124:case 35670:return mr;case 35667:case 35671:return fr;case 35668:case 35672:return gr;case 35669:case 35673:return vr;case 5125:return yr;case 36294:return xr;case 36295:return _r;case 36296:return wr;case 35678:case 36198:case 36298:case 36306:case 35682:return br;case 35680:case 36300:case 36308:case 36293:return Mr}}(e.type)}function Er(t){this.id=t,this.seq=[],this.map={}}Tr.prototype.updateCache=function(t){const e=this.cache;t instanceof Float32Array&&e.length!==t.length&&(this.cache=new Float32Array(t.length)),Gi(e,t)},Er.prototype.setValue=function(t,e,n){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const s=i[r];s.setValue(t,e[s.id],n)}};const Ar=/(\w+)(\])?(\[|\.)?/g;function Lr(t,e){t.seq.push(e),t.map[e.id]=e}function Rr(t,e,n){const i=t.name,r=i.length;for(Ar.lastIndex=0;;){const s=Ar.exec(i),a=Ar.lastIndex;let o=s[1];const l="]"===s[2],c=s[3];if(l&&(o|=0),void 0===c||"["===c&&a+2===r){Lr(n,void 0===c?new Sr(o,t,e):new Tr(o,t,e));break}{let t=n.map[o];void 0===t&&(t=new Er(o),Lr(n,t)),n=t}}}function Cr(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const n=t.getActiveUniform(e,i);Rr(n,t.getUniformLocation(e,n.name),this)}}function Pr(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}Cr.prototype.setValue=function(t,e,n,i){const r=this.map[e];void 0!==r&&r.setValue(t,n,i)},Cr.prototype.setOptional=function(t,e,n){const i=e[n];void 0!==i&&this.setValue(t,n,i)},Cr.upload=function(t,e,n,i){for(let r=0,s=e.length;r!==s;++r){const s=e[r],a=n[s.id];!1!==a.needsUpdate&&s.setValue(t,a.value,i)}},Cr.seqWithValue=function(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const r=t[i];r.id in e&&n.push(r)}return n};let Dr=0;function Ir(t){switch(t){case X:return["Linear","( value )"];case Y:return["sRGB","( value )"];case J:return["RGBE","( value )"];case Q:return["RGBM","( value, 7.0 )"];case K:return["RGBM","( value, 16.0 )"];case $:return["RGBD","( value, 256.0 )"];case Z:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case 3003:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",t),["Linear","( value )"]}}function Nr(t,e,n){const i=t.getShaderParameter(e,35713),r=t.getShaderInfoLog(e).trim();if(i&&""===r)return"";return"THREE.WebGLShader: gl.getShaderInfoLog() "+n+"\n"+r+function(t){const e=t.split("\n");for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join("\n")}(t.getShaderSource(e))}function Br(t,e){const n=Ir(e);return"vec4 "+t+"( vec4 value ) { return "+n[0]+"ToLinear"+n[1]+"; }"}function zr(t,e){const n=Ir(e);return"vec4 "+t+"( vec4 value ) { return LinearTo"+n[0]+n[1]+"; }"}function Fr(t,e){let n;switch(e){case 1:n="Linear";break;case 2:n="Reinhard";break;case 3:n="OptimizedCineon";break;case 4:n="ACESFilmic";break;case 5:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Or(t){return""!==t}function Hr(t,e){return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gr(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ur=/^[ \t]*#include +<([\w\d./]+)>/gm;function kr(t){return t.replace(Ur,Vr)}function Vr(t,e){const n=hi[e];if(void 0===n)throw new Error("Can not resolve #include <"+e+">");return kr(n)}const Wr=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,jr=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qr(t){return t.replace(jr,Yr).replace(Wr,Xr)}function Xr(t,e,n,i){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Yr(t,e,n,i)}function Yr(t,e,n,i){let r="";for(let t=parseInt(e);t<parseInt(n);t++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+t+" ]").replace(/UNROLLED_LOOP_INDEX/g,t);return r}function Zr(t){let e="precision "+t.precision+" float;\nprecision "+t.precision+" int;";return"highp"===t.precision?e+="\n#define HIGH_PRECISION":"mediump"===t.precision?e+="\n#define MEDIUM_PRECISION":"lowp"===t.precision&&(e+="\n#define LOW_PRECISION"),e}function Jr(t,e,n,i){const a=t.getContext(),o=n.defines;let h=n.vertexShader,u=n.fragmentShader;const d=function(t){let e="SHADOWMAP_TYPE_BASIC";return 1===t.shadowMapType?e="SHADOWMAP_TYPE_PCF":2===t.shadowMapType?e="SHADOWMAP_TYPE_PCF_SOFT":3===t.shadowMapType&&(e="SHADOWMAP_TYPE_VSM"),e}(n),p=function(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case r:case s:e="ENVMAP_TYPE_CUBE";break;case l:case c:e="ENVMAP_TYPE_CUBE_UV"}return e}(n),m=function(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case s:case c:e="ENVMAP_MODE_REFRACTION"}return e}(n),f=function(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD"}return e}(n),g=t.gammaFactor>0?t.gammaFactor:1,v=n.isWebGL2?"":function(t){return[t.extensionDerivatives||t.envMapCubeUV||t.bumpMap||t.tangentSpaceNormalMap||t.clearcoatNormalMap||t.flatShading||"physical"===t.shaderID?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Or).join("\n")}(n),y=function(t){const e=[];for(const n in t){const i=t[n];!1!==i&&e.push("#define "+n+" "+i)}return e.join("\n")}(o),x=a.createProgram();let _,w,b=n.glslVersion?"#version "+n.glslVersion+"\n":"";n.isRawShaderMaterial?(_=[y].filter(Or).join("\n"),_.length>0&&(_+="\n"),w=[v,y].filter(Or).join("\n"),w.length>0&&(w+="\n")):(_=[Zr(n),"#define SHADER_NAME "+n.shaderName,y,n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+g,"#define MAX_BONES "+n.maxBones,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.displacementMap&&n.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.useVertexTexture?"#define BONE_TEXTURE":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&!1===n.flatShading?"#define USE_MORPHNORMALS":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(Or).join("\n"),w=[v,Zr(n),"#define SHADER_NAME "+n.shaderName,y,n.alphaTest?"#define ALPHATEST "+n.alphaTest+(n.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+m:"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.sheen?"#define USE_SHEEN":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(n.extensionShaderTextureLOD||n.envMap)&&n.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",0!==n.toneMapping?"#define TONE_MAPPING":"",0!==n.toneMapping?hi.tonemapping_pars_fragment:"",0!==n.toneMapping?Fr("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",hi.encodings_pars_fragment,n.map?Br("mapTexelToLinear",n.mapEncoding):"",n.matcap?Br("matcapTexelToLinear",n.matcapEncoding):"",n.envMap?Br("envMapTexelToLinear",n.envMapEncoding):"",n.emissiveMap?Br("emissiveMapTexelToLinear",n.emissiveMapEncoding):"",n.lightMap?Br("lightMapTexelToLinear",n.lightMapEncoding):"",zr("linearToOutputTexel",n.outputEncoding),n.depthPacking?"#define DEPTH_PACKING "+n.depthPacking:"","\n"].filter(Or).join("\n")),h=kr(h),h=Hr(h,n),h=Gr(h,n),u=kr(u),u=Hr(u,n),u=Gr(u,n),h=qr(h),u=qr(u),n.isWebGL2&&!0!==n.isRawShaderMaterial&&(b="#version 300 es\n",_=["#define attribute in","#define varying out","#define texture2D texture"].join("\n")+"\n"+_,w=["#define varying in",n.glslVersion===it?"":"out highp vec4 pc_fragColor;",n.glslVersion===it?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+w);const M=b+w+u,S=Pr(a,35633,b+_+h),T=Pr(a,35632,M);if(a.attachShader(x,S),a.attachShader(x,T),void 0!==n.index0AttributeName?a.bindAttribLocation(x,0,n.index0AttributeName):!0===n.morphTargets&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x),t.debug.checkShaderErrors){const t=a.getProgramInfoLog(x).trim(),e=a.getShaderInfoLog(S).trim(),n=a.getShaderInfoLog(T).trim();let i=!0,r=!0;if(!1===a.getProgramParameter(x,35714)){i=!1;const e=Nr(a,S,"vertex"),n=Nr(a,T,"fragment");console.error("THREE.WebGLProgram: shader error: ",a.getError(),"35715",a.getProgramParameter(x,35715),"gl.getProgramInfoLog",t,e,n)}else""!==t?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",t):""!==e&&""!==n||(r=!1);r&&(this.diagnostics={runnable:i,programLog:t,vertexShader:{log:e,prefix:_},fragmentShader:{log:n,prefix:w}})}let E,A;return a.deleteShader(S),a.deleteShader(T),this.getUniforms=function(){return void 0===E&&(E=new Cr(a,x)),E},this.getAttributes=function(){return void 0===A&&(A=function(t,e){const n={},i=t.getProgramParameter(e,35721);for(let r=0;r<i;r++){const i=t.getActiveAttrib(e,r).name;n[i]=t.getAttribLocation(e,i)}return n}(a,x)),A},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.name=n.shaderName,this.id=Dr++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=T,this}function Qr(t,e,n,i,r,s){const a=[],o=i.isWebGL2,h=i.logarithmicDepthBuffer,u=i.floatVertexTextures,d=i.maxVertexUniforms,p=i.vertexTextures;let m=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},g=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function v(t){let e;return t&&t.isTexture?e=t.encoding:t&&t.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),e=t.texture.encoding):e=X,e}return{getParameters:function(r,a,g,y,x){const _=y.fog,w=r.isMeshStandardMaterial?y.environment:null,b=e.get(r.envMap||w),M=f[r.type],S=x.isSkinnedMesh?function(t){const e=t.skeleton.bones;if(u)return 1024;{const t=d,n=Math.floor((t-20)/4),i=Math.min(n,e.length);return i<e.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+e.length+" bones. This GPU supports "+i+"."),0):i}}(x):0;let T,E;if(null!==r.precision&&(m=i.getMaxPrecision(r.precision),m!==r.precision&&console.warn("THREE.WebGLProgram.getParameters:",r.precision,"not supported, using",m,"instead.")),M){const t=di[M];T=t.vertexShader,E=t.fragmentShader}else T=r.vertexShader,E=r.fragmentShader;const A=t.getRenderTarget();return{isWebGL2:o,shaderID:M,shaderName:r.type,vertexShader:T,fragmentShader:E,defines:r.defines,isRawShaderMaterial:!0===r.isRawShaderMaterial,glslVersion:r.glslVersion,precision:m,instancing:!0===x.isInstancedMesh,instancingColor:!0===x.isInstancedMesh&&null!==x.instanceColor,supportsVertexTextures:p,outputEncoding:null!==A?v(A.texture):t.outputEncoding,map:!!r.map,mapEncoding:v(r.map),matcap:!!r.matcap,matcapEncoding:v(r.matcap),envMap:!!b,envMapMode:b&&b.mapping,envMapEncoding:v(b),envMapCubeUV:!!b&&(b.mapping===l||b.mapping===c),lightMap:!!r.lightMap,lightMapEncoding:v(r.lightMap),aoMap:!!r.aoMap,emissiveMap:!!r.emissiveMap,emissiveMapEncoding:v(r.emissiveMap),bumpMap:!!r.bumpMap,normalMap:!!r.normalMap,objectSpaceNormalMap:1===r.normalMapType,tangentSpaceNormalMap:0===r.normalMapType,clearcoatMap:!!r.clearcoatMap,clearcoatRoughnessMap:!!r.clearcoatRoughnessMap,clearcoatNormalMap:!!r.clearcoatNormalMap,displacementMap:!!r.displacementMap,roughnessMap:!!r.roughnessMap,metalnessMap:!!r.metalnessMap,specularMap:!!r.specularMap,alphaMap:!!r.alphaMap,gradientMap:!!r.gradientMap,sheen:!!r.sheen,transmissionMap:!!r.transmissionMap,combine:r.combine,vertexTangents:r.normalMap&&r.vertexTangents,vertexColors:r.vertexColors,vertexAlphas:!0===r.vertexColors&&x.geometry&&x.geometry.attributes.color&&4===x.geometry.attributes.color.itemSize,vertexUvs:!!(r.map||r.bumpMap||r.normalMap||r.specularMap||r.alphaMap||r.emissiveMap||r.roughnessMap||r.metalnessMap||r.clearcoatMap||r.clearcoatRoughnessMap||r.clearcoatNormalMap||r.displacementMap||r.transmissionMap),uvsVertexOnly:!(r.map||r.bumpMap||r.normalMap||r.specularMap||r.alphaMap||r.emissiveMap||r.roughnessMap||r.metalnessMap||r.clearcoatNormalMap||r.transmissionMap||!r.displacementMap),fog:!!_,useFog:r.fog,fogExp2:_&&_.isFogExp2,flatShading:!!r.flatShading,sizeAttenuation:r.sizeAttenuation,logarithmicDepthBuffer:h,skinning:r.skinning&&S>0,maxBones:S,useVertexTexture:u,morphTargets:r.morphTargets,morphNormals:r.morphNormals,numDirLights:a.directional.length,numPointLights:a.point.length,numSpotLights:a.spot.length,numRectAreaLights:a.rectArea.length,numHemiLights:a.hemi.length,numDirLightShadows:a.directionalShadowMap.length,numPointLightShadows:a.pointShadowMap.length,numSpotLightShadows:a.spotShadowMap.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:r.dithering,shadowMapEnabled:t.shadowMap.enabled&&g.length>0,shadowMapType:t.shadowMap.type,toneMapping:r.toneMapped?t.toneMapping:0,physicallyCorrectLights:t.physicallyCorrectLights,premultipliedAlpha:r.premultipliedAlpha,alphaTest:r.alphaTest,doubleSided:2===r.side,flipSided:1===r.side,depthPacking:void 0!==r.depthPacking&&r.depthPacking,index0AttributeName:r.index0AttributeName,extensionDerivatives:r.extensions&&r.extensions.derivatives,extensionFragDepth:r.extensions&&r.extensions.fragDepth,extensionDrawBuffers:r.extensions&&r.extensions.drawBuffers,extensionShaderTextureLOD:r.extensions&&r.extensions.shaderTextureLOD,rendererExtensionFragDepth:o||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:o||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:o||n.has("EXT_shader_texture_lod"),customProgramCacheKey:r.customProgramCacheKey()}},getProgramCacheKey:function(e){const n=[];if(e.shaderID?n.push(e.shaderID):(n.push(e.fragmentShader),n.push(e.vertexShader)),void 0!==e.defines)for(const t in e.defines)n.push(t),n.push(e.defines[t]);if(!1===e.isRawShaderMaterial){for(let t=0;t<g.length;t++)n.push(e[g[t]]);n.push(t.outputEncoding),n.push(t.gammaFactor)}return n.push(e.customProgramCacheKey),n.join()},getUniforms:function(t){const e=f[t.type];let n;if(e){const t=di[e];n=Zn.clone(t.uniforms)}else n=t.uniforms;return n},acquireProgram:function(e,n){let i;for(let t=0,e=a.length;t<e;t++){const e=a[t];if(e.cacheKey===n){i=e,++i.usedTimes;break}}return void 0===i&&(i=new Jr(t,n,e,r),a.push(i)),i},releaseProgram:function(t){if(0==--t.usedTimes){const e=a.indexOf(t);a[e]=a[a.length-1],a.pop(),t.destroy()}},programs:a}}function Kr(){let t=new WeakMap;return{get:function(e){let n=t.get(e);return void 0===n&&(n={},t.set(e,n)),n},remove:function(e){t.delete(e)},update:function(e,n,i){t.get(e)[n]=i},dispose:function(){t=new WeakMap}}}function $r(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program!==e.program?t.program.id-e.program.id:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function ts(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function es(t){const e=[];let n=0;const i=[],r=[],s={id:-1};function a(i,r,a,o,l,c){let h=e[n];const u=t.get(a);return void 0===h?(h={id:i.id,object:i,geometry:r,material:a,program:u.program||s,groupOrder:o,renderOrder:i.renderOrder,z:l,group:c},e[n]=h):(h.id=i.id,h.object=i,h.geometry=r,h.material=a,h.program=u.program||s,h.groupOrder=o,h.renderOrder=i.renderOrder,h.z=l,h.group=c),n++,h}return{opaque:i,transparent:r,init:function(){n=0,i.length=0,r.length=0},push:function(t,e,n,s,o,l){const c=a(t,e,n,s,o,l);(!0===n.transparent?r:i).push(c)},unshift:function(t,e,n,s,o,l){const c=a(t,e,n,s,o,l);(!0===n.transparent?r:i).unshift(c)},finish:function(){for(let t=n,i=e.length;t<i;t++){const n=e[t];if(null===n.id)break;n.id=null,n.object=null,n.geometry=null,n.material=null,n.program=null,n.group=null}},sort:function(t,e){i.length>1&&i.sort(t||$r),r.length>1&&r.sort(e||ts)}}}function ns(t){let e=new WeakMap;return{get:function(n,i){let r;return!1===e.has(n)?(r=new es(t),e.set(n,[r])):i>=e.get(n).length?(r=new es(t),e.get(n).push(r)):r=e.get(n)[i],r},dispose:function(){e=new WeakMap}}}function is(){const t={};return{get:function(e){if(void 0!==t[e.id])return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Lt,color:new tn};break;case"SpotLight":n={position:new Lt,direction:new Lt,color:new tn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Lt,color:new tn,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Lt,skyColor:new tn,groundColor:new tn};break;case"RectAreaLight":n={color:new tn,position:new Lt,halfWidth:new Lt,halfHeight:new Lt}}return t[e.id]=n,n}}}let rs=0;function ss(t,e){return(e.castShadow?1:0)-(t.castShadow?1:0)}function as(t,e){const n=new is,i=function(){const t={};return{get:function(e){if(void 0!==t[e.id])return t[e.id];let n;switch(e.type){case"DirectionalLight":case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3}}return t[e.id]=n,n}}}(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let t=0;t<9;t++)r.probe.push(new Lt);const s=new Lt,a=new se,o=new se;return{setup:function(s){let a=0,o=0,l=0;for(let t=0;t<9;t++)r.probe[t].set(0,0,0);let c=0,h=0,u=0,d=0,p=0,m=0,f=0,g=0;s.sort(ss);for(let t=0,e=s.length;t<e;t++){const e=s[t],v=e.color,y=e.intensity,x=e.distance,_=e.shadow&&e.shadow.map?e.shadow.map.texture:null;if(e.isAmbientLight)a+=v.r*y,o+=v.g*y,l+=v.b*y;else if(e.isLightProbe)for(let t=0;t<9;t++)r.probe[t].addScaledVector(e.sh.coefficients[t],y);else if(e.isDirectionalLight){const t=n.get(e);if(t.color.copy(e.color).multiplyScalar(e.intensity),e.castShadow){const t=e.shadow,n=i.get(e);n.shadowBias=t.bias,n.shadowNormalBias=t.normalBias,n.shadowRadius=t.radius,n.shadowMapSize=t.mapSize,r.directionalShadow[c]=n,r.directionalShadowMap[c]=_,r.directionalShadowMatrix[c]=e.shadow.matrix,m++}r.directional[c]=t,c++}else if(e.isSpotLight){const t=n.get(e);if(t.position.setFromMatrixPosition(e.matrixWorld),t.color.copy(v).multiplyScalar(y),t.distance=x,t.coneCos=Math.cos(e.angle),t.penumbraCos=Math.cos(e.angle*(1-e.penumbra)),t.decay=e.decay,e.castShadow){const t=e.shadow,n=i.get(e);n.shadowBias=t.bias,n.shadowNormalBias=t.normalBias,n.shadowRadius=t.radius,n.shadowMapSize=t.mapSize,r.spotShadow[u]=n,r.spotShadowMap[u]=_,r.spotShadowMatrix[u]=e.shadow.matrix,g++}r.spot[u]=t,u++}else if(e.isRectAreaLight){const t=n.get(e);t.color.copy(v).multiplyScalar(y),t.halfWidth.set(.5*e.width,0,0),t.halfHeight.set(0,.5*e.height,0),r.rectArea[d]=t,d++}else if(e.isPointLight){const t=n.get(e);if(t.color.copy(e.color).multiplyScalar(e.intensity),t.distance=e.distance,t.decay=e.decay,e.castShadow){const t=e.shadow,n=i.get(e);n.shadowBias=t.bias,n.shadowNormalBias=t.normalBias,n.shadowRadius=t.radius,n.shadowMapSize=t.mapSize,n.shadowCameraNear=t.camera.near,n.shadowCameraFar=t.camera.far,r.pointShadow[h]=n,r.pointShadowMap[h]=_,r.pointShadowMatrix[h]=e.shadow.matrix,f++}r.point[h]=t,h++}else if(e.isHemisphereLight){const t=n.get(e);t.skyColor.copy(e.color).multiplyScalar(y),t.groundColor.copy(e.groundColor).multiplyScalar(y),r.hemi[p]=t,p++}}d>0&&(e.isWebGL2||!0===t.has("OES_texture_float_linear")?(r.rectAreaLTC1=ui.LTC_FLOAT_1,r.rectAreaLTC2=ui.LTC_FLOAT_2):!0===t.has("OES_texture_half_float_linear")?(r.rectAreaLTC1=ui.LTC_HALF_1,r.rectAreaLTC2=ui.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=l;const v=r.hash;v.directionalLength===c&&v.pointLength===h&&v.spotLength===u&&v.rectAreaLength===d&&v.hemiLength===p&&v.numDirectionalShadows===m&&v.numPointShadows===f&&v.numSpotShadows===g||(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=h,r.hemi.length=p,r.directionalShadow.length=m,r.directionalShadowMap.length=m,r.pointShadow.length=f,r.pointShadowMap.length=f,r.spotShadow.length=g,r.spotShadowMap.length=g,r.directionalShadowMatrix.length=m,r.pointShadowMatrix.length=f,r.spotShadowMatrix.length=g,v.directionalLength=c,v.pointLength=h,v.spotLength=u,v.rectAreaLength=d,v.hemiLength=p,v.numDirectionalShadows=m,v.numPointShadows=f,v.numSpotShadows=g,r.version=rs++)},setupView:function(t,e){let n=0,i=0,l=0,c=0,h=0;const u=e.matrixWorldInverse;for(let e=0,d=t.length;e<d;e++){const d=t[e];if(d.isDirectionalLight){const t=r.directional[n];t.direction.setFromMatrixPosition(d.matrixWorld),s.setFromMatrixPosition(d.target.matrixWorld),t.direction.sub(s),t.direction.transformDirection(u),n++}else if(d.isSpotLight){const t=r.spot[l];t.position.setFromMatrixPosition(d.matrixWorld),t.position.applyMatrix4(u),t.direction.setFromMatrixPosition(d.matrixWorld),s.setFromMatrixPosition(d.target.matrixWorld),t.direction.sub(s),t.direction.transformDirection(u),l++}else if(d.isRectAreaLight){const t=r.rectArea[c];t.position.setFromMatrixPosition(d.matrixWorld),t.position.applyMatrix4(u),o.identity(),a.copy(d.matrixWorld),a.premultiply(u),o.extractRotation(a),t.halfWidth.set(.5*d.width,0,0),t.halfHeight.set(0,.5*d.height,0),t.halfWidth.applyMatrix4(o),t.halfHeight.applyMatrix4(o),c++}else if(d.isPointLight){const t=r.point[i];t.position.setFromMatrixPosition(d.matrixWorld),t.position.applyMatrix4(u),i++}else if(d.isHemisphereLight){const t=r.hemi[h];t.direction.setFromMatrixPosition(d.matrixWorld),t.direction.transformDirection(u),t.direction.normalize(),h++}}},state:r}}function os(t,e){const n=new as(t,e),i=[],r=[];return{init:function(){i.length=0,r.length=0},state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:function(){n.setup(i)},setupLightsView:function(t){n.setupView(i,t)},pushLight:function(t){i.push(t)},pushShadow:function(t){r.push(t)}}}function ls(t,e){let n=new WeakMap;return{get:function(i,r=0){let s;return!1===n.has(i)?(s=new os(t,e),n.set(i,[s])):r>=n.get(i).length?(s=new os(t,e),n.get(i).push(s)):s=n.get(i)[r],s},dispose:function(){n=new WeakMap}}}class cs extends Xe{constructor(t){super(),this.type="MeshDepthMaterial",this.depthPacking=3200,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}cs.prototype.isMeshDepthMaterial=!0;class hs extends Xe{constructor(t){super(),this.type="MeshDistanceMaterial",this.referencePosition=new Lt,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}hs.prototype.isMeshDistanceMaterial=!0;function us(t,e,n){let i=new ai;const r=new vt,s=new vt,a=new St,o=[],l=[],c={},h=n.maxTextureSize,u={0:1,1:0,2:2},d=new Jn({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:"void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const f=new En;f.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Wn(f,d),y=this;function x(n,i){const r=e.update(v);d.uniforms.shadow_pass.value=n.map.texture,d.uniforms.resolution.value=n.mapSize,d.uniforms.radius.value=n.radius,t.setRenderTarget(n.mapPass),t.clear(),t.renderBufferDirect(i,null,r,d,v,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,t.setRenderTarget(n.map),t.clear(),t.renderBufferDirect(i,null,r,m,v,null)}function _(t,e,n){const i=t<<0|e<<1|n<<2;let r=o[i];return void 0===r&&(r=new cs({depthPacking:3201,morphTargets:t,skinning:e}),o[i]=r),r}function w(t,e,n){const i=t<<0|e<<1|n<<2;let r=l[i];return void 0===r&&(r=new hs({morphTargets:t,skinning:e}),l[i]=r),r}function b(e,n,i,r,s,a,o){let l=null,h=_,d=e.customDepthMaterial;if(!0===r.isPointLight&&(h=w,d=e.customDistanceMaterial),void 0===d){let t=!1;!0===i.morphTargets&&(t=n.morphAttributes&&n.morphAttributes.position&&n.morphAttributes.position.length>0);let r=!1;!0===e.isSkinnedMesh&&(!0===i.skinning?r=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",e));l=h(t,r,!0===e.isInstancedMesh)}else l=d;if(t.localClippingEnabled&&!0===i.clipShadows&&0!==i.clippingPlanes.length){const t=l.uuid,e=i.uuid;let n=c[t];void 0===n&&(n={},c[t]=n);let r=n[e];void 0===r&&(r=l.clone(),n[e]=r),l=r}return l.visible=i.visible,l.wireframe=i.wireframe,l.side=3===o?null!==i.shadowSide?i.shadowSide:i.side:null!==i.shadowSide?i.shadowSide:u[i.side],l.clipShadows=i.clipShadows,l.clippingPlanes=i.clippingPlanes,l.clipIntersection=i.clipIntersection,l.wireframeLinewidth=i.wireframeLinewidth,l.linewidth=i.linewidth,!0===r.isPointLight&&!0===l.isMeshDistanceMaterial&&(l.referencePosition.setFromMatrixPosition(r.matrixWorld),l.nearDistance=s,l.farDistance=a),l}function M(n,r,s,a,o){if(!1===n.visible)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&3===o)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,n.matrixWorld);const i=e.update(n),r=n.material;if(Array.isArray(r)){const e=i.groups;for(let l=0,c=e.length;l<c;l++){const c=e[l],h=r[c.materialIndex];if(h&&h.visible){const e=b(n,i,h,a,s.near,s.far,o);t.renderBufferDirect(s,null,i,e,n,c)}}}else if(r.visible){const e=b(n,i,r,a,s.near,s.far,o);t.renderBufferDirect(s,null,i,e,n,null)}}const l=n.children;for(let t=0,e=l.length;t<e;t++)M(l[t],r,s,a,o)}this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1,this.render=function(e,n,o){if(!1===y.enabled)return;if(!1===y.autoUpdate&&!1===y.needsUpdate)return;if(0===e.length)return;const l=t.getRenderTarget(),c=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),d=t.state;d.setBlending(0),d.buffers.color.setClear(1,1,1,1),d.buffers.depth.setTest(!0),d.setScissorTest(!1);for(let l=0,c=e.length;l<c;l++){const c=e[l],u=c.shadow;if(void 0===u){console.warn("THREE.WebGLShadowMap:",c,"has no shadow.");continue}if(!1===u.autoUpdate&&!1===u.needsUpdate)continue;r.copy(u.mapSize);const m=u.getFrameExtents();if(r.multiply(m),s.copy(u.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/m.x),r.x=s.x*m.x,u.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/m.y),r.y=s.y*m.y,u.mapSize.y=s.y)),null===u.map&&!u.isPointLightShadow&&3===this.type){const t={minFilter:g,magFilter:g,format:E};u.map=new Tt(r.x,r.y,t),u.map.texture.name=c.name+".shadowMap",u.mapPass=new Tt(r.x,r.y,t),u.camera.updateProjectionMatrix()}if(null===u.map){const t={minFilter:p,magFilter:p,format:E};u.map=new Tt(r.x,r.y,t),u.map.texture.name=c.name+".shadowMap",u.camera.updateProjectionMatrix()}t.setRenderTarget(u.map),t.clear();const f=u.getViewportCount();for(let t=0;t<f;t++){const e=u.getViewport(t);a.set(s.x*e.x,s.y*e.y,s.x*e.z,s.y*e.w),d.viewport(a),u.updateMatrices(c,t),i=u.getFrustum(),M(n,o,u.camera,c,this.type)}u.isPointLightShadow||3!==this.type||x(u,o),u.needsUpdate=!1}y.needsUpdate=!1,t.setRenderTarget(l,c,u)}}function ds(t,e,i){const r=i.isWebGL2;const s=new function(){let e=!1;const n=new St;let i=null;const r=new St(0,0,0,0);return{setMask:function(n){i===n||e||(t.colorMask(n,n,n,n),i=n)},setLocked:function(t){e=t},setClear:function(e,i,s,a,o){!0===o&&(e*=a,i*=a,s*=a),n.set(e,i,s,a),!1===r.equals(n)&&(t.clearColor(e,i,s,a),r.copy(n))},reset:function(){e=!1,i=null,r.set(-1,0,0,0)}}},a=new function(){let e=!1,n=null,i=null,r=null;return{setTest:function(t){t?z(2929):F(2929)},setMask:function(i){n===i||e||(t.depthMask(i),n=i)},setFunc:function(e){if(i!==e){if(e)switch(e){case 0:t.depthFunc(512);break;case 1:t.depthFunc(519);break;case 2:t.depthFunc(513);break;case 3:t.depthFunc(515);break;case 4:t.depthFunc(514);break;case 5:t.depthFunc(518);break;case 6:t.depthFunc(516);break;case 7:t.depthFunc(517);break;default:t.depthFunc(515)}else t.depthFunc(515);i=e}},setLocked:function(t){e=t},setClear:function(e){r!==e&&(t.clearDepth(e),r=e)},reset:function(){e=!1,n=null,i=null,r=null}}},o=new function(){let e=!1,n=null,i=null,r=null,s=null,a=null,o=null,l=null,c=null;return{setTest:function(t){e||(t?z(2960):F(2960))},setMask:function(i){n===i||e||(t.stencilMask(i),n=i)},setFunc:function(e,n,a){i===e&&r===n&&s===a||(t.stencilFunc(e,n,a),i=e,r=n,s=a)},setOp:function(e,n,i){a===e&&o===n&&l===i||(t.stencilOp(e,n,i),a=e,o=n,l=i)},setLocked:function(t){e=t},setClear:function(e){c!==e&&(t.clearStencil(e),c=e)},reset:function(){e=!1,n=null,i=null,r=null,s=null,a=null,o=null,l=null,c=null}}};let l={},c=null,h={},u=null,d=!1,p=null,m=null,f=null,g=null,v=null,y=null,x=null,_=!1,w=null,b=null,M=null,S=null,T=null;const E=t.getParameter(35661);let A=!1,L=0;const R=t.getParameter(7938);-1!==R.indexOf("WebGL")?(L=parseFloat(/^WebGL (\d)/.exec(R)[1]),A=L>=1):-1!==R.indexOf("OpenGL ES")&&(L=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),A=L>=2);let C=null,P={};const D=new St(0,0,t.canvas.width,t.canvas.height),I=new St(0,0,t.canvas.width,t.canvas.height);function N(e,n,i){const r=new Uint8Array(4),s=t.createTexture();t.bindTexture(e,s),t.texParameteri(e,10241,9728),t.texParameteri(e,10240,9728);for(let e=0;e<i;e++)t.texImage2D(n+e,0,6408,1,1,0,6408,5121,r);return s}const B={};function z(e){!0!==l[e]&&(t.enable(e),l[e]=!0)}function F(e){!1!==l[e]&&(t.disable(e),l[e]=!1)}B[3553]=N(3553,3553,1),B[34067]=N(34067,34069,6),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),z(2929),a.setFunc(3),U(!1),k(1),z(2884),G(0);const O={[n]:32774,101:32778,102:32779};if(r)O[103]=32775,O[104]=32776;else{const t=e.get("EXT_blend_minmax");null!==t&&(O[103]=t.MIN_EXT,O[104]=t.MAX_EXT)}const H={200:0,201:1,202:768,204:770,210:776,208:774,206:772,203:769,205:771,209:775,207:773};function G(e,i,r,s,a,o,l,c){if(0!==e){if(!1===d&&(z(3042),d=!0),5===e)a=a||i,o=o||r,l=l||s,i===m&&a===v||(t.blendEquationSeparate(O[i],O[a]),m=i,v=a),r===f&&s===g&&o===y&&l===x||(t.blendFuncSeparate(H[r],H[s],H[o],H[l]),f=r,g=s,y=o,x=l),p=e,_=null;else if(e!==p||c!==_){if(m===n&&v===n||(t.blendEquation(32774),m=n,v=n),c)switch(e){case 1:t.blendFuncSeparate(1,771,1,771);break;case 2:t.blendFunc(1,1);break;case 3:t.blendFuncSeparate(0,0,769,771);break;case 4:t.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",e)}else switch(e){case 1:t.blendFuncSeparate(770,771,1,771);break;case 2:t.blendFunc(770,1);break;case 3:t.blendFunc(0,769);break;case 4:t.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",e)}f=null,g=null,y=null,x=null,p=e,_=c}}else!0===d&&(F(3042),d=!1)}function U(e){w!==e&&(e?t.frontFace(2304):t.frontFace(2305),w=e)}function k(e){0!==e?(z(2884),e!==b&&(1===e?t.cullFace(1029):2===e?t.cullFace(1028):t.cullFace(1032))):F(2884),b=e}function V(e,n,i){e?(z(32823),S===n&&T===i||(t.polygonOffset(n,i),S=n,T=i)):F(32823)}function W(e){void 0===e&&(e=33984+E-1),C!==e&&(t.activeTexture(e),C=e)}return{buffers:{color:s,depth:a,stencil:o},enable:z,disable:F,bindFramebuffer:function(e,n){null===n&&null!==c&&(n=c),h[e]!==n&&(t.bindFramebuffer(e,n),h[e]=n,r&&(36009===e&&(h[36160]=n),36160===e&&(h[36009]=n)))},bindXRFramebuffer:function(e){e!==c&&(t.bindFramebuffer(36160,e),c=e)},useProgram:function(e){return u!==e&&(t.useProgram(e),u=e,!0)},setBlending:G,setMaterial:function(t,e){2===t.side?F(2884):z(2884);let n=1===t.side;e&&(n=!n),U(n),1===t.blending&&!1===t.transparent?G(0):G(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.premultipliedAlpha),a.setFunc(t.depthFunc),a.setTest(t.depthTest),a.setMask(t.depthWrite),s.setMask(t.colorWrite);const i=t.stencilWrite;o.setTest(i),i&&(o.setMask(t.stencilWriteMask),o.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),o.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),V(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),!0===t.alphaToCoverage?z(32926):F(32926)},setFlipSided:U,setCullFace:k,setLineWidth:function(e){e!==M&&(A&&t.lineWidth(e),M=e)},setPolygonOffset:V,setScissorTest:function(t){t?z(3089):F(3089)},activeTexture:W,bindTexture:function(e,n){null===C&&W();let i=P[C];void 0===i&&(i={type:void 0,texture:void 0},P[C]=i),i.type===e&&i.texture===n||(t.bindTexture(e,n||B[e]),i.type=e,i.texture=n)},unbindTexture:function(){const e=P[C];void 0!==e&&void 0!==e.type&&(t.bindTexture(e.type,null),e.type=void 0,e.texture=void 0)},compressedTexImage2D:function(){try{t.compressedTexImage2D.apply(t,arguments)}catch(t){console.error("THREE.WebGLState:",t)}},texImage2D:function(){try{t.texImage2D.apply(t,arguments)}catch(t){console.error("THREE.WebGLState:",t)}},texImage3D:function(){try{t.texImage3D.apply(t,arguments)}catch(t){console.error("THREE.WebGLState:",t)}},scissor:function(e){!1===D.equals(e)&&(t.scissor(e.x,e.y,e.z,e.w),D.copy(e))},viewport:function(e){!1===I.equals(e)&&(t.viewport(e.x,e.y,e.z,e.w),I.copy(e))},reset:function(){t.disable(3042),t.disable(2884),t.disable(2929),t.disable(32823),t.disable(3089),t.disable(2960),t.disable(32926),t.blendEquation(32774),t.blendFunc(1,0),t.blendFuncSeparate(1,0,1,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(513),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(519,0,4294967295),t.stencilOp(7680,7680,7680),t.clearStencil(0),t.cullFace(1029),t.frontFace(2305),t.polygonOffset(0,0),t.activeTexture(33984),t.bindFramebuffer(36160,null),!0===r&&(t.bindFramebuffer(36009,null),t.bindFramebuffer(36008,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),l={},C=null,P={},c=null,h={},u=null,d=!1,p=null,m=null,f=null,g=null,v=null,y=null,x=null,_=!1,w=null,b=null,M=null,S=null,T=null,D.set(0,0,t.canvas.width,t.canvas.height),I.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}}}function ps(t,e,n,i,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,x=r.maxTextureSize,R=r.maxSamples,C=new WeakMap;let P,D=!1;try{D="undefined"!=typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}catch(t){}function I(t,e){return D?new OffscreenCanvas(t,e):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function N(t,e,n,i){let r=1;if((t.width>i||t.height>i)&&(r=i/Math.max(t.width,t.height)),r<1||!0===e){if("undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap){const i=e?ft:Math.floor,s=i(r*t.width),a=i(r*t.height);void 0===P&&(P=I(s,a));const o=n?I(s,a):P;o.width=s,o.height=a;return o.getContext("2d").drawImage(t,0,0,s,a),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+s+"x"+a+")."),o}return"data"in t&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+")."),t}return t}function B(t){return pt(t.width)&&pt(t.height)}function z(t,e){return t.generateMipmaps&&e&&t.minFilter!==p&&t.minFilter!==g}function F(e,n,r,s){t.generateMipmap(e);i.get(n).__maxMipLevel=Math.log2(Math.max(r,s))}function O(n,i,r){if(!1===o)return i;if(null!==n){if(void 0!==t[n])return t[n];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+n+"'")}let s=i;return 6403===i&&(5126===r&&(s=33326),5131===r&&(s=33325),5121===r&&(s=33321)),6407===i&&(5126===r&&(s=34837),5131===r&&(s=34843),5121===r&&(s=32849)),6408===i&&(5126===r&&(s=34836),5131===r&&(s=34842),5121===r&&(s=32856)),33325!==s&&33326!==s&&34842!==s&&34836!==s||e.get("EXT_color_buffer_float"),s}function H(t){return t===p||t===m||t===f?9728:9729}function G(e){const n=e.target;n.removeEventListener("dispose",G),function(e){const n=i.get(e);if(void 0===n.__webglInit)return;t.deleteTexture(n.__webglTexture),i.remove(e)}(n),n.isVideoTexture&&C.delete(n),a.memory.textures--}function U(e){const n=e.target;n.removeEventListener("dispose",U),function(e){const n=e.texture,r=i.get(e),s=i.get(n);if(!e)return;void 0!==s.__webglTexture&&t.deleteTexture(s.__webglTexture);e.depthTexture&&e.depthTexture.dispose();if(e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++)t.deleteFramebuffer(r.__webglFramebuffer[e]),r.__webglDepthbuffer&&t.deleteRenderbuffer(r.__webglDepthbuffer[e]);else t.deleteFramebuffer(r.__webglFramebuffer),r.__webglDepthbuffer&&t.deleteRenderbuffer(r.__webglDepthbuffer),r.__webglMultisampledFramebuffer&&t.deleteFramebuffer(r.__webglMultisampledFramebuffer),r.__webglColorRenderbuffer&&t.deleteRenderbuffer(r.__webglColorRenderbuffer),r.__webglDepthRenderbuffer&&t.deleteRenderbuffer(r.__webglDepthRenderbuffer);i.remove(n),i.remove(e)}(n),a.memory.textures--}let k=0;function V(t,e){const r=i.get(t);if(t.isVideoTexture&&function(t){const e=a.render.frame;C.get(t)!==e&&(C.set(t,e),t.update())}(t),t.version>0&&r.__version!==t.version){const n=t.image;if(void 0===n)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else{if(!1!==n.complete)return void Z(r,t,e);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}n.activeTexture(33984+e),n.bindTexture(3553,r.__webglTexture)}function W(e,r){const a=i.get(e);e.version>0&&a.__version!==e.version?function(e,i,r){if(6!==i.image.length)return;Y(e,i),n.activeTexture(33984+r),n.bindTexture(34067,e.__webglTexture),t.pixelStorei(37440,i.flipY),t.pixelStorei(37441,i.premultiplyAlpha),t.pixelStorei(3317,i.unpackAlignment),t.pixelStorei(37443,0);const a=i&&(i.isCompressedTexture||i.image[0].isCompressedTexture),l=i.image[0]&&i.image[0].isDataTexture,h=[];for(let t=0;t<6;t++)h[t]=a||l?l?i.image[t].image:i.image[t]:N(i.image[t],!1,!0,c);const u=h[0],d=B(u)||o,p=s.convert(i.format),m=s.convert(i.type),f=O(i.internalFormat,p,m);let g;if(X(34067,i,d),a){for(let t=0;t<6;t++){g=h[t].mipmaps;for(let e=0;e<g.length;e++){const r=g[e];i.format!==E&&i.format!==T?null!==p?n.compressedTexImage2D(34069+t,e,f,r.width,r.height,0,r.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):n.texImage2D(34069+t,e,f,r.width,r.height,0,p,m,r.data)}}e.__maxMipLevel=g.length-1}else{g=i.mipmaps;for(let t=0;t<6;t++)if(l){n.texImage2D(34069+t,0,f,h[t].width,h[t].height,0,p,m,h[t].data);for(let e=0;e<g.length;e++){const i=g[e].image[t].image;n.texImage2D(34069+t,e+1,f,i.width,i.height,0,p,m,i.data)}}else{n.texImage2D(34069+t,0,f,p,m,h[t]);for(let e=0;e<g.length;e++){const i=g[e];n.texImage2D(34069+t,e+1,f,p,m,i.image[t])}}e.__maxMipLevel=g.length}z(i,d)&&F(34067,i,u.width,u.height);e.__version=i.version,i.onUpdate&&i.onUpdate(i)}(a,e,r):(n.activeTexture(33984+r),n.bindTexture(34067,a.__webglTexture))}const j={[h]:10497,[u]:33071,[d]:33648},q={[p]:9728,[m]:9984,[f]:9986,[g]:9729,[v]:9985,[y]:9987};function X(n,s,a){if(a?(t.texParameteri(n,10242,j[s.wrapS]),t.texParameteri(n,10243,j[s.wrapT]),32879!==n&&35866!==n||t.texParameteri(n,32882,j[s.wrapR]),t.texParameteri(n,10240,q[s.magFilter]),t.texParameteri(n,10241,q[s.minFilter])):(t.texParameteri(n,10242,33071),t.texParameteri(n,10243,33071),32879!==n&&35866!==n||t.texParameteri(n,32882,33071),s.wrapS===u&&s.wrapT===u||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(n,10240,H(s.magFilter)),t.texParameteri(n,10241,H(s.minFilter)),s.minFilter!==p&&s.minFilter!==g&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),!0===e.has("EXT_texture_filter_anisotropic")){const a=e.get("EXT_texture_filter_anisotropic");if(s.type===b&&!1===e.has("OES_texture_float_linear"))return;if(!1===o&&s.type===M&&!1===e.has("OES_texture_half_float_linear"))return;(s.anisotropy>1||i.get(s).__currentAnisotropy)&&(t.texParameterf(n,a.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,r.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy)}}function Y(e,n){void 0===e.__webglInit&&(e.__webglInit=!0,n.addEventListener("dispose",G),e.__webglTexture=t.createTexture(),a.memory.textures++)}function Z(e,i,r){let a=3553;i.isDataTexture2DArray&&(a=35866),i.isDataTexture3D&&(a=32879),Y(e,i),n.activeTexture(33984+r),n.bindTexture(a,e.__webglTexture),t.pixelStorei(37440,i.flipY),t.pixelStorei(37441,i.premultiplyAlpha),t.pixelStorei(3317,i.unpackAlignment),t.pixelStorei(37443,0);const l=function(t){return!o&&(t.wrapS!==u||t.wrapT!==u||t.minFilter!==p&&t.minFilter!==g)}(i)&&!1===B(i.image),c=N(i.image,l,!1,x),h=B(c)||o,d=s.convert(i.format);let m,f=s.convert(i.type),v=O(i.internalFormat,d,f);X(a,i,h);const y=i.mipmaps;if(i.isDepthTexture)v=6402,o?v=i.type===b?36012:i.type===w?33190:i.type===S?35056:33189:i.type===b&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),i.format===A&&6402===v&&i.type!==_&&i.type!==w&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),i.type=_,f=s.convert(i.type)),i.format===L&&6402===v&&(v=34041,i.type!==S&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),i.type=S,f=s.convert(i.type))),n.texImage2D(3553,0,v,c.width,c.height,0,d,f,null);else if(i.isDataTexture)if(y.length>0&&h){for(let t=0,e=y.length;t<e;t++)m=y[t],n.texImage2D(3553,t,v,m.width,m.height,0,d,f,m.data);i.generateMipmaps=!1,e.__maxMipLevel=y.length-1}else n.texImage2D(3553,0,v,c.width,c.height,0,d,f,c.data),e.__maxMipLevel=0;else if(i.isCompressedTexture){for(let t=0,e=y.length;t<e;t++)m=y[t],i.format!==E&&i.format!==T?null!==d?n.compressedTexImage2D(3553,t,v,m.width,m.height,0,m.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):n.texImage2D(3553,t,v,m.width,m.height,0,d,f,m.data);e.__maxMipLevel=y.length-1}else if(i.isDataTexture2DArray)n.texImage3D(35866,0,v,c.width,c.height,c.depth,0,d,f,c.data),e.__maxMipLevel=0;else if(i.isDataTexture3D)n.texImage3D(32879,0,v,c.width,c.height,c.depth,0,d,f,c.data),e.__maxMipLevel=0;else if(y.length>0&&h){for(let t=0,e=y.length;t<e;t++)m=y[t],n.texImage2D(3553,t,v,d,f,m);i.generateMipmaps=!1,e.__maxMipLevel=y.length-1}else n.texImage2D(3553,0,v,d,f,c),e.__maxMipLevel=0;z(i,h)&&F(a,i,c.width,c.height),e.__version=i.version,i.onUpdate&&i.onUpdate(i)}function J(e,r,a,o){const l=r.texture,c=s.convert(l.format),h=s.convert(l.type),u=O(l.internalFormat,c,h);32879===o||35866===o?n.texImage3D(o,0,u,r.width,r.height,r.depth,0,c,h,null):n.texImage2D(o,0,u,r.width,r.height,0,c,h,null),n.bindFramebuffer(36160,e),t.framebufferTexture2D(36160,a,o,i.get(l).__webglTexture,0),n.bindFramebuffer(36160,null)}function Q(e,n,i){if(t.bindRenderbuffer(36161,e),n.depthBuffer&&!n.stencilBuffer){let r=33189;if(i){const e=n.depthTexture;e&&e.isDepthTexture&&(e.type===b?r=36012:e.type===w&&(r=33190));const i=$(n);t.renderbufferStorageMultisample(36161,i,r,n.width,n.height)}else t.renderbufferStorage(36161,r,n.width,n.height);t.framebufferRenderbuffer(36160,36096,36161,e)}else if(n.depthBuffer&&n.stencilBuffer){if(i){const e=$(n);t.renderbufferStorageMultisample(36161,e,35056,n.width,n.height)}else t.renderbufferStorage(36161,34041,n.width,n.height);t.framebufferRenderbuffer(36160,33306,36161,e)}else{const e=n.texture,r=s.convert(e.format),a=s.convert(e.type),o=O(e.internalFormat,r,a);if(i){const e=$(n);t.renderbufferStorageMultisample(36161,e,o,n.width,n.height)}else t.renderbufferStorage(36161,o,n.width,n.height)}t.bindRenderbuffer(36161,null)}function K(e){const r=i.get(e),s=!0===e.isWebGLCubeRenderTarget;if(e.depthTexture){if(s)throw new Error("target.depthTexture not supported in Cube render targets");!function(e,r){if(r&&r.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(36160,e),!r.depthTexture||!r.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");i.get(r.depthTexture).__webglTexture&&r.depthTexture.image.width===r.width&&r.depthTexture.image.height===r.height||(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),V(r.depthTexture,0);const s=i.get(r.depthTexture).__webglTexture;if(r.depthTexture.format===A)t.framebufferTexture2D(36160,36096,3553,s,0);else{if(r.depthTexture.format!==L)throw new Error("Unknown depthTexture format");t.framebufferTexture2D(36160,33306,3553,s,0)}}(r.__webglFramebuffer,e)}else if(s){r.__webglDepthbuffer=[];for(let i=0;i<6;i++)n.bindFramebuffer(36160,r.__webglFramebuffer[i]),r.__webglDepthbuffer[i]=t.createRenderbuffer(),Q(r.__webglDepthbuffer[i],e,!1)}else n.bindFramebuffer(36160,r.__webglFramebuffer),r.__webglDepthbuffer=t.createRenderbuffer(),Q(r.__webglDepthbuffer,e,!1);n.bindFramebuffer(36160,null)}function $(t){return o&&t.isWebGLMultisampleRenderTarget?Math.min(R,t.samples):0}let tt=!1,et=!1;this.allocateTextureUnit=function(){const t=k;return t>=l&&console.warn("THREE.WebGLTextures: Trying to use "+t+" texture units while this GPU supports only "+l),k+=1,t},this.resetTextureUnits=function(){k=0},this.setTexture2D=V,this.setTexture2DArray=function(t,e){const r=i.get(t);t.version>0&&r.__version!==t.version?Z(r,t,e):(n.activeTexture(33984+e),n.bindTexture(35866,r.__webglTexture))},this.setTexture3D=function(t,e){const r=i.get(t);t.version>0&&r.__version!==t.version?Z(r,t,e):(n.activeTexture(33984+e),n.bindTexture(32879,r.__webglTexture))},this.setTextureCube=W,this.setupRenderTarget=function(e){const r=e.texture,l=i.get(e),c=i.get(r);e.addEventListener("dispose",U),c.__webglTexture=t.createTexture(),c.__version=r.version,a.memory.textures++;const h=!0===e.isWebGLCubeRenderTarget,u=!0===e.isWebGLMultisampleRenderTarget,d=r.isDataTexture3D||r.isDataTexture2DArray,p=B(e)||o;if(!o||r.format!==T||r.type!==b&&r.type!==M||(r.format=E,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),h){l.__webglFramebuffer=[];for(let e=0;e<6;e++)l.__webglFramebuffer[e]=t.createFramebuffer()}else if(l.__webglFramebuffer=t.createFramebuffer(),u)if(o){l.__webglMultisampledFramebuffer=t.createFramebuffer(),l.__webglColorRenderbuffer=t.createRenderbuffer(),t.bindRenderbuffer(36161,l.__webglColorRenderbuffer);const i=s.convert(r.format),a=s.convert(r.type),o=O(r.internalFormat,i,a),c=$(e);t.renderbufferStorageMultisample(36161,c,o,e.width,e.height),n.bindFramebuffer(36160,l.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(36160,36064,36161,l.__webglColorRenderbuffer),t.bindRenderbuffer(36161,null),e.depthBuffer&&(l.__webglDepthRenderbuffer=t.createRenderbuffer(),Q(l.__webglDepthRenderbuffer,e,!0)),n.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(h){n.bindTexture(34067,c.__webglTexture),X(34067,r,p);for(let t=0;t<6;t++)J(l.__webglFramebuffer[t],e,36064,34069+t);z(r,p)&&F(34067,r,e.width,e.height),n.bindTexture(34067,null)}else{let t=3553;if(d)if(o){t=r.isDataTexture3D?32879:35866}else console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.");n.bindTexture(t,c.__webglTexture),X(t,r,p),J(l.__webglFramebuffer,e,36064,t),z(r,p)&&F(3553,r,e.width,e.height),n.bindTexture(3553,null)}e.depthBuffer&&K(e)},this.updateRenderTargetMipmap=function(t){const e=t.texture;if(z(e,B(t)||o)){const r=t.isWebGLCubeRenderTarget?34067:3553,s=i.get(e).__webglTexture;n.bindTexture(r,s),F(r,e,t.width,t.height),n.bindTexture(r,null)}},this.updateMultisampleRenderTarget=function(e){if(e.isWebGLMultisampleRenderTarget)if(o){const r=e.width,s=e.height;let a=16384;e.depthBuffer&&(a|=256),e.stencilBuffer&&(a|=1024);const o=i.get(e);n.bindFramebuffer(36008,o.__webglMultisampledFramebuffer),n.bindFramebuffer(36009,o.__webglFramebuffer),t.blitFramebuffer(0,0,r,s,0,0,r,s,a,9728),n.bindFramebuffer(36008,null),n.bindFramebuffer(36009,o.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")},this.safeSetTexture2D=function(t,e){t&&t.isWebGLRenderTarget&&(!1===tt&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),tt=!0),t=t.texture),V(t,e)},this.safeSetTextureCube=function(t,e){t&&t.isWebGLCubeRenderTarget&&(!1===et&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),et=!0),t=t.texture),W(t,e)}}function ms(t,e,n){const i=n.isWebGL2;return{convert:function(t){let n;if(t===x)return 5121;if(1017===t)return 32819;if(1018===t)return 32820;if(1019===t)return 33635;if(1010===t)return 5120;if(1011===t)return 5122;if(t===_)return 5123;if(1013===t)return 5124;if(t===w)return 5125;if(t===b)return 5126;if(t===M)return i?5131:(n=e.get("OES_texture_half_float"),null!==n?n.HALF_FLOAT_OES:null);if(1021===t)return 6406;if(t===T)return 6407;if(t===E)return 6408;if(1024===t)return 6409;if(1025===t)return 6410;if(t===A)return 6402;if(t===L)return 34041;if(1028===t)return 6403;if(1029===t)return 36244;if(1030===t)return 33319;if(1031===t)return 33320;if(1032===t)return 36248;if(1033===t)return 36249;if(t===R||t===C||t===P||t===D){if(n=e.get("WEBGL_compressed_texture_s3tc"),null===n)return null;if(t===R)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===C)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===P)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===D)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===I||t===N||t===B||t===z){if(n=e.get("WEBGL_compressed_texture_pvrtc"),null===n)return null;if(t===I)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===N)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===B)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===z)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(36196===t)return n=e.get("WEBGL_compressed_texture_etc1"),null!==n?n.COMPRESSED_RGB_ETC1_WEBGL:null;if((t===F||t===O)&&(n=e.get("WEBGL_compressed_texture_etc"),null!==n)){if(t===F)return n.COMPRESSED_RGB8_ETC2;if(t===O)return n.COMPRESSED_RGBA8_ETC2_EAC}return 37808===t||37809===t||37810===t||37811===t||37812===t||37813===t||37814===t||37815===t||37816===t||37817===t||37818===t||37819===t||37820===t||37821===t||37840===t||37841===t||37842===t||37843===t||37844===t||37845===t||37846===t||37847===t||37848===t||37849===t||37850===t||37851===t||37852===t||37853===t?(n=e.get("WEBGL_compressed_texture_astc"),null!==n?t:null):36492===t?(n=e.get("EXT_texture_compression_bptc"),null!==n?t:null):t===S?i?34042:(n=e.get("WEBGL_depth_texture"),null!==n?n.UNSIGNED_INT_24_8_WEBGL:null):void 0}}}class fs extends Kn{constructor(t=[]){super(),this.cameras=t}}fs.prototype.isArrayCamera=!0;class gs extends Ce{constructor(){super(),this.type="Group"}}gs.prototype.isGroup=!0;const vs={type:"move"};class ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return null===this._hand&&(this._hand=new gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return null===this._targetRay&&(this._targetRay=new gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Lt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Lt),this._targetRay}getGripSpace(){return null===this._grip&&(this._grip=new gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Lt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Lt),this._grip}dispatchEvent(t){return null!==this._targetRay&&this._targetRay.dispatchEvent(t),null!==this._grip&&this._grip.dispatchEvent(t),null!==this._hand&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),null!==this._targetRay&&(this._targetRay.visible=!1),null!==this._grip&&(this._grip.visible=!1),null!==this._hand&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(t&&"visible-blurred"!==e.session.visibilityState)if(null!==a&&(i=e.getPose(t.targetRaySpace,n),null!==i&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vs))),l&&t.hand){s=!0;for(const i of t.hand.values()){const t=e.getJointPose(i,n);if(void 0===l.joints[i.jointName]){const t=new gs;t.matrixAutoUpdate=!1,t.visible=!1,l.joints[i.jointName]=t,l.add(t)}const r=l.joints[i.jointName];null!==t&&(r.matrix.fromArray(t.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.jointRadius=t.radius),r.visible=null!==t}const i=l.joints["index-finger-tip"],r=l.joints["thumb-tip"],a=i.position.distanceTo(r.position),o=.02,c=.005;l.inputState.pinching&&a>o+c?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&a<=o-c&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else null!==o&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),null!==r&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));return null!==a&&(a.visible=null!==i),null!==o&&(o.visible=null!==r),null!==l&&(l.visible=null!==s),this}}class xs extends rt{constructor(t,e){super();const n=this,i=t.state;let r=null,s=1,a=null,o="local-floor",l=null;const c=[],h=new Map,u=new Kn;u.layers.enable(1),u.viewport=new St;const d=new Kn;d.layers.enable(2),d.viewport=new St;const p=[u,d],m=new fs;m.layers.enable(1),m.layers.enable(2);let f=null,g=null;function v(t){const e=h.get(t.inputSource);e&&e.dispatchEvent({type:t.type,data:t.inputSource})}function y(){h.forEach((function(t,e){t.disconnect(e)})),h.clear(),f=null,g=null,i.bindXRFramebuffer(null),t.setRenderTarget(t.getRenderTarget()),S.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}function x(t){const e=r.inputSources;for(let t=0;t<c.length;t++)h.set(e[t],c[t]);for(let e=0;e<t.removed.length;e++){const n=t.removed[e],i=h.get(n);i&&(i.dispatchEvent({type:"disconnected",data:n}),h.delete(n))}for(let e=0;e<t.added.length;e++){const n=t.added[e],i=h.get(n);i&&i.dispatchEvent({type:"connected",data:n})}}this.enabled=!1,this.isPresenting=!1,this.getController=function(t){let e=c[t];return void 0===e&&(e=new ys,c[t]=e),e.getTargetRaySpace()},this.getControllerGrip=function(t){let e=c[t];return void 0===e&&(e=new ys,c[t]=e),e.getGripSpace()},this.getHand=function(t){let e=c[t];return void 0===e&&(e=new ys,c[t]=e),e.getHandSpace()},this.setFramebufferScaleFactor=function(t){s=t,!0===n.isPresenting&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(t){o=t,!0===n.isPresenting&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a},this.getSession=function(){return r},this.setSession=async function(t){if(r=t,null!==r){r.addEventListener("select",v),r.addEventListener("selectstart",v),r.addEventListener("selectend",v),r.addEventListener("squeeze",v),r.addEventListener("squeezestart",v),r.addEventListener("squeezeend",v),r.addEventListener("end",y),r.addEventListener("inputsourceschange",x);const t=e.getContextAttributes();!0!==t.xrCompatible&&await e.makeXRCompatible();const i={antialias:t.antialias,alpha:t.alpha,depth:t.depth,stencil:t.stencil,framebufferScaleFactor:s},l=new XRWebGLLayer(r,e,i);r.updateRenderState({baseLayer:l}),a=await r.requestReferenceSpace(o),S.setContext(r),S.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};const _=new Lt,w=new Lt;function b(t,e){null===e?t.matrixWorld.copy(t.matrix):t.matrixWorld.multiplyMatrices(e.matrixWorld,t.matrix),t.matrixWorldInverse.copy(t.matrixWorld).invert()}this.getCamera=function(t){m.near=d.near=u.near=t.near,m.far=d.far=u.far=t.far,f===m.near&&g===m.far||(r.updateRenderState({depthNear:m.near,depthFar:m.far}),f=m.near,g=m.far);const e=t.parent,n=m.cameras;b(m,e);for(let t=0;t<n.length;t++)b(n[t],e);t.matrixWorld.copy(m.matrixWorld),t.matrix.copy(m.matrix),t.matrix.decompose(t.position,t.quaternion,t.scale);const i=t.children;for(let t=0,e=i.length;t<e;t++)i[t].updateMatrixWorld(!0);return 2===n.length?function(t,e,n){_.setFromMatrixPosition(e.matrixWorld),w.setFromMatrixPosition(n.matrixWorld);const i=_.distanceTo(w),r=e.projectionMatrix.elements,s=n.projectionMatrix.elements,a=r[14]/(r[10]-1),o=r[14]/(r[10]+1),l=(r[9]+1)/r[5],c=(r[9]-1)/r[5],h=(r[8]-1)/r[0],u=(s[8]+1)/s[0],d=a*h,p=a*u,m=i/(-h+u),f=m*-h;e.matrixWorld.decompose(t.position,t.quaternion,t.scale),t.translateX(f),t.translateZ(m),t.matrixWorld.compose(t.position,t.quaternion,t.scale),t.matrixWorldInverse.copy(t.matrixWorld).invert();const g=a+m,v=o+m,y=d-f,x=p+(i-f),b=l*o/v*g,M=c*o/v*g;t.projectionMatrix.makePerspective(y,x,b,M,g,v)}(m,u,d):m.projectionMatrix.copy(u.projectionMatrix),m};let M=null;const S=new oi;S.setAnimationLoop((function(t,e){if(l=e.getViewerPose(a),null!==l){const t=l.views,e=r.renderState.baseLayer;i.bindXRFramebuffer(e.framebuffer);let n=!1;t.length!==m.cameras.length&&(m.cameras.length=0,n=!0);for(let i=0;i<t.length;i++){const r=t[i],s=e.getViewport(r),a=p[i];a.matrix.fromArray(r.transform.matrix),a.projectionMatrix.fromArray(r.projectionMatrix),a.viewport.set(s.x,s.y,s.width,s.height),0===i&&m.matrix.copy(a.matrix),!0===n&&m.cameras.push(a)}}const n=r.inputSources;for(let t=0;t<c.length;t++){const i=c[t],r=n[t];i.update(r,e,a)}M&&M(t,e)})),this.setAnimationLoop=function(t){M=t},this.dispose=function(){}}}function _s(t){function e(e,n){e.opacity.value=n.opacity,n.color&&e.diffuse.value.copy(n.color),n.emissive&&e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),n.map&&(e.map.value=n.map),n.alphaMap&&(e.alphaMap.value=n.alphaMap),n.specularMap&&(e.specularMap.value=n.specularMap);const i=t.get(n).envMap;if(i){e.envMap.value=i,e.flipEnvMap.value=i.isCubeTexture&&i._needsFlipEnvMap?-1:1,e.reflectivity.value=n.reflectivity,e.refractionRatio.value=n.refractionRatio;const r=t.get(i).__maxMipLevel;void 0!==r&&(e.maxMipLevel.value=r)}let r,s;n.lightMap&&(e.lightMap.value=n.lightMap,e.lightMapIntensity.value=n.lightMapIntensity),n.aoMap&&(e.aoMap.value=n.aoMap,e.aoMapIntensity.value=n.aoMapIntensity),n.map?r=n.map:n.specularMap?r=n.specularMap:n.displacementMap?r=n.displacementMap:n.normalMap?r=n.normalMap:n.bumpMap?r=n.bumpMap:n.roughnessMap?r=n.roughnessMap:n.metalnessMap?r=n.metalnessMap:n.alphaMap?r=n.alphaMap:n.emissiveMap?r=n.emissiveMap:n.clearcoatMap?r=n.clearcoatMap:n.clearcoatNormalMap?r=n.clearcoatNormalMap:n.clearcoatRoughnessMap&&(r=n.clearcoatRoughnessMap),void 0!==r&&(r.isWebGLRenderTarget&&(r=r.texture),!0===r.matrixAutoUpdate&&r.updateMatrix(),e.uvTransform.value.copy(r.matrix)),n.aoMap?s=n.aoMap:n.lightMap&&(s=n.lightMap),void 0!==s&&(s.isWebGLRenderTarget&&(s=s.texture),!0===s.matrixAutoUpdate&&s.updateMatrix(),e.uv2Transform.value.copy(s.matrix))}function n(e,n){e.roughness.value=n.roughness,e.metalness.value=n.metalness,n.roughnessMap&&(e.roughnessMap.value=n.roughnessMap),n.metalnessMap&&(e.metalnessMap.value=n.metalnessMap),n.emissiveMap&&(e.emissiveMap.value=n.emissiveMap),n.bumpMap&&(e.bumpMap.value=n.bumpMap,e.bumpScale.value=n.bumpScale,1===n.side&&(e.bumpScale.value*=-1)),n.normalMap&&(e.normalMap.value=n.normalMap,e.normalScale.value.copy(n.normalScale),1===n.side&&e.normalScale.value.negate()),n.displacementMap&&(e.displacementMap.value=n.displacementMap,e.displacementScale.value=n.displacementScale,e.displacementBias.value=n.displacementBias);t.get(n).envMap&&(e.envMapIntensity.value=n.envMapIntensity)}return{refreshFogUniforms:function(t,e){t.fogColor.value.copy(e.color),e.isFog?(t.fogNear.value=e.near,t.fogFar.value=e.far):e.isFogExp2&&(t.fogDensity.value=e.density)},refreshMaterialUniforms:function(t,i,r,s){i.isMeshBasicMaterial?e(t,i):i.isMeshLambertMaterial?(e(t,i),function(t,e){e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap)}(t,i)):i.isMeshToonMaterial?(e(t,i),function(t,e){e.gradientMap&&(t.gradientMap.value=e.gradientMap);e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap);e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,1===e.side&&(t.bumpScale.value*=-1));e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),1===e.side&&t.normalScale.value.negate());e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}(t,i)):i.isMeshPhongMaterial?(e(t,i),function(t,e){t.specular.value.copy(e.specular),t.shininess.value=Math.max(e.shininess,1e-4),e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap);e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,1===e.side&&(t.bumpScale.value*=-1));e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),1===e.side&&t.normalScale.value.negate());e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}(t,i)):i.isMeshStandardMaterial?(e(t,i),i.isMeshPhysicalMaterial?function(t,e){n(t,e),t.reflectivity.value=e.reflectivity,t.clearcoat.value=e.clearcoat,t.clearcoatRoughness.value=e.clearcoatRoughness,e.sheen&&t.sheen.value.copy(e.sheen);e.clearcoatMap&&(t.clearcoatMap.value=e.clearcoatMap);e.clearcoatRoughnessMap&&(t.clearcoatRoughnessMap.value=e.clearcoatRoughnessMap);e.clearcoatNormalMap&&(t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),t.clearcoatNormalMap.value=e.clearcoatNormalMap,1===e.side&&t.clearcoatNormalScale.value.negate());t.transmission.value=e.transmission,e.transmissionMap&&(t.transmissionMap.value=e.transmissionMap)}(t,i):n(t,i)):i.isMeshMatcapMaterial?(e(t,i),function(t,e){e.matcap&&(t.matcap.value=e.matcap);e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,1===e.side&&(t.bumpScale.value*=-1));e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),1===e.side&&t.normalScale.value.negate());e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}(t,i)):i.isMeshDepthMaterial?(e(t,i),function(t,e){e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}(t,i)):i.isMeshDistanceMaterial?(e(t,i),function(t,e){e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias);t.referencePosition.value.copy(e.referencePosition),t.nearDistance.value=e.nearDistance,t.farDistance.value=e.farDistance}(t,i)):i.isMeshNormalMaterial?(e(t,i),function(t,e){e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,1===e.side&&(t.bumpScale.value*=-1));e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),1===e.side&&t.normalScale.value.negate());e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}(t,i)):i.isLineBasicMaterial?(function(t,e){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity}(t,i),i.isLineDashedMaterial&&function(t,e){t.dashSize.value=e.dashSize,t.totalSize.value=e.dashSize+e.gapSize,t.scale.value=e.scale}(t,i)):i.isPointsMaterial?function(t,e,n,i){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.size.value=e.size*n,t.scale.value=.5*i,e.map&&(t.map.value=e.map);e.alphaMap&&(t.alphaMap.value=e.alphaMap);let r;e.map?r=e.map:e.alphaMap&&(r=e.alphaMap);void 0!==r&&(!0===r.matrixAutoUpdate&&r.updateMatrix(),t.uvTransform.value.copy(r.matrix))}(t,i,r,s):i.isSpriteMaterial?function(t,e){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.rotation.value=e.rotation,e.map&&(t.map.value=e.map);e.alphaMap&&(t.alphaMap.value=e.alphaMap);let n;e.map?n=e.map:e.alphaMap&&(n=e.alphaMap);void 0!==n&&(!0===n.matrixAutoUpdate&&n.updateMatrix(),t.uvTransform.value.copy(n.matrix))}(t,i):i.isShadowMaterial?(t.color.value.copy(i.color),t.opacity.value=i.opacity):i.isShaderMaterial&&(i.uniformsNeedUpdate=!1)}}}function ws(t){const e=void 0!==(t=t||{}).canvas?t.canvas:function(){const t=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return t.style.display="block",t}(),n=void 0!==t.context?t.context:null,i=void 0!==t.alpha&&t.alpha,r=void 0===t.depth||t.depth,s=void 0===t.stencil||t.stencil,a=void 0!==t.antialias&&t.antialias,o=void 0===t.premultipliedAlpha||t.premultipliedAlpha,l=void 0!==t.preserveDrawingBuffer&&t.preserveDrawingBuffer,c=void 0!==t.powerPreference?t.powerPreference:"default",h=void 0!==t.failIfMajorPerformanceCaveat&&t.failIfMajorPerformanceCaveat;let u=null,d=null;const p=[],m=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=X,this.physicallyCorrectLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const f=this;let g=!1,v=0,y=0,_=null,w=-1,S=null;const T=new St,A=new St;let L=null,R=e.width,C=e.height,P=1,D=null,I=null;const N=new St(0,0,R,C),B=new St(0,0,R,C);let z=!1;const F=new ai;let O=!1,H=!1;const G=new se,U=new Lt,k={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function V(){return null===_?P:1}let W,j,q,Y,Z,J,Q,K,$,tt,et,nt,it,rt,st,at,ot,lt,ct,ht,ut,dt,pt=n;function ft(t,n){for(let i=0;i<t.length;i++){const r=t[i],s=e.getContext(r,n);if(null!==s)return s}return null}try{const t={alpha:i,depth:r,stencil:s,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if(e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",_t,!1),null===pt){const e=["webgl2","webgl","experimental-webgl"];if(!0===f.isWebGL1Renderer&&e.shift(),pt=ft(e,t),null===pt)throw ft(e)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}void 0===pt.getShaderPrecisionFormat&&(pt.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(t){throw console.error("THREE.WebGLRenderer: "+t.message),t}function gt(){W=new xi(pt),j=new gi(pt,W,t),W.init(j),ut=new ms(pt,W,j),q=new ds(pt,W,j),Y=new bi(pt),Z=new Kr,J=new ps(pt,W,q,Z,j,ut,Y),Q=new yi(f),K=new li(pt,j),dt=new mi(pt,W,K,j),$=new _i(pt,K,Y,dt),tt=new Ei(pt,$,K,Y),lt=new Ti(pt),st=new vi(Z),et=new Qr(f,Q,W,j,dt,st),nt=new _s(Z),it=new ns(Z),rt=new ls(W,j),ot=new pi(f,Q,q,tt,o),at=new us(f,tt,j),ct=new fi(pt,W,Y,j),ht=new wi(pt,W,Y,j),Y.programs=et.programs,f.capabilities=j,f.extensions=W,f.properties=Z,f.renderLists=it,f.shadowMap=at,f.state=q,f.info=Y}gt();const yt=new xs(f,pt);function xt(t){t.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),g=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),g=!1;const t=Y.autoReset,e=at.enabled,n=at.autoUpdate,i=at.needsUpdate,r=at.type;gt(),Y.autoReset=t,at.enabled=e,at.autoUpdate=n,at.needsUpdate=i,at.type=r}function wt(t){const e=t.target;e.removeEventListener("dispose",wt),function(t){(function(t){const e=Z.get(t).programs;void 0!==e&&e.forEach((function(t){et.releaseProgram(t)}))})(t),Z.remove(t)}(e)}this.xr=yt,this.getContext=function(){return pt},this.getContextAttributes=function(){return pt.getContextAttributes()},this.forceContextLoss=function(){const t=W.get("WEBGL_lose_context");t&&t.loseContext()},this.forceContextRestore=function(){const t=W.get("WEBGL_lose_context");t&&t.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(t){void 0!==t&&(P=t,this.setSize(R,C,!1))},this.getSize=function(t){return void 0===t&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),t=new vt),t.set(R,C)},this.setSize=function(t,n,i){yt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(R=t,C=n,e.width=Math.floor(t*P),e.height=Math.floor(n*P),!1!==i&&(e.style.width=t+"px",e.style.height=n+"px"),this.setViewport(0,0,t,n))},this.getDrawingBufferSize=function(t){return void 0===t&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),t=new vt),t.set(R*P,C*P).floor()},this.setDrawingBufferSize=function(t,n,i){R=t,C=n,P=i,e.width=Math.floor(t*i),e.height=Math.floor(n*i),this.setViewport(0,0,t,n)},this.getCurrentViewport=function(t){return void 0===t&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),t=new St),t.copy(T)},this.getViewport=function(t){return t.copy(N)},this.setViewport=function(t,e,n,i){t.isVector4?N.set(t.x,t.y,t.z,t.w):N.set(t,e,n,i),q.viewport(T.copy(N).multiplyScalar(P).floor())},this.getScissor=function(t){return t.copy(B)},this.setScissor=function(t,e,n,i){t.isVector4?B.set(t.x,t.y,t.z,t.w):B.set(t,e,n,i),q.scissor(A.copy(B).multiplyScalar(P).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(t){q.setScissorTest(z=t)},this.setOpaqueSort=function(t){D=t},this.setTransparentSort=function(t){I=t},this.getClearColor=function(t){return void 0===t&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),t=new tn),t.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(t,e,n){let i=0;(void 0===t||t)&&(i|=16384),(void 0===e||e)&&(i|=256),(void 0===n||n)&&(i|=1024),pt.clear(i)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",_t,!1),it.dispose(),rt.dispose(),Z.dispose(),Q.dispose(),tt.dispose(),dt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Mt),yt.removeEventListener("sessionend",Tt),Et.stop()},this.renderBufferImmediate=function(t,e){dt.initAttributes();const n=Z.get(t);t.hasPositions&&!n.position&&(n.position=pt.createBuffer()),t.hasNormals&&!n.normal&&(n.normal=pt.createBuffer()),t.hasUvs&&!n.uv&&(n.uv=pt.createBuffer()),t.hasColors&&!n.color&&(n.color=pt.createBuffer());const i=e.getAttributes();t.hasPositions&&(pt.bindBuffer(34962,n.position),pt.bufferData(34962,t.positionArray,35048),dt.enableAttribute(i.position),pt.vertexAttribPointer(i.position,3,5126,!1,0,0)),t.hasNormals&&(pt.bindBuffer(34962,n.normal),pt.bufferData(34962,t.normalArray,35048),dt.enableAttribute(i.normal),pt.vertexAttribPointer(i.normal,3,5126,!1,0,0)),t.hasUvs&&(pt.bindBuffer(34962,n.uv),pt.bufferData(34962,t.uvArray,35048),dt.enableAttribute(i.uv),pt.vertexAttribPointer(i.uv,2,5126,!1,0,0)),t.hasColors&&(pt.bindBuffer(34962,n.color),pt.bufferData(34962,t.colorArray,35048),dt.enableAttribute(i.color),pt.vertexAttribPointer(i.color,3,5126,!1,0,0)),dt.disableUnusedAttributes(),pt.drawArrays(4,0,t.count),t.count=0},this.renderBufferDirect=function(t,e,n,i,r,s){null===e&&(e=k);const a=r.isMesh&&r.matrixWorld.determinant()<0,o=It(t,e,i,r);q.setMaterial(i,a);let l=n.index;const c=n.attributes.position;if(null===l){if(void 0===c||0===c.count)return}else if(0===l.count)return;let h,u=1;!0===i.wireframe&&(l=$.getWireframeAttribute(n),u=2),(i.morphTargets||i.morphNormals)&&lt.update(r,n,i,o),dt.setup(r,i,o,n,l);let d=ct;null!==l&&(h=K.get(l),d=ht,d.setIndex(h));const p=null!==l?l.count:c.count,m=n.drawRange.start*u,f=n.drawRange.count*u,g=null!==s?s.start*u:0,v=null!==s?s.count*u:1/0,y=Math.max(m,g),x=Math.min(p,m+f,g+v)-1,_=Math.max(0,x-y+1);if(0!==_){if(r.isMesh)!0===i.wireframe?(q.setLineWidth(i.wireframeLinewidth*V()),d.setMode(1)):d.setMode(4);else if(r.isLine){let t=i.linewidth;void 0===t&&(t=1),q.setLineWidth(t*V()),r.isLineSegments?d.setMode(1):r.isLineLoop?d.setMode(2):d.setMode(3)}else r.isPoints?d.setMode(0):r.isSprite&&d.setMode(4);if(r.isInstancedMesh)d.renderInstances(y,_,r.count);else if(n.isInstancedBufferGeometry){const t=Math.min(n.instanceCount,n._maxInstanceCount);d.renderInstances(y,_,t)}else d.render(y,_)}},this.compile=function(t,e){d=rt.get(t),d.init(),t.traverseVisible((function(t){t.isLight&&t.layers.test(e.layers)&&(d.pushLight(t),t.castShadow&&d.pushShadow(t))})),d.setupLights(),t.traverse((function(e){const n=e.material;if(n)if(Array.isArray(n))for(let i=0;i<n.length;i++){Pt(n[i],t,e)}else Pt(n,t,e)}))};let bt=null;function Mt(){Et.stop()}function Tt(){Et.start()}const Et=new oi;function At(t,e,n,i){if(!1===t.visible)return;if(t.layers.test(e.layers))if(t.isGroup)n=t.renderOrder;else if(t.isLOD)!0===t.autoUpdate&&t.update(e);else if(t.isLight)d.pushLight(t),t.castShadow&&d.pushShadow(t);else if(t.isSprite){if(!t.frustumCulled||F.intersectsSprite(t)){i&&U.setFromMatrixPosition(t.matrixWorld).applyMatrix4(G);const e=tt.update(t),r=t.material;r.visible&&u.push(t,e,r,n,U.z,null)}}else if(t.isImmediateRenderObject)i&&U.setFromMatrixPosition(t.matrixWorld).applyMatrix4(G),u.push(t,null,t.material,n,U.z,null);else if((t.isMesh||t.isLine||t.isPoints)&&(t.isSkinnedMesh&&t.skeleton.frame!==Y.render.frame&&(t.skeleton.update(),t.skeleton.frame=Y.render.frame),!t.frustumCulled||F.intersectsObject(t))){i&&U.setFromMatrixPosition(t.matrixWorld).applyMatrix4(G);const e=tt.update(t),r=t.material;if(Array.isArray(r)){const i=e.groups;for(let s=0,a=i.length;s<a;s++){const a=i[s],o=r[a.materialIndex];o&&o.visible&&u.push(t,e,o,n,U.z,a)}}else r.visible&&u.push(t,e,r,n,U.z,null)}const r=t.children;for(let t=0,s=r.length;t<s;t++)At(r[t],e,n,i)}function Rt(t,e,n){const i=!0===e.isScene?e.overrideMaterial:null;for(let r=0,s=t.length;r<s;r++){const s=t[r],a=s.object,o=s.geometry,l=null===i?s.material:i,c=s.group;if(n.isArrayCamera){const t=n.cameras;for(let n=0,i=t.length;n<i;n++){const i=t[n];a.layers.test(i.layers)&&(q.viewport(T.copy(i.viewport)),d.setupLightsView(i),Ct(a,e,i,o,l,c))}}else Ct(a,e,n,o,l,c)}}function Ct(t,e,n,i,r,s){if(t.onBeforeRender(f,e,n,i,r,s),t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,t.matrixWorld),t.normalMatrix.getNormalMatrix(t.modelViewMatrix),t.isImmediateRenderObject){const i=It(n,e,r,t);q.setMaterial(r),dt.reset(),function(t,e){t.render((function(t){f.renderBufferImmediate(t,e)}))}(t,i)}else f.renderBufferDirect(n,e,i,r,t,s);t.onAfterRender(f,e,n,i,r,s)}function Pt(t,e,n){!0!==e.isScene&&(e=k);const i=Z.get(t),r=d.state.lights,s=d.state.shadowsArray,a=r.state.version,o=et.getParameters(t,r.state,s,e,n),l=et.getProgramCacheKey(o);let c=i.programs;i.environment=t.isMeshStandardMaterial?e.environment:null,i.fog=e.fog,i.envMap=Q.get(t.envMap||i.environment),void 0===c&&(t.addEventListener("dispose",wt),c=new Map,i.programs=c);let h=c.get(l);if(void 0!==h){if(i.currentProgram===h&&i.lightsStateVersion===a)return Dt(t,o),h}else o.uniforms=et.getUniforms(t),t.onBuild(o,f),t.onBeforeCompile(o,f),h=et.acquireProgram(o,l),c.set(l,h),i.uniforms=o.uniforms;const u=i.uniforms;(t.isShaderMaterial||t.isRawShaderMaterial)&&!0!==t.clipping||(u.clippingPlanes=st.uniform),Dt(t,o),i.needsLights=function(t){return t.isMeshLambertMaterial||t.isMeshToonMaterial||t.isMeshPhongMaterial||t.isMeshStandardMaterial||t.isShadowMaterial||t.isShaderMaterial&&!0===t.lights}(t),i.lightsStateVersion=a,i.needsLights&&(u.ambientLightColor.value=r.state.ambient,u.lightProbe.value=r.state.probe,u.directionalLights.value=r.state.directional,u.directionalLightShadows.value=r.state.directionalShadow,u.spotLights.value=r.state.spot,u.spotLightShadows.value=r.state.spotShadow,u.rectAreaLights.value=r.state.rectArea,u.ltc_1.value=r.state.rectAreaLTC1,u.ltc_2.value=r.state.rectAreaLTC2,u.pointLights.value=r.state.point,u.pointLightShadows.value=r.state.pointShadow,u.hemisphereLights.value=r.state.hemi,u.directionalShadowMap.value=r.state.directionalShadowMap,u.directionalShadowMatrix.value=r.state.directionalShadowMatrix,u.spotShadowMap.value=r.state.spotShadowMap,u.spotShadowMatrix.value=r.state.spotShadowMatrix,u.pointShadowMap.value=r.state.pointShadowMap,u.pointShadowMatrix.value=r.state.pointShadowMatrix);const p=h.getUniforms(),m=Cr.seqWithValue(p.seq,u);return i.currentProgram=h,i.uniformsList=m,h}function Dt(t,e){const n=Z.get(t);n.outputEncoding=e.outputEncoding,n.instancing=e.instancing,n.numClippingPlanes=e.numClippingPlanes,n.numIntersection=e.numClipIntersection,n.vertexAlphas=e.vertexAlphas}function It(t,e,n,i){!0!==e.isScene&&(e=k),J.resetTextureUnits();const r=e.fog,s=n.isMeshStandardMaterial?e.environment:null,a=null===_?f.outputEncoding:_.texture.encoding,o=Q.get(n.envMap||s),l=!0===n.vertexColors&&i.geometry&&i.geometry.attributes.color&&4===i.geometry.attributes.color.itemSize,c=Z.get(n),h=d.state.lights;if(!0===O&&(!0===H||t!==S)){const e=t===S&&n.id===w;st.setState(n,t,e)}let u=!1;n.version===c.__version?c.needsLights&&c.lightsStateVersion!==h.state.version||c.outputEncoding!==a||i.isInstancedMesh&&!1===c.instancing?u=!0:i.isInstancedMesh||!0!==c.instancing?c.envMap!==o||n.fog&&c.fog!==r?u=!0:void 0===c.numClippingPlanes||c.numClippingPlanes===st.numPlanes&&c.numIntersection===st.numIntersection?c.vertexAlphas!==l&&(u=!0):u=!0:u=!0:(u=!0,c.__version=n.version);let p=c.currentProgram;!0===u&&(p=Pt(n,e,i));let m=!1,g=!1,v=!1;const y=p.getUniforms(),x=c.uniforms;if(q.useProgram(p.program)&&(m=!0,g=!0,v=!0),n.id!==w&&(w=n.id,g=!0),m||S!==t){if(y.setValue(pt,"projectionMatrix",t.projectionMatrix),j.logarithmicDepthBuffer&&y.setValue(pt,"logDepthBufFC",2/(Math.log(t.far+1)/Math.LN2)),S!==t&&(S=t,g=!0,v=!0),n.isShaderMaterial||n.isMeshPhongMaterial||n.isMeshToonMaterial||n.isMeshStandardMaterial||n.envMap){const e=y.map.cameraPosition;void 0!==e&&e.setValue(pt,U.setFromMatrixPosition(t.matrixWorld))}(n.isMeshPhongMaterial||n.isMeshToonMaterial||n.isMeshLambertMaterial||n.isMeshBasicMaterial||n.isMeshStandardMaterial||n.isShaderMaterial)&&y.setValue(pt,"isOrthographic",!0===t.isOrthographicCamera),(n.isMeshPhongMaterial||n.isMeshToonMaterial||n.isMeshLambertMaterial||n.isMeshBasicMaterial||n.isMeshStandardMaterial||n.isShaderMaterial||n.isShadowMaterial||n.skinning)&&y.setValue(pt,"viewMatrix",t.matrixWorldInverse)}if(n.skinning){y.setOptional(pt,i,"bindMatrix"),y.setOptional(pt,i,"bindMatrixInverse");const t=i.skeleton;if(t){const e=t.bones;if(j.floatVertexTextures){if(null===t.boneTexture){let n=Math.sqrt(4*e.length);n=mt(n),n=Math.max(n,4);const i=new Float32Array(n*n*4);i.set(t.boneMatrices);const r=new ii(i,n,n,E,b);t.boneMatrices=i,t.boneTexture=r,t.boneTextureSize=n}y.setValue(pt,"boneTexture",t.boneTexture,J),y.setValue(pt,"boneTextureSize",t.boneTextureSize)}else y.setOptional(pt,t,"boneMatrices")}}var M,T;return(g||c.receiveShadow!==i.receiveShadow)&&(c.receiveShadow=i.receiveShadow,y.setValue(pt,"receiveShadow",i.receiveShadow)),g&&(y.setValue(pt,"toneMappingExposure",f.toneMappingExposure),c.needsLights&&(T=v,(M=x).ambientLightColor.needsUpdate=T,M.lightProbe.needsUpdate=T,M.directionalLights.needsUpdate=T,M.directionalLightShadows.needsUpdate=T,M.pointLights.needsUpdate=T,M.pointLightShadows.needsUpdate=T,M.spotLights.needsUpdate=T,M.spotLightShadows.needsUpdate=T,M.rectAreaLights.needsUpdate=T,M.hemisphereLights.needsUpdate=T),r&&n.fog&&nt.refreshFogUniforms(x,r),nt.refreshMaterialUniforms(x,n,P,C),Cr.upload(pt,c.uniformsList,x,J)),n.isShaderMaterial&&!0===n.uniformsNeedUpdate&&(Cr.upload(pt,c.uniformsList,x,J),n.uniformsNeedUpdate=!1),n.isSpriteMaterial&&y.setValue(pt,"center",i.center),y.setValue(pt,"modelViewMatrix",i.modelViewMatrix),y.setValue(pt,"normalMatrix",i.normalMatrix),y.setValue(pt,"modelMatrix",i.matrixWorld),p}Et.setAnimationLoop((function(t){bt&&bt(t)})),"undefined"!=typeof window&&Et.setContext(window),this.setAnimationLoop=function(t){bt=t,yt.setAnimationLoop(t),null===t?Et.stop():Et.start()},yt.addEventListener("sessionstart",Mt),yt.addEventListener("sessionend",Tt),this.render=function(t,e){let n,i;if(void 0!==arguments[2]&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),n=arguments[2]),void 0!==arguments[3]&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),i=arguments[3]),void 0!==e&&!0!==e.isCamera)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!0===g)return;!0===t.autoUpdate&&t.updateMatrixWorld(),null===e.parent&&e.updateMatrixWorld(),!0===yt.enabled&&!0===yt.isPresenting&&(e=yt.getCamera(e)),!0===t.isScene&&t.onBeforeRender(f,t,e,n||_),d=rt.get(t,m.length),d.init(),m.push(d),G.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),F.setFromProjectionMatrix(G),H=this.localClippingEnabled,O=st.init(this.clippingPlanes,H,e),u=it.get(t,p.length),u.init(),p.push(u),At(t,e,0,f.sortObjects),u.finish(),!0===f.sortObjects&&u.sort(D,I),!0===O&&st.beginShadows();const r=d.state.shadowsArray;at.render(r,t,e),d.setupLights(),d.setupLightsView(e),!0===O&&st.endShadows(),!0===this.info.autoReset&&this.info.reset(),void 0!==n&&this.setRenderTarget(n),ot.render(u,t,e,i);const s=u.opaque,a=u.transparent;s.length>0&&Rt(s,t,e),a.length>0&&Rt(a,t,e),null!==_&&(J.updateRenderTargetMipmap(_),J.updateMultisampleRenderTarget(_)),!0===t.isScene&&t.onAfterRender(f,t,e),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1),dt.resetDefaultState(),w=-1,S=null,m.pop(),d=m.length>0?m[m.length-1]:null,p.pop(),u=p.length>0?p[p.length-1]:null},this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return _},this.setRenderTarget=function(t,e=0,n=0){_=t,v=e,y=n,t&&void 0===Z.get(t).__webglFramebuffer&&J.setupRenderTarget(t);let i=null,r=!1,s=!1;if(t){const n=t.texture;(n.isDataTexture3D||n.isDataTexture2DArray)&&(s=!0);const a=Z.get(t).__webglFramebuffer;t.isWebGLCubeRenderTarget?(i=a[e],r=!0):i=t.isWebGLMultisampleRenderTarget?Z.get(t).__webglMultisampledFramebuffer:a,T.copy(t.viewport),A.copy(t.scissor),L=t.scissorTest}else T.copy(N).multiplyScalar(P).floor(),A.copy(B).multiplyScalar(P).floor(),L=z;if(q.bindFramebuffer(36160,i),q.viewport(T),q.scissor(A),q.setScissorTest(L),r){const i=Z.get(t.texture);pt.framebufferTexture2D(36160,36064,34069+e,i.__webglTexture,n)}else if(s){const i=Z.get(t.texture),r=e||0;pt.framebufferTextureLayer(36160,36064,i.__webglTexture,n||0,r)}},this.readRenderTargetPixels=function(t,e,n,i,r,s,a){if(!t||!t.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let o=Z.get(t).__webglFramebuffer;if(t.isWebGLCubeRenderTarget&&void 0!==a&&(o=o[a]),o){q.bindFramebuffer(36160,o);try{const a=t.texture,o=a.format,l=a.type;if(o!==E&&ut.convert(o)!==pt.getParameter(35739))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");const c=l===M&&(W.has("EXT_color_buffer_half_float")||j.isWebGL2&&W.has("EXT_color_buffer_float"));if(!(l===x||ut.convert(l)===pt.getParameter(35738)||l===b&&(j.isWebGL2||W.has("OES_texture_float")||W.has("WEBGL_color_buffer_float"))||c))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");36053===pt.checkFramebufferStatus(36160)?e>=0&&e<=t.width-i&&n>=0&&n<=t.height-r&&pt.readPixels(e,n,i,r,ut.convert(o),ut.convert(l),s):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{const t=null!==_?Z.get(_).__webglFramebuffer:null;q.bindFramebuffer(36160,t)}}},this.copyFramebufferToTexture=function(t,e,n=0){const i=Math.pow(2,-n),r=Math.floor(e.image.width*i),s=Math.floor(e.image.height*i),a=ut.convert(e.format);J.setTexture2D(e,0),pt.copyTexImage2D(3553,n,a,t.x,t.y,r,s,0),q.unbindTexture()},this.copyTextureToTexture=function(t,e,n,i=0){const r=e.image.width,s=e.image.height,a=ut.convert(n.format),o=ut.convert(n.type);J.setTexture2D(n,0),pt.pixelStorei(37440,n.flipY),pt.pixelStorei(37441,n.premultiplyAlpha),pt.pixelStorei(3317,n.unpackAlignment),e.isDataTexture?pt.texSubImage2D(3553,i,t.x,t.y,r,s,a,o,e.image.data):e.isCompressedTexture?pt.compressedTexSubImage2D(3553,i,t.x,t.y,e.mipmaps[0].width,e.mipmaps[0].height,a,e.mipmaps[0].data):pt.texSubImage2D(3553,i,t.x,t.y,a,o,e.image),0===i&&n.generateMipmaps&&pt.generateMipmap(3553),q.unbindTexture()},this.copyTextureToTexture3D=function(t,e,n,i,r=0){if(f.isWebGL1Renderer)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");const{width:s,height:a,data:o}=n.image,l=ut.convert(i.format),c=ut.convert(i.type);let h;if(i.isDataTexture3D)J.setTexture3D(i,0),h=32879;else{if(!i.isDataTexture2DArray)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");J.setTexture2DArray(i,0),h=35866}pt.pixelStorei(37440,i.flipY),pt.pixelStorei(37441,i.premultiplyAlpha),pt.pixelStorei(3317,i.unpackAlignment);const u=pt.getParameter(3314),d=pt.getParameter(32878),p=pt.getParameter(3316),m=pt.getParameter(3315),g=pt.getParameter(32877);pt.pixelStorei(3314,s),pt.pixelStorei(32878,a),pt.pixelStorei(3316,t.min.x),pt.pixelStorei(3315,t.min.y),pt.pixelStorei(32877,t.min.z),pt.texSubImage3D(h,r,e.x,e.y,e.z,t.max.x-t.min.x+1,t.max.y-t.min.y+1,t.max.z-t.min.z+1,l,c,o),pt.pixelStorei(3314,u),pt.pixelStorei(32878,d),pt.pixelStorei(3316,p),pt.pixelStorei(3315,m),pt.pixelStorei(32877,g),0===r&&i.generateMipmaps&&pt.generateMipmap(h),q.unbindTexture()},this.initTexture=function(t){J.setTexture2D(t,0),q.unbindTexture()},this.resetState=function(){v=0,y=0,_=null,q.reset(),dt.reset()},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class bs extends ws{}bs.prototype.isWebGL1Renderer=!0;class Ms{constructor(t,e=25e-5){this.name="",this.color=new tn(t),this.density=e}clone(){return new Ms(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}Ms.prototype.isFogExp2=!0;class Ss{constructor(t,e=1,n=1e3){this.name="",this.color=new tn(t),this.near=e,this.far=n}clone(){return new Ss(this.color,this.near,this.far)}toJSON(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}}Ss.prototype.isFog=!0;class Ts extends Ce{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),null!==t.background&&(this.background=t.background.clone()),null!==t.environment&&(this.environment=t.environment.clone()),null!==t.fog&&(this.fog=t.fog.clone()),null!==t.overrideMaterial&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return null!==this.background&&(e.object.background=this.background.toJSON(t)),null!==this.environment&&(e.object.environment=this.environment.toJSON(t)),null!==this.fog&&(e.object.fog=this.fog.toJSON()),e}}Ts.prototype.isScene=!0;class Es{constructor(t,e){this.array=t,this.stride=e,this.count=void 0!==t?t.length/e:0,this.usage=et,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=ct(),this.onUploadCallback=function(){}}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer._uuid&&(this.array.buffer._uuid=ct()),void 0===t.arrayBuffers[this.array.buffer._uuid]&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new Es(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer._uuid&&(this.array.buffer._uuid=ct()),void 0===t.arrayBuffers[this.array.buffer._uuid]&&(t.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}Es.prototype.isInterleavedBuffer=!0;const As=new Lt;class Ls{constructor(t,e,n,i){this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=!0===i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)As.x=this.getX(e),As.y=this.getY(e),As.z=this.getZ(e),As.applyMatrix4(t),this.setXYZ(e,As.x,As.y,As.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)As.x=this.getX(e),As.y=this.getY(e),As.z=this.getZ(e),As.applyNormalMatrix(t),this.setXYZ(e,As.x,As.y,As.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)As.x=this.getX(e),As.y=this.getY(e),As.z=this.getZ(e),As.transformDirection(t),this.setXYZ(e,As.x,As.y,As.z);return this}setX(t,e){return this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){return this.data.array[t*this.data.stride+this.offset]}getY(t){return this.data.array[t*this.data.stride+this.offset+1]}getZ(t){return this.data.array[t*this.data.stride+this.offset+2]}getW(t){return this.data.array[t*this.data.stride+this.offset+3]}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(void 0===t){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let e=0;e<this.count;e++){const n=e*this.data.stride+this.offset;for(let e=0;e<this.itemSize;e++)t.push(this.data.array[n+e])}return new sn(new this.array.constructor(t),this.itemSize,this.normalized)}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ls(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(void 0===t){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let e=0;e<this.count;e++){const n=e*this.data.stride+this.offset;for(let e=0;e<this.itemSize;e++)t.push(this.data.array[n+e])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}Ls.prototype.isInterleavedBufferAttribute=!0;class Rs extends Xe{constructor(t){super(),this.type="SpriteMaterial",this.color=new tn(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this}}let Cs;Rs.prototype.isSpriteMaterial=!0;const Ps=new Lt,Ds=new Lt,Is=new Lt,Ns=new vt,Bs=new vt,zs=new se,Fs=new Lt,Os=new Lt,Hs=new Lt,Gs=new vt,Us=new vt,ks=new vt;class Vs extends Ce{constructor(t){if(super(),this.type="Sprite",void 0===Cs){Cs=new En;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),e=new Es(t,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new Ls(e,3,0,!1)),Cs.setAttribute("uv",new Ls(e,2,3,!1))}this.geometry=Cs,this.material=void 0!==t?t:new Rs,this.center=new vt(.5,.5)}raycast(t,e){null===t.camera&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ds.setFromMatrixScale(this.matrixWorld),zs.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&!1===this.material.sizeAttenuation&&Ds.multiplyScalar(-Is.z);const n=this.material.rotation;let i,r;0!==n&&(r=Math.cos(n),i=Math.sin(n));const s=this.center;Ws(Fs.set(-.5,-.5,0),Is,s,Ds,i,r),Ws(Os.set(.5,-.5,0),Is,s,Ds,i,r),Ws(Hs.set(.5,.5,0),Is,s,Ds,i,r),Gs.set(0,0),Us.set(1,0),ks.set(1,1);let a=t.ray.intersectTriangle(Fs,Os,Hs,!1,Ps);if(null===a&&(Ws(Os.set(-.5,.5,0),Is,s,Ds,i,r),Us.set(0,1),a=t.ray.intersectTriangle(Fs,Hs,Os,!1,Ps),null===a))return;const o=t.ray.origin.distanceTo(Ps);o<t.near||o>t.far||e.push({distance:o,point:Ps.clone(),uv:je.getUV(Ps,Fs,Os,Hs,Gs,Us,ks,new vt),face:null,object:this})}copy(t){return super.copy(t),void 0!==t.center&&this.center.copy(t.center),this.material=t.material,this}}function Ws(t,e,n,i,r,s){Ns.subVectors(t,n).addScalar(.5).multiply(i),void 0!==r?(Bs.x=s*Ns.x-r*Ns.y,Bs.y=r*Ns.x+s*Ns.y):Bs.copy(Ns),t.copy(e),t.x+=Bs.x,t.y+=Bs.y,t.applyMatrix4(zs)}Vs.prototype.isSprite=!0;const js=new Lt,qs=new Lt;class Xs extends Ce{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let t=0,n=e.length;t<n;t++){const n=e[t];this.addLevel(n.object.clone(),n.distance)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0){e=Math.abs(e);const n=this.levels;let i;for(i=0;i<n.length&&!(e<n[i].distance);i++);return n.splice(i,0,{distance:e,object:t}),this.add(t),this}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i&&!(t<e[n].distance);n++);return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){js.setFromMatrixPosition(this.matrixWorld);const n=t.ray.origin.distanceTo(js);this.getObjectForDistance(n).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){js.setFromMatrixPosition(t.matrixWorld),qs.setFromMatrixPosition(this.matrixWorld);const n=js.distanceTo(qs)/t.zoom;let i,r;for(e[0].object.visible=!0,i=1,r=e.length;i<r&&n>=e[i].distance;i++)e[i-1].object.visible=!1,e[i].object.visible=!0;for(this._currentLevel=i-1;i<r;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);!1===this.autoUpdate&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let t=0,i=n.length;t<i;t++){const i=n[t];e.object.levels.push({object:i.object.uuid,distance:i.distance})}return e}}const Ys=new Lt,Zs=new St,Js=new St,Qs=new Lt,Ks=new se;class $s extends Wn{constructor(t,e){super(t,e),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new se,this.bindMatrixInverse=new se}copy(t){return super.copy(t),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,this}bind(t,e){this.skeleton=t,void 0===e&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new St,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.w=e.getW(n);const i=1/t.manhattanLength();i!==1/0?t.multiplyScalar(i):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),"attached"===this.bindMode?this.bindMatrixInverse.copy(this.matrixWorld).invert():"detached"===this.bindMode?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(t,e){const n=this.skeleton,i=this.geometry;Zs.fromBufferAttribute(i.attributes.skinIndex,t),Js.fromBufferAttribute(i.attributes.skinWeight,t),Ys.fromBufferAttribute(i.attributes.position,t).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let t=0;t<4;t++){const i=Js.getComponent(t);if(0!==i){const r=Zs.getComponent(t);Ks.multiplyMatrices(n.bones[r].matrixWorld,n.boneInverses[r]),e.addScaledVector(Qs.copy(Ys).applyMatrix4(Ks),i)}}return e.applyMatrix4(this.bindMatrixInverse)}}$s.prototype.isSkinnedMesh=!0;class ta extends Ce{constructor(){super(),this.type="Bone"}}ta.prototype.isBone=!0;const ea=new se,na=new se;class ia{constructor(t=[],e=[]){this.uuid=ct(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(16*t.length),0===e.length)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let t=0,e=this.bones.length;t<e;t++)this.boneInverses.push(new se)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const e=new se;this.bones[t]&&e.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(e)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t];e&&e.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t];e&&(e.parent&&e.parent.isBone?(e.matrix.copy(e.parent.matrixWorld).invert(),e.matrix.multiply(e.matrixWorld)):e.matrix.copy(e.matrixWorld),e.matrix.decompose(e.position,e.quaternion,e.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let i=0,r=t.length;i<r;i++){const r=t[i]?t[i].matrixWorld:na;ea.multiplyMatrices(r,e[i]),ea.toArray(n,16*i)}null!==i&&(i.needsUpdate=!0)}clone(){return new ia(this.bones,this.boneInverses)}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const n=this.bones[e];if(n.name===t)return n}}dispose(){null!==this.boneTexture&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const i=t.bones[n];let r=e[i];void 0===r&&(console.warn("THREE.Skeleton: No bone found with UUID:",i),r=new ta),this.bones.push(r),this.boneInverses.push((new se).fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const r=e[i];t.bones.push(r.uuid);const s=n[i];t.boneInverses.push(s.toArray())}return t}}const ra=new se,sa=new se,aa=[],oa=new Wn;class la extends Wn{constructor(t,e,n){super(t,e),this.instanceMatrix=new sn(new Float32Array(16*n),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}copy(t){return super.copy(t),this.instanceMatrix.copy(t.instanceMatrix),null!==t.instanceColor&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,this}getColorAt(t,e){e.fromArray(this.instanceColor.array,3*t)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,16*t)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(oa.geometry=this.geometry,oa.material=this.material,void 0!==oa.material)for(let r=0;r<i;r++){this.getMatrixAt(r,ra),sa.multiplyMatrices(n,ra),oa.matrixWorld=sa,oa.raycast(t,aa);for(let t=0,n=aa.length;t<n;t++){const n=aa[t];n.instanceId=r,n.object=this,e.push(n)}aa.length=0}}setColorAt(t,e){null===this.instanceColor&&(this.instanceColor=new sn(new Float32Array(3*this.count),3)),e.toArray(this.instanceColor.array,3*t)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,16*t)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}la.prototype.isInstancedMesh=!0;class ca extends Xe{constructor(t){super(),this.type="LineBasicMaterial",this.color=new tn(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.morphTargets=t.morphTargets,this}}ca.prototype.isLineBasicMaterial=!0;const ha=new Lt,ua=new Lt,da=new se,pa=new re,ma=new Jt;class fa extends Ce{constructor(t=new En,e=new ca){super(),this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),this.material=t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.isBufferGeometry)if(null===t.index){const e=t.attributes.position,n=[0];for(let t=1,i=e.count;t<i;t++)ha.fromBufferAttribute(e,t-1),ua.fromBufferAttribute(e,t),n[t]=n[t-1],n[t]+=ha.distanceTo(ua);t.setAttribute("lineDistance",new mn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else t.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,s=n.drawRange;if(null===n.boundingSphere&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(i),ma.radius+=r,!1===t.ray.intersectsSphere(ma))return;da.copy(i).invert(),pa.copy(t.ray).applyMatrix4(da);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=new Lt,c=new Lt,h=new Lt,u=new Lt,d=this.isLineSegments?2:1;if(n.isBufferGeometry){const i=n.index,r=n.attributes.position;if(null!==i){for(let n=Math.max(0,s.start),a=Math.min(i.count,s.start+s.count)-1;n<a;n+=d){const s=i.getX(n),a=i.getX(n+1);l.fromBufferAttribute(r,s),c.fromBufferAttribute(r,a);if(pa.distanceSqToSegment(l,c,u,h)>o)continue;u.applyMatrix4(this.matrixWorld);const d=t.ray.origin.distanceTo(u);d<t.near||d>t.far||e.push({distance:d,point:h.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this})}}else{for(let n=Math.max(0,s.start),i=Math.min(r.count,s.start+s.count)-1;n<i;n+=d){l.fromBufferAttribute(r,n),c.fromBufferAttribute(r,n+1);if(pa.distanceSqToSegment(l,c,u,h)>o)continue;u.applyMatrix4(this.matrixWorld);const i=t.ray.origin.distanceTo(u);i<t.near||i>t.far||e.push({distance:i,point:h.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this})}}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const t=e[n[0]];if(void 0!==t){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,n=t.length;e<n;e++){const n=t[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=e}}}}else{const e=t.morphTargets;void 0!==e&&e.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}fa.prototype.isLine=!0;const ga=new Lt,va=new Lt;class ya extends fa{constructor(t,e){super(t,e),this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.isBufferGeometry)if(null===t.index){const e=t.attributes.position,n=[];for(let t=0,i=e.count;t<i;t+=2)ga.fromBufferAttribute(e,t),va.fromBufferAttribute(e,t+1),n[t]=0===t?0:n[t-1],n[t+1]=n[t]+ga.distanceTo(va);t.setAttribute("lineDistance",new mn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else t.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}}ya.prototype.isLineSegments=!0;class xa extends fa{constructor(t,e){super(t,e),this.type="LineLoop"}}xa.prototype.isLineLoop=!0;class _a extends Xe{constructor(t){super(),this.type="PointsMaterial",this.color=new tn(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.morphTargets=t.morphTargets,this}}_a.prototype.isPointsMaterial=!0;const wa=new se,ba=new re,Ma=new Jt,Sa=new Lt;class Ta extends Ce{constructor(t=new En,e=new _a){super(),this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t){return super.copy(t),this.material=t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,s=n.drawRange;if(null===n.boundingSphere&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(i),Ma.radius+=r,!1===t.ray.intersectsSphere(Ma))return;wa.copy(i).invert(),ba.copy(t.ray).applyMatrix4(wa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a;if(n.isBufferGeometry){const r=n.index,a=n.attributes.position;if(null!==r){for(let n=Math.max(0,s.start),l=Math.min(r.count,s.start+s.count);n<l;n++){const s=r.getX(n);Sa.fromBufferAttribute(a,s),Ea(Sa,s,o,i,t,e,this)}}else{for(let n=Math.max(0,s.start),r=Math.min(a.count,s.start+s.count);n<r;n++)Sa.fromBufferAttribute(a,n),Ea(Sa,n,o,i,t,e,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const t=this.geometry;if(t.isBufferGeometry){const e=t.morphAttributes,n=Object.keys(e);if(n.length>0){const t=e[n[0]];if(void 0!==t){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,n=t.length;e<n;e++){const n=t[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=e}}}}else{const e=t.morphTargets;void 0!==e&&e.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}function Ea(t,e,n,i,r,s,a){const o=ba.distanceSqToPoint(t);if(o<n){const n=new Lt;ba.closestPointToPoint(t,n),n.applyMatrix4(i);const l=r.ray.origin.distanceTo(n);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:n,index:e,face:null,object:a})}}Ta.prototype.isPoints=!0;class Aa extends bt{constructor(t,e,n,i,r,s,a,o,l){super(t,e,n,i,r,s,a,o,l),this.format=void 0!==a?a:T,this.minFilter=void 0!==s?s:g,this.magFilter=void 0!==r?r:g,this.generateMipmaps=!1;const c=this;"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback((function e(){c.needsUpdate=!0,t.requestVideoFrameCallback(e)}))}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;!1==="requestVideoFrameCallback"in t&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}Aa.prototype.isVideoTexture=!0;class La extends bt{constructor(t,e,n,i,r,s,a,o,l,c,h,u){super(null,s,a,o,l,c,i,r,h,u),this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}La.prototype.isCompressedTexture=!0;class Ra extends bt{constructor(t,e,n,i,r,s,a,o,l){super(t,e,n,i,r,s,a,o,l),this.needsUpdate=!0}}Ra.prototype.isCanvasTexture=!0;class Ca extends bt{constructor(t,e,n,i,r,s,a,o,l,c){if((c=void 0!==c?c:A)!==A&&c!==L)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===n&&c===A&&(n=_),void 0===n&&c===L&&(n=S),super(null,i,r,s,a,o,c,n,l),this.image={width:t,height:e},this.magFilter=void 0!==a?a:p,this.minFilter=void 0!==o?o:p,this.flipY=!1,this.generateMipmaps=!1}}Ca.prototype.isDepthTexture=!0;class Pa extends En{constructor(t=1,e=8,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],s=[],a=[],o=[],l=new Lt,c=new vt;s.push(0,0,0),a.push(0,0,1),o.push(.5,.5);for(let r=0,h=3;r<=e;r++,h+=3){const u=n+r/e*i;l.x=t*Math.cos(u),l.y=t*Math.sin(u),s.push(l.x,l.y,l.z),a.push(0,0,1),c.x=(s[h]/t+1)/2,c.y=(s[h+1]/t+1)/2,o.push(c.x,c.y)}for(let t=1;t<=e;t++)r.push(t,t+1,0);this.setIndex(r),this.setAttribute("position",new mn(s,3)),this.setAttribute("normal",new mn(a,3)),this.setAttribute("uv",new mn(o,2))}}class Da extends En{constructor(t=1,e=1,n=1,i=8,r=1,s=!1,a=0,o=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o};const l=this;i=Math.floor(i),r=Math.floor(r);const c=[],h=[],u=[],d=[];let p=0;const m=[],f=n/2;let g=0;function v(n){const r=p,s=new vt,m=new Lt;let v=0;const y=!0===n?t:e,x=!0===n?1:-1;for(let t=1;t<=i;t++)h.push(0,f*x,0),u.push(0,x,0),d.push(.5,.5),p++;const _=p;for(let t=0;t<=i;t++){const e=t/i*o+a,n=Math.cos(e),r=Math.sin(e);m.x=y*r,m.y=f*x,m.z=y*n,h.push(m.x,m.y,m.z),u.push(0,x,0),s.x=.5*n+.5,s.y=.5*r*x+.5,d.push(s.x,s.y),p++}for(let t=0;t<i;t++){const e=r+t,i=_+t;!0===n?c.push(i,i+1,e):c.push(i+1,i,e),v+=3}l.addGroup(g,v,!0===n?1:2),g+=v}!function(){const s=new Lt,v=new Lt;let y=0;const x=(e-t)/n;for(let l=0;l<=r;l++){const c=[],g=l/r,y=g*(e-t)+t;for(let t=0;t<=i;t++){const e=t/i,r=e*o+a,l=Math.sin(r),m=Math.cos(r);v.x=y*l,v.y=-g*n+f,v.z=y*m,h.push(v.x,v.y,v.z),s.set(l,x,m).normalize(),u.push(s.x,s.y,s.z),d.push(e,1-g),c.push(p++)}m.push(c)}for(let t=0;t<i;t++)for(let e=0;e<r;e++){const n=m[e][t],i=m[e+1][t],r=m[e+1][t+1],s=m[e][t+1];c.push(n,i,s),c.push(i,r,s),y+=6}l.addGroup(g,y,0),g+=y}(),!1===s&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new mn(h,3)),this.setAttribute("normal",new mn(u,3)),this.setAttribute("uv",new mn(d,2))}}class Ia extends Da{constructor(t=1,e=1,n=8,i=1,r=!1,s=0,a=2*Math.PI){super(0,t,e,n,i,r,s,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:s,thetaLength:a}}}class Na extends En{constructor(t,e,n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],s=[];function a(t,e,n,i){const r=i+1,s=[];for(let i=0;i<=r;i++){s[i]=[];const a=t.clone().lerp(n,i/r),o=e.clone().lerp(n,i/r),l=r-i;for(let t=0;t<=l;t++)s[i][t]=0===t&&i===r?a:a.clone().lerp(o,t/l)}for(let t=0;t<r;t++)for(let e=0;e<2*(r-t)-1;e++){const n=Math.floor(e/2);e%2==0?(o(s[t][n+1]),o(s[t+1][n]),o(s[t][n])):(o(s[t][n+1]),o(s[t+1][n+1]),o(s[t+1][n]))}}function o(t){r.push(t.x,t.y,t.z)}function l(e,n){const i=3*e;n.x=t[i+0],n.y=t[i+1],n.z=t[i+2]}function c(t,e,n,i){i<0&&1===t.x&&(s[e]=t.x-1),0===n.x&&0===n.z&&(s[e]=i/2/Math.PI+.5)}function h(t){return Math.atan2(t.z,-t.x)}!function(t){const n=new Lt,i=new Lt,r=new Lt;for(let s=0;s<e.length;s+=3)l(e[s+0],n),l(e[s+1],i),l(e[s+2],r),a(n,i,r,t)}(i),function(t){const e=new Lt;for(let n=0;n<r.length;n+=3)e.x=r[n+0],e.y=r[n+1],e.z=r[n+2],e.normalize().multiplyScalar(t),r[n+0]=e.x,r[n+1]=e.y,r[n+2]=e.z}(n),function(){const t=new Lt;for(let n=0;n<r.length;n+=3){t.x=r[n+0],t.y=r[n+1],t.z=r[n+2];const i=h(t)/2/Math.PI+.5,a=(e=t,Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))/Math.PI+.5);s.push(i,1-a)}var e;(function(){const t=new Lt,e=new Lt,n=new Lt,i=new Lt,a=new vt,o=new vt,l=new vt;for(let u=0,d=0;u<r.length;u+=9,d+=6){t.set(r[u+0],r[u+1],r[u+2]),e.set(r[u+3],r[u+4],r[u+5]),n.set(r[u+6],r[u+7],r[u+8]),a.set(s[d+0],s[d+1]),o.set(s[d+2],s[d+3]),l.set(s[d+4],s[d+5]),i.copy(t).add(e).add(n).divideScalar(3);const p=h(i);c(a,d+0,t,p),c(o,d+2,e,p),c(l,d+4,n,p)}})(),function(){for(let t=0;t<s.length;t+=6){const e=s[t+0],n=s[t+2],i=s[t+4],r=Math.max(e,n,i),a=Math.min(e,n,i);r>.9&&a<.1&&(e<.2&&(s[t+0]+=1),n<.2&&(s[t+2]+=1),i<.2&&(s[t+4]+=1))}}()}(),this.setAttribute("position",new mn(r,3)),this.setAttribute("normal",new mn(r.slice(),3)),this.setAttribute("uv",new mn(s,2)),0===i?this.computeVertexNormals():this.normalizeNormals()}}class Ba extends Na{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}}const za=new Lt,Fa=new Lt,Oa=new Lt,Ha=new je;class Ga extends En{constructor(t,e){if(super(),this.type="EdgesGeometry",this.parameters={thresholdAngle:e},e=void 0!==e?e:1,!0===t.isGeometry)return void console.error("THREE.EdgesGeometry no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");const n=Math.pow(10,4),i=Math.cos(ot*e),r=t.getIndex(),s=t.getAttribute("position"),a=r?r.count:s.count,o=[0,0,0],l=["a","b","c"],c=new Array(3),h={},u=[];for(let t=0;t<a;t+=3){r?(o[0]=r.getX(t),o[1]=r.getX(t+1),o[2]=r.getX(t+2)):(o[0]=t,o[1]=t+1,o[2]=t+2);const{a:e,b:a,c:d}=Ha;if(e.fromBufferAttribute(s,o[0]),a.fromBufferAttribute(s,o[1]),d.fromBufferAttribute(s,o[2]),Ha.getNormal(Oa),c[0]=`${Math.round(e.x*n)},${Math.round(e.y*n)},${Math.round(e.z*n)}`,c[1]=`${Math.round(a.x*n)},${Math.round(a.y*n)},${Math.round(a.z*n)}`,c[2]=`${Math.round(d.x*n)},${Math.round(d.y*n)},${Math.round(d.z*n)}`,c[0]!==c[1]&&c[1]!==c[2]&&c[2]!==c[0])for(let t=0;t<3;t++){const e=(t+1)%3,n=c[t],r=c[e],s=Ha[l[t]],a=Ha[l[e]],d=`${n}_${r}`,p=`${r}_${n}`;p in h&&h[p]?(Oa.dot(h[p].normal)<=i&&(u.push(s.x,s.y,s.z),u.push(a.x,a.y,a.z)),h[p]=null):d in h||(h[d]={index0:o[t],index1:o[e],normal:Oa.clone()})}}for(const t in h)if(h[t]){const{index0:e,index1:n}=h[t];za.fromBufferAttribute(s,e),Fa.fromBufferAttribute(s,n),u.push(za.x,za.y,za.z),u.push(Fa.x,Fa.y,Fa.z)}this.setAttribute("position",new mn(u,3))}}const Ua=function(t,e,n){n=n||2;const i=e&&e.length,r=i?e[0]*n:t.length;let s=ka(t,0,r,n,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,p;if(i&&(s=function(t,e,n,i){const r=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*i,l=s<a-1?e[s+1]*i:t.length,c=ka(t,o,l,i,!1),c===c.next&&(c.steiner=!0),r.push($a(c));for(r.sort(Za),s=0;s<r.length;s++)Ja(r[s],n),n=Va(n,n.next);return n}(t,e,s,n)),t.length>80*n){o=c=t[0],l=h=t[1];for(let e=n;e<r;e+=n)u=t[e],d=t[e+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-o,h-l),p=0!==p?1/p:0}return Wa(s,a,n,o,l,p),a};function ka(t,e,n,i,r){let s,a;if(r===function(t,e,n,i){let r=0;for(let s=e,a=n-i;s<n;s+=i)r+=(t[a]-t[s])*(t[s+1]+t[a+1]),a=s;return r}(t,e,n,i)>0)for(s=e;s<n;s+=i)a=co(s,t[s],t[s+1],a);else for(s=n-i;s>=e;s-=i)a=co(s,t[s],t[s+1],a);return a&&io(a,a.next)&&(ho(a),a=a.next),a}function Va(t,e){if(!t)return t;e||(e=t);let n,i=t;do{if(n=!1,i.steiner||!io(i,i.next)&&0!==no(i.prev,i,i.next))i=i.next;else{if(ho(i),i=e=i.prev,i===i.next)break;n=!0}}while(n||i!==e);return e}function Wa(t,e,n,i,r,s,a){if(!t)return;!a&&s&&function(t,e,n,i){let r=t;do{null===r.z&&(r.z=Ka(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next}while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,function(t){let e,n,i,r,s,a,o,l,c=1;do{for(n=t,t=null,s=null,a=0;n;){for(a++,i=n,o=0,e=0;e<c&&(o++,i=i.nextZ,i);e++);for(l=c;o>0||l>0&&i;)0!==o&&(0===l||!i||n.z<=i.z)?(r=n,n=n.nextZ,o--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(a>1)}(r)}(t,i,r,s);let o,l,c=t;for(;t.prev!==t.next;)if(o=t.prev,l=t.next,s?qa(t,i,r,s):ja(t))e.push(o.i/n),e.push(t.i/n),e.push(l.i/n),ho(t),t=l.next,c=l.next;else if((t=l)===c){a?1===a?Wa(t=Xa(Va(t),e,n),e,n,i,r,s,2):2===a&&Ya(t,e,n,i,r,s):Wa(Va(t),e,n,i,r,s,1);break}}function ja(t){const e=t.prev,n=t,i=t.next;if(no(e,n,i)>=0)return!1;let r=t.next.next;for(;r!==t.prev;){if(to(e.x,e.y,n.x,n.y,i.x,i.y,r.x,r.y)&&no(r.prev,r,r.next)>=0)return!1;r=r.next}return!0}function qa(t,e,n,i){const r=t.prev,s=t,a=t.next;if(no(r,s,a)>=0)return!1;const o=r.x<s.x?r.x<a.x?r.x:a.x:s.x<a.x?s.x:a.x,l=r.y<s.y?r.y<a.y?r.y:a.y:s.y<a.y?s.y:a.y,c=r.x>s.x?r.x>a.x?r.x:a.x:s.x>a.x?s.x:a.x,h=r.y>s.y?r.y>a.y?r.y:a.y:s.y>a.y?s.y:a.y,u=Ka(o,l,e,n,i),d=Ka(c,h,e,n,i);let p=t.prevZ,m=t.nextZ;for(;p&&p.z>=u&&m&&m.z<=d;){if(p!==t.prev&&p!==t.next&&to(r.x,r.y,s.x,s.y,a.x,a.y,p.x,p.y)&&no(p.prev,p,p.next)>=0)return!1;if(p=p.prevZ,m!==t.prev&&m!==t.next&&to(r.x,r.y,s.x,s.y,a.x,a.y,m.x,m.y)&&no(m.prev,m,m.next)>=0)return!1;m=m.nextZ}for(;p&&p.z>=u;){if(p!==t.prev&&p!==t.next&&to(r.x,r.y,s.x,s.y,a.x,a.y,p.x,p.y)&&no(p.prev,p,p.next)>=0)return!1;p=p.prevZ}for(;m&&m.z<=d;){if(m!==t.prev&&m!==t.next&&to(r.x,r.y,s.x,s.y,a.x,a.y,m.x,m.y)&&no(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function Xa(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!io(r,s)&&ro(r,i,i.next,s)&&oo(r,s)&&oo(s,r)&&(e.push(r.i/n),e.push(i.i/n),e.push(s.i/n),ho(i),ho(i.next),i=t=s),i=i.next}while(i!==t);return Va(i)}function Ya(t,e,n,i,r,s){let a=t;do{let t=a.next.next;for(;t!==a.prev;){if(a.i!==t.i&&eo(a,t)){let o=lo(a,t);return a=Va(a,a.next),o=Va(o,o.next),Wa(a,e,n,i,r,s),void Wa(o,e,n,i,r,s)}t=t.next}a=a.next}while(a!==t)}function Za(t,e){return t.x-e.x}function Ja(t,e){if(e=function(t,e){let n=e;const i=t.x,r=t.y;let s,a=-1/0;do{if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){const t=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(t<=i&&t>a){if(a=t,t===i){if(r===n.y)return n;if(r===n.next.y)return n.next}s=n.x<n.next.x?n:n.next}}n=n.next}while(n!==e);if(!s)return null;if(i===a)return s;const o=s,l=s.x,c=s.y;let h,u=1/0;n=s;do{i>=n.x&&n.x>=l&&i!==n.x&&to(r<c?i:a,r,l,c,r<c?a:i,r,n.x,n.y)&&(h=Math.abs(r-n.y)/(i-n.x),oo(n,t)&&(h<u||h===u&&(n.x>s.x||n.x===s.x&&Qa(s,n)))&&(s=n,u=h)),n=n.next}while(n!==o);return s}(t,e)){const n=lo(e,t);Va(e,e.next),Va(n,n.next)}}function Qa(t,e){return no(t.prev,t,e.prev)<0&&no(e.next,t,t.next)<0}function Ka(t,e,n,i,r){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-n)*r)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-i)*r)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function $a(t){let e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function to(t,e,n,i,r,s,a,o){return(r-a)*(e-o)-(t-a)*(s-o)>=0&&(t-a)*(i-o)-(n-a)*(e-o)>=0&&(n-a)*(s-o)-(r-a)*(i-o)>=0}function eo(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&ro(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(oo(t,e)&&oo(e,t)&&function(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do{n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next}while(n!==t);return i}(t,e)&&(no(t.prev,t,e.prev)||no(t,e.prev,e))||io(t,e)&&no(t.prev,t,t.next)>0&&no(e.prev,e,e.next)>0)}function no(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function io(t,e){return t.x===e.x&&t.y===e.y}function ro(t,e,n,i){const r=ao(no(t,e,n)),s=ao(no(t,e,i)),a=ao(no(n,i,t)),o=ao(no(n,i,e));return r!==s&&a!==o||(!(0!==r||!so(t,n,e))||(!(0!==s||!so(t,i,e))||(!(0!==a||!so(n,t,i))||!(0!==o||!so(n,e,i)))))}function so(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function ao(t){return t>0?1:t<0?-1:0}function oo(t,e){return no(t.prev,t,t.next)<0?no(t,e,t.next)>=0&&no(t,t.prev,e)>=0:no(t,e,t.prev)<0||no(t,t.next,e)<0}function lo(t,e){const n=new uo(t.i,t.x,t.y),i=new uo(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function co(t,e,n,i){const r=new uo(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ho(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function uo(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}class po{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return.5*n}static isClockWise(t){return po.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];mo(t),fo(n,t);let s=t.length;e.forEach(mo);for(let t=0;t<e.length;t++)i.push(s),s+=e[t].length,fo(n,e[t]);const a=Ua(n,i);for(let t=0;t<a.length;t+=3)r.push(a.slice(t,t+3));return r}}function mo(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function fo(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class go extends En{constructor(t,e){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let e=0,n=t.length;e<n;e++){s(t[e])}function s(t){const s=[],a=void 0!==e.curveSegments?e.curveSegments:12,o=void 0!==e.steps?e.steps:1;let l=void 0!==e.depth?e.depth:100,c=void 0===e.bevelEnabled||e.bevelEnabled,h=void 0!==e.bevelThickness?e.bevelThickness:6,u=void 0!==e.bevelSize?e.bevelSize:h-2,d=void 0!==e.bevelOffset?e.bevelOffset:0,p=void 0!==e.bevelSegments?e.bevelSegments:3;const m=e.extrudePath,f=void 0!==e.UVGenerator?e.UVGenerator:vo;void 0!==e.amount&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),l=e.amount);let g,v,y,x,_,w=!1;m&&(g=m.getSpacedPoints(o),w=!0,c=!1,v=m.computeFrenetFrames(o,!1),y=new Lt,x=new Lt,_=new Lt),c||(p=0,h=0,u=0,d=0);const b=t.extractPoints(a);let M=b.shape;const S=b.holes;if(!po.isClockWise(M)){M=M.reverse();for(let t=0,e=S.length;t<e;t++){const e=S[t];po.isClockWise(e)&&(S[t]=e.reverse())}}const T=po.triangulateShape(M,S),E=M;for(let t=0,e=S.length;t<e;t++){const e=S[t];M=M.concat(e)}function A(t,e,n){return e||console.error("THREE.ExtrudeGeometry: vec does not exist"),e.clone().multiplyScalar(n).add(t)}const L=M.length,R=T.length;function C(t,e,n){let i,r,s;const a=t.x-e.x,o=t.y-e.y,l=n.x-t.x,c=n.y-t.y,h=a*a+o*o,u=a*c-o*l;if(Math.abs(u)>Number.EPSILON){const u=Math.sqrt(h),d=Math.sqrt(l*l+c*c),p=e.x-o/u,m=e.y+a/u,f=((n.x-c/d-p)*c-(n.y+l/d-m)*l)/(a*c-o*l);i=p+a*f-t.x,r=m+o*f-t.y;const g=i*i+r*r;if(g<=2)return new vt(i,r);s=Math.sqrt(g/2)}else{let t=!1;a>Number.EPSILON?l>Number.EPSILON&&(t=!0):a<-Number.EPSILON?l<-Number.EPSILON&&(t=!0):Math.sign(o)===Math.sign(c)&&(t=!0),t?(i=-o,r=a,s=Math.sqrt(h)):(i=a,r=o,s=Math.sqrt(h/2))}return new vt(i/s,r/s)}const P=[];for(let t=0,e=E.length,n=e-1,i=t+1;t<e;t++,n++,i++)n===e&&(n=0),i===e&&(i=0),P[t]=C(E[t],E[n],E[i]);const D=[];let I,N=P.concat();for(let t=0,e=S.length;t<e;t++){const e=S[t];I=[];for(let t=0,n=e.length,i=n-1,r=t+1;t<n;t++,i++,r++)i===n&&(i=0),r===n&&(r=0),I[t]=C(e[t],e[i],e[r]);D.push(I),N=N.concat(I)}for(let t=0;t<p;t++){const e=t/p,n=h*Math.cos(e*Math.PI/2),i=u*Math.sin(e*Math.PI/2)+d;for(let t=0,e=E.length;t<e;t++){const e=A(E[t],P[t],i);F(e.x,e.y,-n)}for(let t=0,e=S.length;t<e;t++){const e=S[t];I=D[t];for(let t=0,r=e.length;t<r;t++){const r=A(e[t],I[t],i);F(r.x,r.y,-n)}}}const B=u+d;for(let t=0;t<L;t++){const e=c?A(M[t],N[t],B):M[t];w?(x.copy(v.normals[0]).multiplyScalar(e.x),y.copy(v.binormals[0]).multiplyScalar(e.y),_.copy(g[0]).add(x).add(y),F(_.x,_.y,_.z)):F(e.x,e.y,0)}for(let t=1;t<=o;t++)for(let e=0;e<L;e++){const n=c?A(M[e],N[e],B):M[e];w?(x.copy(v.normals[t]).multiplyScalar(n.x),y.copy(v.binormals[t]).multiplyScalar(n.y),_.copy(g[t]).add(x).add(y),F(_.x,_.y,_.z)):F(n.x,n.y,l/o*t)}for(let t=p-1;t>=0;t--){const e=t/p,n=h*Math.cos(e*Math.PI/2),i=u*Math.sin(e*Math.PI/2)+d;for(let t=0,e=E.length;t<e;t++){const e=A(E[t],P[t],i);F(e.x,e.y,l+n)}for(let t=0,e=S.length;t<e;t++){const e=S[t];I=D[t];for(let t=0,r=e.length;t<r;t++){const r=A(e[t],I[t],i);w?F(r.x,r.y+g[o-1].y,g[o-1].x+n):F(r.x,r.y,l+n)}}}function z(t,e){let n=t.length;for(;--n>=0;){const i=n;let r=n-1;r<0&&(r=t.length-1);for(let t=0,n=o+2*p;t<n;t++){const n=L*t,s=L*(t+1);H(e+i+n,e+r+n,e+r+s,e+i+s)}}}function F(t,e,n){s.push(t),s.push(e),s.push(n)}function O(t,e,r){G(t),G(e),G(r);const s=i.length/3,a=f.generateTopUV(n,i,s-3,s-2,s-1);U(a[0]),U(a[1]),U(a[2])}function H(t,e,r,s){G(t),G(e),G(s),G(e),G(r),G(s);const a=i.length/3,o=f.generateSideWallUV(n,i,a-6,a-3,a-2,a-1);U(o[0]),U(o[1]),U(o[3]),U(o[1]),U(o[2]),U(o[3])}function G(t){i.push(s[3*t+0]),i.push(s[3*t+1]),i.push(s[3*t+2])}function U(t){r.push(t.x),r.push(t.y)}!function(){const t=i.length/3;if(c){let t=0,e=L*t;for(let t=0;t<R;t++){const n=T[t];O(n[2]+e,n[1]+e,n[0]+e)}t=o+2*p,e=L*t;for(let t=0;t<R;t++){const n=T[t];O(n[0]+e,n[1]+e,n[2]+e)}}else{for(let t=0;t<R;t++){const e=T[t];O(e[2],e[1],e[0])}for(let t=0;t<R;t++){const e=T[t];O(e[0]+L*o,e[1]+L*o,e[2]+L*o)}}n.addGroup(t,i.length/3-t,0)}(),function(){const t=i.length/3;let e=0;z(E,e),e+=E.length;for(let t=0,n=S.length;t<n;t++){const n=S[t];z(n,e),e+=n.length}n.addGroup(t,i.length/3-t,1)}()}this.setAttribute("position",new mn(i,3)),this.setAttribute("uv",new mn(r,2)),this.computeVertexNormals()}toJSON(){const t=En.prototype.toJSON.call(this);return function(t,e,n){if(n.shapes=[],Array.isArray(t))for(let e=0,i=t.length;e<i;e++){const i=t[e];n.shapes.push(i.uuid)}else n.shapes.push(t.uuid);void 0!==e.extrudePath&&(n.options.extrudePath=e.extrudePath.toJSON());return n}(this.parameters.shapes,this.parameters.options,t)}}const vo={generateTopUV:function(t,e,n,i,r){const s=e[3*n],a=e[3*n+1],o=e[3*i],l=e[3*i+1],c=e[3*r],h=e[3*r+1];return[new vt(s,a),new vt(o,l),new vt(c,h)]},generateSideWallUV:function(t,e,n,i,r,s){const a=e[3*n],o=e[3*n+1],l=e[3*n+2],c=e[3*i],h=e[3*i+1],u=e[3*i+2],d=e[3*r],p=e[3*r+1],m=e[3*r+2],f=e[3*s],g=e[3*s+1],v=e[3*s+2];return Math.abs(o-h)<.01?[new vt(a,1-l),new vt(c,1-u),new vt(d,1-m),new vt(f,1-v)]:[new vt(o,1-l),new vt(h,1-u),new vt(p,1-m),new vt(g,1-v)]}};class yo extends Na{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}}class xo extends En{constructor(t,e=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ht(i,0,2*Math.PI);const r=[],s=[],a=[],o=1/e,l=new Lt,c=new vt;for(let r=0;r<=e;r++){const h=n+r*o*i,u=Math.sin(h),d=Math.cos(h);for(let n=0;n<=t.length-1;n++)l.x=t[n].x*u,l.y=t[n].y,l.z=t[n].x*d,s.push(l.x,l.y,l.z),c.x=r/e,c.y=n/(t.length-1),a.push(c.x,c.y)}for(let n=0;n<e;n++)for(let e=0;e<t.length-1;e++){const i=e+n*t.length,s=i,a=i+t.length,o=i+t.length+1,l=i+1;r.push(s,a,l),r.push(a,o,l)}if(this.setIndex(r),this.setAttribute("position",new mn(s,3)),this.setAttribute("uv",new mn(a,2)),this.computeVertexNormals(),i===2*Math.PI){const n=this.attributes.normal.array,i=new Lt,r=new Lt,s=new Lt,a=e*t.length*3;for(let e=0,o=0;e<t.length;e++,o+=3)i.x=n[o+0],i.y=n[o+1],i.z=n[o+2],r.x=n[a+o+0],r.y=n[a+o+1],r.z=n[a+o+2],s.addVectors(i,r).normalize(),n[o+0]=n[a+o+0]=s.x,n[o+1]=n[a+o+1]=s.y,n[o+2]=n[a+o+2]=s.z}}}class _o extends Na{constructor(t=1,e=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}}class wo extends En{constructor(t,e,n){super(),this.type="ParametricGeometry",this.parameters={func:t,slices:e,stacks:n};const i=[],r=[],s=[],a=[],o=1e-5,l=new Lt,c=new Lt,h=new Lt,u=new Lt,d=new Lt;t.length<3&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");const p=e+1;for(let i=0;i<=n;i++){const p=i/n;for(let n=0;n<=e;n++){const i=n/e;t(i,p,c),r.push(c.x,c.y,c.z),i-o>=0?(t(i-o,p,h),u.subVectors(c,h)):(t(i+o,p,h),u.subVectors(h,c)),p-o>=0?(t(i,p-o,h),d.subVectors(c,h)):(t(i,p+o,h),d.subVectors(h,c)),l.crossVectors(u,d).normalize(),s.push(l.x,l.y,l.z),a.push(i,p)}}for(let t=0;t<n;t++)for(let n=0;n<e;n++){const e=t*p+n,r=t*p+n+1,s=(t+1)*p+n+1,a=(t+1)*p+n;i.push(e,r,a),i.push(r,s,a)}this.setIndex(i),this.setAttribute("position",new mn(r,3)),this.setAttribute("normal",new mn(s,3)),this.setAttribute("uv",new mn(a,2))}}class bo extends En{constructor(t=.5,e=1,n=8,i=1,r=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:s},n=Math.max(3,n);const a=[],o=[],l=[],c=[];let h=t;const u=(e-t)/(i=Math.max(1,i)),d=new Lt,p=new vt;for(let t=0;t<=i;t++){for(let t=0;t<=n;t++){const i=r+t/n*s;d.x=h*Math.cos(i),d.y=h*Math.sin(i),o.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,c.push(p.x,p.y)}h+=u}for(let t=0;t<i;t++){const e=t*(n+1);for(let t=0;t<n;t++){const i=t+e,r=i,s=i+n+1,o=i+n+2,l=i+1;a.push(r,s,l),a.push(s,o,l)}}this.setIndex(a),this.setAttribute("position",new mn(o,3)),this.setAttribute("normal",new mn(l,3)),this.setAttribute("uv",new mn(c,2))}}class Mo extends En{constructor(t,e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],s=[];let a=0,o=0;if(!1===Array.isArray(t))l(t);else for(let e=0;e<t.length;e++)l(t[e]),this.addGroup(a,o,e),a+=o,o=0;function l(t){const a=i.length/3,l=t.extractPoints(e);let c=l.shape;const h=l.holes;!1===po.isClockWise(c)&&(c=c.reverse());for(let t=0,e=h.length;t<e;t++){const e=h[t];!0===po.isClockWise(e)&&(h[t]=e.reverse())}const u=po.triangulateShape(c,h);for(let t=0,e=h.length;t<e;t++){const e=h[t];c=c.concat(e)}for(let t=0,e=c.length;t<e;t++){const e=c[t];i.push(e.x,e.y,0),r.push(0,0,1),s.push(e.x,e.y)}for(let t=0,e=u.length;t<e;t++){const e=u[t],i=e[0]+a,r=e[1]+a,s=e[2]+a;n.push(i,r,s),o+=3}}this.setIndex(n),this.setAttribute("position",new mn(i,3)),this.setAttribute("normal",new mn(r,3)),this.setAttribute("uv",new mn(s,2))}toJSON(){const t=En.prototype.toJSON.call(this);return function(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const i=t[n];e.shapes.push(i.uuid)}else e.shapes.push(t.uuid);return e}(this.parameters.shapes,t)}}class So extends En{constructor(t=1,e=8,n=6,i=0,r=2*Math.PI,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const o=Math.min(s+a,Math.PI);let l=0;const c=[],h=new Lt,u=new Lt,d=[],p=[],m=[],f=[];for(let d=0;d<=n;d++){const g=[],v=d/n;let y=0;0==d&&0==s?y=.5/e:d==n&&o==Math.PI&&(y=-.5/e);for(let n=0;n<=e;n++){const o=n/e;h.x=-t*Math.cos(i+o*r)*Math.sin(s+v*a),h.y=t*Math.cos(s+v*a),h.z=t*Math.sin(i+o*r)*Math.sin(s+v*a),p.push(h.x,h.y,h.z),u.copy(h).normalize(),m.push(u.x,u.y,u.z),f.push(o+y,1-v),g.push(l++)}c.push(g)}for(let t=0;t<n;t++)for(let i=0;i<e;i++){const e=c[t][i+1],r=c[t][i],a=c[t+1][i],l=c[t+1][i+1];(0!==t||s>0)&&d.push(e,r,l),(t!==n-1||o<Math.PI)&&d.push(r,a,l)}this.setIndex(d),this.setAttribute("position",new mn(p,3)),this.setAttribute("normal",new mn(m,3)),this.setAttribute("uv",new mn(f,2))}}class To extends Na{constructor(t=1,e=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}}class Eo extends go{constructor(t,e={}){const n=e.font;if(!n||!n.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new En;const i=n.generateShapes(t,e.size);e.depth=void 0!==e.height?e.height:50,void 0===e.bevelThickness&&(e.bevelThickness=10),void 0===e.bevelSize&&(e.bevelSize=8),void 0===e.bevelEnabled&&(e.bevelEnabled=!1),super(i,e),this.type="TextGeometry"}}class Ao extends En{constructor(t=1,e=.4,n=8,i=6,r=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const s=[],a=[],o=[],l=[],c=new Lt,h=new Lt,u=new Lt;for(let s=0;s<=n;s++)for(let d=0;d<=i;d++){const p=d/i*r,m=s/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(p),h.y=(t+e*Math.cos(m))*Math.sin(p),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),c.x=t*Math.cos(p),c.y=t*Math.sin(p),u.subVectors(h,c).normalize(),o.push(u.x,u.y,u.z),l.push(d/i),l.push(s/n)}for(let t=1;t<=n;t++)for(let e=1;e<=i;e++){const n=(i+1)*t+e-1,r=(i+1)*(t-1)+e-1,a=(i+1)*(t-1)+e,o=(i+1)*t+e;s.push(n,r,o),s.push(r,a,o)}this.setIndex(s),this.setAttribute("position",new mn(a,3)),this.setAttribute("normal",new mn(o,3)),this.setAttribute("uv",new mn(l,2))}}class Lo extends En{constructor(t=1,e=.4,n=64,i=8,r=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new Lt,u=new Lt,d=new Lt,p=new Lt,m=new Lt,f=new Lt,g=new Lt;for(let a=0;a<=n;++a){const y=a/n*r*Math.PI*2;v(y,r,s,t,d),v(y+.01,r,s,t,p),f.subVectors(p,d),g.addVectors(p,d),m.crossVectors(f,g),g.crossVectors(m,f),m.normalize(),g.normalize();for(let t=0;t<=i;++t){const r=t/i*Math.PI*2,s=-e*Math.cos(r),p=e*Math.sin(r);h.x=d.x+(s*g.x+p*m.x),h.y=d.y+(s*g.y+p*m.y),h.z=d.z+(s*g.z+p*m.z),o.push(h.x,h.y,h.z),u.subVectors(h,d).normalize(),l.push(u.x,u.y,u.z),c.push(a/n),c.push(t/i)}}for(let t=1;t<=n;t++)for(let e=1;e<=i;e++){const n=(i+1)*(t-1)+(e-1),r=(i+1)*t+(e-1),s=(i+1)*t+e,o=(i+1)*(t-1)+e;a.push(n,r,o),a.push(r,s,o)}function v(t,e,n,i,r){const s=Math.cos(t),a=Math.sin(t),o=n/e*t,l=Math.cos(o);r.x=i*(2+l)*.5*s,r.y=i*(2+l)*a*.5,r.z=i*Math.sin(o)*.5}this.setIndex(a),this.setAttribute("position",new mn(o,3)),this.setAttribute("normal",new mn(l,3)),this.setAttribute("uv",new mn(c,2))}}class Ro extends En{constructor(t,e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const s=t.computeFrenetFrames(e,r);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;const a=new Lt,o=new Lt,l=new vt;let c=new Lt;const h=[],u=[],d=[],p=[];function m(r){c=t.getPointAt(r/e,c);const l=s.normals[r],d=s.binormals[r];for(let t=0;t<=i;t++){const e=t/i*Math.PI*2,r=Math.sin(e),s=-Math.cos(e);o.x=s*l.x+r*d.x,o.y=s*l.y+r*d.y,o.z=s*l.z+r*d.z,o.normalize(),u.push(o.x,o.y,o.z),a.x=c.x+n*o.x,a.y=c.y+n*o.y,a.z=c.z+n*o.z,h.push(a.x,a.y,a.z)}}!function(){for(let t=0;t<e;t++)m(t);m(!1===r?e:0),function(){for(let t=0;t<=e;t++)for(let n=0;n<=i;n++)l.x=t/e,l.y=n/i,d.push(l.x,l.y)}(),function(){for(let t=1;t<=e;t++)for(let e=1;e<=i;e++){const n=(i+1)*(t-1)+(e-1),r=(i+1)*t+(e-1),s=(i+1)*t+e,a=(i+1)*(t-1)+e;p.push(n,r,a),p.push(r,s,a)}}()}(),this.setIndex(p),this.setAttribute("position",new mn(h,3)),this.setAttribute("normal",new mn(u,3)),this.setAttribute("uv",new mn(d,2))}toJSON(){const t=En.prototype.toJSON.call(this);return t.path=this.parameters.path.toJSON(),t}}class Co extends En{constructor(t){if(super(),this.type="WireframeGeometry",!0===t.isGeometry)return void console.error("THREE.WireframeGeometry no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");const e=[],n=[0,0],i={},r=new Lt;if(null!==t.index){const s=t.attributes.position,a=t.index;let o=t.groups;0===o.length&&(o=[{start:0,count:a.count,materialIndex:0}]);for(let t=0,e=o.length;t<e;++t){const e=o[t],r=e.start;for(let t=r,s=r+e.count;t<s;t+=3)for(let e=0;e<3;e++){const r=a.getX(t+e),s=a.getX(t+(e+1)%3);n[0]=Math.min(r,s),n[1]=Math.max(r,s);const o=n[0]+","+n[1];void 0===i[o]&&(i[o]={index1:n[0],index2:n[1]})}}for(const t in i){const n=i[t];r.fromBufferAttribute(s,n.index1),e.push(r.x,r.y,r.z),r.fromBufferAttribute(s,n.index2),e.push(r.x,r.y,r.z)}}else{const n=t.attributes.position;for(let t=0,i=n.count/3;t<i;t++)for(let i=0;i<3;i++){const s=3*t+i;r.fromBufferAttribute(n,s),e.push(r.x,r.y,r.z);const a=3*t+(i+1)%3;r.fromBufferAttribute(n,a),e.push(r.x,r.y,r.z)}}this.setAttribute("position",new mn(e,3))}}var Po=Object.freeze({__proto__:null,BoxGeometry:qn,BoxBufferGeometry:qn,CircleGeometry:Pa,CircleBufferGeometry:Pa,ConeGeometry:Ia,ConeBufferGeometry:Ia,CylinderGeometry:Da,CylinderBufferGeometry:Da,DodecahedronGeometry:Ba,DodecahedronBufferGeometry:Ba,EdgesGeometry:Ga,ExtrudeGeometry:go,ExtrudeBufferGeometry:go,IcosahedronGeometry:yo,IcosahedronBufferGeometry:yo,LatheGeometry:xo,LatheBufferGeometry:xo,OctahedronGeometry:_o,OctahedronBufferGeometry:_o,ParametricGeometry:wo,ParametricBufferGeometry:wo,PlaneGeometry:ci,PlaneBufferGeometry:ci,PolyhedronGeometry:Na,PolyhedronBufferGeometry:Na,RingGeometry:bo,RingBufferGeometry:bo,ShapeGeometry:Mo,ShapeBufferGeometry:Mo,SphereGeometry:So,SphereBufferGeometry:So,TetrahedronGeometry:To,TetrahedronBufferGeometry:To,TextGeometry:Eo,TextBufferGeometry:Eo,TorusGeometry:Ao,TorusBufferGeometry:Ao,TorusKnotGeometry:Lo,TorusKnotBufferGeometry:Lo,TubeGeometry:Ro,TubeBufferGeometry:Ro,WireframeGeometry:Co});class Do extends Xe{constructor(t){super(),this.type="ShadowMaterial",this.color=new tn(0),this.transparent=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this}}Do.prototype.isShadowMaterial=!0;class Io extends Jn{constructor(t){super(t),this.type="RawShaderMaterial"}}Io.prototype.isRawShaderMaterial=!0;class No extends Xe{constructor(t){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new tn(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.vertexTangents=!1,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this.vertexTangents=t.vertexTangents,this}}No.prototype.isMeshStandardMaterial=!0;class Bo extends No{constructor(t){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new vt(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=ht(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.reflectivity=t.reflectivity,t.sheen?this.sheen=(this.sheen||new tn).copy(t.sheen):this.sheen=null,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this}}Bo.prototype.isMeshPhysicalMaterial=!0;class zo extends Xe{constructor(t){super(),this.type="MeshPhongMaterial",this.color=new tn(16777215),this.specular=new tn(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}zo.prototype.isMeshPhongMaterial=!0;class Fo extends Xe{constructor(t){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new tn(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this}}Fo.prototype.isMeshToonMaterial=!0;class Oo extends Xe{constructor(t){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}Oo.prototype.isMeshNormalMaterial=!0;class Ho extends Xe{constructor(t){super(),this.type="MeshLambertMaterial",this.color=new tn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this}}Ho.prototype.isMeshLambertMaterial=!0;class Go extends Xe{constructor(t){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new tn(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.flatShading=t.flatShading,this}}Go.prototype.isMeshMatcapMaterial=!0;class Uo extends ca{constructor(t){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}Uo.prototype.isLineDashedMaterial=!0;var ko=Object.freeze({__proto__:null,ShadowMaterial:Do,SpriteMaterial:Rs,RawShaderMaterial:Io,ShaderMaterial:Jn,PointsMaterial:_a,MeshPhysicalMaterial:Bo,MeshStandardMaterial:No,MeshPhongMaterial:zo,MeshToonMaterial:Fo,MeshNormalMaterial:Oo,MeshLambertMaterial:Ho,MeshDepthMaterial:cs,MeshDistanceMaterial:hs,MeshBasicMaterial:en,MeshMatcapMaterial:Go,LineDashedMaterial:Uo,LineBasicMaterial:ca,Material:Xe});const Vo={arraySlice:function(t,e,n){return Vo.isTypedArray(t)?new t.constructor(t.subarray(e,void 0!==n?n:t.length)):t.slice(e,n)},convertArray:function(t,e,n){return!t||!n&&t.constructor===e?t:"number"==typeof e.BYTES_PER_ELEMENT?new e(t):Array.prototype.slice.call(t)},isTypedArray:function(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)},getKeyframeOrder:function(t){const e=t.length,n=new Array(e);for(let t=0;t!==e;++t)n[t]=t;return n.sort((function(e,n){return t[e]-t[n]})),n},sortedArray:function(t,e,n){const i=t.length,r=new t.constructor(i);for(let s=0,a=0;a!==i;++s){const i=n[s]*e;for(let n=0;n!==e;++n)r[a++]=t[i+n]}return r},flattenJSON:function(t,e,n,i){let r=1,s=t[0];for(;void 0!==s&&void 0===s[i];)s=t[r++];if(void 0===s)return;let a=s[i];if(void 0!==a)if(Array.isArray(a))do{a=s[i],void 0!==a&&(e.push(s.time),n.push.apply(n,a)),s=t[r++]}while(void 0!==s);else if(void 0!==a.toArray)do{a=s[i],void 0!==a&&(e.push(s.time),a.toArray(n,n.length)),s=t[r++]}while(void 0!==s);else do{a=s[i],void 0!==a&&(e.push(s.time),n.push(a)),s=t[r++]}while(void 0!==s)},subclip:function(t,e,n,i,r=30){const s=t.clone();s.name=e;const a=[];for(let t=0;t<s.tracks.length;++t){const e=s.tracks[t],o=e.getValueSize(),l=[],c=[];for(let t=0;t<e.times.length;++t){const s=e.times[t]*r;if(!(s<n||s>=i)){l.push(e.times[t]);for(let n=0;n<o;++n)c.push(e.values[t*o+n])}}0!==l.length&&(e.times=Vo.convertArray(l,e.times.constructor),e.values=Vo.convertArray(c,e.values.constructor),a.push(e))}s.tracks=a;let o=1/0;for(let t=0;t<s.tracks.length;++t)o>s.tracks[t].times[0]&&(o=s.tracks[t].times[0]);for(let t=0;t<s.tracks.length;++t)s.tracks[t].shift(-1*o);return s.resetDuration(),s},makeClipAdditive:function(t,e=0,n=t,i=30){i<=0&&(i=30);const r=n.tracks.length,s=e/i;for(let e=0;e<r;++e){const i=n.tracks[e],r=i.ValueTypeName;if("bool"===r||"string"===r)continue;const a=t.tracks.find((function(t){return t.name===i.name&&t.ValueTypeName===r}));if(void 0===a)continue;let o=0;const l=i.getValueSize();i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(o=l/3);let c=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(c=h/3);const u=i.times.length-1;let d;if(s<=i.times[0]){const t=o,e=l-o;d=Vo.arraySlice(i.values,t,e)}else if(s>=i.times[u]){const t=u*l+o,e=t+l-o;d=Vo.arraySlice(i.values,t,e)}else{const t=i.createInterpolant(),e=o,n=l-o;t.evaluate(s),d=Vo.arraySlice(t.resultBuffer,e,n)}if("quaternion"===r){(new At).fromArray(d).normalize().conjugate().toArray(d)}const p=a.times.length;for(let t=0;t<p;++t){const e=t*h+c;if("quaternion"===r)At.multiplyQuaternionsFlat(a.values,e,d,0,a.values,e);else{const t=h-2*c;for(let n=0;n<t;++n)a.values[e+n]-=d[n]}}}return t.blendMode=q,t}};class Wo{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=void 0!==i?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let s;n:{i:if(!(t<i)){for(let s=n+2;;){if(void 0===i){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,t,r)}if(n===s)break;if(r=i,i=e[++n],t<i)break e}s=e.length;break n}if(t>=r)break t;{const a=e[1];t<a&&(n=2,r=a);for(let s=n-2;;){if(void 0===r)return this._cachedIndex=0,this.beforeStart_(0,t,i);if(n===s)break;if(i=r,r=e[--n-1],t>=r)break e}s=n,n=0}}for(;n<s;){const i=n+s>>>1;t<e[i]?s=i:n=i+1}if(i=e[n],r=e[n-1],void 0===r)return this._cachedIndex=0,this.beforeStart_(0,t,i);if(void 0===i)return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,r,t)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let t=0;t!==i;++t)e[t]=n[r+t];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}Wo.prototype.beforeStart_=Wo.prototype.copySampleValue_,Wo.prototype.afterEnd_=Wo.prototype.copySampleValue_;class jo extends Wo{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:k,endingEnd:k}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,s=t+1,a=i[r],o=i[s];if(void 0===a)switch(this.getSettings_().endingStart){case V:r=t,a=2*e-n;break;case W:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(void 0===o)switch(this.getSettings_().endingEnd){case V:s=t,o=2*n-e;break;case W:s=1,o=n+i[1]-i[0];break;default:s=t-1,o=e}const l=.5*(n-e),c=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(o-n),this._offsetPrev=r*c,this._offsetNext=s*c}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),m=p*p,f=m*p,g=-u*f+2*u*m-u*p,v=(1+u)*f+(-1.5-2*u)*m+(-.5+u)*p+1,y=(-1-d)*f+(1.5+d)*m+.5*p,x=d*f-d*m;for(let t=0;t!==a;++t)r[t]=g*s[c+t]+v*s[l+t]+y*s[o+t]+x*s[h+t];return r}}class qo extends Wo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=(n-e)/(i-e),h=1-c;for(let t=0;t!==a;++t)r[t]=s[l+t]*h+s[o+t]*c;return r}}class Xo extends Wo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Yo{constructor(t,e,n,i){if(void 0===t)throw new Error("THREE.KeyframeTrack: track name is undefined");if(void 0===e||0===e.length)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Vo.convertArray(e,this.TimeBufferType),this.values=Vo.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Vo.convertArray(t.times,Array),values:Vo.convertArray(t.values,Array)};const e=t.getInterpolation();e!==t.DefaultInterpolation&&(n.interpolation=e)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new qo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new jo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case H:e=this.InterpolantFactoryMethodDiscrete;break;case G:e=this.InterpolantFactoryMethodLinear;break;case U:e=this.InterpolantFactoryMethodSmooth}if(void 0===e){const e="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant){if(t===this.DefaultInterpolation)throw new Error(e);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",e),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return H;case this.InterpolantFactoryMethodLinear:return G;case this.InterpolantFactoryMethodSmooth:return U}}getValueSize(){return this.values.length/this.times.length}shift(t){if(0!==t){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(1!==t){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,s=i-1;for(;r!==i&&n[r]<t;)++r;for(;-1!==s&&n[s]>e;)--s;if(++s,0!==r||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);const t=this.getValueSize();this.times=Vo.arraySlice(n,r,s),this.values=Vo.arraySlice(this.values,r*t,s*t)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;0===r&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let e=0;e!==r;e++){const i=n[e];if("number"==typeof i&&isNaN(i)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,e,i),t=!1;break}if(null!==s&&s>i){console.error("THREE.KeyframeTrack: Out of order keys.",this,e,i,s),t=!1;break}s=i}if(void 0!==i&&Vo.isTypedArray(i))for(let e=0,n=i.length;e!==n;++e){const n=i[e];if(isNaN(n)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,e,n),t=!1;break}}return t}optimize(){const t=Vo.arraySlice(this.times),e=Vo.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===U,r=t.length-1;let s=1;for(let a=1;a<r;++a){let r=!1;const o=t[a];if(o!==t[a+1]&&(1!==a||o!==t[0]))if(i)r=!0;else{const t=a*n,i=t-n,s=t+n;for(let a=0;a!==n;++a){const n=e[t+a];if(n!==e[i+a]||n!==e[s+a]){r=!0;break}}}if(r){if(a!==s){t[s]=t[a];const i=a*n,r=s*n;for(let t=0;t!==n;++t)e[r+t]=e[i+t]}++s}}if(r>0){t[s]=t[r];for(let t=r*n,i=s*n,a=0;a!==n;++a)e[i+a]=e[t+a];++s}return s!==t.length?(this.times=Vo.arraySlice(t,0,s),this.values=Vo.arraySlice(e,0,s*n)):(this.times=t,this.values=e),this}clone(){const t=Vo.arraySlice(this.times,0),e=Vo.arraySlice(this.values,0),n=new(0,this.constructor)(this.name,t,e);return n.createInterpolant=this.createInterpolant,n}}Yo.prototype.TimeBufferType=Float32Array,Yo.prototype.ValueBufferType=Float32Array,Yo.prototype.DefaultInterpolation=G;class Zo extends Yo{}Zo.prototype.ValueTypeName="bool",Zo.prototype.ValueBufferType=Array,Zo.prototype.DefaultInterpolation=H,Zo.prototype.InterpolantFactoryMethodLinear=void 0,Zo.prototype.InterpolantFactoryMethodSmooth=void 0;class Jo extends Yo{}Jo.prototype.ValueTypeName="color";class Qo extends Yo{}Qo.prototype.ValueTypeName="number";class Ko extends Wo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=(n-e)/(i-e);let l=t*a;for(let t=l+a;l!==t;l+=4)At.slerpFlat(r,0,s,l-a,s,l,o);return r}}class $o extends Yo{InterpolantFactoryMethodLinear(t){return new Ko(this.times,this.values,this.getValueSize(),t)}}$o.prototype.ValueTypeName="quaternion",$o.prototype.DefaultInterpolation=G,$o.prototype.InterpolantFactoryMethodSmooth=void 0;class tl extends Yo{}tl.prototype.ValueTypeName="string",tl.prototype.ValueBufferType=Array,tl.prototype.DefaultInterpolation=H,tl.prototype.InterpolantFactoryMethodLinear=void 0,tl.prototype.InterpolantFactoryMethodSmooth=void 0;class el extends Yo{}el.prototype.ValueTypeName="vector";class nl{constructor(t,e=-1,n,i=2500){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=ct(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let t=0,r=n.length;t!==r;++t)e.push(il(n[t]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let t=0,i=n.length;t!==i;++t)e.push(Yo.toJSON(n[t]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,s=[];for(let t=0;t<r;t++){let a=[],o=[];a.push((t+r-1)%r,t,(t+1)%r),o.push(0,1,0);const l=Vo.getKeyframeOrder(a);a=Vo.sortedArray(a,1,l),o=Vo.sortedArray(o,1,l),i||0!==a[0]||(a.push(r),o.push(o[0])),s.push(new Qo(".morphTargetInfluences["+e[t].name+"]",a,o).scale(1/n))}return new this(t,-1,s)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const e=t;n=e.geometry&&e.geometry.animations||e.animations}for(let t=0;t<n.length;t++)if(n[t].name===e)return n[t];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let e=0,n=t.length;e<n;e++){const n=t[e],s=n.name.match(r);if(s&&s.length>1){const t=s[1];let e=i[t];e||(i[t]=e=[]),e.push(n)}}const s=[];for(const t in i)s.push(this.CreateFromMorphTargetSequence(t,i[t],e,n));return s}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(t,e,n,i,r){if(0!==n.length){const s=[],a=[];Vo.flattenJSON(n,s,a,i),0!==s.length&&r.push(new t(e,s,a))}},i=[],r=t.name||"default",s=t.fps||30,a=t.blendMode;let o=t.length||-1;const l=t.hierarchy||[];for(let t=0;t<l.length;t++){const r=l[t].keys;if(r&&0!==r.length)if(r[0].morphTargets){const t={};let e;for(e=0;e<r.length;e++)if(r[e].morphTargets)for(let n=0;n<r[e].morphTargets.length;n++)t[r[e].morphTargets[n]]=-1;for(const n in t){const t=[],s=[];for(let i=0;i!==r[e].morphTargets.length;++i){const i=r[e];t.push(i.time),s.push(i.morphTarget===n?1:0)}i.push(new Qo(".morphTargetInfluence["+n+"]",t,s))}o=t.length*(s||1)}else{const s=".bones["+e[t].name+"]";n(el,s+".position",r,"pos",i),n($o,s+".quaternion",r,"rot",i),n(el,s+".scale",r,"scl",i)}}if(0===i.length)return null;return new this(r,o,i,a)}resetDuration(){let t=0;for(let e=0,n=this.tracks.length;e!==n;++e){const n=this.tracks[e];t=Math.max(t,n.times[n.times.length-1])}return this.duration=t,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function il(t){if(void 0===t.type)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qo;case"vector":case"vector2":case"vector3":case"vector4":return el;case"color":return Jo;case"quaternion":return $o;case"bool":case"boolean":return Zo;case"string":return tl}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}(t.type);if(void 0===t.times){const e=[],n=[];Vo.flattenJSON(t.keys,e,n,"value"),t.times=e,t.values=n}return void 0!==e.parse?e.parse(t):new e(t.name,t.times,t.values,t.interpolation)}const rl={enabled:!1,files:{},add:function(t,e){!1!==this.enabled&&(this.files[t]=e)},get:function(t){if(!1!==this.enabled)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class sl{constructor(t,e,n){const i=this;let r,s=!1,a=0,o=0;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(t){o++,!1===s&&void 0!==i.onStart&&i.onStart(t,a,o),s=!0},this.itemEnd=function(t){a++,void 0!==i.onProgress&&i.onProgress(t,a,o),a===o&&(s=!1,void 0!==i.onLoad&&i.onLoad())},this.itemError=function(t){void 0!==i.onError&&i.onError(t)},this.resolveURL=function(t){return r?r(t):t},this.setURLModifier=function(t){return r=t,this},this.addHandler=function(t,e){return l.push(t,e),this},this.removeHandler=function(t){const e=l.indexOf(t);return-1!==e&&l.splice(e,2),this},this.getHandler=function(t){for(let e=0,n=l.length;e<n;e+=2){const n=l[e],i=l[e+1];if(n.global&&(n.lastIndex=0),n.test(t))return i}return null}}}const al=new sl;class ol{constructor(t){this.manager=void 0!==t?t:al,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise((function(i,r){n.load(t,i,e,r)}))}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}const ll={};class cl extends ol{constructor(t){super(t)}load(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=rl.get(t);if(void 0!==s)return r.manager.itemStart(t),setTimeout((function(){e&&e(s),r.manager.itemEnd(t)}),0),s;if(void 0!==ll[t])return void ll[t].push({onLoad:e,onProgress:n,onError:i});const a=t.match(/^data:(.*?)(;base64)?,(.*)$/);let o;if(a){const n=a[1],s=!!a[2];let o=a[3];o=decodeURIComponent(o),s&&(o=atob(o));try{let i;const s=(this.responseType||"").toLowerCase();switch(s){case"arraybuffer":case"blob":const t=new Uint8Array(o.length);for(let e=0;e<o.length;e++)t[e]=o.charCodeAt(e);i="blob"===s?new Blob([t.buffer],{type:n}):t.buffer;break;case"document":const e=new DOMParser;i=e.parseFromString(o,n);break;case"json":i=JSON.parse(o);break;default:i=o}setTimeout((function(){e&&e(i),r.manager.itemEnd(t)}),0)}catch(e){setTimeout((function(){i&&i(e),r.manager.itemError(t),r.manager.itemEnd(t)}),0)}}else{ll[t]=[],ll[t].push({onLoad:e,onProgress:n,onError:i}),o=new XMLHttpRequest,o.open("GET",t,!0),o.addEventListener("load",(function(e){const n=this.response,i=ll[t];if(delete ll[t],200===this.status||0===this.status){0===this.status&&console.warn("THREE.FileLoader: HTTP Status 0 received."),rl.add(t,n);for(let t=0,e=i.length;t<e;t++){const e=i[t];e.onLoad&&e.onLoad(n)}r.manager.itemEnd(t)}else{for(let t=0,n=i.length;t<n;t++){const n=i[t];n.onError&&n.onError(e)}r.manager.itemError(t),r.manager.itemEnd(t)}}),!1),o.addEventListener("progress",(function(e){const n=ll[t];for(let t=0,i=n.length;t<i;t++){const i=n[t];i.onProgress&&i.onProgress(e)}}),!1),o.addEventListener("error",(function(e){const n=ll[t];delete ll[t];for(let t=0,i=n.length;t<i;t++){const i=n[t];i.onError&&i.onError(e)}r.manager.itemError(t),r.manager.itemEnd(t)}),!1),o.addEventListener("abort",(function(e){const n=ll[t];delete ll[t];for(let t=0,i=n.length;t<i;t++){const i=n[t];i.onError&&i.onError(e)}r.manager.itemError(t),r.manager.itemEnd(t)}),!1),void 0!==this.responseType&&(o.responseType=this.responseType),void 0!==this.withCredentials&&(o.withCredentials=this.withCredentials),o.overrideMimeType&&o.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain");for(const t in this.requestHeader)o.setRequestHeader(t,this.requestHeader[t]);o.send(null)}return r.manager.itemStart(t),o}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class hl extends ol{constructor(t){super(t)}load(t,e,n,i){void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=rl.get(t);if(void 0!==s)return r.manager.itemStart(t),setTimeout((function(){e&&e(s),r.manager.itemEnd(t)}),0),s;const a=document.createElementNS("http://www.w3.org/1999/xhtml","img");function o(){a.removeEventListener("load",o,!1),a.removeEventListener("error",l,!1),rl.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(e){a.removeEventListener("load",o,!1),a.removeEventListener("error",l,!1),i&&i(e),r.manager.itemError(t),r.manager.itemEnd(t)}return a.addEventListener("load",o,!1),a.addEventListener("error",l,!1),"data:"!==t.substr(0,5)&&void 0!==this.crossOrigin&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class ul extends ol{constructor(t){super(t)}load(t,e,n,i){const r=new ei,s=new hl(this.manager);s.setCrossOrigin(this.crossOrigin),s.setPath(this.path);let a=0;function o(n){s.load(t[n],(function(t){r.images[n]=t,a++,6===a&&(r.needsUpdate=!0,e&&e(r))}),void 0,i)}for(let e=0;e<t.length;++e)o(e);return r}}class dl extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=new ii,a=new cl(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,(function(t){const n=r.parse(t);n&&(void 0!==n.image?s.image=n.image:void 0!==n.data&&(s.image.width=n.width,s.image.height=n.height,s.image.data=n.data),s.wrapS=void 0!==n.wrapS?n.wrapS:u,s.wrapT=void 0!==n.wrapT?n.wrapT:u,s.magFilter=void 0!==n.magFilter?n.magFilter:g,s.minFilter=void 0!==n.minFilter?n.minFilter:g,s.anisotropy=void 0!==n.anisotropy?n.anisotropy:1,void 0!==n.encoding&&(s.encoding=n.encoding),void 0!==n.flipY&&(s.flipY=n.flipY),void 0!==n.format&&(s.format=n.format),void 0!==n.type&&(s.type=n.type),void 0!==n.mipmaps&&(s.mipmaps=n.mipmaps,s.minFilter=y),1===n.mipmapCount&&(s.minFilter=g),void 0!==n.generateMipmaps&&(s.generateMipmaps=n.generateMipmaps),s.needsUpdate=!0,e&&e(s,n))}),n,i),s}}class pl extends ol{constructor(t){super(t)}load(t,e,n,i){const r=new bt,s=new hl(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,(function(n){r.image=n;const i=t.search(/\.jpe?g($|\?)/i)>0||0===t.search(/^data\:image\/jpeg/);r.format=i?T:E,r.needsUpdate=!0,void 0!==e&&e(r)}),n,i),r}}class ml{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let s=1;s<=t;s++)n=this.getPoint(s/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let s;s=e||t*n[r-1];let a,o=0,l=r-1;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),a=n[i]-s,a<0)o=i+1;else{if(!(a>0)){l=i;break}l=i-1}if(i=l,n[i]===s)return i/(r-1);const c=n[i];return(i+(s-c)/(n[i+1]-c))/(r-1)}getTangent(t,e){const n=1e-4;let i=t-n,r=t+n;i<0&&(i=0),r>1&&(r=1);const s=this.getPoint(i),a=this.getPoint(r),o=e||(s.isVector2?new vt:new Lt);return o.copy(a).sub(s).normalize(),o}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new Lt,i=[],r=[],s=[],a=new Lt,o=new se;for(let e=0;e<=t;e++){const n=e/t;i[e]=this.getTangentAt(n,new Lt),i[e].normalize()}r[0]=new Lt,s[0]=new Lt;let l=Number.MAX_VALUE;const c=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);c<=l&&(l=c,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),s[0].crossVectors(i[0],r[0]);for(let e=1;e<=t;e++){if(r[e]=r[e-1].clone(),s[e]=s[e-1].clone(),a.crossVectors(i[e-1],i[e]),a.length()>Number.EPSILON){a.normalize();const t=Math.acos(ht(i[e-1].dot(i[e]),-1,1));r[e].applyMatrix4(o.makeRotationAxis(a,t))}s[e].crossVectors(i[e],r[e])}if(!0===e){let e=Math.acos(ht(r[0].dot(r[t]),-1,1));e/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(e=-e);for(let n=1;n<=t;n++)r[n].applyMatrix4(o.makeRotationAxis(i[n],e*n)),s[n].crossVectors(i[n],r[n])}return{tangents:i,normals:r,binormals:s}}clone(){return(new this.constructor).copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class fl extends ml{constructor(t=0,e=0,n=1,i=1,r=0,s=2*Math.PI,a=!1,o=0){super(),this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=a,this.aRotation=o}getPoint(t,e){const n=e||new vt,i=2*Math.PI;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(r=s?0:i),!0!==this.aClockwise||s||(r===i?r=-i:r-=i);const a=this.aStartAngle+t*r;let o=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(0!==this.aRotation){const t=Math.cos(this.aRotation),e=Math.sin(this.aRotation),n=o-this.aX,i=l-this.aY;o=n*t-i*e+this.aX,l=n*e+i*t+this.aY}return n.set(o,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}fl.prototype.isEllipseCurve=!0;class gl extends fl{constructor(t,e,n,i,r,s){super(t,e,n,n,i,r,s),this.type="ArcCurve"}}function vl(){let t=0,e=0,n=0,i=0;function r(r,s,a,o){t=r,e=a,n=-3*r+3*s-2*a-o,i=2*r-2*s+a+o}return{initCatmullRom:function(t,e,n,i,s){r(e,n,s*(n-t),s*(i-e))},initNonuniformCatmullRom:function(t,e,n,i,s,a,o){let l=(e-t)/s-(n-t)/(s+a)+(n-e)/a,c=(n-e)/a-(i-e)/(a+o)+(i-n)/o;l*=a,c*=a,r(e,n,l,c)},calc:function(r){const s=r*r;return t+e*r+n*s+i*(s*r)}}}gl.prototype.isArcCurve=!0;const yl=new Lt,xl=new vl,_l=new vl,wl=new vl;class bl extends ml{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new Lt){const n=e,i=this.points,r=i.length,s=(r-(this.closed?0:1))*t;let a,o,l=Math.floor(s),c=s-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:0===c&&l===r-1&&(l=r-2,c=1),this.closed||l>0?a=i[(l-1)%r]:(yl.subVectors(i[0],i[1]).add(i[0]),a=yl);const h=i[l%r],u=i[(l+1)%r];if(this.closed||l+2<r?o=i[(l+2)%r]:(yl.subVectors(i[r-1],i[r-2]).add(i[r-1]),o=yl),"centripetal"===this.curveType||"chordal"===this.curveType){const t="chordal"===this.curveType?.5:.25;let e=Math.pow(a.distanceToSquared(h),t),n=Math.pow(h.distanceToSquared(u),t),i=Math.pow(u.distanceToSquared(o),t);n<1e-4&&(n=1),e<1e-4&&(e=n),i<1e-4&&(i=n),xl.initNonuniformCatmullRom(a.x,h.x,u.x,o.x,e,n,i),_l.initNonuniformCatmullRom(a.y,h.y,u.y,o.y,e,n,i),wl.initNonuniformCatmullRom(a.z,h.z,u.z,o.z,e,n,i)}else"catmullrom"===this.curveType&&(xl.initCatmullRom(a.x,h.x,u.x,o.x,this.tension),_l.initCatmullRom(a.y,h.y,u.y,o.y,this.tension),wl.initCatmullRom(a.z,h.z,u.z,o.z,this.tension));return n.set(xl.calc(c),_l.calc(c),wl.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e];this.points.push((new Lt).fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ml(t,e,n,i,r){const s=.5*(i-e),a=.5*(r-n),o=t*t;return(2*n-2*i+s+a)*(t*o)+(-3*n+3*i-2*s-a)*o+s*t+n}function Sl(t,e,n,i){return function(t,e){const n=1-t;return n*n*e}(t,e)+function(t,e){return 2*(1-t)*t*e}(t,n)+function(t,e){return t*t*e}(t,i)}function Tl(t,e,n,i,r){return function(t,e){const n=1-t;return n*n*n*e}(t,e)+function(t,e){const n=1-t;return 3*n*n*t*e}(t,n)+function(t,e){return 3*(1-t)*t*t*e}(t,i)+function(t,e){return t*t*t*e}(t,r)}bl.prototype.isCatmullRomCurve3=!0;class El extends ml{constructor(t=new vt,e=new vt,n=new vt,i=new vt){super(),this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new vt){const n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Tl(t,i.x,r.x,s.x,a.x),Tl(t,i.y,r.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}El.prototype.isCubicBezierCurve=!0;class Al extends ml{constructor(t=new Lt,e=new Lt,n=new Lt,i=new Lt){super(),this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Lt){const n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Tl(t,i.x,r.x,s.x,a.x),Tl(t,i.y,r.y,s.y,a.y),Tl(t,i.z,r.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}Al.prototype.isCubicBezierCurve3=!0;class Ll extends ml{constructor(t=new vt,e=new vt){super(),this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e){const n=e||new vt;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}Ll.prototype.isLineCurve=!0;class Rl extends ml{constructor(t=new Lt,e=new Lt){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=t,this.v2=e}getPoint(t,e=new Lt){const n=e;return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cl extends ml{constructor(t=new vt,e=new vt,n=new vt){super(),this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(Sl(t,i.x,r.x,s.x),Sl(t,i.y,r.y,s.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}Cl.prototype.isQuadraticBezierCurve=!0;class Pl extends ml{constructor(t=new Lt,e=new Lt,n=new Lt){super(),this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Lt){const n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(Sl(t,i.x,r.x,s.x),Sl(t,i.y,r.y,s.y),Sl(t,i.z,r.z,s.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}Pl.prototype.isQuadraticBezierCurve3=!0;class Dl extends ml{constructor(t=[]){super(),this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,i=this.points,r=(i.length-1)*t,s=Math.floor(r),a=r-s,o=i[0===s?s:s-1],l=i[s],c=i[s>i.length-2?i.length-1:s+1],h=i[s>i.length-3?i.length-1:s+2];return n.set(Ml(a,o.x,l.x,c.x,h.x),Ml(a,o.y,l.y,c.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e];this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e];this.points.push((new vt).fromArray(n))}return this}}Dl.prototype.isSplineCurve=!0;var Il=Object.freeze({__proto__:null,ArcCurve:gl,CatmullRomCurve3:bl,CubicBezierCurve:El,CubicBezierCurve3:Al,EllipseCurve:fl,LineCurve:Ll,LineCurve3:Rl,QuadraticBezierCurve:Cl,QuadraticBezierCurve3:Pl,SplineCurve:Dl});class Nl extends ml{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);t.equals(e)||this.curves.push(new Ll(e,t))}getPoint(t){const e=t*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=e){const t=n[i]-e,r=this.curves[i],s=r.getLength(),a=0===s?0:1-t/s;return r.getPointAt(a)}i++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const s=r[i],a=s&&s.isEllipseCurve?2*t:s&&(s.isLineCurve||s.isLineCurve3)?1:s&&s.isSplineCurve?t*s.points.length:t,o=s.getPoints(a);for(let t=0;t<o.length;t++){const i=o[t];n&&n.equals(i)||(e.push(i),n=i)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const n=t.curves[e];this.curves.push(n.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const n=this.curves[e];t.curves.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const n=t.curves[e];this.curves.push((new Il[n.type]).fromJSON(n))}return this}}class Bl extends Nl{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ll(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Cl(this.currentPoint.clone(),new vt(t,e),new vt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,s){const a=new El(this.currentPoint.clone(),new vt(t,e),new vt(n,i),new vt(r,s));return this.curves.push(a),this.currentPoint.set(r,s),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Dl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,s){const a=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+a,e+o,n,i,r,s),this}absarc(t,e,n,i,r,s){return this.absellipse(t,e,n,n,i,r,s),this}ellipse(t,e,n,i,r,s,a,o){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+l,e+c,n,i,r,s,a,o),this}absellipse(t,e,n,i,r,s,a,o){const l=new fl(t,e,n,i,r,s,a,o);if(this.curves.length>0){const t=l.getPoint(0);t.equals(this.currentPoint)||this.lineTo(t.x,t.y)}this.curves.push(l);const c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class zl extends Bl{constructor(t){super(t),this.uuid=ct(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const n=t.holes[e];this.holes.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const n=this.holes[e];t.holes.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const n=t.holes[e];this.holes.push((new Bl).fromJSON(n))}return this}}class Fl extends Ce{constructor(t,e=1){super(),this.type="Light",this.color=new tn(t),this.intensity=e}dispose(){}copy(t){return super.copy(t),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,void 0!==this.groundColor&&(e.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(e.object.distance=this.distance),void 0!==this.angle&&(e.object.angle=this.angle),void 0!==this.decay&&(e.object.decay=this.decay),void 0!==this.penumbra&&(e.object.penumbra=this.penumbra),void 0!==this.shadow&&(e.object.shadow=this.shadow.toJSON()),e}}Fl.prototype.isLight=!0;class Ol extends Fl{constructor(t,e,n){super(t,n),this.type="HemisphereLight",this.position.copy(Ce.DefaultUp),this.updateMatrix(),this.groundColor=new tn(e)}copy(t){return Fl.prototype.copy.call(this,t),this.groundColor.copy(t.groundColor),this}}Ol.prototype.isHemisphereLight=!0;const Hl=new se,Gl=new Lt,Ul=new Lt;class kl{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ai,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Gl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gl),Ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ul),e.updateMatrixWorld(),Hl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(e.projectionMatrix),n.multiply(e.matrixWorldInverse)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return(new this.constructor).copy(this)}toJSON(){const t={};return 0!==this.bias&&(t.bias=this.bias),0!==this.normalBias&&(t.normalBias=this.normalBias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Vl extends kl{constructor(){super(new Kn(50,1,.5,500)),this.focus=1}updateMatrices(t){const e=this.camera,n=2*lt*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;n===e.fov&&i===e.aspect&&r===e.far||(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}Vl.prototype.isSpotLightShadow=!0;class Wl extends Fl{constructor(t,e,n=0,i=Math.PI/3,r=0,s=1){super(t,e),this.type="SpotLight",this.position.copy(Ce.DefaultUp),this.updateMatrix(),this.target=new Ce,this.distance=n,this.angle=i,this.penumbra=r,this.decay=s,this.shadow=new Vl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}Wl.prototype.isSpotLight=!0;const jl=new se,ql=new Lt,Xl=new Lt;class Yl extends kl{constructor(){super(new Kn(90,1,.5,500)),this._frameExtents=new vt(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new Lt(1,0,0),new Lt(-1,0,0),new Lt(0,0,1),new Lt(0,0,-1),new Lt(0,1,0),new Lt(0,-1,0)],this._cubeUps=[new Lt(0,1,0),new Lt(0,1,0),new Lt(0,1,0),new Lt(0,1,0),new Lt(0,0,1),new Lt(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ql.setFromMatrixPosition(t.matrixWorld),n.position.copy(ql),Xl.copy(n.position),Xl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Xl),n.updateMatrixWorld(),i.makeTranslation(-ql.x,-ql.y,-ql.z),jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl)}}Yl.prototype.isPointLightShadow=!0;class Zl extends Fl{constructor(t,e,n=0,i=1){super(t,e),this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Yl}get power(){return 4*this.intensity*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}Zl.prototype.isPointLight=!0;class Jl extends Qn{constructor(t=-1,e=1,n=1,i=-1,r=.1,s=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=null===t.view?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,s){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,s=n+t,a=i+e,o=i-e;if(null!==this.view&&this.view.enabled){const t=(this.right-this.left)/this.view.fullWidth/this.zoom,e=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=t*this.view.offsetX,s=r+t*this.view.width,a-=e*this.view.offsetY,o=a-e*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,null!==this.view&&(e.object.view=Object.assign({},this.view)),e}}Jl.prototype.isOrthographicCamera=!0;class Ql extends kl{constructor(){super(new Jl(-5,5,5,-5,.5,500))}}Ql.prototype.isDirectionalLightShadow=!0;class Kl extends Fl{constructor(t,e){super(t,e),this.type="DirectionalLight",this.position.copy(Ce.DefaultUp),this.updateMatrix(),this.target=new Ce,this.shadow=new Ql}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}Kl.prototype.isDirectionalLight=!0;class $l extends Fl{constructor(t,e){super(t,e),this.type="AmbientLight"}}$l.prototype.isAmbientLight=!0;class tc extends Fl{constructor(t,e,n=10,i=10){super(t,e),this.type="RectAreaLight",this.width=n,this.height=i}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}tc.prototype.isRectAreaLight=!0;class ec{constructor(){this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new Lt)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,r=t.z,s=this.coefficients;return e.copy(s[0]).multiplyScalar(.282095),e.addScaledVector(s[1],.488603*i),e.addScaledVector(s[2],.488603*r),e.addScaledVector(s[3],.488603*n),e.addScaledVector(s[4],n*i*1.092548),e.addScaledVector(s[5],i*r*1.092548),e.addScaledVector(s[6],.315392*(3*r*r-1)),e.addScaledVector(s[7],n*r*1.092548),e.addScaledVector(s[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,r=t.z,s=this.coefficients;return e.copy(s[0]).multiplyScalar(.886227),e.addScaledVector(s[1],1.023328*i),e.addScaledVector(s[2],1.023328*r),e.addScaledVector(s[3],1.023328*n),e.addScaledVector(s[4],.858086*n*i),e.addScaledVector(s[5],.858086*i*r),e.addScaledVector(s[6],.743125*r*r-.247708),e.addScaledVector(s[7],.858086*n*r),e.addScaledVector(s[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return(new this.constructor).copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+3*i);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+3*i);return t}static getBasisAt(t,e){const n=t.x,i=t.y,r=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*r,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*n*r,e[8]=.546274*(n*n-i*i)}}ec.prototype.isSphericalHarmonics3=!0;class nc extends Fl{constructor(t=new ec,e=1){super(void 0,e),this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}nc.prototype.isLightProbe=!0;class ic extends ol{constructor(t){super(t),this.textures={}}load(t,e,n,i){const r=this,s=new cl(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(t,(function(n){try{e(r.parse(JSON.parse(n)))}catch(e){i?i(e):console.error(e),r.manager.itemError(t)}}),n,i)}parse(t){const e=this.textures;function n(t){return void 0===e[t]&&console.warn("THREE.MaterialLoader: Undefined texture",t),e[t]}const i=new ko[t.type];if(void 0!==t.uuid&&(i.uuid=t.uuid),void 0!==t.name&&(i.name=t.name),void 0!==t.color&&void 0!==i.color&&i.color.setHex(t.color),void 0!==t.roughness&&(i.roughness=t.roughness),void 0!==t.metalness&&(i.metalness=t.metalness),void 0!==t.sheen&&(i.sheen=(new tn).setHex(t.sheen)),void 0!==t.emissive&&void 0!==i.emissive&&i.emissive.setHex(t.emissive),void 0!==t.specular&&void 0!==i.specular&&i.specular.setHex(t.specular),void 0!==t.shininess&&(i.shininess=t.shininess),void 0!==t.clearcoat&&(i.clearcoat=t.clearcoat),void 0!==t.clearcoatRoughness&&(i.clearcoatRoughness=t.clearcoatRoughness),void 0!==t.fog&&(i.fog=t.fog),void 0!==t.flatShading&&(i.flatShading=t.flatShading),void 0!==t.blending&&(i.blending=t.blending),void 0!==t.combine&&(i.combine=t.combine),void 0!==t.side&&(i.side=t.side),void 0!==t.shadowSide&&(i.shadowSide=t.shadowSide),void 0!==t.opacity&&(i.opacity=t.opacity),void 0!==t.transparent&&(i.transparent=t.transparent),void 0!==t.alphaTest&&(i.alphaTest=t.alphaTest),void 0!==t.depthTest&&(i.depthTest=t.depthTest),void 0!==t.depthWrite&&(i.depthWrite=t.depthWrite),void 0!==t.colorWrite&&(i.colorWrite=t.colorWrite),void 0!==t.stencilWrite&&(i.stencilWrite=t.stencilWrite),void 0!==t.stencilWriteMask&&(i.stencilWriteMask=t.stencilWriteMask),void 0!==t.stencilFunc&&(i.stencilFunc=t.stencilFunc),void 0!==t.stencilRef&&(i.stencilRef=t.stencilRef),void 0!==t.stencilFuncMask&&(i.stencilFuncMask=t.stencilFuncMask),void 0!==t.stencilFail&&(i.stencilFail=t.stencilFail),void 0!==t.stencilZFail&&(i.stencilZFail=t.stencilZFail),void 0!==t.stencilZPass&&(i.stencilZPass=t.stencilZPass),void 0!==t.wireframe&&(i.wireframe=t.wireframe),void 0!==t.wireframeLinewidth&&(i.wireframeLinewidth=t.wireframeLinewidth),void 0!==t.wireframeLinecap&&(i.wireframeLinecap=t.wireframeLinecap),void 0!==t.wireframeLinejoin&&(i.wireframeLinejoin=t.wireframeLinejoin),void 0!==t.rotation&&(i.rotation=t.rotation),1!==t.linewidth&&(i.linewidth=t.linewidth),void 0!==t.dashSize&&(i.dashSize=t.dashSize),void 0!==t.gapSize&&(i.gapSize=t.gapSize),void 0!==t.scale&&(i.scale=t.scale),void 0!==t.polygonOffset&&(i.polygonOffset=t.polygonOffset),void 0!==t.polygonOffsetFactor&&(i.polygonOffsetFactor=t.polygonOffsetFactor),void 0!==t.polygonOffsetUnits&&(i.polygonOffsetUnits=t.polygonOffsetUnits),void 0!==t.skinning&&(i.skinning=t.skinning),void 0!==t.morphTargets&&(i.morphTargets=t.morphTargets),void 0!==t.morphNormals&&(i.morphNormals=t.morphNormals),void 0!==t.dithering&&(i.dithering=t.dithering),void 0!==t.alphaToCoverage&&(i.alphaToCoverage=t.alphaToCoverage),void 0!==t.premultipliedAlpha&&(i.premultipliedAlpha=t.premultipliedAlpha),void 0!==t.vertexTangents&&(i.vertexTangents=t.vertexTangents),void 0!==t.visible&&(i.visible=t.visible),void 0!==t.toneMapped&&(i.toneMapped=t.toneMapped),void 0!==t.userData&&(i.userData=t.userData),void 0!==t.vertexColors&&("number"==typeof t.vertexColors?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),void 0!==t.uniforms)for(const e in t.uniforms){const r=t.uniforms[e];switch(i.uniforms[e]={},r.type){case"t":i.uniforms[e].value=n(r.value);break;case"c":i.uniforms[e].value=(new tn).setHex(r.value);break;case"v2":i.uniforms[e].value=(new vt).fromArray(r.value);break;case"v3":i.uniforms[e].value=(new Lt).fromArray(r.value);break;case"v4":i.uniforms[e].value=(new St).fromArray(r.value);break;case"m3":i.uniforms[e].value=(new yt).fromArray(r.value);break;case"m4":i.uniforms[e].value=(new se).fromArray(r.value);break;default:i.uniforms[e].value=r.value}}if(void 0!==t.defines&&(i.defines=t.defines),void 0!==t.vertexShader&&(i.vertexShader=t.vertexShader),void 0!==t.fragmentShader&&(i.fragmentShader=t.fragmentShader),void 0!==t.extensions)for(const e in t.extensions)i.extensions[e]=t.extensions[e];if(void 0!==t.shading&&(i.flatShading=1===t.shading),void 0!==t.size&&(i.size=t.size),void 0!==t.sizeAttenuation&&(i.sizeAttenuation=t.sizeAttenuation),void 0!==t.map&&(i.map=n(t.map)),void 0!==t.matcap&&(i.matcap=n(t.matcap)),void 0!==t.alphaMap&&(i.alphaMap=n(t.alphaMap)),void 0!==t.bumpMap&&(i.bumpMap=n(t.bumpMap)),void 0!==t.bumpScale&&(i.bumpScale=t.bumpScale),void 0!==t.normalMap&&(i.normalMap=n(t.normalMap)),void 0!==t.normalMapType&&(i.normalMapType=t.normalMapType),void 0!==t.normalScale){let e=t.normalScale;!1===Array.isArray(e)&&(e=[e,e]),i.normalScale=(new vt).fromArray(e)}return void 0!==t.displacementMap&&(i.displacementMap=n(t.displacementMap)),void 0!==t.displacementScale&&(i.displacementScale=t.displacementScale),void 0!==t.displacementBias&&(i.displacementBias=t.displacementBias),void 0!==t.roughnessMap&&(i.roughnessMap=n(t.roughnessMap)),void 0!==t.metalnessMap&&(i.metalnessMap=n(t.metalnessMap)),void 0!==t.emissiveMap&&(i.emissiveMap=n(t.emissiveMap)),void 0!==t.emissiveIntensity&&(i.emissiveIntensity=t.emissiveIntensity),void 0!==t.specularMap&&(i.specularMap=n(t.specularMap)),void 0!==t.envMap&&(i.envMap=n(t.envMap)),void 0!==t.envMapIntensity&&(i.envMapIntensity=t.envMapIntensity),void 0!==t.reflectivity&&(i.reflectivity=t.reflectivity),void 0!==t.refractionRatio&&(i.refractionRatio=t.refractionRatio),void 0!==t.lightMap&&(i.lightMap=n(t.lightMap)),void 0!==t.lightMapIntensity&&(i.lightMapIntensity=t.lightMapIntensity),void 0!==t.aoMap&&(i.aoMap=n(t.aoMap)),void 0!==t.aoMapIntensity&&(i.aoMapIntensity=t.aoMapIntensity),void 0!==t.gradientMap&&(i.gradientMap=n(t.gradientMap)),void 0!==t.clearcoatMap&&(i.clearcoatMap=n(t.clearcoatMap)),void 0!==t.clearcoatRoughnessMap&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),void 0!==t.clearcoatNormalMap&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),void 0!==t.clearcoatNormalScale&&(i.clearcoatNormalScale=(new vt).fromArray(t.clearcoatNormalScale)),void 0!==t.transmission&&(i.transmission=t.transmission),void 0!==t.transmissionMap&&(i.transmissionMap=n(t.transmissionMap)),i}setTextures(t){return this.textures=t,this}}class rc{static decodeText(t){if("undefined"!=typeof TextDecoder)return(new TextDecoder).decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch(t){return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return-1===e?"./":t.substr(0,e+1)}}class sc extends En{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}clone(){return(new this.constructor).copy(this)}toJSON(){const t=super.toJSON(this);return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}sc.prototype.isInstancedBufferGeometry=!0;class ac extends sn{constructor(t,e,n,i){"number"==typeof n&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(t,e,n),this.meshPerAttribute=i||1}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}ac.prototype.isInstancedBufferAttribute=!0;class oc extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=new cl(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(t,(function(n){try{e(r.parse(JSON.parse(n)))}catch(e){i?i(e):console.error(e),r.manager.itemError(t)}}),n,i)}parse(t){const e={},n={};function i(t,i){if(void 0!==e[i])return e[i];const r=t.interleavedBuffers[i],s=function(t,e){if(void 0!==n[e])return n[e];const i=t.arrayBuffers[e],r=new Uint32Array(i).buffer;return n[e]=r,r}(t,r.buffer),a=yn(r.type,s),o=new Es(a,r.stride);return o.uuid=r.uuid,e[i]=o,o}const r=t.isInstancedBufferGeometry?new sc:new En,s=t.data.index;if(void 0!==s){const t=yn(s.type,s.array);r.setIndex(new sn(t,1))}const a=t.data.attributes;for(const e in a){const n=a[e];let s;if(n.isInterleavedBufferAttribute){const e=i(t.data,n.data);s=new Ls(e,n.itemSize,n.offset,n.normalized)}else{const t=yn(n.type,n.array);s=new(n.isInstancedBufferAttribute?ac:sn)(t,n.itemSize,n.normalized)}void 0!==n.name&&(s.name=n.name),void 0!==n.usage&&s.setUsage(n.usage),void 0!==n.updateRange&&(s.updateRange.offset=n.updateRange.offset,s.updateRange.count=n.updateRange.count),r.setAttribute(e,s)}const o=t.data.morphAttributes;if(o)for(const e in o){const n=o[e],s=[];for(let e=0,r=n.length;e<r;e++){const r=n[e];let a;if(r.isInterleavedBufferAttribute){const e=i(t.data,r.data);a=new Ls(e,r.itemSize,r.offset,r.normalized)}else{const t=yn(r.type,r.array);a=new sn(t,r.itemSize,r.normalized)}void 0!==r.name&&(a.name=r.name),s.push(a)}r.morphAttributes[e]=s}t.data.morphTargetsRelative&&(r.morphTargetsRelative=!0);const l=t.data.groups||t.data.drawcalls||t.data.offsets;if(void 0!==l)for(let t=0,e=l.length;t!==e;++t){const e=l[t];r.addGroup(e.start,e.count,e.materialIndex)}const c=t.data.boundingSphere;if(void 0!==c){const t=new Lt;void 0!==c.center&&t.fromArray(c.center),r.boundingSphere=new Jt(t,c.radius)}return t.name&&(r.name=t.name),t.userData&&(r.userData=t.userData),r}}const lc={UVMapping:i,CubeReflectionMapping:r,CubeRefractionMapping:s,EquirectangularReflectionMapping:a,EquirectangularRefractionMapping:o,CubeUVReflectionMapping:l,CubeUVRefractionMapping:c},cc={RepeatWrapping:h,ClampToEdgeWrapping:u,MirroredRepeatWrapping:d},hc={NearestFilter:p,NearestMipmapNearestFilter:m,NearestMipmapLinearFilter:f,LinearFilter:g,LinearMipmapNearestFilter:v,LinearMipmapLinearFilter:y};class uc extends ol{constructor(t){super(t),"undefined"==typeof createImageBitmap&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),"undefined"==typeof fetch&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=rl.get(t);if(void 0!==s)return r.manager.itemStart(t),setTimeout((function(){e&&e(s),r.manager.itemEnd(t)}),0),s;const a={};a.credentials="anonymous"===this.crossOrigin?"same-origin":"include",a.headers=this.requestHeader,fetch(t,a).then((function(t){return t.blob()})).then((function(t){return createImageBitmap(t,Object.assign(r.options,{colorSpaceConversion:"none"}))})).then((function(n){rl.add(t,n),e&&e(n),r.manager.itemEnd(t)})).catch((function(e){i&&i(e),r.manager.itemError(t),r.manager.itemEnd(t)})),r.manager.itemStart(t)}}uc.prototype.isImageBitmapLoader=!0;class dc{constructor(){this.type="ShapePath",this.color=new tn,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new Bl,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,r,s){return this.currentPath.bezierCurveTo(t,e,n,i,r,s),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t,e){function n(t){const e=[];for(let n=0,i=t.length;n<i;n++){const i=t[n],r=new zl;r.curves=i.curves,e.push(r)}return e}function i(t,e){const n=e.length;let i=!1;for(let r=n-1,s=0;s<n;r=s++){let n=e[r],a=e[s],o=a.x-n.x,l=a.y-n.y;if(Math.abs(l)>Number.EPSILON){if(l<0&&(n=e[s],o=-o,a=e[r],l=-l),t.y<n.y||t.y>a.y)continue;if(t.y===n.y){if(t.x===n.x)return!0}else{const e=l*(t.x-n.x)-o*(t.y-n.y);if(0===e)return!0;if(e<0)continue;i=!i}}else{if(t.y!==n.y)continue;if(a.x<=t.x&&t.x<=n.x||n.x<=t.x&&t.x<=a.x)return!0}}return i}const r=po.isClockWise,s=this.subPaths;if(0===s.length)return[];if(!0===e)return n(s);let a,o,l;const c=[];if(1===s.length)return o=s[0],l=new zl,l.curves=o.curves,c.push(l),c;let h=!r(s[0].getPoints());h=t?!h:h;const u=[],d=[];let p,m,f=[],g=0;d[g]=void 0,f[g]=[];for(let e=0,n=s.length;e<n;e++)o=s[e],p=o.getPoints(),a=r(p),a=t?!a:a,a?(!h&&d[g]&&g++,d[g]={s:new zl,p:p},d[g].s.curves=o.curves,h&&g++,f[g]=[]):f[g].push({h:o,p:p[0]});if(!d[0])return n(s);if(d.length>1){let t=!1;const e=[];for(let t=0,e=d.length;t<e;t++)u[t]=[];for(let n=0,r=d.length;n<r;n++){const r=f[n];for(let s=0;s<r.length;s++){const a=r[s];let o=!0;for(let r=0;r<d.length;r++)i(a.p,d[r].p)&&(n!==r&&e.push({froms:n,tos:r,hole:s}),o?(o=!1,u[r].push(a)):t=!0);o&&u[n].push(a)}}e.length>0&&(t||(f=u))}for(let t=0,e=d.length;t<e;t++){l=d[t].s,c.push(l),m=f[t];for(let t=0,e=m.length;t<e;t++)l.holes.push(m[t].h)}return c}}class pc{constructor(t){this.type="Font",this.data=t}generateShapes(t,e=100){const n=[],i=function(t,e,n){const i=Array.from(t),r=e/n.resolution,s=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*r,a=[];let o=0,l=0;for(let t=0;t<i.length;t++){const e=i[t];if("\n"===e)o=0,l-=s;else{const t=mc(e,r,o,l,n);o+=t.offsetX,a.push(t.path)}}return a}(t,e,this.data);for(let t=0,e=i.length;t<e;t++)Array.prototype.push.apply(n,i[t].toShapes());return n}}function mc(t,e,n,i,r){const s=r.glyphs[t]||r.glyphs["?"];if(!s)return void console.error('THREE.Font: character "'+t+'" does not exists in font family '+r.familyName+".");const a=new dc;let o,l,c,h,u,d,p,m;if(s.o){const t=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let r=0,s=t.length;r<s;){switch(t[r++]){case"m":o=t[r++]*e+n,l=t[r++]*e+i,a.moveTo(o,l);break;case"l":o=t[r++]*e+n,l=t[r++]*e+i,a.lineTo(o,l);break;case"q":c=t[r++]*e+n,h=t[r++]*e+i,u=t[r++]*e+n,d=t[r++]*e+i,a.quadraticCurveTo(u,d,c,h);break;case"b":c=t[r++]*e+n,h=t[r++]*e+i,u=t[r++]*e+n,d=t[r++]*e+i,p=t[r++]*e+n,m=t[r++]*e+i,a.bezierCurveTo(u,d,p,m,c,h)}}}return{offsetX:s.ha*e,path:a}}pc.prototype.isFont=!0;let fc;const gc={getContext:function(){return void 0===fc&&(fc=new(window.AudioContext||window.webkitAudioContext)),fc},setContext:function(t){fc=t}};class vc extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=new cl(this.manager);s.setResponseType("arraybuffer"),s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(t,(function(n){try{const t=n.slice(0);gc.getContext().decodeAudioData(t,(function(t){e(t)}))}catch(e){i?i(e):console.error(e),r.manager.itemError(t)}}),n,i)}}class yc extends nc{constructor(t,e,n=1){super(void 0,n);const i=(new tn).set(t),r=(new tn).set(e),s=new Lt(i.r,i.g,i.b),a=new Lt(r.r,r.g,r.b),o=Math.sqrt(Math.PI),l=o*Math.sqrt(.75);this.sh.coefficients[0].copy(s).add(a).multiplyScalar(o),this.sh.coefficients[1].copy(s).sub(a).multiplyScalar(l)}}yc.prototype.isHemisphereLightProbe=!0;class xc extends nc{constructor(t,e=1){super(void 0,e);const n=(new tn).set(t);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}}xc.prototype.isAmbientLightProbe=!0;const _c=new se,wc=new se;class bc{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Mc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Mc(){return("undefined"==typeof performance?Date:performance).now()}const Sc=new Lt,Tc=new At,Ec=new Lt,Ac=new Lt;class Lc extends Ce{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(!0===this.isPlaying)return void console.warn("THREE.Audio: Audio is already playing.");if(!1===this.hasPlaybackControl)return void console.warn("THREE.Audio: this Audio has no playback control.");this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(!1!==this.hasPlaybackControl)return!0===this.isPlaying&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,!0===this.loop&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this;console.warn("THREE.Audio: this Audio has no playback control.")}stop(){if(!1!==this.hasPlaybackControl)return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this;console.warn("THREE.Audio: this Audio has no playback control.")}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(t){return t||(t=[]),!0===this._connected?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){if(this.detune=t,void 0!==this.source.detune)return!0===this.isPlaying&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(!1!==this.hasPlaybackControl)return this.playbackRate=t,!0===this.isPlaying&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this;console.warn("THREE.Audio: this Audio has no playback control.")}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(!1!==this.hasPlaybackControl)return this.loop=t,!0===this.isPlaying&&(this.source.loop=this.loop),this;console.warn("THREE.Audio: this Audio has no playback control.")}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const Rc=new Lt,Cc=new At,Pc=new Lt,Dc=new Lt;class Ic{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class Nc{constructor(t,e,n){let i,r,s;switch(this.binding=t,this.valueSize=n,e){case"quaternion":i=this._slerp,r=this._slerpAdditive,s=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(6*n),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,s=this._setAdditiveIdentityOther,this.buffer=new Array(5*n);break;default:i=this._lerp,r=this._lerpAdditive,s=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(5*n)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=s,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let s=this.cumulativeWeight;if(0===s){for(let t=0;t!==i;++t)n[r+t]=n[t];s=e}else{s+=e;const t=e/s;this._mixBufferRegion(n,r,0,t,i)}this.cumulativeWeight=s}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;0===this.cumulativeWeightAdditive&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,s=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const t=e*this._origIndex;this._mixBufferRegion(n,i,t,1-r,e)}s>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let t=e,r=e+e;t!==r;++t)if(n[t]!==n[t+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let t=n,r=i;t!==r;++t)e[t]=e[i+t%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=3*this.valueSize;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let i=0;i!==r;++i)t[e+i]=t[n+i]}_slerp(t,e,n,i){At.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const s=this._workIndex*r;At.multiplyQuaternionsFlat(t,s,t,e,t,n),At.slerpFlat(t,e,t,e,t,s,i)}_lerp(t,e,n,i,r){const s=1-i;for(let a=0;a!==r;++a){const r=e+a;t[r]=t[r]*s+t[n+a]*i}}_lerpAdditive(t,e,n,i,r){for(let s=0;s!==r;++s){const r=e+s;t[r]=t[r]+t[n+s]*i}}}const Bc="\\[\\]\\.:\\/",zc=new RegExp("[\\[\\]\\.:\\/]","g"),Fc="[^\\[\\]\\.:\\/]",Oc="[^"+Bc.replace("\\.","")+"]",Hc=/((?:WC+[\/:])*)/.source.replace("WC",Fc),Gc=/(WCOD+)?/.source.replace("WCOD",Oc),Uc=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fc),kc=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fc),Vc=new RegExp("^"+Hc+Gc+Uc+kc+"$"),Wc=["material","materials","bones"];class jc{constructor(t,e,n){this.path=e,this.parsedPath=n||jc.parseTrackName(e),this.node=jc.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new jc.Composite(t,e,n):new jc(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(zc,"")}static parseTrackName(t){const e=Vc.exec(t);if(!e)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(void 0!==i&&-1!==i){const t=n.nodeName.substring(i+1);-1!==Wc.indexOf(t)&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=t)}if(null===n.propertyName||0===n.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(!e||""===e||"."===e||-1===e||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(void 0!==n)return n}if(t.children){const n=function(t){for(let i=0;i<t.length;i++){const r=t[i];if(r.name===e||r.uuid===e)return r;const s=n(r.children);if(s)return s}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.node[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=jc.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t)return void console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");if(n){let i=e.objectIndex;switch(n){case"materials":if(!t.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!t.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);t=t.material.materials;break;case"bones":if(!t.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);t=t.skeleton.bones;for(let e=0;e<t.length;e++)if(t[e].name===i){i=e;break}break;default:if(void 0===t[n])return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);t=t[n]}if(void 0!==i){if(void 0===t[i])return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);t=t[i]}}const s=t[i];if(void 0===s){const n=e.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+n+"."+i+" but it wasn't found.",t)}let a=this.Versioning.None;this.targetObject=t,void 0!==t.needsUpdate?a=this.Versioning.NeedsUpdate:void 0!==t.matrixWorldNeedsUpdate&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(void 0!==r){if("morphTargetInfluences"===i){if(!t.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!t.geometry.isBufferGeometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);if(!t.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);void 0!==t.morphTargetDictionary[r]&&(r=t.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else void 0!==s.fromArray&&void 0!==s.toArray?(o=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(o=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}jc.Composite=class{constructor(t,e,n){const i=n||jc.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];void 0!==i&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},jc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},jc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},jc.prototype.GetterByBindingType=[jc.prototype._getValue_direct,jc.prototype._getValue_array,jc.prototype._getValue_arrayElement,jc.prototype._getValue_toArray],jc.prototype.SetterByBindingTypeAndVersioning=[[jc.prototype._setValue_direct,jc.prototype._setValue_direct_setNeedsUpdate,jc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[jc.prototype._setValue_array,jc.prototype._setValue_array_setNeedsUpdate,jc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[jc.prototype._setValue_arrayElement,jc.prototype._setValue_arrayElement_setNeedsUpdate,jc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[jc.prototype._setValue_fromArray,jc.prototype._setValue_fromArray_setNeedsUpdate,jc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class qc{constructor(){this.uuid=ct(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let e=0,n=arguments.length;e!==n;++e)t[arguments[e].uuid]=e;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,s=r.length;let a,o=t.length,l=this.nCachedObjects_;for(let c=0,h=arguments.length;c!==h;++c){const h=arguments[c],u=h.uuid;let d=e[u];if(void 0===d){d=o++,e[u]=d,t.push(h);for(let t=0,e=s;t!==e;++t)r[t].push(new jc(h,n[t],i[t]))}else if(d<l){a=t[d];const o=--l,c=t[o];e[c.uuid]=d,t[d]=c,e[u]=o,t[o]=h;for(let t=0,e=s;t!==e;++t){const e=r[t],s=e[o];let a=e[d];e[d]=s,void 0===a&&(a=new jc(h,n[t],i[t])),e[o]=a}}else t[d]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=l}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let s=0,a=arguments.length;s!==a;++s){const a=arguments[s],o=a.uuid,l=e[o];if(void 0!==l&&l>=r){const s=r++,c=t[s];e[c.uuid]=l,t[l]=c,e[o]=s,t[s]=a;for(let t=0,e=i;t!==e;++t){const e=n[t],i=e[s],r=e[l];e[l]=i,e[s]=r}}}this.nCachedObjects_=r}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,s=t.length;for(let a=0,o=arguments.length;a!==o;++a){const o=arguments[a].uuid,l=e[o];if(void 0!==l)if(delete e[o],l<r){const a=--r,o=t[a],c=--s,h=t[c];e[o.uuid]=l,t[l]=o,e[h.uuid]=a,t[a]=h,t.pop();for(let t=0,e=i;t!==e;++t){const e=n[t],i=e[a],r=e[c];e[l]=i,e[a]=r,e.pop()}}else{const r=--s,a=t[r];r>0&&(e[a.uuid]=l),t[l]=a,t.pop();for(let t=0,e=i;t!==e;++t){const e=n[t];e[l]=e[r],e.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const r=this._bindings;if(void 0!==i)return r[i];const s=this._paths,a=this._parsedPaths,o=this._objects,l=o.length,c=this.nCachedObjects_,h=new Array(l);i=r.length,n[t]=i,s.push(t),a.push(e),r.push(h);for(let n=c,i=o.length;n!==i;++n){const i=o[n];h[n]=new jc(i,t,e)}return h}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(void 0!==n){const i=this._paths,r=this._parsedPaths,s=this._bindings,a=s.length-1,o=s[a];e[t[a]]=n,s[n]=o,s.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}qc.prototype.isAnimationObjectGroup=!0;class Xc{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,s=r.length,a=new Array(s),o={endingStart:k,endingEnd:k};for(let t=0;t!==s;++t){const e=r[t].createInterpolant(null);a[t]=e,e.settings=o}this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=new Array(s),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const n=this._clip.duration,i=t._clip.duration,r=i/n,s=n/i;t.warp(1,r,e),this.warp(s,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return null!==t&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,s=this.timeScale;let a=this._timeScaleInterpolant;null===a&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,o[1]=r+n,l[0]=t/s,l[1]=e/s,this}stopWarping(){const t=this._timeScaleInterpolant;return null!==t&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled)return void this._updateWeight(t);const r=this._startTime;if(null!==r){const i=(t-r)*n;if(i<0||0===n)return;this._startTime=null,e=n*i}e*=this._updateTimeScale(t);const s=this._updateTime(e),a=this._updateWeight(t);if(a>0){const t=this._interpolants,e=this._propertyBindings;switch(this.blendMode){case q:for(let n=0,i=t.length;n!==i;++n)t[n].evaluate(s),e[n].accumulateAdditive(a);break;case j:default:for(let n=0,r=t.length;n!==r;++n)t[n].evaluate(s),e[n].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(null!==n){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),0===i&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(null!==n){e*=n.evaluate(t)[0],t>n.parameterPositions[1]&&(this.stopWarping(),0===e?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const s=2202===n;if(0===t)return-1===r?i:s&&1==(1&r)?e-i:i;if(2200===n){-1===r&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else{if(!(i<0)){this.time=i;break t}i=0}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(-1===r&&(t>=0?(r=0,this._setEndings(!0,0===this.repetitions,s)):this._setEndings(0===this.repetitions,!0,s)),i>=e||i<0){const n=Math.floor(i/e);i-=e*n,r+=Math.abs(n);const a=this.repetitions-r;if(a<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(1===a){const e=t<0;this._setEndings(e,!e,s)}else this._setEndings(!1,!1,s);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:n})}}else this.time=i;if(s&&1==(1&r))return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=V,i.endingEnd=V):(i.endingStart=t?this.zeroSlopeAtStart?V:k:W,i.endingEnd=e?this.zeroSlopeAtEnd?V:k:W)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let s=this._weightInterpolant;null===s&&(s=i._lendControlInterpolant(),this._weightInterpolant=s);const a=s.parameterPositions,o=s.sampleValues;return a[0]=r,o[0]=e,a[1]=r+t,o[1]=n,this}}class Yc extends rt{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,s=t._propertyBindings,a=t._interpolants,o=n.uuid,l=this._bindingsByRootAndName;let c=l[o];void 0===c&&(c={},l[o]=c);for(let t=0;t!==r;++t){const r=i[t],l=r.name;let h=c[l];if(void 0!==h)s[t]=h;else{if(h=s[t],void 0!==h){null===h._cacheIndex&&(++h.referenceCount,this._addInactiveBinding(h,o,l));continue}const i=e&&e._propertyBindings[t].binding.parsedPath;h=new Nc(jc.create(n,l,i),r.ValueTypeName,r.getValueSize()),++h.referenceCount,this._addInactiveBinding(h,o,l),s[t]=h}a[t].resultBuffer=h.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(null===t._cacheIndex){const e=(t._localRoot||this._root).uuid,n=t._clip.uuid,i=this._actionsByClip[n];this._bindAction(t,i&&i.knownActions[0]),this._addInactiveAction(t,n,e)}const e=t._propertyBindings;for(let t=0,n=e.length;t!==n;++t){const n=e[t];0==n.useCount++&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let t=0,n=e.length;t!==n;++t){const n=e[t];0==--n.useCount&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return null!==e&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let s=r[e];if(void 0===s)s={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=s;else{const e=s.knownActions;t._byClipCacheIndex=e.length,e.push(t)}t._cacheIndex=i.length,i.push(t),s.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,s=this._actionsByClip,a=s[r],o=a.knownActions,l=o[o.length-1],c=t._byClipCacheIndex;l._byClipCacheIndex=c,o[c]=l,o.pop(),t._byClipCacheIndex=null;delete a.actionByRoot[(t._localRoot||this._root).uuid],0===o.length&&delete s[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let t=0,n=e.length;t!==n;++t){const n=e[t];0==--n.referenceCount&&this._removeInactiveBinding(n)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let s=i[e];void 0===s&&(s={},i[e]=s),s[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,s=this._bindingsByRootAndName,a=s[i],o=e[e.length-1],l=t._cacheIndex;o._cacheIndex=l,e[l]=o,e.pop(),delete a[r],0===Object.keys(a).length&&delete s[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return void 0===n&&(n=new qo(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let s="string"==typeof t?nl.findByName(i,t):t;const a=null!==s?s.uuid:t,o=this._actionsByClip[a];let l=null;if(void 0===n&&(n=null!==s?s.blendMode:j),void 0!==o){const t=o.actionByRoot[r];if(void 0!==t&&t.blendMode===n)return t;l=o.knownActions[0],null===s&&(s=l._clip)}if(null===s)return null;const c=new Xc(this,s,e,n);return this._bindAction(c,l),this._addInactiveAction(c,a,r),c}existingAction(t,e){const n=e||this._root,i=n.uuid,r="string"==typeof t?nl.findByName(n,t):t,s=r?r.uuid:t,a=this._actionsByClip[s];return void 0!==a&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions;for(let e=this._nActiveActions-1;e>=0;--e)t[e].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),s=this._accuIndex^=1;for(let a=0;a!==n;++a){e[a]._update(i,t,r,s)}const a=this._bindings,o=this._nActiveBindings;for(let t=0;t!==o;++t)a[t].apply(s);return this}setTime(t){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(void 0!==r){const t=r.knownActions;for(let n=0,i=t.length;n!==i;++n){const i=t[n];this._deactivateAction(i);const r=i._cacheIndex,s=e[e.length-1];i._cacheIndex=null,i._byClipCacheIndex=null,s._cacheIndex=r,e[r]=s,e.pop(),this._removeInactiveBindingsForAction(i)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const t in n){const i=n[t].actionByRoot[e];void 0!==i&&(this._deactivateAction(i),this._removeInactiveAction(i))}const i=this._bindingsByRootAndName[e];if(void 0!==i)for(const t in i){const e=i[t];e.restoreOriginalState(),this._removeInactiveBinding(e)}}uncacheAction(t,e){const n=this.existingAction(t,e);null!==n&&(this._deactivateAction(n),this._removeInactiveAction(n))}}Yc.prototype._controlInterpolantsResultBuffer=new Float32Array(1);class Zc{constructor(t){"string"==typeof t&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),t=arguments[1]),this.value=t}clone(){return new Zc(void 0===this.value.clone?this.value:this.value.clone())}}class Jc extends Es{constructor(t,e,n=1){super(t,e),this.meshPerAttribute=n||1}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}Jc.prototype.isInstancedInterleavedBuffer=!0;class Qc{constructor(t,e,n,i,r){this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(t){!0===t&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}Qc.prototype.isGLBufferAttribute=!0;function Kc(t,e){return t.distance-e.distance}function $c(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),!0===i){const i=t.children;for(let t=0,r=i.length;t<r;t++)$c(i[t],e,n,!0)}}const th=new vt;class eh{constructor(t=new vt(1/0,1/0),e=new vt(-1/0,-1/0)){this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=th.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return void 0===t&&(console.warn("THREE.Box2: .getCenter() target is now required"),t=new vt),this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return void 0===t&&(console.warn("THREE.Box2: .getSize() target is now required"),t=new vt),this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return void 0===e&&(console.warn("THREE.Box2: .getParameter() target is now required"),e=new vt),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y)}clampPoint(t,e){return void 0===e&&(console.warn("THREE.Box2: .clampPoint() target is now required"),e=new vt),e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return th.copy(t).clamp(this.min,this.max).sub(t).length()}intersect(t){return this.min.max(t.min),this.max.min(t.max),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}eh.prototype.isBox2=!0;const nh=new Lt,ih=new Lt;class rh{constructor(t=new Lt,e=new Lt){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return void 0===t&&(console.warn("THREE.Line3: .getCenter() target is now required"),t=new Lt),t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return void 0===t&&(console.warn("THREE.Line3: .delta() target is now required"),t=new Lt),t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return void 0===e&&(console.warn("THREE.Line3: .at() target is now required"),e=new Lt),this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){nh.subVectors(t,this.start),ih.subVectors(this.end,this.start);const n=ih.dot(ih);let i=ih.dot(nh)/n;return e&&(i=ht(i,0,1)),i}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return void 0===n&&(console.warn("THREE.Line3: .closestPointToPoint() target is now required"),n=new Lt),this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return(new this.constructor).copy(this)}}class sh extends Ce{constructor(t){super(),this.material=t,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}}sh.prototype.isImmediateRenderObject=!0;const ah=new Lt;const oh=new Lt,lh=new se,ch=new se;class hh extends ya{constructor(t){const e=uh(t),n=new En,i=[],r=[],s=new tn(0,0,1),a=new tn(0,1,0);for(let t=0;t<e.length;t++){const n=e[t];n.parent&&n.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(s.r,s.g,s.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new mn(i,3)),n.setAttribute("color",new mn(r,3));super(n,new ca({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0})),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");ch.copy(this.root.matrixWorld).invert();for(let t=0,n=0;t<e.length;t++){const r=e[t];r.parent&&r.parent.isBone&&(lh.multiplyMatrices(ch,r.matrixWorld),oh.setFromMatrixPosition(lh),i.setXYZ(n,oh.x,oh.y,oh.z),lh.multiplyMatrices(ch,r.parent.matrixWorld),oh.setFromMatrixPosition(lh),i.setXYZ(n+1,oh.x,oh.y,oh.z),n+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}}function uh(t){const e=[];t&&t.isBone&&e.push(t);for(let n=0;n<t.children.length;n++)e.push.apply(e,uh(t.children[n]));return e}const dh=new Lt,ph=new tn,mh=new tn;class fh extends ya{constructor(t=10,e=10,n=4473924,i=8947848){n=new tn(n),i=new tn(i);const r=e/2,s=t/e,a=t/2,o=[],l=[];for(let t=0,c=0,h=-a;t<=e;t++,h+=s){o.push(-a,0,h,a,0,h),o.push(h,0,-a,h,0,a);const e=t===r?n:i;e.toArray(l,c),c+=3,e.toArray(l,c),c+=3,e.toArray(l,c),c+=3,e.toArray(l,c),c+=3}const c=new En;c.setAttribute("position",new mn(o,3)),c.setAttribute("color",new mn(l,3));super(c,new ca({vertexColors:!0,toneMapped:!1})),this.type="GridHelper"}}const gh=new Lt,vh=new Lt,yh=new Lt;const xh=new Lt,_h=new Qn;function wh(t,e,n,i,r,s,a){xh.set(r,s,a).unproject(i);const o=e[t];if(void 0!==o){const t=n.getAttribute("position");for(let e=0,n=o.length;e<n;e++)t.setXYZ(o[e],xh.x,xh.y,xh.z)}}const bh=new Pt;class Mh extends ya{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new En;r.setIndex(new sn(n,1)),r.setAttribute("position",new sn(i,3)),super(r,new ca({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(void 0!==t&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),void 0!==this.object&&bh.setFromObject(this.object),bh.isEmpty())return;const e=bh.min,n=bh.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=e.x,r[4]=n.y,r[5]=n.z,r[6]=e.x,r[7]=e.y,r[8]=n.z,r[9]=n.x,r[10]=e.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=e.z,r[15]=e.x,r[16]=n.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=n.x,r[22]=e.y,r[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t){return ya.prototype.copy.call(this,t),this.object=t.object,this}}const Sh=new Lt;let Th,Eh;class Ah extends ya{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=new En;n.setAttribute("position",new mn(e,3)),n.setAttribute("color",new mn([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));super(n,new ca({vertexColors:!0,toneMapped:!1})),this.type="AxesHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Lh=new Float32Array(1),Rh=new Int32Array(Lh.buffer);const Ch=Math.pow(2,8),Ph=[.125,.215,.35,.446,.526,.582],Dh=5+Ph.length,Ih=20,Nh={[X]:0,[Y]:1,[J]:2,[Q]:3,[K]:4,[$]:5,[Z]:6},Bh=new en({side:1,depthWrite:!1,depthTest:!1}),zh=new Wn(new qn,Bh),Fh=new Jl,{_lodPlanes:Oh,_sizeLods:Hh,_sigmas:Gh}=Yh(),Uh=new tn;let kh=null;const Vh=(1+Math.sqrt(5))/2,Wh=1/Vh,jh=[new Lt(1,1,1),new Lt(-1,1,1),new Lt(1,1,-1),new Lt(-1,1,-1),new Lt(0,Vh,Wh),new Lt(0,Vh,-Wh),new Lt(Wh,0,Vh),new Lt(-Wh,0,Vh),new Lt(Vh,Wh,0),new Lt(-Vh,Wh,0)];function qh(t){const e=Math.max(t.r,t.g,t.b),n=Math.min(Math.max(Math.ceil(Math.log2(e)),-128),127);t.multiplyScalar(Math.pow(2,-n));return(n+128)/255}function Xh(t){return void 0!==t&&t.type===x&&(t.encoding===X||t.encoding===Y||t.encoding===Z)}function Yh(){const t=[],e=[],n=[];let i=8;for(let r=0;r<Dh;r++){const s=Math.pow(2,i);e.push(s);let a=1/s;r>4?a=Ph[r-8+4-1]:0==r&&(a=0),n.push(a);const o=1/(s-1),l=-o/2,c=1+o/2,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,p=3,m=2,f=1,g=new Float32Array(p*d*u),v=new Float32Array(m*d*u),y=new Float32Array(f*d*u);for(let t=0;t<u;t++){const e=t%3*2/3-1,n=t>2?0:-1,i=[e,n,0,e+2/3,n,0,e+2/3,n+1,0,e,n,0,e+2/3,n+1,0,e,n+1,0];g.set(i,p*d*t),v.set(h,m*d*t);const r=[t,t,t,t,t,t];y.set(r,f*d*t)}const x=new En;x.setAttribute("position",new sn(g,p)),x.setAttribute("uv",new sn(v,m)),x.setAttribute("faceIndex",new sn(y,f)),t.push(x),i>4&&i--}return{_lodPlanes:t,_sizeLods:e,_sigmas:n}}function Zh(t){const e=new Tt(3*Ch,3*Ch,t);return e.texture.mapping=l,e.texture.name="PMREM.cubeUv",e.scissorTest=!0,e}function Jh(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Qh(){const t=new vt(1,1);return new Io({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null},texelSize:{value:t},inputEncoding:{value:Nh[3e3]},outputEncoding:{value:Nh[3e3]}},vertexShader:$h(),fragmentShader:`\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform vec2 texelSize;\n\n\t\t\t${tu()}\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tvec2 f = fract( uv / texelSize - 0.5 );\n\t\t\t\tuv -= f * texelSize;\n\t\t\t\tvec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x += texelSize.x;\n\t\t\t\tvec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.y += texelSize.y;\n\t\t\t\tvec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x -= texelSize.x;\n\t\t\t\tvec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\n\t\t\t\tvec3 tm = mix( tl, tr, f.x );\n\t\t\t\tvec3 bm = mix( bl, br, f.x );\n\t\t\t\tgl_FragColor.rgb = mix( tm, bm, f.y );\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,blending:0,depthTest:!1,depthWrite:!1})}function Kh(){return new Io({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},inputEncoding:{value:Nh[3e3]},outputEncoding:{value:Nh[3e3]}},vertexShader:$h(),fragmentShader:`\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\t${tu()}\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,blending:0,depthTest:!1,depthWrite:!1})}function $h(){return"\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t"}function tu(){return"\n\n\t\tuniform int inputEncoding;\n\t\tuniform int outputEncoding;\n\n\t\t#include <encodings_pars_fragment>\n\n\t\tvec4 inputTexelToLinear( vec4 value ) {\n\n\t\t\tif ( inputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( inputEncoding == 1 ) {\n\n\t\t\t\treturn sRGBToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 2 ) {\n\n\t\t\t\treturn RGBEToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 3 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 7.0 );\n\n\t\t\t} else if ( inputEncoding == 4 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 16.0 );\n\n\t\t\t} else if ( inputEncoding == 5 ) {\n\n\t\t\t\treturn RGBDToLinear( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn GammaToLinear( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 linearToOutputTexel( vec4 value ) {\n\n\t\t\tif ( outputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( outputEncoding == 1 ) {\n\n\t\t\t\treturn LinearTosRGB( value );\n\n\t\t\t} else if ( outputEncoding == 2 ) {\n\n\t\t\t\treturn LinearToRGBE( value );\n\n\t\t\t} else if ( outputEncoding == 3 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 7.0 );\n\n\t\t\t} else if ( outputEncoding == 4 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 16.0 );\n\n\t\t\t} else if ( outputEncoding == 5 ) {\n\n\t\t\t\treturn LinearToRGBD( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn LinearToGamma( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 envMapTexelToLinear( vec4 color ) {\n\n\t\t\treturn inputTexelToLinear( color );\n\n\t\t}\n\t"}ml.create=function(t,e){return console.log("THREE.Curve.create() has been deprecated"),t.prototype=Object.create(ml.prototype),t.prototype.constructor=t,t.prototype.getPoint=e,t},Bl.prototype.fromPoints=function(t){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(t)},fh.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")},hh.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")},ol.prototype.extractUrlBase=function(t){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),rc.extractUrlBase(t)},ol.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}},eh.prototype.center=function(t){return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(t)},eh.prototype.empty=function(){return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty()},eh.prototype.isIntersectionBox=function(t){return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t)},eh.prototype.size=function(t){return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(t)},Pt.prototype.center=function(t){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(t)},Pt.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()},Pt.prototype.isIntersectionBox=function(t){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t)},Pt.prototype.isIntersectionSphere=function(t){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(t)},Pt.prototype.size=function(t){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(t)},Jt.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()},ai.prototype.setFromMatrix=function(t){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(t)},rh.prototype.center=function(t){return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."),this.getCenter(t)},yt.prototype.flattenToArrayOffset=function(t,e){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(t,e)},yt.prototype.multiplyVector3=function(t){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),t.applyMatrix3(this)},yt.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},yt.prototype.applyToBufferAttribute=function(t){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),t.applyMatrix3(this)},yt.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")},yt.prototype.getInverse=function(t){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(t).invert()},se.prototype.extractPosition=function(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)},se.prototype.flattenToArrayOffset=function(t,e){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(t,e)},se.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),(new Lt).setFromMatrixColumn(this,3)},se.prototype.setRotationFromQuaternion=function(t){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(t)},se.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},se.prototype.multiplyVector3=function(t){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this)},se.prototype.multiplyVector4=function(t){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this)},se.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},se.prototype.rotateAxis=function(t){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),t.transformDirection(this)},se.prototype.crossVector=function(t){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this)},se.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")},se.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")},se.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")},se.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")},se.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},se.prototype.applyToBufferAttribute=function(t){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),t.applyMatrix4(this)},se.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},se.prototype.makeFrustum=function(t,e,n,i,r,s){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(t,e,i,n,r,s)},se.prototype.getInverse=function(t){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(t).invert()},Ne.prototype.isIntersectionLine=function(t){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(t)},At.prototype.multiplyVector3=function(t){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),t.applyQuaternion(this)},At.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()},re.prototype.isIntersectionBox=function(t){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t)},re.prototype.isIntersectionPlane=function(t){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(t)},re.prototype.isIntersectionSphere=function(t){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(t)},je.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()},je.prototype.barycoordFromPoint=function(t,e){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(t,e)},je.prototype.midpoint=function(t){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(t)},je.prototypenormal=function(t){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(t)},je.prototype.plane=function(t){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(t)},je.barycoordFromPoint=function(t,e,n,i,r){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),je.getBarycoord(t,e,n,i,r)},je.normal=function(t,e,n,i){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),je.getNormal(t,e,n,i)},zl.prototype.extractAllPoints=function(t){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(t)},zl.prototype.extrude=function(t){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new go(this,t)},zl.prototype.makeGeometry=function(t){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new Mo(this,t)},vt.prototype.fromAttribute=function(t,e,n){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n)},vt.prototype.distanceToManhattan=function(t){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(t)},vt.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()},Lt.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},Lt.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},Lt.prototype.getPositionFromMatrix=function(t){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(t)},Lt.prototype.getScaleFromMatrix=function(t){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(t)},Lt.prototype.getColumnFromMatrix=function(t,e){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,t)},Lt.prototype.applyProjection=function(t){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(t)},Lt.prototype.fromAttribute=function(t,e,n){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n)},Lt.prototype.distanceToManhattan=function(t){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(t)},Lt.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()},St.prototype.fromAttribute=function(t,e,n){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n)},St.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()},Ce.prototype.getChildByName=function(t){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(t)},Ce.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},Ce.prototype.translate=function(t,e){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,t)},Ce.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")},Ce.prototype.applyMatrix=function(t){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(t)},Object.defineProperties(Ce.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(t){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=t}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}}),Wn.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")},Object.defineProperties(Wn.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),0},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}}),$s.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")},Kn.prototype.setLens=function(t,e){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),void 0!==e&&(this.filmGauge=e),this.setFocalLength(t)},Object.defineProperties(Fl.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(t){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=t}},shadowCameraLeft:{set:function(t){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=t}},shadowCameraRight:{set:function(t){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=t}},shadowCameraTop:{set:function(t){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=t}},shadowCameraBottom:{set:function(t){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=t}},shadowCameraNear:{set:function(t){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=t}},shadowCameraFar:{set:function(t){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=t}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(t){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=t}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(t){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=t}},shadowMapHeight:{set:function(t){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=t}}}),Object.defineProperties(sn.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===nt},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(nt)}}}),sn.prototype.setDynamic=function(t){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(!0===t?nt:et),this},sn.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},sn.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")},En.prototype.addIndex=function(t){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(t)},En.prototype.addAttribute=function(t,e){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),e&&e.isBufferAttribute||e&&e.isInterleavedBufferAttribute?"index"===t?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):this.setAttribute(t,e):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(t,new sn(arguments[1],arguments[2])))},En.prototype.addDrawCall=function(t,e,n){void 0!==n&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(t,e)},En.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()},En.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")},En.prototype.removeAttribute=function(t){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(t)},En.prototype.applyMatrix=function(t){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(t)},Object.defineProperties(En.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}}),Es.prototype.setDynamic=function(t){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(!0===t?nt:et),this},Es.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")},go.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")},go.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")},go.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")},Ts.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")},Zc.prototype.onUpdate=function(){return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."),this},Object.defineProperties(Xe.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new tn}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(t){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=1===t}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(t){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=t}}}),Object.defineProperties(Jn.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(t){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=t}}}),ws.prototype.clearTarget=function(t,e,n,i){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(t),this.clear(e,n,i)},ws.prototype.animate=function(t){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(t)},ws.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()},ws.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()},ws.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision},ws.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()},ws.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")},ws.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")},ws.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")},ws.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")},ws.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")},ws.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")},ws.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures},ws.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")},ws.prototype.enableScissorTest=function(t){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(t)},ws.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},ws.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},ws.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},ws.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")},ws.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")},ws.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")},ws.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")},ws.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")},ws.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")},ws.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()},Object.defineProperties(ws.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(t){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=t}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(t){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=t}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(t){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=!0===t?Y:X}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}}),Object.defineProperties(us.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}}),Object.defineProperties(Tt.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(t){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=t}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(t){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=t}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(t){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=t}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(t){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=t}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(t){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=t}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(t){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=t}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(t){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=t}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(t){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=t}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(t){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=t}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(t){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=t}}}),Lc.prototype.load=function(t){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const e=this;return(new vc).load(t,(function(t){e.setBuffer(t)})),this},Ic.prototype.getData=function(){return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."),this.getFrequencyData()},ti.prototype.updateCubeMap=function(t,e){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(t,e)},ti.prototype.clear=function(t,e,n,i){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(t,e,n,i)},_t.crossOrigin=void 0,_t.loadTexture=function(t,e,n,i){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const r=new pl;r.setCrossOrigin(this.crossOrigin);const s=r.load(t,n,void 0,i);return e&&(s.mapping=e),s},_t.loadTextureCube=function(t,e,n,i){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const r=new ul;r.setCrossOrigin(this.crossOrigin);const s=r.load(t,n,void 0,i);return e&&(s.mapping=e),s},_t.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},_t.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};const eu={createMultiMaterialObject:function(){console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")},detach:function(){console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")},attach:function(){console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js")}};"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:e}})),"undefined"!=typeof window&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=e),t.ACESFilmicToneMapping=4,t.AddEquation=n,t.AddOperation=2,t.AdditiveAnimationBlendMode=q,t.AdditiveBlending=2,t.AlphaFormat=1021,t.AlwaysDepth=1,t.AlwaysStencilFunc=519,t.AmbientLight=$l,t.AmbientLightProbe=xc,t.AnimationClip=nl,t.AnimationLoader=class extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=new cl(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(t,(function(n){try{e(r.parse(JSON.parse(n)))}catch(e){i?i(e):console.error(e),r.manager.itemError(t)}}),n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=nl.parse(t[n]);e.push(i)}return e}},t.AnimationMixer=Yc,t.AnimationObjectGroup=qc,t.AnimationUtils=Vo,t.ArcCurve=gl,t.ArrayCamera=fs,t.ArrowHelper=class extends Ce{constructor(t=new Lt(0,0,1),e=new Lt(0,0,0),n=1,i=16776960,r=.2*n,s=.2*r){super(),this.type="ArrowHelper",void 0===Th&&(Th=new En,Th.setAttribute("position",new mn([0,0,0,0,1,0],3)),Eh=new Da(0,.5,1,5,1),Eh.translate(0,-.5,0)),this.position.copy(e),this.line=new fa(Th,new ca({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Wn(Eh,new en({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,s)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Sh.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Sh,e)}}setLength(t,e=.2*t,n=.2*e){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}},t.Audio=Lc,t.AudioAnalyser=Ic,t.AudioContext=gc,t.AudioListener=class extends Ce{constructor(){super(),this.type="AudioListener",this.context=gc.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new bc}getInput(){return this.gain}removeFilter(){return null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Sc,Tc,Ec),Ac.set(0,0,-1).applyQuaternion(Tc),e.positionX){const t=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Sc.x,t),e.positionY.linearRampToValueAtTime(Sc.y,t),e.positionZ.linearRampToValueAtTime(Sc.z,t),e.forwardX.linearRampToValueAtTime(Ac.x,t),e.forwardY.linearRampToValueAtTime(Ac.y,t),e.forwardZ.linearRampToValueAtTime(Ac.z,t),e.upX.linearRampToValueAtTime(n.x,t),e.upY.linearRampToValueAtTime(n.y,t),e.upZ.linearRampToValueAtTime(n.z,t)}else e.setPosition(Sc.x,Sc.y,Sc.z),e.setOrientation(Ac.x,Ac.y,Ac.z,n.x,n.y,n.z)}},t.AudioLoader=vc,t.AxesHelper=Ah,t.AxisHelper=function(t){return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."),new Ah(t)},t.BackSide=1,t.BasicDepthPacking=3200,t.BasicShadowMap=0,t.BinaryTextureLoader=function(t){return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."),new dl(t)},t.Bone=ta,t.BooleanKeyframeTrack=Zo,t.BoundingBoxHelper=function(t,e){return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."),new Mh(t,e)},t.Box2=eh,t.Box3=Pt,t.Box3Helper=class extends ya{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new En;i.setIndex(new sn(n,1)),i.setAttribute("position",new mn([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3)),super(i,new ca({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}},t.BoxBufferGeometry=qn,t.BoxGeometry=qn,t.BoxHelper=Mh,t.BufferAttribute=sn,t.BufferGeometry=En,t.BufferGeometryLoader=oc,t.ByteType=1010,t.Cache=rl,t.Camera=Qn,t.CameraHelper=class extends ya{constructor(t){const e=new En,n=new ca({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],s={},a=new tn(16755200),o=new tn(16711680),l=new tn(43775),c=new tn(16777215),h=new tn(3355443);function u(t,e,n){d(t,n),d(e,n)}function d(t,e){i.push(0,0,0),r.push(e.r,e.g,e.b),void 0===s[t]&&(s[t]=[]),s[t].push(i.length/3-1)}u("n1","n2",a),u("n2","n4",a),u("n4","n3",a),u("n3","n1",a),u("f1","f2",a),u("f2","f4",a),u("f4","f3",a),u("f3","f1",a),u("n1","f1",a),u("n2","f2",a),u("n3","f3",a),u("n4","f4",a),u("p","n1",o),u("p","n2",o),u("p","n3",o),u("p","n4",o),u("u1","u2",l),u("u2","u3",l),u("u3","u1",l),u("c","t",c),u("p","c",h),u("cn1","cn2",h),u("cn3","cn4",h),u("cf1","cf2",h),u("cf3","cf4",h),e.setAttribute("position",new mn(i,3)),e.setAttribute("color",new mn(r,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=s,this.update()}update(){const t=this.geometry,e=this.pointMap;_h.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),wh("c",e,t,_h,0,0,-1),wh("t",e,t,_h,0,0,1),wh("n1",e,t,_h,-1,-1,-1),wh("n2",e,t,_h,1,-1,-1),wh("n3",e,t,_h,-1,1,-1),wh("n4",e,t,_h,1,1,-1),wh("f1",e,t,_h,-1,-1,1),wh("f2",e,t,_h,1,-1,1),wh("f3",e,t,_h,-1,1,1),wh("f4",e,t,_h,1,1,1),wh("u1",e,t,_h,.7,1.1,-1),wh("u2",e,t,_h,-.7,1.1,-1),wh("u3",e,t,_h,0,2,-1),wh("cf1",e,t,_h,-1,0,1),wh("cf2",e,t,_h,1,0,1),wh("cf3",e,t,_h,0,-1,1),wh("cf4",e,t,_h,0,1,1),wh("cn1",e,t,_h,-1,0,-1),wh("cn2",e,t,_h,1,0,-1),wh("cn3",e,t,_h,0,-1,-1),wh("cn4",e,t,_h,0,1,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}},t.CanvasRenderer=function(){console.error("THREE.CanvasRenderer has been removed")},t.CanvasTexture=Ra,t.CatmullRomCurve3=bl,t.CineonToneMapping=3,t.CircleBufferGeometry=Pa,t.CircleGeometry=Pa,t.ClampToEdgeWrapping=u,t.Clock=bc,t.Color=tn,t.ColorKeyframeTrack=Jo,t.CompressedTexture=La,t.CompressedTextureLoader=class extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=[],a=new La,o=new cl(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(r.withCredentials);let l=0;function c(c){o.load(t[c],(function(t){const n=r.parse(t,!0);s[c]={width:n.width,height:n.height,format:n.format,mipmaps:n.mipmaps},l+=1,6===l&&(1===n.mipmapCount&&(a.minFilter=g),a.image=s,a.format=n.format,a.needsUpdate=!0,e&&e(a))}),n,i)}if(Array.isArray(t))for(let e=0,n=t.length;e<n;++e)c(e);else o.load(t,(function(t){const n=r.parse(t,!0);if(n.isCubemap){const t=n.mipmaps.length/n.mipmapCount;for(let e=0;e<t;e++){s[e]={mipmaps:[]};for(let t=0;t<n.mipmapCount;t++)s[e].mipmaps.push(n.mipmaps[e*n.mipmapCount+t]),s[e].format=n.format,s[e].width=n.width,s[e].height=n.height}a.image=s}else a.image.width=n.width,a.image.height=n.height,a.mipmaps=n.mipmaps;1===n.mipmapCount&&(a.minFilter=g),a.format=n.format,a.needsUpdate=!0,e&&e(a)}),n,i);return a}},t.ConeBufferGeometry=Ia,t.ConeGeometry=Ia,t.CubeCamera=ti,t.CubeReflectionMapping=r,t.CubeRefractionMapping=s,t.CubeTexture=ei,t.CubeTextureLoader=ul,t.CubeUVReflectionMapping=l,t.CubeUVRefractionMapping=c,t.CubicBezierCurve=El,t.CubicBezierCurve3=Al,t.CubicInterpolant=jo,t.CullFaceBack=1,t.CullFaceFront=2,t.CullFaceFrontBack=3,t.CullFaceNone=0,t.Curve=ml,t.CurvePath=Nl,t.CustomBlending=5,t.CustomToneMapping=5,t.CylinderBufferGeometry=Da,t.CylinderGeometry=Da,t.Cylindrical=class{constructor(t=1,e=0,n=0){return this.radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return(new this.constructor).copy(this)}},t.DataTexture=ii,t.DataTexture2DArray=Ai,t.DataTexture3D=Li,t.DataTextureLoader=dl,t.DataUtils=class{static toHalfFloat(t){Lh[0]=t;const e=Rh[0];let n=e>>16&32768,i=e>>12&2047;const r=e>>23&255;return r<103?n:r>142?(n|=31744,n|=(255==r?0:1)&&8388607&e,n):r<113?(i|=2048,n|=(i>>114-r)+(i>>113-r&1),n):(n|=r-112<<10|i>>1,n+=1&i,n)}},t.DecrementStencilOp=7683,t.DecrementWrapStencilOp=34056,t.DefaultLoadingManager=al,t.DepthFormat=A,t.DepthStencilFormat=L,t.DepthTexture=Ca,t.DirectionalLight=Kl,t.DirectionalLightHelper=class extends Ce{constructor(t,e,n){super(),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,void 0===e&&(e=1);let i=new En;i.setAttribute("position",new mn([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const r=new ca({fog:!1,toneMapped:!1});this.lightPlane=new fa(i,r),this.add(this.lightPlane),i=new En,i.setAttribute("position",new mn([0,0,0,0,0,1],3)),this.targetLine=new fa(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){gh.setFromMatrixPosition(this.light.matrixWorld),vh.setFromMatrixPosition(this.light.target.matrixWorld),yh.subVectors(vh,gh),this.lightPlane.lookAt(vh),void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(vh),this.targetLine.scale.z=yh.length()}},t.DiscreteInterpolant=Xo,t.DodecahedronBufferGeometry=Ba,t.DodecahedronGeometry=Ba,t.DoubleSide=2,t.DstAlphaFactor=206,t.DstColorFactor=208,t.DynamicBufferAttribute=function(t,e){return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setUsage( THREE.DynamicDrawUsage ) instead."),new sn(t,e).setUsage(nt)},t.DynamicCopyUsage=35050,t.DynamicDrawUsage=nt,t.DynamicReadUsage=35049,t.EdgesGeometry=Ga,t.EdgesHelper=function(t,e){return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."),new ya(new Ga(t.geometry),new ca({color:void 0!==e?e:16777215}))},t.EllipseCurve=fl,t.EqualDepth=4,t.EqualStencilFunc=514,t.EquirectangularReflectionMapping=a,t.EquirectangularRefractionMapping=o,t.Euler=fe,t.EventDispatcher=rt,t.ExtrudeBufferGeometry=go,t.ExtrudeGeometry=go,t.FaceColors=1,t.FileLoader=cl,t.FlatShading=1,t.Float16BufferAttribute=pn,t.Float32Attribute=function(t,e){return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."),new mn(t,e)},t.Float32BufferAttribute=mn,t.Float64Attribute=function(t,e){return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."),new fn(t,e)},t.Float64BufferAttribute=fn,t.FloatType=b,t.Fog=Ss,t.FogExp2=Ms,t.Font=pc,t.FontLoader=class extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=new cl(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(r.withCredentials),s.load(t,(function(t){let n;try{n=JSON.parse(t)}catch(e){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),n=JSON.parse(t.substring(65,t.length-2))}const i=r.parse(n);e&&e(i)}),n,i)}parse(t){return new pc(t)}},t.FrontSide=0,t.Frustum=ai,t.GLBufferAttribute=Qc,t.GLSL1="100",t.GLSL3=it,t.GammaEncoding=Z,t.GreaterDepth=6,t.GreaterEqualDepth=5,t.GreaterEqualStencilFunc=518,t.GreaterStencilFunc=516,t.GridHelper=fh,t.Group=gs,t.HalfFloatType=M,t.HemisphereLight=Ol,t.HemisphereLightHelper=class extends Ce{constructor(t,e,n){super(),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n;const i=new _o(e);i.rotateY(.5*Math.PI),this.material=new en({wireframe:!0,fog:!1,toneMapped:!1}),void 0===this.color&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),s=new Float32Array(3*r.count);i.setAttribute("color",new sn(s,3)),this.add(new Wn(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(void 0!==this.color)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");ph.copy(this.light.color),mh.copy(this.light.groundColor);for(let t=0,n=e.count;t<n;t++){const i=t<n/2?ph:mh;e.setXYZ(t,i.r,i.g,i.b)}e.needsUpdate=!0}t.lookAt(dh.setFromMatrixPosition(this.light.matrixWorld).negate())}},t.HemisphereLightProbe=yc,t.IcosahedronBufferGeometry=yo,t.IcosahedronGeometry=yo,t.ImageBitmapLoader=uc,t.ImageLoader=hl,t.ImageUtils=_t,t.ImmediateRenderObject=sh,t.IncrementStencilOp=7682,t.IncrementWrapStencilOp=34055,t.InstancedBufferAttribute=ac,t.InstancedBufferGeometry=sc,t.InstancedInterleavedBuffer=Jc,t.InstancedMesh=la,t.Int16Attribute=function(t,e){return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."),new cn(t,e)},t.Int16BufferAttribute=cn,t.Int32Attribute=function(t,e){return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."),new un(t,e)},t.Int32BufferAttribute=un,t.Int8Attribute=function(t,e){return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."),new an(t,e)},t.Int8BufferAttribute=an,t.IntType=1013,t.InterleavedBuffer=Es,t.InterleavedBufferAttribute=Ls,t.Interpolant=Wo,t.InterpolateDiscrete=H,t.InterpolateLinear=G,t.InterpolateSmooth=U,t.InvertStencilOp=5386,t.JSONLoader=function(){console.error("THREE.JSONLoader has been removed.")},t.KeepStencilOp=tt,t.KeyframeTrack=Yo,t.LOD=Xs,t.LatheBufferGeometry=xo,t.LatheGeometry=xo,t.Layers=ge,t.LensFlare=function(){console.error("THREE.LensFlare has been moved to /examples/jsm/objects/Lensflare.js")},t.LessDepth=2,t.LessEqualDepth=3,t.LessEqualStencilFunc=515,t.LessStencilFunc=513,t.Light=Fl,t.LightProbe=nc,t.Line=fa,t.Line3=rh,t.LineBasicMaterial=ca,t.LineCurve=Ll,t.LineCurve3=Rl,t.LineDashedMaterial=Uo,t.LineLoop=xa,t.LinePieces=1,t.LineSegments=ya,t.LineStrip=0,t.LinearEncoding=X,t.LinearFilter=g,t.LinearInterpolant=qo,t.LinearMipMapLinearFilter=1008,t.LinearMipMapNearestFilter=1007,t.LinearMipmapLinearFilter=y,t.LinearMipmapNearestFilter=v,t.LinearToneMapping=1,t.Loader=ol,t.LoaderUtils=rc,t.LoadingManager=sl,t.LogLuvEncoding=3003,t.LoopOnce=2200,t.LoopPingPong=2202,t.LoopRepeat=2201,t.LuminanceAlphaFormat=1025,t.LuminanceFormat=1024,t.MOUSE={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},t.Material=Xe,t.MaterialLoader=ic,t.Math=gt,t.MathUtils=gt,t.Matrix3=yt,t.Matrix4=se,t.MaxEquation=104,t.Mesh=Wn,t.MeshBasicMaterial=en,t.MeshDepthMaterial=cs,t.MeshDistanceMaterial=hs,t.MeshFaceMaterial=function(t){return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."),t},t.MeshLambertMaterial=Ho,t.MeshMatcapMaterial=Go,t.MeshNormalMaterial=Oo,t.MeshPhongMaterial=zo,t.MeshPhysicalMaterial=Bo,t.MeshStandardMaterial=No,t.MeshToonMaterial=Fo,t.MinEquation=103,t.MirroredRepeatWrapping=d,t.MixOperation=1,t.MultiMaterial=function(t=[]){return console.warn("THREE.MultiMaterial has been removed. Use an Array instead."),t.isMultiMaterial=!0,t.materials=t,t.clone=function(){return t.slice()},t},t.MultiplyBlending=4,t.MultiplyOperation=0,t.NearestFilter=p,t.NearestMipMapLinearFilter=1005,t.NearestMipMapNearestFilter=1004,t.NearestMipmapLinearFilter=f,t.NearestMipmapNearestFilter=m,t.NeverDepth=0,t.NeverStencilFunc=512,t.NoBlending=0,t.NoColors=0,t.NoToneMapping=0,t.NormalAnimationBlendMode=j,t.NormalBlending=1,t.NotEqualDepth=7,t.NotEqualStencilFunc=517,t.NumberKeyframeTrack=Qo,t.Object3D=Ce,t.ObjectLoader=class extends ol{constructor(t){super(t)}load(t,e,n,i){const r=this,s=""===this.path?rc.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||s;const a=new cl(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,(function(n){let s=null;try{s=JSON.parse(n)}catch(e){return void 0!==i&&i(e),void console.error("THREE:ObjectLoader: Can't parse "+t+".",e.message)}const a=s.metadata;void 0!==a&&void 0!==a.type&&"geometry"!==a.type.toLowerCase()?r.parse(s,e):console.error("THREE.ObjectLoader: Can't load "+t)}),n,i)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,i),s=this.parseImages(t.images,(function(){void 0!==e&&e(l)})),a=this.parseTextures(t.textures,s),o=this.parseMaterials(t.materials,a),l=this.parseObject(t.object,r,o,n),c=this.parseSkeletons(t.skeletons,l);if(this.bindSkeletons(l,c),void 0!==e){let t=!1;for(const e in s)if(s[e]instanceof HTMLImageElement){t=!0;break}!1===t&&e(l)}return l}parseShapes(t){const e={};if(void 0!==t)for(let n=0,i=t.length;n<i;n++){const i=(new zl).fromJSON(t[n]);e[i.uuid]=i}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse((function(t){t.isBone&&(i[t.uuid]=t)})),void 0!==t)for(let e=0,r=t.length;e<r;e++){const r=(new ia).fromJSON(t[e],i);n[r.uuid]=r}return n}parseGeometries(t,e){const n={};let i;if(void 0!==t){const r=new oc;for(let s=0,a=t.length;s<a;s++){let a;const o=t[s];switch(o.type){case"PlaneGeometry":case"PlaneBufferGeometry":a=new Po[o.type](o.width,o.height,o.widthSegments,o.heightSegments);break;case"BoxGeometry":case"BoxBufferGeometry":a=new Po[o.type](o.width,o.height,o.depth,o.widthSegments,o.heightSegments,o.depthSegments);break;case"CircleGeometry":case"CircleBufferGeometry":a=new Po[o.type](o.radius,o.segments,o.thetaStart,o.thetaLength);break;case"CylinderGeometry":case"CylinderBufferGeometry":a=new Po[o.type](o.radiusTop,o.radiusBottom,o.height,o.radialSegments,o.heightSegments,o.openEnded,o.thetaStart,o.thetaLength);break;case"ConeGeometry":case"ConeBufferGeometry":a=new Po[o.type](o.radius,o.height,o.radialSegments,o.heightSegments,o.openEnded,o.thetaStart,o.thetaLength);break;case"SphereGeometry":case"SphereBufferGeometry":a=new Po[o.type](o.radius,o.widthSegments,o.heightSegments,o.phiStart,o.phiLength,o.thetaStart,o.thetaLength);break;case"DodecahedronGeometry":case"DodecahedronBufferGeometry":case"IcosahedronGeometry":case"IcosahedronBufferGeometry":case"OctahedronGeometry":case"OctahedronBufferGeometry":case"TetrahedronGeometry":case"TetrahedronBufferGeometry":a=new Po[o.type](o.radius,o.detail);break;case"RingGeometry":case"RingBufferGeometry":a=new Po[o.type](o.innerRadius,o.outerRadius,o.thetaSegments,o.phiSegments,o.thetaStart,o.thetaLength);break;case"TorusGeometry":case"TorusBufferGeometry":a=new Po[o.type](o.radius,o.tube,o.radialSegments,o.tubularSegments,o.arc);break;case"TorusKnotGeometry":case"TorusKnotBufferGeometry":a=new Po[o.type](o.radius,o.tube,o.tubularSegments,o.radialSegments,o.p,o.q);break;case"TubeGeometry":case"TubeBufferGeometry":a=new Po[o.type]((new Il[o.path.type]).fromJSON(o.path),o.tubularSegments,o.radius,o.radialSegments,o.closed);break;case"LatheGeometry":case"LatheBufferGeometry":a=new Po[o.type](o.points,o.segments,o.phiStart,o.phiLength);break;case"PolyhedronGeometry":case"PolyhedronBufferGeometry":a=new Po[o.type](o.vertices,o.indices,o.radius,o.details);break;case"ShapeGeometry":case"ShapeBufferGeometry":i=[];for(let t=0,n=o.shapes.length;t<n;t++){const n=e[o.shapes[t]];i.push(n)}a=new Po[o.type](i,o.curveSegments);break;case"ExtrudeGeometry":case"ExtrudeBufferGeometry":i=[];for(let t=0,n=o.shapes.length;t<n;t++){const n=e[o.shapes[t]];i.push(n)}const t=o.options.extrudePath;void 0!==t&&(o.options.extrudePath=(new Il[t.type]).fromJSON(t)),a=new Po[o.type](i,o.options);break;case"BufferGeometry":case"InstancedBufferGeometry":a=r.parse(o);break;case"Geometry":console.error('THREE.ObjectLoader: Loading "Geometry" is not supported anymore.');break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "'+o.type+'"');continue}a.uuid=o.uuid,void 0!==o.name&&(a.name=o.name),!0===a.isBufferGeometry&&void 0!==o.userData&&(a.userData=o.userData),n[o.uuid]=a}}return n}parseMaterials(t,e){const n={},i={};if(void 0!==t){const r=new ic;r.setTextures(e);for(let e=0,s=t.length;e<s;e++){const s=t[e];if("MultiMaterial"===s.type){const t=[];for(let e=0;e<s.materials.length;e++){const i=s.materials[e];void 0===n[i.uuid]&&(n[i.uuid]=r.parse(i)),t.push(n[i.uuid])}i[s.uuid]=t}else void 0===n[s.uuid]&&(n[s.uuid]=r.parse(s)),i[s.uuid]=n[s.uuid]}}return i}parseAnimations(t){const e={};if(void 0!==t)for(let n=0;n<t.length;n++){const i=t[n],r=nl.parse(i);e[r.uuid]=r}return e}parseImages(t,e){const n=this,i={};let r;function s(t){if("string"==typeof t){const e=t;return function(t){return n.manager.itemStart(t),r.load(t,(function(){n.manager.itemEnd(t)}),void 0,(function(){n.manager.itemError(t),n.manager.itemEnd(t)}))}(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(e)?e:n.resourcePath+e)}return t.data?{data:yn(t.type,t.data),width:t.width,height:t.height}:null}if(void 0!==t&&t.length>0){const n=new sl(e);r=new hl(n),r.setCrossOrigin(this.crossOrigin);for(let e=0,n=t.length;e<n;e++){const n=t[e],r=n.url;if(Array.isArray(r)){i[n.uuid]=[];for(let t=0,e=r.length;t<e;t++){const e=s(r[t]);null!==e&&(e instanceof HTMLImageElement?i[n.uuid].push(e):i[n.uuid].push(new ii(e.data,e.width,e.height)))}}else{const t=s(n.url);null!==t&&(i[n.uuid]=t)}}}return i}parseTextures(t,e){function n(t,e){return"number"==typeof t?t:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",t),e[t])}const i={};if(void 0!==t)for(let r=0,s=t.length;r<s;r++){const s=t[r];let a;void 0===s.image&&console.warn('THREE.ObjectLoader: No "image" specified for',s.uuid),void 0===e[s.image]&&console.warn("THREE.ObjectLoader: Undefined image",s.image);const o=e[s.image];Array.isArray(o)?(a=new ei(o),6===o.length&&(a.needsUpdate=!0)):(a=o&&o.data?new ii(o.data,o.width,o.height):new bt(o),o&&(a.needsUpdate=!0)),a.uuid=s.uuid,void 0!==s.name&&(a.name=s.name),void 0!==s.mapping&&(a.mapping=n(s.mapping,lc)),void 0!==s.offset&&a.offset.fromArray(s.offset),void 0!==s.repeat&&a.repeat.fromArray(s.repeat),void 0!==s.center&&a.center.fromArray(s.center),void 0!==s.rotation&&(a.rotation=s.rotation),void 0!==s.wrap&&(a.wrapS=n(s.wrap[0],cc),a.wrapT=n(s.wrap[1],cc)),void 0!==s.format&&(a.format=s.format),void 0!==s.type&&(a.type=s.type),void 0!==s.encoding&&(a.encoding=s.encoding),void 0!==s.minFilter&&(a.minFilter=n(s.minFilter,hc)),void 0!==s.magFilter&&(a.magFilter=n(s.magFilter,hc)),void 0!==s.anisotropy&&(a.anisotropy=s.anisotropy),void 0!==s.flipY&&(a.flipY=s.flipY),void 0!==s.premultiplyAlpha&&(a.premultiplyAlpha=s.premultiplyAlpha),void 0!==s.unpackAlignment&&(a.unpackAlignment=s.unpackAlignment),i[s.uuid]=a}return i}parseObject(t,e,n,i){let r,s,a;function o(t){return void 0===e[t]&&console.warn("THREE.ObjectLoader: Undefined geometry",t),e[t]}function l(t){if(void 0!==t){if(Array.isArray(t)){const e=[];for(let i=0,r=t.length;i<r;i++){const r=t[i];void 0===n[r]&&console.warn("THREE.ObjectLoader: Undefined material",r),e.push(n[r])}return e}return void 0===n[t]&&console.warn("THREE.ObjectLoader: Undefined material",t),n[t]}}switch(t.type){case"Scene":r=new Ts,void 0!==t.background&&Number.isInteger(t.background)&&(r.background=new tn(t.background)),void 0!==t.fog&&("Fog"===t.fog.type?r.fog=new Ss(t.fog.color,t.fog.near,t.fog.far):"FogExp2"===t.fog.type&&(r.fog=new Ms(t.fog.color,t.fog.density)));break;case"PerspectiveCamera":r=new Kn(t.fov,t.aspect,t.near,t.far),void 0!==t.focus&&(r.focus=t.focus),void 0!==t.zoom&&(r.zoom=t.zoom),void 0!==t.filmGauge&&(r.filmGauge=t.filmGauge),void 0!==t.filmOffset&&(r.filmOffset=t.filmOffset),void 0!==t.view&&(r.view=Object.assign({},t.view));break;case"OrthographicCamera":r=new Jl(t.left,t.right,t.top,t.bottom,t.near,t.far),void 0!==t.zoom&&(r.zoom=t.zoom),void 0!==t.view&&(r.view=Object.assign({},t.view));break;case"AmbientLight":r=new $l(t.color,t.intensity);break;case"DirectionalLight":r=new Kl(t.color,t.intensity);break;case"PointLight":r=new Zl(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":r=new tc(t.color,t.intensity,t.width,t.height);break;case"SpotLight":r=new Wl(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay);break;case"HemisphereLight":r=new Ol(t.color,t.groundColor,t.intensity);break;case"LightProbe":r=(new nc).fromJSON(t);break;case"SkinnedMesh":s=o(t.geometry),a=l(t.material),r=new $s(s,a),void 0!==t.bindMode&&(r.bindMode=t.bindMode),void 0!==t.bindMatrix&&r.bindMatrix.fromArray(t.bindMatrix),void 0!==t.skeleton&&(r.skeleton=t.skeleton);break;case"Mesh":s=o(t.geometry),a=l(t.material),r=new Wn(s,a);break;case"InstancedMesh":s=o(t.geometry),a=l(t.material);const e=t.count,n=t.instanceMatrix,i=t.instanceColor;r=new la(s,a,e),r.instanceMatrix=new sn(new Float32Array(n.array),16),void 0!==i&&(r.instanceColor=new sn(new Float32Array(i.array),i.itemSize));break;case"LOD":r=new Xs;break;case"Line":r=new fa(o(t.geometry),l(t.material));break;case"LineLoop":r=new xa(o(t.geometry),l(t.material));break;case"LineSegments":r=new ya(o(t.geometry),l(t.material));break;case"PointCloud":case"Points":r=new Ta(o(t.geometry),l(t.material));break;case"Sprite":r=new Vs(l(t.material));break;case"Group":r=new gs;break;case"Bone":r=new ta;break;default:r=new Ce}if(r.uuid=t.uuid,void 0!==t.name&&(r.name=t.name),void 0!==t.matrix?(r.matrix.fromArray(t.matrix),void 0!==t.matrixAutoUpdate&&(r.matrixAutoUpdate=t.matrixAutoUpdate),r.matrixAutoUpdate&&r.matrix.decompose(r.position,r.quaternion,r.scale)):(void 0!==t.position&&r.position.fromArray(t.position),void 0!==t.rotation&&r.rotation.fromArray(t.rotation),void 0!==t.quaternion&&r.quaternion.fromArray(t.quaternion),void 0!==t.scale&&r.scale.fromArray(t.scale)),void 0!==t.castShadow&&(r.castShadow=t.castShadow),void 0!==t.receiveShadow&&(r.receiveShadow=t.receiveShadow),t.shadow&&(void 0!==t.shadow.bias&&(r.shadow.bias=t.shadow.bias),void 0!==t.shadow.normalBias&&(r.shadow.normalBias=t.shadow.normalBias),void 0!==t.shadow.radius&&(r.shadow.radius=t.shadow.radius),void 0!==t.shadow.mapSize&&r.shadow.mapSize.fromArray(t.shadow.mapSize),void 0!==t.shadow.camera&&(r.shadow.camera=this.parseObject(t.shadow.camera))),void 0!==t.visible&&(r.visible=t.visible),void 0!==t.frustumCulled&&(r.frustumCulled=t.frustumCulled),void 0!==t.renderOrder&&(r.renderOrder=t.renderOrder),void 0!==t.userData&&(r.userData=t.userData),void 0!==t.layers&&(r.layers.mask=t.layers),void 0!==t.children){const s=t.children;for(let t=0;t<s.length;t++)r.add(this.parseObject(s[t],e,n,i))}if(void 0!==t.animations){const e=t.animations;for(let t=0;t<e.length;t++){const n=e[t];r.animations.push(i[n])}}if("LOD"===t.type){void 0!==t.autoUpdate&&(r.autoUpdate=t.autoUpdate);const e=t.levels;for(let t=0;t<e.length;t++){const n=e[t],i=r.getObjectByProperty("uuid",n.object);void 0!==i&&r.addLevel(i,n.distance)}}return r}bindSkeletons(t,e){0!==Object.keys(e).length&&t.traverse((function(t){if(!0===t.isSkinnedMesh&&void 0!==t.skeleton){const n=e[t.skeleton];void 0===n?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",t.skeleton):t.bind(n,t.bindMatrix)}}))}setTexturePath(t){return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."),this.setResourcePath(t)}},t.ObjectSpaceNormalMap=1,t.OctahedronBufferGeometry=_o,t.OctahedronGeometry=_o,t.OneFactor=201,t.OneMinusDstAlphaFactor=207,t.OneMinusDstColorFactor=209,t.OneMinusSrcAlphaFactor=205,t.OneMinusSrcColorFactor=203,t.OrthographicCamera=Jl,t.PCFShadowMap=1,t.PCFSoftShadowMap=2,t.PMREMGenerator=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._blurMaterial=function(t){const e=new Float32Array(t),n=new Lt(0,1,0);return new Io({name:"SphericalGaussianBlur",defines:{n:t},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:e},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n},inputEncoding:{value:Nh[3e3]},outputEncoding:{value:Nh[3e3]}},vertexShader:$h(),fragmentShader:`\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t${tu()}\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,blending:0,depthTest:!1,depthWrite:!1})}(Ih),this._equirectShader=null,this._cubemapShader=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){kh=this._renderer.getRenderTarget();const r=this._allocateTargets();return this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t){return this._fromTexture(t)}fromCubemap(t){return this._fromTexture(t)}compileCubemapShader(){null===this._cubemapShader&&(this._cubemapShader=Kh(),this._compileMaterial(this._cubemapShader))}compileEquirectangularShader(){null===this._equirectShader&&(this._equirectShader=Qh(),this._compileMaterial(this._equirectShader))}dispose(){this._blurMaterial.dispose(),null!==this._cubemapShader&&this._cubemapShader.dispose(),null!==this._equirectShader&&this._equirectShader.dispose();for(let t=0;t<Oh.length;t++)Oh[t].dispose()}_cleanup(t){this._pingPongRenderTarget.dispose(),this._renderer.setRenderTarget(kh),t.scissorTest=!1,Jh(t,0,0,t.width,t.height)}_fromTexture(t){kh=this._renderer.getRenderTarget();const e=this._allocateTargets(t);return this._textureToCubeUV(t,e),this._applyPMREM(e),this._cleanup(e),e}_allocateTargets(t){const e={magFilter:p,minFilter:p,generateMipmaps:!1,type:x,format:1023,encoding:Xh(t)?t.encoding:J,depthBuffer:!1},n=Zh(e);return n.depthBuffer=!t,this._pingPongRenderTarget=Zh(e),n}_compileMaterial(t){const e=new Wn(Oh[0],t);this._renderer.compile(e,Fh)}_sceneToCubeUV(t,e,n,i){const r=new Kn(90,1,e,n),s=[1,-1,1,1,1,1],a=[1,1,1,-1,-1,-1],o=this._renderer,l=o.autoClear,c=o.outputEncoding,h=o.toneMapping;o.getClearColor(Uh),o.toneMapping=0,o.outputEncoding=X,o.autoClear=!1;let u=!1;const d=t.background;if(d){if(d.isColor){Bh.color.copy(d).convertSRGBToLinear(),t.background=null;const e=qh(Bh.color);Bh.opacity=e,u=!0}}else{Bh.color.copy(Uh).convertSRGBToLinear();const t=qh(Bh.color);Bh.opacity=t,u=!0}for(let e=0;e<6;e++){const n=e%3;0==n?(r.up.set(0,s[e],0),r.lookAt(a[e],0,0)):1==n?(r.up.set(0,0,s[e]),r.lookAt(0,a[e],0)):(r.up.set(0,s[e],0),r.lookAt(0,0,a[e])),Jh(i,n*Ch,e>2?Ch:0,Ch,Ch),o.setRenderTarget(i),u&&o.render(zh,r),o.render(t,r)}o.toneMapping=h,o.outputEncoding=c,o.autoClear=l}_textureToCubeUV(t,e){const n=this._renderer;t.isCubeTexture?null==this._cubemapShader&&(this._cubemapShader=Kh()):null==this._equirectShader&&(this._equirectShader=Qh());const i=t.isCubeTexture?this._cubemapShader:this._equirectShader,r=new Wn(Oh[0],i),s=i.uniforms;s.envMap.value=t,t.isCubeTexture||s.texelSize.value.set(1/t.image.width,1/t.image.height),s.inputEncoding.value=Nh[t.encoding],s.outputEncoding.value=Nh[e.texture.encoding],Jh(e,0,0,3*Ch,2*Ch),n.setRenderTarget(e),n.render(r,Fh)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let e=1;e<Dh;e++){const n=Math.sqrt(Gh[e]*Gh[e]-Gh[e-1]*Gh[e-1]),i=jh[(e-1)%jh.length];this._blur(t,e-1,e,n,i)}e.autoClear=n}_blur(t,e,n,i,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,i,"latitudinal",r),this._halfBlur(s,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,s,a){const o=this._renderer,l=this._blurMaterial;"latitudinal"!==s&&"longitudinal"!==s&&console.error("blur direction must be either latitudinal or longitudinal!");const c=new Wn(Oh[i],l),h=l.uniforms,u=Hh[n]-1,d=isFinite(r)?Math.PI/(2*u):2*Math.PI/39,p=r/d,m=isFinite(r)?1+Math.floor(3*p):Ih;m>Ih&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);const f=[];let g=0;for(let t=0;t<Ih;++t){const e=t/p,n=Math.exp(-e*e/2);f.push(n),0==t?g+=n:t<m&&(g+=2*n)}for(let t=0;t<f.length;t++)f[t]=f[t]/g;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value="latitudinal"===s,a&&(h.poleAxis.value=a),h.dTheta.value=d,h.mipInt.value=8-n,h.inputEncoding.value=Nh[t.texture.encoding],h.outputEncoding.value=Nh[t.texture.encoding];const v=Hh[i];Jh(e,3*Math.max(0,Ch-2*v),(0===i?0:2*Ch)+2*v*(i>4?i-8+4:0),3*v,2*v),o.setRenderTarget(e),o.render(c,Fh)}},t.ParametricBufferGeometry=wo,t.ParametricGeometry=wo,t.Particle=function(t){return console.warn("THREE.Particle has been renamed to THREE.Sprite."),new Vs(t)},t.ParticleBasicMaterial=function(t){return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."),new _a(t)},t.ParticleSystem=function(t,e){return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."),new Ta(t,e)},t.ParticleSystemMaterial=function(t){return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."),new _a(t)},t.Path=Bl,t.PerspectiveCamera=Kn,t.Plane=Ne,t.PlaneBufferGeometry=ci,t.PlaneGeometry=ci,t.PlaneHelper=class extends fa{constructor(t,e=1,n=16776960){const i=n,r=new En;r.setAttribute("position",new mn([1,-1,1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,0,0,1,0,0,0],3)),r.computeBoundingSphere(),super(r,new ca({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const s=new En;s.setAttribute("position",new mn([1,1,1,-1,1,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,1],3)),s.computeBoundingSphere(),this.add(new Wn(s,new en({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){let e=-this.plane.constant;Math.abs(e)<1e-8&&(e=1e-8),this.scale.set(.5*this.size,.5*this.size,e),this.children[0].material.side=e<0?1:0,this.lookAt(this.plane.normal),super.updateMatrixWorld(t)}},t.PointCloud=function(t,e){return console.warn("THREE.PointCloud has been renamed to THREE.Points."),new Ta(t,e)},t.PointCloudMaterial=function(t){return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."),new _a(t)},t.PointLight=Zl,t.PointLightHelper=class extends Wn{constructor(t,e,n){super(new So(e,4,2),new en({wireframe:!0,fog:!1,toneMapped:!1})),this.light=t,this.light.updateMatrixWorld(),this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},t.Points=Ta,t.PointsMaterial=_a,t.PolarGridHelper=class extends ya{constructor(t=10,e=16,n=8,i=64,r=4473924,s=8947848){r=new tn(r),s=new tn(s);const a=[],o=[];for(let n=0;n<=e;n++){const i=n/e*(2*Math.PI),l=Math.sin(i)*t,c=Math.cos(i)*t;a.push(0,0,0),a.push(l,0,c);const h=1&n?r:s;o.push(h.r,h.g,h.b),o.push(h.r,h.g,h.b)}for(let e=0;e<=n;e++){const l=1&e?r:s,c=t-t/n*e;for(let t=0;t<i;t++){let e=t/i*(2*Math.PI),n=Math.sin(e)*c,r=Math.cos(e)*c;a.push(n,0,r),o.push(l.r,l.g,l.b),e=(t+1)/i*(2*Math.PI),n=Math.sin(e)*c,r=Math.cos(e)*c,a.push(n,0,r),o.push(l.r,l.g,l.b)}}const l=new En;l.setAttribute("position",new mn(a,3)),l.setAttribute("color",new mn(o,3));super(l,new ca({vertexColors:!0,toneMapped:!1})),this.type="PolarGridHelper"}},t.PolyhedronBufferGeometry=Na,t.PolyhedronGeometry=Na,t.PositionalAudio=class extends Lc{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),!0===this.hasPlaybackControl&&!1===this.isPlaying)return;this.matrixWorld.decompose(Rc,Cc,Pc),Dc.set(0,0,1).applyQuaternion(Cc);const e=this.panner;if(e.positionX){const t=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Rc.x,t),e.positionY.linearRampToValueAtTime(Rc.y,t),e.positionZ.linearRampToValueAtTime(Rc.z,t),e.orientationX.linearRampToValueAtTime(Dc.x,t),e.orientationY.linearRampToValueAtTime(Dc.y,t),e.orientationZ.linearRampToValueAtTime(Dc.z,t)}else e.setPosition(Rc.x,Rc.y,Rc.z),e.setOrientation(Dc.x,Dc.y,Dc.z)}},t.PropertyBinding=jc,t.PropertyMixer=Nc,t.QuadraticBezierCurve=Cl,t.QuadraticBezierCurve3=Pl,t.Quaternion=At,t.QuaternionKeyframeTrack=$o,t.QuaternionLinearInterpolant=Ko,t.REVISION=e,t.RGBADepthPacking=3201,t.RGBAFormat=E,t.RGBAIntegerFormat=1033,t.RGBA_ASTC_10x10_Format=37819,t.RGBA_ASTC_10x5_Format=37816,t.RGBA_ASTC_10x6_Format=37817,t.RGBA_ASTC_10x8_Format=37818,t.RGBA_ASTC_12x10_Format=37820,t.RGBA_ASTC_12x12_Format=37821,t.RGBA_ASTC_4x4_Format=37808,t.RGBA_ASTC_5x4_Format=37809,t.RGBA_ASTC_5x5_Format=37810,t.RGBA_ASTC_6x5_Format=37811,t.RGBA_ASTC_6x6_Format=37812,t.RGBA_ASTC_8x5_Format=37813,t.RGBA_ASTC_8x6_Format=37814,t.RGBA_ASTC_8x8_Format=37815,t.RGBA_BPTC_Format=36492,t.RGBA_ETC2_EAC_Format=O,t.RGBA_PVRTC_2BPPV1_Format=z,t.RGBA_PVRTC_4BPPV1_Format=B,t.RGBA_S3TC_DXT1_Format=C,t.RGBA_S3TC_DXT3_Format=P,t.RGBA_S3TC_DXT5_Format=D,t.RGBDEncoding=$,t.RGBEEncoding=J,t.RGBEFormat=1023,t.RGBFormat=T,t.RGBIntegerFormat=1032,t.RGBM16Encoding=K,t.RGBM7Encoding=Q,t.RGB_ETC1_Format=36196,t.RGB_ETC2_Format=F,t.RGB_PVRTC_2BPPV1_Format=N,t.RGB_PVRTC_4BPPV1_Format=I,t.RGB_S3TC_DXT1_Format=R,t.RGFormat=1030,t.RGIntegerFormat=1031,t.RawShaderMaterial=Io,t.Ray=re,t.Raycaster=class{constructor(t,e,n=0,i=1/0){this.ray=new re(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ge,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e&&e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e&&e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!1,n=[]){return $c(t,this,n,e),n.sort(Kc),n}intersectObjects(t,e=!1,n=[]){for(let i=0,r=t.length;i<r;i++)$c(t[i],this,n,e);return n.sort(Kc),n}},t.RectAreaLight=tc,t.RedFormat=1028,t.RedIntegerFormat=1029,t.ReinhardToneMapping=2,t.RepeatWrapping=h,t.ReplaceStencilOp=7681,t.ReverseSubtractEquation=102,t.RingBufferGeometry=bo,t.RingGeometry=bo,t.SRGB8_ALPHA8_ASTC_10x10_Format=37851,t.SRGB8_ALPHA8_ASTC_10x5_Format=37848,t.SRGB8_ALPHA8_ASTC_10x6_Format=37849,t.SRGB8_ALPHA8_ASTC_10x8_Format=37850,t.SRGB8_ALPHA8_ASTC_12x10_Format=37852,t.SRGB8_ALPHA8_ASTC_12x12_Format=37853,t.SRGB8_ALPHA8_ASTC_4x4_Format=37840,t.SRGB8_ALPHA8_ASTC_5x4_Format=37841,t.SRGB8_ALPHA8_ASTC_5x5_Format=37842,t.SRGB8_ALPHA8_ASTC_6x5_Format=37843,t.SRGB8_ALPHA8_ASTC_6x6_Format=37844,t.SRGB8_ALPHA8_ASTC_8x5_Format=37845,t.SRGB8_ALPHA8_ASTC_8x6_Format=37846,t.SRGB8_ALPHA8_ASTC_8x8_Format=37847,t.Scene=Ts,t.SceneUtils=eu,t.ShaderChunk=hi,t.ShaderLib=di,t.ShaderMaterial=Jn,t.ShadowMaterial=Do,t.Shape=zl,t.ShapeBufferGeometry=Mo,t.ShapeGeometry=Mo,t.ShapePath=dc,t.ShapeUtils=po,t.ShortType=1011,t.Skeleton=ia,t.SkeletonHelper=hh,t.SkinnedMesh=$s,t.SmoothShading=2,t.Sphere=Jt,t.SphereBufferGeometry=So,t.SphereGeometry=So,t.Spherical=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){const t=1e-6;return this.phi=Math.max(t,Math.min(Math.PI-t,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ht(e/this.radius,-1,1))),this}clone(){return(new this.constructor).copy(this)}},t.SphericalHarmonics3=ec,t.SplineCurve=Dl,t.SpotLight=Wl,t.SpotLightHelper=class extends Ce{constructor(t,e){super(),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=e;const n=new En,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let t=0,e=1,n=32;t<n;t++,e++){const r=t/n*Math.PI*2,s=e/n*Math.PI*2;i.push(Math.cos(r),Math.sin(r),1,Math.cos(s),Math.sin(s),1)}n.setAttribute("position",new mn(i,3));const r=new ca({fog:!1,toneMapped:!1});this.cone=new ya(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateMatrixWorld();const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),ah.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(ah),void 0!==this.color?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},t.Sprite=Vs,t.SpriteMaterial=Rs,t.SrcAlphaFactor=204,t.SrcAlphaSaturateFactor=210,t.SrcColorFactor=202,t.StaticCopyUsage=35046,t.StaticDrawUsage=et,t.StaticReadUsage=35045,t.StereoCamera=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Kn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Kn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep;const n=t.projectionMatrix.clone(),i=e.eyeSep/2,r=i*e.near/e.focus,s=e.near*Math.tan(ot*e.fov*.5)/e.zoom;let a,o;wc.elements[12]=-i,_c.elements[12]=i,a=-s*e.aspect+r,o=s*e.aspect+r,n.elements[0]=2*e.near/(o-a),n.elements[8]=(o+a)/(o-a),this.cameraL.projectionMatrix.copy(n),a=-s*e.aspect-r,o=s*e.aspect-r,n.elements[0]=2*e.near/(o-a),n.elements[8]=(o+a)/(o-a),this.cameraR.projectionMatrix.copy(n)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(wc),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(_c)}},t.StreamCopyUsage=35042,t.StreamDrawUsage=35040,t.StreamReadUsage=35041,t.StringKeyframeTrack=tl,t.SubtractEquation=101,t.SubtractiveBlending=3,t.TOUCH={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},t.TangentSpaceNormalMap=0,t.TetrahedronBufferGeometry=To,t.TetrahedronGeometry=To,t.TextBufferGeometry=Eo,t.TextGeometry=Eo,t.Texture=bt,t.TextureLoader=pl,t.TorusBufferGeometry=Ao,t.TorusGeometry=Ao,t.TorusKnotBufferGeometry=Lo,t.TorusKnotGeometry=Lo,t.Triangle=je,t.TriangleFanDrawMode=2,t.TriangleStripDrawMode=1,t.TrianglesDrawMode=0,t.TubeBufferGeometry=Ro,t.TubeGeometry=Ro,t.UVMapping=i,t.Uint16Attribute=function(t,e){return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."),new hn(t,e)},t.Uint16BufferAttribute=hn,t.Uint32Attribute=function(t,e){return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."),new dn(t,e)},t.Uint32BufferAttribute=dn,t.Uint8Attribute=function(t,e){return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."),new on(t,e)},t.Uint8BufferAttribute=on,t.Uint8ClampedAttribute=function(t,e){return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."),new ln(t,e)},t.Uint8ClampedBufferAttribute=ln,t.Uniform=Zc,t.UniformsLib=ui,t.UniformsUtils=Zn,t.UnsignedByteType=x,t.UnsignedInt248Type=S,t.UnsignedIntType=w,t.UnsignedShort4444Type=1017,t.UnsignedShort5551Type=1018,t.UnsignedShort565Type=1019,t.UnsignedShortType=_,t.VSMShadowMap=3,t.Vector2=vt,t.Vector3=Lt,t.Vector4=St,t.VectorKeyframeTrack=el,t.Vertex=function(t,e,n){return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."),new Lt(t,e,n)},t.VertexColors=2,t.VideoTexture=Aa,t.WebGL1Renderer=bs,t.WebGLCubeRenderTarget=ni,t.WebGLMultisampleRenderTarget=Et,t.WebGLRenderTarget=Tt,t.WebGLRenderTargetCube=function(t,e,n){return console.warn("THREE.WebGLRenderTargetCube( width, height, options ) is now WebGLCubeRenderTarget( size, options )."),new ni(t,n)},t.WebGLRenderer=ws,t.WebGLUtils=ms,t.WireframeGeometry=Co,t.WireframeHelper=function(t,e){return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."),new ya(new Co(t.geometry),new ca({color:void 0!==e?e:16777215}))},t.WrapAroundEnding=W,t.XHRLoader=function(t){return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."),new cl(t)},t.ZeroCurvatureEnding=k,t.ZeroFactor=200,t.ZeroSlopeEnding=V,t.ZeroStencilOp=0,t.sRGBEncoding=Y,Object.defineProperty(t,"__esModule",{value:!0})}));

;
/* vendor/OrbitControls.js */
( function () {

	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one-finger move
	//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

	const _changeEvent = {
		type: 'change'
	};
	const _startEvent = {
		type: 'start'
	};
	const _endEvent = {
		type: 'end'
	};

	class OrbitControls extends THREE.EventDispatcher {

		constructor( object, domElement ) {

			super();
			if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
			if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );
			this.object = object;
			this.domElement = domElement; // Set to false to disable this control

			this.enabled = true; // "target" sets the location of focus, where the object orbits around

			this.target = new THREE.Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

			this.minDistance = 0;
			this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

			this.minZoom = 0;
			this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.

			this.minPolarAngle = 0; // radians

			this.maxPolarAngle = Math.PI; // radians
			// How far you can orbit horizontally, upper and lower limits.
			// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )

			this.minAzimuthAngle = - Infinity; // radians

			this.maxAzimuthAngle = Infinity; // radians
			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop

			this.enableDamping = false;
			this.dampingFactor = 0.05; // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
			// Set to false to disable zooming

			this.enableZoom = true;
			this.zoomSpeed = 1.0; // Set to false to disable rotating

			this.enableRotate = true;
			this.rotateSpeed = 1.0; // Set to false to disable panning

			this.enablePan = true;
			this.panSpeed = 1.0;
			this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up

			this.keyPanSpeed = 7.0; // pixels moved per arrow key push
			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop

			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60
			// The four arrow keys

			this.keys = {
				LEFT: 'ArrowLeft',
				UP: 'ArrowUp',
				RIGHT: 'ArrowRight',
				BOTTOM: 'ArrowDown'
			}; // Mouse buttons

			this.mouseButtons = {
				LEFT: THREE.MOUSE.ROTATE,
				MIDDLE: THREE.MOUSE.DOLLY,
				RIGHT: THREE.MOUSE.PAN
			}; // Touch fingers

			this.touches = {
				ONE: THREE.TOUCH.ROTATE,
				TWO: THREE.TOUCH.DOLLY_PAN
			}; // for reset

			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom; // the target DOM element for key events

			this._domElementKeyEvents = null; //
			// public methods
			//

			this.getPolarAngle = function () {

				return spherical.phi;

			};

			this.getAzimuthalAngle = function () {

				return spherical.theta;

			};

			this.listenToKeyEvents = function ( domElement ) {

				domElement.addEventListener( 'keydown', onKeyDown );
				this._domElementKeyEvents = domElement;

			};

			this.saveState = function () {

				scope.target0.copy( scope.target );
				scope.position0.copy( scope.object.position );
				scope.zoom0 = scope.object.zoom;

			};

			this.reset = function () {

				scope.target.copy( scope.target0 );
				scope.object.position.copy( scope.position0 );
				scope.object.zoom = scope.zoom0;
				scope.object.updateProjectionMatrix();
				scope.dispatchEvent( _changeEvent );
				scope.update();
				state = STATE.NONE;

			}; // this method is exposed, but perhaps it would be better if we can make it private...


			this.update = function () {

				const offset = new THREE.Vector3(); // so camera.up is the orbit axis

				const quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
				const quatInverse = quat.clone().invert();
				const lastPosition = new THREE.Vector3();
				const lastQuaternion = new THREE.Quaternion();
				const twoPI = 2 * Math.PI;
				return function update() {

					const position = scope.object.position;
					offset.copy( position ).sub( scope.target ); // rotate offset to "y-axis-is-up" space

					offset.applyQuaternion( quat ); // angle from z-axis around y-axis

					spherical.setFromVector3( offset );

					if ( scope.autoRotate && state === STATE.NONE ) {

						rotateLeft( getAutoRotationAngle() );

					}

					if ( scope.enableDamping ) {

						spherical.theta += sphericalDelta.theta * scope.dampingFactor;
						spherical.phi += sphericalDelta.phi * scope.dampingFactor;

					} else {

						spherical.theta += sphericalDelta.theta;
						spherical.phi += sphericalDelta.phi;

					} // restrict theta to be between desired limits


					let min = scope.minAzimuthAngle;
					let max = scope.maxAzimuthAngle;

					if ( isFinite( min ) && isFinite( max ) ) {

						if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;
						if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

						if ( min <= max ) {

							spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

						} else {

							spherical.theta = spherical.theta > ( min + max ) / 2 ? Math.max( min, spherical.theta ) : Math.min( max, spherical.theta );

						}

					} // restrict phi to be between desired limits


					spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );
					spherical.makeSafe();
					spherical.radius *= scale; // restrict radius to be between desired limits

					spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) ); // move target to panned location

					if ( scope.enableDamping === true ) {

						scope.target.addScaledVector( panOffset, scope.dampingFactor );

					} else {

						scope.target.add( panOffset );

					}

					offset.setFromSpherical( spherical ); // rotate offset back to "camera-up-vector-is-up" space

					offset.applyQuaternion( quatInverse );
					position.copy( scope.target ).add( offset );
					scope.object.lookAt( scope.target );

					if ( scope.enableDamping === true ) {

						sphericalDelta.theta *= 1 - scope.dampingFactor;
						sphericalDelta.phi *= 1 - scope.dampingFactor;
						panOffset.multiplyScalar( 1 - scope.dampingFactor );

					} else {

						sphericalDelta.set( 0, 0, 0 );
						panOffset.set( 0, 0, 0 );

					}

					scale = 1; // update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if ( zoomChanged || lastPosition.distanceToSquared( scope.object.position ) > EPS || 8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

						scope.dispatchEvent( _changeEvent );
						lastPosition.copy( scope.object.position );
						lastQuaternion.copy( scope.object.quaternion );
						zoomChanged = false;
						return true;

					}

					return false;

				};

			}();

			this.dispose = function () {

				scope.domElement.removeEventListener( 'contextmenu', onContextMenu );
				scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
				scope.domElement.removeEventListener( 'wheel', onMouseWheel );
				scope.domElement.removeEventListener( 'touchstart', onTouchStart );
				scope.domElement.removeEventListener( 'touchend', onTouchEnd );
				scope.domElement.removeEventListener( 'touchmove', onTouchMove );
				scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
				scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

				if ( scope._domElementKeyEvents !== null ) {

					scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );

				} //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

			}; //
			// internals
			//


			const scope = this;
			const STATE = {
				NONE: - 1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_PAN: 4,
				TOUCH_DOLLY_PAN: 5,
				TOUCH_DOLLY_ROTATE: 6
			};
			let state = STATE.NONE;
			const EPS = 0.000001; // current position in spherical coordinates

			const spherical = new THREE.Spherical();
			const sphericalDelta = new THREE.Spherical();
			let scale = 1;
			const panOffset = new THREE.Vector3();
			let zoomChanged = false;
			const rotateStart = new THREE.Vector2();
			const rotateEnd = new THREE.Vector2();
			const rotateDelta = new THREE.Vector2();
			const panStart = new THREE.Vector2();
			const panEnd = new THREE.Vector2();
			const panDelta = new THREE.Vector2();
			const dollyStart = new THREE.Vector2();
			const dollyEnd = new THREE.Vector2();
			const dollyDelta = new THREE.Vector2();

			function getAutoRotationAngle() {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

			}

			function getZoomScale() {

				return Math.pow( 0.95, scope.zoomSpeed );

			}

			function rotateLeft( angle ) {

				sphericalDelta.theta -= angle;

			}

			function rotateUp( angle ) {

				sphericalDelta.phi -= angle;

			}

			const panLeft = function () {

				const v = new THREE.Vector3();
				return function panLeft( distance, objectMatrix ) {

					v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix

					v.multiplyScalar( - distance );
					panOffset.add( v );

				};

			}();

			const panUp = function () {

				const v = new THREE.Vector3();
				return function panUp( distance, objectMatrix ) {

					if ( scope.screenSpacePanning === true ) {

						v.setFromMatrixColumn( objectMatrix, 1 );

					} else {

						v.setFromMatrixColumn( objectMatrix, 0 );
						v.crossVectors( scope.object.up, v );

					}

					v.multiplyScalar( distance );
					panOffset.add( v );

				};

			}(); // deltaX and deltaY are in pixels; right and down are positive


			const pan = function () {

				const offset = new THREE.Vector3();
				return function pan( deltaX, deltaY ) {

					const element = scope.domElement;

					if ( scope.object.isPerspectiveCamera ) {

						// perspective
						const position = scope.object.position;
						offset.copy( position ).sub( scope.target );
						let targetDistance = offset.length(); // half of the fov is center to top of screen

						targetDistance *= Math.tan( scope.object.fov / 2 * Math.PI / 180.0 ); // we use only clientHeight here so aspect ratio does not distort speed

						panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
						panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

					} else if ( scope.object.isOrthographicCamera ) {

						// orthographic
						panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
						panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

					} else {

						// camera neither orthographic nor perspective
						console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
						scope.enablePan = false;

					}

				};

			}();

			function dollyOut( dollyScale ) {

				if ( scope.object.isPerspectiveCamera ) {

					scale /= dollyScale;

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}

			function dollyIn( dollyScale ) {

				if ( scope.object.isPerspectiveCamera ) {

					scale *= dollyScale;

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			} //
			// event callbacks - update the object state
			//


			function handleMouseDownRotate( event ) {

				rotateStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownDolly( event ) {

				dollyStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownPan( event ) {

				panStart.set( event.clientX, event.clientY );

			}

			function handleMouseMoveRotate( event ) {

				rotateEnd.set( event.clientX, event.clientY );
				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );
				const element = scope.domElement;
				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );
				rotateStart.copy( rotateEnd );
				scope.update();

			}

			function handleMouseMoveDolly( event ) {

				dollyEnd.set( event.clientX, event.clientY );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					dollyOut( getZoomScale() );

				} else if ( dollyDelta.y < 0 ) {

					dollyIn( getZoomScale() );

				}

				dollyStart.copy( dollyEnd );
				scope.update();

			}

			function handleMouseMovePan( event ) {

				panEnd.set( event.clientX, event.clientY );
				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );
				pan( panDelta.x, panDelta.y );
				panStart.copy( panEnd );
				scope.update();

			}

			function handleMouseUp( ) { // no-op
			}

			function handleMouseWheel( event ) {

				if ( event.deltaY < 0 ) {

					dollyIn( getZoomScale() );

				} else if ( event.deltaY > 0 ) {

					dollyOut( getZoomScale() );

				}

				scope.update();

			}

			function handleKeyDown( event ) {

				let needsUpdate = false;

				switch ( event.code ) {

					case scope.keys.UP:
						pan( 0, scope.keyPanSpeed );
						needsUpdate = true;
						break;

					case scope.keys.BOTTOM:
						pan( 0, - scope.keyPanSpeed );
						needsUpdate = true;
						break;

					case scope.keys.LEFT:
						pan( scope.keyPanSpeed, 0 );
						needsUpdate = true;
						break;

					case scope.keys.RIGHT:
						pan( - scope.keyPanSpeed, 0 );
						needsUpdate = true;
						break;

				}

				if ( needsUpdate ) {

					// prevent the browser from scrolling on cursor keys
					event.preventDefault();
					scope.update();

				}

			}

			function handleTouchStartRotate( event ) {

				if ( event.touches.length == 1 ) {

					rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

				} else {

					const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
					const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
					rotateStart.set( x, y );

				}

			}

			function handleTouchStartPan( event ) {

				if ( event.touches.length == 1 ) {

					panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

				} else {

					const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
					const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
					panStart.set( x, y );

				}

			}

			function handleTouchStartDolly( event ) {

				const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				dollyStart.set( 0, distance );

			}

			function handleTouchStartDollyPan( event ) {

				if ( scope.enableZoom ) handleTouchStartDolly( event );
				if ( scope.enablePan ) handleTouchStartPan( event );

			}

			function handleTouchStartDollyRotate( event ) {

				if ( scope.enableZoom ) handleTouchStartDolly( event );
				if ( scope.enableRotate ) handleTouchStartRotate( event );

			}

			function handleTouchMoveRotate( event ) {

				if ( event.touches.length == 1 ) {

					rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

				} else {

					const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
					const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
					rotateEnd.set( x, y );

				}

				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );
				const element = scope.domElement;
				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );
				rotateStart.copy( rotateEnd );

			}

			function handleTouchMovePan( event ) {

				if ( event.touches.length == 1 ) {

					panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

				} else {

					const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
					const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
					panEnd.set( x, y );

				}

				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );
				pan( panDelta.x, panDelta.y );
				panStart.copy( panEnd );

			}

			function handleTouchMoveDolly( event ) {

				const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				dollyEnd.set( 0, distance );
				dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );
				dollyOut( dollyDelta.y );
				dollyStart.copy( dollyEnd );

			}

			function handleTouchMoveDollyPan( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );
				if ( scope.enablePan ) handleTouchMovePan( event );

			}

			function handleTouchMoveDollyRotate( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );
				if ( scope.enableRotate ) handleTouchMoveRotate( event );

			}

			function handleTouchEnd( ) { // no-op
			} //
			// event handlers - FSM: listen for events and reset state
			//


			function onPointerDown( event ) {

				if ( scope.enabled === false ) return;

				switch ( event.pointerType ) {

					case 'mouse':
					case 'pen':
						onMouseDown( event );
						break;
        // TODO touch

				}

			}

			function onPointerMove( event ) {

				if ( scope.enabled === false ) return;

				switch ( event.pointerType ) {

					case 'mouse':
					case 'pen':
						onMouseMove( event );
						break;
        // TODO touch

				}

			}

			function onPointerUp( event ) {

				switch ( event.pointerType ) {

					case 'mouse':
					case 'pen':
						onMouseUp( event );
						break;
        // TODO touch

				}

			}

			function onMouseDown( event ) {

				// Prevent the browser from scrolling.
				event.preventDefault(); // Manually set the focus since calling preventDefault above
				// prevents the browser from setting it automatically.

				scope.domElement.focus ? scope.domElement.focus() : window.focus();
				let mouseAction;

				switch ( event.button ) {

					case 0:
						mouseAction = scope.mouseButtons.LEFT;
						break;

					case 1:
						mouseAction = scope.mouseButtons.MIDDLE;
						break;

					case 2:
						mouseAction = scope.mouseButtons.RIGHT;
						break;

					default:
						mouseAction = - 1;

				}

				switch ( mouseAction ) {

					case THREE.MOUSE.DOLLY:
						if ( scope.enableZoom === false ) return;
						handleMouseDownDolly( event );
						state = STATE.DOLLY;
						break;

					case THREE.MOUSE.ROTATE:
						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enablePan === false ) return;
							handleMouseDownPan( event );
							state = STATE.PAN;

						} else {

							if ( scope.enableRotate === false ) return;
							handleMouseDownRotate( event );
							state = STATE.ROTATE;

						}

						break;

					case THREE.MOUSE.PAN:
						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enableRotate === false ) return;
							handleMouseDownRotate( event );
							state = STATE.ROTATE;

						} else {

							if ( scope.enablePan === false ) return;
							handleMouseDownPan( event );
							state = STATE.PAN;

						}

						break;

					default:
						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
					scope.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );
					scope.dispatchEvent( _startEvent );

				}

			}

			function onMouseMove( event ) {

				if ( scope.enabled === false ) return;
				event.preventDefault();

				switch ( state ) {

					case STATE.ROTATE:
						if ( scope.enableRotate === false ) return;
						handleMouseMoveRotate( event );
						break;

					case STATE.DOLLY:
						if ( scope.enableZoom === false ) return;
						handleMouseMoveDolly( event );
						break;

					case STATE.PAN:
						if ( scope.enablePan === false ) return;
						handleMouseMovePan( event );
						break;

				}

			}

			function onMouseUp( event ) {

				scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
				scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );
				if ( scope.enabled === false ) return;
				handleMouseUp( event );
				scope.dispatchEvent( _endEvent );
				state = STATE.NONE;

			}

			function onMouseWheel( event ) {

				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE ) return;
				event.preventDefault();
				scope.dispatchEvent( _startEvent );
				handleMouseWheel( event );
				scope.dispatchEvent( _endEvent );

			}

			function onKeyDown( event ) {

				if ( scope.enabled === false || scope.enablePan === false ) return;
				handleKeyDown( event );

			}

			function onTouchStart( event ) {

				if ( scope.enabled === false ) return;
				event.preventDefault(); // prevent scrolling

				switch ( event.touches.length ) {

					case 1:
						switch ( scope.touches.ONE ) {

							case THREE.TOUCH.ROTATE:
								if ( scope.enableRotate === false ) return;
								handleTouchStartRotate( event );
								state = STATE.TOUCH_ROTATE;
								break;

							case THREE.TOUCH.PAN:
								if ( scope.enablePan === false ) return;
								handleTouchStartPan( event );
								state = STATE.TOUCH_PAN;
								break;

							default:
								state = STATE.NONE;

						}

						break;

					case 2:
						switch ( scope.touches.TWO ) {

							case THREE.TOUCH.DOLLY_PAN:
								if ( scope.enableZoom === false && scope.enablePan === false ) return;
								handleTouchStartDollyPan( event );
								state = STATE.TOUCH_DOLLY_PAN;
								break;

							case THREE.TOUCH.DOLLY_ROTATE:
								if ( scope.enableZoom === false && scope.enableRotate === false ) return;
								handleTouchStartDollyRotate( event );
								state = STATE.TOUCH_DOLLY_ROTATE;
								break;

							default:
								state = STATE.NONE;

						}

						break;

					default:
						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.dispatchEvent( _startEvent );

				}

			}

			function onTouchMove( event ) {

				if ( scope.enabled === false ) return;
				event.preventDefault(); // prevent scrolling

				switch ( state ) {

					case STATE.TOUCH_ROTATE:
						if ( scope.enableRotate === false ) return;
						handleTouchMoveRotate( event );
						scope.update();
						break;

					case STATE.TOUCH_PAN:
						if ( scope.enablePan === false ) return;
						handleTouchMovePan( event );
						scope.update();
						break;

					case STATE.TOUCH_DOLLY_PAN:
						if ( scope.enableZoom === false && scope.enablePan === false ) return;
						handleTouchMoveDollyPan( event );
						scope.update();
						break;

					case STATE.TOUCH_DOLLY_ROTATE:
						if ( scope.enableZoom === false && scope.enableRotate === false ) return;
						handleTouchMoveDollyRotate( event );
						scope.update();
						break;

					default:
						state = STATE.NONE;

				}

			}

			function onTouchEnd( event ) {

				if ( scope.enabled === false ) return;
				handleTouchEnd( event );
				scope.dispatchEvent( _endEvent );
				state = STATE.NONE;

			}

			function onContextMenu( event ) {

				if ( scope.enabled === false ) return;
				event.preventDefault();

			} //


			scope.domElement.addEventListener( 'contextmenu', onContextMenu );
			scope.domElement.addEventListener( 'pointerdown', onPointerDown );
			scope.domElement.addEventListener( 'wheel', onMouseWheel, {
				passive: false
			} );
			scope.domElement.addEventListener( 'touchstart', onTouchStart, {
				passive: false
			} );
			scope.domElement.addEventListener( 'touchend', onTouchEnd );
			scope.domElement.addEventListener( 'touchmove', onTouchMove, {
				passive: false
			} ); // force an update at start

			this.update();

		}

	} // This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	// This is very similar to OrbitControls, another set of touch behavior
	//
	//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
	//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//    Pan - left mouse, or arrow keys / touch: one-finger move


	class MapControls extends OrbitControls {

		constructor( object, domElement ) {

			super( object, domElement );
			this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up

			this.mouseButtons.LEFT = THREE.MOUSE.PAN;
			this.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
			this.touches.ONE = THREE.TOUCH.PAN;
			this.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

		}

	}

	THREE.MapControls = MapControls;
	THREE.OrbitControls = OrbitControls;

} )();

;
/* campus-data.js */
const FH = 3.6; // Floor Height in meters

    const BUILDINGS_CONFIG = [
  // 1. 學生活動中心 / 體育館 (西南角)
  {
    id: "gym-bld",
    name: "學生活動中心 / 體育館",
    category: "sports",
    color: 0xd98a80,
    roofColor: 0x9e473e,
    x: -80, z: 58, width: 34, depth: 36, floors: 3,
    isGymSpecial: true,
    stairs: [
      { x: -65, z: 46, name: "活動中心南側雙圓柱梯", floors: 3 },
      { x: -65, z: 70, name: "活動中心北側雙圓柱梯", floors: 3 }
    ],
    rooms: [
      { id: "gym", code: "GYM-1", name: "活動中心大禮堂", floor: 1, node: "gym-1f-hall", cat: "sports" },
      { id: "fire-room", code: "GYM-F", name: "消防機房 (1F)", floor: 1, node: "gym-fire-1f", cat: "admin" },
      { id: "weight-room", code: "GYM-2", name: "體育重訓室 (2F)", floor: 2, node: "gym-stair-s-2f", cat: "sports" },
      { id: "gym-balcony", code: "GYM-3", name: "活動中心看台區 (3F)", floor: 3, node: "gym-stair-s-3f", cat: "sports" }
    ]
  },

  // 2. 資源回收室 (活動中心西側)
  {
    id: "recycle-bld",
    name: "資源回收室",
    category: "admin",
    color: 0xc8d6e5,
    roofColor: 0x576574,
    x: -106, z: 58, width: 14, depth: 16, floors: 1,
    stairs: [],
    rooms: [
      { id: "recycling", code: "REC-1", name: "資源回收室 (1F)", floor: 1, node: "recycle-1f", cat: "admin" }
    ]
  },

  // 3. 行政大樓 (前棟, 南橫棟)
  {
    id: "admin-front",
    name: "行政大樓 (前棟)",
    category: "admin",
    color: 0xecf0f1,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: -12, z: 44, width: 26, depth: 10, floors: 3,
    stairs: [
      { x: -22, z: 44, name: "行政前棟西側樓梯", floors: 3 },
      { x: -2, z: 44, name: "行政前棟東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "admin-g89-staff", code: "A1-01", name: "八、九年級導師室 (1F)", floor: 1, node: "admin-f-1f-w", cat: "admin" },
      { id: "spec-staff-1", code: "A1-02", name: "專任辦公室一 (1F)", floor: 1, node: "admin-f-1f-e", cat: "admin" },
      { id: "principal", code: "A2-01", name: "校長室 (2F)", floor: 2, node: "admin-f-2f-w", cat: "admin" },
      { id: "reception", code: "A2-02", name: "會客室 (2F)", floor: 2, node: "admin-f-2f-c", cat: "admin" },
      { id: "academic", code: "A2-03", name: "教務處 (2F)", floor: 2, node: "admin-f-2f-e", cat: "admin" },
      { id: "lang-lab", code: "A3-01", name: "語言教室 (3F)", floor: 3, node: "admin-f-3f-w", cat: "special" },
      { id: "spec-staff-3", code: "A3-02", name: "專任辦公室三 (3F)", floor: 3, node: "admin-f-3f-e", cat: "admin" }
    ]
  },

  // 4. 行政大樓 (後棟, 北橫棟)
  {
    id: "admin-back",
    name: "行政大樓 (後棟)",
    category: "admin",
    color: 0xecf0f1,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: -12, z: 20, width: 26, depth: 10, floors: 3,
    stairs: [
      { x: -22, z: 20, name: "行政後棟西側樓梯", floors: 3 },
      { x: -2, z: 20, name: "行政後棟東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "student-affairs", code: "B1-01", name: "學務處 (1F)", floor: 1, node: "admin-b-1f-w", cat: "admin" },
      { id: "coach-room", code: "B1-02", name: "教練室 (1F)", floor: 1, node: "admin-b-1f-c", cat: "sports" },
      { id: "weimei-room", code: "B1-03", name: "唯美教室 (1F)", floor: 1, node: "admin-b-1f-e", cat: "special" },
      { id: "general", code: "B2-01", name: "總務處 / 人事室 / 會計室 (2F)", floor: 2, node: "admin-b-2f-w", cat: "admin" },
      { id: "scout-judo", code: "B2-02", name: "童軍團部 / 柔道教室 (2F)", floor: 2, node: "admin-b-2f-e", cat: "sports" },
      { id: "spec-staff-back", code: "B3-01", name: "專任辦公室 (3F)", floor: 3, node: "admin-b-3f-w", cat: "admin" },
      { id: "teacher-study", code: "B3-02", name: "教師研習中心 (3F)", floor: 3, node: "admin-b-3f-e", cat: "admin" }
    ]
  },

  // 5. 健康中心 / 合作社棟 (中央教學區北橫棟)
  {
    id: "health-bld",
    name: "健康中心 / 合作社棟",
    category: "admin",
    color: 0xe8f4f8,
    roofColor: 0x0284c7,
    hasPitchedRoof: true,
    x: 12, z: -4, width: 28, depth: 9, floors: 2,
    stairs: [
      { x: 0, z: -4, name: "健康中心樓梯", floors: 2 }
    ],
    rooms: [
      { id: "health", code: "H1-01", name: "健康中心 (1F)", floor: 1, node: "health-1f-w", cat: "admin" },
      { id: "coop", code: "H1-02", name: "員生合作社 (1F)", floor: 1, node: "health-1f-e", cat: "admin" },
      { id: "pe-office", code: "H2-01", name: "體育組辦公室 (2F)", floor: 2, node: "health-2f-w", cat: "sports" },
      { id: "pe-storage", code: "H2-02", name: "體育器材儲藏室 (2F)", floor: 2, node: "health-2f-e", cat: "sports" }
    ]
  },

  // 6. 八年級教學棟 (南橫棟 / 幼兒園)
  {
    id: "grade8-front",
    name: "八年級教學棟 (南棟)",
    category: "grade8",
    color: 0xf3ede2,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 16, z: 60, width: 44, depth: 10, floors: 3,
    stairs: [
      { x: -6, z: 60, name: "八年級西側半圓樓梯塔", floors: 3 },
      { x: 36, z: 60, name: "八年級東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "kindergarten", code: "8F1-K", name: "非營利幼兒園 (1F)", floor: 1, node: "g8f-1f-k", cat: "admin" },
      { id: "807", code: "8F2-807", name: "807 教室 (2F)", floor: 2, node: "g8f-2f-807", cat: "grade8" },
      { id: "801", code: "8F2-801", name: "801 教室 (2F)", floor: 2, node: "g8f-2f-801", cat: "grade8" },
      { id: "802", code: "8F2-802", name: "802 教室 (2F)", floor: 2, node: "g8f-2f-802", cat: "grade8" },
      { id: "803", code: "8F2-803", name: "803 教室 (2F)", floor: 2, node: "g8f-2f-803", cat: "grade8" },
      { id: "woodwork-front", code: "8F3-W", name: "木工專任教室 (3F)", floor: 3, node: "g8f-3f-wood", cat: "special" },
      { id: "806", code: "8F3-806", name: "806 教室 (3F)", floor: 3, node: "g8f-3f-806", cat: "grade8" },
      { id: "808", code: "8F3-808", name: "808 教室 (3F)", floor: 3, node: "g8f-3f-808", cat: "grade8" },
      { id: "boardgame", code: "8F3-BG", name: "桌遊益智教室 (3F)", floor: 3, node: "g8f-3f-bg", cat: "special" }
    ]
  },

  // 7. 九年級教學棟 (中央偏西縱向棟，直立南北向！)
  {
    id: "grade9-back",
    name: "九年級教學棟",
    category: "grade9",
    color: 0xebf5ee,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 2, z: 28, width: 12, depth: 38, floors: 3,
    stairs: [
      { x: 2, z: 10, name: "九年級北側樓梯", floors: 3 },
      { x: 2, z: 46, name: "九年級南側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "906", code: "9B1-906", name: "906 教室 (1F)", floor: 1, node: "g9-1f-906", cat: "grade9" },
      { id: "907", code: "9B1-907", name: "907 教室 (1F)", floor: 1, node: "g9-1f-907", cat: "grade9" },
      { id: "908", code: "9B1-908", name: "908 教室 (1F)", floor: 1, node: "g9-1f-908", cat: "grade9" },
      { id: "g9-clubs", code: "9B2-CLB", name: "綜合社團教室 (2F)", floor: 2, node: "g9-2f-clubs", cat: "special" },
      { id: "904", code: "9B2-904", name: "904 教室 (2F)", floor: 2, node: "g9-2f-904", cat: "grade9" },
      { id: "905", code: "9B2-905", name: "905 教室 (2F)", floor: 2, node: "g9-2f-905", cat: "grade9" },
      { id: "901", code: "9B3-901", name: "901 教室 (3F)", floor: 3, node: "g9-3f-901", cat: "grade9" },
      { id: "902", code: "9B3-902", name: "902 教室 (3F)", floor: 3, node: "g9-3f-902", cat: "grade9" },
      { id: "903", code: "9B3-903", name: "903 教室 (3F)", floor: 3, node: "g9-3f-903", cat: "grade9" }
    ]
  },

  // 8. 八年級中棟與專科教室 (中央偏東縱向棟，直立南北向！)
  {
    id: "grade8-mid",
    name: "八年級中棟 / 專科棟",
    category: "grade8",
    color: 0xf3ede2,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 28, z: 28, width: 13, depth: 38, floors: 3,
    stairs: [
      { x: 28, z: 10, name: "八年級中棟北側樓梯", floors: 3 },
      { x: 28, z: 46, name: "八年級中棟南側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "counseling-act", code: "8M1-C", name: "輔導活動空間 (1F)", floor: 1, node: "g8m-1f-counsel", cat: "special" },
      { id: "wood-craft-206", code: "8M1-W2", name: "木工傳承206 (1F)", floor: 1, node: "g8m-1f-wood206", cat: "special" },
      { id: "809", code: "8M1-809", name: "809 體育班 (1F)", floor: 1, node: "g8m-1f-809", cat: "grade8" },
      { id: "woodwork-1", code: "8M1-W", name: "大溪木藝教室 (1F)", floor: 1, node: "g8m-1f-wood", cat: "special" },
      { id: "math-research", code: "8M2-M", name: "數學領域研究室 (2F)", floor: 2, node: "g8m-2f-math-res", cat: "special" },
      { id: "805", code: "8M2-805", name: "805 教室 (2F)", floor: 2, node: "g8m-2f-805", cat: "grade8" },
      { id: "804", code: "8M2-804", name: "804 教室 (2F)", floor: 2, node: "g8m-2f-804", cat: "grade8" },
      { id: "native-lang", code: "8M3-NL", name: "本土語教室 (3F)", floor: 3, node: "g8m-3f-nl", cat: "special" },
      { id: "drama-room", code: "8M3-D", name: "表演藝術教室 (3F)", floor: 3, node: "g8m-3f-drama", cat: "special" },
      { id: "inter-disc", code: "8M3-ID", name: "跨領域教室 (3F)", floor: 3, node: "g8m-3f-inter", cat: "special" }
    ]
  },

  // 9. 七年級新大樓＋特教學習園地 (東北角橫向大樓，3層樓)
  {
    id: "new-grade7",
    name: "七年級新大樓與特教園地",
    category: "grade7",
    color: 0xe6f0f7,
    roofColor: 0x2b5b7a,
    x: 80, z: -58, width: 46, depth: 14, floors: 3,
    stairs: [
      { x: 60, z: -58, name: "七年級西側樓梯", floors: 3 },
      { x: 100, z: -58, name: "特教學習園地樓梯", floors: 3 }
    ],
    rooms: [
      { id: "fitness-room", code: "7N1-FIT", name: "體適能教室 (1F)", floor: 1, node: "new7-1f-fit", cat: "sports" },
      { id: "709", code: "7N1-709", name: "709 體育班 (1F)", floor: 1, node: "new7-1f-709", cat: "grade7" },
      { id: "701", code: "7N1-701", name: "701 教室 (1F)", floor: 1, node: "new7-1f-701", cat: "grade7" },
      { id: "resource-room", code: "7N1-RES", name: "資源班3/4教室 (1F)", floor: 1, node: "new7-1f-res", cat: "special" },
      { id: "704", code: "7N1-704", name: "704 教室 (1F)", floor: 1, node: "new7-1f-704", cat: "grade7" },
      { id: "708", code: "7N1-708", name: "708 教室 (1F)", floor: 1, node: "new7-1f-708", cat: "grade7" },
      { id: "702", code: "7N2-702", name: "702 教室 (2F)", floor: 2, node: "new7-2f-702", cat: "grade7" },
      { id: "703", code: "7N2-703", name: "703 教室 (2F)", floor: 2, node: "new7-2f-703", cat: "grade7" },
      { id: "sped-leader", code: "7N2-SPED", name: "特教教室二 (2F)", floor: 2, node: "new7-2f-sped-off", cat: "admin" },
      { id: "705", code: "7N2-705", name: "705 教室 (2F)", floor: 2, node: "new7-2f-705", cat: "grade7" },
      { id: "counseling", code: "7N2-COU", name: "輔導室 (2F)", floor: 2, node: "new7-2f-counseling", cat: "admin" },
      { id: "math-lab", code: "7N3-MATH", name: "數學名師研究室 (3F)", floor: 3, node: "new7-3f-math", cat: "special" },
      { id: "706", code: "7N3-706", name: "706 質數研究室 (3F)", floor: 3, node: "new7-3f-706", cat: "grade7" },
      { id: "707", code: "7N3-707", name: "707 教室 (3F)", floor: 3, node: "new7-3f-707", cat: "grade7" },
      { id: "sped-classroom", code: "7N3-CLS", name: "特教班教室 (3F)", floor: 3, node: "new7-3f-sped-cls", cat: "special" }
    ]
  },

  // 10. 綜合大樓 (含平面停車場與校史室)
  {
    id: "multi-building",
    name: "綜合大樓 / 圖書館",
    category: "special",
    color: 0xeeeaf2,
    roofColor: 0x5e3a73,
    x: 74, z: -23, width: 32, depth: 34, floors: 2,
    stairs: [
      { x: 62, z: -23, name: "綜合大樓樓梯", floors: 2 }
    ],
    rooms: [
      { id: "food-classroom", code: "MB1-F", name: "餐飲烹飪教室 (1F)", floor: 1, node: "multi-1f-food", cat: "special" },
      { id: "library", code: "MB1-LIB", name: "中央圖書室 Library (1F)", floor: 1, node: "multi-1f-lib", cat: "special" },
      { id: "history-room", code: "HST-1", name: "校史室 (1F)", floor: 1, node: "history-1f", cat: "admin" },
      { id: "collab-conf", code: "MB2-C", name: "特教協同會議室 (2F)", floor: 2, node: "multi-2f-conf", cat: "admin" },
      { id: "large-computer", code: "MB2-LPC", name: "大電腦多功能教室 (2F)", floor: 2, node: "multi-2f-lpc", cat: "special" },
      { id: "it-server", code: "MB2-SRV", name: "全校資訊機房 (2F)", floor: 2, node: "multi-2f-srv", cat: "admin" }
    ]
  },

  // 11. 科技館 (東側中棟，2層樓)
  {
    id: "tech-building",
    name: "科技館",
    category: "special",
    color: 0xe4f2ef,
    roofColor: 0x1b675e,
    x: 74, z: 12, width: 28, depth: 22, floors: 2,
    stairs: [
      { x: 62, z: 12, name: "科技館樓梯", floors: 2 }
    ],
    rooms: [
      { id: "audiovisual-1f", code: "TC1-AV", name: "視聽多媒體教室 (1F)", floor: 1, node: "tech-1f-av", cat: "special" },
      { id: "life-tech-1", code: "TC1-LT1", name: "生活科技教室一 (1F)", floor: 1, node: "tech-1f-lt1", cat: "special" },
      { id: "tech-smart", code: "TC1-SMT", name: "科技智慧教室 (1F)", floor: 1, node: "tech-1f-smart", cat: "special" },
      { id: "life-tech-2", code: "TC1-LT2", name: "生活科技教室二 (1F)", floor: 1, node: "tech-1f-lt2", cat: "special" },
      { id: "physics-lab", code: "TC2-PHY", name: "理化第一實驗室 (2F)", floor: 2, node: "tech-2f-phy", cat: "special" },
      { id: "computer-lab-1", code: "TC2-PC1", name: "第一電腦教室 (2F)", floor: 2, node: "tech-2f-pc1", cat: "special" },
      { id: "computer-lab-2", code: "TC2-PC2", name: "第二電腦教室 (2F)", floor: 2, node: "tech-2f-pc2", cat: "special" },
      { id: "maker-lab", code: "TC2-MK", name: "科教創作室 (2F)", floor: 2, node: "tech-2f-maker", cat: "special" }
    ]
  },

  // 12. 藝術館 (東側南棟，直立長條，4層樓)
  {
    id: "art-building",
    name: "藝術館",
    category: "special",
    color: 0xf8e9eb,
    roofColor: 0x82414f,
    x: 74, z: 46, width: 14, depth: 32, floors: 4,
    stairs: [
      { x: 68, z: 46, name: "藝術館主樓梯間", floors: 4 }
    ],
    rooms: [
      { id: "broadwood", code: "ART1-BW", name: "樂活體能教室 (1F)", floor: 1, node: "art-1f-bw", cat: "sports" },
      { id: "music-2f", code: "ART2-M1", name: "第一音樂教室 (2F)", floor: 2, node: "art-2f-m1", cat: "special" },
      { id: "music-3f", code: "ART3-M2", name: "第二音樂教室 (3F)", floor: 3, node: "art-3f-m2", cat: "special" },
      { id: "art-4f", code: "ART4-ART", name: "美術創作教室 (4F)", floor: 4, node: "art-4f-art", cat: "special" }
    ]
  }
];


// 樓層及固定空間由 spatial-plan-data.js 校對；保留縱棟與行政棟的通行間距。
BUILDINGS_CONFIG.find(b=>b.id==='grade9-back').x=7.5;
// 每棟屋頂採低彩度的獨立色調，保留同一校園的整體配色。
const BUILDING_ROOF_COLORS={
 'gym-bld':0x60756f,       // 灰綠
 'recycle-bld':0x64716b,   // 石灰綠
 'admin-front':0x873e39,   // 磚紅
 'admin-back':0x80504a,    // 暖陶紅
 'health-bld':0x59727a,    // 藍灰
 'grade8-front':0x90795a,  // 暖砂棕
 'grade9-back':0x7e8062,   // 橄欖棕
 'grade8-mid':0x8b7065,    // 陶土棕
 'new-grade7':0x526f79,    // 石板藍
 'multi-building':0x665c70,// 灰紫
 'tech-building':0x476c63, // 松綠
 'art-building':0x765c64  // 玫瑰灰
};
for(const building of BUILDINGS_CONFIG){
 building.color=building.isGymSpecial?0xb88d84:0xd0c9bd;
 building.roofColor=BUILDING_ROOF_COLORS[building.id]??building.roofColor;
}

;
/* spatial-plan-data.js */
/* 115 學年度圖面：座標比例為示意，樓層與固定空間碼由原圖校對。
 * Stable destination IDs remain compatible with saved names and shared URLs.
 */
const CampusSpatialData = (() => {
 const room=(id,code,units=1,name)=>({id,spaceCode:code,kind:'room',units,name});
 const stair=(id,label='樓梯')=>({id,label,kind:'stair',len:6});
 const wc=(units=.32)=>({kind:'wc',label:'廁所',units});
 const passage=(units=.5,label='穿堂')=>({kind:'passage',label,units});
 const vacant=(units=1,label='通道')=>({kind:'void',label,units});
 const profiles={
  'grade9-back':{sign:1,floors:{
   1:[room('906','213'),room('907','212'),room('908','211'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')],
   2:[room('g9-clubs','223',1,'社團教室'),room('904','222'),room('905','221'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')],
   3:[room('901','233'),room('902','232'),room('903','231'),passage(.35,'通廊'),wc(),stair('south','南端樓梯')]
  }},
  'grade8-mid':{sign:-1,floors:{
   1:[room('mid-315','315',1,'空間 315（名稱待確認）'),room('wood-craft-206','314',1,'空間 314（名稱待確認）'),room('909','313',1,'909 教室'),room('woodwork-1','312',1,'木藝教室'),room('mid-311','311',1,'木藝教室'),wc(.45),stair('south','南端共用樓梯')],
   2:[room('mid-325','325',1,'空間 325（名稱待確認）'),room('mid-324','324',1,'空間 324（名稱待確認）'),room('math-research','323',1,'空間 323（名稱待確認）'),room('805','322'),room('804','321'),wc(.45),stair('south','南端共用樓梯')],
   3:[room('native-lang','335',1,'空間 335（名稱待確認）'),room('drama-room','333–334',2,'表藝教室'),room('inter-disc','332',1,'空間 332（名稱待確認）'),room('809','331',1,'809 教室'),wc(.45),stair('south','南端共用樓梯')]
  }},
  'grade8-front':{sign:-1,floors:{
   1:[stair('west','西側半圓梯'),room('kindergarten','411–414',4),stair('east','東側共用樓梯')],
   2:[stair('west','西側半圓梯'),room('807','421'),room('801','422'),room('802','423'),room('803','424'),stair('east','東側共用樓梯')],
   3:[stair('west','西側半圓梯'),room('woodwork-front','431',1,'空間 431（名稱待確認）'),room('806','432'),room('808','433'),room('boardgame','434',1,'桌遊教室'),stair('east','東側共用樓梯')]
  }},
  'admin-back':{sign:1,floors:{
   1:[room('student-affairs','ADM-B-1W',.6),room('coach-room','ADM-B-1C',.6),stair('central','中段折返梯'),wc(.35),room('weimei-room','ADM-B-1E1',.65,'東側空間一（名稱待確認）'),room('admin-back-east','ADM-B-1E2',.65,'東側空間二（名稱待確認）')],
   2:[room('general','ADM-B-2W',1.2),stair('central','中段折返梯'),wc(.35),passage(1.3,'總務・人事・會計辦公區')],
   3:[room('spec-staff-back','ADM-B-3W',1.2),stair('central','中段折返梯'),wc(.35),room('teacher-study','ADM-B-3E',1.3)]
  }},
  'admin-front':{sign:1,floors:{
   1:[room('admin-g89-staff','ADM-F-1',3.2)],
   2:[room('principal','ADM-F-2W',.9),room('reception','ADM-F-2C',.3,'校長室旁空間（名稱待確認）'),passage(.7),room('academic','ADM-F-2E',1.3)],
   3:[room('lang-lab','ADM-F-3W',1.2),passage(.7),room('spec-staff-3','ADM-F-3E',1.3)]
  }},
  'health-bld':{sign:1,floors:{1:[room('health','511'),room('coop','512'),stair('east','東側樓梯')],2:[room('pe-office','521',1,'空間 521（名稱待確認）'),room('pe-storage','522',1,'空間 522（名稱待確認）'),stair('east','東側樓梯')]}},
  'art-building':{sign:-1,floors:Object.fromEntries(['broadwood','music-2f','music-3f','art-4f'].map((id,i)=>[i+1,[stair('main','藝術館樓梯'),room(id,`ART-${i+1}`,1,['樂活教室','音樂教室','音樂教室','美術教室'][i])]]))},
  'gym-bld':{sign:1,confidence:'照片可確認外觀；室內尺度及上層動線為示意',floors:{1:[stair('north','活動中心北側梯'),room('gym','GYM-1',4),room('fire-room','GYM-F',.6),stair('south','活動中心南側梯')],2:[stair('north','活動中心北側梯'),room('weight-room','GYM-2',4.6),stair('south','活動中心南側梯')],3:[stair('north','活動中心北側梯'),room('gym-balcony','GYM-3',4.6),stair('south','活動中心南側梯')]}},
  'recycle-bld':{sign:1,floors:{1:[room('recycling','REC-1')]}},
  'new-grade7':{shape:'new7',sign:1,confidence:'班級與固定碼由圖校對；西側上下樓梯段採示意尺度'},
  'multi-building':{shape:'multi',sign:-1},
  'tech-building':{shape:'tech',sign:-1}
 };
 const extras={
  'g9-clubs':{name:'社團教室',cat:'special'},'909':{name:'909 教室',cat:'grade9'},'new7-staff':{name:'導師室',cat:'admin'},
  'sped-office':{name:'特教辦公室',cat:'admin'},'sped-614':{name:'特教教室',cat:'special'},'sped-612':{name:'特教相關教室',cat:'special'},
  'multi-622':{name:'空間 622（名稱待確認）',cat:'admin'},'tech-nw-2':{name:'空間 TC-NW-2（名稱待確認）',cat:'special'},
  'tech-sw-1':{name:'空間 TC-SW-1（名稱待確認）',cat:'special'}
 };
 const aliases={'spec-staff-1':'admin-g89-staff','scout-judo':'general','counseling':'collab-conf','fitness-room':'709','counseling-act':'mid-315'};
 const custom={
  new7:[
   [1,room('709','A12'),room('701','A13'),room('resource-room','A14',1,'資源班 3／4 教室'),room('sped-leader','A15',1,'特教教室')],
   [2,room('math-lab','A21',1,'空間 A21（名稱待確認）'),room('702','A22'),room('703','A23'),room('704','A24'),room('705','A25')],
   [3,room('sped-classroom','A31',1,'空間 A31（名稱待確認）'),room('706','A32'),room('707','A33'),room('708','A34'),room('new7-staff','A35')]
  ],
  multi:[
   [1,room('food-classroom','615',1,'餐飲教室'),room('library','611',1,'圖書室'),room('history-room','HST-1',1,'校史室'),room('sped-614','614'),room('sped-office','613'),room('sped-612','612')],
   [2,room('large-computer','621',1,'大電腦教室'),room('multi-622','622'),room('it-server','623',1,'空間 623（名稱待確認）'),room('collab-conf','624',1,'輔導室')]
  ],
  tech:[
   [1,room('audiovisual-1f','TC-NW-1',1,'視聽教室'),room('life-tech-1','TC-N-1',1,'生科教室一'),room('tech-sw-1','TC-SW-1'),room('life-tech-2','TC-NE-1',1,'生科教室二'),room('computer-lab-1','TC-SE-1',1,'電腦教室一')],
   [2,room('tech-nw-2','TC-NW-2'),room('physics-lab','TC-N-2',1,'理化實驗室'),room('maker-lab','TC-SW-2',1,'空間 TC-SW-2（名稱待確認）'),room('tech-smart','TC-NE-2',1,'科技教室（名稱待確認）'),room('computer-lab-2','TC-SE-2',1,'電腦教室二')]
  ]
 };
 for(const b of BUILDINGS_CONFIG){
  const p=profiles[b.id],old=new Map(b.rooms.map(r=>[r.id,r]));
  const rows=p.shape?custom[p.shape]:Object.entries(p.floors).map(([f,cells])=>[Number(f),...cells.filter(c=>c.kind==='room')]);
  b.rooms=rows.flatMap(([f,...cells])=>cells.map(c=>{
   const previous=old.get(c.id)||extras[c.id]||{name:c.name,cat:'special'};
   return{...previous,id:c.id,spaceCode:c.spaceCode,code:c.spaceCode,codeSource:/^(ADM|GYM|ART|REC|TC|HST)/.test(c.spaceCode)?'assigned':'plan',legacyCode:previous.code,floor:f,name:(c.name||previous.name||c.id).replace(/\s*\(\d+F\)/,'')+` (${f}F)`,node:previous.node||`space-${c.id}`};
  }));
  b.spatialProfile=p;
 }
 return {profiles,custom,aliases};
})();

;
/* spatial-plan.js */
/* Geometry compiler shared by scene, physics, navigation, classroom matrix and map. */
const CampusSpatialPlan = (() => {
 const H=3.6,eps=1e-6;
 const contains=(r,u,v)=>u>=r.u0-eps&&u<=r.u1+eps&&v>=r.v0-eps&&v<=r.v1+eps;
 function layout(b){
  const p=b.spatialProfile;if(!p)return null;
  const horizontal=p.shape==='tech'||b.id==='art-building'?false:b.width>=b.depth,L=horizontal?b.width:b.depth,D=horizontal?b.depth:b.width,sign=p.sign||1;
  const world=(u,v,y=0)=>horizontal?{x:b.x+u,z:b.z+v,y}:{x:b.x+v,z:b.z+u,y};
  const rect=(u0,u1,v0,v1)=>{const a=world(u0,v0),c=world(u1,v1);return{x0:Math.min(a.x,c.x),x1:Math.max(a.x,c.x),z0:Math.min(a.z,c.z),z1:Math.max(a.z,c.z)}};
  const local=(x,z)=>horizontal?{u:x-b.x,v:z-b.z}:{u:z-b.z,v:x-b.x};
  const cells=[],corridors=[],footprints=[],stairs=[],ramps=[],platforms=[],holes=[],entrances=[],displayRows=[];
  const addRect=(target,r)=>{const a={...r,rect:rect(r.u0,r.u1,r.v0,r.v1)};target.push(a);return a};
  function addCell(item,floor,u0,u1,v0,v1,row='main',doorSide='v1',corridorValue){
   const r=item.kind==='room'?b.rooms.find(r=>r.id===item.id):null;
   const c=addRect(cells,{...item,...r,id:item.id||`${b.id}-${item.kind}-${floor}-${cells.length}`,floor,u0,u1,v0,v1,row,span:u1-u0,spaceCode:r?.spaceCode||item.spaceCode||'',label:item.label||r?.name||'',kind:item.kind});
   if(item.kind==='room'||item.kind==='wc'){
    const u=(u0+u1)/2,v=(v0+v1)/2,y=(floor-1)*H,side=doorSide;
    const du=side==='u0'?u0:side==='u1'?u1:u,dv=side==='v0'?v0:side==='v1'?v1:v;
    const cv=corridorValue??(side==='v0'?v0-1.4:side==='v1'?v1+1.4:side==='u0'?u0-1.4:u1+1.4);
    c.u=u;c.v=v;c.doorSide=side;c.center=world(u,v,y);c.door=world(du,dv,y);c.corridor=side.startsWith('v')?world(u,cv,y):world(cv,v,y);
   }
   return c;
  }
  const fp=(f,u0,u1,v0,v1)=>addRect(footprints,{floor:f,u0,u1,v0,v1});
  const co=(f,u0,u1,v0,v1)=>addRect(corridors,{floor:f,u0,u1,v0,v1});
  function addStair(id,name,u0,u1,v0,v1,side=sign,confidence='圖面位置／示意梯段'){
   const s=addRect(stairs,{id:`${b.id}-${id}`,name,u0,u1,v0,v1,floors:b.floors,confidence});
   const cv=(v0+v1)/2,far=u0+.8,near=u1-1,inner=u1-.7;
   s.farU=far;s.nearU=near;s.innerU=inner;s.centerV=cv;s.sign=side;
   s.hole={u0:u0+.2,u1:near,v0:cv-2.3,v1:cv+2.3};holes.push(s.hole);
   for(let f=1;f<b.floors;f++){
    const y=(f-1)*H;
    for(const [start,end] of [[world(near,cv+side*1.25,y),world(far,cv+side*1.25,y+H/2)],[world(far,cv-side*1.25,y+H/2),world(near,cv-side*1.25,y+H)]]){
     const bounds=horizontal?{x0:Math.min(start.x,end.x),x1:Math.max(start.x,end.x),z0:start.z-.8,z1:start.z+.8}:{x0:start.x-.8,x1:start.x+.8,z0:Math.min(start.z,end.z),z1:Math.max(start.z,end.z)};
     ramps.push({...bounds,start,end,h0:start.y,h1:end.y,axis:horizontal?'x':'z',floor:f,stairId:s.id});
    }
    platforms.push({...rect(u0+.2,far+.08,cv-2.3,cv+2.3),y:y+H/2,floor:f,stairId:s.id});
   }
   return s;
  }
  const outerV=sign*D/2,wallV=sign*(D/2-2.8),cV=sign*(D/2-1.4);
  if(b.id==='art-building'){
   displayRows.push({id:'main',label:'圖面左 → 右',axis:'v',start:-D/2,end:D/2});
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,-2,1);
    addCell({kind:'stair',id:'main',label:'西側樓梯'},f,-3,3,-D/2,-2,'main');
    addCell({kind:'passage',label:'走廊'},f,-L/2,L/2,-2,1,'main');
    addCell({...b.rooms.find(r=>r.floor===f),kind:'room'},f,-L/2,L/2,1,D/2,'main','v0',-.5);
   }
   addStair('main','藝術館西側樓梯',-3,3,-D/2,-2,1);
   entrances.push({floor:1,inside:world(L/2-.6,-.5),outside:world(L/2+1.2,-.5)});
  }else if(!p.shape){
   displayRows.push({id:'main',label:horizontal?'圖面左 → 右':'圖面上 → 下',axis:'u',start:-L/2,end:L/2});
   for(let f=1;f<=b.floors;f++){
    fp(f,-L/2,L/2,-D/2,D/2);co(f,-L/2,L/2,Math.min(wallV,outerV),Math.max(wallV,outerV));
    const items=p.floors[f],fixed=items.reduce((n,c)=>n+(c.len||0),0),unit=(L-fixed)/items.reduce((n,c)=>n+(c.len?0:c.units||1),0);let u=-L/2;
    for(const item of items){const u1=u+(item.len||unit*(item.units||1));
     const back=-outerV,v0=Math.min(back,wallV),v1=Math.max(back,wallV);
     addCell(item,f,u,u1,item.kind==='stair'?-D/2:v0,item.kind==='stair'?D/2:v1,'main',sign===1?'v1':'v0',cV);
     if(item.kind==='stair'&&f===1)addStair(item.id,item.label,u,u1,-D/2,D/2);
     if(item.kind==='passage')co(f,u,u1,-D/2,D/2);
     u=u1;
    }
    if(f===1){entrances.push({floor:1,inside:world(0,cV),outside:world(0,outerV+sign*1.2)});
     // Corridor ends are usable entrances and inter-wing connections.
     for(const side of [-1,1])entrances.push({floor:1,inside:world(side*(L/2-.6),cV),outside:world(side*(L/2+1.2),cV)});
    }
   }
  }else{
   // The non-linear wings preserve the central outdoor space. Rectangles are proportional.
   const a=-L/2,A=L/2,d=-D/2,B=D/2;
   if(p.shape==='new7'){
    const vSplit=B-6,west=a+6,wing=A-8,mainEnd=wing;
    displayRows.push({id:'main',label:'主翼・圖面左 → 右',axis:'u',start:a,end:mainEnd},{id:'east',label:'右翼・圖面上 → 下',axis:'v',start:d,end:B});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,A,d,B);co(f,a,A,vSplit,B);co(f,wing,A,d,B);
     const list=b.rooms.filter(r=>r.floor===f),byCode=code=>list.find(r=>r.spaceCode===code);
     const prefix=f===1?'A1':f===2?'A2':'A3',w=(mainEnd-west)/3;
     addCell({kind:'stair',id:'west',label:'西側樓梯（示意）'},f,a,west,d,vSplit,'main');
     if(f===1){addCell({kind:'passage',label:'廣場'},f,west,west+w,d,vSplit,'main');}
     else addCell({...byCode(prefix+'1'),kind:'room'},f,west,west+w,d,vSplit,'main','v1',(B+vSplit)/2);
     for(let i=2;i<=3;i++)addCell({...byCode(prefix+i),kind:'room'},f,west+(i-1)*w,west+i*w,d,vSplit,'main','v1',(B+vSplit)/2);
     const mid=(d+B)/2;
     for(const [last,v0,v1] of [['4',d,mid],['5',mid,B]])addCell({...byCode(prefix+last),kind:'room'},f,wing+2.8,A,v0,v1,'east','u0',wing+1.4);
     // 圖面廁所在獨立外側區塊；未量定座標前不在教室範圍內生成重疊空間。
    }
    addStair('west','西側示意樓梯',a,west,d,B,1,p.confidence);
    entrances.push({floor:1,inside:world(0,(B+vSplit)/2),outside:world(0,B+1.2)});
   }
   if(p.shape==='multi'){
    const left=d,right=B,east=B-6,inner=east-2.8,north=a+7,south=A-7;
    displayRows.push({id:'north',label:'北翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'east',label:'東翼・圖面上 → 下',axis:'u',start:a,end:A},{id:'south',label:'南翼・圖面左 → 右',axis:'v',start:left,end:right},{id:'history',label:'校史室獨立區',axis:'v',start:left,end:right});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,north,left,east);fp(f,south,A,left,right);fp(f,a,A,inner,right);
     co(f,north-2.8,north,left,right);co(f,south,south+2.8,left,right);co(f,a,A,inner,east);
     const byId=id=>({...b.rooms.find(r=>r.id===id),kind:'room'});
     if(f===1){
      addCell(byId('food-classroom'),f,a,north-2.8,left,east,'north','u1',north-1.4);
      addCell(byId('library'),f,south+2.8,A,left,east,'south','u0',south+1.4);
      for(const [id,u0,u1] of [['sped-614',north,north+(south-north)/3],['sped-office',north+(south-north)/3,north+2*(south-north)/3],['sped-612',north+2*(south-north)/3,south]])addCell(byId(id),f,u0,u1,east,right,'east','v0',east-1.4);
      // Separate history room stays detached from the parking courtyard.
      const h=addCell(byId('history-room'),f,a-6,a-1,right-7,right,'history','u1',a-.2);
      fp(f,a-6,a,right-7,right);co(f,a-1,a,right-7,right);
      entrances.push({floor:1,inside:h.corridor,outside:world(a+.7,(h.v0+h.v1)/2)});
     }else{
      const w=(east-left)/3;
      for(const [i,id] of ['large-computer','multi-622','it-server'].entries())addCell(byId(id),f,south+2.8,A,left+i*w,left+(i+1)*w,'south','u0',south+1.4);
      addCell(byId('collab-conf'),f,(north+south)/2,south,east,right,'east','v0',east-1.4);
      addCell({kind:'void',label:'上方未標示教室'},f,a,north,left,east,'north');
     }
     for(const u0 of [a,south])addCell({kind:'stair',label:'停車場側樓梯'},f,u0,u0+6,east+1,right,'east');
     addCell({kind:'wc',label:'廁所'},f,south+6,A,east,right,'east','v0',east-1.4);
     addCell({kind:'void',label:'停車場・留空'},f,north,south,left,inner,'parking');
    }
    // Stairwells sit at the ends of the courtyard's east circulation strip.
    addStair('north','停車場東北側梯',a,a+6,east+1,right,-1);addStair('south','停車場東南側梯',south,south+6,east+1,right,-1);
    entrances.push({floor:1,inside:world(south+1.4,left+1),outside:world(south+1.4,left-1.2)});
   }
   if(p.shape==='tech'){
    const east=B-5,inner=east-2.8,north=a+6,south=A-6;
    displayRows.push({id:'north',label:'北翼・圖面左 → 右',axis:'v',start:d,end:B},{id:'east',label:'東翼・圖面上 → 下',axis:'u',start:a,end:A},{id:'south',label:'南翼・圖面左 → 右',axis:'v',start:d,end:B});
    for(let f=1;f<=b.floors;f++){
     fp(f,a,north,d,B);fp(f,south,A,d,B);fp(f,a,A,inner,B);co(f,north-2.8,north,d,B);co(f,south,south+2.8,d,B);co(f,a,A,inner,east);
     const byId=id=>({...b.rooms.find(r=>r.id===id),kind:'room'}),half=(d+inner)/2;
     if(f===1){addCell(byId('audiovisual-1f'),f,a,north-2.8,d,half,'north','u1',north-1.4);addCell(byId('life-tech-1'),f,a,north-2.8,half,inner,'north','u1',north-1.4);}
     else{addCell(byId('tech-nw-2'),f,a,north-2.8,d,d+(inner-d)*.25,'north','u1',north-1.4);addCell(byId('physics-lab'),f,a,north-2.8,d+(inner-d)*.25,inner,'north','u1',north-1.4);}
     addCell(byId(f===1?'tech-sw-1':'maker-lab'),f,south+2.8,A,d,inner-6,'south','u0',south+1.4);
     addCell({kind:'wc',label:'廁所'},f,south+2.8,A,inner-6,inner-3,'south','u0',south+1.4);
     addCell({kind:'stair',label:'科技館樓梯'},f,south,A,east-1,B,'south');
     const mid=(a+A)/2;
     addCell(byId(f===1?'life-tech-2':'tech-smart'),f,a,mid,east,B,'east','v0',east-1.4);
     addCell(byId(f===1?'computer-lab-1':'computer-lab-2'),f,mid,south,east,B,'east','v0',east-1.4);
     addCell({kind:'passage',label:'通廊'},f,north,south,d,inner,'courtyard');
    }
    addStair('main','科技館南翼樓梯',south,A,east-1,B,-1);
    entrances.push({floor:1,inside:world(north-1.4,d+1),outside:world(north-1.4,d-1.2)},{floor:1,inside:world(south+1.4,d+1),outside:world(south+1.4,d-1.2)});
   }
  }
  const bounds={x0:Math.min(...footprints.map(p=>p.rect.x0)),x1:Math.max(...footprints.map(p=>p.rect.x1)),z0:Math.min(...footprints.map(p=>p.rect.z0)),z1:Math.max(...footprints.map(p=>p.rect.z1))};
  return{id:b.id,b,horizontal,L,D,sign,cV,wallV,outerV,world,local,rect,bounds,cells,corridors,footprints,displayRows,stairs,ramps,platforms,holes,rooms:cells.filter(c=>c.kind==='room'),entrances,entrance:entrances[0]?.outside,confidence:p.confidence||'依平面圖房間順序；未測量尺度'};
 }
 function groundAt(l,x,z,currentY){
  const {u,v}=l.local(x,z);let best=0;
  for(const p of l.footprints){const y=(p.floor-1)*H;
   if(y<=currentY+.35&&contains(p,u,v)&&(p.floor===1||!l.holes.some(h=>contains(h,u,v))))best=Math.max(best,y);
  }
  for(const p of l.platforms)if(x>=p.x0-eps&&x<=p.x1+eps&&z>=p.z0-eps&&z<=p.z1+eps&&p.y<=currentY+.35)best=Math.max(best,p.y);
  for(const r of l.ramps)if(x>=r.x0-eps&&x<=r.x1+eps&&z>=r.z0-eps&&z<=r.z1+eps){
   const start=r.axis==='x'?r.start.x:r.start.z,end=r.axis==='x'?r.end.x:r.end.z,t=Math.max(0,Math.min(1,((r.axis==='x'?x:z)-start)/(end-start))),y=r.h0+t*(r.h1-r.h0);
   if(y<=currentY+.35)best=Math.max(best,y);
  }
  return best;
 }
 function galleries(layouts){
  const front=layouts.find(l=>l.id==='admin-front'),back=layouts.find(l=>l.id==='admin-back');
  if(!front||!back)return [];
  const x=front.bounds.x0-1.8,z0=back.b.z+back.cV,z1=front.b.z+front.cV,footprints=[],paths=[],rails=[];
  for(let floor=1;floor<=Math.min(front.b.floors,back.b.floors);floor++){
   const y=(floor-1)*H,rects=[{x0:x-1.4,x1:x+1.4,z0,z1},{x0:x-1.4,x1:front.bounds.x0+1.4,z0:z0-1.4,z1:z0+1.4},{x0:x-1.4,x1:front.bounds.x0+1.4,z0:z1-1.4,z1:z1+1.4}];
   for(const rect of rects)footprints.push({floor,u0:rect.x0,u1:rect.x1,v0:rect.z0,v1:rect.z1,rect});
   paths.push({floor,points:[back.world(-back.L/2+.6,back.cV,y),{x,y,z:z0},{x,y,z:z1},front.world(-front.L/2+.6,front.cV,y)]});
   if(floor>1)for(const side of [-1,1])rails.push({floor,u0:x+side*1.4-.06,u1:x+side*1.4+.06,v0:z0+1.4,v1:z1-1.4});
  }
  const bounds={x0:x-1.4,x1:front.bounds.x0+1.4,z0:z0-1.4,z1:z1+1.4};
  return[{id:'admin-gallery',b:{id:'admin-gallery',name:'行政大樓連通廊',floors:front.b.floors,rooms:[]},bounds,horizontal:true,world:(u,v,y=0)=>({x:u,z:v,y}),local:(x,z)=>({u:x,v:z}),rect:(u0,u1,v0,v1)=>({x0:u0,x1:u1,z0:v0,z1:v1}),cells:[],rooms:[],stairs:[],ramps:[],holes:[],platforms:[],entrances:[],footprints,corridors:footprints,paths,rails,displayRows:[]}];
 }
 function ribbon(points,width=.28){
  const vertices=[];
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<1e-6)continue;
   const nx=-dz/len*width,nz=dx/len*width,A=[a.x+nx,a.y-.55,a.z+nz],B=[a.x-nx,a.y-.55,a.z-nz],C=[b.x+nx,b.y-.55,b.z+nz],D=[b.x-nx,b.y-.55,b.z-nz];
   vertices.push(...A,...B,...C,...B,...D,...C);
  }
  return vertices;
 }
 return{layout,groundAt,contains,galleries,ribbon};
})();

;
/* collision-grid.js */
/* Broad phase only; the established avatar AABB and vertical rules are unchanged. */
const CampusCollisionGrid={
 create(walls,radius=.42,height=1.8,size=4){
  const cells=new Map(),key=(x,z)=>`${x},${z}`;
  for(const c of walls)for(let x=Math.floor((c.minX-radius)/size);x<=Math.floor((c.maxX+radius)/size);x++)for(let z=Math.floor((c.minZ-radius)/size);z<=Math.floor((c.maxZ+radius)/size);z++){
   const k=key(x,z);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(c);
  }
  return {hit(x,y,z){return(cells.get(key(Math.floor(x/size),Math.floor(z/size)))||[]).some(c=>y+height-.2>=c.minY&&y+.2<=c.maxY&&x+radius>c.minX&&x-radius<c.maxX&&z+radius>c.minZ&&z-radius<c.maxZ)},
   pointHit(x,y,z){return(cells.get(key(Math.floor(x/size),Math.floor(z/size)))||[]).some(c=>x>c.minX-.08&&x<c.maxX+.08&&z>c.minZ-.08&&z<c.maxZ+.08&&y>c.minY&&y<c.maxY)},cells};
 }
};

;
/* grid-search.js */
/* Reuse BFS work only while constructing the unchanged static navigation graph. */
(()=>{
 const key=(x,z)=>`${x},${z}`;
 const create=start=>({queue:[start],head:0,parents:new Map([[key(start.x,start.z),null]]),cache:new Map()});
 function path(state,target,free){
  const end=key(target.x,target.z);
  while(!state.parents.has(end)&&state.head<state.queue.length&&state.head<130000){
   const c=state.queue[state.head++];
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=c.x+dx,z=c.z+dz,k=key(x,z);if(state.parents.has(k))continue;if(!state.cache.has(k))state.cache.set(k,free(x,z));if(state.cache.get(k)){state.parents.set(k,key(c.x,c.z));state.queue.push({x,z})}}
  }
  if(!state.parents.has(end))return null;
  const result=[];let k=end;while(k!==null){const [x,z]=k.split(',').map(Number);result.push({x,z});k=state.parents.get(k)}return result.reverse();
 }
 window.CampusGridSearch={create,path};
})();

;
/* outdoor-plan.js */
/* Outdoor dimensions are guide units, not surveyed measurements.
 * Appearance: the 115 campus plan is the layout authority; the red track and court
 * placement follow the uploaded plan while photo-derived stage details remain separate.
 */
const CampusOutdoorPlan=(()=>{
 const palette={track:0xc93434,lawn:0x7b9555,court:0xb91c1c,line:0xf2f0e4,stage:0x83b0bf,step:0xd9bf6f,roof:0x9e5148};
 const track={x:-84,z:-25,halfStraight:25,outerRadius:27,innerRadius:18};
 const stage={id:'grandstand',x0:-70,x1:-54,z0:8.1,z1:15.8,height:1.4,center:{x:-62,y:1.4,z:11},foot:{x:-62,y:0,z:4.3},stairs:{x0:-69,x1:-55,z0:4.5,z1:8.1}};
 const inside=(r,p)=>p.x>=r.x0&&p.x<=r.x1&&p.z>=r.z0&&p.z<=r.z1;
 const stairWidth=p=>14-Math.min(6,Math.max(0,Math.floor((p.z-4.5)/3.6*7)))*.38;
 const onStairs=p=>inside(stage.stairs,p)&&Math.abs(p.x+62)<=stairWidth(p)/2;
 function ground(p){if(inside(stage,p))return stage.height;if(onStairs(p))return (p.z-stage.stairs.z0)/(stage.stairs.z1-stage.stairs.z0)*stage.height;return 0}
 const onStage=p=>(inside(stage,p)||onStairs(p))&&Math.abs(p.y-ground(p))<.35;
 const reserved=p=>inside(stage,p)||inside(stage.stairs,p);
 const stairsPath=()=>Array.from({length:37},(_,i)=>({x:-62,z:4.5+i*.1,y:stage.height*i/36}));
 function exitPath(p){if(!onStage(p))return null;const points=[{x:p.x,y:p.y,z:p.z},{x:-62,y:ground(p),z:p.z}];if(p.z>8.1)points.push({x:-62,y:1.4,z:8.1});for(const q of stairsPath().reverse())if(q.z<p.z)points.push(q);points.push({...stage.foot});return points}
 const courts=[{x0:-74,x1:-60,z0:-37,z1:-27},{x0:-74,x1:-60,z0:-23,z1:-13}];
 return{palette,track,stage,courts,inside,ground,onStage,onStairs,stairWidth,reserved,stairsPath,exitPath};
})();

;
/* outdoor-world.js */
/* Shared outdoor geometry. The stage walls, stairs and navigation use outdoor-plan. */
const CampusOutdoorWorld=(()=>{
 const P=CampusOutdoorPlan,matCache=new Map();
 const mat=(color)=>{if(!matCache.has(color))matCache.set(color,new THREE.MeshStandardMaterial({color,roughness:.9}));return matCache.get(color)};
 function box(g,w,h,d,x,y,z,color,solid=false){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);if(solid)registerWallCollider(x-w/2,x+w/2,z-d/2,z+d/2,y-h/2,y+h/2);return m}
 function floor(g,w,d,x,z,color,y=.035){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat(color));m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;g.add(m);return m}
 function loop(g,points,y,color){const geo=new THREE.BufferGeometry().setFromPoints(points.map(([x,z])=>new THREE.Vector3(x,y,z)));const m=new THREE.LineLoop(geo,new THREE.LineBasicMaterial({color}));g.add(m)}
 function stadium(radius){const s=new THREE.Shape(),t=P.track,a=t.halfStraight;s.moveTo(-a,-radius);s.lineTo(a,-radius);s.absarc(a,0,radius,-Math.PI/2,Math.PI/2,false);s.lineTo(-a,radius);s.absarc(-a,0,radius,Math.PI/2,Math.PI*1.5,false);s.closePath();return s}
 function render(scene){
  const g=new THREE.Group();g.name='photo-outdoor';scene.add(g);const t=P.track,c=P.palette;
  function ring(r,color,y){const mesh=new THREE.Mesh(new THREE.ShapeGeometry(stadium(r)),mat(color));mesh.rotation.x=-Math.PI/2;mesh.position.set(t.x,y,t.z);mesh.receiveShadow=true;g.add(mesh)}
  ring(t.outerRadius,c.track,.032);ring(t.innerRadius,c.lawn,.05);
  for(let i=0;i<=6;i++){const r=t.innerRadius+i*(t.outerRadius-t.innerRadius)/6;loop(g,stadium(r).getPoints(96).map(p=>[p.x+t.x,p.y+t.z]),.065,c.line)}
  // Reusable subtle grain, avoiding thousands of small meshes.
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#888';ctx.fillRect(0,0,128,128);
  for(let i=0;i<2400;i++){ctx.fillStyle=i%2?'#767676':'#999';ctx.fillRect((i*37)%128,(i*73+Math.floor(i/128)*11)%128,1,1)}
  const bump=new THREE.CanvasTexture(canvas);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(36,24);mat(c.track).bumpMap=bump;mat(c.track).bumpScale=.028;
  for(let lane=1;lane<=6;lane++){
   const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d');x.fillStyle='#f3f0e6';x.font='bold 100px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(lane),64,64);
   const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(t.x-20,.075,t.z+18+(lane-.5)*1.5);g.add(m);
   floor(g,.1,1.5,t.x-22+(lane-1)*.35,t.z+18+(lane-.5)*1.5,c.line,.07);
  }
  for(const r of P.courts){floor(g,r.x1-r.x0,r.z1-r.z0,(r.x0+r.x1)/2,(r.z0+r.z1)/2,c.court,.068);loop(g,[[r.x0,r.z0],[r.x1,r.z0],[r.x1,r.z1],[r.x0,r.z1]],.075,c.line);floor(g,r.x1-r.x0,.08,(r.x0+r.x1)/2,(r.z0+r.z1)/2,c.line,.08)}
  // Goals retain the guide's existing sports-field landmarks.
  for(const x of [t.x-22,t.x+22]){const goal=new THREE.Group();goal.position.set(x,0,t.z);goal.rotation.y=Math.PI/2;g.add(goal);box(goal,.1,2.4,.1,-2.5,1.2,0,c.line);box(goal,.1,2.4,.1,2.5,1.2,0,c.line);box(goal,5.1,.1,.1,0,2.4,0,c.line)}
  const s=P.stage,h=s.height,st=new THREE.Group();st.name='stage-photo-model';g.add(st);
  box(st,16,h,7.7,-62,h/2,11.95,c.stage);
  // Ground movement is a continuous stair envelope; visible treads remain stepped.
  for(let i=0;i<7;i++){const z0=4.5+i*3.6/7,y=(i+1)*h/7,w=14-i*.38;box(st,w,y,3.6/7,-62,y/2,z0+3.6/14,c.step);box(st,w,.025,.12,-62,y+.015,z0+.04,c.line)}
  // Stage recess: walls and framing rather than a solid blue box.
  box(st,.24,4.2,7.7,s.x0+.12,h+2.1,11.95,c.stage,true);box(st,.24,4.2,7.7,s.x1-.12,h+2.1,11.95,c.stage,true);
  box(st,16,4.2,.24,-62,h+2.1,s.z1-.12,c.stage,true);
  // Side / back blocks also stop approaching a raised platform from ground level.
  registerWallCollider(s.x0-.12,s.x0+.24,s.z0,s.z1,-.1,h+4.2);registerWallCollider(s.x1-.24,s.x1+.12,s.z0,s.z1,-.1,h+4.2);registerWallCollider(s.x0,s.x1,s.z1-.24,s.z1+.12,-.1,h+4.2);
  for(const x of [-67.2,-56.8])box(st,.35,4.2,.45,x,h+2.1,8.5,c.line,true);
  box(st,16.6,.48,8.3,-62,h+4.45,11.8,c.line);
  const roof=box(st,16.5,.12,8.3,-62,h+4.78,11.8,c.roof);roof.rotation.x=.035;
  box(st,16.6,.72,.18,-62,h+4.65,7.7,c.line);
  for(let x=-69.8;x<-54.1;x+=.25)box(st,.11,.53,.1,x,h+4.68,7.55,c.roof);
  box(st,9.8,2.7,.05,-62,h+1.65,15.52,0x6a9197);
  // Back elevation: four framed windows from the matching 3D rear views.
  for(const x of [-67.2,-63.7,-60.3,-56.8]){
   box(st,2.3,1.5,.07,x,1.25,15.96,c.line);box(st,2.05,1.28,.09,x,1.25,16.01,0x63808a);
   for(let dx=-.84;dx<1;dx+=.28)box(st,.035,1.28,.11,x+dx,1.25,16.07,c.line);box(st,2.05,.045,.11,x,1.25,16.07,c.line);
  }
  // Actual sports mosaic on the exterior rear wall, above the four windows.
  // UV corners select the mural from the original photo without inventing details.
  box(st,7.0,3.5,.09,-62,3.8,16.03,c.line);
  const muralGeometry=new THREE.PlaneGeometry(6.6,3.2);
  muralGeometry.attributes.uv.setXY(0,367/1280,1-354/960);
  muralGeometry.attributes.uv.setXY(1,842/1280,1-327/960);
  muralGeometry.attributes.uv.setXY(2,343/1280,1-585/960);
  muralGeometry.attributes.uv.setXY(3,842/1280,1-592/960);
  const muralMaterial=new THREE.MeshBasicMaterial({color:0xffffff});
  const mural=new THREE.Mesh(muralGeometry,muralMaterial);mural.name='stage-rear-sports-mural';mural.position.set(-62,3.8,16.09);st.add(mural);
  // Fetch after the first view is usable; the wall itself never blocks startup.
  const loadMural=()=>new THREE.TextureLoader().load('photos/stage-rear-mural.jpg',texture=>{
   texture.encoding=THREE.sRGBEncoding;texture.anisotropy=4;muralMaterial.map=texture;muralMaterial.needsUpdate=true;
  },undefined,()=>{muralMaterial.color.setHex(0x8b9c9a);});
  if(typeof requestIdleCallback==='function')requestIdleCallback(loadMural,{timeout:2500});else setTimeout(loadMural,600);
  // Flag poles stand on the viewer's left (+x for a -z-facing stage).
  floor(st,7,2.5,-49.5,9,c.line,.07);
  for(const [i,x] of [-52,-49.5,-47].entries()){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,10+i%2,10),mat(0xbdc7c8));pole.position.set(x,(10+i%2)/2,9);st.add(pole)}
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.1),new THREE.MeshBasicMaterial({color:0xa9443d,side:THREE.DoubleSide}));flag.position.set(-48.65,10.25,9);st.add(flag);
  const canton=new THREE.Mesh(new THREE.PlaneGeometry(.85,.55),new THREE.MeshBasicMaterial({color:0x344e7b,side:THREE.DoubleSide}));canton.position.set(-49.075,10.525,8.99);st.add(canton);
  const sun=new THREE.Mesh(new THREE.CircleGeometry(.17,12),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));sun.position.set(-49.075,10.525,8.98);st.add(sun);
  ROOMS_DB.grandstand={id:'grandstand',code:'OUT-STAND',name:'操場司令台（升旗台）',buildingId:'track',buildingName:'操場及綜合球場',floor:1,cat:'sports',node:'stand-podium'};
  return g;
 }
 return{render};
})();

;
/* floor-exhibit-model.js */
/* Display-only rules; physical rectangles remain owned by CampusSpatialPlan. */
(()=>{
 const meshVisible=(data,floor,total)=>floor==='all'||(data.roof?Number(floor)>total:(data.floorNum||1)<=Number(floor));
 const rooms=(layouts,db,floor)=>layouts.flatMap(l=>l.rooms.filter(r=>r.floor===Number(floor)&&db[r.id]&&!db[r.id].aliasFor).map(r=>({...r,name:db[r.id].name,buildingId:l.id,buildingName:l.b.name})));
 const color=(name,cat)=>{const match=String(name).match(/^([789])\d{2}(?:\s|$)/);return match?({'7':'#63b54f','8':'#409ed1','9':'#e86482'})[match[1]]:({admin:'#8470dc',special:'#b95bc2'})[cat]||'#69889a'};
 const overlap=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 function pack(candidates,width,height,reserved=[]){
  const occupied=[...reserved],result=[];
  for(const c of candidates){
   const x=Math.max(8,Math.min(width-c.w-8,Number.isFinite(c.x)?c.x-c.w/2:8));
   const y=Math.max(8,Math.min(height-c.h-8,Number.isFinite(c.y)?c.y-c.h/2:8));
   const free=r=>r.x>=8&&r.y>=8&&r.x+r.w<=width-8&&r.y+r.h<=height-8&&!occupied.some(o=>overlap(r,o));
   let rect={x,y,w:c.w,h:c.h};
   if(!free(rect)){
    let best=null,distance=Infinity;
    // Search screen space instead of silently dropping a room on collision.
    for(let sy=8;sy<=height-c.h-8;sy+=c.h+4){
     for(let sx=8;sx<=width-c.w-8;sx+=8){
      const r={x:sx,y:sy,w:c.w,h:c.h},d=(sx-x)**2+(sy-y)**2;
      if(d<distance&&free(r)){best=r;distance=d;}
     }
    }
    if(!best)continue; // The always-open floor index covers small-screen overflow.
    rect=best;
   }
   occupied.push(rect);result.push({...c,x:rect.x+c.w/2,y:rect.y+c.h/2});
  }
  return result;
 }
 window.CampusFloorExhibitModel={meshVisible,rooms,color,pack};
})();

;
/* mouse-controls-model.js */
(()=>{
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const edge=(x,width,sens)=>{const band=clamp(width*.06,40,96),t=x<band?-(1-clamp(x,0,band)/band):x>width-band?1-clamp(width-x,0,band)/band:0;return t*Math.abs(t)*2.4*clamp(sens,.5,1.6)};
 const zoom=(distance,delta,mode=0)=>clamp(distance*Math.exp(delta*(mode===1?16:mode===2?800:1)*.0012),1.8,9);
 const cameraClear=(eye,desired,ground,wall)=>{for(let i=1;i<=44;i++){const t=i/44,p={x:eye.x+(desired.x-eye.x)*t,y:eye.y+(desired.y-eye.y)*t,z:eye.z+(desired.z-eye.z)*t};if(p.y<ground(p)+.18||wall(p))return Math.max(0,(i-1)/44)}return 1};
 window.CampusMouseModel={edge,zoom,cameraClear,damp:dt=>1-Math.exp(-36*Math.max(0,dt))};
})();

;
/* entrance-avenue.js */
/* Photo-derived exterior approach. Dimensions are illustrative, not a survey. */
const CampusEntranceAvenue = (() => {
  const plan = {x:-10,z0:89,z1:171,width:9,gateZ:86};
  const palms = Array.from({length:20},(_,i)=>({x:plan.x+(i%2?6.5:-6.5),z:96+Math.floor(i/2)*7.7,height:13.6+(i*7%9)*.35,rotation:i*2.399}));
  const contains = (x,z) => x>=-19&&x<=-1&&z>=89&&z<=174;
  function crownGeometry() {
    const positions=[],colors=[],green=new THREE.Color();
    function triangle(a,b,c,tone){positions.push(...a,...b,...c);green.setHex(tone);for(let i=0;i<3;i++)colors.push(green.r,green.g,green.b);}
    for(let f=0;f<11;f++) {
      const angle=f*Math.PI*2/11,length=3.8+(f%3)*.45;
      const point=t=>[Math.cos(angle)*length*t, .95*Math.sin(Math.PI*t)-2.25*t*t, Math.sin(angle)*length*t];
      const tangent=[-Math.sin(angle),0,Math.cos(angle)];
      for(let j=1;j<18;j++) {
        const t=j/18,base=point(t),next=point(Math.min(1,t+.055));
        triangle([base[0]-.035,base[1],base[2]],next,[base[0]+.035,base[1],base[2]],0x486449);
        for(const sign of [-1,1]) {
          const reach=(.24+Math.sin(Math.PI*t)*.78)*(1-.25*t);
          const tip=[base[0]+tangent[0]*reach*sign-Math.cos(angle)*.24,base[1]-.15-reach*.4,base[2]+tangent[2]*reach*sign-Math.sin(angle)*.24];
          const middle=[(base[0]+tip[0])/2, (base[1]+tip[1])/2+.045,(base[2]+tip[2])/2];
          triangle(base,middle,[tip[0]+Math.cos(angle)*.045,tip[1],tip[2]+Math.sin(angle)*.045],f%3?0x285539:0x456845);
          triangle(base,[tip[0]-Math.cos(angle)*.045,tip[1],tip[2]-Math.sin(angle)*.045],middle,0x244632);
        }
      }
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
  }
  function render(scene,collider) {
    const group=new THREE.Group();group.name='entrance-palm-avenue';scene.add(group);
    const material=color=>new THREE.MeshStandardMaterial({color,roughness:.95});
    function box(w,h,d,x,y,z,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));m.position.set(x,y,z);m.receiveShadow=true;group.add(m);return m;}
    const length=plan.z1-plan.z0,mid=(plan.z1+plan.z0)/2;
    box(18,.04,length,-10,.012,mid,0x73796a);
    box(9,.045,length,-10,.04,mid,0x666864);
    for(const x of [-14.4,-5.6])box(.12,.012,length,x,.069,mid,0xba5145);
    for(let z=91;z<plan.z1-2;z+=6)box(.11,.012,2.8,-10,.07,z,0xe8bc53);
    for(const x of [-10.2,-9.8])box(.10,.012,17,x,.074,160.5,0xe8bc53);
    // Shared textured trunks and instanced crowns keep the avenue inexpensive to draw.
    const canvas=document.createElement('canvas');canvas.width=64;canvas.height=512;const ctx=canvas.getContext('2d');
    ctx.fillStyle='#a3a397';ctx.fillRect(0,0,64,512);
    for(let y=0;y<512;y+=17){ctx.fillStyle='#81877a';ctx.fillRect(0,y,64,1);ctx.fillStyle='#b7b6a8';ctx.fillRect(0,y+2,64,2);}
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.25,.42,1,10),new THREE.MeshStandardMaterial({map:texture,roughness:1}),palms.length);
    const shafts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.24,.28,1,10),material(0x6a8053),palms.length);
    const crowns=new THREE.InstancedMesh(crownGeometry(),new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:1}),palms.length);
    trunks.name='royal-palm-trunks';crowns.name='feathered-palm-crowns';
    const dummy=new THREE.Object3D();
    for(const [i,p] of palms.entries()) {
      dummy.rotation.set(0,p.rotation,0);dummy.position.set(p.x,p.height/2,p.z);dummy.scale.set(1,p.height,1);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+.65;dummy.scale.set(1,1.3,1);dummy.updateMatrix();shafts.setMatrixAt(i,dummy.matrix);
      dummy.position.y=p.height+1.1;dummy.scale.set(1,1,1);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);
      collider(p.x-.44,p.x+.44,p.z-.44,p.z+.44,0,p.height);
    }
    for(const mesh of [trunks,shafts,crowns]){mesh.castShadow=true;mesh.receiveShadow=true;mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;group.add(mesh);}
    // Low open fence on the left and darker boundary on the right, as in the photos.
    box(.14,1.45,77,-.9,.725,132.5,0x494f45);
    collider(-1.05,-.75,94,171,0,1.45);
    const fencePoints=[];
    for(let z=94;z<=171;z+=3.5){box(.065,1.1,.065,-19.1,.55,z,0x657566);fencePoints.push(new THREE.Vector3(-19.1,0,z),new THREE.Vector3(-19.1,1.1,z));}
    for(let y=.15;y<1.1;y+=.2)fencePoints.push(new THREE.Vector3(-19.1,y,94),new THREE.Vector3(-19.1,y,171));
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(fencePoints),new THREE.LineBasicMaterial({color:0x819589})));
    collider(-19.2,-19,94,171,0,1.1);
    window.campusEntranceAvenue={plan,palms,group};return group;
  }
  return {plan,palms,contains,crownGeometry,render};
})();

;
/* explorer.js */
/* ==========================================================================
       1. CAMPUS DATA & CONFIGURATION (115學年度大溪國中)
       ========================================================================== */
        const CATEGORY_COLORS = {
      admin: "#e63946",
      grade7: "#2980b9",
      grade8: "#e67e22",
      grade9: "#27ae60",
      special: "#16a085",
      sports: "#8e44ad"
    };

    /* ==========================================================================
       2. THREE.JS SCENE SETUP & PROCEDURAL PBR TEXTURES
       ========================================================================== */
    const canvas = document.getElementById("webgl-canvas");
    function createCampusRenderer(){
      try{return new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});}
      catch(error){
        const fallback=document.createElement('section');fallback.id='campus-webgl-fallback';fallback.setAttribute('role','alert');
        fallback.style.cssText='position:fixed;inset:0;z-index:100000;background:#172e38;color:#f5f0df;display:grid;place-content:center;gap:20px;padding:24px;text-align:center;font:18px system-ui';
        const message=document.createElement('p');message.textContent='暫時無法啟動立體場景。請重新載入，或先查看校園平面圖。';
        const retry=document.createElement('button');retry.textContent='重新載入';retry.onclick=()=>location.reload();
        const plan=document.createElement('a');plan.href='campus_plan_115.jpg';plan.textContent='查看校園平面圖';plan.style.color='#f4c971';
        fallback.append(message,retry,plan);document.body.append(fallback);
        if(parent!==window)parent.postMessage({type:'campus-startup-error'},location.origin);
        throw error;
      }
    }
    const renderer = createCampusRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc9dad2);
    scene.fog = new THREE.Fog(0xc9dad2, 260, 640);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    const OVERVIEW_CAM = new THREE.Vector3(-160, 168, 225);
    const OVERVIEW_TARGET = new THREE.Vector3(-15, 0, 6);
    camera.position.copy(OVERVIEW_CAM);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(OVERVIEW_TARGET);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 6;
    controls.maxDistance = 420;

    const hemiLight = new THREE.HemisphereLight(0xd9e7f0, 0x536449, 0.8);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xfff3df, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd1, 1.5);
    sunLight.position.set(85, 160, 90);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = window.innerWidth < 768 ? 1024 : 2048;
    sunLight.shadow.mapSize.height = window.innerWidth < 768 ? 1024 : 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 460;
    const sD = 185;
    sunLight.shadow.camera.left = -sD;
    sunLight.shadow.camera.right = sD;
    sunLight.shadow.camera.top = sD;
    sunLight.shadow.camera.bottom = -sD;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    function createPaverTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 256; cvs.height = 256;
      const ctx = cvs.getContext("2d");
      ctx.fillStyle = "#d4d8de";
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      const step = 32;
      for (let x = 0; x <= 256; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
      }
      for (let y = 0; y <= 256; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 12);
      return tex;
    }
    const paverTex = createPaverTexture();

/* ==========================================================================
       3. 3D STUDENT AVATAR (五官表情與大溪國中校服精準建模)
       ========================================================================== */
    let avatarGroup = null;
    let avatarLeftArm = null, avatarRightArm = null;
    let avatarLeftLeg = null, avatarRightLeg = null;
    let avatarAngle = 0;
    let prevAvatarPos = new THREE.Vector3(0, 0, 96);
    const avatarSpeed = 18;
    const avatarRunSpeed = 28;

    // 1. 五官紋理生成 (參考 media_1791355365994.png：黑亮大眼、高光眼神、腮紅粉頰、微笑小嘴)
    // 1. 五官與頭部紋理生成 (完美還原 media_1791355365994.png)
    function createHeadTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 1024; cvs.height = 512;
      const ctx = cvs.getContext("2d");

      // 溫潤白皙膚色基底
      ctx.fillStyle = "#ffdcc7";
      ctx.fillRect(0, 0, 1024, 512);

      // 後腦勺短黑髮 (兩側延伸至後方，z < 0)
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(0, 90, 260, 380);
      ctx.fillRect(764, 90, 260, 380);

      // 前額齊瀏海 (小黃帽帽沿下自然露出的黑髮弧線)
      ctx.beginPath();
      ctx.moveTo(300, 120);
      ctx.lineTo(724, 120);
      ctx.lineTo(724, 280);
      ctx.quadraticCurveTo(512, 300, 300, 280);
      ctx.closePath();
      ctx.fill();

      // 黑亮雙眼 (黑眼珠 + 白色純淨眼神高光)
      function drawEye(cx, cy) {
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 18, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        // 眼神高光
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 6, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      drawEye(420, 315);
      drawEye(604, 315);

      // 可愛粉嫩腮紅
      function drawBlush(cx, cy) {
        ctx.fillStyle = "rgba(255, 71, 87, 0.85)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 26, 22, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      drawBlush(370, 355);
      drawBlush(654, 355);

      // 可愛小嘴
      ctx.fillStyle = "#991b1b";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(494, 375, 36, 12, 6);
      else ctx.rect(494, 375, 36, 12);
      ctx.fill();

      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    }

    // 2. 大溪國中運動外套/校服紋理 (參考 media_1791355647345.png & media_1791355660385.png)
    function createUniformTorsoTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 512; cvs.height = 512;
      const ctx = cvs.getContext("2d");

      // 深丈青色基底
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(0, 0, 512, 512);

      // 兩側與肩膀淺水藍 (Sky Blue) 拼接飾片
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(100, 0); ctx.lineTo(80, 512); ctx.lineTo(0, 512);
      ctx.closePath(); ctx.fill();

      ctx.beginPath();
      ctx.moveTo(512, 0); ctx.lineTo(412, 0); ctx.lineTo(432, 512); ctx.lineTo(512, 512);
      ctx.closePath(); ctx.fill();

      // 白色/淺灰立領內襯
      ctx.fillStyle = "#f1f5f9";
      ctx.beginPath();
      ctx.moveTo(195, 0); ctx.lineTo(256, 75); ctx.lineTo(317, 0);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 3; ctx.stroke();

      // 中央金屬拉鍊軌道
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(256, 68); ctx.lineTo(256, 512);
      ctx.stroke();

      // 拉鍊拉頭
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(252, 135, 8, 14);

      // 右胸學號名牌 (淡藍底藍框，11011 大溪國中)
      ctx.fillStyle = "#7dd3fc";
      ctx.fillRect(125, 145, 92, 44);
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 3;
      ctx.strokeRect(125, 145, 92, 44);
      ctx.fillStyle = "#0c4a6e";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("11011", 171, 164);
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("大溪國中", 171, 181);

      // 左胸金色草寫 Dxjh 校名刺繡
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.font = "italic bold 32px 'Brush Script MT', 'Palatino', serif";
      ctx.textAlign = "center";
      ctx.fillText("Dxjh", 355, 172);
      ctx.shadowColor = "transparent";

      // 下擺縮口羅紋
      ctx.fillStyle = "#1e295b";
      ctx.fillRect(0, 482, 512, 30);

      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    }

    function createStudentAvatar() {
      avatarGroup = new THREE.Group();
      avatarGroup.scale.setScalar(.65);
      avatarGroup.position.set(-10, 0, 90);
      avatarAngle = Math.PI; // 預設面向校園北側 (朝前)
      avatarGroup.rotation.y = avatarAngle;
      prevAvatarPos.copy(avatarGroup.position);

      const headTex = createHeadTexture();
      const uniformTex = createUniformTorsoTexture();

      // 地面陰影
      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(0.68, 16),
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.04;
      avatarGroup.add(shadow);

      // 身體軀幹 (Box 搭配六面材質，胸前為校服貼圖)
      const torsoMatArray = [
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), // +X (水藍側邊)
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), // -X (水藍側邊)
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a }), // +Y (肩膀)
        new THREE.MeshStandardMaterial({ color: 0x1e295b }), // -Y (下擺)
        new THREE.MeshStandardMaterial({ map: uniformTex }),   // +Z (大溪國中校服正面)
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a })  // -Z (深藍背面)
      ];
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 1.15, 0.46),
        torsoMatArray
      );
      torso.position.y = 1.45;
      torso.castShadow = true;
      avatarGroup.add(torso);

      // 立領結構 (內白外深藍)
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.16, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
      );
      collar.position.y = 2.05;
      avatarGroup.add(collar);

      // 頭部 (圓形球體直接貼附五官與黑髮紋理，完全無紙面片接縫，完美還原 media_1791355365994.png)
      const headGroup = new THREE.Group();
      headGroup.position.y = 2.42;

      const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const headMat = new THREE.MeshStandardMaterial({ map: headTex });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.rotation.y = -Math.PI / 2; // 正面五官對齊局部 +Z
      headMesh.castShadow = true;
      headGroup.add(headMesh);

      // 雙側小耳朵
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdcc7 });
      const earL = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), skinMat);
      earL.position.set(-0.38, -0.02, 0);
      headGroup.add(earL);
      const earR = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), skinMat);
      earR.position.set(0.38, -0.02, 0);
      headGroup.add(earR);

      // 標誌性小黃帽 (圓球帽頂 + 前沿遮陽帽舌，完美還原 media_1791355365994.png)
      const capMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
      const capDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.395, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52),
        capMat
      );
      capDome.position.y = 0.02;
      headGroup.add(capDome);

      // 帽頂小圓鈕扣
      const capBtn = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xeab308 })
      );
      capBtn.position.y = 0.435;
      headGroup.add(capBtn);

      // 前向遮陽帽沿 (黃色弧形遮陽板，緊密貼合帽頂下緣)
      const visor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.41, 0.024, 24, 1, false, -Math.PI * 0.30, Math.PI * 0.60),
        capMat
      );
      visor.position.set(0, 0.02, 0.16);
      visor.rotation.x = 0.10;
      visor.castShadow = true;
      headGroup.add(visor);

      avatarGroup.add(headGroup);

      // 手臂結構 (左臂 / 右臂：深藍袖身＋水藍側條，膚色小臂與手掌)
      const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });

      function buildArm(isLeft) {
        const armGroup = new THREE.Group();
        const sideSign = isLeft ? -1 : 1;
        armGroup.position.set(sideSign * 0.52, 1.95, 0);

        // 短袖肩膀
        const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.115, 0.36, 12), sleeveMat);
        sleeve.position.y = -0.18;
        sleeve.castShadow = true;
        armGroup.add(sleeve);

        // 水藍色肩飾條
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.12), stripeMat);
        stripe.position.set(sideSign * 0.11, -0.18, 0);
        armGroup.add(stripe);

        // 膚色前臂
        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.44, 12), skinMat);
        forearm.position.y = -0.54;
        forearm.castShadow = true;
        armGroup.add(forearm);

        // 手掌
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 10), skinMat);
        hand.position.y = -0.78;
        hand.castShadow = true;
        armGroup.add(hand);

        return armGroup;
      }

      avatarLeftArm = buildArm(true);
      avatarGroup.add(avatarLeftArm);
      avatarRightArm = buildArm(false);
      avatarGroup.add(avatarRightArm);

      // 腿部結構 (深藍運動短褲＋側邊白條，膚色膝腿，純白運動短襪，黑底白邊運動鞋)
      const shortsMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const shoeBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

      function buildLeg(isLeft) {
        const legGroup = new THREE.Group();
        const sideSign = isLeft ? -1 : 1;
        legGroup.position.set(sideSign * 0.22, 0.9, 0);

        // 大溪國中運動短褲
        const shorts = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.145, 0.44, 12), shortsMat);
        shorts.position.y = -0.22;
        shorts.castShadow = true;
        legGroup.add(shorts);

        // 短褲外側白邊飾條 (如 media_1791355660385.png)
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.44, 0.11), whiteMat);
        stripe.position.set(sideSign * 0.145, -0.22, 0);
        legGroup.add(stripe);

        // 膚色小腿
        const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.32, 12), skinMat);
        calf.position.y = -0.52;
        calf.castShadow = true;
        legGroup.add(calf);

        // 白色學生運動襪 (純白襪筒)
        const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.115, 0.22, 12), whiteMat);
        sock.position.y = -0.68;
        sock.castShadow = true;
        legGroup.add(sock);

        // 運動鞋 (深藍黑鞋身＋白色橡膠大底，完全符合 media_1791355365994.png)
        const shoeBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.44), shoeBodyMat);
        shoeBody.position.set(0, -0.81, 0.08);
        shoeBody.castShadow = true;
        legGroup.add(shoeBody);

        const shoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.07, 0.46), whiteMat);
        shoeSole.position.set(0, -0.87, 0.08);
        legGroup.add(shoeSole);

        return legGroup;
      }

      avatarLeftLeg = buildLeg(true);
      avatarGroup.add(avatarLeftLeg);
      avatarRightLeg = buildLeg(false);
      avatarGroup.add(avatarRightLeg);

      scene.add(avatarGroup);
    }

    // Initialize 3D student avatar
    createStudentAvatar();

    /* ==========================================================================
       4. CAMPUS ENVIRONMENT, STAIRCASES & ARCHITECTURE
       ========================================================================== */
    const floorMeshes = [];
    const labelElements = [];
    const roomBadgeElements = [];
    const labelsContainer = document.getElementById("labels-container");
    const ROOMS_DB = {};
    let focusedBuildingId=null;

    // 4.0 Collision & Multi-Floor Staircase Engine (AABB 碰撞體與階梯升降系統)
    const WALL_COLLIDERS = [];
    let collisionBuildingId = null;
    const STAIR_ZONES = [];
    const AVATAR_COLLISION_RADIUS = 0.42;
    const AVATAR_HEIGHT = 1.8;

    function registerWallCollider(minX, maxX, minZ, maxZ, minY, maxY) {
      WALL_COLLIDERS.push({
        buildingId: collisionBuildingId,
        minX: Math.min(minX, maxX),
        maxX: Math.max(minX, maxX),
        minZ: Math.min(minZ, maxZ),
        maxZ: Math.max(minZ, maxZ),
        minY: minY !== undefined ? minY : -0.5,
        maxY: maxY !== undefined ? maxY : 24
      });
    }

    function registerStairZone(worldX, worldZ, width, depth, baseY, topY, fromFloor, toFloor, axis = 'z', dir = 1) {
      STAIR_ZONES.push({
        worldX, worldZ,
        minX: worldX - width / 2,
        maxX: worldX + width / 2,
        minZ: worldZ - depth / 2,
        maxZ: worldZ + depth / 2,
        baseY, topY,
        fromFloor, toFloor,
        axis, dir
      });
    }

    function checkWallCollision(x, y, z) {
      if(typeof window!=='undefined'&&window.campusCollisionIndex)return window.campusCollisionIndex.hit(x,y,z);
      const r = AVATAR_COLLISION_RADIUS;
      const avatarMinX = x - r;
      const avatarMaxX = x + r;
      const avatarMinZ = z - r;
      const avatarMaxZ = z + r;
      const avatarMinY = y + 0.2;
      const avatarMaxY = y + AVATAR_HEIGHT - 0.2;

      for (let i = 0; i < WALL_COLLIDERS.length; i++) {
        const c = WALL_COLLIDERS[i];
        if (avatarMaxY >= c.minY && avatarMinY <= c.maxY) {
          if (avatarMaxX > c.minX && avatarMinX < c.maxX &&
              avatarMaxZ > c.minZ && avatarMinZ < c.maxZ) {
            return true;
          }
        }
      }
      return false;
    }

    // 每次最多前進 0.18 m，避免高速／掉幀時跨過薄牆。
    // 自動帶路與鍵盤、手機共用人物體積及碰撞體。
    function moveAvatarWithCollision(position, dx, dz, dy = 0) {
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy, dz) / 0.18));
      const sx = dx / steps, sz = dz / steps, sy = dy / steps;
      let blocked = false;
      for (let step = 0; step < steps; step++) {
        let y = position.y + sy;
        const followsGround = typeof window!=='undefined' && window.campusWalkWorld && dy===0 && !isJumping;
        if(followsGround)y=window.campusWalkWorld.ground({x:position.x+sx,y:position.y,z:position.z+sz});
        // Entering a high stair edge sideways cannot teleport the character upward.
        if(followsGround&&typeof CampusOutdoorPlan!=='undefined'&&(CampusOutdoorPlan.reserved(position)||CampusOutdoorPlan.reserved({x:position.x+sx,z:position.z+sz}))&&Math.abs(y-position.y)>.24){blocked=true;continue;}
        if (!checkWallCollision(position.x + sx, y, position.z)) position.x += sx;
        else if (sx !== 0) blocked = true;
        if (!checkWallCollision(position.x, y, position.z + sz)) position.z += sz;
        else if (sz !== 0) blocked = true;
        if(followsGround)y=window.campusWalkWorld.ground(position);
        if (!checkWallCollision(position.x, y, position.z)) position.y = y;
        else if (sy !== 0) blocked = true;
      }
      return blocked;
    }

    function checkStairElevation(x, y, z) {
      for (let i = 0; i < STAIR_ZONES.length; i++) {
        const sz = STAIR_ZONES[i];
        if (x >= sz.minX && x <= sz.maxX && z >= sz.minZ && z <= sz.maxZ) {
          if (y >= sz.baseY - 0.6 && y <= sz.topY + 0.8) {
            let t = 0;
            if (sz.axis === 'z') {
              t = sz.dir === 1 ? (z - sz.minZ) / (sz.maxZ - sz.minZ) : (sz.maxZ - z) / (sz.maxZ - sz.minZ);
            } else {
              t = sz.dir === 1 ? (x - sz.minX) / (sz.maxX - sz.minX) : (sz.maxX - x) / (sz.maxX - sz.minX);
            }
            t = Math.max(0, Math.min(1, t));
            const elev = sz.baseY + t * (sz.topY - sz.baseY);
            return { onStair: true, elevation: elev, floor: t > 0.6 ? sz.toFloor : sz.fromFloor };
          }
        }
      }
      return { onStair: false };
    }

    function getBuildingAt(x, z) {
      for (let i = 0; i < BUILDINGS_CONFIG.length; i++) {
        const b = BUILDINGS_CONFIG[i];
        if (Math.abs(x - b.x) <= b.width / 2 + 0.8 && Math.abs(z - b.z) <= b.depth / 2 + 0.8) {
          return b;
        }
      }
      return null;
    }

    function createRoomNameplateTexture(text, bgColor = "#1e3a8a") {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(4, 4, 248, 56, 8);
      } else {
        ctx.rect(4, 4, 248, 56);
      }
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fbbf24";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.replace(/\s*\(\d+F\)/, ''), 128, 32);

      const tex = new THREE.CanvasTexture(canvas);
      tex.encoding=THREE.sRGBEncoding;
      return tex;
    }

    function createBuildingTitleTexture(text, bgColor = "#0f172a") {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 96;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(6, 6, 500, 84, 12);
      } else {
        ctx.rect(6, 6, 500, 84);
      }
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#f59e0b";
      ctx.stroke();

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 34px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 48);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }

    // 專屬大門門柱紋理 (藍黃波浪圓弧彩繪＋金色校名)
    function createGatePylonTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 256, 512);

      // 兩側大溪國中標誌性藍黃波浪圓圈彩繪
      for (let y = 30; y < 490; y += 75) {
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(28, y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(28, y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(228, y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(228, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // 中央金色楷書校名
      ctx.fillStyle = "#b45309";
      ctx.font = "bold 32px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      const txt = ["桃", "園", "市", "立", "大", "溪", "國", "中"];
      for (let i = 0; i < txt.length; i++) {
        ctx.fillText(txt[i], 128, 70 + i * 48);
      }
      return new THREE.CanvasTexture(canvas);
    }

    // 「禮義廉恥」正楷校訓匾額
    function createLiYiLianChiTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, 512, 128);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(6, 6, 500, 116);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 60px 'Noto Sans TC', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("禮  義  廉  恥", 256, 64);
      return new THREE.CanvasTexture(canvas);
    }

    // 紅色電子 LED 滾動跑馬燈
    function createLedMarqueeTexture(text = "大溪國中 歡迎光臨！ 實踐品格、創新共好 ★") {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, 512, 64);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#27272a";
      ctx.strokeRect(2, 2, 508, 60);

      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 26px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 32);
      return new THREE.CanvasTexture(canvas);
    }

    // 活動中心立體招牌紋理 (中英文)
    function createGymSignTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.clearRect(0, 0, 512, 128);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("學 生 活 動 中 心", 256, 52);

      ctx.fillStyle = "#334155";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("Student Activity Center", 256, 96);
      return new THREE.CanvasTexture(canvas);
    }

    // 4.1 Ground Lawn & Driveways
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(460, 380),
      new THREE.MeshStandardMaterial({ color: 0x5f7652 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 南側主幹道 (東西向車道, z=86)
    const southRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(170, 9),
      new THREE.MeshStandardMaterial({ color: 0x8c4c3a })
    );
    southRoad.rotation.x = -Math.PI / 2;
    southRoad.position.set(20, 0.02, 86);
    southRoad.receiveShadow = true;
    scene.add(southRoad);

    // 中央南北主車道 (直通北側, x=52)
    const centralRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 154),
      new THREE.MeshStandardMaterial({ color: 0x8c4c3a })
    );
    centralRoad.rotation.x = -Math.PI / 2;
    centralRoad.position.set(52, 0.025, 12);
    centralRoad.receiveShadow = true;
    scene.add(centralRoad);

    // 4.2 正門迎賓廣場、彩繪大門柱、金色圓球、黃牆紅瓦警衛室與大王椰子樹林蔭大道
    function createMainEntrancePlaza() {
      const plazaGroup = new THREE.Group();
      plazaGroup.position.set(-10, 0.03, 76);

      // 迎賓鋪面 (人字拼紅灰高質感地磚)
      const plaza = new THREE.Mesh(
        new THREE.PlaneGeometry(54, 24),
        new THREE.MeshStandardMaterial({ map: paverTex, color: 0xf1f5f9 })
      );
      plaza.rotation.x = -Math.PI / 2;
      plaza.receiveShadow = true;
      plazaGroup.add(plaza);

      // 1. 大溪國中真實彩繪大門立柱 (白色方柱＋藍黃波浪圓圈彩繪＋金色校名)
      const gateTex = createGatePylonTexture();
      const pylonMat = new THREE.MeshStandardMaterial({ map: gateTex });
      const pylonGeo = new THREE.BoxGeometry(2.4, 6.2, 2.4);

      const pL = new THREE.Mesh(pylonGeo, pylonMat);
      pL.position.set(-11, 3.1, 10);
      pL.castShadow = true;
      plazaGroup.add(pL);

      const pR = new THREE.Mesh(pylonGeo, pylonMat);
      pR.position.set(11, 3.1, 10);
      pR.castShadow = true;
      plazaGroup.add(pR);

      // 門柱頂端金黃色金屬裝飾球 (金色球形裝置)
      const goldSphereGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const goldSphereMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
      const sphereL = new THREE.Mesh(goldSphereGeo, goldSphereMat);
      sphereL.position.set(-11, 6.8, 10);
      plazaGroup.add(sphereL);
      const sphereR = new THREE.Mesh(goldSphereGeo, goldSphereMat);
      sphereR.position.set(11, 6.8, 10);
      plazaGroup.add(sphereR);

      // 電動伸縮大門 (折疊鋁合金門)
      const slidingGate = new THREE.Mesh(
        new THREE.BoxGeometry(3, 1.6, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xd4d4d8, wireframe: false })
      );
      // 入口採開門狀態，收起的門仍有碰撞體。
      slidingGate.position.set(-7.5, 0.8, 10);
      registerWallCollider(-19, -16, 85.9, 86.1, 0, 1.6);
      slidingGate.castShadow = true;
      plazaGroup.add(slidingGate);

      scene.add(plazaGroup);

      // 2. 警衛室 (正門右側 x=6, z=86)：黃色外牆、紅色斜瓦屋頂、電子LED跑馬燈
      const guardGroup = new THREE.Group();
      guardGroup.position.set(6, 0, 86);

      const guardBody = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 3.2, 5.6),
        new THREE.MeshStandardMaterial({ color: 0xfef08a }) // 照片實況：亮黃色外牆
      );
      guardBody.position.y = 1.6;
      guardBody.castShadow = true;
      guardGroup.add(guardBody);

      // 警衛室紅色中式四坡斜瓦屋頂
      const gRoofShape = new THREE.Shape();
      gRoofShape.moveTo(-3.4, 0);
      gRoofShape.lineTo(0, 1.4);
      gRoofShape.lineTo(3.4, 0);
      gRoofShape.closePath();
      const gRoof = new THREE.Mesh(
        new THREE.ExtrudeGeometry(gRoofShape, { depth: 6.8, bevelEnabled: false }),
        new THREE.MeshStandardMaterial({ color: 0xa6262c })
      );
      gRoof.position.set(0, 3.2, -3.4);
      gRoof.rotation.y = Math.PI / 2;
      gRoof.castShadow = true;
      guardGroup.add(gRoof);

      // 警衛室紅色 LED 滾動字幕跑馬燈
      const ledSign = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 0.5),
        new THREE.MeshBasicMaterial({ map: createLedMarqueeTexture("大溪國中警衛室 ★ 請出示證件換證登記"), side: THREE.DoubleSide })
      );
      ledSign.position.set(0, 3.0, 2.85);
      guardGroup.add(ledSign);

      scene.add(guardGroup);
      registerWallCollider(3.2, 8.8, 83.2, 88.8, 0, 3.2);
      // 門柱是實體；中央入口保留通行空間。
      registerWallCollider(-22.2, -19.8, 84.8, 87.2, 0, 6.2);
      registerWallCollider(-0.2, 2.2, 84.8, 87.2, 0, 6.2);

      ROOMS_DB["guard"] = {
        id: "guard",
        code: "GATE-01",
        name: "正門警衛室",
        buildingId: "gate",
        buildingName: "校門口設施",
        floor: 1,
        cat: "admin",
        node: "gate-guard"
      };

      // 照片中的椰林大道位於校門外，保留中央入校動線。
      CampusEntranceAvenue.render(scene, registerWallCollider);
      ROOMS_DB['palm-avenue'] = {id:'palm-avenue',code:'OUT-PALM',name:'校門椰林大道',buildingId:'entrance-avenue',buildingName:'校門外通道',floor:1,cat:'special',node:'palm-avenue-end'};

      // 機車與腳踏車停車棚
      const motoCanopy = new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      motoCanopy.position.set(26, 3.0, 90);
      motoCanopy.castShadow = true;
      scene.add(motoCanopy);

      const bikeCanopy = new THREE.Mesh(new THREE.BoxGeometry(26, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x475569 }));
      bikeCanopy.position.set(80, 3.0, 90);
      bikeCanopy.castShadow = true;
      scene.add(bikeCanopy);

      ROOMS_DB["bike-shed"] = {
        id: "bike-shed",
        code: "PARK-BIKE",
        name: "學生腳踏車停車棚",
        buildingId: "park",
        buildingName: "校園停車設施",
        floor: 1,
        cat: "admin",
        node: "bike-shed"
      };
    }
    createMainEntrancePlaza();

    // 4.3 蔣公銅像庭園 (位於行政大樓西側庭院 x=-36, z=32)
    function createStatueCourtyard() {
      const statueGroup = new THREE.Group();
      statueGroup.position.set(-36, 0.02, 32);

      const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.8, 0.4, 24), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      baseRing.position.y = 0.2;
      baseRing.receiveShadow = true;
      statueGroup.add(baseRing);

      const flowerBed = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.6, 24), new THREE.MeshStandardMaterial({ color: 0x2e7d32 }));
      flowerBed.position.y = 0.5;
      statueGroup.add(flowerBed);

      const base2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 2.4), new THREE.MeshStandardMaterial({ color: 0xd1d5db }));
      base2.position.y = 2.1;
      base2.castShadow = true;
      statueGroup.add(base2);

      const bronze = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 2.2, 16), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
      bronze.position.y = 4.4;
      bronze.castShadow = true;
      statueGroup.add(bronze);

      scene.add(statueGroup);

      ROOMS_DB["statue"] = {
        id: "statue",
        code: "LAND-STATUE",
        name: "蔣公銅像紀念庭園",
        buildingId: "garden",
        buildingName: "校園景觀庭園",
        floor: 1,
        cat: "special",
        node: "statue-node"
      };

      // 庭園周邊植栽
      [-42, -30].forEach(tx => {
        [24, 40].forEach(tz => {
          scene.add(createCypressTree(tx, tz));
        });
      });
    }
    createStatueCourtyard();

    function createCypressTree(x, z) {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
      trunk.position.y = 0.75;
      trunk.castShadow = true;
      tree.add(trunk);
      const fol1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.8, 8), new THREE.MeshStandardMaterial({ color: 0x2d6a4f }));
      fol1.position.y = 2.8;
      fol1.castShadow = true;
      tree.add(fol1);
      const fol2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x40916c }));
      fol2.position.y = 4.4;
      fol2.castShadow = true;
      tree.add(fol2);
      return tree;
    }

    function createBroadleafTree(x, z, scale = 1) {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.set(scale, scale, scale);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 2.4, 8), new THREE.MeshStandardMaterial({ color: 0x4a3728 }));
      trunk.position.y = 1.2;
      trunk.castShadow = true;
      tree.add(trunk);
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(2.8, 1), new THREE.MeshStandardMaterial({ color: 0x386641, roughness: 0.8 }));
      crown.position.y = 4.2;
      crown.castShadow = true;
      tree.add(crown);
      return tree;
    }

    // 景觀綠樹植栽
    [
      { x: 15, z: 28 }, { x: 15, z: 12 }, { x: 15, z: 46 },
      { x: -12, z: 2 }, { x: 38, z: 2 }, { x: 38, z: 54 },
      { x: 74, z: -2 }, { x: 74, z: 28 }, { x: 92, z: 28 }
    ].forEach(pos => {
      scene.add(createBroadleafTree(pos.x, pos.z, 1.05));
    });

    // 4.4 3D Physical Staircase Mesh Generator (實體多樓層可攀爬樓梯間)
    function create3DStaircaseMesh(x, z, totalFloors, bldWorldX, bldWorldZ) {
      const stairGroup = new THREE.Group();
      stairGroup.position.set(x, 0, z);
      const worldX = (bldWorldX !== undefined) ? bldWorldX + x : x;
      const worldZ = (bldWorldZ !== undefined) ? bldWorldZ + z : z;

      for (let f = 1; f < totalFloors; f++) {
        const baseH = (f - 1) * FH;
        const stepCount = 10;
        const stepDepth = 0.4;
        const stairWidth = 2.4;
        const flightLength = stepCount * stepDepth;

        // Steps
        for (let s = 0; s < stepCount; s++) {
          const stepMesh = new THREE.Mesh(
            new THREE.BoxGeometry(stairWidth, 0.22, stepDepth),
            new THREE.MeshStandardMaterial({ color: 0xd1d5db })
          );
          stepMesh.position.set(0, baseH + (s + 0.5) * (FH / stepCount), -s * stepDepth);
          stepMesh.castShadow = true;
          stepMesh.receiveShadow = true;
          stairGroup.add(stepMesh);
        }

        // Side Rails & Posts
        [-stairWidth / 2 + 0.08, stairWidth / 2 - 0.08].forEach(rx => {
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.08, flightLength * 1.3),
            new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
          );
          rail.position.set(rx, baseH + FH * 0.5 + 0.9, -flightLength * 0.5);
          rail.rotation.x = 0.65;
          stairGroup.add(rail);

          const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          post1.position.set(rx, baseH + 0.5, 0);
          stairGroup.add(post1);

          const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          post2.position.set(rx, baseH + FH + 0.5, -flightLength);
          stairGroup.add(post2);
        });

        // Top Landing Platform (上層休息平台)
        const landing = new THREE.Mesh(
          new THREE.BoxGeometry(stairWidth + 0.4, 0.25, 2.2),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        landing.position.set(0, f * FH, -flightLength - 0.9);
        landing.castShadow = true;
        landing.receiveShadow = true;
        stairGroup.add(landing);

        // 註冊攀爬梯區 (Z 軸向內走梯，方向 -1 表示往 -Z 上升)
        registerStairZone(worldX, worldZ - flightLength * 0.5, stairWidth + 0.6, flightLength + 1.8, baseH, f * FH, f, f + 1, 'z', -1);
      }

      return stairGroup;
    }

    // 4.5 200m 操場及綜合球場（平面圖紅色跑道＋清晰白標線＋足球草坪；司令台保留照片細節）
    function createTrackAndPlatform() { CampusOutdoorWorld.render(scene); }
    createTrackAndPlatform();

    // 4.6 戶外排球場 (位於操場與籃球場之間 x=-22, z=-38，綠色地坪)
    function createVolleyballCourt() {
      const vbGroup = new THREE.Group();
      vbGroup.position.set(-22, 0.04, -38);

      const vbFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 28),
        new THREE.MeshStandardMaterial({ color: 0x7b9555 })
      );
      vbFloor.rotation.x = -Math.PI / 2;
      vbFloor.receiveShadow = true;
      vbGroup.add(vbFloor);

      const vbBorder = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 26),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      );
      vbBorder.rotation.x = -Math.PI / 2;
      vbBorder.position.y = 0.01;
      vbGroup.add(vbBorder);

      // 排球柱與球網
      const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      post1.position.set(-7, 1.6, 0);
      vbGroup.add(post1);
      const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      post2.position.set(7, 1.6, 0);
      vbGroup.add(post2);

      const net = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.2), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
      net.position.set(0, 2.4, 0);
      vbGroup.add(net);

      scene.add(vbGroup);

      ROOMS_DB["volleyball-out"] = {
        id: "volleyball-out",
        code: "OUT-VB",
        name: "戶外排球場",
        buildingId: "court",
        buildingName: "綜合運動設施",
        floor: 1,
        cat: "sports",
        node: "vb-outer"
      };
    }
    createVolleyballCourt();

    // 4.7 戶外籃球場群（依 115 平面圖上下排列；保留照片中的藍色場面與紅色禁區）
    function createBasketballComplex() {
      const courtGroup = new THREE.Group();
      courtGroup.name = "basketball-court-complex";
      courtGroup.position.set(12, 0.04, -38);

      // 1. 外圍與球場緩衝隔離帶：高彩度草綠色 (Lime Green Buffer)
      const greenBuffer = new THREE.Mesh(
        new THREE.PlaneGeometry(34, 46),
        new THREE.MeshStandardMaterial({ color: 0x65a30d })
      );
      greenBuffer.rotation.x = -Math.PI / 2;
      greenBuffer.receiveShadow = true;
      courtGroup.add(greenBuffer);

      // 2. 三面全場籃球場（依平面圖上下排列，長邊左右）
      [-14, 0, 14].forEach(courtZ => {
        // 天藍色主要活動球場面（左右長邊 28m × 上下寬 12.6m）
        const blueFloor = new THREE.Mesh(
          new THREE.PlaneGeometry(28, 12.6),
          new THREE.MeshStandardMaterial({ color: 0x0284c7 })
        );
        blueFloor.userData.mapCourt = true;
        blueFloor.rotation.x = -Math.PI / 2;
        blueFloor.position.set(0, 0.01, courtZ);
        blueFloor.receiveShadow = true;
        courtGroup.add(blueFloor);

        // 磚紅色禁區三秒區 (Terracotta Red Key Areas: 4.8m x 5.8m on both ends)
        [-11.1, 11.1].forEach(keyX => {
          const redKey = new THREE.Mesh(
            new THREE.PlaneGeometry(5.8, 4.8),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          redKey.rotation.x = -Math.PI / 2;
          redKey.position.set(keyX, 0.015, courtZ);
          courtGroup.add(redKey);

          // 禁區罰球半圓弧 (Free-throw circle arc)
          const ftCircle = new THREE.Mesh(
            new THREE.CircleGeometry(1.8, 24),
            new THREE.MeshStandardMaterial({ color: 0xdc2626 })
          );
          ftCircle.rotation.x = -Math.PI / 2;
          ftCircle.position.set(keyX + (keyX < 0 ? 2.9 : -2.9), 0.016, courtZ);
          courtGroup.add(ftCircle);
        });

        // 磚紅色跳球中圈 (Terracotta Red Center Jump Circle: R=1.8m)
        const centerCircle = new THREE.Mesh(
          new THREE.CircleGeometry(1.8, 32),
          new THREE.MeshStandardMaterial({ color: 0xdc2626 })
        );
        centerCircle.rotation.x = -Math.PI / 2;
        centerCircle.position.set(0, 0.015, courtZ);
        courtGroup.add(centerCircle);

        // 白色全場劃線 (Pure White Boundary Lines & Half-court Line)
        const boundaryLine = new THREE.Mesh(
          new THREE.PlaneGeometry(27.8, 12.4),
          new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        );
        boundaryLine.rotation.x = -Math.PI / 2;
        boundaryLine.position.set(0, 0.02, courtZ);
        courtGroup.add(boundaryLine);

        // 中場白線 (Half Court Line)
        const halfLine = new THREE.Mesh(
          new THREE.PlaneGeometry(0.12, 12.4),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        halfLine.rotation.x = -Math.PI / 2;
        halfLine.position.set(0, 0.022, courtZ);
        courtGroup.add(halfLine);
      });

      // 3. 專業標準籃球架 (White Backboards with Red Rims & Steel Posts)
      function createHoop(x, z, rot) {
        const hoop = new THREE.Group();
        hoop.position.set(x, 0, z);
        hoop.rotation.y = rot;

        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.4, 12), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        post.position.y = 2.2;
        hoop.add(post);

        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.4, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        arm.position.set(0, 3.8, 0.5);
        arm.rotation.x = Math.PI / 4;
        hoop.add(arm);

        const board = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.08), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        board.position.set(0, 3.9, 1.0);
        hoop.add(board);

        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 8, 20), new THREE.MeshStandardMaterial({ color: 0xe63946 }));
        rim.position.set(0, 3.6, 1.3);
        rim.rotation.x = Math.PI / 2;
        hoop.add(rim);

        return hoop;
      }

      for (const courtZ of [-14, 0, 14]) {
        courtGroup.add(createHoop(-14.2, courtZ, Math.PI / 2));
        courtGroup.add(createHoop(14.2, courtZ, -Math.PI / 2));
      }

      scene.add(courtGroup);

      ROOMS_DB["court-bb"] = {
        id: "court-bb",
        code: "OUT-BB",
        name: "戶外籃球場群 (三面全場)",
        buildingId: "court",
        buildingName: "綜合運動設施",
        floor: 1,
        cat: "sports",
        node: "bb-gate"
      };
    }
    createBasketballComplex();

    // 4.7.1 北側後山擋土牆與青翠林木護坡 (Back Mountain Terrain & Retaining Wall)
    function createBackMountainBackdrop() {
      const mountainGroup = new THREE.Group();
      mountainGroup.position.set(-30, 0, -85);

      // 混凝土護坡擋土牆 (Retaining Wall along northern boundary)
      const wallGeo = new THREE.BoxGeometry(160, 4.2, 2.0);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.y = 2.1;
      wallMesh.castShadow = true;
      mountainGroup.add(wallMesh);

      // 後山青翠斜坡山巒 (Lush Green Mountain Slopes)
      const hillGeo = new THREE.BoxGeometry(170, 16, 25);
      const hillMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
      const hillMesh = new THREE.Mesh(hillGeo, hillMat);
      hillMesh.position.set(0, 8, -12);
      mountainGroup.add(hillMesh);

      // 山坡茂密樹冠群 (Dense Tree Clusters)
      for (let t = -75; t <= 75; t += 12) {
        const treeCone = new THREE.Mesh(
          new THREE.ConeGeometry(4.2 + Math.random() * 2, 8 + Math.random() * 3, 7),
          new THREE.MeshStandardMaterial({ color: 0x14532d })
        );
        treeCone.position.set(t + (Math.random() - 0.5) * 6, 10 + Math.random() * 4, -8 + (Math.random() - 0.5) * 8);
        mountainGroup.add(treeCone);
      }

      scene.add(mountainGroup);
    }
    // 後山植栽由 art-direction.js 製作，避免原版巨大方塊遮蔽地景。

    // 4.8 蘭亭 & 訓平池 (位於北側圍牆景觀區)
    function createLanPavilion() {
      const gardenGroup = new THREE.Group();
      gardenGroup.position.set(-18, 0, -66);

      // 六角紅柱涼亭 (蘭亭)
      const pavilion = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.0, 8), new THREE.MeshStandardMaterial({ color: 0x991b1b }));
        pillar.position.set(Math.cos(i * Math.PI / 3) * 3.2, 2.0, Math.sin(i * Math.PI / 3) * 3.2);
        pavilion.add(pillar);
      }
      const pRoof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.8, 6), new THREE.MeshStandardMaterial({ color: 0x8e2d2a }));
      pRoof.position.y = 5.2;
      pavilion.add(pRoof);
      gardenGroup.add(pavilion);

      // 訓平池 (荷花睡蓮池 x=16 相對亭位即 x=-2)
      const pool = new THREE.Mesh(
        new THREE.CylinderGeometry(8.5, 8.5, 0.6, 32),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.88, roughness: 0.1 })
      );
      pool.position.set(16, 0.25, 0);
      gardenGroup.add(pool);

      for (let i = 0; i < 7; i++) {
        const pad = new THREE.Mesh(new THREE.CircleGeometry(0.7 + Math.random() * 0.4, 12), new THREE.MeshStandardMaterial({ color: 0x15803d }));
        pad.rotation.x = -Math.PI / 2;
        pad.position.set(16 + (Math.random() - 0.5) * 9, 0.58, (Math.random() - 0.5) * 9);
        gardenGroup.add(pad);
      }

      scene.add(gardenGroup);

      ROOMS_DB["lan-pavilion"] = {
        id: "lan-pavilion",
        code: "OUT-LAN",
        name: "蘭亭與訓平池 (生態池)",
        buildingId: "garden",
        buildingName: "校園景觀生態區",
        floor: 1,
        cat: "special",
        node: "lan-pond-gate"
      };
    }
    createLanPavilion();

    // 4.9 連通風雨走廊 (Breezeways)
    function createBreezeway(x, z, width, depth) {
      const bw = new THREE.Group();
      bw.position.set(x, 0, z);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(width, 0.35, depth), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
      roof.position.y = 4.0;
      roof.castShadow = true;
      bw.add(roof);

      for (let px of [-width / 2 + 0.4, width / 2 - 0.4]) {
        for (let pz of [-depth / 2 + 0.4, depth / 2 - 0.4]) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 4.0, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          col.position.set(px, 2.0, pz);
          col.castShadow = true;
          bw.add(col);
        }
      }
      scene.add(bw);
    }
    createBreezeway(-12, 32, 6, 14); // 行政前後棟中央通道
    createBreezeway(-5, 32, 8, 4);   // 行政棟通往中庭通廊
    createBreezeway(15, 8, 26, 4);   // 九年級與八年級中棟北端橫向通廊
    createBreezeway(15, 52, 26, 4);  // 九年級與八年級中棟南端橫向通廊
    createBreezeway(12, 2, 4, 8);    // 通往健康中心棟通廊

    // 4.10 綜合大樓中庭平面停車場 (Parking Lot P)
    function createMultiBuildingParking() {
      const pLot = new THREE.Mesh(new THREE.PlaneGeometry(24, 15), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      pLot.rotation.x = -Math.PI / 2;
      pLot.position.set(74, 0.03, -23);
      pLot.receiveShadow = true;
      scene.add(pLot);

      ROOMS_DB["parking-lot"] = {
        id: "parking-lot",
        code: "PARK-P",
        name: "綜合大樓平面停車場",
        buildingId: "multi-building",
        buildingName: "綜合大樓設施",
        floor: 1,
        cat: "admin",
        node: "parking-lot"
      };
    }
    createMultiBuildingParking();

    // 4.8 Buildings Construction (中空可進入建築、大樓入口、走廊、樓梯與隔間空教室)
    BUILDINGS_CONFIG.forEach(cfg => {
      collisionBuildingId=cfg.id;
      const bldGroup = new THREE.Group();
      bldGroup.position.set(cfg.x, 0, cfg.z);
      bldGroup.userData.buildingId=cfg.id;
      const totalH = cfg.floors * FH;
      const isHoriz = cfg.width >= cfg.depth;
      const corridorWidth = 2.6;

      // Common architectural materials
      const extWallMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.65 });
      const intWallMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0xd8dee9, roughness: 0.7 });
      const corridorFloorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });
      const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9, side: THREE.DoubleSide });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x3b525b, transparent: true, opacity: 0.78 });
      const chalkboardMat = new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.85 });
      const whiteboardMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const woodTrimMat = new THREE.MeshStandardMaterial({ color: 0xa16207 });
      const canopyMat = new THREE.MeshStandardMaterial({ color: cfg.roofColor || 0x1e3a8a });

      for (let f = 1; f <= cfg.floors; f++) {
        const floorGroup = new THREE.Group();
        floorGroup.name = `floor-${f}`;
        const fBaseY = (f - 1) * FH;
        const fCenterY = (f - 0.5) * FH;
        const fTopY = f * FH;
        const floorRooms = cfg.rooms.filter(r => r.floor === f);

        // A. 地板與天花板 (Floor Slab & Ceiling Slab)
        const slabY = (f === 1) ? 0.08 : fBaseY + 0.1;
        const floorSlab = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width, 0.2, cfg.depth),
          floorMat
        );
        floorSlab.position.set(0, slabY, 0);
        floorSlab.receiveShadow = true;
        floorGroup.add(floorSlab);

        const ceilingSlab = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width, 0.2, cfg.depth),
          ceilingMat
        );
        ceilingSlab.position.set(0, fTopY - 0.1, 0);
        floorGroup.add(ceilingSlab);

        // B. 走廊與隔間教室配置 (Corridor & Empty Classrooms Architecture)
        if (isHoriz) {
          // 橫向大樓 (東西走向，走廊在北側或南側)
          const isNorthCorridor = (cfg.id === "grade8-front");
          const cZ = isNorthCorridor ? (-cfg.depth / 2 + corridorWidth / 2) : (cfg.depth / 2 - corridorWidth / 2);
          const cWallZ = isNorthCorridor ? (-cfg.depth / 2 + corridorWidth) : (cfg.depth / 2 - corridorWidth);
          const outerZ = isNorthCorridor ? -cfg.depth / 2 : cfg.depth / 2;
          const backZ = isNorthCorridor ? cfg.depth / 2 : -cfg.depth / 2;

          // 1. 走廊外側陽台護欄與柱列 (Corridor Veranda Railing & Columns)
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width, 1.1, 0.16),
            new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
          );
          rail.position.set(0, fBaseY + 0.55, outerZ);
          if (f === 1) {
            // 1F 的可通行門口必須與畫面護欄的開口一致。
            const length = (isHoriz ? cfg.width : cfg.depth) / 2 - 2;
            for (const sign of [-1, 1]) {
              const part = new THREE.Mesh(new THREE.BoxGeometry(isHoriz ? length : .16, 1.1, isHoriz ? .16 : length), rail.material);
              part.position.copy(rail.position);
              if (isHoriz) part.position.x = sign * (length / 2 + 2);
              else part.position.z = sign * (length / 2 + 2);
              floorGroup.add(part);
            }
          } else floorGroup.add(rail);

          // 柱列
          const colCount = Math.max(3, Math.round(cfg.width / 7));
          const colStep = cfg.width / colCount;
          for (let c = 0; c <= colCount; c++) {
            const colMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.45, FH, 0.45),
              new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            colMesh.position.set(-cfg.width / 2 + c * colStep, fCenterY, outerZ);
            colMesh.castShadow = true;
            if (f !== 1 || Math.abs(isHoriz ? colMesh.position.x : colMesh.position.z) >= 2) floorGroup.add(colMesh);
          }

          // 走廊外牆碰撞體 (1F 入口處保持開放無碰撞體，其餘護欄與樓層均阻擋穿透)
          if (f === 1) {
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x - 2.0, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);
            registerWallCollider(cfg.x + 2.0, cfg.x + cfg.width / 2, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);

            // 1F 大樓主入口門廊雨遮與金字校名門牌 (Entrance Canopy & Title Sign)
            const canopy = new THREE.Mesh(
              new THREE.BoxGeometry(5.2, 0.35, 3.2),
              canopyMat
            );
            canopy.position.set(0, fBaseY + 3.4, outerZ + (isNorthCorridor ? -1.6 : 1.6));
            canopy.castShadow = true;
            floorGroup.add(canopy);

            [-2.4, 2.4].forEach(px => {
              const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.4, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
              pCol.position.set(px, fBaseY + 1.7, outerZ + (isNorthCorridor ? -2.8 : 2.8));
              pCol.castShadow = true;
              floorGroup.add(pCol);
            });

            // 大樓入口招牌 (Building Title Plate)
            const titleMesh = new THREE.Mesh(
              new THREE.PlaneGeometry(4.0, 0.75),
              new THREE.MeshBasicMaterial({ map: createBuildingTitleTexture(cfg.name), side: THREE.DoubleSide })
            );
            titleMesh.position.set(0, fBaseY + 3.8, outerZ + (isNorthCorridor ? -1.65 : 1.65));
            if (isNorthCorridor) titleMesh.rotation.y = Math.PI;
            floorGroup.add(titleMesh);

            // 行政大樓專屬真實細節 (對應照片 05_行政教學大樓主入口門廊_禮義廉恥與無障礙坡道)
            if (cfg.id === "admin-front") {
              // 「禮義廉恥」黑字石匾
              const lianChiMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(3.6, 0.9),
                new THREE.MeshBasicMaterial({ map: createLiYiLianChiTexture(), side: THREE.DoubleSide })
              );
              lianChiMesh.position.set(0, fBaseY + 2.8, outerZ + 0.15);
              floorGroup.add(lianChiMesh);

              // 紅色 LED 滾動跑馬燈字幕機
              const ledMarquee = new THREE.Mesh(
                new THREE.PlaneGeometry(3.6, 0.38),
                new THREE.MeshBasicMaterial({ map: createLedMarqueeTexture("大溪國中行政大樓 ★ 勤學、勵志、熱情、感恩"), side: THREE.DoubleSide })
              );
              ledMarquee.position.set(0, fBaseY + 2.2, outerZ + 0.16);
              floorGroup.add(ledMarquee);

              // 右側不鏽鋼無障礙坡道雙層扶手 (Stainless Ramp Railing)
              const rampRail = new THREE.Mesh(
                new THREE.BoxGeometry(0.08, 0.9, 3.2),
                new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 })
              );
              rampRail.position.set(2.4, fBaseY + 0.45, outerZ + 1.6);
              floorGroup.add(rampRail);

              // 門廊古典石雕花缽 (Classical Stone Flower Urns flanking entrance)
              [-2.8, 2.8].forEach(ux => {
                const urn = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.25, 0.9, 12), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
                urn.position.set(ux, fBaseY + 0.45, outerZ + 1.2);
                const flower = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
                flower.position.set(ux, fBaseY + 1.0, outerZ + 1.2);
                floorGroup.add(urn);
                floorGroup.add(flower);
              });
            }
          } else {
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + outerZ - 0.25, cfg.z + outerZ + 0.25, fBaseY, fTopY);
          }

          // 2. 背面外牆與窗戶 (Back Exterior Wall & Windows)
          const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width, FH, 0.3),
            extWallMat
          );
          backWall.position.set(0, fCenterY, backZ);
          floorGroup.add(backWall);

          const backWindow = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width - 1.2, 1.4, 0.35),
            glassMat
          );
          backWindow.position.set(0, fCenterY + 0.2, backZ);
          floorGroup.add(backWindow);
          registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + backZ - 0.25, cfg.z + backZ + 0.25, fBaseY, fTopY);

          // 3. 東西兩端外側側牆 (West & East End Exterior Walls)
          [-cfg.width / 2, cfg.width / 2].forEach(wx => {
            const endWall = new THREE.Mesh(
              new THREE.BoxGeometry(0.3, FH, cfg.depth),
              extWallMat
            );
            endWall.position.set(wx, fCenterY, 0);
            floorGroup.add(endWall);
            registerWallCollider(cfg.x + wx - 0.25, cfg.x + wx + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);
          });

          // 4. 隔間教室與內走廊隔間牆 (Partitions & Classrooms)
          const usableMinX = -cfg.width / 2 + 1.2;
          const usableMaxX = cfg.width / 2 - 1.2;
          const usableW = usableMaxX - usableMinX;

          if (floorRooms.length > 0) {
            const roomW = usableW / floorRooms.length;
            for (let i = 0; i < floorRooms.length; i++) {
              const rMinX = usableMinX + i * roomW;
              const rMaxX = usableMinX + (i + 1) * roomW;
              const rCenterX = (rMinX + rMaxX) / 2;
              const room = floorRooms[i];

              // 門兩側之內走廊隔間牆 (Wall segments beside classroom door)
              const seg1W = Math.max(0.2, (rCenterX - 0.9) - rMinX);
              const seg1Mesh = new THREE.Mesh(new THREE.BoxGeometry(seg1W, FH, 0.2), intWallMat);
              seg1Mesh.position.set(rMinX + seg1W / 2, fCenterY, cWallZ);
              floorGroup.add(seg1Mesh);
              registerWallCollider(cfg.x + rMinX, cfg.x + rCenterX - 0.9, cfg.z + cWallZ - 0.2, cfg.z + cWallZ + 0.2, fBaseY, fTopY);

              const seg2W = Math.max(0.2, rMaxX - (rCenterX + 0.9));
              const seg2Mesh = new THREE.Mesh(new THREE.BoxGeometry(seg2W, FH, 0.2), intWallMat);
              seg2Mesh.position.set(rMaxX - seg2W / 2, fCenterY, cWallZ);
              floorGroup.add(seg2Mesh);
              registerWallCollider(cfg.x + rCenterX + 0.9, cfg.x + rMaxX, cfg.z + cWallZ - 0.2, cfg.z + cWallZ + 0.2, fBaseY, fTopY);

              // 門眉過樑 (Door Lintel above 2.4m door)
              const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.8, FH - 2.4, 0.2), intWallMat);
              lintel.position.set(rCenterX, fBaseY + 2.4 + (FH - 2.4) / 2, cWallZ);
              floorGroup.add(lintel);

              // 門牌 (3D Room Nameplate)
              const nameplate = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 0.38),
                new THREE.MeshBasicMaterial({ map: createRoomNameplateTexture(room.name, (room.cat === "admin" ? "#991b1b" : "#1e3a8a")), side: THREE.DoubleSide })
              );
              nameplate.position.set(rCenterX, fBaseY + 2.65, cWallZ + (isNorthCorridor ? -0.12 : 0.12));
              if (isNorthCorridor) nameplate.rotation.y = Math.PI;
              floorGroup.add(nameplate);

              // 隔間牆 (Divider Wall between adjacent rooms)
              if (i > 0) {
                const divDepth = Math.abs(backZ - cWallZ);
                const divMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, divDepth), intWallMat);
                divMesh.position.set(rMinX, fCenterY, (backZ + cWallZ) / 2);
                floorGroup.add(divMesh);
                registerWallCollider(cfg.x + rMinX - 0.2, cfg.x + rMinX + 0.2, cfg.z + Math.min(backZ, cWallZ), cfg.z + Math.max(backZ, cWallZ), fBaseY, fTopY);
              }

              // 空教室內部細節：照片實況「下層粉天藍色護壁板、上層白牆」雙色粉刷
              const wainscotMesh = new THREE.Mesh(
                new THREE.BoxGeometry(roomW - 0.2, 1.3, 0.04),
                new THREE.MeshStandardMaterial({ color: 0x7dd3fc }) // 教室專屬天藍色踢腳護壁
              );
              wainscotMesh.position.set(rCenterX, fBaseY + 0.65, isNorthCorridor ? (cWallZ + 0.78) : (cWallZ - 0.78));
              floorGroup.add(wainscotMesh);

              // 空教室內部細節：滑動大黑板 / 白板 (Chalkboard with Chalk Tray)
              const boardW = Math.min(3.4, roomW - 1.2);
              const isOffice = (room.cat === "admin");
              const boardMesh = new THREE.Mesh(
                new THREE.BoxGeometry(boardW, 1.4, 0.06),
                isOffice ? whiteboardMat : chalkboardMat
              );
              boardMesh.position.set(rCenterX, fBaseY + 1.8, isNorthCorridor ? (cWallZ + 0.8) : (cWallZ - 0.8));
              floorGroup.add(boardMesh);

              const trim = new THREE.Mesh(new THREE.BoxGeometry(boardW + 0.1, 1.5, 0.04), woodTrimMat);
              trim.position.copy(boardMesh.position);
              trim.position.z += isNorthCorridor ? -0.02 : 0.02;
              floorGroup.add(trim);

              // 講桌 (Teacher's Wooden Podium Desk)
              const podium = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.7), woodTrimMat);
              podium.position.set(rCenterX, fBaseY + 0.45, isNorthCorridor ? (cWallZ + 1.8) : (cWallZ - 1.8));
              floorGroup.add(podium);

              // 天花板柔和照明燈盤 (Ceiling Light Panel)
              const lightPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(2.0, 1.0),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
              );
              lightPanel.rotation.x = Math.PI / 2;
              lightPanel.position.set(rCenterX, fTopY - 0.12, (backZ + cWallZ) / 2);
              floorGroup.add(lightPanel);
            }
          }
        } else {
          // 直立縱向大樓 (南北走向，如九年級棟、八年級中棟、藝術館、活動中心)
          const isEastCorridor = (cfg.id === "grade9-back");
          const cX = isEastCorridor ? (cfg.width / 2 - corridorWidth / 2) : (-cfg.width / 2 + corridorWidth / 2);
          const cWallX = isEastCorridor ? (cfg.width / 2 - corridorWidth) : (-cfg.width / 2 + corridorWidth);
          const outerX = isEastCorridor ? cfg.width / 2 : -cfg.width / 2;
          const backX = isEastCorridor ? -cfg.width / 2 : cfg.width / 2;

          // 走廊護欄與柱列
          const rail = new THREE.Mesh(
            new THREE.BoxGeometry(0.16, 1.1, cfg.depth),
            new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
          );
          rail.position.set(outerX, fBaseY + 0.55, 0);
          if (f === 1) {
            // 1F 的可通行門口必須與畫面護欄的開口一致。
            const length = (isHoriz ? cfg.width : cfg.depth) / 2 - 2;
            for (const sign of [-1, 1]) {
              const part = new THREE.Mesh(new THREE.BoxGeometry(isHoriz ? length : .16, 1.1, isHoriz ? .16 : length), rail.material);
              part.position.copy(rail.position);
              if (isHoriz) part.position.x = sign * (length / 2 + 2);
              else part.position.z = sign * (length / 2 + 2);
              floorGroup.add(part);
            }
          } else floorGroup.add(rail);

          const colCount = Math.max(3, Math.round(cfg.depth / 7));
          const colStep = cfg.depth / colCount;
          for (let c = 0; c <= colCount; c++) {
            const colMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.45, FH, 0.45),
              new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            colMesh.position.set(outerX, fCenterY, -cfg.depth / 2 + c * colStep);
            colMesh.castShadow = true;
            if (f !== 1 || Math.abs(isHoriz ? colMesh.position.x : colMesh.position.z) >= 2) floorGroup.add(colMesh);
          }

          // 外側碰撞體 (1F 入口處保持開放)
          if (f === 1) {
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z - cfg.depth / 2, cfg.z - 2.0, fBaseY, fTopY);
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z + 2.0, cfg.z + cfg.depth / 2, fBaseY, fTopY);

            // 大樓入口雨遮與標誌
            const canopy = new THREE.Mesh(
              new THREE.BoxGeometry(3.2, 0.35, 5.2),
              canopyMat
            );
            canopy.position.set(outerX + (isEastCorridor ? 1.6 : -1.6), fBaseY + 3.4, 0);
            canopy.castShadow = true;
            floorGroup.add(canopy);

            const titleMesh = new THREE.Mesh(
              new THREE.PlaneGeometry(4.0, 0.75),
              new THREE.MeshBasicMaterial({ map: createBuildingTitleTexture(cfg.name), side: THREE.DoubleSide })
            );
            titleMesh.position.set(outerX + (isEastCorridor ? 1.65 : -1.65), fBaseY + 3.8, 0);
            titleMesh.rotation.y = isEastCorridor ? Math.PI / 2 : -Math.PI / 2;
            floorGroup.add(titleMesh);
          } else {
            registerWallCollider(cfg.x + outerX - 0.25, cfg.x + outerX + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);
          }

          // 背面外牆與南北兩端外牆
          const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, FH, cfg.depth), extWallMat);
          backWall.position.set(backX, fCenterY, 0);
          floorGroup.add(backWall);
          registerWallCollider(cfg.x + backX - 0.25, cfg.x + backX + 0.25, cfg.z - cfg.depth / 2, cfg.z + cfg.depth / 2, fBaseY, fTopY);

          [-cfg.depth / 2, cfg.depth / 2].forEach(ez => {
            const endWall = new THREE.Mesh(new THREE.BoxGeometry(cfg.width, FH, 0.3), extWallMat);
            endWall.position.set(0, fCenterY, ez);
            floorGroup.add(endWall);
            registerWallCollider(cfg.x - cfg.width / 2, cfg.x + cfg.width / 2, cfg.z + ez - 0.25, cfg.z + ez + 0.25, fBaseY, fTopY);
          });

          // 隔間教室 (縱向分割)
          const usableMinZ = -cfg.depth / 2 + 1.2;
          const usableMaxZ = cfg.depth / 2 - 1.2;
          const usableD = usableMaxZ - usableMinZ;

          if (floorRooms.length > 0) {
            const roomD = usableD / floorRooms.length;
            for (let i = 0; i < floorRooms.length; i++) {
              const rMinZ = usableMinZ + i * roomD;
              const rMaxZ = usableMinZ + (i + 1) * roomD;
              const rCenterZ = (rMinZ + rMaxZ) / 2;
              const room = floorRooms[i];

              // 門兩側隔間牆
              const seg1D = Math.max(0.2, (rCenterZ - 0.9) - rMinZ);
              const seg1Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, seg1D), intWallMat);
              seg1Mesh.position.set(cWallX, fCenterY, rMinZ + seg1D / 2);
              floorGroup.add(seg1Mesh);
              registerWallCollider(cfg.x + cWallX - 0.2, cfg.x + cWallX + 0.2, cfg.z + rMinZ, cfg.z + rCenterZ - 0.9, fBaseY, fTopY);

              const seg2D = Math.max(0.2, rMaxZ - (rCenterZ + 0.9));
              const seg2Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH, seg2D), intWallMat);
              seg2Mesh.position.set(cWallX, fCenterY, rMaxZ - seg2D / 2);
              floorGroup.add(seg2Mesh);
              registerWallCollider(cfg.x + cWallX - 0.2, cfg.x + cWallX + 0.2, cfg.z + rCenterZ + 0.9, cfg.z + rMaxZ, fBaseY, fTopY);

              // 門眉過樑
              const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.2, FH - 2.4, 1.8), intWallMat);
              lintel.position.set(cWallX, fBaseY + 2.4 + (FH - 2.4) / 2, rCenterZ);
              floorGroup.add(lintel);

              // 門牌
              const nameplate = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 0.38),
                new THREE.MeshBasicMaterial({ map: createRoomNameplateTexture(room.name, (room.cat === "admin" ? "#991b1b" : "#1e3a8a")), side: THREE.DoubleSide })
              );
              nameplate.position.set(cWallX + (isEastCorridor ? 0.12 : -0.12), fBaseY + 2.65, rCenterZ);
              nameplate.rotation.y = isEastCorridor ? -Math.PI / 2 : Math.PI / 2;
              floorGroup.add(nameplate);

              // 橫向隔間牆
              if (i > 0) {
                const divW = Math.abs(backX - cWallX);
                const divMesh = new THREE.Mesh(new THREE.BoxGeometry(divW, FH, 0.2), intWallMat);
                divMesh.position.set((backX + cWallX) / 2, fCenterY, rMinZ);
                floorGroup.add(divMesh);
                registerWallCollider(cfg.x + Math.min(backX, cWallX), cfg.x + Math.max(backX, cWallX), cfg.z + rMinZ - 0.2, cfg.z + rMinZ + 0.2, fBaseY, fTopY);
              }

              // 空教室黑板
              const boardD = Math.min(3.4, roomD - 1.2);
              const boardMesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.06, 1.4, boardD),
                chalkboardMat
              );
              boardMesh.position.set(isEastCorridor ? (cWallX - 0.8) : (cWallX + 0.8), fBaseY + 1.8, rCenterZ);
              floorGroup.add(boardMesh);

              // 天花板照明
              const lightPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(1.0, 2.0),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
              );
              lightPanel.rotation.x = Math.PI / 2;
              lightPanel.position.set((backX + cWallX) / 2, fTopY - 0.12, rCenterZ);
              floorGroup.add(lightPanel);
            }
          }
        }

        floorGroup.userData = { buildingId: cfg.id, floorNum: f };
        bldGroup.add(floorGroup);
        floorMeshes.push(floorGroup);
      }

      // 4.9 樓梯間 (Staircases connected to corridors)
      if (cfg.stairs) {
        cfg.stairs.forEach(st => {
          const stMesh = create3DStaircaseMesh(st.x - cfg.x, st.z - cfg.z, st.floors, cfg.x, cfg.z);
          stMesh.userData.oldStairs=true;
          bldGroup.add(stMesh);
        });
      }

      // 4.10 體育館特徵 (依據照片 LINE_ALBUM_3D_261007_58 真實重現：粉橘磁磚＋三層白色弧形格窗塔樓＋太陽能板光電陣列＋中英文大字立體招牌)
      if (cfg.isGymSpecial) {
        // 雙圓柱樓梯塔樓 (Twin Cylindrical Stair Towers)
        [-14, 14].forEach(offsetZ => {
          const tower = new THREE.Mesh(
            new THREE.CylinderGeometry(4.6, 4.6, totalH + 1.8, 32),
            new THREE.MeshStandardMaterial({ color: 0xe89286 }) // 照片真實現況：粉橘紅細磁磚
          );
          tower.position.set(cfg.width / 2 - 1, (totalH + 1.8) / 2, offsetZ);
          tower.castShadow = true;
          bldGroup.add(tower);

          // 圓柱塔身 3 層樓環狀多格白色玻璃窗 (Multi-Pane Curved Panoramic Windows)
          for (let floorIdx = 1; floorIdx <= 3; floorIdx++) {
            const winBand = new THREE.Mesh(
              new THREE.CylinderGeometry(4.65, 4.65, 1.6, 32, 1, false, -Math.PI / 2, Math.PI),
              new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
            );
            winBand.position.set(cfg.width / 2 - 1, (floorIdx - 0.5) * FH, offsetZ);
            bldGroup.add(winBand);
          }

          // 塔樓底座半圓形不鏽鋼防護欄杆
          const baseRail = new THREE.Mesh(
            new THREE.CylinderGeometry(4.9, 4.9, 1.1, 24, 1, true, -Math.PI / 2, Math.PI),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1, side: THREE.DoubleSide })
          );
          baseRail.position.set(cfg.width / 2 - 1, 0.55, offsetZ);
          bldGroup.add(baseRail);
        });

        // 正門上方中英文立體招牌：「學生活動中心 / Student Activity Center」
        const gymSign = new THREE.Mesh(
          new THREE.PlaneGeometry(16, 4.0),
          new THREE.MeshBasicMaterial({ map: createGymSignTexture(), transparent: true, side: THREE.DoubleSide })
        );
        gymSign.position.set(cfg.width / 2 + 0.15, totalH - 1.2, 0);
        gymSign.rotation.y = Math.PI / 2;
        bldGroup.add(gymSign);

        // 1F 大門白色多格落地玻璃門 (White Multi-Pane Entrance Glass Doors)
        const doorMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(14, 3.2),
          new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, side: THREE.DoubleSide })
        );
        doorMesh.position.set(cfg.width / 2 + 0.1, 1.6, 0);
        doorMesh.rotation.y = Math.PI / 2;
        bldGroup.add(doorMesh);

        // 屋頂太陽能光電板陣列 (Rooftop Photovoltaic Solar Panel Arrays - 綠能校園特色)
        const solarGroup = new THREE.Group();
        solarGroup.position.set(0, totalH + 0.8, 0);
        const solarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 });

        for (let row = -10; row <= 10; row += 6) {
          const solarRow = new THREE.Mesh(
            new THREE.BoxGeometry(cfg.width - 6, 0.15, 3.8),
            solarMat
          );
          solarRow.position.set(0, 0, row);
          solarRow.rotation.x = -0.32; // 傾斜朝南吸收日照
          solarRow.castShadow = true;
          solarGroup.add(solarRow);
        }
        solarGroup.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(solarGroup);
        bldGroup.add(solarGroup);
      }

      // 八年級南橫棟西側半圓弧樓梯塔 (平面圖特徵)
      if (cfg.id === "grade8-front") {
        const roundTower = new THREE.Mesh(
          new THREE.CylinderGeometry(5.2, 5.2, totalH, 24, 1, false, Math.PI / 2, Math.PI),
          new THREE.MeshStandardMaterial({ color: cfg.color })
        );
        roundTower.position.set(-cfg.width / 2, totalH / 2, 0);
        roundTower.castShadow = true;
        bldGroup.add(roundTower);
      }

      // 屋頂 (Pitched Roof or Flat Roof)
      if (cfg.hasPitchedRoof) {
        const roofShape = new THREE.Shape();
        roofShape.moveTo(-cfg.depth / 2 - 0.8, 0);
        roofShape.lineTo(0, 3.6);
        roofShape.lineTo(cfg.depth / 2 + 0.8, 0);
        roofShape.closePath();
        const pRoof = new THREE.Mesh(
          new THREE.ExtrudeGeometry(roofShape, { depth: cfg.width + 1.6, bevelEnabled: false }),
          new THREE.MeshStandardMaterial({ color: cfg.roofColor })
        );
        pRoof.position.set(-cfg.width / 2 - 0.8, totalH + 0.1, 0);
        pRoof.rotation.y = Math.PI / 2;

        // 縱向棟屋脊沿長邊，水平棟 extrusion 起點由西側開始。
        if(!isHoriz){
          const section=new THREE.Shape();
          section.moveTo(-cfg.width/2-.8,0);section.lineTo(0,2.4);section.lineTo(cfg.width/2+.8,0);section.closePath();
          pRoof.geometry.dispose();
          pRoof.geometry=new THREE.ExtrudeGeometry(section,{depth:cfg.depth+1.6,bevelEnabled:false});
          pRoof.rotation.y=0;pRoof.position.set(0,totalH+.1,-cfg.depth/2-.8);
        }
        pRoof.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(pRoof);
        pRoof.castShadow = true;
        bldGroup.add(pRoof);
      } else {
        const roofMesh = new THREE.Mesh(
          new THREE.BoxGeometry(cfg.width + 0.8, 0.8, cfg.depth + 0.8),
          new THREE.MeshStandardMaterial({ color: cfg.roofColor })
        );
        roofMesh.position.y = totalH + 0.4;
        roofMesh.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};
        floorMeshes.push(roofMesh);
        roofMesh.castShadow = true;
        bldGroup.add(roofMesh);
      }

      scene.add(bldGroup);
      collisionBuildingId=null;

      cfg.rooms.forEach(r => {
        const roomObj = {
          id: r.id,
          code: r.code || r.id,
          name: r.name,
          buildingId: cfg.id,
          buildingName: cfg.name,
          floor: r.floor,
          cat: r.cat || cfg.category || "academic",
          node: r.node
        };
        ROOMS_DB[r.id] = roomObj;

        const badgeDiv = document.createElement("div");
        badgeDiv.className = "room-badge";
        const catColor = CATEGORY_COLORS[roomObj.cat] || "#2563eb";
        badgeDiv.innerHTML = `
          <span class="rb-tag" style="background:${catColor};">${r.floor}F</span>
          <span>${r.name.replace(/\s*\(\d+F\)/, '')}</span>
        `;
        badgeDiv.onclick = (e) => {
          e.stopPropagation();
          navigateToRoom(r.id);
        };
        labelsContainer.appendChild(badgeDiv);

        roomBadgeElements.push({
          element: badgeDiv,
          buildingId: cfg.id,
          floor: r.floor,
          nodeId: r.node
        });
      });

      const labelDiv = document.createElement("div");
      labelDiv.className = "building-label";
      labelDiv.textContent = cfg.name;
      labelDiv.onclick = () => focusBuilding(cfg);
      labelsContainer.appendChild(labelDiv);

      labelElements.push({
        element: labelDiv,
        buildingId: cfg.id,
        worldPos: new THREE.Vector3(cfg.x, totalH + 3.6, cfg.z)
      });
    });

    // 4.3 Ground Landmark Pills (操場, 司令台, 排球場, 籃球場, 蘭亭, 校大門, 警衛室, 停車場等)
    const LANDMARKS = [
      { name: "操場及綜合球場", x: -84, y: 1.8, z: -25 },
      { name: "司令台", x: -62, y: 3.5, z: 12 },
      { name: "蔣公銅像", x: -36, y: 2.5, z: 32 },
      { name: "戶外排球場", x: -22, y: 1.8, z: -38 },
      { name: "籃球場群", x: 12, y: 1.8, z: -38 },
      { name: "蘭亭訓平池", x: -18, y: 2.2, z: -66 },
      { name: "校大門", x: -10, y: 3.5, z: 86 },
      { name: "警衛室", x: 6, y: 3.2, z: 86 },
      { name: "學生活動中心", x: -80, y: 6.0, z: 58 },
      { name: "行政大樓", x: -12, y: 6.0, z: 32 },
      { name: "八年級棟 (南棟)", x: 16, y: 6.0, z: 60 },
      { name: "九年級棟 (縱向)", x: 7.5, y: 6.0, z: 28 },
      { name: "八年級中棟 (縱向)", x: 28, y: 6.0, z: 28 },
      { name: "健康中心棟", x: 12, y: 4.5, z: -4 },
      { name: "七年級新大樓", x: 80, y: 6.0, z: -58 },
      { name: "綜合大樓/圖書館", x: 74, y: 4.5, z: -23 },
      { name: "科技館", x: 74, y: 4.5, z: 12 },
      { name: "藝術館", x: 74, y: 8.0, z: 46 }
    ];
    const landmarkElements = [];

    LANDMARKS.filter(lm=>!['學生活動中心','行政大樓','八年級棟 (南棟)','九年級棟 (縱向)','八年級中棟 (縱向)','健康中心棟','七年級新大樓','綜合大樓/圖書館','科技館','藝術館'].includes(lm.name)).forEach(lm => {
      const pill = document.createElement("div");
      pill.className = "landmark-pill";
      pill.textContent = lm.name;
      pill.title = `點擊聚焦：${lm.name}`;
      pill.onclick = () => {
        const targetPos = new THREE.Vector3(lm.x, lm.y, lm.z);
        const camPos = targetPos.clone().add(new THREE.Vector3(15, 25, 30));
        animateCameraTo(camPos, targetPos);
        showToast(`聚焦地標：${lm.name}`);
      };
      labelsContainer.appendChild(pill);
      landmarkElements.push({
        element: pill,
        worldPos: new THREE.Vector3(lm.x, lm.y, lm.z)
      });
    });

    /* ==========================================================================
       5. A* NAVIGATION GRAPH & WAYPOINTS
       ========================================================================== */
    const NAV_NODES = {
  // 1. 正門、迎賓廣場、銅像
  "gate": { id: "gate", x: -10, y: 0, z: 86, neighbors: ["gate-guard", "plaza-center", "driveway-s1"] },
  "gate-guard": { id: "gate-guard", x: 6, y: 0, z: 86, neighbors: ["gate", "plaza-center", "driveway-s1"] },
  "plaza-center": { id: "plaza-center", x: -10, y: 0, z: 72, neighbors: ["gate", "gate-guard", "statue-node", "admin-f-porch", "g8f-porch"] },
  "statue-node": { id: "statue-node", x: -36, y: 0, z: 32, neighbors: ["plaza-center", "gym-path-1", "admin-f-porch", "stand-front"] },

  // 2. 西側：學生活動中心 & 資源回收室
  "gym-path-1": { id: "gym-path-1", x: -60, y: 0, z: 58, neighbors: ["statue-node", "gym-1f-hall", "gym-fire-1f", "gym-stair-s-1f", "recycle-path"] },
  "gym-1f-hall": { id: "gym-1f-hall", x: -80, y: 0, z: 58, neighbors: ["gym-path-1"] },
  "gym-fire-1f": { id: "gym-fire-1f", x: -66, y: 0, z: 72, neighbors: ["gym-path-1"] },
  "gym-stair-s-1f": { id: "gym-stair-s-1f", x: -65, y: 0, z: 46, neighbors: ["gym-path-1", "gym-stair-s-mid1"] },
  "gym-stair-s-mid1": { id: "gym-stair-s-mid1", x: -65, y: 1.8, z: 46, neighbors: ["gym-stair-s-1f", "gym-stair-s-2f"] },
  "gym-stair-s-2f": { id: "gym-stair-s-2f", x: -65, y: 3.6, z: 46, neighbors: ["gym-stair-s-mid1", "gym-stair-s-mid2"] },
  "gym-stair-s-mid2": { id: "gym-stair-s-mid2", x: -65, y: 5.4, z: 46, neighbors: ["gym-stair-s-2f", "gym-stair-s-3f"] },
  "gym-stair-s-3f": { id: "gym-stair-s-3f", x: -65, y: 7.2, z: 46, neighbors: ["gym-stair-s-mid2"] },

  "recycle-path": { id: "recycle-path", x: -95, y: 0, z: 58, neighbors: ["gym-path-1", "recycle-1f"] },
  "recycle-1f": { id: "recycle-1f", x: -106, y: 0, z: 58, neighbors: ["recycle-path"] },

  // 3. 操場、司令台、排球場、蘭亭訓平池
  "stand-front": { id: "stand-front", x: -62, y: 0, z: 18, neighbors: ["statue-node", "stand-podium", "track-center", "vb-outer"] },
  "stand-podium": { id: "stand-podium", x: -62, y: 1.8, z: 12, neighbors: ["stand-front"] },
  "track-center": { id: "track-center", x: -84, y: 0, z: -25, neighbors: ["stand-front", "vb-inner"] },
  "vb-inner": { id: "vb-inner", x: -65, y: 0, z: -25, neighbors: ["track-center", "vb-outer"] },
  "vb-outer": { id: "vb-outer", x: -22, y: 0, z: -38, neighbors: ["stand-front", "vb-inner", "bb-gate", "lan-pond-gate"] },
  "bb-gate": { id: "bb-gate", x: 12, y: 0, z: -38, neighbors: ["vb-outer", "lan-pond-gate", "driveway-n1", "health-porch"] },
  "lan-pond-gate": { id: "lan-pond-gate", x: -18, y: 0, z: -66, neighbors: ["vb-outer", "bb-gate"] },

  // 4. 行政大樓 (前棟與後棟)
  "admin-f-porch": { id: "admin-f-porch", x: -12, y: 0, z: 50, neighbors: ["plaza-center", "statue-node", "admin-f-1f-w", "admin-f-1f-e", "admin-f-stair-1f", "admin-bridge"] },
  "admin-f-1f-w": { id: "admin-f-1f-w", x: -18, y: 0, z: 44, neighbors: ["admin-f-porch"] },
  "admin-f-1f-e": { id: "admin-f-1f-e", x: -6, y: 0, z: 44, neighbors: ["admin-f-porch"] },
  "admin-f-stair-1f": { id: "admin-f-stair-1f", x: -22, y: 0, z: 44, neighbors: ["admin-f-porch", "admin-f-stair-mid1"] },
  "admin-f-stair-mid1": { id: "admin-f-stair-mid1", x: -22, y: 1.8, z: 44, neighbors: ["admin-f-stair-1f", "admin-f-stair-2f"] },
  "admin-f-stair-2f": { id: "admin-f-stair-2f", x: -22, y: 3.6, z: 44, neighbors: ["admin-f-stair-mid1", "admin-f-2f-w", "admin-f-stair-mid2"] },
  "admin-f-2f-w": { id: "admin-f-2f-w", x: -18, y: 3.6, z: 44, neighbors: ["admin-f-stair-2f", "admin-f-2f-c"] },
  "admin-f-2f-c": { id: "admin-f-2f-c", x: -12, y: 3.6, z: 44, neighbors: ["admin-f-2f-w", "admin-f-2f-e"] },
  "admin-f-2f-e": { id: "admin-f-2f-e", x: -6, y: 3.6, z: 44, neighbors: ["admin-f-2f-c"] },
  "admin-f-stair-mid2": { id: "admin-f-stair-mid2", x: -22, y: 5.4, z: 44, neighbors: ["admin-f-stair-2f", "admin-f-stair-3f"] },
  "admin-f-stair-3f": { id: "admin-f-stair-3f", x: -22, y: 7.2, z: 44, neighbors: ["admin-f-stair-mid2", "admin-f-3f-w"] },
  "admin-f-3f-w": { id: "admin-f-3f-w", x: -18, y: 7.2, z: 44, neighbors: ["admin-f-stair-3f", "admin-f-3f-e"] },
  "admin-f-3f-e": { id: "admin-f-3f-e", x: -6, y: 7.2, z: 44, neighbors: ["admin-f-3f-w"] },

  "admin-bridge": { id: "admin-bridge", x: -12, y: 0, z: 32, neighbors: ["admin-f-porch", "admin-b-porch", "breezeway-west"] },

  "admin-b-porch": { id: "admin-b-porch", x: -12, y: 0, z: 14, neighbors: ["admin-bridge", "admin-b-1f-w", "admin-b-1f-c", "admin-b-1f-e", "admin-b-stair-1f"] },
  "admin-b-1f-w": { id: "admin-b-1f-w", x: -18, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-1f-c": { id: "admin-b-1f-c", x: -12, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-1f-e": { id: "admin-b-1f-e", x: -6, y: 0, z: 20, neighbors: ["admin-b-porch"] },
  "admin-b-stair-1f": { id: "admin-b-stair-1f", x: -22, y: 0, z: 20, neighbors: ["admin-b-porch", "admin-b-stair-mid1"] },
  "admin-b-stair-mid1": { id: "admin-b-stair-mid1", x: -22, y: 1.8, z: 20, neighbors: ["admin-b-stair-1f", "admin-b-stair-2f"] },
  "admin-b-stair-2f": { id: "admin-b-stair-2f", x: -22, y: 3.6, z: 20, neighbors: ["admin-b-stair-mid1", "admin-b-2f-w", "admin-b-stair-mid2"] },
  "admin-b-2f-w": { id: "admin-b-2f-w", x: -14, y: 3.6, z: 20, neighbors: ["admin-b-stair-2f", "admin-b-2f-e"] },
  "admin-b-2f-e": { id: "admin-b-2f-e", x: -6, y: 3.6, z: 20, neighbors: ["admin-b-2f-w"] },
  "admin-b-stair-mid2": { id: "admin-b-stair-mid2", x: -22, y: 5.4, z: 20, neighbors: ["admin-b-stair-2f", "admin-b-stair-3f"] },
  "admin-b-stair-3f": { id: "admin-b-stair-3f", x: -22, y: 7.2, z: 20, neighbors: ["admin-b-stair-mid2", "admin-b-3f-w"] },
  "admin-b-3f-w": { id: "admin-b-3f-w", x: -16, y: 7.2, z: 20, neighbors: ["admin-b-stair-3f", "admin-b-3f-e"] },
  "admin-b-3f-e": { id: "admin-b-3f-e", x: -6, y: 7.2, z: 20, neighbors: ["admin-b-3f-w"] },

  // 5. 通廊 (Breezeways) 與中央庭園
  "breezeway-west": { id: "breezeway-west", x: -5, y: 0, z: 32, neighbors: ["admin-bridge", "g9-porch-s", "g9-porch-n"] },
  "breezeway-mid": { id: "breezeway-mid", x: 15, y: 0, z: 28, neighbors: ["g9-porch-s", "g8m-porch-s", "g9-porch-n", "g8m-porch-n"] },
  "breezeway-north": { id: "breezeway-north", x: 15, y: 0, z: 6, neighbors: ["health-porch", "g9-porch-n", "g8m-porch-n", "bb-gate"] },

  // 6. 健康中心棟 (北橫棟)
  "health-porch": { id: "health-porch", x: 12, y: 0, z: 2, neighbors: ["breezeway-north", "bb-gate", "health-1f-w", "health-1f-e", "health-stair-1f"] },
  "health-1f-w": { id: "health-1f-w", x: 6, y: 0, z: -4, neighbors: ["health-porch"] },
  "health-1f-e": { id: "health-1f-e", x: 18, y: 0, z: -4, neighbors: ["health-porch"] },
  "health-stair-1f": { id: "health-stair-1f", x: 0, y: 0, z: -4, neighbors: ["health-porch", "health-stair-mid"] },
  "health-stair-mid": { id: "health-stair-mid", x: 0, y: 1.8, z: -4, neighbors: ["health-stair-1f", "health-2f-w"] },
  "health-2f-w": { id: "health-2f-w", x: 6, y: 3.6, z: -4, neighbors: ["health-stair-mid", "health-2f-e"] },
  "health-2f-e": { id: "health-2f-e", x: 18, y: 3.6, z: -4, neighbors: ["health-2f-w"] },

  // 7. 八年級南棟 (南橫棟 / 幼兒園)
  "g8f-porch": { id: "g8f-porch", x: 16, y: 0, z: 53, neighbors: ["plaza-center", "g9-porch-s", "g8m-porch-s", "g8f-1f-k", "g8f-stair-w-1f"] },
  "g8f-1f-k": { id: "g8f-1f-k", x: 16, y: 0, z: 60, neighbors: ["g8f-porch"] },
  "g8f-stair-w-1f": { id: "g8f-stair-w-1f", x: -6, y: 0, z: 60, neighbors: ["g8f-porch", "g8f-stair-w-mid1"] },
  "g8f-stair-w-mid1": { id: "g8f-stair-w-mid1", x: -6, y: 1.8, z: 60, neighbors: ["g8f-stair-w-1f", "g8f-stair-w-2f"] },
  "g8f-stair-w-2f": { id: "g8f-stair-w-2f", x: -6, y: 3.6, z: 60, neighbors: ["g8f-stair-w-mid1", "g8f-2f-807", "g8f-stair-w-mid2"] },
  "g8f-2f-807": { id: "g8f-2f-807", x: 6, y: 3.6, z: 60, neighbors: ["g8f-stair-w-2f", "g8f-2f-801"] },
  "g8f-2f-801": { id: "g8f-2f-801", x: 14, y: 3.6, z: 60, neighbors: ["g8f-2f-807", "g8f-2f-802"] },
  "g8f-2f-802": { id: "g8f-2f-802", x: 22, y: 3.6, z: 60, neighbors: ["g8f-2f-801", "g8f-2f-803"] },
  "g8f-2f-803": { id: "g8f-2f-803", x: 30, y: 3.6, z: 60, neighbors: ["g8f-2f-802"] },
  "g8f-stair-w-mid2": { id: "g8f-stair-w-mid2", x: -6, y: 5.4, z: 60, neighbors: ["g8f-stair-w-2f", "g8f-stair-w-3f"] },
  "g8f-stair-w-3f": { id: "g8f-stair-w-3f", x: -6, y: 7.2, z: 60, neighbors: ["g8f-stair-w-mid2", "g8f-3f-wood"] },
  "g8f-3f-wood": { id: "g8f-3f-wood", x: 6, y: 7.2, z: 60, neighbors: ["g8f-stair-w-3f", "g8f-3f-806"] },
  "g8f-3f-806": { id: "g8f-3f-806", x: 14, y: 7.2, z: 60, neighbors: ["g8f-3f-wood", "g8f-3f-808"] },
  "g8f-3f-808": { id: "g8f-3f-808", x: 22, y: 7.2, z: 60, neighbors: ["g8f-3f-806", "g8f-3f-bg"] },
  "g8f-3f-bg": { id: "g8f-3f-bg", x: 30, y: 7.2, z: 60, neighbors: ["g8f-3f-808"] },

  // 8. 九年級教學棟 (中西縱向棟，直立南北向)
  "g9-porch-s": { id: "g9-porch-s", x: 2, y: 0, z: 50, neighbors: ["g8f-porch", "breezeway-west", "breezeway-mid", "g9-1f-908", "g9-stair-s-1f"] },
  "g9-porch-n": { id: "g9-porch-n", x: 2, y: 0, z: 8, neighbors: ["breezeway-west", "breezeway-mid", "breezeway-north", "g9-1f-906"] },
  "g9-1f-908": { id: "g9-1f-908", x: 2, y: 0, z: 42, neighbors: ["g9-porch-s", "g9-1f-907"] },
  "g9-1f-907": { id: "g9-1f-907", x: 2, y: 0, z: 28, neighbors: ["g9-1f-908", "g9-1f-906"] },
  "g9-1f-906": { id: "g9-1f-906", x: 2, y: 0, z: 14, neighbors: ["g9-1f-907", "g9-porch-n"] },

  "g9-stair-s-1f": { id: "g9-stair-s-1f", x: 2, y: 0, z: 46, neighbors: ["g9-porch-s", "g9-stair-s-mid1"] },
  "g9-stair-s-mid1": { id: "g9-stair-s-mid1", x: 2, y: 1.8, z: 46, neighbors: ["g9-stair-s-1f", "g9-stair-s-2f"] },
  "g9-stair-s-2f": { id: "g9-stair-s-2f", x: 2, y: 3.6, z: 46, neighbors: ["g9-stair-s-mid1", "g9-2f-905", "g9-stair-s-mid2"] },
  "g9-2f-905": { id: "g9-2f-905", x: 2, y: 3.6, z: 42, neighbors: ["g9-stair-s-2f", "g9-2f-904"] },
  "g9-2f-904": { id: "g9-2f-904", x: 2, y: 3.6, z: 28, neighbors: ["g9-2f-905", "g9-2f-clubs"] },
  "g9-2f-clubs": { id: "g9-2f-clubs", x: 2, y: 3.6, z: 14, neighbors: ["g9-2f-904"] },

  "g9-stair-s-mid2": { id: "g9-stair-s-mid2", x: 2, y: 5.4, z: 46, neighbors: ["g9-stair-s-2f", "g9-stair-s-3f"] },
  "g9-stair-s-3f": { id: "g9-stair-s-3f", x: 2, y: 7.2, z: 46, neighbors: ["g9-stair-s-mid2", "g9-3f-903"] },
  "g9-3f-903": { id: "g9-3f-903", x: 2, y: 7.2, z: 42, neighbors: ["g9-stair-s-3f", "g9-3f-902"] },
  "g9-3f-902": { id: "g9-3f-902", x: 2, y: 7.2, z: 28, neighbors: ["g9-3f-903", "g9-3f-901"] },
  "g9-3f-901": { id: "g9-3f-901", x: 2, y: 7.2, z: 14, neighbors: ["g9-3f-902"] },

  // 9. 八年級中棟與專科教室 (中東縱向棟，直立南北向)
  "g8m-porch-s": { id: "g8m-porch-s", x: 28, y: 0, z: 50, neighbors: ["g8f-porch", "breezeway-mid", "driveway-m1", "g8m-1f-wood", "g8m-stair-s-1f"] },
  "g8m-porch-n": { id: "g8m-porch-n", x: 28, y: 0, z: 8, neighbors: ["breezeway-mid", "breezeway-north", "driveway-m2", "g8m-1f-counsel"] },
  "g8m-1f-wood": { id: "g8m-1f-wood", x: 28, y: 0, z: 42, neighbors: ["g8m-porch-s", "g8m-1f-809"] },
  "g8m-1f-809": { id: "g8m-1f-809", x: 28, y: 0, z: 32, neighbors: ["g8m-1f-wood", "g8m-1f-wood206"] },
  "g8m-1f-wood206": { id: "g8m-1f-wood206", x: 28, y: 0, z: 22, neighbors: ["g8m-1f-809", "g8m-1f-counsel"] },
  "g8m-1f-counsel": { id: "g8m-1f-counsel", x: 28, y: 0, z: 14, neighbors: ["g8m-1f-wood206", "g8m-porch-n"] },

  "g8m-stair-s-1f": { id: "g8m-stair-s-1f", x: 28, y: 0, z: 46, neighbors: ["g8m-porch-s", "g8m-stair-s-mid1"] },
  "g8m-stair-s-mid1": { id: "g8m-stair-s-mid1", x: 28, y: 1.8, z: 46, neighbors: ["g8m-stair-s-1f", "g8m-stair-s-2f"] },
  "g8m-stair-s-2f": { id: "g8m-stair-s-2f", x: 28, y: 3.6, z: 46, neighbors: ["g8m-stair-s-mid1", "g8m-2f-804", "g8m-stair-s-mid2"] },
  "g8m-2f-804": { id: "g8m-2f-804", x: 28, y: 3.6, z: 42, neighbors: ["g8m-stair-s-2f", "g8m-2f-805"] },
  "g8m-2f-805": { id: "g8m-2f-805", x: 28, y: 3.6, z: 32, neighbors: ["g8m-2f-804", "g8m-2f-math-res"] },
  "g8m-2f-math-res": { id: "g8m-2f-math-res", x: 28, y: 3.6, z: 22, neighbors: ["g8m-2f-805"] },

  "g8m-stair-s-mid2": { id: "g8m-stair-s-mid2", x: 28, y: 5.4, z: 46, neighbors: ["g8m-stair-s-2f", "g8m-stair-s-3f"] },
  "g8m-stair-s-3f": { id: "g8m-stair-s-3f", x: 28, y: 7.2, z: 46, neighbors: ["g8m-stair-s-mid2", "g8m-3f-inter"] },
  "g8m-3f-inter": { id: "g8m-3f-inter", x: 28, y: 7.2, z: 38, neighbors: ["g8m-stair-s-3f", "g8m-3f-drama"] },
  "g8m-3f-drama": { id: "g8m-3f-drama", x: 28, y: 7.2, z: 26, neighbors: ["g8m-3f-inter", "g8m-3f-nl"] },
  "g8m-3f-nl": { id: "g8m-3f-nl", x: 28, y: 7.2, z: 14, neighbors: ["g8m-3f-drama"] },

  // 10. 中央南北向車道 (Main Driveway)
  "driveway-s1": { id: "driveway-s1", x: 30, y: 0, z: 86, neighbors: ["gate-guard", "driveway-m1", "bike-shed"] },
  "driveway-m1": { id: "driveway-m1", x: 52, y: 0, z: 48, neighbors: ["driveway-s1", "g8m-porch-s", "art-porch", "driveway-m2"] },
  "driveway-m2": { id: "driveway-m2", x: 52, y: 0, z: 12, neighbors: ["driveway-m1", "g8m-porch-n", "tech-porch", "driveway-n1"] },
  "driveway-n1": { id: "driveway-n1", x: 52, y: 0, z: -25, neighbors: ["driveway-m2", "bb-gate", "multi-porch", "parking-lot", "driveway-n2"] },
  "driveway-n2": { id: "driveway-n2", x: 52, y: 0, z: -58, neighbors: ["driveway-n1", "new7-porch"] },

  "bike-shed": { id: "bike-shed", x: 80, y: 0, z: 86, neighbors: ["driveway-s1", "art-porch"] },

  // 11. 東側：七年級新大樓＋特教園地 (NE)
  "new7-porch": { id: "new7-porch", x: 60, y: 0, z: -58, neighbors: ["driveway-n2", "new7-1f-fit", "new7-1f-709", "new7-1f-701", "new7-stair-1f"] },
  "new7-1f-fit": { id: "new7-1f-fit", x: 68, y: 0, z: -58, neighbors: ["new7-porch", "new7-1f-709"] },
  "new7-1f-709": { id: "new7-1f-709", x: 74, y: 0, z: -58, neighbors: ["new7-1f-fit", "new7-1f-701"] },
  "new7-1f-701": { id: "new7-1f-701", x: 80, y: 0, z: -58, neighbors: ["new7-1f-709", "new7-1f-res"] },
  "new7-1f-res": { id: "new7-1f-res", x: 86, y: 0, z: -58, neighbors: ["new7-1f-701", "new7-1f-704"] },
  "new7-1f-704": { id: "new7-1f-704", x: 92, y: 0, z: -58, neighbors: ["new7-1f-res", "new7-1f-708"] },
  "new7-1f-708": { id: "new7-1f-708", x: 98, y: 0, z: -58, neighbors: ["new7-1f-704"] },

  "new7-stair-1f": { id: "new7-stair-1f", x: 60, y: 0, z: -54, neighbors: ["new7-porch", "new7-stair-mid1"] },
  "new7-stair-mid1": { id: "new7-stair-mid1", x: 60, y: 1.8, z: -54, neighbors: ["new7-stair-1f", "new7-stair-2f"] },
  "new7-stair-2f": { id: "new7-stair-2f", x: 60, y: 3.6, z: -54, neighbors: ["new7-stair-mid1", "new7-2f-702", "new7-stair-mid2"] },
  "new7-2f-702": { id: "new7-2f-702", x: 72, y: 3.6, z: -58, neighbors: ["new7-stair-2f", "new7-2f-703"] },
  "new7-2f-703": { id: "new7-2f-703", x: 78, y: 3.6, z: -58, neighbors: ["new7-2f-702", "new7-2f-sped-off"] },
  "new7-2f-sped-off": { id: "new7-2f-sped-off", x: 84, y: 3.6, z: -58, neighbors: ["new7-2f-703", "new7-2f-705"] },
  "new7-2f-705": { id: "new7-2f-705", x: 90, y: 3.6, z: -58, neighbors: ["new7-2f-sped-off", "new7-2f-counseling"] },
  "new7-2f-counseling": { id: "new7-2f-counseling", x: 96, y: 3.6, z: -58, neighbors: ["new7-2f-705"] },

  "new7-stair-mid2": { id: "new7-stair-mid2", x: 60, y: 5.4, z: -54, neighbors: ["new7-stair-2f", "new7-stair-3f"] },
  "new7-stair-3f": { id: "new7-stair-3f", x: 60, y: 7.2, z: -54, neighbors: ["new7-stair-mid2", "new7-3f-math"] },
  "new7-3f-math": { id: "new7-3f-math", x: 72, y: 7.2, z: -58, neighbors: ["new7-stair-3f", "new7-3f-706"] },
  "new7-3f-706": { id: "new7-3f-706", x: 80, y: 7.2, z: -58, neighbors: ["new7-3f-math", "new7-3f-707"] },
  "new7-3f-707": { id: "new7-3f-707", x: 88, y: 7.2, z: -58, neighbors: ["new7-3f-706", "new7-3f-sped-cls"] },
  "new7-3f-sped-cls": { id: "new7-3f-sped-cls", x: 96, y: 7.2, z: -58, neighbors: ["new7-3f-707"] },

  // 12. 綜合大樓 (Multiservice Bld) & 平面停車場 & 校史室
  "multi-porch": { id: "multi-porch", x: 62, y: 0, z: -23, neighbors: ["driveway-n1", "multi-1f-food", "multi-1f-lib", "history-1f", "parking-lot", "multi-stair-1f"] },
  "parking-lot": { id: "parking-lot", x: 74, y: 0, z: -23, neighbors: ["driveway-n1", "multi-porch"] },
  "multi-1f-food": { id: "multi-1f-food", x: 74, y: 0, z: -35, neighbors: ["multi-porch"] },
  "multi-1f-lib": { id: "multi-1f-lib", x: 74, y: 0, z: -10, neighbors: ["multi-porch"] },
  "history-1f": { id: "history-1f", x: 92, y: 0, z: -35, neighbors: ["multi-porch"] },

  "multi-stair-1f": { id: "multi-stair-1f", x: 62, y: 0, z: -19, neighbors: ["multi-porch", "multi-stair-mid"] },
  "multi-stair-mid": { id: "multi-stair-mid", x: 62, y: 1.8, z: -19, neighbors: ["multi-stair-1f", "multi-2f-conf"] },
  "multi-2f-conf": { id: "multi-2f-conf", x: 74, y: 3.6, z: -35, neighbors: ["multi-stair-mid", "multi-2f-lpc"] },
  "multi-2f-lpc": { id: "multi-2f-lpc", x: 74, y: 3.6, z: -10, neighbors: ["multi-2f-conf", "multi-2f-srv"] },
  "multi-2f-srv": { id: "multi-2f-srv", x: 84, y: 3.6, z: -10, neighbors: ["multi-2f-lpc"] },

  // 13. 科技館 (Technology Building)
  "tech-porch": { id: "tech-porch", x: 62, y: 0, z: 12, neighbors: ["driveway-m2", "tech-1f-av", "tech-1f-lt1", "tech-1f-smart", "tech-1f-lt2", "tech-stair-1f"] },
  "tech-1f-av": { id: "tech-1f-av", x: 68, y: 0, z: 6, neighbors: ["tech-porch"] },
  "tech-1f-lt1": { id: "tech-1f-lt1", x: 76, y: 0, z: 6, neighbors: ["tech-porch"] },
  "tech-1f-smart": { id: "tech-1f-smart", x: 68, y: 0, z: 18, neighbors: ["tech-porch"] },
  "tech-1f-lt2": { id: "tech-1f-lt2", x: 76, y: 0, z: 18, neighbors: ["tech-porch"] },

  "tech-stair-1f": { id: "tech-stair-1f", x: 62, y: 0, z: 8, neighbors: ["tech-porch", "tech-stair-mid"] },
  "tech-stair-mid": { id: "tech-stair-mid", x: 62, y: 1.8, z: 8, neighbors: ["tech-stair-1f", "tech-2f-phy"] },
  "tech-2f-phy": { id: "tech-2f-phy", x: 70, y: 3.6, z: 6, neighbors: ["tech-stair-mid", "tech-2f-pc1"] },
  "tech-2f-pc1": { id: "tech-2f-pc1", x: 80, y: 3.6, z: 6, neighbors: ["tech-2f-phy"] },
  "tech-2f-pc2": { id: "tech-2f-pc2", x: 70, y: 3.6, z: 18, neighbors: ["tech-2f-phy", "tech-2f-maker"] },
  "tech-2f-maker": { id: "tech-2f-maker", x: 80, y: 3.6, z: 18, neighbors: ["tech-2f-pc2"] },

  // 14. 藝術館 (Art Building, 4層樓)
  "art-porch": { id: "art-porch", x: 66, y: 0, z: 46, neighbors: ["driveway-m1", "bike-shed", "art-1f-bw", "art-stair-1f"] },
  "art-1f-bw": { id: "art-1f-bw", x: 74, y: 0, z: 46, neighbors: ["art-porch"] },

  "art-stair-1f": { id: "art-stair-1f", x: 68, y: 0, z: 42, neighbors: ["art-porch", "art-stair-mid1"] },
  "art-stair-mid1": { id: "art-stair-mid1", x: 68, y: 1.8, z: 42, neighbors: ["art-stair-1f", "art-2f-m1"] },
  "art-2f-m1": { id: "art-2f-m1", x: 74, y: 3.6, z: 46, neighbors: ["art-stair-mid1", "art-stair-mid2"] },
  "art-stair-mid2": { id: "art-stair-mid2", x: 68, y: 5.4, z: 42, neighbors: ["art-2f-m1", "art-3f-m2"] },
  "art-3f-m2": { id: "art-3f-m2", x: 74, y: 7.2, z: 46, neighbors: ["art-stair-mid2", "art-stair-mid3"] },
  "art-stair-mid3": { id: "art-stair-mid3", x: 68, y: 9.0, z: 42, neighbors: ["art-3f-m2", "art-4f-art"] },
  "art-4f-art": { id: "art-4f-art", x: 74, y: 10.8, z: 46, neighbors: ["art-stair-mid3"] }
};

    NAV_NODES['palm-avenue-end']={x:-10,y:0,z:158,neighbors:['gate']};
    Object.keys(NAV_NODES).forEach(nid => {
      const node = NAV_NODES[nid];
      node.neighbors.forEach(neighId => {
        if (NAV_NODES[neighId] && !NAV_NODES[neighId].neighbors.includes(nid)) {
          NAV_NODES[neighId].neighbors.push(nid);
        }
      });
    });

    function findShortestPath(startNodeId, targetNodeId) {
      if (!NAV_NODES[startNodeId] || !NAV_NODES[targetNodeId]) return null;
      if (startNodeId === targetNodeId) return [startNodeId];

      const openSet = new Set([startNodeId]);
      const cameFrom = {};
      const gScore = {};
      const fScore = {};

      Object.keys(NAV_NODES).forEach(k => {
        gScore[k] = Infinity;
        fScore[k] = Infinity;
      });

      gScore[startNodeId] = 0;
      fScore[startNodeId] = dist3D(NAV_NODES[startNodeId], NAV_NODES[targetNodeId]);

      while (openSet.size > 0) {
        let current = null;
        let lowestF = Infinity;
        openSet.forEach(nodeId => {
          if (fScore[nodeId] < lowestF) {
            lowestF = fScore[nodeId];
            current = nodeId;
          }
        });

        if (current === targetNodeId) {
          const path = [current];
          while (cameFrom[current]) {
            current = cameFrom[current];
            path.unshift(current);
          }
          return path;
        }

        openSet.delete(current);
        const currNode = NAV_NODES[current];

        currNode.neighbors.forEach(neighborId => {
          const neighNode = NAV_NODES[neighborId];
          if (!neighNode) return;
          const tentativeG = gScore[current] + dist3D(currNode, neighNode);
          if (tentativeG < gScore[neighborId]) {
            cameFrom[neighborId] = current;
            gScore[neighborId] = tentativeG;
            fScore[neighborId] = tentativeG + dist3D(neighNode, NAV_NODES[targetNodeId]);
            openSet.add(neighborId);
          }
        });
      }
      return null;
    }

    function dist3D(p1, p2) {
      const dx = p1.x - p2.x;
      const dy = (p1.y || 0) - (p2.y || 0);
      const dz = p1.z - p2.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    function findClosestNavNode(pos) {
      let closestId = "gate";
      let minDist = Infinity;
      Object.keys(NAV_NODES).forEach(nid => {
        const n = NAV_NODES[nid];
        const d = Math.hypot(n.x - pos.x, (n.y || 0) - pos.y, n.z - pos.z);
        if (d < minDist) {
          minDist = d;
          closestId = nid;
        }
      });
      return closestId;
    }

    /* ==========================================================================
       6. 3D ROUTE & MULTI-FLOOR AUTO-WALK
       ========================================================================== */
    let navPathMesh = null;
    let navTargetPoint = null;
    let currentNavPoints = [];
    let isAutoWalking = false;
    let autoWalkIndex = 0;
    let activeNavigationId = null;

    function renderNavigationPath(points) {
      if (navPathMesh) {
        scene.remove(navPathMesh);
        navPathMesh.geometry.dispose();
        navPathMesh.material.dispose();
        navPathMesh = null;
      }
      currentNavPoints = points || [];
      if (!points || points.length < 2) return;

      const tubeGeo = new THREE.BufferGeometry();
      tubeGeo.setAttribute('position',new THREE.Float32BufferAttribute(CampusSpatialPlan.ribbon(points),3));
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      navPathMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(navPathMesh);

      if (!navTargetPoint) {
        const pinGeo = new THREE.CylinderGeometry(0.1, 1.4, 3.2, 12);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        navTargetPoint = new THREE.Mesh(pinGeo, pinMat);
        scene.add(navTargetPoint);
      }
      const lastPt = points[points.length - 1];
      navTargetPoint.position.set(lastPt.x, lastPt.y + 2.6, lastPt.z);
      navTargetPoint.userData.baseY=lastPt.y+2.6;
      navTargetPoint.rotation.x = Math.PI;
      navTargetPoint.visible = true;
    }

    function clearNavigation() {
      activeNavigationId = null;
      if (navPathMesh) {
        scene.remove(navPathMesh);
        navPathMesh.geometry.dispose();
        navPathMesh.material.dispose();
        navPathMesh = null;
      }
      if (navTargetPoint) {
        navTargetPoint.visible = false;
      }
      document.getElementById("nav-hud").classList.remove("visible");
      stopAutoWalk();
      currentNavPoints = [];
    }

    const btnAutoWalk = document.getElementById("btn-auto-walk");
    btnAutoWalk.onclick = () => {
      if (isAutoWalking) {
        stopAutoWalk();
      } else {
        startAutoWalk();
      }
    };

    function startAutoWalk() {
      if(motionBlocked())return;
      cancelCameraTween();
      resetManualInput();
      if (activeNavigationId && !navigateToRoom(activeNavigationId, false)) return;
      if (!currentNavPoints || currentNavPoints.length < 2) return;
      if(currentMode==='bird')setControlMode('avatar');
      window.campusWalkWorld?.updateCamera();
      isAutoWalking = true;
      const startPt = currentNavPoints[0];
      const startPos = new THREE.Vector3(startPt.x, (startPt.y || 0.6) - 0.6, startPt.z);
      if (avatarGroup && avatarGroup.position.distanceTo(startPos) > 2.0) {
        autoWalkIndex = -1; // Walk to start point first
      } else {
        autoWalkIndex = 0;
      }
      btnAutoWalk.classList.add("walking");
      btnAutoWalk.textContent = "⏹️ 停止帶路";
      showToast("🧑‍🎓 大溪同學啟動自動帶路，正帶您前往目的地！");
    }

    function stopAutoWalk() {
      isAutoWalking = false;
      if(btnAutoWalk.classList.contains('walking'))btnAutoWalk.classList.remove('walking');
      const label=activeNavigationId ? "繼續帶路" : "🚶‍♂️ 自動帶路";
      if(btnAutoWalk.textContent!==label)btnAutoWalk.textContent=label;
    }

    function manualTakeover() {
      if(isAutoWalking){stopAutoWalk();showToast('已改為手動探索；按「繼續帶路」從目前位置出發。');}
    }
    function resetManualInput() {
      keyMovementKeys.clear();
      Object.keys(dpadInput).forEach(k=>dpadInput[k]=false);
      Object.keys(moveInput).forEach(k=>moveInput[k]=false);
      isMouseDownDragging=false;
      window.campusMobileControls?.reset();
      window.campusMouse?.reset();
      document.querySelectorAll('.dpad-btn.pressed').forEach(el=>el.classList.remove('pressed'));
    }
    function motionBlocked(){return !!document.querySelector('dialog[open],.avatar-setting-modal.open,#help-modal.open,#campus-map-modal.open,#reference-panel.open');}

    /* ==========================================================================
       7. CONTROL MODES & SMOOTH CAMERA
       ========================================================================== */
    let currentMode = "bird"; // Start in Overview Mode (鳥瞰全景) with Welcome Card
    const moveInput = { forward: false, backward: false, left: false, right: false, sprint: false };
    const keyMovementKeys=new Set(),dpadInput={forward:false,backward:false,left:false,right:false};
    const movementKeys={forward:['w','arrowup'],backward:['s','arrowdown'],left:['a','arrowleft'],right:['d','arrowright']};
    function syncMoveInput(){for(const [direction,keys] of Object.entries(movementKeys))moveInput[direction]=dpadInput[direction]||keys.some(k=>keyMovementKeys.has(k));}
    let walkAnimCycle = 0;
    let walkPitch = 0;
    let jumpVelocity = 0;
    let jumpBaseY = 0;
    let isJumping = false;

    function setControlMode(mode) {
      if(mode!==currentMode)resetManualInput();
      if(mode==='bird')stopAutoWalk();
      currentMode = mode;
      document.body.dataset.controlMode=mode;
      controls.enabled=mode==="bird";
      camera.near=mode==='bird'?1:.08;camera.fov=mode==='bird'?45:60;camera.updateProjectionMatrix();
      const btnIcon = document.getElementById("btn-mode-icon");
      const btnText = document.getElementById("btn-mode-text");
      const toggleBtn = document.getElementById("btn-mode-toggle");
      const bottomCtrls = document.getElementById("avatar-bottom-controls");

      if (mode === "avatar") {
        toggleBtn.classList.add("active");
        btnIcon.textContent = "🧑‍🎓";
        btnText.textContent = "第三人稱";
        toggleBtn.title = "目前為第三人稱漫遊，點擊切換為鳥瞰全景";
        if (avatarGroup) avatarGroup.visible = true;
        if (bottomCtrls) bottomCtrls.style.display = "flex";
        showToast("切換為「第三人稱視角」！W／S 前進後退，A／D 轉向。");
        if (avatarGroup) {
          const targetLookAt = avatarGroup.position.clone().add(new THREE.Vector3(0, 1.8, 0));
          const behindPos = avatarGroup.position.clone().add(new THREE.Vector3(0, 5.5, 12));
          cancelCameraTween();
          if(window.campusWalkWorld)window.campusWalkWorld.updateCamera();else animateCameraTo(behindPos,targetLookAt);
        }
      } else if (mode === "firstperson") {
        toggleBtn.classList.add("active");
        btnIcon.textContent = "👀";
        btnText.textContent = "第一人稱";
        toggleBtn.title = "目前為第一人稱視角，點擊切換為第三人稱";
        if (avatarGroup) avatarGroup.visible = false;
        if (bottomCtrls) bottomCtrls.style.display = "flex";
        showToast("切換為「第一人稱視角」！滑鼠環顧、WASD 漫遊。");
        if (avatarGroup) {
          const eyePos = avatarGroup.position.clone().add(new THREE.Vector3(0, 1.7, 0));
          const forwardVec = new THREE.Vector3(Math.sin(avatarAngle) * 10, 0, Math.cos(avatarAngle) * 10);
          cancelCameraTween();
          if(window.campusWalkWorld)window.campusWalkWorld.updateCamera();else animateCameraTo(eyePos,eyePos.clone().add(forwardVec),600);
        }
      } else {
        toggleBtn.classList.remove("active");
        btnIcon.textContent = "🦅";
        btnText.textContent = "鳥瞰全景";
        toggleBtn.title = "目前為鳥瞰模式，點擊切換為第三人稱角色漫遊";
        if (avatarGroup) avatarGroup.visible = true;
        if (bottomCtrls) bottomCtrls.style.display = "none";
        showToast("切換為「全校鳥瞰模式」！可 360° 俯瞰校園全貌。");
        animateCameraTo(OVERVIEW_CAM, OVERVIEW_TARGET);
      }
    }

    function togglePerspective() {
      if (currentMode === "firstperson") {
        setControlMode("avatar");
      } else {
        setControlMode("firstperson");
      }
    }

    function toggleBirdMode() {
      if (currentMode === "bird") {
        setControlMode("avatar");
      } else {
        setControlMode("bird");
      }
    }

    function triggerJump() {
      if (!isJumping && avatarGroup) {
        isJumping = true;
        jumpBaseY = avatarGroup.position.y;
        jumpVelocity = 7.5;
      }
    }

    document.getElementById("btn-mode-toggle").onclick = () => {
      setControlMode(currentMode === "bird" ? "avatar" : "bird");
    };

    function showToast(text) {
      const toast = document.getElementById("mode-toast");
      toast.textContent = text;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2800);
    }

    window.addEventListener("keydown", (e) => {
      if (e.target instanceof Element && e.target.closest("input,textarea,select,[contenteditable]")) return;
      if(motionBlocked())return;
      if(['w','s','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key.length===1?e.key.toLowerCase():e.key)){
        e.preventDefault();manualTakeover();
      }
      if (["w","s","a","d","W","S","A","D","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)&&currentMode==='bird')setControlMode('avatar');
      if(Object.values(movementKeys).flat().includes(e.key.toLowerCase())){keyMovementKeys.add(e.key.toLowerCase());syncMoveInput();}
      if (e.shiftKey) moveInput.sprint = true;
      if (e.code === "Space") {
        e.preventDefault();
        triggerJump();
      }
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        togglePerspective();
      }
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleBirdMode();
      }

    });

    window.addEventListener("keyup", (e) => {
      keyMovementKeys.delete(e.key.toLowerCase());syncMoveInput();
      if (!e.shiftKey) moveInput.sprint = false;
    });

    function bindDpad(btnId, directionKey) {
      const el = document.getElementById(btnId);
      const start = (e) => {
        e.preventDefault();
        if(motionBlocked())return;
        if(currentMode==='bird')setControlMode('avatar');
        manualTakeover();
        dpadInput[directionKey] = true;syncMoveInput();
        el.classList.add("pressed");
      };
      const end = (e) => {
        e.preventDefault();
        dpadInput[directionKey] = false;syncMoveInput();
        el.classList.remove("pressed");
      };
      el.addEventListener("mousedown", start);
      el.addEventListener("mouseup", end);
      el.addEventListener("mouseleave", end);
      el.addEventListener("touchstart", start, { passive: false });
      el.addEventListener("touchend", end, { passive: false });
      el.addEventListener("touchcancel", end, { passive: false });
    }
    window.addEventListener('blur',()=>{resetManualInput();stopAutoWalk()});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){resetManualInput();stopAutoWalk()}});
    let wasMotionBlocked=false;
    new MutationObserver(()=>{const blocked=motionBlocked();if(blocked&&!wasMotionBlocked){resetManualInput();stopAutoWalk()}wasMotionBlocked=blocked;}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open','class']});
    bindDpad("dpad-up", "forward");
    bindDpad("dpad-down", "backward");
    bindDpad("dpad-left", "left");
    bindDpad("dpad-right", "right");

    /* ==========================================================================
       8. NAVIGATION & CAMERA TRANSITIONS
       ========================================================================== */
    function navigateToRoom(roomId, focusCamera = true) {
      stopAutoWalk();
      const room = ROOMS_DB[roomId];
      if (!room) {
        alert("找不到此處室或教室: " + roomId);
        return;
      }

      focusedBuildingId=room.buildingId;
      const targetNodeId = room.node;
      const startNodeId = avatarGroup ? findClosestNavNode(avatarGroup.position) : "gate";
      const nodePath = findShortestPath(startNodeId, targetNodeId);

      const pathPoints = [];
      if (nodePath && nodePath.length > 0) {
        nodePath.forEach(nid => {
          const n = NAV_NODES[nid];
          pathPoints.push(new THREE.Vector3(n.x, (n.y || 0) + 0.6, n.z));
        });
      } else {
        const destNode = NAV_NODES[targetNodeId] || { x: 0, y: 0, z: 0 };
        pathPoints.push(new THREE.Vector3(0, 0.6, 96));
        pathPoints.push(new THREE.Vector3(destNode.x, (destNode.y || 0) + 0.6, destNode.z));
      }

      if(window.campusWalkWorld){
        const actual=window.campusWalkWorld.route(avatarGroup.position,room);
        if(!actual){showToast('目前位置無可通行路徑，請先移到走廊或入口。');return;}
        pathPoints.length=0;actual.forEach(p=>pathPoints.push(new THREE.Vector3(p.x,p.y+.6,p.z)));
      }
      renderNavigationPath(pathPoints);
      activeNavigationId=roomId;

      let totalDist = 0;
      for (let i = 0; i < pathPoints.length - 1; i++) {
        totalDist += pathPoints[i].distanceTo(pathPoints[i + 1]);
      }
      const meters = Math.round(totalDist);

      const outdoorDestination = room.code?.startsWith('OUT-') || roomId === 'track';
      document.getElementById("hud-target-name").textContent = `[${room.buildingName} ${outdoorDestination ? '戶外' : room.floor+'F'}] ${room.name}`;
      document.getElementById("hud-route-desc").textContent = outdoorDestination
        ? `由當前位置 → 沿校園路線前往 ${room.name}`
        : `由當前位置 → 經由 ${room.buildingName} 走廊/樓梯至 ${room.floor} 樓`;
      document.getElementById("hud-dist-val").textContent = meters;
      document.getElementById("nav-hud").dataset.destination = roomId;
      document.getElementById("nav-hud").classList.add("visible");
      btnAutoWalk.textContent = "🚶‍♂️ 自動帶路";
      btnAutoWalk.classList.remove("walking");

      if (room.floor > 1) {
        setFloorFilter(room.floor);
      } else {
        setFloorFilter("all");
      }

      // Smoothly focus camera towards destination node
      const destNode = NAV_NODES[targetNodeId];
      if (destNode && focusCamera && currentMode==='bird') {
        animateCameraTo(
          new THREE.Vector3(destNode.x + 24, (destNode.y || 0) + 18, destNode.z + 32),
          new THREE.Vector3(destNode.x, (destNode.y || 0) + 2, destNode.z)
        );
      }
      return true;
    }

    let isCameraAnimating = false;
    let cameraTweenGeneration=0;
    function cancelCameraTween(){cameraTweenGeneration++;isCameraAnimating=false;}
    function animateCameraTo(targetCamPos, targetLookAt, duration = 800) {
      const generation=++cameraTweenGeneration;
      if(matchMedia("(prefers-reduced-motion: reduce)").matches)duration=1;
      const startCamPos = camera.position.clone();
      const startLookAt = controls.target.clone();
      const startTime = performance.now();
      isCameraAnimating = true;

      function tween(now) {
        if(generation!==cameraTweenGeneration)return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        camera.position.lerpVectors(startCamPos, targetCamPos, ease);
        controls.target.lerpVectors(startLookAt, targetLookAt, ease);

        if (progress < 1) {
          requestAnimationFrame(tween);
        } else {
          camera.position.copy(targetCamPos);
          controls.target.copy(targetLookAt);
          controls.update();
          isCameraAnimating = false;
        }
      }
      requestAnimationFrame(tween);
    }

    /* ==========================================================================
       7.1 AVATAR SPEED & TURN CONTROLS (References: media_1791355815735/739/762)
       ========================================================================== */
    let avatarSpeedMultiplier = 1.0;
    let turnSensitivityMultiplier = 1.0;
    let mouseTurnMode = "left"; // "left" | "right" | "move"
    let isInvertY = false;
    let isMouseDownDragging = false;

    const btnSpeedCtrl = document.getElementById("btn-speed-ctrl");
    const btnTurnCtrl = document.getElementById("btn-turn-ctrl");
    const modalSpeedCtrl = document.getElementById("modal-speed-ctrl");
    const modalTurnCtrl = document.getElementById("modal-turn-ctrl");
    const btnCloseSpeedModal = document.getElementById("btn-close-speed-modal");
    const btnCloseTurnModal = document.getElementById("btn-close-turn-modal");
    const sliderSpeed = document.getElementById("slider-speed");
    const sliderTurn = document.getElementById("slider-turn");
    const valSpeedDisplay = document.getElementById("val-speed-display");
    const valTurnDisplay = document.getElementById("val-turn-display");
    const selectMouseTurn = document.getElementById("select-mouse-turn");
    const checkInvertY = document.getElementById("check-invert-y");
    const btnResetSpeed = document.getElementById("btn-reset-speed");
    const btnResetTurn = document.getElementById("btn-reset-turn");

    function updateSliderFill(slider) {
      if (!slider) return;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
      slider.style.background = `linear-gradient(to right, #facc15 0%, #facc15 ${pct}%, #334155 ${pct}%, #334155 100%)`;
    }

    if (sliderSpeed) {
      updateSliderFill(sliderSpeed);
      sliderSpeed.addEventListener("input", () => {
        const val = parseInt(sliderSpeed.value, 10);
        if (valSpeedDisplay) valSpeedDisplay.textContent = `${val}%`;
        if (btnSpeedCtrl) btnSpeedCtrl.textContent = `速度 ${val}%`;
        avatarSpeedMultiplier = val / 100;
        updateSliderFill(sliderSpeed);
      });
    }

    if (btnResetSpeed) {
      btnResetSpeed.addEventListener("click", () => {
        if (sliderSpeed) sliderSpeed.value = 100;
        if (valSpeedDisplay) valSpeedDisplay.textContent = "100%";
        if (btnSpeedCtrl) btnSpeedCtrl.textContent = "速度 100%";
        avatarSpeedMultiplier = 1.0;
        updateSliderFill(sliderSpeed);
      });
    }

    if (sliderTurn) {
      updateSliderFill(sliderTurn);
      sliderTurn.addEventListener("input", () => {
        const val = parseInt(sliderTurn.value, 10);
        if (valTurnDisplay) valTurnDisplay.textContent = `${val}%`;
        if (btnTurnCtrl) btnTurnCtrl.textContent = `轉頭 ${val}%`;
        turnSensitivityMultiplier = val / 100;
        controls.rotateSpeed = 1.0 * turnSensitivityMultiplier;
        updateSliderFill(sliderTurn);
      });
    }

    function applyMouseModeSettings() {
      controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    }

    if (selectMouseTurn) {
      selectMouseTurn.addEventListener("change", (e) => {
        mouseTurnMode = e.target.value;
        applyMouseModeSettings();
      });
    }

    if (checkInvertY) {
      checkInvertY.addEventListener("change", (e) => {
        isInvertY = e.target.checked;
      });
    }

    if (btnResetTurn) {
      btnResetTurn.addEventListener("click", () => {
        if (sliderTurn) sliderTurn.value = 100;
        if (valTurnDisplay) valTurnDisplay.textContent = "100%";
        if (btnTurnCtrl) btnTurnCtrl.textContent = "轉頭 100%";
        turnSensitivityMultiplier = 1.0;
        controls.rotateSpeed = 1.0;
        updateSliderFill(sliderTurn);

        if (selectMouseTurn) selectMouseTurn.value = "left";
        mouseTurnMode = "left";
        applyMouseModeSettings();

        if (checkInvertY) checkInvertY.checked = false;
        isInvertY = false;
      });
    }

    // Modal open/close toggles
    if (btnSpeedCtrl) {
      btnSpeedCtrl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalTurnCtrl) modalTurnCtrl.classList.remove("open");
        if (modalSpeedCtrl) modalSpeedCtrl.classList.toggle("open");
      });
    }

    if (btnTurnCtrl) {
      btnTurnCtrl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalSpeedCtrl) modalSpeedCtrl.classList.remove("open");
        if (modalTurnCtrl) modalTurnCtrl.classList.toggle("open");
      });
    }

    if (btnCloseSpeedModal) {
      btnCloseSpeedModal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalSpeedCtrl) modalSpeedCtrl.classList.remove("open");
      });
    }

    if (btnCloseTurnModal) {
      btnCloseTurnModal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalTurnCtrl) modalTurnCtrl.classList.remove("open");
      });
    }

    if (modalSpeedCtrl) modalSpeedCtrl.addEventListener("click", (e) => e.stopPropagation());
    if (modalTurnCtrl) modalTurnCtrl.addEventListener("click", (e) => e.stopPropagation());

    window.addEventListener("click", (e) => {
      if (modalSpeedCtrl && !e.target.closest("#modal-speed-ctrl") && !e.target.closest("#btn-speed-ctrl")) {
        modalSpeedCtrl.classList.remove("open");
      }
      if (modalTurnCtrl && !e.target.closest("#modal-turn-ctrl") && !e.target.closest("#btn-turn-ctrl")) {
        modalTurnCtrl.classList.remove("open");
      }
    });

    // Custom Mouse Look & Invert Y Rotation Handling
    function applyManualCameraRotation(deltaX, deltaY) {
      if(motionBlocked())return;
      if(currentMode!=='bird'){
        if(isCameraAnimating)cancelCameraTween();
        if(deltaX||deltaY)manualTakeover();
        avatarAngle-=deltaX*.0035*turnSensitivityMultiplier;
        walkPitch=Math.max(-1.25,Math.min(1.25,walkPitch-deltaY*.0035*turnSensitivityMultiplier*(isInvertY?-1:1)));
        return;
      }
      const rotSens = turnSensitivityMultiplier;
      const inv = isInvertY ? -1 : 1;
      const thetaAngle = -deltaX * 0.0035 * rotSens;
      const phiAngle = -deltaY * 0.0035 * rotSens * inv;

      const offset = camera.position.clone().sub(controls.target);
      if (Math.abs(thetaAngle) > 0.0001) {
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), thetaAngle);
      }
      if (Math.abs(phiAngle) > 0.0001) {
        const right = new THREE.Vector3().crossVectors(offset, new THREE.Vector3(0, 1, 0)).normalize();
        offset.applyAxisAngle(right, phiAngle);
      }
      const minD = controls.minDistance || 4;
      const maxD = controls.maxDistance || 300;
      offset.clampLength(minD, maxD);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }

    // Pointer capture, hover and pointer lock are owned by mouse-controls.js.

    function focusBuilding(cfg) {
      focusedBuildingId=cfg.id;
      animateCameraTo(
        new THREE.Vector3(cfg.x + 36, cfg.floors * FH + 30, cfg.z + 45),
        new THREE.Vector3(cfg.x, cfg.floors * FH / 2, cfg.z)
      );
    }

    let currentFloorFilter = "all";
    function setFloorFilter(floorVal) {
      currentFloorFilter = floorVal;
      const floorBadgeEl = document.getElementById("minimap-floor-badge");
      if (floorBadgeEl) {
        floorBadgeEl.textContent = floorVal === "all" ? "1F" : floorVal + "F";
      }

      document.querySelectorAll(".floor-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.f === String(floorVal));
      });

      floorMeshes.forEach(grp => {
        if (floorVal === "all") {
          grp.visible = true;
        } else {
          grp.visible = CampusFloorExhibitModel.meshVisible(grp.userData,floorVal,BUILDINGS_CONFIG.find(b=>b.id===grp.userData.buildingId)?.floors||4);
        }
        grp.traverse(o=>{if(o!==grp&&o.userData.roof)o.visible=CampusFloorExhibitModel.meshVisible({roof:true},floorVal,BUILDINGS_CONFIG.find(b=>b.id===grp.userData.buildingId)?.floors||4)});
      });

      roomBadgeElements.forEach(rb => {
        if (floorVal === "all") {
          rb.element.style.display = "flex";
        } else {
          rb.element.style.display = (rb.floor === Number(floorVal)) ? "flex" : "none";
        }
      });
      window.campusFloorExhibit?.refresh();
    }

    document.querySelectorAll(".floor-btn").forEach(btn => {
      btn.onclick = () => setFloorFilter(btn.dataset.f);
    });

    /* ==========================================================================
       9. SEARCH, QUICK CHIPS & 2D MINIMAP
       ========================================================================== */
    function escapeRoomText(value) {
      return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResults.style.display = "none";
        return;
      }
      const matches = Object.values(ROOMS_DB).filter(r => !r.aliasFor && (
        r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.buildingName.toLowerCase().includes(q) || (r.spaceCode||r.code||'').toLowerCase().includes(q)
      ));

      if (matches.length === 0) {
        searchResults.innerHTML = `<li style="color: var(--muted); cursor: default;">查無相符處室或教室</li>`;
      } else {
        searchResults.innerHTML = matches.slice(0, 8).map(r => {
          const catColor = CATEGORY_COLORS[r.cat] || "#2563eb";
          return `
            <li onclick="onSelectSearchRoom('${r.id}')">
              <span><b>${escapeRoomText(r.name)}</b> (${r.floor}F)</span>
              <div>
                <span class="rm-cat-tag" style="background:${catColor};">${r.floor}F</span>
                <span class="rm-bld">${r.buildingName}</span>
              </div>
            </li>
          `;
        }).join("");
      }
      searchResults.style.display = "block";
    });

    window.onSelectSearchRoom = (roomId) => {
      searchResults.style.display = "none";
      searchInput.value = ROOMS_DB[roomId].name;
      navigateToRoom(roomId);
    };

    document.querySelectorAll(".venue-chip").forEach(chip => {
      chip.onclick = () => navigateToRoom(chip.dataset.to);
    });

    document.getElementById("btn-cancel-nav").onclick = clearNavigation;

    // Welcome Guide Card Handlers (Matching media_1791335021168.png)
    const welcomeCard = document.getElementById("welcome-card");
    const btnEnterCampus = document.getElementById("welcome-btn-enter");
    const btnOverviewCampus = document.getElementById("welcome-btn-overview");
    const btnCloseWelcome = document.getElementById("btn-close-welcome");

    if (btnEnterCampus) {
      btnEnterCampus.onclick = () => {
        welcomeCard.classList.add("hidden");
        setControlMode("avatar");
      };
    }
    if (btnOverviewCampus) {
      btnOverviewCampus.onclick = () => {
        welcomeCard.classList.add("hidden");
        setControlMode("bird");
      };
    }
    if (btnCloseWelcome) {
      btnCloseWelcome.onclick = () => {
        welcomeCard.classList.add("hidden");
      };
    }

    document.getElementById("btn-home").onclick = () => {
      clearNavigation();
      setFloorFilter("all");
      welcomeCard.classList.remove("hidden");
      setControlMode("bird");
    };

    const helpModal = document.getElementById("help-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    document.getElementById("btn-help").onclick = () => {
      welcomeCard.classList.toggle("hidden");
    };
    document.getElementById("btn-close-help").onclick = () => {
      helpModal.classList.remove("open");
      modalBackdrop.classList.remove("open");
    };
    modalBackdrop.onclick = () => {
      helpModal.classList.remove("open");
      modalBackdrop.classList.remove("open");
      mapModal.classList.remove("open");
    };

    const mapModal = document.getElementById("campus-map-modal");
    document.getElementById("btn-map-overlay").onclick = () => {
      const mapImage = mapModal.querySelector("img[data-src]");
      if (mapImage && !mapImage.src) mapImage.src = mapImage.dataset.src;
      mapModal.classList.add("open");
    };
    document.getElementById("btn-close-map-modal").onclick = () => mapModal.classList.remove("open");

    // 2D High-Definition Minimap (115學年度官方平面圖精準繪製)
    const miniCanvas = document.getElementById("minimap-canvas");
    const miniCtx = miniCanvas.getContext("2d");
    miniCanvas.width = 360;
    miniCanvas.height = 360;

    const mapMinX = -135, mapMaxX = 115;
    const mapMinZ = -78, mapMaxZ = 102;
    const toMiniX = (x) => 16 + (x - mapMinX) / (mapMaxX - mapMinX) * 328;
    const toMiniZ = (z) => 16 + (z - mapMinZ) / (mapMaxZ - mapMinZ) * 328;

    function renderMinimap() {
      miniCtx.clearRect(0, 0, 360, 360);

      // 1. Campus Ground Base
      miniCtx.fillStyle = "#eeeade";
      miniCtx.fillRect(0, 0, 360, 360);

      // 2. Green Lawn Perimeter
      miniCtx.fillStyle = "#7b9555";
      miniCtx.fillRect(toMiniX(-130), toMiniZ(-74), toMiniX(110) - toMiniX(-130), toMiniZ(94) - toMiniZ(-74));

      // 3. Roads & Driveways (車道)
      miniCtx.fillStyle = "#8c4c3a";
      // 南側主幹道
      miniCtx.fillRect(0, toMiniZ(82), 360, toMiniZ(94) - toMiniZ(82));
      // 中央南北主車道 (直通北側)
      const roadW = 9 * (328 / 250);
      miniCtx.fillRect(toMiniX(48), toMiniZ(-74), roadW, toMiniZ(94) - toMiniZ(-74));

      // 車道白虛線
      miniCtx.strokeStyle = "#94a3b8";
      miniCtx.lineWidth = 1.2;
      miniCtx.setLineDash([4, 4]);
      miniCtx.beginPath();
      miniCtx.moveTo(toMiniX(52.5), toMiniZ(-70));
      miniCtx.lineTo(toMiniX(52.5), toMiniZ(84));
      miniCtx.moveTo(0, toMiniZ(88));
      miniCtx.lineTo(360, toMiniZ(88));
      miniCtx.stroke();
      miniCtx.setLineDash([]);

      // 斑馬線 (正門前)
      miniCtx.fillStyle = "#ffffff";
      for (let i = 0; i < 7; i++) {
        miniCtx.fillRect(toMiniX(-18 + i * 3), toMiniZ(82), 1.8, toMiniZ(94) - toMiniZ(82));
      }

      // 4. 操場及綜合球場 (西北側，水平橫向橢圓跑道)
      const trackCX = toMiniX(-84);
      const trackCZ = toMiniZ(-25);
      const trackW = 84 * (328 / 250) * 0.5;
      const trackH = 54 * (328 / 180) * 0.5;

      // 紅色PU跑道
      miniCtx.fillStyle = "#c93434";
      miniCtx.beginPath();
      miniCtx.ellipse(trackCX, trackCZ, trackW, trackH, 0, 0, Math.PI * 2);
      miniCtx.fill();

      // 白色跑道標線
      miniCtx.strokeStyle = "rgba(255,255,255,0.7)";
      miniCtx.lineWidth = 1.0;
      for (let r = 0.58; r < 0.96; r += 0.12) {
        miniCtx.beginPath();
        miniCtx.ellipse(trackCX, trackCZ, trackW * r, trackH * r, 0, 0, Math.PI * 2);
        miniCtx.stroke();
      }

      // 內圈綠色草皮
      miniCtx.fillStyle = "#22c55e";
      miniCtx.beginPath();
      miniCtx.ellipse(trackCX, trackCZ, trackW * 0.5, trackH * 0.5, 0, 0, Math.PI * 2);
      miniCtx.fill();

      // 操場內東半側綜合球場 / 排球場 (紅色)
      const inVbX = toMiniX(-84 + 10);
      const inVbZ = toMiniZ(-25 - 12);
      const inVbW = 16 * (328 / 250);
      const inVbH = 24 * (328 / 180);
      miniCtx.fillStyle = "#b91c1c";
      miniCtx.fillRect(inVbX, inVbZ, inVbW, inVbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1;
      miniCtx.strokeRect(inVbX, inVbZ, inVbW, inVbH);

      // 操場司令台 (位於南側直道下方)
      const standX = toMiniX(-62 - 8);
      const standZ = toMiniZ(12 - 3);
      const standW = 16 * (328 / 250);
      const standH = 7 * (328 / 180);
      miniCtx.fillStyle = "#3b82f6";
      miniCtx.fillRect(standX, standZ, standW, standH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.2;
      miniCtx.strokeRect(standX, standZ, standW, standH);

      // 5. 戶外排球場 (綠色, 位於操場與籃球場之間 x=-22, z=-38)
      const vbX = toMiniX(-22 - 7);
      const vbZ = toMiniZ(-38 - 14);
      const vbW = 14 * (328 / 250);
      const vbH = 28 * (328 / 180);
      miniCtx.fillStyle = "#16a34a";
      miniCtx.fillRect(vbX, vbZ, vbW, vbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.2;
      miniCtx.strokeRect(vbX, vbZ, vbW, vbH);

      // 6. 戶外籃球場群 (黃色, 3座全場, x=12, z=-38)
      const bbX = toMiniX(12 - 17);
      const bbZ = toMiniZ(-38 - 23);
      const bbW = 34 * (328 / 250);
      const bbH = 46 * (328 / 180);
      miniCtx.fillStyle = "#eab308";
      miniCtx.fillRect(bbX, bbZ, bbW, bbH);
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.lineWidth = 1.4;
      miniCtx.strokeRect(bbX, bbZ, bbW, bbH);

      // 7. 蘭亭與訓平池 (北側圍牆景觀區)
      const lanX = toMiniX(-18);
      const lanZ = toMiniZ(-66);
      miniCtx.fillStyle = "#44484b";
      miniCtx.beginPath();
      miniCtx.arc(lanX, lanZ, 5.5, 0, Math.PI * 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.stroke();

      const pondX = toMiniX(-2);
      const pondZ = toMiniZ(-66);
      miniCtx.fillStyle = "#0284c7";
      miniCtx.beginPath();
      miniCtx.arc(pondX, pondZ, 8, 0, Math.PI * 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#38bdf8";
      miniCtx.stroke();

      // 8. 蔣公銅像庭園 (x=-36, z=32)
      const statueX = toMiniX(-36);
      const statueZ = toMiniZ(32);
      miniCtx.fillStyle = "#b45309";
      miniCtx.beginPath();
      miniCtx.arc(statueX, statueZ, 4.5, 0, Math.PI * 2);
      miniCtx.fill();

      // 9. 綜合大樓平面停車場 (Parking Lot P, x=74, z=-23)
      const pLotX = toMiniX(74 - 12);
      const pLotZ = toMiniZ(-23 - 7.5);
      const pLotW = 24 * (328 / 250);
      const pLotH = 15 * (328 / 180);
      miniCtx.fillStyle = "#eeeade";
      miniCtx.fillRect(pLotX, pLotZ, pLotW, pLotH);
      miniCtx.strokeStyle = "#cbd5e1";
      miniCtx.lineWidth = 1;
      miniCtx.strokeRect(pLotX, pLotZ, pLotW, pLotH);

      // 10. Building Footprints
      BUILDINGS_CONFIG.forEach(cfg => {
        const bx = toMiniX(cfg.x - cfg.width / 2);
        const bz = toMiniZ(cfg.z - cfg.depth / 2);
        const bw = cfg.width * (328 / 250);
        const bh = cfg.depth * (328 / 180);

        const bldColors = {
          sports: "#b91c1c",
          admin: "#334155",
          grade8: "#d97706",
          grade9: "#059669",
          special: "#7c3aed",
          grade7: "#2563eb"
        };
        miniCtx.fillStyle = bldColors[cfg.category] || "#475569";
        miniCtx.fillRect(bx, bz, bw, bh);

        miniCtx.strokeStyle = "#ffffff";
        miniCtx.lineWidth = 1.5;
        miniCtx.strokeRect(bx, bz, bw, bh);

        // Building Label Text
        miniCtx.fillStyle = "#ffffff";
        miniCtx.font = "900 8.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        miniCtx.textAlign = "center";
        miniCtx.textBaseline = "middle";
        let miniName = cfg.name;
        if (cfg.id === "gym-bld") miniName = "活動中心";
        else if (cfg.id === "recycle-bld") miniName = "回收";
        else if (cfg.id === "admin-front") miniName = "行政前棟";
        else if (cfg.id === "admin-back") miniName = "行政後棟";
        else if (cfg.id === "health-bld") miniName = "健康/合作";
        else if (cfg.id === "grade8-front") miniName = "八年級(南棟)";
        else if (cfg.id === "grade9-back") miniName = "九年級";
        else if (cfg.id === "grade8-mid") miniName = "八年級(中)";
        else if (cfg.id === "art-building") miniName = "藝術館";
        else if (cfg.id === "tech-building") miniName = "科技館";
        else if (cfg.id === "multi-building") miniName = "綜合大樓";
        else if (cfg.id === "new-grade7") miniName = "七年級/特教";

        miniCtx.fillText(miniName, bx + bw / 2, bz + bh / 2);
      });

      // 八年級南棟西側半圓樓梯標記
      const roundStairX = toMiniX(16 - 22);
      const roundStairZ = toMiniZ(60);
      miniCtx.fillStyle = "#d97706";
      miniCtx.beginPath();
      miniCtx.arc(roundStairX, roundStairZ, 5 * (328 / 250), Math.PI / 2, 3 * Math.PI / 2);
      miniCtx.fill();
      miniCtx.strokeStyle = "#ffffff";
      miniCtx.stroke();

      // Outdoor Venue Labels
      miniCtx.fillStyle = "#ffffff";
      miniCtx.font = "900 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      miniCtx.textAlign = "center";
      miniCtx.textBaseline = "middle";
      miniCtx.fillText("操場", trackCX - 12, trackCZ);
      miniCtx.fillText("排球", inVbX + inVbW / 2, inVbZ + inVbH / 2);
      miniCtx.fillText("司令台", standX + standW / 2, standZ + standH / 2);
      miniCtx.fillText("銅像", statueX, statueZ + 8);
      miniCtx.fillText("排球場", vbX + vbW / 2, vbZ + vbH / 2);
      miniCtx.fillText("籃球場", bbX + bbW / 2, bbZ + bbH / 2);
      miniCtx.fillText("蘭亭", lanX, lanZ - 8);
      miniCtx.fillText("訓平池", pondX, pondZ - 8);
      miniCtx.fillText("P 停車場", pLotX + pLotW / 2, pLotZ + pLotH / 2);
      miniCtx.fillText("正門", toMiniX(-10), toMiniZ(88));
      miniCtx.fillText("車道", toMiniX(52.5), toMiniZ(12));
    }

    // Interactive Minimap Clicking
    // 定位小地圖只顯示人物位置，避免點擊意外傳送。

    function checkUrlQueryTarget() {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) {
        setTimeout(() => {
          if(ROOMS_DB[to])navigateToRoom(to);
          else {
            const building=BUILDINGS_CONFIG.find(b=>b.id===to);
            if(building){setControlMode('bird');focusBuilding(building)}
            else showToast('找不到此目的地，請使用上方搜尋');
          }
        },600);
      }
    }

    /* ==========================================================================
       10. MAIN ANIMATION LOOP
       ========================================================================== */
    const clock = new THREE.Clock();
    const avatarNametag = document.getElementById("avatar-nametag");

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      if(document.hidden)return;
      if(motionBlocked()){resetManualInput();stopAutoWalk();}
      window.campusMouse?.update(delta);

      let isMoving = false;
      const baseSpeed = moveInput.sprint ? avatarRunSpeed : avatarSpeed;
      const currentSpeed = baseSpeed * avatarSpeedMultiplier * delta;

      // 1. AUTO-WALK：每幀用完行走距離，可跨越數個相鄰節點。
      if (isAutoWalking && currentNavPoints.length > 1) {
        let remaining=14*avatarSpeedMultiplier*delta;
        for(let n=0;n<64 && remaining>1e-6 && isAutoWalking;n++){
          const point=currentNavPoints[autoWalkIndex+1];
          if(!point){stopAutoWalk();break;}
          const target=new THREE.Vector3(point.x,point.y-.6,point.z),p=avatarGroup.position;
          const dir=target.clone().sub(p),distance=dir.length();
          if(distance>1e-6){
            const amount=Math.min(distance,remaining);dir.multiplyScalar(amount/distance);
            if(moveAvatarWithCollision(p,dir.x,dir.z,dir.y)){
              stopAutoWalk();showToast('前方有牆壁，帶路已停止。請沿走廊或門口通行。');break;
            }
            isMoving=true;jumpBaseY=p.y;remaining-=amount;
            if(Math.hypot(dir.x,dir.z)>1e-6){avatarAngle=Math.atan2(dir.x,dir.z);avatarGroup.rotation.y=avatarAngle;}
            if(amount<distance-1e-6)break;
          }
          autoWalkIndex++;
          if(autoWalkIndex>=currentNavPoints.length-1){
            stopAutoWalk();if(navTargetPoint)navTargetPoint.visible=false;if(navPathMesh)navPathMesh.visible=false;
            document.getElementById('nav-hud').classList.remove('visible');showToast('已抵達目的地。');
          }
        }
      }
      // 2. MANUAL KEYBOARD / DPAD CONTROLS (Camera-Relative Movement)
      else if (avatarGroup && (currentMode === "avatar" || currentMode === "firstperson")) {
        // 滑鼠只改視線；A/D 主動轉向，W/S 沿視線前進／後退。
        avatarAngle += ((moveInput.left ? 1 : 0)-(moveInput.right ? 1 : 0))*1.9*turnSensitivityMultiplier*delta;
        if(moveInput.left||moveInput.right)avatarGroup.rotation.y=avatarAngle;
        const mobile=window.campusMobileControls;
        if(mobile&&(mobile.look.x||mobile.look.y))applyManualCameraRotation(mobile.look.x*540*delta,-mobile.look.y*350*delta);
        const forwardAmount=((moveInput.forward?1:0)-(moveInput.backward?1:0))+(mobile?.move.y||0),sideAmount=mobile?.move.x||0;
        const moveVec=new THREE.Vector3(Math.sin(avatarAngle)*forwardAmount-Math.cos(avatarAngle)*sideAmount,0,Math.cos(avatarAngle)*forwardAmount+Math.sin(avatarAngle)*sideAmount);

        if (moveVec.lengthSq() > 0.001) {
          isMoving = true;
          if(moveVec.lengthSq()>1)moveVec.normalize();
          avatarGroup.rotation.y = Math.atan2(moveVec.x,moveVec.z);

          const dx = moveVec.x * currentSpeed;
          const dz = moveVec.z * currentSpeed;
          const curPos = avatarGroup.position;

          // 1. Sliding Collision Check against Walls
          const beforeX = curPos.x, beforeZ = curPos.z;
          moveAvatarWithCollision(curPos, dx, dz);
          isMoving = Math.hypot(curPos.x-beforeX, curPos.z-beforeZ) > 0.0001;

          // 梯面、平台及樓板由相同的可行走配置提供高度。
        }
      }
      if (window.campusWalkWorld && avatarGroup && !isJumping && (currentMode==='avatar'||currentMode==='firstperson')) {
        const groundY=window.campusWalkWorld.ground(avatarGroup.position);
        avatarGroup.position.y=Math.max(groundY,avatarGroup.position.y-8*delta);
        jumpBaseY=avatarGroup.position.y;
      }

      // Space-bar Jump Hop (依據當前樓層地面高度落地，不穿破樓板)
      if (avatarGroup && isJumping) {
        // 查詢下降前腳底高度，落在目前梯面而非起跳樓層。
        const landingY=window.campusWalkWorld?window.campusWalkWorld.ground(avatarGroup.position):jumpBaseY;
        avatarGroup.position.y += jumpVelocity * delta;
        jumpVelocity -= 22 * delta;
        if (jumpVelocity <= 0 && avatarGroup.position.y <= landingY) {
          avatarGroup.position.y = landingY;
          jumpBaseY = landingY;
          jumpVelocity = 0;
          isJumping = false;
        }
      }

      // 3. AVATAR WALKING LIMB ANIMATION
      if (avatarGroup) {
        if (isMoving) {
          walkAnimCycle += delta * (moveInput.sprint ? 16 : 10);
          avatarLeftLeg.rotation.x = Math.sin(walkAnimCycle) * 0.65;
          avatarRightLeg.rotation.x = -Math.sin(walkAnimCycle) * 0.65;
          avatarLeftArm.rotation.x = -Math.sin(walkAnimCycle) * 0.55;
          avatarRightArm.rotation.x = Math.sin(walkAnimCycle) * 0.55;
        } else {
          avatarLeftLeg.rotation.x = 0;
          avatarRightLeg.rotation.x = 0;
          avatarLeftArm.rotation.x = 0;
          avatarRightArm.rotation.x = 0;
        }

        // 鏡頭依視線繞人物；人物面向實際行進方向，靜止時保持朝向。
        if(window.campusWalkWorld && currentMode!=='bird' && !isCameraAnimating)window.campusWalkWorld.updateCamera();
        prevAvatarPos.copy(avatarGroup.position);

        // Dynamic Floor Detection for Minimap Badge
        const currentAvatarY = avatarGroup.position.y;
        let detectedFloor = "1F";
        if (currentAvatarY >= 10.0) detectedFloor = "4F";
        else if (currentAvatarY >= 6.5) detectedFloor = "3F";
        else if (currentAvatarY >= 2.5) detectedFloor = "2F";
        const floorBadgeEl = document.getElementById("minimap-floor-badge");
        if (floorBadgeEl && currentFloorFilter === "all") {
          floorBadgeEl.textContent = detectedFloor;
        }

        // Nametag Screen Position
        const avatarScreenPos = avatarGroup.position.clone().add(new THREE.Vector3(0, 2.1, 0));
        avatarScreenPos.project(camera);
        if (avatarScreenPos.z > 1 || currentMode === "firstperson") {
          avatarNametag.style.display = "none";
        } else {
          avatarNametag.style.display = "block";
          const screenX = (avatarScreenPos.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(avatarScreenPos.y * 0.5) + 0.5) * window.innerHeight;
          avatarNametag.style.left = `${screenX}px`;
          avatarNametag.style.top = `${screenY}px`;
        }
      }

      // Always update OrbitControls so rotation/zoom NEVER freezes (skip during smooth camera tween)
      if (!isCameraAnimating && currentMode==='bird') {
        controls.update();
      }

      // 3D Floating Building Labels
      labelElements.forEach(item => {
        if(window.campusFloorExhibit?.active){item.element.style.display='none';return;}
        const wp = item.worldPos.clone();
        wp.project(camera);
        if (wp.z > 1 || currentMode !== "bird") {
          item.element.style.display = "none";
        } else {
          item.element.style.display = "block";
          const screenX = (wp.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(wp.y * 0.5) + 0.5) * window.innerHeight;
          item.element.style.left = `${screenX}px`;
          item.element.style.top = `${screenY}px`;
        }
      });

      // 3D Floating Landmark Pills (操場, 司令台, 籃球場, 大門, 停車場...)
      landmarkElements.forEach(item => {
        if (currentMode !== "bird") {
          item.element.style.display = "none";
          return;
        }
        const wp = item.worldPos.clone();
        wp.project(camera);
        if (wp.z > 1) {
          item.element.style.display = "none";
        } else {
          item.element.style.display = "block";
          const screenX = (wp.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-(wp.y * 0.5) + 0.5) * window.innerHeight;
          item.element.style.left = `${screenX}px`;
          item.element.style.top = `${screenY}px`;
        }
      });

      // 3D Floating Room Badges Position Updating
      const camDist = camera.position.distanceTo(controls.target);

      let shownRoomBadges=0;
      roomBadgeElements.forEach(item => {
        const node=NAV_NODES[item.nodeId];
        const wp=node?new THREE.Vector3(node.x,(node.y||0)+2.2,node.z).project(camera):null;
        const floor=currentFloorFilter==='all'?1:Number(currentFloorFilter);
        const visible=!window.campusFloorExhibit?.active && wp && wp.z<1 && Math.abs(wp.x)<.93 && Math.abs(wp.y)<.88 &&
          item.buildingId===focusedBuildingId && item.floor===floor && camDist<140 &&
          shownRoomBadges<(window.innerWidth<768?4:8);
        item.element.style.display=visible?'flex':'none';
        if(visible){
          shownRoomBadges++;
          item.element.style.left=`${(wp.x*.5+.5)*window.innerWidth}px`;
          item.element.style.top=`${(-wp.y*.5+.5)*window.innerHeight}px`;
        }
      });

      if (navTargetPoint && navTargetPoint.visible) {
        navTargetPoint.position.y = navTargetPoint.userData.baseY + Math.sin(clock.elapsedTime * 4) * 0.25;
      }

      renderMinimap();
      window.campusFloorExhibit?.update();
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });


    Object.assign(ROOMS_DB,{
      gate:{id:'gate',name:'校大門',buildingName:'正門廣場',floor:1,cat:'admin',node:'gate'},
      track:{id:'track',name:'操場及綜合球場',buildingName:'操場',floor:1,cat:'sports',node:'track-center'},
      breezeway:{id:'breezeway',name:'中央通廊',buildingName:'教學區',floor:1,cat:'special',node:'breezeway-mid'}
    });
    window.campusExplorer = {scene,camera,controls,buildings:BUILDINGS_CONFIG,rooms:ROOMS_DB,nodes:NAV_NODES,findShortestPath,navigateToRoom,setFloorFilter,setControlMode,manualTakeover,resetManualInput,motionBlocked};
    document.body.dataset.controlMode=currentMode;
    requestAnimationFrame(animate);
    checkUrlQueryTarget();


;
/* walk-world-math.js */
/* Walkable interior geometry is schematic; room floors follow campus-data.js. */
const CampusWalkMath = (() => {
 const H=3.6;
 const inside=(r,x,z)=>x>=r.x0-1e-6&&x<=r.x1+1e-6&&z>=r.z0-1e-6&&z<=r.z1+1e-6;
 function layout(b){
  if(typeof CampusSpatialPlan!=='undefined'&&b.spatialProfile)return CampusSpatialPlan.layout(b);
  const horizontal=b.width>=b.depth,L=horizontal?b.width:b.depth,D=horizontal?b.depth:b.width;
  const sign=(b.id==='grade8-front')?-1:(!horizontal&&b.id!=='grade9-back'&&b.id!=='gym-bld'?-1:1);
  const world=(u,v,y=0)=>horizontal?{x:b.x+u,z:b.z+v,y}:{x:b.x+v,z:b.z+u,y};
  const rect=(u0,u1,v0,v1)=>{const a=world(u0,v0),c=world(u1,v1);return{x0:Math.min(a.x,c.x),x1:Math.max(a.x,c.x),z0:Math.min(a.z,c.z),z1:Math.max(a.z,c.z)}};
  const cV=sign*(D/2-1.4),wallV=sign*(D/2-2.8),outerV=sign*D/2;
  const stairU=-L/2+6.4,farU=-L/2+1.2,nearU=-L/2+5.4;
  const floorHole=rect(-L/2+.4,nearU,-2.3,2.3),ramps=[],platforms=[],rooms=[];
  for(let f=1;f<b.floors;f++){
   const y=(f-1)*H;
   const a=world(nearU,sign*1.25,y),c=world(farU,sign*1.25,y+H/2);
   const d=world(farU,-sign*1.25,y+H/2),e=world(nearU,-sign*1.25,y+H);
   for(const [start,end] of [[a,c],[d,e]]){
    const bounds=rect(Math.min(horizontal?start.x-b.x:start.z-b.z,horizontal?end.x-b.x:end.z-b.z),Math.max(horizontal?start.x-b.x:start.z-b.z,horizontal?end.x-b.x:end.z-b.z), (horizontal?start.z-b.z:start.x-b.x)-.8,(horizontal?start.z-b.z:start.x-b.x)+.8);
    ramps.push({...bounds,start,end,h0:start.y,h1:end.y,axis:horizontal?'x':'z',floor:f});
   }
   platforms.push({...rect(-L/2+.4,farU+.08,-2.3,2.3),y:y+H/2});
  }
  const usable0=b.floors>1?-L/2+8:-L/2+1,usable1=L/2-1;
  for(let f=1;f<=b.floors;f++){
   const list=b.rooms.filter(r=>r.floor===f),w=(usable1-usable0)/Math.max(1,list.length);
   list.forEach((r,i)=>{const u0=usable0+i*w,u1=u0+w,u=(u0+u1)/2,y=(f-1)*H;
    rooms.push({...r,u0,u1,u,door:world(u,wallV,y),corridor:world(u,cV,y),center:world(u,(wallV-sign*D/2)/2,y)});
   });
  }
  return {id:b.id,b,horizontal,L,D,sign,cV,wallV,outerV,world,rect,stairU,farU,nearU,floorHole,ramps,platforms,rooms,entrance:world(0,outerV+sign*1.2),bounds:rect(-L/2,L/2,-D/2,D/2)};
 }
 function rampPoint(r,t){return{x:r.start.x+(r.end.x-r.start.x)*t,z:r.start.z+(r.end.z-r.start.z)*t,y:r.h0+(r.h1-r.h0)*t}}
 function groundAt(l,x,z,currentY){
  if(l.cells)return CampusSpatialPlan.groundAt(l,x,z,currentY);
  let best=0;
  if(inside(l.bounds,x,z))for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*H;
   if(y<=currentY+.35&&(f===1||!inside(l.floorHole,x,z)))best=Math.max(best,y);
  }
  for(const p of l.platforms)if(inside(p,x,z)&&p.y<=currentY+.35)best=Math.max(best,p.y);
  for(const r of l.ramps)if(inside(r,x,z)){
   const t=Math.max(0,Math.min(1,((r.axis==='x'?x:z)-(r.axis==='x'?r.start.x:r.start.z))/((r.axis==='x'?r.end.x:r.end.z)-(r.axis==='x'?r.start.x:r.start.z))));
   const y=r.h0+t*(r.h1-r.h0);if(y<=currentY+.35)best=Math.max(best,y);
  }
  return best;
 }
 function cameraPose(p,angle,pitch,first,distance=6.5){
  const sx=Math.sin(angle),sz=Math.cos(angle),eye=p.y+1.55,cp=Math.cos(pitch),sp=Math.sin(pitch);
  const position=first?{x:p.x,y:eye,z:p.z}:{x:p.x-sx*cp*distance,y:Math.max(p.y+.35,eye+1.0-sp*distance),z:p.z-sz*cp*distance};
  return{position,target:{x:p.x+sx*cp*6,y:eye+sp*6-(first?0:.3),z:p.z+sz*cp*6}};
 }
 return{layout,groundAt,rampPoint,cameraPose,inside};
})();

;
/* room-layout-model.js */
const CampusRoomLayout = (() => {
 const key=year=>`daxi-room-layout-v1-${year}`;
 const clean=name=>String(name??'').trim().slice(0,60);
 function normalize(value,rooms,aliases={}){
  const source=value&&typeof value==='object'?{...value}:{},legacy={},known=new Set(rooms.map(r=>r.id));
  for(const [oldId,id] of Object.entries(aliases))if(known.has(id)&&Object.hasOwn(source,oldId)){
   legacy[oldId]=clean(source[oldId]);
   if(!Object.hasOwn(source,id))source[id]=source[oldId];
  }
  const names={...legacy};for(const r of rooms)names[r.id]=clean(Object.hasOwn(source,r.id)?source[r.id]:r.name)||r.name;return names;
 }
 function parse(value,rooms,aliases={}){try{return normalize(JSON.parse(value),rooms,aliases)}catch{return normalize(null,rooms,aliases)}}
 function category(name,cat){const match=clean(name).match(/^([789])\d{2}(?:\s|$)/);return match?`grade${match[1]}`:cat==='admin'?'admin':cat==='special'?'special':'other';}
 const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
 function nameplate(name,cat){const text=clean(name).replace(/\s*\(\d+F\)/,''),color=colors[category(text,cat)];return{text,color,key:text+'|'+color};}
 return {key,normalize,parse,category,colors,nameplate};
})();

;
/* spatial-world.js */
/* Shared spatial model → geometry, collision, floor surfaces and navigation. */
(() => {
 const M=CampusWalkMath,layouts=BUILDINGS_CONFIG.map(M.layout),graph={},roomTargets={},oldNodes={...NAV_NODES};
 const node=(id,p,buildingId)=>{graph[id]={id,...p,buildingId,neighbors:[]};return id};
 const link=(a,b)=>{if(a!==b&&!graph[a].neighbors.includes(b)){graph[a].neighbors.push(b);graph[b].neighbors.push(a)}};
 const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.85});
 const colors={wall:material(0xf3f0e7),blue:material(0x9cbecb),floor:material(0xc5c1b5),stair:material(0xc7c4b9),wood:material(0x956941),green:material(0x315748),steel:material(0x61717a),light:material(0xfff9dd),glass:new THREE.MeshStandardMaterial({color:0xb0ced6,transparent:true,opacity:.45})};
 colors.light.emissive.setHex(0x8a8467);colors.light.emissiveIntensity=.4;
 const box=(group,l,u0,u1,v0,v1,y0,y1,mat,solid=false)=>{
  if(u1-u0<1e-5||v1-v0<1e-5||y1-y0<1e-5)return null;
  const r=l.rect(u0,u1,v0,v1),mesh=new THREE.Mesh(new THREE.BoxGeometry(r.x1-r.x0,y1-y0,r.z1-r.z0),mat);
  mesh.position.set((r.x0+r.x1)/2,(y0+y1)/2,(r.z0+r.z1)/2);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  if(solid){registerWallCollider(r.x0,r.x1,r.z0,r.z1,y0,y1);WALL_COLLIDERS.at(-1).buildingId=l.id;}
  return mesh;
 };
 const insideFloor=(l,x,z,floor)=>{const q=l.local(x,z);return l.footprints.some(p=>p.floor===floor&&CampusSpatialPlan.contains(p,q.u,q.v))};
 // Subtract the same stair holes that groundAt uses from every slab.
 function slab(g,l,p,y){
  const xs=[p.u0,p.u1],zs=[p.v0,p.v1];
  for(const h of l.holes){if(h.u0>p.u0&&h.u0<p.u1)xs.push(h.u0);if(h.u1>p.u0&&h.u1<p.u1)xs.push(h.u1);if(h.v0>p.v0&&h.v0<p.v1)zs.push(h.v0);if(h.v1>p.v0&&h.v1<p.v1)zs.push(h.v1)}
  xs.sort((a,b)=>a-b);zs.sort((a,b)=>a-b);
  for(let i=1;i<xs.length;i++)for(let j=1;j<zs.length;j++)if(y===0||!l.holes.some(h=>CampusSpatialPlan.contains(h,(xs[i-1]+xs[i])/2,(zs[j-1]+zs[j])/2)))box(g,l,xs[i-1],xs[i],zs[j-1],zs[j],y-.18,y,colors.floor);
 }
 function roomWall(g,l,c,side,y){
  const alongU=side[0]==='v',fixed=side==='v0'?c.v0:side==='v1'?c.v1:side==='u0'?c.u0:c.u1;
  const start=alongU?c.u0:c.v0,end=alongU?c.u1:c.v1,center=(start+end)/2;
  const wall=(a,b,y0,y1,mat,solid=true)=>alongU?box(g,l,a,b,fixed-.09,fixed+.09,y0,y1,mat,solid):box(g,l,fixed-.09,fixed+.09,a,b,y0,y1,mat,solid);
  if(c.doorSide===side){
   const half=Math.min(.95,(end-start)/2-.16);
   wall(start,center-half,y,y+FH,colors.wall);wall(center+half,end,y,y+FH,colors.wall);wall(center-half,center+half,y+2.3,y+FH,colors.wall);
  }else{
   const solid=wall(start,end,y,y+FH,colors.wall);if(solid)solid.visible=false;
   wall(start,end,y,y+1.05,colors.blue,false);wall(start,end,y+2.65,y+FH,colors.wall,false);
   wall(start+.2,end-.2,y+1.05,y+2.65,colors.glass,false);
   for(let u=start+.35;u<end-.2;u+=.6)wall(u-.022,u+.022,y+1.05,y+2.65,colors.steel,false);
  }
 }
 function details(g,l,r,y){
  const pp={...r.door,y:y+2.55},width=Math.min(2.5,r.doorSide.startsWith('v')?r.u1-r.u0-.2:r.v1-r.v0-.2);
  const label=CampusRoomLayout.nameplate(r.name,r.cat);
  const plate=new THREE.Mesh(new THREE.PlaneGeometry(width,.38),new THREE.MeshBasicMaterial({map:createRoomNameplateTexture(label.text,label.color),side:THREE.DoubleSide}));
  plate.position.set(pp.x,pp.y,pp.z);plate.rotation.y=r.doorSide.startsWith('u')?(l.horizontal?Math.PI/2:0):(l.horizontal?0:Math.PI/2);plate.userData.roomId=r.id;plate.userData.nameplateKey=label.key;g.add(plate);
  const office=r.cat==='admin',w=r.u1-r.u0,d=r.v1-r.v0;
  for(const side of [-1,1]){
   const alongU=r.doorSide.startsWith('u'),u=r.u+(alongU?0:side*w*.3),v=r.v+(alongU?side*d*.3:0);
   if(w<2.8||d<2.4)continue;
   box(g,l,u-.4,u+.4,v-.5,v+.5,y+.72,y+.8,colors.wood,true);
   for(const du of [-.3,.3])box(g,l,u+du-.025,u+du+.025,v-.43,v-.38,y,y+.72,colors.steel);
   box(g,l,u-.26,u+.26,v+.58,v+.83,y+.4,y+.48,colors.wood,true);
   if(office)box(g,l,u-.42,u+.42,v-.55,v-.5,y+.8,y+1.3,colors.blue,true);
  }
  box(g,l,r.u1-.16,r.u1-.08,r.v0+.3,r.v1-.3,y+1.05,y+2.3,office?colors.wall:colors.green);
  box(g,l,r.u-.7,r.u+.7,r.v-.12,r.v+.12,y+FH-.22,y+FH-.2,colors.light);
 }
 // Retain existing outer ornament; replace old floors, stair meshes and roofs for shaped wings.
 for(let i=WALL_COLLIDERS.length-1;i>=0;i--)if(WALL_COLLIDERS[i].buildingId)WALL_COLLIDERS.splice(i,1);
 STAIR_ZONES.length=0;
 for(const l of layouts){
  const parent=scene.children.find(g=>g.userData.buildingId===l.id);
  for(const child of [...parent.children])if(child.name.startsWith('floor-')||child.userData.oldStairs||(l.b.spatialProfile.shape&&child.userData.roof)){
   parent.remove(child);child.traverse(o=>{if(o.geometry)o.geometry.dispose()});const i=floorMeshes.indexOf(child);if(i>=0)floorMeshes.splice(i,1);
  }
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,g=new THREE.Group();g.name=`floor-${f}`;g.userData={buildingId:l.id,floorNum:f};scene.add(g);floorMeshes.push(g);
   for(const p of l.footprints.filter(p=>p.floor===f)){slab(g,l,p,y);
    if(f===l.b.floors){const roof=box(g,l,p.u0,p.u1,p.v0,p.v1,y+FH-.18,y+FH,colors.wall);if(roof)roof.userData.roof=true;}
   }
   // Rooms and WC use identical rectangles for visible walls and blocking volumes.
   for(const r of l.cells.filter(c=>c.floor===f&&(c.kind==='room'||c.kind==='wc'))){
    for(const side of ['u0','u1','v0','v1'])roomWall(g,l,r,side,y);
    if(r.kind==='room')details(g,l,r,y);
   }
   // Corridor edges: split against footprint intersections so internal joints stay open.
   const parts=l.footprints.filter(p=>p.floor===f),us=[...new Set(parts.flatMap(p=>[p.u0,p.u1]))].sort((a,b)=>a-b),vs=[...new Set(parts.flatMap(p=>[p.v0,p.v1]))].sort((a,b)=>a-b);
   const present=(u,v)=>parts.some(p=>u>p.u0+1e-5&&u<p.u1-1e-5&&v>p.v0+1e-5&&v<p.v1-1e-5);
   function edge(alongU,fixed,a,b){
    const u=alongU?(a+b)/2:fixed,v=alongU?fixed:(a+b)/2;
    const corridor=l.corridors.some(p=>p.floor===f&&CampusSpatialPlan.contains(p,u,v));if(!corridor)return;
    const min=alongU?a:fixed-.09,max=alongU?b:fixed+.09,v0=alongU?fixed-.09:a,v1=alongU?fixed+.09:b;
    // Open corridor ends, and all 1F access edges. Upper corridor parapets stay solid.
    const open=f===1||(!l.b.spatialProfile.shape&& !alongU);
    if(!open)box(g,l,min,max,v0,v1,y,y+1.05,colors.wall,true);
    // Space columns away from doors and corridor ends.
    for(let t=a+1;t<b-1;t+=6)if(f!==1)box(g,l,alongU?t-.13:fixed-.13,alongU?t+.13:fixed+.13,alongU?fixed-.13:t-.13,alongU?fixed+.13:t+.13,y,y+FH,colors.wall,true);
   }
   for(const v of vs)for(let i=1;i<us.length;i++){const u=(us[i]+us[i-1])/2;if(present(u,v-.02)!==present(u,v+.02))edge(true,v,us[i-1],us[i]);}
   for(const u of us)for(let i=1;i<vs.length;i++){const v=(vs[i]+vs[i-1])/2;if(present(u-.02,v)!==present(u+.02,v))edge(false,u,vs[i-1],vs[i]);}
   for(const p of l.corridors.filter(p=>p.floor===f)){
    const longU=p.u1-p.u0>=p.v1-p.v0;
    for(let t=(longU?p.u0:p.v0)+1.2;t<(longU?p.u1:p.v1);t+=1.2)box(g,l,longU?t-.008:p.u0,longU?t+.008:p.u1,longU?p.v0:t-.008,longU?p.v1:t+.008,y+.002,y+.01,colors.steel);
   }
  }
  for(const s of l.stairs)for(let f=1;f<l.b.floors;f++){
   const g=new THREE.Group();g.name=`floor-stairs-${f+1}`;g.userData={buildingId:l.id,floorNum:f+1};scene.add(g);floorMeshes.push(g);
   const ramps=l.ramps.filter(r=>r.stairId===s.id&&r.floor===f),p=l.platforms.find(p=>p.stairId===s.id&&p.floor===f);
   box(g,l,s.u0+.2,s.farU+.08,s.centerV-2.3,s.centerV+2.3,p.y-.16,p.y,colors.stair);
   for(const r of ramps){
    registerStairZone((r.x0+r.x1)/2,(r.z0+r.z1)/2,r.x1-r.x0,r.z1-r.z0,r.h0,r.h1,f,f+1,r.axis,r.axis==='x'?Math.sign(r.end.x-r.start.x):Math.sign(r.end.z-r.start.z));
    for(let i=0;i<18;i++){const mid=M.rampPoint(r,(i+.5)/18),mesh=new THREE.Mesh(new THREE.BoxGeometry(l.horizontal?Math.abs(r.end.x-r.start.x)/18:1.6,.16,l.horizontal?1.6:Math.abs(r.end.z-r.start.z)/18),colors.stair);mesh.position.set(mid.x,mid.y-.08,mid.z);g.add(mesh);}
    for(const side of [-1,1]){const a=new THREE.Vector3(r.start.x,r.start.y+.9,r.start.z),c=new THREE.Vector3(r.end.x,r.end.y+.9,r.end.z);if(l.horizontal){a.z+=side*.78;c.z+=side*.78}else{a.x+=side*.78;c.x+=side*.78}const rail=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,a.distanceTo(c),8),colors.steel);rail.position.copy(a).add(c).multiplyScalar(.5);rail.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),c.sub(a).normalize());g.add(rail);}
   }
  }
 }
 // Administrative galleries are compiled once and shared with the map and ground engine.
 const galleries=CampusSpatialPlan.galleries(layouts),front=layouts.find(l=>l.id==='admin-front'),back=layouts.find(l=>l.id==='admin-back');
 for(const l of galleries){
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,g=new THREE.Group();g.name=`floor-gallery-${f}`;g.userData={buildingId:'admin-front',floorNum:f};scene.add(g);floorMeshes.push(g);
   for(const p of l.footprints.filter(p=>p.floor===f))box(g,l,p.u0,p.u1,p.v0,p.v1,y-.18,y,colors.floor);
   for(const r of l.rails.filter(r=>r.floor===f))box(g,l,r.u0,r.u1,r.v0,r.v1,y,y+1,colors.wall,true);
  }
 }
 layouts.push(...galleries);
 // Static batching retains low draw calls despite the extra circulation details.
 for(const g of scene.children.filter(g=>g.type==='Group'&&g.name.startsWith('floor-'))){
  const batches=new Map();for(const mesh of [...g.children])if(mesh.isMesh&&mesh.visible&&!mesh.userData.roof&&!mesh.material.map&&!Array.isArray(mesh.material)){
   mesh.updateMatrix();const geo=(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone()).applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,{p:[],n:[],uv:[]});const data=batches.get(mesh.material);
   for(const [name,key] of [['position','p'],['normal','n'],['uv','uv']]){const a=geo.getAttribute(name);if(a)for(const v of a.array)data[key].push(v)}geo.dispose();mesh.geometry.dispose();g.remove(mesh);
  }
  for(const [mat,data] of batches){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));if(data.uv.length)geo.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=mesh.receiveShadow=true;g.add(mesh)}
 }
 window.campusCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,AVATAR_COLLISION_RADIUS,AVATAR_HEIGHT);
 function floorAt(position){
  const y=position.y,l=layouts.find(l=>M.inside(l.bounds,position.x,position.z)&&insideFloor(l,position.x,position.z,Math.max(1,Math.round(y/FH)+1)));
  if(l)return M.groundAt(l,position.x,position.z,y);
  return CampusOutdoorPlan.ground(position);
 }
 // Static graph requests share BFS work. Runtime searches use fresh state.
 const startupSearches=new Map();let buildingGraph=true;
 // Four-connected grid connectors reject blocked edges, floor holes and courtyard voids.
 function gridPath(start,end,y=0,interior=null,stageSurface=false){
  const step=(interior||stageSurface)?.35:1,origin=stageSurface?{x:CampusOutdoorPlan.stage.x0-1,z:CampusOutdoorPlan.stage.stairs.z0-1}:interior?{x:interior.bounds.x0-1,z:interior.bounds.z0-1}:{x:-130,z:-100},round=p=>({x:Math.round((p.x-origin.x)/step),z:Math.round((p.z-origin.z)/step)}),a=round(start),b=round(end),f=Math.round(y/FH)+1;
  const searchKey=`${stageSurface?'stage':interior?.id||'outdoor'}/${y}/${a.x},${a.z}`;
  let state=buildingGraph?startupSearches.get(searchKey):null;if(!state){state=CampusGridSearch.create(a);if(buildingGraph)startupSearches.set(searchKey,state)}
  const stageFree=(x,z)=>CampusOutdoorPlan.onStage({x,z,y})&&Math.abs(CampusOutdoorPlan.ground({x,z})-y)<.15;
  const free=(x,z)=>{const wx=origin.x+x*step,wz=origin.z+z*step;
   return ((wx>=-125&&wx<=115&&wz>=-100&&wz<=108)||CampusEntranceAvenue.contains(wx,wz))&&!checkWallCollision(wx,y,wz)&&(stageSurface?stageFree(wx,wz):interior?insideFloor(interior,wx,wz,f)&&Math.abs(M.groundAt(interior,wx,wz,y)-y)<.15:!CampusOutdoorPlan.reserved({x:wx,z:wz})&&!layouts.some(l=>insideFloor(l,wx,wz,1)))};
  const clear=(p,q)=>{const dist=Math.hypot(p.x-q.x,p.z-q.z),steps=Math.max(1,Math.ceil(dist/.12));for(let i=0;i<=steps;i++){const t=i/steps,x=p.x+(q.x-p.x)*t,z=p.z+(q.z-p.z)*t;if(checkWallCollision(x,y,z)||(stageSurface?!stageFree(x,z):!interior&&CampusOutdoorPlan.reserved({x,z}))||(interior&&(!insideFloor(interior,x,z,f)||Math.abs(M.groundAt(interior,x,z,y)-y)>.15)))return false}return true};
  const points=CampusGridSearch.path(state,b,free);if(points){const result=points.map(p=>({x:origin.x+p.x*step,y,z:origin.z+p.z*step}));
    if(result.length===1)return clear(start,end)?[{...start},{...end}]:null;
    if(!clear(start,result[1])||!clear(result.at(-2),end))return null;result[0]={...start};result[result.length-1]={...end};return result;
  }
  return null;
 }
 function attachPath(idA,idB,path,buildingId){if(!path)return false;let prev=idA;path.slice(1,-1).forEach((p,i)=>{const next=node(`${idA}-${idB}-p${i}`,p,buildingId);link(prev,next);prev=next});link(prev,idB);return true}
 const hubs={};
 for(const l of layouts){
  if(l.paths)continue;
  for(let f=1;f<=l.b.floors;f++){
   const y=(f-1)*FH,c=l.corridors.find(c=>c.floor===f),p=l.world((c.u0+c.u1)/2,(c.v0+c.v1)/2,y),hub=node(`${l.id}-entry-${f}`,p,l.id);hubs[`${l.id}-${f}`]=hub;
   for(const r of l.rooms.filter(r=>r.floor===f)){
    const corridor=node(`walk-${r.id}-corridor`,r.corridor,l.id),door=node(`walk-${r.id}-door`,r.door,l.id),target=node(`walk-${r.id}`,r.center,l.id);link(corridor,door);link(door,target);roomTargets[r.id]=target;
    const old=ROOMS_DB[r.id].node;ROOMS_DB[r.id].node=target;ROOMS_DB[r.id].spaceCode=r.spaceCode;const badge=roomBadgeElements.find(e=>e.nodeId===old);if(badge)badge.nodeId=target;
    attachPath(hub,corridor,gridPath(p,r.corridor,y,l),l.id);
   }
   for(const s of l.stairs){
    for(const [label,v] of [['lower',s.centerV+s.sign*1.25],['upper',s.centerV-s.sign*1.25]]){
     const q=l.world(s.innerU,v,y),id=node(`${s.id}-${label}-${f}`,q,l.id);attachPath(hub,id,gridPath(p,q,y,l),l.id);
    }
   }
  }
  for(const s of l.stairs)for(let f=1;f<l.b.floors;f++){
   let previous=`${s.id}-lower-${f}`;
   for(const [ri,r] of l.ramps.filter(r=>r.stairId===s.id&&r.floor===f).entries()){
    if(ri===1){const turn=node(`${s.id}-turn-${f}`,l.world(s.farU,s.centerV-s.sign*1.25,(f-.5)*FH),l.id);link(previous,turn);previous=turn;}
    for(let i=0;i<=18;i++){const n=node(`${s.id}-ramp-${f}-${ri}-${i}`,M.rampPoint(r,i/18),l.id);link(previous,n);previous=n;}
   }
   link(previous,`${s.id}-upper-${f+1}`);
  }
 }
 for(const gallery of galleries)for(const {floor:f,points:pts} of gallery.paths){
  const y=(f-1)*FH;
  let previous=hubs[`admin-back-${f}`];
  const start=node(`admin-gallery-start-${f}`,pts[0],'admin-back');attachPath(previous,start,gridPath(graph[previous],pts[0],y,back),'admin-back');previous=start;
  for(let i=1;i<pts.length;i++){const id=node(`admin-gallery-${f}-${i}`,pts[i],gallery.id);link(previous,id);previous=id}
  attachPath(previous,hubs[`admin-front-${f}`],gridPath(pts.at(-1),graph[hubs[`admin-front-${f}`]],y,front),'admin-front');
 }
 const gate=node('gate',{x:-10,y:0,z:90});
 for(const l of layouts)for(const [i,e] of l.entrances.entries()){
  const steps=Math.ceil(Math.hypot(e.outside.x-e.inside.x,e.outside.z-e.inside.z)/.12);
  if(Array.from({length:steps+1},(_,j)=>j/steps).some(t=>checkWallCollision(e.inside.x+(e.outside.x-e.inside.x)*t,0,e.inside.z+(e.outside.z-e.inside.z)*t)))continue;
  const exterior=node(`${l.id}-outside-${i}`,e.outside),inside=node(`${l.id}-entrance-${i}`,e.inside,l.id);link(exterior,inside);
  const hub=hubs[`${l.id}-1`];attachPath(inside,hub,gridPath(e.inside,graph[hub],0,l),l.id);
  // Detached rooms get their own entrance; no route crosses the parking void.
  for(const r of l.rooms.filter(r=>r.floor===1))attachPath(inside,`walk-${r.id}-corridor`,gridPath(e.inside,r.corridor,0,l),l.id);
  attachPath(gate,exterior,gridPath(graph[gate],e.outside));
 }
 const stageFoot=node('stage-outdoor-foot',{...CampusOutdoorPlan.stage.foot});
 attachPath(gate,stageFoot,gridPath(graph[gate],graph[stageFoot]));
 let stagePrevious=stageFoot;
 for(const [i,p] of CampusOutdoorPlan.stairsPath().entries()){const id=node(`stage-outdoor-stair-${i}`,p);link(stagePrevious,id);stagePrevious=id;}
 const podium=node('stand-podium',{...CampusOutdoorPlan.stage.center});link(stagePrevious,podium);roomTargets.grandstand=podium;
 for(const room of Object.values(ROOMS_DB))if(!roomTargets[room.id]&&room.node!=='gate'){
  const old=oldNodes[room.node];if(!old)continue;let p=room.id==='guard'?{x:6,y:0,z:90}:{x:old.x,y:0,z:old.z};const l=layouts.find(l=>insideFloor(l,p.x,p.z,1));if(l)p=l.entrance;
  const target=node(room.node,p);attachPath(gate,target,gridPath(graph[gate],p));
 }
 for(const [alias,id] of Object.entries(CampusSpatialData.aliases))ROOMS_DB[alias]={...ROOMS_DB[id],id:alias,aliasFor:id};
 Object.keys(NAV_NODES).forEach(k=>delete NAV_NODES[k]);Object.assign(NAV_NODES,graph);
 buildingGraph=false;startupSearches.clear();
 function route(position,room){
  const target=graph[room.node];if(!target)return null;
  let stageExit=CampusOutdoorPlan.exitPath(position);
  if(stageExit){
   if(CampusOutdoorPlan.inside(CampusOutdoorPlan.stage,position)){
    const path=gridPath(position,{x:-62,y:1.4,z:8.1},1.4,null,true);if(!path)return null;
    stageExit=[...path,...CampusOutdoorPlan.stairsPath().reverse().slice(1),{...CampusOutdoorPlan.stage.foot}];
   }
   const ids=findShortestPath(stageFoot,room.node);return ids?[...stageExit,...ids.slice(1).map(id=>graph[id])]:null;
  }
  const f=Math.max(1,Math.round(position.y/FH)+1),l=layouts.find(l=>insideFloor(l,position.x,position.z,f));
  let connector=null,start=null;
  const candidates=Object.values(graph).filter(n=>Math.abs(n.y-position.y)<.36&&(l?n.buildingId===l.id:n.id==='gate'||n.id.includes('-outside-'))).sort((a,b)=>Math.hypot(a.x-position.x,a.z-position.z)-Math.hypot(b.x-position.x,b.z-position.z));
  for(const n of candidates.slice(0,20)){const path=gridPath(position,n,position.y,l);if(path){start=n.id;connector=path;break}}
  if(!start)return null;const ids=findShortestPath(start,room.node);return ids?[...connector,...ids.slice(1).map(id=>graph[id])]:null;
 }
 function updateCamera(){
  const pose=M.cameraPose(avatarGroup.position,avatarAngle,walkPitch,currentMode==='firstperson',window.campusMouse?.distance||6.5),eye=new THREE.Vector3(avatarGroup.position.x,avatarGroup.position.y+1.55,avatarGroup.position.z),desired=new THREE.Vector3(pose.position.x,pose.position.y,pose.position.z);
  const l=layouts.find(l=>insideFloor(l,avatarGroup.position.x,avatarGroup.position.z,Math.max(1,Math.round(avatarGroup.position.y/FH)+1)));
  if(l){desired.y=Math.min(desired.y,(Math.floor((avatarGroup.position.y+.1)/FH)+1)*FH-.3);if(currentMode==='avatar')desired.lerp(eye,.5)}
  const fov=l?70:60;if(camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix()}
  const cameraGround=p=>{let y=floorAt(p);for(const layout of layouts)for(const r of layout.ramps)if(M.inside(r,p.x,p.z)&&avatarGroup.position.y>=r.h0-.35&&avatarGroup.position.y<=r.h1+.35){const t=Math.max(0,Math.min(1,((r.axis==='x'?p.x:p.z)-(r.axis==='x'?r.start.x:r.start.z))/((r.axis==='x'?r.end.x:r.end.z)-(r.axis==='x'?r.start.x:r.start.z))));y=Math.max(y,r.h0+t*(r.h1-r.h0))}return y};
  const clear=currentMode==='avatar'?CampusMouseModel.cameraClear(eye,desired,cameraGround,p=>window.campusCollisionIndex.pointHit(p.x,p.y,p.z)):1;
  camera.position.copy(eye).lerp(desired,clear);controls.target.set(pose.target.x,pose.target.y,pose.target.z);camera.lookAt(controls.target);avatarGroup.visible=currentMode==='avatar'&&clear>.2;
 }
 let touch=null;renderer.domElement.addEventListener('touchstart',e=>{if(currentMode!=='bird'&&e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
 renderer.domElement.addEventListener('touchmove',e=>{if(!touch||currentMode==='bird')return;const p=e.touches[0];if(!p)return;applyManualCameraRotation(p.clientX-touch.x,p.clientY-touch.y);touch={x:p.clientX,y:p.clientY};e.preventDefault()},{passive:false});renderer.domElement.addEventListener('touchend',()=>touch=null);
 const roomAt=p=>{const f=Math.floor((p.y+.15)/FH)+1;for(const l of layouts){const q=l.local(p.x,p.z),r=l.rooms.find(r=>r.floor===f&&CampusSpatialPlan.contains(r,q.u,q.v));if(r)return r}return null};
 window.campusWalkWorld={layouts,graph,ground:floorAt,route,gridPath,updateCamera,roomAt,galleries,insideFloor};
})();

;
/* photo-facade.js */
/* admin-front match: S__66011285–95 + aerial 05/11. Room names/floors stay in the plan.
 * Attachments are independent of the replaced legacy floor groups.
 */
(()=>{
 const api=window.campusExplorer,b=BUILDINGS_CONFIG.find(b=>b.id==='admin-front');if(!api||!b)return;
 const materials=new Map(),mat=c=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.85}));return materials.get(c)};
 function group(f,name){const g=new THREE.Group();g.name=name;g.userData={buildingId:b.id,floorNum:f};api.scene.add(g);floorMeshes.push(g);return g}
 function box(g,w,h,d,x,y,z,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);return m}
 const frontZ=b.z+b.depth/2,cream=0xece9df,white=0xe9e9e3,teal=0x447b79;
 // The circulation facade is open at 1F. No glass sheet or pillar closes a doorway.
 for(let f=1;f<=b.floors;f++){
  const g=group(f,`photo-admin-facade-${f}`),y=(f-1)*FH;
  box(g,b.width,.22,.24,b.x,y+FH-.05,frontZ+.13,cream);
  for(const x of [b.x-b.width/2+.4,b.x+b.width/2-.4])box(g,.38,FH,.3,x,y+FH/2,frontZ+.05,white);
  if(f>1)for(let x=b.x-b.width/2+.9;x<b.x+b.width/2-1.3;x+=1.25){
   const l=api.walkWorld?.layouts?.find(l=>l.id===b.id)||window.campusWalkWorld.layouts.find(l=>l.id===b.id);
   const q=l.local(x+.58,frontZ),cell=l.cells.find(c=>c.floor===f&&q.u>=c.u0&&q.u<=c.u1);
   if(cell?.kind==='passage'||cell?.kind==='stair')continue;
   for(const dx of [0,1.15])box(g,.045,1.35,.12,x+dx,y+1.85,frontZ+.17,white);
   for(const dy of [-.67,0,.67])box(g,1.15,.045,.12,x+.58,y+1.85+dy,frontZ+.17,white);
  }
 }
 const entrance=group(1,'photo-admin-entrance');
 // Two entrance columns flank the existing clear central path (x ± 2.1).
 for(const x of [b.x-2.65,b.x+2.65]){
  box(entrance,.25,3.25,.3,x,1.625,frontZ+1.6,cream);
  registerWallCollider(x-.125,x+.125,frontZ+1.45,frontZ+1.75,0,3.25);
 }
 window.campusCollisionIndex=CampusCollisionGrid.create(WALL_COLLIDERS,AVATAR_COLLISION_RADIUS,AVATAR_HEIGHT);
 box(entrance,6.2,.18,2.05,b.x,3.3,frontZ+.85,cream);
 // Open sliding glass leaves flank the central clear passage.
 const glass=new THREE.MeshStandardMaterial({color:0x9bbbc2,transparent:true,opacity:.35,roughness:.2});
 for(const sign of [-1,1]){
  const x=b.x+sign*1.75,pane=new THREE.Mesh(new THREE.BoxGeometry(.8,2.2,.035),glass);pane.position.set(x,1.15,frontZ+.15);entrance.add(pane);
  for(const dx of [-.4,.4])box(entrance,.035,2.2,.06,x+dx,1.15,frontZ+.15,teal);
  box(entrance,.8,.035,.06,x,2.25,frontZ+.15,teal);
 }
 for(const x of [b.x-3.35,b.x+3.35]){
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,2.8,12,1,false,0,Math.PI),mat(cream));wall.position.set(x,1.4,frontZ+.35);entrance.add(wall);
 }
 // Low entrance threshold and flank ramp are visual guides at the existing zero-level entrance.
 box(entrance,4.1,.045,1.15,b.x,.025,frontZ+.65,0xc4c0b5);
 const ramp=box(entrance,1.2,.08,3.1,b.x+4.35,.06,frontZ+1.5,0xc4c0b5);ramp.rotation.x=-.02;
 for(const x of [b.x+3.75,b.x+4.95])for(const h of [.55,.9]){
  box(entrance,.035,.035,3.1,x,h,frontZ+1.5,0xaab5b4);
  for(const z of [frontZ+.1,frontZ+1.5,frontZ+2.9])box(entrance,.035,h,.035,x,h/2,z,0xaab5b4);
 }
 for(const x of [b.x-3.9,b.x+5.9]){const urn=new THREE.Mesh(new THREE.CylinderGeometry(.36,.2,.6,12),mat(0xcdcec4));urn.position.set(x,.3,frontZ+.65);entrance.add(urn)}
 // Two-colour low roof surfaces follow the matched aerial, retaining roof-cut controls.
 const oldRoofs=[];api.scene.traverse(o=>{if(o.userData?.buildingId===b.id&&o.userData.roof)oldRoofs.push(o)});
 for(const o of oldRoofs){o.parent?.remove(o);const i=floorMeshes.indexOf(o);if(i>=0)floorMeshes.splice(i,1);o.geometry?.dispose()}
 const roof=group(b.floors,'photo-admin-roof');roof.userData.roof=true;
 const h=b.floors*FH,rise=1.35,halfDepth=b.depth/2+.55,slope=Math.atan2(rise,halfDepth),length=Math.hypot(halfDepth,rise);
 for(const z of [b.z-b.depth/2-.55,b.z+b.depth/2+.55])box(roof,b.width+1.6,.1,.17,b.x,h+.04,z,teal);
 for(const sign of [-1,1]){
  const panel=box(roof,b.width+1.6,.1,length,b.x,h+.15+rise/2,b.z+sign*halfDepth/2,sign>0?0xb65f54:0xc9c5a5);panel.rotation.x=sign*slope;
 }
 // Ribs share the slope and elevation of the roof panels.
 for(let x=b.x-b.width/2;x<=b.x+b.width/2;x+=.6)for(const sign of [-1,1]){
  const rib=box(roof,.025,.025,length,x,h+.22+rise/2,b.z+sign*halfDepth/2,sign>0?0xb16b5e:0xb8b398);rib.rotation.x=sign*slope;
 }
 // Source-backed garden landmarks stay clear of the central route.
 const garden=group(1,'photo-admin-garden');
 for(const x of [b.x-5,b.x+7.5]){
  box(garden,2.4,.28,2.5,x,.14,frontZ+4.4,0x9c9e80);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.22,3.1,8),mat(0x705c46));trunk.position.set(x,1.55,frontZ+4.4);garden.add(trunk);
  for(let i=0;i<3;i++){const crown=new THREE.Mesh(new THREE.ConeGeometry(1.3-i*.2,3.2,8),mat(i%2?0x4b6c43:0x567c45));crown.position.set(x,3.2+i*.8,frontZ+4.4);garden.add(crown)}
 }
 const cube=new THREE.Group();cube.position.set(b.x+9,.8,frontZ+4.1);cube.rotation.set(.25,.35,.25);garden.add(cube);
 for(let x=0;x<3;x++)for(let y=0;y<3;y++)for(let z=0;z<3;z++)if(x===0||x===2||y===0||y===2||z===0||z===2)box(cube,.35,.35,.35,(x-1)*.38,(y-1)*.38,(z-1)*.38,[0xb94a44,0xc9aa48,0x518663,0x538a9b][(x+y+z)%4]);
 const peacock=new THREE.Mesh(new THREE.CircleGeometry(.85,12,0,Math.PI),mat(0x568374));peacock.position.set(b.x-9,.25,frontZ+4);garden.add(peacock);
 // The source only demonstrates the shape, not botanical or equipment identities.
})();

;
/* art-direction.js */
/* 美術層：配置與路徑沿用 campus-data.js / explorer.js，裝飾不提供碰撞。 */
(() => {
  const api=window.campusExplorer;
  if(!api)return;
  const {scene,camera,controls}=api;
  const palette={stone:0xd0c9bd,brick:0xb88d84,leaf:0x567657,soil:0x8d7761};
  const materials=new Map();
  const mat=color=>{if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.86}));return materials.get(color)};
  const decor=new THREE.Group();decor.name='campus-landscape-refinement';scene.add(decor);
  function box(w,h,d,x,y,z,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;decor.add(m);return m}
  function tiledTexture(wall=false){
    const cvs=document.createElement('canvas');cvs.width=cvs.height=256;
    const ctx=cvs.getContext('2d');ctx.fillStyle=wall?'#b88d84':'#c7c8b7';ctx.fillRect(0,0,256,256);
    const size=wall?16:32;
    for(let y=0;y<256;y+=size)for(let x=0;x<256;x+=size){
      const brightness=wall?136+(x+y)%24:180+(x*3+y)%19;
      ctx.fillStyle=wall?`rgb(${brightness+25},${brightness},${brightness-7})`:`rgb(${brightness+14},${brightness+14},${brightness+2})`;
      ctx.fillRect(x+1,y+1,size-2,size-2);
    }
    const texture=new THREE.CanvasTexture(cvs);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(wall?3:8,wall?2:8);texture.encoding=THREE.sRGBEncoding;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return texture;
  }
  const paver=new THREE.MeshStandardMaterial({map:tiledTexture(),roughness:.93});
  function paved(w,d,x,z){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,d),paver);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.035,z);mesh.receiveShadow=true;decor.add(mesh)}
  // 前庭與銅像廣場，以及校舍之間可通行的硬鋪面。
  paved(56,30,-32,61);paved(28,26,-40,32);paved(22,42,15,28);
  paved(8,118,44,8);paved(42,7,12,51);paved(40,7,12,6);
  function planter(x,z,w,d){
    box(w,.32,d,x,.17,z,0xbfc7af);box(w-.35,.08,d-.35,x,.37,z,palette.soil);
    for(let i=0;i<Math.max(2,Math.floor(w/1.5));i++){
      const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.66,1),mat(i%2?0x557a52:0x719461));leaf.scale.set(1,.65,.85);leaf.position.set(x-w/2+.85+i*1.3,.77,z);leaf.castShadow=true;decor.add(leaf);
    }
  }
  for(const x of [11,19])for(const z of [16,29,41])planter(x,z,3.4,4);
  for(const x of [-43,-27])planter(x,44,6,1.8);
  for(const z of [40,52,64,76])planter(-53,z,2,4);
  // 柔和綠籬與座椅形成中庭尺度，保留縱向通廊。
  for(const z of [17,37]){
    box(3.2,.18,.75,15,.72,z,0x997554);
    box(.16,.6,.65,13.8,.34,z,0x52615a);box(.16,.6,.65,16.2,.34,z,0x52615a);
  }
  // 後側擋土牆與坡地樹叢，呼應操場照片。
  for(let i=0;i<14;i++){
    const wall=box(14.7,2.7+(i%3)*.12,.85,-126+i*15,1.3,-75,0x818b7f);wall.rotation.x=-.15;
    box(14.8,.12,1.05,-126+i*15,2.7,-75.2,0xa1aa94);
    for(const x of [-129+i*15,-123+i*15])box(.1,.55,.08,x,1.1,-74.5,0x536456);
  }
  // Track-side shade, tree wells and low brick seating from the 2019 series.
  paved(86,2.2,-88,5.4);
  for(let x=-126;x<=-79;x+=7.8){
    box(2.1,.3,1.6,x,.16,7.6,0x987867);box(1.75,.03,1.3,x,.32,7.6,palette.soil);
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.2,3.3,8),mat(0x76644c));trunk.position.set(x,1.65,7.6);decor.add(trunk);
    for(let i=0;i<2;i++){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),mat(i?0x6d8351:0x587849));leaf.position.set(x+(i?.45:-.3),3.6+i*.6,7.6);leaf.scale.y=.8;decor.add(leaf)}
    box(2,.12,.45,x,.48,8.55,0x9e8468);
  }
  for(let i=0;i<30;i++){
    const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(3.2+(i%3)*.7,1),mat([0x365b47,0x416851,0x51765a][i%3]));
    crown.position.set(-135+i*7.5,4.2+(i%4)*.7,-82-(i%2)*4);crown.scale.y=1.2;crown.castShadow=true;decor.add(crown);
  }
  for(let i=0;i<12;i++){
    const hill=new THREE.Mesh(new THREE.SphereGeometry(18+(i%3)*6,16,10),mat([0x365b47,0x416851,0x51765a][i%3]));
    hill.position.set(-155+i*25,-3,-110-(i%2)*10);hill.scale.set(1.2,.55,1);hill.receiveShadow=true;decor.add(hill);
  }
  // 補上車道標線，採低對比標線避免畫面喧賓奪主。
  for(let z=-66;z<79;z+=10)box(.18,.015,3.5,52.5,.045,z,0xdfdecd);
  for(let x=2;x<101;x+=10)box(3.5,.015,.18,x,.045,86,0xdfdecd);
  for(let i=0;i<7;i++)box(1,.015,7,-19+i*2,.055,79,0xf0efdf);
  const gymTexture=tiledTexture(true);
  for(const group of scene.children){
    const cfg=api.buildings.find(b=>group.position.x===b.x&&group.position.z===b.z&&group.type==='Group');
    if(!cfg)continue;
    group.userData.buildingId=cfg.id;
    group.traverse(obj=>{
      if(!obj.isMesh)return;
      obj.receiveShadow=true;
      if(obj.material?.color?.getHex()===palette.brick){obj.material.map=gymTexture;obj.material.needsUpdate=true}
    });
    // 屋頂薄框與立面水平帶，讓高樓層陰影與結構更清晰。
    const roofY=cfg.floors*FH;
    for(const side of [-1,1]){
      const trim=box(cfg.width+.6,.17,.28,cfg.x,roofY-.1,cfg.z+side*cfg.depth/2,0x71827a);
      trim.userData={buildingId:cfg.id,floorNum:cfg.floors,roof:true};floorMeshes.push(trim);
    }
  }
  // 校內統一光源與地面接觸陰影。
  const calibratedMaterials=new Set();
  scene.traverse(obj=>{
    if(obj.isMesh&&!obj.material?.transparent)obj.receiveShadow=true;
    const list=obj.material?(Array.isArray(obj.material)?obj.material:[obj.material]):[];
    for(const material of list){
      if(calibratedMaterials.has(material))continue;calibratedMaterials.add(material);
      // r128 的十六進位材質色尚未自動從 sRGB 轉線性；輸出 sRGB 前先校準。
      material.color?.convertSRGBToLinear();
      if(material.map)material.map.encoding=THREE.sRGBEncoding;
      material.needsUpdate=true;
    }
  });
  const toolbar=document.createElement('nav');toolbar.id='scene-toolbar';toolbar.setAttribute('aria-label','場景視角與美術對照');
  const views=[['全校鳥瞰',[-160,168,225],[-15,0,6]],['校門廣場',[-62,34,121],[-26,3,54]],['中庭漫遊',[15,64,82],[15,0,28]],['運動園區',[-128,77,56],[-65,0,-25]]];
  let activeView='全校鳥瞰';
  function fly(position,target){
    focusedBuildingId=null;
    if(activeView==='中庭漫遊'&&innerWidth<768)position=[15,100,112];
    api.setControlMode('bird');
    document.getElementById('welcome-card').classList.add('hidden');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){camera.position.set(...position);controls.target.set(...target);controls.update()}
    else animateCameraTo(new THREE.Vector3(...position),new THREE.Vector3(...target));
  }
  for(const [name,position,target] of views){const button=document.createElement('button');button.className='scene-view-btn';button.textContent=name;button.onclick=()=>{activeView=name;toolbar.querySelectorAll('button').forEach(b=>b.classList.remove('active'));button.classList.add('active');fly(position,target)};toolbar.append(button)}
  window.addEventListener('resize',()=>{if(activeView==='中庭漫遊'){camera.position.set(...(innerWidth<768?[15,100,112]:[15,64,82]));controls.target.set(15,0,28);controls.update()}});
  let evening=false;
  const lightButton=document.createElement('button');lightButton.className='scene-view-btn';lightButton.textContent='暖陽';lightButton.onclick=()=>{
    evening=!evening;lightButton.textContent=evening?'晨光':'暖陽';
    sunLight.color.setHex(evening?0xffc993:0xffedd1);sunLight.position.set(evening?-110:85,evening?85:160,90);
    scene.background.setHex(evening?0xd5bd9b:0xc9dad2);scene.fog.color.copy(scene.background);renderer.toneMappingExposure=evening?.98:1.02;
  };toolbar.append(lightButton);
  const referenceButton=document.createElement('button');referenceButton.className='scene-view-btn';referenceButton.textContent='實景對照';toolbar.append(referenceButton);document.body.append(toolbar);
  const caption=document.createElement('div');caption.id='scene-caption';caption.textContent='依 115 平面圖配置・實景材質・空間示意';document.body.append(caption);
  const panel=document.createElement('section');panel.id='reference-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','校園照片對照');panel.innerHTML='<button type="button">關閉</button><h2>從實景認識校園</h2><img data-src="reference-aerial.jpg" alt="大溪國中空拍實景，供建築與球場對照"><p>平面圖校對位置與樓層，實景照片校對建築外觀。立體模型為導覽示意，尺寸與路徑距離未經現地測量。</p><p><a href="campus_plan_115.jpg" target="_blank" rel="noopener">開啟 115 學年度平面圖</a>　<a href="campus-illustration.png" target="_blank" rel="noopener" id="concept-link">查看校園手繪美術圖</a></p>';
  document.body.append(panel);referenceButton.onclick=()=>{panel.querySelector('img').src='reference-aerial.jpg';panel.classList.add('open');panel.querySelector('button').focus()};panel.querySelector('button').onclick=()=>{panel.classList.remove('open');referenceButton.focus()};
  const sourceNote=document.createElement('p');sourceNote.className='map-source-note';sourceNote.textContent='平面圖為樓層、配置與跑道色彩依據；3D 場景為示意模型，照片用於校對外觀與年代差異。';document.getElementById('campus-map-modal').append(sourceNote);
  // 原版圖面座標不是測量值，因此距離採示意單位。
  document.querySelector('.nav-dist small').textContent='示意單位';
  document.addEventListener('keydown',e=>{if(e.key==='Escape')panel.classList.remove('open')});
  // 可聚焦的原版 div 操作鈕支援鍵盤 Enter／空白鍵。
  for(const element of document.querySelectorAll('.venue-chip,.brand-btn')){
    element.tabIndex=0;element.setAttribute('role','button');element.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();element.click()}});
  }
  for(const button of document.querySelectorAll('.dpad-btn'))button.setAttribute('aria-label',({ 'dpad-up':'向前移動','dpad-left':'向左轉','dpad-right':'向右轉','dpad-down':'向後移動'})[button.id]);
  document.getElementById('search-input').setAttribute('aria-label','搜尋處室或教室');
  // 移除密集裝飾 emoji，只保留文字操作資訊。
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const textNodes=[];while(walker.nextNode())if(!['SCRIPT','STYLE'].includes(walker.currentNode.parentElement.tagName))textNodes.push(walker.currentNode);
  for(const node of textNodes)node.nodeValue=node.nodeValue.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,'').replace('平面图','平面圖').replace('实拍','實拍');
  for(const [id,symbol] of Object.entries({'dpad-up':'↑','dpad-left':'←','dpad-right':'→','dpad-down':'↓'}))document.getElementById(id).textContent=symbol;
  document.getElementById('mode-toast').setAttribute('role','status');
  if(new URLSearchParams(location.search).get('view')==='plan'){
    const plan=document.getElementById('campus-map-modal'),img=plan?.querySelector('img[data-src]');
    if(img)img.src=img.dataset.src;
    plan?.classList.add('open');
  }
  if(new URLSearchParams(location.search).has('to'))document.getElementById('welcome-card').classList.add('hidden');
})();

;
/* photo-reference.js */
/* Source-specific gallery. Historical surfaces are evidence, not present-day claims. */
(()=>{
 const panel=document.getElementById('reference-panel'),api=window.campusExplorer;
 const opener=[...document.querySelectorAll('#scene-toolbar button')].find(b=>b.textContent==='實景對照');if(!panel||!opener)return;
 const oldDate='2019 年 10 月 22 日・EXIF 拍攝日期',unknown='拍攝日期未提供';
 const groups={
  sports:{label:'操場與司令台',items:[
   ['stage-2019','司令台正面',oldDate,'舞台凹口、黃色收分階梯與同側三旗桿。階梯配色取自舊照，現況及尺寸仍待量定。','grandstand'],
   ['lanes-2019','六道與起跑標記',oldDate,'可讀到 1–6 道編號及斜向標記；場景標記位置為示意。','track'],
   ['track-2019','跑道與彎道內鋪面',oldDate,'這張舊照呈現紅跑道和藍色鋪面；不同年代來源顏色不同，現版依 115 平面圖採紅色跑道，照片只作年代與材質對照。','track'],
   ['shade-2019','林蔭步道與座位',oldDate,'低磚花台、樹穴與沿跑道外緣的步道；樹種與距離未經測量。','track'],
   ['hill-2019','後山與擋土牆',oldDate,'斜面分段擋土牆及林木邊界；地形高度為示意。','track']
  ]},
  admin:{label:'行政前棟',items:[
   ['admin-front','前立面與花園',unknown,'與全區空拍 05／11 的凹廊、樹列及活動中心相鄰關係交叉定位為行政前棟；不是由招牌直接辨識。','admin-g89-staff'],
   ['admin-entry','門廊與坡道',unknown,'玻璃門、低台階、右側坡道與金屬扶手。入口高度採導覽示意，不代表實測無障礙路線。','admin-g89-staff'],
   ['admin-roof','屋面與窗組',unknown,'紅瓦主坡面、藍綠檐口與成組窗框；房名及樓層沿用 115 平面圖。','admin-g89-staff'],
   ['admin-gallery','連廊與側牆',unknown,'抬高連廊及柱框可供外觀對照；黃色框架設備用途未確認。','academic']
  ]}
 };
 let active='sports',index=0;
 panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','photo-title');
 panel.innerHTML='<header class="photo-header"><div><span class="photo-eyebrow">大溪國中・實景紀錄</span><h2 id="photo-title">從照片認識校園</h2></div><button id="photo-close" type="button" aria-label="關閉實景對照">關閉 ×</button></header><p class="photo-intro">115 平面圖校對樓層與配置；不同年代照片校對外觀。尺寸與路徑距離為示意。</p><nav class="photo-tabs" aria-label="實景照片區域"></nav><figure class="photo-figure"><img id="photo-image" alt=""><figcaption><span id="photo-date"></span><h3 id="photo-caption"></h3><p id="photo-evidence"></p></figcaption></figure><footer class="photo-footer"><div><button id="photo-prev" type="button">← 上一張</button><span id="photo-count" aria-live="polite"></span><button id="photo-next" type="button">下一張 →</button></div><button id="photo-go" type="button">查看此地點</button></footer>';
 const links=document.createElement('p');links.className='photo-source-links';links.innerHTML='<a href="campus_plan_115.jpg" target="_blank" rel="noopener">115 學年度平面圖</a>　<a href="reference-aerial.jpg" target="_blank" rel="noopener">全校空拍</a>　<a href="campus-illustration.png" target="_blank" rel="noopener">校園美術圖</a>';panel.append(links);
 const tabs=panel.querySelector('.photo-tabs');
 for(const [key,g] of Object.entries(groups)){const button=document.createElement('button');button.type='button';button.dataset.photoGroup=key;button.textContent=g.label;button.onclick=()=>{active=key;index=0;render()};tabs.append(button)}
 function render(){const items=groups[active].items,item=items[index],image=panel.querySelector('#photo-image');image.src=`photos/${item[0]}.jpg`;image.alt=item[1];panel.querySelector('#photo-date').textContent=item[2];panel.querySelector('#photo-caption').textContent=item[1];panel.querySelector('#photo-evidence').textContent=item[3];panel.querySelector('#photo-count').textContent=`${index+1} / ${items.length}`;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.photoGroup===active));}
 function close(){panel.classList.remove('open');opener.focus()}
 opener.onclick=()=>{render();api.manualTakeover?.();api.resetManualInput?.();panel.classList.add('open');panel.querySelector('#photo-close').focus()};
 panel.querySelector('#photo-close').onclick=close;
 panel.querySelector('#photo-prev').onclick=()=>{index=(index-1+groups[active].items.length)%groups[active].items.length;render()};
 panel.querySelector('#photo-next').onclick=()=>{index=(index+1)%groups[active].items.length;render()};
 panel.querySelector('#photo-go').onclick=()=>{const id=groups[active].items[index][4];close();api.navigateToRoom(id)};
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){const controls=[...panel.querySelectorAll('button,a[href]')],first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();

;
/* minimap-math.js */
/* 世界座標 x 向右、z 向圖下；小地圖朝向使用視線方向，樓層使用人物高度。 */
const CampusMinimapMath={
 worldToMini(x,z,state,size,scale){
  const dx=x-state.x,dz=z-state.z,c=Math.cos(state.heading),s=Math.sin(state.heading);
  return {x:size/2+(dx*c+dz*s)*scale,y:size*.6+(-dx*s+dz*c)*scale};
 },
 locate(position,buildings){
  const building=buildings.find(b=>Math.abs(position.x-b.x)<=b.width/2+1.2&&Math.abs(position.z-b.z)<=b.depth/2+1.2);
  const floor=Math.max(1,Math.min(building?.floors??4,Math.round(Math.max(0,position.y)/3.6)+1));
  if(building)return {floor,label:building.name,buildingId:building.id};
  let label='校園步道';
  if(position.z>100&&position.z<175&&position.x>-20&&position.x<0)label='校門椰林大道';
  else if(position.z>74&&position.x<34)label='正門廣場';
  else if(position.x>47&&position.x<59)label='東側車道';
  else if(position.x<-32&&position.z>17&&position.z<75)label='迎賓廣場';
  else if(position.x<-36&&position.z<12)label='操場及綜合球場';
  else if(position.z<-20&&position.x>-33&&position.x<42)label='戶外球場';
  else if(position.x>7&&position.x<23&&position.z>7&&position.z<51)label='教學區中庭';
  return {floor,label,buildingId:null};
 }
};

;
/* spatial-ui-tools.js */
/* Presentation adapters consume shared geometry without changing physical cells. */
window.CampusSpatialUI = (() => {
 function rows(layout,floor){
  return layout.displayRows.map(row=>{
   const axis=row.axis||'u',cells=layout.cells.filter(c=>c.floor===floor&&(c.row||'main')===row.id)
    .map(c=>({...c,start:c[`${axis}0`],end:c[`${axis}1`]})).sort((a,b)=>a.start-b.start);
   const filled=[];let cursor=row.start;
   for(const cell of cells){if(cell.start>cursor+.001)filled.push({kind:'void',start:cursor,end:cell.start});filled.push(cell);cursor=Math.max(cursor,cell.end)}
   if(cursor<row.end-.001)filled.push({kind:'void',start:cursor,end:row.end});
   return {...row,cells:filled};
  });
 }
 function routeSegments(points,floor){
  const height=(floor-1)*3.6,min=Math.max(0,height-1.8),max=height+1.8,result=[];
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],ay=a.y||0,by=b.y||0,dy=by-ay;let from=0,to=1;
   if(Math.abs(dy)<.0001){if(ay<min||ay>max)continue}
   else{const t0=(min-ay)/dy,t1=(max-ay)/dy;from=Math.max(0,Math.min(t0,t1));to=Math.min(1,Math.max(t0,t1));if(from>=to)continue}
   const at=t=>({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t,y:ay+dy*t});result.push([at(from),at(to)]);
  }return result;
 }
 function locate(position,layouts,fallback){
  const floor=Math.max(1,Math.round(Math.max(0,position.y)/3.6)+1);
  const layout=layouts.find(l=>l.footprints.some(f=>f.floor===floor&&position.x>=f.rect.x0&&position.x<=f.rect.x1&&position.z>=f.rect.z0&&position.z<=f.rect.z1));
  return layout?{floor,label:layout.b.name,buildingId:layout.id}:fallback(position);
 }
 return {rows,routeSegments,locate};
})();

;
/* minimap.js */
/* 人物定位小地圖：靜態樓層圖快取＋即時相機朝向與人物位置。 */
(() => {
 const api=window.campusExplorer;if(!api)return;
 const card=document.getElementById('minimap-card'),canvas=document.getElementById('minimap-canvas'),ctx=canvas.getContext('2d');
 const floorBadge=document.getElementById('minimap-floor-badge'),compass=card.querySelector('.minimap-compass');
 card.title='目前位置與視線方向；人物走動時，小地圖同步更新';
 card.setAttribute('role','img');card.style.cursor='default';
 const caption=document.createElement('div');caption.className='minimap-location';caption.setAttribute('aria-live','polite');card.append(caption);
 const cameraDirection=new THREE.Vector3(),layers=new Map(),origin={x:-170,z:-130},worldSize=320,pixelsPerUnit=4;
 function makeLayer(floor){
  const layer=document.createElement('canvas');layer.width=layer.height=worldSize*pixelsPerUnit;
  const c=layer.getContext('2d');c.scale(pixelsPerUnit,pixelsPerUnit);c.translate(-origin.x,-origin.z);
  c.fillStyle='#2b3644';c.fillRect(origin.x,origin.z,worldSize,worldSize);
  c.fillStyle='#6f805d';c.fillRect(-144,-89,257,190);
  const rect=(x,z,w,d,color)=>{c.fillStyle=color;c.fillRect(x,z,w,d)};
  // 與場景相同的主車道、校門鋪面、縱向通廊。
  rect(-65,81.5,170,9,'#8c4c3a');rect(48,-72,9,154,'#8c4c3a');
  rect(-60,43,62,35,'#a5a697');rect(-52,18,37,27,'#a5a697');rect(8,6,14,47,'#adae9f');
  c.strokeStyle='#bba765';c.lineWidth=.22;c.setLineDash([2.2,2.6]);
  c.beginPath();c.moveTo(-60,86);c.lineTo(105,86);c.moveTo(52.5,-70);c.lineTo(52.5,81);c.stroke();c.setLineDash([]);
  c.strokeStyle='#d3d2c8';c.lineWidth=.45;
  c.beginPath();c.moveTo(48,-72);c.lineTo(48,82);c.moveTo(57,-72);c.lineTo(57,81);c.moveTo(-65,81.5);c.lineTo(105,81.5);c.stroke();
  for(let i=0;i<7;i++)rect(-19+i*2,77,1,9,'#eeeede');
  rect(-19,89,18,82,'#73796a');rect(-14.5,89,9,82,'#666864');
  for(const x of [-14.4,-5.6])rect(x,89,.12,82,'#ba5145');
  for(let z=91;z<169;z+=6)rect(-10,z,.12,2.8,'#e8bc53');
  for(const p of CampusEntranceAvenue.palms){c.beginPath();c.arc(p.x,p.z,1.7,0,Math.PI*2);c.fillStyle='#285539';c.fill();}
  // 操場採直道＋半圓彎道，不使用與模型不符的橢圓。
  function stadium(radius){c.beginPath();c.moveTo(-109,-25-radius);c.lineTo(-59,-25-radius);c.arc(-59,-25,radius,-Math.PI/2,Math.PI/2);c.lineTo(-109,-25+radius);c.arc(-109,-25,radius,Math.PI/2,Math.PI*1.5);c.closePath()}
  const outdoor=CampusOutdoorPlan,hex=n=>'#'+n.toString(16).padStart(6,'0');
  stadium(outdoor.track.outerRadius);c.fillStyle=hex(outdoor.palette.track);c.fill();stadium(outdoor.track.innerRadius);c.fillStyle=hex(outdoor.palette.lawn);c.fill();
  for(let r=20;r<27;r+=1.7){stadium(r);c.strokeStyle='#d6d8d0';c.lineWidth=.16;c.stroke()}
  for(const r of outdoor.courts){rect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0,hex(outdoor.palette.court));c.strokeStyle=hex(outdoor.palette.line);c.lineWidth=.12;c.strokeRect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0)}
  rect(-29,-52,14,28,'#718c6c');rect(-5,-61,34,46,'#897660');
  for(const z of [-52,-38,-24]){rect(-2,z-6.3,28,12.6,'#739078');c.strokeStyle='#e0e4d5';c.lineWidth=.15;c.strokeRect(-2,z-6.3,28,12.6);c.beginPath();c.arc(-8.5,z,2.5,0,Math.PI*2);c.stroke();c.beginPath();c.arc(24.5,z,2.5,0,Math.PI*2);c.stroke()}
  const stage=outdoor.stage;rect(stage.x0,stage.z0,stage.x1-stage.x0,stage.z1-stage.z0,hex(outdoor.palette.stage));rect(stage.stairs.x0,stage.stairs.z0,stage.stairs.x1-stage.stairs.x0,stage.stairs.z1-stage.stairs.z0,hex(outdoor.palette.step));
  for(let z=stage.stairs.z0;z<stage.stairs.z1;z+=.5){c.strokeStyle='#eee8cc';c.lineWidth=.1;c.beginPath();c.moveTo(stage.stairs.x0,z);c.lineTo(stage.stairs.x1,z);c.stroke()}
  rect(-50,18,8,5,'#a7987d');
  // 世界矩形與樓層格子來自步行模型，包含多翼、穿堂和實際空缺。
  const colors={grade7:'#63b54f',grade8:'#409ed1',grade9:'#e86482',admin:'#8470dc',special:'#b95bc2',other:'#69889a'};
  const fill=(r,color)=>rect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0,color);
  const outline=r=>c.strokeRect(r.x0,r.z0,r.x1-r.x0,r.z1-r.z0);
  for(const l of window.campusWalkWorld.layouts){
   const active=l.footprints.filter(f=>f.floor===floor),footprints=active.length?active:l.footprints.filter(f=>f.floor===1);
   for(const footprint of footprints){fill(footprint.rect,active.length?'#b6b7ac':'#647169');c.strokeStyle=active.length?'#eeeee2':'#809087';c.lineWidth=.3;outline(footprint.rect)}
   if(!active.length)continue;
   for(const corridor of l.corridors.filter(corridor=>corridor.floor===floor))fill(corridor.rect,'#d7d6c2');
   for(const cell of l.cells.filter(cell=>cell.floor===floor)){
    if(cell.kind==='void')continue;
    const r=cell.rect;
    if(cell.kind==='room'){
     const room=api.rooms[cell.id]||cell,name=room.name;
     fill(r,colors[CampusRoomLayout.category(name,room.cat)]);c.strokeStyle='#eeeede';c.lineWidth=.3;outline(r);
     const door=cell.door;
     if(door){
      const sides=[{d:Math.abs(door.x-r.x0),x0:r.x0,z0:door.z-.65,x1:r.x0,z1:door.z+.65},{d:Math.abs(door.x-r.x1),x0:r.x1,z0:door.z-.65,x1:r.x1,z1:door.z+.65},{d:Math.abs(door.z-r.z0),x0:door.x-.65,z0:r.z0,x1:door.x+.65,z1:r.z0},{d:Math.abs(door.z-r.z1),x0:door.x-.65,z0:r.z1,x1:door.x+.65,z1:r.z1}];
      const side=sides.sort((a,b)=>a.d-b.d)[0];c.beginPath();c.moveTo(side.x0,side.z0);c.lineTo(side.x1,side.z1);c.strokeStyle='#d7d6c2';c.lineWidth=.65;c.stroke();
     }
    }else if(cell.kind==='stair'){
     fill(r,'#647584');c.strokeStyle='#d9e4e6';c.lineWidth=.16;
     for(let i=1;i<7;i++){c.beginPath();if(r.x1-r.x0>r.z1-r.z0){const x=r.x0+(r.x1-r.x0)*i/7;c.moveTo(x,r.z0);c.lineTo(x,r.z1)}else{const z=r.z0+(r.z1-r.z0)*i/7;c.moveTo(r.x0,z);c.lineTo(r.x1,z)}c.stroke()}
    }else if(cell.kind==='wc'){
     fill(r,'#7894ad');c.fillStyle='#f0f5ed';c.font='bold 1.7px sans-serif';c.textAlign='center';c.fillText('WC',(r.x0+r.x1)/2,(r.z0+r.z1)/2+.6);c.textAlign='start';
    }else if(cell.kind==='passage')fill(r,'#90a38a');
   }
  }
  // 警衛室、停車區與停車格。
  rect(3,83,6,6,'#a6574b');rect(62,74,30,8,'#797d79');
  for(let i=0;i<7;i++){c.strokeStyle='#d4d7cd';c.lineWidth=.18;c.strokeRect(64+i*3.7,74.5,3.4,6.5)}
  c.fillStyle='#e2e4d9';c.font='bold 2.8px sans-serif';c.fillText('P',65,78);
  for(let i=0;i<6;i++){c.fillStyle=['#76555e','#6f88a0','#536454'][i%3];c.fillRect(66+i*3.7,75.5,1.5,3.2)}
  layers.set(floor,layer);return layer;
 }
 const locate=position=>CampusSpatialUI.locate(position,window.campusWalkWorld.layouts,p=>CampusOutdoorPlan.onStage(p)?{floor:1,label:'操場司令台',buildingId:null}:CampusMinimapMath.locate(p,[]));
 let lastTime=0,lastCaption='';
 function render(force=false){
  const now=performance.now();if(!force&&now-lastTime<70)return;lastTime=now;
  const position=avatarGroup.position,location=locate(position);
  api.camera.getWorldDirection(cameraDirection);
  const heading=Math.atan2(cameraDirection.x,-cameraDirection.z),size=Math.round(card.clientWidth*Math.min(devicePixelRatio||1,2));
  if(canvas.width!==size){canvas.width=canvas.height=size}
  const scale=size/172*2.5,centerY=size*.6;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#2b3644';ctx.fillRect(0,0,size,size);
  ctx.translate(size/2,centerY);ctx.rotate(-heading);ctx.scale(scale,scale);ctx.translate(-position.x,-position.z);
  ctx.drawImage(layers.get(location.floor)||makeLayer(location.floor),origin.x,origin.z,worldSize,worldSize);
  const segments=CampusSpatialUI.routeSegments(currentNavPoints,location.floor);
  if(segments.length){
   ctx.beginPath();for(const [a,b] of segments){ctx.moveTo(a.x,a.z);ctx.lineTo(b.x,b.z)}ctx.strokeStyle='#302a15';ctx.lineWidth=1.9;ctx.stroke();ctx.strokeStyle='#eed06b';ctx.lineWidth=.85;ctx.stroke();
  }
  ctx.setTransform(1,0,0,1,0,0);
  const unit=size/172,arrowAngle=Math.atan2(Math.sin(avatarAngle),-Math.cos(avatarAngle))-heading;
  ctx.save();ctx.translate(size/2,centerY);ctx.rotate(arrowAngle);
  ctx.beginPath();ctx.moveTo(0,-10*unit);ctx.lineTo(7*unit,8*unit);ctx.lineTo(0,4*unit);ctx.lineTo(-7*unit,8*unit);ctx.closePath();ctx.fillStyle='#fff';ctx.strokeStyle='#101923';ctx.lineWidth=2*unit;ctx.fill();ctx.stroke();ctx.restore();
  floorBadge.textContent=`${location.floor}F`;
  const room=window.campusWalkWorld?.roomAt(position);
  const text=`${room?room.name.replace(/\s*\(\d+F\)/,''):location.label}・${location.floor}F`;
  if(text!==lastCaption){caption.textContent=text;card.setAttribute('aria-label',`目前位置：${text}`);lastCaption=text}
  const r=card.clientWidth*.42,x=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth/2-Math.sin(heading)*r)),y=Math.max(13,Math.min(card.clientWidth-13,card.clientWidth*.6-Math.cos(heading)*r));
  compass.style.left=`${x}px`;compass.style.top=`${y}px`;compass.title='校園平面圖的上方方向';
  card.dataset.worldX=position.x.toFixed(2);card.dataset.worldZ=position.z.toFixed(2);card.dataset.heading=heading.toFixed(3);card.dataset.floor=String(location.floor);card.dataset.location=location.label;
 }
 // 取代原本整校總覽；每幀由既有主迴圈呼叫，依 70ms 節流。
 renderMinimap=()=>render();
 window.campusMinimap={render:()=>render(true),invalidate:()=>{layers.clear();render(true)},locate:()=>locate(avatarGroup.position)};
 render(true);
})();

;
/* room-layout.js */
/* Local annual room names; immutable destination IDs keep navigation stable. */
(() => {
 const M=CampusRoomLayout,api=campusExplorer;
 const aliases=()=>typeof CampusSpatialData==='undefined'?{}:CampusSpatialData.aliases||{};
 const order=['admin-front','admin-back','new-grade7','grade8-front','grade8-mid','grade9-back','multi-building','tech-building','art-building','health-bld','gym-bld','recycle-bld'];
 const buildings=[...api.buildings].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
 const rooms=buildings.flatMap(b=>b.rooms.map(r=>({...r,name:r.name.replace(/\s*\(\d+F\)/,'')}))),base=M.normalize(null,rooms);
 const colors=M.colors;
 let year=115,filter='all',saved={},draft={},saveError='',lastFocus=null;
 const drafts=new Map(),originalNames=new Map(Object.values(api.rooms).map(r=>[r.id,r.name]));
 function read(){try{saveError='';return M.parse(localStorage.getItem(M.key(year)),rooms,aliases())}catch{saveError='瀏覽器無法使用本機儲存，仍可檢視配置。';return {...base}}}
 const dirty=()=>rooms.some(r=>draft[r.id]!==saved[r.id]);
 const actions=document.querySelector('.top-actions');
 document.getElementById('btn-mode-toggle').hidden=true;
 const controls=document.createElement('div');controls.id='campus-main-controls';
 controls.innerHTML='<button id="btn-walk" type="button">步行</button><button id="btn-bird" type="button">鳥瞰 <kbd>M</kbd></button><button id="btn-perspective" type="button"><span>第三人稱</span> <kbd>V</kbd></button><button id="btn-room-layout" type="button">編輯教室</button>';
 actions.prepend(controls);
 const help=document.getElementById('btn-help');help.textContent='？';help.setAttribute('aria-label','操作說明');
 const search=document.getElementById('search-input');search.placeholder='找教室或地點：701、健康中心、教務處…';
 const icon=document.querySelector('.search-icon');icon.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>';
 const quick=document.getElementById('quick-bar');
 quick.replaceChildren();const quickTitle=document.createElement('p');quickTitle.textContent='常用研習與會議場地';quick.append(quickTitle);
 for(const id of ['computer-lab-2','audiovisual-1f','history-room','library']){const btn=document.createElement('button');btn.type='button';btn.dataset.to=id;btn.textContent=api.rooms[id].name.replace(/\s*\(\d+F\)/,'');btn.onclick=()=>{api.navigateToRoom(id);quick.classList.remove('open')};quick.append(btn);}
 document.querySelector('.search-box').append(quick);
 search.addEventListener('focus',()=>quick.classList.toggle('open',!search.value));
 search.addEventListener('input',()=>quick.classList.toggle('open',document.activeElement===search&&!search.value));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.search-box'))quick.classList.remove('open')});
 function sync(){document.getElementById('btn-walk').classList.toggle('selected',currentMode!=='bird');document.getElementById('btn-bird').classList.toggle('selected',currentMode==='bird');document.querySelector('#btn-perspective span').textContent=currentMode==='firstperson'?'第一人稱':'第三人稱';for(const id of ['btn-walk','btn-bird'])document.getElementById(id).setAttribute('aria-pressed',document.getElementById(id).classList.contains('selected'));}
 const mode=m=>{document.getElementById('welcome-card').classList.add('hidden');api.setControlMode(m);sync()};
 document.getElementById('btn-walk').onclick=()=>mode(currentMode==='firstperson'?'firstperson':'avatar');
 document.getElementById('btn-bird').onclick=()=>mode('bird');
 document.getElementById('btn-perspective').onclick=()=>mode(currentMode==='firstperson'?'avatar':'firstperson');
 const modeText=document.getElementById('btn-mode-text');
 if(modeText)new MutationObserver(sync).observe(modeText,{childList:true,subtree:true,characterData:true});
 sync();
 const dialog=document.createElement('dialog');dialog.id='room-layout-dialog';dialog.setAttribute('aria-labelledby','room-layout-title');
 dialog.innerHTML='<header class="rl-header"><div class="rl-title-row"><h2 id="room-layout-title">教室配置</h2><label><input id="rl-year" type="number" value="115" min="100" max="200" aria-label="學年度"> 學年度</label></div><p>格子左上角為固定空間編號；中間的名稱可以直接修改。<br>輸入三碼班級（例如 701）會自動套用年級顏色。</p><button id="rl-close" type="button" aria-label="關閉教室配置">×</button></header><div class="rl-storage"><p>目前使用本機配置，修改只儲存在此瀏覽器。</p><a href="campus_plan_115.jpg" target="_blank" rel="noopener">115 校園平面圖 ↗</a></div><nav id="rl-tabs" aria-label="篩選校舍"></nav><div class="rl-scroll"><div class="rl-legend"></div><div id="rl-buildings"></div></div><footer class="rl-footer"><span id="rl-status" role="status"></span><button id="rl-restore" type="button">還原</button><button id="rl-save" type="button">儲存</button></footer>';
 document.body.append(dialog);
 const tabs=dialog.querySelector('#rl-tabs'),list=dialog.querySelector('#rl-buildings'),status=dialog.querySelector('#rl-status');
 for(const [cat,text] of Object.entries({grade7:'七年級',grade8:'八年級',grade9:'九年級',admin:'處室',special:'專科・館室',other:'其他空間'})){const item=document.createElement('span'),dot=document.createElement('i');dot.style.background=colors[cat];item.append(dot,document.createTextNode(text));dialog.querySelector('.rl-legend').append(item);}
 function updateStatus(){const changed=dirty();status.textContent=saveError|| (changed?'有未儲存的修改':year===115?(rooms.some(r=>saved[r.id]!==base[r.id])?'已載入本機配置':'尚未修改・依 115 學年度配置'):`${year} 學年度・以 115 空間配置為基礎`);dialog.querySelector('#rl-save').disabled=!changed;dialog.querySelector('#rl-restore').disabled=!changed;}
 function renderTabs(){tabs.replaceChildren();for(const [id,name] of [['all','全部'],...buildings.map(b=>[b.id,b.name.replace(/\s*\/\s*/g,'・')])]){const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('aria-pressed',id===filter);button.classList.toggle('selected',id===filter);button.onclick=()=>{filter=id;renderTabs();renderBuildings()};tabs.append(button);}}
 function paint(cell,name,cat){cell.style.setProperty('--room-color',colors[M.category(name,cat)]);}
 function renderBuildings(){list.replaceChildren();for(const b of buildings.filter(b=>filter==='all'||b.id===filter)){
  const section=document.createElement('section');section.className='rl-building';section.dataset.building=b.id;
  const heading=document.createElement('h3');heading.textContent=b.name;const range=document.createElement('small');range.textContent=b.floors===1?'1F':`1F–${b.floors}F`;heading.append(range);section.append(heading);
  const scroll=document.createElement('div');scroll.className='rl-floor-scroll';const grid=document.createElement('div');grid.className='rl-floor-grid';
  const layout=campusWalkWorld.layouts.find(l=>l.id===b.id);
  const spans=layout.cells.filter(c=>c.kind==='room').map(c=>{const row=layout.displayRows.find(r=>r.id===(c.row||'main'));return c[`${row.axis}1`]-c[`${row.axis}0`]}).filter(n=>n>0);
  const unit=132/Math.max(.1,Math.min(...spans));
  const rowLength=Math.max(...layout.displayRows.map(r=>r.end-r.start));
  grid.style.setProperty('--plan-width',`${rowLength*unit}px`);
  for(let floor=b.floors;floor>=1;floor--){
   for(const physicalRow of CampusSpatialUI.rows(layout,floor)){
    const row=document.createElement('div');row.className='rl-floor-row';row.dataset.floor=String(floor);row.dataset.row=physicalRow.id;
    const label=document.createElement('strong');label.className='rl-floor-label';label.textContent=`${floor}F`;if(layout.displayRows.length>1){const wing=document.createElement('small');wing.textContent=physicalRow.label;label.append(wing)}row.append(label);
    const track=document.createElement('div');track.className='rl-plan-track';track.style.width=`${(physicalRow.end-physicalRow.start)*unit}px`;
    for(const r of physicalRow.cells){
     const editable=r.kind==='room',cell=document.createElement(editable?'label':'div');cell.className=editable?'rl-room':`rl-space rl-${r.kind}`;
     cell.style.left=`${(r.start-physicalRow.start)*unit}px`;cell.style.width=`${(r.end-r.start)*unit}px`;cell.dataset.kind=r.kind;
     if(editable){
      cell.dataset.room=r.id;paint(cell,draft[r.id],r.cat);const code=document.createElement('small');code.textContent=r.spaceCode||r.code||r.id;code.title=r.codeSource==='assigned'?'導覽用固定編號（平面圖未標示）':'平面圖固定空間編號';
      const input=document.createElement('input');input.type='text';input.value=draft[r.id];input.maxLength=60;input.title=draft[r.id];input.setAttribute('aria-label',`${b.name} ${floor}F ${code.textContent} 教室名稱`);
      input.addEventListener('input',()=>{draft[r.id]=input.value;input.title=input.value;paint(cell,input.value,r.cat);saveError='';updateStatus()});
      input.addEventListener('blur',()=>{draft[r.id]=input.value.trim()||saved[r.id];input.value=draft[r.id];input.title=input.value;paint(cell,input.value,r.cat);updateStatus()});cell.append(code,input);
     }else{
      const code=document.createElement('small');code.textContent=r.spaceCode||r.code||'';
      const name=document.createElement('span');name.textContent=r.label||({stair:'樓梯',wc:'廁所',passage:'穿堂',void:'空缺'})[r.kind];cell.append(code,name);
     }track.append(cell);
    }row.append(track);grid.append(row);
   }
  }scroll.append(grid);section.append(scroll);list.append(section);
 }updateStatus();}
 function applyNames(){for(const r of rooms){const name=saved[r.id];api.rooms[r.id].name=name;for(const b of api.buildings){const original=b.rooms.find(a=>a.id===r.id);if(original)original.name=name;}for(const l of campusWalkWorld.layouts){const current=l.rooms.find(a=>a.id===r.id);if(current)current.name=name;}const badge=roomBadgeElements.find(a=>a.nodeId===api.rooms[r.id].node);if(badge){badge.element.lastElementChild.textContent=name.replace(/\s*\(\d+F\)/,'');badge.element.firstElementChild.style.background=colors[M.category(name,r.cat)];}}
  for(const [oldId,id] of Object.entries(aliases()))if(api.rooms[oldId]&&api.rooms[id])api.rooms[oldId].name=api.rooms[id].name;
  api.scene.traverse(o=>{if(o.userData.roomId&&o.material?.map){
   const id=o.userData.roomId;if(!api.rooms[id]||!Object.hasOwn(saved,id))return;
   const plate=M.nameplate(saved[id],api.rooms[id].cat);if(o.userData.nameplateKey===plate.key)return;
   o.material.map.dispose();o.material.map=createRoomNameplateTexture(plate.text,plate.color);o.material.needsUpdate=true;o.userData.nameplateKey=plate.key;
  }});
  for(const btn of quick.querySelectorAll('[data-to]'))btn.textContent=api.rooms[btn.dataset.to].name.replace(/\s*\(\d+F\)/,'');
  search.dispatchEvent(new Event('input'));campusMinimap.invalidate();
 }
 function clearMotion(){api.resetManualInput?.();Object.keys(moveInput).forEach(k=>moveInput[k]=false);stopAutoWalk();}
 function open(){lastFocus=document.activeElement;quick.classList.remove('open');clearMotion();renderTabs();renderBuildings();dialog.showModal();dialog.querySelector('#rl-close').focus();}
 function close(){dialog.close();clearMotion();lastFocus?.focus();}
 document.getElementById('btn-room-layout').onclick=open;dialog.querySelector('#rl-close').onclick=close;
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
 dialog.querySelector('#rl-restore').onclick=()=>{draft={...saved};saveError='';renderBuildings()};
 dialog.querySelector('#rl-save').onclick=()=>{const names=M.normalize(draft,rooms,aliases());try{localStorage.setItem(M.key(year),JSON.stringify(names));saved=names;draft={...saved};applyNames();renderBuildings();status.textContent=`${year} 學年度配置已儲存在此瀏覽器。`;}catch{saveError='儲存失敗，瀏覽器未允許本機儲存；修改仍保留在面板。';updateStatus();}};
 dialog.querySelector('#rl-year').addEventListener('change',e=>{const next=Number(e.target.value);if(next===year)return;if(!Number.isInteger(next)||next<100||next>200){e.target.value=year;return;}drafts.set(year,{...draft});year=next;saved=read();draft=drafts.get(year)||{...saved};applyNames();renderBuildings();});
 // Capture before legacy WASD listeners, and keep focus within the modal.
 window.addEventListener('keydown',e=>{if(dialog.open){if(e.key==='Escape'){e.preventDefault();close();}else if(e.key==='Tab'){const items=[...dialog.querySelectorAll('button:not(:disabled),input,a[href]')].filter(el=>el.getClientRects().length),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}e.stopImmediatePropagation();}},true);
 saved=read();draft={...saved};applyNames();
 window.campusRoomLayout={open,close,get year(){return year},get dirty(){return dirty()},originalNames};
})();

;
/* floor-exhibit.js */
/* Bird-view floor labels and cards use the same room centres as walking and the map. */
(()=>{
 const api=campusExplorer,M=CampusFloorExhibitModel,selector=document.getElementById('floor-selector');
 selector.setAttribute('aria-label','鳥瞰樓層展示');
 const title=document.createElement('span');title.className='fe-selector-title';title.textContent='樓層';selector.prepend(title);
 const listToggle=document.createElement('button');listToggle.id='fe-list-toggle';listToggle.type='button';listToggle.textContent='教室清單';listToggle.setAttribute('aria-expanded','false');selector.append(listToggle);
 const layer=document.createElement('div');layer.id='floor-exhibit-labels';document.body.append(layer);
 const summary=document.createElement('div');summary.id='fe-summary';summary.setAttribute('role','status');document.body.append(summary);
 const list=document.createElement('section');list.id='fe-list';list.hidden=true;list.setAttribute('aria-label','所選樓層完整教室清單');document.body.append(list);
 const card=document.createElement('section');card.id='fe-card';card.hidden=true;card.setAttribute('aria-label','教室資訊');document.body.append(card);
 const group=new THREE.Group();group.name='floor-exhibit-tints';api.scene.add(group);
 const cache=new Map(),tints=new Map(),headers=new Map();let selected=null,lastUpdate=0,lastSignature='',lastLayout='',previousActive=false,lastTrigger=null;
 const lines=document.createElementNS('http://www.w3.org/2000/svg','svg');lines.classList.add('fe-leaders');layer.append(lines);
 const active=()=>currentMode==='bird'&&currentFloorFilter!=='all';
 function button(text,action){const el=document.createElement('button');el.type='button';el.textContent=text;el.onclick=action;return el}
 const visibleRooms=()=>M.rooms(campusWalkWorld.layouts,api.rooms,currentFloorFilter);
 const clean=name=>name.replace(/\s*\(\d+F\)/,'');
 const badgeName=name=>clean(name).replace(/^(\d{3})\s+教室$/,'$1');
 function closeCard(){card.hidden=true;selected=null;lastTrigger?.focus();}
 function focusRoom(r){focusedBuildingId=r.buildingId;const p=r.center;animateCameraTo(new THREE.Vector3(p.x+25,p.y+32,p.z+35),new THREE.Vector3(p.x,p.y+1,p.z));}
 function showCard(r,trigger){lastTrigger=trigger||document.activeElement;selected=r.id;card.replaceChildren();
  const close=button('×',closeCard);close.className='fe-close';close.setAttribute('aria-label','關閉教室資訊');
  const context=document.createElement('p');context.textContent=`${r.buildingName} · ${r.floor}F`;
  const heading=document.createElement('h2');heading.textContent=clean(api.rooms[r.id].name);
  const code=document.createElement('p');code.textContent=`固定空間編號：${r.spaceCode||r.code||'未標示'}${r.codeSource==='assigned'?'（導覽編號）':''}`;
  const note=document.createElement('small');const layout=campusWalkWorld.layouts.find(l=>l.id===r.buildingId);note.textContent=r.name.includes('待確認')?'圖面文字尚待確認；保留固定編號供查找。':layout?.confidence?.includes('上層')?layout.confidence:'依 115 學年度平面圖配置；室內尺度為導覽示意。';
  const actions=document.createElement('div');actions.className='fe-card-actions';actions.append(button('查看此教室',()=>focusRoom(r)),button('步行導航',()=>{card.hidden=true;list.hidden=true;api.setControlMode('avatar');api.navigateToRoom(r.id,false)}));
  card.append(close,context,heading,code,note,actions);card.hidden=false;close.focus();
 }
 function entry(r){const el=button('',()=>showCard(r,el));el.dataset.room=r.id;el.className='fe-room';const name=document.createElement('span'),code=document.createElement('small');el.append(name,code);paint(el,r);return el}
 function paint(el,r){const name=clean(api.rooms[r.id].name);el.firstElementChild.textContent=badgeName(name);el.lastElementChild.textContent=r.spaceCode||r.code||'';el.style.setProperty('--room-color',M.color(name,r.cat));el.setAttribute('aria-label',`${r.buildingName} ${r.floor}F ${name}，固定空間編號 ${r.spaceCode||r.code||'未標示'}`);el.title=el.getAttribute('aria-label');}
 function buildList(rooms){list.replaceChildren();const heading=document.createElement('h2');heading.textContent=`${currentFloorFilter}F 教室與處室`;list.append(button('關閉清單',()=>{list.hidden=true;listToggle.setAttribute('aria-expanded','false');listToggle.focus()}),heading);
  const grid=document.createElement('div');grid.className='fe-index-grid';list.append(grid);
  for(const b of api.buildings){const items=rooms.filter(r=>r.buildingId===b.id);if(!items.length)continue;const section=document.createElement('section'),h=document.createElement('h3');h.textContent=`${b.name} · ${items.length} 間`;section.append(h);for(const r of items){const el=entry(r);el.firstElementChild.textContent=clean(api.rooms[r.id].name);section.append(el)}grid.append(section);}
 }
 function refresh(){
  lastLayout='';
  const on=active(),rooms=on?visibleRooms():[];
  selector.querySelectorAll('.floor-btn').forEach(b=>{if(b.dataset.f==='all')b.textContent='全部';b.setAttribute('aria-pressed',String(b.dataset.f===String(currentFloorFilter)));b.setAttribute('aria-label',b.dataset.f==='all'?'全部樓層外觀':`${b.dataset.f}F 樓層展示`)});
  listToggle.hidden=!on;summary.hidden=!on;layer.hidden=!on;group.visible=on;
  if(!on){list.hidden=true;card.hidden=true;selected=null;listToggle.setAttribute('aria-expanded','false');return;}
  for(const r of rooms){if(!cache.has(r.id)){
    const el=entry(r);cache.set(r.id,el);layer.append(el);
    const rect=r.rect,mat=new THREE.MeshBasicMaterial({color:M.color(r.name,r.cat),transparent:true,opacity:.28,depthWrite:false});
    const tile=new THREE.Mesh(new THREE.PlaneGeometry(Math.max(.1,rect.x1-rect.x0-.2),Math.max(.1,rect.z1-rect.z0-.2)),mat);tile.rotation.x=-Math.PI/2;tile.position.set(r.center.x,r.center.y+.025,r.center.z);tile.userData.roomId=r.id;group.add(tile);tints.set(r.id,tile);
   }paint(cache.get(r.id),r);tints.get(r.id).material.color.set(M.color(r.name,r.cat));}
  for(const [id,el]of cache){el.hidden=true;tints.get(id).visible=rooms.some(r=>r.id===id);}
  for(const [id,el]of headers)el.hidden=true;
  for(const l of campusWalkWorld.layouts.filter(l=>l.b.floors>=Number(currentFloorFilter)&&l.rooms.some(r=>r.floor===Number(currentFloorFilter)))){if(!headers.has(l.id)){const el=button('',()=>{focusedBuildingId=l.id;focusBuilding(l.b)});el.className='fe-building';layer.append(el);headers.set(l.id,el)}headers.get(l.id).textContent=`${l.b.name} ${currentFloorFilter}F`;}
  buildList(rooms);summary.textContent=`${campusRoomLayout.year} 學年度 · ${currentFloorFilter}F · 全部 ${rooms.length} 間教室與處室｜下方依建築完整列出`;
  if(selected){const r=rooms.find(r=>r.id===selected);if(r){card.querySelector('h2').textContent=clean(r.name)}else{selected=null;card.hidden=true}}
 }
 listToggle.onclick=()=>{list.hidden=!list.hidden;card.hidden=true;listToggle.setAttribute('aria-expanded',String(!list.hidden))};
 selector.querySelectorAll('.floor-btn').forEach(b=>b.onclick=()=>{document.getElementById('welcome-card').classList.add('hidden');if(currentMode!=='bird')api.setControlMode('bird');api.setFloorFilter(b.dataset.f);if(b.dataset.f!=='all'){list.hidden=false;listToggle.setAttribute('aria-expanded','true');focusedBuildingId=null;const target=new THREE.Vector3(14,(Number(b.dataset.f)-1)*3.6,20);animateCameraTo(new THREE.Vector3(innerWidth<768?-110:-45,innerWidth<768?150:108,innerWidth<768?180:135),target)}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!card.hidden)closeCard();list.hidden=true;listToggle.setAttribute('aria-expanded','false')}});
 window.addEventListener('keydown',e=>{if((!card.hidden||!list.hidden)&&['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.stopImmediatePropagation()}},true);
 function reserved(){return ['top-nav','floor-selector','minimap-card','scene-toolbar','guide-panel','guide-route','guide-toggle','fe-summary','fe-list','fe-card'].flatMap(id=>{const el=document.getElementById(id);if(!el||el.hidden||!el.getClientRects().length)return [];const r=el.getBoundingClientRect();return[{x:r.x,y:r.y,w:r.width,h:r.height}]})}
 function update(){const on=active();if(on!==previousActive){previousActive=on;refresh()}if(!on)return;const now=performance.now();if(now-lastUpdate<80)return;lastUpdate=now;
  const rooms=visibleRooms(),signature=`${currentFloorFilter}|${campusRoomLayout.year}|${rooms.map(r=>r.name).join('|')}`;if(signature!==lastSignature){lastSignature=signature;refresh()}
  const obstacles=reserved(),layoutKey=JSON.stringify([innerWidth,innerHeight,signature,focusedBuildingId,api.camera.matrixWorld.elements,api.camera.projectionMatrix.elements,obstacles]);
  if(layoutKey===lastLayout)return;lastLayout=layoutKey;
  const w=innerWidth,h=innerHeight,candidates=[],buildingCandidates=[];const project=(p)=>{const v=new THREE.Vector3(p.x,p.y,p.z).project(api.camera);return{x:(v.x*.5+.5)*w,y:(-v.y*.5+.5)*h,behind:v.z>1||v.z< -1}};
  for(const [id,el]of cache)el.hidden=true;for(const [id,el]of headers)el.hidden=true;
  for(const l of campusWalkWorld.layouts){const el=headers.get(l.id);if(!el||!rooms.some(r=>r.buildingId===l.id))continue;el.title=`${l.b.name} ${currentFloorFilter}F`;el.textContent=`${l.b.name.split(' / ')[0].replace('教學棟','棟').replace('與特教園地','')} ${currentFloorFilter}F`;const p=project({x:l.b.x,y:(Number(currentFloorFilter)-1)*3.6+10,z:l.b.z});buildingCandidates.push({...p,id:`building:${l.id}`,el,w:Math.min(170,el.textContent.length*11+16),h:26})}
  for(const r of [...rooms].sort((a,b)=>Number(b.buildingId===focusedBuildingId)-Number(a.buildingId===focusedBuildingId))){const el=cache.get(r.id),p=project({...r.center,y:r.center.y+2}),textWidth=badgeName(r.name).length*(innerWidth<768?11:12),codeWidth=String(r.spaceCode||r.code||'').length*7+10,labelWidth=Math.min(innerWidth<768?150:210,textWidth+codeWidth+14),labelHeight=Math.max(28,Math.ceil(textWidth/Math.max(30,labelWidth-codeWidth-14))*14+8);candidates.push({...p,id:r.id,el,w:labelWidth,h:labelHeight})}
  lines.replaceChildren();
  for(const c of M.pack([...candidates,...buildingCandidates],w,h,obstacles)){c.el.hidden=false;c.el.style.left=`${c.x}px`;c.el.style.top=`${c.y}px`;c.el.style.width=`${c.w}px`;c.el.style.height=`${c.h}px`;
   const anchor=candidates.find(a=>a.id===c.id);
   if(anchor&&!anchor.behind&&anchor.x>=0&&anchor.x<=w&&anchor.y>=0&&anchor.y<=h&&Math.hypot(c.x-anchor.x,c.y-anchor.y)>18){const line=document.createElementNS(lines.namespaceURI,'line');for(const [key,value]of Object.entries({x1:anchor.x,y1:anchor.y,x2:c.x,y2:c.y}))line.setAttribute(key,String(value));lines.append(line)}
  }
 }
 window.campusFloorExhibit={refresh,update,get active(){return active()}};refresh();
})();

;
/* mobile-control-math.js */
(function () {
  'use strict';
  const radius = 40, deadzone = 0.12;
  function vector(dx, dy) {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return { x: 0, y: 0 };
    const length = Math.hypot(dx, dy), strength = Math.min(length / radius, 1);
    if (strength <= deadzone) return { x: 0, y: 0 };
    const amount = (strength - deadzone) / (1 - deadzone);
    return { x: dx === 0 ? 0 : dx / length * amount, y: dy === 0 ? 0 : -dy / length * amount };
  }
  window.CampusMobileControlMath = { radius, deadzone, vector };
})();

;
/* mobile-controls.js */
(function () {
  'use strict';
  if (window.campusMobileControls) return;
  const math = window.CampusMobileControlMath;
  const controls = { move: { x: 0, y: 0 }, look: { x: 0, y: 0 }, reset };
  const dialogSelector = 'dialog[open], [role="dialog"].open, .avatar-setting-modal.open, #help-modal.open, #campus-map-modal.open, #reference-panel.open';
  const root = document.createElement('section');
  root.id = 'campus-mobile-controls';
  root.setAttribute('aria-label', '手機步行控制');
  root.innerHTML = '<p id="mobile-control-instructions" class="mobile-control-sr">左搖桿向上前進、向下後退、左右側移；右搖桿左右轉頭、上下調整視線。可同時使用兩指，放開即停止。鍵盤可使用 W、A、S、D 或方向鍵。</p>';
  document.body.append(root);
  const sticks = [];
  window.campusMobileControls = controls;

  function available() {
    return ['avatar', 'firstperson'].includes(document.body.dataset.controlMode) && !(window.campusExplorer?.motionBlocked?.() ?? document.querySelector(dialogSelector));
  }
  function paint(stick, x, y) {
    stick.el.dataset.x = String(controls[stick.kind].x);
    stick.el.dataset.y = String(controls[stick.kind].y);
    stick.el.dataset.active = String(stick.pointer !== null);
    stick.thumb.style.transform = `translate(${x}px, ${y}px)`;
  }
  function clear(stick) {
    const pointer = stick.pointer;
    // Clear ownership before release: lostpointercapture can fire synchronously.
    stick.pointer = null;
    stick.takenOver = false;
    controls[stick.kind].x = controls[stick.kind].y = 0;
    paint(stick, 0, 0);
    if (pointer !== null) {
      try { stick.el.releasePointerCapture(pointer); } catch (_) { /* Capture may already be lost. */ }
    }
  }
  function reset() { sticks.forEach(clear); }
  function update(stick, event) {
    if (!available()) { reset(); return; }
    const rect = stick.el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2), dy = event.clientY - (rect.top + rect.height / 2);
    const axis = math.vector(dx, dy);
    Object.assign(controls[stick.kind], axis);
    const length = Math.hypot(dx, dy), scale = length > math.radius ? math.radius / length : 1;
    paint(stick, dx * scale, dy * scale);
    if (!stick.takenOver && (axis.x !== 0 || axis.y !== 0)) {
      stick.takenOver = true;
      window.campusExplorer?.manualTakeover();
    }
  }
  for (const [kind, label, directions] of [['move', '移動', '前進／側移'], ['look', '轉頭', '左右／上下']]) {
    const group = document.createElement('div');
    group.className = `mobile-stick-group mobile-stick-${kind}`;
    const el = document.createElement('div');
    el.id = `mobile-${kind}-stick`;
    el.className = 'mobile-stick';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', `${label}搖桿`);
    el.setAttribute('aria-describedby', 'mobile-control-instructions');
    el.innerHTML = '<span class="mobile-stick-cross" aria-hidden="true"></span><span class="mobile-stick-thumb" aria-hidden="true"></span>';
    const caption = document.createElement('div');
    caption.className = 'mobile-stick-caption';
    caption.innerHTML = `<strong>${label}</strong><span>${directions}</span>`;
    group.append(el, caption);
    root.append(group);
    const stick = { kind, el, thumb: el.querySelector('.mobile-stick-thumb'), pointer: null, takenOver: false };
    sticks.push(stick);
    paint(stick, 0, 0);
    el.addEventListener('pointerdown', event => {
      if (!available() || stick.pointer !== null || (event.button !== undefined && event.button !== 0)) return;
      // A pointer belongs to one stick even if dragged over its neighbour.
      if (sticks.some(other => other.pointer === event.pointerId)) return;
      event.preventDefault();
      event.stopPropagation();
      stick.pointer = event.pointerId;
      try { el.setPointerCapture(event.pointerId); } catch (_) { /* Window release handlers remain available. */ }
      update(stick, event);
    });
    el.addEventListener('pointermove', event => {
      if (event.pointerId !== stick.pointer) return;
      event.preventDefault();
      event.stopPropagation();
      update(stick, event);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(type, event => {
      if (event.pointerId === stick.pointer) clear(stick);
    });
  }
  for (const type of ['pointerup', 'pointercancel']) window.addEventListener(type, event => {
    sticks.forEach(stick => { if (event.pointerId === stick.pointer) clear(stick); });
  });
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  new MutationObserver(records => {
    const changedMode = records.some(record => record.target === document.body && record.attributeName === 'data-control-mode');
    if (changedMode || !available()) reset();
    root.dataset.blocked = String(!available());
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-control-mode', 'open', 'class'] });
  root.dataset.blocked = String(!available());
})();

;
/* mouse-controls.js */
/* Mouse-only input. OrbitControls owns bird gestures; touch keeps the mobile motor. */
(()=>{
 const canvas=renderer.domElement,M=CampusMouseModel,key='daxi-mouse-settings-v1';
 let pointer=null,last=null,inside=false,x=0,paused=false,pendingX=0,pendingY=0,distance=6.5,fallback=false,lockedAt=0;
 const walking=()=>currentMode==='avatar'||currentMode==='firstperson';
 const blocked=()=>motionBlocked()||!!document.querySelector('#fe-card:not([hidden]),#fe-list:not([hidden])');
 const hint=document.createElement('div');hint.id='mouse-look-hint';hint.setAttribute('role','status');document.body.append(hint);
 canvas.tabIndex=0;canvas.setAttribute('aria-label','校園場景：鳥瞰可拖曳旋轉與平移；步行可拖曳轉頭');
 const option=document.createElement('option');option.value='lock';option.textContent='點擊鎖定游標轉頭（Esc 解除）';selectMouseTurn.append(option);
 selectMouseTurn.querySelector('[value="move"]').textContent='移動滑鼠轉頭（點擊或 Esc 暫停）';
 function show(){const locked=document.pointerLockElement===canvas;hint.hidden=blocked()||(currentMode==='bird'&&window.campusFloorExhibit?.active);const text=currentMode==='bird'?'左鍵旋轉 · 右鍵／Shift＋左鍵平移 · 滾輪縮放':locked?'移動滑鼠轉頭 · Esc 解除鎖定 · [／] 靈敏度':mouseTurnMode==='move'?(paused?'轉頭已暫停，點一下場景繼續':'移動滑鼠轉頭 · 左右邊緣持續轉向 · 點擊／Esc 暫停'):mouseTurnMode==='lock'?(fallback?'游標鎖定不可用，按住左鍵拖曳轉頭':'點一下場景鎖定游標 · 也可按住左鍵拖曳 · Esc 解除'):`按住${mouseTurnMode==='right'?'右':'左'}鍵拖曳轉頭 · 放開停止${currentMode==='avatar'?' · 滾輪調整跟隨距離':''}`;if(hint.textContent!==text)hint.textContent=text;}
 function save(){try{localStorage.setItem(key,JSON.stringify({mode:mouseTurnMode,sens:turnSensitivityMultiplier,invert:isInvertY,speed:avatarSpeedMultiplier}))}catch{}}
 function clear(exit=true){const id=pointer;pointer=null;last=null;inside=false;pendingX=pendingY=0;if(id!==null)try{if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id)}catch{}if(exit&&document.pointerLockElement===canvas)document.exitPointerLock?.();show()}
 function reset(){paused=mouseTurnMode==='move';clear()}
 function add(dx,dy){if(!Number.isFinite(dx)||!Number.isFinite(dy)||Math.hypot(dx,dy)>3000)return;if(dx||dy){manualTakeover();pendingX+=dx;pendingY+=dy}}
 function lock(){fallback=false;if(!canvas.requestPointerLock){fallback=true;show();return}try{const result=canvas.requestPointerLock();result?.catch?.(()=>{fallback=true;show()})}catch{fallback=true;show()}}
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||!walking()||blocked())return;canvas.focus({preventScroll:true});
  if(mouseTurnMode==='move'){if(e.button===0){paused=!paused;pendingX=pendingY=0;last={x:e.clientX,y:e.clientY};inside=!paused;x=e.clientX;show()}return}
  if(e.button!==(mouseTurnMode==='right'?2:0))return;
  pointer=e.pointerId;last={x:e.clientX,y:e.clientY};inside=true;x=e.clientX;try{canvas.setPointerCapture(e.pointerId)}catch{}
  if(mouseTurnMode==='lock'&&document.pointerLockElement!==canvas)lock();
 });
 canvas.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!walking()||blocked())return;
  if(document.pointerLockElement===canvas){if(performance.now()-lockedAt>120)add(e.movementX||0,e.movementY||0);return}
  if(mouseTurnMode==='move'){if(!paused&&last)add(e.clientX-last.x,e.clientY-last.y);last={x:e.clientX,y:e.clientY};inside=!paused;x=e.clientX;return}
  if(pointer!==e.pointerId||!last)return;add(e.clientX-last.x,e.clientY-last.y);last={x:e.clientX,y:e.clientY};x=e.clientX;
 });
 function release(e){if(e.pointerId!==pointer)return;if(e.type==='pointerup'&&walking()&&!blocked()&&document.pointerLockElement!==canvas&&(pendingX||pendingY))applyManualCameraRotation(pendingX,pendingY);clear(false)}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,release);
 canvas.addEventListener('pointerleave',()=>{if(pointer===null){inside=false;last=null;pendingX=pendingY=0}});
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 canvas.addEventListener('wheel',e=>{if(!walking())return;e.preventDefault();if(!blocked()&&currentMode==='avatar')distance=M.zoom(distance,e.deltaY,e.deltaMode)},{passive:false});
 document.addEventListener('pointerlockchange',()=>{lockedAt=performance.now();clear(false);show()});
 document.addEventListener('pointerlockerror',()=>{fallback=true;clear(false);show()});
 window.addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
 for(const el of [sliderTurn,sliderSpeed,checkInvertY,selectMouseTurn])el.addEventListener(el.tagName==='SELECT'||el.type==='checkbox'?'change':'input',()=>{if(el===selectMouseTurn){clear();paused=false;fallback=false}save();show()});
 btnResetTurn.addEventListener('click',()=>{clear();paused=false;fallback=false;save();show()});btnResetSpeed.addEventListener('click',save);
 document.addEventListener('keydown',e=>{if(e.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;if(e.key==='Escape'&&walking()){paused=true;clear();show()}if(walking()&&!blocked()&&(e.key==='['||e.key===']')){e.preventDefault();sliderTurn.value=String(Math.max(20,Math.min(300,Number(sliderTurn.value)+(e.key===']'?5:-5))));sliderTurn.dispatchEvent(new Event('input',{bubbles:true}));}});
 function update(dt){if(!walking()||blocked()){if(pointer!==null||inside||pendingX||pendingY||document.pointerLockElement===canvas)reset();show();return}
  const locked=document.pointerLockElement===canvas;if(!locked&&inside&&((mouseTurnMode==='move'&&!paused&&!isAutoWalking)||pointer!==null)){const rect=canvas.getBoundingClientRect(),edge=M.edge(x-rect.left,rect.width,turnSensitivityMultiplier);if(edge)add(edge*dt/.0035/Math.max(.2,turnSensitivityMultiplier),0)}
  const t=M.damp(dt),dx=pendingX*t,dy=pendingY*t;pendingX-=dx;pendingY-=dy;if(Math.abs(pendingX)+Math.abs(pendingY)<.001)pendingX=pendingY=0;if(dx||dy)applyManualCameraRotation(dx,dy);show();
 }
 try{const prefs=JSON.parse(localStorage.getItem(key));if(prefs&&typeof prefs==='object'){selectMouseTurn.value=['left','right','move','lock'].includes(prefs.mode)?prefs.mode:'left';sliderTurn.value=String(Math.max(20,Math.min(300,Number(prefs.sens)*100||100)));sliderSpeed.value=String(Math.max(50,Math.min(200,Number(prefs.speed)*100||100)));checkInvertY.checked=prefs.invert===true;for(const el of [selectMouseTurn,sliderTurn,sliderSpeed,checkInvertY])el.dispatchEvent(new Event(el===selectMouseTurn||el===checkInvertY?'change':'input',{bubbles:true}));}}catch{}
 window.campusMouse={reset,update,get distance(){return distance},get paused(){return paused}};show();
})();

;
/* field-guide.js */
/* Original Daxi field-guide interface; retain the existing walking and routing engine. */
(()=>{
 const api=window.campusExplorer;if(!api)return;
 const el=id=>document.getElementById(id);
 document.body.classList.add('field-guide');
 el('welcome-card').classList.add('hidden');
 const panel=document.createElement('aside');panel.id='guide-panel';panel.setAttribute('aria-label','大溪校園手冊');
 panel.innerHTML='<div class="guide-mast"><span class="guide-seal">溪</span><div><small>DAXI FIELD GUIDE</small><h1>校園探索手冊</h1></div></div><p class="guide-intro">沿著一條路，認識一座校園。</p><button id="guide-cover" class="guide-link">← 回到手冊首頁</button><div id="guide-search"></div><section class="guide-section"><h2>探索方式</h2><div id="guide-controls"></div></section><section class="guide-section"><h2>樓層透視</h2><div id="guide-floors"></div></section><div id="guide-route"></div><section class="guide-section" id="guide-stories"><h2>校園散步提案</h2><p>選一站，看看校園裡不同的日常。</p></section><details class="guide-section"><summary>視角與工具</summary><div id="guide-tools"></div></details><footer>桃園市立大溪國中 · 115 學年度<br>位置依校園平面圖校對，模型為導覽示意。</footer>';
 document.body.append(panel);
 el('guide-search').append(document.querySelector('.search-box'));
 el('guide-controls').append(el('campus-main-controls'));
 el('guide-floors').append(el('floor-selector'));
 const route=el('guide-route'),hud=el('nav-hud');
 route.setAttribute('aria-label','目前目的地');route.hidden=true;
 document.body.append(route);route.append(hud);
 const notes=document.createElement('details');notes.id='guide-place-notes';
 notes.innerHTML='<summary>目的地筆記與實景</summary><p id="guide-place-meta"></p><p id="guide-place-hint"></p><figure id="guide-place-figure" hidden><img id="guide-place-photo" alt="" loading="lazy"><figcaption id="guide-place-caption"></figcaption></figure>';
 route.append(notes);
 el('guide-tools').append(el('scene-toolbar'),document.querySelector('.top-actions'));
 const stories=[['woodwork-1','01','木藝與創作','走向木藝教室，認識校園的創作空間。'],['library','02','閱讀的停靠站','到圖書館，為下一段學習找一本書。'],['grandstand','03','操場上的日常','走到司令台，從另一個角度看校園。'],['palm-avenue','04','椰林迎賓大道','沿著校門外的雙排椰林，回望大溪的入口。']];
 for(const [id,num,title,copy]of stories){const b=document.createElement('button');b.className='guide-story';b.innerHTML='<span>'+num+'</span><div><strong>'+title+'</strong><p>'+copy+'</p></div><b>↗</b>';b.onclick=()=>api.navigateToRoom(id);el('guide-stories').append(b)}
 const toggle=document.createElement('button');toggle.id='guide-toggle';toggle.textContent='校園手冊';toggle.setAttribute('aria-controls','guide-panel');document.body.append(toggle);
 function setPanel(open){document.body.classList.toggle('guide-collapsed',!open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'收合手冊':'開啟手冊'}
 toggle.onclick=()=>setPanel(document.body.classList.contains('guide-collapsed'));
 setPanel(innerWidth>=769);
 let shownDestination=null;
 function syncDestination(){
  const visible=hud.classList.contains('visible');route.hidden=!visible;
  if(!visible){shownDestination=null;return;}
  const id=hud.dataset.destination,room=api.rooms[id];
  if(!room)return;
  const changed=id!==shownDestination;shownDestination=id;
  const outdoor=room.code?.startsWith('OUT-')||id==='track';
  el('guide-place-meta').textContent=[room.buildingName,outdoor?'戶外景點':room.floor?room.floor+'F':null,room.code?'固定編號：'+room.code:null].filter(Boolean).join(' · ');
  el('guide-place-hint').textContent=room.floor>1?'帶路將經由走廊與樓梯前往此樓層；手動移動可隨時接管。':'選擇「自動帶路」前往；也可沿著場景中的路線自行走訪。';
  let photo=null;
  if(id==='grandstand')photo=['stage-2019','司令台正面','2019 年 10 月 22 日實景紀錄；現況可能已有變更。'];
  else if(id==='track')photo=['track-2019','操場與跑道','2019 年 10 月 22 日實景紀錄；鋪面配色依現版平面圖呈現。'];
  else if(room.buildingId==='admin-front')photo=['admin-front','行政前棟外觀','外觀對照照片，拍攝日期未提供；非所選處室內景。'];
  el('guide-place-figure').hidden=!photo;
  notes.querySelector('summary').textContent=photo?'目的地筆記與實景':'目的地筆記';
  if(photo){el('guide-place-photo').src='photos/'+photo[0]+'.jpg';el('guide-place-photo').alt=photo[1];el('guide-place-caption').textContent=photo[2];}
  else{el('guide-place-photo').removeAttribute('src');el('guide-place-caption').textContent='';}
  if(changed){notes.open=false;if(innerWidth<769){setPanel(false);el('btn-auto-walk').focus({preventScroll:true});}}
 }
 new MutationObserver(syncDestination).observe(hud,{attributes:true,attributeFilter:['class','data-destination']});
 syncDestination();
 el('btn-cancel-nav').addEventListener('click',()=>{if(route.contains(document.activeElement))toggle.focus({preventScroll:true});});
 const cover=document.createElement('dialog');cover.id='guide-landing';cover.setAttribute('aria-labelledby','guide-title');
 cover.innerHTML='<header><div class="guide-mast"><span class="guide-seal">溪</span><div><small>桃園市立大溪國中</small><strong>115 學年度 · 校園探索手冊</strong></div></div><span class="guide-edition">山城・木藝・校園日常</span></header><main class="guide-hero"><div class="guide-copy"><p class="guide-eyebrow">打開手冊，從大溪出發</p><h1 id="guide-title">每一條路，<br>都有大溪的故事。</h1><p>從校門到教室，從閱讀到創作。<br>用自己的步調，認識我們的校園。</p><button id="guide-start" class="guide-primary">翻開校園手冊　↗</button><small>實景照片 × 立體探索 × 校園路線</small></div><figure><img src="reference-aerial.jpg" alt="大溪國中校園空拍實景"><figcaption>FIELD NOTES / 大溪國中實景</figcaption></figure></main><nav class="guide-chapters" aria-label="探索入口"><button data-chapter="first"><span>01</span><h2>第一次來大溪</h2><p>從正門開始，認識校園與常用處室。</p><b>開始走訪 ↗</b></button><button data-chapter="search"><span>02</span><h2>找教室與處室</h2><p>輸入教室或地點，讓路線帶你前往。</p><b>尋找目的地 ↗</b></button><button data-chapter="stories"><span>03</span><h2>認識校園故事</h2><p>木藝、閱讀與操場，探索校園的日常。</p><b>選一段散步 ↗</b></button></nav><footer>大溪校園探索手冊<span>依 115 學年度平面圖建置</span></footer>';
 document.body.append(cover);
 let previousFocus=null;
 function openCover(){previousFocus=document.activeElement;api.manualTakeover();cover.showModal();el('guide-start').focus()}
 function enter(chapter){cover.close();if(chapter==='first')el('btn-walk').click();setPanel(chapter!=='first'||innerWidth>=769);if(chapter==='search')el('search-input').focus();else if(chapter==='stories'){el('guide-stories').scrollIntoView({block:'nearest'});el('guide-stories').querySelector('button').focus()}else toggle.focus()}
 el('guide-start').onclick=()=>enter('first');cover.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>enter(b.dataset.chapter));el('guide-cover').onclick=openCover;
 cover.addEventListener('cancel',()=>{if(previousFocus?.isConnected)previousFocus.focus();else toggle.focus()});
 if(!new URLSearchParams(location.search).has('to')&&!new URLSearchParams(location.search).has('view'))openCover();
})();

;
/* static-batching.js */
/* Merge only declared static decorations, inside their existing visibility groups. */
const CampusStaticBatch = (() => {
 function batch(group) {
  for(const child of [...group.children])if(child.isGroup)batch(child);
  const batches=new Map();
  for(const mesh of group.children){
   if(!mesh.isMesh||mesh.isInstancedMesh||mesh.isSkinnedMesh||!mesh.visible||mesh.name||Object.keys(mesh.userData).length||Array.isArray(mesh.material)||mesh.material.map||mesh.material.transparent||mesh.geometry.morphAttributes.position||mesh.geometry.drawRange.count!==Infinity)continue;
   const geometry=mesh.geometry;
   if(!geometry.attributes.position||!geometry.attributes.normal||Object.keys(geometry.attributes).some(key=>!['position','normal','uv'].includes(key)))continue;
   const key=[mesh.material.uuid,mesh.castShadow,mesh.receiveShadow,mesh.renderOrder,mesh.layers.mask,!!geometry.attributes.uv].join('/');
   if(!batches.has(key))batches.set(key,[]);batches.get(key).push(mesh);
  }
  for(const meshes of batches.values()){
   if(meshes.length<2)continue;
   const data={position:[],normal:[],uv:[]},first=meshes[0];
   for(const mesh of meshes){
    mesh.updateMatrix();const geometry=(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone()).applyMatrix4(mesh.matrix);
    for(const name of ['position','normal','uv'])if(geometry.attributes[name])for(const n of geometry.attributes[name].array)data[name].push(n);
    geometry.dispose();group.remove(mesh);
    // Original geometries may be shared by retained objects; let unreferenced CPU data be collected.
   }
   const geometry=new THREE.BufferGeometry();
   for(const name of ['position','normal','uv'])if(data[name].length)geometry.setAttribute(name,new THREE.Float32BufferAttribute(data[name],name==='uv'?2:3));
   geometry.computeBoundingSphere();
   const merged=new THREE.Mesh(geometry,first.material);merged.name='batched-static-decoration';
   merged.castShadow=first.castShadow;merged.receiveShadow=first.receiveShadow;merged.renderOrder=first.renderOrder;merged.layers.mask=first.layers.mask;
   group.add(merged);
  }
 }
 return {batch};
})();
(() => {
 const scene=window.campusExplorer?.scene;if(!scene)return;
 const names=['campus-landscape-refinement','photo-outdoor','basketball-court-complex','entrance-palm-avenue'];
 for(const group of scene.children)if(names.includes(group.name)||group.name.startsWith('photo-admin-'))CampusStaticBatch.batch(group);
})();

;
/* startup-metrics.js */
/* Opt-in browser diagnostics, including the first completed WebGL frame. */
const profileStartup=new URLSearchParams(location.search).has('profile');
const builtMs=Math.round(performance.now());
requestAnimationFrame(()=>{
 const readyMs=Math.round(performance.now());
 if(profileStartup){
  const resources=performance.getEntriesByType('resource');
  console.info('CAMPUS_STARTUP '+JSON.stringify({builtMs,readyMs,requests:resources.length,scriptRequests:resources.filter(r=>r.initiatorType==='script').length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,groups:scene.children.map(g=>{let meshes=0;g.traverse(o=>{if(o.isMesh)meshes++});return{name:g.name,type:g.type,meshes}}).filter(g=>g.meshes>10).sort((a,b)=>b.meshes-a.meshes).slice(0,16),resources:resources.map(r=>({name:r.name.split('/').at(-1),ms:Math.round(r.duration),bytes:r.transferSize}))}));
 }
 parent!==window&&parent.postMessage({type:'campus-ready',readyMs},'*');
});

;
/* anniversary-model.js */
/* Pure timeline and normalized burst geometry, shared by the renderer and tests. */
(() => {
  const phaseAt = ms => ms < 1800 ? 'night' : ms < 14000 ? 'show' : ms < 20000 ? 'finale' : 'free';
  function shapePoints(shape, count) {
    return Array.from({length: count}, (_, i) => {
      const a = i / count * Math.PI * 2;
      if (shape === 'heart') return {x: Math.pow(Math.sin(a), 3), y: -(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))/16};
      const r = shape === 'star' ? .72 + .28 * Math.cos(5*a) : 1;
      return {x: Math.sin(a)*r, y: Math.cos(a)*r};
    });
  }
  function frameStep(now,last){
    const elapsedMs=last?Math.max(0,now-last):0;
    return {elapsedMs,simulationSeconds:Math.min(elapsedMs/1000,.06)};
  }
  window.CampusAnniversary = Object.freeze({phaseAt, shapePoints, frameStep});
})();

;
/* firework-audio.js */
/* Locally synthesized stereo fireworks. Buffers are created only after opt-in. */
(() => {
  function synthesize(kind, sampleRate, random = Math.random) {
    const duration = kind === 'launch' ? .86 : 3.25;
    const channels = [new Float32Array(Math.ceil(duration * sampleRate)), new Float32Array(Math.ceil(duration * sampleRate))];
    const pops = kind === 'launch' ? [] : Array.from({length: 44}, () => ({
      time: .18 + random() ** .65 * 1.85, strength: .08 + random() * .20,
      decay: .007 + random() * .025, pan: random() * 1.6 - .8
    }));
    let bass = 0, phase = 0;
    for (let i = 0; i < channels[0].length; i++) {
      const t = i / sampleRate, noise = random() * 2 - 1;
      bass += (noise - bass) * (1 - Math.exp(-2 * Math.PI * 170 / sampleRate));
      phase += 2 * Math.PI * (42 + 51 * Math.exp(-t * 15)) / sampleRate;
      for (let c = 0; c < 2; c++) {
        const side = random() * 2 - 1;
        let value;
        if (kind === 'launch') {
          const envelope = Math.min(1, t / .045) * Math.pow(Math.max(0, 1 - t / duration), .65);
          value = (noise * .22 + side * .11 + Math.sin(2 * Math.PI * (520 * t + 750 * t * t)) * .065) * envelope;
        } else {
          const attack = Math.min(1, t / .0015);
          const impact = (noise * .53 + side * .17) * Math.exp(-t * 34);
          const boom = (Math.sin(phase) * .42 + bass * 1.15) * Math.exp(-t * 3.5);
          const tail = side * .14 * Math.exp(-t * 1.65) * (1 - Math.exp(-t * 30));
          value = (impact + boom + tail) * attack;

        }
        channels[c][i] = value;
      }
    }
    for (const pop of pops) for (let c=0;c<2;c++) {
      const start=Math.max(0,Math.ceil((pop.time+(c?pop.pan*.001:0))*sampleRate));
      const count=Math.ceil(pop.decay*7*sampleRate);
      for(let j=0;j<count&&start+j<channels[c].length;j++)
        channels[c][start+j]+=(random()*2-1)*pop.strength*Math.exp(-j/sampleRate/pop.decay)*(1+(c?pop.pan:-pop.pan))*.5;
    }
    for(const channel of channels)for(let i=0;i<channel.length;i++)
      channel[i]=Math.tanh(channel[i]*1.5)*.85*Math.min(1,(duration-i/sampleRate)/.04);
    return channels;
  }
  function create(context, output) {
    const cache = new Map(), active = new Set();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -14; compressor.knee.value = 12;
    compressor.ratio.value = 7; compressor.attack.value = .003; compressor.release.value = .22;
    compressor.connect(output);
    function buffer(kind, variant) {
      const key = `${kind}-${variant}`;
      if (!cache.has(key)) {
        const data = synthesize(kind, context.sampleRate), b = context.createBuffer(2, data[0].length, context.sampleRate);
        data.forEach((samples, index) => b.copyToChannel(samples, index)); cache.set(key, b);
      }
      return cache.get(key);
    }
    function play(kind, horizontal = .5) {
      if (active.size >= 16) return;
      const source = context.createBufferSource(), gain = context.createGain(), pan = context.createStereoPanner();
      source.buffer = buffer(kind, Math.floor(Math.random() * 3));
      source.playbackRate.value = .92 + Math.random() * .16;
      gain.gain.value = kind === 'launch' ? .30 : .92;
      pan.pan.value = Math.max(-.75, Math.min(.75, (horizontal - .5) * 1.5));
      source.connect(gain); gain.connect(pan); pan.connect(compressor); active.add(source);
      source.onended = () => {active.delete(source);source.disconnect();gain.disconnect();pan.disconnect();};
      source.start();
    }
    function stop() {for (const source of active) {try {source.stop();} catch { /* Already ended. */ }} }
    return {play, stop};
  }
  window.CampusFireworkAudio = Object.freeze({synthesize, create});
})();

;
/* anniversary-fireworks.js */
/* Anniversary experience: local Canvas fireworks and opt-in synthesized audio. */
(() => {
  const api = window.campusExplorer, model = window.CampusAnniversary;
  if (!api || !model) return;
  const cake = '<svg viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M8 23h24v16H8z" fill="#e8c587"/><path d="M5 22q4-8 8 0 4-8 8 0 4-8 8 0 4-8 6 0v5H5z" fill="#fff6df" stroke="#956c36"/><path d="M20 11v9M12 14v6M28 14v6" stroke="#956c36" stroke-width="2"/><path d="M20 3q-7 8 0 8 7 0 0-8M12 7q-5 6 0 6 5 0 0-6M28 7q-5 6 0 6 5 0 0-6" fill="#c28b33"/><path d="M5 40h30" stroke="#956c36" stroke-width="2"/></svg>';
  const launcher = document.createElement('button');
  launcher.id = 'anniversary-launch'; launcher.type = 'button'; launcher.title = '校園裡藏著一份生日禮物';
  launcher.setAttribute('aria-label', '開啟大溪八十週年生日煙火'); launcher.innerHTML = cake + '<span>生日驚喜</span>';
  const dialog = document.createElement('dialog'); dialog.id = 'anniversary-dialog'; dialog.setAttribute('aria-labelledby', 'anniversary-title');
  dialog.innerHTML = `<canvas aria-hidden="true"></canvas>
    <header class="anniversary-top"><div class="anniversary-edition">DAXI · A NIGHT TO REMEMBER<strong><span>八十載光陰，</span><span>今夜一起點亮</span></strong></div><div class="anniversary-actions"><button id="anniversary-sound" type="button" aria-pressed="false">開啟音效</button><button id="anniversary-close" type="button">返回校園 ×</button></div></header>
    <section class="anniversary-message"><p class="anniversary-kicker">獻給每一位大溪人</p><div class="anniversary-number" aria-hidden="true">80</div><div class="anniversary-blessing"><h1 id="anniversary-title">大溪國中八十週年生日快樂</h1><p>下一段故事，由你續寫。</p></div></section>
    <footer class="anniversary-bottom"><p id="anniversary-status" role="status" aria-live="polite"></p><div class="anniversary-track" aria-hidden="true"><i></i></div><nav aria-label="煙火操作"><button id="anniversary-fire" type="button" hidden>送上一朵祝福煙火</button><button id="anniversary-replay" type="button">重新欣賞</button></nav><p class="anniversary-hint">音效預設關閉 · 按 Esc 返回校園</p></footer>`;
  document.body.append(launcher, dialog);
  const cover = document.getElementById('guide-landing');
  const coverEntry = document.createElement('button'); coverEntry.type='button'; coverEntry.className='anniversary-cover-entry'; coverEntry.textContent='找到了嗎？校園裡的生日驚喜 ↗';
  cover?.querySelector('footer')?.append(coverEntry);
  const $ = id => dialog.querySelector('#anniversary-' + id);
  const cvs = dialog.querySelector('canvas'), ctx = cvs.getContext('2d');
  if (!ctx) {launcher.remove();coverEntry.remove();dialog.remove();return;}
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#f6d58a','#86d6f2','#edb2bd','#d0e9ba'];
  let width=0,height=0,raf=0,last=0,elapsed=0,nextLaunch=1800,phase='',rockets=[],particles=[],digitPoints=[],staticBlessings=[],saved=null,previousFocus=null,coverWasOpen=false,lastUserLaunch=-Infinity;
  let audio=null,master=null,fireworkAudio=null,soundEnabled=false,soundWanted=false,soundGeneration=0,voices=0,finalePlayed=false;
  const nodes = new Set();
  function audioAvailable(){return soundEnabled && audio?.state==='running' && !document.hidden && dialog.open;}
  function sound(kind, horizontal=.5) {
    if (!audioAvailable()) return;
    if (kind !== 'chime') {fireworkAudio?.play(kind, horizontal);return;}
    if (voices>=8) return;
    const t=audio.currentTime; voices++;
    const gain=audio.createGain(); gain.connect(master);
    let source, filter;
    if(kind==='chime'){
      source=audio.createOscillator();source.type='sine';source.frequency.setValueAtTime(523.25,t);
      for(const frequency of [659.25,783.99]){
        const overtone=audio.createOscillator();overtone.type='sine';overtone.frequency.value=frequency;overtone.connect(gain);nodes.add(overtone);
        overtone.onended=()=>{nodes.delete(overtone);overtone.disconnect();};overtone.start(t);overtone.stop(t+1.55);
      }
      gain.gain.setValueAtTime(.001,t);gain.gain.linearRampToValueAtTime(.075,t+.03);gain.gain.exponentialRampToValueAtTime(.001,t+1.5);
    }
    if(kind==='chime')source.connect(gain);
    nodes.add(source);source.onended=()=>{voices=Math.max(0,voices-1);nodes.delete(source);source.disconnect();filter?.disconnect();gain.disconnect();};
    source.start(t);source.stop(t+(kind==='chime'?1.55:1));
  }
  function quiet(){soundGeneration++;soundEnabled=false;fireworkAudio?.stop();for(const node of nodes){try{node.stop();}catch{ /* Already ended. */ }}if(audio)audio.suspend().catch(()=>{});}
  function updateSound(){ $('sound').textContent=soundWanted?'關閉音效':'開啟音效';$('sound').setAttribute('aria-pressed',String(soundWanted)); }
  async function resumeSound(chime=false){
    const generation=++soundGeneration;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)throw new Error('Audio unavailable');
      if(!audio){audio=new Audio();master=audio.createGain();master.gain.value=.72;master.connect(audio.destination);fireworkAudio=window.CampusFireworkAudio.create(audio,master);}
      await audio.resume();
      if(generation!==soundGeneration){if(!soundWanted||!dialog.open||document.hidden)audio.suspend().catch(()=>{});return;}
      soundEnabled=soundWanted&&dialog.open&&!document.hidden;
      if(soundEnabled&&chime)sound('chime');else if(!soundEnabled)quiet();
    }catch{if(generation!==soundGeneration)return;soundWanted=false;quiet();updateSound();$('status').textContent='此瀏覽器暫時無法播放音效，仍可欣賞煙火。';}
  }
  $('sound').onclick=()=>{
    soundWanted=!soundWanted;updateSound();
    if(soundWanted)void resumeSound(true);else quiet();
  };
  function resize(){
    width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);
    cvs.width=Math.round(width*ratio);cvs.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    const box=dialog.querySelector('.anniversary-number').getBoundingClientRect();
    const stencil=document.createElement('canvas');stencil.width=Math.ceil(box.width);stencil.height=Math.ceil(box.height);
    const pen=stencil.getContext('2d');if(!pen)return;
    const typography=getComputedStyle(dialog.querySelector('.anniversary-number'));
    pen.font=typography.font;pen.letterSpacing=typography.letterSpacing;pen.textAlign='center';pen.textBaseline='middle';pen.fillText('80',box.width/2,box.height*.48);
    const pixels=pen.getImageData(0,0,stencil.width,stencil.height).data;digitPoints=[];
    const step=width<600?5:6;
    for(let y=0;y<stencil.height;y+=step)for(let x=0;x<stencil.width;x+=step)if(pixels[(y*stencil.width+x)*4+3]>110)digitPoints.push({x:box.left+x,y:box.top+y});
  }
  function launch(x,y,shape='round',color=colors[Math.floor(Math.random()*colors.length)]){
    if(rockets.length>=7)return;
    rockets.push({x0:width*(.25+Math.random()*.5),x,y:Math.max(90,Math.min(height*.65,y)),age:0,color,shape});sound('launch',x/width);
  }
  function burst(r){
    sound('burst',r.x/width);
    const scale=Math.min(width,height)*(.12+Math.random()*.055);
    for(const p of model.shapePoints(r.shape,width<600?70:110)){
      if(particles.length>=1100)break;
      const speed=scale*(.8+Math.random()*.2);
      particles.push({x:r.x,y:r.y,vx:p.x*speed,vy:p.y*speed,age:0,life:1.7+Math.random()*.65,color:r.color,trail:[]});
    }
  }
  function setPhase(value){
    if(phase===value)return;phase=value;dialog.dataset.phase=value;
    $('status').textContent=value==='night'?'校園入夜，一份生日驚喜即將升空。':value==='show'?'讓每一道光，成為送給大溪的祝福。':value==='finale'?'大溪八十，生日快樂。':reduced.matches?'靜態紀念模式：送上一道祝福星光。':'點一下天空，親手送上一朵祝福煙火。';
    $('fire').hidden=value!=='free';
    if(value==='finale'&&!finalePlayed){sound('chime');finalePlayed=true;}
  }
  function night(amount){
    if(!saved)return;
    api.scene.background?.copy(saved.background).lerp(new THREE.Color(0x071329),amount);
    if(api.scene.fog&&saved.fog)api.scene.fog.color.copy(saved.fog).lerp(new THREE.Color(0x071329),amount);
    for(const [light,intensity] of saved.lights)light.intensity=intensity*(1-amount*.62);
  }
  function paint(dt){
    ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation='lighter';
    for(let i=0;i<55;i++){const x=((i*173+47)%997)/997*width,y=((i*83+11)%389)/389*height*.65;ctx.globalAlpha=.18+Math.sin(elapsed/1800+i)*.1;ctx.fillStyle='#e6d7b9';ctx.fillRect(x,y,1.2,1.2);}
    ctx.globalAlpha=1;
    for(const r of rockets){r.age+=dt;const t=Math.min(1,r.age/.85),e=1-Math.pow(1-t,2);const x=r.x0+(r.x-r.x0)*e,y=height*.91+(r.y-height*.91)*e;
      ctx.strokeStyle=r.color;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(x,y+Math.max(9,55*(1-t)));ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff6cf';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();
      if(t===1)burst(r);
    }
    rockets=rockets.filter(r=>r.age<.85);
    for(const p of particles){p.age+=dt;p.trail.push({x:p.x,y:p.y});if(p.trail.length>4)p.trail.shift();p.vx*=Math.exp(-dt*.8);p.vy+=dt*24;p.x+=p.vx*dt;p.y+=p.vy*dt;
      ctx.globalAlpha=Math.max(0,1-p.age/p.life);ctx.strokeStyle=p.color;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(p.trail[0].x,p.trail[0].y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,1.8,1.8);
    }
    particles=particles.filter(p=>p.age<p.life);
    if(phase==='finale'||phase==='free'){
      const opacity=reduced.matches?1:Math.min(1,(elapsed-14000)/1700);
      digitPoints.forEach((p,i)=>{ctx.globalAlpha=Math.max(0,opacity)*(.65+.35*Math.sin(i*1.7+elapsed/1200)**2);ctx.fillStyle=i%7?'#ffdda0':'#fff8dc';ctx.beginPath();ctx.arc(p.x,p.y,i%7?1.2:2,0,Math.PI*2);ctx.fill();});
    }
    ctx.globalAlpha=1;ctx.strokeStyle='#ffdda0';ctx.lineWidth=1.5;
    for(const p of staticBlessings){ctx.beginPath();ctx.moveTo(p.x-9,p.y);ctx.lineTo(p.x+9,p.y);ctx.moveTo(p.x,p.y-9);ctx.lineTo(p.x,p.y+9);ctx.stroke();}
    ctx.globalCompositeOperation='source-over';
  }
  function frame(now){
    if(!dialog.open||document.hidden)return;
    const step=model.frameStep(now,last),dt=step.simulationSeconds;last=now;
    elapsed+=step.elapsedMs;setPhase(reduced.matches?'free':model.phaseAt(elapsed));night(reduced.matches?1:Math.min(1,elapsed/1800));
    if(!reduced.matches&&phase!=='free'&&elapsed>=nextLaunch){
      const i=Math.round(nextLaunch/850);launch(width*(.16+Math.random()*.68),height*(.16+Math.random()*.28),['round','star','heart'][i%3]);nextLaunch=elapsed+(phase==='finale'?600:850);
    }
    dialog.querySelector('.anniversary-track i').style.width=Math.min(100,elapsed/200)+'%';
    paint(dt);if(!reduced.matches)raf=requestAnimationFrame(frame);
  }
  function replay(){cancelAnimationFrame(raf);rockets=[];particles=[];staticBlessings=[];elapsed=reduced.matches?20000:0;nextLaunch=1800;last=0;phase='';finalePlayed=false;quiet();if(soundWanted)void resumeSound();setPhase(reduced.matches?'free':'night');raf=requestAnimationFrame(frame);}
  function open(){
    if(dialog.open)return;
    previousFocus=document.activeElement;coverWasOpen=!!cover?.open;if(coverWasOpen)cover.close();
    api.manualTakeover();api.resetManualInput();document.exitPointerLock?.();
    saved={mode:currentMode,position:api.camera.position.clone(),target:api.controls.target.clone(),background:api.scene.background.clone(),fog:api.scene.fog?.color.clone(),lights:[],enabled:api.controls.enabled,damping:api.controls.enableDamping,autoRotate:api.controls.autoRotate};
    api.scene.traverse(object=>{if(object.isLight)saved.lights.push([object,object.intensity]);});
    api.setControlMode('bird');cancelCameraTween();api.controls.enabled=false;api.controls.autoRotate=false;
    // OrbitControls.update runs in the campus loop even when input is disabled.
    // Flush its residual deltas before setting the celebration camera.
    api.controls.enableDamping=false;api.controls.update();
    api.camera.position.set(-155,80,230);api.controls.target.set(-12,49,0);api.camera.lookAt(api.controls.target);
    document.body.classList.add('anniversary-open');dialog.showModal();soundWanted=false;updateSound();resize();replay();$('sound').focus();
  }
  function close(){dialog.close();}
  dialog.addEventListener('close',()=>{
    cancelAnimationFrame(raf);soundWanted=false;quiet();updateSound();rockets=[];particles=[];
    document.body.classList.remove('anniversary-open');
    if(saved){night(0);api.setControlMode(saved.mode);cancelCameraTween();api.camera.position.copy(saved.position);api.controls.target.copy(saved.target);api.camera.lookAt(saved.target);api.controls.enabled=saved.enabled;api.controls.enableDamping=saved.damping;api.controls.autoRotate=saved.autoRotate;saved=null;}
    if(coverWasOpen)cover.showModal();previousFocus?.focus();
  });
  function freeFire(event){
    if(phase!=='free'||performance.now()-lastUserLaunch<250)return;lastUserLaunch=performance.now();
    const x=event?.clientX??width*(.25+Math.random()*.5),y=event?.clientY??height*.3;
    if(reduced.matches){staticBlessings.push({x,y});if(staticBlessings.length>12)staticBlessings.shift();paint(0);$('status').textContent='收到你的祝福，大溪八十，生日快樂！';sound('chime');return;}
    launch(x,y,['round','heart','star'][Math.floor(Math.random()*3)]);
  }
  cvs.addEventListener('pointerdown',freeFire);$('fire').onclick=()=>freeFire();$('close').onclick=close;$('replay').onclick=replay;launcher.onclick=open;coverEntry.onclick=open;
  window.addEventListener('resize',()=>{if(dialog.open){resize();if(reduced.matches)paint(0);}});
  reduced.addEventListener('change',()=>{if(dialog.open)replay();});
  document.addEventListener('visibilitychange',()=>{
    if(!dialog.open)return;
    if(document.hidden){cancelAnimationFrame(raf);quiet();}else{last=0;if(soundWanted)void resumeSound();raf=requestAnimationFrame(frame);}
  });
})();

;