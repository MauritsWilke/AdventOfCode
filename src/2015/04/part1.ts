import { createHash } from "crypto"

export default function solution(input:string) {

    let digit = 0;
    let first5 = "";
    while(first5 !== "00000") {
        first5 = createHash("md5").update(input + digit).digest('hex').slice(0,5);
        digit++
    }

    return digit - 1
}