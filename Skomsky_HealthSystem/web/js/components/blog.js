function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    
    <style>
        div {
            text-align: left;
            font-size: 18px;
        }
        a {
            color: #CCCCCC;
        }
        h2 {
          margin-left:-1em;
        }
    </style>
    
    <div style="margin-left:2em">
        <a id='#/toc'>Table Of Contents</a>
        <ul>
            <li><a href='#/hw1'>HW 1 Home Page</a>
            <li><a href='#/hw2'>HW 2 DB &amp; JavaScript Routing</a>
            <li><a href='#/hw3'>HW 3 Display Data</a>
            <li><a href='#/hw4'>HW 4 Slide Show or Tutorial Proposal</a>
            <li><a href='#/hw5'>HW 5 Web APIs</a>
            <li><a href='#/hw6'>HW 6 Log On</a>
            <li><a href='#/hw7'>HW 7 Delete</a>
            <li><a href='#/hw8'>HW 8 Insert or Tutorial</a>
            <li><a href='#/hw9'>HW 9 Update</a>
        <a id='#hw1'></a>
        <h2>HW 1 Home Page</h2>
        <p>
            My web development experience consists of none at all. My background 
            is predominantly ETL "frameworks" of many types most often running
            under-the-hood as a Windows Service. Front end web development will 
            fill this gap in my technical skills. 
        </p>
        <p>
            In this homework I learned many things, and found java script to 
            be the most familiar. The closest to it in my scripting
            experience is Ruby, and I find they both to provide 
            very good implementations of both object handling and iterating. 
            For me the most difficult thing is the long list of CSS properties,
            and their behaviors. W3Schools.com helped make sense of the HTML/CSS.
        </p>
        <a id='#hw2'></a>
        <h2>HW 2 DB &amp; JavaScript Routing</h2>
        <p>
            My database experience consists of Microsoft SQL Server ETL processes 
            with experience analyzing data requirements, establishing continuous pipelines, 
            data warehousing, query performance tuning and system scalability. 
            With my SQL Server background, I didn't have much difficulty
            with MySQL. They both adhere well to ANSI Standard SQL.   
            Click <a href="mysql-dbase-build-basic-tables.sql">here</a> to see my database work.
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
            table. Not sure how to resolve this. I will have to give it more thought.
        </p>
        <a id='#hw3'></a>
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
        <a id='#hw4'></a>
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

        <a id='#hw5'></a>
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

        <a id='#hw6'></a>
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

        <a id='#hw7'></a>
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

        <a id='#hw8'></a>
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

        <a id='#hw9'></a>
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