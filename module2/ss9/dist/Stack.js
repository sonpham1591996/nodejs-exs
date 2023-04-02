"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.container = [];
    }
    push(data) {
        this.container.push(data);
    }
    pop() {
        return this.container.pop();
    }
    size() {
        return this.container.length;
    }
}
exports.Stack = Stack;
