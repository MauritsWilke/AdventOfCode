export default function solution(input:string) {
	const lines = input.split("\r\n");
	let codeLength = 0;
	let memLength = 0;

	lines.forEach(line => {
		codeLength += line.length;
		const edited = line
			.replace(/\\"/g, `"`)
			.replace(/\\\\/g, "\\")
			.replace(/\\x[ABCDEF0-9]{2}/gi, "6"); // one character is one character

		memLength += edited.length - 2;
	})

	return codeLength - memLength;
}