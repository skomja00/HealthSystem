"use strict";

var users = {};

(function () { //IIFE immediate function execute (anonymous function)
    users.list = function (targetId) {

        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
        ajax({
            url: "WebAPIs/listUsersAPI.jsp",
            callBackSuccess: userListSuccess,
            errorId: targetId
        });

        function userListSuccess(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            if (!obj) {
                contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                return;
            }

            var div = document.createElement("div");
            div.style.textAlign = "center";
            contentDOM.appendChild(div);
            div.innerHTML = `
                <h2>Web User List</h2>
                Search Filter:
            `;

            var searchBox = document.createElement("input");
            searchBox.setAttribute("type", "text");
            div.appendChild(searchBox);

            var tableDiv = document.createElement("div");
            contentDOM.appendChild(tableDiv);

            // tweak obj.webUserList to include only the properties you want - combine, delete, etc. 
            var userList = [];
            for (var i = 0; i < obj.webUserList.length; i++) {
                userList[i] = {}; // add new empty object to array
                userList[i].Credentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                        obj.webUserList[i].userPassword;
                userList[i].Image = "<img src='" + obj.webUserList[i].image + "'>";
                userList[i].Birthday = obj.webUserList[i].birthday;
                userList[i].MemberFee = obj.webUserList[i].membershipFee;
                userList[i].Role = obj.webUserList[i].userRoleId + "&nbsp;" +
                        obj.webUserList[i].userRoleType;
                userList[i].WebUserId = obj.webUserList[i].webUserId;

                // Remove this once you are done debugging...
                //userList[i].errorMsg = obj.webUserList[i].errorMsg;
            }

            // add click sortable HTML table to the content area

            // ********************** function tableBuilder.build ***********************************
            // params.list: an array of objects that are to be built into an HTML table.
            // params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
            //         (this is not the id string but actual reference like you get from method getElementById()
            // params.style: will be added as className to DOM element target,
            // params.orderPropName (string): name of property (of objects in list) for iniial sort
            // params.reverse (boolean): if true, initial sort will be high to low (else low to high). 
            // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

            MakeFilterSortTable({
                "style":"clickSort",
                "theList":userList,
                "targetId": targetId,
                "searchInputId":"id",
                "sortOrderPropName":"userId"
            });

        } // end of function success

    }; // end of function users.list


    // Inject the UI that allows the user to type in an id and click submit.
    users.findUI = function (targetId) {

        console.log("users.findUI was called");

        var contentDOM = document.getElementById(targetId);
        var content = `
            <div class='logon'>
                <br/>
                Enter Web User Id <input type="text" id="findId"/>
                &nbsp;
                <input type="button" value="Submit" onclick="users.findById('findId','msgArea')"/>
                <br/> <br/>
                <div id="msgArea"></div> 
            </div>
        `;
        contentDOM.innerHTML = content;
    };

    // This public function of global object will be called when the user clicks the button created just above.
    // This function will 
    users.findById = function (idOfInput, targetId) {

        console.log("users.findById was called");

        // clear out any previous values in the target area
        var targetDOM = document.getElementById(targetId);
        targetDOM.innerHTML = "";

        var desiredUserId = escape(document.getElementById(idOfInput).value);

        var myUrl = "WebAPIs/getUserByIdAPI.jsp?URLid=" + desiredUserId;
        console.log("users.findById ready to invoke web API with this url: " + myUrl);

        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
        ajax({
            url: myUrl,
            callBackSuccess: userSuccess,
            errorId: targetId
        });


        function userSuccess(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            if (!obj) {
                targetDOM.innerHTML += "users.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log("users.findById (success private fn): the obj passed in by ajax is on next line.");
            console.log(obj);

            if (obj.dbError.length > 0) {
                targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                return;
            } else if (obj.webUserList.length === 0 ) {
                targetDOM.innerHTML = "No Web User with id "+desiredUserId+" was found in the Database.";
            } else {
                var msg = "Found Web User " + obj.webUserList[0].webUserId;
                msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
                msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
                msg += "<br/> &nbsp; User Role: " +  obj.webUserList[0].userRoleId + " " +  obj.webUserList[0].userRoleType;
                msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
                targetDOM.innerHTML = msg;  
            }

        } // end of function success
    };  // users.findUI
    users.insertUI = function () {
        const ui = `
            <div id="insertArea">
                <table>
                    <thead>
                        <tr>
                            <td colspan=3>Add a web user</td>
                        </tr>
                        <tr>
                            <td>Items</td>
                            <td>Input</td>
                            <td>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Email Address</td>
                            <td><input type="text"  id="userEmail" /></td>
                            <td id="userEmailError" class="error"></td> 
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password"  id="userPassword" /></td>
                            <td id="userPasswordError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Retype Your Password</td>
                            <td><input type="password" id="userPassword2" /></td>
                            <td id="userPassword2Error" class="error"></td>
                        </tr>
                        <tr>
                            <td>Image URL</td>
                            <td><input type="text" id="image" /></td>
                            <td id="imageError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Birthday</td>
                            <td><input type="text" id="birthday" /></td>
                            <td id="birthdayError" class="error"></td> 
                        </tr>
                        <tr>
                            <td>Membership Fee</td>
                            <td><input type="text" id="membershipFee" /></td>
                            <td id="membershipFeeError" class="error"></td>
                        </tr>
                        <tr>
                            <td>User Role</td>
                            <td>
                                <select id="rolePickList">
                                <!-- JS code will make ajax call to get all the roles 
                                then populate this select tag's options with those roles -->
                                </select>
                            </td>
                            <td id="userRoleIdError" class="error"></td>
                        </tr>
                        <tr>
                            <td colspan=3 id="recordError" class="error">Enter data items, and press save.</td>
                        </tr>
                        <tr>
                            <td colspan=3><button onclick="users.insertUserSave()">Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>`;    
        document.getElementById("content").innerHTML = ui;

        ajax2({
            url: "WebAPIs/getRolesAPI.jsp",
            successFn: setRolePickList,
            errorId: "userRoleIdError"
        });

        function setRolePickList(jsonObj) {

            console.log("setRolePickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                return;
            }

            /*  copy/pasting the first entry from the output of my get role API
             {
             "dbError": "",
             "roleList": [
             {
             "userRoleId": "1",
             "userRoleType": "Admin",
             "errorMsg": ""
             }, ...
             */

            Utils.makePickList({
                id: "rolePickList",
                list: jsonObj.roleList,
                valueProp: "userRoleType",
                keyProp: "userRoleId"
            });

        } // setRolePickList

    }; // insertUser.ui    
    users.insertUserSave = function () {
        console.log("insertUserSave was called");

        var ddList = document.getElementById("rolePickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            "webUserId": "",
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "image": document.getElementById("image").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,
            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "WebAPIs/insertUserSimpleAPI.jsp?jsonData=" + myData;
        ajax2({
            "url" : url,
            "successFn" : insertUserReqGood,
            errorId : "recordError"
        });
        function insertUserReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertUserReqGood was called here is httpRequest.");
            console.log(jsonObj);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
            //var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
            document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
            document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
            document.getElementById("imageError").innerHTML = jsonObj.image;
            document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
            document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
            document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };
}());