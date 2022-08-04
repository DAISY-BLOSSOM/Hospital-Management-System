const mongoose = require("mongoose");

const labResultSchema = mongoose.Schema(
  {
    investigationName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fileResult: {
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

const LabResults = new mongoose.model("LabResults", labResultSchema);
module.exports = LabResults;
