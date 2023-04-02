"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentManagement = void 0;
const LinkedList_1 = require("./LinkedList");
class StudentManagement {
    constructor() {
        this.studentList = new LinkedList_1.LinkedList();
    }
    insertFirst(student) {
        this.studentList.insertFirstNode(student);
    }
    insertLast(student) {
        this.studentList.insertLastNode(student);
    }
    showList() {
        for (let st of this.studentList.getAll()) {
            console.log(JSON.stringify(st));
        }
    }
    totalStudentsFail() {
        return this.studentList.search((d) => d.getScore() <= 5).length;
    }
    getListStudentMaxScore() {
        return this.studentList.search((d) => d.getScore() === 10);
    }
    findByName(name) {
        return this.studentList.search((d) => d.getName() === name);
    }
}
exports.StudentManagement = StudentManagement;
