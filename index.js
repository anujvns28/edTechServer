const express = require("express");
const { dbConnect } = require("./config/database");
const app = express();
const authRoute = require("./routes/auth")
const cors = require("cors")

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//data base connection
dbConnect();

app.use(express.json())
app.use(cors({}))

// mounting
app.use("/api/v1/auth",authRoute);



app.listen(PORT , () => {
    console.log("server started successfully")
})


//  starting date 25/02/24
