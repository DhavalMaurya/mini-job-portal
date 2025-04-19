import React, { useEffect, useState } from "react";
import "./Home.css";
import JobCard from "../../components/JobCards/JobCard";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { jobTypes, locations, technologies } from "../../data/data";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    technology: "",
  });
  const [selectedType, setSelectedType] = useState("All");

  const fetchJobs = async () => {
    await axios
      .get("http://localhost:3001/api/jobs/all-jobs", {})
      .then((response) => {
        console.log(response);
        setJobs(response.data.jobs);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while fetching jobs");
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === "All" ||
        filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.technology === "All" ||
        filters.technology === "" ||
        (job.technology &&
          Array.isArray(job.technology) &&
          job.technology.some((tech) =>
            tech.toLowerCase().includes(filters.technology.toLowerCase())
          ))) &&
      (selectedType === "All" ||
        selectedType === "" ||
        (job.type &&
          job.type.toLowerCase() === selectedType.toLowerCase()))
    );
  });

  const clearFilters = () => {
    setFilters({
      location: "",
      technology: "",
    });
    setSelectedType('All');
  };

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="logo">Jobify Portal</h1>
        <div className="filters">
          <select
            className="filter-select"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
             <option value="">Select Job Type</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filters.technology}
            onChange={(e) =>
              setFilters({ ...filters, technology: e.target.value })
            }
          >
            <option value="">Select Technology</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
          <button className="clear-button" onClick={clearFilters}>
            Clear Filters
          </button>
          <button className="add-button " onClick={clearFilters}>
            <Link
              to={"/add-job"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Jobs +
            </Link>
          </button>
        </div>
      </header>

      <main className="main-content">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs">No jobs match your criteria</div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((item) => (
              <JobCard key={item._id} job={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
