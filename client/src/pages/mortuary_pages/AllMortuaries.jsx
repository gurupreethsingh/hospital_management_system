import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUser,
  FaVenusMars,
  FaCross,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllMortuaries = () => {
  const [records, setRecords] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-all-mortuary`
        );
        setRecords(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching mortuary records:", error.message);
        toast.error("Failed to fetch mortuary records.");
      }
    };
    fetchRecords();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-mortuary/${id}`
      );
      if (res.status === 200) {
        setRecords((prev) => prev.filter((r) => r._id !== id));
        toast.success("Mortuary record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete mortuary record.");
    }
  };

  const filtered = searchQuery.trim()
    ? records.filter((r) => {
        const fullText =
          `${r.deceased_name} ${r.gender} ${r.cause_of_death}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : records;

  const handleNavigate = (id) => {
    navigate(`/single-mortuary/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Mortuary Records{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filtered.length} of {totalCount}
            </span>
          </h2>
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
              placeholder="Search deceased..."
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
              {filtered.map((r) => (
                <div
                  key={r._id}
                  onClick={() => handleNavigate(r._id)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaUser className="text-blue-500" /> {r.deceased_name}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaVenusMars /> {r.gender}, Age: {r.age}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaCross className="text-red-600" />{" "}
                    {new Date(r.date_of_death).toLocaleDateString()}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaPhone /> {r.contact_number}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaMapMarkerAlt /> Ward {r.ward_number || "N/A"}
                  </p>
                  <button
                    onClick={(e) => handleDelete(r._id, e)}
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

export default AllMortuaries;
