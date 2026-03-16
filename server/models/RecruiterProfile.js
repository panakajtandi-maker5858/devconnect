const mongoose =  require("mongoose")

const recruiterProfileSchema =  new mongoose.Schema({

user:{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User' ,
    required : true , 
    unique : true 
} ,


companyName : {
    type : String , 
    required : [ true , " Company name is required"] ,
    trim : true 
} ,

industry : {
    type : String ,
    trim : true 
} , 
website : {
    type : String ,
    trim : true 
} , 

location : {
    type : String , 
    trim : true 
} , 

companySize : {
    type : String ,
    enum : [ '1-10' , '11-50', '51-200', '201-500', '500+'] ,
} ,

logo : {
    type : String 
}


}, { timestamps :  true })

module.exports = mongoose.model('RecruiterProfile' , recruiterProfileSchema)