const express = require("express");
const router = express.Router();

const Doctor = require("../models/DoctorModel.js");

const {
  adddoctors,
  getAllDoctors,
  viewDoctorById,
  deleteDoctor,
  updatedoctor,
  countAllDoctors,
} = require("../controllers/DoctorController.js");

router.post("/add-doctors", adddoctors);
router.get("/view-all-doctors", getAllDoctors);
router.get("/view-doctor-by-id/:id", viewDoctorById);
router.delete("/delete-doctor/:id", deleteDoctor);
router.put("/update-doctor/:id", updatedoctor);
router.get("/count-all-doctors", countAllDoctors);

module.exports = router;
