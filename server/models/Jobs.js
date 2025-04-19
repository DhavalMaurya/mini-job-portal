const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    salary: Number,
    location: String,
    company: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    technology :[ {
        type : String , 
        default : []
    }]
})

const Jobs = new mongoose.model("jobs" ,jobSchema);

module.exports = Jobs
