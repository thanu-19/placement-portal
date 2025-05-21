import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AppliedPage.css";

const AppliedPage = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        if (!studentId) {
            alert("User not logged in!");
            return;
        }

        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/applied-jobs/${studentId}`);
                setAppliedJobs(response.data);
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, [studentId]);

    const companyLogos = {
        "tcs": "/logos/tcs.png",
        "google": "/logos/google.png",
        "amazon": "/logos/amazon.png",
        "accenture": "/logos/accenture.png",
        "adobe": "/logos/adobe.png",
        "infosys": "/logos/infosys.png",
        "intel": "/logos/intel.png",
        "microsoft": "/logos/microsoft.png",
        "wipro": "/logos/wipro.png",
        "ibm": "/logos/ibm.png",
        "hcl": "/logos/hcl.png",
        "qualcomm": "/logos/qualcomm.png",
        "oracle": "/logos/oracle.png"
    };

    const jobDetailsData = {
        "hcl": {
            details:"HCL Technologies is a leading global IT services and consulting company headquartered in India. Founded in 1976, it provides services in software development, digital transformation, cloud computing, cybersecurity, and engineering solutions. HCL serves various industries, including healthcare, finance, and manufacturing, with a strong presence in over 50 countries.Known for innovation and customer-centric solutions, it is one of the top IT firms globally. ",
            hrName: "Amit Sharma",hrEmail: "amit.sharma@hcl.com",hrPhone: "7788540310",designation: "Data Scientist",
            package: "8 LPA",locations: "📍 Indore",driveDate: "📅 2025-04-15",applyBefore: "📅 2025-04-10",
            eligibility: "B.Tech, M.Tech",cgpaRequirement: "7.0",responsibilities: "💻 Continuous Learning, Team Collaboration",
            backlogs: "Max 1",perks: "✅ Company Discounts, Bonus",selections: "Online Test -> Technical Round -> HR Interview"
        },
        "infosys": {
            details: "Infosys is a global IT services and consulting company headquartered in India. Founded in 1981, it provides software development, digital transformation, AI, cloud computing, and cybersecurity solutions. Infosys is known for its innovation, strong global presence, and focus on sustainability and employee growth.",
            hrName: "Priya Verma",hrEmail: "priya.verma@infosys.com",hrPhone: "9996543261",designation: "Marketing Manager",
            package: "25 LPA",locations: "📍 Kolkata",driveDate: "📅 2025-04-01",applyBefore: "📅 2025-03-25",eligibility: "B.Tech, M.Tech, MCA",
            cgpaRequirement: "8.0",backlogs: "No Backlogs",selections: "Online Test -> Technical Round -> HR Interview",
            responsibilities:"💻 Problem Solving, Time Management ",perks: "✅ Salaries & Bonus, Paid leaves"
            
        },
        "accenture": {
            details: "Accenture is a leading global IT services, consulting, and business process outsourcing company headquartered in India. It provides services in cloud computing, AI, cybersecurity, and software development across various industries.",
            hrName: "Punith Rao",hrEmail: "punith.rao@accenture.com",hrPhone: "9776543212",
            designation: "Front end developer",package: "12 LPA",locations: "📍 Kerala",driveDate: "📅 2025-05-10",
            applyBefore: "📅 2025-05-1",eligibility: "B.Tech",cgpaRequirement: "8.5",responsibilities:"🔐 Data Security & Compliance,  Client Interaction",
            backlogs: "0",selections: "Online Test -> Technical Round -> HR Interview",perks: "✅ Competitive Salary & Performance Bonuses"
        },
        "wipro": {
            details: "Wipro is a leading global IT services, consulting, and business process outsourcing company headquartered in India. It provides services in cloud computing, AI, cybersecurity, and software development across various industries.",
            hrName: "Rahul Singh",hrEmail: "rahul.singh@wipro.com",hrPhone: "9876543712",
            designation: "Software Engineer",package: "20 LPA",locations: "📍 Vizag",driveDate: "📅 2025-04-10",
            applyBefore: "📅 2025-04-2",eligibility: "B.Tech",cgpaRequirement: "7.5",responsibilities:"🚀 Client Handling, Meeting Deadlines",
            backlogs: "Max 2",selections: "Online Test -> Technical Round -> HR Interview",perks: "✅ Skill Development, Career Growth"
        },
        "tcs": {
            details: "TCS is one of the largest IT services and consulting companies globally, headquartered in India. It provides services in software development, IT consulting, cloud computing, AI, cybersecurity, and business solutions.",
            hrName: "Keshav",hrEmail: "Keshav@tcs.com",hrPhone: "8356543712",
            designation: "Web Developer",package: "16 LPA",locations: "📍 Banglore",driveDate: "📅 2025-04-16",
            applyBefore: "📅 2025-04-2",eligibility: "B.Tech",cgpaRequirement: "6.5",responsibilities:" 🚀 Timely Delivery & Quality Assurance",
            backlogs: "Max 1",selections: "Online Test -> Technical Round -> HR Interview",perks: "✅ Skill Development, Career Growth"
        },
        "google": {
            details: "Google is one of the most prestigious tech companies globally, known for its innovation in AI, cloud computing, search engine technology, and software development. It offers a dynamic work environment and excellent growth opportunities.",
            hrName: "Eshwar Prabhu",hrEmail: "Eshwarprabhu@google.com",hrPhone: "6890543788",
            designation: "Data Analyst",package: "11 LPA",locations: "📍 Mumbai",driveDate: "📅 2025-05-04",
            applyBefore: "📅 2025-05-2",eligibility: "B.Tech",cgpaRequirement: "8.0",responsibilities:"📊 Product Innovation, Data Analytics & Business Intelligence",
            backlogs: "0",selections: "Online Test -> Technical Round -> HR Interview",perks: " ✅ Global Career Opportunities "
        },
        "intel": {
            details: "Intel is a global leader in semiconductor manufacturing, computing innovation, and AI-driven solutions. It develops processors, chipsets, and advanced computing technologies for a wide range of applications, including AI, cloud computing, and IoT.",
            hrName: "Madhu Priya",hrEmail: "Madhupriya@intel.com",hrPhone: "9124873468",
            designation: "UI/UX Designer",package: "20 LPA",locations: "📍 Chennai",driveDate: "📅 2025-04-24",
            applyBefore: "📅 2025-04-1",eligibility: "B.Tech",cgpaRequirement: "8.0",responsibilities:"🔧 Manufacturing & Testing, 🌍 Collaboration & Teamwork",
            backlogs: "0",selections: "Online Test -> Technical Round -> HR Interview",perks: "🏠 Flexible Work Options "
        },
        "microsoft": {
            details:  "Microsoft is a global tech giant known for its software, cloud computing, AI, and hardware innovations. It develops products like Windows, Office, Azure, and Xbox, offering employees a dynamic work environment with cutting-edge technology.",
            hrName: "Indu Kathval",hrEmail: "Indukahval@microsoft.com",hrPhone: "7986255987",
            designation: "Financial Manager",package: "30 LPA",locations: "📍 Delhi",driveDate: "📅 2025-03-23",
            applyBefore: "📅 2025-02-14",eligibility: "B.Tech, M.Tech",cgpaRequirement: "9.0",responsibilities:"🔧 Product & Software Testing, 🎨 UI/UX & Product Design",
            backlogs: "Max 3",selections: "Online Test -> Technical Round -> HR Interview",perks: "🍽️ Free Meals & Snacks "
        },
        "ibm": {
            details:"IBM (International Business Machines) is a global technology leader specializing in cloud computing, AI, quantum computing, and enterprise solutions. It provides innovative products and services in IT consulting, cybersecurity, and data analytics.",
            hrName: "Krunal",hrEmail: "krunal@ibm.com",hrPhone: "7747567493",
            designation: "Software Developer",package: "30 LPA",locations: "📍 Pune",driveDate: "📅 2025-04-08",
            applyBefore: "📅 2025-04-01",eligibility: "B.Tech, M.Tech",cgpaRequirement: "7.0",responsibilities:"🌍 Collaboration & Client Consultation",
            backlogs: "Max 1",selections: "Online Test -> Technical Round -> HR Interview",perks: "📚 Learning & Career Growth , 🚗 Transport & Travel Allowances"
        },
        "adobe": {
            details:"Adobe is a global leader in creative software, digital experiences, and cloud solutions. Known for products like Photoshop, Illustrator, Premiere Pro, and Adobe Cloud, the company focuses on innovation in AI, design, and digital media.",
            hrName: "Raghav krishna",hrEmail: "raghavkrishna@adobe.com",hrPhone: "8923022002",
            designation: "Application Developer",package: "30 LPA",locations: "📍 Hyderabad",driveDate: "📅 2025-03-26",
            applyBefore: "📅 2025-03-22",eligibility: "B.Tech",cgpaRequirement: "7.0",responsibilities:"🔧 Product Testing & Performance Optimization",
            backlogs: "Max 1",selections: "Online Test -> Technical Round -> HR Interview",perks: "🏖️ Paid Time Off & Parental Leave"
        },
        "qualcomm": {
            details:"Qualcomm is a global leader in semiconductor, wireless technology, and 5G innovations. The company specializes in chipsets, AI, IoT, and mobile computing, powering smartphones, automotive, and next-gen communication systems.",
            hrName: "Supraj",hrEmail: "supraj@qualcomm.com",hrPhone: "8567930234",
            designation: "Devops Engineer",package: "10 LPA",locations: "📍 Ahmedabad",driveDate: "📅 2025-04-16",
            applyBefore: "📅 2025-04-03",eligibility: "B.Tech",cgpaRequirement: "8.6",responsibilities:"📡 5G & Wireless Technology Development",
            backlogs: "Max 2",selections: "Online Test -> Technical Round -> HR Interview",perks: "🎯 Career Growth & Internal Mobility, 🚗 Commuting & Transport Benefits "
        },
        "oracle": {
            details:"Oracle is a global leader in cloud computing, database management, and enterprise software solutions. It specializes in AI, machine learning, cybersecurity, and SaaS applications, helping businesses worldwide.",
            hrName: "Teja Kumar",hrEmail: "tejakumar@oracle.com",hrPhone: "8000356893",
            designation: "Cloud Engineer",package: "22 LPA",locations: "📍 Noida",driveDate: "📅 2025-03-16",
            applyBefore: "📅 2025-02-30",eligibility: "B.Tech",cgpaRequirement: "8.6",responsibilities:"💾 Software Development & ERP Systems ",
            backlogs: "Max 2",selections: "Online Test -> Technical Round -> HR Interview",perks: "💰 Competitive Salary & Stock Options, 💻 State-of-the-Art Technology  "
        }
    };

    const getCompanyLogo = (companyName) => {
        if (!companyName) {
            return "/logos/default.jpeg";
        }
        return companyLogos[companyName.toLowerCase()] || "/logos/default.png";
    };

    const handleViewDetails = (job) => {
        const details = jobDetailsData[job.companyName.toLowerCase()] || {};
        setSelectedJob({ ...job, ...details });
    };

    const closePopup = () => {
        setSelectedJob(null);
    };

    return (
        <div className="container4">
            <aside className="sidebar4">
                <h1>Placement Portal</h1>
                <nav>
                    <Link to="/main">Home</Link>
                    <Link to="/applyjobs">Jobs</Link>
                    <Link to="/applied-jobs" className="active4">Applied Jobs</Link>
                    <Link to="/statistics">My Statistics</Link>

                    <Link to="/" onClick={() => localStorage.removeItem("studentId")}>Log Out</Link>
                </nav>
            </aside>

            <main className="main-content4">
                <h1>Applied Jobs</h1>
                <div className="applied-jobs-container4">
                    {appliedJobs.length === 0 ? (
                        <p>No jobs applied yet.</p>
                    ) : (
                        appliedJobs.map((job, index) => (
                            <div key={index} className="applied-job-card4">
                                <div className="job-details4">
                                    <h2>{job.jobTitle}</h2>
                                    <p><strong>Company:</strong> {job.companyName}</p>
                                    <div className="button-group4">
                                        <a href={`http://localhost:5000${job.resume}`} target="_blank" rel="noopener noreferrer">
                                            <button>View Resume</button>
                                        </a>
                                        <button onClick={() => handleViewDetails(job)}>View Details</button>
                                    </div>
                                </div>
                                <img 
                                    src={getCompanyLogo(job?.companyName || "default")} 
                                    alt={`${job?.companyName || "Company"} Logo`} 
                                    className="company-logo4" 
                                    onError={(e) => e.target.src = "/logos/default.jpeg"} 
                                />
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Popup Box */}
            {selectedJob && (
    <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closePopup}>&times;</span>

            {/* Header Section: Image + HR Details */}
            <div className="popup-header">
                {/* Left Side - Company Logo */}
                <img 
                    src={getCompanyLogo(selectedJob.companyName)} 
                    alt="Company Logo" 
                    className="popup-company-logo"
                />

                {/* Right Side - Company & HR Details */}
                <div className="popup-right">
                    <h2>{selectedJob.companyName}</h2>
                    <p><strong>HR Name:</strong> {selectedJob.hrName}</p>
                    <p><strong>Email:</strong> {selectedJob.hrEmail}</p>
                    <p><strong>Phone:</strong> {selectedJob.hrPhone}</p>
                </div>
            </div>

            {/* Job Description Section */}
            <div className="job-description">
                <p><strong>Details:</strong> {selectedJob.details}</p>
                <p><strong>Designation:</strong> {selectedJob.designation}</p>
                <p><strong>Package:</strong> {selectedJob.package}</p>
                <p><strong>Job Locations:</strong> {selectedJob.locations}</p>
                <p><strong>Drive Date:</strong> {selectedJob.driveDate}</p>
                <p><strong>Apply Before:</strong> {selectedJob.applyBefore}</p>
                <p><strong>CGPA Requirement:</strong> {selectedJob.cgpaRequirement}</p>
                <p><strong>Backlogs Allowed:</strong> {selectedJob.backlogs}</p>
                <p><strong>Selection Process:</strong> {selectedJob.selections}</p>
                <p><strong>Responsibilities:</strong>{selectedJob.responsibilities}</p>
                <p><strong>Perks & Benefits:</strong> {selectedJob.perks || "Not specified"}</p>
            </div>
        </div>
    </div>
)}






        </div>
    );
};

export default AppliedPage;
