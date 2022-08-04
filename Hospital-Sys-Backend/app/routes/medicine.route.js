const router = require("express").Router();
const medicine = require("../controllers/medicine.controller");
const {
  auth,
  authAdminPharmacist
} = require("../middleware/auth.middleware");
//auth
router.get("/getAllMedicines", auth, medicine.getAllMedicines);
router.get("/getSingleMedicne", auth, medicine.getSingle);
// authAdmin,authPharmacist
router.post("/addMedicine", authAdminPharmacist, medicine.add);
router.post("/editMedicine", authAdminPharmacist, medicine.edit);
router.post("/delMedicine", authAdminPharmacist, medicine.delMedicine);
module.exports = router;
