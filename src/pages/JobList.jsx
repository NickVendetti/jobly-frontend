import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";  // Import API helper to fetch jobs
import JobCard from "../components/JobCard"; // Import JobCard component

function JobList() {
  const [jobs, setJobs] = useState([]);  // State to store job listings
  const [searchTerm, setSearchTerm] = useState(""); //  State for search input

  // Fetch jobs from backend when component loads & when searchTerm changes
  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs(searchTerm); //  Calls API to get jobs
      setJobs(jobs); //  Updates state with job data
    }
    fetchJobs();
  }, [searchTerm]); // Runs whenever searchTerm changes

  // Handles the search form submission
  function handleSearch(evt) {
    evt.preventDefault(); //  Prevents page refresh
    setSearchTerm(evt.target.search.value); //  Updates searchTerm state
  }

  return (
    <div>
      <h1>Jobs</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          placeholder="Search jobs..." 
        />
        <button type="submit">Search</button>
      </form>

      {jobs.length ? (
        <ul>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} /> // Renders JobCard for each job
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p> // Displays message if no jobs are found
      )}
    </div>
  );
}

export default JobList;