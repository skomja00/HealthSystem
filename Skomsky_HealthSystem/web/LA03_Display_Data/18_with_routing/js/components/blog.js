function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    
    <style>
      h2 {
        margin-left:-1em;
      }
    </style>
    
    <div style="margin-left:2em">
        <h2>HW 1 Home Page</h2>
        <p>
            My web development experience consists of ...
        </p>
        <p>
            In this homework I learned ...
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <h2>HW 2 DB &amp; JavaScript Routing</h2>
        <p>
            My database experience consists of ...
        </p>
        <p>
            In the database part of the homework I learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
            Click <a href="myDb.doc">here</a> to see my database work.
        </p>
        <p>
            In the website part of the homework I learned how to reuse portions of the User Interface 
            with a home grown "Routing Framework". I also learned ...
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <h2>HW 3 Display Data</h2>
        <p>
            In this homework I learned that JSON is ... and AJAX is ... I also learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <p>
            To see the data displayed, click the menu items under the search icon 
            in the navigation bar. Later in the semester these links will show live data 
            from my database, but for now, they just show data from a hard coded JSON file.
        </p>

        <h2>HW 4 Slide Show or Tutorial Proposal</h2>
        <p>
            <em>[If selecting the Slide Show...]</em> 
        </p>
        <p style="margin-left:2em">
            In this homework I learned another way to display my image data ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
            To see my slide show, click the last entry under the search icon.
        </p>
        <p>
            <em>[If selecting the Tutorial Proposal...]</em>
        </p>
        <ul>
            <li>
                Click <a target="_blank" href="tutorial/proposal.pdf">here</a> for my Tutorial Proposal, 
                a pdf that describes the provider style (reusable) JS code I propose to implement. The pdf
                provides links to the web pages that inspired my idea.
            </li>
            <li>
                Click <a target="_blank" href="tutorial/poc.pdf">here</a> to see my Proof of Concept
                code, which gives an idea of what I'm trying to accomplish but has not been fully implemented,
                not converted to consumer/provider style yet.
            </li>
        </ul>

        <h2>HW 5 Web APIs</h2>
        <p>
            In this homework I learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <ul>
            <li>
                To invoke my user list Web API, click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a>.
            </li>
            <li>
                To invoke my [other] list Web API, click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a>.
            </li>
        </ul>

        <h2>HW 6 Log On</h2>
        <p>
            In this homework I learned ...
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <ul>
            <li>
                To see how my Log On code works, click on these items under the 
                account icon: "Log On", "Profile", and "Log Off". You'll only see 
                the profile information if you are logged on.
            </li>
        </ul>

            <h2>HW 7 Delete</h2>
        <p>
            In this homework I learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <ul>
            <li>
                To run this code, click to list the data (under the search icon from the nav bar) 
                then click the delete icon next to the record you want to delete.  
            </li>
        </ul>

        <h2>HW 8 Insert or Tutorial</h2>

        <em>[If selecting Insert...]</em>

        <p style="margin-left:2em">
            In the insert homework  I learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <ul>
            <li>
                To see how insert user works, click on the plus sign at the top of the 
                user listing page -OR- click on the "register" item under the account icon. 
            </li>
            <li>
                To see how insert [other] works, click on the plus sign at the top of the 
                [other] data display page.
            </li>
        </ul>
        <em>[If selecting the Tutorial...]</em> 
        <p style="margin-left:2em">
            Click <a target="_blank" href="tutorial/index.html">here</a> for my tutorial.
        </p>

        <h2>HW 9 Update</h2>
        <p>
            In this homework I learned ... 
            The parts that I found easy were ... 
            The parts that I found hard or confusing were ... 
        </p>
        <ul>
            <li>
                To run this code, click to list the data (under the search icon from the nav bar)
                then click the update icon next to the row you want to update. 
            </li>
        </ul>
    </div>
    `;
    document.getElementById(id).innerHTML = content;
}