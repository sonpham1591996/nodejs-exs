function checkClassName(className: string): boolean {
  return !!className && /^[C|A|P]{1}\d{4}[G|H|I|K|L|M]{1}$/.test(className);
}

console.log(checkClassName("C0318G"));
console.log(checkClassName("M0318G"));
console.log(checkClassName("P0323A"));

console.log("Check phone number");

function checkPhoneNumber(phoneNumber: string): boolean {
  return !!phoneNumber && /^\(\d{2}\)-\(0\d{9}\)$/.test(phoneNumber);
}

console.log(checkPhoneNumber("(84)-(0978489648)"));
console.log(checkPhoneNumber("(a8)-(22222222)"));
