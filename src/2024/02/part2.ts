export default function solution(input: string) {
    const inp = input.split("\n").filter(v => v !== "")
        .map(v => v.split(" ").map(Number))
        .map(v => {
            let safe = false;

            for (let i = 0; i < v.length; i++) {
                const c = v.filter((_, j) => i !== j);

                const sorted = c.every((v, i, a) => i === 0 || v > a[i - 1]) || c.every((v, i, a) => i === 0 || v < a[i - 1]);
                const fails = !!c.window(2).map(v => Math.abs(v[0] - v[1])).map(Math.abs).find(v => v > 3);

                if (sorted && !fails) safe = true;
            }

            return safe;
        }).filter(v => v)

    return inp.length;
}

const test = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

export const tests = [
    [test, 4],
    [, 561]
]