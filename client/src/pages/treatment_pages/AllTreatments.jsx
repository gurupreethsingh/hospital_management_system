// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   FaThList,
// //   FaThLarge,
// //   FaTh,
// //   FaTrash,
// //   FaStethoscope,
// //   FaUserInjured,
// //   FaNotesMedical,
// //   FaMoneyBillWave,
// // } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import globalBackendRoute from "../../config/Config";
// // import SearchBar from "../../components/common_components/SearchBar";
// // import stopwords from "../../components/common_components/stopwords";

// // const AllTreatments = () => {
// //   const [treatments, setTreatments] = useState([]);
// //   const [view, setView] = useState("grid");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [totalCount, setTotalCount] = useState(0);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchTreatments = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${globalBackendRoute}/api/view-all-treatments`
// //         );
// //         setTreatments(res.data);
// //         setTotalCount(res.data.length);
// //       } catch (error) {
// //         console.error("Error fetching treatments:", error.message);
// //         toast.error("Failed to fetch treatment records.");
// //       }
// //     };
// //     fetchTreatments();
// //   }, []);

// //   const handleDeleteTreatment = async (id, e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     const confirm = window.confirm(
// //       "Are you sure you want to delete this record?"
// //     );
// //     if (!confirm) return;

// //     try {
// //       const res = await axios.delete(
// //         `${globalBackendRoute}/api/delete-treatment/${id}`
// //       );
// //       if (res.status === 200) {
// //         setTreatments((prev) => prev.filter((t) => t._id !== id));
// //         toast.success("Treatment record deleted successfully.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to delete record.");
// //     }
// //   };

// //   const filtered = searchQuery.trim()
// //     ? treatments.filter((t) => {
// //         const full =
// //           `${t.treatment_name} ${t.patient_name} ${t.diagnosis}`.toLowerCase();
// //         const words = searchQuery
// //           .toLowerCase()
// //           .split(/\s+/)
// //           .filter((w) => w && !stopwords.includes(w));
// //         return words.some(
// //           (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
// //         );
// //       })
// //     : treatments;

// //   return (
// //     <div className="fullWidth py-10">
// //       <div className="containerWidth">
// //         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
// //           <h2 className="headingText">
// //             All Treatments{" "}
// //             <span className="text-sm text-gray-500 ml-2">
// //               Showing {filtered.length} of {totalCount}
// //             </span>
// //           </h2>
// //           <div className="flex items-center flex-wrap gap-4">
// //             <FaThList
// //               className={`text-xl cursor-pointer ${
// //                 view === "list" ? "text-indigo-600" : "text-gray-600"
// //               }`}
// //               onClick={() => setView("list")}
// //             />
// //             <FaThLarge
// //               className={`text-xl cursor-pointer ${
// //                 view === "card" ? "text-indigo-600" : "text-gray-600"
// //               }`}
// //               onClick={() => setView("card")}
// //             />
// //             <FaTh
// //               className={`text-xl cursor-pointer ${
// //                 view === "grid" ? "text-indigo-600" : "text-gray-600"
// //               }`}
// //               onClick={() => setView("grid")}
// //             />
// //             <SearchBar
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               placeholder="Search treatments..."
// //             />
// //           </div>
// //         </div>

// //         <div className="mt-6">
// //           {filtered.length === 0 ? (
// //             <p className="text-center text-gray-500">No records found.</p>
// //           ) : (
// //             <div
// //               className={
// //                 view === "grid"
// //                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
// //                   : view === "card"
// //                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// //                   : "space-y-4"
// //               }
// //             >
// //               {filtered.map((t) => (
// //                 <div
// //                   key={t._id}
// //                   onClick={() => navigate(`/single-treatment/${t._id}`)}
// //                   className="relative cursor-pointer flex flex-col items-start bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
// //                 >
// //                   <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
// //                     <FaStethoscope className="text-green-500" />{" "}
// //                     {t.treatment_name}
// //                   </h3>
// //                   <p className="paragraphTextMobile flex items-center gap-2">
// //                     <FaUserInjured /> {t.patient_id}
// //                   </p>
// //                   <p className="paragraphTextMobile flex items-center gap-2">
// //                     <FaNotesMedical /> {t.description}
// //                   </p>
// //                   <p className="paragraphTextMobile flex items-center gap-2">
// //                     <FaMoneyBillWave /> ₹{t.cost}
// //                   </p>
// //                   <p className="paragraphTextMobile flex items-center gap-2">
// //                     <FaMoneyBillWave /> ₹{t.treatment_date}
// //                   </p>
// //                   <button
// //                     onClick={(e) => handleDeleteTreatment(t._id, e)}
// //                     className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
// //                   >
// //                     <FaTrash />
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllTreatments;

// //

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaThList,
//   FaThLarge,
//   FaTh,
//   FaTrash,
//   FaStethoscope,
//   FaUserInjured,
//   FaNotesMedical,
//   FaMoneyBillWave,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import globalBackendRoute from "../../config/Config";
// import SearchBar from "../../components/common_components/SearchBar";
// import stopwords from "../../components/common_components/stopwords";

// const AllTreatments = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [view, setView] = useState("grid");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [totalCount, setTotalCount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTreatments = async () => {
//       try {
//         const res = await axios.get(
//           `${globalBackendRoute}/api/view-all-treatments`
//         );
//         setTreatments(res.data);
//         setTotalCount(res.data.length);
//       } catch (error) {
//         console.error("Error fetching treatments:", error.message);
//         toast.error("Failed to fetch treatment records.");
//       }
//     };
//     fetchTreatments();
//   }, []);

//   const handleDeleteTreatment = async (id, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const confirm = window.confirm(
//       "Are you sure you want to delete this record?"
//     );
//     if (!confirm) return;

//     try {
//       const res = await axios.delete(
//         `${globalBackendRoute}/api/delete-treatment/${id}`
//       );
//       if (res.status === 200) {
//         setTreatments((prev) => prev.filter((t) => t._id !== id));
//         toast.success("Treatment record deleted successfully.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete record.");
//     }
//   };

//   const filtered = searchQuery.trim()
//     ? treatments.filter((t) => {
//         const full =
//           `${t.treatment_name} ${t.patient_name} ${t.diagnosis}`.toLowerCase();
//         const words = searchQuery
//           .toLowerCase()
//           .split(/\s+/)
//           .filter((w) => w && !stopwords.includes(w));
//         return words.some(
//           (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
//         );
//       })
//     : treatments;

//   return (
//     <div className="fullWidth py-10">
//       <div className="containerWidth">
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//           <h2 className="headingText">
//             All Treatments{" "}
//             <span className="text-sm text-gray-500 ml-2">
//               Showing {filtered.length} of {totalCount}
//             </span>
//           </h2>
//           <div className="flex items-center flex-wrap gap-4">
//             <FaThList
//               className={`text-xl cursor-pointer ${
//                 view === "list" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("list")}
//             />
//             <FaThLarge
//               className={`text-xl cursor-pointer ${
//                 view === "card" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("card")}
//             />
//             <FaTh
//               className={`text-xl cursor-pointer ${
//                 view === "grid" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("grid")}
//             />
//             <SearchBar
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search treatments..."
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           {filtered.length === 0 ? (
//             <p className="text-center text-gray-500">No records found.</p>
//           ) : (
//             <div
//               className={
//                 view === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
//                   : view === "card"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                   : "space-y-4"
//               }
//             >
//               {filtered.map((t) => (
//                 <div
//                   key={t._id}
//                   onClick={() => navigate(`/single-treatment/${t._id}`)}
//                   className={`relative cursor-pointer flex flex-col ${
//                     view === "list" ? "items-start" : "items-start"
//                   } bg-white shadow rounded-lg p-4 hover:shadow-lg transition overflow-hidden`}
//                 >
//                   {view === "list" ? (
//                     <div className="w-full flex flex-wrap items-center gap-2 text-sm text-gray-700">
//                       <span className="font-semibold text-green-600">
//                         <FaStethoscope className="inline mr-1" />
//                         {t.treatment_name}
//                       </span>
//                       <span>|</span>
//                       <span>
//                         <FaUserInjured className="inline mr-1" />
//                         {t.patient_id}
//                       </span>
//                       <span>|</span>
//                       <span>
//                         <FaNotesMedical className="inline mr-1" />
//                         {t.description}
//                       </span>
//                       <span>|</span>
//                       <span>
//                         <FaMoneyBillWave className="inline mr-1" />₹{t.cost}
//                       </span>
//                       <span>|</span>
//                       <span>{t.treatment_date}</span>
//                     </div>
//                   ) : (
//                     <>
//                       <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1">
//                         <FaStethoscope className="text-green-500" />{" "}
//                         {t.treatment_name}
//                       </h3>
//                       <p className="paragraphTextMobile flex items-center gap-2">
//                         <FaUserInjured /> {t.patient_id}
//                       </p>
//                       <p className="paragraphTextMobile flex items-center gap-2">
//                         <FaNotesMedical /> {t.description}
//                       </p>
//                       <p className="paragraphTextMobile flex items-center gap-2">
//                         <FaMoneyBillWave /> ₹{t.cost}
//                       </p>
//                       <p className="paragraphTextMobile flex items-center gap-2">
//                         <FaMoneyBillWave /> {t.treatment_date}
//                       </p>
//                     </>
//                   )}

//                   <button
//                     onClick={(e) => handleDeleteTreatment(t._id, e)}
//                     className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllTreatments;

//

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          `${globalBackendRoute}/api/view-all-treatments`
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
                  : "flex flex-col gap-3"
              }
            >
              {filtered.map((t) => (
                <div
                  key={t._id}
                  onClick={() => navigate(`/single-treatment/${t._id}`)}
                  className={`relative cursor-pointer bg-white shadow rounded-lg p-4 hover:shadow-lg transition ${
                    view === "list"
                      ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
                      : "flex flex-col items-start"
                  }`}
                >
                  {view === "list" ? (
                    <>
                      <span className="text-green-600 font-medium truncate max-w-full">
                        <FaStethoscope className="inline mr-1" />
                        {t.treatment_name}
                      </span>
                      <span>|</span>
                      <span className="truncate max-w-full">
                        <FaUserInjured className="inline mr-1" />
                        {t.patient_id}
                      </span>
                      <span>|</span>
                      <span className="truncate max-w-full">
                        <FaNotesMedical className="inline mr-1" />
                        {t.description}
                      </span>
                      <span>|</span>
                      <span>
                        <FaMoneyBillWave className="inline mr-1" />₹{t.cost}
                      </span>
                      <span>|</span>
                      <span>{t.treatment_date}</span>
                    </>
                  ) : (
                    <>
                      <h3 className="subHeadingTextMobile flex items-center gap-2 mb-1 break-words whitespace-normal w-full">
                        <FaStethoscope className="text-green-500" />{" "}
                        {t.treatment_name}
                      </h3>
                      <p className="paragraphTextMobile flex items-center gap-2 break-words whitespace-normal w-full">
                        <FaUserInjured /> {t.patient_id}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2 break-words whitespace-normal w-full">
                        <FaNotesMedical /> {t.description}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2 break-words whitespace-normal w-full">
                        <FaMoneyBillWave /> ₹{t.cost}
                      </p>
                      <p className="paragraphTextMobile flex items-center gap-2 break-words whitespace-normal w-full">
                        <FaMoneyBillWave /> {t.treatment_date}
                      </p>
                    </>
                  )}

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
