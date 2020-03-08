
"use strict";

// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var users = {};

users.display = function (id) {
    
    console.log ("user.display function was called");

    var content =   
    "    <style> " +
    "        /* override size of image from the clicksort.css */ " +
    "        .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed 'clickSort' */ " +
    "            width: 40px; " +
    "            border-radius: 6px; " +
    "            box-shadow: 3px 3px 3px #444444; " +
    "        } " +
    "    </style> " +
    "    <div id='listHere' class='clickSort'></div>";
    
    document.getElementById(id).innerHTML = content;
    
    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processData, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    var params = 
        {
            "url" : "WebAPIs/listUsersAPI.jsp",
            //"url" : "json/users.json",
            "callBackSuccess" : usersProcessData,
            "errorId" : "listHere" 
        };
    //ajax("json/users.json", usersProcessData, "listHere");
    ajax(params);

    function usersProcessData(list) {
        
        if (list["dbError"]) {
            document.getElementById(id).innerHTML = list["dbError"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };
        if (list["webUserList"][0]["errorMsg"]) {
            document.getElementById(id).innerHTML = list["webUserList"][0]["errorMsg"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };
        
        // print out JS object/array that was converted from JSON data by ajax function
        console.log("usersProcessData(list) is ");
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var userList = [];
        /* Add to userList data from json returned from ajax */
        for (var i = 0; i < list["webUserList"].length; i++) {

            userList[i] = {};
            userList[i].imageUrl = "<img  src='" + list["webUserList"][i].imageUrl + "'>";
            userList[i].userEmail = list["webUserList"][i].userEmail; // show this first
            // Don't show the password
            // Don't show private info
            userList[i].membershipFee = list["webUserList"][i].membershipFee;
            userList[i].role = list["webUserList"][i].userRoleId + " - " + list["webUserList"][i].userRoleType;
        }

        console.log("usersProcessData userList is ");
        console.log(userList);

        // Making a DOM object, nothing shows yet... 
        var params = {
            "theList" : userList,
            "targetId" : "listHere",
            "searchInputId" : "searchInputId",
            "sortOrderPropName" : "userEmail"
        };

        MakeFilterSortTable(params);
    }
};