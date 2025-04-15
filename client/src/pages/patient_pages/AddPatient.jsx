import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaRegIdBadge,
  FaTransgender,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddPatient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    patient_name: "",
    age: "",
    gender: "",
    contact_number: "",
    address: "",
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${globalBackendRoute}/api/create-patient`, patient);
      alert("Patient added successfully!");
      setPatient({
        patient_name: "",
        age: "",
        gender: "",
        contact_number: "",
        address: "",
      });
      navigate("/all-patients");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("There was an issue adding the patient.");
    }
  };

  const renderInput = (label, name, icon, type = "text", options = null) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {options ? (
        <select
          name={name}
          value={patient[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={patient[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Patient</h2>
          <Link to="/all-patients">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Patients
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Patient Name",
            "patient_name",
            <FaUser className="text-blue-500" />
          )}
          {renderInput(
            "Age",
            "age",
            <FaRegIdBadge className="text-green-500" />,
            "number"
          )}
          {renderInput(
            "Gender",
            "gender",
            <FaTransgender className="text-pink-500" />,
            "text",
            ["Male", "Female", "Other"]
          )}
          {renderInput(
            "Contact Number",
            "contact_number",
            <FaPhoneAlt className="text-purple-500" />
          )}
          {renderInput(
            "Address",
            "address",
            <FaMapMarkerAlt className="text-yellow-600" />
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
