import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaClipboardCheck,
  FaBriefcase,
  FaUserGraduate,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctor_name: "",
    specialization: "",
    experience_years: "",
    qualifications: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-doctor-by-id/${id}`
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-doctor/${id}`,
        formData
      );
      alert("Doctor updated successfully!");
      navigate(`/single-doctor/${id}`);
    } catch (err) {
      console.error("Error updating doctor:", err);
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="subHeadingTextMobile lg:subHeadingText mb-4">
          Update Doctor
        </h2>

        <EditableField
          label="Doctor Name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          icon={<FaUserMd className="text-green-600" />}
        />
        <EditableField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          icon={<FaClipboardCheck className="text-blue-600" />}
        />
        <EditableField
          label="Experience (Years)"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          icon={<FaBriefcase className="text-yellow-600" />}
        />
        <EditableField
          label="Qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          icon={<FaUserGraduate className="text-purple-600" />}
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
