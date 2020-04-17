function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <p>
        This version uses routing. So we moved the JS code from the HTML page and placed 
        it into a component (in js/components/slideshows.js). 
        This component creates two slideshows and injects them into the content area. 
      </p>
      <p>
        Click on the "SlideShows" link under the search icon in the nav bar to see how this code runs. 
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}