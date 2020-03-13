
"use strict";

/*
 * MakeSlideShow will insert 2 <div> into the content, and add click events
 * to navigate back and forth through the slides. 
 * 
 * @param {json} see params object for list of items in the params
 *
 */
function MakeSlides(params) {

    var contentId = params["contentId"] || "content";
    var clearContent = params["clearContent"] || "clear"; /* "add" for addtnl slide <div>'s */
    var slideDivClass = params["slideDivClass"] || "slideDivClass";
    var slideTitleId = params["slideTitleId"] || "slideTitleId";
    var slideTitleText = params["slideTitleText"] || "Slides";
    var slideCaptionId = params["slideCaptionId"] || "slideCaptionId";
    var slideCaption = params["slideCaption"];
    var slideImageId = params["slideImageId"] || "slideImageId";
    var slideImage = params["slideImage"] || "imageUrl";
    var slideImageNA = params["slideImageNA"]; /* unavailable image */
    var jsonKey = params["jsonKey"];
    var json = params["jsonObject"];

    // private variable that keeps track of which slide is showing
    var slideNum = 0;

    /* Get reference to the DOM object inside which the SlideShow will 
     * be injected. Start building from empty per params["clearContent"] */
    var slideShow = document.getElementById(contentId);
    if (clearContent === "clear") {
        slideShow.innerHTML = "";
    }

    /* create a <div> container for the slide show */
    var slideDiv = document.createElement("div");
    slideDiv.classList.add(slideDivClass);

    // add a title
    var title = document.createElement("p");
    title.classList.add("slideTitleClass");
    var id = document.createAttribute("id");
    id.value = slideTitleId;
    title.setAttributeNode(id);
    title.innerHTML = slideTitleText;
    slideDiv.appendChild(title);

    /* add an image */
    var img = document.createElement("img");
    img.classList.add("slideImageClass");
    var id = document.createAttribute("id");
    id.value = slideImageId;
    img.setAttributeNode(id);
    var src = document.createAttribute("src");
    img.setAttributeNode(src);
    slideDiv.appendChild(img);

    /* set the image */
    function setImage (theImg) {
        var ssImg = document.getElementById(slideImageId);
        if (theImg.length > 0) {
            ssImg.src = theImg;
        } else {
            ssImg.src = slideImageNA;
        };
        
    }

    // add a caption
    var caption = document.createElement("p");
    caption.classList.add("slideCaptionClass");
    var id = document.createAttribute("id");
    id.value = slideCaptionId;
    caption.setAttributeNode(id);
    slideDiv.appendChild(caption);

    /* set the caption */
    function setCaption (theCaption) {
        var ssCaption = document.getElementById(slideCaptionId);
        ssCaption.innerHTML = theCaption;
    };

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

    slideShow.appendChild(slideDiv); 

    /* Advance to the next item in the slide show */
    function nextSlide() {
        slideNum++;
        if (slideNum >= json[jsonKey].length) {
            slideNum = 0;
        }
        display();
    }

    /* Go to the previous item in the slide show */
    function prevSlide() {
        slideNum--;
        if (slideNum < 0) {
            slideNum = json[jsonKey].length - 1;
        }
        display();
    }

    // Add onclick to the previous and back buttons
    backButton.onclick = prevSlide;
    fwdButton.onclick = nextSlide;

    /* public function to set the title */
    slideShow.setTitle = function (theTitle) {
        slideTitleText = theTitle;
        var ssTitle = document.getElementById(slideTitleId);
        ssTitle.innerHTML = slideTitleText;
    };

    /* public function to set the slideNum */
    slideShow.setSlideNum = function (theSlideNum) {
        if (theSlideNum >= json[jsonKey].length || theSlideNum < 0) {
            slideShow.innerHTML = "Invalid slide number";
        } else {
            slideNum = theSlideNum;
            display();            
        }
    };

    /* Display the item */
    function display () {
        /*slideShow.setTitle(slideTitleText); /* TODO: onclick ssUsers prev/next local variable slideTitleId is slideTitleIdPatient
                                                       onclick ssPatients prev/next local variable slideTitleId is also slideTitleIdPatient */
        setImage(json[jsonKey][slideNum][slideImage]);
        setCaption(json[jsonKey][slideNum][slideCaption]);
    };
    
    display();
    
    return slideShow;

}
