// Sally's JS naming convention: every JS file shall be named for the single funtion 
// or object that is defined within the file (helps to organize and find code).
 
// Initialize the drop down framework by calling function dropDownFw (below). So that the framework 
// has no dependencies on outside code, you pass in the name you want for your dropdown header 
// style, the drop down content style and what position you want (off screen to the right) for your 
// drop contents to zoom in from. 

// Note: you have to use the "visibility" (hidden/visible) rather than "display" (none/block) 
// if you want to use transitions/animation on the open/close of the dropdown content elements. 

"use strict";

/**
 * This code is based on 07_dropdowns_Encapsulated  
 * It sets up 2 click events: 
 * 1. click anything other than a dropHeader then hide each child of all dropContent elements
 * 2. click a dropHeader then show each child of the adjacent sibling dropContent and
 *                            hide each child of all other dropContent elements
 * 
 */
function dropdownFw (dropHeaderStyle, dropContentStyle ) {
    var headerList = document.getElementsByClassName(dropHeaderStyle);
    
    /* After the <body> is rendered initialize the onclick function for each dropheader. */
    for (var i = 0; i < headerList.length; i++) {
        headerList[i].onclick = function () {

            // get the DOM element that is classed dropContentStyle which is a sibling 
            // of the dropHeader that was clicked. This is what we want to open or close.
            var parent = this.parentElement; // "this" means clicked DOM element.
            var dContent = parent.getElementsByClassName(dropContentStyle)[0];

            var dropContentList = document.getElementsByClassName(dropContentStyle);
    
            // when one dropdown is clicked, make sure to close any other ones
            // that the user may have left open.
            for (var i = 0; i < dropContentList.length; i++) {
                if (dropContentList[i] !== dContent) {
                    hide(dropContentList[i]);
                }
            }

            // Tip: JS doesnt understand the initial CSS values (the values 
            // set by style sheet instead of by JS), unless you use the getComputedStyle
            // function. But you can avoid having to use getComputedStyle by having your  
            // if condition test for the way CSS does NOT have it initially set. 
            // (In other words, do not reverse the order of the if/else block.)                      
            if (dContent.style.visibility === "visible") {
                hide(dContent);
            } else {
                show(dContent);
            }

        };
    }


    // private function, makes element invisible (display:none cannot be used with transition/amimation).
    // By setting the right attribute to large negative number, the element will be placed far off screen
    // to the right and this will be where it starts when it is next made visible (for the "zoom in from 
    // right" animation). 
    function hide(ele) {
        /*ele.style.right = hiddenRight;*/ /* prefer element to pop up than animate */
        ele.style.visibility = "hidden";
    }

    // private function, makes element visible.
    function show(ele) {
       ele.style.visibility = "visible";
        ele.style.right = "0px";
    }

    // private function, makes all drop content elements hidden.
    function hideAllDropContents() {
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for (var i = 0; i < dropContentList.length; i++) {
            hide(dropContentList[i]);
        }
    }

    // Make it so that all dropdown content elements close whenever the user clicks anywhere 
    // but on a drop down header.
    window.onclick = function (event) {
        if (!event.target.matches('.' + dropHeaderStyle)) {
            hideAllDropContents();
            //console.log("hiding all drop contents");
        } else {
            //console.log("not hiding all drop contents");
        }

    };

}