/* Testing section */
//Example callback for numeric sorts. (valid for CERTAIN algorithms)
function compareFct(a, b) {
    return a > b;
}

//Test the algorithm using a specific array of values supplied as its argument
function test(arr) {
    let testArr = [];
    if (arr) testArr = arr;
    else for (let i = 0; i < 17; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log('test 1:');
    console.log(testArr.toString());
    console.log(mergeSortRecur(testArr, compareFct).toString());
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 19; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(mergeSortRecur(testArr, compareFct).toString());
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 21; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(mergeSortRecur(testArr, compareFct).toString());
}

//Batch test the algorithm. If given an integer value as its argument $arg, the function tests random number arrays of all sizes ranging from 1 to $arg. If given an array containing integers as its argument $arg, the function tests random number arrays of all sizes specified by the integers contained in $arg. If no argument is supplied, the function tests random number arrays of sizes ranging from 1 to 10.
function testBulk(arg = 10) {
    let testArr = [];
    if (Number.isInteger(arg)) {
        for (let i = 1; i <= arg; i++) {
            testArr = [];
            for (let j = 0; j < i; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${i}:`);
            console.log(testArr.toString());
            console.log(mergeSortRecur(testArr, compareFct).toString());
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) console.log(`n = ${i}: OK PASSED TEST`);
            else console.log(`n = ${i}: TEST FAILED!`);
        }
    } else if (Array.isArray(arg)) {
        arg.forEach((val, index) => {
            testArr = [];
            for (let j = 0; j < val; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${index + 1}:`);
            console.log(testArr.toString());
            console.log(mergeSortRecur(testArr, compareFct).toString());
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) console.log(`n = ${val}: OK PASSED TEST`);
            else console.log(`n = ${val}: TEST FAILED!`);
        })
    } else console.log("Invalid argument..");
}

// test([5,4,3,2,1]);
testBulk();