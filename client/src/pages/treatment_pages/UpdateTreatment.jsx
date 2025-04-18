import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateTreatment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    treatment_name: "",
    patient_name: "",
    doctor_name: "",
    hospital_name: "",
    description: "",
    cost: "",
    treatment_date: "",
  });

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-treatment-by-id/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error fetching treatment:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-treatment/${id}`,
        formData
      );
      alert("Treatment record updated successfully!");
      navigate(`/single-treatment/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update treatment.");
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Treatment Details</h2>
          <Link to="/all-treatments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Treatments
            </button>
          </Link>
        </div>

        {renderField(
          "Treatment Name",
          "treatment_name",
          <FaStethoscope className="text-green-600" />
        )}
        {renderField(
          "Patient Name",
          "patient_id",
          <FaUserInjured className="text-blue-600" />
        )}
        {renderField(
          "Diagnosis",
          "description",
          <FaNotesMedical className="text-indigo-600" />
        )}
        {renderField(
          "Treatment Cost",
          "cost",
          <FaMoneyBillWave className="text-yellow-600" />,
          "number"
        )}
        {renderField(
          "Treatment Date",
          "treatment_date",
          <FaCalendarAlt className="text-purple-600" />,
          "date"
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
