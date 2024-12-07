export default function solution(input: string) {
    return input
        .lines()
        .map(v => v.split(":").map(v => v.nums()))
        .filter(v => {
            const sum = v[0][0];
            const elms = v[1];

            const result = dfs(elms[0], 0, elms, sum);
            return result;
        }).reduce((a, b) => a + b[0][0], 0)

    function dfs(start: number, index: number, elms: number[], target: number): boolean {
        const next = elms[index + 1];
        if (start === target) return true;
        if (next === undefined || start > target) return false

        return dfs(start * next, index + 1, elms, target) ||
            dfs(start + next, index + 1, elms, target) ||
            dfs(+`${start}${next}`, index + 1, elms, target);
    }
}

const test_case = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

export const tests = [
    [test_case, 11387],
]