/**
 * setTheme() will style/theme a set of properties using either of two 
 * color palletes named light or dark. The user can toggle back and forth. 
 * The color pallettes for each theme are customizable
 * via the settings XML.  color.adobe.com  provides a "copy to xml" 
 * function and is useful in creating the XML color palletes. 
 * 
 * TODO: try/catch (javascript?) to make this id's optional in the styling theme?
 * The following id's are required in the document:
 *   "title"
 *   "nav"
 *   "mission"
 *   "mission-flyover"
 *   "footer"
 * 
 * TODO: Dont have a way of making the XML a settings accessible to 
 * the user to customize in an external xml file or anywhere other than 
 * hard-coded in the palletteDoc() fn. 
 * 
 */

"use strict";

ddTheme.onclick = function () {
    setTheme();
}

function setTheme () {


    var toggle = getToggle(); 
    console.log(toggle);
    /* TODO: fix XOR code stink */
    /*var toggle = getToggle() ^ 1; /* XOR to switch back and forth from 0..1 */
    if (toggle === "0") {
        toggle = "1";
    }
    else
    {
        toggle = "0";
    }
    setCookie(toggle);
    
    var palId = new Array("LightPallette", "DarkPallette");

    var hash = getPallette(palId[toggle]);

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

    /* loop through and theme the list HTMLCollections elements */
    themeCollection(document.getElementsByClassName("list-item")); 
    themeCollection(document.getElementsByClassName("list-item-title")); 

    function getPallette(palId) {
        var rgba;
        var alpha;
        var hash = {}; /* hash: key = descriptive color name */ 
                       /*       value = "RGBA(r,g,b,a)" string   */
        var xmlDoc = palletteDoc();
        var pallette = xmlDoc.getElementById(palId); 
        var child = pallette.firstChild;                       /* this is the first rgba color */
        for (var i = 0; i < pallette.childNodes.length; i++) { /* for each get the rgba attrs */     
            rgba = "rgba(";
            rgba += child.getAttribute("r") + ", ";                
            rgba += child.getAttribute("g") + ", ";     
            rgba += child.getAttribute("b") + ", ";
            alpha = child.getAttribute("a");
            if (alpha === null) /* if not given alpha will default to l */
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
            /* from color.adobe.com...
            <palette> 
            <color name='1' rgb='A7DDF2' r='167' g='221' b='242' />
            <color name='2' rgb='A7E4F2' r='167' g='228' b='242' />
            <color name='3' rgb='DCEEF2' r='220' g='238' b='242' />
            <color name='4' rgb='B6F2F2' r='182' g='242' b='242' />
            <color name='5' rgb='F2F2DF' r='242' g='242' b='223' />
            </palette> */

            /*<palette>
            <color name='1' rgb='4F82B3' r='079' g='130' b='179' />
            <color name='2' rgb='A3D3FF' r='163' g='211' b='255' />
            <color name='3' rgb='89C5FF' r='137' g='197' b='255' />
            <color name='4' rgb='B3863D' r='179' g='134' b='061' />
            <color name='5' rgb='FFD38A' r='255' g='211' b='138' /> */

        var colorPalletteStr = 
            "<Root>" +
                "<Pallette id='LightPallette'>" +
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
                "</Pallette>" +
                "<Pallette id='DarkPallette'>" +
                    "<color name='titleBackgroundColor'     rgb='F2F2DF' r='242' g='242' b='223' />"+
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
                    "<color name='footerBackgroundColor'    rgb='F2F2DF' r='242' g='242' b='223' />"+
                    "<color name='footerBoxShadow'          rgb='CCCCCC' r='204' g='204' b='204' />" +
                "</Pallette>" +
            "</Root>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser(); /* see www.w3schools.com/xml/xml_dom.asp */
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    }    
    function themeCollection(collection) {
        var ele;
        for (var i = 0; i < collection.length; i++) {
            ele = collection[i];
            ele.style.backgroundColor = hash["listItemBackground"];
            ele.style.color = hash["listItemColor"];
        }
    }
    
    function getToggle() {
        var toggle;
        var cookie = document.cookie;  /* get the cookie string */
        if (cookie === "") {           /* if not set assign it */
            var cvalue = "1";
            setCookie(cvalue);
            toggle = 1;
        }
        else
        {
           var cookie = document.cookie;
           var c = cookie.split(';');           /* cookies delimited by the ";" */
           for (var i = 0; i < c.length; i++) {
               var s = c[i].split('=');         /* each cookie has a "name=value" */
               if (s[0] === "themeToggle") {    /* themeToggle cookie value is an array */
                   toggle = s[1];           /* return its value */
               }
           }
        }
        return toggle;
    }
    
    function setCookie (cValue) {
        var cName = "themeToggle"; /* cookie name */
        var expDays = -1;
        var d = new Date();        /* cookie expiration in milliseconds + getTime() */
        d.setTime(d.getTime() + (expDays*24*60*60*1000));
        document.cookie = cName + "=" + cValue + ";" + expDays + ";path=/";
    }
}