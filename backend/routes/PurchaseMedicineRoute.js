const express = require("express");
const router = express.Router();


const {
    createPurchaseMedicine,
    getAllPurchaseMedicines,
    getPurchaseMedicineById,
    updatePurchaseMedicine,
    deletePurchaseMedicine,
    countAllPurchaseMedicine
  } = require("../controllers/PurchaseMedicineController");


router.post("/ctreat-purchasem-medicine",createPurchaseMedicine);
router.get("/get-all-purchase-medicine", getAllPurchaseMedicines);
router.get("/view-purchase-medicine-by-id", getPurchaseMedicineById);
router.put("/update-Purchase-medicine", updatePurchaseMedicine);
router.delete("/delete-purchase-medicine", deletePurchaseMedicine);
router.get("/count-all-PurchaseMedicie",countAllPurchaseMedicine);

module.exports = router;