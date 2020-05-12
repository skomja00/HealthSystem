"use strict";

var colorTheme = {};

(function () { //IIFE immediate invoked function expression
               //The IIFE provides a context where you can place private functions
               // that can be shared by insert and update. 
   /**
    *
     * colorTheme()  

     * colorTheme() will toggle between 2 theme settings using one or another of two 
     * pallettes. Each pallette will store separate colors/icons.
     * It can be executed from a menu bar icon used as a toggle.
     * The theme colors are xml and so they are customizable.  
     * A <style> element will be added to the header to implement the style properties.
     * 
     * 
     * TODO: Make the XML a settings in an external xml file or anywhere other than 
     * hard-coded in the JavaScript. 
     * 
     */
    
    /* start with this color pallette */
    var currTheme = "LightPallette";

    colorTheme.setTheme = function (palId) {

        /**
        * Depending on the current <img src=...> setting of the theme icon 
        * togglePallette() will return either "LightPallette" or "DarkPallette".
        * Clicking on the dark theme icon switches to light theme and vice versa.
        * 
        * @returns {} nothing 
        */
        
        var ti = document.getElementById("ddTheme");//"theme-icon");
        ti.onclick = function togglePallette () {
            if (currTheme === "LightPallette") {
                currTheme = "DarkPallette";
                colorTheme.setTheme("DarkPallette");
            } else {
                currTheme = "LightPallette";
                colorTheme.setTheme("LightPallette");
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
            ".title { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 9px 7px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" + 
            ".navigation { border = 2px solid " + rgbObj.light + ";" + 
            "              background-color : " + rgbObj.lightest + ";}" + 
            ".mission { box-shadow : 0px 0px 10px 10px " + rgbObj.lighter + ";" + 
            "           background-color : " + rgbObj.lightest + ";}" + 
            ".mission-flyover { color : " + rgbObj.white + ";" + 
            "                   text-shadow : 0px 0px 10px " + rgbObj.darker + ";}" + 
            ".footer { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 9px 7px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : 0px 0px 10px " + rgbObj.black + ";}" +
            ".footer a {         text-shadow : 0px 0px 10px " + rgbObj.black + ";" + 
            "                    color : " + rgbObj.white + ";}" + 
            ".footer a:visited { text-shadow : 0px 0px 10px " + rgbObj.black + ";" + 
            "                    color : " + rgbObj.white + ";}" + 
            ".home li { background-color : " + rgbObj.lightest + ";" + 
            "            color : " + rgbObj.dark + ";}" + 
            ".home .list-item-title { background-color : " + rgbObj.lightest + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" + 
            ".home a { text-shadow : 0px 0px 10px " + rgbObj.darker + ";" + 
            "          color : " + rgbObj.white + ";}" + 
            ".home a:visited { text-shadow : 0px 0px 10px " + rgbObj.darker + ";" + 
            "                  color : " + rgbObj.white + ";}" + 
            ".clickSort td { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 3px 2px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" + 
            ".clickSort th { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 3px 2px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" +
            "#insertArea td { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 3px 2px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" + 
            "#insertArea th { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 3px 2px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" +
            ".slideUsersClass { background-color: " + rgbObj.lightest + ";" + 
            "                   box-shadow: 0px 0px 9px 7px " + rgbObj.lighter + ";" +  
            "                   color: " + rgbObj.white + ";" + 
            "                   text-shadow: 0px 0px 10px " + rgbObj.black + ";}" + 
            ".slidePatientsClass { background-color: " + rgbObj.lightest + ";" + 
            "                   box-shadow: 0px 0px 9px 7px " + rgbObj.lighter + ";" +  
            "                   color: " + rgbObj.white + ";" + 
            "                   text-shadow: 0px 0px 10px " + rgbObj.black + ";}" + 
            ".slideImageClass { box-shadow: 0px 0px 9px 7px " + rgbObj.lighter + ";}" +  
            ".slideButton  { background-color: " + rgbObj.lightest + ";" + 
            "                   box-shadow: 0px 0px 9px 7px " + rgbObj.lighter + ";" +  
            "                   color: " + rgbObj.white + ";" + 
            "                   text-shadow: 0px 0px 10px " + rgbObj.black + ";}" +
            ".dropContent  { background-color: " + rgbObj.lightest + ";" + 
            "                border-color: " + rgbObj.white + ";" + 
            "                color: " + rgbObj.white + ";}" +
            ".dropHeader   { border-color: " + rgbObj.white + ";}" + 
            ".modalStyle { background-color : " + rgbObj.lightest + ";" + 
            "         box-shadow : 0px 0px 9px 7px " + rgbObj.lighter + ";" + 
            "         color : " + rgbObj.white + ";" + 
            "         text-shadow : " + "0px 0px 10px " + rgbObj.black + ";}" +
            ".modalStyle .x {color: "+ rgbObj.white + ";" + 
            "                box-shadow: 0px 0px 10px " + rgbObj.lighter + ";}" ;

        /* style the icon */
        document.getElementById("ddTheme").innerHTML = rgbObj.icon;

        /*
         * getPallette() retuns a rgbObj of the theme attributes. Color elements have 
         * string "RGBA(r,g,b)" values, icon elements have a image src= value
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
                        rgbObj[colors[j].getAttribute("name")] = rgba;
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
            /* samples below from color.adobe.com that inspired this theme idea.
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
                              "<color name='white'    rgb='ZZZZZZ' r='000' g='000' b='000' />" +
                              "<color name='lightest' rgb='ZZZZZZ' r='242' g='242' b='223' />" +
                              "<color name='lighter'  rgb='ZZZZZZ' r='204' g='204' b='204' />" +
                              "<color name='light'    rgb='ZZZZZZ' r='174' g='230' b='255' />" +
                              "<color name='dark'     rgb='ZZZZZZ' r='167' g='221' b='242' />" +
                              "<color name='darker'   rgb='ZZZZZZ' r='025' g='040' b='066' />" +
                              "<color name='darkest'  rgb='ZZZZZZ' r='025' g='040' b='066' />" +
                              "<color name='black'    rgb='ZZZZZZ' r='000' g='000' b='000' />" +
                        "</colors>" +
                        "<icon id='icon' src='icons/light/sun-icon-H24.png' />" + 
                    "</Pallette>" +
                    "<Pallette id='DarkPallette'>" +
                        "<colors id='colors'>" +
                            "<color name='white'    rgb='ZZZZZZ' r='255' g='255' b='255' />" +
                            "<color name='lightest' rgb='ZZZZZZ' r='163' g='211' b='255' />"+
                            "<color name='lighter'  rgb='ZZZZZZ' r='100' g='150' b='200' />" +
                            "<color name='light'    rgb='ZZZZZZ' r='100' g='150' b='200' />" +
                            "<color name='dark'     rgb='ZZZZZZ' r='079' g='130' b='179' />" +
                            "<color name='darker'   rgb='ZZZZZZ' r='079' g='130' b='179' />" +
                            "<color name='darkest'  rgb='ZZZZZZ' r='029' g='080' b='129' />" +
                            "<color name='black'    rgb='ZZZZZZ' r='000' g='000' b='000' />" +
                        "</colors>" +
                    "<icon id='icon' src='icons/dark/moon-icon-H24.png' />" + 
                    "</Pallette>" +
                "</Root>";
            var xmlDoc = document.implementation.createDocument("", "", null);
            var parser = new DOMParser(); /* see www.w3schools.com/xml/xml_dom.asp */
            xmlDoc = parser.parseFromString(colorPalletteStr,"text/xml");
            return xmlDoc;
        }    
    };
} ());  // This closes the IIFE & immediately invokes it. 