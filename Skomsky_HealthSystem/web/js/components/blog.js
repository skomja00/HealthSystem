
"use strict";

function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    <div class='blog'>
        <h2>1 Home Page</h2>
        <p>
            This webpage is built using foundation HTML, CSS, Javascript, AJAX, WebAPIs, JSP, and Java.
            It was built from the ground up (i.e. no BootStrap, JQuery etc). 
            <a target="_blank" href="https://www.w3schools.com/">W3schools.com </a>
            and <a target="_blank" href="https://developer.mozilla.org/en-US/">MDN web docs</a> 
            are a couple great resources for Web Development used to help build this sample web app.
        </p>
        <h2>2 DB &amp; JavaScript Routing</h2>
        <p>
            My database experience consists of Microsoft SQL Server, SQLite, and other
            various proprietary database systems. Since MySQL complies
            with the ANSI/ISO SQL Standards it is similar to SQL Server, and I 
            found it very easy to use.  
            Click <a target="_blank" href="mysql-dbase-build.sql">here</a> to see 
            my database scripts.
        </p>
        <p>
            I found setting up a Single Page Application routing straight forward.
            The hash table is central to the process with keys of anchor HREFs 
            and values of java script components. The anchors tell the router fn. which 
            java scripts to run. This table as well as 
            the target for the content are used to create a java object. A default
            location is also supplied. You also need a target id on a &lt;div&gt; container 
            to give the router a DOM element to insert the content supplied from 
            the java script components. Anchors on the webpage update the 
            window.location triggering the router fn. and putting the whole thing
            into action. 
        </p>
        <h2>3 Display Data</h2>
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
        <h2>4 Slide Show</h2>
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
        <h2>5 Web APIs</h2>
        <p>
            The course is moving from the client to the server side of web page development. 
            This creates a better understanding of some of the technologies in web
            dev. Writing server side code requires Web APIs invoked by client side code (JavaScript in an HTML page).
            My server side code will accomodate DateTime (i.e. date AND time) fields. In my experience it is not uncommon
            for both Date and Time to be stored in the dbase within a single DateTime
            field so the DateTime datatype is supported by my
            API. The goal is to input a familiar format such as 
            "ccyy-mm-dd hh:mm am/pm", and have the API do any validation and/or conversion. A regex like this 
            <br><br><code>^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{2} ([AaPp][Mm])
            </code><br><br> 
            ensures a value matches this pattern generally
            but doesn't validate something like "2020-01-32 2:35 pm". Notice <u>January 32nd!</u>
            So an additional verification is to 'try' both parsing and formatting
            these as a Java date object. In so doing Java further scrutinizes the object and will raise
            an exception for values outside normal boundaries (ie. January 32nd).
            The Java exception messages are very helpful and desciptive. Once a value 
            passes all these requirements it is safe to assume it's a valid DateTime data type.
            Following are some example dates and the Java exception (or none):
            <table>
            <thead>
            <tr>
            <td>input</td><td>Exception Message</td>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>2020-01-32 2:35 pm</td><td>Text '2020-01-32 2:35 PM' could not be parsed: Invalid value for DayOfMonth (valid values 1 - 28/31): 32</td>
            </tr>
            <tr>
            <td>2020-01-31 13:35 pm</td><td>Text '2020-01-31 13:35 PM' could not be parsed: Invalid value for ClockHourOfAmPm (valid values 1 - 12): 13</td>
            </tr>
            <tr>
            <td>2020-02-29 11:00 am</td><td>Does NOT raise an exception as we would expect.</td>
            </tr>
            <tr>
            <td>2019-02-29 11:00 am</td><td>Generates a date and time of 2019-2-28 11:00:00 without throwing an exception.</td>
            </tr>
            </tbody>
            </table>
        </p>
        <p>
            Server side development includes a number of new practices. Below are some tips:
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
            <li>
                My WebAPI error documentation can be found <a target="_blank" href="list_of_errors.docx">here</a>.
            </li>
        </ul>

        <h2>6 Log On</h2>
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
        <h2>LA 7x React I</h2>
        <p>
            React Data Display is an intro to using React components to generate 
            HTML content. It is also an intro to ES6 syntax and functions. In general
            the concept of React components is fairly straighforward, but I found 
            the ES6 concepts very unfamiliar compared to all Javascript we've been 
            writing up to now. Also I am finding the new ES6 syntax difficult to grasp.
        </p>
        <p>
            I noticed once React updates a container on the page it "takes control"
             monitoromg it closely for the purpose of the React diffing algorithm. 
            As as result you CAN go back and forth between react components in that container 
            with no errors. But switching between plain old HTML via routeFW and react 
            component raises warnings and then throws exceptions.
        </p>
        <h2>7A Insert</h2>
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
        <h2>8 Update</h2>
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

        <h2>9 Delete</h2>
        <p>
            In this homework I added delete functionality to my web page, and this 
            completes the four basic requirements of persisting data. Delete refers to the 
            last letter in the CRUD acronym (create, read, update, delete) This is again 
            using WebAPIs and MVC. My productivity coding WebAPIs, JSP/Java, 
            troubleshooting the server logs, etc continues to improve. 
            One thing I struggled with was informing the user of a successful delete. 
            After a successful detete, I cal the *.list function
            to refresh the list, but it uses AJAX and is asynchronous. The user sees
            a 'delete successful' alart but the deleted 
            data is still visible in the background. I considered added a callback to the 
            table builder to raise the alread after building the new table, Instead 
            I added "Click OK to refresh list" instead, and 
            alert to eliminate any possible confusion. 
        </p>
        <ul>
            <li>
                To run this code, on any list presented on the web page click the
                 delete icon next to the record you want to delete (e.g. List Web Users). 
            </li>
        </ul>
    </div>`;
    document.getElementById(id).innerHTML = content;
}