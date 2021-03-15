/** Insertion Sort (Ascending Order)
 * The time complexity for the worst case is O(n^2) .
 * The time complexity for the average case is O(n^2) .
 * The time complexity for the best case is O(n) .
 * The operation is performed in-place.
 * This sort IS stable.
 * 
 * Parameter(s):
 *  arr : An array, to be sorted.
 *  compareFct : A callback function which takes two arguments: "a" and "b", and which returns boolean true if "a" < "b" and boolean false if otherwise. 
 **/
function insertionSort(arr, compareFct) {
    for (let i = 1; i < arr.length; i++) {
        let j, testVal = arr[i];
        for (j = i - 1; j >= 0; j--) {
            if (compareFct(testVal, arr[j])) arr[j+1] = arr[j];
            else break;
        }
        arr[j+1] = testVal;
    }
    return arr;
}

/* Testing section */
//Example callback for numeric sorts.
function compareFct(a, b) {
    return a < b;
}

//Test the algorithm
function test(arr) {
    let testArr = [];
    if (arr) testArr = arr;
    else for (let i = 0; i < 10; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log('test 1:');
    console.log(testArr);
    console.log(insertionSort(testArr, compareFct));
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 10; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr);
    console.log(insertionSort(testArr, compareFct));
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 10; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr);
    console.log(insertionSort(testArr, compareFct));
}
test();

