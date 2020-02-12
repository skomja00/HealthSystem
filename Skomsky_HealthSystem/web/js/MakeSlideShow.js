
"use-strict";

/*
 * MakeSlideShow will insert 2 <div> into the content, and add click events
 * to navigate back and forth through the users. Another click event will toggle 
 * between the sides of the Flash Card. 
 * 
 * @param {json} see params object for list of items in the params
 *
 */
function MakeSlideShow() {

    var ajaxParams = {
        url : "json/users.json",
        callBackSuccess : ssCallBackSuccess,
        errorId : "contentId"
    };
    ajax(ajaxParams); /* XMLHttpRequest json and return it to callBackSuccess */
    function ssCallBackSuccess(json) {
        var params = {
            contentId : "content",
            captionText : "userEmail",
            textColor : "#00FF70", 
            imgPath : "pics/",
            cardTextId : "cardTextId",
            image : "image", 
            jsonObject : json
        };

        var json = params["jsonObject"];
        var captionText = params["captionText"] || "user@email.com";
        var captionId = params["captionId"] || "captionId";
        var contentId = params["contentId"] || "content";

        // private variable that keeps track of which slide is showing
        var slideNum = 0;

        /* Get reference to the DOM object inside which the SlideShow will 
         * be injected. Start building from empty content (i.e. innerHTML=""). */
        var slideShow = document.getElementById(contentId);
        slideShow.innerHTML = "";

        /* create a <div> container for the slide show */
        var slideDiv = document.createElement("div");
        var cls = document.createAttribute("class");
        cls.value = "slideDiv";
        slideDiv.setAttributeNode(cls);

        var img = document.createElement("img");
        var cls = document.createAttribute("class");
        cls.value = "slideImageClass";
        img.setAttributeNode(cls);
        var id = document.createAttribute("id");
        id.value = "slideImageId";
        img.setAttributeNode(id);
        var src = document.createAttribute("src");
        src.value = json[0]["image"];
        img.setAttributeNode(src);
        slideDiv.appendChild(img);

        /* set the image */
        function setImage (theImg) {
            var ssImg = slideImg = document.getElementById("slideImageId");
            ssImg.src = theImg;
        }
        
        // add a caption
        var caption = document.createElement("p");
        var cls = document.createAttribute("class");
        cls.value = "slideCaptionClass";
        caption.setAttributeNode(cls);
        var id = document.createAttribute("id");
        id.value = "slideCaptionId";
        caption.setAttributeNode(id);
        caption.innerHTML = json[0][captionText];   
        slideDiv.appendChild(caption);

        /* set the caption */
        function setCaption (theCaption) {
            var ssCaption = document.getElementById("slideCaptionId");
            ssCaption.innerHTML = theCaption;
        }

        // add back button 
        var backButton = document.createElement("button");
        backButton.innerHTML = " < ";
        slideDiv.appendChild(backButton);

        // add forward button  
        var fwdButton = document.createElement("button");
        fwdButton.innerHTML = " > ";
        slideDiv.appendChild(fwdButton);

        slideShow.appendChild(slideDiv); 

        /* Advance to the next item in the slide show */
        function nextSlide() {
            slideNum++;
            if (slideNum >= json.length) {
                slideNum = 0;
            }
            setImage(json[slideNum]["image"]);
            setCaption(json[slideNum][captionText]);
        }

        /* Go to the previous item in the slide show */
        function prevSlide() {
            slideNum--;
            if (slideNum < 0) {
                slideNum = json.length - 1;
            }
            setImage(json[slideNum]["image"]);
            setCaption(json[slideNum][captionText]);
        }

        // Add onclick to the previous and back buttons and the <div> containing the card.
        backButton.onclick = prevSlide;
        fwdButton.onclick = nextSlide;

        return slideShow;
    }

}