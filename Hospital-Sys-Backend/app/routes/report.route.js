const router = require("express").Router();
const reports = require("../controllers/report.controller");
const {
  auth,
  authAdminNurse,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllreports", auth, reports.getAllreports);
router.get("/getSinglereports", auth, reports.getSingle);
// authAdminNurse
router.post("/addreports", authAdminNurse, reports.add);
router.post("/editreports", authAdminNurse, reports.edit);
router.post("/delreports", authAdminNurse, reports.delreports);
router.post("/assignToUser", authAdminNurse, reports.assignToUser);

module.exports = router;
