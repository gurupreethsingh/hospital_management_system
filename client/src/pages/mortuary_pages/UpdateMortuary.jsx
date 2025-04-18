import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaVenusMars,
  FaPhone,
  FaMapMarkerAlt,
  FaCross,
  FaUserMd,
  FaHospital,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateMortuary() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    const fetchRecord = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-mortuary/${id}`
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching mortuary record:", err);
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-mortuary/${id}`,
        formData
      );
      alert("Mortuary record updated successfully!");
      navigate(`/single-mortuary/${id}`);
    } catch (err) {
      console.error("Error updating mortuary record:", err);
      alert("Failed to update record.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Mortuary Record</h2>
          <Link to="/all-mortuary">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Records
            </button>
          </Link>
        </div>

        <EditableField
          icon={<FaUser />}
          label="Deceased Name"
          name="deceased_name"
          value={formData.deceased_name}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaVenusMars />}
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaCross />}
          label="Date of Death"
          name="date_of_death"
          value={formData.date_of_death?.slice(0, 10)}
          onChange={handleChange}
          type="date"
        />
        <EditableField
          icon={<FaCross />}
          label="Time of Death"
          name="time_of_death"
          value={formData.time_of_death}
          onChange={handleChange}
          type="time"
        />
        <EditableField
          icon={<FaCross />}
          label="Cause of Death"
          name="cause_of_death"
          value={formData.cause_of_death}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaPhone />}
          label="Contact Number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaMapMarkerAlt />}
          label="Ward Number"
          name="ward_number"
          value={formData.ward_number}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaUser />}
          label="Body Received By"
          name="body_received_by"
          value={formData.body_received_by}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaUser />}
          label="Relation to Deceased"
          name="relation_to_deceased"
          value={formData.relation_to_deceased}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaHospital />}
          label="Hospital ID"
          name="hospital_id"
          value={formData.hospital_id?.hospital_name}
          onChange={handleChange}
        />
        <EditableField
          icon={<FaUserMd />}
          label="Doctor ID"
          name="doctor_id"
          value={formData.doctor_id?.doctor_name}
          onChange={handleChange}
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

function EditableField({ icon, label, name, value, onChange, type = "text" }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="text-sm text-gray-900 border-b border-gray-300 pb-1">
          <input
            type={type}
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
