const PurchaseModel = require("../models/PurchaseModel");

// Create a new purchase request
const createPurchase = async (req, res) => {
  try {
    const {buyer_name,blood_group, quantity, purchase_date, purpose} = req.body;

   await PurchaseModel.create({
    buyer_name,
    blood_group,
     quantity, 
     purchase_date,
      purpose
   });
   res.status(201).json({ message: "Blood purchase successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create purchase request", error });
  }
};

// Get all purchase requests
const getAllPurchases = async (req, res) => {
  try {
    const allpurchases = await PurchaseModel.find();
    if (!allpurchases) return res.status(404).json({ message: "Purchases not found" });
    res.status(200).json(allpurchases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchases", error });
  }
};

// Get a single purchase request by ID
const getPurchaseById = async (req, res) => {
  try {
    const singlePurchase = await PurchaseModel.findById(req.params.id);

    if (!singlePurchase) {
      return res.status(404).json({ message: "Purchase request not found" });
    }

    res.status(200).json(singlePurchase);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchase request", error });
  }
};

// Update a purchase request
const updatePurchase = async (req, res) => {
  try {
        const{ buyer_name,
            blood_group,
            quantity, 
            purchase_date,
            purpose} = req.body;
        

    const singlepurchase = await PurchaseModel.findById(req.params.id);
    if (!singlepurchase) {
      return res.status(404).json({ message: "Purchase request not found" });
    }

    
    if(buyer_name) singlepurchase.buyer_name = buyer_name;
    if(blood_group) singlepurchase.blood_group = blood_group;
    if(quantity) singlepurchase.quantity = quantity;
    if(purchase_date) singlepurchase.purchase_date = purchase_date;
    if(purpose) singlepurchase.purpose = purpose;

    awaitsinglepurchase.save();
    res.status(200).json({ message: "Purchase request updated", singlepurchase });
  } catch (error) {
    res.status(500).json({ message: "Failed to update purchase request", error });
  }
};

// Delete a purchase request
const deletePurchase = async (req, res) => {
  try {
    const deleted = await Purchase.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Purchase request not found" });
    }

    res.status(200).json({ message: "Purchase request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete purchase request", error });
  }
};

const countAllPurchase = async (req, res) => {
    try {
        const allPurchase = await PurchaseModel.find().countDocuments();
        if (!allPurchase) return res.status(404).json({ message: "Failed to fetch Purchase count" });
        res.status(200).json({ allPurchase });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  countAllPurchase
};
