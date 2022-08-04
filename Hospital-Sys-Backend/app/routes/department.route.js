const router = require("express").Router();
const department = require("../controllers/department.controller");
const {
  auth,
  authAdminDoc
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllDepartments", auth, department.getAllDepartments);
router.get("/getSingledepartment", auth, department.getSingle);
// authAdmin,authDoctor
router.post("/addDepartment",  authAdminDoc, department.addDepartment);
router.post("/editdepartment", authAdminDoc, department.edit);
router.post("/deldepartment", authAdminDoc, department.deldepartment);
module.exports = router;
