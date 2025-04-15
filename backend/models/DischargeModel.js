const mongoose = require("mongoose");

const dischargeDetailsSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "hospital", required: true },
  discharge_date: { type: Date, required: true },
  reason_for_discharge: { type: String, required: true },
  treatment_summary: { type: String, required: true },
  doctor_name: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

dischargeDetailsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const DischargeDetails = mongoose.model("DischargeDetails", dischargeDetailsSchema);

module.exports = DischargeDetails;
