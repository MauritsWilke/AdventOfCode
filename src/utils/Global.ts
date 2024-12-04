declare global {
    // deno-lint-ignore no-var
    var alphabet: "abcdefghijklmnopqrstuvwxyz"
    // deno-lint-ignore no-var
    var numberMap: Map<string, number>
    // deno-lint-ignore no-var
    var adjacent: [number, number][]
    // deno-lint-ignore no-var
    var deltas: [number, number][]
    // deno-lint-ignore no-var
    var diag: [number, number][]
}

globalThis.alphabet = "abcdefghijklmnopqrstuvwxyz";

globalThis.numberMap = new Map<string, number>([
    ["zero", 0],
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
])

globalThis.adjacent = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
];

globalThis.deltas = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
]

globalThis.diag = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
]

export { }