import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaHospitalSymbol,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-hospitals`
        );
        setHospitals(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching hospitals:", error.message);
        toast.error("Failed to fetch hospitals.");
      }
    };
    fetchHospitals();
  }, []);

  const handleDeleteHospital = async (hospitalId, e) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ Prevent card click from firing

    const confirm = window.confirm(
      "Are you sure you want to delete this hospital?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-hospital/${hospitalId}`
      );

      if (res.status === 200) {
        setHospitals((prev) => prev.filter((h) => h._id !== hospitalId));
        toast.success("Hospital deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete hospital.");
    }
  };

  const filteredHospitals = searchQuery.trim()
    ? hospitals.filter((hospital) => {
        const fullText =
          `${hospital.hospital_name} ${hospital.hospital_address} ${hospital.hospital_email}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : hospitals;

  const handleNavigate = (id) => {
    navigate(`/single-hospital/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Hospitals{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredHospitals.length} of {totalCount}
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
              placeholder="Search hospitals..."
            />
          </div>
        </div>

        {/* View Display */}
        <div className="mt-6">
          {filteredHospitals.length === 0 ? (
            <p className="text-center text-gray-500">No hospitals found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  onClick={() => handleNavigate(hospital._id)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-3 w-full">
                    <h3 className="subHeadingTextMobile flex items-center gap-2">
                      <FaHospitalSymbol className="text-green-500" />{" "}
                      {hospital.hospital_name}
                    </h3>
                    <p className="paragraphTextMobile flex items-center gap-2 mt-1">
                      <FaMapMarkerAlt /> {hospital.hospital_address}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2">
                      <FaPhone /> {hospital.hospital_phone}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2">
                      <FaEnvelope /> {hospital.hospital_email}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteHospital(hospital._id, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  onClick={() => handleNavigate(hospital._id)}
                  className="bg-white rounded-lg shadow relative p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <h3 className="subHeadingText flex items-center gap-2">
                    <FaHospitalSymbol className="text-green-500" />
                    {hospital.hospital_name}
                  </h3>
                  <p className="paragraphText flex items-center gap-2 mt-1">
                    <FaMapMarkerAlt /> {hospital.hospital_address}
                  </p>
                  <p className="paragraphText flex items-center gap-2">
                    <FaPhone /> {hospital.hospital_phone}
                  </p>
                  <p className="paragraphText flex items-center gap-2">
                    <FaEnvelope /> {hospital.hospital_email}
                  </p>
                  <button
                    onClick={(e) => handleDeleteHospital(hospital._id, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  onClick={() => handleNavigate(hospital._id)}
                  className="flex items-start space-x-4 bg-white rounded-lg shadow p-3 relative cursor-pointer hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="subHeadingTextMobile flex items-center gap-2">
                      <FaHospitalSymbol className="text-green-500" />
                      {hospital.hospital_name}
                    </h3>
                    <p className="paragraphTextMobile flex items-center gap-2">
                      <FaMapMarkerAlt /> {hospital.hospital_address}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2">
                      <FaPhone /> {hospital.hospital_phone}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2">
                      <FaEnvelope /> {hospital.hospital_email}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteHospital(hospital._id, e)}
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

export default AllHospitals;
