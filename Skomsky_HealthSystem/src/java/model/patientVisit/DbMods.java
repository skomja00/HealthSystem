package model.patientVisit;

import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DbMods {

    public static StringData findById (DbConn dbc, String id) {
        
        StringData sd = new StringData();
        try {
            String sql = 
                "select " +
                "    pv.VisitId, " +
                "    pv.PatientName, " +
                "    pv.ImageUrl, " +
                "    pv.MedRecNo, " +
                "    pv.Description, " +
                "    pv.VisitDateTime, " +
                "    pv.Diagnosis, " +
                "    pv.VisitCharge, " +
                "    wu.web_user_id, " +
                "    wu.user_email, " +
                "    wu.membership_fee " +
                "from PatientVisit as pv " +
                "join web_user as wu on wu.web_user_id = pv.web_user_id " +
                "where pv.MedRecNo = ? ";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sd = new StringData(results);
            } else {
                sd.errorMsg = "The database has no Patient Visit records with Id  " + id;
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.patientVisit.DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

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
        errorMsgs.patientName = ValidationUtils.stringValidationMsg(inputData.patientName, 255, false);
        errorMsgs.imageUrl = ValidationUtils.stringValidationMsg(inputData.imageUrl, 2100, false);
        errorMsgs.medRecNo = ValidationUtils.stringValidationMsg(inputData.medRecNo, 255, true);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 2100, true);
        errorMsgs.visitDateTime = ValidationUtils.dateTimeValidationMsg(inputData.visitDateTime, false);
        errorMsgs.diagnosis = ValidationUtils.stringValidationMsg(inputData.diagnosis, 255, false);
        errorMsgs.visitCharge = ValidationUtils.dollarValidationMsg(inputData.visitCharge, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
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
                pStatement.setString(1, inputData.patientName); // string type is simple
                pStatement.setString(2, inputData.imageUrl);
                pStatement.setString(3, inputData.medRecNo);
                pStatement.setString(4, inputData.description);
                pStatement.setString(5, ValidationUtils.dateTimeConversion(inputData.visitDateTime));
                pStatement.setString(6, inputData.diagnosis);
                pStatement.setBigDecimal(7, ValidationUtils.decimalConversion(inputData.visitCharge));
                pStatement.setInt(8, ValidationUtils.integerConversion(inputData.webUserId));

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
                    errorMsgs.errorMsg = "Visit date/time already scheduled for this MRN.";
                }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData inputData, DbConn dbc) {

        /*  inputData JSON Object from UI
        
            "medRecNo": document.getElementById("mrn").value,
            "visitDateTime": document.getElementById("visitDateTime").value,
            "visitId": document.getElementById("visitId").value,
            "patientName": document.getElementById("patientName").value,
            "imageUrl": document.getElementById("image").value,
            "description": document.getElementById("description").value,
            "diagnosis": document.getElementById("diagnosis").value,
            "visitCharge": document.getElementById("visitCharge").value,
            "webUserid": ddList.options[ddList.selectedIndex].value,

            "webUserEmail": "",
            "errorMsg": ""
        */
        
        
        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation
                // set sql string parameter index positions (ie. ?-marks) for the PrepStatement
            String sql = 
                "UPDATE PatientVisit " +
                "SET visitId=?, " +
                    "PatientName=?, " +
                    "ImageUrl=?, " +
                    "Description=?, " +
                    "Diagnosis=?, " +
                    "VisitCharge=?, " +
                    "web_user_id=? " +
                    "where MedRecNo=? and visitDateTime=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);
            
            // Encode string values into the prepared statement (wrapper class).
            pStatement.setInt(1, ValidationUtils.integerConversion(inputData.visitId));
            pStatement.setString(2, inputData.patientName); 
            pStatement.setString(3, inputData.imageUrl);
            pStatement.setString(4, inputData.description);
            pStatement.setString(5, inputData.diagnosis);
            pStatement.setBigDecimal(6, ValidationUtils.dollarConversion(inputData.visitCharge));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(8, inputData.medRecNo);
            pStatement.setString(9, ValidationUtils.dateTimeConversion(inputData.visitDateTime));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.

            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else {
                if (errorMsgs.errorMsg.contains("PRIMARY")) {
                    errorMsgs.errorMsg = "Invalid Visit Id Primary Key. Call (123) 456-7890 or email support@help.com.";
                } else if (errorMsgs.errorMsg.contains("foreign key constraint fails")) {
                    errorMsgs.errorMsg = "Invalid Web User Id Foreign Key. Call (123) 456-7890 or email support@help.com.";
                } else {
                    errorMsgs.errorMsg = "Fatal dbase update error. Call (123) 456-7890 or email support@help.com.";
                }
            }
        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
} // class
