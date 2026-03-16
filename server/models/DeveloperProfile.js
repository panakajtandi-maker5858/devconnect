const mongoose = require('mongoose')

const developerProfileSchema = new mongoose.Schema({

user:{
    type : mongoose.Schema.Types.ObjectId ,
    ref : "User",
    required : true,
    unique : true
},

bio:{
    type:String,
    maxlength:500
},

skills:[ String ] ,

experience : [
    {
        company : String ,
        role : String,
        description : String , 
        duration : String 
    }
] ,

education : [
    {
        school : String ,
        degree : String ,
        year : String
    }
] ,
 github: String , 
 linkedin : String , 
 website : String ,
 profilePicture : String 



}, { timestamps : true })


module.exports = mongoose.model(" DeveloperProfile" , developerProfileSchema )
