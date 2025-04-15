const express = require("express");
const router = express.Router();

const {   createMedicine, getAllMedicines,  viewMedicineById  , deleteMedicine ,updateMedicine , countAllmedicines  } = require("../controllers/MedicineController.js");

router.post("/create-medicine", createMedicine);
router.get("/get-all-medicines", getAllMedicines);
router.get("/view-medicine-by-id", viewMedicineById);
router.delete("/delete-medicine", deleteMedicine);
router.put("/update-medicine" , updateMedicine);
router.get("/count-all-medicine" , countAllmedicines);


module.exports = router;