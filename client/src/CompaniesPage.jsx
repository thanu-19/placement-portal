import React from "react";
import { Link } from "react-router-dom";
import "./CompaniesPage.css"; // Importing the CSS file

const companies = [
  {
    name: "Google",
    image: "/googlepic.png",
    jobs: "Software Enginner, Web Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript",
    deadline: "January 6, 2025",
  },
  {
    name: "IBM",
    image: "/ibm.png",
    jobs: "Software Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript",
    deadline: "May 26, 2025",
  },
  {
    name: "Accenture",
    image: "/accenture.png",
    jobs: "UX Designer, Front-End Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript, UI/UX",
    deadline: "August 29, 2025",
  },
  {
    name: "Adobe",
    image: "/adobe.png",
    jobs: "Application Developer, Web Developer",
    eligibility: "B.Tech",
    skills: "MySQL, Python, JavaScript",
    deadline: "October 14, 2025",
  },
  {
    name: "HCL",
    image: "/hcl.png",
    jobs: "Data scientist, Business Analyst",
    eligibility: "B.Tech",
    skills: "Python, ML, AI",
    deadline: "April 30, 2025",
  },
  {
    name: "Intel",
    image: "/intel.png",
    jobs: "Full Stack Developer, DevOps Engineer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, Python, Bash, PowerShell",
    deadline: "May 25, 2025",
  },
  {
    name: "Adobe",
    image: "/adobe.png",
    jobs: "UX Designer, Front-End Developer",
    eligibility: "B.Tech",
    skills: "UI/UX, HTML, CSS, JavaScript",
    deadline: "September 23, 2025",
  },
  {
    name: "Infosys",
    image: "/infosys.png",
    jobs: "Cloud Engineer",
    eligibility: "B.Tech",
    skills: "Cloud platforms, CI/CD pipelines",
    deadline: "June 17, 2025",
  },
  {
    name: "Microsoft",
    image: "/microsoft.png",
    jobs: "Software Developer, Web Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript",
    deadline: "May 10, 2025",
  },
  {
    name: "Qualcomm",
    image: "/qual.png",
    jobs: "MERN Stack Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript, NodeJS, ExpressJS",
    deadline: "March 20, 2025",
  },
  {
    name: "Wipro",
    image: "/wipro.png",
    jobs: "Web Developer",
    eligibility: "B.Tech",
    skills: "HTML, CSS, JavaScript",
    deadline: "April 12, 2025",
  },
  {
    name: "TCS",
    image: "/tcs.jpeg",
    jobs: "Software Engineer, Software Developer",
    eligibility: "B.Tech",
    skills: "Java, Python, JavaScript",
    deadline: "July 5, 2025",
  },
];

const CompaniesPage = () => {
  return (
    <div className="companies-container">
      <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Fixing Header */}
      <header style={{
        backgroundColor: "#333", 
        color: "white", 
        padding: "15px", 
        textAlign: "center",
        width: "100%",
        height: "100px",
        position: "fixed", // Keeps it on top
        top: 0, 
        left: 0,
        zIndex: 1000, // Ensures it stays above other elements
      }}>
        <h1 style={{color: "white"}}>Job oppurtunities</h1>
      </header>
      </div>
      <div className="container">
        {companies.map((company, index) => (
          <div className="card" key={index}>
            <img src={company.image} alt={company.name} />
            <div className="overlay">
              <h2>{company.name}</h2>
              <p><strong>Job Offers:</strong> {company.jobs}</p>
              <p><strong>Eligibility:</strong> {company.eligibility}</p>
              <p><strong>Skills Required:</strong> {company.skills}</p>
              <p><strong>Deadline:</strong> {company.deadline}</p>
              <p className="high"><Link to="#">Know more</Link></p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default CompaniesPage;