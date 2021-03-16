/** Selection Sort (Ascending Order)
 * Operation: For each element in the collection to be sorted, find the lowest valued element among the current element and those that follow it, then swap the current element with the lowest-valued element found.
 * The time complexity is θ(n*(n-1) / 2) and O(n^2) for all cases.
 * The operation is performed in-place.
 * This sort is NOT stable.
 * 
 * Parameter(s):
 *  arr : An array, to be sorted.
 *  compareFct : A callback function which takes two arguments: "a" and "b", and which returns boolean true if "a" < "b" and boolean false if otherwise. 
 **/
function selectionSort(arr, compareFct) {
    for (let i = 0; i < arr.length - 1; i++) {
        let swapIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (compareFct(arr[j], arr[swapIndex])) swapIndex = j;
        }
        if (i !== swapIndex) [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
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
    console.log(selectionSort(testArr, compareFct));
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 10; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr);
    console.log(selectionSort(testArr, compareFct));
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 10; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr);
    console.log(selectionSort(testArr, compareFct));
}
test([5,4,3,2,1]);