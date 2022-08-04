const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    reportDescription: {
      type: String,
      trim: true,
    },
    addedby: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Report = new mongoose.model("Report", reportSchema);
module.exports = Report;
