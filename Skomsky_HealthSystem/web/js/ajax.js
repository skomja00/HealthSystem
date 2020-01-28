
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.
function ajax(url, callBackSuccess, errorId) {

// The httpReq Object is now local to function "ajaxCall" (not global)
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    console.log("ready to get content " + url);
    httpReq.open("GET", url); // specify which page you want to get
    httpReq.onreadystatechange = dataReady;
    httpReq.send(null); // initiate ajax call

    // dataReady will be invoked by the browser about 4 times (ready state = 1, 2, 3, 4. 
    // (because this is the name specified in the http request onreadystatechange property. 
    function dataReady () {

        // readyState 4 means that the http request is complete
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) { // status 200 means page found
                var jsonData = httpReq.responseText;
                console.log("jsonData read: " + jsonData);
                var jsObj = JSON.parse(jsonData);
                // invoke the HTML coder's function, passing in the JS object converted from the JSON data
                callBackSuccess(jsObj);
            } else {
                // First use of property creates new (custom) property
                document.getElementById(errorId).innerHTML = "Error (" + httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + url + "'. NOTE: You must RUN not VIEW the page when using AJAX.";
            }
        }
    } // dataReady

} // end function ajax