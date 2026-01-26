const fibonacci = function (n) {
    let fib;

    if (typeof n !== "number") {
        fib = parseInt(n);
    } else {
        fib = n;
    }

    if (fib < 0) return "OOPS";
    if (fib === 0) return 0;

    let firstPrev = 1;
    let secondPrev = 0;

    for (let i = 2; i <= fib; i++) {
        let current = firstPrev + secondPrev;
        secondPrev = firstPrev;
        firstPrev = current;
    }

    return firstPrev;
};

// Do not edit below this line
module.exports = fibonacci;
