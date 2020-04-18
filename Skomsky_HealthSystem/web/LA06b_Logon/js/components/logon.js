
"use strict";

var logon = {};

logon.UI = function (id) {
    var content = `
        <div class='logon'>
            <br/>
            Email Address <input type="text" id="logonEmailAddress"/>
            &nbsp;
            Password <input type="password" id="logonPassword"/>
            &nbsp;
            <input type="button" value="Submit" onclick="logon.findUser('logonEmailAddress','logonPassword','msgArea')"/>
            <br/> <br/>
            <div id="msgArea"></div>
        </div>
    `; // closing back tick
    document.getElementById("content").innerHTML = content;
};
logon.findUser = function (emailId, pwId, msgId) {
    var email = document.getElementById(emailId).value;
    var pw = document.getElementById(pwId).value;
    var url = "webAPIs/logonAPI.jsp?email=" + email + "&password=" + pw;
    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: url,
        successFn: successLogon,
        errorId: "msgArea"
    });
    function successLogon(obj) {
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            document.getElementById("msgArea").innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            document.getElementById("msgArea").innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }
        if (obj.webUserList.length) {
            document.getElementById("msgArea").innerHTML += "Successful logon."
            document.getElementById(emailId).value = "";
            document.getElementById(pwId).value = "";            
        } else {
            document.getElementById("msgArea").innerHTML += "Unsuccessful logon." + obj.dbError;
            document.getElementById(emailId).value = "";
            document.getElementById(pwId).value = "";            
        }
    } // end of function success

}; // end of function users.list