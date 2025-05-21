import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./MyStatistics.css";

const MyStatistics = () => {
    const [sgpa, setSgpa] = useState(() => {
        return JSON.parse(localStorage.getItem("sgpaData")) || ["", "", "", "", ""];
    });

    const [showGraph, setShowGraph] = useState(sgpa.some(value => value !== ""));

    useEffect(() => {
        localStorage.setItem("sgpaData", JSON.stringify(sgpa));
    }, [sgpa]);

    const handleInputChange = (index, value) => {
        // Allow only numbers and decimals
        if (!/^\d*\.?\d*$/.test(value)) return;
    
        // Convert input value to a number
        let numericValue = parseFloat(value);
    
        // Ensure the value does not exceed 10
        if (numericValue > 10) {
            numericValue = 10;
        }
    
        const newSgpa = [...sgpa];
        newSgpa[index] = isNaN(numericValue) ? "" : numericValue;
        setSgpa(newSgpa);
    };
    
    
    const generateGraph = () => {
        setShowGraph(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("studentId");
        localStorage.removeItem("sgpaData");
    };

    return (
        <div className="container4">
            <aside className="sidebar4">
                <h1>Placement Portal</h1>
                <nav>
                    <Link to="/main">Home</Link>
                    <Link to="/applyjobs">Jobs</Link>
                    <Link to="/applied-jobs">Applied Jobs</Link>
                    <Link to="/statistics" className="active4">My Statistics</Link>
                    <Link to="/" onClick={handleLogout}>Log Out</Link>
                </nav>
            </aside>

            <div className="statistics-container">
                <h2 className="stats-heading">My Statistics</h2>

                <div className="sgpa-inputs">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="sgpa-field">
                            <label>Semester {index + 1} SGPA:</label>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.01"
                                value={sgpa[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <button className="generate-btn" onClick={generateGraph}>
                    Generate Graph
                </button>

                {showGraph && (
                    <div className="graph-container">
                        <Line
                            data={{
                                labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
                                datasets: [
                                    {
                                        label: "SGPA Progress",
                                        data: sgpa.map(value => parseFloat(value) || 0),
                                        borderColor: "#ff8800",
                                        backgroundColor: "rgba(255, 136, 0, 0.3)",
                                        tension: 0.1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                            height={400} // Increased size
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyStatistics;
