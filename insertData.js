// Simple bulk insert using your existing POST APIs
const API_BASE = "http://localhost:3000/api";

// Sample data - 20 courses
const courses = [
  { name: "Web Development", code: "WEB101", credits: 7.5 },
  { name: "Database Systems", code: "DB201", credits: 7.5 },
  { name: "JavaScript Programming", code: "JS301", credits: 15 },
  { name: "Mobile App Development", code: "MOB401", credits: 7.5 },
  { name: "Python Programming", code: "PY501", credits: 15 },
  { name: "Data Structures", code: "DS601", credits: 7.5 },
  { name: "Computer Networks", code: "CN701", credits: 7.5 },
  { name: "Software Engineering", code: "SE801", credits: 15 },
  { name: "Artificial Intelligence", code: "AI901", credits: 7.5 },
  { name: "Machine Learning", code: "ML1001", credits: 15 },
  { name: "Cloud Computing", code: "CC1101", credits: 7.5 },
  { name: "Cybersecurity", code: "CS1201", credits: 7.5 },
  { name: "UI/UX Design", code: "UX1301", credits: 7.5 },
  { name: "Project Management", code: "PM1401", credits: 7.5 },
  { name: "Business Analytics", code: "BA1501", credits: 7.5 },
  { name: "Internet of Things", code: "IoT1601", credits: 7.5 },
  { name: "Blockchain", code: "BC1701", credits: 7.5 },
  { name: "Game Development", code: "GD1801", credits: 15 },
  { name: "DevOps", code: "DO1901", credits: 7.5 },
  { name: "Big Data", code: "BD2001", credits: 15 },
];

// Sample data - 25 Swedish students
const students = [
  {
    student_id: "S1001",
    first_name: "Erik",
    last_name: "Andersson",
    email: "erik.andersson@email.com",
  },
  {
    student_id: "S1002",
    first_name: "Anna",
    last_name: "Johansson",
    email: "anna.johansson@email.com",
  },
  {
    student_id: "S1003",
    first_name: "Lars",
    last_name: "Karlsson",
    email: "lars.karlsson@email.com",
  },
  {
    student_id: "S1004",
    first_name: "Maria",
    last_name: "Nilsson",
    email: "maria.nilsson@email.com",
  },
  {
    student_id: "S1005",
    first_name: "Anders",
    last_name: "Eriksson",
    email: "anders.eriksson@email.com",
  },
  {
    student_id: "S1006",
    first_name: "Karin",
    last_name: "Larsson",
    email: "karin.larsson@email.com",
  },
  {
    student_id: "S1007",
    first_name: "Johan",
    last_name: "Olsson",
    email: "johan.olsson@email.com",
  },
  {
    student_id: "S1008",
    first_name: "Eva",
    last_name: "Persson",
    email: "eva.persson@email.com",
  },
  {
    student_id: "S1009",
    first_name: "Per",
    last_name: "Svensson",
    email: "per.svensson@email.com",
  },
  {
    student_id: "S1010",
    first_name: "Kristina",
    last_name: "Gustafsson",
    email: "kristina.gustafsson@email.com",
  },
  {
    student_id: "S1011",
    first_name: "Mikael",
    last_name: "Pettersson",
    email: "mikael.pettersson@email.com",
  },
  {
    student_id: "S1012",
    first_name: "Lena",
    last_name: "Jonsson",
    email: "lena.jonsson@email.com",
  },
  {
    student_id: "S1013",
    first_name: "Nils",
    last_name: "Jansson",
    email: "nils.jansson@email.com",
  },
  {
    student_id: "S1014",
    first_name: "Sara",
    last_name: "Hansson",
    email: "sara.hansson@email.com",
  },
  {
    student_id: "S1015",
    first_name: "Björn",
    last_name: "Bengtsson",
    email: "bjorn.bengtsson@email.com",
  },
  {
    student_id: "S1016",
    first_name: "Emma",
    last_name: "Jönsson",
    email: "emma.jonsson@email.com",
  },
  {
    student_id: "S1017",
    first_name: "Magnus",
    last_name: "Lindberg",
    email: "magnus.lindberg@email.com",
  },
  {
    student_id: "S1018",
    first_name: "Malin",
    last_name: "Lindström",
    email: "malin.lindstrom@email.com",
  },
  {
    student_id: "S1019",
    first_name: "Jenny",
    last_name: "Lindgren",
    email: "jenny.lindgren@email.com",
  },
  {
    student_id: "S1020",
    first_name: "Oscar",
    last_name: "Axelsson",
    email: "oscar.axelsson@email.com",
  },
  {
    student_id: "S1021",
    first_name: "William",
    last_name: "Berg",
    email: "william.berg@email.com",
  },
  {
    student_id: "S1022",
    first_name: "Lucas",
    last_name: "Bergström",
    email: "lucas.bergstrom@email.com",
  },
  {
    student_id: "S1023",
    first_name: "Alexander",
    last_name: "Lundberg",
    email: "alexander.lundberg@email.com",
  },
  {
    student_id: "S1024",
    first_name: "Emil",
    last_name: "Sjöberg",
    email: "emil.sjoberg@email.com",
  },
  {
    student_id: "S1025",
    first_name: "Elin",
    last_name: "Holm",
    email: "elin.holm@email.com",
  },
];

// Function to add one item
async function addItem(type, data) {
  try {
    const response = await fetch(`${API_BASE}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      console.log(
        `✅ ${type.slice(0, -1)} created: ${data.name || data.first_name}`
      );
      return result.data;
    } else {
      console.log(`❌ Failed: ${result.error}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

// Main function
async function bulkInsert() {
  console.log("🚀 Starting bulk insert...\n");

  // Insert courses
  console.log("📚 Adding 20 courses...");
  for (const course of courses) {
    await addItem("courses", course);
  }

  // Insert students
  console.log("\n👨‍🎓 Adding 25 students...");
  for (const student of students) {
    await addItem("students", student);
  }

  console.log("\n🎉 Bulk insert completed!");
  console.log("Visit: http://localhost:3000/api/students");
  console.log("Visit: http://localhost:3000/api/courses");
}

// Run the bulk insert
bulkInsert();
