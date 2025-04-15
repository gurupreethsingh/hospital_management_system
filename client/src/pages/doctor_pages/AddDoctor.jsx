import React, { useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaUserGraduate,
  FaBriefcase,
  FaClipboardCheck,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    doctor_name: "",
    specialization: "",
    experience_years: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${globalBackendRoute}/api/add-doctors`, doctor);
      alert("Doctor added successfully!");
      setDoctor({
        doctor_name: "",
        specialization: "",
        experience_years: "",
        qualifications: "",
      });
      navigate("/all-doctors");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("There was an issue adding the doctor.");
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
        value={doctor[name]}
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
          <h2 className="headingText">Add New Doctor</h2>
          <Link to="/all-doctors">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Doctors
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Doctor Name",
            "doctor_name",
            <FaUserMd className="text-green-500" />
          )}
          {renderInput(
            "Specialization",
            "specialization",
            <FaClipboardCheck className="text-blue-500" />
          )}
          {renderInput(
            "Experience (Years)",
            "experience_years",
            <FaBriefcase className="text-yellow-500" />,
            "number"
          )}
          {renderInput(
            "Qualifications",
            "qualifications",
            <FaUserGraduate className="text-indigo-500" />
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
