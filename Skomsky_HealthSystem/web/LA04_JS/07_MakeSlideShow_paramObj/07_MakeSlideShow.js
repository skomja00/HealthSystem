
function MakeSlideShow(params) {
    
    // Expecting a parameter object with these properties: 
    //   ssID - id in which to render slideshow
    //   folder - (name of folder where images are stored),
    //   picList - picList (array of image names)

    if (!params || !params.slideShowEle || !params.folder || 
            !params.picList || !params.picList[0])
    {
        alert("MakeSlideShow requires a parameter object with these properties:\n" +
                "   ssID (id in which to render slideshow),\n" +
                "   folder (name of folder where images are stored), \n" +
                "   picList (array of image names)");
        return;
    }
    // get reference to the DOM object inside which the SlideShow image 
    // and buttons will be created.
    var slideShowEle = params.slideShowEle;
    slideShowEle.classList.add("slideShow");
    
    var folder = params.folder;
    var picList = params.picList;

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShowEle.appendChild(div);

    // add image into the div & set the image's src attribute to the 1st picture in the list
    var myImage = document.createElement("img");
    div.append(myImage);

    // add back button under the image (and space between buttons)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    slideShowEle.appendChild(backButton);

    // add forward button after back button and space
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    slideShowEle.appendChild(fwdButton);

    // Private variable that keeps track of which image is showing
    var picNum = 0;
    updatePic();

    // Private method to advance to next image in the picture list
    function nextPic() {
        picNum++;
        if (picNum >= params.picList.length) {
            picNum = 0;
        }
        // change the src attribute of the image element to the desired new image)				
        updatePic();
    }

    // Private method to go back to the previous image in the picture list
    function prevPic() {
        picNum--;
        if (picNum < 0) {
            picNum = picList.length - 1;
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
        if ((newNum >= 0) && (newNum < picList.length)) {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            updatePic();
        }
    };

    function updatePic() {
        myImage.src = folder + picList[picNum];
    }

    return slideShowEle;
}