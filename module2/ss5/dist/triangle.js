"use strict";
class Shape {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
}
class Triangle extends Shape {
    constructor(side1, side2, side3) {
        super();
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    getSide1() {
        return this.side1;
    }
    setSide1(side1) {
        this.side1 = side1;
    }
    getSide2() {
        return this.side2;
    }
    setSide2(side2) {
        this.side2 = side2;
    }
    getSide3() {
        return this.side3;
    }
    setSide3(side3) {
        this.side3 = side3;
    }
    // Heron
    getArea() {
        // p is the haft of the perimeter
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3));
    }
    getPerimeter() {
        return this.side1 + this.side2 + this.side3;
    }
}
//
const shape1 = new Shape();
shape1.setColor("Blue");
shape1.setName("Triangle1");
console.log(JSON.stringify(shape1));
//
const triangle = new Triangle(5, 4, 3);
console.log(`area = ${triangle.getArea()}`);
console.log(`perimeter = ${triangle.getPerimeter()}`);
