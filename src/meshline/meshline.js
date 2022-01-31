import * as THREE from 'three'
import { MeshLineRaycast } from "./raycast"
import { memcpy } from "./utils"

export class MeshLine extends THREE.BufferGeometry {
  constructor() {
    super()
    this.type = 'MeshLine'
    this.isMeshLine = true
    this.positions = []
    this.raycast = MeshLineRaycast
    this.previous = []
    this.next = []
    this.side = []
    this.width = []
    this.indices = []
    this.uvs = []
    this.counters = []
    this.customColor = []
    this._points = []
    this._geom = null

    this.widthCallback = null
    this.colorCallback = null

    this.positionsFloat32 = new Float32Array();
    this.previousFloat32 = new Float32Array();
    this.nextFloat32 = new Float32Array();
    this.sideFloat32 = new Float32Array();
    this.widthFloat32 = new Float32Array();
    this.uvsFloat32 = new Float32Array();
    this.indicesUInt16 = new Uint16Array();
    this.countersFloat32 = new Float32Array();
    this.customColorFloat32 = new Float32Array();

    // position: new THREE.BufferAttribute(new Float32Array(this.positions), 3),
    // previous: new THREE.BufferAttribute(new Float32Array(this.previous), 3),
    // next: new THREE.BufferAttribute(new Float32Array(this.next), 3),
    // side: new THREE.BufferAttribute(new Float32Array(this.side), 1),
    // width: new THREE.BufferAttribute(new Float32Array(this.width), 1),
    // uv: new THREE.BufferAttribute(new Float32Array(this.uvs), 2),
    // index: new THREE.BufferAttribute(new Uint16Array(this.indices_array), 1),
    // counters: new THREE.BufferAttribute(new Float32Array(this.counters), 1),
    // customColor: new THREE.BufferAttribute(new Float32Array(this.customColor), 4)

    // Used to raycast
    this.matrixWorld = new THREE.Matrix4()

    Object.defineProperties(this, {
      // this is now a bufferGeometry
      // add getter to support previous api
      geometry: {
        enumerable: true,
        get() {
          return this
        }
      },
      geom: {
        enumerable: true,
        get() {
          return this._geom
        },
        set(value) {
          this.setGeometry(value, this.widthCallback)
        }
      },
      // for declaritive architectures
      // to return the same value that sets the points
      // eg. this.points = points
      // console.log(this.points) -> points
      points: {
        enumerable: true,
        get() {
          return this._points
        },
        set(value) {
          this.setPoints(value, this.widthCallback)
        }
      }
    })
  }

  setMatrixWorld(matrixWorld) {
    this.matrixWorld = matrixWorld
  }

  // setting via a geometry is rather superfluous
  // as you're creating a unecessary geometry just to throw away
  // but exists to support previous api
  setGeometry(g, c) {
    // as the input geometry are mutated we store them
    // for later retreival when necessary (declaritive architectures)
    this._geometry = g
    if (g instanceof THREE.BufferGeometry) {
      this.setPoints(g.getAttribute('position').array, c)
    } else {
      this.setPoints(g, c)
    }
  }

  setPoints(points, wcb, ccb) {
    if (!(points instanceof Float32Array) && !(points instanceof Array)) {
      console.error('ERROR: The BufferArray of points is not instancied correctly.')
      return
    }
    // as the points are mutated we store them
    // for later retreival when necessary (declaritive architectures)
    this._points = points
    this.widthCallback = wcb
    this.colorCallback = ccb

    if (points.length && points[0] instanceof THREE.Vector3) {
      // could transform Vector3 array into the array used below
      // but this approach will only loop through the array once
      // and is more performant
      let positionsLength = 6 * points.length;
      let countersLength = 2 * points.length;
      if (this.positions.length !== positionsLength) {
        this.positions = Array(positionsLength);
      }

      if (this.counters.length !== countersLength) {
        this.counters = Array(countersLength);
      }

      let point = Array(3);

      for (var j = 0; j < points.length; j++) {
        const p = points[j]
        var c = j / points.length

        let coordIdx = 6 * j;
        point[0] = p.x;
        point[1] = p.y;
        point[2] = p.z;

        this.setElementsArray(this.positions, coordIdx, point, 0, 3);
        this.setElementsArray(this.positions, coordIdx + 3, point, 0, 3);

        let countIdx = 2 * j;
        this.counters[countIdx] = c;
        this.counters[countIdx + 1] = c;
      }
    } else {

      let positionsLength = 2 * points.length;
      let countersLength = 2 * points.length / 3;

      if (this.positions.length !== positionsLength) {
        this.positions = Array(positionsLength);
      }

      if (this.counters.length !== countersLength) {
        this.counters = Array(countersLength);
      }

      for (var j = 0; j < points.length; j += 3) {
        var c = j / points.length

        let coordIdx = 2 * j;
        this.setElementsArray(this.positions, coordIdx, points, j, 3);
        this.setElementsArray(this.positions, coordIdx + 3, points, j, 3);

        let countIdx = 2 * j / 3;
        this.counters[countIdx] = c;
        this.counters[countIdx + 1] = c;
      }
    }
    this.process()
  }

  compareV3(a, b) {
    const aa = a * 6
    const ab = b * 6
    return this.positions[aa] === this.positions[ab] && this.positions[aa + 1] === this.positions[ab + 1] && this.positions[aa + 2] === this.positions[ab + 2]
  }

  copyV3(a) {
    const aa = a * 6
    return [this.positions[aa], this.positions[aa + 1], this.positions[aa + 2]]
  }

  process() {
    const l = this.positions.length / 6

    if (this.previous.length !== 6 * l) {
        this.previous = Array(6 * l);
    }

    if (this.next.length !== 6 * l) {
        this.next = Array(6 * l);
    }

    if (this.side.length !== 2 * l) {
        this.side = Array(2 * l);
    }

    if (this.width.length !== 2 * l) {
        this.side = Array(2 * l);
    }

    if (this.indices.length !== 6 * (l - 1)) {
        this.indices = Array(6 * (l - 1));
    }

    if (this.uvs.length !== 4 * l) {
        this.uvs = Array(4 * l);
    }

    if (this.customColor.length !== 8 * l) {
        this.customColor = Array(8 * l);
    }

    let w

    let v

    let customColor
    // initial previous points
    if (this.compareV3(0, l - 1)) {
      v = this.copyV3(l - 2)
    } else {
      v = this.copyV3(0)
    }

    this.setElementsArray(this.previous, 0, v, 0, 3);
    this.setElementsArray(this.previous, 3, v, 0, 3);

    let position = Array(3);

    for (let j = 0; j < l; j++) {
      // sides
      this.side[2 * j] = 1;
      this.side[2 * j + 1] = -1;
    
      position[0] = this.positions[3 * j];
      position[1] = this.positions[3 * j + 1];
      position[2] = this.positions[3 * j + 2];
      // widths
      if (this.widthCallback) w = this.widthCallback(j / (l - 1), position)
      else w = 1

      this.width[2 * j] = w;
      this.width[2 * j + 1] = w;

      if (this.colorCallback) customColor = this.colorCallback(j / (l - 1), position)
      else customColor = [-1, 0, 0, 0]
      //rgba

      this.setElementsArray(this.customColor, 4 * j, customColor, 0, 4);
      this.setElementsArray(this.customColor, 4 * (j + 1), customColor, 0, 4);

      // uvs
      let percent = j / (l - 1);

      this.uvs[4 * j] = percent;
      this.uvs[4 * j + 1] = 0;
      this.uvs[4 * j + 2] = percent;
      this.uvs[4 * j + 3] = 1;

      v = this.copyV3(j)

      if (j < l - 1) {
        // points previous to poisitions
        this.setElementsArray(this.previous, 6 * (j + 1), v, 0, 3);
        this.setElementsArray(this.previous, 6 * (j + 1) + 3, v, 0, 3);

        // indices
        const n = j * 2
        this.indices[6 * j] = n;
        this.indices[6 * j + 1] = n + 1;
        this.indices[6 * j + 2] = n + 2;
        this.indices[6 * j + 3] = n + 2;
        this.indices[6 * j + 4] = n + 1;
        this.indices[6 * j + 5] = n + 3;
      }
      if (j > 0) {
        this.setElementsArray(this.next, 6 * (j - 1), v, 0, 3);
        this.setElementsArray(this.next, 6 * (j - 1) + 3, v, 0, 3);
      }
    }

    // last next point
    if (this.compareV3(l - 1, 0)) {
      v = this.copyV3(1)
    } else {
      v = this.copyV3(l - 1)
    }

    this.setElementsArray(this.next, 6 * (l - 1), v, 0, 3);
    this.setElementsArray(this.next, 6 * (l - 1) + 3, v, 0, 3);

    let float32UpdateParams = [
        [this.positions, this.positionsFloat32, () => this.positionsFloat32 = new Float32Array(this.positions)],
        [this.previous, this.previousFloat32],
        [this.next, this.nextFloat32],
        [this.side, this.sideFloat32],
        [this.width, this.widthFloat32],
        [this.uvs, this.uvsFloat32],
        [this.counters, this.countersFloat32],
        [this.customColor, this.customColorFloat32]
    ];

    if (this.positions.length !== this.positionsFloat32.length) {
        this.positionsFloat32 = new Float32Array(this.positions);
    } else {
        for (let j = 0; j < this.positionsFloat32.length; j++) {
            this.positionsFloat32[j] = this.positions[j];
        }
    }

    if (this.previous.length !== this.previousFloat32.length) {
        this.previousFloat32 = new Float32Array(this.previous);
    } else {
        for (let j = 0; j < this.previousFloat32.length; j++) {
            this.previousFloat32[j] = this.previous[j];
        }
    }

    if (this.next.length !== this.nextFloat32.length) {
        this.nextFloat32 = new Float32Array(this.next);
    } else {
        for (let j = 0; j < this.nextFloat32.length; j++) {
            this.nextFloat32[j] = this.next[j];
        }
    }

    if (this.side.length !== this.sideFloat32.length) {
        this.sideFloat32 = new Float32Array(this.side);
    } else {
        for (let j = 0; j < this.sideFloat32.length; j++) {
            this.sideFloat32[j] = this.side[j];
        }
    }

    if (this.width.length !== this.widthFloat32.length) {
        this.widthFloat32 = new Float32Array(this.width);
    } else {
        for (let j = 0; j < this.widthFloat32.length; j++) {
            this.widthFloat32[j] = this.width[j];
        }
    }

    if (this.uvs.length !== this.uvsFloat32.length) {
        this.uvsFloat32 = new Float32Array(this.uvs);
    } else {
        for (let j = 0; j < this.uvsFloat32.length; j++) {
            this.uvsFloat32[j] = this.uvs[j];
        }
    }

    if (this.counters.length !== this.countersFloat32.length) {
        this.countersFloat32 = new Float32Array(this.counters);
    } else {
        for (let j = 0; j < this.countersFloat32.length; j++) {
            this.countersFloat32[j] = this.counters[j];
        }
    }

    if (this.customColor.length !== this.customColorFloat32.length) {
        this.customColorFloat32 = new Float32Array(this.customColor);
    } else {
        for (let j = 0; j < this.customColorFloat32.length; j++) {
            this.customColorFloat32[j] = this.customColor[j];
        }
    }

    if (this.indices.length !== this.indicesUInt16.length) {
        this.indicesUInt16 = new Uint16Array(this.indices);
    } else {
        for (let j = 0; j < this.indicesUInt16.length; j++) {
            this.indicesUInt16[j] = this.indices[j];
        }
    }

    // redefining the attribute seems to prevent range errors
    // if the user sets a differing number of vertices
    if (!this._attributes || this._attributes.position.count !== this.positions.length) {
      this._attributes = {
        position: new THREE.BufferAttribute(this.positionsFloat32, 3),
        previous: new THREE.BufferAttribute(this.previousFloat32, 3),
        next: new THREE.BufferAttribute(this.nextFloat32, 3),
        side: new THREE.BufferAttribute(this.sideFloat32, 1),
        width: new THREE.BufferAttribute(this.widthFloat32, 1),
        uv: new THREE.BufferAttribute(this.uvsFloat32, 2),
        index: new THREE.BufferAttribute(this.indicesUInt16, 1),
        counters: new THREE.BufferAttribute(this.countersFloat32, 1),
        customColor: new THREE.BufferAttribute(this.customColorFloat32, 4)
      }
    } else {
      this._attributes.position.array = this.positionsFloat32
      this._attributes.position.needsUpdate = true
      this._attributes.previous.array = this.previousFloat32
      this._attributes.previous.needsUpdate = true
      this._attributes.next.array = this.nextFloat32
      this._attributes.next.needsUpdate = true
      this._attributes.side.array = this.sideFloat32
      this._attributes.side.needsUpdate = true
      this._attributes.width.array = this.widthFloat32
      this._attributes.width.needsUpdate = true
      this._attributes.uv.array = this.uvsFloat32
      this._attributes.uv.needsUpdate = true
      this._attributes.index.array = this.indicesUInt16
      this._attributes.index.needsUpdate = true
      this._attributes.counters.array = this.countersFloat32
      this._attributes.counters.needsUpdate = true
      this._attributes.customColor.array = this.customColorFloat32
      this._attributes.customColor.needsUpdate = true
    }

    this.setAttribute('position', this._attributes.position)
    this.setAttribute('previous', this._attributes.previous)
    this.setAttribute('next', this._attributes.next)
    this.setAttribute('side', this._attributes.side)
    this.setAttribute('width', this._attributes.width)
    this.setAttribute('uv', this._attributes.uv)
    this.setAttribute('counters', this._attributes.counters)
    this.setAttribute('customColor', this._attributes.customColor)

    this.setIndex(this._attributes.index)

    this.computeBoundingSphere()
    this.computeBoundingBox()
  }

  /**
   * Fast method to advance the line by one position.  The oldest position is removed.
   * @param position
   */
  advance({ x, y, z }) {
    const positions = this._attributes.position.array
    const previous = this._attributes.previous.array
    const next = this._attributes.next.array
    const l = positions.length

    // PREVIOUS
    memcpy(positions, 0, previous, 0, l)

    // POSITIONS
    memcpy(positions, 6, positions, 0, l - 6)

    positions[l - 6] = x
    positions[l - 5] = y
    positions[l - 4] = z
    positions[l - 3] = x
    positions[l - 2] = y
    positions[l - 1] = z

    // NEXT
    memcpy(positions, 6, next, 0, l - 6)

    next[l - 6] = x
    next[l - 5] = y
    next[l - 4] = z
    next[l - 3] = x
    next[l - 2] = y
    next[l - 1] = z

    this._attributes.position.needsUpdate = true
    this._attributes.previous.needsUpdate = true
    this._attributes.next.needsUpdate = true
  }

  setElementsArray(array, arrayStartIdx, vector, vectorStartIdx, length) {
    for (let j = 0; j < length; j++) {
        array[arrayStartIdx + j] = vector[vectorStartIdx + j];
    }
  }
}

