export async function fetchInput(YEAR: string, DATE: string, SESSION: string) {
    const formattedDate = `0${DATE}`.slice(-2);

    const res = await fetch(`https://adventofcode.com/${YEAR}/day/${DATE}/input`, {
        headers: { "Cookie": `session=${SESSION}` }
    });

    if (!res.ok) throw new Error(`Received ${res.status}: ${res.statusText}\nMake sure you're requesting an existing date`);

    const data = await res.bytes();

    await Deno.readFile(`./input/${YEAR}/${formattedDate}/input.txt`)
        .then(() => console.log(`%cGET%c File already exists! Using locally cached input instead`, "background-color: orange", "background-color: none"))
        .catch(_e => {
            console.log(`%cGET%c | Fetched the input!`, "background-color: green", "background-color: none");
            Deno.writeFileSync(`./input/${YEAR}/${formattedDate}/input.txt`, data);
        })
}