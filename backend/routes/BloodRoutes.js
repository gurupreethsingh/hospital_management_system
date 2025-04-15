const express = require("express");
const router = express.Router();
const {
  addBlood,
  getAllBloods,
  viewBloodById,
  deleteBlood,
  updateBlood,
  countAllblood,
} = require("../controllers/BloodController.js");

router.post("/create-blood", addBlood);
router.get("/get-all-bloods", getAllBloods);
router.get("/view-blood-by-id/:id", viewBloodById);
router.delete("/delete-blood/:id", deleteBlood);
router.put("/update-blood/:id", updateBlood);
router.get("/count-all-blood", countAllblood);

module.exports = router;
