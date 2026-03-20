const Application  = require('../models/Application')
const Job = require('../models/Job')


// Job ke loye apply karo 
const applyForJob = async ( req, res) =>{

try {

  // Sirf developer apply kar sake 
  if(req.user.role !== 'developer') {
    return res.status(403).json({
        message : 'Only develoopers can apply for jobs '
    })
  }

  const { coverLetter } = req.body 
  const jobId = req.params.jobId

  // Job exist karti hai ?
  const job = await Job.findById(jobId)
  if(!job) {
    return res.status(404).json({ message : 'Job not found'})
  }

  // Phele se apply kiya hua hai ?
   const existingApplication = await Application.findOne({
    job : jobId ,
    developer : req.user._id
   })

if (existingApplication) {
    return res.status(400).json({
        message : 'You have already applied for this job'
    })
}

const application = await Application.create({
    job : jobId ,
    developer : req.user._id ,
    coverLetter
})

res.status(201).json({
    message : "Application submitted successfully " ,
    application 
})

} catch(error) {
    res.status(500).json({ message : error.message})
}


}

// Developer ki apni saari applications 
const getMyApplications = async (req, res)=>{
    try{
        const applications = await Application.find({
            developer : req.user._id 
        })
        .populate('job' , 'title location jobType salaryMin salaryMax')
        .sort({ createdAt : -1})

        res.status(200).json({ applications })

    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

// Recruiter - apni job ki sarri applications
const getJobApplications = async (req,res) =>{
    try{
        const job = await Job.findById(req.params.jobId)

       if(!job) {
        return res.status(404).json({ message : 'Job not found'})
       }

       // Sirf us job ka recruiter dekh sake 
       if(job.recruiter.toString()  !== req.user._id.toString()) {
        return res.status(403).json({
            message : 'Not authorized'
        })
       }


       const applications = await Application.find({ job : req.params.jobId})
       .populate('developer', 'name email')
       .sort({ createAt : -1})

       res.status(200).josn({ applications })

    } catch(error) {
       res.status(500).json({ message : error.message})
    }
}

// Application status update karo - Recruiter
const updateApplicationStatus = async (req,res)=>{
    try{
        const { status } = req.body
        const applications = await Application.findById(req.params.id)
        .populate('job')

    if(!application) {
        return res.status(404).json({message : 'Application not found'})
    }

    // Sirf us job ka recruiter status update kar sake 
    if(application.job.recruiter.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message : 'Not authorized'})
    }

    application.status = status 
    await application.save()

    res.status(200).josn({
   message : 'Application status updated' ,
   application 
    })


    } catch( error) {
        res.status(500).json({ message : error.message})
    }
}

module.exports = {
    applyForJob,
    getMyApplications ,
    getJobApplications ,
    updateApplicationStatus
}