import*as t from"three";function e(e,i){const s=new t.Matrix4,r=new t.Ray,a=new t.Sphere,o=new t.Vector3,n=this.geometry;if(a.copy(n.boundingSphere),a.applyMatrix4(this.matrixWorld),!1===e.ray.intersectSphere(a,o))return;s.getInverse(this.matrixWorld),r.copy(e.ray).applyMatrix4(s);const h=new t.Vector3,u=new t.Vector3,l=new t.Vector3,p=this instanceof t.LineSegments?2:1,c=n.index,f=n.attributes;if(null!==c){const t=c.array,s=f.position.array,a=f.width.array;for(let n=0,c=t.length-1;n<c;n+=p){const p=t[n],f=t[n+1];h.fromArray(s,3*p),u.fromArray(s,3*f);const d=null!=a[Math.floor(n/3)]?a[Math.floor(n/3)]:1,m=e.params.Line.threshold+this.material.lineWidth*d/2,y=m*m;if(r.distanceSqToSegment(h,u,o,l)>y)continue;o.applyMatrix4(this.matrixWorld);const v=e.ray.origin.distanceTo(o);v<e.near||v>e.far||(i.push({distance:v,point:l.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this}),n=c)}}}function i(t,e,i,s,r){let a;if(t=t.subarray||t.slice?t:t.buffer,i=i.subarray||i.slice?i:i.buffer,t=e?t.subarray?t.subarray(e,r&&e+r):t.slice(e,r&&e+r):t,i.set)i.set(t,s);else for(a=0;a<t.length;a++)i[a+s]=t[a];return i}class s extends t.BufferGeometry{constructor(){super(),this.type="MeshLine",this.isMeshLine=!0,this.positions=[],this.raycast=e,this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],this.counters=[],this.customColor=[],this._points=[],this._geom=null,this.widthCallback=null,this.colorCallback=null,this.matrixWorld=new t.Matrix4,Object.defineProperties(this,{geometry:{enumerable:!0,get(){return this}},geom:{enumerable:!0,get(){return this._geom},set(t){this.setGeometry(t,this.widthCallback)}},points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setGeometry(e,i){this._geometry=e,e instanceof t.BufferGeometry?this.setPoints(e.getAttribute("position").array,i):this.setPoints(e,i)}setPoints(e,i,s){if(e instanceof Float32Array||e instanceof Array){if(this._points=e,this.widthCallback=i,this.colorCallback=s,e.length&&e[0]instanceof t.Vector3){let t=6*e.length,i=2*e.length;this.positions.length!==t&&(this.positions=Array(t)),this.counters.length!==i&&(this.counters=Array(i));let s=Array(3);for(var r=0;r<e.length;r++){const t=e[r];var a=r/e.length;let i=6*r;s[0]=t.x,s[1]=t.y,s[2]=t.z,this.setElementsArray(this.positions,i,s,0,3),this.setElementsArray(this.positions,i+3,s,0,3);let o=2*r;this.counters[o]=a,this.counters[o+1]=a}}else{let t=2*e.length,i=2*e.length/3;this.positions.length!==t&&(this.positions=Array(t)),this.counters.length!==i&&(this.counters=Array(i));for(r=0;r<e.length;r+=3){a=r/e.length;let t=2*r;this.setElementsArray(this.positions,t,e,r,3),this.setElementsArray(this.positions,t+3,e,r,3);let i=2*r/3;this.counters[i]=a,this.counters[i+1]=a}}this.process()}else console.error("ERROR: The BufferArray of points is not instancied correctly.")}compareV3(t,e){const i=6*t,s=6*e;return this.positions[i]===this.positions[s]&&this.positions[i+1]===this.positions[s+1]&&this.positions[i+2]===this.positions[s+2]}copyV3(t){const e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const e=this.positions.length/6;let i,s,r;this.previous.length!==6*e&&(this.previous=Array(6*e)),this.next.length!==6*e&&(this.next=Array(6*e)),this.side.length!==2*e&&(this.side=Array(2*e)),this.width.length!==2*e&&(this.side=Array(2*e)),this.indices_array.length!==6*(e-1)&&(this.indices_array=Array(6*(e-1))),this.uvs.length!==4*e&&(this.uvs=Array(4*e)),this.customColor.length!==8*e&&(this.customColor=Array(8*e)),s=this.compareV3(0,e-1)?this.copyV3(e-2):this.copyV3(0),this.setElementsArray(this.previous,0,s,0,3),this.setElementsArray(this.previous,3,s,0,3);let a=Array(3);for(let t=0;t<e;t++){this.side[2*t]=1,this.side[2*t+1]=-1,a[0]=this.positions[3*t],a[1]=this.positions[3*t+1],a[2]=this.positions[3*t+2],i=this.widthCallback?this.widthCallback(t/(e-1),a):1,this.width[2*t]=i,this.width[2*t+1]=i,r=this.colorCallback?this.colorCallback(t/(e-1),a):[-1,0,0,0],this.setElementsArray(this.customColor,4*t,r,0,4),this.setElementsArray(this.customColor,4*(t+1),r,0,4);let o=t/(e-1);if(this.uvs[4*t]=o,this.uvs[4*t+1]=0,this.uvs[4*t+2]=o,this.uvs[4*t+3]=1,s=this.copyV3(t),t<e-1){this.setElementsArray(this.previous,6*(t+1),s,0,3),this.setElementsArray(this.previous,6*(t+1)+3,s,0,3);const e=2*t;this.indices_array[6*t]=e,this.indices_array[6*t+1]=e+1,this.indices_array[6*t+2]=e+2,this.indices_array[6*t+3]=e+2,this.indices_array[6*t+4]=e+1,this.indices_array[6*t+5]=e+3}t>0&&(this.setElementsArray(this.next,6*(t-1),s,0,3),this.setElementsArray(this.next,6*(t-1)+3,s,0,3))}s=this.compareV3(e-1,0)?this.copyV3(1):this.copyV3(e-1),this.setElementsArray(this.next,6*(e-1),s,0,3),this.setElementsArray(this.next,6*(e-1)+3,s,0,3),this._attributes&&this._attributes.position.count===this.positions.length?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0,this._attributes.customColor.copyArray(new Float32Array(this.customColor)),this._attributes.customColor.needsUpdate=!0):this._attributes={position:new t.BufferAttribute(new Float32Array(this.positions),3),previous:new t.BufferAttribute(new Float32Array(this.previous),3),next:new t.BufferAttribute(new Float32Array(this.next),3),side:new t.BufferAttribute(new Float32Array(this.side),1),width:new t.BufferAttribute(new Float32Array(this.width),1),uv:new t.BufferAttribute(new Float32Array(this.uvs),2),index:new t.BufferAttribute(new Uint16Array(this.indices_array),1),counters:new t.BufferAttribute(new Float32Array(this.counters),1),customColor:new t.BufferAttribute(new Float32Array(this.customColor),4)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("customColor",this._attributes.customColor),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:s}){const r=this._attributes.position.array,a=this._attributes.previous.array,o=this._attributes.next.array,n=r.length;i(r,0,a,0,n),i(r,6,r,0,n-6),r[n-6]=t,r[n-5]=e,r[n-4]=s,r[n-3]=t,r[n-2]=e,r[n-1]=s,i(r,6,o,0,n-6),o[n-6]=t,o[n-5]=e,o[n-4]=s,o[n-3]=t,o[n-2]=e,o[n-1]=s,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}setElementsArray(t,e,i,s,r){for(let a=0;a<r;a++)t[e+a]=i[s+a]}}t.ShaderChunk.meshline_vert=["","#include <common>","",t.ShaderChunk.logdepthbuf_pars_vertex,t.ShaderChunk.fog_pars_vertex,"","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute float counters;","attribute vec4 customColor;","","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float sizeAttenuation;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    float aspect = resolution.x / resolution.y;","","    if ( customColor.x >= 0.0) vColor = customColor;","    else vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","    float w = lineWidth * width;","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );","    normal.xy *= .5 * w;","    normal *= projectionMatrix;","    if( sizeAttenuation == 0. ) {","        normal.xy *= finalPosition.w;","        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;","    }","","    finalPosition.xy += normal.xy * side;","","    gl_Position = finalPosition;","",t.ShaderChunk.logdepthbuf_vertex,t.ShaderChunk.fog_vertex&&"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",t.ShaderChunk.fog_vertex,"}"].join("\n"),t.ShaderChunk.meshline_frag=["",t.ShaderChunk.fog_pars_fragment,t.ShaderChunk.logdepthbuf_pars_fragment,"","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","",t.ShaderChunk.logdepthbuf_fragment,"","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = c;","",t.ShaderChunk.fog_fragment,"}"].join("\n");class r extends t.ShaderMaterial{constructor(e){super({uniforms:Object.assign({},t.UniformsLib.fog,{lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new t.Color(16777215)},opacity:{value:1},resolution:{value:new t.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new t.Vector2(1,1)}}),vertexShader:t.ShaderChunk.meshline_vert,fragmentShader:t.ShaderChunk.meshline_frag}),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(t){this.uniforms.color.value=t}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(t){this.uniforms.useDash.value=t}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(e)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}export{s as MeshLine,r as MeshLineMaterial,e as MeshLineRaycast};
