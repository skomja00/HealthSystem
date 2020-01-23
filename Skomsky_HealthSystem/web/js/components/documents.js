/**
 * Document Management content 
 */
function documents(targetId) {
    var content =   
        "<p>" +
        "   Document Management Home" +
        "</p><p>" +
        "   Create, print, file and export documents."
        "</p>";
    document.getElementById(targetId).innerHTML = content;
}