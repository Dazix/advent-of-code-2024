function partOne() {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    const data = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
        .split(/\n/)
        .reduce((acc, curr) => {
            acc.push(curr.split(''));
            return acc;
        }, [])
        .filter(a => a.length > 0);
    let count = 0;

    for (let y = 0; y < data.length; y++) {
        const row = data[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === 'X') {
                // up
                if (y > 2 && data[y - 1][x] === 'M' && data[y - 2][x] === 'A' && data[y - 3][x] === 'S') {
                    count++;
                }
                // down
                if (
                    y < data.length - 3 &&
                    data[y + 1][x] === 'M' &&
                    data[y + 2][x] === 'A' &&
                    data[y + 3][x] === 'S'
                ) {
                    count++;
                }
                //left
                if (x > 2 && data[y][x - 1] === 'M' && data[y][x - 2] === 'A' && data[y][x - 3] === 'S') {
                    count++;
                }
                //right
                if (x < row.length - 1 && row[x + 1] === 'M' && row[x + 2] === 'A' && row[x + 3] === 'S') {
                    count++;
                }

                // diagonal up left
                if (
                    y > 2 &&
                    x > 2 &&
                    data[y - 1][x - 1] === 'M' &&
                    data[y - 2][x - 2] === 'A' &&
                    data[y - 3][x - 3] === 'S'
                ) {
                    count++;
                }
                // diagonal up right
                if (
                    y > 2 &&
                    x < row.length - 1 &&
                    data[y - 1][x + 1] === 'M' &&
                    data[y - 2][x + 2] === 'A' &&
                    data[y - 3][x + 3] === 'S'
                ) {
                    count++;
                }
                // diagonal down left
                if (
                    y < data.length - 3 &&
                    x > 2 &&
                    data[y + 1][x - 1] === 'M' &&
                    data[y + 2][x - 2] === 'A' &&
                    data[y + 3][x - 3] === 'S'
                ) {
                    count++;
                }
                // diagonal down right
                if (
                    y < data.length - 3 &&
                    x < row.length - 1 &&
                    data[y + 1][x + 1] === 'M' &&
                    data[y + 2][x + 2] === 'A' &&
                    data[y + 3][x + 3] === 'S'
                ) {
                    count++;
                }
            }
        }
    }

    return count;
}

function partTwo() {
    const input = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

    const data = (typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
        .split(/\n/)
        .reduce((acc, curr) => {
            acc.push(curr.split(''));
            return acc;
        }, [])
        .filter(a => a.length > 0);
    let count = 0;

    for (let y = 0; y < data.length; y++) {
        const row = data[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === 'A' && y > 0 && x > 0 && y < data.length - 1 && x < row.length - 1) {
                // ' \ '
                if (
                    ((data[y - 1][x - 1] === 'M' && data[y + 1][x + 1] === 'S') ||
                        (data[y - 1][x - 1] === 'S' && data[y + 1][x + 1] === 'M')) &&
                    ((data[y - 1][x + 1] === 'M' && data[y + 1][x - 1] === 'S') ||
                        (data[y - 1][x + 1] === 'S' && data[y + 1][x - 1] === 'M'))
                ) {
                    count++;
                }
            }
        }
    }

    return count;
}

console.log({day: 4, firstPart: partOne(), secondPart: partTwo()});
