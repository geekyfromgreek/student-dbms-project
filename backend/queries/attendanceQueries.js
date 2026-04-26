/**
 * Attendance SQL Queries
 * Demonstrates relational data handling using JOINS and AGGREGATIONS.
 */
const attendanceQueries = {
  // Create: Record a new attendance entry
  markAttendance: 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
  
  // Read: Fetch attendance list with student names using a JOIN
  getAttendanceReport: `
    SELECT a.id, s.name, s.roll_number, a.date, a.status 
    FROM attendance a 
    JOIN students s ON a.student_id = s.id 
    ORDER BY a.date DESC
  `,
  
  // Read: Calculate attendance percentage using COUNT and SUM (Aggregation)
  getAttendancePercentage: `
    SELECT s.id, s.name, s.roll_number,
    COUNT(a.id) as total_days,
    SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as present_days,
    (SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.id)) as attendance_percentage
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id
    GROUP BY s.id
  `,
  
  // Update: Modify an attendance record
  updateAttendance: 'UPDATE attendance SET status = ?, date = ? WHERE id = ?',
  
  // Delete: Remove an attendance record
  deleteAttendance: 'DELETE FROM attendance WHERE id = ?'
};

module.exports = attendanceQueries;
