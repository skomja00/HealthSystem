<%@page import="view.RoleView"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    WebUserWithRoles webUserWithRoles = new WebUserWithRoles();

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
        
        String searchId = request.getParameter("id");
        
        if (searchId == null) {
            webUserWithRoles.webUser.errorMsg = "Cannot search for user - 'id' most be supplied";
        } else {

            DbConn dbc = new DbConn();
            webUserWithRoles.webUser.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

            if (webUserWithRoles.webUser.errorMsg.length() == 0) { // if got good DB connection,

                System.out.println("*** Ready to call allUsersAPI");
                webUserWithRoles.webUser = DbMods.findById(dbc, searchId); 

                webUserWithRoles.roleInfo = RoleView.getAllRoles(dbc);
            }


            dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
        }
        
    } else {
        System.out.println("Session unavailable.");
        webUserWithRoles.roleInfo.dbError = "Unavailable. Please register and/or logon.";
    }    
        
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(webUserWithRoles).trim());
%>