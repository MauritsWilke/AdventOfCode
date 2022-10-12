export default function solution(input:string) {
    const movements = input.split("");

    let pos:number[] = [0,0];
    const visited:{[key: string]: any} = {
        "0.0": 1
    };

    movements.forEach(mov => {
        if(mov === "^") pos = [pos[0], pos[1] + 1];
        else if(mov === "v") pos = [pos[0], pos[1] - 1];
        else if(mov === ">") pos = [pos[0] + 1, pos[1]];
        else if(mov === "<") pos = [pos[0] - 1, pos[1]];

        visited[pos.join(".")] = visited[pos.join(".")] + 1 || 1
    })

    return Object.keys(visited).length
}