"use strict";

var patients = {};

(function () { //IIFE immediate invoked function expression
               //The IIFE provides a context where you can place private functions
               // that can be shared by insert and update. 
    
        // this code called by insertUI and updateUI -- shared common code. 
    function createUpdateArea (isUpdate, targetId) {

        // set variables as if it will be insert...
        var idRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "patients.insertSave()";
        
        // change variables for update
        if (isUpdate) {
            idRowStyle = ""; // don't hide row with webUserId 
            saveFn = "patients.updateSave()";
        }
        var html = `
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                    <thead>
                        <th colspan=3>
                            Update Patient Visit
                        </th>
                    </thead>
                    <tbody>
                    <tr ${idRowStyle}>
                        <td>MRN</td>
                        <td><input type=text id="medRecNo" disabled /></td>
                        <td id="medRecNoError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Visit Date Time</td>
                        <td><input type="text" id="visitDateTime" disabled /></td>
                        <td id="visitDateTimeError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Visit Id</td>
                        <td><input type="text"  id="visitId" /></td>
                        <td id="visitIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Patient Name</td>
                        <td><input type="text"  id="patientName" /></td>
                        <td id="patientNameError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td><input id="imageUrl" /></td>
                        <td id="imageUrlError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" id="description" /></td>
                        <td id="descriptionError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Diagnosis</td>
                        <td><input type="text" id="diagnosis" /></td>
                        <td id="diagnosisError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Visit Charge</td>
                        <td><input type="text" id="visitCharge" /></td>
                        <td id="visitChargeError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User Email</td>
                        <td>
                            <select id="webUserPickList">
                            <!-- JS code will make ajax call to get all the web users 
                            then populate this select tag's options with them -->
                            </select>
                        </td>
                        <td id="webUserError" class="error"></td>
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

    patients.updateUI = function (medRecNo, targetId) {
        
        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/patientVisitUpdate";        
        
        
        createUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "WebAPIs/getPatientVisitWithUserAPI.jsp?id=" + medRecNo,
            successFn: proceedPatientsUpdateUI,
            errorId: "ajaxError"
        });
        function proceedPatientsUpdateUI(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };    
    
    function dbDataToUI(obj) {

        var webUserObj = obj.webUserSD;
        var webUserList = obj.webUserSDL.userList;

        document.getElementById("visitId").value = webUserObj.visitId;
        document.getElementById("patientName").value = webUserObj.patientName;
        document.getElementById("imageUrl").value = webUserObj.imageUrl;
        document.getElementById("medRecNo").value = webUserObj.medRecNo;
        document.getElementById("description").value = webUserObj.description;
        document.getElementById("visitDateTime").value = webUserObj.visitDateTime;
        document.getElementById("diagnosis").value = webUserObj.diagnosis;
        document.getElementById("visitCharge").value = webUserObj.visitCharge;
        
        Utils.makePickList({
            id: "webUserPickList", // id of <select> tag in UI
            list: webUserList, // JS array that holds objects to populate the select list
            valueProp: "webUserEmail", // field name of objects in list that hold the values of the options
            keyProp: "webUserId", // field name of objects in list that hold the keys of the options
            selectedKey: webUserObj.webUserId  // key that is to be pre-selected (optional)
        });
    }

    patients.updateSave = function () {
        
        console.log("patients.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getDataFromUI();

        ajax2({
            url: "WebAPIs/updatePatientVisitAPI.jsp?jsonData=" + myData,
            successFn: processPatientVisitInsert,
            errorId: "recordError"
        });

        function processPatientVisitInsert(jsonObj) {
            
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
        var ddList = document.getElementById("webUserPickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            "medRecNo": document.getElementById("medRecNo").value,
            "visitDateTime": document.getElementById("visitDateTime").value,
            "visitId": document.getElementById("visitId").value,
            "patientName": document.getElementById("patientName").value,
            "imageUrl": document.getElementById("imageUrl").value,
            "description": document.getElementById("description").value,
            "diagnosis": document.getElementById("diagnosis").value,
            "visitCharge": document.getElementById("visitCharge").value,
            "webUserId": Number(ddList.options[ddList.selectedIndex].value),

            "webUserEmail": "",
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
        
        console.log("here is JSON object from the API (may hold error messages)");
        console.log(jsonObj);
        
        document.getElementById("medRecNoError").innerHTML = jsonObj.medRecNo;
        document.getElementById("visitDateTimeError").innerHTML = jsonObj.visitDateTime;
        document.getElementById("visitIdError").innerHTML = jsonObj.visitId;
        document.getElementById("patientNameError").innerHTML = jsonObj.patientName;
        document.getElementById("imageUrlError").innerHTML = jsonObj.imageUrl;
        document.getElementById("descriptionError").innerHTML = jsonObj.description;
        document.getElementById("diagnosisError").innerHTML = jsonObj.diagnosis;
        document.getElementById("visitChargeError").innerHTML = jsonObj.visitCharge;
        // ddList.options[ddList.selectedIndex].innerHTML = jsonObj.userEmail;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;

    }
    
    
    patients.list = function (targetId) {
        
        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
        ajax2({
            url: "WebAPIs/listPatientVisitsAPI.jsp",
            successFn: patientListSuccess,
            errorId: targetId
        });

        function patientListSuccess(obj) {
            
            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            if (!obj) {
                contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += obj.dbError;
                return;
            }   

            // Want the UI (plus headings and search filter) all to be centered. 
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
                innerHTML: "Patient Visit List ",
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
                window.location.hash = "#/insertVisit";
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
     
            /* Here's a superset list of all columns joining both tables for reference.
             * Build a list (or sublist) included in the table for the UI
             *  
             * this.visitId = FormatUtils.formatInteger(results.getObject("VisitId"));
             * this.patientName = FormatUtils.formatString(results.getObject("PatientName"));
             * this.imageUrl = FormatUtils.formatString(results.getObject("ImageUrl"));
             * this.medRecNo = FormatUtils.formatString(results.getObject("MedRecNo"));
             * this.description = FormatUtils.formatString(results.getObject("Description"));
             * this.visitDateTime = FormatUtils.formatDateTime(results.getObject("VisitDateTime"));
             * this.diagnosis = FormatUtils.formatString(results.getObject("Diagnosis"));
             * this.visitCharge = FormatUtils.formatDollar(results.getObject("VisitCharge"));
             * this.webUserId = FormatUtils.formatInteger(results.getObject("wu.web_user_id"));
             * this.userEmail = FormatUtils.formatString(results.getObject("wu.user_email"));
             * this.membershipFee = FormatUtils.formatDollar(results.getObject("wu.membership_fee")
             */
            var myList = [];
            for (var i = 0; i < obj.patientVisitList.length; i++) {
                myList[i] = {}; // add new empty object to array
                myList[i].MedRecNo = obj.patientVisitList[i].medRecNo;
                myList[i].Name = obj.patientVisitList[i].patientName;
                myList[i].Image = "<img src='" + obj.patientVisitList[i].imageUrl + "'>";
                myList[i].Description = obj.patientVisitList[i].description;
                myList[i].VisitDateTime = obj.patientVisitList[i].visitDateTime;
                myList[i].VisitCharge = obj.patientVisitList[i].visitCharge;
                myList[i].WebUserId = obj.patientVisitList[i].webUserId;
                myList[i].Update = "<img class='icon' src='icons/update.png' \n\
                    alt='update icon' onclick='patients.updateUI(\"" +
                    obj.patientVisitList[i].medRecNo + "\", \"" + targetId + "\" )' />";
                myList[i].Delete = "<img class='icon' src='icons/delete.png' \n\
                    alt='update icon' onclick='patients.delete(\"" +
                    obj.patientVisitList[i].medRecNo + "\",this)'  />";
                // Remove this once you are done debugging...
                //myList[i].errorMsg = obj.patientVisitList[i].errorMsg;
            }

            // add filterable-sortable HTML table to the content area
            MakeFilterSortTable({
                searchKeyElem: searchBox,
                theList:myList,
                targetDOM: tableDiv,
                style:"clickSort",
                orderPropName:"MedRecNo"
            });
        } // end of function success

    }; // end of function patients.list

    patients.deleteOk = function () {
        
        ajax2({
            url: "WebAPIs/deletePatientVisitAPI.jsp?deleteId=" + patients.idToDelete,
            successFn: processPatientVisitDelete,
            errorId: "content"
        });
        function processPatientVisitDelete(obj) { // function is local to callDeleteAPI
            console.log("WebAPIs/deletePatientVisitAPI success");
            console.log(obj);
            if (obj.errorMsg.length === 0) {
                obj.errorMsg = "MedRecNo " + patients.idToDelete + " deleted.";
                
                /* refresh the list otherwise data will still be in the UI 
                 * even though deleted from the dbase */
                patients.list("content");
                modalFw.alert(obj.errorMsg);
            } else {
                console.log("Delete Web API got this error: "+ obj.errorMsg);
                window.location.hash = "#/userDelete";  
                if (obj.errorMsg.includes("foreign key")) {
                    obj.errorMsg = "The data is tied to other data in the dbase, and cannot be deleted.";
                } else {
                    obj.errorMsg = "Please contact support@email.com or (123) 456-7890. Error: " + obj.errorMsg;
                }
                document.getElementById("deleteErrorMsgId").innerHTML = obj.errorMsg;
            }
        }
    }; // end deleteOk

    patients.delete = function (theIdToDelete) {
        
        // make idToDelete public for deleteOk fn. cannot use parameters 
        // (ie. parens) in the confirm parms. They will cause the deleteOk to ALWAYS 
        // execute regardless of user response to the modal element
        patients.idToDelete = theIdToDelete;
        
        /* you may do nothing here since callBack fn depends on user response in modalFw*/
        modalFw.confirm("Confirm delete MedRecNo " + theIdToDelete + "?",patients.deleteOk);

    };

    // Inject the UI that allows the user to type in an id and click submit.
    patients.findUI = function (targetId) {

        console.log("patients.findUI was called");

        var contentDOM = document.getElementById(targetId);
        var content = `
            <div class='logon'>
                <br/>
                Enter MedRec# <input type="text" id="findId"/>
                &nbsp;
                <input type="button" value="Submit" onclick="patients.findById('findId','msgArea')"/>
                <br/> <br/>
                <div id="msgArea"></div> 
            </div>
        `;
        contentDOM.innerHTML = content;
    };

    // This public function of global object will be called when the user clicks the button created just above.
    // This function will 
    patients.findById = function (idOfInput, targetId) {
        console.log("patients.findBtUd was called");

        // clear out any previous values in the target area
        var targetDOM = document.getElementById(targetId);
        targetDOM.innerHTML = "";

        var desiredUserId = escape(document.getElementById(idOfInput).value);

        // the JS escape function cleans input so it can be used as a URL paramenter
        var myUrl = "WebAPIs/getPatientByIdAPI.jsp?URLid=" + desiredUserId;
        console.log("patients.findById ready to invoke web API with this url: " + myUrl);
        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
        ajax({
            url: myUrl,
            callBackSuccess: patientSuccess,
            errorId: targetId
        });


        function patientSuccess(obj) {
            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            if (!obj) {
                targetDOM.innerHTML += "patients.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log("patients.findById (success private fn): the obj passed in by ajax2 is on next line.");
            console.log(obj);
            if (obj.errorMsg.length > 0) {
                targetDOM.innerHTML = obj.errorMsg;
            } else {

                var myList = [];
                myList[0] = {}; // add new empty object to array
                myList[0].MedRecNo = obj.medRecNo;
                myList[0].VisitId = obj.visitId;
                myList[0].Image = "<img src='" + obj.imageUrl + "'>";
                myList[0].Diagnosis = obj.diagnosis;
                myList[0].WebUser = obj.webUserEmail;
                MakeTable ({
                    "theList":myList,
                    "targetId":targetId,
                    "style":"clickSort",
                    "caption":"PatientVisit Search Results"
                }); 
            }
        } // end of function success
    };  // patients.findUI
    patients.insertUI = function () {

        const ui = `
            <div id="insertArea">
                <table>
                    <thead>
                        <tr>
                            <td colspan=3>Add a visit</td>
                        </tr>
                        <tr>
                            <td>Items</td>
                            <td>Input</td>
                            <td>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Patient Name</td>
                            <td><input type="text"  id="patientName" /></td>
                            <td id="patientNameError" class="error"></td> 
                        </tr>
                        <tr>
                            <td>Image URL</td>
                            <td><input type="text"  id="imageUrl" /></td>
                            <td id="imageUrlError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Medical Record Number</td>
                            <td><input type="text" id="medRecNo" /></td>
                            <td id="medRecNoError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input type="text" id="description" /></td>
                            <td id="descriptionError" class="error"></td>
                        </tr>
                        <tr>
                            <td style='min-width:250px'>Visit Date Time<br>(ccyy-mm-dd hh:mm am/pm)</td>
                            <td><input type="text" id="visitDateTime" /></td>
                            <td id="visitDateTimeError" class="error"></td> 
                        </tr>
                        <tr>
                            <td>Diagnosis</td>
                            <td><input type="text" id="diagnosis" /></td>
                            <td id="diagnosisError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Visit Charge</td>
                            <td><input type="text" id="visitCharge" /></td>
                            <td id="visitChargeError" class="error"></td>
                        </tr>
                        <tr>
                            <td>Web User (email)</td>
                            <td>
                                <select id="webUserPickList">
                                <!-- JS code will make ajax call to get all the roles 
                                then populate this select tag's options with those roles -->
                                </select>
                            </td>
                            <td id="webUserIdError" class="error"></td>
                        </tr>
                        <tr>
                            <td colspan=3 id="recordError" class="error">Enter data items, and press save.</td>
                        </tr>
                        <tr>
                            <td colspan=3><button onclick="patients.insertVisitSave()">Save</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>`;    
        document.getElementById("content").innerHTML = ui;

        ajax2({
            url: "WebAPIs/listUsersAPI.jsp",
            successFn: setWebUserPickList,
            errorId: "webUsersIdError"
        });

        function setWebUserPickList(jsonObj) {

            console.log("setWebUserPickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("recordError").innerHTML = jsonObj.dbError;
                return;
            } else {
                if (jsonObj.webUserList[0].errorMsg.length > 0) {
                    document.getElementById("webUserIdError").innerHTML = jsonObj.webUserList[0].errorMsg;
                };
            }

            /*  copy/pasting the first entry from the output of my get role API
            {
            "dbError": "",
            "webUserList": [
                {
                "webUserId": "1",
                "userEmail": "nulls@gmail.com",
                "userPassword": "",
                "userPassword2": "",
                "birthday": "",
                "membershipFee": "",
                "image": "",
                "userRoleId": "1",
                "userRoleType": "admin",
                "errorMsg": ""
            }, ...
             */

            Utils.makePickList({
                id: "webUserPickList",
                list: jsonObj.webUserList,
                valueProp: "userEmail",
                keyProp: "webUserId"
            });

        } // setRolePickList

    };
    patients.insertVisitSave = function () {
        
        console.log("insertVisitSave was called");
        
        var ddList = document.getElementById("webUserPickList");


        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            "patientName": document.getElementById("patientName").value,
            "imageUrl": document.getElementById("imageUrl").value,
            "medRecNo": document.getElementById("medRecNo").value,
            "description": document.getElementById("description").value,
            "visitDateTime": document.getElementById("visitDateTime").value,
            "diagnosis": document.getElementById("diagnosis").value,
            "visitCharge": document.getElementById("visitCharge").value,
            "webUserId": ddList.options[ddList.selectedIndex].value,
            //"webUserId": document.getElementById("webUserId").value,
            "errorMsg": ""
        };
        console.log(userInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "WebAPIs/insertPatientAPI.jsp?jsonData=" + myData;
        ajax2({
            "url" : url,
            "successFn" : insertVisitReqGood,
            errorId : "recordError"
        });
        function insertVisitReqGood(jsonObj) {
            
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertVisitReqGood was called here is httpRequest.");
            console.log(jsonObj);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
            //var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            document.getElementById("patientNameError").innerHTML = jsonObj.patientName;
            document.getElementById("imageUrlError").innerHTML = jsonObj.imageUrl;
            document.getElementById("medRecNoError").innerHTML = jsonObj.medRecNo;
            document.getElementById("descriptionError").innerHTML = jsonObj.description;
            document.getElementById("visitDateTimeError").innerHTML = jsonObj.visitDateTime;
            document.getElementById("diagnosisError").innerHTML = jsonObj.diagnosis;
            document.getElementById("visitChargeError").innerHTML = jsonObj.visitCharge;
            document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };
} ());  // This closes the IIFE & immediately invokes it. 