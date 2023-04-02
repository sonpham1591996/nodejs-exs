interface Resizeable {
  resize(percent: number): void;
}

class Circle implements Resizeable {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }

  setRadius(radius: number): void {
    this.radius = radius;
  }

  toString(): string {
    return "A Circle with radius=" + this.getRadius();
  }

  resize(percent: number): void {
    this.radius += (this.radius * percent) / 100;
  }
}

class Rectangle implements Resizeable {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  resize(percent: number): void {
    this.width += (this.width * percent) / 100;
    this.height += (this.height * percent) / 100;
  }
}

class Square implements Resizeable {
  private edge: number;

  constructor(edge: number) {
    this.edge = edge;
  }

  getEdge(): number {
    return this.edge;
  }

  setRadius(edge: number): void {
    this.edge = edge;
  }

  resize(percent: number): void {
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
