const router = require("express").Router();
const appointment = require("../controllers/appointment.controller");
const {
  auth,
  authAdminPatient,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllAppointments", auth, appointment.getAllAppointments);
router.get("/getSingle", auth, appointment.getSingle);
// authAdmin,authPatient
router.post("/addAppointment", authAdminPatient, appointment.add);
router.post("/editAppointment", authAdminPatient, appointment.edit);
router.post("/delAppointment", authAdminPatient, appointment.delappointment);
module.exports = router;
