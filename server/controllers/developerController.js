const DeveloperProfile = require("../models/DeveloperProfile")

const updateProfile = async (req, res) => {
  try {
    const { bio, skills, experience, education, github, linkedin, website } = req.body

    const profiledata = {
      user: req.user._id,
      bio,
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      experience,
      education,
      github,
      linkedin,
      website
    }

    const profile = await DeveloperProfile.findOneAndUpdate(
      { user: req.user._id },
      profiledata,
      { new: true, upsert: true }
    )

    res.status(200).json({
      message: "Profile updated successfully",
      profile
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyProfile = async (req, res) => {
  try {
    const profile = await DeveloperProfile.findOne({ user: req.user._id })
      .populate('user', 'name email role')

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ profile })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProfileById = async (req, res) => {
  try {
    const profile = await DeveloperProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email')

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ profile })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { updateProfile, getMyProfile, getProfileById }