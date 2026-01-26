const DEFAULT_GRID_SIZE = 16;
const container = document.querySelector(".container");
const copyInput = document.querySelector("#copy-input");
const resetBtn = document.querySelector("#reset-btn");
const sizePrompt = document.querySelector("#size-prompt");
const sizeSubmit = document.querySelector("#size-submit");
const sizeInput = document.querySelector("#size-input");

sizeInput.addEventListener("focus", entryHint);
sizeInput.addEventListener("keyup", displayGridSize);
sizeSubmit.addEventListener("click", createGrid);
resetBtn.addEventListener("click", resetGrid);

// Create a 16x16 drawable grid on window load
window.addEventListener("load", () => {
    buildGrid(DEFAULT_GRID_SIZE);
    draw();
    sizeInput.placeholder = DEFAULT_GRID_SIZE;
});

function createGrid() {
    let sizeInputValue = sizeInput.value;

    if (!isValidSize(sizeInputValue)) {
        showSizeError();
        return;
    }

    resetUI();
    buildGrid(sizeInputValue);
    draw();
    sizeInput.placeholder = sizeInputValue;
}

// Build grid with nested divs and CSS flex-box
function buildGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);

        for (let j = 0; j < size; j++) {
            let column = document.createElement("div");
            column.classList.add("column");
            row.appendChild(column);
        }
    }
}

// Add event listeners to the created divs with class "column"
function draw() {
    const columns = document.querySelectorAll(".column");

    columns.forEach((column) => {
        column.addEventListener("mouseover", changeColor);
    });
}

function resetGrid() {
    const columns = document.querySelectorAll(".column");

    columns.forEach((column) => {
        column.style.backgroundColor = "";
    });
}

function changeColor() {
    let blackRadio = document.getElementById("black-pen");
    let redRadio = document.getElementById("red-pen");
    let blueRadio = document.getElementById("blue-pen");
    let randomRadio = document.getElementById("random-pen");
    let eraserRadio = document.getElementById("eraser-pen");

    if (blackRadio.checked) {
        this.style.backgroundColor = "#2e2b2b";
    } else if (redRadio.checked) {
        this.style.backgroundColor = "#da2d2d";
    } else if (blueRadio.checked) {
        this.style.backgroundColor = "#3f33dd";
    } else if (eraserRadio.checked) {
        this.style.backgroundColor = "";
    } else if (randomRadio.checked) {
        this.style.backgroundColor = getRandomRGB();
    }
}

function resetUI() {
    sizePrompt.textContent = "";
    copyInput.textContent = "";
    sizeInput.value = "";
    container.innerHTML = "";
}

// Display to user the square grid size as # x #
function displayGridSize() {
    copyInput.textContent = `x ${sizeInput.value}`;
}

function isValidSize(size) {
    return !isNaN(size) && size >= 2 && size <= 99;
}

function showSizeError() {
    sizePrompt.textContent = "Make sure it's a number from 2 to 99!";
}

function entryHint() {
    sizePrompt.textContent = `Enter a number between 2 and 99.`;
}

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
