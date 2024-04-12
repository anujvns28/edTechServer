const express = require("express")
const router = express.Router()

const {capturePayment} = require("../controller/Payment.js")
const { auth, isStudent } = require("../middleware/auth.js")

router.post("/capturePayment",auth,isStudent,capturePayment);


module.exports = router