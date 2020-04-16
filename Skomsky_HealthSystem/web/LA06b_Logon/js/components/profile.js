
"use strict";

var profile = {};

profile.display = function () {
    var content = `
        <div class='logon'>
            <div id="msgArea"></div>
        </div>
    `; // closing back tick
    document.getElementById("content").innerHTML = content;
    var url = "webAPIs/getProfileAPI.jsp";
    ajaxSession({
        url: url,
        successFn: successProfile,
        errorId: "msgArea"
    });
    function successProfile(obj) {
        debugger;
        //var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            document.getElementById("msgArea").innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            document.getElementById("msgArea").innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }
        
        document.getElementById("msgArea").innerHTML += obj;
       
    } // end of function success

}; // end of function users.list