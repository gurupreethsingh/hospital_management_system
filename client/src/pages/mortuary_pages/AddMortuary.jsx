import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaVenusMars,
  FaRegIdBadge,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHospital,
  FaUserMd,
  FaCross,
  FaClock,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddMortuary = () => {
  const navigate = useNavigate();
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [mortuary, setMortuary] = useState({
    deceased_name: "",
    age: "",
    gender: "",
    date_of_death: "",
    time_of_death: "",
    cause_of_death: "",
    hospital_id: "",
    doctor_id: "",
    ward_number: "",
    body_received_by: "",
    relation_to_deceased: "",
    contact_number: "",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [hospitals, doctors] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        setAllHospitals(hospitals.data);
        setAllDoctors(doctors.data);
      } catch (error) {
        console.error("Error fetching hospital/doctor data:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setMortuary({ ...mortuary, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${globalBackendRoute}/api/add-mortuary`, mortuary);
      alert("Mortuary record added successfully!");
      setMortuary({
        deceased_name: "",
        age: "",
        gender: "",
        date_of_death: "",
        time_of_death: "",
        cause_of_death: "",
        hospital_id: "",
        doctor_id: "",
        ward_number: "",
        body_received_by: "",
        relation_to_deceased: "",
        contact_number: "",
      });
      navigate("/all-mortuary");
    } catch (error) {
      console.error("Error adding mortuary record:", error);
      alert("There was an issue adding the record.");
    }
  };

  const renderInput = (
    label,
    name,
    icon,
    type = "text",
    options = null,
    placeholder = ""
  ) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {options ? (
        <select
          name={name}
          value={mortuary[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option._id} value={option._id}>
                {option.hospital_name || option.doctor_name}
              </option>
            )
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={mortuary[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add Mortuary Record</h2>
          <Link to="/all-mortuary">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Records
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Deceased Name",
            "deceased_name",
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
            <FaVenusMars className="text-pink-500" />,
            "text",
            ["Male", "Female", "Other"]
          )}
          {renderInput(
            "Date of Death",
            "date_of_death",
            <FaCross className="text-red-600" />,
            "date"
          )}
          {renderInput(
            "Time of Death",
            "time_of_death",
            <FaClock className="text-gray-500" />,
            "time"
          )}
          {renderInput(
            "Cause of Death",
            "cause_of_death",
            <FaCross className="text-red-500" />
          )}
          {renderInput(
            "Hospital",
            "hospital_id",
            <FaHospital className="text-red-500" />,
            "text",
            allHospitals
          )}
          {renderInput(
            "Doctor",
            "doctor_id",
            <FaUserMd className="text-green-500" />,
            "text",
            allDoctors
          )}
          {renderInput(
            "Ward Number",
            "ward_number",
            <FaMapMarkerAlt className="text-yellow-600" />
          )}
          {renderInput(
            "Body Received By",
            "body_received_by",
            <FaUser className="text-blue-600" />
          )}
          {renderInput(
            "Relation to Deceased",
            "relation_to_deceased",
            <FaUser className="text-purple-600" />
          )}
          {renderInput(
            "Contact Number",
            "contact_number",
            <FaPhoneAlt className="text-teal-500" />,
            "tel"
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMortuary;
