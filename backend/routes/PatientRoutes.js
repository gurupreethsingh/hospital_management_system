const express = require("express");
const router = express.Router();

const {
  createPatients,
  getAllPatients,
  viewPatientById,
  deletePatient,
  updatePatient,
  countAllPatients,
} = require("../controllers/PatientController.js");

router.post("/create-patient", createPatients);
router.get("/get-all-patients", getAllPatients);
router.get("/view-patient-by-id/:id", viewPatientById);
router.delete("/delete-patient/:id", deletePatient);
router.put("/update-patient/:id", updatePatient);
router.get("/count-all-patients", countAllPatients);

module.exports = router;
