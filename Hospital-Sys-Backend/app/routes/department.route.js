const router = require("express").Router();
const department = require("../controllers/department.controller");
const {
  auth,
  authAdmin,
  authDoctor,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllDepartments", auth, department.getAllDepartments);
router.get("/getSingledepartment", auth, department.getSingle);
// authAdmin,authDoctor
router.post("/addDepartment", authAdmin, authDoctor, department.addDepartment);
router.post("/editdepartment", authAdmin, authDoctor, department.edit);
router.post("/deldepartment", authAdmin, authDoctor, department.deldepartment);
module.exports = router;
