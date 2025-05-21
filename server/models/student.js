const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    gender: { type: String, required:true },
    branch: { type: String, required: true },
    course: { type: String, required: true },
    city: { type: String, required: true }
});

const Student = mongoose.model("students", studentSchema); // ✅ Match the collection name
module.exports = Student;
