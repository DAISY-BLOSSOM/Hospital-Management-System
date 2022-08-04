const reportsModel = require("../db/models/report.model");
const { resGenerator } = require("../helpers/methods");
class Reports {
  static add = async (req, res) => {
    try {
      const reportsData = new reportsModel({
        ...req.body,
        addedby: req.user._id,
      });
      await reportsData.save();
      resGenerator(res, 200, reportsData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };

  static getAllreports = async (req, res) => {
    try {
      const reports = await reportsModel.find().sort({ name: 1 });
      resGenerator(res, 200, reports, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static getSingle = async (req, res) => {
    try {
      const reports = await reportsModel.findById(req.params.id);
      if (!reports) throw new Error("user not found");
      resGenerator(res, 200, reports, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static edit = async (req, res) => {
    try {
      const avlEdits = ["reportDescription"];
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
  static delreports = async (req, res) => {
    try {
      const reportsData = await reportsData.findOneAndDelete({
        _id: req.params.id,
        addedby: req.user._id,
      });
      if (!reportsData) throw new Error("invalid data");
      resGenerator(res, 200, reportsData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };
  static assignToUser = async (req, res) => {
    const data = { ...req.body, addedBy: req.user._id };
    await User.updateOne({
      $push: { Reports: data },
    });
  };
}
module.exports = Reports;
