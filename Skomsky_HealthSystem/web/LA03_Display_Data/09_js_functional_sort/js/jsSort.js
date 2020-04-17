// This function sorts the array of objects in "list" by object property "byProperty". 
// Think of list as an I/O parameter (gets changed by the fn).

function jsSort(list, byProperty) {

    // using q and z just to show there's nothing magical about a and b. 
    // q and z are just elements in the array and the funcction has to return negative or positive or zero 
    // depending on the comparison of q and z.
    // using JS associative array notation (property name char string used inside square brackets 
    // as it if was an index value). 

    list.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
        // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.

        // using JS associative array notation, extract the 'byProperty' property from the two
        // list elements so you can compare them.
        var qVal = q[byProperty];
        var zVal = z[byProperty];

        var c = 0;
        if (qVal > zVal) {
            c = 1;
        } else if (qVal < zVal) {
            c = -1;
        }
        console.log("comparing " + qVal + " to " + zVal + " is " + c);
        return c;
    });
}

// This version of sort (above) uses the JavaScript sort method that is available on all arrays. 
// W3Schools referece: https://www.w3schools.com/js/js_array_sort.asp
// You provide (as input to the array.sort method) a function that (compares two elements within the array) \
// and returns an integer, negative if first is less than second, 0 if equal, otherwise positive.  

// Here was the W3Schools example:
var points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) { // a and b are both elements of the array (you can call them anything)...
    return a - b;
});