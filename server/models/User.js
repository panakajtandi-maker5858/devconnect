const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

name:{
    type:String,
    required:[ true , "Name is required"],
    trim:true
},

email:{
    type:String,
    required:[true , ' Email is required'],
    unique:true,
    lowercase:true
},

password:{
    type:String, 
    required:[true , ' Password is mandatory'],
    minlength:6
},

role:{
    type:String,
    enum:['developer','recruiter', 'admin'],
    default:"Developer"
} ,

isBanned : {
    type: Boolean ,
    default : false 
}

},{timestamps:true})


// YHA PAR HUMNE 2 STEP KO 1 KAR DIYA [ USER ] KO USE KRE GE AUTHCONTROLLER ME 
// YE STEP MERGE KAR DIYA 
// const User = mongoose.model("User", UserSchema)

module.exports = mongoose.model("User", UserSchema)