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
