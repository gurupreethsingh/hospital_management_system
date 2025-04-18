import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleDischarge() {
  const [record, setRecord] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-discharge-by-id/${id}`
        );
        setRecord(res.data);
      } catch (err) {
        console.error("Error fetching discharge:", err.message);
      }
    };
    fetch();
  }, [id]);

  if (!record) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="headingText">Discharge Details</h2>
          <Link to="/all-discharges">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Discharges
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaUser />}
            label="Patient"
            value={record.patient_name}
          />
          <DetailField
            icon={<FaUserMd />}
            label="Doctor"
            value={record.doctor_name}
          />
          <DetailField
            icon={<FaHospital />}
            label="Hospital"
            value={
              typeof record.hospital_id === "object"
                ? record.hospital_id?.hospital_name
                : record.hospital_id
            }
          />

          <DetailField
            icon={<FaCalendarAlt />}
            label="Discharge Date"
            value={new Date(record.discharge_date).toLocaleDateString()}
          />
          <DetailField
            icon={<FaClipboardList />}
            label="Reason"
            value={record.reason_for_discharge}
          />
          <DetailField
            icon={<FaClipboardList />}
            label="Summary"
            value={record.treatment_summary}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(`/update-discharge/${id}`)}
            className="primaryBtn w-fit px-4 flex items-center gap-2 mx-auto"
          >
            <MdEdit /> Update
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const DetailField = ({ icon, label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
    <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
      {icon} {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      {value || "N/A"}
    </dd>
  </div>
);
