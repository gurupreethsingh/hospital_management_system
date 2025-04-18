import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHospital,
  FaUserMd,
  FaClock,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateAppointmentSuperadmin() {
  const { id } = useParams();
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
    status: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, hospitalRes, doctorRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/view-appointment-by-id/${id}`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        const data = res.data;
        setAppointment({
          ...data,
          hospital_id: data.hospital_id?._id || data.hospital_id,
          doctor_id: data.doctor_id?._id || data.doctor_id,
        });
        setHospitals(hospitalRes.data);
        setDoctors(doctorRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-appointment/${id}`,
        appointment
      );
      alert("Appointment updated successfully!");
      navigate(`/single-appointment-superadmin/${id}`);
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert("Failed to update appointment.");
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
        value={appointment[name] || ""}
        onChange={handleChange}
        required={name !== "email"}
        className="formInput w-full sm:w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Appointment</h2>
          <Link to="/all-appointments-superadmin">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Appointments
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput("Patient Name", "patient_name", <FaUser />)}
          {renderInput("Contact Number", "contact_number", <FaPhone />)}
          {renderInput("Email", "email", <FaEnvelope />)}

          {/* Doctor Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserMd className="text-blue-500" />
              <span className="ml-2">Doctor</span>
            </label>
            <select
              name="doctor_id"
              value={appointment.doctor_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.doctor_name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaHospital className="text-green-500" />
              <span className="ml-2">Hospital</span>
            </label>
            <select
              name="hospital_id"
              value={appointment.hospital_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select hospital</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.hospital_name}
                </option>
              ))}
            </select>
          </div>

          {renderInput(
            "Appointment Date",
            "appointment_date",
            <FaCalendarAlt />,
            "date"
          )}
          {renderInput(
            "Appointment Time",
            "appointment_time",
            <FaClock />,
            "time"
          )}
          {renderInput("Reason", "reason", <FaClipboardList />)}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
