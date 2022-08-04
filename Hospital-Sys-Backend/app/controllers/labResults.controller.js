const labResultsModel = require("../db/models/labResults.model");
const { resGenerator } = require("../helpers/methods");
class LabResults {
  static add = async (req, res) => {
    try {
      const labResultsData = new labResultsModel({
        ...req.body,
        addedby: req.user._id,
      });
      await labResultsData.save();
      resGenerator(res, 200, labResultsData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };

  static getAllLabResults = async (req, res) => {
    try {
      const labResultss = await labResultsModel.find().sort({ name: 1 });
      resGenerator(res, 200, labResultss, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static getSingle = async (req, res) => {
    try {
      const labResultss = await labResultsModel.findById(req.params.id);
      if (!labResultss) throw new Error("user not found");
      resGenerator(res, 200, labResultss, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static edit = async (req, res) => {
    try {
      const avlEdits = ["investigationName", "date", "fileResult"];
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
  static delLabResults = async (req, res) => {
    try {
      const labResultsData = await labResultsData.findOneAndDelete({
        _id: req.params.id,
        addedby: req.user._id,
      });
      if (!labResultsData) throw new Error("invalid data");
      resGenerator(res, 200, labResultsData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };
  static assignToUser = async (req, res) => {};
}
module.exports = LabResults;
