"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = require("./Employee");
const EmployeeManagement_1 = require("./EmployeeManagement");
const employeeManagement = new EmployeeManagement_1.EmployeeManagement();
employeeManagement.insertFirst(new Employee_1.Employee("E-001", 1000000, 1));
employeeManagement.insertLast(new Employee_1.Employee("E-002", 2000000, 1));
employeeManagement.insertLast(new Employee_1.Employee("E-003", 3000000, 1));
employeeManagement.insertLast(new Employee_1.Employee("E-001", 500000, 2));
employeeManagement.insertLast(new Employee_1.Employee("E-002", 1500000, 2));
employeeManagement.insertLast(new Employee_1.Employee("E-003", 2000000, 2));
employeeManagement.insertLast(new Employee_1.Employee("E-001", 300000, 3));
employeeManagement.insertLast(new Employee_1.Employee("E-002", 1200000, 3));
employeeManagement.insertLast(new Employee_1.Employee("E-003", 1800000, 3));
console.log("======== SHOW ALL ========");
employeeManagement.showList();
console.log("======== Total salary ========");
const monthAndSalaryMap = employeeManagement.getTotalSalary();
for (let month of Array.from(monthAndSalaryMap.keys())) {
    console.log(`Month ${month} with total salary: ${monthAndSalaryMap.get(month)}`);
}
console.log("======== Find month with max salary ========");
const monthWithMaxSalary = employeeManagement.getMonthWithMaxTotalSalary();
console.log(monthWithMaxSalary > 0 ? `Result = ${monthWithMaxSalary}` : "Not found data");
