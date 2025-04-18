// ✅ Updated Discharge Controller to match the DischargeDetails model

const DischargeModel = require("../models/DischargeModel");
const PatientModel = require("../models/PatientModel");

// ✅ Create a discharge record
const createDischargeDetails = async (req, res) => {
  try {
    const {
      patient_id,
      hospital_id,
      discharge_date,
      reason_for_discharge,
      treatment_summary,
      doctor_name,
    } = req.body;

    const patient = await PatientModel.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newDischarge = await DischargeModel.create({
      patient_name: patient.patient_name, // ✅ derived
      patient_id,
      hospital_id,
      discharge_date,
      reason_for_discharge,
      treatment_summary,
      doctor_name,
    });

    res
      .status(201)
      .json({ message: "Discharge record created", data: newDischarge });
  } catch (error) {
    console.error("Create Discharge Error:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllDischargeDetails = async (req, res) => {
  try {
    const discharges = await DischargeModel.find().populate(
      "patient_id hospital_id"
    );
    res.status(200).json(discharges);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ message: "Failed to fetch discharges", error });
  }
};

const getDischargeDetailById = async (req, res) => {
  try {
    const discharge = await DischargeModel.findById(req.params.id).populate(
      "patient_id hospital_id"
    );
    if (!discharge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }
    res.status(200).json(discharge);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ message: "Error fetching discharge detail", error });
  }
};

const deleteDischargeDetail = async (req, res) => {
  try {
    const discharge = await DischargeModel.findByIdAndDelete(req.params.id);
    if (!discharge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }
    res.status(200).json({ message: "Discharge detail deleted" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete discharge detail", error });
  }
};

const updateDischargeDetail = async (req, res) => {
  try {
    const updateFields = [
      "patient_id",
      "hospital_id",
      "discharge_date",
      "reason_for_discharge",
      "treatment_summary",
      "doctor_name",
    ];

    const discharge = await DischargeModel.findById(req.params.id);
    if (!discharge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }

    for (const field of updateFields) {
      if (req.body[field] !== undefined) discharge[field] = req.body[field];
    }

    // If patient_id is changed, update the corresponding patient_name
    if (req.body.patient_id) {
      const patient = await PatientModel.findById(req.body.patient_id);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      discharge.patient_name = patient.patient_name;
    }

    await discharge.save();
    res.status(200).json(discharge);
  } catch (error) {
    console.error("Update Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update discharge detail", error });
  }
};

const countAllDischarges = async (req, res) => {
  try {
    const count = await DischargeModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Count Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDischargeDetails,
  getAllDischargeDetails,
  getDischargeDetailById,
  deleteDischargeDetail,
  updateDischargeDetail,
  countAllDischarges,
};
