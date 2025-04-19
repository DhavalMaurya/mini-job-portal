const express = require('express');
const router = express.Router();
const { addJob, getAllJobs, getJobDetails } = require('../controller/Jobs'); // Import controller functions

// Route to add a new job
router.post('/add-job', addJob);

// Route to get all jobs
router.get('/all-jobs', getAllJobs);

// Route to get job details by ID
router.get('/:id', getJobDetails);

module.exports = router;