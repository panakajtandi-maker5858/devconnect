const express = require('express')
const router = express.Router()
const  { protect } = require("../middleware/authMiddleware")

const {
     createJob ,
    getAllJobs ,  
    getJobById ,
    updateJob ,
    deleteJob ,
    getMyjobs
} = require('../controllers/jobController')




router.post('/' , protect , createJob)
router.get('/' , getAllJobs)
router.get('/my-jobs' , protect , getMyjobs)
router.get('/:id' , getJobById)
router.put('/:id' , protect , updateJob)
router.delete('/:id' , protect , deleteJob)


module.exports = router 