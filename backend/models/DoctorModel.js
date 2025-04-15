const mongoose = require("mongoose");

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  doctor_name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience_years: { type: Number, required: true },
  qualifications: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

// Pre-save middleware to update 'updatedAt' field
doctorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
