const express = require("express")
const router = express.Router()
const { RegisterUser} = require("../controllers/authController")


router.post("/register", RegisterUser)


module.exports = router ;