class QuadraticEquation {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }

  getC() {
    return this.c;
  }

  getDiscriminant() {
    return Math.pow(this.b, 2) - 4 * this.a * this.c;
  }

  getRoot1() {
    return (-this.getB() + Math.sqrt(this.getDiscriminant())) / (2 * this.getA());
  }

  getRoot2() {
    return (-this.getB() - Math.sqrt(this.getDiscriminant())) / (2 * this.getA());
  }
}

function checkEquantion(quadraticEquation) {
    const delta = quadraticEquation.getDiscriminant();
    if (delta >= 0) {
        if (delta === 0) {
            const x1 = quadraticEquation.getRoot1();
            console.log(`The equation has 1 root x1 = x2 = ${x1}`);
        } else {
            const x1 = quadraticEquation.getRoot1();
            const x2 = quadraticEquation.getRoot2();
            console.log(`The equation has two roots x1 = ${x1} and x2 = ${x2}`);
        }
    } else {
        console.log('The equation has no real roots');
    }
}

let quadraticEquation_1 = new QuadraticEquation(1.0, 3, 1);
checkEquantion(quadraticEquation_1);

console.log("==============================================")

let quadraticEquation_2 = new QuadraticEquation(1, 2.0, 1);
checkEquantion(quadraticEquation_2);

console.log("==============================================")

let quadraticEquation_3 = new QuadraticEquation(1, 2, 3);
checkEquantion(quadraticEquation_3);
