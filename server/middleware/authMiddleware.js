const User = require("../models/User")
const jwt = require("jsonwebtoken")


 // SECURITY OR PROTECT FUNCTION 
 const protect = async (req, res , next)=>{

    try{


// token hai request mein 
const authHeader = req.headers.authorization 

if(!authHeader || !authHeader.startsWith('Bearer ')){
   return res.status(401).json({
        message:" No Token , access denied"
    })
}

// Getting token 
const token = authHeader.split(' ')[1]

// Verifying the token 
const decoded = jwt.verify(token ,  process.env.JWT_SECRET)

// Adding user in req 
 req.user = await User.findById(decoded.userId).select('-password')

 
  next()

}

catch(error){
res.status(401).json({
    message: "Token Invalid or Expired"
})
}


}
module.exports  = { protect}