import React, { useState } from "react";
import axios from "axios";
import {
  FaHospitalSymbol,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddHospital = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    hospital_name: "",
    hospital_address: "",
    hospital_phone: "",
    hospital_email: "",
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${globalBackendRoute}/api/add-hospital`, hospital);
      alert("Hospital added successfully!");
      setHospital({
        hospital_name: "",
        hospital_address: "",
        hospital_phone: "",
        hospital_email: "",
      });
      navigate("/all-hospitals");
    } catch (error) {
      console.error("Error adding hospital:", error);
      alert("There was an issue adding the hospital.");
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
        value={hospital[name]}
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Hospital</h2>
          <Link to="/all-hospitals">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Hospitals
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Hospital Name",
            "hospital_name",
            <FaHospitalSymbol className="text-green-500" />
          )}
          {renderInput(
            "Address",
            "hospital_address",
            <FaMapMarkerAlt className="text-blue-500" />
          )}
          {renderInput(
            "Phone",
            "hospital_phone",
            <FaPhone className="text-green-500" />
          )}
          {renderInput(
            "Email",
            "hospital_email",
            <FaEnvelope className="text-indigo-500" />,
            "email"
          )}

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
