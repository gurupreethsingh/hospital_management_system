const express = require("express");


const  router = express.Router();

const Treatment = require("../models/TreatmentModel");


const {
    createTreatment,viewAllTreatments,viewTreatmentById ,deleteTreatment, updateTreatment,countAllTreatments
} = require("../controllers/TreatmentController")



router.post("/create-treatment",createTreatment);
router.get("/view-all-treatments",viewAllTreatments);
router.get("/view-treatment-by-id",viewTreatmentById);
router.delete("/delete-treatment",deleteTreatment);
router.put("/update-Treatment",updateTreatment);
router.get("/count-all-Treatment",countAllTreatments);


module.exports = router;

