"use strict";
// Luyện tập triển khai thuật toán tìm kiếm trên mảng.
function countElement(arrNumbers, valueOfElement) {
    let couter = 0;
    for (let e of arrNumbers) {
        if (e === valueOfElement) {
            couter++;
        }
    }
    return couter;
}
const arrNumbers = [1, 2, 3, 3, 6, 2, 10, 11, 3];
const valueOfElement = 3;
console.log(`Trong [${arrNumbers}] có ${countElement(arrNumbers, valueOfElement)} lần lặp lại giá trị ${valueOfElement}`);
// [Bài tập] Phân loại số điện thoại
const phoneNumbers = [
    "0388167012",
    "0345204358",
    "0397372316",
    "0769765965",
    "0789749049",
    "0765518000",
    "0944251388",
    "0941357358",
    "0941113988",
];
const prefixViettelPhoneNumbers = [
    "086",
    "096",
    "097",
    "098",
    "032",
    "033",
    "034",
    "035",
    "036",
    "037",
    "038",
    "039",
];
const prefixMobiPhoneNumbers = [
    "090",
    "093",
    "089",
    "070",
    "079",
    "078",
    "077",
    "076",
];
const prefixVinaPhoneNumbers = [
    "088",
    "091",
    "094",
    "081",
    "082",
    "083",
    "084",
    "085",
];
const viettelPhoneNumbers = [];
const mobiPhoneNumbers = [];
const vinaPhoneNumbers = [];
for (let phoneNumber of phoneNumbers) {
    if (prefixViettelPhoneNumbers.indexOf(phoneNumber.substring(0, 3)) >= 0) {
        viettelPhoneNumbers.push(phoneNumber);
    }
    else if (prefixMobiPhoneNumbers.indexOf(phoneNumber.substring(0, 3)) >= 0) {
        mobiPhoneNumbers.push(phoneNumber);
    }
    else if (prefixVinaPhoneNumbers.indexOf(phoneNumber.substring(0, 3)) >= 0) {
        vinaPhoneNumbers.push(phoneNumber);
    }
}
console.log(phoneNumbers);
console.log("Viettel: " + viettelPhoneNumbers);
console.log("Mobiphone: " + mobiPhoneNumbers);
console.log("Vinaphone: " + vinaPhoneNumbers);
