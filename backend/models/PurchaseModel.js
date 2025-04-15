const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  buyer_name: { type: String, required: true },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "hospital", required: true },
  blood_group: { type: String, required: true }, // e.g., A+, B-, O+, etc.
  quantity: { type: Number, required: true }, // in units
  purchase_date: { type: Date, required: true },
  purpose: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

purchaseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
