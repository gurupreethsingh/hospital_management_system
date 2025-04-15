const express = require("express");
const router = express.Router();

const Doctor = require("../models/DoctorModel.js");

const {   createdoctors, getAllDoctors, viewDoctorById  , deleteDoctor ,updatedoctor , countAllDoctors } = require("../controllers/DoctorController.js");

router.post("/create-doctors", createdoctors);
router.get("/view-all-doctors", getAllDoctors);
router.get("/view-doctor-by-id", viewDoctorById);
router.delete("/delete-doctor", deleteDoctor);
router.put("/update-doctor" , updatedoctor);
router.get("/count-all-doctors" , countAllDoctors);


module.exports = router;