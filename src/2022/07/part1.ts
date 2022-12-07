export default function solution(input: string) {
	const splitLines = input.split("\n");

	type Dir = { name: string, parent: string, children: string[], size: number, totalSize: number }
	const fs: { [key: string]: Dir } = {};
	let current = "";

	for (const line of splitLines) {
		if (line.includes("$ c")) {
			const args = line.replace("$ cd ", "");

			if (args === null) return;
			if (args === "..") current = current.replace(/\.\w+$/, "");
			else {
				current += `.${args}`;
				fs[current] = { name: current, parent: current, children: [], size: 0, totalSize: 0 }
			}
		}
		if (line.includes("dir")) {
			const name = `${current}.${line.match(/\w+/g)![1]}`;
			fs[name] = { name: name, parent: current, children: [], size: 0, totalSize: 0 }
			fs[current].children.push(name);
		} else fs[current].size += +line.match(/\d+/)!;
	}

	function getTotalSize(dir: Dir) {
		let size = dir.size;
		for (let child of dir.children) size += getTotalSize(fs[child]);
		return size;
	}
	for (const [k, v] of Object.entries(fs)) v.totalSize = getTotalSize(v);

	const sum = Object.values(fs).reduce((a, b) => a += b.totalSize > 100_000 ? 0 : b.totalSize, 0);
	return sum;
}