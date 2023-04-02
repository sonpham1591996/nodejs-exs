import { LinkedList } from "./LinkedList";
import { Employee } from "./Employee";

export class EmployeeManagement {
  private employeeList: LinkedList<Employee>;

  constructor() {
    this.employeeList = new LinkedList<Employee>();
  }

  insertFirst(em: Employee): void {
    this.employeeList.insertFirstNode(em);
  }

  insertLast(em: Employee): void {
    this.employeeList.insertLastNode(em);
  }

  showList() {
    for (let em of this.employeeList.getAll()) {
      console.log(JSON.stringify(em));
    }
  }

  getTotalSalary() {
    const monthAndSalaryMap = new Map();

    for (let em of this.employeeList.getAll()) {
      if (monthAndSalaryMap.get(em.getMonth())) {
        monthAndSalaryMap.set(
          em.getMonth(),
          monthAndSalaryMap.get(em.getMonth()) + em.getSalary()
        );
      } else {
        monthAndSalaryMap.set(em.getMonth(), em.getSalary());
      }
    }

    return monthAndSalaryMap;
  }

  getMonthWithMaxTotalSalary() {
    const monthAndSalaryMap = this.getTotalSalary();

    let max = 0;
    let result = -1;
    for (let month of monthAndSalaryMap.keys()) {
      if (monthAndSalaryMap.get(month) > max) {
        max = monthAndSalaryMap.get(month);
        result = month;
      }
    }

    return result;
  }
}
