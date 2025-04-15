import React, { useEffect, useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateBlood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blood_group: "",
    donor_name: "",
    contact_number: "",
    quantity_in_units: "",
    last_donation_date: "",
    location: "",
  });

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-blood-by-id/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error fetching:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${globalBackendRoute}/api/update-blood/${id}`, formData);
      alert("Blood record updated successfully!");
      navigate(`/single-blood/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update.");
    }
  };

  const renderField = (label, name, icon, type = "text") => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className="w-full text-sm border-b border-gray-300 bg-transparent focus:outline-none"
        />
      </dd>
    </div>
  );

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="subHeadingTextMobile lg:subHeadingText mb-4">
          Update Blood Record
        </h2>
        {renderField(
          "Blood Group",
          "blood_group",
          <FaTint className="text-red-600" />
        )}
        {renderField(
          "Donor Name",
          "donor_name",
          <FaUser className="text-green-600" />
        )}
        {renderField(
          "Contact",
          "contact_number",
          <FaPhone className="text-blue-600" />
        )}
        {renderField(
          "Units",
          "quantity_in_units",
          <FaBalanceScale className="text-yellow-600" />,
          "number"
        )}
        {renderField(
          "Last Donation",
          "last_donation_date",
          <FaCalendarAlt className="text-indigo-600" />,
          "date"
        )}
        {renderField(
          "Location",
          "location",
          <FaMapMarkerAlt className="text-purple-600" />
        )}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"
          >
            <MdSave /> Save
          </button>
        </div>
      </form>
    </div>
  );
}
