const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { updateProfile, getMyProfile, getProfileById } = require('../controllers/developerController')

router.put('/profile', protect, updateProfile)
router.get('/profile/me', protect, getMyProfile)
router.get('/profile/:userId', getProfileById)

module.exports = router