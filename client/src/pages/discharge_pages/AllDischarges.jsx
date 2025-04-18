import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const AllDischarges = () => {
  const [discharges, setDischarges] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDischarges = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-discharges`
        );
        setDischarges(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        toast.error("Failed to fetch discharges.");
      }
    };
    fetchDischarges();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this discharge?"))
      return;

    try {
      await axios.delete(`${globalBackendRoute}/api/delete-discharge/${id}`);
      setDischarges((prev) => prev.filter((d) => d._id !== id));
      toast.success("Discharge deleted.");
    } catch (err) {
      toast.error("Failed to delete discharge.");
    }
  };

  const filtered = searchQuery.trim()
    ? discharges.filter((d) => {
        const fullText =
          `${d.patient_name} ${d.doctor_name} ${d.reason_for_discharge}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : discharges;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="headingText">
            All Discharges{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filtered.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
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
              placeholder="Search discharges..."
            />
          </div>
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
                  : "space-y-4"
              }
            >
              {filtered.map((d) => (
                <div
                  key={d._id}
                  onClick={() => navigate(`/single-discharge/${d._id}`)}
                  className="relative cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition flex flex-col items-start"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaUser className="text-blue-500" /> {d.patient_name}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaUserMd /> {d.doctor_name}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaHospital /> {d.hospital_id?.hospital_name || "N/A"}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaCalendarAlt />{" "}
                    {new Date(d.discharge_date).toLocaleDateString()}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaClipboardList /> {d.reason_for_discharge}
                  </p>
                  <button
                    onClick={(e) => handleDelete(d._id, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDischarges;
