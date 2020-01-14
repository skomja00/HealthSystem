/* https://color.adobe.com/ has a handy "Copy as XML" button. 
 * I pasted below, and used the xml string to start to build a 
 * set of theme colors. This hash
 * is extendible to as many color names as in the xml pallette
 * 
 * 1. copy/paste "Copy as XML" see https://color.adobe.com/
 * 2. then add " (quotes) to make it a javascript string 
 * 
 */

"use strict";

function setTheme () {

    var pal = getPallette();

    /* general theme styling */
    document.getElementById("nav").style.backgroundColor = pal["dark"];
    document.getElementById("content").style.backgroundColor = pal["darkTrans"];
    document.getElementById("svcs").style.backgroundColor = pal["lightest"];
    document.getElementById("busOfc").style.backgroundColor = pal["lightest"];
    document.getElementById("docs").style.backgroundColor = pal["lightest"];
    document.getElementById("footer").style.backgroundColor = pal["lighter"];

    /* title theme styling */
    document.getElementById("title").style.backgroundColor = pal["titleBackgroundColor"];

    /* boxShadow:  
    h-offset: positive shadow to the right, negative to the left, 0 around left/right perimeter 
    v-offset: positive shadow below, negative above, 0 around top/bottom perimeter 
    blur: the higher the blur radius, the more blurred the shadow will be
    spread: spread radius. A positive increases the size of the shadow, a negative value decreases the size of the shadow*/
    document.getElementById("title").style.boxShadow = "0px 0px 9px 7px " + pal["titleBoxShadow"];
    document.getElementById("title").style.color = pal["titleColor"];
    document.getElementById("title").style.textShadow = "0px 0px 10px " + pal["titleTextShadow"];
    
    function getPallette() {
        var i, r, g, b, a, rgba;
        var pal = {}; /* hash: key = descriptive color name */ 
                      /*       value = "RGBA(r,g,b,a)" string   */
        var xml = pallette();
        var x = xml.getElementsByTagName("color"); /* for each color */
        for (i = 0; i <x.length; i++) {            /* get each r, g, b, a value */ 
            r = x[i].getAttribute("r");              
            g = x[i].getAttribute("g");
            b = x[i].getAttribute("b");
            a = x[i].getAttribute("a");
            if (a === null) /* color.adobe.com doesn't give alpha values */
            {               /* if not added alpha will defualt to l */
                a = "1";
            }
            rgba = "rgba(" + r + ", " + 
                             g + ", " +
                             b + ", " +
                             a + ")";
          pal[x[i].getAttribute("name")] = rgba; /* "name" will be hash key */
        }
        return pal;
    }
    function pallette() {
        var colorPalletteStr = 
            /* TODO: Would be nice to make the XML a settings accessible to 
            * the user instead of the hard-coded in the pallette() fn. */
            "<LightPallette>" +
            /* general theme colors */
                "<color name='darker' rgb='A7DDF2' r='167' g='221' b='242' />" +
                "<color name='dark' rgb='A7E4F2' r='167' g='228' b='242' />" +
                "<color name='darkTrans' rgb='A7E4F2' r='167' g='228' b='242' a='.5' />" +
                "<color name='light' rgb='DCEEF2' r='220' g='238' b='242' />" +
                "<color name='lighter' rgb='B6F2F2' r='182' g='242' b='242' />" +
                "<color name='lightest' rgb='F2F2DF' r='242' g='242' b='223' />" +
                /* light title theme colors */
                "<color name='titleBackgroundColor' rgb='A7E4F2' r='167' g='228' b='242' />" +
                "<color name='titleBoxShadow' rgb='CCCCCC' r='204' g='204' b='204' />" +
                "<color name='titleColor' rgb='FFFFFF' r='255' g='255' b='255' />" +
                "<color name='titleTextShadow' rgb='000000' r='000' g='000' b='000' />" +
            "</LightPallette>" +
            "<DarkPallette>" +
                /* general theme colors */
                "<color name='darker' rgb='A7DDF2' r='167' g='221' b='242' />" +
                "<color name='dark' rgb='A7E4F2' r='167' g='228' b='242' />" +
                "<color name='darkTrans' rgb='A7E4F2' r='167' g='228' b='242' a='.5' />" +
                "<color name='light' rgb='DCEEF2' r='220' g='238' b='242' />" +
                "<color name='lighter' rgb='B6F2F2' r='182' g='242' b='242' />" +
                "<color name='lightest' rgb='F2F2DF' r='242' g='242' b='223' />" +
                /* dark title theme colors */
                "<color name='titleBackgroundColor' rgb='A7DDF2' r='167' g='221' b='242' />" +
                "<color name='titleBoxShadow' rgb='CCCCCC' r='204' g='204' b='204' />" +
                "<color name='titleColor' rgb='FFFFFF' r='255' g='255' b='255' />" +
                "<color name='titleTextShadow' rgb='000000' r='000' g='000' b='000' />" +
            "</DarkPallette>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser(); /* see https://www.w3schools.com/xml/xml_parser.asp */
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    };
}
//.title {
//    box-shadow:  0px 0px 8px 6px  #cccccc; 
//    color: #ffffff;
//    text-shadow: 0px 0px 10px #000000;
//.navigation {
//    border: 2px solid #bbbbbb;
//.list-item:hover {
//    border: 2px solid #bbbbbb;
//    box-shadow: 4px 4px 4px #bbbbbb;  /* "3D" effect on the main contianer list items */
//.list-item-title {
//    background-color: rgba(187, 187, 187, 1); /* lighter gray */
//    color: #000000;
//.mission-box {
//    box-shadow: 0px 0px 10px 10px  #bbbbbb; /* 0px 0px no offset will shadow outside entire box 
//.mission-fly-over {
//    color: #FFFFFF;
//    text-shadow: 0px 0px 10px #000000;
//.footer {
//    box-shadow: 0px 0px 10px 6px  #bbbbbb; 
//
