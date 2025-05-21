

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./AdminDashboard.css";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = () => {
    const [applicants, setApplicants] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/admin/applicants`);
            setApplicants(response.data);
        } catch (err) {
            console.error("Error fetching applicants:", err);
        }
    };

    const sendEmail = async (email, subject, message) => {
        try {
            await axios.post(`${backendURL}/api/send-email`, { email, subject, message });
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };


    const updateStatus = async (applicationId, status, applicant) => {
        try {
            await axios.post(`${backendURL}/api/admin/update-status`, { applicationId, status: status.toUpperCase() });
    
            // Send Email based on status
            if (status === "accepted") {
                // Send detailed interview email with date/time
                await axios.post(`${backendURL}/api/send-interview-call`, {
                    name: applicant.name,
                    email: applicant.email,
                    jobTitle: applicant.jobTitle,
                    companyName: applicant.companyName,
                    date: "2025-04-10",  // 🔁 Replace with dynamic input later if needed
                    time: "10:00 AM"
                });
            } else {
                await axios.post(`${backendURL}/api/send-email`, {
                    email: applicant.email,
                    subject: "Application Declined",
                    message: `Dear ${applicant.name},\n\nWe regret to inform you that your application for ${applicant.jobTitle} at ${applicant.companyName} has been declined. Better luck next time!\n\nBest Regards,\nPlacement Team`
                });
            }
    
            fetchApplicants();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    
    return (
        <div>
            <h2 style={{ color: "#333", textAlign: "center" }}>Job Applications</h2>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Branch</th>
                            <th>Job Title</th>
                            <th>Company Name</th>
                            <th>Resume</th>
                            <th>Status</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant, index) => (
                            <tr key={index}>
                                <td>{applicant.studentId}</td>
                                <td>{applicant.name}</td>
                                <td>{applicant.email}</td>
                                <td>{applicant.phone}</td>
                                <td>{applicant.branch}</td>
                                <td>{applicant.jobTitle}</td>
                                <td>{applicant.companyName}</td>
                                <td>
                                    <a 
                                        className="view-link" 
                                        href={applicant.resume.startsWith("http") ? applicant.resume : `${backendURL}${applicant.resume}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                </td>

                                <td>
                                    {applicant.status === "pending" ? (
                                        <>
                                            <span 
                                                onClick={() => updateStatus(applicant._id, "accepted", applicant)}
                                                style={{ cursor: "pointer", fontSize: "20px", marginRight: "10px" }}
                                            >
                                                ✅
                                            </span>

                                            <span 
                                                onClick={() => updateStatus(applicant._id, "declined", applicant)}
                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                            >
                                                ❌
                                            </span>
                                        </>
                                    ) : (
                                        // <span style={{ fontSize: "16px", fontWeight: "bold", color: applicant.status === "accepted" ? "green" : "red" }}>
                                        //     {applicant.status.toUpperCase()}
                                        // </span>
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: applicant.status.toLowerCase() === "accepted" ? "green" : "red"
                                          }}
                                        >
                                          {applicant.status.toUpperCase()}
                                        </span>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Back to Login Button */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button 
                    onClick={() => navigate("/login")} 
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "orange",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                        width: "200px"
                    }}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
