const removeFromArray = function (arr, ...args) {
    const newArr = [];

    for (const item of arr) {
        if (!args.includes(item)) newArr.push(item);
    }

    return newArr;
};

// Do not edit below this line
module.exports = removeFromArray;
