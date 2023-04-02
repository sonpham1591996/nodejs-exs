"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(name, salary, month) {
        this.employeeCode = name;
        this.salary = salary;
        this.month = month;
    }
    getEmployeeCode() {
        return this.employeeCode;
    }
    setEmployeeCode(employeeCode) {
        this.employeeCode = employeeCode;
    }
    getSalary() {
        return this.salary;
    }
    setSalary(salary) {
        this.salary = salary;
    }
    getMonth() {
        return this.month;
    }
    setMonth(month) {
        this.month = month;
    }
}
exports.Employee = Employee;
