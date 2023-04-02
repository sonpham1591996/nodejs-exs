"use strict";
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    getRadius() {
        return this.radius;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    toString() {
        return "A Circle with radius=" + this.getRadius();
    }
    resize(percent) {
        this.radius += (this.radius * percent) / 100;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    resize(percent) {
        this.width += (this.width * percent) / 100;
        this.height += (this.height * percent) / 100;
    }
}
class Square {
    constructor(edge) {
        this.edge = edge;
    }
    getEdge() {
        return this.edge;
    }
    setRadius(edge) {
        this.edge = edge;
    }
    resize(percent) {
        this.edge += (this.edge * percent) / 100;
    }
}
//
const circle = new Circle(3);
console.log(JSON.stringify(circle));
circle.resize(20); // 20%
console.log("After resizing circle...");
console.log(JSON.stringify(circle));
//
const rectangle = new Rectangle(10, 4);
console.log(JSON.stringify(rectangle));
rectangle.resize(15); // 15%
console.log("After resizing rectangle...");
console.log(JSON.stringify(rectangle));
//
const square = new Square(6);
console.log(JSON.stringify(square));
square.resize(6); // 15%
console.log("After resizing square...");
console.log(JSON.stringify(square));
