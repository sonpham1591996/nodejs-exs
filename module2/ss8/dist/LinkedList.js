"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
const Node_1 = require("./Node");
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    insertFirstNode(data) {
        let node = new Node_1.Node(data);
        if (!this.head) {
            this.head = node;
        }
        else {
            node.setNext(this.head);
            this.head = node;
        }
        this.size++;
    }
    insertLastNode(data) {
        if (!this.head) {
            this.insertFirstNode(data);
        }
        else {
            const node = new Node_1.Node(data);
            const getLast = (node) => {
                return node && node.getNext() ? getLast(node.getNext()) : node;
            };
            const lastNode = getLast(this.head);
            if (lastNode) {
                lastNode.setNext(node);
            }
        }
        this.size++;
    }
    search(conditionFn) {
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
    getSize() {
        return this.size;
    }
}
exports.LinkedList = LinkedList;
