<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<% 
    StringData sd = new StringData();
    StringDataList list = new StringDataList();
    session.invalidate();
    list.dbError = "You are logged out. Thank you for visiting. ";

    //convert Java Object into JSON
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>