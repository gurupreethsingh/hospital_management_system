const TreatmentModel = require("../models/TreatmentModel")


const createTreatment = async (req, res) => {
  try {
    const {
      treatment_name,
      description,
      cost,
      treatment_date,
      patient_id,
      doctor_id,
      hospital_id
    } = req.body;

    console.log("📥 Incoming Treatment Payload:", req.body);

    // Mongoose will automatically validate these fields
    await TreatmentModel.create({
      treatment_name,
      description,
      cost,
      treatment_date,
      patient_id,
      doctor_id,
      hospital_id
    });

    res.status(201).json({ message: "Treatment details added successfully" });
  } catch (error) {
    console.error("❌ Treatment details Creation Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


const viewAllTreatments = async (req, res) => {
    try {
        const allTreatments = await TreatmentModel.find();
        if (!allTreatments) return res.status(404).json({ message: "Treatments not found" });
        res.status(200).json(allTreatments);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

const viewTreatmentById = async (req,res)=>{
    try{
        const singleTreatment = await TreatmentModel.findById(req.params.id);
        if (!singleTreatment) return res.status(404).json({ message: "Treatment Details not found" });
        res.status(200).json(singleTreatment)
    }catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
};


const deleteTreatment = async (req, res) => {
  try {
    const Treatment = await TreatmentModel.findByIdAndDelete(req.params.id);
    if (!Treatment) return res.status(404).json({ message: "Treatment Details not found" })
    res.status(200).json({ message: "Treatment details deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const {
      treatment_name,
      description,
      cost,
      treatment_date,
      patient_id,
      doctor_id,
      hospital_id,
    } = req.body;

    const treatment = await TreatmentModel.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }

    if (treatment_name) treatment.treatment_name = treatment_name;
    if (description) treatment.description = description;
    if (cost !== undefined) treatment.cost = cost;
    if (treatment_date) treatment.treatment_date = treatment_date;
    if (patient_id) treatment.patient_id = patient_id;
    if (doctor_id) treatment.doctor_id = doctor_id;
    if (hospital_id) treatment.hospital_id = hospital_id;

    await treatment.save();
    res.status(200).json(treatment);
  } catch (error) {
    console.error("Error updating treatment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


const countAllTreatments = async (req, res) => {
    try {
        const allTreatments = await TreatmentModel.find().countDocuments();
        if (!allTreatments) return res.status(404).json({ message: "Failed to fetch Treatment count" });
        res.status(200).json({ allhospitals });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}


module.exports = {
    createTreatment,viewAllTreatments,viewTreatmentById ,deleteTreatment, deleteTreatment,updateTreatment,
    countAllTreatments
}