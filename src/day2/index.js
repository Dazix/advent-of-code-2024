const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const data = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
    .split(/\n/)
    .reduce((acc, curr) => {
        acc.push(
            curr
                .split(' ')
                .filter(a => a.length > 0)
                .map(Number),
        );
        return acc;
    }, [])
    .filter(a => a.length > 0);

const checkSequence = seq => {
    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    const sortedAsc = [...seq].sort((a, b) => a - b);
    const sortedDesc = [...seq].sort((a, b) => b - a);

    if (!arraysEqual(seq, sortedAsc) && !arraysEqual(seq, sortedDesc)) {
        return false;
    }

    const countDifferences = arr => {
        const differences = [];
        for (let i = 0; i < arr.length - 1; i++) {
            differences.push(Math.abs(arr[i] - arr[i + 1]));
        }
        return differences;
    };

    const differences = countDifferences(seq);

    if (!(Math.max(...differences) <= 3 && Math.min(...differences) >= 1)) {
        return false;
    }

    return seq;
};

function partOne(data) {
    const res = data.map(checkSequence).filter(Boolean);

    return res.length;
}

function partTwo(data) {
    const generateArraysWithOneItemDeleted = arr => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const newArr = arr.slice(0, i).concat(arr.slice(i + 1));
            result.push(newArr);
        }
        return result;
    };

    const res = data
        .map(seq => {
            const result = checkSequence(seq);
            if (result !== false) {
                return result;
            }

            return generateArraysWithOneItemDeleted(seq).find(checkSequence);
        })
        .filter(Boolean);

    return res.length;
}

console.log({day: 2, firstPart: partOne(data), secondPart: partTwo(data)});
