export default function solution(input: string) {
    const captcha = input.split("\n")[0].split("");

    let sum = 0;
    for (let i = 0; i < captcha.length; i++) {
        if (captcha[i] === captcha[(i + 1) % captcha.length]) sum += +captcha[i];
    }

    return sum;
}

export const tests = [
    ["1122", 3],
    ["1111", 4],
    ["1234", 0],
    ["91212129", 9]
]