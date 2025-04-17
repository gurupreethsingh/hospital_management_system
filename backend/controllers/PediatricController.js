const Pediatric = require("../models/PediatricModel");

// 1. Add Pediatric Record
exports.addPediatric = async (req, res) => {
  try {
    const newPediatric = new Pediatric(req.body);
    const savedRecord = await newPediatric.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Update Ward or Doctor
exports.updateWardOrDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { ward_number, doctor_id } = req.body;

    const updated = await Pediatric.findByIdAndUpdate(
      id,
      { ward_number, doctor_id },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 3. Add Treatment Entry
exports.addTreatmentEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const treatmentEntry = req.body;

    const pediatric = await Pediatric.findById(id);
    if (!pediatric) {
      return res.status(404).json({ message: "Record not found" });
    }

    pediatric.treatment_records.push(treatmentEntry);
    await pediatric.save();

    res.status(200).json(pediatric);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4. Fetch Child + History
exports.getPediatricById = async (req, res) => {
  try {
    const { id } = req.params;
    const pediatric = await Pediatric.findById(id)
      .populate("hospital_id", "hospital_name")
      .populate("doctor_id", "doctor_name specialization");

    if (!pediatric) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(pediatric);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 5. Search by Parent Contact or Name
exports.searchByParentInfo = async (req, res) => {
  try {
    const { query } = req.query;

    const results = await Pediatric.find({
      $or: [
        { mother_name: { $regex: query, $options: "i" } },
        { father_name: { $regex: query, $options: "i" } },
        { parent_contact: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
