export default function solution(input: string) {
    const [rules, updates] = input.trim().split("\n\n");

    const mustBefore: { [key: string]: string[] } = {};
    rules.split("\n")
        .map(v => v.split("|"))
        .forEach(entry =>
            mustBefore[entry[1]]
                ? mustBefore[entry[1]].push(entry[0])
                : mustBefore[entry[1]] = [entry[0]]
        );

    return updates
        .split("\n")
        .map(v => v.split(","))
        .filter((update) => {
            return !update.every((page, i) => {
                const mustBeBefore = mustBefore[page] ?? [];
                return mustBeBefore.map(p => update.indexOf(p) < i).every(v => v);
            })
        }).map(oldOrder => oldOrder.bubbleSort((a, b) => mustBefore[a]?.includes(b) ? 1 : -1))
        .reduce((a, b) => a + +b.at((b.length - 1) / 2)!, 0);
}

const test_input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`

export const tests = [
    [test_input, 123],
    [, 4679]
]