import*as t from"three";function e(e,s){const i=new t.Matrix4,r=new t.Ray,o=new t.Sphere,a=new t.Vector3,n=this.geometry;if(o.copy(n.boundingSphere),o.applyMatrix4(this.matrixWorld),!1===e.ray.intersectSphere(o,a))return;i.getInverse(this.matrixWorld),r.copy(e.ray).applyMatrix4(i);const h=new t.Vector3,l=new t.Vector3,u=new t.Vector3,c=this instanceof t.LineSegments?2:1,p=n.index,d=n.attributes;if(null!==p){const t=p.array,i=d.position.array,o=d.width.array;for(let n=0,p=t.length-1;n<p;n+=c){const c=t[n],d=t[n+1];h.fromArray(i,3*c),l.fromArray(i,3*d);const f=null!=o[Math.floor(n/3)]?o[Math.floor(n/3)]:1,v=e.params.Line.threshold+this.material.lineWidth*f/2,m=v*v;if(r.distanceSqToSegment(h,l,a,u)>m)continue;a.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(a);y<e.near||y>e.far||(s.push({distance:y,point:u.clone().applyMatrix4(this.matrixWorld),index:n,face:null,faceIndex:null,object:this}),n=p)}}}function s(t,e,s,i,r){let o;if(t=t.subarray||t.slice?t:t.buffer,s=s.subarray||s.slice?s:s.buffer,t=e?t.subarray?t.subarray(e,r&&e+r):t.slice(e,r&&e+r):t,s.set)s.set(t,i);else for(o=0;o<t.length;o++)s[o+i]=t[o];return s}class i extends t.BufferGeometry{constructor(){super(),this.type="MeshLine",this.isMeshLine=!0,this.positions=[],this.raycast=e,this.previous=[],this.next=[],this.side=[],this.width=[],this.indices=[],this.uvs=[],this.counters=[],this.customColor=[],this._points=[],this._geom=null,this.widthCallback=null,this.colorCallback=null,this.positionsFloat32=new Float32Array,this.previousFloat32=new Float32Array,this.nextFloat32=new Float32Array,this.sideFloat32=new Float32Array,this.widthFloat32=new Float32Array,this.uvsFloat32=new Float32Array,this.indicesUInt16=new Uint16Array,this.countersFloat32=new Float32Array,this.customColorFloat32=new Float32Array,this.matrixWorld=new t.Matrix4,Object.defineProperties(this,{geometry:{enumerable:!0,get(){return this}},geom:{enumerable:!0,get(){return this._geom},set(t){this.setGeometry(t,this.widthCallback)}},points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setGeometry(e,s){this._geometry=e,e instanceof t.BufferGeometry?this.setPoints(e.getAttribute("position").array,s):this.setPoints(e,s)}setPoints(e,s,i){if(e instanceof Float32Array||e instanceof Array){if(this._points=e,this.widthCallback=s,this.colorCallback=i,e.length&&e[0]instanceof t.Vector3){let t=6*e.length,s=2*e.length;this.positions.length!==t&&(this.positions=Array(t)),this.counters.length!==s&&(this.counters=Array(s));let i=Array(3);for(var r=0;r<e.length;r++){const t=e[r];var o=r/e.length;let s=6*r;i[0]=t.x,i[1]=t.y,i[2]=t.z,this.setElementsArray(this.positions,s,i,0,3),this.setElementsArray(this.positions,s+3,i,0,3);let a=2*r;this.counters[a]=o,this.counters[a+1]=o}}else{let t=2*e.length,s=2*e.length/3;this.positions.length!==t&&(this.positions=Array(t)),this.counters.length!==s&&(this.counters=Array(s));for(r=0;r<e.length;r+=3){o=r/e.length;let t=2*r;this.setElementsArray(this.positions,t,e,r,3),this.setElementsArray(this.positions,t+3,e,r,3);let s=2*r/3;this.counters[s]=o,this.counters[s+1]=o}}this.process()}else console.error("ERROR: The BufferArray of points is not instancied correctly.")}compareV3(t,e){const s=6*t,i=6*e;return this.positions[s]===this.positions[i]&&this.positions[s+1]===this.positions[i+1]&&this.positions[s+2]===this.positions[i+2]}copyV3(t){const e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const e=this.positions.length/6;let s,i,r;this.previous.length!==6*e&&(this.previous=Array(6*e)),this.next.length!==6*e&&(this.next=Array(6*e)),this.side.length!==2*e&&(this.side=Array(2*e)),this.width.length!==2*e&&(this.side=Array(2*e)),this.indices.length!==6*(e-1)&&(this.indices=Array(6*(e-1))),this.uvs.length!==4*e&&(this.uvs=Array(4*e)),this.customColor.length!==8*e&&(this.customColor=Array(8*e)),i=this.compareV3(0,e-1)?this.copyV3(e-2):this.copyV3(0),this.setElementsArray(this.previous,0,i,0,3),this.setElementsArray(this.previous,3,i,0,3);let o=Array(3);for(let t=0;t<e;t++){this.side[2*t]=1,this.side[2*t+1]=-1,o[0]=this.positions[3*t],o[1]=this.positions[3*t+1],o[2]=this.positions[3*t+2],s=this.widthCallback?this.widthCallback(t/(e-1),o):1,this.width[2*t]=s,this.width[2*t+1]=s,r=this.colorCallback?this.colorCallback(t/(e-1),o):[-1,0,0,0],this.setElementsArray(this.customColor,4*t,r,0,4),this.setElementsArray(this.customColor,4*(t+1),r,0,4);let a=t/(e-1);if(this.uvs[4*t]=a,this.uvs[4*t+1]=0,this.uvs[4*t+2]=a,this.uvs[4*t+3]=1,i=this.copyV3(t),t<e-1){this.setElementsArray(this.previous,6*(t+1),i,0,3),this.setElementsArray(this.previous,6*(t+1)+3,i,0,3);const e=2*t;this.indices[6*t]=e,this.indices[6*t+1]=e+1,this.indices[6*t+2]=e+2,this.indices[6*t+3]=e+2,this.indices[6*t+4]=e+1,this.indices[6*t+5]=e+3}t>0&&(this.setElementsArray(this.next,6*(t-1),i,0,3),this.setElementsArray(this.next,6*(t-1)+3,i,0,3))}if(i=this.compareV3(e-1,0)?this.copyV3(1):this.copyV3(e-1),this.setElementsArray(this.next,6*(e-1),i,0,3),this.setElementsArray(this.next,6*(e-1)+3,i,0,3),this.positions,this.positionsFloat32,this.previous,this.previousFloat32,this.next,this.nextFloat32,this.side,this.sideFloat32,this.width,this.widthFloat32,this.uvs,this.uvsFloat32,this.counters,this.countersFloat32,this.customColor,this.customColorFloat32,this.positions.length!==this.positionsFloat32.length)this.positionsFloat32=new Float32Array(this.positions);else for(let t=0;t<this.positionsFloat32.length;t++)this.positionsFloat32[t]=this.positions[t];if(this.previous.length!==this.previousFloat32.length)this.previousFloat32=new Float32Array(this.previous);else for(let t=0;t<this.previousFloat32.length;t++)this.previousFloat32[t]=this.previous[t];if(this.next.length!==this.nextFloat32.length)this.nextFloat32=new Float32Array(this.next);else for(let t=0;t<this.nextFloat32.length;t++)this.nextFloat32[t]=this.next[t];if(this.side.length!==this.sideFloat32.length)this.sideFloat32=new Float32Array(this.side);else for(let t=0;t<this.sideFloat32.length;t++)this.sideFloat32[t]=this.side[t];if(this.width.length!==this.widthFloat32.length)this.widthFloat32=new Float32Array(this.width);else for(let t=0;t<this.widthFloat32.length;t++)this.widthFloat32[t]=this.width[t];if(this.uvs.length!==this.uvsFloat32.length)this.uvsFloat32=new Float32Array(this.uvs);else for(let t=0;t<this.uvsFloat32.length;t++)this.uvsFloat32[t]=this.uvs[t];if(this.counters.length!==this.countersFloat32.length)this.countersFloat32=new Float32Array(this.counters);else for(let t=0;t<this.countersFloat32.length;t++)this.countersFloat32[t]=this.counters[t];if(this.customColor.length!==this.customColorFloat32.length)this.customColorFloat32=new Float32Array(this.customColor);else for(let t=0;t<this.customColorFloat32.length;t++)this.customColorFloat32[t]=this.customColor[t];if(this.indices.length!==this.indicesUInt16.length)this.indicesUInt16=new Uint16Array(this.indices);else for(let t=0;t<this.indicesUInt16.length;t++)this.indicesUInt16[t]=this.indices[t];this._attributes&&this._attributes.position.count===this.positions.length?(this._attributes.position.copyArray(this.positionsFloat32),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(this.previousFloat32),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(this.nextFloat32),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(this.sideFloat32),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(this.widthFloat32),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(this.uvsFloat32),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(this.indicesUInt16),this._attributes.index.needsUpdate=!0,this._attributes.counters.copyArray(this.countersFloat32),this._attributes.counters.needsUpdate=!0,this._attributes.customColor.copyArray(this.customColorFloat32),this._attributes.customColor.needsUpdate=!0):this._attributes={position:new t.BufferAttribute(this.positionsFloat32,3),previous:new t.BufferAttribute(this.previousFloat32,3),next:new t.BufferAttribute(this.nextFloat32,3),side:new t.BufferAttribute(this.sideFloat32,1),width:new t.BufferAttribute(this.widthFloat32,1),uv:new t.BufferAttribute(this.uvsFloat32,2),index:new t.BufferAttribute(this.indicesUInt16,1),counters:new t.BufferAttribute(this.countersFloat32,1),customColor:new t.BufferAttribute(this.customColorFloat32,4)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("customColor",this._attributes.customColor),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:i}){const r=this._attributes.position.array,o=this._attributes.previous.array,a=this._attributes.next.array,n=r.length;s(r,0,o,0,n),s(r,6,r,0,n-6),r[n-6]=t,r[n-5]=e,r[n-4]=i,r[n-3]=t,r[n-2]=e,r[n-1]=i,s(r,6,a,0,n-6),a[n-6]=t,a[n-5]=e,a[n-4]=i,a[n-3]=t,a[n-2]=e,a[n-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}setElementsArray(t,e,s,i,r){for(let o=0;o<r;o++)t[e+o]=s[i+o]}}t.ShaderChunk.meshline_vert=["","#include <common>","",t.ShaderChunk.logdepthbuf_pars_vertex,t.ShaderChunk.fog_pars_vertex,"","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute float counters;","attribute vec4 customColor;","","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float sizeAttenuation;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    float aspect = resolution.x / resolution.y;","","    if ( customColor.x >= 0.0) vColor = customColor;","    else vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","    float w = lineWidth * width;","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );","    normal.xy *= .5 * w;","    normal *= projectionMatrix;","    if( sizeAttenuation == 0. ) {","        normal.xy *= finalPosition.w;","        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;","    }","","    finalPosition.xy += normal.xy * side;","","    gl_Position = finalPosition;","",t.ShaderChunk.logdepthbuf_vertex,t.ShaderChunk.fog_vertex&&"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",t.ShaderChunk.fog_vertex,"}"].join("\n"),t.ShaderChunk.meshline_frag=["",t.ShaderChunk.fog_pars_fragment,t.ShaderChunk.logdepthbuf_pars_fragment,"","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","",t.ShaderChunk.logdepthbuf_fragment,"","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = c;","",t.ShaderChunk.fog_fragment,"}"].join("\n");class r extends t.ShaderMaterial{constructor(e){super({uniforms:Object.assign({},t.UniformsLib.fog,{lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new t.Color(16777215)},opacity:{value:1},resolution:{value:new t.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new t.Vector2(1,1)}}),vertexShader:t.ShaderChunk.meshline_vert,fragmentShader:t.ShaderChunk.meshline_frag}),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(t){this.uniforms.color.value=t}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(t){this.uniforms.useDash.value=t}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(e)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}export{i as MeshLine,r as MeshLineMaterial,e as MeshLineRaycast};
