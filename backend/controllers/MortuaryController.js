const MortuaryModel = require("../models/MoutuaryModel");
const HospitalModel = require("../models/HospitalModel");
const DoctorModel = require("../models/DoctorModel");

// Create a mortuary record
const createMortuary = async (req, res) => {
  try {
    const data = req.body;

    const newRecord = await MortuaryModel.create(data);
    res.status(201).json({
      message: "Mortuary record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Create Mortuary Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all mortuary records
const getAllMortuary = async (req, res) => {
  try {
    const records = await MortuaryModel.find().populate(
      "hospital_id doctor_id"
    );
    res.status(200).json(records);
  } catch (error) {
    console.error("Fetch All Mortuary Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single mortuary record by ID
const getMortuaryById = async (req, res) => {
  try {
    const record = await MortuaryModel.findById(req.params.id).populate(
      "hospital_id doctor_id"
    );
    if (!record) return res.status(404).json({ message: "Record not found" });

    res.status(200).json(record);
  } catch (error) {
    console.error("Fetch Mortuary By ID Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update mortuary record
const updateMortuary = async (req, res) => {
  try {
    const record = await MortuaryModel.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    const fields = [
      "deceased_name",
      "age",
      "gender",
      "date_of_death",
      "time_of_death",
      "cause_of_death",
      "hospital_id",
      "doctor_id",
      "ward_number",
      "body_received_by",
      "relation_to_deceased",
      "contact_number",
      "released",
      "release_date",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        record[field] = req.body[field];
      }
    });

    await record.save();
    res.status(200).json({
      message: "Mortuary record updated successfully",
      data: record,
    });
  } catch (error) {
    console.error("Update Mortuary Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a mortuary record
const deleteMortuary = async (req, res) => {
  try {
    const deleted = await MortuaryModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });

    res.status(200).json({ message: "Mortuary record deleted successfully" });
  } catch (error) {
    console.error("Delete Mortuary Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Count all mortuary records
const countAllMortuary = async (req, res) => {
  try {
    const count = await MortuaryModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Count Mortuary Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createMortuary,
  getAllMortuary,
  getMortuaryById,
  updateMortuary,
  deleteMortuary,
  countAllMortuary,
};
