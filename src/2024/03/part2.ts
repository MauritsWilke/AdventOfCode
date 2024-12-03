export default function solution(input: string) {
    const i = input.match(/mul\(\d+\,\d+\)|don\'t\(\)|do\(\)/gm)!;

    let active = true;
    let sum = 0;
    i.forEach(v => {
        if (v.match(/don't\(\)/)) active = false;
        if (v.match(/do\(\)/)) active = true;
        else if (active) sum += v.nums().product()
    })

    return sum;
}

export const tests = [
    ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", 48],
    [, 108830766]
]