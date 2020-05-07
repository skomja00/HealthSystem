"use strict";

var users = {};

(function () { //IIFE immediate invoked function expression
               //The IIFE provides a context where you can place private functions
               // that can be shared by insert and update. 
    
    // this code called by insertUI and updateUI -- shared common code. 
    function createUpdateArea (isUpdate, targetId) {

        // set variables as if it will be insert...
        var idRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "users.insertSave()";
        
        // change variables for update
        if (isUpdate) {
            idRowStyle = ""; // don't hide row with webUserId 
            saveFn = "users.updateSave()";
        }

        var html = `
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                    <thead>
                        <th colspan=3>
                            Update Web User
                        </th>
                    </thead>
                    <tbody>
                    <tr ${idRowStyle}>
                        <td>Web User Id</td>
                        <td><input type="text"  id="webUserId" disabled /></td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Email Address (unique)</td>
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
                        <td>Image</td>
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
                        <td>User Role Type</td>
                        <td>
                            <select id="rolePickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="userRoleIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td colspan=3><button onclick="${saveFn}">Update</button></td>
                    </tr>
                    <tr>
                        <td colspan=3 id="recordError" class="error">Click to update...</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }
    
    users.updateUI = function (webUserId, targetId) {

        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/userUpdate";        
        
        createUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "WebAPIs/getUserWithRolesAPI.jsp?id=" + webUserId,
            successFn: proceedUserWithRolesUpdateUI,
            errorId: "ajaxError"
        });
        function proceedUserWithRolesUpdateUI(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };    
    
    function dbDataToUI(obj) {

        var webUserObj = obj.webUser;
        var roleList = obj.roleInfo.roleList;

        document.getElementById("webUserId").value = webUserObj.webUserId;
        document.getElementById("userEmail").value = webUserObj.userEmail;
        document.getElementById("userPassword").value = webUserObj.userPassword;
        document.getElementById("userPassword2").value = webUserObj.userPassword;
        document.getElementById("image").value = webUserObj.image;
        document.getElementById("birthday").value = webUserObj.birthday;
        document.getElementById("membershipFee").value = webUserObj.membershipFee;
        console.log("selected role id is " + webUserObj.userRoleId);
        Utils.makePickList({
            id: "rolePickList", // id of <select> tag in UI
            list: roleList, // JS array that holds objects to populate the select list
            valueProp: "userRoleType", // field name of objects in list that hold the values of the options
            keyProp: "userRoleId", // field name of objects in list that hold the keys of the options
            selectedKey: webUserObj.userRoleId  // key that is to be pre-selected (optional)
        });
    }

    users.updateSave = function () {
        
        console.log("users.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getDataFromUI();

        ajax2({
            url: "WebAPIs/updateUserAPI.jsp?jsonData=" + myData,
            successFn: processUserInsert,
            errorId: "recordError"
        });

        function processUserInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };
    
        // a private function
    function getDataFromUI() {

        // New code for handling role pick list.
        var ddList = document.getElementById("rolePickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            "webUserId": document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "image": document.getElementById("image").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,

            // Modification here for role pick list
            //"userRoleId": document.getElementById("userRoleId").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,

            "userRoleType": "",
            "errorMsg": ""
        };

        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error. 
        return encodeURIComponent(JSON.stringify(userInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
    
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

            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += obj.dbError;
                return;
            }

            // Want the User List UI (plus headings and search filter) all to be centered. 
            // Cannot be sure content area will be like this, so create a div inside of the 
            // content area and set the div to be aligned center (HTML table will be styled 
            // margin: auto to make it centered as well). 
            var div = Utils.make({
                htmlTag: "div",
                parent: contentDOM
            });
            div.style.textAlign = "center";

            var heading = Utils.make({
                htmlTag: "h2",
                parent: div
            });

            Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                innerHTML: "Web User List ",
                parent: heading
            });

            var img = Utils.make({
                htmlTag: "img",
                parent: heading
            });
            img.src = 'icons/dark/insert_H32.png'; 
            img.onclick = function () { // you cant pass input params directly into an event handler

                // Originally I had this line of code here:  
                //     users.insertUI(targetId);
                // And that worked to show the user insert UI, BUT, afterwards, if you tried to re-run 
                // the user list, nothing happened -- because this would make no change in the 
                // window.location.hash (the link in the browser's address bar) -- so nothing would happen. 
                // 
                // The solution was to invoke the user insert UI through a routing rule. 
                // For "other" insert (even though you probably won't have a Nav Bar link for inserting "other", 
                // you may need to create a routing rule and invoke that similarly (from the "other" list UI).
                window.location.hash = "#/insertUser";
            };

            Utils.make({
                htmlTag: "span",
                innerHTML: " Search Filter: ",
                parent: div
            });

            var searchBox = Utils.make({
                htmlTag: "input",
                parent: div
            });
            searchBox.type = "text";
            //searchBox.setAttribute("type", "text");  // same thing...

            var deleteErrorMsg = Utils.make({
                htmlTag: "div",
                innerHTML: "",
                parent: div
            });
            deleteErrorMsg.id = "deleteErrorMsgId";

            var tableDiv = Utils.make({
                htmlTag: "div",
                parent: div
            });
            
            // tweak obj.webUserList to include only the properties you want - combine, delete, etc. 
            var userList = [];
            for (var i = 0; i < obj.webUserList.length; i++) {
                userList[i] = {}; // add new empty object to array
                userList[i].Email = obj.webUserList[i].userEmail;
                        /*+ "<br/> PW (to test Logon): " + obj.webUserList[i].userPassword; */
                userList[i].Image = "<img src='" + obj.webUserList[i].image + "'>";
                userList[i].Birthday = obj.webUserList[i].birthday;
                userList[i].MemberFee = obj.webUserList[i].membershipFee;
                userList[i].Role = obj.webUserList[i].userRoleId + "&nbsp;-&nbsp;" +
                        obj.webUserList[i].userRoleType;
                userList[i].WebUserId = obj.webUserList[i].webUserId;
                userList[i].Update = "<img class='icon' src='icons/update.png' \n\
                                    alt='update icon' onclick='users.updateUI(" +
                                    obj.webUserList[i].webUserId + ", `" + targetId + "` )' />";
                userList[i].Delete = "<img class='icon' src='icons/delete.png' \n\
                                    alt='update icon' onclick='users.delete(" +
                                    obj.webUserList[i].webUserId + ",this)'  />";
                // Remove this once you are done debugging...
                //userList[i].errorMsg = obj.webUserList[i].errorMsg;
            }

            // add filterable-sortable HTML table to the content area
            MakeFilterSortTable({
                searchKeyElem: searchBox,
                theList:userList,
                targetDOM: tableDiv,
                style:"clickSort",
                orderPropName:"Email"
            });
        } // end of function success

    }; // end of function users.list

  
    users.deleteOk = function () { 

        ajax2({
            url: "WebAPIs/deleteUserAPI.jsp?deleteId=" + users.idToDelete,
            successFn: processUserDelete,
            errorId: "content"
        });
        function processUserDelete(obj) { // function is local to callDeleteAPI
            console.log("WebAPIs/deleteUserAPI success");
            console.log(obj);
            if (obj.errorMsg.length === 0) {
                obj.errorMsg = "Web User " + users.idToDelete + " deleted";
                
                /* refresh the list otherwise data will still be in the UI 
                 * even though deleted from the dbase */
                users.list("content");
                modalFw.alert(obj.errorMsg);
            } else {
                console.log("Delete Web API got this error: "+ obj.errorMsg);
                window.location.hash = "#/userDelete";  
                if (obj.errorMsg.includes("foreign key")) {
                    obj.errorMsg = "The user is tied to other data in the dbase, and cannot be deleted.";
                } else {
                    obj.errorMsg = "Please contact support@email.com or (123) 456-7890. Error: " + obj.errorMsg;
                }
                document.getElementById("deleteErrorMsgId").innerHTML = obj.errorMsg;
            }
        }
    }; // end deleteOk    

    users.delete = function (theIdToDelete) {

        // make idToDelete public for deleteOk fn. cannot use parameters 
        // (ie. parens) in the confirm parms. They will cause the deleteOk to ALWAYS 
        // execute regardless of user response to the modal element
        users.idToDelete = theIdToDelete;
        
        /* you may do nothing here since callBack fn depends on user response in modalFw*/
        modalFw.confirm("Confirm delete Web User Id " + theIdToDelete + "?", users.deleteOk);

    };

    // Inject the UI that allows the user to type in an id and click submit.
    users.findUI = function (targetId) {

        ajax2({
            url: "WebAPIs/checkStatus.jsp",
            successFn: usersFindUISuccess,
            errorId: targetId
        });

        // Inject the UI that allows the user to type in an id and click submit.
        function usersFindUISuccess (jsonObj) {
            
            var contentDOM = document.getElementById(targetId);
            if (jsonObj.errorMsg.length === 0) { // user is logged on
                var content = `
                    <div class='logon'>
                        <br/>
                        Enter Web User Id:  <input type="text" id="findId"/>
                        &nbsp;
                        <input type="button" value="Submit" onclick="users.findById('findId','msgArea')"/>
                        <br/> <br/>
                        <div id="msgArea"></div> 
                    </div>
                `;
                } else {
                    var content = jsonObj.errorMsg;
                }
            contentDOM.innerHTML = content;
        };
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
            callBackSuccess: findByIdSuccess,
            errorId: targetId
        });


        function findByIdSuccess(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            if (!obj) {
                targetDOM.innerHTML += "users.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log("users.findById (success private fn): the obj passed in by ajax is on next line.");
            console.log(obj);
            
            if (obj.errorMsg.length > 0) {
                targetDOM.innerHTML += obj.errorMsg;
                return;
            } else if (obj.length === 0 ) {
                targetDOM.innerHTML += "No Web User with id "+desiredUserId+" was found in the Database.<br>";
            } else {
                var myList = [];
                myList[0] = {}; // add new empty object to array
                myList[0].WebUserId = obj.webUserId;
                myList[0].Email = obj.userEmail;
                    /*+ "<br/> PW (to test Logon): " + obj.userPassword;*/
                myList[0].Image = "<img src='" + obj.image + "'>";
                myList[0].Birthday = obj.birthday;
                myList[0].MemberFee = obj.membershipFee;
                myList[0].Role = obj.userRoleId + "&nbsp;-&nbsp;" + obj.userRoleType;
                MakeTable ({
                    "theList":myList,
                    "targetId":targetId,
                    "style":"clickSort",
                    "caption":"Web User Search Results"
                });
            }

        } // end of function success
    };  // users.findUI
    users.insertUI = function () {
        const ui = `
            <div id="insertArea">
                <table>
                    <thead>
                        <th colspan=3>
                            Add a web user
                        </th>
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
                document.getElementById("recordError").innerHTML = jsonObj.dbError;
                return;
            } else {
                if (jsonObj.roleList[0].errorMsg.length > 0) {
                    document.getElementById("userRoleIdError").innerHTML = jsonObj.roleList[0].errorMsg;
                };
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
        var url = "WebAPIs/insertUserAPI.jsp?jsonData=" + myData;
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
} ());  // This closes the IIFE & immediately invokes it. 