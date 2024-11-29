export default function solution(input: string) {
    const val = +input;

    const coords = new Map<string, number>();
    coords.set("0.0", 1);
    let currentCoord = [1, 0];
    let dirs = [1, 0];

    while (true) {
        let sum = 0;

        diaDeltas.forEach(delta => {
            const cur = currentCoord.zip(delta).join(".");
            sum += coords.get(cur) ?? 0;
        });

        if (sum > val) return sum;
        else coords.set(currentCoord.join("."), sum)

        const d = [
            dirs[1] === 0 ? 0 : dirs[1] * -1,
            dirs[0] === 0 ? 0 : dirs[0]
        ];

        const toCheck = currentCoord.zip(d).join(".");
        const exists = coords.get(toCheck);

        if (!exists) {
            const mult = dirs[0] === 0 ? -1 : 1;
            dirs = [dirs[1] * mult, dirs[0]]
        }

        currentCoord = currentCoord.zip(dirs);
    }
}

export const tests = [
    [24, 25],
    [805, 806],
    [, 369601]
]