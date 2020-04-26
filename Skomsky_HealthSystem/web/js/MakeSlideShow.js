
"use strict";

var makeSlideShow = {};

makeSlideShow.display = function (contentId) {

    /* slideShow for users */
     var ajaxParams = {
        "url" : "WebAPIs/listUsersAPI.jsp",
        callBackSuccess : callBackSuccessUsers,
        errorId : contentId
     };
     ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
     
     /* slides for user email addresses */
     function callBackSuccessUsers(jsonUsers) {

        if (jsonUsers["dbError"]) {
            document.getElementById(contentId).innerHTML = jsonUsers["dbError"] + "<br><br>Please " +
                "contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        if (jsonUsers["webUserList"][0]["errorMsg"]) {
            document.getElementById(contentId).innerHTML = jsonUsers["webUserList"][0]["errorMsg"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        var params = {
            contentId : contentId,
            clearContent : "clear", /* "add" for addtnl slide <div>'s */
            slideDivClass : "slideUsersClass",
            slideTitleText : "Web User Email",  /* add a title string */
            slideCaption : "userEmail",  /* json key to the caption */
            slideImageNA : "pics/notAvailable.jpg", /* unavailable image */
            jsonKey : "webUserList",     /* json key  */
            jsonObject : jsonUsers,
            captionProp: "userEmail",
            imageProp: "image"
        };
        var ssUsers = MakeSlides(params);
        document.getElementById(contentId).innerHTML = "";
        document.getElementById(contentId).appendChild(ssUsers);
        
        /* slides for patient medical record numbers */
         var ajaxParams = {
            "url" : "WebAPIs/listPatientVisitsAPI.jsp",
            callBackSuccess : callBackSuccessPatients,
            errorId : contentId
         };
         ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
         function callBackSuccessPatients(jsonPatients) {

            if (jsonPatients["dbError"]) {
                document.getElementById(contentId).innerHTML = jsonPatients["dbError"] + "<br><br>Please " +
                    "contact the Help Desk at 123-456-7890 or help@email.edu";
                return;
            };

            if (jsonPatients["patientVisitList"][0]["errorMsg"]) {
                document.getElementById(contentId).innerHTML = jsonPatients["patientVisitList"][0]["errorMsg"] + 
                    "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
                return;
            };

            var params = {
                contentId : contentId,
                clearContent : "add", /* "add" for addtnl slide <div>'s */
                slideDivClass : "slidePatientsClass",
                slideTitleText : "Patient MedRec Number",  /* add a title string */
                slideCaption : "medRecNo",  /* json key to the caption */
                slideImageNA : "pics/notAvailable.jpg", /* unavailable image */
                jsonKey : "patientVisitList",     /* json key */
                jsonObject : jsonPatients,
                captionProp: "medRecNo",
                imageProp: "imageUrl"
            };
            var ssPatients = MakeSlides(params);
            document.getElementById(contentId).appendChild(ssPatients);

        };        
     }
};