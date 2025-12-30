function Book(title, author, pages, haveRead) {
    if (!new.target) {
        // Safeguard constructors
        throw Error("You must use the 'new' operator to call the constructor");
    }

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

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
console.log(theHobbit.info());
