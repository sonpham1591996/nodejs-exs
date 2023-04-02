class StopWatch {
  constructor(startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.endTime = Date.now();
  }

  getElapsedTime() {
    return this.endTime - this.startTime;
  }
}

function selectionSort(arr) {
  let currentValueNewIndex;
  for (let i = 0; i < arr.length; i++) {
    currentValueNewIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[currentValueNewIndex] > arr[j]) {
        currentValueNewIndex = j;
      }
    }
    if (i !== currentValueNewIndex) {
      let temp = arr[i];
      arr[i] = arr[currentValueNewIndex];
      arr[currentValueNewIndex] = temp;
    }
  }

  return arr;
}

const stopWatch = new StopWatch();

stopWatch.start();
const arr = [];
for (let i = 0; i < 100000; i++) {
  arr.push(Math.floor(Math.random() * 100000 + 1));
}
stopWatch.stop();
// console.log(selectionSort(arr));
console.log(`It takes ${stopWatch.getElapsedTime()} milliseconds`);
