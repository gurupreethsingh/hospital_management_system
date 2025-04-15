const BookAppointment =require("../models/BookAppointmentModel");



const createAppointment = async (req,res) =>{
    try{
    const {patient_name,doctor_name,appointment_date,appointment_time,reason_for_visit} = req.body;

    const existingAppointment = await BookAppointment.findOne({patient_name });
    if(existingAppointment)
        {
          return res.status(400).json({ message: "already exists Appointment" });
        }
    
    await BookAppointment.create({
        patient_name,
        doctor_name,
        appointment_date,
        appointment_time,
        reason_for_visit

    });
    res.status(201).json({ message: "Appointment Booked  successfully" });

    } catch (error) {
        console.error("Failed to create Appointment:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};



const getAllAppointments = async (req, res) => {
    try {
      const allappointments = await BookAppointment.find()
      if(!allappointments) return res.status(404).json({message:"Appointments not found"})
      res.status(200).json(allappointments);
    } catch (error) {
        console.error("Fetch Error:", error.message);
      res.status(500).json({ message: "Failed to fetch appointments", error });
    }
  };


// Get single appointment by ID
const getAppointmentById = async (req, res) => {
    try {
      const singleappointment = await BookAppointment.findById(req.params.id)
      if (!singleappointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      res.status(200).json(singleappointment);
    } catch (error) {
        console.error("Fetch Error:", error.message);
      res.status(500).json({ message: "Error fetching appointment", error });
    }
  };

// Delete appointment
const deleteAppointment = async (req, res) => {
    try {
      const Appointment = await BookAppointment.findByIdAndDelete(req.params.id);
  
      if (!Appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        console.error("Delete Error:", error.message);
      res.status(500).json({ message: "Failed to delete appointment", error });
    }
  };

// Update appointment
const updateAppointment = async (req, res) => {
    try {
        const{    patient_name,
            doctor_name,
            appointment_date,
            appointment_time,
            reason_for_visit}= req.body;
      const appointment = await BookAppointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if(patient_name) appointment.patient_name = patient_name;
    if(doctor_name) appointment.doctor_name = doctor_name;
    if(appointment_date) appointment.appointment_date = appointment_date;
    if(appointment_time) appointment.appointment_time = appointment_time;
  
    await appointment.save();
    res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment", error });
    }
  };


const countAllBookAppointments = async (req, res) => {
    try {
        const allBookAppointments = await BookAppointment.find().countDocuments();
        if (!allBookAppointments ) return res.status(404).json({ message: "Failed to fetch Treatment count" });
        res.status(200).json({ allBookAppointments  });
      } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
}


module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
    updateAppointment,
    countAllBookAppointments
};