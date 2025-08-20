const palindromes = function (str) {
    const VALID_CHARACTERS = "abcdefghijklmnopqrstuvwxyz1234567890";

    const formattedStr = str
        .toLowerCase()
        .split("")
        .filter((char) => VALID_CHARACTERS.includes(char))
        .join("");

    const reversedStr = formattedStr.split("").reverse().join("");

    return formattedStr === reversedStr;
};

// Do not edit below this line
module.exports = palindromes;
