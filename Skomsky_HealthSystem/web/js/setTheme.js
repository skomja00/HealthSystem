/**
 * setTheme() will style a set of properties using one or another of two 
 * pallettes. Each pallette will store separate colors/icons.
 * setTheme() will be called from a menu bar icon onclick() as a toggle.
 * When the icon is clicked the theme will switch back and forth. 
 * The theme settings are xml to be human-readable and customizable by the user  
 * 
 * The available HTML id's and the list of each styled property are as follows;
 *
 *   id="title"
 *       style.backgroundColor
 *       style.boxShadow
 *       style.color
 *       style.textShadow
 *   id="nav"
 *       style.border
 *       style.backgroundColor
 *   id="list-item", "list-item-title"
 *       style.backgroundColor
 *       style.color
 *   id="mission"
 *       style.boxShadow
 *       style.backgroundColor
 *   id="mission-flyover"
 *       style.color
 *       style.textShadow
 *   id="footer"
 *       style.backgroundColor
 *       style.boxShadow
 *   id="theme-icon"
 *      innerHTML=<img src=hash["icon"]
 * 
 * TODO: Dont know of the best way to make the XML a settings accessible to 
 * the user to customize in an external xml file or anywhere other than 
 * hard-coded in the palletteDoc() fn. 
 * 
 */

"use strict";

/**
 * TODO: setup onclick fn. to restyle the document. 
 * Found the following code example on 
 * https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
 */ 
/*
 *document.getElementById("ddTheme").onclick = function () {
 *   setTheme();
 *};
*/

function setTheme (palId) {

    /*var palId = togglePallette();*/
    var hash = getPallette(palId);
    
    /* theme the single elements */
    document.getElementById("title").style.backgroundColor = hash["titleBackgroundColor"];
    document.getElementById("title").style.boxShadow = "0px 0px 9px 7px " + hash["titleBoxShadow"];
    document.getElementById("title").style.color = hash["titleColor"];
    document.getElementById("title").style.textShadow = "0px 0px 10px " + hash["titleTextShadow"];
    document.getElementById("nav").style.border = "2px solid " + hash["navBorder"];
    document.getElementById("nav").style.backgroundColor = hash["navBackground"];
    document.getElementById("mission").style.boxShadow = "0px 0px 10px 10px " + hash["missionBoxShadow"];
    document.getElementById("mission").style.backgroundColor = hash["missionBackground"];
    document.getElementById("mission-flyover").style.color = hash["missionFlyoverColor"];
    document.getElementById("mission-flyover").style.textShadow = "0px 0px 10px " + hash["missionFlyoverTextShadow"];
    document.getElementById("footer").style.backgroundColor = hash["footerBackgroundColor"];
    document.getElementById("footer").style.boxShadow = "0px 0px 9px 7px " + hash["footerBoxShadow"];
    document.getElementById("footer").style.color = hash["footerColor"];
    document.getElementById("footer").style.textShadow = "0px 0px 10px " + hash["footerTextShadow"];

    /* loop through and theme HTMLCollections elements */
    themeCollection(document.getElementsByClassName("list-item")); 
    themeCollection(document.getElementsByClassName("list-item-title")); 

    /* style the icon */
    document.getElementById("ddTheme").innerHTML = hash["icon"];

    /*
     * getPallette() retuns a hash of the theme attributes. Color elements have 
     * string "RGBA(r,g,b,a)" hash value, icon elements have a image src= hash value
     * 
     * @param {LightPallette|DarkPallette} palId
     * @returns {Associative Array} hash
     */
    function getPallette(palId) {
        var rgba;
        var alpha;
        var hash = {}; /* hash: key = descriptive color name */ 
                       /*       value = "RGBA(r,g,b,a)" string   */
        var xmlDoc = palletteDoc();
        var theme = xmlDoc.getElementById(palId).childNodes; 
        for (var i = 0; i < theme.length; i++) {
            /* get the colors and concat the "RGBA(r,g,b,a)" string */
            if (theme[i].id === "colors") {
                var colors = theme[i].children;
                for (var j = 0; j < colors.length; j++) { 
                    rgba = "rgba(";
                    rgba += colors[j].getAttribute("r") + ", ";                
                    rgba += colors[j].getAttribute("g") + ", ";     
                    rgba += colors[j].getAttribute("b") + ", ";
                    alpha = colors[j].getAttribute("a");
                    if (alpha === null) /* if not given alpha will default to l */
                    { 
                        rgba += "1)";
                    } 
                    else
                    {
                        rgba += alpha + ")";                
                    }
                    hash[colors[j].getAttribute("name")] = rgba; /* "name" will be hash key */
                }
            }
            /* add an icon to the theme */
            if (theme[i].id === "icon") {
                hash["icon"] = "<a><img class='theme-icon' id='theme-icon' title='theme' src='" +
                                theme[i].getAttribute("src") + "'" +
                                "</a>";
            }
        }
        return hash;
    }
    /*
     * palletteDoc() implements DOM XML to parse an input string of theme pallettes/icons.
     *
     * @returns {XML Document}
     */
    function palletteDoc() {
            /* from color.adobe.com...
            <palette> lighter colors
            <color name='1' rgb='A7DDF2' r='167' g='221' b='242' />
            <color name='2' rgb='A7E4F2' r='167' g='228' b='242' />
            <color name='3' rgb='DCEEF2' r='220' g='238' b='242' />
            <color name='4' rgb='B6F2F2' r='182' g='242' b='242' />
            <color name='5' rgb='F2F2DF' r='242' g='242' b='223' />
            </palette> */

            /*<palette> saturated colors
            <color name='1' rgb='4F82B3' r='079' g='130' b='179' />
            <color name='2' rgb='A3D3FF' r='163' g='211' b='255' />
            <color name='3' rgb='89C5FF' r='137' g='197' b='255' />
            <color name='4' rgb='B3863D' r='179' g='134' b='061' />
            <color name='5' rgb='FFD38A' r='255' g='211' b='138' /> */

        var colorPalletteStr = 
            "<Root>" +
                "<Pallette id='LightPallette'>" +
                    "<colors id='colors'>" +
                        "<color name='titleBackgroundColor'     rgb='F2F2DF' r='242' g='242' b='223' a='.5' />" +
                        "<color name='titleBoxShadow'           rgb='CCCCCC' r='204' g='204' b='204' />" +
                        "<color name='titleColor'               rgb='FFFFFF' r='355' g='255' b='255' />" +
                        "<color name='titleTextShadow'          rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='navBorder'                rgb='B6F2F2' r='182' g='242' b='242' />" +
                        "<color name='navBackground'            rgb='B6F2F2' r='182' g='242' b='242' a='.5' />" +
                        "<color name='listItemBackground'       rgb='F2F2DF' r='242' g='242' b='223' />" +
                        "<color name='listItemColor'            rgb='A7DDF2' r='167' g='221' b='242' />" +
                        "<color name='listItemTitleColor'       rgb='A7E4F2' r='167' g='228' b='242' />" +
                        "<color name='missionBackground'        rgb='B6F2F2' r='182' g='242' b='242' a='.5' />" +
                        "<color name='missionBoxShadow'         rgb='4F82B3' r='137' g='197' b='255' />" +
                        "<color name='missionFlyoverColor'      rgb='FFFFFF' r='255' g='255' b='255' />" +
                        "<color name='missionFlyoverTextShadow' rgb='4F82B3' r='025' g='040' b='066' />" +
                        "<color name='footerBackgroundColor'    rgb='F2F2DF' r='242' g='242' b='223' a='.5' />" +
                        "<color name='footerBoxShadow'          rgb='CCCCCC' r='204' g='204' b='204' />" +
                        "<color name='footerColor'              rgb='FFFFFF' r='355' g='255' b='255' />" +
                        "<color name='footerTextShadow'         rgb='000000' r='000' g='000' b='000' />" +
                    "</colors>" +
                    "<icon id='icon' src='icons/light/sun-icon-H24.png' />" + 
                "</Pallette>" +
                "<Pallette id='DarkPallette'>" +
                    "<colors id='colors'>" +
                        "<color name='titleBackgroundColor'     rgb='A3D3FF' r='163' g='211' b='255' a='.5' />"+
                        "<color name='titleBoxShadow'           rgb='4F82B3' r='079' g='130' b='179' />" +
                        "<color name='titleColor'               rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='titleTextShadow'          rgb='4F82B3' r='029' g='080' b='129' />" +
                        "<color name='navBorder'                rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='navBackground'            rgb='A3D3FF' r='163' g='211' b='255' a='.5' />" +
                        "<color name='listItemBackground'       rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='listItemColor'            rgb='B3863D' r='179' g='134' b='61' />" +
                        "<color name='listItemTitleColor'       rgb='B3863D' r='179' g='134' b='61' />" +
                        "<color name='missionBackground'        rgb='A3D3FF' r='163' g='211' b='255' a='.5' />" +
                        "<color name='missionBoxShadow'         rgb='4F82B3' r='100' g='150' b='200' />" +
                        "<color name='missionFlyoverColor'      rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='missionFlyoverTextShadow' rgb='4F82B3' r='000' g='000' b='000' />" +
                        "<color name='footerBackgroundColor'    rgb='A3D3FF' r='163' g='211' b='255' a='.5' />"+
                        "<color name='footerBoxShadow'          rgb='4F82B3' r='079' g='130' b='179' />" +
                        "<color name='footerColor'              rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='footerTextShadow'         rgb='4F82B3' r='029' g='080' b='129' />" +
                    "</colors>" +
                "<icon id='icon' src='icons/dark/moon-icon-H24.ico' />" + 
                "</Pallette>" +
            "</Root>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser(); /* see www.w3schools.com/xml/xml_dom.asp */
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    }    
    /*
     * 
     * Theme multiple items of a HTML collection/CSS class. 
     */
    function themeCollection(collection) {
        var ele;
        for (var i = 0; i < collection.length; i++) {
            ele = collection[i];
            ele.style.backgroundColor = hash["listItemBackground"];
            ele.style.color = hash["listItemColor"];
        }
    }
    
    /*
     * 
     * @returns {String} Togle between "LightPallette" or "DarkPallette" 
     * depending on the current src= setting of the theme img icon. 
     * Clicking on the dark theme icon switches to light theme and vice versa.
     */    
    function togglePallette() {
        var currThemeIcon = document.getElementById("theme-icon").src;
        var icon = currThemeIcon.match(/moon-icon/g); 
        if (icon !== null) {
            return "LightPallette";
        };
        var currThemeIcon = currThemeIcon.match(/sun-icon/g);  
        if (icon !== null) {
            return "DarkPallette";
        }
    };
}