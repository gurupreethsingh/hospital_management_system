const PatientModel = require("../models/PatientModel");

const createPatients= async (req,res) => {
    try
    { 
         const{patient_name,
         age,
         gender,
         contact_number,
         address}=req.body;
         const existingpatient= await PatientModel.findOne({patient_name});
         if(existingpatient) return res.status(400).json({message:"Patient detail exists"});
         else
         {
          await PatientModel.create({patient_name,age,gender,contact_number,address})
          res.status(201).json({message:"Error"});
         }
    }
    catch
    {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "Server error" });
    }    
}

const getAllPatients = async (req, res) => {
  try {
    const allPatients = await PatientModel.find();
    if(!allPatients) return res.status(400).json({message : "Patients details not found."})
    res.status(200).json(allPatients);
  } catch (err) {
    console.error("Fetch All Patients Error:", err.message);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

const viewPatientById = async (req, res) => {
    try {
        const singlepatient = await PatientModel.findById(req.params.id);
        if (!singlepatient) return res.status(404).json({ message: "Patients not found" });
        res.status(200).json(singlepatient);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

const deletePatient = async (req, res) => {
    try {
      const patient = await PatientModel.findByIdAndDelete(req.params.id);
      if (!patient) return res.status(404).json({ message: "Patient not found" })
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (err) {
      console.error("Delete Error:", err.message);
      res.status(500).json({ message: "Failed to delete user" });
    }
  };


const updatePatient = async (req, res) => {
  try {
    const {
        patient_name,
        age,
        gender,
        contact_number,
        address
    } = req.body;

    const singlepatient = await PatientModel.findById(req.params.id);
    if (!singlepatient) return res.status(404).json({ message: "Patient not found" });
    if(patient_name) singlepatient.patient_name = patient_name;
    if(age) singlepatient.age = age;
    if(gender) singlepatient.gender = gender;
    if(contact_number) singlepatient.contact_number = contact_number;
    if(address) singlepatient.address = address;  
    await singlepatient.save();
    res.status(200).json(singlepatient);

} catch (error) {
    console.error("Error updating patient:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
// to count how many doctors are there. 
const countAllPatients = async (req, res) => {
    try {
        const allpatients = await PatientModel.find().countDocuments();
        if (!allpatients) return res.status(404).json({ message: "Failed to fetch Patient count" });
        res.status(200).json({ allpatients });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
    createPatients, getAllPatients, viewPatientById  , deletePatient ,updatePatient , countAllPatients
  };
