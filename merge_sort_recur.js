/**
 * Merge Sort (Top-down / recursive approach)
 * 
 * Author:    Zi Han Meng <zi.han.meng100@gmail.com>
 * Copyright: (c) 2021 Zi Han Meng
 * License:   MIT License <https://github.com/zymzy/mQ-SortingAlgos/blob/master/LICENSE>
 * 
 * Optimizations:
 * => During the merge operation, only the first of the two sub-arrays is copied out into a working buffer, while the 2nd sub-array is kept in-place. As a result, the amount of buffer space used by this algorithm is 1/2*n as would be required for the final and largest merge operation. Such is a slight improvement compared to the commonly occurring buffer space requirement of 1*n found in many other implementations of merge sort.
 * => Since one of the two sub-arrays is kept in-place during merge operations, this also results in a reduction of total read/write operations by a mininum of 25%.
 * => If elements of the second sub-array for a given merge operation are larger than the largest element of the first sub-array, then no operation is performed on them as they would already be located at the correct position in the merged segment, thus saving comparisons as well as reads and writes.
 * 
 * Analysis:
 * The time complexity of this algorithm for the best, worst and average case is O(n*log(n)) .
 * This sort is NOT performed in-place. The auxiliary working space required by this algorithm is 1/2*n used by the working buffer array, plus up to O(log(n)) for maintaining stack pointers and variables of the recursive calls.
 * This sort IS stable.
 * 
 * Parameter(s):
 *  arr : An array, to be sorted.
 *  compareFct : A callback function which takes two arguments: "a" and "b", and which returns boolean true if "a" <= "b" and boolean false if otherwise.
 * 
 * Return value:
 *  The sorted array "arr"
 **/
function mergeSortRecur(arr, compareFct) {
    let buffer = [];
    function mergeSort(start_i, end_i) { //$start_i and $end_i are inclusive smallest and largest indices of the sub-array to merge sort.
        if (start_i == end_i) return; //If $start_i == $end_i, then the sub-array to sort is the singleton base case, so just return.

        let mid = Math.floor((start_i + end_i) / 2); //This becomes the inclusive last index of the first sub-array.
        mergeSort(start_i, mid);
        mergeSort(mid + 1, end_i);

        merge(start_i, mid, end_i);
    }

    function merge(p, q, r) {
        let length_pq = q - p + 1;
        for (let i = 0; i < length_pq; i++) buffer[i] = arr[p + i]; //Copy only the first sub-array to merge into the buffer

        let i = 0, j = q + 1, k = p;
        while (i < length_pq && j < r + 1) {
            if (compareFct(buffer[i], arr[j])) arr[k] = buffer[i++]; //If lowest element in buffer is smaller than the lowest element in the 2nd sub-array, copy the lowest element from the buffer into the next available slot of the merged array segment.
            else arr[k] = arr[j++]; //If the above is not true, copy the lowest element from the 2nd sub-array directly into the next available slot of the merged array segment.
            k++;
        }
        while (i < length_pq) arr[k++] = buffer[i++]; //Copies the remaining elements of the buffer if the elements of the 2nd sub-array is spent. If the elements in the buffer would be spent, no need to copy over the remaining elements of the 2nd sub-array as they would be already in right place.
    }

    mergeSort(0, arr.length - 1);
    return arr;
}


/* Testing section */
//Example callback for numeric sorts.
function compareFct(a, b) {
    return a <= b;
}

//Test the algorithm using a particular array of values
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

//Batch test the algorithm
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