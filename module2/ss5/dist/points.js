"use strict";
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
    getXY() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Point3D extends Point2D {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    getZ() {
        return this.z;
    }
    setZ(z) {
        this.z = z;
    }
    getXYZ() {
        return {
            x: this.getX(),
            y: this.getY(),
            z: this.z,
        };
    }
    setXYZ(x, y, z) {
        this.setXY(x, y);
        this.z = z;
    }
}
// Point2D
const point2d = new Point2D(5, 4);
console.log(JSON.stringify(point2d.getXY()));
const point3d = new Point3D(5, 4, 3);
console.log(JSON.stringify(point3d.getXYZ()));
