const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "https://mern-task-akjesus.onrender.com",
    ],
  })
);

//ROUTERS
const taskRouter = require("./routes/taskRoute");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//APP ROUTES
app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ success: true, statusCode: 200, message: "Home Route!" });
});

//API ROUTES
app.use("/api/v1/tasks", taskRouter);

//NOT FOUND ROUTE
app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ success: false, statusCode: 404, error: "Route not found" });
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
