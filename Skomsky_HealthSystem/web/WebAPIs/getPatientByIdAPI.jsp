<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.patientVisit.*" %> 
<%@page language="java" import="view.PatientVisitView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData patientVisit = new StringData();

    String searchId = request.getParameter("URLid");
    if (searchId == null) {
        patientVisit.errorMsg = "Cannot search for user - 'URLid' most be supplied";
    } else {

        model.webUser.StringData loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");

        if (loggedOnUser != null) { // means user is logged in

            DbConn dbc = new DbConn();
            patientVisit.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

            if (patientVisit.errorMsg.length() == 0) { // if got good DB connection,

                System.out.println("*** Ready to call allUsersAPI");
                patientVisit = DbMods.findById(dbc, searchId);  
            }

            dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
        
        } else {

            patientVisit.errorMsg = "Unavailable. Please register and/or logon.";
        }
            
    }
    //convert POJO to JSON. Print into response object as JSON string
    Gson gson = new Gson();
    out.print(gson.toJson(patientVisit).trim());
%>