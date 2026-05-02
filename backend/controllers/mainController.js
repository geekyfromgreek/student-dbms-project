const pool = require('../config/db');
const studentQueries = require('../queries/studentQueries');
const attendanceQueries = require('../queries/attendanceQueries');
const gradeQueries = require('../queries/gradeQueries');

/**
 * Main Controller
 * Handles business logic and database interactions for the application.
 */

// --- Student Controllers ---

// Fetch all students (Read)
exports.getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(studentQueries.getAllStudents);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new student (Create)
exports.addStudent = async (req, res) => {
  const { name, roll_number } = req.body;
  try {
    const [result] = await pool.query(studentQueries.addStudent, [name, roll_number]);
    res.status(201).json({ id: result.insertId, name, roll_number });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student details (Update)
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, roll_number } = req.body;
  try {
    await pool.query(studentQueries.updateStudent, [name, roll_number, id]);
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student (Delete)
// Note: Foreign Key constraints will automatically delete related attendance/grades
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(studentQueries.deleteStudent, [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Attendance Controllers ---

// Mark daily attendance
exports.markAttendance = async (req, res) => {
  const { student_id, date, status } = req.body;
  try {
    const [result] = await pool.query(attendanceQueries.markAttendance, [student_id, date, status]);
    res.status(201).json({ id: result.insertId, student_id, date, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing attendance record
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { status, date } = req.body;
  try {
    await pool.query(attendanceQueries.updateAttendance, [status, date, id]);
    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(attendanceQueries.deleteAttendance, [id]);
    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a detailed attendance report with student names
exports.getAttendance = async (req, res) => {
  try {
    const [rows] = await pool.query(attendanceQueries.getAttendanceReport);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Grade Controllers ---

// Add marks for a subject
exports.addGrade = async (req, res) => {
  const { student_id, subject, marks } = req.body;
  try {
    const [result] = await pool.query(gradeQueries.addGrade, [student_id, subject, marks]);
    res.status(201).json({ id: result.insertId, student_id, subject, marks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch grades with student names
exports.getGrades = async (req, res) => {
  try {
    const [rows] = await pool.query(gradeQueries.getGradesWithNames);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update marks or subject
exports.updateGrade = async (req, res) => {
  const { id } = req.params;
  const { subject, marks } = req.body;
  try {
    await pool.query(gradeQueries.updateGrade, [subject, marks, id]);
    res.json({ message: 'Grade updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a grade record
exports.deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(gradeQueries.deleteGrade, [id]);
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get list of unique subjects (to populate selection dropdowns)
exports.getSubjects = async (req, res) => {
  try {
    const [rows] = await pool.query(gradeQueries.getDistinctSubjects);
    res.json(rows.map(row => row.subject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Report Controllers ---

// Fetch a combined report (Attendance % + Performance)
exports.getReports = async (req, res) => {
  try {
    // 1. Get attendance percentages (Aggregated query)
    const [attendance] = await pool.query(attendanceQueries.getAttendancePercentage);
    
    // 2. Get average marks and subject count (Aggregated query)
    const [grades] = await pool.query(gradeQueries.getPerformanceSummary);
    
    // 3. Merge both data sets on Student ID
    const merged = attendance.map(att => {
      const grade = grades.find(g => g.id === att.id);
      return {
        ...att,
        avg_marks: grade ? (grade.avg_marks || 0) : 0,
        subjects_count: grade ? (grade.subjects_count || 0) : 0
      };
    });
    
    res.json(merged);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- AI Query Controller ---

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const PREDEFINED_QUERIES = {
  'show all students': 'SELECT * FROM students',
  'students absent on 2026-04-14': 'SELECT s.name, s.roll_number, a.date, a.status FROM students s JOIN attendance a ON s.id = a.student_id WHERE a.status = "Absent" AND a.date = "2026-04-14"',
  'average marks per subject': 'SELECT subject, ROUND(AVG(marks), 2) as average_marks FROM grades GROUP BY subject',
  'top 3 students by marks in dbms': 'SELECT s.name, g.subject, g.marks FROM students s JOIN grades g ON s.id = g.student_id WHERE g.subject = "DBMS" ORDER BY g.marks DESC LIMIT 3',
  'who is the top student': 'SELECT s.name, SUM(g.marks) as total_marks FROM students s JOIN grades g ON s.id = g.student_id GROUP BY s.id ORDER BY total_marks DESC LIMIT 1',
  'show me the grading list': 'SELECT s.name, g.subject, g.marks FROM students s JOIN grades g ON s.id = g.student_id ORDER BY s.name',
  'attendance summary': 'SELECT s.name, COUNT(a.id) as total_classes, SUM(CASE WHEN a.status = "Present" THEN 1 ELSE 0 END) as attended FROM students s LEFT JOIN attendance a ON s.id = a.student_id GROUP BY s.id'
};

const DB_SCHEMA_CONTEXT = `
You are a MySQL query generator. You MUST respond with ONLY a valid MySQL query — no explanations, no markdown, no code fences.

The database "student_dbms" has these tables:

TABLE: students
  - id INT AUTO_INCREMENT PRIMARY KEY
  - name VARCHAR(100) NOT NULL
  - roll_number VARCHAR(20) NOT NULL UNIQUE
  - created_at TIMESTAMP

TABLE: attendance
  - id INT AUTO_INCREMENT PRIMARY KEY
  - student_id INT NOT NULL (FK → students.id, ON DELETE CASCADE)
  - date DATE NOT NULL
  - status ENUM('Present', 'Absent') NOT NULL DEFAULT 'Present'
  - created_at TIMESTAMP

TABLE: grades
  - id INT AUTO_INCREMENT PRIMARY KEY
  - student_id INT NOT NULL (FK → students.id, ON DELETE CASCADE)
  - subject VARCHAR(100) NOT NULL
  - marks INT NOT NULL (0–100)
  - created_at TIMESTAMP

RULES:
- Only generate SELECT queries. Never generate INSERT, UPDATE, DELETE, DROP, ALTER, or any data-modifying queries.
- Always use proper JOINs when data from multiple tables is needed.
- Return ONLY the raw SQL query string, nothing else.
`;

exports.aiQuery = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Please enter a question or SQL query." });
  }

  const normalizedPrompt = prompt.trim().toLowerCase();
  let sql = '';

  try {
    // 1. Check if it's a predefined prompt
    if (PREDEFINED_QUERIES[normalizedPrompt]) {
      sql = PREDEFINED_QUERIES[normalizedPrompt];
    } 
    // 2. Check if it's already raw SQL (basic check)
    else if (normalizedPrompt.startsWith('select ') || normalizedPrompt.startsWith('show ') || normalizedPrompt.startsWith('describe ')) {
      sql = prompt.trim();
    }
    // 3. Fallback to Gemini AI if available
    else if (genAI) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(DB_SCHEMA_CONTEXT + "\n\nUser question: " + prompt);
      const response = await result.response;
      sql = response.text().trim();
      // Clean up markdown
      sql = sql.replace(/```sql\s*/gi, '').replace(/```\s*/g, '').trim();
    } else {
      return res.status(400).json({ 
        error: "AI API key not configured and prompt didn't match a recommended query. Please provide an API key or type a direct SQL query." 
      });
    }

    // Safety: block any non-SELECT queries
    const firstWord = sql.split(/\s+/)[0].toUpperCase();
    if (!['SELECT', 'SHOW', 'DESCRIBE', 'EXPLAIN'].includes(firstWord)) {
      return res.status(400).json({ 
        error: "Only read queries (SELECT) are allowed for safety.",
        sql 
      });
    }

    // Execute the SQL
    const [rows] = await pool.query(sql);
    res.json({ sql, results: Array.isArray(rows) ? rows : [rows] });

  } catch (error) {
    res.status(500).json({ error: error.message, sql: sql || null });
  }
};

