// models/treatment.js

const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  treatment_name: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true, default: 0 },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "patient", required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "hospital", required: true },

  treatment_date: { type: Date, default: Date.now },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

treatmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const treatment = mongoose.model("treatment", treatmentSchema);

module.exports = treatment;
