const gradeQueries = {
  addGrade: 'INSERT INTO grades (student_id, subject, marks) VALUES (?, ?, ?)',
  getGradesWithNames: `
    SELECT g.id, s.name, s.roll_number, g.subject, g.marks 
    FROM grades g 
    JOIN students s ON g.student_id = s.id 
    ORDER BY g.id DESC
  `,
  getPerformanceSummary: `
    SELECT s.id, s.name, s.roll_number,
    AVG(g.marks) as avg_marks,
    COUNT(g.id) as subjects_count
    FROM students s
    LEFT JOIN grades g ON s.id = g.student_id
    GROUP BY s.id
  `
};

module.exports = gradeQueries;
