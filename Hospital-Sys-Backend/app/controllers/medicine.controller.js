const medicineModel = require("../db/models/medicine.model");
const { resGenerator } = require("../helpers/methods");
class Medicine {
  static add = async (req, res) => {
    try {
      const medicineData = new medicineModel({
        ...req.body,
        addedby: req.user._id,
      });
      await medicineData.save();
      resGenerator(res, 200, medicineData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };

  static getAllMedicines = async (req, res) => {
    try {
      const medicines = await medicineModel.find().sort({ name: 1 });
      resGenerator(res, 200, medicines, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static getSingle = async (req, res) => {
    try {
      const medicines = await medicineModel.findById(req.params.id);
      if (!medicines) throw new Error("user not found");
      resGenerator(res, 200, medicines, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static edit = async (req, res) => {
    try {
      const avlEdits = [
        "name",
        "productionDate",
        "expDate",
        "price",
        "quantity",
      ];
      const bodyKeys = Object.keys(req.body);
      const matched = bodyKeys.every((key) => avlEdits.includes(key));
      if (!matched) throw new Error("invalid updates");
      bodyKeys.forEach((k) => (req.user[k] = req.body[k]));
      await req.user.save();
      resGenerator(res, 200, req.user, "updated");
    } catch (e) {
      resGenerator(res, 500, e.message, "error on update");
    }
  };
  static delMedicine = async (req, res) => {
    try {
      const medicineData = await medicineData.findOneAndDelete({
        _id: req.params.id,
        addedby: req.user._id,
      });
      if (!medicineData) throw new Error("invalid data");
      resGenerator(res, 200, medicineData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };
}
module.exports = Medicine;
