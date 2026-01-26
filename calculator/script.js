const currentNumberDisplay = document.querySelector("#currentNumber");
const previousNumberDisplay = document.querySelector("#previousNumber");

const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");
const percentBtn = document.querySelector(".percent");

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operation");

const MAX_DISPLAY_LENGTH = 9;

let currentOperator = "";
let currentNum = "";
let previousNum = "";

window.addEventListener("keydown", handleKeyPress);

clearBtn.addEventListener("click", clear);

delBtn.addEventListener("click", handleDelete);

equalsBtn.addEventListener("click", () => {
    if (currentNum !== "" && previousNum !== "") {
        operate();
    }
});

decimalBtn.addEventListener("click", addDecimal);

numberBtns.forEach((numBtn) =>
    numBtn.addEventListener("click", (e) => handleNumber(e.target.textContent))
);

operatorBtns.forEach((opBtn) =>
    opBtn.addEventListener("click", (e) => handleOperator(e.target.textContent))
);

function handleNumber(num) {
    if (previousNum !== "" && currentNum === "" && currentOperator === "") {
        currentNum = previousNum;
        previousNum = "";
    }

    if (currentNumberDisplay.textContent === "0" && currentNum === "") {
        currentNum = num;
    } else if (currentNum.length < MAX_DISPLAY_LENGTH) {
        currentNum += num;
    }

    if (
        currentNum.length > 1 &&
        currentNum.startsWith("0") &&
        !currentNum.includes(".")
    ) {
        currentNum = currentNum.replace(/^0+/, "");
    }

    currentNumberDisplay.textContent = currentNum;
}

function handleOperator(op) {
    if (currentNum === "" && previousNum === "") {
        return;
    }

    if (previousNum === "") {
        previousNum = currentNum;
        checkOperator(op);
    } else if (currentNum === "") {
        checkOperator(op);
    } else {
        operate();
        currentOperator = op;
        currentNumberDisplay.textContent = "0";
        previousNumberDisplay.textContent = `${previousNum} ${currentOperator}`;
    }
}

function checkOperator(op) {
    currentOperator = op;
    previousNumberDisplay.textContent = `${previousNum} ${currentOperator}`;
    currentNumberDisplay.textContent = "0";
    currentNum = "";
}

function operate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    switch (currentOperator) {
        case "+":
            previousNum = add(previousNum, currentNum);
            break;
        case "−":
            previousNum = subtract(previousNum, currentNum);
            break;
        case "×":
            previousNum = multiply(previousNum, currentNum);
            break;
        case "÷":
            previousNum = divide(previousNum, currentNum);
            break;
    }

    if (previousNum === null) {
        alert("Cannot divide by zero");
        previousNum = "0";
    } else {
        previousNum = parseFloat(
            previousNum.toFixed(MAX_DISPLAY_LENGTH)
        ).toString();
    }

    displayResults();
}

function displayResults() {
    if (previousNum.length <= MAX_DISPLAY_LENGTH) {
        currentNumberDisplay.textContent = previousNum;
    } else {
        currentNumberDisplay.textContent =
            previousNum.slice(0, MAX_DISPLAY_LENGTH) + "...";
    }
    previousNumberDisplay.textContent = "";
    currentOperator = "";
    currentNum = "";
}

function clear() {
    currentOperator = "";
    currentNum = "";
    previousNum = "";
    currentNumberDisplay.textContent = "0";
    previousNumberDisplay.textContent = "";
}

function handleDelete() {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentNumberDisplay.textContent = currentNum || "0";
    } else if (currentNum === "" && previousNum !== "") {
        currentNum = previousNum;
        previousNum = "";
        currentOperator = "";
        previousNumberDisplay.textContent = "";
        currentNumberDisplay.textContent = currentNum;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }

    return a / b;
}

function addDecimal() {
    if (currentNum === "") {
        currentNum = "0.";
    } else if (!currentNum.includes(".")) {
        currentNum += ".";
    }

    currentNumberDisplay.textContent = currentNum;
}

function handleKeyPress(e) {
    e.preventDefault();

    const pressedKey = e.key;

    if (pressedKey >= 0 && pressedKey <= 9) {
        handleNumber(pressedKey);
    }

    if (
        pressedKey === "Enter" ||
        (pressedKey === "=" && currentNum !== "" && previousNum !== "")
    ) {
        operate();
    }

    switch (pressedKey) {
        case "+":
            handleOperator("+");
            break;
        case "-":
            handleOperator("−");
            break;
        case "*":
            handleOperator("×");
            break;
        case "/":
            handleOperator("÷");
            break;
        case ".":
            addDecimal();
            break;
        case "Backspace":
            handleDelete();
            break;
    }
}
