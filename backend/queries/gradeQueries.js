/**
 * Grade SQL Queries
 * Demonstrates relational data handling and complex aggregations.
 */
const gradeQueries = {
  // Create: Insert student marks for a subject
  addGrade: 'INSERT INTO grades (student_id, subject, marks) VALUES (?, ?, ?)',
  
  // Read: Fetch all grades with student names using a JOIN
  getGradesWithNames: `
    SELECT g.id, s.name, s.roll_number, g.subject, g.marks 
    FROM grades g 
    JOIN students s ON g.student_id = s.id 
    ORDER BY g.id DESC
  `,
  
  // Read: Calculate performance summary using AVG and COUNT (Aggregation)
  getPerformanceSummary: `
    SELECT s.id, s.name, s.roll_number,
    AVG(g.marks) as avg_marks,
    COUNT(g.id) as subjects_count
    FROM students s
    LEFT JOIN grades g ON s.id = g.student_id
    GROUP BY s.id
  `,
  
  // Update: Modify a grade entry
  updateGrade: 'UPDATE grades SET subject = ?, marks = ? WHERE id = ?',
  
  // Delete: Remove a grade record
  deleteGrade: 'DELETE FROM grades WHERE id = ?',
  
  // Read: Get list of all distinct subjects recorded so far
  getDistinctSubjects: 'SELECT DISTINCT subject FROM grades ORDER BY subject ASC'
};

module.exports = gradeQueries;
