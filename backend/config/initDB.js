const pool = require('./db');

/**
 * Raw SQL DDL statements to create all required tables.
 * These demonstrate CREATE TABLE, PRIMARY KEY, FOREIGN KEY, and constraints.
 */
const initDatabase = async () => {
  const connection = await pool.getConnection();
  try {
    console.log('⏳ Initializing database schema...');

    // Create `students` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        roll_number VARCHAR(20) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✔ Table `students` ready');

    // Create `attendance` table with FK to students
    await connection.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        date DATE NOT NULL,
        status ENUM('Present', 'Absent') NOT NULL DEFAULT 'Present',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      )
    `);
    console.log('   ✔ Table `attendance` ready');

    // Create `grades` table with FK to students
    await connection.query(`
      CREATE TABLE IF NOT EXISTS grades (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        subject VARCHAR(100) NOT NULL,
        marks INT NOT NULL CHECK (marks >= 0 AND marks <= 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      )
    `);
    console.log('   ✔ Table `grades` ready');

    console.log('✅ Database schema initialized successfully!\n');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = initDatabase;
