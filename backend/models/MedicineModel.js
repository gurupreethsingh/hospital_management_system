const mongoose = require("mongoose");

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  medicine_name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  expiry_date: { type: Date, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
 
  
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

// Pre-save middleware to update 'updatedAt' field
medicineSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
