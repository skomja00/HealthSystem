<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="com.google.gson.*" %> 

 <%

    model.webUser.StringData loggedOnUser = new model.webUser.StringData();
    
    if (session.getAttribute("webUser") != null) { 
        System.out.println("loggedOnUser not null. user logged on.");
        loggedOnUser = (model.webUser.StringData) session.getAttribute("webUser");
        loggedOnUser.errorMsg = ""; // no error means user is logged in 
    } else {
        System.out.println("Session unavailable.");
        loggedOnUser.errorMsg = "Unavailable. Please register and/or logon.";
    }
        
    //convert POJO to JSON. Print into response object as JSON string
    Gson gson = new Gson();
    out.print(gson.toJson(loggedOnUser).trim());
    
%>