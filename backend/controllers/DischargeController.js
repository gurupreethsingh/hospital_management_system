const DischargeModel =require("../models/DischargeModel");



const createDischargeDetails = async (req, res) => {
  try {
    const {
      patient_name,
      patient_id,
      hospital_id,
      discharge_date,
      reason_for_discharge,
      treatment_summary,
      doctor_name
    } = req.body;

    await DischargeModel.create({
      patient_name,
      patient_id,
      hospital_id,
      discharge_date,
      reason_for_discharge,
      treatment_summary,
      doctor_name
    });

    res.status(201).json({ message: "Discharge details created successfully" });
  } catch (error) {
    console.error("Failed to create discharge details:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};




const getAllDischargeDetails = async (req,res)=>{
    try{
        const allDischarge = await DischargeModel.find();
        if(!allDischarge) return res.status(404).json({message:"Discharge deatails not found"})
        res.status(200).json(allDischarge);
    }catch(error){ 
        console.error("Fetch Error:",error.message);
        res.status(500).json({message:"Failed to fetch discharge details",error});

    }
};


const getDischargeDetailById = async (req, res) => {
  try {
    const singledischarge = await DischargeModel.findById(req.params.id);

    if (!singledischarge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }

    res.status(200).json(singledischarge);
  } catch (error) {
    console.error("Fetch Error");
    res.status(500).json({ message: "Error fetching discharge detail", error });
  }
};


// Delete discharge detail
const deleteDischargeDetail = async (req, res) => {
  try {
    const discharge = await DischargeModel.findByIdAndDelete(req.params.id);

    if (!discharge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }
    res.status(200).json({ message: "Discharge detail deleted" });
  } catch (error) {
    console.error("Delete Error",error.message);
    res.status(500).json({ message: "Failed to delete discharge detail", error });
  }
};


const updateDischargeDetail = async (req, res) => {
  try {
    const {
      patient_name,
      patient_id,
      hospital_id,
      discharge_date,
      reason_for_discharge,
      treatment_summary,
      doctor_name
    } = req.body;

    const singledischarge = await DischargeModel.findById(req.params.id);
    if (!singledischarge) {
      return res.status(404).json({ message: "Discharge detail not found" });
    }

    if (patient_name) singledischarge.patient_name = patient_name;
    if (patient_id) singledischarge.patient_id = patient_id;
    if (hospital_id) singledischarge.hospital_id = hospital_id;
    if (discharge_date) singledischarge.discharge_date = discharge_date;
    if (reason_for_discharge) singledischarge.reason_for_discharge = reason_for_discharge;
    if (treatment_summary) singledischarge.treatment_summary = treatment_summary;
    if (doctor_name) singledischarge.doctor_name = doctor_name;

    await singledischarge.save();
    res.status(200).json(singledischarge);
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: "Failed to update discharge detail", error });
  }
};

const countAllDischarges = async (req, res) => {
    try {
        const allDischarges  = await DischargeModel.find().countDocuments();
        if (!allDischarges) return res.status(404).json({ message: "Failed to fetch Purchase count" });
        res.status(200).json({ allDischarges });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}


module.exports = {
    createDischargeDetails,
    getAllDischargeDetails,
    getDischargeDetailById,
    deleteDischargeDetail,
    updateDischargeDetail,
    countAllDischarges
};