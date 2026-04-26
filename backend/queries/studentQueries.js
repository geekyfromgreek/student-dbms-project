/**
 * Student SQL Queries
 * Demonstrates basic CRUD operations on a single table.
 */
const studentQueries = {
  // Read: Fetch all students sorted by most recent first
  getAllStudents: 'SELECT * FROM students ORDER BY id DESC',
  
  // Create: Insert a new student record
  addStudent: 'INSERT INTO students (name, roll_number) VALUES (?, ?)',
  
  // Read: Fetch a single student by their ID
  getStudentById: 'SELECT * FROM students WHERE id = ?',
  
  // Update: Modify an existing student's data
  updateStudent: 'UPDATE students SET name = ?, roll_number = ? WHERE id = ?',
  
  // Delete: Remove a student from the database
  deleteStudent: 'DELETE FROM students WHERE id = ?'
};

module.exports = studentQueries;
