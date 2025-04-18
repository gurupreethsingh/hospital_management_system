import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SinglePatient() {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/view-patient-by-id/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error.message);
      }
    };
    fetchPatientData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-patient/${id}`);
  };

  if (!patient) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Patient Details</h2>
          <Link to="/all-patients">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Patients
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaUserInjured className="text-blue-600" />}
            label="Patient Name"
            value={patient.patient_name}
          />
          <DetailField
            icon={<FaTransgender className="text-pink-600" />}
            label="Gender & Age"
            value={`${patient.gender}, ${patient.age} years`}
          />
          <DetailField
            icon={<FaPhone className="text-green-600" />}
            label="Contact Number"
            value={patient.contact_number}
          />
          <DetailField
            icon={<FaMapMarkerAlt className="text-orange-600" />}
            label="Address"
            value={patient.address}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleUpdate}
            className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"
          >
            <MdEdit /> Update
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DetailField({ icon, label, value }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value || "N/A"}
      </dd>
    </div>
  );
}
