
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
    ajax("json/patients.json", processData, "listHere");


    function processData(list) {

        // private function can only be called in processData()
        /* see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString */
        function formatCurrency(num) {
            return num.toLocaleString("en-US", {style: "currency", 
                                                currency: "USD", 
                                                maximumFractionDigits: 2,
                                                currencyDisplay: "symbol"});
        }

        /* private function can only be called in processData() */
        /* see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString */
        function formatDate(date) {
            return  date.toLocaleDateString('en-US',{ weekday: 'short', 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' }) 
                    + ' ' +
                    date.toLocaleDateString('en-US',{ timeStyle: 'short' });
        }

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var patientList = [];

        for (var i = 0; i < list.length; i++) {
            
//            sample json:
//            -----------------------
//            "MedRecNo": "TUN111114",
//            "PatientName": "Hamilton, Edward",
//            "PatientId": 4,
//            "ImageUrl": "http://cis-linux2.temple.edu/~sallyk/pics_user/tony.jpg",
//            "AdmDateTime": "2020-10-12 08:00:00",
//            "DschDateTime": null,
//            "Description": "Office Visit",
//            "Diagnosis": "Patient Office or Other Outpatient Services",
//            "Balance": 150.000,
//            "webUserId": 4,
//            "webUserEmail": "hamilton.edward@gmail.com",
//            "webMembershipFee": 14.95

            patientList[i] = {};
            patientList[i].MedRecNo = list[i].MedRecNo;
            patientList[i].PatientName = list[i].PatientName;
            //debugger;
            /* see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number*/
            //patientList[i].PatientId = Number(list[i].PatientId); //MakeSortableTable.js:81 Uncaught TypeError: val.replace is not a function at alignment (MakeSortableTable.js:81)
            patientList[i].PatientId = list[i].PatientId; //MakeSortableTable.js:81 Uncaught TypeError: val.replace is not a function at alignment (MakeSortableTable.js:81)
            patientList[i].ImageUrl = "<img  src='" + list[i].ImageUrl + "'>";
            
            /* convert admdate and format */
            /* all encounters expected to value admdate. but in op/ambulatory settings */
            /* the admdate serves as a 'visit' date with no discharge */
            /* re: Date see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date */
            var parsedDate = new Date(list[i].AdmDateTime);
            if (isNaN(list[i].AdmDateTime) && (!isNaN(parsedDate))) {
                patientList[i].AdmDateTime = formatDate(parsedDate);
            }
            
            /* If dschdatetime is null replace with "" otherwise convert and format */
            /* Only patients admitted to the facility will have a dschdate.
            /* Patients only likely to be admitted (later discharged...) when appearing at the ED department.
            /* Otherwise NORMAL office visits and services like vaccinations don't result in an adm/dsch */
            if (list[i].DschDateTime === null) {
                patientList[i].DschDateTime = "";
            } else {
                var parsedDate = new Date(list[i].DschDateTime);
                if (isNaN(list[i].DschDateTime) && (!isNaN(parsedDate))) {
                    patientList[i].DschDateTime = formatDate(parsedDate);
                }
            }
            patientList[i].Description = list[i].Description;
            patientList[i].Diagnosis = list[i].Diagnosis;
            /* convert numeric string to number and format as currency */
            if (!isNaN(list[i].Balance)) { 
                patientList[i].Balance = formatCurrency(Number(list[i].Balance));
            }
            //patientList[i].webUserId = Number(list[i].webUserId); //MakeSortableTable.js:81 Uncaught TypeError: val.replace is not a function at alignment (MakeSortableTable.js:81)
            patientList[i].webUserId = list[i].webUserId; //MakeSortableTable.js:81 Uncaught TypeError: val.replace is not a function at alignment (MakeSortableTable.js:81)
            patientList[i].webUserEmail = list[i].webUserEmail;
            patientList[i].webMembershipFee = formatCurrency(Number(list[i].webMembershipFee)); 
        }

        console.log("USER LIST");
        console.log(patientList);

        // Making a DOM object, nothing shows yet... 
        MakeFilteredTable(patientList, "listHere");
        //MakeSortableTable(patientList, "listHere", "MedRecNo");
    }
};