const PurchaseMedicineModel = require("../models/PurchaseMedicineModel");

// Create a new purchase entry
const createPurchaseMedicine = async (req, res) => {
  try {
    const {
      medicine_name,
      batch_no,
      quantity,
      price_per_unit,
      total_price,
      expiry_date,
      supplier_name,
    } = req.body;

    await PurchaseMedicineModel.create({
      medicine_name,
      batch_no,
      quantity,
      price_per_unit,
      total_price,
      expiry_date,
      supplier_name,
    });

    res.status(201).json({ message: "Medicine purchase recorded successfully" });
  } catch (error) {
    console.error("Purchase creation Error:",error.message);
    res.status(500).json({ message: "Error creating purchase record", error });
  }
};

// Get all purchase entries
const getAllPurchaseMedicines = async (req, res) => {
  try {
    const Allpurchases = await PurchaseMedicineModel.find();
    res.status(200).json(Allpurchases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

// Get purchase by ID
const getPurchaseMedicineById = async (req, res) => {
  try {
    const singlepurchase = await PurchaseMedicineModel.findById(req.params.id);
    if (!singlepurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(singlepurchase);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchase", error });
  }
};

// Update purchase by ID
const updatePurchaseMedicine = async (req, res) => {
  try {
    const updatedPurchaseMedicine = await PurchaseMedicineModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPurchaseMedicine) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase updated", updatedPurchaseMedicine });
  } catch (error) {
    res.status(500).json({ message: "Error updating purchase", error });
  }
};

// Delete purchase by ID
const deletePurchaseMedicine = async (req, res) => {
  try {
    const deletedPurchaseMedicine = await PurchaseMedicineModel.findByIdAndDelete(req.params.id);
    if (!deletedPurchaseMedicine) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting purchase", error });
  }
};

// to count purchaseMedicine
const countAllPurchaseMedicine = async (req, res) => {
    try {
        const allPurchaseMedicine = await PurchaseMedicineModel.find().countDocuments();
        if (!allPurchaseMedicine) return res.status(404).json({ message: "Failed to fetch PurchaseMedicine count" });
        res.status(200).json({ allPurchaseMedicine });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
    createPurchaseMedicine,
    getAllPurchaseMedicines,
    getPurchaseMedicineById,
    updatePurchaseMedicine,
    deletePurchaseMedicine,
    countAllPurchaseMedicine
  };
