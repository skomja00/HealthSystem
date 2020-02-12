
"use strict";

/*
 * MakeSlideShow will insert 2 <div> into the content, and add click events
 * to navigate back and forth through the users. Another click event will toggle 
 * between the sides of the Flash Card. 
 * 
 * @param {json} see params object for list of items in the params
 *
 */
function MakeSlides(params) {

    var contentId = params["content"] || "content";
    var clearContent = params["clearContent"] || "clear"; /* "add" for addtnl slide <div>'s */
    var slideDivClass = params["slideDivClass"] || "slideDivClass";
    var slideTitleId = params["slideTitleId"] || "slideTitleId";
    var slideTitleText = params["slideTitleText"] || "Slides";
    var slideCaptionId = params["slideCaptionId"] || "slideCaptionId";
    var slideCaptionText = params["slideCaptionText"] || "userEmail";
    var slideImageId = params["slideImageId"] || "slideImageId";
    var slideImage = params["slideImage"] || "image";
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
        ssImg.src = theImg;
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
        if (slideNum >= json.length) {
            slideNum = 0;
        }
        display();
    }

    /* Go to the previous item in the slide show */
    function prevSlide() {
        slideNum--;
        if (slideNum < 0) {
            slideNum = json.length - 1;
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
        if (theSlideNum >= json.length || theSlideNum < 0) {
            slideShow.innerHTML = "Invalid slide number";
        } else {
            slideNum = theSlideNum;
            display();            
        }
    };

    /* Display the item */
    function display () {
        slideShow.setTitle(slideTitleText);
        setImage(json[slideNum][slideImage]);
        setCaption(json[slideNum][slideCaptionText]);
    };
    
    display();
    
//    /* Set the item in the slide show */
//    slideShow.display = function () {
//        setTitle(slideTitleText);
//        setImage(json[slideNum][slideImage]);
//        setCaption(json[slideNum][slideCaptionText]);
//    };
//    
//    slideShow.display();
    
    return slideShow;

}
