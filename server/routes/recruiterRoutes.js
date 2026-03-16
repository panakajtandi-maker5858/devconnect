const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { updateRecruiterProfile, getMyRecruiterProfile, getRecruiterProfileById } = require("../controllers/recruiterController")

router.put('/profile', protect, updateRecruiterProfile)
router.get('/profile/me', protect, getMyRecruiterProfile)
router.get('/profile/:userId', getRecruiterProfileById)

module.exports = router