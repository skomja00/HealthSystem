function MakeTable(list, id) {

    // Add data as th or td (based on eleType) to row of HTML table.
    function addToRow(eleType, row, data, align) {
        var ele = document.createElement(eleType);
        ele.innerHTML = data;
        ele.style.textAlign = align;
        row.appendChild(ele);
        return ele;  // future code may need a reference to this dom object
    }

    function alignment(val) {

        // check if image
        if (val.includes("<img")) {
            return "center";
        }

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

    function prettyColumnHeading(propName) {

        if (propName.length === 0) {
            return "";
        }

        // capitalize first letter
        var newHdg = propName.charAt(0).toUpperCase();
        // iterate through all characters, inserting space before any capital letters.
        for (var i = 1; i < propName.length; i++) {
            if (propName.charAt(i) < "a") {
                newHdg += " ";
            }
            newHdg += propName.charAt(i);
        }
        return newHdg;
    } // prettyColumnHeading


    // Main Program.

    // Create a new HTML table (DOM object) and append 
    // that into the page. 
    var newTable = document.createElement("table");

    // Create a header for table and put a row in the header
    var tableHead = document.createElement("thead");
    newTable.appendChild(tableHead);
    var tableHeadRow = document.createElement("tr");
    tableHead.appendChild(tableHeadRow);

    // create one column header per property with column header content
    // matching the property name
    var obj = list[0];
    for (var prop in obj) {
        addToRow("th", tableHeadRow, prettyColumnHeading(prop), alignment(obj[prop]));
    }

    // Add one row (to HTML table) per element in the array.
    // Each array element has a list of properties that will become 
    // td elements (Table Data, a cell) in the HTML table. 
    var tableBody = document.createElement("tbody");
    newTable.appendChild(tableBody);
    for (var i in list) {
        var tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);

        // create one table data <td> content matching the property name
        var obj = list[i];
        for (var prop in obj) {
            addToRow("td", tableRow, obj[prop], alignment(obj[prop]));
        }
    }

    // The DOM object (htmlTable) will not show unless you attach it somewhere on the page.
    document.getElementById(id).innerHTML = ""; // blank out the target DOM object
    document.getElementById(id).appendChild(newTable);

}  // MakeTable