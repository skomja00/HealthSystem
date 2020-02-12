
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
    ajax("json/patients.json", ptProcessData, "listHere");


    function ptProcessData(list) {

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
//    {
//        "VisitId" : "3",
//        "PatientName" : "Rutherford, Amelia",
//        "ImageUrl" : "http://cis-linux2.temple.edu/~sallyk/pics_user/sally.jpg",
//        "MedRecNo" : "TUN193741",
//        "Description" : "ED Visit",
//        "VisitDateTime" : "2019-12-07 22:35:41",
//        "VisitDateTime" : "2019-12-07 22:35:41",
//        "Diagnosis" : "Emergency department visit for the evaluation and management of a patient",
//        "VisitCharge" : "2000.000",
//        "webUserId" : "6",
//        "webUserEmail" : "admin.admin@gmail.com",
//        "webMembershipFee" : "4.95"
//    }
            patientList[i] = {};
            patientList[i].PatientName = list[i].PatientName;
            patientList[i].ImageUrl = "<img  src='" + list[i].ImageUrl + "'>";
            patientList[i].MedRecNo = list[i].MedRecNo;
            patientList[i].Description = list[i].Description;
            //debugger;
            /* see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number*/
            //patientList[i].PatientId = Number(list[i].PatientId); //MakeSortableTable.js:81 Uncaught TypeError: val.replace is not a function at alignment (MakeSortableTable.js:81)
            
            /* convert admdate and format */
            /* all encounters expected to value admdate. but in op/ambulatory settings */
            /* the admdate serves as a 'visit' date with no discharge */
            /* re: Date see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date */
            var parsedDate = new Date(list[i].VisitDateTime);
            if (isNaN(list[i].VisitDateTime) && (!isNaN(parsedDate))) {
                patientList[i].VisitDateTime = formatDate(parsedDate);
            }
            
            patientList[i].Diagnosis = list[i].Diagnosis;
            
            /* convert numeric string to number and format as currency */
            if (!isNaN(list[i].VisitCharge)) { 
                patientList[i].VisitCharge = formatCurrency(Number(list[i].VisitCharge));
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