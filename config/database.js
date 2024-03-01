const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () =>{
    console.log(process.env.DATABASE_URL,"data base connection")
    
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB Connection successfully"))
    .catch((err)=>{
        console.log("err occered in during dbconnection")
        console.log(err)
    })
}