import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      default: 30,
    },
    enrolled_students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
