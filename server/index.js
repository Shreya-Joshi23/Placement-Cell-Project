const express = require("express");
const cors = require("cors");

const { connection } = require("./db");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

//auth route
const authRoute = require("./routes/authRoute");
app.use("/api", authRoute);

//adminroute
const adminRoute = require("./routes/adminRoute");
app.use("/api/admin", adminRoute);

//Student Route
const studentRoute=require("./routes/stuRoute");
app.use("/api/student",studentRoute);

app.get("/", (req, res) => {
  res.send({ message: "API is running now" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running on port number", port);
});
