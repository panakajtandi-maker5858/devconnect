const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { adminOnly } = require('../middleware/adminMiddleware')
const {
  getAllUsers,
  toggleBanUser,
  getAllJobs,
  deleteJob,
  getStats
} = require('../controllers/adminController')

// Dono middleware lagate hain — pehle token check, phir admin check
router.get('/users', protect, adminOnly, getAllUsers)
router.put('/users/:userId/ban', protect, adminOnly, toggleBanUser)
router.get('/jobs', protect, adminOnly, getAllJobs)
router.delete('/jobs/:jobId', protect, adminOnly, deleteJob)
router.get('/stats', protect, adminOnly, getStats)

module.exports = router