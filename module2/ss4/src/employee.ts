class Employee {
  private id: number;
  private firstName: string;
  private lastName: string;
  private dateOfBirth: String;
  private address: string;
  private position: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: String,
    address: string,
    position: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.position = position;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getFirstName() {
    return this.firstName;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  getLastName() {
    return this.lastName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  getDateOfBirth() {
    return this.dateOfBirth;
  }

  setDateOfBirth(dateOfBirth: String) {
    this.dateOfBirth = dateOfBirth;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: string) {
    this.position = position;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address: string) {
    this.address = address;
  }

  toString() {
    return `firstName = ${this.firstName}, lastName = ${
      this.lastName
    }, dateOfBirth = ${this.dateOfBirth}, address = ${
      this.address
    }, position = ${this.position ?? ""}`;
  }
}

class EmployeeManager {
  private static employees: Employee[] = [];

  static showEmployees() {
    for (let emp of this.employees) {
      console.log(emp.toString());
    }
  }

  static getEmployeeDetail(index: number) {
    return this.employees[index];
  }

  static addEmployee(employee: Employee) {
    employee.setId(this.employees.length + 1);
    this.employees.push(employee);
  }

  static updateEmployee(employee: Employee) {
    for (let em of this.employees) {
      if (em.getId() === employee.getId()) {
        em.setFirstName(employee.getFirstName());
        em.setLastName(employee.getLastName());
        em.setDateOfBirth(employee.getDateOfBirth());
        em.setAddress(employee.getAddress());
        em.setPosition(employee.getPosition());
        return;
      }
    }
  }

  static removeEmployee(index: number) {
    if (index > this.employees.length - 1) {
      throw new Error("Employee not found");
    }

    this.employees.splice(index, 1);
  }
}

EmployeeManager.addEmployee(
  new Employee(1, "SonPM", "Pham", "2002-09-15", "Quang Tri", "GV")
);

EmployeeManager.addEmployee(
  new Employee(2, "CongNT", "Nguyen", "1991-09-12", "Da Nang", "GV")
);

// 
EmployeeManager.showEmployees();


const employee = EmployeeManager.getEmployeeDetail(0);
employee.setAddress("Da Nang");
EmployeeManager.updateEmployee(employee);

// 
console.log("=== After updating employee ===");
EmployeeManager.showEmployees();

// 
EmployeeManager.removeEmployee(0);

console.log("=== After removing employee ===");

EmployeeManager.showEmployees();
