
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

            patientList[i] = {};
            patientList[i].MedRecNo = list[i].MedRecNo;
            patientList[i].PatientName = list[i].PatientName;
            
            /* convert to date and format */
            var parsedDate = new Date(list[i].AdmDateTime);
            if (isNaN(list[i].AdmDateTime) && (!isNaN(parsedDate))) {
                patientList[i].AdmDateTime = formatDate(parsedDate);
            }
            patientList[i].Description = list[i].Description;
            patientList[i].Diagnosis = list[i].Diagnosis;
            
            /* convert numeric string to number and format as currency */
            if (!isNaN(list[i].Balance)) { 
                patientList[i].Balance = formatCurrency(Number(list[i].Balance));
            }
        }

        console.log("USER LIST");
        console.log(patientList);

        // Making a DOM object, nothing shows yet... 
        MakeSortableTable(patientList, "listHere", "MedRecNo");
    }
};