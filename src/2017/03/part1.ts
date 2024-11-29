export default function solution(input: string) {
    const square = +input;
    const nearestSquare = Math.floor(Math.sqrt(square));

    const delta = [nearestSquare % 2 === 0 ? -1 : 1, 0];
    const coordinates = [
        (nearestSquare - 1) / 2,
        -(nearestSquare - 1) / 2
    ];
    if (nearestSquare % 2 === 0) {
        coordinates[0] = -(nearestSquare) / 2 + 1;
        coordinates[1] = (nearestSquare) / 2;
    }

    let currentVal = nearestSquare * nearestSquare;
    let untilDirSwap = Infinity;

    while (currentVal !== square) {
        coordinates[0] += delta[0];
        coordinates[1] += delta[1];
        untilDirSwap--;

        const root = Math.sqrt(currentVal - 1);

        if (root % 2 === 1) {
            delta[0] = 0;
            delta[1] = 1;
            untilDirSwap = root - 1;
        } else if (root % 2 === 0) {
            delta[0] = 0;
            delta[1] = -1;
            untilDirSwap = root - 1;
        } else if (untilDirSwap === 0) {
            delta[0] = delta[1] === 1 ? -1 : 1;
            delta[1] = 0;
        }

        currentVal++;
    }

    return coordinates.map(Math.abs).sum();
}

export const tests = [
    [1, 0],
    [12, 3],
    [23, 2],
    [1024, 31]
]