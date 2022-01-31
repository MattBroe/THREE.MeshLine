!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MeshLine={},t.THREE)}(this,(function(t,e){"use strict";function s(t){if(t&&t.__esModule)return t;var e={__proto__:null,[Symbol.toStringTag]:"Module"};return t&&Object.keys(t).forEach((function(s){if("default"!==s){var i=Object.getOwnPropertyDescriptor(t,s);Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:function(){return t[s]}})}})),e.default=t,Object.freeze(e)}var i=s(e);function r(t,e){const s=new i.Matrix4,r=new i.Ray,o=new i.Sphere,a=new i.Vector3,n=this.geometry;if(o.copy(n.boundingSphere),o.applyMatrix4(this.matrixWorld),!1===t.ray.intersectSphere(o,a))return;s.getInverse(this.matrixWorld),r.copy(t.ray).applyMatrix4(s);const h=new i.Vector3,l=new i.Vector3,u=new i.Vector3,c=this instanceof i.LineSegments?2:1,p=n.index,d=n.attributes;if(null!==p){const s=p.array,i=d.position.array,o=d.width.array;for(let n=0,p=s.length-1;n<p;n+=c){const c=s[n],d=s[n+1];h.fromArray(i,3*c),l.fromArray(i,3*d);const f=null!=o[Math.floor(n/3)]?o[Math.floor(n/3)]:1,v=t.params.Line.threshold+this.material.lineWidth*f/2,m=v*v;if(r.distanceSqToSegment(h,l,a,u)>m)continue;a.applyMatrix4(this.matrixWorld);const y=t.ray.origin.distanceTo(a);y<t.near||y>t.far||(e.push({distance:y,point:u.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this}),n=p)}}}function o(t,e,s,i,r){let o;if(t=t.subarray||t.slice?t:t.buffer,s=s.subarray||s.slice?s:s.buffer,t=e?t.subarray?t.subarray(e,r&&e+r):t.slice(e,r&&e+r):t,s.set)s.set(t,i);else for(o=0;o<t.length;o++)s[o+i]=t[o];return s}class a extends i.BufferGeometry{constructor(){super(),this.type="MeshLine",this.isMeshLine=!0,this.positions=[],this.raycast=r,this.previous=[],this.next=[],this.side=[],this.width=[],this.indices=[],this.uvs=[],this.counters=[],this.customColor=[],this._points=[],this._geom=null,this.widthCallback=null,this.colorCallback=null,this.positionsFloat32=new Float32Array,this.previousFloat32=new Float32Array,this.nextFloat32=new Float32Array,this.sideFloat32=new Float32Array,this.widthFloat32=new Float32Array,this.uvsFloat32=new Float32Array,this.indicesUInt16=new Uint16Array,this.countersFloat32=new Float32Array,this.customColorFloat32=new Float32Array,this.matrixWorld=new i.Matrix4,Object.defineProperties(this,{geometry:{enumerable:!0,get(){return this}},geom:{enumerable:!0,get(){return this._geom},set(t){this.setGeometry(t,this.widthCallback)}},points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setGeometry(t,e){this._geometry=t,t instanceof i.BufferGeometry?this.setPoints(t.getAttribute("position").array,e):this.setPoints(t,e)}setPoints(t,e,s){if(t instanceof Float32Array||t instanceof Array){if(this._points=t,this.widthCallback=e,this.colorCallback=s,t.length&&t[0]instanceof i.Vector3){let e=6*t.length,s=2*t.length;this.positions.length!==e&&(this.positions=Array(e)),this.counters.length!==s&&(this.counters=Array(s));let i=Array(3);for(var r=0;r<t.length;r++){const e=t[r];var o=r/t.length;let s=6*r;i[0]=e.x,i[1]=e.y,i[2]=e.z,this.setElementsArray(this.positions,s,i,0,3),this.setElementsArray(this.positions,s+3,i,0,3);let a=2*r;this.counters[a]=o,this.counters[a+1]=o}}else{let e=2*t.length,s=2*t.length/3;this.positions.length!==e&&(this.positions=Array(e)),this.counters.length!==s&&(this.counters=Array(s));for(r=0;r<t.length;r+=3){o=r/t.length;let e=2*r;this.setElementsArray(this.positions,e,t,r,3),this.setElementsArray(this.positions,e+3,t,r,3);let s=2*r/3;this.counters[s]=o,this.counters[s+1]=o}}this.process()}else console.error("ERROR: The BufferArray of points is not instancied correctly.")}compareV3(t,e){const s=6*t,i=6*e;return this.positions[s]===this.positions[i]&&this.positions[s+1]===this.positions[i+1]&&this.positions[s+2]===this.positions[i+2]}copyV3(t){const e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const t=this.positions.length/6;let e,s,r;this.previous.length!==6*t&&(this.previous=Array(6*t)),this.next.length!==6*t&&(this.next=Array(6*t)),this.side.length!==2*t&&(this.side=Array(2*t)),this.width.length!==2*t&&(this.side=Array(2*t)),this.indices.length!==6*(t-1)&&(this.indices=Array(6*(t-1))),this.uvs.length!==4*t&&(this.uvs=Array(4*t)),this.customColor.length!==8*t&&(this.customColor=Array(8*t)),s=this.compareV3(0,t-1)?this.copyV3(t-2):this.copyV3(0),this.setElementsArray(this.previous,0,s,0,3),this.setElementsArray(this.previous,3,s,0,3);let o=Array(3);for(let i=0;i<t;i++){this.side[2*i]=1,this.side[2*i+1]=-1,o[0]=this.positions[3*i],o[1]=this.positions[3*i+1],o[2]=this.positions[3*i+2],e=this.widthCallback?this.widthCallback(i/(t-1),o):1,this.width[2*i]=e,this.width[2*i+1]=e,r=this.colorCallback?this.colorCallback(i/(t-1),o):[-1,0,0,0],this.setElementsArray(this.customColor,4*i,r,0,4),this.setElementsArray(this.customColor,4*(i+1),r,0,4);let a=i/(t-1);if(this.uvs[4*i]=a,this.uvs[4*i+1]=0,this.uvs[4*i+2]=a,this.uvs[4*i+3]=1,s=this.copyV3(i),i<t-1){this.setElementsArray(this.previous,6*(i+1),s,0,3),this.setElementsArray(this.previous,6*(i+1)+3,s,0,3);const t=2*i;this.indices[6*i]=t,this.indices[6*i+1]=t+1,this.indices[6*i+2]=t+2,this.indices[6*i+3]=t+2,this.indices[6*i+4]=t+1,this.indices[6*i+5]=t+3}i>0&&(this.setElementsArray(this.next,6*(i-1),s,0,3),this.setElementsArray(this.next,6*(i-1)+3,s,0,3))}if(s=this.compareV3(t-1,0)?this.copyV3(1):this.copyV3(t-1),this.setElementsArray(this.next,6*(t-1),s,0,3),this.setElementsArray(this.next,6*(t-1)+3,s,0,3),this.positions,this.positionsFloat32,this.previous,this.previousFloat32,this.next,this.nextFloat32,this.side,this.sideFloat32,this.width,this.widthFloat32,this.uvs,this.uvsFloat32,this.counters,this.countersFloat32,this.customColor,this.customColorFloat32,this.positions.length!==this.positionsFloat32.length)this.positionsFloat32=new Float32Array(this.positions);else for(let i=0;i<this.positionsFloat32.length;i++)this.positionsFloat32[i]=this.positions[i];if(this.previous.length!==this.previousFloat32.length)this.previousFloat32=new Float32Array(this.previous);else for(let i=0;i<this.previousFloat32.length;i++)this.previousFloat32[i]=this.previous[i];if(this.next.length!==this.nextFloat32.length)this.nextFloat32=new Float32Array(this.next);else for(let i=0;i<this.nextFloat32.length;i++)this.nextFloat32[i]=this.next[i];if(this.side.length!==this.sideFloat32.length)this.sideFloat32=new Float32Array(this.side);else for(let i=0;i<this.sideFloat32.length;i++)this.sideFloat32[i]=this.side[i];if(this.width.length!==this.widthFloat32.length)this.widthFloat32=new Float32Array(this.width);else for(let i=0;i<this.widthFloat32.length;i++)this.widthFloat32[i]=this.width[i];if(this.uvs.length!==this.uvsFloat32.length)this.uvsFloat32=new Float32Array(this.uvs);else for(let i=0;i<this.uvsFloat32.length;i++)this.uvsFloat32[i]=this.uvs[i];if(this.counters.length!==this.countersFloat32.length)this.countersFloat32=new Float32Array(this.counters);else for(let i=0;i<this.countersFloat32.length;i++)this.countersFloat32[i]=this.counters[i];if(this.customColor.length!==this.customColorFloat32.length)this.customColorFloat32=new Float32Array(this.customColor);else for(let i=0;i<this.customColorFloat32.length;i++)this.customColorFloat32[i]=this.customColor[i];if(this.indices.length!==this.indicesUInt16.length)this.indicesUInt16=new Uint16Array(this.indices);else for(let i=0;i<this.indicesUInt16.length;i++)this.indicesUInt16[i]=this.indices[i];this._attributes&&this._attributes.position.count===this.positions.length?(this._attributes.position.array=this.positionsFloat32,this._attributes.position.needsUpdate=!0,this._attributes.previous.array=this.previousFloat32,this._attributes.previous.needsUpdate=!0,this._attributes.next.array=this.nextFloat32,this._attributes.next.needsUpdate=!0,this._attributes.side.array=this.sideFloat32,this._attributes.side.needsUpdate=!0,this._attributes.width.array=this.widthFloat32,this._attributes.width.needsUpdate=!0,this._attributes.uv.array=this.uvsFloat32,this._attributes.uv.needsUpdate=!0,this._attributes.index.array=this.indicesUInt16,this._attributes.index.needsUpdate=!0,this._attributes.counters.array=this.countersFloat32,this._attributes.counters.needsUpdate=!0,this._attributes.customColor.array=this.customColorFloat32,this._attributes.customColor.needsUpdate=!0):this._attributes={position:new i.BufferAttribute(this.positionsFloat32,3),previous:new i.BufferAttribute(this.previousFloat32,3),next:new i.BufferAttribute(this.nextFloat32,3),side:new i.BufferAttribute(this.sideFloat32,1),width:new i.BufferAttribute(this.widthFloat32,1),uv:new i.BufferAttribute(this.uvsFloat32,2),index:new i.BufferAttribute(this.indicesUInt16,1),counters:new i.BufferAttribute(this.countersFloat32,1),customColor:new i.BufferAttribute(this.customColorFloat32,4)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("customColor",this._attributes.customColor)}advance({x:t,y:e,z:s}){const i=this._attributes.position.array,r=this._attributes.previous.array,a=this._attributes.next.array,n=i.length;o(i,0,r,0,n),o(i,6,i,0,n-6),i[n-6]=t,i[n-5]=e,i[n-4]=s,i[n-3]=t,i[n-2]=e,i[n-1]=s,o(i,6,a,0,n-6),a[n-6]=t,a[n-5]=e,a[n-4]=s,a[n-3]=t,a[n-2]=e,a[n-1]=s,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}setElementsArray(t,e,s,i,r){for(let o=0;o<r;o++)t[e+o]=s[i+o]}}i.ShaderChunk.meshline_vert=["","#include <common>","",i.ShaderChunk.logdepthbuf_pars_vertex,i.ShaderChunk.fog_pars_vertex,"","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute float counters;","attribute vec4 customColor;","","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float sizeAttenuation;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    float aspect = resolution.x / resolution.y;","","    if ( customColor.x >= 0.0) vColor = customColor;","    else vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","    float w = lineWidth * width;","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );","    normal.xy *= .5 * w;","    normal *= projectionMatrix;","    if( sizeAttenuation == 0. ) {","        normal.xy *= finalPosition.w;","        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;","    }","","    finalPosition.xy += normal.xy * side;","","    gl_Position = finalPosition;","",i.ShaderChunk.logdepthbuf_vertex,i.ShaderChunk.fog_vertex&&"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",i.ShaderChunk.fog_vertex,"}"].join("\n"),i.ShaderChunk.meshline_frag=["",i.ShaderChunk.fog_pars_fragment,i.ShaderChunk.logdepthbuf_pars_fragment,"","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","",i.ShaderChunk.logdepthbuf_fragment,"","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = c;","",i.ShaderChunk.fog_fragment,"}"].join("\n");class n extends i.ShaderMaterial{constructor(t){super({uniforms:Object.assign({},i.UniformsLib.fog,{lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new i.Color(16777215)},opacity:{value:1},resolution:{value:new i.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new i.Vector2(1,1)}}),vertexShader:i.ShaderChunk.meshline_vert,fragmentShader:i.ShaderChunk.meshline_frag}),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(t){this.uniforms.color.value=t}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(t){this.uniforms.useDash.value=t}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}t.MeshLine=a,t.MeshLineMaterial=n,t.MeshLineRaycast=r,Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"}));
