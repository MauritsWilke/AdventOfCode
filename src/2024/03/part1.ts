export default function solution(input: string) {
    return input.match(/mul\(\d+\,\d+\)/gm)!.map(v => v.nums().product()).sum();
}

export const tests = [
    [, 165225049],
]