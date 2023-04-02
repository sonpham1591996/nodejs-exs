import { IArrayList } from "./IArrayList";

export class ArrayList<T> implements IArrayList<T> {
  private container: Array<T>;

  constructor() {
    this.container = [];
  }

  add(data: T): void {
    this.container.push(data);
  }

  get(index: number): T {
    return this.container[index];
  }

  remove(): void {
    this.container.pop();
  }

  size(): number {
    return this.container.length;
  }
}
