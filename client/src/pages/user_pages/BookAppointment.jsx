import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStethoscope,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const BookAppointment = () => {
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    patient_name: "",
    contact_number: "",
    email: "",
    hospital_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, hospitalsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
        ]);
        setAllDoctors(doctorsRes.data);
        setAllHospitals(hospitalsRes.data);
      } catch (error) {
        console.error("Error fetching doctors/hospitals:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = [
      "patient_name",
      "contact_number",
      "hospital_id",
      "doctor_id",
      "appointment_date",
      "appointment_time",
      "reason",
    ];
    const missing = required.filter((key) => !appointment[key]);
    if (missing.length > 0) {
      alert("Missing required fields: " + missing.join(", "));
      return;
    }

    try {
      await axios.post(
        `${globalBackendRoute}/api/book-appointment`,
        appointment
      );
      alert("Appointment booked successfully!");
      setAppointment({
        patient_name: "",
        contact_number: "",
        email: "",
        hospital_id: "",
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });
      navigate("/all-user-appointments");
    } catch (error) {
      console.error("❌ Error booking appointment:", error.message);
      alert("There was an issue booking the appointment.");
    }
  };

  const renderInput = (label, name, icon, type = "text") => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={appointment[name]}
        onChange={handleChange}
        required
        className="formInput w-full sm:w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Book an Appointment</h2>
          <Link to="/all-appointments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Appointments
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Full Name",
            "patient_name",
            <FaUser className="text-blue-500" />
          )}
          {renderInput(
            "Contact Number",
            "contact_number",
            <FaPhone className="text-green-500" />
          )}
          {renderInput(
            "Email",
            "email",
            <FaEnvelope className="text-red-500" />,
            "email"
          )}

          {/* Hospital Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaStethoscope className="text-purple-500" />
              <span className="ml-2">Hospital</span>
            </label>
            <select
              name="hospital_id"
              value={appointment.hospital_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select Hospital</option>
              {allHospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.hospital_name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaStethoscope className="text-purple-500" />
              <span className="ml-2">Doctor</span>
            </label>
            <select
              name="doctor_id"
              value={appointment.doctor_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select Doctor</option>
              {allDoctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.doctor_name}
                </option>
              ))}
            </select>
          </div>

          {renderInput(
            "Appointment Date",
            "appointment_date",
            <FaCalendarAlt className="text-indigo-500" />,
            "date"
          )}
          {renderInput(
            "Appointment Time",
            "appointment_time",
            <FaClock className="text-yellow-500" />,
            "time"
          )}
          {renderInput(
            "Reason for Appointment",
            "reason",
            <FaNotesMedical className="text-pink-500" />
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
