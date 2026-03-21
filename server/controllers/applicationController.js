const Application = require('../models/Application')
const Job = require('../models/Job')

// Job ke liye apply karo
const applyForJob = async (req, res) => {
  try {
    if (req.user.role !== 'developer') {
      return res.status(403).json({
        message: 'Only developers can apply for jobs'
      })
    }

    const { coverLetter } = req.body
    const jobId = req.params.jobId

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      developer: req.user._id
    })

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job'
      })
    }

    const application = await Application.create({
      job: jobId,
      developer: req.user._id,
      coverLetter
    })

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Developer ki apni saari applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      developer: req.user._id
    })
      .populate('job', 'title location jobType salaryMin salaryMax')
      .sort({ createdAt: -1 })

    res.status(200).json({ applications })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Recruiter — apni job ki saari applications
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('developer', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({ applications })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Application status update karo — Recruiter
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body

    const application = await Application.findById(req.params.id)
      .populate('job')

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    application.status = status
    await application.save()

    res.status(200).json({
      message: 'Application status updated',
      application
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
}