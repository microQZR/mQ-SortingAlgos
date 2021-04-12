/**
 * Counting Sort
 * 
 * Author:    microQZR <z.h.m@outlook.com>
 * Copyright: (c) 2021 microQZR
 * License:   MIT License <https://github.com/microQZR/mQ-SortingAlgos/blob/master/LICENSE>
 * 
 * Analysis:
 * The time complexity of this algorithm for all cases is O(n + k), whereby "n" is the size of the input array and "k" is the number of distinct keys associated with the input array elements' values.
 * The auxiliary space requirement of this algorithm for all cases is O(n + k), whereby "n" is the size of the input array and "k" is the number of distinct keys associated with the input array elements' values. In fact, "n" amount of space is used for the output array and O(k) amount of space is used to record the number of occurances of each key.
 * Note that the statements above "k" is said to be the number of distinct keys and NOT the maximum value of the keys, since in ECMAScript/JavaScript sparse arrays do not require memory allocation for uninitialized array indices between two initialized ones. 
 * 
 * Parameter(s):
 *  arr : An array, to be sorted, containing any value that has an associated integer key obtainable by invoking the callback supplied to the "keyOf" parameter with the subject value given as argument to "keyOf".
 *  keyOf: A callback function which DETERMINISTICALLY returns an integer as the key associated with the value of this its argument.
 * 
 * Return value:
 *  A new array containing the value of argument "arr"'s elements sorted in ascending order according to those values' numeric key.
 **/
function countingSort(arr, keyOf) {
    let count = [], output = [];

    arr.forEach(value => { //Record the number of occurances of each distinct key
        if (count[keyOf(value)] === undefined) count[keyOf(value)] = 1;
        else count[keyOf(value)] += 1;
    })
    count.reduce((accum, v, i, a) => { //Compute the index in the output array where the first value associated with any given key shall be copied to.
        a[i] = accum;
        return v + accum;
    }, 0);
    arr.forEach(value => { //Copy the value of each element from the input array into the correct position within the output array.
        output[count[keyOf(value)]] = value;
        count[keyOf(value)]++;
    })

    return output;
};

/* Testing section */
//Example callback for handling numeric values which also act as their own key.
function keyOf(val) { return val; }

//Test the algorithm using a specific array of values supplied as its argument
function test(arr) {
    let testArr = [];
    if (arr) testArr = arr;
    else for (let i = 0; i < 17; i++) testArr.push(Math.floor(Math.random() * 11));
    console.log('test 1:');
    console.log(testArr.toString());
    testArr = countingSort(testArr, keyOf);
    console.log(testArr.toString());
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 19; i++) testArr.push(Math.floor(Math.random() * 11));
    console.log(testArr.toString());
    testArr = countingSort(testArr, keyOf);
    console.log(testArr.toString());
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 21; i++) testArr.push(Math.floor(Math.random() * 11));
    console.log(testArr.toString());
    testArr = countingSort(testArr, keyOf);
    console.log(testArr.toString());
}

//Batch test the algorithm. If given an integer value as its argument $arg, the function tests random number arrays of all sizes ranging from 1 to $arg. If given an array containing integers as its argument $arg, the function tests random number arrays of all sizes specified by the integers contained in $arg. If no argument is supplied, the function tests random number arrays of sizes ranging from 1 to 10.
function testBulk(arg = 10) {
    let testArr = [];
    let totalCount, successCount = 0, failCount = 0;
    if (Number.isInteger(arg)) {
        totalCount = arg;
        for (let i = 1; i <= arg; i++) {
            testArr = [];
            for (let j = 0; j < i; j++) testArr.push(Math.floor(Math.random() * 11));
            console.log(`test ${i}:`);
            console.log(testArr.toString());
            testArr = countingSort(testArr, keyOf);
            console.log(testArr.toString());
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) {
                console.log(`n = ${i}: OK PASSED TEST`);
                successCount++;
            }
            else {
                console.log(`n = ${i}: TEST FAILED!`);
                failCount++;
            }
        }
    } else if (Array.isArray(arg)) {
        totalCount = arg.length;
        arg.forEach((val, index) => {
            testArr = [];
            for (let j = 0; j < val; j++) testArr.push(Math.floor(Math.random() * 11));
            console.log(`test ${index + 1}:`);
            console.log(testArr.toString());
            testArr = countingSort(testArr, keyOf);
            console.log(testArr.toString());
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) {
                console.log(`n = ${val}: OK PASSED TEST`);
                successCount++;
            }
            else {
                console.log(`n = ${val}: TEST FAILED!`);
                failCount++;
            }
        })
    } else console.log("Invalid argument..");

    if (successCount === 0) console.log(`Total test count: ${totalCount}\tALL FAILED!`);
    else if (successCount === totalCount) console.log(`Total test count: ${totalCount}\tALL PASSED.`);
    else console.log(`Total test count: ${totalCount}\t\t${successCount} PASSED\t${failCount} FAILED`);
}

// test([5,4,3,2,1]);
testBulk();