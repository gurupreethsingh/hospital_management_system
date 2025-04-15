import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTint,
  FaUser,
  FaPhone,
  FaBalanceScale,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleBlood() {
  const [blood, setBlood] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-blood-by-id/${id}`)
      .then((res) => setBlood(res.data))
      .catch((err) => console.error("Error fetching:", err.message));
  }, [id]);

  const handleUpdate = () => navigate(`/update-blood/${id}`);

  if (!blood) return <div className="text-center py-8">Loading...</div>;

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
          Blood Record Details
        </motion.h3>
        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaTint className="text-red-600" />}
            label="Blood Group"
            value={blood.blood_group}
          />
          <DetailField
            icon={<FaUser className="text-green-600" />}
            label="Donor Name"
            value={blood.donor_name}
          />
          <DetailField
            icon={<FaPhone className="text-blue-600" />}
            label="Contact"
            value={blood.contact_number}
          />
          <DetailField
            icon={<FaBalanceScale className="text-yellow-600" />}
            label="Units"
            value={blood.quantity_in_units}
          />
          <DetailField
            icon={<FaCalendarAlt className="text-indigo-600" />}
            label="Last Donation"
            value={blood.last_donation_date?.slice(0, 10)}
          />
          <DetailField
            icon={<FaMapMarkerAlt className="text-purple-600" />}
            label="Location"
            value={blood.location}
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
