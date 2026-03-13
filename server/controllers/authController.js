const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// REGISTER FUNCTION 
const RegisterUser = async (req,res)=>{

    try{
  const { name , email , password , role} = req.body

  //    checking the email if already exist

  const UserAlreadyexist = await User.findOne({email})
  if(UserAlreadyexist){
  return  res.status(400).json({
        message:"Email Already Exist"
    })
  }

  // Now we Hash the password that we get from req.body of line no.8

const Hash = await bcrypt.genSalt(10)
const Hashedpassword = await bcrypt.hash(password , Hash)


// NOW SAVE THE DATA OF NEW USER 

const user = await User.create({
    name,
    email,
    password : Hashedpassword,
    role
})

//  NOW SEND SUCCESS RESPONSE

res.status(201).json({
    message:"User resgistered successfully",

    user:{
        userId : user._id,
    name : user.name ,
    email : user.email , 
    role : user.role 
    }
})



    }

    catch(error){
res.status(500).json({
    message : error.message
})
    }

}

// LOGIN FUNCTION 

const LoginUser = async  (req,res)=>{

    try{
const { email , password } = req.body

// Finding User Via Email 
  const  user = await User.findOne({email})

  if(!user){
    return res.status(400).json({
        message : "Email and Password are Invalid"
    })
  }

// If Email is correct then check the passsword 

const isMatch = await bcrypt.compare(password , user.password)
if(!isMatch){
   return res.status(400).json({
        message:"Email and Password are Invalid"
    })
}

// If password is correct then We Create JWT Token
const token = jwt.sign(

    { userId: user._id , role: user.role},
     process.env.JWT_SECRET , 
     { expiresIn: process.env.JWT_EXPIRE}
    
)

// Now give response and provide token to User 
res.status(200).json({
    message:" Login successful",
    token,
    user:{
        userId: user._id,
        name: user.name , 
        email : user.email , 
        role : user.role 
    }
})


    }


catch(error){
    res.status(500).json({
        message: error.message
    })
}


}

module.exports = { RegisterUser , LoginUser }