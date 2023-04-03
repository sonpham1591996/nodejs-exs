const buyACar = (carName, money) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (money >= 10000) {
        resolve("Can buy " + carName);
      } else {
        reject("Do not enough money to buy " + carName);
      }
    }, 100);
  });
};

let money = 1000001;

buyACar("Vinfast", money)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));
