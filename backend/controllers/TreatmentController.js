const TreatmentModel = require("../models/TreatmentModel")


const createTreatment = async (req,res) =>{
    try{
    const {treatment_name, description,cost} = req.body;
    
    await TreatmentModel.create({
        treatment_name, 
        description,
        cost,
    });
    res.status(201).json({ message: "Treatment details added successfully" });

    } catch (error) {
        console.error("Treatment details Creation Error:", error.message);
        res.status(500).json({ message: "Server error" });
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
      cost
    } = req.body;


    const singleTreatment = await TreatmentModel.findById(req.params.id);
    if (!singleTreatment) return res.status(404).json({ message: "Treatment details not found" });

    if(treatment_name) singleTreatment.treatment_name = treatment_name;
    if(description) singleTreatment.description = description;
    
    await singleTreatment.save();
    res.status(200).json(singleTreatment);

} catch (error) {
    console.error("Error updating Treatment:", error.message);
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