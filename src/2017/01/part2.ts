export default function solution(input: string) {
    const captcha = input.split("\n")[0].split("");

    const HALFWAY = captcha.length / 2;
    let sum = 0;
    for (let i = 0; i < captcha.length; i++) {
        if (captcha[i] === captcha[(i + HALFWAY) % captcha.length]) sum += +captcha[i];
    }

    return sum;
}

export const tests = [
    ["1212", 6],
    ["1221", 0],
    ["123425", 4],
    ["123123", 12],
    ["12131415", 4]
]