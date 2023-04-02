function fibonacci(n: number): number {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

let sum = 0;

for (let i = 0; i < 4; i++) {
  sum += fibonacci(i);
}

console.log(sum);
