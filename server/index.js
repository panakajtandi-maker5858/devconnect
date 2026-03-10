const express = require("express");
const dotenv = require("dotenv");
const cors =  require("cors")
const connecttodb = require("./config/db.js")



dotenv.config()

const app = express()

app.use(express.json());
app.use(cors())

app.get('/api/test',(req,res)=>{
   res.json({
    message:"Port is Working"
   })
})

const PORT = process.env.PORT || 5000

connecttodb()

app.listen(PORT , ()=>{
console.log(`Server is running at PORT ${PORT}`)
})