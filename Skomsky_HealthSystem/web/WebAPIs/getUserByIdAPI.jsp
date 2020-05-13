<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    //StringDataList list = new StringDataList();
    StringData user = new StringData();

    StringData loggedOnUser = (StringData) session.getAttribute("webUser");

    if (loggedOnUser != null) { // means user is logged in

        String searchId = request.getParameter("URLid");
        if (searchId == null) {
            user.errorMsg = "Cannot search for user - 'URLid' most be supplied";
        } else {

            DbConn dbc = new DbConn();
            user.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

            if (user.errorMsg.length() == 0) { // if got good DB connection,

                System.out.println("*** Ready to call allUsersAPI");
                user = DbMods.findById(dbc, searchId);  
            }

            dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

        }
        
    } else {
        
        user.errorMsg = "Unavailable. Please register and/or logon.";
    }            
        
    //convert POJO to JSON. Print into response object as JSON string
    Gson gson = new Gson();
    out.print(gson.toJson(user).trim());
%>