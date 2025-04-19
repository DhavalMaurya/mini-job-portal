import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaCode, FaCalendarAlt } from 'react-icons/fa';
import './JobDetails.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {id} = useParams();
  
  const fetchJobDetails = async () => {
    await axios.get(`http://localhost:3001/api/jobs/${id.trim()}`)
    .then((response)=>{
      console.log(response.data.job)
      setJob(response.data.job);
      setLoading(false)
    })
    .catch((error)=>{
      console.log("error",error);
      toast.error("Failed to get job details");
    })
  }

  useEffect(() => {
    fetchJobDetails();
  }, []);

  if (loading) {
    return <div className="job-details-page">Loading...</div>;
  }

  if (error) {
    return (
      <div className="job-details-page">
        <button className="go-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft className="go-back-icon" />
          Go Back
        </button>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <header className="job-header">
        <button className="go-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft className="go-back-icon" />
          Go Back
        </button>
        <div className="header-content">
          <h1>{job.title}</h1>
          <p className="company-name">{job.company}</p>
        </div>
      </header>
      <section className="job-details-section">
        <div className="details-grid">
          <div className="detail-item">
            <FaBuilding className="detail-icon" />
            <div>
              <strong>Company</strong>
              <p>{job.company}</p>
            </div>
          </div>
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <div>
              <strong>Location</strong>
              <p>{job.location}</p>
            </div>
          </div>
          <div className="detail-item">
            <FaBriefcase className="detail-icon" />
            <div>
              <strong>Type</strong>
              <p>{job.type}</p>
            </div>
          </div>
          {job.salary && (
            <div className="detail-item">
              <FaDollarSign className="detail-icon" />
              <div>
                <strong>Salary</strong>
                <p>${job.salary.toLocaleString()}</p>
              </div>
            </div>
          )}
          {job.technology && job.technology.length > 0 && (
            <div className="detail-item">
              <FaCode className="detail-icon" />
              <div>
                <strong>Technologies</strong>
                <p>{job.technology.join(', ')}</p>
              </div>
            </div>
          )}
          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <div>
              <strong>Posted</strong>
              <p>{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="description-section">
          <h2>Description</h2>
          <p>{job.description}</p>
        </div>
        <button className="apply-button">Apply Now</button>
      </section>
    </div>
  );
};

export default JobDetails;