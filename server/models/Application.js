const mongoose = require("mongoose")


const applicationSchema = new mongoose.Schema({


job: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Job' ,
    required : true 
} ,

developer : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User' ,
    required : true 
} ,

coverLetter : {
    type : String ,
    maxlength : 1000
} ,

status : {
    type : String , 
    enum : ['pending' , 'shortlisted' , 'rejected'] , 
    default : 'pending'
}

} , { timestamps : true })

module.exports = mongoose.model('Application' , applicationSchema)

