import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaHospital,
  FaBaby,
  FaPhone,
  FaUserMd,
  FaVenusMars,
  FaBed,
  FaCalendarAlt, // ✅ Import actual calendar icon
} from "react-icons/fa";

import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddPediatric = () => {
  const navigate = useNavigate();
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [pediatric, setPediatric] = useState({
    child_name: "",
    date_of_birth: "",
    gender: "",
    ward_number: "",
    hospital_id: "",
    doctor_id: "",
    mother_name: "",
    father_name: "",
    parent_contact: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const hospitals = await axios.get(
          `${globalBackendRoute}/api/get-all-hospitals`
        );
        const doctors = await axios.get(
          `${globalBackendRoute}/api/get-all-doctors`
        );
        setAllHospitals(hospitals.data);
        setAllDoctors(doctors.data);
      } catch (error) {
        console.error("Error fetching hospitals or doctors:", error);
      }
    };
    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setPediatric({ ...pediatric, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${globalBackendRoute}/api/add-pediatric`, pediatric);
      alert("Pediatric record added successfully!");
      setPediatric({
        child_name: "",
        date_of_birth: "",
        gender: "",
        ward_number: "",
        hospital_id: "",
        doctor_id: "",
        mother_name: "",
        father_name: "",
        parent_contact: "",
      });
      navigate("/all-pediatrics");
    } catch (error) {
      console.error("Error adding pediatric record:", error);
      alert("There was an issue adding the pediatric record.");
    }
  };

  const renderInput = (
    label,
    name,
    icon,
    type = "text",
    isSelect = false,
    options = []
  ) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {isSelect ? (
        <select
          name={name}
          value={pediatric[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt._id || opt} value={opt._id || opt}>
              {opt.hospital_name || opt.doctor_name || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={pediatric[name]}
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
          <h2 className="headingText">Add Pediatric Record</h2>
          <Link to="/all-pediatrics">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Pediatrics
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Child Name",
            "child_name",
            <FaBaby className="text-pink-500" />
          )}
          {renderInput(
            "Date of Birth",
            "date_of_birth",
            <FaCalendarAlt />,
            "date"
          )}
          {renderInput(
            "Gender",
            "gender",
            <FaVenusMars className="text-purple-500" />,
            "text",
            true,
            ["Male", "Female", "Other"]
          )}
          {renderInput(
            "Ward Number",
            "ward_number",
            <FaBed className="text-gray-600" />
          )}
          {renderInput(
            "Hospital",
            "hospital_id",
            <FaHospital className="text-red-500" />,
            "text",
            true,
            allHospitals
          )}
          {renderInput(
            "Doctor",
            "doctor_id",
            <FaUserMd className="text-green-500" />,
            "text",
            true,
            allDoctors
          )}
          {renderInput(
            "Mother Name",
            "mother_name",
            <FaUser className="text-indigo-600" />
          )}
          {renderInput(
            "Father Name",
            "father_name",
            <FaUser className="text-blue-600" />
          )}
          {renderInput(
            "Parent Contact",
            "parent_contact",
            <FaPhone className="text-green-600" />,
            "tel"
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Pediatric
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dummy icon to replace missing import
const FaCalendarIcon = () => <FaCalendarIcon className="text-orange-500" />;

export default AddPediatric;
