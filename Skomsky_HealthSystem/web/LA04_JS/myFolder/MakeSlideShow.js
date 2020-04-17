
function MakeSlideShow(params) {

// Expecting a parameter object with these properties:
//        slideShowEle: a DOM object to hold the slide show image and buttons,
//        objList: objects with images inside
//        picPropName: "image" 
//        DID NOT IMPLEMENT: picCaptionName (field name of caption)

    if (!params) {
        alert("MakeSlideShow requires a parameter object");
        return;
    }
    if (!params.slideShowEle) {
        alert("MakeSlideShow requires a parameter object with 'slideShowEle' property (DOM object where slide show is to be created).");
        return;
    }
    if (!params.objList || !params.objList[0] || !params.picPropName) {
        alert("MakeSlideShow requires a parameter object with 'objList' property (array of objects)" +
                " and each object must have an image file name specified by property 'picPropName'");
        return;
    }

    // slideShowEle is the DOM object that will hold the SlideShow image and the buttons.
    var slideShowEle = params.slideShowEle;
    slideShowEle.classList.add("slideShow");

    var objList = params.objList;
    var picPropName = params.picPropName;
    var captionPropName = params.captionPropName;

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShowEle.appendChild(div);

    // add image into the div & set the image's src attribute to the 1st picture in the list
    var myImage = document.createElement("img");
    div.append(myImage);

    // add image into the div & set the image's src attribute to the 1st picture in the list
    var myCaption = document.createElement("p");
    div.append(myCaption);
    myCaption.innerHTML = objList[0].userEmail;


    // add back button under the image (and space between buttons)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; "; // HTML code for the less than sign.
    slideShowEle.appendChild(backButton);

    // add forward button after back button and space
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; "; // HTML code for the greater than sign.
    slideShowEle.appendChild(fwdButton);

    // Private variable that keeps track of which image is showing
    var picNum = 0;
    updatePic();

    // Private method to advance to next image in the picture list
    function nextPic() {
        picNum++;
        if (picNum >= objList.length) {
            picNum = 0;
        }
        // change the src attribute of the image element to the desired new image)
        updatePic();
    }

    // Private method to go back to the previous image in the picture list
    function prevPic() {
        picNum--;
        if (picNum < 0) {
            picNum = objList.length - 1;
        }
        // change the src attribute of the image element to the desired new image)
        updatePic();
    }

    // Whenever anyone clicks the back button, make the prevPic method run
    // Whenever anyone clicks the fwd button, make the nextPic method run
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;

    // Example of a public method that the HTML coder can invoke when/if they want to 
    slideShowEle.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < objList.length)) {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            updatePic();
        }
    };

    function updatePic() {
        var obj = objList[picNum];
        myImage.src = obj[picPropName];
        myCaption.innerHTML = obj[captionPropName];
   }

    return slideShowEle;
}