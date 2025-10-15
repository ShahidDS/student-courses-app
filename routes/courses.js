import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("enrolled_students");
    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// GET course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolled_students"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// POST create new course
router.post("/", async (req, res) => {
  try {
    const { name, code, credits, capacity } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ code });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        error: "Course with this code already exists",
      });
    }

    const course = new Course({
      name,
      code,
      credits,
      capacity: capacity || 30,
    });

    const newCourse = await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

// POST create multiple sample courses
router.post("/samples", async (req, res) => {
  try {
    const sampleCourses = [
      { name: "Web Development", code: "WD101", credits: 3, capacity: 25 },
      { name: "Database Systems", code: "DS201", credits: 4, capacity: 30 },
      { name: "Software Engineering", code: "SE301", credits: 3, capacity: 20 },
    ];

    const courses = await Course.insertMany(sampleCourses);

    res.status(201).json({
      success: true,
      message: "Sample courses created successfully",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error: " + error.message,
    });
  }
});

export default router;
