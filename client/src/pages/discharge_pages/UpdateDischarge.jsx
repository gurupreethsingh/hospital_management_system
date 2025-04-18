import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateDischarge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_name: "",
    patient_id: "",
    hospital_id: "",
    discharge_date: "",
    reason_for_discharge: "",
    treatment_summary: "",
    doctor_name: "",
  });

  const [allHospitals, setAllHospitals] = useState([]);
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, hospitalsRes, patientsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/view-discharge-by-id/${id}`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/get-all-patients`),
        ]);

        const data = res.data;

        setFormData({
          ...data,
          hospital_id: data.hospital_id?._id || data.hospital_id,
          patient_id: data.patient_id?._id || data.patient_id,
        });

        setAllHospitals(hospitalsRes.data);
        setAllPatients(patientsRes.data);
      } catch (err) {
        console.error("Fetch error:", err.message);
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

    if (!formData.patient_id || !formData.hospital_id) {
      alert("❌ Missing required Patient or Hospital ID.");
      return;
    }

    try {
      console.log("Submitting:", formData); // For debugging
      await axios.put(
        `${globalBackendRoute}/api/update-discharge/${id}`,
        formData
      );
      alert("✅ Discharge updated successfully!");
      navigate(`/single-discharge/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update discharge.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6 gap-4 flex-col sm:flex-row">
          <h2 className="headingText">Update Discharge</h2>
          <Link to="/all-discharges">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Discharges
            </button>
          </Link>
        </div>

        {renderField("Patient Name", "patient_name", <FaUser />)}

        <SelectField
          label="Patient"
          name="patient_id"
          value={formData.patient_id}
          options={allPatients}
          labelKey="patient_name"
          onChange={handleChange}
          icon={<FaUser />}
        />

        {renderField("Doctor", "doctor_name", <FaUserMd />)}

        <SelectField
          label="Hospital"
          name="hospital_id"
          value={formData.hospital_id}
          options={allHospitals}
          labelKey="hospital_name"
          onChange={handleChange}
          icon={<FaHospital />}
        />

        {renderField(
          "Discharge Date",
          "discharge_date",
          <FaCalendarAlt />,
          "date"
        )}
        {renderField("Reason", "reason_for_discharge", <FaClipboardList />)}
        {renderField("Summary", "treatment_summary", <FaClipboardList />)}

        <div className="text-center mt-6">
          <button
            type="submit"
            className="primaryBtn w-fit px-4 flex items-center gap-2 mx-auto"
          >
            <MdSave /> Save
          </button>
        </div>
      </form>
    </div>
  );

  function renderField(label, name, icon, type = "text") {
    return (
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
            className="w-full bg-transparent border-b border-gray-300 pb-1 focus:outline-none text-sm text-gray-900"
          />
        </dd>
      </div>
    );
  }

  function SelectField({
    label,
    name,
    value,
    options,
    labelKey,
    onChange,
    icon,
  }) {
    return (
      <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
        <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
          {icon} {label}
        </dt>
        <dd className="mt-1 sm:col-span-2 sm:mt-0">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 pb-1 focus:outline-none text-sm text-gray-900"
            required
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option._id} value={option._id}>
                {option[labelKey]}
              </option>
            ))}
          </select>
        </dd>
      </div>
    );
  }
}
