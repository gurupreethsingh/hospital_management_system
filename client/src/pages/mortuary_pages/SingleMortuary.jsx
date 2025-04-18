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
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleMortuary() {
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-mortuary/${id}`
        );
        setRecord(res.data);
      } catch (error) {
        console.error("Error fetching mortuary record:", error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-mortuary/${id}`);
  };

  if (!record) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Mortuary Record Details</h2>
          <Link to="/all-mortuary">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Records
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaUser />}
            label="Deceased Name"
            value={record.deceased_name}
          />
          <DetailField
            icon={<FaVenusMars />}
            label="Gender & Age"
            value={`${record.gender}, ${record.age} yrs`}
          />
          <DetailField
            icon={<FaCross />}
            label="Date of Death"
            value={new Date(record.date_of_death).toLocaleDateString()}
          />
          <DetailField
            icon={<FaCross />}
            label="Time of Death"
            value={record.time_of_death}
          />
          <DetailField
            icon={<FaCross />}
            label="Cause of Death"
            value={record.cause_of_death}
          />
          <DetailField
            icon={<FaPhone />}
            label="Contact Number"
            value={record.contact_number}
          />
          <DetailField
            icon={<FaMapMarkerAlt />}
            label="Ward Number"
            value={record.ward_number || "N/A"}
          />
          <DetailField
            icon={<FaUser />}
            label="Body Received By"
            value={record.body_received_by}
          />
          <DetailField
            icon={<FaUser />}
            label="Relation to Deceased"
            value={record.relation_to_deceased || "N/A"}
          />
          <DetailField
            icon={<FaHospital />}
            label="Hospital"
            value={record.hospital_id?.hospital_name}
          />
          <DetailField
            icon={<FaUserMd />}
            label="Doctor"
            value={record.doctor_id?.doctor_name}
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
