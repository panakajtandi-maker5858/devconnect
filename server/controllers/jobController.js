const Job = require('../models/job')

// TO CREATE JOB - ONLY RECRUITER
const createJob = async(req, res) =>{
    try{
        if( req.user.role !== 'recruiter') {
            return res.status(403).json({
                message : 'Only recruiters can post jobs '
            })
        }

    const {
        title , description , location , jobType ,
        salaryMin , salaryMax , skillsRequired ,
        experienceLevel , deadline 
    } = req.body

    const job = await Job.create({
        title , 
        description , 
        location ,
        jobType ,
        salaryMin ,
        salaryMax , 
        skillsRequired : skillsRequired ?
        skillsRequired.split(',').map(s => s.trim()) : [] ,
        experienceLevel ,
        deadline ,
        recruiter : req.user._id 
    })

    res.status(201).json({
        message : 'Job posted successfully' ,
        job 
    })

    } catch( error) {
        res.status(500).json({ message : error.message})
    }
}

// FOR SEEING ALL POSTS -- search , filter , pagination 
const getAllJobs = async (req, res)=>{
    try{
        const { keyword , location , jobType , experienceLevel ,page = 1 , limit = 10} = req.query
      
// Dynamic query build karo 
const query = { status : 'open'}

if(keyword) {
    query.title = { $regex : keyword , $options : 'i'}
}
if(location) {
    query.title = { $regex : location , $options : 'i'}
}
if(jobType) {
    query.jobType = jobType 
}
if(experienceLevel) {
    query.experienceLevel = experienceLevel
}



const skip = (page - 1 ) * limit 

const jobs = await Job.find(query)
.populate('recruiter', 'name email')
.sort({ createAt : -1})
.skip(skip)
.limit(Number(limit))

const total = await Job.countDocuments(query)

res.status(200).json({
    jobs , 
    total , 
    page : Number(page) ,
    totalPages : Math.ceil(total / limit )
})

    } catch(error) {
    res.status(500).json({message : error.message})
    }
}


// Single Job dekho 
const getJobById = async (req , res)=>{
    try{

      const job = await Job.findById(req.params.id)
      .populate('recruiter' , 'name email')

      if(!job){
        return res.status(404).json({message : 'Job not found '})
      }

     res.status(200).json({ job })

    } catch (error) {
re.status(500).josn({ message : error.message })
    }
}


// Job post kro -- sirf vo jo recruiter ne post ki thi 
const updateJob = async(req, res)=>{
    try{
          const job = await Job.findById(req.params.id)     

          if(!job) {
            return res.status(404).josn({message : 'Job not found'})
          }

          // Sirf wahi recruiter update kar sake 
          if(job.recruiter.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to update this job "
            })
          }

          const updateJob = await Job.findByIdAndUpdate(
            req.params.id , 
            req.body ,
            { new : true }
          )

          res.status(200).josn({
            message : 'Job updated successfully' ,
            job : updateJob
          })

    } catch(error){
       res.status(500).json({ message : error.message})
    }
}


// Job delete function 
const deleteJob = async (req , res) =>{

try {
    const job = await Job.findById(req.params.id)

  if(!job) {
    return res.status(404).josn({message : 'Job not found'})
  }

  if(job.recruiter.toString() !== req.user._id.toString()) {
    return res.status(403).josn({
        message : 'Not authorized to delete this job'
    })
  }

  await Job.findByIdAndDelete(req.params.id)

  res.status(200).json({message : "job deleted successfully"})

} catch (error) {
    res.status(500).json({ message : error.message})
}

}

// Recruiter ki apni sarri jobs 
const getMyjobs = async (req, res )=>{
    try{
        const jobs = await Job.find({recruiter : req.user._id})
        .sort({ createdAt : -1})

        res.status(200).json({ jobs })
    } catch (error) {
        res.status(500).json( {message : error.message})
    }
}



module.exports = {
    createJob ,
    getAllJobs ,  
    getJobById ,
    updateJob ,
    deleteJob ,
    getMyjobs
}