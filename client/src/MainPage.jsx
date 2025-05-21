import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // ✅ Track edit mode
    const navigate = useNavigate();

    useEffect(() => {
        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            console.error("No studentId found in localStorage!");
            navigate("/");
            return;
        }

        console.log("Fetching data for studentId:", studentId);

        fetch(`${backendURL}/api/user/${studentId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("User data:", data);
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [navigate]);

    // ✅ Handle input changes
    const handleInputChange = (e, field) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    // ✅ Handle edit/save toggle
    const toggleEdit = () => {
        if (isEditing) {
            // Save updated data to the backend (optional)
            fetch(`${backendURL}/api/user/update/${userData.studentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((data) => console.log("Updated Successfully:", data))
                .catch((err) => console.error("Update Error:", err));
        }
        setIsEditing(!isEditing); // Toggle editing mode
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="container1">
            <aside className="sidebar1">
                <h1>Placement Portal</h1>
                <nav>
                    <a href="#" className="active">Home</a>
                    <a href="/applyjobs">Jobs</a>
                    <a href="/applied-jobs">Applied Jobs</a>
                    <a href="/statistics">My Statistics</a>
                    <a href="/" onClick={() => localStorage.removeItem("studentId")}>Log Out</a>
                </nav>
            </aside>

            <main className="profile-section1">
                <div className="profile-container1">
                    <h2>My Profile</h2>
                    <img src="images.jpeg" alt="Profile" />
                    
                    <button id="edit-btn1" onClick={toggleEdit}>
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>

                    <div className="info1">
                        <p><strong>Name: </strong> 
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={userData.name} 
                                    onChange={(e) => handleInputChange(e, "name")}
                                />
                            ) : userData.name}
                        </p>
                        
                        <p><strong>Email ID: </strong> 
                            {isEditing ? (
                                <input 
                                    type="email" 
                                    value={userData.email} 
                                    onChange={(e) => handleInputChange(e, "email")}
                                />
                            ) : userData.email}
                        </p>
                        
                        <p><strong>Phone Number: </strong> 
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={userData.number} 
                                    onChange={(e) => handleInputChange(e, "number")}
                                />
                            ) : userData.number}
                        </p>
                        <p><strong>City: </strong> 
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={userData.city} 
                                    onChange={(e) => handleInputChange(e, "city")}
                                />
                            ) : userData.city}
                        </p>
                        <p><strong>Student ID: </strong> {userData.studentId}</p>
                        <p><strong>Branch: </strong> {userData.branch}</p>
                        <p><strong>Gender: </strong> {userData.gender}</p>
                        <p><strong>Course: </strong> {userData.course}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
