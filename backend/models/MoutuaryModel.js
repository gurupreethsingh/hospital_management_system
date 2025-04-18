const mongoose = require("mongoose");

const MortuarySchema = new mongoose.Schema({
  deceased_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  date_of_death: {
    type: Date,
    required: true,
  },
  time_of_death: {
    type: String,
    required: true,
  },
  cause_of_death: {
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
  ward_number: {
    type: String,
  },
  body_received_by: {
    type: String,
    required: true,
  },
  relation_to_deceased: {
    type: String,
  },
  contact_number: {
    type: String,
    required: true,
  },
  released: {
    type: Boolean,
    default: false,
  },
  release_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mortuary", MortuarySchema);
