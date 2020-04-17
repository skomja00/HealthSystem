function slideShows(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
        <style>
            .slideShow{
                float: left; 
                box-sizing: border-box; 
                width: 33.3%;
            }
            .slideShow img {
                width: 85%;
            }
        </style>
        <p></p>
    `;
    
    var contentArea = document.getElementById(id);
    contentArea.innerHTML = content;

    // name of folder that holds the pictures: pic1.png, pic2.png, ...
    var myFolder = "../images/";
    var myPicList = ["pic1.png", "pic2.png", "pic3.png"];
    var ssDiv1 = document.createElement("div");
    contentArea.appendChild(ssDiv1);
    var ss1 = MakeSlideShow(ssDiv1, myFolder, myPicList);

    // Example showing why you need to get the ss reference, so the HTML page can invoke 
    // any public methods that may be available from the returned slide show object.
    ss1.setPicNum(1);

    // create second slideshow object
    var otherPicList = ["pic4.png", "pic5.png", "pic6.png"];
    var ssDiv2 = document.createElement("div");
    contentArea.appendChild(ssDiv2);
    var ss2 = MakeSlideShow(ssDiv2, myFolder, otherPicList);

    // create third slideshow object
    var thirdPicList = ["pic7.png", "pic8.png", "pic9.png"];
    var ssDiv3 = document.createElement("div");
    contentArea.appendChild(ssDiv3);
    var ss3 = MakeSlideShow(ssDiv3, myFolder, thirdPicList);
}