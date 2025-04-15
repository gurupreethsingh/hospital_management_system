const mongoose = require("mongoose");

const purchaseMedicineSchema = new mongoose.Schema({
  medicine_name: { type: String, required: true },
  batch_no: { type: String, required: true },
  quantity: { type: Number, required: true },
  price_per_unit: { type: Number, required: true },
  total_price: { type: Number, required: true },
  expiry_date: { type: Date, required: true },
  supplier_name: { type: String, required: true, default: "Local Supplier" },
  purchase_date: { type: Date, default: Date.now },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` before each save
purchaseMedicineSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const PurchaseMedicine = mongoose.model("purchase_medicine", purchaseMedicineSchema);

module.exports = PurchaseMedicine;
