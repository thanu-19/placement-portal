import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div style={styles.container}>
            {/* Navigation */}
            <header style={styles.headerone}>
            <h1 style={{color: "white"}}>Placement Portal</h1>
                 <nav>
                    <ul style={styles.navList}>
                        <li><Link to="/jobs" style={styles.navLink}>Jobs</Link></li>
                        <li><Link to="/companies" style={styles.navLink}>Companies</Link></li>
                        <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
                        <li><Link to="/login" style={{ ...styles.navLink, ...styles.loginBtn }}>Login</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <section style={styles.hero}>
                <h2 style={{color: "black"}}>Find Your Dream Job</h2>
                <p style={{marginBottom: "20px"}}>Connecting students with top recruiters and companies.</p>
                <button style={styles.hbutton}>Get Started</button>
            </section>

            {/* Features */}
            <section style={styles.features}>
                <div style={styles.featureBox}>
                    <h3>For Students</h3>
                    <p>Apply for jobs, internships, and training programs.</p>
                </div>
                <div style={styles.featureBox}>
                    <h3>For Companies</h3>
                    <p>Post job listings and hire top talents.</p>
                </div>
                <div style={styles.featureBox}>
                    <h3>Career Guidance</h3>
                    <p>Get resume tips and interview preparation advice.</p>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 Placement Portal. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4" },
    // header: { background: "#333",color: "white",padding: "10px",overflow: "visible"},
  
    // navList: { listStyle: "none", padding: 0, display: "flex", justifyContent: "center" },
    headerone: { 
        background: "#333", 
        color: "white", 
        padding: "20px 0",  // Increased padding for better visibility
        display: "flex", 
        flexDirection: "column",  // Stacks title & navigation
        alignItems: "center",      
        textAlign: "center",
        width: "100%",       // Ensures it stretches across the screen
        minHeight: "80px",  // Increases header height for better visibility
        position: "fixed",  
        top: "0",         
        left: "0",    
        marginBottom: "40px",
    },
    h1: {
        fontSize: "2.5rem",  // Makes the title larger
        margin: "0",         // Removes extra margin that might push it up
        padding: "5px 0", 
        overflow: "visible"    // Adds some spacing
    },
    navList: { 
        listStyle: "none", 
        padding: 0, 
        display: "flex", 
        justifyContent: "center",
        marginTop: "10px" 
    },
    navLink: { color: "white", textDecoration: "none", margin: "0 15px", fontSize: "16px"},
    loginBtn: { background: "orange", padding: "5px 10px", borderRadius: "5px" },
    hero: { marginTop: "160px",padding: "100px 20px", color: "black" },
    hbutton: { background: "#ff9800", color: "white", border: "none", padding: "10px 10px", fontSize: "1.2em", cursor: "pointer" ,width: "200px"},
    features: { display: "flex", justifyContent: "center", gap: "20px", padding: "40px" },
    featureBox: { background: "white", padding: "20px", width: "30%",height: "150px", boxShadow: "0px 0px 10px gray", display: "flex", flexdirection: "column" , justifyContent: "center", alignItems: "center"},
    footer: { background: "#333", color: "white", padding: "10px", position: "relative", bottom: 0, width: "100%" }
};

export default HomePage;







