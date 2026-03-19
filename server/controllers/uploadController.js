// Cloudinary pur image chali gyi , URL mil gya aub ye url database me save karna hain 
// takki profiule picture hamesha dikh sake , Isliye ye file banai hain 

const DeveloperProfile = require('../models/DeveloperProfile')

const uploadProfilePicture = async (req, res) =>{
    try {
        // MULTER HAS UPLOADED THE FILES AND WE GET THE URL 
        if(!req.file) {
            return res.status(400).json({ message : 'NO file uploaded'})
        }


// URL given by cloudinary is accepted here.
const imageUrl = req.file.path 


// SAVE THE URL IN THE PROFILE 
const profile = await DeveloperProfile.findOneAndUpdate(
    { user : req.user._id } ,
    { profilePicture : imageUrl } ,
    { new : true , upsert : true }
)


res.status(200).json({
    message : 'Profile picture uploaded successfully ' ,
    imageUrl , 
    profile 
})

    }  catch(error ){
         console.log('Upload error:', error)
       res.status(500).json({ message : error.message})
      
    }
    
}



module.exports = { uploadProfilePicture }