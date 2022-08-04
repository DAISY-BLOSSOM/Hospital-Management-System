const router = require("express").Router();
const appointment = require("../controllers/appointment.controller");
const {
  auth,
  authAdmin,
  authDoctor,
  authPatient,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllAppointments", auth, appointment.getAllAppointments);
router.get("/getSingle", auth, appointment.getSingle);
// authAdmin,authPatient
router.post("/addAppointment", authAdmin, authPatient, appointment.add);
router.post("/editAppointment", authAdmin, authPatient, appointment.edit);
router.post("/delAppointment", authAdmin, authPatient, authDoctor, appointment.delappointment);
module.exports = router;
