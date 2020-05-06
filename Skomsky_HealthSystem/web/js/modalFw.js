// create global object (named same as js file) so html page can access it.
var modalFw = {};

// This is an IIFE, an immediately executing (anonymous) function.
// It will adorn the public object with a couple of public methods.
(function () {

    // create div for modal window and attach it to the <body> tag. 
    // The initial styling (set by "modalStyle" class rule in modalFw.css) 
    // makes the div initially invisible.
    var modalWindow = document.createElement("div");
    modalWindow.className = "modalStyle";
    var bList = document.getElementsByTagName("body");
    bList[0].appendChild(modalWindow);
    hide(modalWindow);

    function hide(ele) {
        ele.style.top = "-500px";
    }

    function show(ele) {
        ele.style.top = "150px";
    }

    // create public method that can be used by the HTML coder.
    modalFw.alert = function (message) {
        show(modalWindow);
        console.log("function modalFw.alert was called with message " + message);

        modalWindow.innerHTML = "";
        
        // add message area
        var messageArea = document.createElement("p");
        modalWindow.appendChild(messageArea);
        messageArea.innerHTML = message + "<br/><br/>";

        // add button area to hold the ok and cancel buttons
        buttonArea = document.createElement("div");
        buttonArea.className = "buttonArea";
        messageArea.appendChild(buttonArea);

        // add ok button into button area
        var xButton = document.createElement("INPUT");
        xButton.setAttribute("type", "button");
        xButton.setAttribute("value", "OK");
        xButton.className = "close";
        xButton.onclick = function () {
            hide(this.parentNode.parentNode.parentNode);
        };
        buttonArea.appendChild(xButton);        

        show(modalWindow);
    };

    // create public method that can be used...
    modalFw.confirm = function (message, okFunction) { 

        console.log("function modalFw.confirm was called with message " + message);

        modalWindow.innerHTML = "";
        
        // add message area
        var messageArea = document.createElement("p");
        modalWindow.appendChild(messageArea);
        messageArea.innerHTML = message + "<br/><br/>";

        // add button area to hold the ok and cancel buttons
        buttonArea = document.createElement("div");
        buttonArea.className = "buttonArea";
        messageArea.appendChild(buttonArea);

        // add ok button into button area
        var okButton = document.createElement("INPUT");
        okButton.setAttribute("type", "button");
        okButton.setAttribute("value", "OK");
        okButton.className = "close";
        okButton.onclick = function () {
            //this.parentNode.parentNode.parentNode.style.visibility = "hidden"; // make modal window invisible
            hide(this.parentNode.parentNode.parentNode);
            okFunction();
        };
        buttonArea.appendChild(okButton);

        // add cancel button into button area
        var cancelButton = document.createElement("INPUT");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("value", "Cancel");
        cancelButton.className = "close";
        cancelButton.onclick = function () {
            // button is in buttonArea (parent) is in messageArea (grandparent) is in modalWindow (great grandparent)
            //this.parentNode.parentNode.parentNode.style.visibility = "hidden"; // make modal window invisible
            hide(this.parentNode.parentNode.parentNode);
        };
        buttonArea.appendChild(cancelButton);

        show(modalWindow);
    };

}());  // the end of the IIFE
// the () invokes it... 
// the last ) wraps the whole function definition - see starting ( at top.  