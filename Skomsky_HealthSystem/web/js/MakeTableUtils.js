
"use strict";

/*
 * MakeTableUtils is a "library" of private utilities/functions used in various MakeTable* content. 
 * Following is the list of included functions;
 * 
 * Fn. jsSort Sorts the list itself (i.e. in-place)  
 * Fn. addToRow() Add data as th or td (based on eleType) to row of HTML table.
 * Fn. alignment() Returns alignment based on implied type of val parameter
 * Fn. isToShow()  return true if any property of obj contains searchKey. Else return false.
 * Fn. addDataRows()
 * 
/*
 * Fn. jsSort Sorts the list itself (i.e. in-place)  
 *     @param {json} list - from the webAPI
 *     @param {string} byProperty - json property used to sort the list 
 *     @returns {} 
 */function jsSort(list, byProperty) {

    // To use the built-in sort method (that is available to any JS array),
    // you pass it a function that compares two of the elements of the array
    // and returns 1, 0 or -1 depending on how the two elements compare with each other.

    list.sort(function (q, z) {  // in line anonymous fn to compare list elements. 
        // returns positive (if first bigger), 0 if equal, negative otherwise.

        // using JS associative array notation, extract the 'byProperty' property from the two
        // list elements so you can compare them.
        // By applying the convert function, each string value is converted to the actual data 
        // type, for example "123" is converted to 123. 
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
    } // end of the anonymous comparision function
    );

    // check the string to see what type it is, then return that string converted to the right type 
    // so as to get the sort order correct. 
    function convert(s) {

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

// Add data as th or td (based on eleType) to row of HTML table.
/* Fn. addToRow() Add data as th or td (based on eleType) to row of HTML table.
 *     @param {string} eleType -  type of DOM element to add (e.g. <th>, <td>) 
 *     @param {DOM element} row - DOM Element to add 
 *     @param {json[key]} data - value from json to add to element.innerHTML
 *     @param {string} alignment - left, center, right justify data 
 *     @returns {DOM element} Return the constructed DOM element
 */function addToRow(eleType, row, data, alignment) {
    var ele = document.createElement(eleType);
    ele.innerHTML = data;
    ele.style.textAlign = alignment;
    row.appendChild(ele);
    return ele;  // future code may need a reference to this dom object
}

/* Fn. alignment() Returns alignment based on implied type of val parameter
 *     @param {object} val - value to align 
 *     @returns {string} if date return "center", string align "left" otherwise it's a number align "right" 
 */function alignment(val) {
    // check if date
    var parsedDate = Date.parse(val);
    if (isNaN(val) && (!isNaN(parsedDate))) {
        return "center";
    }
    // check if numeric (remove $ and , and then check if numeric)
    var possibleNum = val.replace("$","");
    possibleNum = possibleNum.replace(",","");
    if (isNaN(possibleNum)) {
        return "left";
    } 
    return "right"; // it's a number
} // alignment

// return true if any property of obj contains searchKey. Else return false.
/*
 * Fn. isToShow()  return true if any property of obj contains searchKey. Else return false.
 *     @param {obj} obj - object to be searched
 *     @param {string} searchKey - target value of search
 *     @returns {string} true if found. otherwise return false 
 */ function isToShow(obj, searchKey) {
    if (!searchKey || searchKey.length === 0) {
        return true; // show the object if searchKey is empty
    }
    var searchKeyUpper = searchKey.toUpperCase();
    for (var prop in obj) {
        var propVal = obj[prop]; // associative array, using property name as if index. 
        console.log("checking if " + searchKeyUpper + " is in " + propVal);
        var propValUpper = propVal.toUpperCase();
        if (propValUpper.includes(searchKeyUpper)) {
            console.log("yes it is inside");
            return true;
        }
    }
    console.log("no it is not inside");
    return false;
} // isToShow

/* Fn. addDataRows()
 *     @param {json} obj - list to search
 *     @param {string} filterValue - add to list if filterValue is found in any value of the json
 *     @returns {json}  
 * 
 */function addDataRows(list, filterValue) {

    var filteredList = [{}];

    for (var i in list) {
        if (isToShow(list[i], filterValue)) {
            console.log("adding row " + i);
            filteredList = list[i];
        } else {
            console.log("not adding row " + i);
        }
    } // for loop 
    return filteredList;
} // addDataRows
