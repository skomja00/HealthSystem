
"use strict";

var insertUser = {};

insertUser.ui = function () {
    const ui = `
        <div id="insertArea">
            <table>
                <thead>
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
                        <td><input type="text" id="userRoleId" /></td>
                        <td id="userRoleIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td colspan=3 id="recordError" class="error">Enter data items, and press save.</td>
                    </tr>
                    <tr>
                        <td colspan=3><button onclick="insertUserSave()">Save</button></td>
                    </tr>
                </tbody>
            </table>
      
        </div>`;    
    document.getElementById("content").innerHTML = ui;
};
function insertUserSave() {
    console.log("insertUserSave was called");

    // create a user object from the values that the user has typed into the page.
    var userInputObj = {
        "webUserId": "",
        "userEmail": document.getElementById("userEmail").value,
        "userPassword": document.getElementById("userPassword").value,
        "userPassword2": document.getElementById("userPassword2").value,
        "image": document.getElementById("image").value,
        "birthday": document.getElementById("birthday").value,
        "membershipFee": document.getElementById("membershipFee").value,
        "userRoleId": document.getElementById("userRoleId").value,
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
}
