import React, { useState } from "react";
import axios from "axios";
import {
  FaTint,
  FaUser,
  FaPhone,
  FaBalanceScale,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddBlood = () => {
  const navigate = useNavigate();
  const [blood, setBlood] = useState({
    blood_group: "",
    donor_name: "",
    contact_number: "",
    quantity_in_units: "",
    last_donation_date: "",
    location: "",
  });

  const handleChange = (e) => {
    setBlood({ ...blood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${globalBackendRoute}/api/create-blood`, blood);
      alert("Blood details added successfully!");
      setBlood({
        blood_group: "",
        donor_name: "",
        contact_number: "",
        quantity_in_units: "",
        last_donation_date: "",
        location: "",
      });
      navigate("/all-bloods");
    } catch (error) {
      console.error("Error adding blood:", error);
      alert("There was an issue adding the blood.");
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
        value={blood[name]}
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
          <h2 className="headingText">Add New Blood Group</h2>
          <Link to="/all-bloods">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Blood
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Blood Group",
            "blood_group",
            <FaTint className="text-red-500" />
          )}
          {renderInput(
            "Donor Name",
            "donor_name",
            <FaUser className="text-green-500" />
          )}
          {renderInput(
            "Contact Number",
            "contact_number",
            <FaPhone className="text-blue-500" />
          )}
          {renderInput(
            "Quantity (Units)",
            "quantity_in_units",
            <FaBalanceScale className="text-yellow-500" />,
            "number"
          )}
          {renderInput(
            "Last Donation Date",
            "last_donation_date",
            <FaCalendarAlt className="text-indigo-500" />,
            "date"
          )}
          {renderInput(
            "Location",
            "location",
            <FaMapMarkerAlt className="text-purple-500" />
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Blood
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlood;
