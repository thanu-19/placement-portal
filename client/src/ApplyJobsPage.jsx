
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ApplyJobsPage.css";
import Swal from 'sweetalert2';
const backendURL = import.meta.env.VITE_BACKEND_URL;
const ApplyJobsPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();
    const studentId = localStorage.getItem("studentId");

    const jobs = [
        { id: 1, title: "Web Developer", company: "TCS", location: "Bangalore", image: "/web.avif" },
        { id: 2, title: "Data Analyst", company: "Google", location: "Mumbai", image: "/data.jpg" },
        { id: 3, title: "UI/UX Designer", company: "Intel", location: "Chennai", image: "/uiux.avif" },
        { id: 4, title: "Marketing Manager", company: "Infosys", location: "Kolkata", image: "/manager.jpeg" },
        { id: 5, title: "Financial Manager", company: "Microsoft", location: "Delhi", image: "/finance.jpeg" },
        { id: 6, title: "Software Engineer", company: "Wipro", location: "Vizag", image: "/software.jpeg" },
        { id: 7, title: "Front End Developer", company: "Accenture", location: "Kerala", image: "/front.jpeg" },
        { id: 8, title: "Software Developer", company: "IBM", location: "Pune", image: "/soft.jpeg" },
        { id: 9, title: "Application Developer", company: "Adobe", location: "Hyderabad", image: "/application.jpeg" },
        { id: 10, title: "Data Scientist", company: "HCL", location: "Indore", image: "/data.jpeg" },
        { id: 11, title: "Devops Engineer", company: "Qualcomm", location: "Ahmedabad", image: "/devops.jpeg" },
        { id: 12, title: "Cloud Engineer", company: "Oracle", location: "Noida", image: "/cloud.jpeg" }
    ];

    const openPopup = (job) => {
        setSelectedJob(job);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedJob(null);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            Swal.fire({
                icon: "warning",
                title: "Missing Resume",
                text: "Please upload a resume before submitting.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("studentId", studentId);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("personalEmail", personalEmail);
        formData.append("phone", phone);
        formData.append("jobTitle", selectedJob?.title);
        formData.append("companyName", selectedJob?.company);
        formData.append("branch", branch);
        formData.append("resume", selectedFile);

        try {
            const response = await axios.post(`${backendURL}/api/apply-job`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                icon: "success",
                title: "Application Submitted",
                text: "Your application has been submitted successfully!",
            });
            closePopup();
        } catch (error) {
            console.error("Error submitting application:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Failed to submit application. Please try again later.",
            });
        }
    };

    return (
        <div className="container2">
            <aside className="sidebar2">
                <h1>Placement Portal</h1>
                <nav>
                    <Link to="/main">Home</Link>
                    <Link to="/applyjobs" className="active">Jobs</Link>
                    <Link to="/applied-jobs">Applied Jobs</Link>
                    <Link to="/statistics">My Statistics</Link>

                    <Link to="/" onClick={() => localStorage.removeItem("studentId")}>Log Out</Link>
                </nav>
            </aside>

            <main className="main-content2">
                <h1>Available Jobs</h1>
                {jobs.map((job) => (
                    <div className="job-card2" key={job.id}>
                        <img src={job.image} alt="Job Image" />
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <button className="apply-btn2" onClick={() => openPopup(job)}>Apply Now</button>
                    </div>
                ))}
            </main>

            {showPopup && selectedJob && (
                <div className="popup-overlay2">
                    <div className="popup-box2">
                        <button className="close-btn2" onClick={closePopup}>X</button>
                        <h2>Application Form</h2>
                        <p>Applying for: <strong>{selectedJob.title}</strong> at <strong>{selectedJob.company}</strong></p>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                            <label>College Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label>Personal Email:</label>
                            <input type="email" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} required />

                            <label>Phone Number:</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                            <label>Branch:</label>
                            <div className="branch-options2">
                                <label><input type="radio" name="branch" value="CSE" onChange={(e) => setBranch(e.target.value)} required /> CSE</label>
                                <label><input type="radio" name="branch" value="ECE" onChange={(e) => setBranch(e.target.value)} required /> ECE</label>
                                <label><input type="radio" name="branch" value="EEE" onChange={(e) => setBranch(e.target.value)} required /> EEE</label>
                                <label><input type="radio" name="branch" value="MME" onChange={(e) => setBranch(e.target.value)} required /> MME</label>
                                <label><input type="radio" name="branch" value="CE" onChange={(e) => setBranch(e.target.value)} required /> CE</label>
                                <label><input type="radio" name="branch" value="CH" onChange={(e) => setBranch(e.target.value)} required /> CH</label>
                                <label><input type="radio" name="branch" value="Mechanical" onChange={(e) => setBranch(e.target.value)} required /> Mechanical</label>
                            </div>

                            <label>Upload Resume:</label>
                            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} required />

                            <button type="submit" className="submit-btn2">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplyJobsPage;






