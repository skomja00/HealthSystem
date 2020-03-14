<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>


<%
    StringData profile = new StringData();
    StringDataList list = new StringDataList();
    // Check the session to see if the customer object is in there.
    // Must use same name ("webUser") when getting the object out of the session
    // as you used when you put it into the session (in logonAPI.jsp).
    // You have to type cast the object as it comes out of the session (StringData)
    // so that you can put the object into a customer StringData object.  
    profile = (StringData) session.getAttribute("webUser");
    if (profile == null) { 
        list.dbError = "Profile unavailable.";
    } else {
        System.out.print(profile);
        list.add(profile);
    }
    //convert POJO to JSON. Print into response object as JSON string
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());

%>
