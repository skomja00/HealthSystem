
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var patients = {};

patients.display = function (id) {
    
    console.log ("user.display function was called");

    var content =   
        "<style>" + 
        "    /* override size of image from the clicksort.css */" + 
        "    .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed 'clickSort' */" + 
        "        width: 40px;" + 
        "        border-radius: 6px;" + 
        "        box-shadow: 3px 3px 3px #444444;" + 
        "    }" + 
        "</style>" + 
        "<div id='listHere' class='clickSort'></div>";
    
    document.getElementById(id).innerHTML = content;
    
    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processData, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    var params = 
        {
            "url" : "WebAPIs/listPatientVisitsAPI.jsp",
            //"url" : "json/patients.json",
            "callBackSuccess" : ptProcessData,
            "errorId" : "listHere" 
        };
    //ajax("json/users.json", usersProcessData, "listHere");
    ajax(params);


    function ptProcessData(list) {
        
        if (list["dbError"]) {
            document.getElementById(id).innerHTML = list["dbError"] + "<br><br>Please " +
                "contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        if (list["patientVisitList"][0]["errorMsg"]) {
            document.getElementById(id).innerHTML = list["patientVisitList"][0]["errorMsg"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
                return;
        };

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var patientList = [];
        for (var i = 0; i < list["patientVisitList"].length; i++) {
            patientList[i] = {};
            patientList[i].PatientName = list["patientVisitList"][i].patientName;
            patientList[i].ImageUrl = "<img  src='" + list["patientVisitList"][i].imageUrl + "'>";
            patientList[i].MedRecNo = list["patientVisitList"][i].medRecNo;
            patientList[i].Description = list["patientVisitList"][i].description;
            patientList[i].VisitDateTime = list["patientVisitList"][i].visitDateTime;
            patientList[i].Diagnosis = list["patientVisitList"][i].diagnosis;
            patientList[i].VisitCharge = list["patientVisitList"][i].visitCharge;
            patientList[i].webUserId = list["patientVisitList"][i].webUserId;
            patientList[i].webUserEmail = list["patientVisitList"][i].userEmail;
            patientList[i].webMembershipFee = list["patientVisitList"][i].membershipFee; 
        }
        console.log("patientList is ");
        console.log(patientList);

        // Making a DOM object, nothing shows yet... 
        var params = {
            "theList" : patientList,
            "targetId" : "listHere",
            "searchInputId" : "searchInputId",
            "sortOrderPropName" : "visitId"
        };
        
        MakeFilterSortTable(params);    
    }
};