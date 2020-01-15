/* 
 * setTheme() will style/theme a set of properties for specifically named HTML 
 * elements using a hash of named colors  from an xml pallette. color.adobe.com 
 * provides the "copy to xml" function used in palleteDoc(). Found some info below 
 * from w3schools.com regarding the DOM: 

 * 
 *     "The DOM defines a standard for accessing and manipulating HTML and XML documents.
 *     It presents an XML document as a tree-structure. The XML DOM is a standard for 
 *     how to get, change, add, or delete XML elements. Understanding the DOM 
 *     is a must for anyone working with HTML or XML."
 * 
 * TODO: Would be nice to make the XML a settings accessible to 
 * the user to customize in an external xml file or anywhere other than 
 * hard-coded in the palletteDoc() fn. 
 * 
 */

"use strict";

function setTheme (palId) {

//    document.cookie = "darkLightThemeToggle=1";
//    var toogle = document.cookie;
    var hash = getPallette(palId);
    document.getElementById("content").style.backgroundColor = hash["darkTrans"];
    document.getElementById("svcs").style.backgroundColor = hash["lightest"];
    document.getElementById("busofc").style.backgroundColor = hash["lightest"];
    document.getElementById("docs").style.backgroundColor = hash["lightest"];
    document.getElementById("footer").style.backgroundColor = hash["lighter"];

    /*  styling */
    document.getElementById("title").style.backgroundColor = hash["titleBackgroundColor"];
    document.getElementById("title").style.boxShadow = "0px 0px 9px 7px " + hash["titleBoxShadow"];
    document.getElementById("title").style.color = hash["titleColor"];
    document.getElementById("title").style.textShadow = "0px 0px 10px " + hash["titleTextShadow"];
    document.getElementById("nav").style.border = "2px solid " + hash["navBorder"];
    document.getElementById("nav").style.backgroundColor = hash["navBackground"];
    /*document.getElementById("svcs").style.border = "2px solid " + hash["listItemHover"];
    document.getElementById("busofc").style.border = "2px solid " + hash["listItemHover"];
    document.getElementById("docs").style.border = "2px solid " + hash["listItemHover"];*/
    
    function getPallette(palId) {
        var rgba;
        var alpha;
        var child;
        var hash = {}; /* hash: key = descriptive color name */ 
                       /*       value = "RGBA(r,g,b,a)" string   */
        var xmlDoc = palletteDoc();
        var pallette = xmlDoc.getElementById(palId); 
        child = pallette.firstChild;                           /* this is the first rgba color */
        for (var i = 0; i < pallette.childNodes.length; i++) { /* for each get the rgba attrs */     
            rgba = "rgba(";
            rgba += child.getAttribute("r") + ", ";                
            rgba += child.getAttribute("g") + ", ";     
            rgba += child.getAttribute("b") + ", ";
            alpha = child.getAttribute("a");
            if (alpha === null) /* if not given alpha will defualt to l */
            { 
                rgba += "1)";
            } 
            else
            {
                rgba += alpha + ")";                
            }
            hash[child.getAttribute("name")] = rgba; /* "name" will be hash key */
            child = child.nextSibling;
            rgba = "";           
        }
        return hash;
    }
    function palletteDoc() {
        var colorPalletteStr = 
            "<Root>" +
                "<Pallette id='LightPallette'>" +
                    "<color name='darker'    rgb='A7DDF2' r='167' g='221' b='242' />" +
                    "<color name='dark'      rgb='A7E4F2' r='167' g='228' b='242' />" +
                    "<color name='darkTrans' rgb='A7E4F2' r='167' g='228' b='242' a='.5' />" +
                    "<color name='light'     rgb='DCEEF2' r='220' g='238' b='242' />" +
                    "<color name='lighter'   rgb='B6F2F2' r='182' g='242' b='242' />" +
                    "<color name='lightest'  rgb='F2F2DF' r='242' g='242' b='223' />" +
                    "<color name='titleBackgroundColor' rgb='A7E4F2' r='167' g='228' b='242' a='.5' />" +
                    "<color name='titleBoxShadow'       rgb='CCCCCC' r='204' g='204' b='204' />" +
                    "<color name='titleColor'           rgb='FFFFFF' r='355' g='255' b='255' />" +
                    "<color name='titleTextShadow'      rgb='000000' r='000' g='000' b='000' />" +
                    "<color name='navBorder'            rgb='B6F2F2' r='182' g='242' b='242' />" +
                    "<color name='navBackGround'        rgb='B6F2F2' r='182' g='242' b='242'  a='.5' />" +
                    "<color name='listItemHover'        rgb='B6F2F2' r='182' g='242' b='242' />" +
                "</Pallette>" +
                "<Pallette id='DarkPallette'>" +
                    "<color name='darker'    rgb='4F82B3' r='79' g='130' b='179' />" +
                    "<color name='dark'      rgb='A3D3FF' r='163' g='211' b='255' />" +
                    "<color name='darkTrans' rgb='A3D3FF' r='163' g='211' b='255' a='.5' />" +
                    "<color name='light'     rgb='89C5FF' r='137' g='197' b='255' />" +
                    "<color name='lighter'   rgb='B3863D' r='179' g='134' b='61' />" +
                    "<color name='lightest'  rgb='FFD38A' r='255' g='211' b='138' />" +
                    "<color name='titleBackgroundColor' rgb='4F82B3' r='079' g='130' b='179' />" +
                    "<color name='titleBoxShadow'       rgb='FFD38A' r='255' g='211' b='138' />" +
                    "<color name='titleColor'           rgb='A3D3FF' r='163' g='211' b='255' />" +
                    "<color name='titleTextShadow'      rgb='B3863D' r='179' g='134' b='061' />" +
                    "<color name='navBorder'            rgb='A3D3FF' r='163' g='211' b='255' />" +
                    "<color name='navBackground'        rgb='A3D3FF' r='163' g='211' b='255' a='.5' />" +
                    "<color name='listItemHover'        rgb='B6F2F2' r='182' g='242' b='242' />" +
                "</Pallette>" +
            "</Root>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    };
}






//D.title {
//D    box-shadow:  0px 0px 8px 6px  #cccccc; 
//D    color: #ffffff;
//D    text-shadow: 0px 0px 10px #000000;
//D.navigation {
//D    border: 2px solid #bbbbbb;
//?.list-item:hover {
//?   border: 2px solid #bbbbbb;
//?    box-shadow: 4px 4px 4px #bbbbbb;  /* "3D" effect on the main contianer list items */ 
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
