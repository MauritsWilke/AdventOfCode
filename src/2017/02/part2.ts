export default function solution(input: string) {
    const rows = input.split("\n").filter(v => v !== "").map(v => v.split(/\s+/).map(Number))

    let sum = 0;
    rows.forEach(row => {
        for (let i = 0; i < row.length - 1; i++) {
            for (let j = i + 1; j < row.length; j++) {
                const a = row[i];
                const b = row[j];

                if (a % b === 0 || b % a === 0) {
                    sum += Math.max(a, b) / Math.min(a, b);
                    continue;
                }
            }
        }
    })

    return sum;
}

const test_input = `5 9 2 8
9 4 7 3
3 8 6 5`

export const tests = [
    [test_input, 9],
]