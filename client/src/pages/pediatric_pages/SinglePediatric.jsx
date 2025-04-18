import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBaby,
  FaUser,
  FaVenusMars,
  FaPhone,
  FaMapMarkerAlt,
  FaUserMd,
  FaHospital,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SinglePediatric() {
  const [pediatric, setPediatric] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPediatricData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/get-pediatric/${id}`
        );
        setPediatric(response.data);
      } catch (error) {
        console.error("Error fetching pediatric data:", error.message);
      }
    };
    fetchPediatricData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-pediatric/${id}`);
  };

  if (!pediatric) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Pediatric Record</h2>
          <Link to="/all-pediatrics">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Pediatrics
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaBaby className="text-pink-500" />}
            label="Child Name"
            value={pediatric.child_name}
          />
          <DetailField
            icon={<FaVenusMars className="text-purple-600" />}
            label="Gender"
            value={pediatric.gender}
          />
          <DetailField
            icon={<FaMapMarkerAlt className="text-gray-600" />}
            label="Ward Number"
            value={`Ward ${pediatric.ward_number}`}
          />
          <DetailField
            icon={<FaHospital className="text-red-600" />}
            label="Hospital ID"
            value={pediatric.hospital_id}
          />
          <DetailField
            icon={<FaUserMd className="text-green-600" />}
            label="Doctor ID"
            value={pediatric.doctor_id}
          />
          <DetailField
            icon={<FaUser className="text-indigo-600" />}
            label="Mother Name"
            value={pediatric.mother_name}
          />
          <DetailField
            icon={<FaUser className="text-blue-600" />}
            label="Father Name"
            value={pediatric.father_name}
          />
          <DetailField
            icon={<FaPhone className="text-green-600" />}
            label="Parent Contact"
            value={pediatric.parent_contact}
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
