const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const sum = function (numArr) {
    if (numArr.length === 0) return 0;
    return numArr.reduce((sum, num) => sum + num);
};

const multiply = function (numArr) {
    return numArr.reduce((total, num) => total * num);
};

const power = function (a, b) {
    return Math.pow(a, b);
};

const factorial = function (num) {
    if (num === 0) return 1;

    let product = 1;
    while (num > 0) {
        product *= num;
        num--;
    }
    return product;
};

// Do not edit below this line
module.exports = {
    add,
    subtract,
    sum,
    multiply,
    power,
    factorial,
};
