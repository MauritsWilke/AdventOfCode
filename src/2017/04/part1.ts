export default function solution(input: string) {
    return input.split("\n")
        .filter(v => v)
        .map(v => v.split(" "))
        .filter(v => v.allUnique())
        .length;
}

const test_input = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`

export const tests = [
    [test_input, 2],
    [, 477]
]