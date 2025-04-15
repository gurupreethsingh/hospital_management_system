const express = require("express");
const router = express.Router();
const {
  addHospital,
  viewAllHospitals,
  viewHospitalById,
  deleteHospital,
  updateHospital,
  countAllHospitals,
} = require("../controllers/HospitalController");

router.post("/add-hospital", addHospital);
router.get("/view-all-hospitals", viewAllHospitals);
router.get("/view-hospital-by-id/:id", viewHospitalById);
router.delete("/delete-hospital/:id", deleteHospital);
router.put("/update-hospital/:id", updateHospital);
router.get("/count-all-hospitals", countAllHospitals);

module.exports = router;
