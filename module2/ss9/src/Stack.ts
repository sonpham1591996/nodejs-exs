export class Stack<T> {
  private container: T[] = [];

  constructor() {}

  push(data: T): void {
    this.container.push(data);
  }

  pop(): T {
    return this.container.pop() as T;
  }

  size(): number {
    return this.container.length;
  }
}
