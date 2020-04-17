package view;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.patientVisit.StringData;
import model.patientVisit.StringDataList;

public class PatientVisitView {

    public static StringDataList allPatientVisitsAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "select " + 
                    "pv.VisitId, " +
                    "pv.PatientName, " +
                    "pv.ImageUrl, " +
                    "pv.MedRecNo, " +
                    "pv.Description, " +
                    "pv.VisitDateTime, " +
                    "pv.Diagnosis, " +
                    "pv.VisitCharge, " +
                    "wu.web_user_id, " +
                    "wu.user_email, " +
                    "wu.membership_fee " +
                "from PatientVisit as pv " +
                "join web_user as wu on wu.web_user_id = pv.web_user_id_fk  " +
                "ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}