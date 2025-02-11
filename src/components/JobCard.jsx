import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import JoblyApi from "../api/api";
import "./JobCard.css";

function JobCard({ job }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(
    currentUser?.applications?.includes(job.id) || false
  );

  console.log("🔍 JobCard received job:", job); // ✅ Debugging log

  async function apply() {
    if (!applied) {
      console.log("🚀 Applying to job:", job.id); // ✅ Debugging log
  
      try {
        let res = await JoblyApi.applyToJob(job.id); // ✅ Apply for job
        console.log("✅ Application response:", res);
  
        setCurrentUser(prevUser => ({
          ...prevUser,
          applications: [...prevUser.applications, job.id]
        }));
  
        setApplied(true);
      } catch (err) {
        console.error("❌ Error applying to job:", err);
      }
    }
  }

  return (
    <li>
      <h2>{job.title}</h2>
      <p>Company: {job.companyName || "N/A"}</p>
      <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : "Not listed"}</p>
      <p>Equity: {job.equity ? job.equity : "None"}</p>
      
      {currentUser ? (
        <button onClick={apply} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </button>
      ) : (
        <p>Please log in to apply.</p>
      )}
    </li>
  );
}

export default JobCard;