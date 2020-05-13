<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.webUser.*" %>

<%@page language="java" import="com.google.gson.*" %>



<%
    Gson gson = new Gson();

    StringData errorMsgs = new StringData();

    // check for the session object and make sure user is logged on
    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
    
    if (loggedOnUser != null) { 
        
        DbConn dbc = new DbConn();

        String jsonInsertData = request.getParameter("jsonData");
        if (jsonInsertData == null) {
            errorMsgs.errorMsg = "Cannot insert -- no data was received";
            System.out.println(errorMsgs.errorMsg);
        } else {
            System.out.println("jsonInsertData is " + jsonInsertData);
            errorMsgs.errorMsg = dbc.getErr();
            if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
                System.out.println("insertUserAPI.jsp ready to insert");

                // Must use gson to convert JSON (that the user provided as part of the url, the jsonInsertData. 
                // Convert from JSON (JS object notation) to POJO (plain old java object).
                StringData insertData = gson.fromJson(jsonInsertData, StringData.class);

                // this method takes the user's input data as input and outputs an error message object (with same field names).
                errorMsgs = DbMods.insert(insertData, dbc); // this is the form level message
            }
        }

        dbc.close();
        
    } else {
        System.out.println("Session unavailable.");
        errorMsgs.errorMsg = "Unavailable. Please register and/or logon.";
    }

    out.print(gson.toJson(errorMsgs).trim());
%>

