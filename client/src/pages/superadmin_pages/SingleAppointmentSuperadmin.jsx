import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleAppointmentSuperadmin() {
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-appointment-by-id/${id}`)
      .then((res) => setAppointment(res.data))
      .catch((err) =>
        console.error("Error fetching appointment:", err.message)
      );
  }, [id]);

  const handleUpdate = () => navigate(`/update-appointment-superadmin/${id}`);

  if (!appointment) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Appointment Details</h2>
          <Link to="/superadmin-all-appointments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Appointments
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaUserInjured />}
            label="Patient Name"
            value={appointment.patient_name}
          />
          <DetailField
            icon={<FaPhone />}
            label="Contact Number"
            value={appointment.contact_number}
          />
          <DetailField
            icon={<FaEnvelope />}
            label="Email"
            value={appointment.email || "N/A"}
          />
          <DetailField
            icon={<FaUserMd />}
            label="Doctor"
            value={appointment.doctor_id?.doctor_name}
          />
          <DetailField
            icon={<FaHospital />}
            label="Hospital"
            value={appointment.hospital_id?.hospital_name}
          />
          <DetailField
            icon={<FaCalendarAlt />}
            label="Appointment Date"
            value={appointment.appointment_date?.slice(0, 10)}
          />
          <DetailField
            icon={<FaClock />}
            label="Time"
            value={appointment.appointment_time}
          />
          <DetailField
            icon={<FaClipboardList />}
            label="Reason"
            value={appointment.reason}
          />
          <DetailField
            icon={<FaClipboardList />}
            label="Status"
            value={appointment.status}
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
