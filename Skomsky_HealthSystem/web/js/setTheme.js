
"use strict";

/**
 * setTheme() will style a set of properties using one or another of two 
 * pallettes. Each pallette will store separate colors/icons.
 * setTheme() will be called from a menu bar icon onclick() as a toggle.
 * When the icon is clicked the theme will switch back and forth. 
 * The theme settings are xml to be human-readable and customizable by the user  
 * A <style> element will be added to the header to style the properties 
 * for each of the following classes
 * 
    title
        background-color 
        box-shadow 
        color
        text-shadow 
    navigation
        border 
        background-color 
    mission
        box-shadow 
        background-color 
    mission-flyover
        color 
        text-shadow 
    footer
        background-color 
        box-shadow 
        color 
        text-shadow
    list-item
        background-color 
        color 
    list-item-title
        background-color 
        color
    and the theme icon id='theme-icon' also styled and used as a toggle
 * 
 * TODO: Dont know of the best way to make the XML a settings accessible to 
 * the user to customize in an external xml file or anywhere other than 
 * hard-coded in the palletteDoc() fn. 
 * 
 */
/**
 * TODO: setup onclick fn. to restyle the document. 
 * Found the following code example on 
 * https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
 */ 
/*
*
 * setTheme() will toggle between 2 theme settings. 
 * @param {String} palId - value is either "LightPallette" or "DarkPallette" selection of theme colors 
 * @returns {} returns nothing
 *
 */function setTheme (palId) {
    
    /**
    * Depending on the current <img src=...> setting of the theme icon 
    * togglePallette() will return either "LightPallette" or "DarkPallette".
    * Clicking on the dark theme icon switches to light theme and vice versa.
    * 
    * @returns {} nothing 
    */
    var ti = document.getElementById("ddTheme");//"theme-icon");
    //ti.addEventListener('click', togglePallette);
    ti.onclick = function togglePallette (ele) {
        var currThemeIcon = ele.target.getAttribute("src");
        var icon = currThemeIcon.match(/moon-icon/g); 
        if (icon !== null) {
            setTheme("LightPallette");
        };
        var icon = currThemeIcon.match(/sun-icon/g);  
        if (icon !== null) {
            setTheme("DarkPallette");
        }
    };

     
    //var palId = togglePallette();
    var hash = getPallette(palId);
    
    var s = document.getElementById("themeId");;
    if (!s) {
        var h = document.getElementsByTagName("head")[0]; 
        var s = document.createElement("style");
        var i = document.createAttribute("id");
        i.value = "themeId";
        s.setAttributeNode(i);
        h.appendChild(s);
    }
    s.innerHTML = 
        ".title { background-color : " + hash["titleBackgroundColor"] + ";" + 
        "         box-shadow : 0px 0px 9px 7px " + hash["titleBoxShadow"] + ";" + 
        "         color : " + hash["titleColor"] + ";" + 
        "         text-shadow : " + "0px 0px 10px " + hash["titleTextShadow"] + ";}" + 
        ".navigation { border = 2px solid " + hash["navBorder"] + ";" + 
        "              background-color : " + hash["navBackground"] + ";}" + 
        ".mission { box-shadow : 0px 0px 10px 10px " + hash["missionBoxShadow"] + ";" + 
        "           background-color : " + hash["missionBackground"] + ";}" + 
        ".mission-flyover { color : " + hash["missionFlyoverColor"] + ";" + 
        "                   text-shadow : 0px 0px 10px " + hash["missionFlyoverTextShadow"] + ";}" + 
        ".footer { background-color : " + hash["footerBackgroundColor"] + ";" + 
        "         box-shadow : 0px 0px 9px 7px " + hash["footerBoxShadow"] + ";" + 
        "         color : " + hash["footerColor"] + ";" + 
        "         text-shadow : 0px 0px 10px " + hash["footerTextShadow"] + ";}" +
        ".list-item { background-color : " + hash["listItemBackground"] + ";" + 
        "            color : " + hash["listItemColor"] + ";}" + 
        ".list-item-title { background-color : " + hash["listItemBackground"] + ";" + 
        "                  color : " + hash["listItemColor"] + ";}";
    
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
                        "<color name='titleColor'               rgb='FFFFFF' r='255' g='255' b='255' />" +
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
                        "<color name='footerColor'              rgb='FFFFFF' r='242' g='242' b='223' />" +
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
}