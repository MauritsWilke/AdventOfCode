export default function solution(input:string) {
    const strings = input.split("\n")
        .filter(v => 
            v.match(/(..).*\1/gm) &&
            v.match( /(.).\1/gm)
        );

    return strings.length;
}