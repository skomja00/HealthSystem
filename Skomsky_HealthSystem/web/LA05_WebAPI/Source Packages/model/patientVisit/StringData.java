package model.patientVisit;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String visitId = "";
    public String patientName = "";
    public String imageUrl = "";
    public String medRecNo = "";
    public String description = "";
    public String visitDateTime = "";
    public String diagnosis = "";
    public String visitCharge = "";
    public String webUserId = "";
    public String userEmail = "";
    public String membershipFee = "";
    
    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            
//        select 
//            pv.VisitId,
//            pv.PatientName,
//            pv.ImageUrl,
//            pv.MedRecNo,
//            pv.Description,
//            pv.VisitDateTime,
//            pv.Diagnosis,
//            pv.VisitCharge,
//            wu.web_user_id,
//            wu.user_email,
//            wu.membership_fee
//        from PatientVisit as pv
//        join web_user as wu on wu.web_user_id = pv.web_user_id_fk
            
            this.visitId = FormatUtils.formatInteger(results.getObject("VisitId"));
            this.patientName = FormatUtils.formatString(results.getObject("PatientName"));
            this.imageUrl = FormatUtils.formatString(results.getObject("ImageUrl"));
            this.medRecNo = FormatUtils.formatString(results.getObject("MedRecNo"));
            this.description = FormatUtils.formatString(results.getObject("Description"));
            this.visitDateTime = FormatUtils.formatDate(results.getObject("VisitDateTime"));
            this.diagnosis = FormatUtils.formatString(results.getObject("Diagnosis"));
            this.visitCharge = FormatUtils.formatDollar(results.getObject("VisitCharge"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("wu.web_user_id"));
            this.userEmail = FormatUtils.formatString(results.getObject("wu.user_email"));
            this.membershipFee = FormatUtils.formatDollar(results.getObject("wu.membership_fee"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

//    public int getCharacterCount() {
//        String s = this.webUserId + this.userEmail + this.userPassword + this.birthday
//                + this.membershipFee + this.userRoleId + this.userRoleType;
//        return s.length();
//    }

    public String toString() {
        return 
            "Visit Id: " + this.webUserId 
            + ", Patient Name: " + this.patientName
            + ", Image Url: " + this.imageUrl
            + ", Med Rec No: " + this.medRecNo
            + ", Description: " + this.description
            + ", Visit DateTime: " + this.visitDateTime
            + ", Diagnosis: " + this.diagnosis
            + ", Visit Charge: " + this.visitCharge
            + ", Web User Id: " + this.webUserId
            + ", User Email: " + this.userEmail
            + ", Membership Fee: " + this.membershipFee;
    }
}
