export default function solution(input: string) {
    const inp = input.split("\n").filter(v => v !== "")
        .map(v => v.split(" ").map(Number))
        .map(v => {
            const sorted = v.every((v, i, a) => i === 0 || v > a[i - 1]) || v.every((v, i, a) => i === 0 || v < a[i - 1]);
            const fails = !!v.window(2).map(v => Math.abs(v[0] - v[1])).map(Math.abs).find(v => v > 3);

            if (!sorted || fails) return false;
            return true;
        }).filter(v => v).length;

    return inp;
}

const test = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

export const tests = [
    [test, 2],
    [, 516]
]