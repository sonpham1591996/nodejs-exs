"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayList = void 0;
class ArrayList {
    constructor() {
        this.container = [];
    }
    add(data) {
        this.container.push(data);
    }
    get(index) {
        return this.container[index];
    }
    remove() {
        this.container.pop();
    }
    size() {
        return this.container.length;
    }
}
exports.ArrayList = ArrayList;
