export default function solution(input: string) {
	const rooms = input.split("\r\n").filter(v => v.length);

	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	for (const room of rooms) {
		const [, name, id] = /([\w-]+)-(\d+)/gi.exec(room)!.map(v => v.replaceAll("-", ""));
		let newName = [...name].map(v => alphabet[(alphabet.indexOf(v) + +id % 26) % 26]).join("");
		if (newName.includes("objects")) return id;
	}
}