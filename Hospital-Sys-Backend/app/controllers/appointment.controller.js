const appointmentModel = require("../db/models/appointment.model");
const { resGenerator } = require("../helpers/methods");
class Appointment {
  static add = async (req, res) => {
    try {
      const appointmentData = new appointmentModel({
        ...req.body,
        addedby: req.user._id,
      });
      await appointmentData.save();
      resGenerator(res, 200, appointmentData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };

  static getAllAppointments = async (req, res) => {
    try {
      const appointments = await appointmentModel.find().sort({ name: 1 });
      resGenerator(res, 200, appointments, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static getSingle = async (req, res) => {
    try {
      const appointments = await appointmentModel.findById(req.params.id);
      if (!appointments) throw new Error("user not found");
      resGenerator(res, 200, appointments, "data fetched");
    } catch (e) {
      resGenerator(res, 500, e.message, "error in data");
    }
  };
  static edit = async (req, res) => {
    try {
      const avlEdits = [
        "Date",
        "signSymptoms"
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
  static delappointment = async (req, res) => {
    try {
      const appointmentData = await appointmentData.findOneAndDelete({
        _id: req.params.id,
        addedby: req.user._id,
      });
      if (!appointmentData) throw new Error("invalid data");
      resGenerator(res, 200, appointmentData, "message");
    } catch (e) {
      resGenerator(res, 500, e.message, "invalid");
    }
  };
  static assignToDoc = async(req, res) =>{}
}
module.exports = Appointment;
