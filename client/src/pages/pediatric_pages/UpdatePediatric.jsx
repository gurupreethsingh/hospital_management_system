import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBaby,
  FaVenusMars,
  FaBed,
  FaUser,
  FaPhone,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdatePediatric() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [formData, setFormData] = useState({
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
    const fetchData = async () => {
      try {
        const [pediatricRes, hospitalsRes, doctorsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-pediatric/${id}`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        setFormData(pediatricRes.data);
        setAllHospitals(hospitalsRes.data);
        setAllDoctors(doctorsRes.data);
      } catch (err) {
        console.error("Error fetching pediatric data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-pediatric/${id}`,
        formData
      );
      alert("Pediatric record updated successfully!");
      navigate(`/single-pediatric/${id}`);
    } catch (err) {
      console.error("Error updating pediatric record:", err);
      alert("Failed to update pediatric record.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Pediatric Record</h2>
          <Link to="/all-pediatrics">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Pediatrics
            </button>
          </Link>
        </div>

        <EditableField
          label="Child Name"
          name="child_name"
          value={formData.child_name}
          onChange={handleChange}
          icon={<FaBaby className="text-pink-500" />}
        />
        <EditableField
          label="Date of Birth"
          name="date_of_birth"
          value={formData.date_of_birth?.slice(0, 10)}
          onChange={handleChange}
          icon={<FaCalendarAlt className="text-orange-500" />}
          type="date"
        />
        <EditableField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          icon={<FaVenusMars className="text-purple-600" />}
          type="select"
          options={["Male", "Female", "Other"]}
        />
        <EditableField
          label="Ward Number"
          name="ward_number"
          value={formData.ward_number}
          onChange={handleChange}
          icon={<FaBed className="text-gray-600" />}
        />
        <EditableField
          label="Hospital"
          name="hospital_id"
          value={formData.hospital_id}
          onChange={handleChange}
          icon={<FaHospital className="text-red-500" />}
          type="select"
          options={allHospitals.map((h) => ({
            label: h.hospital_name,
            value: h._id,
          }))}
        />
        <EditableField
          label="Doctor"
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          icon={<FaUserMd className="text-green-600" />}
          type="select"
          options={allDoctors.map((d) => ({
            label: d.doctor_name,
            value: d._id,
          }))}
        />
        <EditableField
          label="Mother Name"
          name="mother_name"
          value={formData.mother_name}
          onChange={handleChange}
          icon={<FaUser className="text-indigo-600" />}
        />
        <EditableField
          label="Father Name"
          name="father_name"
          value={formData.father_name}
          onChange={handleChange}
          icon={<FaUser className="text-blue-600" />}
        />
        <EditableField
          label="Parent Contact"
          name="parent_contact"
          value={formData.parent_contact}
          onChange={handleChange}
          icon={<FaPhone className="text-green-600" />}
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

function EditableField({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
}) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0 w-full">
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full text-sm border-b border-gray-300 bg-transparent py-1 focus:outline-none"
          >
            <option value="">Select {label}</option>
            {options.map((opt) =>
              typeof opt === "string" ? (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ) : (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>
        ) : (
          <div className="text-sm text-gray-900 border-b border-gray-300 pb-1">
            <input
              type={type}
              name={name}
              value={value || ""}
              onChange={onChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        )}
      </dd>
    </div>
  );
}
