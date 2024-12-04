const input = `3   4
4   3
2   5
1   3
3   9
3   3
`;

const data = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText).split(/\n/).reduce(
    (acc, curr) => {
        const data = curr.split(' ').filter(Boolean);

        !isNaN(parseInt(data[0])) && acc.first.push(parseInt(data[0]));
        !isNaN(parseInt(data[1])) && acc.second.push(parseInt(data[1]));
        return acc;
    },
    {first: [], second: []},
);

function partOne(data) {
    data.first = data.first.sort((a, b) => a - b);
    data.second = data.second.sort((a, b) => a - b);

    return data.first.reduce((acc, curr, index) => {
        return acc + Math.abs(curr - data.second[index]);
    }, 0);
}

function partTwo(data) {
    return data.first
        .map(value => data.second.filter(item => item === value).length * value)
        .reduce((acc, curr) => acc + curr, 0);
}

console.log({day: 1, firstPart: partOne(data), secondPart: partTwo(data)});
