import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-all-treatments`
        );
        setTreatments(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching treatments:", error.message);
        toast.error("Failed to fetch treatment records.");
      }
    };
    fetchTreatments();
  }, []);

  const handleDeleteTreatment = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-treatment/${id}`
      );
      if (res.status === 200) {
        setTreatments((prev) => prev.filter((t) => t._id !== id));
        toast.success("Treatment record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record.");
    }
  };

  const filtered = searchQuery.trim()
    ? treatments.filter((t) => {
        const full =
          `${t.treatment_name} ${t.patient_name} ${t.diagnosis}`.toLowerCase();
        const words = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w && !stopwords.includes(w));
        return words.some(
          (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
        );
      })
    : treatments;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Treatments{" "}
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
              placeholder="Search treatments..."
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
              {filtered.map((t) => (
                <div
                  key={t._id}
                  onClick={() => navigate(`/single-treatment/${t._id}`)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaStethoscope className="text-green-500" />{" "}
                    {t.treatment_name}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaUserInjured /> {t.patient_name}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaNotesMedical /> {t.diagnosis}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaMoneyBillWave /> ₹{t.treatment_cost}
                  </p>
                  <button
                    onClick={(e) => handleDeleteTreatment(t._id, e)}
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

export default AllTreatments;
