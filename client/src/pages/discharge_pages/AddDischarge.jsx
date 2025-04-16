import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaHospital,
  FaCalendarAlt,
  FaClipboardList,
  FaFileMedicalAlt,
  FaUserMd,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddDischarge = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();

  const [discharge, setDischarge] = useState({
    patient_name: "",
    patient_id: "",
    hospital_id: "",
    discharge_date: "",
    reason_for_discharge: "",
    treatment_summary: "",
    doctor_name: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [patientsRes, hospitalsRes, doctorsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-all-patients`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        setAllPatients(patientsRes.data);
        setAllHospitals(hospitalsRes.data);
        setAllDoctors(doctorsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setDischarge({ ...discharge, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["patient_id", "hospital_id"];
    const missing = required.filter((key) => !discharge[key]);
    if (missing.length > 0) {
      alert("Missing required fields: " + missing.join(", "));
      return;
    }

    try {
      await axios.post(`${globalBackendRoute}/api/create-discharge`, discharge);
      alert("Discharge record added successfully!");
      setDischarge({
        patient_name: "",
        patient_id: "",
        hospital_id: "",
        discharge_date: "",
        reason_for_discharge: "",
        treatment_summary: "",
        doctor_name: "",
      });
      navigate("/all-discharges");
    } catch (error) {
      console.error("❌ Error adding discharge:", error);
      alert("There was an issue adding the discharge record.");
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
        value={discharge[name]}
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
          <h2 className="headingText">Add Discharge Details</h2>
          <Link to="/all-discharges">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Discharges
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserInjured className="text-blue-500" />
              <span className="ml-2">Patient</span>
            </label>
            <select
              name="patient_id"
              value={discharge.patient_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select patient</option>
              {allPatients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.patient_name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaHospital className="text-red-500" />
              <span className="ml-2">Hospital</span>
            </label>
            <select
              name="hospital_id"
              value={discharge.hospital_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select hospital</option>
              {allHospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          {/* Discharge Date */}
          {renderInput(
            "Discharge Date",
            "discharge_date",
            <FaCalendarAlt className="text-purple-500" />,
            "date"
          )}

          {/* Reason for Discharge */}
          {renderInput(
            "Reason for Discharge",
            "reason_for_discharge",
            <FaClipboardList className="text-indigo-500" />
          )}

          {/* Treatment Summary */}
          {renderInput(
            "Treatment Summary",
            "treatment_summary",
            <FaFileMedicalAlt className="text-yellow-500" />
          )}

          {/* Doctor Dropdown (was input before) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserMd className="text-green-500" />
              <span className="ml-2">Doctor</span>
            </label>
            <select
              name="doctor_name"
              value={discharge.doctor_name}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select doctor</option>
              {allDoctors.map((doc) => (
                <option key={doc._id} value={doc.doctor_name}>
                  {doc.doctor_name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Discharge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDischarge;
