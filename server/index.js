const express = require("express");
const dotenv = require("dotenv");
const cors =  require("cors")
const connecttodb = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const { protect } = require("./middleware/authMiddleware.js")
const { errorHandler } = require('./middleware/errorMiddleware.js')
const developerRoutes = require('./routes/developerRoutes.js')
const recruiterRoutes = require("./routes/recruiterRoutes.js")
const uploadRoutes = require('./routes/uploadRoutes.js')
const jobRoutes = require('./routes/jobRoutes.js')
const applicationRoutes  = require('./routes/applicationRoutes.js')
const adminRoutes = require('./routes/adminRoutes')








dotenv.config()

const app = express()

app.use(express.json());
app.use(cors({
   origin: process.env.CLIENT_URL || 'http://localhost:5173',
   credentials: true
}))
app.use('/api/auth' , authRoutes)
app.use('/api/developer' , developerRoutes)
app.use('/api/recruiter' , recruiterRoutes)
app.use('/api/upload' , uploadRoutes )
app.use('/api/jobs' , jobRoutes)
app.use('/api/applications' , applicationRoutes)
app.use('/api/admin' , adminRoutes)






//PROTECTED ROUTE / SECURITY  FOR TOKEN GRANTING TO USER
app.get("/api/protected" , protect , (req,res)=>{
   res.json({
      message:" You are inside protected route !",
      user: req.user
   })
})





app.get('/api/test',(req,res)=>{
   res.json({
    message:"Port is Working"
   })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

connecttodb()

app.listen(PORT , ()=>{
console.log(`Server is running at PORT ${PORT}`)
})
