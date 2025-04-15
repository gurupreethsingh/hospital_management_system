const express = require("express");
const router = express.Router();

                          

const {   createHospital, viewAllHospitals, viewHospitalById  , deleteHospital ,updateHospital , countAllHospitals  } = require("../controllers/HospitalController");

router.post("/create-hospital", createHospital);
router.get("/view-all-hospitals", viewAllHospitals);
router.get("/view-hospital-by-id", viewHospitalById);
router.delete("/delete-hospital", deleteHospital);
router.put("/update-hospital" , updateHospital);
router.get("/count-all-hospitals" , countAllHospitals);


module.exports = router;





