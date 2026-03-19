const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { upload } = require("../config/cloudinary")
const { uploadProfilePicture } = require('../controllers/uploadController')



router.post('/profile-picture' , protect , upload.single('image') , uploadProfilePicture)

module.exports = router 