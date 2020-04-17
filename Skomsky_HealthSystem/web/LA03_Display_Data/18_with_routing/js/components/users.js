
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var users = {};

users.display = function (id) {
    
    console.log ("user.display function was called");

    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 40px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        <div id="listHere" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;

    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processJSON, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    ajax("json/allWebUsers.json", processData, "listHere");

    function processData(list) {

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var userList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {

            userList[i] = {};
            // Don't show the id (no meaningful data)
            userList[i].image = "<img  src='" + list[i].image + "'>";
            userList[i].userEmail = list[i].userEmail; // show this first
            // Don't show the password
            userList[i].birthday = list[i].birthday;
            userList[i].membershipFee = list[i].membershipFee;
            userList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
        }

        console.log("USER LIST");
        console.log(userList);

        // Making a DOM object, nothing shows yet... 
        MakeTable(userList, "listHere");
    }
};