/**
 * Logout content 
 */
function logout(targetId) {

    var content =   
        "<p>"+
        "   You're logged out. Tell us about your experience and ask questions or feature requests on the blog. Thanks for using my site! " +
        "</p>";
    document.getElementById(targetId).innerHTML = content;
}