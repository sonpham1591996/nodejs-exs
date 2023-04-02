enum GenderEnum {
  MALE = "Name",
  FEMAIL = "Nữ",
  OTHER = "Khác",
}

class Employee {
  private name: string;
  private gender: GenderEnum;
  private dateOfBirth: String;
  private email: string;
  private phoneNumber?: string;

  constructor(
    name: string,
    gender: GenderEnum,
    dateOfBirth: String,
    email: string,
    phoneNumber?: string
  ) {
    this.name = name;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getGender() {
    return this.gender;
  }

  setGender(gender: GenderEnum) {
    this.gender = gender;
  }

  getDateOfBirth() {
    return this.dateOfBirth;
  }

  setDateOfBirth(dateOfBirth: String) {
    this.dateOfBirth = dateOfBirth;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  toString() {
    return `name = ${this.name}, gender = ${this.gender}, dateOfBirth = ${
      this.dateOfBirth
    }, email = ${this.email}, phoneNumber = ${this.phoneNumber ?? ""}`;
  }
}

let employees: Employee[] = [];

function showEmployees(employees: Employee[]) {
  for (let emp of employees) {
    console.log(emp.toString());
  }
}

function addEmployee(employee: Employee) {
  if (
    employees.filter((emp) => emp.getEmail() === employee.getEmail()).length > 0
  ) {
    throw new Error("Employee already exists");
  }
  employees.push(employee);
}

function removeEmployee(index: number) {
  if (index > employees.length - 1) {
    throw new Error("Employee not found");
  }

  employees.splice(index, 1);
}

addEmployee(
  new Employee(
    "SonPM",
    GenderEnum.MALE,
    "2002-09-15",
    "son@gmail.vn",
    undefined
  )
);

addEmployee(
  new Employee(
    "CongNT",
    GenderEnum.MALE,
    "1991-09-12",
    "cong@codegym.vn",
    undefined
  )
);

showEmployees(employees);

removeEmployee(0);

console.log("=== After removing employee ===");

showEmployees(employees);
