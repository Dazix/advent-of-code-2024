function partOne() {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
    return [
        ...(typeof window === 'undefined' ? input : document.querySelector('pre').innerText).matchAll(
            /mul\((\d{1,3}),(\d{1,3})\)/gm,
        ),
    ].reduce((acc, curr) => (acc += parseInt(curr[1]) * parseInt(curr[2])), 0);
}

function partTwo() {
    const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    return [
        ...(typeof window === 'undefined' ? input : document.querySelector('pre').innerText)
            .split('do()')
            .map(str => (!str.includes("don't()") ? str : str.slice(0, str.indexOf("don't()"))))
            .join()
            .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm),
    ].reduce((acc, curr) => acc + parseInt(curr[1]) * parseInt(curr[2]), 0);
}

console.log({day: 3, firstPart: partOne(), secondPart: partTwo()});
