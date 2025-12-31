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

/* ========= */
/* UTILITIES */
/* ========= */

const myLibrary = [];
const libraryGrid = document.querySelector(".library-grid");
const noBooksMsg = document.querySelector(".no-books-msg");

function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
    }
}

function displayBooks(libraryArr) {
    libraryGrid.innerHTML = "";

    if (libraryArr.length === 0) {
        noBooksMsg.classList.remove("hidden");
    } else {
        noBooksMsg.classList.add("hidden");
    }

    for (const book of libraryArr) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const bookCardHeading = document.createElement("div");
        const bookCardFooter = document.createElement("div");
        bookCardFooter.classList.add("card-footer");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("card-title");

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `By: ${book.author}`;
        bookAuthor.classList.add("card-author");

        bookCardHeading.appendChild(bookTitle);
        bookCardHeading.appendChild(bookAuthor);

        const bookDetails = document.createElement("p");
        bookDetails.textContent = `${book.pages} pages, ${
            book.haveRead ? "Completed ✔︎" : "Not Read ✖︎"
        }`;
        bookDetails.classList.add("card-details");
        const delBookBtn = document.createElement("button");
        delBookBtn.textContent = "🗑️";
        delBookBtn.classList.add("card-del-btn");

        bookCardFooter.appendChild(bookDetails);
        bookCardFooter.appendChild(delBookBtn);

        // Add card info to Book Card
        bookCard.appendChild(bookCardHeading);
        bookCard.appendChild(bookCardFooter);
        bookCard.dataset.bookId = book.id;

        // Add Book Card to Library Grid
        libraryGrid.appendChild(bookCard);
    }
}

libraryGrid.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".card-del-btn");
    if (!removeBtn) return;

    const card = removeBtn.closest(".card");
    removeBookFromLibrary(card.dataset.bookId);
});

/* ======= */
/* RUN APP */
/* ======= */

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 300, false);
addBookToLibrary("Frankenstein", "Mary Shelley", 352, true);
addBookToLibrary("The Kite Runner", "Khaled Hosseini", 371, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut Jr.", 224, true);

displayBooks(myLibrary);

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
    displayBooks(myLibrary);

    dialogForm.reset();
    bookDialog.close();
});
