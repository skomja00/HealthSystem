/* https://color.adobe.com/ has a handy "Copy as XML" button. 
 * I pasted below, and use the xml string so set theme colors. 
 * Would be helpful to make it a settings of some kind accessible to 
 * the user instead of the hard-coded str below. This hash
 * will accepts as many color names are in the xml pallette. 
 * 
 * 1. copy/paste "Copy as XML" see https://color.adobe.com/
 * 2. then add " (quotes) to make it a javascript string 
 * 
 */

"use strict";

function setTheme () {

    var pal = getPallette();
    //document.getElementById("body").style.backgroundColor = pal["dark"];
    document.getElementById("title").style.backgroundColor = pal["lighter"];
    document.getElementById("nav").style.backgroundColor = pal["dark"];
    document.getElementById("content").style.backgroundColor = pal["darkTrans"];
    document.getElementById("svcs").style.backgroundColor = pal["lightest"];
    document.getElementById("busOfc").style.backgroundColor = pal["lightest"];
    document.getElementById("docs").style.backgroundColor = pal["lightest"];
    document.getElementById("footer").style.backgroundColor = pal["lighter"];
    
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
            "<palette>" +
            "<color name='darker' rgb='A7DDF2' r='167' g='221' b='242' />" +
            "<color name='dark' rgb='A7E4F2' r='167' g='228' b='242' />" +
            "<color name='darkTrans' rgb='A7E4F2' r='167' g='228' b='242' a='.5' />" +
            "<color name='light' rgb='DCEEF2' r='220' g='238' b='242' />" +
            "<color name='lighter' rgb='B6F2F2' r='182' g='242' b='242' />" +
            "<color name='lightest' rgb='F2F2DF' r='242' g='242' b='223' />" +
            "</palette>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser(); /* see https://www.w3schools.com/xml/xml_parser.asp */
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    };
}
