const days = [
  "chủ nhật",
  "thứ hai",
  "thứ ba",
  "thứ tư",
  "thứ năm",
  "thứ sáu",
  "thứ bảy",
];

const currentDate = new Date();

const currentDay = currentDate.getDay();

console.log(days[currentDay]);