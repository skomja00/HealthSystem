
"use strict";

/**
*
 * setTheme()  
 * @param {String} palId - value is either "LightPallette" or "DarkPallette" selection of theme colors 
 * @returns {} returns nothing
 *
 * setTheme() will toggle between 2 theme settings using one or another of two 
 * pallettes. Each pallette will store separate colors/icons.
 * setTheme() will be called from a menu bar icon onclick() as a toggle.
 * When the icon is clicked the theme will switch back and forth. 
 * The theme colors are xml to be customizable.  
 * A <style> element will be added to the header to style the properties 
 * for each of the following classes in 
 * 
 * 
 * TODO: Make the XML a settings accessible to 
 * the user to customize in an external xml file or anywhere other than 
 * hard-coded in the JavaScript. 
 * 
 */
function setTheme (palId) {
    
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
        var currThemeIcon = this.getElementsByTagName("img")[0].getAttribute("src");
        var icon = currThemeIcon.match(/moon-icon/g); 
        if (icon !== null) {
            setTheme("LightPallette");
        };
        var icon = currThemeIcon.match(/sun-icon/g);  
        if (icon !== null) {
            setTheme("DarkPallette");
        }
    };

    var rgbObj = getPallette(palId);
    
    var s = document.getElementById("themeId");;
    /* 1st time through create and append <style> tag to header 
     * Then assign innerHTML of <style>. */
    if (!s) {
        var h = document.getElementsByTagName("head")[0]; 
        var s = document.createElement("style");
        s.setAttribute("id","themeId");
        h.appendChild(s);
    }
    s.innerHTML = 
        ".title { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        ".navigation { border = 2px solid " + rgbObj.navBorder + ";" + 
        "              background-color : " + rgbObj.navBackground + ";}" + 
        ".mission { box-shadow : 0px 0px 10px 10px " + rgbObj.missionBoxShadow + ";" + 
        "           background-color : " + rgbObj.missionBackground + ";}" + 
        ".mission-flyover { color : " + rgbObj.missionFlyoverColor + ";" + 
        "                   text-shadow : 0px 0px 10px " + rgbObj.missionFlyoverTextShadow + ";}" + 
        ".footer { background-color : " + rgbObj.footerBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 9px 7px " + rgbObj.footerBoxShadow + ";" + 
        "         color : " + rgbObj.footerColor + ";" + 
        "         text-shadow : 0px 0px 10px " + rgbObj.footerTextShadow + ";}" +
        ".home li { background-color : " + rgbObj.listItemBackground + ";" + 
        "            color : " + rgbObj.listItemColor + ";}" + 
        ".home .list-item-title { background-color : " + rgbObj.listItemBackground + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        ".home a { text-shadow : 0px 0px 10px " + rgbObj.missionFlyoverTextShadow + ";" + 
        "          color : " + rgbObj.missionFlyoverColor + ";}" + 
        ".home a:visited { text-shadow : 0px 0px 10px " + rgbObj.missionFlyoverTextShadow + ";" + 
        "                  color : " + rgbObj.missionFlyoverColor + ";}" + 
        ".footer a {         text-shadow : 0px 0px 10px " + rgbObj.footerTextShadow + ";" + 
        "                    color : " + rgbObj.footerColor + ";}" + 
        ".footer a:visited { text-shadow : 0px 0px 10px " + rgbObj.footerTextShadow + ";" + 
        "                    color : " + rgbObj.footerColor + ";}" + 
        ".clickSort td { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 3px 2px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        ".clickSort th { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 3px 2px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" +
        "#insertArea td { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 3px 2px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        "#insertArea th { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 3px 2px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" +
        ".slideUsersClass { background-color: " + rgbObj.titleBackgroundColor + ";" + 
        "                   box-shadow: 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";" +  
        "                   color: " + rgbObj.titleColor + ";" + 
        "                   text-shadow: 0px 0px 10px + 0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        ".slidePatientsClass { background-color: " + rgbObj.titleBackgroundColor + ";" + 
        "                   box-shadow: 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";" +  
        "                   color: " + rgbObj.titleColor + ";" + 
        "                   text-shadow: 0px 0px 10px + 0px 0px 10px " + rgbObj.titleTextShadow + ";}" + 
        ".slideImageClass { box-shadow: 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";}" +  
        ".slideButton  { background-color: " + rgbObj.titleBackgroundColor + ";" + 
        "                   box-shadow: 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";" +  
        "                   color: " + rgbObj.titleColor + ";" + 
        "                   text-shadow: 0px 0px 10px + 0px 0px 10px " + rgbObj.titleTextShadow + ";}" +
        ".dropContent  { background-color: " + rgbObj.titleBackgroundColor + ";" + 
        "                border-color: " + rgbObj.titleColor + ";" + 
        "                color: " + rgbObj.titleColor + ";}" +
        ".dropHeader   { border-color: " + rgbObj.titleColor + ";}" + 
        ".modalStyle { background-color : " + rgbObj.titleBackgroundColor + ";" + 
        "         box-shadow : 0px 0px 9px 7px " + rgbObj.titleBoxShadow + ";" + 
        "         color : " + rgbObj.titleColor + ";" + 
        "         text-shadow : " + "0px 0px 10px " + rgbObj.titleTextShadow + ";}" +
        ".modalStyle .x {color: "+ rgbObj.titleColor + ";" + 
        "                box-shadow: 0px 0px 10px " + rgbObj.titleBoxShadow + ";}" ;


    /* style the icon */
    document.getElementById("ddTheme").innerHTML = rgbObj.icon;

    /*
     * getPallette() retuns a rgbObj of the theme attributes. Color elements have 
     * string "RGBA(r,g,b,a)" rgbObj value, icon elements have a image src= rgbObj value
     * 
     * @param {LightPallette|DarkPallette} palId
     * @returns {Associative Array} rgbObj
     */
    function getPallette(palId) {
        var rgba;
        var alpha;
        var rgbObj = {}; /* rgbObj: key = descriptive color name */ 
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
                    rgbObj[colors[j].getAttribute("name")] = rgba; /* "name" will be rgbObj key */
                }
            }
            /* add an icon to the theme */
            if (theme[i].id === "icon") {
                rgbObj.icon = "<a><img class='theme-icon' id='theme-icon' title='theme' src='" +
                                theme[i].getAttribute("src") + "'" +
                                "</a>";
            }
        }
        return rgbObj;
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
                        "<color name='titleBackgroundColor'     rgb='F2F2DF' r='242' g='242' b='223' />" +
                        "<color name='titleBoxShadow'           rgb='CCCCCC' r='204' g='204' b='204' />" +
                        "<color name='titleColor'               rgb='FFFFFF' r='255' g='255' b='255' />" +
                        "<color name='titleTextShadow'          rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='navBorder'                rgb='B6F2F2' r='182' g='242' b='242' />" +
                        "<color name='navBackground'            rgb='B6F2F2' r='174' g='230' b='255' />" +
                        "<color name='listItemBackground'       rgb='F2F2DF' r='242' g='242' b='223' />" +
                        "<color name='listItemColor'            rgb='A7DDF2' r='167' g='221' b='242' />" +
                        "<color name='listItemTitleColor'       rgb='A7E4F2' r='167' g='228' b='242' />" +
                        "<color name='missionBackground'        rgb='B6F2F2' r='242' g='242' b='223' />" +
                        "<color name='missionBoxShadow'         rgb='4F82B3' r='204' g='204' b='204' />" +
                        "<color name='missionFlyoverColor'      rgb='FFFFFF' r='255' g='255' b='255' />" +
                        "<color name='missionFlyoverTextShadow' rgb='4F82B3' r='025' g='040' b='066' />" +
                        "<color name='footerBackgroundColor'    rgb='F2F2DF' r='242' g='242' b='223' />" +
                        "<color name='footerBoxShadow'          rgb='CCCCCC' r='204' g='204' b='204' />" +
                        "<color name='footerColor'              rgb='FFFFFF' r='255' g='255' b='255' />" +
                        "<color name='footerTextShadow'         rgb='000000' r='000' g='000' b='000' />" +
                    "</colors>" +
                    "<icon id='icon' src='icons/light/sun-icon-H24.png' />" + 
                "</Pallette>" +
                "<Pallette id='DarkPallette'>" +
                    "<colors id='colors'>" +
                        "<color name='titleBackgroundColor'     rgb='A3D3FF' r='163' g='211' b='255' />"+
                        "<color name='titleBoxShadow'           rgb='4F82B3' r='079' g='130' b='179' />" +
                        "<color name='titleColor'               rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='titleTextShadow'          rgb='4F82B3' r='029' g='080' b='129' />" +
                        "<color name='navBorder'                rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='navBackground'            rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='listItemBackground'       rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='listItemColor'            rgb='B3863D' r='0' g='0' b='0' />" +
                        "<color name='listItemTitleColor'       rgb='B3863D' r='179' g='134' b='61' />" +
                        "<color name='missionBackground'        rgb='A3D3FF' r='163' g='211' b='255' />" +
                        "<color name='missionBoxShadow'         rgb='4F82B3' r='100' g='150' b='200' />" +
                        "<color name='missionFlyoverColor'      rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='missionFlyoverTextShadow' rgb='4F82B3' r='000' g='000' b='000' />" +
                        "<color name='footerBackgroundColor'    rgb='A3D3FF' r='163' g='211' b='255' />"+
                        "<color name='footerBoxShadow'          rgb='4F82B3' r='079' g='130' b='179' />" +
                        "<color name='footerColor'              rgb='000000' r='000' g='000' b='000' />" +
                        "<color name='footerTextShadow'         rgb='4F82B3' r='029' g='080' b='129' />" +
                    "</colors>" +
                "<icon id='icon' src='icons/dark/moon-icon-H24.png' />" + 
                "</Pallette>" +
            "</Root>";
        var xmlDoc = document.implementation.createDocument("", "", null);
        var parser = new DOMParser(); /* see www.w3schools.com/xml/xml_dom.asp */
        xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
        return xmlDoc;
    }    
}