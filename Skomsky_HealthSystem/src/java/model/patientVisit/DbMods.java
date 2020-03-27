package model.patientVisit;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringDataList findById (DbConn dbc, String id) {
        
        StringDataList sdl = new StringDataList();
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
                sdl.add(results);
            } else {
                StringData sd = new StringData();
                sd.errorMsg = "Not found.";
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in patientVisitView.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
} // class
