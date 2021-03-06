var users = {};

users.list = function (targetId) {

    // clear out whatever may be currently in the content area
    var contentDOM = document.getElementById(targetId);
    contentDOM.innerHTML = "";

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: "webAPIs/listUsersAPI.jsp",
        successFn: success,
        errorId: targetId
    });

    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var div = document.createElement("div");
        div.style.textAlign = "center";
        contentDOM.appendChild(div);
        div.innerHTML = `
            <h2>Web User List</h2>
            Search Filter:
        `;

        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        div.appendChild(searchBox);

        var tableDiv = document.createElement("div");
        contentDOM.appendChild(tableDiv);

        // tweak obj.webUserList to include only the properties you want - combine, delete, etc. 
        var userList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            userList[i] = {}; // add new empty object to array
            userList[i].userCredentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                    obj.webUserList[i].userPassword;
            userList[i].image = obj.webUserList[i].image;
            userList[i].birthday = obj.webUserList[i].birthday;
            userList[i].membershipFee = obj.webUserList[i].membershipFee;
            userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                    obj.webUserList[i].userRoleType;
            userList[i].userId = obj.webUserList[i].webUserId;

            // Remove this once you are done debugging...
            userList[i].errorMsg = obj.webUserList[i].errorMsg;
        }

        // add click sortable HTML table to the content area

        // ********************** function tableBuilder.build ***********************************
        // params.list: an array of objects that are to be built into an HTML table.
        // params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
        //         (this is not the id string but actual reference like you get from method getElementById()
        // params.style: will be added as className to DOM element target,
        // params.orderPropName (string): name of property (of objects in list) for iniial sort
        // params.reverse (boolean): if true, initial sort will be high to low (else low to high). 
        // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

        tableBuilder.build({
            list: userList,
            target: tableDiv,
            style: "data",
            orderPropName: "userEmail",
            searchKeyElem: searchBox,
            reverse: false,
            imgWidth: "50px"
        });
    } // end of function success

}; // end of function users.list


// Inject the UI that allows the user to type in an id and click submit.
users.findUI = function (targetId) {

    console.log("users.findUI was called");

    var contentDOM = document.getElementById(targetId);
    var content = `
        <div class='logon'>
            <br/>
            Enter Id <input type="text" id="findId"/>
            &nbsp;
            <input type="button" value="Submit" onclick="users.findById('findId','msgArea')"/>
            <br/> <br/>
            <div id="msgArea"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
};

// This public function of global object will be called when the user clicks the button created just above.
// This function will 
users.findById = function (idOfInput, targetId) {

    console.log("users.findBtUd was called");

    // clear out any previous values in the target area
    var targetDOM = document.getElementById(targetId);
    targetDOM.innerHTML = "";
    
    var desiredUserId = escape(document.getElementById(idOfInput).value);

    // the JS escape function cleans input so it can be used as a URL paramenter
    var myUrl = "webAPIs/getUserByIdAPI.jsp?URLid=" + desiredUserId;
    console.log("users.findById ready to invoke web API with this url: " + myUrl);

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });


    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "users.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("users.findById (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);

        if (obj.dbError.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        } else if (obj.webUserList.length === 0 ) {
            targetDOM.innerHTML = "No Web User with id "+desiredUserId+" was found in the Database."
        } else {
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " +  obj.webUserList[0].userRoleId + " " +  obj.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;  
        }

    } // end of function success
};  // users.findUI


/* Example of URL invoking the Find Web API and it's response...
 * // http://localhost:8080/3308_05a_find_sample/webAPIs/getUserByIdAPI.jsp?URLid=4
 
 {
 "dbError": "",
 "webUserList": [
 {
 "webUserId": "4",
 "userEmail": "donald@whiteHouse.gov",
 "userPassword": "whoCares",
 "image": "https://petapixel.com/assets/uploads/2017/01/Donald_Trump_official_portraitt.jpg",
 "birthday": "02/03/1950",
 "membershipFee": "",
 "userRoleId": "2",
 "userRoleType": "Edit",
 "errorMsg": ""
 }
 ]
 }
 */