import express from "express";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("enrolled_courses");
    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// GET student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "enrolled_courses"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// POST create new student
router.post("/", async (req, res) => {
  try {
    const { student_id, first_name, last_name, email } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { student_id }],
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: "Student with this email or ID already exists",
      });
    }

    const student = new Student({
      student_id,
      first_name,
      last_name,
      email,
    });

    const newStudent = await student.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    // Remove student from courses
    await Course.updateMany(
      { enrolled_students: req.params.id },
      { $pull: { enrolled_students: req.params.id } }
    );

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// POST enroll student in course
router.post("/:studentId/enroll/:courseId", async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const [student, course] = await Promise.all([
      Student.findById(studentId),
      Course.findById(courseId),
    ]);

    if (!student || !course) {
      return res.status(404).json({
        success: false,
        error: "Student or course not found",
      });
    }

    // Check if already enrolled
    if (student.enrolled_courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        error: "Student already enrolled in this course",
      });
    }

    // Check course capacity
    if (course.enrolled_students.length >= course.capacity) {
      return res.status(400).json({
        success: false,
        error: "Course is full",
      });
    }

    // Update both student and course
    await Promise.all([
      Student.findByIdAndUpdate(studentId, {
        $push: { enrolled_courses: courseId },
      }),
      Course.findByIdAndUpdate(courseId, {
        $push: { enrolled_students: studentId },
      }),
    ]);

    res.json({
      success: true,
      message: "Student enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

export default router;
