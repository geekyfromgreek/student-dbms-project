const pool = require('../config/db');
const studentQueries = require('../queries/studentQueries');
const attendanceQueries = require('../queries/attendanceQueries');
const gradeQueries = require('../queries/gradeQueries');

// Student Controllers
exports.getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(studentQueries.getAllStudents);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  const { name, roll_number } = req.body;
  try {
    const [result] = await pool.query(studentQueries.addStudent, [name, roll_number]);
    res.status(201).json({ id: result.insertId, name, roll_number });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Attendance Controllers
exports.markAttendance = async (req, res) => {
  const { student_id, date, status } = req.body;
  try {
    const [result] = await pool.query(attendanceQueries.markAttendance, [student_id, date, status]);
    res.status(201).json({ id: result.insertId, student_id, date, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const [rows] = await pool.query(attendanceQueries.getAttendanceReport);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Grade Controllers
exports.addGrade = async (req, res) => {
  const { student_id, subject, marks } = req.body;
  try {
    const [result] = await pool.query(gradeQueries.addGrade, [student_id, subject, marks]);
    res.status(201).json({ id: result.insertId, student_id, subject, marks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGrades = async (req, res) => {
  try {
    const [rows] = await pool.query(gradeQueries.getGradesWithNames);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Report Controllers
exports.getReports = async (req, res) => {
  try {
    // Combine attendance and grade data for a comprehensive report
    const [attendance] = await pool.query(attendanceQueries.getAttendancePercentage);
    const [grades] = await pool.query(gradeQueries.getPerformanceSummary);
    
    // Merge data on student ID
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
