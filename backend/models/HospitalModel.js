const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospital_name: { type: String, required: true },
  hospital_address: {
    type: String,
    required: true,
    default: "Banglore Branch",
  },
  hospital_phone: { type: String, required: true, default: 123456789 },
  hospital_email: {
    type: String,
    required: true,
    default: "info_hms@gmail.com",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

hospitalSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
