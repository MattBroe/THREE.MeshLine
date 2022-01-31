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
    this.indices_array = []
    this.uvs = []
    this.counters = []
    this.customColor = []
    this._points = []
    this._geom = null

    this.widthCallback = null
    this.colorCallback = null

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

      for (var j = 0; j < points.length; j++) {
        const p = points[j]
        var c = j / points.length

        let coordIdx = 6 * j;
        this.positions[coordIdx] = p.x;
        this.positions[coordIdx + 1] = p.y;
        this.positions[coordIdx + 2] = p.z;
        coordIdx += 3;
        this.positions[coordIdx] = p.x;
        this.positions[coordIdx + 1] = p.y;
        this.positions[coordIdx + 2] = p.z;

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
        this.positions[coordIdx] = points[j];
        this.positions[coordIdx + 1] = points[j + 1];
        this.positions[coordIdx + 2] = points[j + 2];
        coordIdx += 3;
        this.positions[coordIdx] = points[j];
        this.positions[coordIdx + 1] = points[j + 1];
        this.positions[coordIdx + 2] = points[j + 2];

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

    this.previous = []
    this.next = []
    this.side = []
    this.width = []
    this.indices_array = []
    this.uvs = []
    this.customColor = []

    let w

    let v

    let customColor
    // initial previous points
    if (this.compareV3(0, l - 1)) {
      v = this.copyV3(l - 2)
    } else {
      v = this.copyV3(0)
    }
    this.previous.push(v[0], v[1], v[2])
    this.previous.push(v[0], v[1], v[2])

    for (let j = 0; j < l; j++) {
      // sides
      this.side.push(1)
      this.side.push(-1)

      let position = new THREE.Vector3(this.positions[3 * j, this.positions[3 * j + 1], this.positions[3 * j + 1]])
      // widths
      if (this.widthCallback) w = this.widthCallback(j / (l - 1), position)
      else w = 1
      this.width.push(w)
      this.width.push(w)

      if (this.colorCallback) customColor = this.colorCallback(j / (l - 1), position)
      else customColor = new THREE.Color(-1, 0, 0)
      this.customColor.push(customColor.r, customColor.g, customColor.b)
      this.customColor.push(customColor.r, customColor.g, customColor.b)

      // uvs
      this.uvs.push(j / (l - 1), 0)
      this.uvs.push(j / (l - 1), 1)

      if (j < l - 1) {
        // points previous to poisitions
        v = this.copyV3(j)
        this.previous.push(v[0], v[1], v[2])
        this.previous.push(v[0], v[1], v[2])

        // indices
        const n = j * 2
        this.indices_array.push(n, n + 1, n + 2)
        this.indices_array.push(n + 2, n + 1, n + 3)
      }
      if (j > 0) {
        // points after poisitions
        v = this.copyV3(j)
        this.next.push(v[0], v[1], v[2])
        this.next.push(v[0], v[1], v[2])
      }
    }

    // last next point
    if (this.compareV3(l - 1, 0)) {
      v = this.copyV3(1)
    } else {
      v = this.copyV3(l - 1)
    }
    this.next.push(v[0], v[1], v[2])
    this.next.push(v[0], v[1], v[2])

    // redefining the attribute seems to prevent range errors
    // if the user sets a differing number of vertices
    if (!this._attributes || this._attributes.position.count !== this.positions.length) {
      this._attributes = {
        position: new THREE.BufferAttribute(new Float32Array(this.positions), 3),
        previous: new THREE.BufferAttribute(new Float32Array(this.previous), 3),
        next: new THREE.BufferAttribute(new Float32Array(this.next), 3),
        side: new THREE.BufferAttribute(new Float32Array(this.side), 1),
        width: new THREE.BufferAttribute(new Float32Array(this.width), 1),
        uv: new THREE.BufferAttribute(new Float32Array(this.uvs), 2),
        index: new THREE.BufferAttribute(new Uint16Array(this.indices_array), 1),
        counters: new THREE.BufferAttribute(new Float32Array(this.counters), 1),
        customColor: new THREE.BufferAttribute(new Float32Array(this.customColor), 3)
      }
    } else {
      this._attributes.position.copyArray(new Float32Array(this.positions))
      this._attributes.position.needsUpdate = true
      this._attributes.previous.copyArray(new Float32Array(this.previous))
      this._attributes.previous.needsUpdate = true
      this._attributes.next.copyArray(new Float32Array(this.next))
      this._attributes.next.needsUpdate = true
      this._attributes.side.copyArray(new Float32Array(this.side))
      this._attributes.side.needsUpdate = true
      this._attributes.width.copyArray(new Float32Array(this.width))
      this._attributes.width.needsUpdate = true
      this._attributes.uv.copyArray(new Float32Array(this.uvs))
      this._attributes.uv.needsUpdate = true
      this._attributes.index.copyArray(new Uint16Array(this.indices_array))
      this._attributes.index.needsUpdate = true
      this._attributes.customColor.copyArray(new Float32Array(this.customColor))
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
}

