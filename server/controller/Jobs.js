const Jobs = require('../models/Jobs'); 

// Add a new job
const addJob = async (req, res) => {
  try {
    const { title, description, salary, location, company, type, technology } = req.body;

    // Validate required fields
    if (!title || !description || !location || !company || !type) {
      return res.status(400).json({ success : false ,message: 'Required fields are missing' });
    }

    const savedJob = await Jobs.create({
      title,
      description,
      salary,
      location,
      company,
      type,
      technology: technology || [],
    });

    res.status(201).json({success : true , message: 'Job added successfully', job: savedJob });
  } catch (error) {
    res.status(500).json({success : false , message: 'Error adding job', error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ createdAt: -1 });
    res.status(200).json({success : true , jobs });
  } catch (error) {
    res.status(500).json({success : true , message: 'Error fetching jobs', error: error.message });
  }
};

// Get job details by ID
const getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId)
    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({success : true , message : "fetch job details fetch successfully" , job : job });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error: error.message });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobDetails,
};