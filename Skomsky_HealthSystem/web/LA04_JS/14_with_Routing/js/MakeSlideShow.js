function MakeSlideShow(slideShowEle, folder, picList) {

    // slideShowEleEle is the DOM object that will hold the SlideShow image 
    // and buttons.
    slideShowEle.classList.add("slideShow");

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShowEle.appendChild(div);

    // add image into the div & set the image's src attribute to show picture
    var myImage = document.createElement("img");
    div.append(myImage);
    myImage.src = folder + picList[0];

    // add back button under the image 
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    slideShowEle.appendChild(backButton);

    // add forward button under the image 
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    slideShowEle.appendChild(fwdButton);

    // private variable that keeps track of which image is showing
    var picNum = 0;

    // Advance to next image in the picture list
    function nextPic() {
        picNum++;
        if (picNum >= picList.length) {
            picNum = 0;
        }
        // change the src attribute of the image element to the desired new image)				
        myImage.src = folder + picList[picNum];
    }

    // Go to the previous image in the picture list
    function prevPic() {
        picNum--;
        if (picNum < 0) {
            picNum = picList.length - 1;
        }
        // change the src attribute of the image element to the desired new image)				
        myImage.src = folder + picList[picNum];
    }

    // add previous and back functionality to the previous and back buttons.
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;

    slideShowEle.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < picList.length)) {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            myImage.src = folder + picList[picNum];
        }
    };

    return slideShowEle;
}