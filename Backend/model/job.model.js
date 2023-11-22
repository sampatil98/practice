const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  Title: { type: String },
  Description: { type: String },
  Company: { type: String },
  Location: { type: String },
  Salary: { typr: Number },
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = { JobModel };
