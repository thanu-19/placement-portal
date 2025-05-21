const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// ✅ Define Student Schema
const Student = mongoose.model("students", new mongoose.Schema({
    studentId: String,
    password: String,
    name: String,
    email: String,
    number: String,
    branch: String,
    gender: String,
    course: String,
    city: String
}));

// ✅ Login Route (No Change)
app.post("/api/auth/login", async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(401).json({ message: "Student ID not found" });
        }

        if (student.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json({ message: "Login successful", student });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ New Route: Fetch User Data for MainPage.jsx
app.get("/api/user/:studentId", async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });

        if (!student) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(student);
    } catch (err) {
        console.error("Fetch User Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ Update Student Details
app.put("/api/user/update/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body; // Data to update (e.g., name, email, number, etc.)

        // Find the student and update details
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId },  // Find student by ID
            { $set: updateData },  // Update the fields
            { new: true }  // Return updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student details updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


// ✅ Define Applicants Schema
const Applicant = mongoose.model("applicants", new mongoose.Schema({
    studentId: String,
    name: String,
    email: String,
    personalEmail: String,
    phone: String,
    jobTitle: String,
    companyName: String,
    branch: String,
    resume: String, // Stores file path
    status: { type: String, default: "pending" }
}));

// ✅ Configure Multer for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    }
});

const upload = multer({ storage: storage });
app.post("/api/apply-job", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Resume file is required" });
        }

        const { studentId, name, email, personalEmail, phone, jobTitle, companyName, branch } = req.body;
        const resumePath = `/uploads/${req.file.filename}`;

        const newApplication = new Applicant({
            studentId,
            name,
            email,
            personalEmail,
            phone,
            jobTitle,
            companyName,
            branch,
            resume: resumePath
        });

        await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully!", resumePath });
    } catch (error) {
        console.error("Application Submission Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// ✅ Fetch Applied Jobs by Student ID
app.get("/api/applied-jobs/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const appliedJobs = await Applicant.find({ studentId });

        if (appliedJobs.length === 0) {
            return res.status(404).json({ message: "No applied jobs found" });
        }

        res.json(appliedJobs);
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Admin Login Route
app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if credentials match the admin user
    if (email === "adminuser@gmail.com" && password === "iamadmin") {
        return res.json({ message: "Admin login successful", isAdmin: true });
    } else {
        return res.status(401).json({ message: "Invalid admin credentials" });
    }
});



app.get("/api/admin/applicants", async (req, res) => {
    try {
        const applicants = await Applicant.find({});

        if (applicants.length === 0) {
            return res.status(404).json({ message: "No applicants found" });
        }

        res.json(applicants);
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const generateOfficialMessage = ({ studentName, jobTitle, companyName, date, time }) => `
<p>Dear ${studentName}, 👋</p>

<p>🎯 <b>Subject:</b> Interview Invitation for the Position of <b>${jobTitle}</b> at <b>${companyName}</b></p>

<p>
We are excited to inform you that you have been <b>shortlisted</b> for the recruitment process for the position of <b>${jobTitle}</b> at <b>${companyName}</b>, based on your application through the RGUKT R.K. Valley Placement Portal.
</p>

<hr>

<p><b>🏢 About the Company</b><br>
${companyName} is a reputed organization known for its excellence in innovation and commitment to professional growth. Being selected to appear for their recruitment process is an excellent opportunity to begin your professional journey.
</p>

<hr>

<p><b>📅 Interview Schedule</b><br>
<b>Company:</b> ${companyName}<br>
<b>Job Title:</b> ${jobTitle}<br>
<b>Date:</b> ${date}<br>
<b>Time:</b> ${time}<br>
<b>Venue:</b> RGUKT R.K. Valley – Main Placement Hall
</p>

<p>
📌 Please ensure your presence at least <b>30 minutes</b> before the scheduled time to complete the pre-interview formalities.
</p>

<hr>

<p><b>📝 Selection Process</b><br>
The selection process may consist of the following rounds:
<ol>
<li>🧠 Online/Written Aptitude Test</li>
<li>💻 Technical Interview</li>
<li>👥 HR/Managerial Interview</li>
</ol>

✅ Be prepared with:
<ul>
<li>📘 Core subject knowledge</li>
<li>🧩 Problem-solving and programming skills (if applicable)</li>
<li>🗣️ Communication and behavioral aspects</li>
</ul>
</p>

<hr>

<p><b>📂 Documents Required</b><br>
<ul>
<li>📄 Updated resume (2 copies)</li>
<li>🖼️ Passport-size photographs (2 copies)</li>
<li>🆔 Government-issued ID proof and college ID</li>
<li>🧾 Academic certificates (10th, 12th, UG mark sheets)</li>
</ul>
</p>

<hr>

<p><b>📌 General Instructions</b><br>
<ul>
<li>👔 Formal dress code is <b>mandatory</b></li>
<li>🕒 Maintain discipline and <b>punctuality</b></li>
<li>✍️ Bring your own stationery (pens, notepad, etc.)</li>
<li>🔕 Mobile phones must be kept <b>silent</b> during the interview process</li>
</ul>
</p>

<hr>

<p><b>📞 Need Help?</b><br>
📧 Email: placement@rguktrkv.ac.in<br>
📱 Phone: +91-98765-43210 (T&P Cell Coordinator)
</p>

<p>
🌟 We hope you make the most of this opportunity and represent our institution with <b>pride</b> and <b>professionalism</b>. Best wishes for your upcoming interview!
</p>

<p>
With best regards,<br>
<b>Training & Placement Cell</b><br>
<b>RGUKT R.K. Valley</b>
</p>
`;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thanu232005@gmail.com", // Your email
    pass: "bajq fleg znsb alqn",  // Your Google App Password
  },
});



app.post("/api/send-email", async (req, res) => {
    const { email, subject, message } = req.body;
  
    const mailOptions = {
      from: "thanu232005@gmail.com",
      to: email,
      subject: subject,
      text: message,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to: ${email}`);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  

  
app.post("/api/send-interview-call", async (req, res) => {
    const { name, email, jobTitle, companyName, date, time } = req.body;
  
    if (!email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    const htmlMessage = generateOfficialMessage({
      studentName: name,
      jobTitle,
      companyName,
      date,
      time,
    });
  
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: `Interview Invitation: ${jobTitle} at ${companyName}`,
      html: htmlMessage,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Interview call sent successfully" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send interview call email" });
    }
  });

  app.post("/api/admin/update-status", async (req, res) => {
    const { applicationId, status } = req.body;

    try {
        await Applicant.updateOne(
            { _id: applicationId },
            { $set: { status } }
        );
        res.status(200).send({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ error: "Failed to update status" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });




















