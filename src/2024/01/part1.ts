export default function solution(input: string) {
    const lists = input.split("\n").filter(v => v !== "").map(v => v.split(/\s+/));

    const listA: number[] = [];
    const listB: number[] = [];

    lists.forEach(v => {
        listA.push(+v[0]);
        listB.push(+v[1])
    })

    listA.sort((a, b) => a - b);
    listB.sort((a, b) => a - b);

    let sum = 0;
    listA.forEach((v, i) => sum += Math.abs(v - listB[i]));
    return sum;
}

export const tests = [
    [, 2000468],
]