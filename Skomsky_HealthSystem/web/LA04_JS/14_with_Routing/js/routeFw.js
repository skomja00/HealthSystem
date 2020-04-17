function routeFw(params) {

    var fw = {}; // creating and adorning this object to be passed back to the HTML page.

    var contentId = params.contentId || "view";

    if (!params.routeArray || params.routeArray[0]) {
        alert("parameter object must specify array 'routeArray' with at least one element");
        return;
    }

    // Declare a (private) array to store our routes. This array is an associative
    // array with key [index] the URL and value the associated function to run.
    var routes = params.routeArray;

    // private function that will be called whenever a link is clicked (or href changed)
    function router() {

        var path = location.hash;
        console.log('path is ' + path); // prints something like #/home

        // Use the url like an index (JS associative array notation) to find 
        // the desired content and place it in the content area.
        // document.getElementById("view").innerHTML = routes[url];
        if (!routes[path]) {
            document.getElementById(contentId).innerHTML = "Error: link '" + path +
                    "' was never added to the routing table.";
        } else {
            // invoke the function that's specified by the ajaxFillId(routes[url], "view");
            // pass the correct route object to that function (either staticContent or jsonContent)
            routes[path](contentId); // invoke function routes[path], a JS funtion/component
        }
    }

    fw.printRoutes = function () {
        console.log("routes will be printed on the next line ");
        console.log(routes);
    };

    // Listen on hash change (whenever a link is clicked or href programatically changed)
    // then invoke function router.
    window.addEventListener('hashchange', router);


    // put a dummy value here to make sure the URL (hash) changes when we refresh the page.
    window.location.hash = "x";

    // content for when page is first rendered.
    window.location.hash = "#/";

    return fw;
}