
"use strict";

var insertVisit = {};

insertVisit.ui = function () {
    
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
                        <td>Web User Id</td>
                        <td><input type="text" id="webUserId" /></td>
                        <td id="webUserIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td colspan=3 id="recordError" class="error">Enter data items, and press save.</td>
                    </tr>
                    <tr>
                        <td colspan=3><button onclick="insertVisitSave()">Save</button></td>
                    </tr>
                </tbody>
            </table>
      
        </div>`;    
    document.getElementById("content").innerHTML = ui;
};
function insertVisitSave() {
    console.log("insertVisitSave was called");
    // create a user object from the values that the user has typed into the page.
    var userInputObj = {
        "patientName": document.getElementById("patientName").value,
        "imageUrl": document.getElementById("imageUrl").value,
        "medRecNo": document.getElementById("medRecNo").value,
        "description": document.getElementById("description").value,
        "visitDateTime": document.getElementById("visitDateTime").value,
        "diagnosis": document.getElementById("diagnosis").value,
        "visitCharge": document.getElementById("visitCharge").value,
        "webUserId": document.getElementById("webUserId").value,
        "errorMsg": ""
    };
    console.log(userInputObj);

    // build the url for the ajax call. Remember to escape the user input object or else 
    // you'll get a security error from the server. JSON.stringify converts the javaScript
    // object into JSON format (the reverse operation of what gson does on the server side).
    var myData = escape(JSON.stringify(userInputObj));
    var url = "WebAPIs/insertPatientVisitSimpleAPI.jsp?jsonData=" + myData;
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
}
