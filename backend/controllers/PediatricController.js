const PediatricModel = require("../models/PediatricModel");

// Create new pediatric record
const addPediatric = async (req, res) => {
  try {
    const {
      child_name,
      date_of_birth,
      gender,
      ward_number,
      hospital_id,
      doctor_id,
      mother_name,
      father_name,
      parent_contact,
    } = req.body;

    const existing = await PediatricModel.findOne({ child_name });
    if (existing)
      return res
        .status(400)
        .json({ message: "Pediatric record already exists." });

    await PediatricModel.create({
      child_name,
      date_of_birth,
      gender,
      ward_number,
      hospital_id,
      doctor_id,
      mother_name,
      father_name,
      parent_contact,
    });

    res.status(201).json({ message: "Pediatric record created successfully." });
  } catch (error) {
    console.error("Error creating pediatric record:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all pediatric records
const getAllPediatrics = async (req, res) => {
  try {
    const all = await PediatricModel.find();
    res.status(200).json(all);
  } catch (error) {
    console.error("Fetch all pediatrics error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single pediatric record by ID
const getPediatricById = async (req, res) => {
  try {
    const record = await PediatricModel.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    console.error("Fetch pediatric error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete pediatric record
const deletePediatric = async (req, res) => {
  try {
    const deleted = await PediatricModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Pediatric record deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update pediatric record
const updatePediatric = async (req, res) => {
  try {
    const record = await PediatricModel.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    const fields = [
      "child_name",
      "date_of_birth",
      "gender",
      "ward_number",
      "hospital_id",
      "doctor_id",
      "mother_name",
      "father_name",
      "parent_contact",
    ];

    fields.forEach((field) => {
      if (req.body[field]) record[field] = req.body[field];
    });

    await record.save();
    res.status(200).json(record);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Add treatment entry to a pediatric record
const addTreatmentEntry = async (req, res) => {
  try {
    const record = await PediatricModel.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    const {
      date,
      diagnosis,
      treatment_given,
      medication_prescribed,
      follow_up_date,
      doctor_notes,
    } = req.body;

    record.treatment_records.push({
      date: date || new Date(),
      diagnosis,
      treatment_given,
      medication_prescribed,
      follow_up_date,
      doctor_notes,
    });

    await record.save();
    res.status(200).json({ message: "Treatment entry added", data: record });
  } catch (error) {
    console.error("Add treatment error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Count all pediatrics
const countAllPediatrics = async (req, res) => {
  try {
    const count = await PediatricModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Count error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addPediatric,
  getAllPediatrics,
  getPediatricById,
  deletePediatric,
  updatePediatric,
  addTreatmentEntry,
  countAllPediatrics,
};
