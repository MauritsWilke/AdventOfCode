import "../src/utils/index.ts";

export async function run(currentYear: string, currentDate: string, part: string | number, input?: string) {
    const formattedDate = `0${currentDate}`.slice(-2);

    if (!input) input = await Deno.readFile(`./input/${currentYear}/${formattedDate}/input.txt`)
        .then(c => new TextDecoder("utf-8").decode(c));

    const { default: solution } = await import(`../src/${currentYear}/${formattedDate}/part${part}.ts?t=${Date.now()}`);
    const attempt = solution(input);

    return attempt;
}