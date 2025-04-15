const mongoose = require("mongoose");

// Blood Details Schema
const bloodDetailsSchema = new mongoose.Schema({
  blood_group: { type: String, required: true }, // e.g., A+, O-, B+
  donor_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  quantity_in_units: { type: Number, required: true }, // Number of units available
  last_donation_date: { type: Date, required: true },
  location: { type: String, required: true }, // Hospital or blood bank location

  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

// Pre-save middleware to update 'updatedAt' field
bloodDetailsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BloodDetails = mongoose.model("BloodDetails", bloodDetailsSchema);

module.exports = BloodDetails;
