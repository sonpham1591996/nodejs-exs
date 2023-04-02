"use strict";
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "Name";
    GenderEnum["FEMAIL"] = "N\u1EEF";
    GenderEnum["OTHER"] = "Kh\u00E1c";
})(GenderEnum || (GenderEnum = {}));
class Employee {
    constructor(name, gender, dateOfBirth, email, phoneNumber) {
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getGender() {
        return this.gender;
    }
    setGender(gender) {
        this.gender = gender;
    }
    getDateOfBirth() {
        return this.dateOfBirth;
    }
    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    toString() {
        var _a;
        return `name = ${this.name}, gender = ${this.gender}, dateOfBirth = ${this.dateOfBirth}, email = ${this.email}, phoneNumber = ${(_a = this.phoneNumber) !== null && _a !== void 0 ? _a : ""}`;
    }
}
let employees = [];
function showEmployees(employees) {
    for (let emp of employees) {
        console.log(emp.toString());
    }
}
function addEmployee(employee) {
    if (employees.filter((emp) => emp.getEmail() === employee.getEmail()).length > 0) {
        throw new Error("Employee already exists");
    }
    employees.push(employee);
}
function removeEmployee(index) {
    if (index > employees.length - 1) {
        throw new Error("Employee not found");
    }
    employees.splice(index, 1);
}
addEmployee(new Employee("SonPM", GenderEnum.MALE, "2002-09-15", "son@gmail.vn", undefined));
addEmployee(new Employee("CongNT", GenderEnum.MALE, "1991-09-12", "cong@codegym.vn", undefined));
showEmployees(employees);
removeEmployee(0);
console.log("=== After removing employee ===");
showEmployees(employees);
