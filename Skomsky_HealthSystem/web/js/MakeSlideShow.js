
"use strict";

function MakeSlideShow () {

    /* slideShow for users */
     var ajaxParams = {
         url : "json/users.json",
         callBackSuccess : callBackSuccessUsers,
         errorId : "content"
     };
     ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
     
     /* slides for user email addresses */
     function callBackSuccessUsers(jsonUsers) {

        var params = {
            contentId : "content",
            clearContent : "clear", /* "add" for addtnl slide <div>'s */
            slideDivClass : "slideUsersClass",
            slideTitleId : "slideTitleIdUsers",    /* insert title here */
            slideTitleText : "User Email",  /* add a title string */
            slideCaptionId : "slideCaptionIdUsers",    /* insert caption here */
            slideCaptionText : "userEmail",  /* json key to the caption */
            slideImageId : "slideImageIdUsers", /* insert image here */
            slideImage : "image",     /* json key to the image */
            jsonObject : jsonUsers
        };
        var ssUsers = MakeSlides(params);
        ssUsers.setSlideNum(1);
        ssUsers.setTitle("New Look Email");
     }

    /* slides for patient medical record numbers */
     var ajaxParams = {
         url : "json/patients.json",
         callBackSuccess : callBackSuccessPatients,
         errorId : "content"
     };
     ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
     function callBackSuccessPatients(jsonPatients) {

        var params = {
            contentId : "content",
            clearContent : "add", /* "add" for addtnl slide <div>'s */
            slideDivClass : "slidePatientsClass",
            slideTitleId : "slideTitleIdPatients",    /* insert title here */
            slideTitleText : "Patient MedRec Number",  /* add a title string */
            slideCaptionId : "slideCaptionIdPatients",  /* insert caption here */
            slideCaptionText : "MedRecNo",  /* json key to the caption */
            slideImageId : "slideImageIdPatients", /* insert image here */
            slideImage : "ImageUrl",     /* json key to the image */
            jsonObject : jsonPatients
        };
        var ssPatients = MakeSlides(params);
        ssPatients.setTitle("New Look MRN#");
        ssPatients.setSlideNum(4);

    };
}