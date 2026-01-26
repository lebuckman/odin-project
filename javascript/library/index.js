/* ================ */
/* BOOK CONSTRUCTOR */
/* ================ */
function Book(title, author, pages, haveRead) {
    if (!new.target) {
        // Safeguard constructors
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.haveRead ? "have read" : "not read yet"
    }`;
};

Book.prototype.toggleRead = function () {
    this.haveRead = !this.haveRead;
};

/* ========= */
/* UTILITIES */
/* ========= */

const myLibrary = [];
const libraryGrid = document.querySelector(".library-grid");
const noBooksMsg = document.querySelector(".no-books-msg");

function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
    renderLibrary();
}

function removeBookFromLibrary(bookId) {
    const bookIndex = getBookIndex(bookId);

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        renderLibrary();
    }
}

function getBookIndex(bookId) {
    return myLibrary.findIndex((book) => book.id === bookId);
}

function renderLibrary() {
    libraryGrid.innerHTML = "";

    noBooksMsg.classList.toggle("hidden", myLibrary.length !== 0);

    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        // Card Heading
        const bookCardHeading = document.createElement("div");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("card-title");

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `By: ${book.author}`;
        bookAuthor.classList.add("card-author");

        bookCardHeading.appendChild(bookTitle);
        bookCardHeading.appendChild(bookAuthor);

        // Card Footer
        const bookCardFooter = document.createElement("div");
        bookCardFooter.classList.add("card-footer");
        const bookCardFooterDetails = document.createElement("div");
        bookCardFooterDetails.classList.add("card-footer-details");

        const bookPages = document.createElement("p");
        bookPages.textContent = `${book.pages} pages, `;
        bookPages.classList.add("card-pages");

        const readBookBtn = document.createElement("button");
        readBookBtn.textContent = `${
            book.haveRead ? "Read ✔︎" : "Not Read ✖︎"
        }`;
        readBookBtn.classList.add("card-read-btn");
        readBookBtn.classList.add(`${book.haveRead ? "read" : "not-read"}`);

        const delBookBtn = document.createElement("button");
        delBookBtn.textContent = "🗑️";
        delBookBtn.classList.add("card-del-btn");

        bookCardFooterDetails.append(bookPages, readBookBtn);
        bookCardFooter.append(bookCardFooterDetails, delBookBtn);

        // Add card info to Book Card
        bookCard.append(bookCardHeading, bookCardFooter);
        bookCard.dataset.bookId = book.id;

        // Add Book Card to Library Grid
        libraryGrid.appendChild(bookCard);
    }
}

libraryGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const bookId = card.dataset.bookId;

    // Delete book
    if (e.target.closest(".card-del-btn")) {
        removeBookFromLibrary(bookId);
        return;
    }

    // Toggle read status
    if (e.target.closest(".card-read-btn")) {
        const bookIndex = getBookIndex(bookId);
        myLibrary[bookIndex].toggleRead();
        renderLibrary();
    }
});

/* ======= */
/* RUN APP */
/* ======= */

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 300, false);
addBookToLibrary("Frankenstein", "Mary Shelley", 352, true);
addBookToLibrary("The Kite Runner", "Khaled Hosseini", 371, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut Jr.", 224, true);

renderLibrary();

/* ============= */
/* DIALOG + FORM */
/* ============= */

const bookDialog = document.querySelector(".book-dialog");
const showBookBtn = document.querySelector(".show-dialog-btn");
const cancelBookBtn = document.querySelector(".cancel-btn");
const dialogForm = document.querySelector(".book-dialog form");

showBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBookBtn.addEventListener("click", (e) => {
    bookDialog.close();
});

dialogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = Number(formData.get("pages"));
    const haveRead = formData.get("haveRead") === "on";

    addBookToLibrary(title, author, pages, haveRead);

    dialogForm.reset();
    bookDialog.close();
});
