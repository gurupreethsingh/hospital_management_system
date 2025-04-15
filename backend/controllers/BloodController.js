const Blood = require("../models/BloodModel");

const createblood = async (req, res) => {
  try {
    const {
      blood_group,
      donor_name,
      contact_number,
      quantity_in_units,
      last_donation_date,
      location } = req.body;
    const existingblood = await Blood.findOne({ blood_group });
    if (existingblood) {
      return res.status(400).json({ message: "Blood Group details exists" });
    }
    else {
      await BloodModel.create({ blood_group, donor_name, contact_number, quantity_in_units, last_donation_date, location })
      res.status(201).json({ message: "Error" });
    }

  }
  catch {
    console.error("Error adding Blood group:", error);
    res.status(500).json({ error: "Server error" });
  }
}

const getAllBloods = async (req, res) => {
  try {
    const bloods = await Blood.find().select("-password");
    res.status(200).json(bloods);
  } catch (err) {
    console.error("Fetch All Users Error:", err.message);
    res.status(500).json({ message: "Failed to fetch bloods" });
  }
};

const viewBloodById = async (req, res) => {
  try {
    const singleblood = await BloodModel.findById(req.params.id);
    if (!singleblood) return res.status(404).json({ message: "Blood group not found" });
    res.status(200).json(singleblood);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

const deleteblood = async (req, res) => {
  try {
    const blood = await BloodModel.findByIdAndDelete(req.params.id);
    if (!blood) return res.status(404).json({ message: "Blood group not found" })
    res.status(200).json({ message: "Blood group deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete blood group" });
  }
};


const updateblood = async (req, res) => {
  try {
    const {
      blood_group,
      donor_name,
      contact_number,
      quantity_in_units,
      last_donation_date,
      location
    } = req.body;

    const singleblood = await BloodModel.findById(req.params.id);
    if (!singleblood) return res.status(404).json({ message: "Blood group not found" });

    if (blood_group) singleblood.blood_group = blood_group;
    if (donor_name) singleblood.donor_name = donor_name;
    if (contact_number) singleblood.contact_number = contact_number;
    if (quantity_in_units) singleblood.quantity_in_units = quantity_in_units;
    if (last_donation_date) singleblood.last_donation_date = last_donation_date;
    if (location) singleblood.location = location;

    await singleblood.save();
    res.status(200).json(singleblood);

  } catch (error) {
    console.error("Error updating Blood group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
// to count how many doctors are there. 
const countAllblood = async (req, res) => {
  try {
    const allblood = await BloodModel.find().countDocuments();
    if (!allblood) return res.status(404).json({ message: "Failed to fetch blood count" });
    res.status(200).json({ allblood });
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createblood, getAllBloods,  viewBloodById, deleteblood, updateblood, countAllblood
};
