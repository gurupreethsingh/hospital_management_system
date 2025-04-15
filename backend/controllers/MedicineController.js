const MedicineModel = require("../models/MedicineModel");

const createMedicine= async (req,res) => {
    try
    { 
         const{  medicine_name,
         manufacturer,
         expiry_date,
         price,
         stock_quantity}=req.body;
         const existingmedicine= await MedicineModel.findOne({medicine_name});
         if(existingmedicine) return res.status(400).json({message:"Medicine details exists"});
         else
         {
          await MedicineModel.create({medicine_name,manufacturer,expiry_date,price,stock_quantity})
          res.status(201).json({message:"Error"});
         }
    }
    catch
    {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "Server error" });
    }
}

const getAllMedicines = async (req, res) => {
  try {
    const allMedicines = await MedicineModel.find();
    res.status(200).json(allMedicines);
  } catch (err) {
    console.error("Fetch All Users Error:", err.message);
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};

const viewMedicineById = async (req, res) => {
    try {
        const singlemedicine = await MedicineModel.findById(req.params.id);
        if (!singlemedicine) return res.status(404).json({ message: "Medicines not found" });
        res.status(200).json(singlemedicine);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

const deleteMedicine = async (req, res) => {
    try {
      const medicine = await MedicineModel.findByIdAndDelete(req.params.id);
      if (!medicine) return res.status(404).json({ message: "Medicine not found" })
      res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (err) {
      console.error("Delete Error:", err.message);
      res.status(500).json({ message: "Failed to delete medicine" });
    }
  };

const updateMedicine = async (req, res) => {
  try {
    const {
        medicine_name,
         manufacturer,
         expiry_date,
         price,
         stock_quantity
    } = req.body;

    const singlemedicine = await MedicineModel.findById(req.params.id);
    if (!singlemedicine) return res.status(404).json({ message: "Medicine not found" });
    if(medicine_name) singlemedicine.medicine_name = medicine_name;
    if(manufacturer) singlemedicine.manufacturer = manufacturer;
    if(expiry_date) singlemedicine.expiry_date = expiry_date;
    if(price) singlemedicine.price = price;
    if(stock_quantity) singlemedicine.stock_quantity = stock_quantity;
    await singlemedicine.save();
    res.status(200).json(singlemedicine);

} catch (error) {
    console.error("Error updating medicine:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// to count how many doctors are there. 
const countAllmedicines = async (req, res) => {
    try {
        const allmedicines = await MedicineModel.find().countDocuments();
        if (!allmedicines) return res.status(404).json({ message: "Failed to fetch Medicine count" });
        res.status(200).json({ allmedicines });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
    createMedicine, getAllMedicines, viewMedicineById  , deleteMedicine ,updateMedicine , countAllmedicines
  };
