export default function solution(input:string) {
	const lines = input.split("\r\n");
	let codeLength = 0;
	let newLength = 0;

	lines.forEach(line => {
		codeLength += line.length;
		const edited = `"${
			line
				.replace(/\\/g, "\\\\")
				.replace(/"/g, `\\"`)
		}"`;

		newLength += edited.length;
	})

	return newLength - codeLength;
}