const reverseString = function (str) {
    const strArray = str.split("");
    let reversedString = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversedString += strArray[i];
    }
    return reversedString;
};

// Do not edit below this line
module.exports = reverseString;
