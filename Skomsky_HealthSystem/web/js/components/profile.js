
"use strict";

var profile = {};

profile.display = function () {
    var content = `
        <div class='logon'>
            <div id="msgArea"></div>
        </div>
    `; // closing back tick
    document.getElementById("content").innerHTML = content;
    var url = "WebAPIs/getProfileAPI.jsp";
    ajax2({
        url: url,
        successFn: successProfile,
        errorId: "msgArea"
    });
    function successProfile(obj) {
        if (!obj) {
            document.getElementById("msgArea").innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);
        if (obj.dbError.length > 0) {
            document.getElementById("msgArea").innerHTML = obj.dbError;
            return;
        } else {
            document.getElementById("msgArea").innerHTML += "Your profile settings.<br>";
            obj.webUserList[0]["image"] = "<img src='" + obj.webUserList[0]["image"]  + "'>";
            MakeTable({
                        "caption" : "Your profile settings.",
                        "theList" : obj.webUserList,
                        "targetId" : "msgArea",
                        "style" : "clickSort"
                    });
        }
    } // end of function success
}; // end of function users.list