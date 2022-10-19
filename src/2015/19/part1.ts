export default function solution(input:string) {

    const atoms = input.split("\n").filter(v => v.includes("=>"));
    const molecule = input.split("\n").at(-1)!;
    const atomMap:{[atom:string]: string[]} = {};

    atoms.forEach(atom => {
        const [name, trans] = atom.split(" => ");
        atomMap[name] ??= [];
        atomMap[name].push(trans);
    })

    const madeAtoms = new Set();
    const splittedMolecule = molecule.match(/[A-Z][a-z]*/gm)!;

    splittedMolecule.forEach((part, index) => {
        if(atomMap[part] !== undefined){
            atomMap[part].forEach(replacement => {
                const copy = [...splittedMolecule];
                copy[index] = replacement;
                madeAtoms.add(copy.join(""));
            })
        }
    })

    return madeAtoms.size;
}