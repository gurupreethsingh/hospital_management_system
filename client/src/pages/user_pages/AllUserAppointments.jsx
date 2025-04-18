import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUser,
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      if (!emailOrPhone.trim()) {
        toast.error("Please enter a contact number or email.");
        return;
      }

      const query = emailOrPhone.includes("@")
        ? `email=${emailOrPhone}`
        : `contact_number=${emailOrPhone}`;

      const res = await axios.get(
        `${globalBackendRoute}/api/user-appointments?${query}`
      );
      setAppointments(res.data);
      setTotalCount(res.data.length);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      toast.error("Failed to fetch appointments.");
    }
  };

  const filtered = searchQuery.trim()
    ? appointments.filter((a) => {
        const full = `${a.patient_name} ${a.reason} ${a.status}`.toLowerCase();
        const words = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w && !stopwords.includes(w));
        return words.some(
          (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
        );
      })
    : appointments;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your email to see all your appointments"
              className="formInput px-3 py-2"
            />
            <button
              onClick={fetchAppointments}
              className="fileUploadBtn text-sm py-2 px-4"
            >
              Fetch Appointments
            </button>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appointments..."
            />
          </div>
        </div>

        {/* Result Count */}
        {appointments.length > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filtered.length} of {totalCount} appointments
          </p>
        )}

        {/* Grid or List View */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-3"
              }
            >
              {filtered.map((a) => (
                <div
                  key={a._id}
                  className={`relative cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition ${
                    view === "list"
                      ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
                      : "flex flex-col items-start"
                  }`}
                >
                  {view === "list" ? (
                    <>
                      <span className="text-indigo-600 font-medium">
                        <FaUser className="inline mr-1" />
                        {a.patient_name}
                      </span>
                      <span>|</span>
                      <span>
                        <FaUserMd className="inline mr-1" />
                        {a.doctor_id?.doctor_name}
                      </span>
                      <span>|</span>
                      <span>
                        <FaHospital className="inline mr-1" />
                        {a.hospital_id?.hospital_name}
                      </span>
                      <span>|</span>
                      <span>
                        <FaCalendarAlt className="inline mr-1" />
                        {new Date(a.appointment_date).toLocaleDateString()}{" "}
                        {a.appointment_time}
                      </span>

                      <span>|</span>
                      <span>
                        <FaClipboardList className="inline mr-1" />
                        Reason: <span>{a.reason}</span>
                      </span>
                      <span>|</span>
                      <span>Status: {a.status}</span>
                    </>
                  ) : (
                    <>
                      <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                        <FaUser className="text-blue-500" /> {a.patient_name}
                      </h3>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaUserMd /> {a.doctor_id?.doctor_name}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaHospital /> {a.hospital_id?.hospital_name}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaCalendarAlt />{" "}
                        {new Date(a.appointment_date).toLocaleDateString()}{" "}
                        {a.appointment_time}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaClipboardList /> Reason: {a.reason}
                      </p>
                      <p className="paragraphTextMobile text-sm font-semibold text-green-700 mt-1">
                        Status: {a.status}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserAppointments;
