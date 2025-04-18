import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUserInjured,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-all-patients`
        );
        setPatients(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
        toast.error("Failed to fetch patients.");
      }
    };
    fetchPatients();
  }, []);

  const handleDeletePatient = async (patientId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-patient/${patientId}`
      );
      if (res.status === 200) {
        setPatients((prev) => prev.filter((p) => p._id !== patientId));
        toast.success("Patient deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete patient.");
    }
  };

  const filteredPatients = searchQuery.trim()
    ? patients.filter((patient) => {
        const fullText =
          `${patient.patient_name} ${patient.gender} ${patient.address}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : patients;

  const handleNavigate = (id) => {
    navigate(`/single-patient/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Patients{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredPatients.length} of {totalCount}
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
              placeholder="Search patients..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500">No patients found.</p>
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
              {filteredPatients.map((patient) => (
                <div
                  key={patient._id}
                  onClick={() => handleNavigate(patient._id)}
                  className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
                    <FaUserInjured className="text-blue-500" />{" "}
                    {patient.patient_name}
                  </h3>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaTransgender /> {patient.gender}, Age: {patient.age}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaPhone /> {patient.contact_number}
                  </p>
                  <p className="paragraphTextMobile flex items-center gap-2">
                    <FaMapMarkerAlt /> {patient.address}
                  </p>
                  <button
                    onClick={(e) => handleDeletePatient(patient._id, e)}
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

export default AllPatients;
