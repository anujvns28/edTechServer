const express = require("express")
const router = express.Router()

const {
    deleteAccount,
    getAllUserDetails,
    getEnrolledCourses,
    instructorDashboard,
    updateDisplayPicture,
    updateProfile
} = require("../controller/profile.js")
const { auth, isStudent } = require("../middleware/auth.js")


router.put("/updateDisplayPicture",updateDisplayPicture)
router.put("/updateProfile",auth,isStudent, updateProfile)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

module.exports = router


