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


router.put("/updateDisplayPicture",auth, updateDisplayPicture)
router.put("/updateProfile",auth,isStudent, updateProfile)

module.exports = router


