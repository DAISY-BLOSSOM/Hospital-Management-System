require("dotenv").config();
require("./app/db/connection");
const formData = require("express-form-data");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./app/routes/user.route");
const medicineRoutes = require("./app/routes/medicine.route");
const departmentRoutes = require("./app/routes/department.route");
const appointmentRoutes = require("./app/routes/appointment.route");
const labResultsRoutes = require("./app/routes/labResults.route");
const reportsRoutes = require("./app/routes/report.route");
const myHelper = require("./app/helpers/methods");
const app = express();

app.use(cors());
app.use(express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/labResults", labResultsRoutes);
app.use("/api/reports", reportsRoutes);
app.all("*", (req, res) => {
    myHelper.resGenerator(res, 404, "Invalid url", "not found");
});
app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
);
