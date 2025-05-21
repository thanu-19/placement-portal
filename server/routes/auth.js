const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../models/student"); // Import the Student model

// Login Route
router.post("/login", async (req, res) => {
    try {
        console.log("Received login request:", req.body);

        const { studentId, password } = req.body; // ✅ Fixed key

        // Validate input
        if (!studentId || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find student by studentId (case-sensitive in MongoDB)
        const student = await Student.findOne({ studentId: studentId.trim() }); // ✅ Fixed field name

        if (!student) {
            console.log("Invalid ID - Not found in DB:", studentId);
            return res.status(400).json({ error: "Invalid ID" }); // ✅ Fixed response key
        }

        console.log("Student found in DB:", student);

        // Check password securely using bcrypt
        if (student.password !== password) {
            console.log("Incorrect password for:", studentId);
            return res.status(400).json({ error: "Invalid Password" });
        }
        
    
        res.status(200).json({ message: "Login successful", student });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
