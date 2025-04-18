// components/common_components/MainLayout.jsx
import React from "react";
import Header from "../header_components/Header";
import Footer from "../footer_components/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";
import PageTitle from "./PageTitle";

// Pages
import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import Dashboard from "../../pages/user_pages/Dashboard";
import AdminDashboard from "../../pages/admin_pages/AdminDashboard";
import SuperAdminDashboard from "../../pages/superadmin_pages/SuperAdminDashboard";
import EmployeeDashboard from "../../pages/employee_pages/EmployeeDashboard";
import Profile from "../../pages/user_pages/Profile";
import DeliveryAgentDashboard from "../../pages/delivery_agent_pages/DeliveryAgentDashboard";
import HrDashboard from "../../pages/hr_pages/HrDashboard";
import OutletDashboard from "../../pages/outlet_pages/OutletDashboard";
import VendorDashboard from "../../pages/vendor_pages/VendorDashboard";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import AllUsers from "../../pages/superadmin_pages/AllUsers";
import SingleUser from "../../pages/superadmin_pages/SingleUser";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";
import AddCategory from "../../pages/category_pages/AddCategory";
import AllCategories from "../../pages/category_pages/AllCategories";
import SingleCategory from "../../pages/category_pages/SingleCategory";
import CategoryAllProducts from "../../pages/category_pages/CategoryAllProducts";
import AddVendor from "../../pages/vendor_pages/AddVendor";
import AllVendors from "../../pages/vendor_pages/AllVendors";
import SingleVendor from "../../pages/vendor_pages/SingleVendor";
import AddOutlet from "../../pages/outlet_pages/AddOutlet";
import SingleOutlet from "../../pages/outlet_pages/SingleOutlet";
import AllOutlets from "../../pages/outlet_pages/AllOutlets";

// blog pages.
import AddBlog from "../../pages/blog_pages/AddBlog";
import AllBlogs from "../../pages/blog_pages/AllBlogs";
import SingleBlog from "../../pages/blog_pages/SingleBlog";

// contact pages.
import ContactUs from "../../pages/contact_pages/ContactUs";
import AllMessages from "../../pages/contact_pages/AllMessages";
import ReplyMessage from "../../pages/contact_pages/ReplyMessage";
import AllReplies from "../../pages/contact_pages/AllReplies";

// subscription page.
import Subscriptions from "../../pages/subscription_pages/Subscriptions";

// hospital routes.
import AddHospital from "../../pages/hospital_pages/AddHHospital";
import AllHospitals from "../../pages/hospital_pages/AllHospitals";
import SingleHospital from "../../pages/hospital_pages/SingleHospital";
import UpdateHospital from "../../pages/hospital_pages/UpdateHospital";

// doctor pages.
import AddDoctor from "../../pages/doctor_pages/AddDoctor";
import AllDoctors from "../../pages/doctor_pages/AllDoctors";
import SingleDoctor from "../../pages/doctor_pages/SingleDoctor";
import UpdateDoctor from "../../pages/doctor_pages/UpdateDoctor";
import AllDoctorAppointments from "../../pages/doctor_pages/AllDoctorAppointments";

// blood pages.
import AddBlood from "../../pages/blood_pages/AddBlood";
import AllBloods from "../../pages/blood_pages/AllBloods";
import SingleBlood from "../../pages/blood_pages/SingleBlood";
import UpdateBlood from "../../pages/blood_pages/UpdateBlood";

// treatement pages
import AddTreatment from "../../pages/treatment_pages/AddTreatment";
import AllTreatments from "../../pages/treatment_pages/AllTreatments";
import SingleTreatment from "../../pages/treatment_pages/SingleTreatment";
import UpdateTreatment from "../../pages/treatment_pages/UpdateTreatment";

// patient pages.
import AddPatient from "../../pages/patient_pages/AddPatient";
import AllPatients from "../../pages/patient_pages/AllPatients";
import SinglePatient from "../../pages/patient_pages/SinglePatient";
import UpdatePatient from "../../pages/patient_pages/UpdatePatient";

// Discharge pages.
import AddDischarge from "../../pages/discharge_pages/AddDischarge";
import AllDischarges from "../../pages/discharge_pages/AllDischarges";
import SingleDischarge from "../../pages/discharge_pages/SingleDischarge";
import UpdateDischarge from "../../pages/discharge_pages/UpdateDischarge";

// pediatric pages.
import AddPediatric from "../../pages/pediatric_pages/AddPediatric";
import AllPediatrics from "../../pages/pediatric_pages/AllPediatrics";
import SinglePediatric from "../../pages/pediatric_pages/SinglePediatric";
import UpdatePediatric from "../../pages/pediatric_pages/UpdatePediatric";

// Mortuary pages.
import AddMortuary from "../../pages/mortuary_pages/AddMortuary";
import AllMortuaries from "../../pages/mortuary_pages/AllMortuaries";
import SingleMortuary from "../../pages/mortuary_pages/SingleMortuary";
import UpdateMortuary from "../../pages/mortuary_pages/UpdateMortuary";

// appointment pages
import BookAppointment from "../../pages/user_pages/BookAppointment";
import AllUserAppointments from "../../pages/user_pages/AllUserAppointments";
import AllAppointmentsSuperadmin from "../../pages/superadmin_pages/AllAppointmentsSuperadmin";

import SingleAppointmentSuperadmin from "../../pages/superadmin_pages/SingleAppointmentSuperadmin";

import UpdateAppointmentSuperadmin from "../../pages/superadmin_pages/UpdateAppointmentSuperadmin";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow containerWidth py-6">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PrivateRoute>
                <PageTitle title="Contact Us">
                  <ContactUs />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <PrivateRoute>
                <PageTitle title="About Us">
                  <AboutUs />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTitle title="Login">
                  <Login />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageTitle title="Register">
                  <Register />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["user", "superadmin"]}>
                <PageTitle title="User Dashboard">
                  <Dashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/superadmin-dashboard"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="SuperAdmin Dashboard">
                  <SuperAdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin-all-appointments"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Appointments Superadmin">
                  <AllAppointmentsSuperadmin />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-appointment-superadmin/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Appointment">
                  <SingleAppointmentSuperadmin />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/update-appointment-superadmin/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Appointment">
                  <UpdateAppointmentSuperadmin />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <PageTitle title="Admin Dashboard">
                  <AdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoute allowedRoles={["employee", "superadmin"]}>
                <PageTitle title="Employee Dashboard">
                  <EmployeeDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/delivery-agent-dashboard"
            element={
              <PrivateRoute allowedRoles={["delivery_agent", "superadmin"]}>
                <PageTitle title="Delivery Agent Dashboard">
                  <DeliveryAgentDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/hr-dashboard"
            element={
              <PrivateRoute allowedRoles={["hr", "superadmin"]}>
                <PageTitle title="Human Resource Dashboard">
                  <HrDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/outlet-dashboard"
            element={
              <PrivateRoute allowedRoles={["outlet", "superadmin"]}>
                <PageTitle title="Outlet Dashboard">
                  <OutletDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor-dashboard"
            element={
              <PrivateRoute allowedRoles={["vendor", "superadmin"]}>
                <PageTitle title="Vendor Dashboard">
                  <VendorDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Profile">
                  <Profile />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Update Profile">
                  <UpdateProfile />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* appointment routes  */}
          <Route
            path="/book-appointment"
            element={
              <PrivateRoute>
                <PageTitle title="Book Appointment">
                  <BookAppointment />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-user-appointments"
            element={
              <PrivateRoute>
                <PageTitle title="All User Appointments">
                  <AllUserAppointments />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Users">
                  <AllUsers />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-user/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single User">
                  <SingleUser />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Category">
                  <AddCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-categories"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Categories">
                  <AllCategories />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-category/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Category">
                  <SingleCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-category-all-products/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Category All Products">
                  <CategoryAllProducts />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-vendor"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Vendor">
                  <AddVendor />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-vendors"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Vendors">
                  <AllVendors />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-vendor/:vendorId"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Vendor">
                  <SingleVendor />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor-dashboard/:vendorId"
            element={
              <PrivateRoute allowedRoles={["superadmin", "vendor"]}>
                <PageTitle title="Vendor Dashboard">
                  <VendorDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-outlet"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Outlet">
                  <AddOutlet />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-outlets"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Outlets">
                  <AllOutlets />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-outlet/:outletId"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Outlet">
                  <SingleOutlet />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/outlet-dashboard/:outletId"
            element={
              <PrivateRoute allowedRoles={["superadmin", "outlet"]}>
                <PageTitle title="Outlet Dashboard">
                  <OutletDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* blog routes..  */}
          <Route
            path="/add-blog"
            element={
              <PrivateRoute allowedRoles={["superadmin", "admin"]}>
                <PageTitle title="Add Blog">
                  <AddBlog />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-blogs"
            element={
              <PageTitle title="All Blogs">
                <AllBlogs />
              </PageTitle>
            }
          />
          <Route
            path="/single-blog/:id"
            element={
              <PageTitle title="Single Blog">
                <SingleBlog />
              </PageTitle>
            }
          />
          {/* contact routes.  */}
          <Route
            path="/all-messages"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Messages">
                  <AllMessages />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/reply-message/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Reply Message">
                  <ReplyMessage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-replies"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Replies">
                  <AllReplies />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* subscription page route */}
          <Route
            path="/all-subscriptions"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Subscriptions">
                  <Subscriptions />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* hospital routes */}
          <Route
            path="/add-hospital"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Hospital">
                  <AddHospital />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-hospitals"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="all-hospitals">
                  <AllHospitals />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-hospital/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Hospital">
                  <SingleHospital />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-hospital/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Hospital">
                  <UpdateHospital />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* doctor routes */}
          <Route
            path="/add-doctor"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Doctor">
                  <AddDoctor />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-doctors"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="all-doctors">
                  <AllDoctors />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-doctor/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Doctor">
                  <SingleDoctor />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-doctor/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Doctor">
                  <UpdateDoctor />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/doctor-appointments"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Doctor Appointments">
                  <AllDoctorAppointments />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* blood routes */}
          <Route
            path="/add-blood"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Blood">
                  <AddBlood />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-bloods"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="all-bloods">
                  <AllBloods />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-blood/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Blood">
                  <SingleBlood />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-blood/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Blood">
                  <UpdateBlood />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* treatment routes */}
          <Route
            path="/add-treatment"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Treatment">
                  <AddTreatment />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-treatments"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="all-treatments">
                  <AllTreatments />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-treatment/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Treatment">
                  <SingleTreatment />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-treatment/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Treatment">
                  <UpdateTreatment />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* patients routes */}
          <Route
            path="/add-patient"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Patient">
                  <AddPatient />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-patients"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Patients">
                  <AllPatients />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-patient/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Patient">
                  <SinglePatient />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-patient/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Update Patient">
                  <UpdatePatient />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* discharge routes */}
          <Route
            path="/add-discharge"
            element={
              <PrivateRoute allowedRoles={["superadmin", "admin", "doctor"]}>
                <PageTitle title="Add Discharge">
                  <AddDischarge />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* pediatric routes */}
          <Route
            path="/add-pediatric"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Add Pediatric">
                  <AddPediatric />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-pediatrics"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="All Pediatrics">
                  <AllPediatrics />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-pediatric/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Single Pediatric">
                  <SinglePediatric />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-pediatric/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Update Pediatric">
                  <UpdatePediatric />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* mortuary routes */}
          <Route
            path="/add-mortuary"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Add Mortuary">
                  <AddMortuary />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-mortuary"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="All Mortuary Records">
                  <AllMortuaries />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-mortuary/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Single Mortuary Record">
                  <SingleMortuary />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-mortuary/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Update Mortuary Record">
                  <UpdateMortuary />
                </PageTitle>
              </PrivateRoute>
            }
          />
          {/* discharge routes */}
          <Route
            path="/add-discharge"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Add Discharge">
                  <AddDischarge />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-discharges"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="All Discharges">
                  <AllDischarges />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-discharge/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Single Discharge">
                  <SingleDischarge />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-discharge/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin", "doctor"]}>
                <PageTitle title="Update Discharge">
                  <UpdateDischarge />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/page-not-found"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
          <Route
            path="/*"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
