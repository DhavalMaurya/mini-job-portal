import React from 'react';
import './JobCard.css';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <Link to={`/job-details/${job._id}`} style={{ textDecoration: 'none' }}>
        <div className="job-card-header">
          <h3 className="job-title">{job.title}</h3>
          <span className={`job-type-badge ${job.type.toLowerCase().replace(' ', '-')}`}>
            {job.type}
          </span>
        </div>
        <div className="job-details">
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          {job.experience && <p><strong>Experience:</strong> {job.experience}</p>}
          {job.technology && <p><strong>Technology:</strong> {job.technology.join(', ')}</p>}
        </div>
        {/* <button className="apply-button">Apply Now</button> */}
      </Link>
      <div className="job-card-footer">
        <Link to={`/job-details/${job._id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default JobCard;
