/** Quicksort
 * Description:
 * This implementation of quicksort uses Lomuto's partitioning scheme.
 * 
 * Optimizations:
 * => This implementation uses the median-of-three approach for selecting an approptiate pivot value in order to reduce the probability of occurance of quicksort's worst case time complexity of O(n^2). This is achieved by selecting the median of three sample values from a given partition which provides a better estimate of the true median compared to any sample of a single value. In this implementation, selection of the pivot value using median-of-three is only used for partitions of size 6 and greater, since for partitions of size 5 and under, the benefits incurred are outweight by the overhead of theselection process.
 * => Following partitioning, the recursive calls are first applied on the smaller partitions, so as that the larger partitions are processed in the tail calls. This ensures that auxiliary space requirement is limited to O(log(n)) even in the worst case. Without this, auxiliary space requirement may potantially reach O(n).
 * 
 * Analysis:
 * The time complexity of this algorithm for the best and the average case is O(n*log(n)) .
 * The time complexity of this algorithm for the worst case is O(n^2) .
 * This sort IS performed in-place. The auxiliary space requirement of this implementation is O(log(n)) for the purpose of maintaining stack pointers and variables of the recursive calls.
 * This sort is NOT stable.
 * 
 * Note:
 * In this source file, the function "quicksort()" is defined twice. Both represent the exact same algorithm and execute the same instructions. However, the first definition is a demonstration version intended to clearly outline the various components of this implementation, while the second definition is a refactored version of the first which removed some wrapper code and is suitable for production.
 * 
 * Parameter(s):
 *  arr : An array, to be sorted.
 *  compareFct : A callback function which takes two arguments: "a" and "b", and which returns boolean true if "a" < "b" and boolean false if otherwise.
 * 
 * Return value:
 *  The sorted array "arr"
 **/
//Demonstration version
function quicksort(arr, compareFct) {
    //The recursive sort function
    function sort(lo, hi) {
        if (lo >= hi) return; //Return immediately if this call corresponds to the base case scenarios of a single-element partition or a zero-element partition.

        let center = partition(lo, hi); //Perform paritioning
        if (center - 1 - lo <= hi - (center + 1)) { //Make the recursive call first on the smaller of the two partitions.
            sort(lo, center -1);
            sort(center + 1, hi);
        } else {
            sort(center + 1, hi);
            sort(lo, center -1);
        }
    };

    //The partitioning function. This implementation uses Lomuto's partition scheme.
    function partition(lo, hi) {
        choosePivot(lo, hi); //Selects an appropriate pivot.
        let pivotVal = arr[hi];
        let swapIndex = lo; //A pointer indicating the next position of the array to swap into.
        for (let i = lo; i < hi; i++) {
            if (compareFct(arr[i], pivotVal)) {
                [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
                swapIndex++;
            }
        }
        [arr[hi], arr[swapIndex]] = [arr[swapIndex], arr[hi]]; //Swaps the pivot value into the center of the current partition at the end of the current iteration.
        return swapIndex;
    };

    //Implementation of the median-of-three algorithm for selecting an appropriate pivot point.
    function choosePivot(lo, hi) {
        if (hi - lo + 1 >= 6) { //Skip this entire process if the length of the partition is below a threshold, in which case executing this procedure is relatively less effective.
            let midIndex = Math.floor((lo + hi) / 2);
            if (compareFct(arr[midIndex], arr[lo])) [arr[midIndex], arr[lo]] = [arr[lo], arr[midIndex]];
            if (compareFct(arr[hi], arr[lo])) [arr[hi], arr[lo]] = [arr[lo], arr[hi]];
            if (compareFct(arr[midIndex], arr[hi])) [arr[midIndex], arr[hi]] = [arr[hi], arr[midIndex]];
        }
    }

    sort(0, arr.length - 1);
    return arr;
};

//Production version
function quicksort(arr, compareFct) {
    function sort(lo, hi) {
        if (lo >= hi) return;

        if (hi - lo + 1 >= 6) { //Skip this entire process if the length of the partition is below a threshold, in which case executing this procedure is relatively less effective.
            let midIndex = Math.floor((lo + hi) / 2);
            if (compareFct(arr[midIndex], arr[lo])) [arr[midIndex], arr[lo]] = [arr[lo], arr[midIndex]];
            if (compareFct(arr[hi], arr[lo])) [arr[hi], arr[lo]] = [arr[lo], arr[hi]];
            if (compareFct(arr[midIndex], arr[hi])) [arr[midIndex], arr[hi]] = [arr[hi], arr[midIndex]];
        }
        let pivotVal = arr[hi];
        let swapIndex = lo; //A pointer indicating the next position of the array to swap into.
        for (let i = lo; i < hi; i++) if (compareFct(arr[i], pivotVal)) {
                [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
                swapIndex++;
            }
        [arr[hi], arr[swapIndex]] = [arr[swapIndex], arr[hi]]; //Swaps the pivot value into the center of the current partition at the end of the current iteration.

        if (swapIndex - 1 - lo <= hi - (swapIndex + 1)) { //Make the recursive call first on the smaller of the two partitions.
            sort(lo, swapIndex -1);
            sort(swapIndex + 1, hi);
        } else {
            sort(swapIndex + 1, hi);
            sort(lo, swapIndex -1);
        }
    };

    sort(0, arr.length - 1);
    return arr;
};


/* Testing section */
//Example callback for numeric sorts. (valid for CERTAIN algorithms)
function compareFct(a, b) {
    return a < b;
}

//Test the algorithm using a particular array of values
function test(arr) {
    let testArr = [];
    if (arr) testArr = arr;
    else for (let i = 0; i < 17; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log('test 1:');
    console.log(testArr.toString());
    console.log(quicksort(testArr, compareFct).toString());
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 19; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(quicksort(testArr, compareFct).toString());
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 21; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(quicksort(testArr, compareFct).toString());
}

//Batch test the algorithm
function testBulk(arg = 10) {
    let testArr = [];
    let totalCount, successCount = 0, failCount = 0;
    if (Number.isInteger(arg)) {
        totalCount = arg;
        for (let i = 1; i <= arg; i++) {
            testArr = [];
            for (let j = 0; j < i; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${i}:`);
            console.log(testArr.toString());
            console.log(quicksort(testArr, compareFct).toString());
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
            for (let j = 0; j < val; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${index + 1}:`);
            console.log(testArr.toString());
            console.log(quicksort(testArr, compareFct).toString());
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