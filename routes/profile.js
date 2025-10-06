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
const { auth, isStudent, isInstructor } = require("../middleware/auth.js")


router.put("/updateDisplayPicture",updateDisplayPicture)
router.put("/updateProfile",auth, updateProfile)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router


