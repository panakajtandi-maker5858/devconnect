const User = require('../models/User')
const Job = require('../models/Job')
const Application = require('../models/Application')

// Saare users dekho
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })

    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// User ban/unban karo
const toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Admin khud ko ban nahi kar sakta
    if (user.role === 'admin') {
      return res.status(403).json({
        message: 'Admin ko ban nahi kar sakte!'
      })
    }

    user.isBanned = !user.isBanned
    await user.save()

    res.status(200).json({
      message: user.isBanned ? 'User banned' : 'User unbanned',
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Saari jobs dekho
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Koi bhi job delete karo
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    await Job.findByIdAndDelete(req.params.jobId)

      // Job ki saari applications bhi delete karo
    await Application.deleteMany({ job: req.params.jobId })

    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Stats dekho
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({})
    const totalDevelopers = await User.countDocuments({ role: 'developer' })
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' })
    const totalJobs = await Job.countDocuments({})
    const openJobs = await Job.countDocuments({ status: 'open' })
    const totalApplications = await Application.countDocuments({})

    res.status(200).json({
      totalUsers,
      totalDevelopers,
      totalRecruiters,
      totalJobs,
      openJobs,
      totalApplications
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllUsers, toggleBanUser, getAllJobs, deleteJob, getStats }




