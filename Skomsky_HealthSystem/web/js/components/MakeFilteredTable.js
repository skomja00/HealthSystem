function MakeFilteredTable(list, id) {

    // Add data as th or td (based on eleType) to row of HTML table.
    // local function inside of MakeTable
    function addToRow(eleType, row, data, alignment) {
        var ele = document.createElement(eleType);
        ele.innerHTML = data;
        ele.style.textAlign = alignment;
        row.appendChild(ele);
        return ele;  // future code may need a reference to this dom object
    }

    function alignment(val) {

        // check if date
        var parsedDate = Date.parse(val);
        if (isNaN(val) && (!isNaN(parsedDate))) {
            return "center";
        }

        // check if numeric (remove $ and , and then check if numeric)
        var possibleNum = val.replace("$", "");
        possibleNum = possibleNum.replace(",", "");
        if (isNaN(possibleNum)) {
            return "left";
        }
        return "right"; // it's a number

    } // alignment

    // return true if any property of obj contains searchKey. Else return false.
    function isToShow(obj, searchKey) {
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

    function addDataRows(filterValue) {

        // remove old tbody element if there is one (else you'll get sorted rows added to end of what's there).
        var oldBody = newTable.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            newTable.removeChild(oldBody[0]);
        }

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        newTable.appendChild(tableBody);
        for (var i in list) {
            if (isToShow(list[i], filterValue)) {
                console.log("adding row " + i + " to the HTML table");

                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = list[i];
                for (var prop in obj) {
                    addToRow("td", tableRow, obj[prop], alignment(obj[prop]));
                }

            } else {
                console.log("not adding row " + i + " to the HTML table");
            }
        } // for loop 
    } // addDataRows


    // Main program of MakeTable

    // Remove whatever was in the element with the given id
    document.getElementById(id).innerHTML = "Filter by: ";

    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    document.getElementById(id).appendChild(searchInput);

    // Create a new HTML table (DOM object) and append it.
    var newTable = document.createElement("table");
    document.getElementById(id).appendChild(newTable);

    // Create a header row for the HTML table
    var tableHead = document.createElement("thead");
    newTable.appendChild(tableHead);
    var tableHeadRow = document.createElement("tr");
    tableHead.appendChild(tableHeadRow);

    // create one <th> per property of (the first) list object - setting 
    // innerHTML to be the property name
    var obj = list[0];
    for (var prop in obj) {
        addToRow("th", tableHeadRow, prop, alignment(obj[prop]));
    }

    // Initially searchInput.value should be "" and when passing that to 
    // function isToShow should always return meaning all rows will initially show. 
    addDataRows(searchInput.value);

    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addDataRows(searchInput.value);
    };

}  // MakeTable