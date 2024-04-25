const express = require("express")
const router = express.Router()

const {capturePayment,veryfyPayment} = require("../controller/Payment.js")
const { auth, isStudent } = require("../middleware/auth.js")

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment", auth, isStudent, veryfyPayment)

module.exports = router