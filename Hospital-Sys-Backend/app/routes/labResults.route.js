const router = require("express").Router();
const labResults = require("../controllers/labResults.controller");
const {
  auth,
  authAdmin,
  authLabTechnician
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllLabResults", auth, labResults.getAllLabResults);
router.get("/getSingleLabResults", auth, labResults.getSingle);
// authAdmin, authLabTechnician
router.post("/addLabResults", authAdmin,  authLabTechnician, labResults.add);
router.post("/editLabResults", authAdmin,  authLabTechnician, labResults.edit);
router.post("/delLabResults", authAdmin,  authLabTechnician, labResults.delLabResults);
router.post("/assignToUser", authAdmin,  authLabTechnician, labResults.assignToUser);

module.exports = router;
