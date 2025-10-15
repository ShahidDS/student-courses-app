📋 Table of Contents
Features

Technologies

Project Structure

Setup & Installation

API Endpoints

Testing with Postman

Docker Setup

Contributing

✨ Features
Student Management: Create, read, update, and delete student records

Course Management: Full CRUD operations for courses

Enrollment System: Enroll students in courses with capacity checking

RESTful API: Clean and consistent API design

MongoDB Integration: Using Mongoose ODM for data modeling

Docker Support: Easy deployment with Docker and Docker Compose

Mongo Express: Web-based database administration

🛠 Technologies
Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Containerization: Docker, Docker Compose

API Testing: Postman, Insomnia

Development: Nodemon for hot reloading

📁 Project Structure
text
student-management-app/
├── models/
│ ├── Student.js # Student schema and model
│ └── Course.js # Course schema and model
├── routes/
│ ├── students.js # Student CRUD routes
│ └── courses.js # Course CRUD routes (provided)
├── config/
│ └── database.js # MongoDB connection setup
├── .env # Environment variables
├── docker-compose.yml # Docker services configuration
├── mongo-init.js # Database initialization script
├── server.js # Express application entry point
└── package.json # Project dependencies and scripts
🚀 Setup & Installation
Prerequisites
Node.js (v14 or higher)

Docker and Docker Compose (optional)

MongoDB (if not using Docker)

Method 1: Using Docker (Recommended)
Clone the repository

bash
git clone <repository-url>
cd student-management-app
Set up environment variables

bash
cp .env.example .env

# Edit .env with your preferred values

Start the application with Docker

bash
docker-compose up -d
Access the services

API Server: http://localhost:3000

Mongo Express: http://localhost:8081

MongoDB: localhost:27017

Method 2: Local Development
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env

# Update MONGODB_URI to point to your MongoDB instance

Start MongoDB (if not using Docker)

bash

# Using MongoDB locally

mongod

# Or using Docker for MongoDB only

docker-compose up -d mongodb
Run the application

bash

# Development mode with auto-reload

npm run dev

# Production mode

npm start
📡 API Endpoints
Health Check
GET /api/health - Check API status

Course Management Endpoints
Get All Courses
GET /api/courses

Response: Returns all courses with enrolled students populated

Success Response (200):

json
{
"success": true,
"count": 2,
"data": [
{
"\_id": "507f1f77bcf86cd799439011",
"course_code": "CS101",
"title": "Introduction to Computer Science",
"description": "Fundamental concepts of computer science...",
"instructor": "Dr. Smith",
"credits": 3,
"department": "Computer Science",
"capacity": 30,
"enrolled_students": [],
"is_active": true,
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T10:30:00.000Z"
}
]
}
Get Course by ID
GET /api/courses/:id

Parameters: id - Course MongoDB ObjectId

Success Response (200): Returns single course with enrolled students

Error Response (404):

json
{
"success": false,
"error": "Course not found"
}
Create New Course
POST /api/courses

Body (application/json):

json
{
"course_code": "MATH201",
"title": "Calculus I",
"description": "Differential and integral calculus",
"instructor": "Dr. Johnson",
"credits": 4,
"department": "Mathematics",
"capacity": 25
}
Required Fields: course_code, title, description, instructor, credits, department

Success Response (201):

json
{
"success": true,
"message": "Course created successfully",
"data": {
"\_id": "507f1f77bcf86cd799439012",
"course_code": "MATH201",
"title": "Calculus I",
"...": "..."
}
}
Error Response (400): If course_code already exists

Update Course
PUT /api/courses/:id

Parameters: id - Course MongoDB ObjectId

Body: Partial or complete course data

Success Response (200): Returns updated course

Error Responses: 404 (not found), 400 (validation error)

Delete Course
DELETE /api/courses/:id

Parameters: id - Course MongoDB ObjectId

Success Response (200):

json
{
"success": true,
"message": "Course deleted successfully"
}
Student Management Endpoints
Get All Students
GET /api/students - Retrieve all students with their enrolled courses

Get Student by ID
GET /api/students/:id - Get specific student with course details

Create Student
POST /api/students

Body:

json
{
"student_id": "STU001",
"first_name": "John",
"last_name": "Doe",
"email": "john.doe@university.edu"
}
Update Student
PUT /api/students/:id - Update student information

Delete Student
DELETE /api/students/:id - Remove student (and cleanup enrollments)

Enroll Student in Course
POST /api/students/:studentId/enroll/:courseId - Enroll student in a course

🧪 Testing with Postman
Import Postman Collection
Open Postman

Click Import

Use the following collection structure:

json
{
"info": {
"name": "Student Management API",
"description": "API collection for testing student and course management",
"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
},
"item": [
{
"name": "Health Check",
"request": {
"method": "GET",
"header": [],
"url": "http://localhost:3000/api/health"
}
},
{
"name": "Courses",
"item": [
{
"name": "Get All Courses",
"request": {
"method": "GET",
"header": [],
"url": "http://localhost:3000/api/courses"
}
},
{
"name": "Create Course",
"request": {
"method": "POST",
"header": [
{
"key": "Content-Type",
"value": "application/json"
}
],
"body": {
"mode": "raw",
"raw": "{\n \"course_code\": \"CS101\",\n \"title\": \"Introduction to Computer Science\",\n \"description\": \"Fundamental concepts of computer science and programming\",\n \"instructor\": \"Dr. Smith\",\n \"credits\": 3,\n \"department\": \"Computer Science\",\n \"capacity\": 30\n}"
},
"url": "http://localhost:3000/api/courses"
}
},
{
"name": "Get Course by ID",
"request": {
"method": "GET",
"header": [],
"url": "http://localhost:3000/api/courses/{{course_id}}"
}
}
]
}
]
}
Test Data Examples
Sample Course Creation
json
{
"course_code": "PHY101",
"title": "Physics I",
"description": "Introduction to mechanics and thermodynamics",
"instructor": "Dr. Wilson",
"credits": 4,
"department": "Physics",
"capacity": 35
}
Sample Student Creation
json
{
"student_id": "STU002",
"first_name": "Alice",
"last_name": "Johnson",
"email": "alice.johnson@university.edu"
}
🐳 Docker Setup
Services Overview
Service Port Purpose Credentials
MongoDB 27017 Database admin/pass
Mongo Express 8081 Web UI admin/expresspass
Node.js App 3000 API Server -
Docker Commands
bash

# Start all services

docker-compose up -d

# View logs

docker-compose logs -f

# Stop services

docker-compose down

# Stop and remove volumes (reset data)

docker-compose down -v

# Rebuild images

docker-compose build --no-cache
Environment Variables
Create a .env file with:

env

# MongoDB Configuration

MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=pass
MONGO_DATABASE=student_management
MONGO_PORT=27017

# Application Configuration

NODE_ENV=development
PORT=3000

# Mongo Express

MONGO_EXPRESS_PORT=8081
MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=expresspass
🔧 Database Schema
Course Model
javascript
{
course_code: { type: String, required: true, unique: true },
title: { type: String, required: true },
description: { type: String, required: true },
instructor: { type: String, required: true },
credits: { type: Number, required: true, min: 1, max: 6 },
department: { type: String, required: true },
capacity: { type: Number, default: 30 },
enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
is_active: { type: Boolean, default: true }
}
Student Model
javascript
{
student_id: { type: String, required: true, unique: true },
first_name: { type: String, required: true },
last_name: { type: String, required: true },
email: { type: String, required: true, unique: true },
enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
enrollment_date: { type: Date, default: Date.now }
}
🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/new-feature

Commit changes: git commit -am 'Add new feature'

Push to the branch: git push origin feature/new-feature

Submit a pull request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Troubleshooting
Common Issues
MongoDB Connection Error

Ensure MongoDB is running

Check credentials in .env file

Verify network connectivity

Port Already in Use

Change ports in .env file

Check for other running services

Docker Container Issues

Run docker-compose down -v and restart

Check Docker daemon is running
# student-courses-app
