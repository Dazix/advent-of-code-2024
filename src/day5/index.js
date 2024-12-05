function partOne() {
    const input = `47|53
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
97,13,75,29,47`;

    const [rules, updates] = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
        .split(/^\n/gm)
        .filter(Boolean)
        .map(i => i.split(/\n/gm).filter(Boolean));

    const res = updates.filter(update =>
        update.split(',').every((u, index, all) => {
                if (index === 0) return true;

                const correspondingRules = rules.filter(rule => rule.startsWith(`${u}|`));
                const successors = correspondingRules.map(rule => rule.split('|')[1]);
                const successorsInUpdate = successors.filter(successor => all.includes(successor));

                return successorsInUpdate.every(successor => all.slice(index + 1).includes(successor)) // check if the successor is in the update after the current item
            }
        )
    ).reduce((acc, curr) => {
        return acc + curr.split(',').map(Number)[Math.floor(curr.split(',').length / 2)]
    }, 0);

    return res;
}

function partTwo() {
    const input = `47|53
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
97,13,75,29,47`;

    let [rules, updates] = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
        .split(/^\n/gm)
        .filter(Boolean)
        .map(i => i.split(/\n/gm).filter(Boolean));

    let res = updates.filter(update =>
        // same logic but get only wrong sequences
        !update.split(',').every((u, index, all) => {
                if (index === 0) return true;

                const correspondingRules = rules.filter(rule => rule.startsWith(`${u}|`));
                const successors = correspondingRules.map(rule => rule.split('|')[1]);
                const successorsInUpdate = successors.filter(successor => all.includes(successor));

                return successorsInUpdate.every(successor => all.slice(index + 1).includes(successor)) // get wrong sequence
            }
        )
    );

    const rulesAsNumbers = rules.map(rule => rule.split('|')).map(([a, b]) => [Number(a), Number(b)]);

    res = res.map(update => update.split(',').map(Number).sort(
        (a, b) => {
            for (let [ruleX, ruleY] of rulesAsNumbers) {
                if (ruleX === a && ruleY === b) return -1
                if (ruleX === b && ruleY === a) return 1
            }
            return 0
        }
    ))

    return res.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);
}

console.log({day: 5, firstPart: partOne(), secondPart: partTwo()});
