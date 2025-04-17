const mongoose = require("mongoose");

const PediatricSchema = new mongoose.Schema({
  child_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  ward_number: {
    type: String,
    required: true,
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  parent_contact: {
    type: String,
    required: true,
  },
  treatment_records: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      diagnosis: String,
      treatment_given: String,
      medication_prescribed: String,
      follow_up_date: Date,
      doctor_notes: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pediatric", PediatricSchema);
