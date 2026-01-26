const sumAll = function (num1, num2) {
    if (
        Number.isInteger(num1) &&
        Number.isInteger(num2) &&
        num1 >= 0 &&
        num2 >= 0
    ) {
        let total = 0;
        const numStart = num1 > num2 ? num2 : num1;
        const numEnd = num1 > num2 ? num1 : num2;

        for (let i = numStart; i <= numEnd; i++) {
            total += i;
        }
        return total;
    }
    return "ERROR";
};

// Do not edit below this line
module.exports = sumAll;
