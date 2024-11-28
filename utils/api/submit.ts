export async function submit(YEAR: string, DATE: string, PART: string, SESSION: string, ATTEMPT: string) {
    console.log(`Solving for ${YEAR} day ${DATE} part ${PART} with answer: ${ATTEMPT}`);

    const res = await fetch(`https://adventofcode.com/${YEAR}/day/${DATE}/answer`, {
        method: "POST",
        headers: {
            "Cookie": `session=${SESSION}`,
            "content-type": "application/x-www-form-urlencoded",
            "User-Agent": "https://github.com/MauritsWilke/AdventOfCode by mauritswilke@gmail.com"
        },
        body: `level=${PART}&answer=${ATTEMPT}`
    });

    const data = await res.text();
    const main = data.match(/<main>(.|\n)*<\/main>/gm)?.[0];

    if (!main) throw new Error(`${data}\n\nSomething went wrong trying to parse the document`);

    if (main.match(/That's the right answer/gm)) {
        console.log(`%c⭐ Part ${PART} solved!`, "background-color: green");
    } else if (main.match(/That's not the right answer/gm)) {
        console.log(`%cWrong answer!`, "background-color: red");
        const info = main.replaceAll(/<([a-z][\s\S]*?)\s*\/?>|<\/([a-z][\s\S]*?)\s*\/?>/gm, "");
        console.log(`\n${info}\n`);
    } else if (main.match(/You gave an answer too recently/gm)) {
        console.log(`%You gave an answer too recently`, "background-color: orange");
    } else if (main.match(/You don't seem to be solving the right level/)) {
        console.log(`%cYou already completed this or it is still locked`, "background-color: yellow");
    } else {
        console.log(main);
    }
}