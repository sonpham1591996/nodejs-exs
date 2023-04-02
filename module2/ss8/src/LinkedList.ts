import { Node } from "./Node";

export class LinkedList<T> {
  private head: Node<T> | null;

  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertFirstNode(data: T): void {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      node.setNext(this.head);
      this.head = node;
    }
    this.size++;
  }

  insertLastNode(data: T): void {
    if (!this.head) {
      this.insertFirstNode(data);
    } else {
      const node = new Node(data);
      const getLast = (node: Node<T> | null): Node<T> | null => {
        return node && node.getNext() ? getLast(node.getNext()) : node;
      };

      const lastNode = getLast(this.head);
      if (lastNode) {
        lastNode.setNext(node);
      }
    }
    this.size++;
  }

  search(conditionFn: Function) {
    let results = [];
    if (this.size) {
      let currentNode = this.head;
      while (currentNode !== null) {
        if (conditionFn(currentNode.readData())) {
          results.push(currentNode.readData());
        }
        currentNode = currentNode.getNext();
      }
    }

    return results;
  }

  getAll() {
    let results = [];
    if (this.size) {
      let currentNode = this.head;
      while (currentNode !== null) {
        results.push(currentNode.readData());
        currentNode = currentNode.getNext();
      }
    }

    return results;
  }

  getSize(): number {
    return this.size;
  }
}
