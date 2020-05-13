<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.role.*" %>  
<%@page language="java" import="view.RoleView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
        
        DbConn dbc = new DbConn(); 
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.dbError.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allRolesAPI");
            list = RoleView.getAllRoles(dbc);   
        } 

        // PREVENT DB connection leaks:
        dbc.close(); // EVERY code path that opens a db connection, must also close it.

    } else {
        System.out.println("Session unavailable.");
        list.dbError = "Unavailable. Please register and/or logon.";
    }        
        
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>