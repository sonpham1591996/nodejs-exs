const findMaxNumber = (arrNumbers) => {
  return new Promise((resolve, reject) => {
    if (!arrNumbers || !Array.isArray(arrNumbers)) {
      reject("arrNumbers must be an array");
    }
    resolve(arrNumbers.sort((a, b) => b - a)[0]);
  });
};

const main = async () => {
  //   const arrNumbers = [2, 4, 5];
  const arrNumbers = 1;
  try {
    const value = await findMaxNumber(arrNumbers);
    console.log("MAX = " + value);
  } catch (err) {
    console.log("Error: " + err);
  }
};

main();
