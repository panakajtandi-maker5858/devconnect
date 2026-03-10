const User = require('../models/User')
const bcrypt = require("bcryptjs")


const RegisterUser = async (req,res)=>{

    try{
  const { naam , email , password , role} = req.body

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
    naam,
    email,
    password : Hashedpassword,
    role
})

//  NOW SEND SUCCESS RESPONSE

res.status(201).json({
    message:"User resgistered successfully",

    user:{
        userId : user._id,
    name : user.naam ,
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


module.exports = { RegisterUser}