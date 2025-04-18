const express = require("express");
const router = express.Router();
const PediatricController = require("../controllers/PediatricController");

router.post("/add-pediatric", PediatricController.addPediatric);
router.get("/get-all-pediatrics", PediatricController.getAllPediatrics);
router.get("/get-pediatric/:id", PediatricController.getPediatricById);
router.put("/update-pediatric/:id", PediatricController.updatePediatric);
router.delete("/delete-pediatric/:id", PediatricController.deletePediatric);
router.put("/add-treatment/:id", PediatricController.addTreatmentEntry);
router.get("/count-all-pediatrics", PediatricController.countAllPediatrics);

module.exports = router;
