<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.patientVisit.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    // Test URL tamper:
    // ?jsonData={"patientName":"Johnson, Sudhir","imageUrl":"https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-306-1445703546.jpg?itok=RZ9qp8Ep","medRecNo":"TUN37333456","description":"Vaccination","visitDateTime":"2020-3-17 2:35 PM","diagnosis":"Influenza virus vaccine","visitCharge":"52.50","webUserId":"5","errorMsg": ""}
    
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- missing 'jsonData' URL parameter";
        System.out.println(errorMsgs.errorMsg);
    } else { // URL parameter data was received
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("DB connection OK to proceed");

            // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);

            /* Useful to copy field names from StringData as a reference
                public String patientName = "";
                public String imageUrl = "";
                public String medRecNo = "";
                public String description = "";
                public String visitDateTime = "";
                public String diagnosis = "";
                public String visitCharge = "";
                public String webUserId = "";
            */
            // Validation - field by field, check what's in insertData and put error message (if any) 
            // into corresponding field of errorMsgs.
            errorMsgs.patientName = ValidationUtils.stringValidationMsg(insertData.patientName, 255, true);
            errorMsgs.imageUrl = ValidationUtils.stringValidationMsg(insertData.imageUrl, 2100, true);
            errorMsgs.medRecNo = ValidationUtils.stringValidationMsg(insertData.medRecNo, 255, true);
            errorMsgs.description = ValidationUtils.stringValidationMsg(insertData.description, 2100, true);
            errorMsgs.visitDateTime = ValidationUtils.dateTimeValidationMsg(insertData.visitDateTime, false);
            errorMsgs.diagnosis = ValidationUtils.stringValidationMsg(insertData.diagnosis, 255, true);
            errorMsgs.visitCharge = ValidationUtils.decimalValidationMsg(insertData.visitCharge, false);
            errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);

            if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again";

            } else { // all fields passed validation

                // Start preparing SQL statement
                String sql = "INSERT INTO PatientVisit (PatientName, ImageUrl, MedRecNo, Description, VisitDateTime, Diagnosis, VisitCharge, web_user_id)"
                        + " values (?,?,?,?,?,?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setString(1, insertData.patientName); // string type is simple
                pStatement.setString(2, insertData.imageUrl);
                pStatement.setString(3, insertData.medRecNo);
                pStatement.setString(4, insertData.description);
                pStatement.setString(5, ValidationUtils.dateTimeConversion(insertData.visitDateTime));
                pStatement.setString(6, insertData.diagnosis);
                pStatement.setBigDecimal(7, ValidationUtils.decimalConversion(insertData.visitCharge));
                pStatement.setInt(8, ValidationUtils.integerConversion(insertData.webUserId));

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid User Role Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That email address is already taken";
                }

            } // all fields passed validation

        } // db connection OK
    } // URL parameter data was received.

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>