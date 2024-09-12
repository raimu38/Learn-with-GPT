var inputArray = [1, 2, 3, 4, 5];
function processArray(array) {
    var newArray = array.map(function (value) {
        if (value % 2 === 0) {
            return value * 2;
        }
        else {
            return null;
        }
    });
    return newArray;
}
var result = processArray(inputArray);
console.log(result);
