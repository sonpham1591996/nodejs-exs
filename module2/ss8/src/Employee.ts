export class Employee {
  private employeeCode: string;
  private salary: number;
  private month: number;

  constructor(name: string, salary: number, month: number) {
    this.employeeCode = name;
    this.salary = salary;
    this.month = month;
  }

  getEmployeeCode() {
    return this.employeeCode;
  }

  setEmployeeCode(employeeCode: string) {
    this.employeeCode = employeeCode;
  }

  getSalary() {
    return this.salary;
  }

  setSalary(salary: number) {
    this.salary = salary;
  }

  getMonth() {
    return this.month;
  }

  setMonth(month: number) {
    this.month = month;
  }
}
