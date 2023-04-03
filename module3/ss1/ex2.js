const students = [
  {
    name: "Ha",
    gender: "female",
    point: 8,
  },
  {
    name: "Huy",
    gender: "male",
    point: 9,
  },
  {
    name: "Hung",
    gender: "male",
    point: 7,
  },
  {
    name: "Phuong",
    gender: "female",
    point: 6,
  },
  {
    name: "Huyen",
    gender: "female",
    point: 10,
  },
  {
    name: "Long",
    gender: "male",
    point: 5,
  },
  {
    name: "Luan",
    gender: "male",
    point: 10,
  },
  {
    name: "Linh",
    gender: "female",
    point: 8,
  },
];

const MALE_GENDER = "male";
const FEMALE_GENDER = "female";

//
let totalPointOfMaleStudents = 0;
let totalScoreOfFemaleStudents = 0;

for (let student of students) {
  if (student.gender === MALE_GENDER) {
    totalPointOfMaleStudents += student.point;
  } else if (student.gender === FEMALE_GENDER) {
    totalScoreOfFemaleStudents += student.point;
  }
}

console.log("totalPointOfMaleStudents = " + totalPointOfMaleStudents);
console.log("totalScoreOfFemaleStudents = " + totalScoreOfFemaleStudents);

// The number of students
const maleStudents = students.filter((st) => st.gender === MALE_GENDER);
const femaleStudents = students.filter((st) => st.gender === FEMALE_GENDER);

console.log("Total of male students = " + maleStudents.length);
console.log("Total of female students = " + femaleStudents.length);

// AVG

const avgPointOfMaleStudents = totalPointOfMaleStudents / maleStudents.length;
const avgPointOfFemaleStudents =
  totalScoreOfFemaleStudents / femaleStudents.length;

console.log("Average point of male students = " + avgPointOfMaleStudents);
console.log("Average point of female students = " + avgPointOfFemaleStudents);
