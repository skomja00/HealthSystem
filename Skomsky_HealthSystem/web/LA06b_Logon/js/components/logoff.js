
"use strict";

var logoff = {};

logoff.logoff = function () {
    var content = `
        <div class='logon'>
            <div id="msgArea"></div>
        </div>
    `; // closing back tick
    document.getElementById("content").innerHTML = content;
    var url = "webAPIs/logoffAPI.jsp";
    ajaxSession({
        url: url,
        successFn:logoff,
        errorId: "msgArea"
    });
    function logoff(obj) {
        document.getElementById("msgArea").innerHTML += "Session logged off."
       
    } // end of function success

}; // end of function users.list