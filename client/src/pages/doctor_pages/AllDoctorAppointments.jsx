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
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-doctors`
        );
        setDoctors(res.data);
      } catch (err) {
        toast.error("Failed to fetch doctors.");
      }
    };
    fetchDoctors();
  }, []);

  const handleFetch = async () => {
    if (!selectedDoctorId) return toast.error("Please select a doctor.");
    try {
      const res = await axios.get(
        `${globalBackendRoute}/api/appointments-by-doctor/${selectedDoctorId}`
      );
      setAppointments(res.data);
      setTotalCount(res.data.length);
    } catch (err) {
      toast.error("Failed to fetch appointments.");
    }
  };

  const filtered = searchQuery.trim()
    ? appointments.filter((a) => {
        const full =
          `${a.patient_name} ${a.doctor_id?.doctor_name} ${a.reason}`.toLowerCase();
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            Doctor's Appointments{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filtered.length} of {totalCount}
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-fit">
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="formInput"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.doctor_name}
                </option>
              ))}
            </select>
            <button onClick={handleFetch} className="primaryBtn text-sm">
              Fetch
            </button>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4 mb-6">
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

        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No records found.</p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-3"
              }
            >
              {filtered.map((a) => (
                <div
                  key={a._id}
                  className={`relative bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer ${
                    view === "list"
                      ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
                      : "flex flex-col items-start"
                  }`}
                >
                  {view === "list" ? (
                    <>
                      <span>
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
                        {a.appointment_date?.slice(0, 10)}
                      </span>
                      <span>|</span>
                      <span>
                        <FaClock className="inline mr-1" />
                        {a.appointment_time}
                      </span>
                      <span>|</span>
                      <span className="capitalize">{a.status}</span>
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
                        <FaCalendarAlt /> {a.appointment_date?.slice(0, 10)}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaClock /> {a.appointment_time}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2">
                        <FaClipboardList /> {a.reason}
                      </p>
                      <p className="paragraphTextMobile">
                        <strong>Status:</strong>{" "}
                        <span className="capitalize text-indigo-600">
                          {a.status}
                        </span>
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

export default AllDoctorAppointments;
