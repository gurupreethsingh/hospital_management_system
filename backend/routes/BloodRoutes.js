const express = require("express");
const router = express.Router();
const Blood = require("../models/BloodModel.js");
const {  createblood, getAllBloods, viewBloodById  , deleteblood ,updateblood , countAllblood  } = require("../controllers/BloodController.js");

router.post("/create-blood", createblood);
router.get("/get-all-bloods", getAllBloods);
router.get("/view-blood-by-id", viewBloodById);
router.get("/get-all-bloods", getAllBloods);
router.delete("/delete-blood", deleteblood);
router.put("/update-blood" , updateblood);
router.get("/count-all-blood" , countAllblood);

module.exports = router;