
"use strict";

function home(targetId) {
    var content = 
    `<div class='home'>
        <ul>
            <li>
                <span class='list-item-title'>Services</span>
                <img class='list-item-image' src='pics/med-svcs.jpg' alt=''/>
            </li>
            <li>
                <span class='list-item-title'>Business Office</span>
                <img class='list-item-image' src='pics/bus-offc.jpg' alt=''/>
            </li>
            <li>
                <span class='list-item-title'>Documents</span>
                <img class='list-item-image' src='pics/statements.jpg' alt=''/>
            </li>
        </ul>
        <div class='mission' id='mission'>
            <span class='mission-flyover' id='mission-flyover'>Our Mission</span>
            <p>
                <img class='mission-icon' src='icons/dark/icon-mission-H300.png' />
                Health Systems is a sample of my Front End Web Development work. 
                It is a Single Page app using the Model-View-Controller design. 
                It has create, read, update and delete (CRUD) functionality, and 
                persists data in a MySQL database. It is built from the ground up (i.e. no BootStrap etc) 
                using only foundation web technologies HTML, CSS, JavaScript, JSP, AJAX and Java. 
                All security and authorization is enforced on the server side (in the Web APIs). 
                The (logged on) user is verified by checking the JSP Implicit Session Object. 
                The JSPs retrieve URL parameters using a getParameter on the Request Session Object. 
                All SQL uses PreparedStatements for protection against SQL injection attacks, 
                and user input is scrubbed to prevent JavaScript injection. 
                Email <a href='mailto:james.skomsky@gmail.com'>james.skomsky@gmail.com</a>
                to find out more.
            </p>
        </div>
    </div>`;
    document.getElementById(targetId).innerHTML = content;
}
