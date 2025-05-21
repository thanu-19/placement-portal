import React, { useState } from "react";

const SearchJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");

  const jobs = [
    { title: "Marketing Manager", company: "XYZ Media", location: "Remote", salary: "$50,000 - $70,000", category: "marketing", type: "part-time" },
    { title: "Financial Manager", company: "Microsoft", location: "Remote", salary: "$50,000 - $70,000", category: "finance", type: "remote" },
    { title: "Software Engineer", company: "ABC Tech", location: "New York, USA", salary: "$80,000 - $100,000", category: "it", type: "full-time" }
  
  ];

  const filteredJobs = jobs.filter(job => {
    return (
      (searchTerm === "" || job.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || job.category === category) &&
      (jobType === "all" || job.type === jobType)
    );
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Fixing Header */}
      <header style={{
        backgroundColor: "#333", 
        color: "white", 
        padding: "15px", 
        textAlign: "center",
        width: "100%",
        position: "fixed", // Keeps it on top
        top: 0, 
        left: 0,
        zIndex: 1000, // Ensures it stays above other elements
      }}>
        <h1 style={{color: "white"}}>Job Listings</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          style={{ 
            width: "80%", 
            padding: "10px", 
            margin: "10px auto", 
            display: "block", 
            borderRadius: "5px", 
            border: "1px solid #ccc" 
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* Add padding to prevent content overlap */}
      <div style={{ paddingTop: "450px" }}> {/* Adjust this value if needed */}
        {/* Job Filters */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <select style={{ margin: "0 10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
          </select>
          <select style={{ margin: "0 10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setJobType(e.target.value)}>
            <option value="all">Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Job Listings */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          {filteredJobs.map((job, index) => (
            <div key={index} style={{
              background: "white",
              padding: "15px",
              margin: "10px",
              width: "320%",
              borderRadius: "15px",
              height: "220px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              gap: "30px",
            }}>
              <h1 style={{color: "black"}}>{job.title}</h1>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <button style={{ background: "orange", color: "white", border: "none",width: "200px",height:"40px", padding: "5px", cursor: "pointer", borderRadius: "5px" }}>
                <a href="/login" style={{ textDecoration: "none", color: "white" }}>Apply Now</a>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchJobsPage;
