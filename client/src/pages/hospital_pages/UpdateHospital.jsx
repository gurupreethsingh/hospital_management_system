import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHospitalSymbol,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateHospital() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospital_name: "",
    hospital_address: "",
    hospital_phone: "",
    hospital_email: "",
  });

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-hospital-by-id/${id}`
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching hospital data:", err);
      }
    };
    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${globalBackendRoute}/api/update-hospital/${id}`,
        formData
      );

      alert("Hospital updated successfully!");
      navigate(`/single-hospital/${id}`);
    } catch (err) {
      console.error("Error updating hospital:", err.response || err);
      alert("Failed to update hospital.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="subHeadingTextMobile lg:subHeadingText mb-4">
          Update Hospital
        </h2>

        <EditableField
          label="Hospital Name"
          name="hospital_name"
          value={formData.hospital_name}
          onChange={handleChange}
          icon={<FaHospitalSymbol className="text-green-600" />}
        />
        <EditableField
          label="Address"
          name="hospital_address"
          value={formData.hospital_address}
          onChange={handleChange}
          icon={<FaMapMarkerAlt className="text-blue-600" />}
        />
        <EditableField
          label="Phone"
          name="hospital_phone"
          value={formData.hospital_phone}
          onChange={handleChange}
          icon={<FaPhone className="text-yellow-600" />}
        />
        <EditableField
          label="Email"
          name="hospital_email"
          value={formData.hospital_email}
          onChange={handleChange}
          icon={<FaEnvelope className="text-purple-600" />}
        />

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

function EditableField({ icon, label, name, value, onChange }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="text-sm text-gray-900 border-b border-gray-300 pb-1">
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </dd>
    </div>
  );
}
