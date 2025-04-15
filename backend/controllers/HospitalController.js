
const HospitalModel = require("../models/HospitalModel");
// create functions for user operations. 

// insert hospital 
const createHospital = async (req, res) => {
   try
   {
      // take the input from user. 
      const { hospital_name, hospital_address, hospital_phone, hospital_email  } = req.body;
      // check if the hospital detials. already exist. 
      const existingHospital = await HospitalModel.findOne({ hospital_name });

      if(existingHospital)
      {
        return res.status(400).json({ message: "Hospital Details already exists" });
      }
      else
      {
        // if not present then only insert. 
          // save 
        await HospitalModel.create({
            hospital_name,
            hospital_address,
            hospital_phone,
            hospital_email,
          });
          res.status(201).json({ message: "Hospital details added successfully" });
      }
   }
   catch (error) {
    console.error("Hospital Creation Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// view all the hospital details. 
const viewAllHospitals = async (req, res) => {
    try {
        const allhospitals = await HospitalModel.find();
        if (!allhospitals) return res.status(404).json({ message: "Hospitals not found" });
        res.status(200).json(allhospitals);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}
// view single hospital by id. 
const viewHospitalById = async (req, res) => {
    try {
        const singleHospital = await HospitalModel.findById(req.params.id);
        if (!singleHospital) return res.status(404).json({ message: "Hospitals not found" });
        res.status(200).json(singleHospital);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}
// delete hospital 
const deleteHospital = async (req, res) => {
  try {
    const hospital = await HospitalModel.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" })
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
// update the hospital details.
const updateHospital = async (req, res) => {
  try {
    const {
      hospital_name,
      hospital_email,
      hospital_phone,
      hospital_address,
    } = req.body;


    const singleHospital = await HospitalModel.findById(req.params.id);
    if (!singleHospital) return res.status(404).json({ message: "Hospital not found" });

    if(hospital_name) singleHospital.hospital_name = hospital_name;
    if(hospital_email) singleHospital.hospital_email = hospital_email;
    if(hospital_phone) singleHospital.hospital_phone = hospital_phone;
    if(hospital_address) singleHospital.hospital_address = hospital_address;
    
    await singleHospital.save();
    res.status(200).json(singleHospital);

} catch (error) {
    console.error("Error updating Hospital:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
// to count how many hospitals are there. 
const countAllHospitals = async (req, res) => {
    try {
        const allhospitals = await HospitalModel.find().countDocuments();
        if (!allhospitals) return res.status(404).json({ message: "Failed to fetch Hospital count" });
        res.status(200).json({ allhospitals });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}

module.exports = {
  createHospital,
  viewAllHospitals,
  viewHospitalById,
  deleteHospital,
  updateHospital,
  countAllHospitals, // ✅ ADD THIS
};
