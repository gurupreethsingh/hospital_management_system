import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaTint,
  FaUser,
  FaPhone,
  FaBalanceScale,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllBloods = () => {
  const [bloods, setBloods] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBloods = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/get-all-bloods`);
        setBloods(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching bloods:", error.message);
        toast.error("Failed to fetch blood records.");
      }
    };
    fetchBloods();
  }, []);

  const handleDeleteBlood = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-blood/${id}`
      );
      if (res.status === 200) {
        setBloods((prev) => prev.filter((b) => b._id !== id));
        toast.success("Blood record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record.");
    }
  };

  const filtered = searchQuery.trim()
    ? bloods.filter((b) => {
        const full =
          `${b.blood_group} ${b.donor_name} ${b.location}`.toLowerCase();
        const words = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w && !stopwords.includes(w));
        return words.some(
          (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
        );
      })
    : bloods;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Blood Groups{" "}
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
              placeholder="Search blood groups..."
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
              {filtered.map((b) => (
                <div
                  key={b._id}
                  onClick={() => navigate(`/single-blood/${b._id}`)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaTint className="text-red-500" /> {b.blood_group}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaUser /> {b.donor_name}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaPhone /> {b.contact_number}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaBalanceScale /> {b.quantity_in_units} units
                  </p>
                  <button
                    onClick={(e) => handleDeleteBlood(b._id, e)}
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

export default AllBloods;
