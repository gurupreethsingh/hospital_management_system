
const express = require("express");

const  router = express.Router();


const{
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
    countAllPurchase
  } = require('../controllers/PurchaseControllers');


router.post("/create-Purchase",createPurchase);
router.get("/view-all-AllPurchases",getAllPurchases);
router.get("/view-purchase-by-id",getPurchaseById);
router.delete("/delete-Purchase",deletePurchase);
router.put("/update-Purchase",updatePurchase);
router.get("/count-all-purchase", countAllPurchase);



module.exports = router;