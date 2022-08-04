const router = require("express").Router();
const medicine = require("../controllers/medicine.controller");
const {
  auth,
  authAdmin,
  authDoctor,
  authNurse,
  authPharmacist,
  authLabTechnician,
  authPatient,
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllMedicines", auth, medicine.getAllMedicines);
router.get("/getSingleMedicne", auth, medicine.getSingle);
// authAdmin,authPharmacist
router.post("/addMedicine", authAdmin, authPharmacist, medicine.add);
router.post("/editMedicine", authAdmin, authPharmacist, medicine.edit);
router.post("/delMedicine", authAdmin, authPharmacist, medicine.delMedicine);
module.exports = router;
