function calculator(number1: number, number2: number, operator: string) {
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
} catch (err: any) {
  console.log(err.message);
}
