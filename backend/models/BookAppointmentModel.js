const mongoose = require("mongoose");

const bookAppointmentSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "hospital", required: true },
  doctor_name: { type: String, required: true },
 appointment_date : { type: Date, required: true },
  appointment_time: { type: String, required: true }, // e.g., "10:30 AM"
  reason_for_visit: { type: String, required: true },
  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked"
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bookAppointmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BookAppointment = mongoose.model("BookAppointment", bookAppointmentSchema);

module.exports = BookAppointment;
