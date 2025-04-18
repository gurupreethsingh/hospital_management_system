import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
  FaUserClock,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdatePatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    gender: "",
    contact_number: "",
    address: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-patient-by-id/${id}`
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-patient/${id}`,
        formData
      );
      alert("Patient updated successfully!");
      navigate(`/single-patient/${id}`);
    } catch (err) {
      console.error("Error updating patient:", err);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Patient Details</h2>
          <Link to="/all-patients">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Patients
            </button>
          </Link>
        </div>

        <EditableField
          label="Patient Name"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          icon={<FaUserInjured className="text-blue-600" />}
        />
        <EditableField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          icon={<FaUserClock className="text-yellow-600" />}
        />
        <EditableField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          icon={<FaTransgender className="text-pink-600" />}
        />
        <EditableField
          label="Contact Number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
          icon={<FaPhone className="text-green-600" />}
        />
        <EditableField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          icon={<FaMapMarkerAlt className="text-orange-600" />}
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
