require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = (req,res,next) => {
    try{
      
    const token =   req.body.token || req.header("Authorization").replace("Bearer ","") 

    if(!token){
        return res.status(403).json({
            success:false,
            message:"Token is Missing"
        })
    }

    try{
    const decode = jwt.verify(token,process.env.JWT_SECRET);

    // console.log(decode,"that is decoded token")
    req.user = decode
    }catch(err){
        return res.status(403).json({
            success:false,
            message:"This is not Vallied token"
        }) 
    }
    next();
    }catch(error){
        console.log(error,"error occured in validating token")
        return res.status(401).json({
            success:false,
            message:"something went wrong whle validating token"
        })
    }
}


exports.isStudent = async(req,res,next) => {
    try{
    const accountType = req.user.accountType
    
    if(accountType !== "Student"){
        return res.status(500).json({
            success:false,
            message:"This is protected route for student"
        })
    }
    next();
    }catch(err){
        return res.status(403).json({
            success:false,
            message:"Error ocurring in stduent middlewrre"
        })
    }
}


exports.isInstructor = async(req,res,next) => {
    try{
    const accountType = req.user.accountType
    
    if(accountType !== "Instructor"){
        return res.status(500).json({
            success:false,
            message:"This is protected route for Instructor"
        })
    }
    next();
    }catch(err){
        return res.status(403).json({
            success:false,
            message:"Error ocurring in stduent middlewrre"
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
    const accountType = req.user.accountType
    
    if(accountType !== "Admin"){
        return res.status(500).json({
            success:false,
            message:"This is protected route for Admin"
        })
    }
    next();
    }catch(err){
        return res.status(403).json({
            success:false,
            message:"Error ocurring in stduent middlewrre"
        })
    }
}


