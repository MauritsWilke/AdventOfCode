export default function solution(input:string) {
    const strings = input.split("\n")
        .filter(v => 
            (v.match(/[aeiou]/gi)?.length || 0) >= 3 && 
            !v.match(/ab|cd|pq|xy/gi) && 
            v.match( /(.)\1/gm)
        );

    return strings.length;
}