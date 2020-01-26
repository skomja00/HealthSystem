/**
 * Logout content 
 */
function logout(targetId) {

    var content =   
        "<p>"+
        "   You're logged out. Thanks for using my site! " +
        "</p>";
    document.getElementById(targetId).innerHTML = content;
}