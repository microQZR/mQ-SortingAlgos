/** The Fisher-Yates algorithm uniformly shuffles the elements of a collection (in the case of this implementation, an array).
 * The operation is performed in-place.
 * The time complexity is O(n) for all cases.
 * 
 * Parameter(s):
 *  arr : An array, to be shuffled.
 * 
 * Return value:
 * The shuffled array "arr".
 **/
function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //This statement needs to use "Math.floor()" in conjunction with the expression "(i + 1)" instead of using "Math.round()" in conjuction with the expression "i", since Math.round() has a probability distribution over the range of return values that is skewed at both tails (in most cases) whereby the lowest possible integer and the highest possible integer have half the probability of being returned than any integer in-between them.

        let temp = arr[j]; arr[j] = arr[i]; arr[i] = temp;
    }
    return arr;
}