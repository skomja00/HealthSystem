function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    <div class='blog'>
        <h2>HW 1 Home Page</h2>
        <p>
            My background is Systems Integration and Interfaces using various ETL "frameworks" 
            predominantly things running under-the-hood for instance as a Windows Service etc. 
            Front end web development will leverage this experience focusing
            on the flow of data in a client/server platform for example a WebAPI
            interface. 
        </p>
        <p>
            In this homework I learned many things, and found java script to 
            be the most familiar. The closest to it in my scripting
            experience is Ruby, and I find they both to provide 
            very good implementations of both object handling and iterating. 
            For me the most difficult thing is the long list of CSS properties,
            and their behaviors. W3Schools.com helped make sense of the HTML/CSS.
        </p>
        <h2>HW 2 DB &amp; JavaScript Routing</h2>
        <p>
            My database experience consists of Microsoft SQL Server ETL processes 
            with experience analyzing data requirements, establishing continuous pipelines, 
            data warehousing, query performance tuning and system scalability. 
            With my SQL Server background, I didn't have much difficulty
            with MySQL. They both adhere well to ANSI Standard SQL.   
            Click <a target="_blank" href="mysql-dbase-build.sql">here</a> to see my database work.
        </p>
        <p>
            I found setting up a Single Page Application routing straight forward.
            The hash table is centeral to the process with keys of anchor HREFs 
            and values of java script components. The anchors tell the router fn. which 
            java scripts to run. This table as well as 
            the target for the content are used to create a java object. A default
            location is also supplied. You also need a target id on a &lt;div&gt; container 
            to give the router a DOM element to insert the content supplied from 
            the java script components. Anchors on the webpage update the 
            window.location triggering the router fn. and putting the whole thing
            into action. 
        </p>
        <p>
            I did notice something I need to look into further when setting up 
            a Table Of Contents on this blog. Clicking on a TOC item to "jump"
            within the blog page triggers the router, and fails since 
            the individual parts of the blog page do not exist in the route 
            table. Not sure how to resolve this. 
        </p>
        <h2>HW 3 Display Data</h2>
        <p>
            This was a time-consuming effort on my part. Unfortunately the
            MakeFilteredTable is NOT working due to "problems" with my JSON I think. 
            I didn't make changes to the supplied code and it is failing on line 44
            in MakeFilteredTable when trying to do "var propValUpper = propVal.toUpperCase();". 
            Not sure if this is due to my 
            manually creating the JSON? I wasn't able to combine the sortable/filtered 
            functions in time to submit. Unfortuately I ran out of time on other parts
            of the HW, and was able to review the code but didn't have a chance to 
            attempt combining. I may be able to revisit when the live database
            connection is added, and I get back to working on it again. 
            I am interest to see what effect a live JSON will have compared 
            to the JSON I manually created. 
        </p>
        <p> 
            I was able to clean up the drop down menus. Before text was wrapping, and 
            also I re-arrange the positioning so the dropdowns are aligned more to my
            liking sort of left-justified with the dropdown header. 
        </p>
        <h2>HW 4 Slide Show</h2>
        <p>
            In this homework I used public and private properties of DOM elements. I created 
            objects and appended them together to insert into the content element. 
            I coded MakeSlides using parameter js objects so I could reuse it to insert
            two slides show into the content thereby re-using MakeSlides. Object params also eliminates the 
            need for a specific order of passing in parameters since when they are passed 
            the function just selects using the named index. Also it's good practive to default values  
            using the || boolean operator. In an assignment though the values
            are not boolean instead js sees values such as 0, "", null, and undefined as
            "falsey" and will then check the 2nd operator for a "truthey" (default) value.
        </p>
        <h2>HW 5 Web APIs</h2>
        <p>
            The course is moving from the client to the server side of web page development. 
            This creates a better understanding of some of the technologies in web
            dev. In my early learning the terminology apache vs apache tomcat is
            somewhat confusing possibly because both technologies are part of the same 
            Apache Software Foundation and the 'namesake' (i.e. apache) can appear
            in reference to completely distinct types of server applications. For
            the record, <u>'apache'</u> software responds to HTTP requests for HTML, CSS, and JavaScript content. 
            <u>'tomcat'</u>(sometimes referred to as Apache Tomcat) on the other hand is intended to execute Java code.
        </p>
        <p>
            Server side also devel include a number of new practices. Below are some tips:
            <ul>
                <li>
                    Publish JSP apps from the build&bsol;webfolder. 
                </li>
                <li>
                    Copy sample code jsp files, source packages, and if necessary .jar files. 
                </li>
                <li>
                    Tunnel into the Temple network using PuTTY to connect to server hosted MySQL databases.
                </li>
            </ul> 
        </p>
        <ul>
            <li>
                To invoke my user list Web API, click <a target="_blank" href="WebAPIs/listUsersAPI.jsp">here</a>.
            </li>
            <li>
                To invoke my listPatientVisitsAPI, click <a target="_blank" href="WebAPIs/listPatientVisitsAPI.jsp">here</a>.
            </li>
        </ul>

        <h2>HW 6 Log On</h2>
        <p>
            In this homework I learned how to read a web user from the dbase, and 
            add their data to a session object which is only available to the JSP.
            The JSP runs on the Apache Tomcat server behind the firewall so the session
            object is secure. The parts that I found hard or confusing were how all 
            the server side pieces fit together, and the flow of data also server
            side. I did some reading on JSP and learned the web container (Tomcat
            on our system) creates HTTPServletRequest and HTTPServletResponse objects
            passes them to the Controller. So when the API does an out.print it 
            is printing to the response object to pass back to the Container. I was
            mistakenly thinking the gson to json was printing a JSON object
            into the response, but in fact it is putting a 'json string' into the 
            response. This is why the object returned from the AJAX call
            has to JSON.parse(httpReq.responseText) because it is actually a 
            'json string' coming back from the API.
        </p>
        <ul>
            <li>
                To see how my Log On code works, click on these items under the 
                account icon: "Log On", "Profile", and "Log Off". You'll only see 
                the profile information if you are logged on.
            </li>
        </ul>

        <h2>HW 7A Insert</h2>

        <p>
            The insert homework is an additional use of WebAPIs. The insert process  
            will repeat collecting data from the user, validating the data and either
            returning errors for correction or returning a success message when complete. 
            Frist the UI presents the a table to the user to collect data, and 
            build a JSON Object which is appended to the URL when calling the API. 
            Second validation is done on the user input. 
            The validation methods include an option (true/false) to specify whether 
            field is required to make sure all required fields are entered. Any 
            formatting errors or missing data are returned and inserted into the UI
            to let the user know a field was invalid or missing. Once all validation 
            is complete, the API will execute the insert, and return a success message.  
        </p>
        <p>
            <b>Navigation</b>
        </p>
        <ul>
            <li>
                To insert a Web User do this: 
                    <ul>
                        <li>
                            <img src='icons/dark/account_dd_icon_H24.png'/> Account menu ... "Register" option.
                        </li>
                    </ul>
            </li>
            <li>
                Another way to insert a Web User is: 
                    <ul>
                        <li>
                            <img src='icons/dark/menu_dd_icon_H24.png'/> Menu icon ... "Web Users" option. 
                        </li>
                        <li>
                            click the <img src='icons/dark/insert_H24.png'/> "Plus" icon next to the "Web Users" caption.   
                        </li>
                    </ul>
            </li>
            <li>
                To insert Patient Visit do this:
                    <ul>
                        <li>
                            <img src='icons/dark/menu_dd_icon_H24.png'/> Menu icon ... "Patient Visits" option. 
                        </li>
                        <li>
                            click the <img src='icons/dark/insert_H24.png'/> "Plus" icon next to the "Patient Visits" caption.   
                        </li>
                    </ul>
            </li>
        </ul>
        <h2>HW 8 Update</h2>
        <p>
            In this homework I learned to implement a WebAPI to do a database update.
            This was a lot of coding, but building on our work so far with WebAPIs 
            for the database. It is starting to sink in. 
        </p>
        <ul>
            <li>
                To run this code, click to "List Web Users" or "List Patient Visits"
                to list the data (under the Menu" icon from the nav bar)
                then click the update icon (small pencil icon) on the row you want to update. 
            </li>
        </ul>

        <h2>HW 9 Delete</h2>
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
    </div><br><br><br><br><br>`;
    document.getElementById(id).innerHTML = content;
}