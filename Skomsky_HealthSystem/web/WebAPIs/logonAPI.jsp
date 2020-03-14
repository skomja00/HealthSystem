<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData sd = new StringData();
    StringDataList list = new StringDataList();
    /*
     * Get logon parms from url
     * If either not available "cannot search for user..."
     * Get a connection to the database
     * If dbconn error return the message returned from the dbase
     * Call the model DbMods.logonFind method 
     * If logon result is not null add it to StringDatList
    */
    String email = request.getParameter("email");
    String pw = request.getParameter("password");
    if (email == null || pw == null) {
        list.dbError = "Cannot search for user - 'email and password' most be supplied";
    } else {
        DbConn dbc = new DbConn();
        // returns "" if connection is good, else db error msg.
        if (list.dbError.length() == 0) { // if got good DB connection,
            System.out.println("*** Ready to logonAPI: email=" + email + " password=" + pw);
            //email=sallyk password=p
            sd = DbMods.logonFind(email,pw,dbc);
            if (sd != null) {
                list.add(sd);
                session.setAttribute("webUser", sd);
                System.out.println("session object contains: " + session.getAttribute("webUser"));                                
            } else {
                list.dbError = "Unsuccessful logon.";
            }
        } else 
        {
            list.dbError = "Unsuccessful logon. Database connection error.";
        }
        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    //convert POJO to JSON. Print into response object as JSON string
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>
