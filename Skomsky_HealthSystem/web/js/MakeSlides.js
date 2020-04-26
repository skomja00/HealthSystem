
"use strict";

/*
 * MakeSlides will insert a <div> into the content, and add click events
 * to navigate back and forth. 
 * 
 * @params {jsonObj} see params object for list of items in the params
 *
 */
function MakeSlides(params) {

    var contentId = params["contentId"] || "content";
    var clearContent = params["clearContent"] || "clear"; /* "add" for addtnl slide <div>'s */
    var slideDivClass = params["slideDivClass"] || "slideDivClass";
    var slideTitleText = params["slideTitleText"] || "Slides";
    var slideImageNA = params["slideImageNA"]; /* unavailable/default image */
    var jsonKey = params["jsonKey"]; //eg. webUserList or patientVisitList
    var json = params["jsonObject"];
    var captionProp = params.captionProp;
    var imageProp = params.imageProp;

    // private variable that keeps track of which slide is showing
    var slideNum = 0;

    /* create a <div> container for the slide show */
    var slideDiv = document.createElement("div");
    slideDiv.classList.add(slideDivClass);
    //slideShow.appendChild(slideDiv); 

    // add a title
    var title = document.createElement("p");
    title.classList.add("slideTitleClass");
    title.innerHTML = slideTitleText;
    slideDiv.appendChild(title);

    /* add an image */
    var img = document.createElement("img");
    img.classList.add("slideImageClass");
    slideDiv.appendChild(img);

    // add a caption
    var caption = document.createElement("p");
    caption.classList.add("slideCaptionClass");
    slideDiv.appendChild(caption);

    /* add back button */ 
    var backButton = document.createElement("button");
    backButton.classList.add("slideButton");
    backButton.innerHTML = " prev ";
    slideDiv.appendChild(backButton);

    /* add forward button */ 
    var fwdButton = document.createElement("button");
    fwdButton.classList.add("slideButton");
    fwdButton.innerHTML = " next ";
    slideDiv.appendChild(fwdButton);
    
    /* Advance to the next item in the slide show */
    function nextSlide() {
        slideNum++;
        if (slideNum >= json[jsonKey].length) {
            slideNum = 0;
        }
        slideDiv.display();
    }

    /* Go to the previous item in the slide show */
    function prevSlide() {
        slideNum--;
        if (slideNum < 0) {
            slideNum = json[jsonKey].length - 1;
        }
        slideDiv.display();
    }

    // Add onclick to the previous and back buttons
    backButton.onclick = prevSlide;
    fwdButton.onclick = nextSlide;

    /* public function to set the title */
    slideDiv.setTitle = function (theTitle) {
        slideTitleText = theTitle;
        slideDiv.display();  
    };

    /* public function to set the slideNum */
    slideDiv.setSlideNum = function (theSlideNum) {
        if (theSlideNum >= json[jsonKey].length || theSlideNum < 0) {
            slideDiv.innerHTML = "Invalid slide number";
        } else {
            slideNum = theSlideNum;
            slideDiv.display();            
        }
    };

    /* Display the item */
    slideDiv.display = function () {
        if (json[jsonKey][slideNum][imageProp].length > 0) {
            slideDiv.getElementsByTagName("img")[0].src = json[jsonKey][slideNum][imageProp];
        } else {
            slideDiv.getElementsByTagName("img")[0].src = slideImageNA;
        }
        slideDiv.getElementsByClassName("slideTitleClass")[0].innerHTML = slideTitleText;
        slideDiv.getElementsByClassName("slideCaptionClass")[0].innerHTML = json[jsonKey][slideNum][captionProp];
    };

    slideDiv.display();
    
    return slideDiv;

}
