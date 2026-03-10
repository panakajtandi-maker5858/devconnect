const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

naam:{
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
    enum:['Developer','Recruiter', 'Admin'],
    default:"Developer"
}



},{timestamps:true})

module.exports = mongoose.model("User", UserSchema)