export class Node<T> {
  private data: T;
  private next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }

  readData(): T {
    return this.data;
  }

  getNext(): Node<T> | null {
    return this.next;
  }

  setNext(next: Node<T> | null) {
    this.next = next;
  }
}
