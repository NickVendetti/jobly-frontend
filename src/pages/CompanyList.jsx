import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "../components/CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch companies from backend
  useEffect(() => {
    async function fetchCompanies() {
      let companies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companies);
    }
    fetchCompanies();
  }, [searchTerm]); // Re-fetch when searchTerm changes

  // Handle search form submission
  function handleSearch(evt) {
    evt.preventDefault();
    setSearchTerm(evt.target.search.value);
  }

  return (
    <div>
      <h1>Companies</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="search" 
          placeholder="Search companies..." 
        />
        <button type="submit">Search</button>
      </form>

      {companies.length ? (
        <ul>
          {companies.map(c => (
            <CompanyCard key={c.handle} company={c} />
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}

export default CompanyList;