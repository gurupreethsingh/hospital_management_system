const express = require("express");
const router = express.Router();

const {
  createDischargeDetails,
  getAllDischargeDetails,
  getDischargeDetailById,
  deleteDischargeDetail,
  updateDischargeDetail,
  countAllDischarges
} = require("../controllers/DischargeController");

// Create new discharge entry
router.post("/create-discharge", createDischargeDetails);

// View all discharges
router.get("/view-all-discharges", getAllDischargeDetails);

// View single discharge by ID
router.get("/view-discharge-by-id/:id", getDischargeDetailById);

// Delete discharge by ID
router.delete("/delete-discharge/:id", deleteDischargeDetail);

// Update discharge by ID
router.put("/update-discharge/:id", updateDischargeDetail);

router.get("/count-all-discharges",countAllDischarges)

module.exports = router;
