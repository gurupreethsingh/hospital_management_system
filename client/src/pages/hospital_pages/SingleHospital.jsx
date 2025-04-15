import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHospitalSymbol,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleHospital() {
  const [hospital, setHospital] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/view-hospital-by-id/${id}`
        );
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error.message);
      }
    };
    fetchHospitalData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-hospital/${id}`);
  };

  if (!hospital) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <motion.h3
          className="subHeadingTextMobile lg:subHeadingText mb-4"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Hospital Details
        </motion.h3>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaHospitalSymbol className="text-green-600" />}
            label="Hospital Name"
            value={hospital.hospital_name}
          />
          <DetailField
            icon={<FaMapMarkerAlt className="text-blue-600" />}
            label="Address"
            value={hospital.hospital_address}
          />
          <DetailField
            icon={<FaPhone className="text-yellow-600" />}
            label="Phone"
            value={hospital.hospital_phone}
          />
          <DetailField
            icon={<FaEnvelope className="text-purple-600" />}
            label="Email"
            value={hospital.hospital_email}
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
