export default function solution(input: string) {
    const lists = input.split("\n").filter(v => v !== "").map(v => v.split(/\s+/));

    const listA: number[] = [];
    const listB: number[] = [];

    lists.forEach(v => {
        listA.push(+v[0]);
        listB.push(+v[1]);
    })

    listA.sort((a, b) => a - b);

    const counts: { [key: string]: number } = {};
    for (const num of listB) counts[num] = counts[num] ? counts[num] + 1 : 1;

    let sum = 0;
    listA.forEach((v) => sum += v * (counts[v] ?? 0));
    return sum;
}

export const tests = [
    [, 18567089],
]