/**
 * Business Office content 
 */
function busofc(targetId) {
    var content =   
        "<p>" +
        "   Business Office Home" +
        "</p>" +
        "<p>" + 
        "   Manage accounts, make health plan adjustments, and post remittances."
        "</p>";
    document.getElementById(targetId).innerHTML = content;
}