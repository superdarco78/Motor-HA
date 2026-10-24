/* Motor HA – okno 3D · © superdarco78 · CC BY-NC-SA 4.0 · three.js © three.js authors, MIT */
var sm=Object.defineProperty;var rm=(i,t)=>{for(var e in t)sm(i,e,{get:t[e],enumerable:!0})};var om=0,eh=1,am=2;var Nf=1,Zl=2,Jn=3,xn=0,Ee=1,Te=2;var We=0,On=1,Io=2,nh=3,ih=4,cm=5,Pi=100,lm=101,um=102,sh=103,rh=104,hm=200,fm=201,dm=202,pm=203,rl=204,ol=205,mm=206,gm=207,xm=208,vm=209,_m=210,ym=211,bm=212,Mm=213,Sm=214,wm=0,Tm=1,Em=2,Lo=3,Am=4,Rm=5,Cm=6,Pm=7,Uf=0,Im=1,Lm=2,zn=0,Dm=1,Fm=2,Nm=3,$l=4,Um=5,Bm=6;var Bf=300,Ms=301,Ss=302,Ni=303,al=304,oa=306,Xe=1e3,xe=1001,cl=1002,Pt=1003,oh=1004;var Tc=1005;var ae=1006,Om=1007;var yr=1008,Of=1008,gn=1009,aa=1010,Jl=1011,Nr=1012,Ds=1013,en=1014,Kt=1015,He=1016,zf=1017,kf=1018,Li=1020,zm=1021,Ht=1023,km=1024,Hm=1025,Di=1026,ws=1027,di=1028,ca=1029,Ur=1030,Fs=1031,Ns=1033,Ec=33776,Ac=33777,Rc=33778,Cc=33779,ah=35840,ch=35841,lh=35842,uh=35843,Hf=36196,hh=37492,fh=37496,dh=37808,ph=37809,mh=37810,gh=37811,xh=37812,vh=37813,_h=37814,yh=37815,bh=37816,Mh=37817,Sh=37818,wh=37819,Th=37820,Eh=37821,Pc=36492,Ah=36494,Rh=36495,Vm=36283,Ch=36284,Ph=36285,Ih=36286;var Do=2300,Fo=2301,Ic=2302,Lh=2400,Dh=2401,Fh=2402;var Vf=3e3,Fi=3001,Gm=3200,Wm=3201,Gf=0,Xm=1,Mn="",Le="srgb",Qn="srgb-linear",Kl="display-p3",la="display-p3-linear",No="linear",pe="srgb",Uo="rec709",Bo="p3";var Qi=7680;var Nh=519,qm=512,Ym=513,Zm=514,Wf=515,$m=516,Jm=517,Km=518,jm=519,Uh=35044;var Bh="300 es",ll=1035,jn=2e3,Oo=2001,hi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},$e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oh=1234567,pr=Math.PI/180,br=180/Math.PI;function Gi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function Pe(i,t,e){return Math.max(t,Math.min(e,i))}function jl(i,t){return(i%t+t)%t}function Qm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function tg(i,t,e){return i!==t?(e-i)/(t-i):0}function mr(i,t,e){return(1-e)*i+e*t}function eg(i,t,e,n){return mr(i,t,1-Math.exp(-e*n))}function ng(i,t=1){return t-Math.abs(jl(i,t*2)-t)}function ig(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function sg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function rg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function og(i,t){return i+Math.random()*(t-i)}function ag(i){return i*(.5-Math.random())}function cg(i){i!==void 0&&(Oh=i);let t=Oh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function lg(i){return i*pr}function ug(i){return i*br}function ul(i){return(i&i-1)===0&&i!==0}function hg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function zo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*f,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Xf={DEG2RAD:pr,RAD2DEG:br,generateUUID:Gi,clamp:Pe,euclideanModulo:jl,mapLinear:Qm,inverseLerp:tg,lerp:mr,damp:eg,pingpong:ng,smoothstep:ig,smootherstep:sg,randInt:rg,randFloat:og,randFloatSpread:ag,seededRandom:cg,degToRad:lg,radToDeg:ug,isPowerOfTwo:ul,ceilPowerOfTwo:hg,floorPowerOfTwo:zo,setQuaternionFromProperEuler:fg,normalize:Qe,denormalize:gs},Y=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],x=s[0],d=s[3],m=s[6],_=s[1],v=s[4],y=s[7],S=s[2],T=s[5],M=s[8];return r[0]=o*x+a*_+c*S,r[3]=o*d+a*v+c*T,r[6]=o*m+a*y+c*M,r[1]=l*x+h*_+f*S,r[4]=l*d+h*v+f*T,r[7]=l*m+h*y+f*M,r[2]=u*x+p*_+g*S,r[5]=u*d+p*v+g*T,r[8]=u*m+p*y+g*M,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,u=a*c-h*r,p=l*r-o*c,g=e*f+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=f*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lc.makeScale(t,e)),this}rotate(t){return this.premultiply(Lc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Lc=new qt;function qf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Mr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dg(){let i=Mr("canvas");return i.style.display="block",i}var zh={};function gr(i){i in zh||(zh[i]=!0,console.warn(i))}var kh=new qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hh=new qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),no={[Qn]:{transfer:No,primaries:Uo,toReference:i=>i,fromReference:i=>i},[Le]:{transfer:pe,primaries:Uo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[la]:{transfer:No,primaries:Bo,toReference:i=>i.applyMatrix3(Hh),fromReference:i=>i.applyMatrix3(kh)},[Kl]:{transfer:pe,primaries:Bo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Hh),fromReference:i=>i.applyMatrix3(kh).convertLinearToSRGB()}},pg=new Set([Qn,la]),re={enabled:!0,_workingColorSpace:Qn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!pg.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=no[t].toReference,s=no[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return no[i].primaries},getTransfer:function(i){return i===Mn?No:no[i].transfer}};function ys(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Dc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ts,ko=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ts===void 0&&(ts=Mr("canvas")),ts.width=t.width,ts.height=t.height;let n=ts.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ts}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Mr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ys(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ys(e[n]/255)*255):e[n]=ys(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mg=0,Ts=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Gi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Fc(s[o].image)):r.push(Fc(s[o]))}else r=Fc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ko.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gg=0,on=class i extends hi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xe,s=xe,r=ae,o=yr,a=Ht,c=gn,l=i.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=Gi(),this.name="",this.source=new Ts(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Y(0,0),this.repeat=new Y(1,1),this.center=new Y(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Fi?Le:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xe:t.x=t.x-Math.floor(t.x);break;case xe:t.x=t.x<0?0:1;break;case cl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xe:t.y=t.y-Math.floor(t.y);break;case xe:t.y=t.y<0?0:1;break;case cl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Le?Fi:Vf}set encoding(t){gr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Fi?Le:Mn}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Bf;on.DEFAULT_ANISOTROPY=1;var ne=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],p=c[5],g=c[9],x=c[2],d=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(g-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,y=(p+1)/2,S=(m+1)/2,T=(h+u)/4,M=(f+x)/4,I=(g+d)/4;return v>y&&v>S?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=M/n):y>S?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=I/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=M/r,s=I/r),this.set(n,s,r,e),this}let _=Math.sqrt((d-g)*(d-g)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(d-g)/_,this.y=(f-x)/_,this.z=(u-h)/_,this.w=Math.acos((l+p+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hl=class extends hi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(gr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fi?Le:Mn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ae,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new on(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ts(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ve=class extends hl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ui=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=xe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ho=class extends Ve{constructor(t=1,e=1,n=1,s={}){super(t,e,s),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Ui(null,t,e,n),this.texture.isRenderTargetTexture=!0}},fl=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=xe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(f!==x||c!==u||l!==p||h!==g){let d=1-a,m=c*u+l*p+h*g+f*x,_=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let S=Math.sqrt(v),T=Math.atan2(S,m*_);d=Math.sin(d*T)/S,a=Math.sin(a*T)/S}let y=a*_;if(c=c*d+u*y,l=l*d+p*y,h=h*d+g*y,f=f*d+x*y,d===1-a){let S=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=S,l*=S,h*=S,f*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*f+c*p-l*u,t[e+1]=c*g+h*u+l*f-a*p,t[e+2]=l*g+h*p+a*u-c*f,t[e+3]=h*g-a*f-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"YZX":this._x=u*h*f+l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f-u*p*g;break;case"XZY":this._x=u*h*f-l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){let p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){let p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*f+this._w*u,this._x=n*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Nc.copy(this).projectOnVector(t),this.sub(Nc)}reflect(t){return this.sub(Nc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nc=new P,Vh=new kn,ve=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(An.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(An.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(t.matrixWorld),this.expandByPoint(An);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(t.matrixWorld),this.union(io)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),so.subVectors(this.max,ar),es.subVectors(t.a,ar),ns.subVectors(t.b,ar),is.subVectors(t.c,ar),ri.subVectors(ns,es),oi.subVectors(is,ns),Ti.subVectors(es,is);let e=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-Ti.z,Ti.y,ri.z,0,-ri.x,oi.z,0,-oi.x,Ti.z,0,-Ti.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-Ti.y,Ti.x,0];return!Uc(e,es,ns,is,so)||(e=[1,0,0,0,1,0,0,0,1],!Uc(e,es,ns,is,so))?!1:(ro.crossVectors(ri,oi),e=[ro.x,ro.y,ro.z],Uc(e,es,ns,is,so))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,An).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(An).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Xn=[new P,new P,new P,new P,new P,new P,new P,new P],An=new P,io=new ve,es=new P,ns=new P,is=new P,ri=new P,oi=new P,Ti=new P,ar=new P,so=new P,ro=new P,Ei=new P;function Uc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ei.fromArray(i,r);let a=s.x*Math.abs(Ei.x)+s.y*Math.abs(Ei.y)+s.z*Math.abs(Ei.z),c=t.dot(Ei),l=e.dot(Ei),h=n.dot(Ei);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var xg=new ve,cr=new P,Bc=new P,ti=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):xg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cr.subVectors(t,this.center);let e=cr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cr.copy(t.center).add(Bc)),this.expandByPoint(cr.copy(t.center).sub(Bc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},qn=new P,Oc=new P,oo=new P,ai=new P,zc=new P,ao=new P,kc=new P,dl=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Oc.copy(t).add(e).multiplyScalar(.5),oo.copy(e).sub(t).normalize(),ai.copy(this.origin).sub(Oc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(oo),a=ai.dot(this.direction),c=-ai.dot(oo),l=ai.lengthSq(),h=Math.abs(1-o*o),f,u,p,g;if(h>0)if(f=o*c-a,u=o*a-c,g=r*h,f>=0)if(u>=-g)if(u<=g){let x=1/h;f*=x,u*=x,p=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u<=-g?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Oc).addScaledVector(oo,u),p}intersectSphere(t,e){qn.subVectors(t.center,this.origin);let n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,n,s,r){zc.subVectors(e,t),ao.subVectors(n,t),kc.crossVectors(zc,ao);let o=this.direction.dot(kc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,t);let c=a*this.direction.dot(ao.crossVectors(ai,ao));if(c<0)return null;let l=a*this.direction.dot(zc.cross(ai));if(l<0||c+l>o)return null;let h=-a*ai.dot(kc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class i{constructor(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,d){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,d)}set(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,d){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=u,m[3]=p,m[7]=g,m[11]=x,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),o=1/ss.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=p+g*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,p=c*f,g=l*h,x=l*f;e[0]=u+x*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,p=c*f,g=l*h,x=l*f;e[0]=u-x*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=g*l-p,e[8]=u*l+x,e[1]=c*f,e[5]=x*l+u,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-u*f,e[8]=g*f+p,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*f+g,e[10]=u-x*f}else if(t.order==="XZY"){let u=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+x,e[5]=o*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*h,e[10]=x*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vg,t,_g)}lookAt(t,e,n){let s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),ci.crossVectors(n,fn),ci.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),ci.crossVectors(n,fn)),ci.normalize(),co.crossVectors(fn,ci),s[0]=ci.x,s[4]=co.x,s[8]=fn.x,s[1]=ci.y,s[5]=co.y,s[9]=fn.y,s[2]=ci.z,s[6]=co.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],x=n[6],d=n[10],m=n[14],_=n[3],v=n[7],y=n[11],S=n[15],T=s[0],M=s[4],I=s[8],b=s[12],w=s[1],L=s[5],D=s[9],B=s[13],C=s[2],N=s[6],O=s[10],W=s[14],Z=s[3],q=s[7],j=s[11],K=s[15];return r[0]=o*T+a*w+c*C+l*Z,r[4]=o*M+a*L+c*N+l*q,r[8]=o*I+a*D+c*O+l*j,r[12]=o*b+a*B+c*W+l*K,r[1]=h*T+f*w+u*C+p*Z,r[5]=h*M+f*L+u*N+p*q,r[9]=h*I+f*D+u*O+p*j,r[13]=h*b+f*B+u*W+p*K,r[2]=g*T+x*w+d*C+m*Z,r[6]=g*M+x*L+d*N+m*q,r[10]=g*I+x*D+d*O+m*j,r[14]=g*b+x*B+d*W+m*K,r[3]=_*T+v*w+y*C+S*Z,r[7]=_*M+v*L+y*N+S*q,r[11]=_*I+v*D+y*O+S*j,r[15]=_*b+v*B+y*W+S*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],p=t[14],g=t[3],x=t[7],d=t[11],m=t[15];return g*(+r*c*f-s*l*f-r*a*u+n*l*u+s*a*p-n*c*p)+x*(+e*c*p-e*l*u+r*o*u-s*o*p+s*l*h-r*c*h)+d*(+e*l*f-e*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+m*(-s*a*h-e*c*f+e*a*u+s*o*f-n*o*u+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],p=t[11],g=t[12],x=t[13],d=t[14],m=t[15],_=f*d*l-x*u*l+x*c*p-a*d*p-f*c*m+a*u*m,v=g*u*l-h*d*l-g*c*p+o*d*p+h*c*m-o*u*m,y=h*x*l-g*f*l+g*a*p-o*x*p-h*a*m+o*f*m,S=g*f*c-h*x*c-g*a*u+o*x*u+h*a*d-o*f*d,T=e*_+n*v+s*y+r*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/T;return t[0]=_*M,t[1]=(x*u*r-f*d*r-x*s*p+n*d*p+f*s*m-n*u*m)*M,t[2]=(a*d*r-x*c*r+x*s*l-n*d*l-a*s*m+n*c*m)*M,t[3]=(f*c*r-a*u*r-f*s*l+n*u*l+a*s*p-n*c*p)*M,t[4]=v*M,t[5]=(h*d*r-g*u*r+g*s*p-e*d*p-h*s*m+e*u*m)*M,t[6]=(g*c*r-o*d*r-g*s*l+e*d*l+o*s*m-e*c*m)*M,t[7]=(o*u*r-h*c*r+h*s*l-e*u*l-o*s*p+e*c*p)*M,t[8]=y*M,t[9]=(g*f*r-h*x*r-g*n*p+e*x*p+h*n*m-e*f*m)*M,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*m+e*a*m)*M,t[11]=(h*a*r-o*f*r-h*n*l+e*f*l+o*n*p-e*a*p)*M,t[12]=S*M,t[13]=(h*x*s-g*f*s+g*n*u-e*x*u-h*n*d+e*f*d)*M,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*d-e*a*d)*M,t[15]=(o*f*s-h*a*s+h*n*c-e*f*c-o*n*u+e*a*u)*M,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,u=r*l,p=r*h,g=r*f,x=o*h,d=o*f,m=a*f,_=c*l,v=c*h,y=c*f,S=n.x,T=n.y,M=n.z;return s[0]=(1-(x+m))*S,s[1]=(p+y)*S,s[2]=(g-v)*S,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(u+m))*T,s[6]=(d+_)*T,s[7]=0,s[8]=(g+v)*M,s[9]=(d-_)*M,s[10]=(1-(u+x))*M,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ss.set(s[0],s[1],s[2]).length(),o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Rn.copy(this);let l=1/r,h=1/o,f=1/a;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,e.setFromRotationMatrix(Rn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=jn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),u=(n+s)/(n-s),p,g;if(a===jn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Oo)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=jn){let c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(o-r),u=(e+t)*l,p=(n+s)*h,g,x;if(a===jn)g=(o+r)*f,x=-2*f;else if(a===Oo)g=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ss=new P,Rn=new Et,vg=new P(0,0,0),_g=new P(1,1,1),ci=new P,co=new P,fn=new P,Gh=new Et,Wh=new kn,Es=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Pe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Pe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wh.setFromEuler(this),this.setFromQuaternion(Wh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Es.DEFAULT_ORDER="XYZ";var Vo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yg=0,Xh=new P,rs=new kn,Yn=new Et,lo=new P,lr=new P,bg=new P,Mg=new kn,qh=new P(1,0,0),Yh=new P(0,1,0),Zh=new P(0,0,1),Sg={type:"added"},wg={type:"removed"},Ne=class i extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new Es,n=new kn,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Et},normalMatrix:{value:new qt}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(qh,t)}rotateY(t){return this.rotateOnAxis(Yh,t)}rotateZ(t){return this.rotateOnAxis(Zh,t)}translateOnAxis(t,e){return Xh.copy(t).applyQuaternion(this.quaternion),this.position.add(Xh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qh,t)}translateY(t){return this.translateOnAxis(Yh,t)}translateZ(t){return this.translateOnAxis(Zh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lo.copy(t):lo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(lr,lo,this.up):Yn.lookAt(lo,lr,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Yn),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Sg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wg)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,bg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Mg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new P(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=new P,Zn=new P,Hc=new P,$n=new P,os=new P,as=new P,$h=new P,Vc=new P,Gc=new P,Wc=new P,uo=!1,mn=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Cn.subVectors(t,e),s.cross(Cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Cn.subVectors(s,e),Zn.subVectors(n,e),Hc.subVectors(t,e);let o=Cn.dot(Cn),a=Cn.dot(Zn),c=Cn.dot(Hc),l=Zn.dot(Zn),h=Zn.dot(Hc),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,p=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getUV(t,e,n,s,r,o,a,c){return uo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),uo=!0),this.getInterpolation(t,e,n,s,r,o,a,c)}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,$n.x),c.addScaledVector(o,$n.y),c.addScaledVector(a,$n.z),c)}static isFrontFacing(t,e,n,s){return Cn.subVectors(n,e),Zn.subVectors(t,e),Cn.cross(Zn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Cn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Cn.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return uo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),uo=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),Vc.subVectors(t,n);let c=os.dot(Vc),l=as.dot(Vc);if(c<=0&&l<=0)return e.copy(n);Gc.subVectors(t,s);let h=os.dot(Gc),f=as.dot(Gc);if(h>=0&&f<=h)return e.copy(s);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(os,o);Wc.subVectors(t,r);let p=os.dot(Wc),g=as.dot(Wc);if(g>=0&&p<=g)return e.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(as,a);let d=h*g-p*f;if(d<=0&&f-h>=0&&p-g>=0)return $h.subVectors(r,s),a=(f-h)/(f-h+(p-g)),e.copy(s).addScaledVector($h,a);let m=1/(d+x+u);return o=x*m,a=u*m,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Yf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},ho={h:0,s:0,l:0};function Xc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Dt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=jl(t,1),e=Pe(e,0,1),n=Pe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Xc(o,r,t+1/3),this.g=Xc(o,r,t),this.b=Xc(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let n=Yf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}copyLinearToSRGB(t){return this.r=Dc(t.r),this.g=Dc(t.g),this.b=Dc(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return re.fromWorkingColorSpace(Je.copy(this),t),Math.round(Pe(Je.r*255,0,255))*65536+Math.round(Pe(Je.g*255,0,255))*256+Math.round(Pe(Je.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Je.copy(this),e);let n=Je.r,s=Je.g,r=Je.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Je.copy(this),e),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=Le){re.fromWorkingColorSpace(Je.copy(this),t);let e=Je.r,n=Je.g,s=Je.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(ho);let n=mr(li.h,ho.h,e),s=mr(li.s,ho.s,e),r=mr(li.l,ho.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Je=new Dt;Dt.NAMES=Yf;var Tg=0,Bi=class extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=On,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=ol,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==On&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rl&&(n.blendSrc=this.blendSrc),this.blendDst!==ol&&(n.blendDst=this.blendDst),this.blendEquation!==Pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Lo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Hn=class extends Bi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Uf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Kn=Eg();function Eg(){let i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Ag(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Pe(i,-65504,65504),Kn.floatView[0]=i;let t=Kn.uint32View[0],e=t>>23&511;return Kn.baseTable[e]+((t&8388607)>>Kn.shiftTable[e])}function Rg(i){let t=i>>10;return Kn.uint32View[0]=Kn.mantissaTable[Kn.offsetTable[t]+(i&1023)]+Kn.exponentTable[t],Kn.floatView[0]}var wn={toHalfFloat:Ag,fromHalfFloat:Rg},Ie=new P,fo=new Y,Qt=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Kt,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fo.fromBufferAttribute(this,e),fo.applyMatrix3(t),this.setXY(e,fo.x,fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Qe(e,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uh&&(t.usage=this.usage),t}};var Go=class extends Qt{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Wo=class extends Qt{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends Qt{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Cg=0,bn=new Et,qc=new Ne,cs=new P,dn=new ve,ur=new ve,ke=new P,oe=class i extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qf(t)?Wo:Go)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return qc.lookAt(t),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new de(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ve);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ur.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(dn.min,ur.min),dn.expandByPoint(ke),ke.addVectors(dn.max,ur.max),dn.expandByPoint(ke)):(dn.expandByPoint(ur.min),dn.expandByPoint(ur.max))}dn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ke.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),ke.add(cs)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<a;w++)l[w]=new P,h[w]=new P;let f=new P,u=new P,p=new P,g=new Y,x=new Y,d=new Y,m=new P,_=new P;function v(w,L,D){f.fromArray(s,w*3),u.fromArray(s,L*3),p.fromArray(s,D*3),g.fromArray(o,w*2),x.fromArray(o,L*2),d.fromArray(o,D*2),u.sub(f),p.sub(f),x.sub(g),d.sub(g);let B=1/(x.x*d.y-d.x*x.y);isFinite(B)&&(m.copy(u).multiplyScalar(d.y).addScaledVector(p,-x.y).multiplyScalar(B),_.copy(p).multiplyScalar(x.x).addScaledVector(u,-d.x).multiplyScalar(B),l[w].add(m),l[L].add(m),l[D].add(m),h[w].add(_),h[L].add(_),h[D].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let w=0,L=y.length;w<L;++w){let D=y[w],B=D.start,C=D.count;for(let N=B,O=B+C;N<O;N+=3)v(n[N+0],n[N+1],n[N+2])}let S=new P,T=new P,M=new P,I=new P;function b(w){M.fromArray(r,w*3),I.copy(M);let L=l[w];S.copy(L),S.sub(M.multiplyScalar(M.dot(L))).normalize(),T.crossVectors(I,L);let B=T.dot(h[w])<0?-1:1;c[w*4]=S.x,c[w*4+1]=S.y,c[w*4+2]=S.z,c[w*4+3]=B}for(let w=0,L=y.length;w<L;++w){let D=y[w],B=D.start,C=D.count;for(let N=B,O=B+C;N<O;N+=3)b(n[N+0]),b(n[N+1]),b(n[N+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,f=new P;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),x=t.getX(u+1),d=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,d),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,d),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h),p=0,g=0;for(let x=0,d=c.length;x<d;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let m=0;m<h;m++)u[g++]=l[p++]}return new Qt(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){let u=l[h],p=t(u,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let p=l[f];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jh=new Et,Ai=new dl,po=new ti,Kh=new P,ls=new P,us=new P,hs=new P,Yc=new P,mo=new P,go=new Y,xo=new Y,vo=new Y,jh=new P,Qh=new P,tf=new P,_o=new P,yo=new P,St=class extends Ne{constructor(t=new oe,e=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){mo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],f=r[c];h!==0&&(Yc.fromBufferAttribute(f,t),o?mo.addScaledVector(Yc,h):mo.addScaledVector(Yc.sub(e),h))}e.add(mo)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(r),Ai.copy(t.ray).recast(t.near),!(po.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(po,Kh)===null||Ai.origin.distanceToSquared(Kh)>(t.far-t.near)**2))&&(Jh.copy(r).invert(),Ai.copy(t.ray).applyMatrix4(Jh),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let d=u[g],m=o[d.materialIndex],_=Math.max(d.start,p.start),v=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let y=_,S=v;y<S;y+=3){let T=a.getX(y),M=a.getX(y+1),I=a.getX(y+2);s=bo(this,m,t,n,l,h,f,T,M,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let d=g,m=x;d<m;d+=3){let _=a.getX(d),v=a.getX(d+1),y=a.getX(d+2);s=bo(this,o,t,n,l,h,f,_,v,y),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let d=u[g],m=o[d.materialIndex],_=Math.max(d.start,p.start),v=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let y=_,S=v;y<S;y+=3){let T=y,M=y+1,I=y+2;s=bo(this,m,t,n,l,h,f,T,M,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let d=g,m=x;d<m;d+=3){let _=d,v=d+1,y=d+2;s=bo(this,o,t,n,l,h,f,_,v,y),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}};function Pg(i,t,e,n,s,r,o,a){let c;if(t.side===Ee?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===xn,a),c===null)return null;yo.copy(a),yo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(yo);return l<e.near||l>e.far?null:{distance:l,point:yo.clone(),object:i}}function bo(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ls),i.getVertexPosition(c,us),i.getVertexPosition(l,hs);let h=Pg(i,t,e,n,ls,us,hs,_o);if(h){s&&(go.fromBufferAttribute(s,a),xo.fromBufferAttribute(s,c),vo.fromBufferAttribute(s,l),h.uv=mn.getInterpolation(_o,ls,us,hs,go,xo,vo,new Y)),r&&(go.fromBufferAttribute(r,a),xo.fromBufferAttribute(r,c),vo.fromBufferAttribute(r,l),h.uv1=mn.getInterpolation(_o,ls,us,hs,go,xo,vo,new Y),h.uv2=h.uv1),o&&(jh.fromBufferAttribute(o,a),Qh.fromBufferAttribute(o,c),tf.fromBufferAttribute(o,l),h.normal=mn.getInterpolation(_o,ls,us,hs,jh,Qh,tf,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new P,materialIndex:0};mn.getNormal(ls,us,hs,f.normal),h.face=f}return h}var vn=class i extends oe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],f=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(f,2));function g(x,d,m,_,v,y,S,T,M,I,b){let w=y/M,L=S/I,D=y/2,B=S/2,C=T/2,N=M+1,O=I+1,W=0,Z=0,q=new P;for(let j=0;j<O;j++){let K=j*L-B;for(let ct=0;ct<N;ct++){let X=ct*w-D;q[x]=X*_,q[d]=K*v,q[m]=C,l.push(q.x,q.y,q.z),q[x]=0,q[d]=0,q[m]=T>0?1:-1,h.push(q.x,q.y,q.z),f.push(ct/M),f.push(1-j/I),W+=1}}for(let j=0;j<I;j++)for(let K=0;K<M;K++){let ct=u+K+N*j,X=u+K+N*(j+1),tt=u+(K+1)+N*(j+1),ft=u+(K+1)+N*j;c.push(ct,X,ft),c.push(X,tt,ft),Z+=6}a.addGroup(p,Z,b),p+=Z,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function As(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function tn(i){let t={};for(let e=0;e<i.length;e++){let n=As(i[e]);for(let s in n)t[s]=n[s]}return t}function Ig(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Zf(i){return i.getRenderTarget()===null?i.outputColorSpace:re.workingColorSpace}var Lg={clone:As,merge:tn},Dg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qe=class extends Bi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dg,this.fragmentShader=Fg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=Ig(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Xo=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=jn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},De=class extends Xo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=br*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return br*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(pr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},fs=-90,ds=1,pl=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new De(fs,ds,t,e);s.layers=this.layers,this.add(s);let r=new De(fs,ds,t,e);r.layers=this.layers,this.add(r);let o=new De(fs,ds,t,e);o.layers=this.layers,this.add(o);let a=new De(fs,ds,t,e);a.layers=this.layers,this.add(a);let c=new De(fs,ds,t,e);c.layers=this.layers,this.add(c);let l=new De(fs,ds,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Oo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qo=class extends on{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ms,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ml=class extends Ve{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(gr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Fi?Le:Mn),this.texture=new qo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ae}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new vn(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ee,blending:We});r.uniforms.tEquirect.value=e;let o=new St(s,r),a=e.minFilter;return e.minFilter===yr&&(e.minFilter=ae),new pl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Zc=new P,Ng=new P,Ug=new qt,pn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Zc.subVectors(n,e).cross(Ng.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Zc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ug.getNormalMatrix(t),s=this.coplanarPoint(Zc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ri=new ti,Mo=new P,Sr=class{constructor(t=new pn,e=new pn,n=new pn,s=new pn,r=new pn,o=new pn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=jn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],u=s[7],p=s[8],g=s[9],x=s[10],d=s[11],m=s[12],_=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,u-l,d-p,y-m).normalize(),n[1].setComponents(c+r,u+l,d+p,y+m).normalize(),n[2].setComponents(c+o,u+h,d+g,y+_).normalize(),n[3].setComponents(c-o,u-h,d-g,y-_).normalize(),n[4].setComponents(c-a,u-f,d-x,y-v).normalize(),e===jn)n[5].setComponents(c+a,u+f,d+x,y+v).normalize();else if(e===Oo)n[5].setComponents(a,f,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Mo.x=s.normal.x>0?t.max.x:t.min.x,Mo.y=s.normal.y>0?t.max.y:t.min.y,Mo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function $f(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Bg(i,t){let e=t.isWebGL2,n=new WeakMap;function s(l,h){let f=l.array,u=l.usage,p=f.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,f,u),l.onUploadCallback();let x;if(f instanceof Float32Array)x=i.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=i.SHORT;else if(f instanceof Uint32Array)x=i.UNSIGNED_INT;else if(f instanceof Int32Array)x=i.INT;else if(f instanceof Int8Array)x=i.BYTE;else if(f instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,f){let u=h.array,p=h._updateRange,g=h.updateRanges;if(i.bindBuffer(f,l),p.count===-1&&g.length===0&&i.bufferSubData(f,0,u),g.length!==0){for(let x=0,d=g.length;x<d;x++){let m=g[x];e?i.bufferSubData(f,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):i.bufferSubData(f,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}p.count!==-1&&(e?i.bufferSubData(f,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):i.bufferSubData(f,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let u=n.get(l);(!u||u.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let f=n.get(l);if(f===void 0)n.set(l,s(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(f.buffer,l,h),f.version=l.version}}return{get:o,remove:a,update:c}}var Rs=class i extends oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,u=e/c,p=[],g=[],x=[],d=[];for(let m=0;m<h;m++){let _=m*u-o;for(let v=0;v<l;v++){let y=v*f-r;g.push(y,-_,0),x.push(0,0,1),d.push(v/a),d.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){let v=_+l*m,y=_+l*(m+1),S=_+1+l*(m+1),T=_+1+l*m;p.push(v,y,T),p.push(y,S,T)}this.setIndex(p),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(x,3)),this.setAttribute("uv",new de(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Gg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qg=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Yg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,a0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,c0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,l0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p0="gl_FragColor = linearToOutputTexel( gl_FragColor );",m0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,g0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,b0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,T0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,E0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,A0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,C0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,I0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,L0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,D0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,N0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,B0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,O0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,z0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,k0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,H0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,V0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,W0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,X0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Z0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,tx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ex=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ox=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ux=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ax=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Px=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ix=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Xx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ov=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:Og,alphahash_pars_fragment:zg,alphamap_fragment:kg,alphamap_pars_fragment:Hg,alphatest_fragment:Vg,alphatest_pars_fragment:Gg,aomap_fragment:Wg,aomap_pars_fragment:Xg,batching_pars_vertex:qg,batching_vertex:Yg,begin_vertex:Zg,beginnormal_vertex:$g,bsdfs:Jg,iridescence_fragment:Kg,bumpmap_pars_fragment:jg,clipping_planes_fragment:Qg,clipping_planes_pars_fragment:t0,clipping_planes_pars_vertex:e0,clipping_planes_vertex:n0,color_fragment:i0,color_pars_fragment:s0,color_pars_vertex:r0,color_vertex:o0,common:a0,cube_uv_reflection_fragment:c0,defaultnormal_vertex:l0,displacementmap_pars_vertex:u0,displacementmap_vertex:h0,emissivemap_fragment:f0,emissivemap_pars_fragment:d0,colorspace_fragment:p0,colorspace_pars_fragment:m0,envmap_fragment:g0,envmap_common_pars_fragment:x0,envmap_pars_fragment:v0,envmap_pars_vertex:_0,envmap_physical_pars_fragment:I0,envmap_vertex:y0,fog_vertex:b0,fog_pars_vertex:M0,fog_fragment:S0,fog_pars_fragment:w0,gradientmap_pars_fragment:T0,lightmap_fragment:E0,lightmap_pars_fragment:A0,lights_lambert_fragment:R0,lights_lambert_pars_fragment:C0,lights_pars_begin:P0,lights_toon_fragment:L0,lights_toon_pars_fragment:D0,lights_phong_fragment:F0,lights_phong_pars_fragment:N0,lights_physical_fragment:U0,lights_physical_pars_fragment:B0,lights_fragment_begin:O0,lights_fragment_maps:z0,lights_fragment_end:k0,logdepthbuf_fragment:H0,logdepthbuf_pars_fragment:V0,logdepthbuf_pars_vertex:G0,logdepthbuf_vertex:W0,map_fragment:X0,map_pars_fragment:q0,map_particle_fragment:Y0,map_particle_pars_fragment:Z0,metalnessmap_fragment:$0,metalnessmap_pars_fragment:J0,morphcolor_vertex:K0,morphnormal_vertex:j0,morphtarget_pars_vertex:Q0,morphtarget_vertex:tx,normal_fragment_begin:ex,normal_fragment_maps:nx,normal_pars_fragment:ix,normal_pars_vertex:sx,normal_vertex:rx,normalmap_pars_fragment:ox,clearcoat_normal_fragment_begin:ax,clearcoat_normal_fragment_maps:cx,clearcoat_pars_fragment:lx,iridescence_pars_fragment:ux,opaque_fragment:hx,packing:fx,premultiplied_alpha_fragment:dx,project_vertex:px,dithering_fragment:mx,dithering_pars_fragment:gx,roughnessmap_fragment:xx,roughnessmap_pars_fragment:vx,shadowmap_pars_fragment:_x,shadowmap_pars_vertex:yx,shadowmap_vertex:bx,shadowmask_pars_fragment:Mx,skinbase_vertex:Sx,skinning_pars_vertex:wx,skinning_vertex:Tx,skinnormal_vertex:Ex,specularmap_fragment:Ax,specularmap_pars_fragment:Rx,tonemapping_fragment:Cx,tonemapping_pars_fragment:Px,transmission_fragment:Ix,transmission_pars_fragment:Lx,uv_pars_fragment:Dx,uv_pars_vertex:Fx,uv_vertex:Nx,worldpos_vertex:Ux,background_vert:Bx,background_frag:Ox,backgroundCube_vert:zx,backgroundCube_frag:kx,cube_vert:Hx,cube_frag:Vx,depth_vert:Gx,depth_frag:Wx,distanceRGBA_vert:Xx,distanceRGBA_frag:qx,equirect_vert:Yx,equirect_frag:Zx,linedashed_vert:$x,linedashed_frag:Jx,meshbasic_vert:Kx,meshbasic_frag:jx,meshlambert_vert:Qx,meshlambert_frag:tv,meshmatcap_vert:ev,meshmatcap_frag:nv,meshnormal_vert:iv,meshnormal_frag:sv,meshphong_vert:rv,meshphong_frag:ov,meshphysical_vert:av,meshphysical_frag:cv,meshtoon_vert:lv,meshtoon_frag:uv,points_vert:hv,points_frag:fv,shadow_vert:dv,shadow_frag:pv,sprite_vert:mv,sprite_frag:gv},at={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Bn={basic:{uniforms:tn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:tn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:tn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:tn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:tn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:tn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:tn([at.points,at.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:tn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:tn([at.common,at.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:tn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:tn([at.sprite,at.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:tn([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:tn([at.lights,at.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Bn.physical={uniforms:tn([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var So={r:0,b:0,g:0};function xv(i,t,e,n,s,r,o){let a=new Dt(0),c=r===!0?0:1,l,h,f=null,u=0,p=null;function g(d,m){let _=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?x(a,c):v&&v.isColor&&(x(v,1),_=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===oa)?(h===void 0&&(h=new St(new vn(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:As(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:Ee,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,T,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=re.getTransfer(v.colorSpace)!==pe,(f!==v||u!==v.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=v,u=v.version,p=i.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new St(new Rs(2,2),new qe({name:"BackgroundMaterial",uniforms:As(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=re.getTransfer(v.colorSpace)!==pe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||u!==v.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=v,u=v.version,p=i.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function x(d,m){d.getRGB(So,Zf(i)),n.buffers.color.setClear(So.r,So.g,So.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(d,m=1){a.set(d),c=m,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(d){c=d,x(a,c)},render:g}}function vv(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=d(null),l=c,h=!1;function f(C,N,O,W,Z){let q=!1;if(o){let j=x(W,O,N);l!==j&&(l=j,p(l.object)),q=m(C,W,O,Z),q&&_(C,W,O,Z)}else{let j=N.wireframe===!0;(l.geometry!==W.id||l.program!==O.id||l.wireframe!==j)&&(l.geometry=W.id,l.program=O.id,l.wireframe=j,q=!0)}Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,I(C,N,O,W),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function u(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(C){return n.isWebGL2?i.bindVertexArray(C):r.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?i.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function x(C,N,O){let W=O.wireframe===!0,Z=a[C.id];Z===void 0&&(Z={},a[C.id]=Z);let q=Z[N.id];q===void 0&&(q={},Z[N.id]=q);let j=q[W];return j===void 0&&(j=d(u()),q[W]=j),j}function d(C){let N=[],O=[],W=[];for(let Z=0;Z<s;Z++)N[Z]=0,O[Z]=0,W[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:W,object:C,attributes:{},index:null}}function m(C,N,O,W){let Z=l.attributes,q=N.attributes,j=0,K=O.getAttributes();for(let ct in K)if(K[ct].location>=0){let tt=Z[ct],ft=q[ct];if(ft===void 0&&(ct==="instanceMatrix"&&C.instanceMatrix&&(ft=C.instanceMatrix),ct==="instanceColor"&&C.instanceColor&&(ft=C.instanceColor)),tt===void 0||tt.attribute!==ft||ft&&tt.data!==ft.data)return!0;j++}return l.attributesNum!==j||l.index!==W}function _(C,N,O,W){let Z={},q=N.attributes,j=0,K=O.getAttributes();for(let ct in K)if(K[ct].location>=0){let tt=q[ct];tt===void 0&&(ct==="instanceMatrix"&&C.instanceMatrix&&(tt=C.instanceMatrix),ct==="instanceColor"&&C.instanceColor&&(tt=C.instanceColor));let ft={};ft.attribute=tt,tt&&tt.data&&(ft.data=tt.data),Z[ct]=ft,j++}l.attributes=Z,l.attributesNum=j,l.index=W}function v(){let C=l.newAttributes;for(let N=0,O=C.length;N<O;N++)C[N]=0}function y(C){S(C,0)}function S(C,N){let O=l.newAttributes,W=l.enabledAttributes,Z=l.attributeDivisors;O[C]=1,W[C]===0&&(i.enableVertexAttribArray(C),W[C]=1),Z[C]!==N&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,N),Z[C]=N)}function T(){let C=l.newAttributes,N=l.enabledAttributes;for(let O=0,W=N.length;O<W;O++)N[O]!==C[O]&&(i.disableVertexAttribArray(O),N[O]=0)}function M(C,N,O,W,Z,q,j){j===!0?i.vertexAttribIPointer(C,N,O,Z,q):i.vertexAttribPointer(C,N,O,W,Z,q)}function I(C,N,O,W){if(n.isWebGL2===!1&&(C.isInstancedMesh||W.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();let Z=W.attributes,q=O.getAttributes(),j=N.defaultAttributeValues;for(let K in q){let ct=q[K];if(ct.location>=0){let X=Z[K];if(X===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(X=C.instanceColor)),X!==void 0){let tt=X.normalized,ft=X.itemSize,yt=e.get(X);if(yt===void 0)continue;let gt=yt.buffer,It=yt.type,zt=yt.bytesPerElement,bt=n.isWebGL2===!0&&(It===i.INT||It===i.UNSIGNED_INT||X.gpuType===Ds);if(X.isInterleavedBufferAttribute){let Bt=X.data,F=Bt.stride,rt=X.offset;if(Bt.isInstancedInterleavedBuffer){for(let J=0;J<ct.locationSize;J++)S(ct.location+J,Bt.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=Bt.meshPerAttribute*Bt.count)}else for(let J=0;J<ct.locationSize;J++)y(ct.location+J);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let J=0;J<ct.locationSize;J++)M(ct.location+J,ft/ct.locationSize,It,tt,F*zt,(rt+ft/ct.locationSize*J)*zt,bt)}else{if(X.isInstancedBufferAttribute){for(let Bt=0;Bt<ct.locationSize;Bt++)S(ct.location+Bt,X.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Bt=0;Bt<ct.locationSize;Bt++)y(ct.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let Bt=0;Bt<ct.locationSize;Bt++)M(ct.location+Bt,ft/ct.locationSize,It,tt,ft*zt,ft/ct.locationSize*Bt*zt,bt)}}else if(j!==void 0){let tt=j[K];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(ct.location,tt);break;case 3:i.vertexAttrib3fv(ct.location,tt);break;case 4:i.vertexAttrib4fv(ct.location,tt);break;default:i.vertexAttrib1fv(ct.location,tt)}}}}T()}function b(){D();for(let C in a){let N=a[C];for(let O in N){let W=N[O];for(let Z in W)g(W[Z].object),delete W[Z];delete N[O]}delete a[C]}}function w(C){if(a[C.id]===void 0)return;let N=a[C.id];for(let O in N){let W=N[O];for(let Z in W)g(W[Z].object),delete W[Z];delete N[O]}delete a[C.id]}function L(C){for(let N in a){let O=a[N];if(O[C.id]===void 0)continue;let W=O[C.id];for(let Z in W)g(W[Z].object),delete W[Z];delete O[C.id]}}function D(){B(),h=!0,l!==c&&(l=c,p(l.object))}function B(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:D,resetDefaultState:B,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:y,disableUnusedAttributes:T}}function _v(i,t,e,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,f){i.drawArrays(r,h,f),e.update(f,r,1)}function c(h,f,u){if(u===0)return;let p,g;if(s)p=i,g="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,f,u),e.update(f,r,u)}function l(h,f,u){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u;g++)this.render(h[g],f[g]);else{p.multiDrawArraysWEBGL(r,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=f[x];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function yv(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let M=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),d=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,y=o||t.has("OES_texture_float"),S=v&&y,T=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:d,maxVaryings:m,maxFragmentUniforms:_,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:S,maxSamples:T}}function bv(i){let t=this,e=null,n=0,s=!1,r=!1,o=new pn,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let p=f.length!==0||u||n!==0||s;return s=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,p){let g=f.clippingPlanes,x=f.clipIntersection,d=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!d)r?h(null):l();else{let _=r?0:n,v=_*4,y=m.clippingState||null;c.value=y,y=h(g,u,v,p);for(let S=0;S!==v;++S)y[S]=e[S];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,p,g){let x=f!==null?f.length:0,d=null;if(x!==0){if(d=c.value,g!==!0||d===null){let m=p+x*4,_=u.matrixWorldInverse;a.getNormalMatrix(_),(d===null||d.length<m)&&(d=new Float32Array(m));for(let v=0,y=p;v!==x;++v,y+=4)o.copy(f[v]).applyMatrix4(_,a),o.normal.toArray(d,y),d[y+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,d}}function Mv(i){let t=new WeakMap;function e(o,a){return a===Ni?o.mapping=Ms:a===al&&(o.mapping=Ss),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ni||a===al)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new ml(c.height/2);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Cs=class extends Xo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},xs=4,ef=[.125,.215,.35,.446,.526,.582],Ii=20,$c=new Cs,nf=new Dt,Jc=null,Kc=0,jc=0,Ci=(1+Math.sqrt(5))/2,ps=1/Ci,sf=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Ci,ps),new P(0,Ci,-ps),new P(ps,0,Ci),new P(-ps,0,Ci),new P(Ci,ps,0),new P(-Ci,ps,0)],Ps=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Jc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=of(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Jc,Kc,jc),t.scissorTest=!1,wo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ae,minFilter:ae,generateMipmaps:!1,type:He,format:Ht,colorSpace:Qn,depthBuffer:!1},s=rf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rf(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sv(r)),this._blurMaterial=wv(r,t,e)}return s}_compileMaterial(t){let e=new St(this._lodPlanes[0],t);this._renderer.compile(e,$c)}_sceneToCubeUV(t,e,n,s){let a=new De(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(nf),h.toneMapping=zn,h.autoClear=!1;let p=new Hn({name:"PMREM.Background",side:Ee,depthWrite:!1,depthTest:!1}),g=new St(new vn,p),x=!1,d=t.background;d?d.isColor&&(p.color.copy(d),t.background=null,x=!0):(p.color.copy(nf),x=!0);for(let m=0;m<6;m++){let _=m%3;_===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):_===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));let v=this._cubeSize;wo(s,_*v,m>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=d}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ms||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=af()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=of());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new St(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;wo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,$c)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=sf[(s-1)%sf.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new St(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ii-1),x=r/g,d=isFinite(r)?1+Math.floor(h*x):Ii;d>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ii}`);let m=[],_=0;for(let M=0;M<Ii;++M){let I=M/x,b=Math.exp(-I*I/2);m.push(b),M===0?_+=b:M<d&&(_+=2*b)}for(let M=0;M<m.length;M++)m[M]=m[M]/_;u.envMap.value=t.texture,u.samples.value=d,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;let y=this._sizeLods[s],S=3*y*(s>v-xs?s-v+xs:0),T=4*(this._cubeSize-y);wo(e,S,T,3*y,2*y),c.setRenderTarget(e),c.render(f,$c)}};function Sv(i){let t=[],e=[],n=[],s=i,r=i-xs+1+ef.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-xs?c=ef[o-i+xs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,x=3,d=2,m=1,_=new Float32Array(x*g*p),v=new Float32Array(d*g*p),y=new Float32Array(m*g*p);for(let T=0;T<p;T++){let M=T%3*2/3-1,I=T>2?0:-1,b=[M,I,0,M+2/3,I,0,M+2/3,I+1,0,M,I,0,M+2/3,I+1,0,M,I+1,0];_.set(b,x*g*T),v.set(u,d*g*T);let w=[T,T,T,T,T,T];y.set(w,m*g*T)}let S=new oe;S.setAttribute("position",new Qt(_,x)),S.setAttribute("uv",new Qt(v,d)),S.setAttribute("faceIndex",new Qt(y,m)),t.push(S),s>xs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function rf(i,t,e){let n=new Ve(i,t,e);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function wv(i,t,e){let n=new Float32Array(Ii),s=new P(0,1,0);return new qe({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:We,depthTest:!1,depthWrite:!1})}function of(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:We,depthTest:!1,depthWrite:!1})}function af(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:We,depthTest:!1,depthWrite:!1})}function Ql(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Tv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ni||c===al,h=c===Ms||c===Ss;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=t.get(a);return e===null&&(e=new Ps(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),t.set(a,f),f.texture}else{if(t.has(a))return t.get(a).texture;{let f=a.image;if(l&&f&&f.height>0||h&&f&&s(f)){e===null&&(e=new Ps(i));let u=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ev(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Av(i,t,e,n){let s={},r=new WeakMap;function o(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);for(let g in u.morphAttributes){let x=u.morphAttributes[g];for(let d=0,m=x.length;d<m;d++)t.remove(x[d])}u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(f){let u=f.attributes;for(let g in u)t.update(u[g],i.ARRAY_BUFFER);let p=f.morphAttributes;for(let g in p){let x=p[g];for(let d=0,m=x.length;d<m;d++)t.update(x[d],i.ARRAY_BUFFER)}}function l(f){let u=[],p=f.index,g=f.attributes.position,x=0;if(p!==null){let _=p.array;x=p.version;for(let v=0,y=_.length;v<y;v+=3){let S=_[v+0],T=_[v+1],M=_[v+2];u.push(S,T,T,M,M,S)}}else if(g!==void 0){let _=g.array;x=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){let S=v+0,T=v+1,M=v+2;u.push(S,T,T,M,M,S)}}else return;let d=new(qf(u)?Wo:Go)(u,1);d.version=x;let m=r.get(f);m&&t.remove(m),r.set(f,d)}function h(f){let u=r.get(f);if(u){let p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function Rv(i,t,e,n){let s=n.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){i.drawElements(r,g,a,p*c),e.update(g,r,1)}function f(p,g,x){if(x===0)return;let d,m;if(s)d=i,m="drawElementsInstanced";else if(d=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](r,g,a,p*c,x),e.update(g,r,x)}function u(p,g,x){if(x===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<x;m++)this.render(p[m]/c,g[m]);else{d.multiDrawElementsWEBGL(r,g,0,a,p,0,x);let m=0;for(let _=0;_<x;_++)m+=g[_];e.update(m,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=u}function Cv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Pv(i,t){return i[0]-t[0]}function Iv(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Lv(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,o=new ne,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,f){let u=l.morphTargetInfluences;if(t.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,x=r.get(h);if(x===void 0||x.count!==g){let C=function(){D.dispose(),r.delete(h),h.removeEventListener("dispose",C)};x!==void 0&&x.texture.dispose();let _=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],M=h.morphAttributes.color||[],I=0;_===!0&&(I=1),v===!0&&(I=2),y===!0&&(I=3);let b=h.attributes.position.count*I,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let L=new Float32Array(b*w*4*g),D=new Ui(L,b,w,g);D.type=Kt,D.needsUpdate=!0;let B=I*4;for(let N=0;N<g;N++){let O=S[N],W=T[N],Z=M[N],q=b*w*4*N;for(let j=0;j<O.count;j++){let K=j*B;_===!0&&(o.fromBufferAttribute(O,j),L[q+K+0]=o.x,L[q+K+1]=o.y,L[q+K+2]=o.z,L[q+K+3]=0),v===!0&&(o.fromBufferAttribute(W,j),L[q+K+4]=o.x,L[q+K+5]=o.y,L[q+K+6]=o.z,L[q+K+7]=0),y===!0&&(o.fromBufferAttribute(Z,j),L[q+K+8]=o.x,L[q+K+9]=o.y,L[q+K+10]=o.z,L[q+K+11]=Z.itemSize===4?o.w:1)}}x={count:g,texture:D,size:new Y(b,w)},r.set(h,x),h.addEventListener("dispose",C)}let d=0;for(let _=0;_<u.length;_++)d+=u[_];let m=h.morphTargetsRelative?1:1-d;f.getUniforms().setValue(i,"morphTargetBaseInfluence",m),f.getUniforms().setValue(i,"morphTargetInfluences",u),f.getUniforms().setValue(i,"morphTargetsTexture",x.texture,e),f.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let p=u===void 0?0:u.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<p;v++){let y=g[v];y[0]=v,y[1]=u[v]}g.sort(Iv);for(let v=0;v<8;v++)v<p&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Pv);let x=h.morphAttributes.position,d=h.morphAttributes.normal,m=0;for(let v=0;v<8;v++){let y=a[v],S=y[0],T=y[1];S!==Number.MAX_SAFE_INTEGER&&T?(x&&h.getAttribute("morphTarget"+v)!==x[S]&&h.setAttribute("morphTarget"+v,x[S]),d&&h.getAttribute("morphNormal"+v)!==d[S]&&h.setAttribute("morphNormal"+v,d[S]),s[v]=T,m+=T):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),d&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}let _=h.morphTargetsRelative?1:1-m;f.getUniforms().setValue(i,"morphTargetBaseInfluence",_),f.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Dv(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Yo=class extends on{constructor(t,e,n,s,r,o,a,c,l,h){if(h=h!==void 0?h:Di,h!==Di&&h!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Di&&(n=en),n===void 0&&h===ws&&(n=Li),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Pt,this.minFilter=c!==void 0?c:Pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Jf=new on,Kf=new Yo(1,1);Kf.compareFunction=Wf;var jf=new Ui,Qf=new fl,td=new qo,cf=[],lf=[],uf=new Float32Array(16),hf=new Float32Array(9),ff=new Float32Array(4);function Us(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=cf[s];if(r===void 0&&(r=new Float32Array(s),cf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ua(i,t){let e=lf[t];e===void 0&&(e=new Int32Array(t),lf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Fv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Nv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function Uv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function Bv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function Ov(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Ue(e,n))return;ff.set(n),i.uniformMatrix2fv(this.addr,!1,ff),Be(e,n)}}function zv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Ue(e,n))return;hf.set(n),i.uniformMatrix3fv(this.addr,!1,hf),Be(e,n)}}function kv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Ue(e,n))return;uf.set(n),i.uniformMatrix4fv(this.addr,!1,uf),Be(e,n)}}function Hv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Vv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function Gv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function Wv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function Xv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function qv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function Yv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function Zv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function $v(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Kf:Jf;e.setTexture2D(t||r,s)}function Jv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Qf,s)}function Kv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||td,s)}function jv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||jf,s)}function Qv(i){switch(i){case 5126:return Fv;case 35664:return Nv;case 35665:return Uv;case 35666:return Bv;case 35674:return Ov;case 35675:return zv;case 35676:return kv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Gv;case 35669:case 35673:return Wv;case 5125:return Xv;case 36294:return qv;case 36295:return Yv;case 36296:return Zv;case 35678:case 36198:case 36298:case 36306:case 35682:return $v;case 35679:case 36299:case 36307:return Jv;case 35680:case 36300:case 36308:case 36293:return Kv;case 36289:case 36303:case 36311:case 36292:return jv}}function t_(i,t){i.uniform1fv(this.addr,t)}function e_(i,t){let e=Us(t,this.size,2);i.uniform2fv(this.addr,e)}function n_(i,t){let e=Us(t,this.size,3);i.uniform3fv(this.addr,e)}function i_(i,t){let e=Us(t,this.size,4);i.uniform4fv(this.addr,e)}function s_(i,t){let e=Us(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function r_(i,t){let e=Us(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function o_(i,t){let e=Us(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function a_(i,t){i.uniform1iv(this.addr,t)}function c_(i,t){i.uniform2iv(this.addr,t)}function l_(i,t){i.uniform3iv(this.addr,t)}function u_(i,t){i.uniform4iv(this.addr,t)}function h_(i,t){i.uniform1uiv(this.addr,t)}function f_(i,t){i.uniform2uiv(this.addr,t)}function d_(i,t){i.uniform3uiv(this.addr,t)}function p_(i,t){i.uniform4uiv(this.addr,t)}function m_(i,t,e){let n=this.cache,s=t.length,r=ua(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Jf,r[o])}function g_(i,t,e){let n=this.cache,s=t.length,r=ua(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Qf,r[o])}function x_(i,t,e){let n=this.cache,s=t.length,r=ua(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||td,r[o])}function v_(i,t,e){let n=this.cache,s=t.length,r=ua(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||jf,r[o])}function __(i){switch(i){case 5126:return t_;case 35664:return e_;case 35665:return n_;case 35666:return i_;case 35674:return s_;case 35675:return r_;case 35676:return o_;case 5124:case 35670:return a_;case 35667:case 35671:return c_;case 35668:case 35672:return l_;case 35669:case 35673:return u_;case 5125:return h_;case 36294:return f_;case 36295:return d_;case 36296:return p_;case 35678:case 36198:case 36298:case 36306:case 35682:return m_;case 35679:case 36299:case 36307:return g_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return v_}}var gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qv(e.type)}},xl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=__(e.type)}},vl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Qc=/(\w+)(\])?(\[|\.)?/g;function df(i,t){i.seq.push(t),i.map[t.id]=t}function y_(i,t,e){let n=i.name,s=n.length;for(Qc.lastIndex=0;;){let r=Qc.exec(n),o=Qc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){df(e,l===void 0?new gl(a,i,t):new xl(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new vl(a),df(e,f)),e=f}}}var bs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);y_(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function pf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var b_=37297,M_=0;function S_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function w_(i){let t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(i),n;switch(t===e?n="":t===Bo&&e===Uo?n="LinearDisplayP3ToLinearSRGB":t===Uo&&e===Bo&&(n="LinearSRGBToLinearDisplayP3"),i){case Qn:case la:return[n,"LinearTransferOETF"];case Le:case Kl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function mf(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+S_(i.getShaderSource(t),o)}else return s}function T_(i,t){let e=w_(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function E_(i,t){let e;switch(t){case Dm:e="Linear";break;case Fm:e="Reinhard";break;case Nm:e="OptimizedCineon";break;case $l:e="ACESFilmic";break;case Bm:e="AgX";break;case Um:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function A_(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(vs).join(`
`)}function R_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(vs).join(`
`)}function C_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function P_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function vs(i){return i!==""}function gf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var I_=/^[ \t]*#include +<([\w\d./]+)>/gm;function _l(i){return i.replace(I_,D_)}var L_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function D_(i,t){let e=Xt[t];if(e===void 0){let n=L_.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _l(e)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vf(i){return i.replace(F_,N_)}function N_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _f(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function U_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function B_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case Ss:t="ENVMAP_TYPE_CUBE";break;case oa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function O_(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ss&&(t="ENVMAP_MODE_REFRACTION"),t}function z_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Uf:t="ENVMAP_BLENDING_MULTIPLY";break;case Im:t="ENVMAP_BLENDING_MIX";break;case Lm:t="ENVMAP_BLENDING_ADD";break}return t}function k_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function H_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=U_(e),l=B_(e),h=O_(e),f=z_(e),u=k_(e),p=e.isWebGL2?"":A_(e),g=R_(e),x=C_(r),d=s.createProgram(),m,_,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(vs).join(`
`),m.length>0&&(m+=`
`),_=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(vs).join(`
`),_.length>0&&(_+=`
`)):(m=[_f(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),_=[p,_f(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==zn?E_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,T_("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vs).join(`
`)),o=_l(o),o=gf(o,e),o=xf(o,e),a=_l(a),a=gf(a,e),a=xf(a,e),o=vf(o),a=vf(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let y=v+m+o,S=v+_+a,T=pf(s,s.VERTEX_SHADER,y),M=pf(s,s.FRAGMENT_SHADER,S);s.attachShader(d,T),s.attachShader(d,M),e.index0AttributeName!==void 0?s.bindAttribLocation(d,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(d,0,"position"),s.linkProgram(d);function I(D){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(d).trim(),C=s.getShaderInfoLog(T).trim(),N=s.getShaderInfoLog(M).trim(),O=!0,W=!0;if(s.getProgramParameter(d,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,d,T,M);else{let Z=mf(s,T,"vertex"),q=mf(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(d,s.VALIDATE_STATUS)+`

Program Info Log: `+B+`
`+Z+`
`+q)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(C===""||N==="")&&(W=!1);W&&(D.diagnostics={runnable:O,programLog:B,vertexShader:{log:C,prefix:m},fragmentShader:{log:N,prefix:_}})}s.deleteShader(T),s.deleteShader(M),b=new bs(s,d),w=P_(s,d)}let b;this.getUniforms=function(){return b===void 0&&I(this),b};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(d,b_)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(d),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=M_++,this.cacheKey=t,this.usedTimes=1,this.program=d,this.vertexShader=T,this.fragmentShader=M,this}var V_=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new bl(t),e.set(t,n)),n}},bl=class{constructor(t){this.id=V_++,this.code=t,this.usedTimes=0}};function G_(i,t,e,n,s,r,o){let a=new Vo,c=new yl,l=[],h=s.isWebGL2,f=s.logarithmicDepthBuffer,u=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return b===0?"uv":`uv${b}`}function d(b,w,L,D,B){let C=D.fog,N=B.geometry,O=b.isMeshStandardMaterial?D.environment:null,W=(b.isMeshStandardMaterial?e:t).get(b.envMap||O),Z=W&&W.mapping===oa?W.image.height:null,q=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let j=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,K=j!==void 0?j.length:0,ct=0;N.morphAttributes.position!==void 0&&(ct=1),N.morphAttributes.normal!==void 0&&(ct=2),N.morphAttributes.color!==void 0&&(ct=3);let X,tt,ft,yt;if(q){let Ke=Bn[q];X=Ke.vertexShader,tt=Ke.fragmentShader}else X=b.vertexShader,tt=b.fragmentShader,c.update(b),ft=c.getVertexShaderID(b),yt=c.getFragmentShaderID(b);let gt=i.getRenderTarget(),It=B.isInstancedMesh===!0,zt=B.isBatchedMesh===!0,bt=!!b.map,Bt=!!b.matcap,F=!!W,rt=!!b.aoMap,J=!!b.lightMap,st=!!b.bumpMap,$=!!b.normalMap,wt=!!b.displacementMap,pt=!!b.emissiveMap,A=!!b.metalnessMap,E=!!b.roughnessMap,k=b.anisotropy>0,it=b.clearcoat>0,et=b.iridescence>0,Q=b.sheen>0,_t=b.transmission>0,lt=k&&!!b.anisotropyMap,xt=it&&!!b.clearcoatMap,At=it&&!!b.clearcoatNormalMap,Vt=it&&!!b.clearcoatRoughnessMap,nt=et&&!!b.iridescenceMap,ie=et&&!!b.iridescenceThicknessMap,Jt=Q&&!!b.sheenColorMap,Ot=Q&&!!b.sheenRoughnessMap,Tt=!!b.specularMap,vt=!!b.specularColorMap,Wt=!!b.specularIntensityMap,se=_t&&!!b.transmissionMap,Se=_t&&!!b.thicknessMap,Zt=!!b.gradientMap,ot=!!b.alphaMap,U=b.alphaTest>0,ut=!!b.alphaHash,ht=!!b.extensions,Lt=!!N.attributes.uv1,Rt=!!N.attributes.uv2,ue=!!N.attributes.uv3,he=zn;return b.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(he=i.toneMapping),{isWebGL2:h,shaderID:q,shaderType:b.type,shaderName:b.name,vertexShader:X,fragmentShader:tt,defines:b.defines,customVertexShaderID:ft,customFragmentShaderID:yt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:zt,instancing:It,instancingColor:It&&B.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:gt===null?i.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:Qn,map:bt,matcap:Bt,envMap:F,envMapMode:F&&W.mapping,envMapCubeUVHeight:Z,aoMap:rt,lightMap:J,bumpMap:st,normalMap:$,displacementMap:u&&wt,emissiveMap:pt,normalMapObjectSpace:$&&b.normalMapType===Xm,normalMapTangentSpace:$&&b.normalMapType===Gf,metalnessMap:A,roughnessMap:E,anisotropy:k,anisotropyMap:lt,clearcoat:it,clearcoatMap:xt,clearcoatNormalMap:At,clearcoatRoughnessMap:Vt,iridescence:et,iridescenceMap:nt,iridescenceThicknessMap:ie,sheen:Q,sheenColorMap:Jt,sheenRoughnessMap:Ot,specularMap:Tt,specularColorMap:vt,specularIntensityMap:Wt,transmission:_t,transmissionMap:se,thicknessMap:Se,gradientMap:Zt,opaque:b.transparent===!1&&b.blending===On,alphaMap:ot,alphaTest:U,alphaHash:ut,combine:b.combine,mapUv:bt&&x(b.map.channel),aoMapUv:rt&&x(b.aoMap.channel),lightMapUv:J&&x(b.lightMap.channel),bumpMapUv:st&&x(b.bumpMap.channel),normalMapUv:$&&x(b.normalMap.channel),displacementMapUv:wt&&x(b.displacementMap.channel),emissiveMapUv:pt&&x(b.emissiveMap.channel),metalnessMapUv:A&&x(b.metalnessMap.channel),roughnessMapUv:E&&x(b.roughnessMap.channel),anisotropyMapUv:lt&&x(b.anisotropyMap.channel),clearcoatMapUv:xt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:At&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Vt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Jt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&x(b.sheenRoughnessMap.channel),specularMapUv:Tt&&x(b.specularMap.channel),specularColorMapUv:vt&&x(b.specularColorMap.channel),specularIntensityMapUv:Wt&&x(b.specularIntensityMap.channel),transmissionMapUv:se&&x(b.transmissionMap.channel),thicknessMapUv:Se&&x(b.thicknessMap.channel),alphaMapUv:ot&&x(b.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&($||k),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:Rt,vertexUv3s:ue,pointsUvs:B.isPoints===!0&&!!N.attributes.uv&&(bt||ot),fog:!!C,useFog:b.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:B.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:ct,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,useLegacyLights:i._useLegacyLights,decodeVideoTexture:bt&&b.map.isVideoTexture===!0&&re.getTransfer(b.map.colorSpace)===pe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Te,flipSided:b.side===Ee,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:ht&&b.extensions.derivatives===!0,extensionFragDepth:ht&&b.extensions.fragDepth===!0,extensionDrawBuffers:ht&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:ht&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ht&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function m(b){let w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(let L in b.defines)w.push(L),w.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(_(w,b),v(w,b),w.push(i.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function _(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function v(b,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),b.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function y(b){let w=g[b.type],L;if(w){let D=Bn[w];L=Lg.clone(D.uniforms)}else L=b.uniforms;return L}function S(b,w){let L;for(let D=0,B=l.length;D<B;D++){let C=l[D];if(C.cacheKey===w){L=C,++L.usedTimes;break}}return L===void 0&&(L=new H_(i,w,b,r),l.push(L)),L}function T(b){if(--b.usedTimes===0){let w=l.indexOf(b);l[w]=l[l.length-1],l.pop(),b.destroy()}}function M(b){c.remove(b)}function I(){c.dispose()}return{getParameters:d,getProgramCacheKey:m,getUniforms:y,acquireProgram:S,releaseProgram:T,releaseShaderCache:M,programs:l,dispose:I}}function W_(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function X_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function yf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function bf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,u,p,g,x,d){let m=i[t];return m===void 0?(m={id:f.id,object:f,geometry:u,material:p,groupOrder:g,renderOrder:f.renderOrder,z:x,group:d},i[t]=m):(m.id=f.id,m.object=f,m.geometry=u,m.material=p,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=x,m.group=d),t++,m}function a(f,u,p,g,x,d){let m=o(f,u,p,g,x,d);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):e.push(m)}function c(f,u,p,g,x,d){let m=o(f,u,p,g,x,d);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function l(f,u){e.length>1&&e.sort(f||X_),n.length>1&&n.sort(u||yf),s.length>1&&s.sort(u||yf)}function h(){for(let f=t,u=i.length;f<u;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function q_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new bf,i.set(n,[o])):s>=r.length?(o=new bf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Y_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Dt};break;case"SpotLight":e={position:new P,direction:new P,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Z_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var $_=0;function J_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function K_(i,t){let e=new Y_,n=Z_(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new P);let r=new P,o=new Et,a=new Et;function c(h,f){let u=0,p=0,g=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let x=0,d=0,m=0,_=0,v=0,y=0,S=0,T=0,M=0,I=0,b=0;h.sort(J_);let w=f===!0?Math.PI:1;for(let D=0,B=h.length;D<B;D++){let C=h[D],N=C.color,O=C.intensity,W=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=N.r*O*w,p+=N.g*O*w,g+=N.b*O*w;else if(C.isLightProbe){for(let q=0;q<9;q++)s.probe[q].addScaledVector(C.sh.coefficients[q],O);b++}else if(C.isDirectionalLight){let q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*w),C.castShadow){let j=C.shadow,K=n.get(C);K.shadowBias=j.bias,K.shadowNormalBias=j.normalBias,K.shadowRadius=j.radius,K.shadowMapSize=j.mapSize,s.directionalShadow[x]=K,s.directionalShadowMap[x]=Z,s.directionalShadowMatrix[x]=C.shadow.matrix,y++}s.directional[x]=q,x++}else if(C.isSpotLight){let q=e.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(N).multiplyScalar(O*w),q.distance=W,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,s.spot[m]=q;let j=C.shadow;if(C.map&&(s.spotLightMap[M]=C.map,M++,j.updateMatrices(C),C.castShadow&&I++),s.spotLightMatrix[m]=j.matrix,C.castShadow){let K=n.get(C);K.shadowBias=j.bias,K.shadowNormalBias=j.normalBias,K.shadowRadius=j.radius,K.shadowMapSize=j.mapSize,s.spotShadow[m]=K,s.spotShadowMap[m]=Z,T++}m++}else if(C.isRectAreaLight){let q=e.get(C);q.color.copy(N).multiplyScalar(O),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),s.rectArea[_]=q,_++}else if(C.isPointLight){let q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*w),q.distance=C.distance,q.decay=C.decay,C.castShadow){let j=C.shadow,K=n.get(C);K.shadowBias=j.bias,K.shadowNormalBias=j.normalBias,K.shadowRadius=j.radius,K.shadowMapSize=j.mapSize,K.shadowCameraNear=j.camera.near,K.shadowCameraFar=j.camera.far,s.pointShadow[d]=K,s.pointShadowMap[d]=Z,s.pointShadowMatrix[d]=C.shadow.matrix,S++}s.point[d]=q,d++}else if(C.isHemisphereLight){let q=e.get(C);q.skyColor.copy(C.color).multiplyScalar(O*w),q.groundColor.copy(C.groundColor).multiplyScalar(O*w),s.hemi[v]=q,v++}}_>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=at.LTC_FLOAT_1,s.rectAreaLTC2=at.LTC_FLOAT_2):(s.rectAreaLTC1=at.LTC_HALF_1,s.rectAreaLTC2=at.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=at.LTC_FLOAT_1,s.rectAreaLTC2=at.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=at.LTC_HALF_1,s.rectAreaLTC2=at.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=p,s.ambient[2]=g;let L=s.hash;(L.directionalLength!==x||L.pointLength!==d||L.spotLength!==m||L.rectAreaLength!==_||L.hemiLength!==v||L.numDirectionalShadows!==y||L.numPointShadows!==S||L.numSpotShadows!==T||L.numSpotMaps!==M||L.numLightProbes!==b)&&(s.directional.length=x,s.spot.length=m,s.rectArea.length=_,s.point.length=d,s.hemi.length=v,s.directionalShadow.length=y,s.directionalShadowMap.length=y,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=y,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=T+M-I,s.spotLightMap.length=M,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=b,L.directionalLength=x,L.pointLength=d,L.spotLength=m,L.rectAreaLength=_,L.hemiLength=v,L.numDirectionalShadows=y,L.numPointShadows=S,L.numSpotShadows=T,L.numSpotMaps=M,L.numLightProbes=b,s.version=$_++)}function l(h,f){let u=0,p=0,g=0,x=0,d=0,m=f.matrixWorldInverse;for(let _=0,v=h.length;_<v;_++){let y=h[_];if(y.isDirectionalLight){let S=s.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(y.isSpotLight){let S=s.spot[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),g++}else if(y.isRectAreaLight){let S=s.rectArea[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),a.identity(),o.copy(y.matrixWorld),o.premultiply(m),a.extractRotation(o),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let S=s.point[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){let S=s.hemi[d];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),d++}}}return{setup:c,setupView:l,state:s}}function Mf(i,t){let e=new K_(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function o(f){n.push(f)}function a(f){s.push(f)}function c(f){e.setup(n,f)}function l(f){e.setupView(n,f)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function j_(i,t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),c;return a===void 0?(c=new Mf(i,t),e.set(r,[c])):o>=a.length?(c=new Mf(i,t),a.push(c)):c=a[o],c}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ml=class extends Bi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Sl=class extends Bi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ty=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ey(i,t,e){let n=new Sr,s=new Y,r=new Y,o=new ne,a=new Ml({depthPacking:Wm}),c=new Sl,l={},h=e.maxTextureSize,f={[xn]:Ee,[Ee]:xn,[Te]:Te},u=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:Q_,fragmentShader:ty}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new oe;g.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new St(g,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nf;let m=this.type;this.render=function(T,M,I){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),w=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),D=i.state;D.setBlending(We),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let B=m!==Jn&&this.type===Jn,C=m===Jn&&this.type!==Jn;for(let N=0,O=T.length;N<O;N++){let W=T[N],Z=W.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let q=Z.getFrameExtents();if(s.multiply(q),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,Z.mapSize.y=r.y)),Z.map===null||B===!0||C===!0){let K=this.type!==Jn?{minFilter:Pt,magFilter:Pt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ve(s.x,s.y,K),Z.map.texture.name=W.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();let j=Z.getViewportCount();for(let K=0;K<j;K++){let ct=Z.getViewport(K);o.set(r.x*ct.x,r.y*ct.y,r.x*ct.z,r.y*ct.w),D.viewport(o),Z.updateMatrices(W,K),n=Z.getFrustum(),y(M,I,Z.camera,W,this.type)}Z.isPointLightShadow!==!0&&this.type===Jn&&_(Z,I),Z.needsUpdate=!1}m=this.type,d.needsUpdate=!1,i.setRenderTarget(b,w,L)};function _(T,M){let I=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ve(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(M,null,I,u,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(M,null,I,p,x,null)}function v(T,M,I,b){let w=null,L=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)w=L;else if(w=I.isPointLight===!0?c:a,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){let D=w.uuid,B=M.uuid,C=l[D];C===void 0&&(C={},l[D]=C);let N=C[B];N===void 0&&(N=w.clone(),C[B]=N,M.addEventListener("dispose",S)),w=N}if(w.visible=M.visible,w.wireframe=M.wireframe,b===Jn?w.side=M.shadowSide!==null?M.shadowSide:M.side:w.side=M.shadowSide!==null?M.shadowSide:f[M.side],w.alphaMap=M.alphaMap,w.alphaTest=M.alphaTest,w.map=M.map,w.clipShadows=M.clipShadows,w.clippingPlanes=M.clippingPlanes,w.clipIntersection=M.clipIntersection,w.displacementMap=M.displacementMap,w.displacementScale=M.displacementScale,w.displacementBias=M.displacementBias,w.wireframeLinewidth=M.wireframeLinewidth,w.linewidth=M.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let D=i.properties.get(w);D.light=I}return w}function y(T,M,I,b,w){if(T.visible===!1)return;if(T.layers.test(M.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===Jn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let B=t.update(T),C=T.material;if(Array.isArray(C)){let N=B.groups;for(let O=0,W=N.length;O<W;O++){let Z=N[O],q=C[Z.materialIndex];if(q&&q.visible){let j=v(T,q,b,w);T.onBeforeShadow(i,T,M,I,B,j,Z),i.renderBufferDirect(I,null,B,j,T,Z),T.onAfterShadow(i,T,M,I,B,j,Z)}}}else if(C.visible){let N=v(T,C,b,w);T.onBeforeShadow(i,T,M,I,B,N,null),i.renderBufferDirect(I,null,B,N,T,null),T.onAfterShadow(i,T,M,I,B,N,null)}}let D=T.children;for(let B=0,C=D.length;B<C;B++)y(D[B],M,I,b,w)}function S(T){T.target.removeEventListener("dispose",S);for(let I in l){let b=l[I],w=T.target.uuid;w in b&&(b[w].dispose(),delete b[w])}}}function ny(i,t,e){let n=e.isWebGL2;function s(){let U=!1,ut=new ne,ht=null,Lt=new ne(0,0,0,0);return{setMask:function(Rt){ht!==Rt&&!U&&(i.colorMask(Rt,Rt,Rt,Rt),ht=Rt)},setLocked:function(Rt){U=Rt},setClear:function(Rt,ue,he,Oe,Ke){Ke===!0&&(Rt*=Oe,ue*=Oe,he*=Oe),ut.set(Rt,ue,he,Oe),Lt.equals(ut)===!1&&(i.clearColor(Rt,ue,he,Oe),Lt.copy(ut))},reset:function(){U=!1,ht=null,Lt.set(-1,0,0,0)}}}function r(){let U=!1,ut=null,ht=null,Lt=null;return{setTest:function(Rt){Rt?zt(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(Rt){ut!==Rt&&!U&&(i.depthMask(Rt),ut=Rt)},setFunc:function(Rt){if(ht!==Rt){switch(Rt){case wm:i.depthFunc(i.NEVER);break;case Tm:i.depthFunc(i.ALWAYS);break;case Em:i.depthFunc(i.LESS);break;case Lo:i.depthFunc(i.LEQUAL);break;case Am:i.depthFunc(i.EQUAL);break;case Rm:i.depthFunc(i.GEQUAL);break;case Cm:i.depthFunc(i.GREATER);break;case Pm:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=Rt}},setLocked:function(Rt){U=Rt},setClear:function(Rt){Lt!==Rt&&(i.clearDepth(Rt),Lt=Rt)},reset:function(){U=!1,ut=null,ht=null,Lt=null}}}function o(){let U=!1,ut=null,ht=null,Lt=null,Rt=null,ue=null,he=null,Oe=null,Ke=null;return{setTest:function(fe){U||(fe?zt(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(fe){ut!==fe&&!U&&(i.stencilMask(fe),ut=fe)},setFunc:function(fe,je,Un){(ht!==fe||Lt!==je||Rt!==Un)&&(i.stencilFunc(fe,je,Un),ht=fe,Lt=je,Rt=Un)},setOp:function(fe,je,Un){(ue!==fe||he!==je||Oe!==Un)&&(i.stencilOp(fe,je,Un),ue=fe,he=je,Oe=Un)},setLocked:function(fe){U=fe},setClear:function(fe){Ke!==fe&&(i.clearStencil(fe),Ke=fe)},reset:function(){U=!1,ut=null,ht=null,Lt=null,Rt=null,ue=null,he=null,Oe=null,Ke=null}}}let a=new s,c=new r,l=new o,h=new WeakMap,f=new WeakMap,u={},p={},g=new WeakMap,x=[],d=null,m=!1,_=null,v=null,y=null,S=null,T=null,M=null,I=null,b=new Dt(0,0,0),w=0,L=!1,D=null,B=null,C=null,N=null,O=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,q=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),Z=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Z=q>=2);let K=null,ct={},X=i.getParameter(i.SCISSOR_BOX),tt=i.getParameter(i.VIEWPORT),ft=new ne().fromArray(X),yt=new ne().fromArray(tt);function gt(U,ut,ht,Lt){let Rt=new Uint8Array(4),ue=i.createTexture();i.bindTexture(U,ue),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<ht;he++)n&&(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)?i.texImage3D(ut,0,i.RGBA,1,1,Lt,0,i.RGBA,i.UNSIGNED_BYTE,Rt):i.texImage2D(ut+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Rt);return ue}let It={};It[i.TEXTURE_2D]=gt(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=gt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(It[i.TEXTURE_2D_ARRAY]=gt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=gt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),zt(i.DEPTH_TEST),c.setFunc(Lo),pt(!1),A(eh),zt(i.CULL_FACE),$(We);function zt(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function bt(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Bt(U,ut){return p[U]!==ut?(i.bindFramebuffer(U,ut),p[U]=ut,n&&(U===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ut),U===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ut)),!0):!1}function F(U,ut){let ht=x,Lt=!1;if(U)if(ht=g.get(ut),ht===void 0&&(ht=[],g.set(ut,ht)),U.isWebGLMultipleRenderTargets){let Rt=U.texture;if(ht.length!==Rt.length||ht[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,he=Rt.length;ue<he;ue++)ht[ue]=i.COLOR_ATTACHMENT0+ue;ht.length=Rt.length,Lt=!0}}else ht[0]!==i.COLOR_ATTACHMENT0&&(ht[0]=i.COLOR_ATTACHMENT0,Lt=!0);else ht[0]!==i.BACK&&(ht[0]=i.BACK,Lt=!0);Lt&&(e.isWebGL2?i.drawBuffers(ht):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ht))}function rt(U){return d!==U?(i.useProgram(U),d=U,!0):!1}let J={[Pi]:i.FUNC_ADD,[lm]:i.FUNC_SUBTRACT,[um]:i.FUNC_REVERSE_SUBTRACT};if(n)J[sh]=i.MIN,J[rh]=i.MAX;else{let U=t.get("EXT_blend_minmax");U!==null&&(J[sh]=U.MIN_EXT,J[rh]=U.MAX_EXT)}let st={[hm]:i.ZERO,[fm]:i.ONE,[dm]:i.SRC_COLOR,[rl]:i.SRC_ALPHA,[_m]:i.SRC_ALPHA_SATURATE,[xm]:i.DST_COLOR,[mm]:i.DST_ALPHA,[pm]:i.ONE_MINUS_SRC_COLOR,[ol]:i.ONE_MINUS_SRC_ALPHA,[vm]:i.ONE_MINUS_DST_COLOR,[gm]:i.ONE_MINUS_DST_ALPHA,[ym]:i.CONSTANT_COLOR,[bm]:i.ONE_MINUS_CONSTANT_COLOR,[Mm]:i.CONSTANT_ALPHA,[Sm]:i.ONE_MINUS_CONSTANT_ALPHA};function $(U,ut,ht,Lt,Rt,ue,he,Oe,Ke,fe){if(U===We){m===!0&&(bt(i.BLEND),m=!1);return}if(m===!1&&(zt(i.BLEND),m=!0),U!==cm){if(U!==_||fe!==L){if((v!==Pi||T!==Pi)&&(i.blendEquation(i.FUNC_ADD),v=Pi,T=Pi),fe)switch(U){case On:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Io:i.blendFunc(i.ONE,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ih:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case On:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Io:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ih:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,S=null,M=null,I=null,b.set(0,0,0),w=0,_=U,L=fe}return}Rt=Rt||ut,ue=ue||ht,he=he||Lt,(ut!==v||Rt!==T)&&(i.blendEquationSeparate(J[ut],J[Rt]),v=ut,T=Rt),(ht!==y||Lt!==S||ue!==M||he!==I)&&(i.blendFuncSeparate(st[ht],st[Lt],st[ue],st[he]),y=ht,S=Lt,M=ue,I=he),(Oe.equals(b)===!1||Ke!==w)&&(i.blendColor(Oe.r,Oe.g,Oe.b,Ke),b.copy(Oe),w=Ke),_=U,L=!1}function wt(U,ut){U.side===Te?bt(i.CULL_FACE):zt(i.CULL_FACE);let ht=U.side===Ee;ut&&(ht=!ht),pt(ht),U.blending===On&&U.transparent===!1?$(We):$(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),c.setFunc(U.depthFunc),c.setTest(U.depthTest),c.setMask(U.depthWrite),a.setMask(U.colorWrite);let Lt=U.stencilWrite;l.setTest(Lt),Lt&&(l.setMask(U.stencilWriteMask),l.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),l.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),k(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?zt(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(U){D!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),D=U)}function A(U){U!==om?(zt(i.CULL_FACE),U!==B&&(U===eh?i.cullFace(i.BACK):U===am?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),B=U}function E(U){U!==C&&(Z&&i.lineWidth(U),C=U)}function k(U,ut,ht){U?(zt(i.POLYGON_OFFSET_FILL),(N!==ut||O!==ht)&&(i.polygonOffset(ut,ht),N=ut,O=ht)):bt(i.POLYGON_OFFSET_FILL)}function it(U){U?zt(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function et(U){U===void 0&&(U=i.TEXTURE0+W-1),K!==U&&(i.activeTexture(U),K=U)}function Q(U,ut,ht){ht===void 0&&(K===null?ht=i.TEXTURE0+W-1:ht=K);let Lt=ct[ht];Lt===void 0&&(Lt={type:void 0,texture:void 0},ct[ht]=Lt),(Lt.type!==U||Lt.texture!==ut)&&(K!==ht&&(i.activeTexture(ht),K=ht),i.bindTexture(U,ut||It[U]),Lt.type=U,Lt.texture=ut)}function _t(){let U=ct[K];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function lt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Vt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ot(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Wt(U){ft.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ft.copy(U))}function se(U){yt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),yt.copy(U))}function Se(U,ut){let ht=f.get(ut);ht===void 0&&(ht=new WeakMap,f.set(ut,ht));let Lt=ht.get(U);Lt===void 0&&(Lt=i.getUniformBlockIndex(ut,U.name),ht.set(U,Lt))}function Zt(U,ut){let Lt=f.get(ut).get(U);h.get(ut)!==Lt&&(i.uniformBlockBinding(ut,Lt,U.__bindingPointIndex),h.set(ut,Lt))}function ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},K=null,ct={},p={},g=new WeakMap,x=[],d=null,m=!1,_=null,v=null,y=null,S=null,T=null,M=null,I=null,b=new Dt(0,0,0),w=0,L=!1,D=null,B=null,C=null,N=null,O=null,ft.set(0,0,i.canvas.width,i.canvas.height),yt.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:zt,disable:bt,bindFramebuffer:Bt,drawBuffers:F,useProgram:rt,setBlending:$,setMaterial:wt,setFlipSided:pt,setCullFace:A,setLineWidth:E,setPolygonOffset:k,setScissorTest:it,activeTexture:et,bindTexture:Q,unbindTexture:_t,compressedTexImage2D:lt,compressedTexImage3D:xt,texImage2D:Tt,texImage3D:vt,updateUBOMapping:Se,uniformBlockBinding:Zt,texStorage2D:Jt,texStorage3D:Ot,texSubImage2D:At,texSubImage3D:Vt,compressedTexSubImage2D:nt,compressedTexSubImage3D:ie,scissor:Wt,viewport:se,reset:ot}}function iy(i,t,e,n,s,r,o){let a=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,f,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return p?new OffscreenCanvas(A,E):Mr("canvas")}function x(A,E,k,it){let et=1;if((A.width>it||A.height>it)&&(et=it/Math.max(A.width,A.height)),et<1||E===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){let Q=E?zo:Math.floor,_t=Q(et*A.width),lt=Q(et*A.height);f===void 0&&(f=g(_t,lt));let xt=k?g(_t,lt):f;return xt.width=_t,xt.height=lt,xt.getContext("2d").drawImage(A,0,0,_t,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+_t+"x"+lt+")."),xt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function d(A){return ul(A.width)&&ul(A.height)}function m(A){return a?!1:A.wrapS!==xe||A.wrapT!==xe||A.minFilter!==Pt&&A.minFilter!==ae}function _(A,E){return A.generateMipmaps&&E&&A.minFilter!==Pt&&A.minFilter!==ae}function v(A){i.generateMipmap(A)}function y(A,E,k,it,et=!1){if(a===!1)return E;if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Q=E;if(E===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8)),E===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),E===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8)),E===i.RGBA){let _t=et?No:re.getTransfer(it);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=_t===pe?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function S(A,E,k){return _(A,k)===!0||A.isFramebufferTexture&&A.minFilter!==Pt&&A.minFilter!==ae?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function T(A){return A===Pt||A===oh||A===Tc?i.NEAREST:i.LINEAR}function M(A){let E=A.target;E.removeEventListener("dispose",M),b(E),E.isVideoTexture&&h.delete(E)}function I(A){let E=A.target;E.removeEventListener("dispose",I),L(E)}function b(A){let E=n.get(A);if(E.__webglInit===void 0)return;let k=A.source,it=u.get(k);if(it){let et=it[E.__cacheKey];et.usedTimes--,et.usedTimes===0&&w(A),Object.keys(it).length===0&&u.delete(k)}n.remove(A)}function w(A){let E=n.get(A);i.deleteTexture(E.__webglTexture);let k=A.source,it=u.get(k);delete it[E.__cacheKey],o.memory.textures--}function L(A){let E=A.texture,k=n.get(A),it=n.get(E);if(it.__webglTexture!==void 0&&(i.deleteTexture(it.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(k.__webglFramebuffer[et]))for(let Q=0;Q<k.__webglFramebuffer[et].length;Q++)i.deleteFramebuffer(k.__webglFramebuffer[et][Q]);else i.deleteFramebuffer(k.__webglFramebuffer[et]);k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer[et])}else{if(Array.isArray(k.__webglFramebuffer))for(let et=0;et<k.__webglFramebuffer.length;et++)i.deleteFramebuffer(k.__webglFramebuffer[et]);else i.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&i.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let et=0;et<k.__webglColorRenderbuffer.length;et++)k.__webglColorRenderbuffer[et]&&i.deleteRenderbuffer(k.__webglColorRenderbuffer[et]);k.__webglDepthRenderbuffer&&i.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let et=0,Q=E.length;et<Q;et++){let _t=n.get(E[et]);_t.__webglTexture&&(i.deleteTexture(_t.__webglTexture),o.memory.textures--),n.remove(E[et])}n.remove(E),n.remove(A)}let D=0;function B(){D=0}function C(){let A=D;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function N(A){let E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function O(A,E){let k=n.get(A);if(A.isVideoTexture&&wt(A),A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){let it=A.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(k,A,E);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+E)}function W(A,E){let k=n.get(A);if(A.version>0&&k.__version!==A.version){ft(k,A,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+E)}function Z(A,E){let k=n.get(A);if(A.version>0&&k.__version!==A.version){ft(k,A,E);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+E)}function q(A,E){let k=n.get(A);if(A.version>0&&k.__version!==A.version){yt(k,A,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+E)}let j={[Xe]:i.REPEAT,[xe]:i.CLAMP_TO_EDGE,[cl]:i.MIRRORED_REPEAT},K={[Pt]:i.NEAREST,[oh]:i.NEAREST_MIPMAP_NEAREST,[Tc]:i.NEAREST_MIPMAP_LINEAR,[ae]:i.LINEAR,[Om]:i.LINEAR_MIPMAP_NEAREST,[yr]:i.LINEAR_MIPMAP_LINEAR},ct={[qm]:i.NEVER,[jm]:i.ALWAYS,[Ym]:i.LESS,[Wf]:i.LEQUAL,[Zm]:i.EQUAL,[Km]:i.GEQUAL,[$m]:i.GREATER,[Jm]:i.NOTEQUAL};function X(A,E,k){if(k?(i.texParameteri(A,i.TEXTURE_WRAP_S,j[E.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,j[E.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,j[E.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,K[E.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,K[E.minFilter])):(i.texParameteri(A,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(A,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(E.wrapS!==xe||E.wrapT!==xe)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(A,i.TEXTURE_MAG_FILTER,T(E.magFilter)),i.texParameteri(A,i.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==Pt&&E.minFilter!==ae&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let it=t.get("EXT_texture_filter_anisotropic");if(E.magFilter===Pt||E.minFilter!==Tc&&E.minFilter!==yr||E.type===Kt&&t.has("OES_texture_float_linear")===!1||a===!1&&E.type===He&&t.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(i.texParameterf(A,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function tt(A,E){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",M));let it=E.source,et=u.get(it);et===void 0&&(et={},u.set(it,et));let Q=N(E);if(Q!==A.__cacheKey){et[Q]===void 0&&(et[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),et[Q].usedTimes++;let _t=et[A.__cacheKey];_t!==void 0&&(et[A.__cacheKey].usedTimes--,_t.usedTimes===0&&w(E)),A.__cacheKey=Q,A.__webglTexture=et[Q].texture}return k}function ft(A,E,k){let it=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(it=i.TEXTURE_3D);let et=tt(A,E),Q=E.source;e.bindTexture(it,A.__webglTexture,i.TEXTURE0+k);let _t=n.get(Q);if(Q.version!==_t.__version||et===!0){e.activeTexture(i.TEXTURE0+k);let lt=re.getPrimaries(re.workingColorSpace),xt=E.colorSpace===Mn?null:re.getPrimaries(E.colorSpace),At=E.colorSpace===Mn||lt===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Vt=m(E)&&d(E.image)===!1,nt=x(E.image,Vt,!1,s.maxTextureSize);nt=pt(E,nt);let ie=d(nt)||a,Jt=r.convert(E.format,E.colorSpace),Ot=r.convert(E.type),Tt=y(E.internalFormat,Jt,Ot,E.colorSpace,E.isVideoTexture);X(it,E,ie);let vt,Wt=E.mipmaps,se=a&&E.isVideoTexture!==!0&&Tt!==Hf,Se=_t.__version===void 0||et===!0,Zt=S(E,nt,ie);if(E.isDepthTexture)Tt=i.DEPTH_COMPONENT,a?E.type===Kt?Tt=i.DEPTH_COMPONENT32F:E.type===en?Tt=i.DEPTH_COMPONENT24:E.type===Li?Tt=i.DEPTH24_STENCIL8:Tt=i.DEPTH_COMPONENT16:E.type===Kt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Di&&Tt===i.DEPTH_COMPONENT&&E.type!==Nr&&E.type!==en&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=en,Ot=r.convert(E.type)),E.format===ws&&Tt===i.DEPTH_COMPONENT&&(Tt=i.DEPTH_STENCIL,E.type!==Li&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Li,Ot=r.convert(E.type))),Se&&(se?e.texStorage2D(i.TEXTURE_2D,1,Tt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Tt,nt.width,nt.height,0,Jt,Ot,null));else if(E.isDataTexture)if(Wt.length>0&&ie){se&&Se&&e.texStorage2D(i.TEXTURE_2D,Zt,Tt,Wt[0].width,Wt[0].height);for(let ot=0,U=Wt.length;ot<U;ot++)vt=Wt[ot],se?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,vt.width,vt.height,Jt,Ot,vt.data):e.texImage2D(i.TEXTURE_2D,ot,Tt,vt.width,vt.height,0,Jt,Ot,vt.data);E.generateMipmaps=!1}else se?(Se&&e.texStorage2D(i.TEXTURE_2D,Zt,Tt,nt.width,nt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,Jt,Ot,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Tt,nt.width,nt.height,0,Jt,Ot,nt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){se&&Se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Zt,Tt,Wt[0].width,Wt[0].height,nt.depth);for(let ot=0,U=Wt.length;ot<U;ot++)vt=Wt[ot],E.format!==Ht?Jt!==null?se?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,vt.width,vt.height,nt.depth,Jt,vt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,Tt,vt.width,vt.height,nt.depth,0,vt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,vt.width,vt.height,nt.depth,Jt,Ot,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,Tt,vt.width,vt.height,nt.depth,0,Jt,Ot,vt.data)}else{se&&Se&&e.texStorage2D(i.TEXTURE_2D,Zt,Tt,Wt[0].width,Wt[0].height);for(let ot=0,U=Wt.length;ot<U;ot++)vt=Wt[ot],E.format!==Ht?Jt!==null?se?e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,vt.width,vt.height,Jt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,Tt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,vt.width,vt.height,Jt,Ot,vt.data):e.texImage2D(i.TEXTURE_2D,ot,Tt,vt.width,vt.height,0,Jt,Ot,vt.data)}else if(E.isDataArrayTexture)se?(Se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Zt,Tt,nt.width,nt.height,nt.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Jt,Ot,nt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Tt,nt.width,nt.height,nt.depth,0,Jt,Ot,nt.data);else if(E.isData3DTexture)se?(Se&&e.texStorage3D(i.TEXTURE_3D,Zt,Tt,nt.width,nt.height,nt.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Jt,Ot,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Tt,nt.width,nt.height,nt.depth,0,Jt,Ot,nt.data);else if(E.isFramebufferTexture){if(Se)if(se)e.texStorage2D(i.TEXTURE_2D,Zt,Tt,nt.width,nt.height);else{let ot=nt.width,U=nt.height;for(let ut=0;ut<Zt;ut++)e.texImage2D(i.TEXTURE_2D,ut,Tt,ot,U,0,Jt,Ot,null),ot>>=1,U>>=1}}else if(Wt.length>0&&ie){se&&Se&&e.texStorage2D(i.TEXTURE_2D,Zt,Tt,Wt[0].width,Wt[0].height);for(let ot=0,U=Wt.length;ot<U;ot++)vt=Wt[ot],se?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,Jt,Ot,vt):e.texImage2D(i.TEXTURE_2D,ot,Tt,Jt,Ot,vt);E.generateMipmaps=!1}else se?(Se&&e.texStorage2D(i.TEXTURE_2D,Zt,Tt,nt.width,nt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Jt,Ot,nt)):e.texImage2D(i.TEXTURE_2D,0,Tt,Jt,Ot,nt);_(E,ie)&&v(it),_t.__version=Q.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function yt(A,E,k){if(E.image.length!==6)return;let it=tt(A,E),et=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);let Q=n.get(et);if(et.version!==Q.__version||it===!0){e.activeTexture(i.TEXTURE0+k);let _t=re.getPrimaries(re.workingColorSpace),lt=E.colorSpace===Mn?null:re.getPrimaries(E.colorSpace),xt=E.colorSpace===Mn||_t===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let At=E.isCompressedTexture||E.image[0].isCompressedTexture,Vt=E.image[0]&&E.image[0].isDataTexture,nt=[];for(let ot=0;ot<6;ot++)!At&&!Vt?nt[ot]=x(E.image[ot],!1,!0,s.maxCubemapSize):nt[ot]=Vt?E.image[ot].image:E.image[ot],nt[ot]=pt(E,nt[ot]);let ie=nt[0],Jt=d(ie)||a,Ot=r.convert(E.format,E.colorSpace),Tt=r.convert(E.type),vt=y(E.internalFormat,Ot,Tt,E.colorSpace),Wt=a&&E.isVideoTexture!==!0,se=Q.__version===void 0||it===!0,Se=S(E,ie,Jt);X(i.TEXTURE_CUBE_MAP,E,Jt);let Zt;if(At){Wt&&se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Se,vt,ie.width,ie.height);for(let ot=0;ot<6;ot++){Zt=nt[ot].mipmaps;for(let U=0;U<Zt.length;U++){let ut=Zt[U];E.format!==Ht?Ot!==null?Wt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,0,0,ut.width,ut.height,Ot,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,vt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,0,0,ut.width,ut.height,Ot,Tt,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,vt,ut.width,ut.height,0,Ot,Tt,ut.data)}}}else{Zt=E.mipmaps,Wt&&se&&(Zt.length>0&&Se++,e.texStorage2D(i.TEXTURE_CUBE_MAP,Se,vt,nt[0].width,nt[0].height));for(let ot=0;ot<6;ot++)if(Vt){Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,nt[ot].width,nt[ot].height,Ot,Tt,nt[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,vt,nt[ot].width,nt[ot].height,0,Ot,Tt,nt[ot].data);for(let U=0;U<Zt.length;U++){let ht=Zt[U].image[ot].image;Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,0,0,ht.width,ht.height,Ot,Tt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,vt,ht.width,ht.height,0,Ot,Tt,ht.data)}}else{Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Ot,Tt,nt[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,vt,Ot,Tt,nt[ot]);for(let U=0;U<Zt.length;U++){let ut=Zt[U];Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,0,0,Ot,Tt,ut.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,vt,Ot,Tt,ut.image[ot])}}}_(E,Jt)&&v(i.TEXTURE_CUBE_MAP),Q.__version=et.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function gt(A,E,k,it,et,Q){let _t=r.convert(k.format,k.colorSpace),lt=r.convert(k.type),xt=y(k.internalFormat,_t,lt,k.colorSpace);if(!n.get(E).__hasExternalTextures){let Vt=Math.max(1,E.width>>Q),nt=Math.max(1,E.height>>Q);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,Q,xt,Vt,nt,E.depth,0,_t,lt,null):e.texImage2D(et,Q,xt,Vt,nt,0,_t,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),$(E)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,et,n.get(k).__webglTexture,0,st(E)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,et,n.get(k).__webglTexture,Q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(A,E,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),E.depthBuffer&&!E.stencilBuffer){let it=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(k||$(E)){let et=E.depthTexture;et&&et.isDepthTexture&&(et.type===Kt?it=i.DEPTH_COMPONENT32F:et.type===en&&(it=i.DEPTH_COMPONENT24));let Q=st(E);$(E)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,it,E.width,E.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,it,E.width,E.height)}else i.renderbufferStorage(i.RENDERBUFFER,it,E.width,E.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,A)}else if(E.depthBuffer&&E.stencilBuffer){let it=st(E);k&&$(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,i.DEPTH24_STENCIL8,E.width,E.height):$(E)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,i.DEPTH24_STENCIL8,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,A)}else{let it=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let et=0;et<it.length;et++){let Q=it[et],_t=r.convert(Q.format,Q.colorSpace),lt=r.convert(Q.type),xt=y(Q.internalFormat,_t,lt,Q.colorSpace),At=st(E);k&&$(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,xt,E.width,E.height):$(E)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,xt,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,xt,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function zt(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),O(E.depthTexture,0);let it=n.get(E.depthTexture).__webglTexture,et=st(E);if(E.depthTexture.format===Di)$(E)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(E.depthTexture.format===ws)$(E)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function bt(A){let E=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");zt(E.__webglFramebuffer,A)}else if(k){E.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[it]),E.__webglDepthbuffer[it]=i.createRenderbuffer(),It(E.__webglDepthbuffer[it],A,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=i.createRenderbuffer(),It(E.__webglDepthbuffer,A,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(A,E,k){let it=n.get(A);E!==void 0&&gt(it.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&bt(A)}function F(A){let E=A.texture,k=n.get(A),it=n.get(E);A.addEventListener("dispose",I),A.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=E.version,o.memory.textures++);let et=A.isWebGLCubeRenderTarget===!0,Q=A.isWebGLMultipleRenderTargets===!0,_t=d(A)||a;if(et){k.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(a&&E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer[lt]=[];for(let xt=0;xt<E.mipmaps.length;xt++)k.__webglFramebuffer[lt][xt]=i.createFramebuffer()}else k.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)k.__webglFramebuffer[lt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){let lt=A.texture;for(let xt=0,At=lt.length;xt<At;xt++){let Vt=n.get(lt[xt]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&$(A)===!1){let lt=Q?E:[E];k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let xt=0;xt<lt.length;xt++){let At=lt[xt];k.__webglColorRenderbuffer[xt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[xt]);let Vt=r.convert(At.format,At.colorSpace),nt=r.convert(At.type),ie=y(At.internalFormat,Vt,nt,At.colorSpace,A.isXRRenderTarget===!0),Jt=st(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,ie,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,k.__webglColorRenderbuffer[xt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),It(k.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),X(i.TEXTURE_CUBE_MAP,E,_t);for(let lt=0;lt<6;lt++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let xt=0;xt<E.mipmaps.length;xt++)gt(k.__webglFramebuffer[lt][xt],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt);else gt(k.__webglFramebuffer[lt],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);_(E,_t)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Q){let lt=A.texture;for(let xt=0,At=lt.length;xt<At;xt++){let Vt=lt[xt],nt=n.get(Vt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),X(i.TEXTURE_2D,Vt,_t),gt(k.__webglFramebuffer,A,Vt,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,0),_(Vt,_t)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?lt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,it.__webglTexture),X(lt,E,_t),a&&E.mipmaps&&E.mipmaps.length>0)for(let xt=0;xt<E.mipmaps.length;xt++)gt(k.__webglFramebuffer[xt],A,E,i.COLOR_ATTACHMENT0,lt,xt);else gt(k.__webglFramebuffer,A,E,i.COLOR_ATTACHMENT0,lt,0);_(E,_t)&&v(lt),e.unbindTexture()}A.depthBuffer&&bt(A)}function rt(A){let E=d(A)||a,k=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let it=0,et=k.length;it<et;it++){let Q=k[it];if(_(Q,E)){let _t=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,lt=n.get(Q).__webglTexture;e.bindTexture(_t,lt),v(_t),e.unbindTexture()}}}function J(A){if(a&&A.samples>0&&$(A)===!1){let E=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],k=A.width,it=A.height,et=i.COLOR_BUFFER_BIT,Q=[],_t=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(A),xt=A.isWebGLMultipleRenderTargets===!0;if(xt)for(let At=0;At<E.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let At=0;At<E.length;At++){Q.push(i.COLOR_ATTACHMENT0+At),A.depthBuffer&&Q.push(_t);let Vt=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Vt===!1&&(A.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),xt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[At]),Vt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_t]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_t])),xt){let nt=n.get(E[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,k,it,0,0,k,it,et,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xt)for(let At=0;At<E.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,lt.__webglColorRenderbuffer[At]);let Vt=n.get(E[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function st(A){return Math.min(s.maxSamples,A.samples)}function $(A){let E=n.get(A);return a&&A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function wt(A){let E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function pt(A,E){let k=A.colorSpace,it=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===ll||k!==Qn&&k!==Mn&&(re.getTransfer(k)===pe?a===!1?t.has("EXT_sRGB")===!0&&it===Ht?(A.format=ll,A.minFilter=ae,A.generateMipmaps=!1):E=ko.sRGBToLinear(E):(it!==Ht||et!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),E}this.allocateTextureUnit=C,this.resetTextureUnits=B,this.setTexture2D=O,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=Bt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=$}function sy(i,t,e){let n=e.isWebGL2;function s(r,o=Mn){let a,c=re.getTransfer(o);if(r===gn)return i.UNSIGNED_BYTE;if(r===zf)return i.UNSIGNED_SHORT_4_4_4_4;if(r===kf)return i.UNSIGNED_SHORT_5_5_5_1;if(r===aa)return i.BYTE;if(r===Jl)return i.SHORT;if(r===Nr)return i.UNSIGNED_SHORT;if(r===Ds)return i.INT;if(r===en)return i.UNSIGNED_INT;if(r===Kt)return i.FLOAT;if(r===He)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===zm)return i.ALPHA;if(r===Ht)return i.RGBA;if(r===km)return i.LUMINANCE;if(r===Hm)return i.LUMINANCE_ALPHA;if(r===Di)return i.DEPTH_COMPONENT;if(r===ws)return i.DEPTH_STENCIL;if(r===ll)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===di)return i.RED;if(r===ca)return i.RED_INTEGER;if(r===Ur)return i.RG;if(r===Fs)return i.RG_INTEGER;if(r===Ns)return i.RGBA_INTEGER;if(r===Ec||r===Ac||r===Rc||r===Cc)if(c===pe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Ec)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ac)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Rc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Cc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Ec)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ac)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Rc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Cc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ah||r===ch||r===lh||r===uh)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===ah)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ch)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===lh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===uh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Hf)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===hh||r===fh)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===hh)return c===pe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===fh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===dh||r===ph||r===mh||r===gh||r===xh||r===vh||r===_h||r===yh||r===bh||r===Mh||r===Sh||r===wh||r===Th||r===Eh)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===dh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ph)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===mh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===gh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===xh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===vh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===_h)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===yh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===bh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Mh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Sh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===wh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Th)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Eh)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Pc||r===Ah||r===Rh)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Pc)return c===pe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ah)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Rh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Vm||r===Ch||r===Ph||r===Ih)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Pc)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ch)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ph)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ih)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Li?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var wl=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},nn=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},ry={type:"move"},xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let d=e.getJointPose(x,n),m=this._getHandJoint(l,x);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ry)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new nn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Tl=class extends hi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,p=null,g=null,x=e.getContextAttributes(),d=null,m=null,_=[],v=[],y=new Y,S=null,T=new De;T.layers.enable(1),T.viewport=new ne;let M=new De;M.layers.enable(2),M.viewport=new ne;let I=[T,M],b=new wl;b.layers.enable(1),b.layers.enable(2);let w=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=_[X];return tt===void 0&&(tt=new xr,_[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=_[X];return tt===void 0&&(tt=new xr,_[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=_[X];return tt===void 0&&(tt=new xr,_[X]=tt),tt.getHandSpace()};function D(X){let tt=v.indexOf(X.inputSource);if(tt===-1)return;let ft=_[tt];ft!==void 0&&(ft.update(X.inputSource,X.frame,l||o),ft.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",C);for(let X=0;X<_.length;X++){let tt=v[X];tt!==null&&(v[X]=null,_[X].disconnect(tt))}w=null,L=null,t.setRenderTarget(d),p=null,u=null,f=null,s=null,m=null,ct.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",B),s.addEventListener("inputsourceschange",C),x.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(y),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let tt={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),m=new Ve(p.framebufferWidth,p.framebufferHeight,{format:Ht,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let tt=null,ft=null,yt=null;x.depth&&(yt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=x.stencil?ws:Di,ft=x.stencil?Li:en);let gt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};f=new XRWebGLBinding(s,e),u=f.createProjectionLayer(gt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new Ve(u.textureWidth,u.textureHeight,{format:Ht,type:gn,depthTexture:new Yo(u.textureWidth,u.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});let It=t.properties.get(m);It.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ct.setContext(s),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function C(X){for(let tt=0;tt<X.removed.length;tt++){let ft=X.removed[tt],yt=v.indexOf(ft);yt>=0&&(v[yt]=null,_[yt].disconnect(ft))}for(let tt=0;tt<X.added.length;tt++){let ft=X.added[tt],yt=v.indexOf(ft);if(yt===-1){for(let It=0;It<_.length;It++)if(It>=v.length){v.push(ft),yt=It;break}else if(v[It]===null){v[It]=ft,yt=It;break}if(yt===-1)break}let gt=_[yt];gt&&gt.connect(ft)}}let N=new P,O=new P;function W(X,tt,ft){N.setFromMatrixPosition(tt.matrixWorld),O.setFromMatrixPosition(ft.matrixWorld);let yt=N.distanceTo(O),gt=tt.projectionMatrix.elements,It=ft.projectionMatrix.elements,zt=gt[14]/(gt[10]-1),bt=gt[14]/(gt[10]+1),Bt=(gt[9]+1)/gt[5],F=(gt[9]-1)/gt[5],rt=(gt[8]-1)/gt[0],J=(It[8]+1)/It[0],st=zt*rt,$=zt*J,wt=yt/(-rt+J),pt=wt*-rt;tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(pt),X.translateZ(wt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();let A=zt+wt,E=bt+wt,k=st-pt,it=$+(yt-pt),et=Bt*bt/E*A,Q=F*bt/E*A;X.projectionMatrix.makePerspective(k,it,et,Q,A,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function Z(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;b.near=M.near=T.near=X.near,b.far=M.far=T.far=X.far,(w!==b.near||L!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),w=b.near,L=b.far);let tt=X.parent,ft=b.cameras;Z(b,tt);for(let yt=0;yt<ft.length;yt++)Z(ft[yt],tt);ft.length===2?W(b,T,M):b.projectionMatrix.copy(T.projectionMatrix),q(X,b,tt)};function q(X,tt,ft){ft===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(ft.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=br*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(X){c=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let j=null;function K(X,tt){if(h=tt.getViewerPose(l||o),g=tt,h!==null){let ft=h.views;p!==null&&(t.setRenderTargetFramebuffer(m,p.framebuffer),t.setRenderTarget(m));let yt=!1;ft.length!==b.cameras.length&&(b.cameras.length=0,yt=!0);for(let gt=0;gt<ft.length;gt++){let It=ft[gt],zt=null;if(p!==null)zt=p.getViewport(It);else{let Bt=f.getViewSubImage(u,It);zt=Bt.viewport,gt===0&&(t.setRenderTargetTextures(m,Bt.colorTexture,u.ignoreDepthValues?void 0:Bt.depthStencilTexture),t.setRenderTarget(m))}let bt=I[gt];bt===void 0&&(bt=new De,bt.layers.enable(gt),bt.viewport=new ne,I[gt]=bt),bt.matrix.fromArray(It.transform.matrix),bt.matrix.decompose(bt.position,bt.quaternion,bt.scale),bt.projectionMatrix.fromArray(It.projectionMatrix),bt.projectionMatrixInverse.copy(bt.projectionMatrix).invert(),bt.viewport.set(zt.x,zt.y,zt.width,zt.height),gt===0&&(b.matrix.copy(bt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),yt===!0&&b.cameras.push(bt)}}for(let ft=0;ft<_.length;ft++){let yt=v[ft],gt=_[ft];yt!==null&&gt!==void 0&&gt.update(yt,tt,l||o)}j&&j(X,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let ct=new $f;ct.setAnimationLoop(K),this.setAnimationLoop=function(X){j=X},this.dispose=function(){}}};function oy(i,t){function e(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function n(d,m){m.color.getRGB(d.fogColor.value,Zf(i)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,_,v,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(d,m):m.isMeshToonMaterial?(r(d,m),f(d,m)):m.isMeshPhongMaterial?(r(d,m),h(d,m)):m.isMeshStandardMaterial?(r(d,m),u(d,m),m.isMeshPhysicalMaterial&&p(d,m,y)):m.isMeshMatcapMaterial?(r(d,m),g(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),x(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(o(d,m),m.isLineDashedMaterial&&a(d,m)):m.isPointsMaterial?c(d,m,_,v):m.isSpriteMaterial?l(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,e(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===Ee&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,e(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===Ee&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,e(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,e(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);let _=t.get(m).envMap;if(_&&(d.envMap.value=_,d.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap){d.lightMap.value=m.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,d.lightMapTransform)}m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,d.aoMapTransform))}function o(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform))}function a(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function c(d,m,_,v){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*_,d.scale.value=v*.5,m.map&&(d.map.value=m.map,e(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function l(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function h(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function u(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,d.roughnessMapTransform)),t.get(m).envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,_){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ee&&d.clearcoatNormalScale.value.negate())),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=_.texture,d.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function x(d,m){let _=t.get(m).light;d.referencePosition.value.setFromMatrixPosition(_.matrixWorld),d.nearDistance.value=_.shadow.camera.near,d.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ay(i,t,e,n){let s={},r={},o=[],a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(_,v){let y=v.program;n.uniformBlockBinding(_,y)}function l(_,v){let y=s[_.id];y===void 0&&(g(_),y=h(_),s[_.id]=y,_.addEventListener("dispose",d));let S=v.program;n.updateUBOMapping(_,S);let T=t.render.frame;r[_.id]!==T&&(u(_),r[_.id]=T)}function h(_){let v=f();_.__bindingPointIndex=v;let y=i.createBuffer(),S=_.__size,T=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let v=s[_.id],y=_.uniforms,S=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,M=y.length;T<M;T++){let I=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,w=I.length;b<w;b++){let L=I[b];if(p(L,T,b,S)===!0){let D=L.__offset,B=Array.isArray(L.value)?L.value:[L.value],C=0;for(let N=0;N<B.length;N++){let O=B[N],W=x(O);typeof O=="number"||typeof O=="boolean"?(L.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,D+C,L.__data)):O.isMatrix3?(L.__data[0]=O.elements[0],L.__data[1]=O.elements[1],L.__data[2]=O.elements[2],L.__data[3]=0,L.__data[4]=O.elements[3],L.__data[5]=O.elements[4],L.__data[6]=O.elements[5],L.__data[7]=0,L.__data[8]=O.elements[6],L.__data[9]=O.elements[7],L.__data[10]=O.elements[8],L.__data[11]=0):(O.toArray(L.__data,C),C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,v,y,S){let T=_.value,M=v+"_"+y;if(S[M]===void 0)return typeof T=="number"||typeof T=="boolean"?S[M]=T:S[M]=T.clone(),!0;{let I=S[M];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return S[M]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(_){let v=_.uniforms,y=0,S=16;for(let M=0,I=v.length;M<I;M++){let b=Array.isArray(v[M])?v[M]:[v[M]];for(let w=0,L=b.length;w<L;w++){let D=b[w],B=Array.isArray(D.value)?D.value:[D.value];for(let C=0,N=B.length;C<N;C++){let O=B[C],W=x(O),Z=y%S;Z!==0&&S-Z<W.boundary&&(y+=S-Z),D.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=W.storage}}}let T=y%S;return T>0&&(y+=S-T),_.__size=y,_.__cache={},this}function x(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function d(_){let v=_.target;v.removeEventListener("dispose",d);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}var wr=class{constructor(t={}){let{canvas:e=dg(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;let p=new Uint32Array(4),g=new Int32Array(4),x=null,d=null,m=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Le,this._useLegacyLights=!1,this.toneMapping=zn,this.toneMappingExposure=1;let v=this,y=!1,S=0,T=0,M=null,I=-1,b=null,w=new ne,L=new ne,D=null,B=new Dt(0),C=0,N=e.width,O=e.height,W=1,Z=null,q=null,j=new ne(0,0,N,O),K=new ne(0,0,N,O),ct=!1,X=new Sr,tt=!1,ft=!1,yt=null,gt=new Et,It=new Y,zt=new P,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Bt(){return M===null?W:1}let F=n;function rt(R,z){for(let V=0;V<R.length;V++){let G=R[V],H=e.getContext(G,z);if(H!==null)return H}return null}try{let R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ut,!1),F===null){let z=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&z.shift(),F=rt(z,R),F===null)throw rt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let J,st,$,wt,pt,A,E,k,it,et,Q,_t,lt,xt,At,Vt,nt,ie,Jt,Ot,Tt,vt,Wt,se;function Se(){J=new Ev(F),st=new yv(F,J,t),J.init(st),vt=new sy(F,J,st),$=new ny(F,J,st),wt=new Cv(F),pt=new W_,A=new iy(F,J,$,pt,st,vt,wt),E=new Mv(v),k=new Tv(v),it=new Bg(F,st),Wt=new vv(F,J,it,st),et=new Av(F,it,wt,Wt),Q=new Dv(F,et,it,wt),Jt=new Lv(F,st,A),Vt=new bv(pt),_t=new G_(v,E,k,J,st,Wt,Vt),lt=new oy(v,pt),xt=new q_,At=new j_(J,st),ie=new xv(v,E,k,$,Q,u,c),nt=new ey(v,Q,st),se=new ay(F,wt,st,$),Ot=new _v(F,J,wt,st),Tt=new Rv(F,J,wt,st),wt.programs=_t.programs,v.capabilities=st,v.extensions=J,v.properties=pt,v.renderLists=xt,v.shadowMap=nt,v.state=$,v.info=wt}Se();let Zt=new Tl(v,F);this.xr=Zt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let R=J.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=J.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(R){R!==void 0&&(W=R,this.setSize(N,O,!1))},this.getSize=function(R){return R.set(N,O)},this.setSize=function(R,z,V=!0){if(Zt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=R,O=z,e.width=Math.floor(R*W),e.height=Math.floor(z*W),V===!0&&(e.style.width=R+"px",e.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(N*W,O*W).floor()},this.setDrawingBufferSize=function(R,z,V){N=R,O=z,W=V,e.width=Math.floor(R*V),e.height=Math.floor(z*V),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(w)},this.getViewport=function(R){return R.copy(j)},this.setViewport=function(R,z,V,G){R.isVector4?j.set(R.x,R.y,R.z,R.w):j.set(R,z,V,G),$.viewport(w.copy(j).multiplyScalar(W).floor())},this.getScissor=function(R){return R.copy(K)},this.setScissor=function(R,z,V,G){R.isVector4?K.set(R.x,R.y,R.z,R.w):K.set(R,z,V,G),$.scissor(L.copy(K).multiplyScalar(W).floor())},this.getScissorTest=function(){return ct},this.setScissorTest=function(R){$.setScissorTest(ct=R)},this.setOpaqueSort=function(R){Z=R},this.setTransparentSort=function(R){q=R},this.getClearColor=function(R){return R.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(R=!0,z=!0,V=!0){let G=0;if(R){let H=!1;if(M!==null){let mt=M.texture.format;H=mt===Ns||mt===Fs||mt===ca}if(H){let mt=M.texture.type,Mt=mt===gn||mt===en||mt===Nr||mt===Li||mt===zf||mt===kf,Ct=ie.getClearColor(),Ft=ie.getClearAlpha(),Yt=Ct.r,kt=Ct.g,Gt=Ct.b;Mt?(p[0]=Yt,p[1]=kt,p[2]=Gt,p[3]=Ft,F.clearBufferuiv(F.COLOR,0,p)):(g[0]=Yt,g[1]=kt,g[2]=Gt,g[3]=Ft,F.clearBufferiv(F.COLOR,0,g))}else G|=F.COLOR_BUFFER_BIT}z&&(G|=F.DEPTH_BUFFER_BIT),V&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),xt.dispose(),At.dispose(),pt.dispose(),E.dispose(),k.dispose(),Q.dispose(),Wt.dispose(),se.dispose(),_t.dispose(),Zt.dispose(),Zt.removeEventListener("sessionstart",Ke),Zt.removeEventListener("sessionend",fe),yt&&(yt.dispose(),yt=null),je.stop()};function ot(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;let R=wt.autoReset,z=nt.enabled,V=nt.autoUpdate,G=nt.needsUpdate,H=nt.type;Se(),wt.autoReset=R,nt.enabled=z,nt.autoUpdate=V,nt.needsUpdate=G,nt.type=H}function ut(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ht(R){let z=R.target;z.removeEventListener("dispose",ht),Lt(z)}function Lt(R){Rt(R),pt.remove(R)}function Rt(R){let z=pt.get(R).programs;z!==void 0&&(z.forEach(function(V){_t.releaseProgram(V)}),R.isShaderMaterial&&_t.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,V,G,H,mt){z===null&&(z=bt);let Mt=H.isMesh&&H.matrixWorld.determinant()<0,Ct=tm(R,z,V,G,H);$.setMaterial(G,Mt);let Ft=V.index,Yt=1;if(G.wireframe===!0){if(Ft=et.getWireframeAttribute(V),Ft===void 0)return;Yt=2}let kt=V.drawRange,Gt=V.attributes.position,Ce=kt.start*Yt,hn=(kt.start+kt.count)*Yt;mt!==null&&(Ce=Math.max(Ce,mt.start*Yt),hn=Math.min(hn,(mt.start+mt.count)*Yt)),Ft!==null?(Ce=Math.max(Ce,0),hn=Math.min(hn,Ft.count)):Gt!=null&&(Ce=Math.max(Ce,0),hn=Math.min(hn,Gt.count));let ze=hn-Ce;if(ze<0||ze===1/0)return;Wt.setup(H,G,Ct,V,Ft);let Wn,_e=Ot;if(Ft!==null&&(Wn=it.get(Ft),_e=Tt,_e.setIndex(Wn)),H.isMesh)G.wireframe===!0?($.setLineWidth(G.wireframeLinewidth*Bt()),_e.setMode(F.LINES)):_e.setMode(F.TRIANGLES);else if(H.isLine){let $t=G.linewidth;$t===void 0&&($t=1),$.setLineWidth($t*Bt()),H.isLineSegments?_e.setMode(F.LINES):H.isLineLoop?_e.setMode(F.LINE_LOOP):_e.setMode(F.LINE_STRIP)}else H.isPoints?_e.setMode(F.POINTS):H.isSprite&&_e.setMode(F.TRIANGLES);if(H.isBatchedMesh)_e.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)_e.renderInstances(Ce,ze,H.count);else if(V.isInstancedBufferGeometry){let $t=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bc=Math.min(V.instanceCount,$t);_e.renderInstances(Ce,ze,bc)}else _e.render(Ce,ze)};function ue(R,z,V){R.transparent===!0&&R.side===Te&&R.forceSinglePass===!1?(R.side=Ee,R.needsUpdate=!0,eo(R,z,V),R.side=xn,R.needsUpdate=!0,eo(R,z,V),R.side=Te):eo(R,z,V)}this.compile=function(R,z,V=null){V===null&&(V=R),d=At.get(V),d.init(),_.push(d),V.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),R!==V&&R.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights(v._useLegacyLights);let G=new Set;return R.traverse(function(H){let mt=H.material;if(mt)if(Array.isArray(mt))for(let Mt=0;Mt<mt.length;Mt++){let Ct=mt[Mt];ue(Ct,V,H),G.add(Ct)}else ue(mt,V,H),G.add(mt)}),_.pop(),d=null,G},this.compileAsync=function(R,z,V=null){let G=this.compile(R,z,V);return new Promise(H=>{function mt(){if(G.forEach(function(Mt){pt.get(Mt).currentProgram.isReady()&&G.delete(Mt)}),G.size===0){H(R);return}setTimeout(mt,10)}J.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let he=null;function Oe(R){he&&he(R)}function Ke(){je.stop()}function fe(){je.start()}let je=new $f;je.setAnimationLoop(Oe),typeof self<"u"&&je.setContext(self),this.setAnimationLoop=function(R){he=R,Zt.setAnimationLoop(R),R===null?je.stop():je.start()},Zt.addEventListener("sessionstart",Ke),Zt.addEventListener("sessionend",fe),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Zt.enabled===!0&&Zt.isPresenting===!0&&(Zt.cameraAutoUpdate===!0&&Zt.updateCamera(z),z=Zt.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,z,M),d=At.get(R,_.length),d.init(),_.push(d),gt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),X.setFromProjectionMatrix(gt),ft=this.localClippingEnabled,tt=Vt.init(this.clippingPlanes,ft),x=xt.get(R,m.length),x.init(),m.push(x),Un(R,z,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(Z,q),this.info.render.frame++,tt===!0&&Vt.beginShadows();let V=d.state.shadowsArray;if(nt.render(V,R,z),tt===!0&&Vt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ie.render(x,R),d.setupLights(v._useLegacyLights),z.isArrayCamera){let G=z.cameras;for(let H=0,mt=G.length;H<mt;H++){let Mt=G[H];$u(x,R,Mt,Mt.viewport)}}else $u(x,R,z);M!==null&&(A.updateMultisampleRenderTarget(M),A.updateRenderTargetMipmap(M)),R.isScene===!0&&R.onAfterRender(v,R,z),Wt.resetDefaultState(),I=-1,b=null,_.pop(),_.length>0?d=_[_.length-1]:d=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function Un(R,z,V,G){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)V=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||X.intersectsSprite(R)){G&&zt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(gt);let Mt=Q.update(R),Ct=R.material;Ct.visible&&x.push(R,Mt,Ct,V,zt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||X.intersectsObject(R))){let Mt=Q.update(R),Ct=R.material;if(G&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),zt.copy(R.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),zt.copy(Mt.boundingSphere.center)),zt.applyMatrix4(R.matrixWorld).applyMatrix4(gt)),Array.isArray(Ct)){let Ft=Mt.groups;for(let Yt=0,kt=Ft.length;Yt<kt;Yt++){let Gt=Ft[Yt],Ce=Ct[Gt.materialIndex];Ce&&Ce.visible&&x.push(R,Mt,Ce,V,zt.z,Gt)}}else Ct.visible&&x.push(R,Mt,Ct,V,zt.z,null)}}let mt=R.children;for(let Mt=0,Ct=mt.length;Mt<Ct;Mt++)Un(mt[Mt],z,V,G)}function $u(R,z,V,G){let H=R.opaque,mt=R.transmissive,Mt=R.transparent;d.setupLightsView(V),tt===!0&&Vt.setGlobalState(v.clippingPlanes,V),mt.length>0&&Qp(H,mt,z,V),G&&$.viewport(w.copy(G)),H.length>0&&to(H,z,V),mt.length>0&&to(mt,z,V),Mt.length>0&&to(Mt,z,V),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Qp(R,z,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;let mt=st.isWebGL2;yt===null&&(yt=new Ve(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")?He:gn,minFilter:yr,samples:mt?4:0})),v.getDrawingBufferSize(It),mt?yt.setSize(It.x,It.y):yt.setSize(zo(It.x),zo(It.y));let Mt=v.getRenderTarget();v.setRenderTarget(yt),v.getClearColor(B),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear();let Ct=v.toneMapping;v.toneMapping=zn,to(R,V,G),A.updateMultisampleRenderTarget(yt),A.updateRenderTargetMipmap(yt);let Ft=!1;for(let Yt=0,kt=z.length;Yt<kt;Yt++){let Gt=z[Yt],Ce=Gt.object,hn=Gt.geometry,ze=Gt.material,Wn=Gt.group;if(ze.side===Te&&Ce.layers.test(G.layers)){let _e=ze.side;ze.side=Ee,ze.needsUpdate=!0,Ju(Ce,V,G,hn,ze,Wn),ze.side=_e,ze.needsUpdate=!0,Ft=!0}}Ft===!0&&(A.updateMultisampleRenderTarget(yt),A.updateRenderTargetMipmap(yt)),v.setRenderTarget(Mt),v.setClearColor(B,C),v.toneMapping=Ct}function to(R,z,V){let G=z.isScene===!0?z.overrideMaterial:null;for(let H=0,mt=R.length;H<mt;H++){let Mt=R[H],Ct=Mt.object,Ft=Mt.geometry,Yt=G===null?Mt.material:G,kt=Mt.group;Ct.layers.test(V.layers)&&Ju(Ct,z,V,Ft,Yt,kt)}}function Ju(R,z,V,G,H,mt){R.onBeforeRender(v,z,V,G,H,mt),R.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(v,z,V,G,R,mt),H.transparent===!0&&H.side===Te&&H.forceSinglePass===!1?(H.side=Ee,H.needsUpdate=!0,v.renderBufferDirect(V,z,G,H,R,mt),H.side=xn,H.needsUpdate=!0,v.renderBufferDirect(V,z,G,H,R,mt),H.side=Te):v.renderBufferDirect(V,z,G,H,R,mt),R.onAfterRender(v,z,V,G,H,mt)}function eo(R,z,V){z.isScene!==!0&&(z=bt);let G=pt.get(R),H=d.state.lights,mt=d.state.shadowsArray,Mt=H.state.version,Ct=_t.getParameters(R,H.state,mt,z,V),Ft=_t.getProgramCacheKey(Ct),Yt=G.programs;G.environment=R.isMeshStandardMaterial?z.environment:null,G.fog=z.fog,G.envMap=(R.isMeshStandardMaterial?k:E).get(R.envMap||G.environment),Yt===void 0&&(R.addEventListener("dispose",ht),Yt=new Map,G.programs=Yt);let kt=Yt.get(Ft);if(kt!==void 0){if(G.currentProgram===kt&&G.lightsStateVersion===Mt)return ju(R,Ct),kt}else Ct.uniforms=_t.getUniforms(R),R.onBuild(V,Ct,v),R.onBeforeCompile(Ct,v),kt=_t.acquireProgram(Ct,Ft),Yt.set(Ft,kt),G.uniforms=Ct.uniforms;let Gt=G.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Gt.clippingPlanes=Vt.uniform),ju(R,Ct),G.needsLights=nm(R),G.lightsStateVersion=Mt,G.needsLights&&(Gt.ambientLightColor.value=H.state.ambient,Gt.lightProbe.value=H.state.probe,Gt.directionalLights.value=H.state.directional,Gt.directionalLightShadows.value=H.state.directionalShadow,Gt.spotLights.value=H.state.spot,Gt.spotLightShadows.value=H.state.spotShadow,Gt.rectAreaLights.value=H.state.rectArea,Gt.ltc_1.value=H.state.rectAreaLTC1,Gt.ltc_2.value=H.state.rectAreaLTC2,Gt.pointLights.value=H.state.point,Gt.pointLightShadows.value=H.state.pointShadow,Gt.hemisphereLights.value=H.state.hemi,Gt.directionalShadowMap.value=H.state.directionalShadowMap,Gt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Gt.spotShadowMap.value=H.state.spotShadowMap,Gt.spotLightMatrix.value=H.state.spotLightMatrix,Gt.spotLightMap.value=H.state.spotLightMap,Gt.pointShadowMap.value=H.state.pointShadowMap,Gt.pointShadowMatrix.value=H.state.pointShadowMatrix),G.currentProgram=kt,G.uniformsList=null,kt}function Ku(R){if(R.uniformsList===null){let z=R.currentProgram.getUniforms();R.uniformsList=bs.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function ju(R,z){let V=pt.get(R);V.outputColorSpace=z.outputColorSpace,V.batching=z.batching,V.instancing=z.instancing,V.instancingColor=z.instancingColor,V.skinning=z.skinning,V.morphTargets=z.morphTargets,V.morphNormals=z.morphNormals,V.morphColors=z.morphColors,V.morphTargetsCount=z.morphTargetsCount,V.numClippingPlanes=z.numClippingPlanes,V.numIntersection=z.numClipIntersection,V.vertexAlphas=z.vertexAlphas,V.vertexTangents=z.vertexTangents,V.toneMapping=z.toneMapping}function tm(R,z,V,G,H){z.isScene!==!0&&(z=bt),A.resetTextureUnits();let mt=z.fog,Mt=G.isMeshStandardMaterial?z.environment:null,Ct=M===null?v.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Qn,Ft=(G.isMeshStandardMaterial?k:E).get(G.envMap||Mt),Yt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Gt=!!V.morphAttributes.position,Ce=!!V.morphAttributes.normal,hn=!!V.morphAttributes.color,ze=zn;G.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ze=v.toneMapping);let Wn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,_e=Wn!==void 0?Wn.length:0,$t=pt.get(G),bc=d.state.lights;if(tt===!0&&(ft===!0||R!==b)){let yn=R===b&&G.id===I;Vt.setState(G,R,yn)}let we=!1;G.version===$t.__version?($t.needsLights&&$t.lightsStateVersion!==bc.state.version||$t.outputColorSpace!==Ct||H.isBatchedMesh&&$t.batching===!1||!H.isBatchedMesh&&$t.batching===!0||H.isInstancedMesh&&$t.instancing===!1||!H.isInstancedMesh&&$t.instancing===!0||H.isSkinnedMesh&&$t.skinning===!1||!H.isSkinnedMesh&&$t.skinning===!0||H.isInstancedMesh&&$t.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&$t.instancingColor===!1&&H.instanceColor!==null||$t.envMap!==Ft||G.fog===!0&&$t.fog!==mt||$t.numClippingPlanes!==void 0&&($t.numClippingPlanes!==Vt.numPlanes||$t.numIntersection!==Vt.numIntersection)||$t.vertexAlphas!==Yt||$t.vertexTangents!==kt||$t.morphTargets!==Gt||$t.morphNormals!==Ce||$t.morphColors!==hn||$t.toneMapping!==ze||st.isWebGL2===!0&&$t.morphTargetsCount!==_e)&&(we=!0):(we=!0,$t.__version=G.version);let Si=$t.currentProgram;we===!0&&(Si=eo(G,z,H));let Qu=!1,or=!1,Mc=!1,Ze=Si.getUniforms(),wi=$t.uniforms;if($.useProgram(Si.program)&&(Qu=!0,or=!0,Mc=!0),G.id!==I&&(I=G.id,or=!0),Qu||b!==R){Ze.setValue(F,"projectionMatrix",R.projectionMatrix),Ze.setValue(F,"viewMatrix",R.matrixWorldInverse);let yn=Ze.map.cameraPosition;yn!==void 0&&yn.setValue(F,zt.setFromMatrixPosition(R.matrixWorld)),st.logarithmicDepthBuffer&&Ze.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ze.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,or=!0,Mc=!0)}if(H.isSkinnedMesh){Ze.setOptional(F,H,"bindMatrix"),Ze.setOptional(F,H,"bindMatrixInverse");let yn=H.skeleton;yn&&(st.floatVertexTextures?(yn.boneTexture===null&&yn.computeBoneTexture(),Ze.setValue(F,"boneTexture",yn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Ze.setOptional(F,H,"batchingTexture"),Ze.setValue(F,"batchingTexture",H._matricesTexture,A));let Sc=V.morphAttributes;if((Sc.position!==void 0||Sc.normal!==void 0||Sc.color!==void 0&&st.isWebGL2===!0)&&Jt.update(H,V,Si),(or||$t.receiveShadow!==H.receiveShadow)&&($t.receiveShadow=H.receiveShadow,Ze.setValue(F,"receiveShadow",H.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(wi.envMap.value=Ft,wi.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),or&&(Ze.setValue(F,"toneMappingExposure",v.toneMappingExposure),$t.needsLights&&em(wi,Mc),mt&&G.fog===!0&&lt.refreshFogUniforms(wi,mt),lt.refreshMaterialUniforms(wi,G,W,O,yt),bs.upload(F,Ku($t),wi,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(bs.upload(F,Ku($t),wi,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ze.setValue(F,"center",H.center),Ze.setValue(F,"modelViewMatrix",H.modelViewMatrix),Ze.setValue(F,"normalMatrix",H.normalMatrix),Ze.setValue(F,"modelMatrix",H.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let yn=G.uniformsGroups;for(let wc=0,im=yn.length;wc<im;wc++)if(st.isWebGL2){let th=yn[wc];se.update(th,Si),se.bind(th,Si)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Si}function em(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function nm(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(R,z,V){pt.get(R.texture).__webglTexture=z,pt.get(R.depthTexture).__webglTexture=V;let G=pt.get(R);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,z){let V=pt.get(R);V.__webglFramebuffer=z,V.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(R,z=0,V=0){M=R,S=z,T=V;let G=!0,H=null,mt=!1,Mt=!1;if(R){let Ft=pt.get(R);Ft.__useDefaultFramebuffer!==void 0?($.bindFramebuffer(F.FRAMEBUFFER,null),G=!1):Ft.__webglFramebuffer===void 0?A.setupRenderTarget(R):Ft.__hasExternalTextures&&A.rebindTextures(R,pt.get(R.texture).__webglTexture,pt.get(R.depthTexture).__webglTexture);let Yt=R.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Mt=!0);let kt=pt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(kt[z])?H=kt[z][V]:H=kt[z],mt=!0):st.isWebGL2&&R.samples>0&&A.useMultisampledRTT(R)===!1?H=pt.get(R).__webglMultisampledFramebuffer:Array.isArray(kt)?H=kt[V]:H=kt,w.copy(R.viewport),L.copy(R.scissor),D=R.scissorTest}else w.copy(j).multiplyScalar(W).floor(),L.copy(K).multiplyScalar(W).floor(),D=ct;if($.bindFramebuffer(F.FRAMEBUFFER,H)&&st.drawBuffers&&G&&$.drawBuffers(R,H),$.viewport(w),$.scissor(L),$.setScissorTest(D),mt){let Ft=pt.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ft.__webglTexture,V)}else if(Mt){let Ft=pt.get(R.texture),Yt=z||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ft.__webglTexture,V||0,Yt)}I=-1},this.readRenderTargetPixels=function(R,z,V,G,H,mt,Mt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=pt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){$.bindFramebuffer(F.FRAMEBUFFER,Ct);try{let Ft=R.texture,Yt=Ft.format,kt=Ft.type;if(Yt!==Ht&&vt.convert(Yt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Gt=kt===He&&(J.has("EXT_color_buffer_half_float")||st.isWebGL2&&J.has("EXT_color_buffer_float"));if(kt!==gn&&vt.convert(kt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(kt===Kt&&(st.isWebGL2||J.has("OES_texture_float")||J.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-G&&V>=0&&V<=R.height-H&&F.readPixels(z,V,G,H,vt.convert(Yt),vt.convert(kt),mt)}finally{let Ft=M!==null?pt.get(M).__webglFramebuffer:null;$.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.copyFramebufferToTexture=function(R,z,V=0){let G=Math.pow(2,-V),H=Math.floor(z.image.width*G),mt=Math.floor(z.image.height*G);A.setTexture2D(z,0),F.copyTexSubImage2D(F.TEXTURE_2D,V,0,0,R.x,R.y,H,mt),$.unbindTexture()},this.copyTextureToTexture=function(R,z,V,G=0){let H=z.image.width,mt=z.image.height,Mt=vt.convert(V.format),Ct=vt.convert(V.type);A.setTexture2D(V,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,V.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,V.unpackAlignment),z.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,R.x,R.y,H,mt,Mt,Ct,z.image.data):z.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,R.x,R.y,z.mipmaps[0].width,z.mipmaps[0].height,Mt,z.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,G,R.x,R.y,Mt,Ct,z.image),G===0&&V.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),$.unbindTexture()},this.copyTextureToTexture3D=function(R,z,V,G,H=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let mt=R.max.x-R.min.x+1,Mt=R.max.y-R.min.y+1,Ct=R.max.z-R.min.z+1,Ft=vt.convert(G.format),Yt=vt.convert(G.type),kt;if(G.isData3DTexture)A.setTexture3D(G,0),kt=F.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)A.setTexture2DArray(G,0),kt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);let Gt=F.getParameter(F.UNPACK_ROW_LENGTH),Ce=F.getParameter(F.UNPACK_IMAGE_HEIGHT),hn=F.getParameter(F.UNPACK_SKIP_PIXELS),ze=F.getParameter(F.UNPACK_SKIP_ROWS),Wn=F.getParameter(F.UNPACK_SKIP_IMAGES),_e=V.isCompressedTexture?V.mipmaps[H]:V.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,_e.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,R.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,R.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,R.min.z),V.isDataTexture||V.isData3DTexture?F.texSubImage3D(kt,H,z.x,z.y,z.z,mt,Mt,Ct,Ft,Yt,_e.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(kt,H,z.x,z.y,z.z,mt,Mt,Ct,Ft,_e.data)):F.texSubImage3D(kt,H,z.x,z.y,z.z,mt,Mt,Ct,Ft,Yt,_e),F.pixelStorei(F.UNPACK_ROW_LENGTH,Gt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ce),F.pixelStorei(F.UNPACK_SKIP_PIXELS,hn),F.pixelStorei(F.UNPACK_SKIP_ROWS,ze),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Wn),H===0&&G.generateMipmaps&&F.generateMipmap(kt),$.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?A.setTextureCube(R,0):R.isData3DTexture?A.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?A.setTexture2DArray(R,0):A.setTexture2D(R,0),$.unbindTexture()},this.resetState=function(){S=0,T=0,M=null,$.reset(),Wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Kl?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===la?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Le?Fi:Vf}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Fi?Le:Qn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},El=class extends wr{};El.prototype.isWebGL1Renderer=!0;var Pn=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var be=class extends on{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Pt,h=Pt,f,u){super(null,o,a,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Tr=class extends Qt{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ms=new Et,Sf=new Et,To=[],wf=new ve,cy=new Et,hr=new St,fr=new ti,Is=class extends St{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Tr(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,cy)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ve),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),wf.copy(t.boundingBox).applyMatrix4(ms),this.boundingBox.union(wf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ti),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),fr.copy(t.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(fr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fr.copy(this.boundingSphere),fr.applyMatrix4(n),t.ray.intersectsSphere(fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),Sf.multiplyMatrices(n,ms),hr.matrixWorld=Sf,hr.raycast(t,To);for(let o=0,a=To.length;o<a;o++){let c=To[o];c.instanceId=r,c.object=this,e.push(c)}To.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Tr(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Zo=class extends on{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Y:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,s=[],r=[],o=[],a=new P,c=new Et;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Pe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Pe(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Er=class extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){let n=e||new Y,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*h-p*f+this.aX,l=u*f+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Al=class extends Er{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function tu(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;u*=h,p*=h,s(o,a,u,p)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Eo=new P,tl=new tu,el=new tu,nl=new tu,Rl=class extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Eo.subVectors(s[0],s[1]).add(s[0]),l=Eo);let f=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Eo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Eo),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(u),p),d=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),d<1e-4&&(d=x),tl.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,g,x,d),el.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,g,x,d),nl.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,g,x,d)}else this.curveType==="catmullrom"&&(tl.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),el.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),nl.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(tl.calc(c),el.calc(c),nl.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Tf(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ly(i,t){let e=1-i;return e*e*t}function uy(i,t){return 2*(1-i)*i*t}function hy(i,t){return i*i*t}function vr(i,t,e,n){return ly(i,t)+uy(i,e)+hy(i,n)}function fy(i,t){let e=1-i;return e*e*e*t}function dy(i,t){let e=1-i;return 3*e*e*i*t}function py(i,t){return 3*(1-i)*i*i*t}function my(i,t){return i*i*i*t}function _r(i,t,e,n,s){return fy(i,t)+dy(i,e)+py(i,n)+my(i,s)}var $o=class extends Sn{constructor(t=new Y,e=new Y,n=new Y,s=new Y){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Y){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_r(t,s.x,r.x,o.x,a.x),_r(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Cl=class extends Sn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_r(t,s.x,r.x,o.x,a.x),_r(t,s.y,r.y,o.y,a.y),_r(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Jo=class extends Sn{constructor(t=new Y,e=new Y){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Y){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Y){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pl=class extends Sn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ko=class extends Sn{constructor(t=new Y,e=new Y,n=new Y){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Y){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Il=class extends Sn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y),vr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jo=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Y){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Tf(a,c.x,l.x,h.x,f.x),Tf(a,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Y().fromArray(s))}return this}},Ll=Object.freeze({__proto__:null,ArcCurve:Al,CatmullRomCurve3:Rl,CubicBezierCurve:$o,CubicBezierCurve3:Cl,EllipseCurve:Er,LineCurve:Jo,LineCurve3:Pl,QuadraticBezierCurve:Ko,QuadraticBezierCurve3:Il,SplineCurve:jo}),Dl=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ll[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Ll[s.type]().fromJSON(s))}return this}},Oi=class extends Dl{constructor(t){super(),this.type="Path",this.currentPoint=new Y,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Jo(this.currentPoint.clone(),new Y(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Ko(this.currentPoint.clone(),new Y(t,e),new Y(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new $o(this.currentPoint.clone(),new Y(t,e),new Y(n,s),new Y(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new jo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Er(t,e,n,s,r,o,a,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var ei=class i extends oe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],p=[],g=0,x=[],d=n/2,m=0;_(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new de(f,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(p,2));function _(){let y=new P,S=new P,T=0,M=(e-t)/n;for(let I=0;I<=r;I++){let b=[],w=I/r,L=w*(e-t)+t;for(let D=0;D<=s;D++){let B=D/s,C=B*c+a,N=Math.sin(C),O=Math.cos(C);S.x=L*N,S.y=-w*n+d,S.z=L*O,f.push(S.x,S.y,S.z),y.set(N,M,O).normalize(),u.push(y.x,y.y,y.z),p.push(B,1-w),b.push(g++)}x.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){let w=x[b][I],L=x[b+1][I],D=x[b+1][I+1],B=x[b][I+1];h.push(w,L,B),h.push(L,D,B),T+=6}l.addGroup(m,T,0),m+=T}function v(y){let S=g,T=new Y,M=new P,I=0,b=y===!0?t:e,w=y===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,d*w,0),u.push(0,w,0),p.push(.5,.5),g++;let L=g;for(let D=0;D<=s;D++){let C=D/s*c+a,N=Math.cos(C),O=Math.sin(C);M.x=b*O,M.y=d*w,M.z=b*N,f.push(M.x,M.y,M.z),u.push(0,w,0),T.x=N*.5+.5,T.y=O*.5*w+.5,p.push(T.x,T.y),g++}for(let D=0;D<s;D++){let B=S+D,C=L+D;y===!0?h.push(C,C+1,B):h.push(C+1,C,B),I+=3}l.addGroup(m,I,y===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var In=class extends Oi{constructor(t){super(t),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Oi().fromJSON(s))}return this}},gy={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ed(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,u,p;if(n&&(r=by(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)f=i[g],u=i[g+1],f<a&&(a=f),u<c&&(c=u),f>l&&(l=f),u>h&&(h=u);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Ar(r,o,e,a,c,p,0),o}};function ed(i,t,e,n,s){let r,o;if(s===Ly(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Ef(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Ef(r,i[r],i[r+1],o);return o&&ha(o,o.next)&&(Cr(o),o=o.next),o}function zi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ha(e,e.next)||ye(e.prev,e,e.next)===0)){if(Cr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ar(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Ey(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?vy(i,n,s,r):xy(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Cr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=_y(zi(i),t,e),Ar(i,t,e,n,s,r,2)):o===2&&yy(i,t,e,n,s,r):Ar(zi(i),t,e,n,s,r,1);break}}}function xy(i){let t=i.prev,e=i,n=i.next;if(ye(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,u=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=p&&_s(s,a,r,c,o,l,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function vy(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ye(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,u=o.y,p=a<c?a<l?a:l:c<l?c:l,g=h<f?h<u?h:u:f<u?f:u,x=a>c?a>l?a:l:c>l?c:l,d=h>f?h>u?h:u:f>u?f:u,m=Fl(p,g,t,e,n),_=Fl(x,d,t,e,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=m&&y&&y.z<=_;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=d&&v!==s&&v!==o&&_s(a,h,c,f,l,u,v.x,v.y)&&ye(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=x&&y.y>=g&&y.y<=d&&y!==s&&y!==o&&_s(a,h,c,f,l,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=d&&v!==s&&v!==o&&_s(a,h,c,f,l,u,v.x,v.y)&&ye(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=x&&y.y>=g&&y.y<=d&&y!==s&&y!==o&&_s(a,h,c,f,l,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function _y(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!ha(s,r)&&nd(s,n,n.next,r)&&Rr(s,r)&&Rr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Cr(n),Cr(n.next),n=i=r),n=n.next}while(n!==i);return zi(n)}function yy(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Cy(o,a)){let c=id(o,a);o=zi(o,o.next),c=zi(c,c.next),Ar(o,t,e,n,s,r,0),Ar(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function by(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ed(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Ry(l));for(s.sort(My),r=0;r<s.length;r++)e=Sy(s[r],e);return e}function My(i,t){return i.x-t.x}function Sy(i,t){let e=wy(i,t);if(!e)return t;let n=id(e,i);return zi(n,n.next),zi(e,e.next)}function wy(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,s=e.x<e.next.x?e:e.next,u===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,f;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&_s(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(f=Math.abs(o-e.y)/(r-e.x),Rr(e,i)&&(f<h||f===h&&(e.x>s.x||e.x===s.x&&Ty(s,e)))&&(s=e,h=f)),e=e.next;while(e!==a);return s}function Ty(i,t){return ye(i.prev,i,t.prev)<0&&ye(t.next,i,i.next)<0}function Ey(i,t,e,n){let s=i;do s.z===0&&(s.z=Fl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ay(s)}function Ay(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Fl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Ry(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function _s(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Cy(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Py(i,t)&&(Rr(i,t)&&Rr(t,i)&&Iy(i,t)&&(ye(i.prev,i,t.prev)||ye(i,t.prev,t))||ha(i,t)&&ye(i.prev,i,i.next)>0&&ye(t.prev,t,t.next)>0)}function ye(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ha(i,t){return i.x===t.x&&i.y===t.y}function nd(i,t,e,n){let s=Ro(ye(i,t,e)),r=Ro(ye(i,t,n)),o=Ro(ye(e,n,i)),a=Ro(ye(e,n,t));return!!(s!==r&&o!==a||s===0&&Ao(i,e,t)||r===0&&Ao(i,n,t)||o===0&&Ao(e,i,n)||a===0&&Ao(e,t,n))}function Ao(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ro(i){return i>0?1:i<0?-1:0}function Py(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&nd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Rr(i,t){return ye(i.prev,i,i.next)<0?ye(i,t,i.next)>=0&&ye(i,i.prev,t)>=0:ye(i,t,i.prev)<0||ye(i,i.next,t)<0}function Iy(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function id(i,t){let e=new Nl(i.i,i.x,i.y),n=new Nl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ef(i,t,e,n){let s=new Nl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Cr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Nl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ly(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var ui=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Af(t),Rf(n,t);let o=t.length;e.forEach(Af);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Rf(n,e[c]);let a=gy.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Af(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Rf(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ki=class i extends oe{constructor(t=new In([new Y(.5,.5),new Y(-.5,.5),new Y(-.5,-.5),new Y(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new de(s,3)),this.setAttribute("uv",new de(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,d=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:Dy,v,y=!1,S,T,M,I;m&&(v=m.getSpacedPoints(h),y=!0,u=!1,S=m.computeFrenetFrames(h,!1),T=new P,M=new P,I=new P),u||(d=0,p=0,g=0,x=0);let b=a.extractPoints(l),w=b.shape,L=b.holes;if(!ui.isClockWise(w)){w=w.reverse();for(let F=0,rt=L.length;F<rt;F++){let J=L[F];ui.isClockWise(J)&&(L[F]=J.reverse())}}let B=ui.triangulateShape(w,L),C=w;for(let F=0,rt=L.length;F<rt;F++){let J=L[F];w=w.concat(J)}function N(F,rt,J){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),F.clone().addScaledVector(rt,J)}let O=w.length,W=B.length;function Z(F,rt,J){let st,$,wt,pt=F.x-rt.x,A=F.y-rt.y,E=J.x-F.x,k=J.y-F.y,it=pt*pt+A*A,et=pt*k-A*E;if(Math.abs(et)>Number.EPSILON){let Q=Math.sqrt(it),_t=Math.sqrt(E*E+k*k),lt=rt.x-A/Q,xt=rt.y+pt/Q,At=J.x-k/_t,Vt=J.y+E/_t,nt=((At-lt)*k-(Vt-xt)*E)/(pt*k-A*E);st=lt+pt*nt-F.x,$=xt+A*nt-F.y;let ie=st*st+$*$;if(ie<=2)return new Y(st,$);wt=Math.sqrt(ie/2)}else{let Q=!1;pt>Number.EPSILON?E>Number.EPSILON&&(Q=!0):pt<-Number.EPSILON?E<-Number.EPSILON&&(Q=!0):Math.sign(A)===Math.sign(k)&&(Q=!0),Q?(st=-A,$=pt,wt=Math.sqrt(it)):(st=pt,$=A,wt=Math.sqrt(it/2))}return new Y(st/wt,$/wt)}let q=[];for(let F=0,rt=C.length,J=rt-1,st=F+1;F<rt;F++,J++,st++)J===rt&&(J=0),st===rt&&(st=0),q[F]=Z(C[F],C[J],C[st]);let j=[],K,ct=q.concat();for(let F=0,rt=L.length;F<rt;F++){let J=L[F];K=[];for(let st=0,$=J.length,wt=$-1,pt=st+1;st<$;st++,wt++,pt++)wt===$&&(wt=0),pt===$&&(pt=0),K[st]=Z(J[st],J[wt],J[pt]);j.push(K),ct=ct.concat(K)}for(let F=0;F<d;F++){let rt=F/d,J=p*Math.cos(rt*Math.PI/2),st=g*Math.sin(rt*Math.PI/2)+x;for(let $=0,wt=C.length;$<wt;$++){let pt=N(C[$],q[$],st);gt(pt.x,pt.y,-J)}for(let $=0,wt=L.length;$<wt;$++){let pt=L[$];K=j[$];for(let A=0,E=pt.length;A<E;A++){let k=N(pt[A],K[A],st);gt(k.x,k.y,-J)}}}let X=g+x;for(let F=0;F<O;F++){let rt=u?N(w[F],ct[F],X):w[F];y?(M.copy(S.normals[0]).multiplyScalar(rt.x),T.copy(S.binormals[0]).multiplyScalar(rt.y),I.copy(v[0]).add(M).add(T),gt(I.x,I.y,I.z)):gt(rt.x,rt.y,0)}for(let F=1;F<=h;F++)for(let rt=0;rt<O;rt++){let J=u?N(w[rt],ct[rt],X):w[rt];y?(M.copy(S.normals[F]).multiplyScalar(J.x),T.copy(S.binormals[F]).multiplyScalar(J.y),I.copy(v[F]).add(M).add(T),gt(I.x,I.y,I.z)):gt(J.x,J.y,f/h*F)}for(let F=d-1;F>=0;F--){let rt=F/d,J=p*Math.cos(rt*Math.PI/2),st=g*Math.sin(rt*Math.PI/2)+x;for(let $=0,wt=C.length;$<wt;$++){let pt=N(C[$],q[$],st);gt(pt.x,pt.y,f+J)}for(let $=0,wt=L.length;$<wt;$++){let pt=L[$];K=j[$];for(let A=0,E=pt.length;A<E;A++){let k=N(pt[A],K[A],st);y?gt(k.x,k.y+v[h-1].y,v[h-1].x+J):gt(k.x,k.y,f+J)}}}tt(),ft();function tt(){let F=s.length/3;if(u){let rt=0,J=O*rt;for(let st=0;st<W;st++){let $=B[st];It($[2]+J,$[1]+J,$[0]+J)}rt=h+d*2,J=O*rt;for(let st=0;st<W;st++){let $=B[st];It($[0]+J,$[1]+J,$[2]+J)}}else{for(let rt=0;rt<W;rt++){let J=B[rt];It(J[2],J[1],J[0])}for(let rt=0;rt<W;rt++){let J=B[rt];It(J[0]+O*h,J[1]+O*h,J[2]+O*h)}}n.addGroup(F,s.length/3-F,0)}function ft(){let F=s.length/3,rt=0;yt(C,rt),rt+=C.length;for(let J=0,st=L.length;J<st;J++){let $=L[J];yt($,rt),rt+=$.length}n.addGroup(F,s.length/3-F,1)}function yt(F,rt){let J=F.length;for(;--J>=0;){let st=J,$=J-1;$<0&&($=F.length-1);for(let wt=0,pt=h+d*2;wt<pt;wt++){let A=O*wt,E=O*(wt+1),k=rt+st+A,it=rt+$+A,et=rt+$+E,Q=rt+st+E;zt(k,it,et,Q)}}}function gt(F,rt,J){c.push(F),c.push(rt),c.push(J)}function It(F,rt,J){bt(F),bt(rt),bt(J);let st=s.length/3,$=_.generateTopUV(n,s,st-3,st-2,st-1);Bt($[0]),Bt($[1]),Bt($[2])}function zt(F,rt,J,st){bt(F),bt(rt),bt(st),bt(rt),bt(J),bt(st);let $=s.length/3,wt=_.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);Bt(wt[0]),Bt(wt[1]),Bt(wt[3]),Bt(wt[1]),Bt(wt[2]),Bt(wt[3])}function bt(F){s.push(c[F*3+0]),s.push(c[F*3+1]),s.push(c[F*3+2])}function Bt(F){r.push(F.x),r.push(F.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Fy(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ll[s.type]().fromJSON(s)),new i(n,t.options)}},Dy={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new Y(r,o),new Y(a,c),new Y(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[s*3],p=t[s*3+1],g=t[s*3+2],x=t[r*3],d=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new Y(o,1-c),new Y(l,1-f),new Y(u,1-g),new Y(x,1-m)]:[new Y(a,1-c),new Y(h,1-f),new Y(p,1-g),new Y(d,1-m)]}};function Fy(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Pr=class i extends oe{constructor(t=new In([new Y(0,.5),new Y(-.5,-.5),new Y(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new de(s,3)),this.setAttribute("normal",new de(r,3)),this.setAttribute("uv",new de(o,2));function l(h){let f=s.length/3,u=h.extractPoints(e),p=u.shape,g=u.holes;ui.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,m=g.length;d<m;d++){let _=g[d];ui.isClockWise(_)===!0&&(g[d]=_.reverse())}let x=ui.triangulateShape(p,g);for(let d=0,m=g.length;d<m;d++){let _=g[d];p=p.concat(_)}for(let d=0,m=p.length;d<m;d++){let _=p[d];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let d=0,m=x.length;d<m;d++){let _=x[d],v=_[0]+f,y=_[1]+f,S=_[2]+f;n.push(v,y,S),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Ny(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function Ny(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var fi=class extends Bi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gf,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ir=class extends fi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Y(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Co(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Uy(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ls=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ul=class extends Ls{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lh,endingEnd:Lh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Dh:r=t,a=2*e-n;break;case Fh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Dh:o=t,c=2*n-e;break;case Fh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),x=g*g,d=x*g,m=-u*d+2*u*x-u*g,_=(1+u)*d+(-1.5-2*u)*x+(-.5+u)*g+1,v=(-1-p)*d+(1.5+p)*x+.5*g,y=p*d-p*x;for(let S=0;S!==a;++S)r[S]=m*o[h+S]+_*o[l+S]+v*o[c+S]+y*o[f+S];return r}},Bl=class extends Ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*f+o[c+u]*h;return r}},Ol=class extends Ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ln=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Co(e,this.TimeBufferType),this.values=Co(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Co(t.times,Array),values:Co(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ol(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ul(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Do:e=this.InterpolantFactoryMethodDiscrete;break;case Fo:e=this.InterpolantFactoryMethodLinear;break;case Ic:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Do;case this.InterpolantFactoryMethodLinear:return Fo;case this.InterpolantFactoryMethodSmooth:return Ic}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Uy(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ic,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let f=a*n,u=f-n,p=f+n;for(let g=0;g!==n;++g){let x=e[f+g];if(x!==e[u+g]||x!==e[p+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,u=o*n;for(let p=0;p!==n;++p)e[u+p]=e[f+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=Fo;var Hi=class extends Ln{};Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Do;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends Ln{};zl.prototype.ValueTypeName="color";var kl=class extends Ln{};kl.prototype.ValueTypeName="number";var Hl=class extends Ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)kn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Lr=class extends Ln{InterpolantFactoryMethodLinear(t){return new Hl(this.times,this.values,this.getValueSize(),t)}};Lr.prototype.ValueTypeName="quaternion";Lr.prototype.DefaultInterpolation=Fo;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends Ln{};Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Do;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Vl=class extends Ln{};Vl.prototype.ValueTypeName="vector";var Cf={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Gl=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let p=l[f],g=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},By=new Gl,Dr=class{constructor(t){this.manager=t!==void 0?t:By,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Dr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Wl=class extends Dr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Cf.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Mr("img");function c(){h(),Cf.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(f){h(),s&&s(f),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var Qo=class extends Dr{constructor(t){super(t)}load(t,e,n,s){let r=new on,o=new Wl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Fr=class extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},ta=class extends Fr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},il=new Et,Pf=new P,If=new P,ea=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y(512,512),this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sr,this._frameExtents=new Y(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Pf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pf),If.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(If),e.updateMatrixWorld(),il.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(il),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Lf=new Et,dr=new P,sl=new P,Xl=class extends ea{constructor(){super(new De(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Y(4,2),this._viewportCount=6,this._viewports=[new ne(2,1,1,1),new ne(0,1,1,1),new ne(3,1,1,1),new ne(1,1,1,1),new ne(3,0,1,1),new ne(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),dr.setFromMatrixPosition(t.matrixWorld),n.position.copy(dr),sl.copy(n.position),sl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(sl),n.updateMatrixWorld(),s.makeTranslation(-dr.x,-dr.y,-dr.z),Lf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lf)}},na=class extends Fr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Xl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},ql=class extends ea{constructor(){super(new Cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ia=class extends Fr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new ql}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var sa=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Df(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Df();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Df(){return(typeof performance>"u"?Date:performance).now()}var eu="\\[\\]\\.:\\/",Oy=new RegExp("["+eu+"]","g"),nu="[^"+eu+"]",zy="[^"+eu.replace("\\.","")+"]",ky=/((?:WC+[\/:])*)/.source.replace("WC",nu),Hy=/(WCOD+)?/.source.replace("WCOD",zy),Vy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nu),Gy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nu),Wy=new RegExp("^"+ky+Hy+Vy+Gy+"$"),Xy=["material","materials","bones","map"],Yl=class{constructor(t,e,n){let s=n||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ge=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Oy,"")}static parseTrackName(t){let e=Wy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Xy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=Yl;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gM=new Float32Array(1);var ra=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Pe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ff=new P,Po=new P,an=class{constructor(t=new P,e=new P){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Ff.subVectors(t,this.start),Po.subVectors(this.end,this.start);let n=Po.dot(Po),r=Po.dot(Ff)/n;return e&&(r=Pe(r,0,1)),r}closestPointToPoint(t,e,n){let s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var fa=class extends Pn{constructor(t=null){super();let e=new vn;e.deleteAttribute("uv");let n=new fi({side:Ee}),s=new fi,r=5;t!==null&&t._useLegacyLights===!1&&(r=900);let o=new na(16777215,r,28,2);o.position.set(.418,16.199,.3),this.add(o);let a=new St(e,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let c=new St(e,s);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new St(e,s);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let h=new St(e,s);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);let f=new St(e,s);f.position.set(-2.017,.018,6.124),f.rotation.set(0,.333,0),f.scale.set(2.002,4.566,2.064),this.add(f);let u=new St(e,s);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);let p=new St(e,s);p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),this.add(p);let g=new St(e,Bs(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);let x=new St(e,Bs(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);let d=new St(e,Bs(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let m=new St(e,Bs(43));m.position.set(-.462,8.89,14.52),m.scale.set(4.38,5.441,.088),this.add(m);let _=new St(e,Bs(20));_.position.set(3.235,11.486,-12.541),_.scale.set(2.5,2,.1),this.add(_);let v=new St(e,Bs(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Bs(i){let t=new Hn;return t.color.setScalar(i),t}var Br=new P;function Tn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Br.copy(t),Br[n]=0,Br.normalize();let l=.5*o/(o+a),h=1-Br.angleTo(i)/c;return Math.sign(Br[e])===1?h*l:a/(o+a)+l+l*(1-h)}var da=class extends vn{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new P,c=new P,l=new P(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,f=this.attributes.normal.array,u=this.attributes.uv.array,p=h.length/6,g=new P,x=.5/s;for(let d=0,m=0;d<h.length;d+=3,m+=2)switch(a.fromArray(h,d),c.copy(a),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),h[d+0]=l.x*Math.sign(a.x)+c.x*r,h[d+1]=l.y*Math.sign(a.y)+c.y*r,h[d+2]=l.z*Math.sign(a.z)+c.z*r,f[d+0]=c.x,f[d+1]=c.y,f[d+2]=c.z,Math.floor(d/p)){case 0:g.set(1,0,0),u[m+0]=Tn(g,c,"z","y",r,n),u[m+1]=1-Tn(g,c,"y","z",r,e);break;case 1:g.set(-1,0,0),u[m+0]=1-Tn(g,c,"z","y",r,n),u[m+1]=1-Tn(g,c,"y","z",r,e);break;case 2:g.set(0,1,0),u[m+0]=1-Tn(g,c,"x","z",r,t),u[m+1]=Tn(g,c,"z","x",r,n);break;case 3:g.set(0,-1,0),u[m+0]=1-Tn(g,c,"x","z",r,t),u[m+1]=1-Tn(g,c,"z","x",r,n);break;case 4:g.set(0,0,1),u[m+0]=1-Tn(g,c,"x","y",r,t),u[m+1]=1-Tn(g,c,"y","x",r,e);break;case 5:g.set(0,0,-1),u[m+0]=Tn(g,c,"x","y",r,t),u[m+1]=1-Tn(g,c,"y","x",r,e);break}}};function rd(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new oe,l=0;for(let h=0;h<i.length;++h){let f=i[h],u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.morphAttributes[p])}if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0,f=[];for(let u=0;u<i.length;++u){let p=i[u].index;for(let g=0;g<p.count;++g)f.push(p.getX(g)+h);h+=i[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=sd(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in o){let f=o[h][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let p=[];for(let x=0;x<o[h].length;++x)p.push(o[h][x][u]);let g=sd(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function sd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let o=new t(r),a=0;for(let l=0;l<i.length;++l)o.set(i[l].array,a),a+=i[l].array.length;let c=new Qt(o,e,n);return s!==void 0&&(c.gpuType=s),c}var od=Math.pow(2,-24),pa=Symbol("SKIP_GENERATION");function iu(i){return i.index?i.index.count:i.attributes.position.count}function Vn(i){return iu(i)/3}function su(i,t=ArrayBuffer){return i>65535?new Uint32Array(new t(4*i)):new Uint16Array(new t(2*i))}function ad(i,t){if(!i.index){let e=i.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=su(e,n);i.setIndex(new Qt(s,1));for(let r=0;r<e;r++)s[r]=r}}function ru(i,t){let e=Vn(i),n=t||i.drawRange,s=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,s),a=Math.min(e,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function ou(i,t){if(!i.groups||!i.groups.length)return ru(i,t);let e=[],n=new Set,s=t||i.drawRange,r=s.start/3,o=(s.start+s.count)/3;for(let c of i.groups){let l=c.start/3,h=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,h))}let a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){let l=a[c],h=a[c+1];e.push({offset:Math.floor(l),count:Math.floor(h-l)})}return e}function cd(i,t){let e=Vn(i),n=ou(i,t).sort((o,a)=>o.offset-a.offset),s=n[n.length-1];s.count=Math.min(e-s.offset,s.count);let r=0;return n.forEach(({count:o})=>r+=o),e!==r}function ma(i,t,e,n,s){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,h=-1/0,f=1/0,u=1/0,p=1/0,g=-1/0,x=-1/0,d=-1/0;for(let m=t*6,_=(t+e)*6;m<_;m+=6){let v=i[m+0],y=i[m+1],S=v-y,T=v+y;S<r&&(r=S),T>c&&(c=T),v<f&&(f=v),v>g&&(g=v);let M=i[m+2],I=i[m+3],b=M-I,w=M+I;b<o&&(o=b),w>l&&(l=w),M<u&&(u=M),M>x&&(x=M);let L=i[m+4],D=i[m+5],B=L-D,C=L+D;B<a&&(a=B),C>h&&(h=C),L<p&&(p=L),L>d&&(d=L)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=h,s[0]=f,s[1]=u,s[2]=p,s[3]=g,s[4]=x,s[5]=d}function ld(i,t=null,e=null,n=null){let s=i.attributes.position,r=i.index?i.index.array:null,o=Vn(i),a=s.normalized,c;t===null?(c=new Float32Array(o*6*4),e=0,n=o):(c=t,e=e||0,n=n||o);let l=s.array,h=s.offset||0,f=3;s.isInterleavedBufferAttribute&&(f=s.data.stride);let u=["getX","getY","getZ"];for(let p=e;p<e+n;p++){let g=p*3,x=p*6,d=g+0,m=g+1,_=g+2;r&&(d=r[d],m=r[m],_=r[_]),a||(d=d*f+h,m=m*f+h,_=_*f+h);for(let v=0;v<3;v++){let y,S,T;a?(y=s[u[v]](d),S=s[u[v]](m),T=s[u[v]](_)):(y=l[d+v],S=l[m+v],T=l[_+v]);let M=y;S<M&&(M=S),T<M&&(M=T);let I=y;S>I&&(I=S),T>I&&(I=T);let b=(I-M)/2,w=v*2;c[x+w+0]=M+b,c[x+w+1]=b+(Math.abs(M)+b)*od}}return c}function ce(i,t,e){return e.min.x=t[i],e.min.y=t[i+1],e.min.z=t[i+2],e.max.x=t[i+3],e.max.y=t[i+4],e.max.z=t[i+5],e}function au(i){let t=-1,e=-1/0;for(let n=0;n<3;n++){let s=i[n+3]-i[n];s>e&&(e=s,t=n)}return t}function cu(i,t){t.set(i)}function lu(i,t,e){let n,s;for(let r=0;r<3;r++){let o=r+3;n=i[r],s=t[r],e[r]=n<s?n:s,n=i[o],s=t[o],e[o]=n>s?n:s}}function Or(i,t,e){for(let n=0;n<3;n++){let s=t[i+2*n],r=t[i+2*n+1],o=s-r,a=s+r;o<e[n]&&(e[n]=o),a>e[n+3]&&(e[n+3]=a)}}function Os(i){let t=i[3]-i[0],e=i[4]-i[1],n=i[5]-i[2];return 2*(t*e+e*n+n*t)}var ni=32,Zy=(i,t)=>i.candidate-t.candidate,pi=new Array(ni).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ga=new Float32Array(6);function dd(i,t,e,n,s,r){let o=-1,a=0;if(r===0)o=au(t),o!==-1&&(a=(t[o]+t[o+3])/2);else if(r===1)o=au(i),o!==-1&&(a=$y(e,n,s,o));else if(r===2){let c=Os(i),l=1.25*s,h=n*6,f=(n+s)*6;for(let u=0;u<3;u++){let p=t[u],d=(t[u+3]-p)/ni;if(s<ni/4){let m=[...pi];m.length=s;let _=0;for(let y=h;y<f;y+=6,_++){let S=m[_];S.candidate=e[y+2*u],S.count=0;let{bounds:T,leftCacheBounds:M,rightCacheBounds:I}=S;for(let b=0;b<3;b++)I[b]=1/0,I[b+3]=-1/0,M[b]=1/0,M[b+3]=-1/0,T[b]=1/0,T[b+3]=-1/0;Or(y,e,T)}m.sort(Zy);let v=s;for(let y=0;y<v;y++){let S=m[y];for(;y+1<v&&m[y+1].candidate===S.candidate;)m.splice(y+1,1),v--}for(let y=h;y<f;y+=6){let S=e[y+2*u];for(let T=0;T<v;T++){let M=m[T];S>=M.candidate?Or(y,e,M.rightCacheBounds):(Or(y,e,M.leftCacheBounds),M.count++)}}for(let y=0;y<v;y++){let S=m[y],T=S.count,M=s-S.count,I=S.leftCacheBounds,b=S.rightCacheBounds,w=0;T!==0&&(w=Os(I)/c);let L=0;M!==0&&(L=Os(b)/c);let D=1+1.25*(w*T+L*M);D<l&&(o=u,l=D,a=S.candidate)}}else{for(let v=0;v<ni;v++){let y=pi[v];y.count=0,y.candidate=p+d+v*d;let S=y.bounds;for(let T=0;T<3;T++)S[T]=1/0,S[T+3]=-1/0}for(let v=h;v<f;v+=6){let T=~~((e[v+2*u]-p)/d);T>=ni&&(T=ni-1);let M=pi[T];M.count++,Or(v,e,M.bounds)}let m=pi[ni-1];cu(m.bounds,m.rightCacheBounds);for(let v=ni-2;v>=0;v--){let y=pi[v],S=pi[v+1];lu(y.bounds,S.rightCacheBounds,y.rightCacheBounds)}let _=0;for(let v=0;v<ni-1;v++){let y=pi[v],S=y.count,T=y.bounds,I=pi[v+1].rightCacheBounds;S!==0&&(_===0?cu(T,ga):lu(T,ga,ga)),_+=S;let b=0,w=0;_!==0&&(b=Os(ga)/c);let L=s-_;L!==0&&(w=Os(I)/c);let D=1+1.25*(b*_+w*L);D<l&&(o=u,l=D,a=y.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function $y(i,t,e,n){let s=0;for(let r=t,o=t+e;r<o;r++)s+=i[r*6+n*2];return s/e}var zs=class{constructor(){this.boundingData=new Float32Array(6)}};function pd(i,t,e,n,s,r){let o=n,a=n+s-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&e[o*6+l]<c;)o++;for(;o<=a&&e[a*6+l]>=c;)a--;if(o<a){for(let h=0;h<3;h++){let f=t[o*3+h];t[o*3+h]=t[a*3+h],t[a*3+h]=f}for(let h=0;h<6;h++){let f=e[o*6+h];e[o*6+h]=e[a*6+h],e[a*6+h]=f}o++,a--}else return o}}function md(i,t,e,n,s,r){let o=n,a=n+s-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&e[o*6+l]<c;)o++;for(;o<=a&&e[a*6+l]>=c;)a--;if(o<a){let h=i[o];i[o]=i[a],i[a]=h;for(let f=0;f<6;f++){let u=e[o*6+f];e[o*6+f]=e[a*6+f],e[a*6+f]=u}o++,a--}else return o}}function me(i,t){return t[i+15]===65535}function Me(i,t){return t[i+6]}function Ae(i,t){return t[i+14]}function Ge(i){return i+8}function Fe(i,t){return t[i+6]}function ks(i,t){return t[i+7]}var gd,zr,xa,xd,Jy=Math.pow(2,32);function va(i){return"count"in i?1:1+va(i.left)+va(i.right)}function vd(i,t,e){return gd=new Float32Array(e),zr=new Uint32Array(e),xa=new Uint16Array(e),xd=new Uint8Array(e),uu(i,t)}function uu(i,t){let e=i/4,n=i/2,s="count"in t,r=t.boundingData;for(let o=0;o<6;o++)gd[e+o]=r[o];if(s)if(t.buffer){let o=t.buffer;xd.set(new Uint8Array(o),i);for(let a=i,c=i+o.byteLength;a<c;a+=32){let l=a/2;me(l,xa)||(zr[a/4+6]+=e)}return i+o.byteLength}else{let o=t.offset,a=t.count;return zr[e+6]=o,xa[n+14]=a,xa[n+15]=65535,i+32}else{let o=t.left,a=t.right,c=t.splitAxis,l;if(l=uu(i+32,o),l/4>Jy)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return zr[e+6]=l/4,l=uu(l,a),zr[e+7]=c,l}}function Ky(i,t){let e=(i.index?i.index.count:i.attributes.position.count)/3,n=e>2**16,s=n?4:2,r=t?new SharedArrayBuffer(e*s):new ArrayBuffer(e*s),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function jy(i,t,e,n,s){let{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:h}=s,f=i._indirectBuffer,u=i.geometry,p=u.index?u.index.array:null,g=h?md:pd,x=Vn(u),d=new Float32Array(6),m=!1,_=new zs;return ma(t,e,n,_.boundingData,d),y(_,e,n,d),_;function v(S){l&&l(S/x)}function y(S,T,M,I=null,b=0){if(!m&&b>=r&&(m=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(u))),M<=a||b>=r)return v(T+M),S.offset=T,S.count=M,S;let w=dd(S.boundingData,I,t,T,M,c);if(w.axis===-1)return v(T+M),S.offset=T,S.count=M,S;let L=g(f,p,t,T,M,w);if(L===T||L===T+M)v(T+M),S.offset=T,S.count=M;else{S.splitAxis=w.axis;let D=new zs,B=T,C=L-T;S.left=D,ma(t,B,C,D.boundingData,d),y(D,B,C,d,b+1);let N=new zs,O=L,W=M-C;S.right=N,ma(t,O,W,N.boundingData,d),y(N,O,W,d,b+1)}return S}}function _d(i,t){let e=i.geometry;t.indirect&&(i._indirectBuffer=Ky(e,t.useSharedArrayBuffer),cd(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),i._indirectBuffer||ad(e,t);let n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=ld(e),r=t.indirect?ru(e,t.range):ou(e,t.range);i._roots=r.map(o=>{let a=jy(i,s,o.offset,o.count,t),c=va(a),l=new n(32*c);return vd(0,a,l),l})}var cn=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,s=-1/0;for(let r=0,o=t.length;r<o;r++){let c=t[r][e];n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}setFromPoints(t,e){let n=1/0,s=-1/0;for(let r=0,o=e.length;r<o;r++){let a=e[r],c=t.dot(a);n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}isSeparated(t){return this.min>t.max||t.min>this.max}};cn.prototype.setFromBox=(function(){let i=new P;return function(e,n){let s=n.min,r=n.max,o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let h=0;h<=1;h++){i.x=s.x*c+r.x*(1-c),i.y=s.y*l+r.y*(1-l),i.z=s.z*h+r.z*(1-h);let f=e.dot(i);o=Math.min(f,o),a=Math.max(f,a)}this.min=o,this.max=a}})();var QM=(function(){let i=new cn;return function(e,n){let s=e.points,r=e.satAxes,o=e.satBounds,a=n.points,c=n.satAxes,l=n.satBounds;for(let h=0;h<3;h++){let f=o[h],u=r[h];if(i.setFromPoints(u,a),f.isSeparated(i))return!1}for(let h=0;h<3;h++){let f=l[h],u=c[h];if(i.setFromPoints(u,s),f.isSeparated(i))return!1}}})();var Qy=(function(){let i=new P,t=new P,e=new P;return function(s,r,o){let a=s.start,c=i,l=r.start,h=t;e.subVectors(a,l),i.subVectors(s.end,s.start),t.subVectors(r.end,r.start);let f=e.dot(h),u=h.dot(c),p=h.dot(h),g=e.dot(c),d=c.dot(c)*p-u*u,m,_;d!==0?m=(f*u-g*p)/d:m=0,_=(f+m*u)/p,o.x=m,o.y=_}})(),kr=(function(){let i=new Y,t=new P,e=new P;return function(s,r,o,a){Qy(s,r,i);let c=i.x,l=i.y;if(c>=0&&c<=1&&l>=0&&l<=1){s.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let h;c<0?h=s.start:h=s.end;let f;l<0?f=r.start:f=r.end;let u=t,p=e;if(s.closestPointToPoint(f,!0,t),r.closestPointToPoint(h,!0,e),u.distanceToSquared(f)<=p.distanceToSquared(h)){o.copy(u),a.copy(f);return}else{o.copy(h),a.copy(p);return}}}})(),yd=(function(){let i=new P,t=new P,e=new pn,n=new an;return function(r,o){let{radius:a,center:c}=r,{a:l,b:h,c:f}=o;if(n.start=l,n.end=h,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a||(n.start=l,n.end=f,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a)||(n.start=h,n.end=f,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a))return!0;let x=o.getPlane(e);if(Math.abs(x.distanceToPoint(c))<=a){let m=x.projectPoint(c,t);if(o.containsPoint(m))return!0}return!1}})();var tb=1e-15;function hu(i){return Math.abs(i)<tb}var Ye=class extends mn{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new P),this.satBounds=new Array(4).fill().map(()=>new cn),this.points=[this.a,this.b,this.c],this.sphere=new ti,this.plane=new pn,this.needsUpdate=!0}intersectsSphere(t){return yd(t,this)}update(){let t=this.a,e=this.b,n=this.c,s=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,s);let l=r[1],h=o[1];l.subVectors(t,e),h.setFromPoints(l,s);let f=r[2],u=o[2];f.subVectors(e,n),u.setFromPoints(f,s);let p=r[3],g=o[3];p.subVectors(n,t),g.setFromPoints(p,s),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}};Ye.prototype.closestPointToSegment=(function(){let i=new P,t=new P,e=new an;return function(s,r=null,o=null){let{start:a,end:c}=s,l=this.points,h,f=1/0;for(let u=0;u<3;u++){let p=(u+1)%3;e.start.copy(l[u]),e.end.copy(l[p]),kr(e,s,i,t),h=i.distanceToSquared(t),h<f&&(f=h,r&&r.copy(i),o&&o.copy(t))}return this.closestPointToPoint(a,i),h=a.distanceToSquared(i),h<f&&(f=h,r&&r.copy(i),o&&o.copy(a)),this.closestPointToPoint(c,i),h=c.distanceToSquared(i),h<f&&(f=h,r&&r.copy(i),o&&o.copy(c)),Math.sqrt(f)}})();Ye.prototype.intersectsTriangle=(function(){let i=new Ye,t=new Array(3),e=new Array(3),n=new cn,s=new cn,r=new P,o=new P,a=new P,c=new P,l=new P,h=new an,f=new an,u=new an,p=new P;function g(x,d,m){let _=x.points,v=0,y=-1;for(let S=0;S<3;S++){let{start:T,end:M}=h;T.copy(_[S]),M.copy(_[(S+1)%3]),h.delta(o);let I=hu(d.distanceToPoint(T));if(hu(d.normal.dot(o))&&I){m.copy(h),v=2;break}let b=d.intersectLine(h,p);if(!b&&I&&p.copy(T),(b||I)&&!hu(p.distanceTo(M))){if(v<=1)(v===1?m.start:m.end).copy(p),I&&(y=v);else if(v>=2){(y===1?m.start:m.end).copy(p),v=2;break}if(v++,v===2&&y===-1)break}}return v}return function(d,m=null,_=!1){this.needsUpdate&&this.update(),d.isExtendedTriangle?d.needsUpdate&&d.update():(i.copy(d),i.update(),d=i);let v=this.plane,y=d.plane;if(Math.abs(v.normal.dot(y.normal))>1-1e-10){let S=this.satBounds,T=this.satAxes;e[0]=d.a,e[1]=d.b,e[2]=d.c;for(let b=0;b<4;b++){let w=S[b],L=T[b];if(n.setFromPoints(L,e),w.isSeparated(n))return!1}let M=d.satBounds,I=d.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let b=0;b<4;b++){let w=M[b],L=I[b];if(n.setFromPoints(L,t),w.isSeparated(n))return!1}for(let b=0;b<4;b++){let w=T[b];for(let L=0;L<4;L++){let D=I[L];if(r.crossVectors(w,D),n.setFromPoints(r,t),s.setFromPoints(r,e),n.isSeparated(s))return!1}}return m&&(_||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{let S=g(this,y,f);if(S===1&&d.containsPoint(f.end))return m&&(m.start.copy(f.end),m.end.copy(f.end)),!0;if(S!==2)return!1;let T=g(d,v,u);if(T===1&&this.containsPoint(u.end))return m&&(m.start.copy(u.end),m.end.copy(u.end)),!0;if(T!==2)return!1;if(f.delta(a),u.delta(c),a.dot(c)<0){let B=u.start;u.start=u.end,u.end=B}let M=f.start.dot(a),I=f.end.dot(a),b=u.start.dot(a),w=u.end.dot(a),L=I<b,D=M<w;return M!==w&&b!==I&&L===D?!1:(m&&(l.subVectors(f.start,u.start),l.dot(a)>0?m.start.copy(f.start):m.start.copy(u.start),l.subVectors(f.end,u.end),l.dot(a)<0?m.end.copy(f.end):m.end.copy(u.end)),!0)}}})();Ye.prototype.distanceToPoint=(function(){let i=new P;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Ye.prototype.distanceToTriangle=(function(){let i=new P,t=new P,e=["a","b","c"],n=new an,s=new an;return function(o,a=null,c=null){let l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let h=1/0;for(let f=0;f<3;f++){let u,p=e[f],g=o[p];this.closestPointToPoint(g,i),u=g.distanceToSquared(i),u<h&&(h=u,a&&a.copy(i),c&&c.copy(g));let x=this[p];o.closestPointToPoint(x,i),u=x.distanceToSquared(i),u<h&&(h=u,a&&a.copy(x),c&&c.copy(i))}for(let f=0;f<3;f++){let u=e[f],p=e[(f+1)%3];n.set(this[u],this[p]);for(let g=0;g<3;g++){let x=e[g],d=e[(g+1)%3];s.set(o[x],o[d]),kr(n,s,i,t);let m=i.distanceToSquared(t);m<h&&(h=m,a&&a.copy(i),c&&c.copy(t))}}return Math.sqrt(h)}})();var Re=class{constructor(t,e,n){this.isOrientedBox=!0,this.min=new P,this.max=new P,this.matrix=new Et,this.invMatrix=new Et,this.points=new Array(8).fill().map(()=>new P),this.satAxes=new Array(3).fill().map(()=>new P),this.satBounds=new Array(3).fill().map(()=>new cn),this.alignedSatBounds=new Array(3).fill().map(()=>new cn),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}};Re.prototype.update=(function(){return function(){let t=this.matrix,e=this.min,n=this.max,s=this.points;for(let l=0;l<=1;l++)for(let h=0;h<=1;h++)for(let f=0;f<=1;f++){let u=1*l|2*h|4*f,p=s[u];p.x=l?n.x:e.x,p.y=h?n.y:e.y,p.z=f?n.z:e.z,p.applyMatrix4(t)}let r=this.satBounds,o=this.satAxes,a=s[0];for(let l=0;l<3;l++){let h=o[l],f=r[l],u=1<<l,p=s[u];h.subVectors(a,p),f.setFromPoints(h,s)}let c=this.alignedSatBounds;c[0].setFromPointsField(s,"x"),c[1].setFromPointsField(s,"y"),c[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Re.prototype.intersectsBox=(function(){let i=new cn;return function(e){this.needsUpdate&&this.update();let n=e.min,s=e.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,a[0].isSeparated(i)||(i.min=n.y,i.max=s.y,a[1].isSeparated(i))||(i.min=n.z,i.max=s.z,a[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){let l=o[c],h=r[c];if(i.setFromBox(l,e),h.isSeparated(i))return!1}return!0}})();Re.prototype.intersectsTriangle=(function(){let i=new Ye,t=new Array(3),e=new cn,n=new cn,s=new P;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(i.copy(o),i.update(),o=i);let a=this.satBounds,c=this.satAxes;t[0]=o.a,t[1]=o.b,t[2]=o.c;for(let u=0;u<3;u++){let p=a[u],g=c[u];if(e.setFromPoints(g,t),p.isSeparated(e))return!1}let l=o.satBounds,h=o.satAxes,f=this.points;for(let u=0;u<3;u++){let p=l[u],g=h[u];if(e.setFromPoints(g,f),p.isSeparated(e))return!1}for(let u=0;u<3;u++){let p=c[u];for(let g=0;g<4;g++){let x=h[g];if(s.crossVectors(p,x),e.setFromPoints(s,t),n.setFromPoints(s,f),e.isSeparated(n))return!1}}return!0}})();Re.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Re.prototype.distanceToPoint=(function(){let i=new P;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Re.prototype.distanceToBox=(function(){let i=["x","y","z"],t=new Array(12).fill().map(()=>new an),e=new Array(12).fill().map(()=>new an),n=new P,s=new P;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(s),this.closestPointToPoint(s,n),o.closestPointToPoint(n,s),c&&c.copy(n),l&&l.copy(s)),0;let h=a*a,f=o.min,u=o.max,p=this.points,g=1/0;for(let d=0;d<8;d++){let m=p[d];s.copy(m).clamp(f,u);let _=m.distanceToSquared(s);if(_<g&&(g=_,c&&c.copy(m),l&&l.copy(s),_<h))return Math.sqrt(_)}let x=0;for(let d=0;d<3;d++)for(let m=0;m<=1;m++)for(let _=0;_<=1;_++){let v=(d+1)%3,y=(d+2)%3,S=m<<v|_<<y,T=1<<d|m<<v|_<<y,M=p[S],I=p[T];t[x].set(M,I);let w=i[d],L=i[v],D=i[y],B=e[x],C=B.start,N=B.end;C[w]=f[w],C[L]=m?f[L]:u[L],C[D]=_?f[D]:u[L],N[w]=u[w],N[L]=m?f[L]:u[L],N[D]=_?f[D]:u[L],x++}for(let d=0;d<=1;d++)for(let m=0;m<=1;m++)for(let _=0;_<=1;_++){s.x=d?u.x:f.x,s.y=m?u.y:f.y,s.z=_?u.z:f.z,this.closestPointToPoint(s,n);let v=s.distanceToSquared(n);if(v<g&&(g=v,c&&c.copy(n),l&&l.copy(s),v<h))return Math.sqrt(v)}for(let d=0;d<12;d++){let m=t[d];for(let _=0;_<12;_++){let v=e[_];kr(m,v,n,s);let y=n.distanceToSquared(s);if(y<g&&(g=y,c&&c.copy(n),l&&l.copy(s),y<h))return Math.sqrt(y)}}return Math.sqrt(g)}})();var gi=class{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){let t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}};var fu=class extends gi{constructor(){super(()=>new Ye)}},sn=new fu;var du=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let t=[],e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}},ee=new du;var xi,Vs,Hs=[],ya=new gi(()=>new ve);function bd(i,t,e,n,s,r){xi=ya.getPrimitive(),Vs=ya.getPrimitive(),Hs.push(xi,Vs),ee.setBuffer(i._roots[t]);let o=pu(0,i.geometry,e,n,s,r);ee.clearBuffer(),ya.releasePrimitive(xi),ya.releasePrimitive(Vs),Hs.pop(),Hs.pop();let a=Hs.length;return a>0&&(Vs=Hs[a-1],xi=Hs[a-2]),o}function pu(i,t,e,n,s=null,r=0,o=0){let{float32Array:a,uint16Array:c,uint32Array:l}=ee,h=i*2;if(me(h,c)){let u=Me(i,l),p=Ae(h,c);return ce(i,a,xi),n(u,p,!1,o,r+i,xi)}else{let w=function(D){let{uint16Array:B,uint32Array:C}=ee,N=D*2;for(;!me(N,B);)D=Ge(D),N=D*2;return Me(D,C)},L=function(D){let{uint16Array:B,uint32Array:C}=ee,N=D*2;for(;!me(N,B);)D=Fe(D,C),N=D*2;return Me(D,C)+Ae(N,B)},u=Ge(i),p=Fe(i,l),g=u,x=p,d,m,_,v;if(s&&(_=xi,v=Vs,ce(g,a,_),ce(x,a,v),d=s(_),m=s(v),m<d)){g=p,x=u;let D=d;d=m,m=D,_=v}_||(_=xi,ce(g,a,_));let y=me(g*2,c),S=e(_,y,d,o+1,r+g),T;if(S===2){let D=w(g),C=L(g)-D;T=n(D,C,!0,o+1,r+g,_)}else T=S&&pu(g,t,e,n,s,r,o+1);if(T)return!0;v=Vs,ce(x,a,v);let M=me(x*2,c),I=e(v,M,m,o+1,r+x),b;if(I===2){let D=w(x),C=L(x)-D;b=n(D,C,!0,o+1,r+x,v)}else b=I&&pu(x,t,e,n,s,r,o+1);return!!b}}var Hr=new P,mu=new P;function Md(i,t,e={},n=0,s=1/0){let r=n*n,o=s*s,a=1/0,c=null;if(i.shapecast({boundsTraverseOrder:h=>(Hr.copy(t).clamp(h.min,h.max),Hr.distanceToSquared(t)),intersectsBounds:(h,f,u)=>u<a&&u<o,intersectsTriangle:(h,f)=>{h.closestPointToPoint(t,Hr);let u=t.distanceToSquared(Hr);return u<a&&(mu.copy(Hr),a=u,c=f),u<r}}),a===1/0)return null;let l=Math.sqrt(a);return e.point?e.point.copy(mu):e.point=mu.clone(),e.distance=l,e.faceIndex=c,e}var Gs=new P,Ws=new P,Xs=new P,Ma=new Y,Sa=new Y,wa=new Y,Sd=new P,wd=new P,Td=new P,Ta=new P;function nb(i,t,e,n,s,r,o,a){let c;if(r===Ee?c=i.intersectTriangle(n,e,t,!0,s):c=i.intersectTriangle(t,e,n,r!==Te,s),c===null)return null;let l=i.origin.distanceTo(s);return l<o||l>a?null:{distance:l,point:s.clone()}}function ib(i,t,e,n,s,r,o,a,c,l,h){Gs.fromBufferAttribute(t,r),Ws.fromBufferAttribute(t,o),Xs.fromBufferAttribute(t,a);let f=nb(i,Gs,Ws,Xs,Ta,c,l,h);if(f){n&&(Ma.fromBufferAttribute(n,r),Sa.fromBufferAttribute(n,o),wa.fromBufferAttribute(n,a),f.uv=mn.getInterpolation(Ta,Gs,Ws,Xs,Ma,Sa,wa,new Y)),s&&(Ma.fromBufferAttribute(s,r),Sa.fromBufferAttribute(s,o),wa.fromBufferAttribute(s,a),f.uv1=mn.getInterpolation(Ta,Gs,Ws,Xs,Ma,Sa,wa,new Y)),e&&(Sd.fromBufferAttribute(e,r),wd.fromBufferAttribute(e,o),Td.fromBufferAttribute(e,a),f.normal=mn.getInterpolation(Ta,Gs,Ws,Xs,Sd,wd,Td,new P),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let u={a:r,b:o,c:a,normal:new P,materialIndex:0};mn.getNormal(Gs,Ws,Xs,u.normal),f.face=u,f.faceIndex=r}return f}function qs(i,t,e,n,s,r,o){let a=n*3,c=a+0,l=a+1,h=a+2,f=i.index;i.index&&(c=f.getX(c),l=f.getX(l),h=f.getX(h));let{position:u,normal:p,uv:g,uv1:x}=i.attributes,d=ib(e,u,p,g,x,c,l,h,t,r,o);return d?(d.faceIndex=n,s&&s.push(d),d):null}function le(i,t,e,n){let s=i.a,r=i.b,o=i.c,a=t,c=t+1,l=t+2;e&&(a=e.getX(a),c=e.getX(c),l=e.getX(l)),s.x=n.getX(a),s.y=n.getY(a),s.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}function Ed(i,t,e,n,s,r,o,a){let{geometry:c,_indirectBuffer:l}=i;for(let h=n,f=n+s;h<f;h++)qs(c,t,e,h,r,o,a)}function Ad(i,t,e,n,s,r,o){let{geometry:a,_indirectBuffer:c}=i,l=1/0,h=null;for(let f=n,u=n+s;f<u;f++){let p;p=qs(a,t,e,f,null,r,o),p&&p.distance<l&&(h=p,l=p.distance)}return h}function Rd(i,t,e,n,s,r,o){let{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let h=i,f=t+i;h<f;h++){let u;if(u=h,le(o,u*3,c,l),o.needsUpdate=!0,n(o,u,s,r))return!0}return!1}function Cd(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));let e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position,r,o,a,c,l=0,h=i._roots;for(let u=0,p=h.length;u<p;u++)r=h[u],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),f(0,l),l+=r.byteLength;function f(u,p,g=!1){let x=u*2;if(a[x+15]===65535){let m=o[u+6],_=a[x+14],v=1/0,y=1/0,S=1/0,T=-1/0,M=-1/0,I=-1/0;for(let b=3*m,w=3*(m+_);b<w;b++){let L=n[b],D=s.getX(L),B=s.getY(L),C=s.getZ(L);D<v&&(v=D),D>T&&(T=D),B<y&&(y=B),B>M&&(M=B),C<S&&(S=C),C>I&&(I=C)}return c[u+0]!==v||c[u+1]!==y||c[u+2]!==S||c[u+3]!==T||c[u+4]!==M||c[u+5]!==I?(c[u+0]=v,c[u+1]=y,c[u+2]=S,c[u+3]=T,c[u+4]=M,c[u+5]=I,!0):!1}else{let m=u+8,_=o[u+6],v=m+p,y=_+p,S=g,T=!1,M=!1;t?S||(T=t.has(v),M=t.has(y),S=!T&&!M):(T=!0,M=!0);let I=S||T,b=S||M,w=!1;I&&(w=f(m,p,S));let L=!1;b&&(L=f(_,p,S));let D=w||L;if(D)for(let B=0;B<3;B++){let C=m+B,N=_+B,O=c[C],W=c[C+3],Z=c[N],q=c[N+3];c[u+B]=O<Z?O:Z,c[u+B+3]=W>q?W:q}return D}}}function En(i,t,e,n,s){let r,o,a,c,l,h,f=1/e.direction.x,u=1/e.direction.y,p=1/e.direction.z,g=e.origin.x,x=e.origin.y,d=e.origin.z,m=t[i],_=t[i+3],v=t[i+1],y=t[i+3+1],S=t[i+2],T=t[i+3+2];return f>=0?(r=(m-g)*f,o=(_-g)*f):(r=(_-g)*f,o=(m-g)*f),u>=0?(a=(v-x)*u,c=(y-x)*u):(a=(y-x)*u,c=(v-x)*u),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),p>=0?(l=(S-d)*p,h=(T-d)*p):(l=(T-d)*p,h=(S-d)*p),r>h||l>o)?!1:((l>r||r!==r)&&(r=l),(h<o||o!==o)&&(o=h),r<=s&&o>=n)}function Pd(i,t,e,n,s,r,o,a){let{geometry:c,_indirectBuffer:l}=i;for(let h=n,f=n+s;h<f;h++){let u=l?l[h]:h;qs(c,t,e,u,r,o,a)}}function Id(i,t,e,n,s,r,o){let{geometry:a,_indirectBuffer:c}=i,l=1/0,h=null;for(let f=n,u=n+s;f<u;f++){let p;p=qs(a,t,e,c?c[f]:f,null,r,o),p&&p.distance<l&&(h=p,l=p.distance)}return h}function Ld(i,t,e,n,s,r,o){let{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let h=i,f=t+i;h<f;h++){let u;if(u=e.resolveTriangleIndex(h),le(o,u*3,c,l),o.needsUpdate=!0,n(o,u,s,r))return!0}return!1}function Dd(i,t,e,n,s,r,o){ee.setBuffer(i._roots[t]),gu(0,i,e,n,s,r,o),ee.clearBuffer()}function gu(i,t,e,n,s,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=ee,h=i*2;if(me(h,c)){let u=Me(i,l),p=Ae(h,c);Ed(t,e,n,u,p,s,r,o)}else{let u=Ge(i);En(u,a,n,r,o)&&gu(u,t,e,n,s,r,o);let p=Fe(i,l);En(p,a,n,r,o)&&gu(p,t,e,n,s,r,o)}}var sb=["x","y","z"];function Fd(i,t,e,n,s,r){ee.setBuffer(i._roots[t]);let o=xu(0,i,e,n,s,r);return ee.clearBuffer(),o}function xu(i,t,e,n,s,r){let{float32Array:o,uint16Array:a,uint32Array:c}=ee,l=i*2;if(me(l,a)){let f=Me(i,c),u=Ae(l,a);return Ad(t,e,n,f,u,s,r)}else{let f=ks(i,c),u=sb[f],g=n.direction[u]>=0,x,d;g?(x=Ge(i),d=Fe(i,c)):(x=Fe(i,c),d=Ge(i));let _=En(x,o,n,s,r)?xu(x,t,e,n,s,r):null;if(_){let S=_.point[u];if(g?S<=o[d+f]:S>=o[d+f+3])return _}let y=En(d,o,n,s,r)?xu(d,t,e,n,s,r):null;return _&&y?_.distance<=y.distance?_:y:_||y||null}}var Ea=new ve,Ys=new Ye,Zs=new Ye,Vr=new Et,Nd=new Re,Aa=new Re;function Ud(i,t,e,n){ee.setBuffer(i._roots[t]);let s=vu(0,i,e,n);return ee.clearBuffer(),s}function vu(i,t,e,n,s=null){let{float32Array:r,uint16Array:o,uint32Array:a}=ee,c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Nd.set(e.boundingBox.min,e.boundingBox.max,n),s=Nd),me(c,o)){let h=t.geometry,f=h.index,u=h.attributes.position,p=e.index,g=e.attributes.position,x=Me(i,a),d=Ae(c,o);if(Vr.copy(n).invert(),e.boundsTree)return ce(i,r,Aa),Aa.matrix.copy(Vr),Aa.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:_=>Aa.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let v=x*3,y=(d+x)*3;v<y;v+=3)if(le(Zs,v,f,u),Zs.needsUpdate=!0,_.intersectsTriangle(Zs))return!0;return!1}});for(let m=x*3,_=(d+x)*3;m<_;m+=3){le(Ys,m,f,u),Ys.a.applyMatrix4(Vr),Ys.b.applyMatrix4(Vr),Ys.c.applyMatrix4(Vr),Ys.needsUpdate=!0;for(let v=0,y=p.count;v<y;v+=3)if(le(Zs,v,p,g),Zs.needsUpdate=!0,Ys.intersectsTriangle(Zs))return!0}}else{let h=i+8,f=a[i+6];return ce(h,r,Ea),!!(s.intersectsBox(Ea)&&vu(h,t,e,n,s)||(ce(f,r,Ea),s.intersectsBox(Ea)&&vu(f,t,e,n,s)))}}var Ra=new Et,_u=new Re,Gr=new Re,rb=new P,ob=new P,ab=new P,cb=new P;function Bd(i,t,e,n={},s={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),_u.set(t.boundingBox.min,t.boundingBox.max,e),_u.needsUpdate=!0;let a=i.geometry,c=a.attributes.position,l=a.index,h=t.attributes.position,f=t.index,u=sn.getPrimitive(),p=sn.getPrimitive(),g=rb,x=ob,d=null,m=null;s&&(d=ab,m=cb);let _=1/0,v=null,y=null;return Ra.copy(e).invert(),Gr.matrix.copy(Ra),i.shapecast({boundsTraverseOrder:S=>_u.distanceToBox(S),intersectsBounds:(S,T,M)=>M<_&&M<o?(T&&(Gr.min.copy(S.min),Gr.max.copy(S.max),Gr.needsUpdate=!0),!0):!1,intersectsRange:(S,T)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:I=>Gr.distanceToBox(I),intersectsBounds:(I,b,w)=>w<_&&w<o,intersectsRange:(I,b)=>{for(let w=I,L=I+b;w<L;w++){le(p,3*w,f,h),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let D=S,B=S+T;D<B;D++){le(u,3*D,l,c),u.needsUpdate=!0;let C=u.distanceToTriangle(p,g,d);if(C<_&&(x.copy(g),m&&m.copy(d),_=C,v=D,y=w),C<r)return!0}}}});{let M=Vn(t);for(let I=0,b=M;I<b;I++){le(p,3*I,f,h),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let w=S,L=S+T;w<L;w++){le(u,3*w,l,c),u.needsUpdate=!0;let D=u.distanceToTriangle(p,g,d);if(D<_&&(x.copy(g),m&&m.copy(d),_=D,v=w,y=I),D<r)return!0}}}}}),sn.releasePrimitive(u),sn.releasePrimitive(p),_===1/0?null:(n.point?n.point.copy(x):n.point=x.clone(),n.distance=_,n.faceIndex=v,s&&(s.point?s.point.copy(m):s.point=m.clone(),s.point.applyMatrix4(Ra),x.applyMatrix4(Ra),s.distance=x.sub(s.point).length(),s.faceIndex=y),n)}function Od(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));let e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position,r,o,a,c,l=0,h=i._roots;for(let u=0,p=h.length;u<p;u++)r=h[u],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),f(0,l),l+=r.byteLength;function f(u,p,g=!1){let x=u*2;if(a[x+15]===65535){let m=o[u+6],_=a[x+14],v=1/0,y=1/0,S=1/0,T=-1/0,M=-1/0,I=-1/0;for(let b=m,w=m+_;b<w;b++){let L=3*i.resolveTriangleIndex(b);for(let D=0;D<3;D++){let B=L+D;B=n?n[B]:B;let C=s.getX(B),N=s.getY(B),O=s.getZ(B);C<v&&(v=C),C>T&&(T=C),N<y&&(y=N),N>M&&(M=N),O<S&&(S=O),O>I&&(I=O)}}return c[u+0]!==v||c[u+1]!==y||c[u+2]!==S||c[u+3]!==T||c[u+4]!==M||c[u+5]!==I?(c[u+0]=v,c[u+1]=y,c[u+2]=S,c[u+3]=T,c[u+4]=M,c[u+5]=I,!0):!1}else{let m=u+8,_=o[u+6],v=m+p,y=_+p,S=g,T=!1,M=!1;t?S||(T=t.has(v),M=t.has(y),S=!T&&!M):(T=!0,M=!0);let I=S||T,b=S||M,w=!1;I&&(w=f(m,p,S));let L=!1;b&&(L=f(_,p,S));let D=w||L;if(D)for(let B=0;B<3;B++){let C=m+B,N=_+B,O=c[C],W=c[C+3],Z=c[N],q=c[N+3];c[u+B]=O<Z?O:Z,c[u+B+3]=W>q?W:q}return D}}}function zd(i,t,e,n,s,r,o){ee.setBuffer(i._roots[t]),yu(0,i,e,n,s,r,o),ee.clearBuffer()}function yu(i,t,e,n,s,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=ee,h=i*2;if(me(h,c)){let u=Me(i,l),p=Ae(h,c);Pd(t,e,n,u,p,s,r,o)}else{let u=Ge(i);En(u,a,n,r,o)&&yu(u,t,e,n,s,r,o);let p=Fe(i,l);En(p,a,n,r,o)&&yu(p,t,e,n,s,r,o)}}var lb=["x","y","z"];function kd(i,t,e,n,s,r){ee.setBuffer(i._roots[t]);let o=bu(0,i,e,n,s,r);return ee.clearBuffer(),o}function bu(i,t,e,n,s,r){let{float32Array:o,uint16Array:a,uint32Array:c}=ee,l=i*2;if(me(l,a)){let f=Me(i,c),u=Ae(l,a);return Id(t,e,n,f,u,s,r)}else{let f=ks(i,c),u=lb[f],g=n.direction[u]>=0,x,d;g?(x=Ge(i),d=Fe(i,c)):(x=Fe(i,c),d=Ge(i));let _=En(x,o,n,s,r)?bu(x,t,e,n,s,r):null;if(_){let S=_.point[u];if(g?S<=o[d+f]:S>=o[d+f+3])return _}let y=En(d,o,n,s,r)?bu(d,t,e,n,s,r):null;return _&&y?_.distance<=y.distance?_:y:_||y||null}}var Ca=new ve,$s=new Ye,Js=new Ye,Wr=new Et,Hd=new Re,Pa=new Re;function Vd(i,t,e,n){ee.setBuffer(i._roots[t]);let s=Mu(0,i,e,n);return ee.clearBuffer(),s}function Mu(i,t,e,n,s=null){let{float32Array:r,uint16Array:o,uint32Array:a}=ee,c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Hd.set(e.boundingBox.min,e.boundingBox.max,n),s=Hd),me(c,o)){let h=t.geometry,f=h.index,u=h.attributes.position,p=e.index,g=e.attributes.position,x=Me(i,a),d=Ae(c,o);if(Wr.copy(n).invert(),e.boundsTree)return ce(i,r,Pa),Pa.matrix.copy(Wr),Pa.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:_=>Pa.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let v=x,y=d+x;v<y;v++)if(le(Js,3*t.resolveTriangleIndex(v),f,u),Js.needsUpdate=!0,_.intersectsTriangle(Js))return!0;return!1}});for(let m=x,_=d+x;m<_;m++){let v=t.resolveTriangleIndex(m);le($s,3*v,f,u),$s.a.applyMatrix4(Wr),$s.b.applyMatrix4(Wr),$s.c.applyMatrix4(Wr),$s.needsUpdate=!0;for(let y=0,S=p.count;y<S;y+=3)if(le(Js,y,p,g),Js.needsUpdate=!0,$s.intersectsTriangle(Js))return!0}}else{let h=i+8,f=a[i+6];return ce(h,r,Ca),!!(s.intersectsBox(Ca)&&Mu(h,t,e,n,s)||(ce(f,r,Ca),s.intersectsBox(Ca)&&Mu(f,t,e,n,s)))}}var Ia=new Et,Su=new Re,Xr=new Re,ub=new P,hb=new P,fb=new P,db=new P;function Gd(i,t,e,n={},s={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Su.set(t.boundingBox.min,t.boundingBox.max,e),Su.needsUpdate=!0;let a=i.geometry,c=a.attributes.position,l=a.index,h=t.attributes.position,f=t.index,u=sn.getPrimitive(),p=sn.getPrimitive(),g=ub,x=hb,d=null,m=null;s&&(d=fb,m=db);let _=1/0,v=null,y=null;return Ia.copy(e).invert(),Xr.matrix.copy(Ia),i.shapecast({boundsTraverseOrder:S=>Su.distanceToBox(S),intersectsBounds:(S,T,M)=>M<_&&M<o?(T&&(Xr.min.copy(S.min),Xr.max.copy(S.max),Xr.needsUpdate=!0),!0):!1,intersectsRange:(S,T)=>{if(t.boundsTree){let M=t.boundsTree;return M.shapecast({boundsTraverseOrder:I=>Xr.distanceToBox(I),intersectsBounds:(I,b,w)=>w<_&&w<o,intersectsRange:(I,b)=>{for(let w=I,L=I+b;w<L;w++){let D=M.resolveTriangleIndex(w);le(p,3*D,f,h),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let B=S,C=S+T;B<C;B++){let N=i.resolveTriangleIndex(B);le(u,3*N,l,c),u.needsUpdate=!0;let O=u.distanceToTriangle(p,g,d);if(O<_&&(x.copy(g),m&&m.copy(d),_=O,v=B,y=w),O<r)return!0}}}})}else{let M=Vn(t);for(let I=0,b=M;I<b;I++){le(p,3*I,f,h),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let w=S,L=S+T;w<L;w++){let D=i.resolveTriangleIndex(w);le(u,3*D,l,c),u.needsUpdate=!0;let B=u.distanceToTriangle(p,g,d);if(B<_&&(x.copy(g),m&&m.copy(d),_=B,v=w,y=I),B<r)return!0}}}}}),sn.releasePrimitive(u),sn.releasePrimitive(p),_===1/0?null:(n.point?n.point.copy(x):n.point=x.clone(),n.distance=_,n.faceIndex=v,s&&(s.point?s.point.copy(m):s.point=m.clone(),s.point.applyMatrix4(Ia),x.applyMatrix4(Ia),s.distance=x.sub(s.point).length(),s.faceIndex=y),n)}function Wd(){return typeof SharedArrayBuffer<"u"}var qr=new ee.constructor,La=new ee.constructor,vi=new gi(()=>new ve),Ks=new ve,js=new ve,wu=new ve,Tu=new ve,Eu=!1;function Xd(i,t,e,n){if(Eu)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Eu=!0;let s=i._roots,r=t._roots,o,a=0,c=0,l=new Et().copy(e).invert();for(let h=0,f=s.length;h<f;h++){qr.setBuffer(s[h]),c=0;let u=vi.getPrimitive();ce(0,qr.float32Array,u),u.applyMatrix4(l);for(let p=0,g=r.length;p<g&&(La.setBuffer(r[p]),o=Dn(0,0,e,l,n,a,c,0,0,u),La.clearBuffer(),c+=r[p].length,!o);p++);if(vi.releasePrimitive(u),qr.clearBuffer(),a+=s[h].length,o)break}return Eu=!1,o}function Dn(i,t,e,n,s,r=0,o=0,a=0,c=0,l=null,h=!1){let f,u;h?(f=La,u=qr):(f=qr,u=La);let p=f.float32Array,g=f.uint32Array,x=f.uint16Array,d=u.float32Array,m=u.uint32Array,_=u.uint16Array,v=i*2,y=t*2,S=me(v,x),T=me(y,_),M=!1;if(T&&S)h?M=s(Me(t,m),Ae(t*2,_),Me(i,g),Ae(i*2,x),c,o+t,a,r+i):M=s(Me(i,g),Ae(i*2,x),Me(t,m),Ae(t*2,_),a,r+i,c,o+t);else if(T){let I=vi.getPrimitive();ce(t,d,I),I.applyMatrix4(e);let b=Ge(i),w=Fe(i,g);ce(b,p,Ks),ce(w,p,js);let L=I.intersectsBox(Ks),D=I.intersectsBox(js);M=L&&Dn(t,b,n,e,s,o,r,c,a+1,I,!h)||D&&Dn(t,w,n,e,s,o,r,c,a+1,I,!h),vi.releasePrimitive(I)}else{let I=Ge(t),b=Fe(t,m);ce(I,d,wu),ce(b,d,Tu);let w=l.intersectsBox(wu),L=l.intersectsBox(Tu);if(w&&L)M=Dn(i,I,e,n,s,r,o,a,c+1,l,h)||Dn(i,b,e,n,s,r,o,a,c+1,l,h);else if(w)if(S)M=Dn(i,I,e,n,s,r,o,a,c+1,l,h);else{let D=vi.getPrimitive();D.copy(wu).applyMatrix4(e);let B=Ge(i),C=Fe(i,g);ce(B,p,Ks),ce(C,p,js);let N=D.intersectsBox(Ks),O=D.intersectsBox(js);M=N&&Dn(I,B,n,e,s,o,r,c,a+1,D,!h)||O&&Dn(I,C,n,e,s,o,r,c,a+1,D,!h),vi.releasePrimitive(D)}else if(L)if(S)M=Dn(i,b,e,n,s,r,o,a,c+1,l,h);else{let D=vi.getPrimitive();D.copy(Tu).applyMatrix4(e);let B=Ge(i),C=Fe(i,g);ce(B,p,Ks),ce(C,p,js);let N=D.intersectsBox(Ks),O=D.intersectsBox(js);M=N&&Dn(b,B,n,e,s,o,r,c,a+1,D,!h)||O&&Dn(b,C,n,e,s,o,r,c,a+1,D,!h),vi.releasePrimitive(D)}}return M}var Da=new Re,qd=new ve,pb={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},Yr=class i{static serialize(t,e={}){e={cloneBuffers:!0,...e};let n=t.geometry,s=t._roots,r=t._indirectBuffer,o=n.getIndex(),a;return e.cloneBuffers?a={roots:s.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:s,index:o?o.array:null,indirectBuffer:r},a}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};let{index:s,roots:r,indirectBuffer:o}=t,a=new i(e,{...n,[pa]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){let c=e.getIndex();if(c===null){let l=new Qt(t.index,1,!1);e.setIndex(l)}else c.array!==s&&(c.array.set(s),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...pb,[pa]:!1},e),e.useSharedArrayBuffer&&!Wd())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[pa]||(_d(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new ve))),this.resolveTriangleIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n}refit(t=null){return(this.indirect?Od:Cd)(this,t)}traverse(t,e=0){let n=this._roots[e],s=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){let l=a*2,h=r[l+15]===65535;if(h){let f=s[a+6],u=r[l+14];t(c,h,new Float32Array(n,a*4,6),f,u)}else{let f=a+32/4,u=s[a+6],p=s[a+7];t(c,h,new Float32Array(n,a*4,6),p)||(o(f,c+1),o(u,c+1))}}}raycast(t,e=xn,n=0,s=1/0){let r=this._roots,o=this.geometry,a=[],c=e.isMaterial,l=Array.isArray(e),h=o.groups,f=c?e.side:e,u=this.indirect?zd:Dd;for(let p=0,g=r.length;p<g;p++){let x=l?e[h[p].materialIndex].side:f,d=a.length;if(u(this,p,x,t,a,n,s),l){let m=h[p].materialIndex;for(let _=d,v=a.length;_<v;_++)a[_].face.materialIndex=m}}return a}raycastFirst(t,e=xn,n=0,s=1/0){let r=this._roots,o=this.geometry,a=e.isMaterial,c=Array.isArray(e),l=null,h=o.groups,f=a?e.side:e,u=this.indirect?kd:Fd;for(let p=0,g=r.length;p<g;p++){let x=c?e[h[p].materialIndex].side:f,d=u(this,p,x,t,n,s);d!=null&&(l==null||d.distance<l.distance)&&(l=d,c&&(d.face.materialIndex=h[p].materialIndex))}return l}intersectsGeometry(t,e){let n=!1,s=this._roots,r=this.indirect?Vd:Ud;for(let o=0,a=s.length;o<a&&(n=r(this,o,t,e),!n);o++);return n}shapecast(t){let e=sn.getPrimitive(),n=this.indirect?Ld:Rd,{boundsTraverseOrder:s,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=t;if(o&&a){let f=o;o=(u,p,g,x,d)=>f(u,p,g,x,d)?!0:n(u,p,this,a,g,x,e)}else o||(a?o=(f,u,p,g)=>n(f,u,this,a,p,g,e):o=(f,u,p)=>p);let c=!1,l=0,h=this._roots;for(let f=0,u=h.length;f<u;f++){let p=h[f];if(c=bd(this,f,r,o,s,l),c)break;l+=p.byteLength}return sn.releasePrimitive(e),c}bvhcast(t,e,n){let{intersectsRanges:s,intersectsTriangles:r}=n,o=sn.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{let x=this.resolveTriangleIndex(g);le(o,x*3,a,c)}:g=>{le(o,g*3,a,c)},h=sn.getPrimitive(),f=t.geometry.index,u=t.geometry.attributes.position,p=t.indirect?g=>{let x=t.resolveTriangleIndex(g);le(h,x*3,f,u)}:g=>{le(h,g*3,f,u)};if(r){let g=(x,d,m,_,v,y,S,T)=>{for(let M=m,I=m+_;M<I;M++){p(M),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let b=x,w=x+d;b<w;b++)if(l(b),o.needsUpdate=!0,r(o,h,b,M,v,y,S,T))return!0}return!1};if(s){let x=s;s=function(d,m,_,v,y,S,T,M){return x(d,m,_,v,y,S,T,M)?!0:g(d,m,_,v,y,S,T,M)}}else s=g}return Xd(this,t,e,s)}intersectsBox(t,e){return Da.set(t.min,t.max,e),Da.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Da.intersectsBox(n),intersectsTriangle:n=>Da.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},s={},r=0,o=1/0){return(this.indirect?Gd:Bd)(this,t,e,n,s,r,o)}closestPointToPoint(t,e={},n=0,s=1/0){return Md(this,t,e,n,s)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{ce(0,new Float32Array(n),qd),t.union(qd)}),t}};function mb(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function gb(i){switch(i){case 1:return di;case 2:return Ur;case 3:return Ht;case 4:return Ht}}function Yd(i){switch(i){case 1:return ca;case 2:return Fs;case 3:return Ns;case 4:return Ns}}var Fa=class extends be{constructor(){super(),this.minFilter=Pt,this.magFilter=Pt,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(t){let e=this.overrideItemSize,n=t.itemSize,s=t.count;if(e!==null){if(n*s%e!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");t.itemSize=e,t.count=s*n/e}let r=t.itemSize,o=t.count,a=t.normalized,c=t.array.constructor,l=c.BYTES_PER_ELEMENT,h=this._forcedType,f=r;if(h===null)switch(c){case Float32Array:h=Kt;break;case Uint8Array:case Uint16Array:case Uint32Array:h=en;break;case Int8Array:case Int16Array:case Int32Array:h=Ds;break}let u,p,g,x,d=mb(r);switch(h){case Kt:g=1,p=gb(r),a&&l===1?(x=c,d+="8",c===Uint8Array?u=gn:(u=aa,d+="_SNORM")):(x=Float32Array,d+="32F",u=Kt);break;case Ds:d+=l*8+"I",g=a?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,p=Yd(r),l===1?(x=Int8Array,u=aa):l===2?(x=Int16Array,u=Jl):(x=Int32Array,u=Ds);break;case en:d+=l*8+"UI",g=a?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,p=Yd(r),l===1?(x=Uint8Array,u=gn):l===2?(x=Uint16Array,u=Nr):(x=Uint32Array,u=en);break}f===3&&(p===Ht||p===Ns)&&(f=4);let m=Math.ceil(Math.sqrt(o))||1,_=f*m*m,v=new x(_),y=t.normalized;t.normalized=!1;for(let S=0;S<o;S++){let T=f*S;v[T]=t.getX(S)/g,r>=2&&(v[T+1]=t.getY(S)/g),r>=3&&(v[T+2]=t.getZ(S)/g,f===4&&(v[T+3]=1)),r>=4&&(v[T+3]=t.getW(S)/g)}t.normalized=y,this.internalFormat=d,this.format=p,this.type=u,this.image.width=m,this.image.height=m,this.image.data=v,this.needsUpdate=!0,this.dispose(),t.itemSize=n,t.count=s}},Qs=class extends Fa{constructor(){super(),this._forcedType=en}};var tr=class extends Fa{constructor(){super(),this._forcedType=Kt}};var Na=class{constructor(){this.index=new Qs,this.position=new tr,this.bvhBounds=new be,this.bvhContents=new be,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(t){let{geometry:e}=t;if(vb(t,this.bvhBounds,this.bvhContents),this.position.updateFrom(e.attributes.position),t.indirect){let n=t._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(e.index)this._cachedIndexAttr=e.index.clone();else{let s=su(iu(e));this._cachedIndexAttr=new Qt(s,1,!1)}xb(e,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(e.index)}dispose(){let{index:t,position:e,bvhBounds:n,bvhContents:s}=this;t&&t.dispose(),e&&e.dispose(),n&&n.dispose(),s&&s.dispose()}};function xb(i,t,e){let n=e.array,s=i.index?i.index.array:null;for(let r=0,o=t.length;r<o;r++){let a=3*r,c=3*t[r];for(let l=0;l<3;l++)n[a+l]=s?s[c+l]:c+l}}function vb(i,t,e){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let s=n[0],r=new Uint16Array(s),o=new Uint32Array(s),a=new Float32Array(s),c=s.byteLength/32,l=2*Math.ceil(Math.sqrt(c/2)),h=new Float32Array(4*l*l),f=Math.ceil(Math.sqrt(c)),u=new Uint32Array(2*f*f);for(let p=0;p<c;p++){let g=p*32/4,x=g*2,d=g;for(let m=0;m<3;m++)h[8*p+0+m]=a[d+0+m],h[8*p+4+m]=a[d+3+m];if(me(x,r)){let m=Ae(x,r),_=Me(g,o),v=4294901760|m;u[p*2+0]=v,u[p*2+1]=_}else{let m=4*Fe(g,o)/32,_=ks(g,o);u[p*2+0]=_,u[p*2+1]=m}}t.image.data=h,t.image.width=l,t.image.height=l,t.format=Ht,t.type=Kt,t.internalFormat="RGBA32F",t.minFilter=Pt,t.magFilter=Pt,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),e.image.data=u,e.image.width=f,e.image.height=f,e.format=Fs,e.type=en,e.internalFormat="RG32UI",e.minFilter=Pt,e.magFilter=Pt,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose()}var Wi={};rm(Wi,{bvh_distance_functions:()=>Zd,bvh_ray_functions:()=>Ru,bvh_struct_definitions:()=>$d,common_functions:()=>Au});var Au=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var Zd=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var Ru=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;var $d=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var ST=`
	${Au}
	${Ru}
`;function Ua(i,t,e=0){if(i.isInterleavedBufferAttribute){let n=i.itemSize;for(let s=0,r=i.count;s<r;s++){let o=s+e;t.setX(o,i.getX(s)),n>=2&&t.setY(o,i.getY(s)),n>=3&&t.setZ(o,i.getZ(s)),n>=4&&t.setW(o,i.getW(s))}}else{let n=t.array,s=n.constructor,r=n.BYTES_PER_ELEMENT*i.itemSize*e;new s(n.buffer,r,i.array.length).set(i.array)}}function Xi(i,t=null){let e=i.array.constructor,n=i.normalized,s=i.itemSize,r=t===null?i.count:t;return new Qt(new e(s*r),s,n)}function _i(i,t){if(!i&&!t)return!0;if(!!i!=!!t)return!1;let e=i.count===t.count,n=i.normalized===t.normalized,s=i.array.constructor===t.array.constructor,r=i.itemSize===t.itemSize;return!(!e||!n||!s||!r)}function _b(i){let t=i[0].index!==null,e=new Set(Object.keys(i[0].attributes));if(!i[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let n=0;n<i.length;++n){let s=i[n],r=0;if(t!==(s.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let o in s.attributes){if(!e.has(o))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+o+'" attribute exists among all geometries, or in none of them.');r++}if(r!==e.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function yb(i){let t=0;for(let e=0,n=i.length;e<n;e++)t+=i[e].getIndex().count;return t}function bb(i){let t=0;for(let e=0,n=i.length;e<n;e++)t+=i[e].getAttribute("position").count;return t}function Mb(i,t,e){i.index&&i.index.count!==t&&i.setIndex(null);let n=i.attributes;for(let s in n)n[s].count!==e&&i.deleteAttribute(s)}function Jd(i,t={},e=new oe){let{useGroups:n=!1,forceUpdate:s=!1,skipAssigningAttributes:r=[],overwriteIndex:o=!0}=t;_b(i);let a=i[0].index!==null,c=a?yb(i):-1,l=bb(i);if(Mb(e,c,l),n){let f=0;for(let u=0,p=i.length;u<p;u++){let g=i[u],x;a?x=g.getIndex().count:x=g.getAttribute("position").count,e.addGroup(f,x,u),f+=x}}if(a){let f=!1;if(e.index||(e.setIndex(new Qt(new Uint32Array(c),1,!1)),f=!0),f||o){let u=0,p=0,g=e.getIndex();for(let x=0,d=i.length;x<d;x++){let m=i[x],_=m.getIndex();if(!(!s&&!f&&r[x]))for(let y=0;y<_.count;++y)g.setX(u+y,_.getX(y)+p);u+=_.count,p+=m.getAttribute("position").count}}}let h=Object.keys(i[0].attributes);for(let f=0,u=h.length;f<u;f++){let p=!1,g=h[f];if(!e.getAttribute(g)){let m=i[0].getAttribute(g);e.setAttribute(g,Xi(m,l)),p=!0}let x=0,d=e.getAttribute(g);for(let m=0,_=i.length;m<_;m++){let v=i[m],y=!s&&!p&&r[m],S=v.getAttribute(g);y||Ua(S,d,x),x+=S.count}}}function Kd(i,t,e){let n=i.index,r=i.attributes.position.count,o=n?n.count:r,a=i.groups;a.length===0&&(a=[{count:o,start:0,materialIndex:0}]);let c=i.getAttribute("materialIndex");if(!c||c.count!==r){let h;e.length<=255?h=new Uint8Array(r):h=new Uint16Array(r),c=new Qt(h,1,!1),i.deleteAttribute("materialIndex"),i.setAttribute("materialIndex",c)}let l=c.array;for(let h=0;h<a.length;h++){let f=a[h],u=f.start,p=f.count,g=Math.min(p,o-u),x=Array.isArray(t)?t[f.materialIndex]:t,d=e.indexOf(x);for(let m=0;m<g;m++){let _=u+m;n&&(_=n.getX(_)),l[_]=d}}}function jd(i,t){if(!i.index){let e=i.attributes.position.count,n=new Array(e);for(let s=0;s<e;s++)n[s]=s;i.setIndex(n)}if(!i.attributes.normal&&t&&t.includes("normal")&&i.computeVertexNormals(),!i.attributes.uv&&t&&t.includes("uv")){let e=i.attributes.position.count;i.setAttribute("uv",new Qt(new Float32Array(e*2),2,!1))}if(!i.attributes.uv2&&t&&t.includes("uv2")){let e=i.attributes.position.count;i.setAttribute("uv2",new Qt(new Float32Array(e*2),2,!1))}if(!i.attributes.tangent&&t&&t.includes("tangent"))if(i.attributes.uv&&i.attributes.normal)i.computeTangents();else{let e=i.attributes.position.count;i.setAttribute("tangent",new Qt(new Float32Array(e*4),4,!1))}if(!i.attributes.color&&t&&t.includes("color")){let e=i.attributes.position.count,n=new Float32Array(e*4);n.fill(1),i.setAttribute("color",new Qt(n,4))}}function er(i){let t=0;if(i.byteLength!==0){let e=new Uint8Array(i);for(let n=0;n<i.byteLength;n++){let s=e[n];t=(t<<5)-t+s,t|=0}}return t}function Qd(i){let t=i.uuid,e=Object.values(i.attributes);i.index&&(e.push(i.index),t+=`index|${i.index.version}`);let n=Object.keys(e).sort();for(let s of n){let r=e[s];t+=`${s}_${r.version}|`}return t}function tp(i){let t=i.skeleton;return t?(t.boneTexture||t.computeBoneTexture(),`${er(t.boneTexture.image.data.buffer)}_${t.boneTexture.uuid}`):null}var Ba=class{constructor(t=null){this.matrixWorld=new Et,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,t!==null&&this.updateFrom(t)}updateFrom(t){let e=t.geometry,n=(e.index?e.index.count:e.attributes.position.count)/3;this.matrixWorld.copy(t.matrixWorld),this.geometryHash=Qd(e),this.primitiveCount=n,this.skeletonHash=tp(t)}didChange(t){let e=t.geometry,n=(e.index?e.index.count:e.attributes.position.count)/3;return!(this.matrixWorld.equals(t.matrixWorld)&&this.geometryHash===Qd(e)&&this.skeletonHash===tp(t)&&this.primitiveCount===n)}};var qi=new P,Yi=new P,Zi=new P,ep=new ne,Oa=new P,Cu=new P,np=new ne,ip=new ne,za=new Et,sp=new Et;function rp(i,t,e){let n=i.skeleton,s=i.geometry,r=n.bones,o=n.boneInverses;np.fromBufferAttribute(s.attributes.skinIndex,t),ip.fromBufferAttribute(s.attributes.skinWeight,t),za.elements.fill(0);for(let a=0;a<4;a++){let c=ip.getComponent(a);if(c!==0){let l=np.getComponent(a);sp.multiplyMatrices(r[l].matrixWorld,o[l]),Sb(za,sp,c)}}return za.multiply(i.bindMatrix).premultiply(i.bindMatrixInverse),e.transformDirection(za),e}function Pu(i,t,e,n,s){Oa.set(0,0,0);for(let r=0,o=i.length;r<o;r++){let a=t[r],c=i[r];a!==0&&(Cu.fromBufferAttribute(c,n),e?Oa.addScaledVector(Cu,a):Oa.addScaledVector(Cu.sub(s),a))}s.add(Oa)}function Sb(i,t,e){let n=i.elements,s=t.elements;for(let r=0,o=s.length;r<o;r++)n[r]+=s[r]*e}function wb(i){let{index:t,attributes:e}=i;if(t)for(let n=0,s=t.count;n<s;n+=3){let r=t.getX(n),o=t.getX(n+2);t.setX(n,o),t.setX(n+2,r)}else for(let n in e){let s=e[n],r=s.itemSize;for(let o=0,a=s.count;o<a;o+=3)for(let c=0;c<r;c++){let l=s.getComponent(o,c),h=s.getComponent(o+2,c);s.setComponent(o,c,h),s.setComponent(o+2,c,l)}}return i}function op(i,t={},e=new oe){t={applyWorldTransforms:!0,attributes:[],...t};let n=i.geometry,s=t.applyWorldTransforms,r=t.attributes.includes("normal"),o=t.attributes.includes("tangent"),a=n.attributes,c=e.attributes;for(let _ in e.attributes)(!t.attributes.includes(_)||!(_ in n.attributes))&&e.deleteAttribute(_);!e.index&&n.index&&(e.index=n.index.clone()),c.position||e.setAttribute("position",Xi(a.position)),r&&!c.normal&&a.normal&&e.setAttribute("normal",Xi(a.normal)),o&&!c.tangent&&a.tangent&&e.setAttribute("tangent",Xi(a.tangent)),_i(n.index,e.index),_i(a.position,c.position),r&&_i(a.normal,c.normal),o&&_i(a.tangent,c.tangent);let l=a.position,h=r?a.normal:null,f=o?a.tangent:null,u=n.morphAttributes.position,p=n.morphAttributes.normal,g=n.morphAttributes.tangent,x=n.morphTargetsRelative,d=i.morphTargetInfluences,m=new qt;m.getNormalMatrix(i.matrixWorld),n.index&&e.index.array.set(n.index.array);for(let _=0,v=a.position.count;_<v;_++)qi.fromBufferAttribute(l,_),h&&Yi.fromBufferAttribute(h,_),f&&(ep.fromBufferAttribute(f,_),Zi.fromBufferAttribute(f,_)),d&&(u&&Pu(u,d,x,_,qi),p&&Pu(p,d,x,_,Yi),g&&Pu(g,d,x,_,Zi)),i.isSkinnedMesh&&(i.applyBoneTransform(_,qi),h&&rp(i,_,Yi),f&&rp(i,_,Zi)),s&&qi.applyMatrix4(i.matrixWorld),c.position.setXYZ(_,qi.x,qi.y,qi.z),h&&(s&&Yi.applyNormalMatrix(m),c.normal.setXYZ(_,Yi.x,Yi.y,Yi.z)),f&&(s&&Zi.transformDirection(i.matrixWorld),c.tangent.setXYZW(_,Zi.x,Zi.y,Zi.z,ep.w));for(let _ in t.attributes){let v=t.attributes[_];v==="position"||v==="tangent"||v==="normal"||!(v in a)||(c[v]||e.setAttribute(v,Xi(a[v])),_i(a[v],c[v]),Ua(a[v],c[v]))}return i.matrixWorld.determinant()<0&&wb(e),e}var ka=class extends oe{constructor(){super(),this.version=0,this.hash=null,this._diff=new Ba}isCompatible(t,e){let n=t.geometry;for(let s=0;s<e.length;s++){let r=e[s],o=n.attributes[r],a=this.attributes[r];if(o&&!_i(o,a))return!1}return!0}updateFrom(t,e){let n=this._diff;return n.didChange(t)?(op(t,e,this),n.updateFrom(t),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}};var Va=0,Iu=1,Lu=2;function Tb(i,t){for(let e=0,n=i.length;e<n;e++)i[e].traverseVisible(r=>{r.isMesh&&t(r)})}function Eb(i){let t=[];for(let e=0,n=i.length;e<n;e++){let s=i[e];Array.isArray(s.material)?t.push(...s.material):t.push(s.material)}return t}function Ab(i,t,e){if(i.length===0){t.setIndex(null);let n=t.attributes;for(let s in n)t.deleteAttribute(s);for(let s in e.attributes)t.setAttribute(e.attributes[s],new Qt(new Float32Array(0),4,!1))}else Jd(i,e,t);for(let n in t.attributes)t.attributes[n].needsUpdate=!0}var Ha=class{constructor(t){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(t||[])}_getDummyMesh(){if(!this._dummyMesh){let t=new Hn,e=new oe;e.setAttribute("position",new Qt(new Float32Array(9),3)),this._dummyMesh=new St(e,t)}return this._dummyMesh}_getMeshes(){let t=[];return Tb(this.objects,e=>{t.push(e)}),t.sort((e,n)=>e.uuid>n.uuid?1:e.uuid<n.uuid?-1:0),t.length===0&&t.push(this._getDummyMesh()),t}_updateIntermediateGeometries(){let{_intermediateGeometry:t}=this,e=this._getMeshes(),n=new Set(t.keys()),s={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let r=0,o=e.length;r<o;r++){let a=e[r],c=a.uuid;n.delete(c);let l=t.get(c);(!l||!l.isCompatible(a,this.attributes))&&(l&&l.dispose(),l=new ka,t.set(c,l)),l.updateFrom(a,s)&&this.generateMissingAttributes&&jd(l,this.attributes)}n.forEach(r=>{t.delete(r)})}setObjects(t){Array.isArray(t)?this.objects=[...t]:this.objects=[t]}generate(t=new oe){let{useGroups:e,overwriteIndex:n,_intermediateGeometry:s,_geometryMergeSets:r}=this,o=this._getMeshes(),a=[],c=[],l=r.get(t)||[];this._updateIntermediateGeometries();let h=!1;o.length!==l.length&&(h=!0);for(let u=0,p=o.length;u<p;u++){let g=o[u],x=s.get(g.uuid);c.push(x);let d=l[u];!d||d.uuid!==x.uuid?(a.push(!1),h=!0):d.version!==x.version?a.push(!1):a.push(!0)}Ab(c,t,{useGroups:e,forceUpdate:h,skipAssigningAttributes:a,overwriteIndex:n}),h&&t.dispose(),r.set(t,c.map(u=>({version:u.version,uuid:u.uuid})));let f=Va;return h?f=Lu:a.includes(!1)&&(f=Iu),{changeType:f,materials:Eb(o),geometry:t}}};function Rb(i){let t=new Set;for(let e=0,n=i.length;e<n;e++){let s=i[e];for(let r in s){let o=s[r];o&&o.isTexture&&t.add(o)}}return Array.from(t)}function Cb(i){let t=[],e=new Set;for(let s=0,r=i.length;s<r;s++)i[s].traverse(o=>{o.visible&&(o.isRectAreaLight||o.isSpotLight||o.isPointLight||o.isDirectionalLight)&&(t.push(o),o.iesMap&&e.add(o.iesMap))});let n=Array.from(e).sort((s,r)=>s.uuid<r.uuid?1:s.uuid>r.uuid?-1:0);return{lights:t,iesTextures:n}}var Ga=class{get initialized(){return!!this.bvh}constructor(t){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new oe,this.staticGeometryGenerator=new Ha(t),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1}setObjects(t){this.staticGeometryGenerator.setObjects(t)}setBVHWorker(t){this._bvhWorker=t}async generateAsync(t=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(t)))),this._pendingGenerate;{this._buildAsync=!0;let e=this.generate(t);return this._buildAsync=!1,e.bvh=this.bvh=await e.bvh,e}}generate(t=null){let{staticGeometryGenerator:e,geometry:n,attributes:s}=this,r=e.objects;e.attributes=s,r.forEach(f=>{f.traverse(u=>{u.isSkinnedMesh&&u.skeleton&&u.skeleton.update()})});let o=e.generate(n),a=o.materials,c=Rb(a),{lights:l,iesTextures:h}=Cb(r);if(o.changeType!==Va&&Kd(n,a,a),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(o.changeType===Lu){let f={strategy:2,maxLeafTris:1,indirect:!0,onProgress:t,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(n,f):this.bvh=new Yr(n,f)}else o.changeType===Iu&&this.bvh.refit()}return{bvhChanged:o.changeType!==Va,bvh:this.bvh,lights:l,iesTextures:h,geometry:n,materials:a,textures:c,objects:r}}};var Pb=new Cs(-1,1,1,-1,0,1),Du=class extends oe{constructor(){super(),this.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new de([0,2,0,0,2,0],2))}},Ib=new Du,_n=class{constructor(t){this._mesh=new St(Ib,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Pb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var yi=class extends qe{set needsUpdate(t){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(t){super(t);for(let e in this.uniforms)Object.defineProperty(this,e,{get(){return this.uniforms[e].value},set(n){this.uniforms[e].value=n}})}setDefine(t,e=void 0){if(e==null){if(t in this.defines)return delete this.defines[t],this.needsUpdate=!0,!0}else if(this.defines[t]!==e)return this.defines[t]=e,this.needsUpdate=!0,!0;return!1}};var Wa=class extends yi{constructor(t){super({blending:We,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(t)}};function Xa(i=1){let t="uint";return i>1&&(t="uvec"+i),`
		${t} sobolReverseBits( ${t} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${t} sobolHashCombine( uint seed, ${t} v ) {

			return seed ^ ( v + ${t}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${t} sobolLaineKarrasPermutation( ${t} x, ${t} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${t} nestedUniformScrambleBase2( ${t} x, ${t} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function qa(i=1){let t="uint",e="float",n="",s=".r",r="1u";return i>1&&(t="uvec"+i,e="vec"+i,n=i+"",i===2?(s=".rg",r="uvec2( 1u, 2u )"):i===3?(s=".rgb",r="uvec3( 1u, 2u, 3u )"):(s="",r="uvec4( 1u, 2u, 3u, 4u )")),`

		${e} sobol${n}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${e} sobol_pt = sobolGetTexturePoint( shuffled_index )${s};
			${t} result = ${t}( sobol_pt * 16777216.0 );

			${t} seed2 = sobolHashCombine( seed, ${r} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${e}( result >> 8 );

		}
	`}var Ya=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${Xa(1)}
	${Xa(2)}
	${Xa(3)}
	${Xa(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,ap=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,cp=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${qa(1)}
	${qa(2)}
	${qa(3)}
	${qa(4)}

`;var Fu=class extends yi{constructor(){super({blending:We,uniforms:{resolution:{value:new Y}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${Ya}
				${ap}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}},Za=class{generate(t,e=256){let n=new Ve(e,e,{type:Kt,format:Ht,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),s=t.getRenderTarget();t.setRenderTarget(n);let r=new _n(new Fu);return r.material.resolution.set(e,e),r.render(t),t.setRenderTarget(s),r.dispose(),n}};var $a=class extends De{set bokehSize(t){this.fStop=this.getFocalLength()/t}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...t){super(...t),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(t,e){return super.copy(t,e),this.fStop=t.fStop,this.apertureBlades=t.apertureBlades,this.apertureRotation=t.apertureRotation,this.focusDistance=t.focusDistance,this.anamorphicRatio=t.anamorphicRatio,this}};var Ja=class{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(t){t instanceof $a?(this.bokehSize=t.bokehSize,this.apertureBlades=t.apertureBlades,this.apertureRotation=t.apertureRotation,this.focusDistance=t.focusDistance,this.anamorphicRatio=t.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}};function Ka(i){let t=new Uint16Array(i.length);for(let e=0,n=i.length;e<n;++e)t[e]=wn.toHalfFloat(i[e]);return t}function lp(i,t,e=0,n=i.length){let s=e,r=e+n-1;for(;s<r;){let o=s+r>>1;i[o]<t?s=o+1:r=o}return s-e}function Lb(i,t,e){return .2126*i+.7152*t+.0722*e}function Db(i,t=He){let e=i.clone();e.source=new Ts({...e.image});let{width:n,height:s,data:r}=e.image,o=r;if(e.type!==t){t===He?o=new Uint16Array(r.length):o=new Float32Array(r.length);let a;r instanceof Int8Array||r instanceof Int16Array||r instanceof Int32Array?a=2**(8*r.BYTES_PER_ELEMENT-1)-1:a=2**(8*r.BYTES_PER_ELEMENT)-1;for(let c=0,l=r.length;c<l;c++){let h=r[c];e.type===He&&(h=wn.fromHalfFloat(r[c])),e.type!==Kt&&e.type!==He&&(h/=a),t===He&&(o[c]=wn.toHalfFloat(h))}e.image.data=o,e.type=t}if(e.flipY){let a=o;o=o.slice();for(let c=0;c<s;c++)for(let l=0;l<n;l++){let h=s-c-1,f=4*(c*n+l),u=4*(h*n+l);o[u+0]=a[f+0],o[u+1]=a[f+1],o[u+2]=a[f+2],o[u+3]=a[f+3]}e.flipY=!1,e.image.data=o}return e}var ja=class{constructor(){let t=new be(Ka(new Float32Array([0,0,0,0])),1,1);t.type=He,t.format=Ht,t.minFilter=ae,t.magFilter=ae,t.wrapS=Xe,t.wrapT=Xe,t.generateMipmaps=!1,t.needsUpdate=!0;let e=new be(Ka(new Float32Array([0,1])),1,2);e.type=He,e.format=di,e.minFilter=ae,e.magFilter=ae,e.generateMipmaps=!1,e.needsUpdate=!0;let n=new be(Ka(new Float32Array([0,0,1,1])),2,2);n.type=He,n.format=di,n.minFilter=ae,n.magFilter=ae,n.generateMipmaps=!1,n.needsUpdate=!0,this.map=t,this.marginalWeights=e,this.conditionalWeights=n,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(t){let e=Db(t);e.wrapS=Xe,e.wrapT=xe;let{width:n,height:s,data:r}=e.image,o=new Float32Array(n*s),a=new Float32Array(n*s),c=new Float32Array(s),l=new Float32Array(s),h=0,f=0;for(let d=0;d<s;d++){let m=0;for(let _=0;_<n;_++){let v=d*n+_,y=wn.fromHalfFloat(r[4*v+0]),S=wn.fromHalfFloat(r[4*v+1]),T=wn.fromHalfFloat(r[4*v+2]),M=Lb(y,S,T);m+=M,h+=M,o[v]=M,a[v]=m}if(m!==0)for(let _=d*n,v=d*n+n;_<v;_++)o[_]/=m,a[_]/=m;f+=m,c[d]=m,l[d]=f}if(f!==0)for(let d=0,m=c.length;d<m;d++)c[d]/=f,l[d]/=f;let u=new Uint16Array(s),p=new Uint16Array(n*s);for(let d=0;d<s;d++){let m=(d+1)/s,_=lp(l,m);u[d]=wn.toHalfFloat((_+.5)/s)}for(let d=0;d<s;d++)for(let m=0;m<n;m++){let _=d*n+m,v=(m+1)/n,y=lp(a,v,d*n,n);p[_]=wn.toHalfFloat((y+.5)/n)}this.dispose();let{marginalWeights:g,conditionalWeights:x}=this;g.image={width:s,height:1,data:u},g.needsUpdate=!0,x.image={width:n,height:s,data:p},x.needsUpdate=!0,this.totalSum=h,this.map=e}};var Nu=6,Fb=0,Nb=1,Ub=2,Bb=3,Ob=4,Fn=new P,ln=new P,up=new Et,nr=new kn,hp=new P,ir=new P,zb=new P(0,1,0),Qa=class{constructor(){let t=new be(new Float32Array(4),1,1);t.format=Ht,t.type=Kt,t.wrapS=xe,t.wrapT=xe,t.generateMipmaps=!1,t.minFilter=Pt,t.magFilter=Pt,this.tex=t,this.count=0}updateFrom(t,e=[]){let n=this.tex,s=Math.max(t.length*Nu,1),r=Math.ceil(Math.sqrt(s));n.image.width!==r&&(n.dispose(),n.image.data=new Float32Array(r*r*4),n.image.width=r,n.image.height=r);let o=n.image.data;for(let c=0,l=t.length;c<l;c++){let h=t[c],f=c*Nu*4,u=0;for(let g=0;g<Nu*4;g++)o[f+g]=0;h.getWorldPosition(ln),o[f+u++]=ln.x,o[f+u++]=ln.y,o[f+u++]=ln.z;let p=Fb;if(h.isRectAreaLight&&h.isCircular?p=Nb:h.isSpotLight?p=Ub:h.isDirectionalLight?p=Bb:h.isPointLight&&(p=Ob),o[f+u++]=p,o[f+u++]=h.color.r,o[f+u++]=h.color.g,o[f+u++]=h.color.b,o[f+u++]=h.intensity,h.getWorldQuaternion(nr),h.isRectAreaLight)Fn.set(h.width,0,0).applyQuaternion(nr),o[f+u++]=Fn.x,o[f+u++]=Fn.y,o[f+u++]=Fn.z,u++,ln.set(0,h.height,0).applyQuaternion(nr),o[f+u++]=ln.x,o[f+u++]=ln.y,o[f+u++]=ln.z,o[f+u++]=Fn.cross(ln).length()*(h.isCircular?Math.PI/4:1);else if(h.isSpotLight){let g=h.radius||0;hp.setFromMatrixPosition(h.matrixWorld),ir.setFromMatrixPosition(h.target.matrixWorld),up.lookAt(hp,ir,zb),nr.setFromRotationMatrix(up),Fn.set(1,0,0).applyQuaternion(nr),o[f+u++]=Fn.x,o[f+u++]=Fn.y,o[f+u++]=Fn.z,u++,ln.set(0,1,0).applyQuaternion(nr),o[f+u++]=ln.x,o[f+u++]=ln.y,o[f+u++]=ln.z,o[f+u++]=Math.PI*g*g,o[f+u++]=g,o[f+u++]=h.decay,o[f+u++]=h.distance,o[f+u++]=Math.cos(h.angle),o[f+u++]=Math.cos(h.angle*(1-h.penumbra)),o[f+u++]=h.iesMap?e.indexOf(h.iesMap):-1}else if(h.isPointLight){let g=Fn.setFromMatrixPosition(h.matrixWorld);o[f+u++]=g.x,o[f+u++]=g.y,o[f+u++]=g.z,u++,u+=4,u+=1,o[f+u++]=h.decay,o[f+u++]=h.distance}else if(h.isDirectionalLight){let g=Fn.setFromMatrixPosition(h.matrixWorld),x=ln.setFromMatrixPosition(h.target.matrixWorld);ir.subVectors(g,x).normalize(),o[f+u++]=ir.x,o[f+u++]=ir.y,o[f+u++]=ir.z}}this.count=t.length;let a=er(o.buffer);return this.hash!==a?(this.hash=a,n.needsUpdate=!0,!0):!1}};function fp(i,t,e,n,s){if(t>n)throw new Error;let r=i.length/t,o=i.constructor.BYTES_PER_ELEMENT*8,a=1;switch(i.constructor){case Uint8Array:case Uint16Array:case Uint32Array:a=2**o-1;break;case Int8Array:case Int16Array:case Int32Array:a=2**(o-1)-1;break}for(let c=0;c<r;c++){let l=4*c,h=t*c;for(let f=0;f<n;f++)e[s+l+f]=t>=f+1?i[h+f]/a:0}}var tc=class extends Ui{constructor(){super(),this._textures=[],this.type=Kt,this.format=Ht,this.internalFormat="RGBA32F"}updateAttribute(t,e){let n=this._textures[t];n.updateFrom(e);let s=n.image,r=this.image;if(s.width!==r.width||s.height!==r.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");let{width:o,height:a,data:c}=r,h=o*a*4*t,f=e.itemSize;f===3&&(f=4),fp(n.image.data,f,c,4,h),this.dispose(),this.needsUpdate=!0}setAttributes(t){let e=t[0].count,n=t.length;for(let f=0,u=n;f<u;f++)if(t[f].count!==e)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");let s=this._textures;for(;s.length<n;){let f=new tr;s.push(f)}for(;s.length>n;)s.pop();for(let f=0,u=n;f<u;f++)s[f].updateFrom(t[f]);let o=s[0].image,a=this.image;(o.width!==a.width||o.height!==a.height||o.depth!==n)&&(a.width=o.width,a.height=o.height,a.depth=n,a.data=new Float32Array(a.width*a.height*a.depth*4));let{data:c,width:l,height:h}=a;for(let f=0,u=n;f<u;f++){let p=s[f],x=l*h*4*f,d=t[f].itemSize;d===3&&(d=4),fp(p.image.data,d,c,4,x)}this.dispose(),this.needsUpdate=!0}};var ec=class extends tc{updateNormalAttribute(t){this.updateAttribute(0,t)}updateTangentAttribute(t){this.updateAttribute(1,t)}updateUvAttribute(t){this.updateAttribute(2,t)}updateColorAttribute(t){this.updateAttribute(3,t)}updateFrom(t,e,n,s){this.setAttributes([t,e,n,s])}};function Uu(i,t){return i.uuid<t.uuid?1:i.uuid>t.uuid?-1:0}function nc(i){return`${i.source.uuid}:${i.colorSpace}`}function kb(i){let t=new Set,e=[];for(let n=0,s=i.length;n<s;n++){let r=i[n],o=nc(r);t.has(o)||(t.add(o),e.push(r))}return e}function dp(i){let t=i.map(n=>n.iesMap||null).filter(n=>n),e=new Set(t);return Array.from(e).sort(Uu)}function pp(i){let t=new Set;for(let n=0,s=i.length;n<s;n++){let r=i[n];for(let o in r){let a=r[o];a&&a.isTexture&&t.add(a)}}let e=Array.from(t);return kb(e).sort(Uu)}function mp(i){let t=[];return i.traverse(e=>{e.visible&&(e.isRectAreaLight||e.isSpotLight||e.isPointLight||e.isDirectionalLight)&&t.push(e)}),t.sort(Uu)}var xp=45,gp=xp*4,Bu=class{constructor(){this._features={}}isUsed(t){return t in this._features}setUsed(t,e=!0){e===!1?delete this._features[t]:this._features[t]=!0}reset(){this._features={}}},ic=class extends be{constructor(){super(new Float32Array(4),1,1),this.format=Ht,this.type=Kt,this.wrapS=xe,this.wrapT=xe,this.minFilter=Pt,this.magFilter=Pt,this.generateMipmaps=!1,this.features=new Bu}updateFrom(t,e){function n(g,x,d=-1){if(x in g&&g[x]){let m=nc(g[x]);return f[m]}else return d}function s(g,x,d){return x in g?g[x]:d}function r(g,x,d,m){let _=g[x]&&g[x].isTexture?g[x]:null;if(_){_.matrixAutoUpdate&&_.updateMatrix();let v=_.matrix.elements,y=0;d[m+y++]=v[0],d[m+y++]=v[3],d[m+y++]=v[6],y++,d[m+y++]=v[1],d[m+y++]=v[4],d[m+y++]=v[7],y++}return 8}let o=0,a=t.length*xp,c=Math.ceil(Math.sqrt(a))||1,{image:l,features:h}=this,f={};for(let g=0,x=e.length;g<x;g++)f[nc(e[g])]=g;l.width!==c&&(this.dispose(),l.data=new Float32Array(c*c*4),l.width=c,l.height=c);let u=l.data;h.reset();for(let g=0,x=t.length;g<x;g++){let d=t[g];if(d.isFogVolumeMaterial){h.setUsed("FOG");for(let v=0;v<gp;v++)u[o+v]=0;u[o+0+0]=d.color.r,u[o+0+1]=d.color.g,u[o+0+2]=d.color.b,u[o+8+3]=s(d,"emissiveIntensity",0),u[o+12+0]=d.emissive.r,u[o+12+1]=d.emissive.g,u[o+12+2]=d.emissive.b,u[o+52+1]=d.density,u[o+52+3]=0,u[o+56+2]=4,o+=gp;continue}u[o++]=d.color.r,u[o++]=d.color.g,u[o++]=d.color.b,u[o++]=n(d,"map"),u[o++]=s(d,"metalness",0),u[o++]=n(d,"metalnessMap"),u[o++]=s(d,"roughness",0),u[o++]=n(d,"roughnessMap"),u[o++]=s(d,"ior",1.5),u[o++]=s(d,"transmission",0),u[o++]=n(d,"transmissionMap"),u[o++]=s(d,"emissiveIntensity",0),"emissive"in d?(u[o++]=d.emissive.r,u[o++]=d.emissive.g,u[o++]=d.emissive.b):(u[o++]=0,u[o++]=0,u[o++]=0),u[o++]=n(d,"emissiveMap"),u[o++]=n(d,"normalMap"),"normalScale"in d?(u[o++]=d.normalScale.x,u[o++]=d.normalScale.y):(u[o++]=1,u[o++]=1),u[o++]=s(d,"clearcoat",0),u[o++]=n(d,"clearcoatMap"),u[o++]=s(d,"clearcoatRoughness",0),u[o++]=n(d,"clearcoatRoughnessMap"),u[o++]=n(d,"clearcoatNormalMap"),"clearcoatNormalScale"in d?(u[o++]=d.clearcoatNormalScale.x,u[o++]=d.clearcoatNormalScale.y):(u[o++]=1,u[o++]=1),o++,u[o++]=s(d,"sheen",0),"sheenColor"in d?(u[o++]=d.sheenColor.r,u[o++]=d.sheenColor.g,u[o++]=d.sheenColor.b):(u[o++]=0,u[o++]=0,u[o++]=0),u[o++]=n(d,"sheenColorMap"),u[o++]=s(d,"sheenRoughness",0),u[o++]=n(d,"sheenRoughnessMap"),u[o++]=n(d,"iridescenceMap"),u[o++]=n(d,"iridescenceThicknessMap"),u[o++]=s(d,"iridescence",0),u[o++]=s(d,"iridescenceIOR",1.3);let m=s(d,"iridescenceThicknessRange",[100,400]);u[o++]=m[0],u[o++]=m[1],"specularColor"in d?(u[o++]=d.specularColor.r,u[o++]=d.specularColor.g,u[o++]=d.specularColor.b):(u[o++]=1,u[o++]=1,u[o++]=1),u[o++]=n(d,"specularColorMap"),u[o++]=s(d,"specularIntensity",1),u[o++]=n(d,"specularIntensityMap");let _=s(d,"thickness",0)===0&&s(d,"attenuationDistance",1/0)===1/0;if(u[o++]=Number(_),o++,"attenuationColor"in d?(u[o++]=d.attenuationColor.r,u[o++]=d.attenuationColor.g,u[o++]=d.attenuationColor.b):(u[o++]=1,u[o++]=1,u[o++]=1),u[o++]=s(d,"attenuationDistance",1/0),u[o++]=n(d,"alphaMap"),u[o++]=d.opacity,u[o++]=d.alphaTest,!_&&d.transmission>0)u[o++]=0;else switch(d.side){case xn:u[o++]=1;break;case Ee:u[o++]=-1;break;case Te:u[o++]=0;break}u[o++]=Number(s(d,"matte",!1)),u[o++]=Number(s(d,"castShadow",!0)),u[o++]=Number(d.vertexColors)|Number(d.flatShading)<<1,u[o++]=Number(d.transparent),o+=r(d,"map",u,o),o+=r(d,"metalnessMap",u,o),o+=r(d,"roughnessMap",u,o),o+=r(d,"transmissionMap",u,o),o+=r(d,"emissiveMap",u,o),o+=r(d,"normalMap",u,o),o+=r(d,"clearcoatMap",u,o),o+=r(d,"clearcoatNormalMap",u,o),o+=r(d,"clearcoatRoughnessMap",u,o),o+=r(d,"sheenColorMap",u,o),o+=r(d,"sheenRoughnessMap",u,o),o+=r(d,"iridescenceMap",u,o),o+=r(d,"iridescenceThicknessMap",u,o),o+=r(d,"specularColorMap",u,o),o+=r(d,"specularIntensityMap",u,o)}let p=er(u.buffer);return this.hash!==p?(this.hash=p,this.needsUpdate=!0,!0):!1}};var vp=new Dt;function Hb(i){return i?`${i.uuid}:${i.version}`:null}function Vb(i,t){for(let e in t)e in i&&(i[e]=t[e])}var Zr=class extends Ho{constructor(t,e,n){let s={format:Ht,type:gn,minFilter:ae,magFilter:ae,wrapS:Xe,wrapT:Xe,generateMipmaps:!1,...n};super(t,e,1,s),Vb(this.texture,s),this.texture.setTextures=(...o)=>{this.setTextures(...o)},this.hashes=[null];let r=new _n(new Ou);this.fsQuad=r}setTextures(t,e,n=this.width,s=this.height){let r=t.getRenderTarget(),o=t.toneMapping,a=t.getClearAlpha();t.getClearColor(vp);let c=e.length||1;(n!==this.width||s!==this.height||this.depth!==c)&&(this.setSize(n,s,c),this.hashes=new Array(c).fill(null)),t.setClearColor(0,0),t.toneMapping=zn;let l=this.fsQuad,h=this.hashes,f=!1;for(let u=0,p=c;u<p;u++){let g=e[u],x=Hb(g);g&&(h[u]!==x||g.isWebGLRenderTarget)&&(g.matrixAutoUpdate=!1,g.matrix.identity(),l.material.map=g,t.setRenderTarget(this,u),l.render(t),g.updateMatrix(),g.matrixAutoUpdate=!0,h[u]=x,f=!0)}return l.material.map=null,t.setClearColor(vp,a),t.setRenderTarget(r),t.toneMapping=o,f}dispose(){super.dispose(),this.fsQuad.dispose()}},Ou=class extends qe{get map(){return this.uniforms.map.value}set map(t){this.uniforms.map.value=t}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}};function Gb(i,t=Math.random()){for(let e=i.length-1;e>0;e--){let n=Math.floor(t()*(e+1)),s=i[e];i[e]=i[n],i[n]=s}return i}var sc=class{constructor(t,e,n=Math.random){let s=t**e,r=new Uint16Array(s),o=s;for(let a=0;a<s;a++)r[a]=a;this.samples=new Float32Array(e),this.strataCount=t,this.reset=function(){for(let a=0;a<s;a++)r[a]=a;o=0},this.reshuffle=function(){o=0},this.next=function(){let{samples:a}=this;o>=r.length&&(Gb(r,n),this.reshuffle());let c=r[o++];for(let l=0;l<e;l++)a[l]=(c%t+n())/t,c=Math.floor(c/t);return a}}};var rc=class{constructor(t,e,n=Math.random){let s=0;for(let c of e)s+=c;let r=new Float32Array(s),o=[],a=0;for(let c of e){let l=new sc(t,c,n);l.samples=new Float32Array(r.buffer,a,l.samples.length),a+=l.samples.length*4,o.push(l)}this.samples=r,this.strataCount=t,this.next=function(){for(let c of o)c.next();return r},this.reshuffle=function(){for(let c of o)c.reshuffle()},this.reset=function(){for(let c of o)c.reset()}}};var zu=class{constructor(t=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=t}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}},oc=class extends be{constructor(t=1,e=1,n=8){super(new Float32Array(1),1,1,Ht,Kt),this.minFilter=Pt,this.magFilter=Pt,this.strata=n,this.sampler=null,this.generator=new zu,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(t,e,n)}init(t=this.image.height,e=this.image.width,n=this.strata){let{image:s}=this;if(s.width===e&&s.height===t&&this.sampler!==null)return;let r=new Array(t*e).fill(4),o=new rc(n,r,this.random);s.width=e,s.height=t,s.data=o.samples,this.sampler=o,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}};function _p(i,t=Math.random){for(let e=i.length-1;e>0;e--){let n=~~((t()-1e-6)*e),s=i[e];i[e]=i[n],i[n]=s}}function yp(i,t){i.fill(0);for(let e=0;e<t;e++)i[e]=1}var $r=class{constructor(t){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(t),this.setSigma(1.5)}findVoid(){let{score:t,binaryPattern:e}=this,n=1/0,s=-1;for(let r=0,o=e.length;r<o;r++){if(e[r]!==0)continue;let a=t[r];a<n&&(n=a,s=r)}return s}findCluster(){let{score:t,binaryPattern:e}=this,n=-1/0,s=-1;for(let r=0,o=e.length;r<o;r++){if(e[r]!==1)continue;let a=t[r];a>n&&(n=a,s=r)}return s}setSigma(t){if(t===this.sigma)return;let e=~~(Math.sqrt(20*t**2)+1),n=2*e+1,s=new Float32Array(n*n),r=t*t;for(let o=-e;o<=e;o++)for(let a=-e;a<=e;a++){let c=(e+a)*n+o+e,l=o*o+a*a;s[c]=Math.E**(-l/(2*r))}this.lookupTable=s,this.sigma=t,this.radius=e}resize(t){this.size!==t&&(this.size=t,this.score=new Float32Array(t*t),this.binaryPattern=new Uint8Array(t*t))}invert(){let{binaryPattern:t,score:e,size:n}=this;e.fill(0);for(let s=0,r=t.length;s<r;s++)if(t[s]===0){let o=~~(s/n),a=s-o*n;this.updateScore(a,o,1),t[s]=1}else t[s]=0}updateScore(t,e,n){let{size:s,score:r,lookupTable:o}=this,a=this.radius,c=2*a+1;for(let l=-a;l<=a;l++)for(let h=-a;h<=a;h++){let f=(a+h)*c+l+a,u=o[f],p=t+l;p=p<0?s+p:p%s;let g=e+h;g=g<0?s+g:g%s;let x=g*s+p;r[x]+=n*u}}addPointIndex(t){this.binaryPattern[t]=1;let e=this.size,n=~~(t/e),s=t-n*e;this.updateScore(s,n,1),this.count++}removePointIndex(t){this.binaryPattern[t]=0;let e=this.size,n=~~(t/e),s=t-n*e;this.updateScore(s,n,-1),this.count--}copy(t){this.resize(t.size),this.score.set(t.score),this.binaryPattern.set(t.binaryPattern),this.setSigma(t.sigma),this.count=t.count}};var ac=class{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new $r(1),this.savedSamples=new $r(1)}generate(){let{samples:t,savedSamples:e,sigma:n,majorityPointsRatio:s,size:r}=this;t.resize(r),t.setSigma(n);let o=Math.floor(r*r*s),a=t.binaryPattern;yp(a,o),_p(a,this.random);for(let f=0,u=a.length;f<u;f++)a[f]===1&&t.addPointIndex(f);for(;;){let f=t.findCluster();t.removePointIndex(f);let u=t.findVoid();if(f===u){t.addPointIndex(f);break}t.addPointIndex(u)}let c=new Uint32Array(r*r);e.copy(t);let l;for(l=t.count-1;l>=0;){let f=t.findCluster();t.removePointIndex(f),c[f]=l,l--}let h=r*r;for(l=e.count;l<h/2;){let f=e.findVoid();e.addPointIndex(f),c[f]=l,l++}for(e.invert();l<h;){let f=e.findCluster();e.removePointIndex(f),c[f]=l,l++}return{data:c,maxValue:h}}};function Wb(i){return i>=3?4:i}function Xb(i){switch(i){case 1:return di;case 2:return Ur;default:return Ht}}var cc=class extends be{constructor(t=64,e=1){super(new Float32Array(4),1,1,Ht,Kt),this.minFilter=Pt,this.magFilter=Pt,this.size=t,this.channels=e,this.update()}update(){let t=this.channels,e=this.size,n=new ac;n.channels=t,n.size=e;let s=Wb(t),r=Xb(s);(this.image.width!==e||r!==this.format)&&(this.image.width=e,this.image.height=e,this.image.data=new Float32Array(e**2*s),this.format=r,this.dispose());let o=this.image.data;for(let a=0,c=t;a<c;a++){let l=n.generate(),h=l.data,f=l.maxValue;for(let u=0,p=h.length;u<p;u++){let g=h[u]/f;o[u*s+a]=g}}this.needsUpdate=!0}};var bp=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`;var Mp=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`;var Sp=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`;var wp=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * 45u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );

		return m;

	}

`;var Tp=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`;var Ep=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`;var Ap=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`;var Rp=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`;var Cp=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`;var Pp=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`;var Ip=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`;var Lp=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`;var lc=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`;var ku=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`;var Dp=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`;var Fp=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );
		color *= wi.z;

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`;var Np=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`;var Up=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`;var Bp=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`;var Op=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`;var zp=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * 45u;
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`;var kp=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`;var Hp=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = blades == 0 ? sampleCircle( shapeUVW.xy ) : sampleRegularPolygon( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`;var Vp=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`;var Gp=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`;var Wp=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`;var Xp=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`;var uc=class extends yi{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(t){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3},uniforms:{resolution:{value:new Y},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new Ja},cameraWorldMatrix:{value:new Et},invProjectionMatrix:{value:new Et},bvh:{value:new Na},attributesArray:{value:new ec},materialIndexAttribute:{value:new Qs},materials:{value:new ic},textures:{value:new Zr().texture},lights:{value:new Qa},iesProfiles:{value:new Zr(360,180,{type:He,wrapS:xe,wrapT:xe}).texture},environmentIntensity:{value:1},environmentRotation:{value:new Et},envMapInfo:{value:new ja},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new Et},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new oc},stratifiedOffsetTexture:{value:new cc(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${Wi.common_functions}
				${Wi.bvh_struct_definitions}
				${Wi.bvh_ray_functions}

				// uniform structs
				${bp}
				${Sp}
				${Mp}
				${wp}
				${Tp}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${Dp}

				#elif RANDOM_TYPE == 1 	// Sobol

					${ku}
					${Ya}
					${cp}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${ku}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${Lp}
				${Cp}
				${lc}
				${Pp}
				${Ip}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${Rp}
				${Ep}
				${Ap}

				${zp}
				${Up}
				${Op}
				${Bp}
				${Np}
				${Fp}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${Wp}
				${Hp}
				${Xp}
				${kp}
				${Vp}
				${Gp}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(t)}};function*Yb(){let{_renderer:i,_fsQuad:t,_blendQuad:e,_primaryTarget:n,_blendTargets:s,_sobolTarget:r,_subframe:o,alpha:a,material:c}=this,l=new ne,h=new ne,f=e.material,[u,p]=s;for(;;){a?(f.opacity=this._opacityFactor/(this.samples+1),c.blending=We,c.opacity=1):(c.opacity=this._opacityFactor/(this.samples+1),c.blending=On);let[g,x,d,m]=o,_=n.width,v=n.height;c.resolution.set(_*d,v*m),c.sobolTexture=r.texture,c.stratifiedTexture.init(20,c.bounces+c.transmissiveBounces+5),c.stratifiedTexture.next(),c.seed++;let y=this.tiles.x||1,S=this.tiles.y||1,T=y*S,M=Math.ceil(_*d),I=Math.ceil(v*m),b=Math.floor(g*_),w=Math.floor(x*v),L=Math.ceil(M/y),D=Math.ceil(I/S);for(let B=0;B<S;B++)for(let C=0;C<y;C++){let N=i.getRenderTarget(),O=i.autoClear,W=i.getScissorTest();i.getScissor(l),i.getViewport(h);let Z=C,q=B;if(!this.stableTiles){let K=this._currentTile%(y*S);Z=K%y,q=~~(K/y),this._currentTile=K+1}let j=S-q-1;n.scissor.set(b+Z*L,w+j*D,Math.min(L,M-Z*L),Math.min(D,I-j*D)),n.viewport.set(b,w,M,I),i.setRenderTarget(n),i.setScissorTest(!0),i.autoClear=!1,t.render(i),i.setViewport(h),i.setScissor(l),i.setScissorTest(W),i.setRenderTarget(N),i.autoClear=O,a&&(f.target1=u.texture,f.target2=n.texture,i.setRenderTarget(p),e.render(i),i.setRenderTarget(N)),this.samples+=1/T,C===y-1&&B===S-1&&(this.samples=Math.round(this.samples)),yield}[u,p]=[p,u]}}var qp=new Dt,Jr=class{get material(){return this._fsQuad.material}set material(t){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),t.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=t}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(t){this._alpha!==t&&(t||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=t,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(t){this.camera=null,this.tiles=new Y(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new ne(0,0,1,1),this._opacityFactor=1,this._renderer=t,this._alpha=!1,this._fsQuad=new _n(new uc),this._blendQuad=new _n(new Wa),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new Za().generate(t),this._primaryTarget=new Ve(1,1,{format:Ht,type:Kt,magFilter:Pt,minFilter:Pt}),this._blendTargets=[new Ve(1,1,{format:Ht,type:Kt,magFilter:Pt,minFilter:Pt}),new Ve(1,1,{format:Ht,type:Kt,magFilter:Pt,minFilter:Pt})],this._compileFunction=()=>{let e=this.compileMaterial(this._fsQuad._mesh);e.then(()=>{this._compilePromise===e&&(this._compilePromise=null)}),this._compilePromise=e},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(t){let{material:e}=this;e.cameraWorldMatrix.copy(t.matrixWorld),e.invProjectionMatrix.copy(t.projectionMatrixInverse),e.physicalCamera.updateFrom(t);let n=0;t.projectionMatrix.elements[15]>0&&(n=1),t.isEquirectCamera&&(n=2),e.setDefine("CAMERA_TYPE",n),this.camera=t}setSize(t,e){t=Math.ceil(t),e=Math.ceil(e),!(this._primaryTarget.width===t&&this._primaryTarget.height===e)&&(this._primaryTarget.setSize(t,e),this._blendTargets[0].setSize(t,e),this._blendTargets[1].setSize(t,e),this.reset())}getSize(t){t.x=this._primaryTarget.width,t.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){let{_renderer:t,_primaryTarget:e,_blendTargets:n}=this,s=t.getRenderTarget(),r=t.getClearAlpha();t.getClearColor(qp),t.setRenderTarget(e),t.setClearColor(0,0),t.clearColor(),t.setRenderTarget(n[0]),t.setClearColor(0,0),t.clearColor(),t.setRenderTarget(n[1]),t.setClearColor(0,0),t.clearColor(),t.setClearColor(qp,r),t.setRenderTarget(s),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=Yb.call(this)),this._task.next())}};var $i=new Y,Yp=new Y,hc=new ra,fc=new Dt,dc=class extends be{constructor(t=512,e=512){super(new Float32Array(t*e*4),t,e,Ht,Kt,Ni,Xe,xe,ae,ae),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;let{data:t,width:e,height:n}=this.image;for(let s=0;s<e;s++)for(let r=0;r<n;r++){Yp.set(e,n),$i.set(s/e,r/n),$i.x-=.5,$i.y=1-$i.y,hc.theta=$i.x*2*Math.PI,hc.phi=$i.y*Math.PI,hc.radius=1,this.generationCallback(hc,$i,Yp,fc);let a=4*(r*e+s);t[a+0]=fc.r,t[a+1]=fc.g,t[a+2]=fc.b,t[a+3]=1}}copy(t){return super.copy(t),this.generationCallback=t.generationCallback,this}};var Zp=new P,sr=class extends dc{constructor(t=512){super(t,t),this.topColor=new Dt().set(16777215),this.bottomColor=new Dt().set(0),this.exponent=2,this.generationCallback=(e,n,s,r)=>{Zp.setFromSpherical(e);let o=Zp.y*.5+.5;r.lerpColors(this.bottomColor,this.topColor,o**this.exponent)}}copy(t){return super.copy(t),this.topColor.copy(t.topColor),this.bottomColor.copy(t.bottomColor),this}};var pc=class extends qe{get map(){return this.uniforms.map.value}set map(t){this.uniforms.map.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}constructor(t){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(t)}};var Hu=class extends qe{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${lc}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}},Kr=class{constructor(t){this._renderer=t,this._quad=new _n(new Hu)}generate(t,e=null,n=null){if(!t.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");let s=t.images[0],r=this._renderer,o=this._quad;e===null&&(e=4*s.height),n===null&&(n=2*s.height);let a=new Ve(e,n,{type:Kt,colorSpace:s.colorSpace}),c=s.height,l=Math.log2(c)-2,h=1/c,f=1/(3*Math.max(Math.pow(2,l),112));o.material.defines.CUBEUV_MAX_MIP=`${l}.0`,o.material.defines.CUBEUV_TEXEL_WIDTH=f,o.material.defines.CUBEUV_TEXEL_HEIGHT=h,o.material.uniforms.envMap.value=t,o.material.uniforms.flipEnvMap.value=t.isRenderTargetTexture?1:-1,o.material.needsUpdate=!0;let u=r.getRenderTarget(),p=r.autoClear;r.autoClear=!0,r.setRenderTarget(a),o.render(r),r.setRenderTarget(u),r.autoClear=p;let g=new Uint16Array(e*n*4),x=new Float32Array(e*n*4);r.readRenderTargetPixels(a,0,0,e,n,x),a.dispose();for(let m=0,_=x.length;m<_;m++)g[m]=wn.toHalfFloat(x[m]);let d=new be(g,e,n,Ht,He);return d.minFilter=Of,d.magFilter=ae,d.wrapS=Xe,d.wrapT=Xe,d.mapping=Ni,d.needsUpdate=!0,d}dispose(){this._quad.dispose()}};function Zb(i){return i.extensions.get("EXT_float_blend")}var rr=new Y,mc=class{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(t){this._pathTracer.material.setDefine("FEATURE_MIS",t?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(t){this._pathTracer.material.transmissiveBounces=t}get bounces(){return this._pathTracer.material.bounces}set bounces(t){this._pathTracer.material.bounces=t}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(t){this._pathTracer.material.filterGlossyFactor=t}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(t){this._pathTracer.stableNoise=t}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(t){this._renderer=t,this._generator=new Ga,this._pathTracer=new Jr(t),this._queueReset=!1,this._clock=new sa,this._compilePromise=null,this._lowResPathTracer=new Jr(t),this._lowResPathTracer.tiles.set(1,1),this._quad=new _n(new pc({map:null,transparent:!0,blending:We,premultipliedAlpha:t.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new Y(1024,1024),this.rasterizeSceneCallback=(e,n)=>{this._renderer.render(e,n)},this.renderToCanvasCallback=(e,n,s)=>{let r=n.autoClear;n.autoClear=!1,s.render(n),n.autoClear=r},this.setScene(new Pn,new De)}setBVHWorker(t){this._generator.setBVHWorker(t)}setScene(t,e,n={}){t.updateMatrixWorld(!0),e.updateMatrixWorld();let s=this._generator;if(s.setObjects(t),this._buildAsync)return s.generateAsync(n.onProgress).then(r=>this._updateFromResults(t,e,r));{let r=s.generate();return this._updateFromResults(t,e,r)}}setSceneAsync(...t){this._buildAsync=!0;let e=this.setScene(...t);return this._buildAsync=!1,e}setCamera(t){this.camera=t,this.updateCamera()}updateCamera(){let t=this.camera;t.updateMatrixWorld(),this._pathTracer.setCamera(t),this._lowResPathTracer.setCamera(t),this.reset()}updateMaterials(){let t=this._pathTracer.material,e=this._renderer,n=this._materials,s=this.textureSize,r=pp(n);t.textures.setTextures(e,r,s.x,s.y),t.materials.updateFrom(n,r),this.reset()}updateLights(){let t=this.scene,e=this._renderer,n=this._pathTracer.material,s=mp(t),r=dp(s);n.lights.updateFrom(s,r),n.iesProfiles.setTextures(e,r),this.reset()}updateEnvironment(){let t=this.scene,e=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),e.backgroundBlur=t.backgroundBlurriness,e.backgroundIntensity=t.backgroundIntensity??1,e.backgroundRotation.makeRotationFromEuler(t.backgroundRotation).invert(),t.background===null)e.backgroundMap=null,e.backgroundAlpha=0;else if(t.background.isColor){this._colorBackground=this._colorBackground||new sr(16);let n=this._colorBackground;n.topColor.equals(t.background)||(n.topColor.set(t.background),n.bottomColor.set(t.background),n.update()),e.backgroundMap=n,e.backgroundAlpha=1}else if(t.background.isCubeTexture){if(t.background!==this._previousBackground){let n=new Kr(this._renderer).generate(t.background);this._internalBackground=n,e.backgroundMap=n,e.backgroundAlpha=1}}else e.backgroundMap=t.background,e.backgroundAlpha=1;if(e.environmentIntensity=t.environmentIntensity??1,e.environmentRotation.makeRotationFromEuler(t.environmentRotation).invert(),this._previousEnvironment!==t.environment)if(t.environment!==null)if(t.environment.isCubeTexture){let n=new Kr(this._renderer).generate(t.environment);e.envMapInfo.updateFrom(n)}else e.envMapInfo.updateFrom(t.environment);else e.environmentIntensity=0;this._previousEnvironment=t.environment,this._previousBackground=t.background,this.reset()}_updateFromResults(t,e,n){let{materials:s,geometry:r,bvh:o,bvhChanged:a}=n;this._materials=s;let l=this._pathTracer.material;return a&&(l.bvh.updateFrom(o),l.attributesArray.updateFrom(r.attributes.normal,r.attributes.tangent,r.attributes.uv,r.attributes.color),l.materialIndexAttribute.updateFrom(r.attributes.materialIndex)),this._previousScene=t,this.scene=t,this.camera=e,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),n}renderSample(){let t=this._lowResPathTracer,e=this._pathTracer,n=this._renderer,s=this._clock,r=this._quad;this._updateScale(),this._queueReset&&(e.reset(),t.reset(),this._queueReset=!1,r.material.opacity=0,s.start());let o=s.getDelta()*1e3,a=s.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=a&&!this.isCompiling&&e.update(),e.alpha=e.material.backgroundAlpha!==1||!Zb(n),t.alpha=e.alpha,this.renderToCanvas){let c=this._renderer,l=this.minSamples;if(a>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?r.material.opacity=Math.min(r.material.opacity+o/this.fadeDuration,1):r.material.opacity=1),!this.enablePathTracing||this.samples<l||r.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){t.samples<1&&(t.material=e.material,t.update());let h=r.material.opacity;r.material.opacity=1-r.material.opacity,r.material.map=t.target.texture,r.render(c),r.material.opacity=h}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&r.material.opacity>0&&(r.material.opacity<1&&(r.material.blending=this.dynamicLowRes?Io:On),r.material.map=e.target.texture,this.renderToCanvasCallback(e.target,c,r),r.material.blending=We)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._renderQuad.dispose(),this._renderQuad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(rr);let t=Math.floor(this.renderScale*rr.x),e=Math.floor(this.renderScale*rr.y);if(this._pathTracer.getSize(rr),rr.x!==t||rr.y!==e){let n=this.lowResScale;this._pathTracer.setSize(t,e),this._lowResPathTracer.setSize(Math.floor(t*n),Math.floor(e*n))}}}};function $p(i,t,e,n=0){let s=t-.14,r=e-2*.07,o=1-2*n;return i.map(([a,c,l,h])=>[n+o*(.07+a*s)/t,n+o*(.07+c*r)/e,o*l*s/t,o*h*r/e])}var dt=(i,t={})=>({f:i,...t}),Jp={pelna:dt("rol",{mat:"tkanina",wal:1,lanc:1}),kasetowa:dt("rol",{mat:"tkanina",kas:"kaseta",prow:1,lanc:1}),zebra:dt("rol",{mat:"zebra",kas:"kaseta"}),zaciemniajaca:dt("rol",{mat:"blackout",kas:"kaseta",prow:3,lanc:1}),roleta_zip_wew:dt("rol",{mat:"tkanina",kas:"kwadrat",prow:2,cieza:1}),bambusowa:dt("rol",{mat:"bambus",kas:"belka"}),ekran:dt("rol",{mat:"ekran",kas:"kaseta"}),plisa:dt("har",{faldy:.03,gl:.015}),plisa_gora_dol:dt("har",{faldy:.03,gl:.015,gd:1}),plaster:dt("har",{faldy:.04,gl:.022,plaster:1}),rzymska:dt("har",{faldy:.17,gl:.075,miekka:1}),zaluzja:dt("lam",{lam:.025,mat:"alu"}),drewniana:dt("lam",{lam:.05,mat:"drewno",tasma:1}),pionowa:dt("pion",{lam:.089}),panel:dt("pion",{lam:.3,panel:1}),zaslona:dt("zas"),zaslona_wave:dt("zas",{wave:1}),firana:dt("zas",{firana:1}),natynkowa:dt("rolz",{skrz:"natynk"}),natynkowa_okragla:dt("rolz",{skrz:"okragla"}),podtynkowa:dt("rolz",{skrz:"brak"}),zewnetrzna:dt("rolz",{skrz:"nadstawna"}),adaptacyjna:dt("rolz",{skrz:"natynk"}),perforowana:dt("rolz",{skrz:"natynk",perf:1}),roleta_moskitiera:dt("rolz",{skrz:"natynk",siatka:1}),ekstrudowana:dt("rolz",{skrz:"natynk",prof:.045}),roleta_drzwi:dt("rolz",{skrz:"natynk",prof:.045}),fasadowa:dt("lam",{lam:.08,mat:"alu",zew:1,prow:1}),fasadowaz:dt("lam",{lam:.09,mat:"alu",zew:1,prow:1,z:1}),fasadowa_f80:dt("lam",{lam:.08,mat:"alu",zew:1,prow:1,plaska:1}),screen:dt("rol",{mat:"screen",kas:"zew",prow:2,zew:1}),markizoleta:dt("rol",{mat:"screen",kas:"zew",zew:1,wysieg:1}),okiennice:dt("okien"),okiennice_przesuwne:dt("okien",{przesuw:1}),dach_dkl:dt("rol",{mat:"blackout",kas:"kaseta",prow:2,dach:1,uchwyt:1}),dach_ssl:dt("rolz",{skrz:"dach",dach:1}),dachowa:dt("rolz",{skrz:"dach",dach:1,prof:.045}),dach_fhb:dt("rol",{mat:"tkanina",kas:"kaseta",prow:2,dach:1,uchwyt:1}),dach_msl:dt("rol",{mat:"screen",kas:"brak",zew:1,prow:2,dach:1}),markizeta_dach:dt("rol",{mat:"screen",kas:"brak",zew:1,prow:2,dach:1,haki:1}),dach_pal:dt("lam",{lam:.025,mat:"alu",prow:1,dach:1,uchwyt:1}),dach_fhl:dt("har",{faldy:.03,gl:.015,prow:1,dach:1,uchwyt:1}),dach_dn:dt("rol",{mat:"blackout",kas:"kaseta",prow:2,pod:"har",dach:1,uchwyt:1}),markiza_otwarta:dt("mark"),markiza:dt("mark",{kas:1}),markiza_polkasetowa:dt("mark",{kas:1}),markiza_kasetowa:dt("mark",{kas:1}),markiza_volant:dt("mark",{volant:1}),markiza_koszowa:dt("mark",{kosz:1}),markiza_wolnostojaca:dt("mark"),markiza_zimowa:dt("mark",{kas:1}),markizeta:dt("mark",{kas:1}),markiza_balkonowa:dt("mark"),markiza_pionowa:dt("rol",{mat:"screen",kas:"zew",zew:1}),markiza_boczna:dt("pion",{lam:.5,panel:1,zew:1,tkan:1}),zagiel:dt("mark",{zagiel:1}),parasol:dt("mark",{zagiel:1}),pergola:dt("lam",{lam:.16,mat:"alu",zew:1,prow:1}),pergola_tkanina:dt("mark"),zadaszenie:dt("mark",{szklo:1}),screen_taras:dt("rol",{mat:"screen",kas:"zew",prow:2,zew:1}),okno_silownik:dt("okno"),okno_dachowe:dt("okno",{dach:1,srodek:1}),okno_plaskie:dt("okno"),swietlik:dt("okno",{kopula:1}),wylaz:dt("okno"),moskitiera:dt("rol",{mat:"siatka",kas:"zew",prow:1,zew:1}),moskitiera_plisa_okno:dt("har",{faldy:.02,gl:.01,siatka:1,zew:1}),moskitiera_drzwi:dt("rol",{mat:"siatka",kas:"zew",prow:1,zew:1}),moskitiera_zip_drzwi:dt("rol",{mat:"siatka",kas:"zew",prow:2,zew:1})},Mi=i=>Jp[i]||Jp.pelna,AA=i=>["pion","zas","okien"].includes(Mi(i).f),Vu=null,Yu=new Set;function jr(){if(Vu)return Vu;let i=new wr({antialias:!0,alpha:!0});i.shadowMap.enabled=!0,i.shadowMap.type=Zl,i.toneMapping=$l,i.toneMappingExposure=1.05,i.outputColorSpace=Le,i.setClearColor(0,0);let t=new Ps(i).fromScene(new fa,.04).texture;return i.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault(),Ut.wyl=!0,Ut.okno=null,Ut.kolejka.length=0}),i.domElement.addEventListener("webglcontextrestored",()=>Yu.forEach(e=>e.rysuj())),Vu={r:i,env:t}}var RA=()=>{try{let i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}},Qr={};function si(i,t,e,n,s=!0){if(Qr[i])return Qr[i];let r=document.createElement("canvas");r.width=t,r.height=e,n(r.getContext("2d"),t,e);let o=new Zo(r);return s&&(o.wrapS=o.wrapT=Xe),o.anisotropy=4,Qr[i]=o}var Gn=(i=>()=>(i=i*16807%2147483647)/2147483647)(7),bi=()=>si("splot",128,128,(i,t,e)=>{i.fillStyle="#d0d0d0",i.fillRect(0,0,t,e);for(let n=0;n<3200;n++)i.fillStyle=`rgba(${Gn()<.5?"255,255,255":"0,0,0"},.07)`,i.fillRect(Gn()*t,Gn()*e,1,2);for(let n=0;n<e;n+=2)i.fillStyle="rgba(0,0,0,.035)",i.fillRect(0,n,t,1)}),$b=()=>si("paski",4,64,i=>{i.fillStyle="#fff",i.fillRect(0,0,4,36),i.fillStyle="#3a3a3a",i.fillRect(0,36,4,28),i.fillStyle="#5a5a5a",i.fillRect(0,36,4,1),i.fillRect(0,63,4,1)}),Jb=()=>si("perfor",32,32,i=>{i.fillStyle="#fff",i.fillRect(0,0,32,32),i.fillStyle="#000";for(let t=0;t<4;t++)for(let e=0;e<2;e++)i.fillRect(4+t*8,8+e*14,3,2)}),Kb=()=>si("oczka",16,16,i=>{i.fillStyle="#222",i.fillRect(0,0,16,16),i.fillStyle="#fff",i.fillRect(0,0,16,2),i.fillRect(0,0,2,16)}),jb=()=>si("screen",16,16,i=>{i.fillStyle="#aaa",i.fillRect(0,0,16,16),i.fillStyle="#fff";for(let t=0;t<16;t+=4)i.fillRect(t,0,2,16),i.fillRect(0,t,16,2)}),Qb=()=>si("bambus",64,64,(i,t,e)=>{for(let n=0;n<e;n+=4){let s=190+Gn()*50;i.fillStyle=`rgb(${s},${s*.93},${s*.78})`,i.fillRect(0,n,t,3),i.fillStyle="rgba(60,40,20,.45)",i.fillRect(0,n+3,t,1)}for(let n=0;n<6;n++)i.fillStyle="rgba(80,60,30,.35)",i.fillRect(Gn()*t,0,1,e)}),gc=()=>si("sloje",256,32,(i,t,e)=>{i.fillStyle="#c8c8c8",i.fillRect(0,0,t,e);for(let n=0;n<40;n++){i.strokeStyle=`rgba(0,0,0,${.04+Gn()*.08})`,i.beginPath();let s=Gn()*e;i.moveTo(0,s),i.bezierCurveTo(t*.3,s+Gn()*6-3,t*.6,s+Gn()*6-3,t,s+Gn()*4-2),i.stroke()}}),tM=()=>si("ekran",64,64,i=>{i.fillStyle="#111",i.fillRect(0,0,64,64),i.fillStyle="#fff",i.fillRect(5,5,54,54)},!1),eM=()=>si("mark",64,4,i=>{i.fillStyle="#fff",i.fillRect(0,0,64,4),i.fillStyle="#c8c8c8";for(let t=0;t<64;t+=16)i.fillRect(t,0,8,4)}),Gu=new Map;function rn(i,t){return Gu.has(i)||Gu.set(i,t()),Gu.get(i)}var te=i=>{let t=new Ir(i);return i.map&&Qr.splot&&i.map===Qr.splot&&(t.sheen=.45,t.sheenRoughness=.7,t.sheenColor.set("#ffffff")),t},un=i=>rn("metal"+i,()=>te({color:i,roughness:.32,metalness:.55,envMapIntensity:1}));function Ji(i,t){let e=(()=>{let n=Te;switch(i){case"blackout":return te({color:t,roughness:.95,map:bi(),side:n});case"bambus":return te({color:t,roughness:.8,map:Qb(),side:n});case"ekran":return te({color:"#ffffff",roughness:.9,map:tM(),side:n});case"screen":return te({color:t,roughness:.9,map:jb(),transparent:!0,opacity:.8,side:n,depthWrite:!1});case"siatka":return te({color:"#444",roughness:.9,alphaMap:Kb(),transparent:!0,opacity:.55,side:n,depthWrite:!1});case"firana":return te({color:t,roughness:1,map:bi(),transparent:!0,opacity:.42,side:n,depthWrite:!1});case"mark":return te({color:t,roughness:.9,map:eM(),side:n});default:return te({color:t,roughness:.92,map:bi(),side:n,emissive:t,emissiveIntensity:.3,emissiveMap:bi()})}})();return e.emissiveMap&&(e.emissiveMap=e.emissiveMap.clone(),e.emissiveMap.needsUpdate=!0,e.userData.przeswit=e.emissiveIntensity),e.map&&(e.map=e.map.clone(),e.map.needsUpdate=!0),e.alphaMap&&(e.alphaMap=e.alphaMap.clone(),e.alphaMap.needsUpdate=!0),e}var Kp=i=>{let t=te({color:i,roughness:.93,map:bi().clone(),alphaMap:$b().clone(),transparent:!0,depthWrite:!1,side:Te});return t.alphaMap.needsUpdate=!0,t},ii=new Map,xc=(i,t,e,n=.004)=>{let s=[i,t,e,n].map(r=>r.toFixed(4)).join();return ii.has(s)||ii.set(s,new da(i,t,e,2,Math.max(5e-4,Math.min(n,i/2.2,t/2.2,e/2.2)))),ii.get(s)};function jt(i,t,e,n,s){let r=new St(xc(i,t,e,s),n);return r.castShadow=r.receiveShadow=!0,r}var Nt=(i,t,e,n)=>(i.position.set(t,e,n),i),ji=new Rs(1,1);function nM(i,t){let e="prof"+i.toFixed(4)+t;if(ii.has(e))return ii.get(e);let n=new In,s=t*.22,r=t*.96;n.moveTo(0,-r/2);for(let a=1;a<=10;a++){let c=a/10;n.lineTo(s*Math.sin(c*Math.PI),-r/2+r*c)}n.lineTo(-.002,r/2),n.lineTo(-.002,r/2-.005),n.lineTo(-.006,r/2-.005),n.lineTo(-.006,-r/2+.005),n.lineTo(-.002,-r/2+.005),n.lineTo(-.002,-r/2);let o=new ki(n,{depth:i,bevelEnabled:!1,curveSegments:4});return o.rotateY(Math.PI/2),o.translate(-i/2,0,0),o.computeVertexNormals(),ii.set(e,o),o}function iM(i,t){let e="c80"+i.toFixed(4)+t;if(ii.has(e))return ii.get(e);let n=new In,s=14,r=t/2,o=t*.11,a=.0012,c=[];for(let h=0;h<=s;h++){let f=-1+2*h/s;c.push([f*r,o*(1-f*f)])}n.moveTo(c[0][0]-.0015,c[0][1]-.002),c.forEach(([h,f])=>n.lineTo(h,f)),n.lineTo(c[s][0]+.0015,c[s][1]-.002),n.lineTo(c[s][0]+.0015-a,c[s][1]-.002);for(let h=s;h>=0;h--)n.lineTo(c[h][0],c[h][1]-a);n.lineTo(c[0][0]-.0015+a,c[0][1]-.002);let l=new ki(n,{depth:i,bevelEnabled:!1,curveSegments:2});return l.rotateY(Math.PI/2),l.translate(-i/2,0,0),l.computeVertexNormals(),ii.set(e,l),l}function sM(i,t,e,n,s,r){let o=Math.max(2,Math.round(e/n)),a=t/o,c=Math.sqrt(Math.max(0,(n/2)**2-(a/2)**2))*(s/(n/2))+.0015,l=r?6:1,h=[],f=[];for(let g=0;g<=o*l;g++){let x=g/l,d=-x*a,m=r?c*Math.sin(Math.PI*(x%1))**.8:g%2?c:0;h.push(-i/2,d,m,i/2,d,m)}for(let g=0;g<o*l;g++){let x=g*2;f.push(x,x+2,x+1,x+1,x+2,x+3)}let u=new oe;u.setAttribute("position",new de(h,3)),u.setIndex(f);let p=[];for(let g=0;g<=o*l;g++)p.push(0,g/l/o,1,g/l/o);return u.setAttribute("uv",new de(p,2)),u.computeVertexNormals(),u}function rM(i,t,e,n){let s=Math.max(24,e*8),r=[],o=[],a=[];for(let l=0;l<=s;l++){let h=l/s,f=-i/2+h*i,u=n*Math.sin(h*e*Math.PI*2);r.push(f,0,u,f,-t,u),a.push(h*e/2,1,h*e/2,0)}for(let l=0;l<s;l++){let h=l*2;o.push(h,h+1,h+2,h+2,h+1,h+3)}let c=new oe;return c.setAttribute("position",new de(r,3)),c.setAttribute("uv",new de(a,2)),c.setIndex(o),c.computeVertexNormals(),c}function oM(i,t){let e=Mi(t.typ),n=t.kol,r=e.zew||e.f==="rolz"||e.f==="okien"||e.f==="mark"?-.075:.085,o=t.gh/2+.015,a=t.gh+.03,c=t.gw+.03,l=un(t.kas||"#e9e9e7"),h=un(e.mat==="drewno"?"#6b5440":t.kas||"#e9e9e7"),f=e.zew&&e.f==="lam"?rn("prof"+n,()=>te({color:n,roughness:.42,metalness:.35})):l,u=(p,g=e.zew&&e.f==="lam"?.026:.014)=>{for(let x of[-1,1])i.add(Nt(jt(g,a+.02,p,f,.003),x*(c/2+.006-(g-.014)/2),o-a/2-.01,r))};if(e.f==="rol"){let p=e.zew?-.075:.085;if(e.kas==="kaseta"||e.kas==="zew"){i.add(Nt(jt(c+.03,.06,.055,l,.02),0,o+.03,p));for(let y of[-1,1])i.add(Nt(jt(.012,.064,.058,un("#c9cac8"),.004),y*(c/2+.018),o+.03,p))}else if(e.kas==="kwadrat")i.add(Nt(jt(c+.05,.075,.07,l,.003),0,o+.037,p));else if(e.wal){let y=new St(new ei(.03,.03,c,28).rotateZ(Math.PI/2),Ji(e.mat,n));y.castShadow=!0,i.add(Nt(y,0,o+.02,p+.012));for(let S of[-1,1])i.add(Nt(jt(.018,.07,.05,l,.006),S*(c/2+.012),o+.02,p))}else e.kas==="belka"?i.add(Nt(jt(c+.02,.03,.04,rn("belka"+n,()=>te({color:"#8a6a45",roughness:.7,map:gc()})),.006),0,o+.015,p)):i.add(Nt(new St(new ei(.022,.022,c,20).rotateZ(Math.PI/2),l),0,o+.015,p));if(e.prow&&(e.prow===3?u(.05,.04):u(e.prow===2?.03:.018,e.prow===2?.024:.014)),e.lanc)for(let y of[-.012,.012])i.add(Nt(new St(new ei(.0025,.0025,a*.6,6),un("#d8d8d6")),c/2+.028+y,o-a*.3,p+.02));let g=e.mat==="zebra",x=g?Kp(n):Ji(e.mat,n),d=new St(ji,x);d.castShadow=e.mat!=="siatka"&&e.mat!=="screen",d.receiveShadow=!0,i.add(d);let m=null;g&&(m=new St(ji,Kp(n)),i.add(m));let _=Nt(jt(c,e.cieza||e.dach?.035:e.wal?.014:.02,e.cieza||e.dach?.03:.022,e.mat==="bambus"?rn("belka"+n,()=>te({color:"#8a6a45",roughness:.7})):e.dach?un("#c9cac8"):h,e.wal?.007:.005),0,0,p);if(e.mat!=="ekran"&&i.add(_),e.uchwyt&&_.add(Nt(jt(.14,.022,.03,un("#9a9b9d"),.008),0,-.012,.018)),e.haki)for(let y of[-1,1])_.add(Nt(jt(.03,.05,.02,un("#3a3b3d"),.004),y*(c/2-.02),-.02,0));let v=x.map?.repeat;return y=>{let S=Math.max(.002,a*y);if(d.scale.set(c,S,1),d.position.set(0,o-S/2,p),g)for(let[T,M,I]of[[d,0,0],[m,-.008,.08]])T.material.alphaMap.repeat.set(1,S/.09),T.material.alphaMap.offset.y=I,T.scale.set(c,S,1),T.position.set(0,o-S/2,p+M);if(v){let T=e.mat==="ekran"?1:1/(e.mat==="bambus"?.25:.12);v.set(e.mat==="ekran"?1:c*T,e.mat==="ekran"?1:S*T)}_.position.y=o-S-.01}}if(e.f==="har"){let p=e.zew?-.06:.085,g=e.siatka?Ji("siatka",n):te({color:n,roughness:e.plaster?.97:.88,map:bi().clone(),side:Te}),x=jt(c,.022,.03,l,.006),d=jt(c,.022,.03,l,.006);i.add(Nt(x,0,o+.011,p)),i.add(d),e.uchwyt&&d.add(Nt(jt(.14,.022,.03,un("#9a9b9d"),.008),0,-.014,.018)),e.prow&&u(.018);let m=null;return _=>{let v=Math.max(.004,a*_);m&&(i.remove(m),m.geometry.dispose()),m=new St(sM(c-.004,v,a,e.faldy,e.gl,e.miekka),g),g.map&&g.map.repeat.set(c*6,a*6),m.position.set(0,o,p-.01),m.castShadow=!e.siatka,m.receiveShadow=!0,i.add(m),d.position.set(0,o-v-.011,p)}}if(e.f==="lam"){let p=e.zew?-.09:.085,g=e.lam,x=Math.max(3,Math.round(a/(g*.85))),d=a/x,m=e.mat==="drewno"?rn("drewno"+n,()=>te({color:n,roughness:.62,map:gc()})):rn("lam"+n,()=>te({color:n,roughness:.35,metalness:.45,envMapIntensity:1.1})),_=e.z?xc(c,g,.004,.0015):new ei(g*1.6,g*1.6,c,24,1,!0,-Math.asin(.31),2*Math.asin(.31)).rotateZ(Math.PI/2).translate(0,0,-g*1.52),v=e.zew&&!e.z&&!e.plaska,y=new Is(v?iM(c,g):e.plaska||e.mat==="drewno"?xc(c,g,e.mat==="drewno"?.005:.003,.0015):_,m,x);y.castShadow=y.receiveShadow=!0,i.add(y),e.mat==="alu"&&!e.plaska&&!e.z&&(y.material.side=Te);let S=e.zew?rn("prof"+n,()=>te({color:n,roughness:.42,metalness:.35})):l;i.add(Nt(jt(c+.01,e.zew?.1:.03,e.zew?.12:.035,S,.006),0,o+(e.zew?.05:.015),p));let T=Nt(jt(c,.018,g*.9,h,.005),0,0,p);i.add(T),e.uchwyt&&T.add(Nt(jt(.14,.022,.03,un("#9a9b9d"),.008),0,-.014,.018)),e.prow&&u(.02);let M=rn(e.tasma?"tasma"+n:"sznur",()=>te({color:e.tasma?n:"#e8e8e4",roughness:.9})),I=e.zew?rn("linka",()=>te({color:"#2a2b2d",roughness:.8})):M,b=[-1,1].flatMap(L=>(e.zew?[1,-1]:[1]).map(D=>{let B=new St(ji,I);return B.position.x=L*c*.32,B.position.z=p+D*g*.5,i.add(B),B})),w=new Ne;return L=>{let D=Math.round(x*L),B=e.mat==="drewno"?.007:e.zew?.012:.0035,C=v?-.62:e.zew?.9:1.15-.25*L;for(let O=0;O<x;O++){if(O<x-D)w.position.set(0,o-.03-O*B,p),w.rotation.set(0,0,0);else{let W=O-(x-D);w.position.set(0,o-.03-(x-D)*B-(W+.5)*d,p),w.rotation.set(C,0,0)}w.updateMatrix(),y.setMatrixAt(O,w.matrix)}y.instanceMatrix.needsUpdate=!0;let N=o-.03-(x-D)*B-D*d-.012;T.position.y=N,b.forEach(O=>{let W=Math.max(.002,o-N);O.scale.set(e.tasma?.025:e.zew?.0025:.003,W,1),O.position.y=o-W/2,O.visible=D>0})}}if(e.f==="rolz"){let p=e.prof||.039,g=Math.ceil(a/p)+1,x=e.perf?te({color:n,roughness:.4,metalness:.3,alphaMap:Jb().clone(),alphaTest:.5,side:Te}):rn("prof"+n,()=>te({color:n,roughness:.42,metalness:.35}));e.perf&&x.alphaMap.repeat.set(c/.06,1);let d=new Is(nM(c,p),x,g);d.castShadow=d.receiveShadow=!0,i.add(d);let m=rn("skrz"+n,()=>te({color:n,roughness:.45,metalness:.3}));if(e.skrz==="natynk"){let T=new In([new Y(0,0),new Y(.12,0),new Y(.165,.045),new Y(.165,.165),new Y(0,.165)]),M=new ki(T,{depth:c+.05,bevelEnabled:!0,bevelSize:.003,bevelThickness:.003,bevelSegments:2});M.rotateY(Math.PI/2),M.translate(-(c+.05)/2,0,0),M.computeVertexNormals();let I=new St(M,m);I.position.set(0,o-.005,r+.07),I.castShadow=I.receiveShadow=!0,i.add(I)}e.skrz==="okragla"&&i.add(Nt(new St(new ei(.09,.09,c+.05,32).rotateZ(Math.PI/2),m),0,o+.07,r-.04)),e.skrz==="nadstawna"&&i.add(Nt(jt(c+.05,.05,.2,m,.01),0,o+.025,r));let _=rn("kanal",()=>te({color:"#1b1c1e",roughness:.8}));for(let T of[-1,1])i.add(Nt(jt(.04,a+.06,.05,m,.006),T*(c/2+.012),o-a/2+.03,r)),i.add(Nt(jt(.012,a+.06,.052,_,.002),T*(c/2-.002),o-a/2+.03,r));let v=new nn;v.add(Nt(jt(c,.045,.024,m,.006),0,.012,0),Nt(jt(c-.01,.007,.016,_,.002),0,-.013,0)),v.position.z=r,i.add(v);let y=null;e.siatka&&(y=new St(ji,Ji("siatka",n)),y.scale.set(c,a,1),y.position.set(0,o-a/2,r+.02),i.add(y));let S=new Ne;return T=>{let M=a*T;for(let I=0;I<g;I++){let b=o-M+(I+.5)*p;S.position.set(0,b,r),S.scale.setScalar(b<o+p*.5?1:0),S.updateMatrix(),d.setMatrixAt(I,S.matrix)}d.instanceMatrix.needsUpdate=!0,v.position.y=o-M}}if(e.f==="pion"){let p=e.zew?-.09:.1,g=Math.max(2,Math.round(c/(e.lam*.85))),x=a+.02,d=e.tkan?Ji("tkanina",n):te({color:n,roughness:.9,map:bi().clone(),side:Te}),m=new Is(xc(e.lam,x,.003,.001),d,g);m.castShadow=m.receiveShadow=!0,i.add(m),i.add(Nt(jt(c+.03,.035,.05,l,.006),0,o+.02,p));let _=new Ne,v=-c/2+e.lam/2,y=(c-e.lam)/(g-1);return S=>{for(let T=0;T<g;T++){let M=v+T*(e.panel?.02:.016);_.position.set(M+(v+T*y-M)*S,o-x/2,p+(e.panel?T*.012:0)),_.rotation.set(0,e.panel?0:(1-S)*1.35+.12,0),_.updateMatrix(),m.setMatrixAt(T,_.matrix)}m.instanceMatrix.needsUpdate=!0}}if(e.f==="zas"){let g=t.gh+.2,x=c/2,d=Math.max(3,Math.round(x/(e.wave?.12:.09))),m=e.firana?Ji("firana",n):te({color:n,roughness:.95,map:bi().clone(),side:Te});i.add(Nt(new St(new ei(.012,.012,c+.3,16).rotateZ(Math.PI/2),un("#9a9a98")),0,o+.12,.16));let _=[null,null];return v=>{let y=Math.max(.1,x*(.18+.82*v)),S=Math.min(.06,(e.wave?.028:.02)*x/y);_.forEach((T,M)=>{T&&(i.remove(T),T.geometry.dispose());let I=new St(rM(y,g,d,S),m);I.castShadow=!e.firana,I.receiveShadow=!0,m.map&&m.map.repeat.set(4,g*6),I.position.set(M?c/2-y/2:-(c/2-y/2),o+.1,.16),i.add(I),_[M]=I})}}if(e.f==="okien"){let g=c/2+.02,x=a+.06,d=rn("okien"+n,()=>te({color:n,roughness:.55,map:gc()})),m=[-1,1].map(_=>{let v=new nn;v.position.set(_*(c/2+.03),o-a/2,-.1),i.add(v);let y=new nn;y.position.x=-_*g/2,v.add(y);for(let[T,M,I,b]of[[g,.06,0,x/2-.03],[g,.06,0,-x/2+.03],[.06,x,-g/2+.03,0],[.06,x,g/2-.03,0],[g,.05,0,0]])y.add(Nt(jt(T,M,.03,d,.005),I,b,0));let S=Math.floor((x-.12)/.045);for(let T=0;T<S;T++){let M=jt(g-.1,.05,.006,d,.002);M.rotation.x=.7,y.add(Nt(M,0,-x/2+.07+T*.045,0))}return v});return _=>m.forEach((v,y)=>{let S=y?1:-1;e.przesuw?(v.rotation.y=0,v.position.x=S*(c/2+.03)+S*g*(1-_)*1.05):v.rotation.y=S*(1-_)*2.6})}if(e.f==="mark"){let g=e.szklo?te({color:"#cfe3ea",roughness:.05,transparent:!0,opacity:.25}):Ji("mark",n);g.map&&g.map.repeat.set(c*3,1);let x=new nn;x.position.set(0,o+.05,-.2),i.add(x),e.kas&&i.add(Nt(jt(c+.1,.12,.14,un("#e9e9e7"),.02),0,o+.1,-.2));let d=new St(ji,g);d.castShadow=!0,x.add(d);let m=jt(c+.06,.04,.05,un("#e9e9e7"),.01);x.add(m);let _=e.volant?new St(ji,g):null;return _&&x.add(_),v=>{let y=.05+1.5*v,S=.35+.45*v;x.rotation.x=-S,d.scale.set(c+.04,y,1),d.position.set(0,0,-y/2),d.rotation.x=-Math.PI/2,m.position.set(0,0,-y),_&&(_.scale.set(c+.04,.18,1),_.position.set(0,-.09,-y),_.rotation.x=S)}}return()=>{}}var yc=class{constructor(t,e={}){Yu.add(this),this.host=t,this.cv=document.createElement("canvas"),this.cv.style.cssText="display:block;width:100%;height:100%;pointer-events:none",t.prepend(this.cv),this.ctx=this.cv.getContext("2d"),this.scena=new Pn,this.scena.environment=jr().env,this.cam=new De(24,1,.05,60);let n=this.slonce=new ia("#fff6ea",2.3);n.position.set(-2.4,3.2,4.2),n.castShadow=!0,n.shadow.mapSize.set(1536,1536),n.shadow.radius=5,n.shadow.bias=-4e-4,n.shadow.normalBias=.01,Object.assign(n.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.5,far:15}),this.nieboL=new ta("#ffffff","#b9b2a8",.55),this.scena.add(n,this.nieboL),this.widokM=new Hn({color:"#cfe0ea",toneMapped:!1}),this.ruchy=[],this.opt={},this._ro=new ResizeObserver(()=>this.rysuj()),this._ro.observe(t),e&&this.ustaw(e)}ustaw(t){let e=JSON.stringify([t.pola,t.typy,t.kolory,t.rama,t.W,t.H,t.margines,t.sciana,t.kas,t.uchyl,t.strona]);this.opt=t,e!==this._klucz&&(this._klucz=e,this._zbuduj()),this.pozycje(t.pozycje||[]),this.swiatlo(t.jasnosc??1)}_zbuduj(){let t=this.opt,e=t.W,n=t.H,s=.07,r=.06,o=t.margines||0;this.grupa&&this.scena.remove(this.grupa);let a=this.grupa=new nn;this.scena.add(a);let c=t.rama||"#f4f4f2",l=rn("rama"+c+!!t.drewno,()=>te({color:c,roughness:t.drewno?.6:.36,metalness:0,envMapIntensity:.8,map:t.drewno?gc():null})),h=rn("szyba",()=>new Ir({color:"#dfeef6",roughness:.02,transparent:!0,opacity:.1,envMapIntensity:1.6,depthWrite:!1}));if(o>0&&t.sciana){let M=new In([new Y(-e*3,-n*3),new Y(e*3,-n*3),new Y(e*3,n*3),new Y(-e*3,n*3)]);M.holes.push(new Oi([new Y(-e/2,-n/2),new Y(-e/2,n/2),new Y(e/2,n/2),new Y(e/2,-n/2)]));let I=new St(new Pr(M),te({color:t.sciana||"#ebe8e3",roughness:.95}));I.position.z=.14,I.receiveShadow=!0,a.add(I);let b=te({color:t.sciana||"#e4e1dc",roughness:.95});for(let[w,L,D,B]of[[e,.002,0,n/2],[.002,n,-e/2,0],[.002,n,e/2,0]]){let C=Nt(new St(new vn(w,L,.22),b),D,B,.03);C.receiveShadow=!0,a.add(C)}}let f=t.strona==="zew";if(f&&o>0&&t.sciana){let M=new In([new Y(-e*3,-n*3),new Y(e*3,-n*3),new Y(e*3,n*3),new Y(-e*3,n*3)]);M.holes.push(new Oi([new Y(-e/2,-n/2),new Y(-e/2,n/2),new Y(e/2,n/2),new Y(e/2,-n/2)]));let I=te({color:t.sciana,roughness:.95,side:Te}),b=new St(new Pr(M),I);b.position.z=-.3,b.receiveShadow=!0,a.add(b);for(let[B,C,N,O]of[[e,.002,0,n/2],[.002,n,-e/2,0],[.002,n,e/2,0]]){let W=Nt(new St(new vn(B,C,.3),I),N,O,-.15);W.receiveShadow=!0,a.add(W)}let w=new In([new Y(0,0),new Y(-.36,-.025),new Y(-.36,-.06),new Y(-.37,-.06),new Y(-.37,-.02),new Y(0,.012)]),L=new ki(w,{depth:e+.06,bevelEnabled:!1});L.rotateY(-Math.PI/2),L.translate((e+.06)/2,0,0);let D=new St(L,te({color:"#a4a7aa",roughness:.3,metalness:.7}));D.position.y=-n/2,D.castShadow=D.receiveShadow=!0,a.add(D)}else o>0&&a.add(Nt(jt(e+.14,.03,.2,te({color:"#f2f1ee",roughness:.4}),.008),0,-n/2-.015,.1));let u=n/(1-2*o),p=u/2/Math.tan(Xf.degToRad(this.cam.fov/2)),g=1.4,x=(p+.04+g)/(p+.04),d=(e-.02)*x,m=(n-.02)*x,_=Math.max(d/1.5,m),v=new Rs(d,m),y=v.attributes.uv;for(let M=0;M<y.count;M++)y.setXY(M,.5+(y.getX(M)-.5)*d/(_*1.5),.5+(y.getY(M)-.5)*m/_);if(this.widok=Nt(new St(v,this.widokM),0,0,-g),a.add(this.widok),f){this.widok.visible=!1;let M=Nt(new St(new vn(o>0&&t.sciana?e+1:e-.02,o>0&&t.sciana?n+1:n-.02,2),te({color:o>0&&t.sciana?"#7d766c":"#4b4945",roughness:.9,side:Ee})),0,0,1.1);a.add(M)}a.add(Nt(jt(e,s,.08,l),0,n/2-s/2,0),Nt(jt(e,s,.08,l),0,-n/2+s/2,0),Nt(jt(s,n,.08,l),-e/2+s/2,0,0),Nt(jt(s,n,.08,l),e/2-s/2,0,0));let S=e-2*s,T=n-2*s;this.ruchy=[],this.skrz=[],(t.pola||[[0,0,1,1]]).forEach(([M,I,b,w],L)=>{let D=-S/2+M*S,B=T/2-I*T,C=b*S,N=w*T,O=new nn;O.position.set(D+C/2,B,.005),a.add(O);let W=new nn;W.position.y=-N/2,O.add(W),W.add(Nt(jt(C,r,.07,l),0,N/2-r/2,0),Nt(jt(C,r,.07,l),0,-N/2+r/2,0),Nt(jt(r,N,.07,l),-C/2+r/2,0,0),Nt(jt(r,N,.07,l),C/2-r/2,0,0));let Z=t.typy?.[L]||"pelna",q=Mi(Z).dach,j=C-2*r,K=N-2*r-(q?.05:0),ct=new St(ji,h);ct.scale.set(j,K,1),ct.position.y=q?-.025:0,W.add(ct);let X=new nn;X.position.y=q?-.025:0,W.add(X),q?(W.add(Nt(jt(C-r*2,.05,.035,l,.008),0,N/2-r-.025,.045)),W.add(Nt(jt((C-r*2)*.72,.028,.03,un("#a8a9ab"),.01),0,N/2-r-.028,.07))):N>.8&&C>.3&&W.add(Nt(jt(.024,.14,.03,un(c==="#f4f4f2"?"#f4f4f2":"#b8b8b8"),.008),(M+b/2<=.5?1:-1)*(C/2-r/2),-.04,.05)),this.skrz.push({piv:O,typ:Z}),this.ruchy.push(oM(X,{gw:j,gh:K,typ:Z,kol:t.kolory?.[L]||"#e6dcc8",kas:t.kas}))}),this.cam.position.set(0,0,f?-(.34+p):.04+p),this.cam.lookAt(0,0,f?-.3:0),this.slonce.position.set(-2.4,3.2,f?-4.2:4.2),this._poz=null}pozycje(t){let e=JSON.stringify(t);e!==this._poz&&(this._poz=e,this.ruchy.forEach((n,s)=>{let r=Math.max(0,Math.min(100,+(t[s]??t[0]??100))),o=this.skrz[s];Mi(o.typ).f==="okno"?(o.piv.rotation.x=r/100*.45,n(0)):(o.piv.rotation.x=0,n(1-r/100))}),this.rysuj())}widokZ(t){if(t!==this._url){if(this._url=t,!t)return this.widokM.map=null,this.widokM.needsUpdate=!0,this.rysuj();new Qo().load(t,e=>{this._url===t&&(e.colorSpace=Le,this.widokM.map=e,this.widokM.color.set("#ffffff").multiplyScalar(this._jas??1),this.widokM.needsUpdate=!0,this.rysuj())})}}swiatlo(t){t!==this._jas&&(this._jas=t,this.slonce.intensity=2.3*Math.max(.25,t),this.nieboL.intensity=.55*Math.max(.4,t),this.grupa?.traverse(e=>{let n=e.material?.userData?.przeswit;n&&(e.material.emissiveIntensity=n*t)}),this.widokM.map?this.widokM.color.set("#ffffff").multiplyScalar(t):this.widokM.color.set("#cfe0ea").multiplyScalar(t),this.rysuj())}prostokaty(){let t=this.opt;return $p(t.pola||[[0,0,1,1]],t.W,t.H,t.margines||0)}rysuj(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=null;let t=this.host.clientWidth,e=this.host.clientHeight;if(!t||!e||!this.grupa)return;let n=Math.min(2,window.devicePixelRatio||1);this._klatka(Math.round(t*n),Math.round(e*n)),fM(this)}))}_klatka(t,e){let{r:n}=jr();n.getContext().isContextLost()||(n.setPixelRatio(1),n.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix(),n.render(this.scena,this.cam),(this.cv.width!==t||this.cv.height!==e)&&(this.cv.width=t,this.cv.height=e),this._kopiuj(n.domElement,t,e))}_kopiuj(t,e,n){if(jr().r.getContext().isContextLost())return;let s=this.ctx;s.clearRect(0,0,e,n),this.opt.strona==="zew"?(s.save(),s.scale(-1,1),s.drawImage(t,-e,0),s.restore()):s.drawImage(t,0,0)}przenies(t){t!==this.host&&(this._ro.disconnect(),this.host=t,t.prepend(this.cv),this._ro.observe(t),this.rysuj())}zniszcz(){Yu.delete(this),this._ro.disconnect(),cancelAnimationFrame(this._raf),this.cv.remove(),Ut.okno===this&&(Ut.okno=null)}},Wu=new Map,aM=i=>{let t=Mi(i);return!t.dach&&(t.zew||["rolz","mark","okien"].includes(t.f))},Nn=null;function CA(i,t,e,n,s=240,r=200){let o=[i,t,e].join("|");if(Wu.has(o))return Wu.get(o);let a=Mi(i).f,c=a==="okno"?80:["pion","zas","okien"].includes(a)?45:a==="mark"?35:50;Nn||(Nn=new yc(document.createElement("div"),null));let l=Mi(i).dach,h=aM(i);if(Nn.ustaw({pola:[[0,0,1,1]],typy:[i],kolory:[t],rama:e,W:l?.9:1.32,H:l?1.4:1.1,margines:.07,pozycje:[c],strona:h?"zew":void 0}),n&&!Nn.widokM.map&&performance.now()-Zu<4e3)return null;Nn._klatka(s*2,r*2);let f=document.createElement("canvas");f.width=s*2,f.height=r*2;let u=f.getContext("2d");u.drawImage(Nn.cv,0,0),cM(u,Nn,i,s*2,r*2);let p=f.toDataURL("image/webp",.9);return Wu.set(o,p),p}function cM(i,t,e,n,s){let r=Mi(e).f;if(["zas","pion","okien"].includes(r))return;let o=t.opt,a=t.cam,c=a.position.clone(),l=a.fov,h=Math.round(s*.25),f=o.W/2-.07-.1,u=o.H/2-.07-(r==="mark"?-.05:.1),p=o.strona==="zew";a.position.set(f-.42,u-.3,p?-.85:.75),a.fov=20,a.lookAt(f,u,p?-.12:.05),t._klatka(h*2,h*2);let g=n-h-n*.035,x=h+s*.045;i.save(),i.beginPath(),i.arc(g,x,h,0,Math.PI*2),i.closePath(),i.shadowColor="rgba(0,0,0,.35)",i.shadowBlur=h*.12,i.fillStyle="#fff",i.fill(),i.shadowColor="transparent",i.clip(),i.fillStyle="#e9ecef",i.fillRect(g-h,x-h,h*2,h*2),i.drawImage(t.cv,g-h,x-h,h*2,h*2),i.restore(),i.beginPath(),i.arc(g,x,h,0,Math.PI*2),i.lineWidth=Math.max(2,h*.06),i.strokeStyle="#fff",i.stroke(),a.position.copy(c),a.fov=l,a.lookAt(0,0,p?-.3:0),a.updateProjectionMatrix()}var Zu=0;function PA(i){Zu||(Zu=performance.now()),Nn||(Nn=new yc(document.createElement("div"),null)),Nn.widokZ(i)}var Ut={pt:null,okno:null,kolejka:[],wyl:!0,t:0,start:0,raf:0,gotowe:new WeakSet},lM=40,uM=400;try{Ut.wyl=localStorage.getItem("motor_ha_dokladny")!=="1"}catch{}for(let i of["environmentRotation","backgroundRotation"])!(i in Pn.prototype)&&!(i in new Pn)&&(Pn.prototype[i]=new Es);var Ki=null,hM=()=>Ki||(Ki=new sr,Ki.topColor.set("#dfe9f3"),Ki.bottomColor.set("#8f8a82"),Ki.update(),Ki);function fM(i){Ut.wyl||!i.host.isConnected||i===Nn||(Ut.gotowe.delete(i),Ut.okno===i&&(Ut.okno=null),clearTimeout(i._ptT),i._ptT=setTimeout(()=>{Ut.kolejka.includes(i)||Ut.kolejka.push(i),vc()},uM))}function vc(){if(Ut.okno||Ut.raf)return;for(;Ut.kolejka.length&&!Ut.kolejka[0].host.isConnected;)Ut.kolejka.shift();let i=Ut.kolejka.shift();i&&dM(i)&&(Ut.okno=i,Ut.start=performance.now(),Ut.raf=requestAnimationFrame(jp))}function dM(i){let{r:t}=jr();try{if(!t.capabilities.isWebGL2)throw new Error("brak WebGL2");Ut.pt||(Ut.pt=Object.assign(new mc(t),{renderDelay:0,minSamples:1,fadeDuration:0,rasterizeScene:!1,dynamicLowRes:!1})),Ut.pt.tiles.set(2,2),Ut.pt.bounces=5,Ut.pt.filterGlossyFactor=.5;let e=i.scena,n=[],s=[];e.updateMatrixWorld(!0),e.traverse(c=>{if(c.isInstancedMesh&&c.visible){let l=[],h=new Et;for(let f=0;f<c.count;f++){if(c.getMatrixAt(f,h),Math.abs(h.determinant())<1e-12)continue;let u=c.geometry.clone();u.applyMatrix4(h),l.push(u.index?u.toNonIndexed():u)}if(l.length){let f=new St(rd(l),c.material);c.parent.add(f),f.position.copy(c.position),f.quaternion.copy(c.quaternion),f.scale.copy(c.scale),s.push(f)}n.push(()=>{c.visible=!0}),c.visible=!1}else if(c.isMesh&&c.material?.isMeshBasicMaterial){let l=c.material;c.material=new fi({color:"#000",emissive:l.color,emissiveMap:l.map,emissiveIntensity:1.1}),n.push(()=>{c.material.dispose(),c.material=l})}else c.isHemisphereLight&&(n.push(()=>{c.visible=!0}),c.visible=!1)});let r=e.environment;e.environment=hM(),e.environmentIntensity=.9;let o=i.cv.width,a=i.cv.height;return!o||!a?!1:(t.setSize(o,a,!1),i.cam.aspect=o/a,i.cam.updateProjectionMatrix(),Ut.pt.setScene(e,i.cam),e.environment=r,e.environmentIntensity=1,s.forEach(c=>{c.parent.remove(c),c.geometry.dispose()}),n.forEach(c=>c()),Ut.rozmiar=[o,a],!0)}catch(e){return _c(e),!1}}function jp(){Ut.raf=0;let i=Ut.okno;if(!i)return vc();if(!i.host.isConnected)return Ut.okno=null,vc();let{r:t}=jr(),[e,n]=Ut.rozmiar;try{(t.domElement.width!==e||t.domElement.height!==n)&&(t.setSize(e,n,!1),Ut.pt.reset()),Ut.pt.renderSample()}catch(o){return _c(o)}let s=Ut.pt.samples,r=performance.now()-Ut.start;if(s<2&&r>8e3)return _c(new Error("za wolno"));if(s>=4&&Number.isInteger(s)&&i.cv.width===e&&i.cv.height===n){if(s===4&&!pM(t.domElement))return _c(new Error("pusty obraz")),i._klatka(e,n);i._kopiuj(t.domElement,e,n)}if(s>=lM)return Ut.gotowe.add(i),Ut.okno=null,vc();Ut.raf=requestAnimationFrame(jp)}var Xu=null;function pM(i){try{Xu||(Xu=Object.assign(document.createElement("canvas"),{width:16,height:16}));let t=Xu.getContext("2d",{willReadFrequently:!0});t.clearRect(0,0,16,16),t.drawImage(i,0,0,16,16);let e=t.getImageData(0,0,16,16).data,n=0,s=0;for(let r=0;r<e.length;r+=4)n+=e[r]+e[r+1]+e[r+2],s+=e[r+3];return s/256>128&&n/768>12}catch{return!1}}function _c(i){console.warn("Motor HA: obraz dokładny wyłączony, zostaje zwykłe 3D –",i?.message||i,i?.stack),Ut.wyl=!0,Ut.okno=null,Ut.kolejka.length=0}var IA=()=>!Ut.wyl;export{Jp as MODELE,yc as Okno3D,IA as dokladny,RA as dziala,CA as kafel,Mi as model,AA as naBoki,PA as widokKafli};
