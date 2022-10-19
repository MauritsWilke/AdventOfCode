export default function solution(input:string) {
	const atoms = input.split("\r\n").filter(v => v.includes("=>"));
    let molecule = input.split("\r\n").at(-1)!;
    let atomMap:{[atom:string]: string} = {};

    atoms.forEach(atom => {
        const [name, trans] = atom.split(" => ");
        atomMap[trans] = name;
    })

	atomMap = sortObjectByKey(atomMap);

	let steps = 0;
	while(molecule !== "e"){
		const match = Object.keys(atomMap).find(v => molecule.match(v))!;
		molecule = molecule.replace(match, atomMap[match]);
		steps++;
	}

	return steps;
}


type Dict = {[key:string|number]: any}
function sortObjectByKey(object:Dict ) {
	return Object.keys(object).sort((a, b) => b.length - a.length).reduce(
		(obj:Dict, key:string) => {
			obj[key] = object[key];
			return obj;
		},
	{});
}