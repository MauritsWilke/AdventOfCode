export default function solution(input:string) {
    const movements = input.split("");

    let pos:number[] = [0,0];
    let posRob:number[] = [0,0];

    const visited:{[key: string]: any} = {
        "0.0": 1
    };

    movements.forEach((mov, index) => {
        if(index % 2 === 0) pos = mod(pos, mov, visited);
        else posRob = mod(posRob, mov, visited);
    })

    return Object.keys(visited).length
}

function mod(pos:number[], mov:string, visited:{[key:string]: any}){
    if(mov === "^") pos = [pos[0], pos[1] + 1];
    else if(mov === "v") pos = [pos[0], pos[1] - 1];
    else if(mov === ">") pos = [pos[0] + 1, pos[1]];
    else if(mov === "<") pos = [pos[0] - 1, pos[1]];

    visited[pos.join(".")] = visited[pos.join(".")] + 1 || 1;

    return pos;
}