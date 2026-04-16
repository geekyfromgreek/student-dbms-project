const studentQueries = {
  getAllStudents: 'SELECT * FROM students ORDER BY id DESC',
  addStudent: 'INSERT INTO students (name, roll_number) VALUES (?, ?)',
  getStudentById: 'SELECT * FROM students WHERE id = ?'
};

module.exports = studentQueries;
