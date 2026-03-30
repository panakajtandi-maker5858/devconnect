const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

title : {
    type : String ,
    required : [true , 'job title is required'] ,
    trim : true 
} ,

description: {
    type : String ,
    required : [true , 'Job description is required ']
} ,

recruiter : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User' ,
    required : true 
} ,

company : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'RecruiterProfile'
} ,

location : {
    type : String ,
    trim : true 
} ,

jobType : {
    type : String ,
    enum : ['remote' , 'onsite' , 'hybrid'] ,
    default : 'onsite'
} ,

salaryMin : {
    type : Number
},

skillsRequired : [String] ,

experienceLevel : {
    type : String , 
    enum : ['fresher' , 'junior' , 'senior'] ,
    default : 'fresher'
} ,

deadline : {
    type : Date
} ,

status : {
    type : String ,
    enum : ['open' , 'closed'] ,
    default : 'open'
} 

} , { timestamps : true })

module.exports = mongoose.model('Job' , jobSchema)

