const mongoose = require("mongoose");

// Patient Schema
const patientSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact_number: { type: String, required: true },
  address: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

// Pre-save middleware to update 'updatedAt' field
patientSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
