"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("./Queue");
const Stack_1 = require("./Stack");
function checkStr(str) {
    if (!str || str.length === 0)
        return false;
    const stack = new Stack_1.Stack();
    const queue = new Queue_1.Queue();
    for (let i = 0; i < str.length; i++) {
        stack.push(str[i]);
        queue.enqueue(str[i]);
    }
    for (let i = 0; i < str.length; i++) {
        if (stack.pop() !== queue.dequeue()) {
            return false;
        }
    }
    return true;
}
const str = "able was I ere I saw elba";
console.log(`Chuỗi: "${str}" là chuỗi ${checkStr(str) ? "" : "không"} đối xứng`);
const anotherStr = "Hello world";
console.log(`Chuỗi: "${anotherStr}" là chuỗi ${checkStr(anotherStr) ? "" : "không"} đối xứng`);
// Ex2: Reverse the array
function reverseArray(arr) {
    if (!arr || arr.length === 0)
        return arr;
    const newStack = new Stack_1.Stack();
    for (let e of arr) {
        newStack.push(e);
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = newStack.pop();
    }
}
const arr = [1, 2, 4, 5];
console.log(arr);
reverseArray(arr);
console.log("After reversing array");
console.log(arr);
