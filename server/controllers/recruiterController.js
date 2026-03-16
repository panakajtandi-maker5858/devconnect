const RecruiterProfile = require("../models/RecruiterProfile")

const updateRecruiterProfile = async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({
        message: "Only recruiters can create company profile"
      })
    }

    const { companyName, companyDescription, industry, website, location, companySize } = req.body

    const profileData = {
      user: req.user._id,
      companyName,
      companyDescription,
      industry,
      website,
      location,
      companySize
    }

    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.user._id },
      profileData,
      { new: true, upsert: true }
    )

    res.status(200).json({
      message: "Company profile updated successfully",
      profile
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyRecruiterProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.user._id })
      .populate('user', 'name email role')

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ profile })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRecruiterProfileById = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email')

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ profile })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { updateRecruiterProfile, getMyRecruiterProfile, getRecruiterProfileById }