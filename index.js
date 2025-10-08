const express = require("express");
const { dbConnect } = require("./config/database");
const app = express();
const authRoute = require("./routes/auth")
const profileRoute = require("./routes/profile")
const courseRoute = require("./routes/course")
const paymentRoute = require("./routes/payment")
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudenary");
const { default: axios } = require("axios");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//data base connection
dbConnect();
cloudinaryConnect();

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", // frontend ka URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// mounting
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);

app.listen(PORT, () => {
  console.log("server started successfully");
});


