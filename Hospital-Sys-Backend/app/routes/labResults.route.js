const router = require("express").Router();
const labResults = require("../controllers/labResults.controller");
const {
  auth,
  authAdminLabTechnician,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllLabResults", auth, labResults.getAllLabResults);
router.get("/getSingleLabResults", auth, labResults.getSingle);
// authAdmin, authLabTechnician
router.post("/addLabResults", authAdminLabTechnician, labResults.add);
router.post("/editLabResults", authAdminLabTechnician, labResults.edit);
router.post("/delLabResults", authAdminLabTechnician, labResults.delLabResults);
router.post("/assignToUser", authAdminLabTechnician, labResults.assignToUser);

module.exports = router;
