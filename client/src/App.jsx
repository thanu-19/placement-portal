

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SearchJobPage from "./SearchJobPage";
import CompaniesPage from "./CompaniesPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import ContactPage from "./ContactPage";
import ApplyJobsPage from "./ApplyJobsPage";
import AppliedPage from "./AppliedPage";
import MyStatistics from "./MyStatistics";
import AdminDashboard from "./AdminDashboard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<SearchJobPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/applyjobs" element={<ApplyJobsPage />} />
                <Route path="/applied-jobs" element={<AppliedPage />} />
                <Route path="/statistics" element={<MyStatistics />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
