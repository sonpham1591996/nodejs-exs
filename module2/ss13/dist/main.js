"use strict";
function calculator(number1, number2, operator) {
    if (operator === "+") {
        return number1 + number2;
    }
    if (operator === "-") {
        return number1 - number2;
    }
    if (operator === "*") {
        return number1 * number2;
    }
    if (operator === "/") {
        return number1 / number2;
    }
    throw new RangeError("The operator mus be an +,-,*,/");
}
try {
    console.log(calculator(3, 9, "%"));
}
catch (err) {
    console.log(err.message);
}
