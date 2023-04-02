class Point2D {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y: number) {
    this.y = y;
  }

  getXY() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point3D extends Point2D {
  private z: number;

  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }

  getZ() {
    return this.z;
  }

  setZ(z: number) {
    this.z = z;
  }

  getXYZ() {
    return {
      x: this.getX(),
      y: this.getY(),
      z: this.z,
    };
  }

  setXYZ(x: number, y: number, z: number) {
    this.setXY(x, y);
    this.z = z;
  }
}

// Point2D

const point2d = new Point2D(5, 4);

console.log(JSON.stringify(point2d.getXY()));

const point3d = new Point3D(5, 4, 3);

console.log(JSON.stringify(point3d.getXYZ()));
