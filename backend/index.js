// 1 import all libraries.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); // For token verification
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

// import all the routes.
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const outletRoutes = require("./routes/OutletRoutes");
const vendorRoutes = require("./routes/VendorRoutes");
const entityCountRoutes = require("./routes/EntityCountRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const subscriptionRoutes = require("./routes/SubscriptionRoutes");

dotenv.config();

const app = express();
// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend's URL
    credentials: true, // Enable credentials
  })
);

app.use(express.json()); // Add this middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", contactRoutes);
app.use("/api", outletRoutes);
app.use("/api", vendorRoutes);
app.use("/api", entityCountRoutes);
app.use("/api", blogRoutes);
app.use("/api", subscriptionRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// connect to mongodb database.
mongoose
  .connect("mongodb://127.0.0.1:27017/hms")
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Unable to connect to database,", error);
  });

// create the port number to run the application
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running successfully at port number ${PORT}`);
});
