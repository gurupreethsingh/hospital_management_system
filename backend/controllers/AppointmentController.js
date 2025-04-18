const Appointment = require("../models/AppointmentModel");

// Create new appointment
const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("Booking Error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to book appointment", error: err.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "hospital_id doctor_id"
    );
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Get single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "hospital_id doctor_id"
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch appointment" });
  }
};

// Approve appointment
const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Completed";
    await appointment.save();
    res.status(200).json({ message: "Appointment approved", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve appointment" });
  }
};

// Reject appointment
const rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Cancelled";
    await appointment.save();
    res.status(200).json({ message: "Appointment rejected", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject appointment" });
  }
};

// Reschedule appointment
const rescheduleAppointment = async (req, res) => {
  try {
    const { appointment_date, appointment_time } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.appointment_date = appointment_date;
    appointment.appointment_time = appointment_time;
    appointment.status = "Scheduled";
    await appointment.save();

    res.status(200).json({ message: "Appointment rescheduled", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to reschedule appointment" });
  }
};

// Update appointment details (general edit)
const updateAppointmentDetails = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};

// Count all appointments
const countAllAppointments = async (req, res) => {
  try {
    const count = await Appointment.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to count appointments" });
  }
};

// Count appointments for a specific doctor
const countAppointmentsByDoctor = async (req, res) => {
  try {
    const count = await Appointment.countDocuments({
      doctor_id: req.params.doctorId,
    });
    res.status(200).json({ doctorId: req.params.doctorId, count });
  } catch (err) {
    res.status(500).json({ message: "Failed to count doctor appointments" });
  }
};

// Get all appointments booked by a user (by contact_number or email)
const getAppointmentsByUser = async (req, res) => {
  try {
    const { contact_number, email } = req.query;

    if (!contact_number && !email) {
      return res.status(400).json({
        message: "Provide contact_number or email to fetch appointments",
      });
    }

    const query = {};
    if (contact_number) query.contact_number = contact_number;
    if (email) query.email = email;

    const appointments = await Appointment.find(query).populate(
      "hospital_id doctor_id"
    );
    res.status(200).json(appointments);
  } catch (err) {
    console.error("User Appointments Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch user appointments" });
  }
};
// Superadmin: Get all appointments with full details
const getAllAppointmentsForSuperadmin = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "hospital_id doctor_id"
    );
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Superadmin Fetch Error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch appointments for superadmin" });
  }
};

// Get all appointments for a specific doctor by doctor_id
const getAppointmentsForDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    if (!doctor_id) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const appointments = await Appointment.find({ doctor_id }).populate(
      "hospital_id doctor_id"
    );
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Doctor Appointments Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch doctor appointments" });
  }
};

module.exports = {
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
};
