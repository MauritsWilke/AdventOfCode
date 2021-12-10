const fs = require(`fs`);
const input = fs.readFileSync("./day_10/input.txt", "utf-8").split("\n").filter((v) => v !== "").map((v) => v.split(""))

let inverseChar = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
}

let charScore = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

let corruptedChars = []
for (let line of input) {
    let openingChars = []
    let corrupted = false;
    for (let char of line) {
        if (corrupted) continue;
        if ([`(`, `[`, `{`, `<`].includes(char)) openingChars.push(char)
        else {
            if (openingChars[openingChars.length - 1] == inverseChar[char]) openingChars.pop()
            else {
                corrupted = true;
                corruptedChars.push(char)
            }
        }
    }
}


let total = 0;
for (char of corruptedChars) total += charScore[char]
console.log(total)