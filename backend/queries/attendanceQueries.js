const attendanceQueries = {
  markAttendance: 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
  getAttendanceReport: `
    SELECT a.id, s.name, s.roll_number, a.date, a.status 
    FROM attendance a 
    JOIN students s ON a.student_id = s.id 
    ORDER BY a.date DESC
  `,
  getAttendancePercentage: `
    SELECT s.id, s.name, s.roll_number,
    COUNT(a.id) as total_days,
    SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as present_days,
    (SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.id)) as attendance_percentage
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id
    GROUP BY s.id
  `
};

module.exports = attendanceQueries;
