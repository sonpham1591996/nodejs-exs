import { Student } from "./Student";
import { StudentManagement } from "./StudentManagement";

const studentManagement = new StudentManagement();

studentManagement.insertFirst(new Student("Nguyen Van A", 10));
studentManagement.insertLast(new Student("Nguyen Van B", 9));
studentManagement.insertLast(new Student("Nguyen Van C", 4));

console.log("======== SHOW ALL ========");

studentManagement.showList();

console.log("======== Total students failed ========");

console.log(studentManagement.totalStudentsFail());

console.log("======== List student max score ========");

for (let st of studentManagement.getListStudentMaxScore()) {
  console.log(JSON.stringify(st));
}

console.log("======== Find by name ========");

for (let st of studentManagement.findByName("Nguyen Van A")) {
  console.log(JSON.stringify(st));
}
