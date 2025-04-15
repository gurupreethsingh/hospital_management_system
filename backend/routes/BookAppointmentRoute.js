const express = require("express");

const  router = express.Router();


const BookAppointment = require("../models/BookAppointmentModel");


const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
    updateAppointment,
    countAllBookAppointments
} = require('../controllers/BookAppointmentController');


router.post("/create-Appointment",createAppointment);
router.get("/view-all-Appointments",getAllAppointments);
router.get("/view-Appointment-by-id",getAppointmentById);
router.delete("/delete-Appointment",deleteAppointment);
router.put("/update-Appointment",updateAppointment);
router.get("/count-all-bookappointments",countAllBookAppointments);



module.exports = router;