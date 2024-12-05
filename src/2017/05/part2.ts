export default function solution(input: string) {
    const offsets = input.lines().map(Number);

    let steps = 0;
    for (let i = 0; i < offsets.length; steps++) i += offsets[i] >= 3 ? offsets[i]-- : offsets[i]++;
    return steps;
}

const test_case = `0
3
0
1
-3
`

export const tests = [
    [test_case, 10]
]