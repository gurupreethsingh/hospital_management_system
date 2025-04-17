const express = require("express");
const router = express.Router();
const PediatricController = require("../controllers/PediatricController");

router.post("/add-pediatric", PediatricController.addPediatric);
router.put("/update-pediatric/:id", PediatricController.updateWardOrDoctor);
router.put("/add-treatment/:id", PediatricController.addTreatmentEntry);
router.get("/get-pediatric/:id", PediatricController.getPediatricById);
router.get("/search-parent", PediatricController.searchByParentInfo);

module.exports = router;
