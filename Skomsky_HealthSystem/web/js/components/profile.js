
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
            var userList = [];
            userList[0] = {}; // add new empty object to array
            userList[0].Credentials = obj.webUserList[0].userEmail + "<br/> PW (to test Logon): " +
                    obj.webUserList[0].userPassword;
            userList[0].Image = "<img src='" + obj.webUserList[0].image + "'>";
            userList[0].Birthday = obj.webUserList[0].birthday;
            userList[0].MemberFee = obj.webUserList[0].membershipFee;
            userList[0].Role = obj.webUserList[0].userRoleId + "&nbsp;" +
                    obj.webUserList[0].userRoleType;
            userList[0].WebUserId = obj.webUserList[0].webUserId;
            MakeTable({
                        "caption" : "Your profile settings.",
                        "theList" : userList,
                        "targetId" : "msgArea",
                        "style" : "clickSort"
                    });
        }
    } // end of function success
}; // end of function 