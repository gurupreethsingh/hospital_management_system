const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Field to store the avatar path
  phone: { type: String }, // New field to store phone number
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  }, // New field to store address details
  role: {
    type: String,
    enum: [
      // === INTERNAL HOSPITAL STAFF ===
      "admin", // System Administrator
      "superadmin", // Overall Control
      "doctor", // General Physician or Specialist
      "surgeon", // Performs surgeries
      "nurse", // Assists doctors, patient care
      "pharmacist", // Manages pharmacy
      "lab_technician", // Handles diagnostic tests
      "radiologist", // Imaging diagnostics
      "receptionist", // Front desk support
      "ward_boy", // Assists in patient mobility
      "cleaning_staff", // Housekeeping
      "accountant", // Billing and finance
      "hr_manager", // Human Resources
      "it_support", // Technical issues
      "ambulance_driver", // Emergency patient transport
      "maintenance_staff", // Facility upkeep
      "intern", // Medical Interns
      "medical_superintendent", // Administrative head doctor

      // === MANAGEMENT & OPERATIONAL ROLES ===
      "hospital_manager", // Operational manager
      "insurance_coordinator", // Liaison for health insurance
      "inventory_manager", // Supplies and medicine stock
      "security_guard", // Security

      // === EXTERNAL ROLES RELATED TO HOSPITAL ===
      "patient", // Individuals receiving care
      "caregiver", // Family or hired help assisting patient
      "vendor", // Supplies and medical equipment provider
      "medical_representative", // Pharmaceutical rep
      "health_inspector", // Government health official
      "delivery_person", // External delivery (equipment, food, etc.)
      "emergency_responder", // External paramedics/ambulance
      "blood_donor", // Voluntary donor
      "volunteer", // NGO or individual contributor
      "user",
    ],
    default: "user",
  },

  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

const User = mongoose.model("User", userSchema);

module.exports = User;
