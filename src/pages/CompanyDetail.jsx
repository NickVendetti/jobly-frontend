import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCard from "../components/JobCard";
import UserContext from "../contexts/UserContext";
import "./CompanyDetail.css";

function CompanyDetail() {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>

      <h3>Jobs Available</h3>
      {company.jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={company.name}
        />
      ))}
    </div>
  );
}

export default CompanyDetail;