export default function solution(input: string) {
    return input.split("\n").filter(v => v !== "")
        .map(v => v.split(/\s+/).map(Number))
        .map(v => v.max() - v.min())
        .sum();
}

const test_input = `5 1 9 5
7 5 3
2 4 6 8`

export const tests = [
    [test_input, 18],
]