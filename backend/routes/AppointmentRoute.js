const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  approveAppointment,
  rejectAppointment,
  rescheduleAppointment,
  updateAppointmentDetails,
  deleteAppointment,
  countAllAppointments,
  countAppointmentsByDoctor,
  getAppointmentsByUser,
  getAllAppointmentsForSuperadmin,
  getAppointmentsForDoctor,
} = require("../controllers/AppointmentController");

router.get("/appointments-by-doctor/:doctor_id", getAppointmentsForDoctor);

// ✅ Book a new appointment
router.post("/book-appointment", bookAppointment);

// ✅ View all appointments
router.get("/view-all-appointments", getAllAppointments);

// ✅ View single appointment by ID
router.get("/view-appointment-by-id/:id", getAppointmentById);

// ✅ Approve appointment (mark as Completed)
router.put("/approve-appointment/:id", approveAppointment);

// ✅ Reject appointment (mark as Cancelled)
router.put("/reject-appointment/:id", rejectAppointment);

// ✅ Reschedule appointment (change date/time, keep as Scheduled)
router.put("/reschedule-appointment/:id", rescheduleAppointment);

// ✅ Update appointment (full detail update)
router.put("/update-appointment/:id", updateAppointmentDetails);

// ✅ Delete an appointment
router.delete("/delete-appointment/:id", deleteAppointment);

// ✅ Count all appointments
router.get("/count-all-appointments", countAllAppointments);

// ✅ Count appointments by doctor
router.get(
  "/count-appointments-by-doctor/:doctorId",
  countAppointmentsByDoctor
);

// Get all appointments by user (via contact number or email)
router.get("/user-appointments", getAppointmentsByUser);

// ✅ Superadmin fetch all appointments
router.get("/superadmin-all-appointments", getAllAppointmentsForSuperadmin);

module.exports = router;
