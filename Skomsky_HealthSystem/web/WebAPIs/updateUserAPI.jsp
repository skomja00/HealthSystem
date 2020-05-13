<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.webUser.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    // This is the object we get from the GSON library.
    // This object knows how to convert between: 
    //    POJO (plain old java object) <-> JSON (JavaScript Object notation - a String)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
    
        String jsonUpdateData = request.getParameter("jsonData");
        if (jsonUpdateData == null) {
            errorMsgs.errorMsg = "Cannot update -- need 'jsonData' as URL parameter";
            System.out.println(errorMsgs.errorMsg);
        } else {
            System.out.println("jsonUpdateData is " + jsonUpdateData);
            errorMsgs.errorMsg = dbc.getErr();
            if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
                System.out.println("updateUserAPI.jsp - ready to update");

                // Must use gson to convert JSON (that the user provided as part of the url, the jsonUpdateData. 
                // Convert from JSON (JS object notation) to POJO (plain old java object).
                StringData updateData = gson.fromJson(jsonUpdateData, StringData.class);

                // this method takes the user's input data as input and outputs an error message object (with same field names).
                //errorMsgs = DbMods.update(updateData, dbc); // this is the form level message
                errorMsgs = DbMods.update(updateData, dbc); // this is the form level message
            }
        }

        dbc.close();
        
    } else {
        System.out.println("Session unavailable.");
        errorMsgs.errorMsg = "Unavailable. Please register and/or logon.";
    }    
        
    out.print(gson.toJson(errorMsgs).trim());
        
%>

