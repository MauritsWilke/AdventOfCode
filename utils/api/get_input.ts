export async function fetchInput(YEAR: string, DATE: string, SESSION: string) {
    const formattedDate = `0${DATE}`.slice(-2);

    try {
        await Deno.readFile(`./input/${YEAR}/${formattedDate}/input.txt`)
        console.log(`%cGET%c File already exists! Using locally cached input instead`, "background-color: orange", "background-color: none")
    } catch (_e) {

        const res = await fetch(`https://adventofcode.com/${YEAR}/day/${DATE}/input`, {
            headers: {
                "Cookie": `session=${SESSION}`,
                "User-Agent": "https://github.com/MauritsWilke/AdventOfCode by mauritswilke@gmail.com"
            }
        });

        if (!res.ok) {
            switch (res.status) {
                case 404: throw new Error(`${res.status}: This day is not yet available!`);
                case 400: throw new Error(`${res.status}: Bad credentials!`)
                default: throw new Error(`${res.status} ${res.statusText}`);
            }
        }

        const data = await res.bytes();

        console.log(`%cGET%c | Fetched the input!`, "background-color: green", "background-color: none");
        Deno.writeFileSync(`./input/${YEAR}/${formattedDate}/input.txt`, data);
    }
}