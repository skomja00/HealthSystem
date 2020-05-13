<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.patientVisit.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates StringData Object with all fields "" (empty string, no nulls)
    StringData sd = new StringData(); // we really only need the errorMsg property of object sd... 

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
        
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        String idToDelete = request.getParameter("deleteId");
        if (idToDelete == null) {
            sd.errorMsg = "Cannot delete - need parameter 'deleteId'";
        } else {

            if (sd.errorMsg.length() == 0) { // if got good DB connection,

                System.out.println("*** Ready to call delete method");
                sd.errorMsg = DbMods.delete(idToDelete, dbc);
            }
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    } else {
        System.out.println("Session unavailable.");
        sd.errorMsg = "Unavailable. Please register and/or logon.";
    }

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>