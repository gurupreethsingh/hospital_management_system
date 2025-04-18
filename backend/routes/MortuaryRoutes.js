const express = require("express");
const router = express.Router();
const MortuaryController = require("../controllers/MortuaryController");

router.post("/add-mortuary", MortuaryController.createMortuary);
router.get("/get-all-mortuary", MortuaryController.getAllMortuary);
router.get("/get-mortuary/:id", MortuaryController.getMortuaryById);
router.put("/update-mortuary/:id", MortuaryController.updateMortuary);
router.delete("/delete-mortuary/:id", MortuaryController.deleteMortuary);
router.get("/count-all-mortuary", MortuaryController.countAllMortuary);

module.exports = router;
