!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MeshLine={},t.THREE)}(this,(function(t,e){"use strict";function i(t){if(t&&t.__esModule)return t;var e={__proto__:null,[Symbol.toStringTag]:"Module"};return t&&Object.keys(t).forEach((function(i){if("default"!==i){var s=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:function(){return t[i]}})}})),e.default=t,Object.freeze(e)}var s=i(e);function r(t,e){const i=new s.Matrix4,r=new s.Ray,a=new s.Sphere,o=new s.Vector3,n=this.geometry;if(a.copy(n.boundingSphere),a.applyMatrix4(this.matrixWorld),!1===t.ray.intersectSphere(a,o))return;i.getInverse(this.matrixWorld),r.copy(t.ray).applyMatrix4(i);const u=new s.Vector3,h=new s.Vector3,l=new s.Vector3,p=this instanceof s.LineSegments?2:1,c=n.index,f=n.attributes;if(null!==c){const i=c.array,s=f.position.array,a=f.width.array;for(let n=0,c=i.length-1;n<c;n+=p){const p=i[n],f=i[n+1];u.fromArray(s,3*p),h.fromArray(s,3*f);const d=null!=a[Math.floor(n/3)]?a[Math.floor(n/3)]:1,v=t.params.Line.threshold+this.material.lineWidth*d/2,m=v*v;if(r.distanceSqToSegment(u,h,o,l)>m)continue;o.applyMatrix4(this.matrixWorld);const y=t.ray.origin.distanceTo(o);y<t.near||y>t.far||(e.push({distance:y,point:l.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this}),n=c)}}}function a(t,e,i,s,r){let a;if(t=t.subarray||t.slice?t:t.buffer,i=i.subarray||i.slice?i:i.buffer,t=e?t.subarray?t.subarray(e,r&&e+r):t.slice(e,r&&e+r):t,i.set)i.set(t,s);else for(a=0;a<t.length;a++)i[a+s]=t[a];return i}class o extends s.BufferGeometry{constructor(){super(),this.type="MeshLine",this.isMeshLine=!0,this.positions=[],this.raycast=r,this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],this.counters=[],this._points=[],this._geom=null,this.widthCallback=null,this.matrixWorld=new s.Matrix4,Object.defineProperties(this,{geometry:{enumerable:!0,get(){return this}},geom:{enumerable:!0,get(){return this._geom},set(t){this.setGeometry(t,this.widthCallback)}},points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setGeometry(t,e){this._geometry=t,t instanceof s.BufferGeometry?this.setPoints(t.getAttribute("position").array,e):this.setPoints(t,e)}setPoints(t,e){if(t instanceof Float32Array||t instanceof Array){if(this._points=t,this.widthCallback=e,this.positions=[],this.counters=[],t.length&&t[0]instanceof s.Vector3)for(var i=0;i<t.length;i++){const e=t[i];var r=i/t.length;this.positions.push(e.x,e.y,e.z),this.positions.push(e.x,e.y,e.z),this.counters.push(r),this.counters.push(r)}else for(i=0;i<t.length;i+=3){r=i/t.length;this.positions.push(t[i],t[i+1],t[i+2]),this.positions.push(t[i],t[i+1],t[i+2]),this.counters.push(r),this.counters.push(r)}this.process()}else console.error("ERROR: The BufferArray of points is not instancied correctly.")}compareV3(t,e){const i=6*t,s=6*e;return this.positions[i]===this.positions[s]&&this.positions[i+1]===this.positions[s+1]&&this.positions[i+2]===this.positions[s+2]}copyV3(t){const e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const t=this.positions.length/6;let e,i;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],i=this.compareV3(0,t-1)?this.copyV3(t-2):this.copyV3(0),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);for(let s=0;s<t;s++){if(this.side.push(1),this.side.push(-1),e=this.widthCallback?this.widthCallback(s/(t-1)):1,this.width.push(e),this.width.push(e),this.uvs.push(s/(t-1),0),this.uvs.push(s/(t-1),1),s<t-1){i=this.copyV3(s),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);const t=2*s;this.indices_array.push(t,t+1,t+2),this.indices_array.push(t+2,t+1,t+3)}s>0&&(i=this.copyV3(s),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]))}i=this.compareV3(t-1,0)?this.copyV3(1):this.copyV3(t-1),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]),this._attributes&&this._attributes.position.count===this.positions.length?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0):this._attributes={position:new s.BufferAttribute(new Float32Array(this.positions),3),previous:new s.BufferAttribute(new Float32Array(this.previous),3),next:new s.BufferAttribute(new Float32Array(this.next),3),side:new s.BufferAttribute(new Float32Array(this.side),1),width:new s.BufferAttribute(new Float32Array(this.width),1),uv:new s.BufferAttribute(new Float32Array(this.uvs),2),index:new s.BufferAttribute(new Uint16Array(this.indices_array),1),counters:new s.BufferAttribute(new Float32Array(this.counters),1)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:i}){const s=this._attributes.position.array,r=this._attributes.previous.array,o=this._attributes.next.array,n=s.length;a(s,0,r,0,n),a(s,6,s,0,n-6),s[n-6]=t,s[n-5]=e,s[n-4]=i,s[n-3]=t,s[n-2]=e,s[n-1]=i,a(s,6,o,0,n-6),o[n-6]=t,o[n-5]=e,o[n-4]=i,o[n-3]=t,o[n-2]=e,o[n-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}s.ShaderChunk.meshline_vert=["","#include <common>","",s.ShaderChunk.logdepthbuf_pars_vertex,s.ShaderChunk.fog_pars_vertex,"","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute float counters;","","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float sizeAttenuation;","varying float index;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    index++;","    float aspect = resolution.x / resolution.y;","","    vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","    float w = lineWidth * width;","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );","    normal.xy *= .5 * w;","    normal *= projectionMatrix;","    if( sizeAttenuation == 0. ) {","        normal.xy *= finalPosition.w;","        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;","    }","","    finalPosition.xy += normal.xy * side;","","    gl_Position = finalPosition;","",s.ShaderChunk.logdepthbuf_vertex,s.ShaderChunk.fog_vertex&&"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",s.ShaderChunk.fog_vertex,"}"].join("\n"),s.ShaderChunk.meshline_frag=["",s.ShaderChunk.fog_pars_fragment,s.ShaderChunk.logdepthbuf_pars_fragment,"","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","uniform float numberOfPoints;","uniform vec3 color1;","uniform vec3 color2;","varying float index;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","",s.ShaderChunk.logdepthbuf_fragment,"","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = vec4(mix(color1, color2, index / numberOfPoints), 1.0);","",s.ShaderChunk.fog_fragment,"}"].join("\n");class n extends s.ShaderMaterial{constructor(t){super({uniforms:Object.assign({},s.UniformsLib.fog,{lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new s.Color(16777215)},opacity:{value:1},resolution:{value:new s.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new s.Vector2(1,1)}}),vertexShader:s.ShaderChunk.meshline_vert,fragmentShader:s.ShaderChunk.meshline_frag}),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(t){this.uniforms.color.value=t}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(t){this.uniforms.useDash.value=t}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}t.MeshLine=o,t.MeshLineMaterial=n,t.MeshLineRaycast=r,Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"}));
