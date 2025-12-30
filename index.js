/********************
 * BOOK CONSTRUCTOR *
 ********************/
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

/*************
 * UTILITIES *
 *************/

const myLibrary = [];

function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

/***********
 * TESTING *
 ***********/

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
console.log(myLibrary);
console.log(myLibrary[0].info());


