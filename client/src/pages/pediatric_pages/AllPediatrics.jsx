import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUser,
  FaBaby,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllPediatrics = () => {
  const [pediatrics, setPediatrics] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPediatrics = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-all-pediatrics`
        );
        setPediatrics(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching pediatrics:", error.message);
        toast.error("Failed to fetch pediatric records.");
      }
    };
    fetchPediatrics();
  }, []);

  const handleDeletePediatric = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      "Are you sure you want to delete this pediatric record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-pediatric/${id}`
      );
      if (res.status === 200) {
        setPediatrics((prev) => prev.filter((p) => p._id !== id));
        toast.success("Pediatric record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete pediatric record.");
    }
  };

  const filteredPediatrics = searchQuery.trim()
    ? pediatrics.filter((p) => {
        const fullText =
          `${p.child_name} ${p.gender} ${p.mother_name} ${p.father_name}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : pediatrics;

  const handleNavigate = (id) => {
    navigate(`/single-pediatric/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Pediatrics{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredPediatrics.length} of {totalCount}
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
              placeholder="Search pediatrics..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filteredPediatrics.length === 0 ? (
            <p className="text-center text-gray-500">
              No pediatric records found.
            </p>
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
              {filteredPediatrics.map((p) => (
                <div
                  key={p._id}
                  onClick={() => handleNavigate(p._id)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaBaby className="text-pink-500" /> {p.child_name}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaVenusMars /> {p.gender}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaUser className="text-indigo-600" /> {p.mother_name} &{" "}
                    {p.father_name}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaPhone /> {p.parent_contact}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaMapMarkerAlt /> Ward {p.ward_number}
                  </p>
                  <button
                    onClick={(e) => handleDeletePediatric(p._id, e)}
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

export default AllPediatrics;
