export default function solution(input: string) {
    const grid = input.lines().map(v => v.split(""));

    let matches = 0;

    grid.forEach((row, i, a) => {
        row.forEach((char, j) => {
            for (const d of adjacent) {
                const three = [
                    a[i + d[0]]?.[j + d[1]],
                    a[i + 2 * d[0]]?.[j + 2 * d[1]],
                    a[i + 3 * d[0]]?.[j + 3 * d[1]]
                ].filter(Boolean);

                if (three.length < 3) continue;
                const word = char + three.join("");
                if (word === "XMAS") matches++;
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
    [, 2517],
    [test_input, 18],
]

/* The failed regex solution o7
    const i = input.lines().join("");
    const WIDTH = input.split("\n")[0].length;

    const horMatch = i.matchOverlapping(/XMAS|SAMX/gm).length;

    const verMatchReg = new RegExp(`X(.){${WIDTH - 1}}M(.){${WIDTH - 1}}A(.){${WIDTH - 1}}S|S(.){${WIDTH - 1}}A(.){${WIDTH - 1}}M(.){${WIDTH - 1}}X`, "gm");
    const verMatch = i.matchOverlapping(verMatchReg).length;

    const diagMatchReg = new RegExp(`X(.){${WIDTH}}M(.){${WIDTH}}A(.){${WIDTH}}S|S(.){${WIDTH}}A(.){${WIDTH}}M(.){${WIDTH}}X`, "gm");
    const diagMatch = i.matchOverlapping(diagMatchReg).length;

    const diagMatchRevReg = new RegExp(`X(.){${WIDTH - 2}}M(.){${WIDTH - 2}}A(.){${WIDTH - 2}}S|S(.){${WIDTH - 2}}A(.){${WIDTH - 2}}M(.){${WIDTH - 2}}X`, "gm");
    const diagMatchRev = i.matchOverlapping(diagMatchRevReg).length;

    return horMatch + verMatch + diagMatch + diagMatchRev;
*/