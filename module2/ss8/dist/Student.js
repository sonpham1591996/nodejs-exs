"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
}
exports.Student = Student;
