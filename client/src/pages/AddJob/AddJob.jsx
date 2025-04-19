import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./AddJob.css";
import axios from "axios";
import { toast } from "react-toastify";
import { locations } from "../../data/data";
const url = import.meta.env.VITE_API_URL;

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    company: "",
    type: "",
    technology: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.company ||
      !formData.type
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await axios
        .post(
          `${url}/add-job`,
          {
            ...formData,
            salary: formData.salary ? Number(formData.salary) : undefined,
            technology: formData.technology
              ? formData.technology.split(",").map((tech) => tech.trim())
              : [],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Job added successfully");
          setSuccess("Job added successfully!");
          setFormData({
            title: "",
            description: "",
            salary: "",
            location: "",
            company: "",
            type: "",
            technology: "",
          });
        })
        .catch(() => {
          setError(data.message || "Failed to add job");
        });
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="add-job-container">
      <button className="go-back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="go-back-icon" />
        Go Back
      </button>
      <h2>Add New Job</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
            required
          />
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job role and responsibilities"
            required
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 60000"
          />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select location</option>
            {locations.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Tech Corp"
            required
          />
        </div>
        <div className="form-group">
          <label>Job Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select job type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group">
          <label>Technologies (comma-separated)</label>
          <input
            type="text"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            placeholder="e.g. JavaScript, React, Node.js"
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
