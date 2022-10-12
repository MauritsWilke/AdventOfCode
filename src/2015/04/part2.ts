import { createHash } from "crypto"

export default function solution(input:string) {

    let digit = 0;
    let first6 = "";
    while(first6 !== "000000") {
        first6 = createHash("md5").update(input + digit).digest('hex').slice(0,6);
        digit++
    }

    return digit - 1
}