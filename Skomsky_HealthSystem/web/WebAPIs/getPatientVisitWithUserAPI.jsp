<%@page import="view.UserView"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.patientVisit.*" %> 
<%@page language="java" import="view.PatientVisitView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    PatientVisitWithUser patientVisitWithUser = new PatientVisitWithUser();

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
        
        String searchId = request.getParameter("id");
        if (searchId == null) {
            patientVisitWithUser.webUserSD.errorMsg = "Cannot search for user - 'id' most be supplied";
        } else {

            DbConn dbc = new DbConn();
            patientVisitWithUser.webUserSD.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

            if (patientVisitWithUser.webUserSD.errorMsg.length() == 0) { // if got good DB connection,

                System.out.println("*** Ready to call allUsersAPI");
                patientVisitWithUser.webUserSD = DbMods.findById(dbc, searchId); 

                patientVisitWithUser.webUserSDL = UserView.getAllUsers(dbc);
            }

            dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
        }
        
    } else {
        System.out.println("Session unavailable.");
        patientVisitWithUser.webUserSDL.dbError = "Unavailable. Please register and/or logon.";
    }
        
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(patientVisitWithUser).trim());
%>