export default function solution(input: string) {
    return input.split("\n")
        .filter(v => v)
        .map(v => v.split(" "))
        .map(v => v.map(v => v.split("").sort().join("")))
        .filter(v => v.allUnique())
        .length
}

const test_input = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`

export const tests = [
    [test_input, 3],
    [, 167]
]