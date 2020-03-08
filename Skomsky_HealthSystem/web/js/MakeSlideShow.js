
"use strict";

function MakeSlideShow () {

    /* slideShow for users */
     var ajaxParams = {
         "url" : "WebAPIs/listUsersAPI.jsp",
        //"url" : "json/users.json",
         callBackSuccess : callBackSuccessUsers,
         errorId : "content"
     };
     ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
     
     /* slides for user email addresses */
     function callBackSuccessUsers(jsonUsers) {

        if (jsonUsers["dbError"]) {
            document.getElementById("content").innerHTML = jsonUsers["dbError"] + "<br><br>Please " +
                "contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        if (jsonUsers["webUserList"][0]["errorMsg"]) {
            document.getElementById("content").innerHTML = jsonUsers["webUserList"][0]["errorMsg"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        var params = {
            contentId : "content",
            clearContent : "clear", /* "add" for addtnl slide <div>'s */
            slideDivClass : "slideUsersClass",
            slideTitleId : "slideTitleIdUsers",    /* insert title here */
            slideTitleText : "User Email",  /* add a title string */
            slideCaptionId : "slideCaptionIdUsers",    /* insert caption here */
            slideCaption : "userEmail",  /* json key to the caption */
            slideImageId : "slideImageIdUsers", /* insert image here */
            slideImage : "image",     /* json key to the image */
            slideImageNA : "pics/notAvailable.jpg", /* unavailable image */
            jsonKey : "webUserList",     /* json key  */
            jsonObject : jsonUsers
        };
        var ssUsers = MakeSlides(params);
        /*ssUsers.setSlideNum(1);
        ssUsers.setTitle("New Look Email");*/
     }

    /* slides for patient medical record numbers */
     var ajaxParams = {
         "url" : "WebAPIs/listPatientVisitsAPI.jsp",
         //url : "json/patients.json",
         callBackSuccess : callBackSuccessPatients,
         errorId : "content"
     };
     ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
     function callBackSuccessPatients(jsonPatients) {

        if (jsonPatients["dbError"]) {
            document.getElementById("content").innerHTML = jsonPatients["dbError"] + "<br><br>Please " +
                "contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        if (jsonPatients["patientVisitList"][0]["errorMsg"]) {
            document.getElementById("content").innerHTML = jsonPatients["patientVisitList"][0]["errorMsg"] + 
                "<br><br>Please contact the Help Desk at 123-456-7890 or help@email.edu";
            return;
        };

        var params = {
            contentId : "content",
            clearContent : "add", /* "add" for addtnl slide <div>'s */
            slideDivClass : "slidePatientsClass",
            slideTitleId : "slideTitleIdPatients",    /* insert title here */
            slideTitleText : "Patient MedRec Number",  /* add a title string */
            slideCaptionId : "slideCaptionIdPatients",  /* insert caption here */
            slideCaption : "medRecNo",  /* json key to the caption */
            slideImageId : "slideImageIdPatients", /* insert image here */
            slideImage : "imageUrl",     /* json key to the image */
            slideImageNA : "pics/notAvailable.jpg", /* unavailable image */
            jsonKey : "patientVisitList",     /* json key */
            jsonObject : jsonPatients
        };
        var ssPatients = MakeSlides(params);
        /*ssPatients.setTitle("New Look MRN#");
        ssPatients.setSlideNum(4);*/

    };
}