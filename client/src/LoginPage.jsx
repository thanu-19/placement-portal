import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/"); // Navigates to the homepage
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  
  const validateLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
        let response, data;

        if (idNumber === "adminuser@gmail.com") {
            // 🔹 Admin Login
            response = await fetch(`${backendURL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: idNumber, password }),
            });
        } else {
            // 🔹 Student Login
            response = await fetch(`${backendURL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId: idNumber, password }),
            });
        }

        data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
            if (idNumber === "adminuser@gmail.com") {
                // ✅ Redirect Admin
                navigate("/admin-dashboard");
            } else {
                // ✅ Store studentId & Redirect Student
                if (data.student && data.student.studentId) {
                    localStorage.setItem("studentId", data.student.studentId);
                    navigate("/main");
                } else {
                    setErrorMessage("Login successful, but student ID not found.");
                }
            }
        } else {
            setErrorMessage(data.message || "Invalid credentials");
        }
    } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Error connecting to the server.");
    }
};



  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar">
          <img src="images.jpeg" alt="User Avatar" />
        </div>
        <form onSubmit={validateLogin}>
          <div className="input-group">
            <label htmlFor="idNumber">
              <img src="email-icon.png" alt="" /> ID Number
            </label>
            <input
              type="text"
              id="idNumber"
              placeholder="Enter ID (e.g., R200XXX)"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <img src="lock-icon.png" alt="" /> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="checkbox-container">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePassword}
          />
          <label htmlFor="showPassword">Show Password</label>
          </div>

          <p className="error">{errorMessage}</p>
          <button type="submit" style={{backgroundColor: "orange"}}>LOGIN</button>
          <p
            className="back-home"
            onClick={goToHome}
            style={{
              marginTop: "15px",
              color: "#007bff",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            ← Back to home page
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
