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
        var qVal = convert(q[byProperty]);
        var zVal = convert(z[byProperty]);

        var c = 0;
        if (qVal > zVal) {
            c = 1;
        } else if (qVal < zVal) {
            c = -1;
        }
        console.log("comparing " + qVal + " to " + zVal + " is " + c);
        return c;
    });

    // check the string to see what type it is, then return that string converted to the right type 
    // so as to get the sort order correct. 
    function convert (s) {

        if (!s || s.length === 0) {
            //console.log("s is null or empty string");
            return -1;
        }

        // a string that holds a date returns true for isNaN(strDate) (it's not a number)  
        // And it returns false for isNaN(Date.parse(strDate))
        var parsedDate = Date.parse(s);
        if (isNaN(s) && !isNaN(parsedDate)) {
            //console.log(s + " is a Date ");
            return parsedDate;
        } else {
            var tmp = s;
            console.log("tmp is " + tmp);
            tmp = tmp.replace("$", ""); // remove dollar signs
            tmp = tmp.replace(",", ""); // remove commas
            if (isNaN(tmp)) { // if not a number, return what was passed in 
                //console.log(s + " is a string - convert to uppercase for sorting purposes");
                return s.toUpperCase();
            } else {
                //console.log(tmp + " is a number");
                return Number(tmp);
            }
        }
    } // convert 
    
} // jsSort