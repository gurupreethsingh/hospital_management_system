const DoctorModel = require("../models/DoctorModel");

const createdoctors=async(req,res) =>
{
    try
    {
        const{doctor_name,
        specialization,
        experience_years,
        qualifications,
        }=req.body;
        const existingdoctor=await user.findone({doctor_name});
        if(existingdoctor)
        {
            return res.status(400).json({message:"Doctor details exists"});
        }
        else
        {
            await DoctorModel.create({doctor_name,specialization,experience_years,qualifications})
        
        res.status(201).json({message:"Error"});
    }
}
    catch
    {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "Server error" });
    }
};


const getAllDoctors=async (req,res) => {

    try {
        const alldoctors = await DoctorModel.find();
        if (!alldoctors) return res.status(404).json({ message: "Doctorss not found" });
        res.status(200).json(alldoctors);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

const viewDoctorById = async (req, res) => {
    try {
        const singledoctor = await DoctorModel.findById(req.params.id);
        if (!singledoctor) return res.status(404).json({ message: "Doctors not found" });
        res.status(200).json(singledoctor);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

const deleteDoctor = async (req, res) => {
    try {
      const doctor = await DoctorModel.findByIdAndDelete(req.params.id);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" })
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
      console.error("Delete Error:", err.message);
      res.status(500).json({ message: "Failed to delete user" });
    }
  };

const updatedoctor = async (req, res) => {
  try {
    const {
      doctor_name,
      specialization,
      experience_years,
      qualifications,
    } = req.body;


    const singledoctor = await DoctorModel.findById(req.params.id);
    if (!singledoctor) return res.status(404).json({ message: "Doctor not found" });

    if(doctor_name) singledoctor.doctor_name = doctor_name;
    if(specialization) singledoctor.specialization = specialization;
    if(experience_years) singledoctor.experience_years = experience_years;
    if(qualifications) singledoctor.qualifications = qualifications;
    
    await singledoctor.save();
    res.status(200).json(singledoctor);

} catch (error) {
    console.error("Error updating Doctor:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// to count how many doctors are there. 
const countAllDoctors = async (req, res) => {
    try {
        const alldoctors = await DoctorModel.find().countDocuments();
        if (!alldoctors) return res.status(404).json({ message: "Failed to fetch Doctor count" });
        res.status(200).json({ alldoctors });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
    createdoctors, getAllDoctors, viewDoctorById  , deleteDoctor ,updatedoctor , countAllDoctors
  };