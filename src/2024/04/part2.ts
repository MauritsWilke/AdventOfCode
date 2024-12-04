export default function solution(input: string) {
    const grid = input.lines().map(v => v.split(""));

    let matches = 0;

    grid.forEach((row, i, a) => {
        row.forEach((char, j) => {
            if (char === "A") {
                const LTR = [a[i - 1]?.[j - 1], a[i + 1]?.[j + 1]].sort().join("") === "MS";
                const RTL = [a[i - 1]?.[j + 1], a[i + 1]?.[j - 1]].sort().join("") === "MS";

                if (LTR && RTL) matches++;
            }
        })
    })

    return matches;

}

const test_input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

export const tests = [
    [test_input, 9],
]