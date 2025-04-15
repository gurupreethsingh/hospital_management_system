import React, { useState } from "react";
import axios from "axios";
import {
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddTreatment = () => {
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState({
    treatment_name: "",
    patient_name: "",
    diagnosis: "",
    treatment_cost: "",
    treatment_date: "",
  });

  const handleChange = (e) => {
    setTreatment({ ...treatment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${globalBackendRoute}/api/create-treatment`, treatment);
      alert("Treatment record added successfully!");
      setTreatment({
        treatment_name: "",
        patient_name: "",
        diagnosis: "",
        treatment_cost: "",
        treatment_date: "",
      });
      navigate("/all-treatments");
    } catch (error) {
      console.error("Error adding treatment:", error);
      alert("There was an issue adding the treatment.");
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
        value={treatment[name]}
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
          <h2 className="headingText">Add New Treatment</h2>
          <Link to="/all-treatments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Treatments
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Treatment Name",
            "treatment_name",
            <FaStethoscope className="text-green-500" />
          )}
          {renderInput(
            "Patient Name",
            "patient_name",
            <FaUserInjured className="text-blue-500" />
          )}
          {renderInput(
            "Diagnosis",
            "diagnosis",
            <FaNotesMedical className="text-indigo-500" />
          )}
          {renderInput(
            "Cost",
            "treatment_cost",
            <FaMoneyBillWave className="text-yellow-500" />,
            "number"
          )}
          {renderInput(
            "Date",
            "treatment_date",
            <FaCalendarAlt className="text-purple-500" />,
            "date"
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Treatment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
