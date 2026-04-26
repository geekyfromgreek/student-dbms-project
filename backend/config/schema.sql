-- =============================================
-- Student Attendance & Grade Management System
-- Database Schema for MySQL
-- =============================================

CREATE DATABASE IF NOT EXISTS student_dbms;
USE student_dbms;

-- =============================================
-- Table: students
-- Primary key: id (AUTO_INCREMENT)
-- =============================================
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Table: attendance
-- Foreign key: student_id -> students(id)
-- =============================================
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL DEFAULT 'Present',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- =============================================
-- Table: grades
-- Foreign key: student_id -> students(id)
-- =============================================
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks INT NOT NULL CHECK (marks >= 0 AND marks <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- =============================================
-- Seed Data (for demo purposes)
-- =============================================
INSERT INTO students (name, roll_number) VALUES
    ('Rahul Sharma', '101'),
    ('Priya Patel', '102'),
    ('Amit Kumar', '103'),
    ('Sneha Desai', '104'),
    ('Vikram Singh', '105');

INSERT INTO attendance (student_id, date, status) VALUES
    (1, '2026-04-14', 'Present'),
    (2, '2026-04-14', 'Present'),
    (3, '2026-04-14', 'Absent'),
    (4, '2026-04-14', 'Present'),
    (5, '2026-04-14', 'Absent'),
    (1, '2026-04-15', 'Present'),
    (2, '2026-04-15', 'Absent'),
    (3, '2026-04-15', 'Present'),
    (4, '2026-04-15', 'Present'),
    (5, '2026-04-15', 'Present');

INSERT INTO grades (student_id, subject, marks) VALUES
    (1, 'DBMS', 85),
    (1, 'OS', 78),
    (1, 'DSA', 92),
    (2, 'DBMS', 90),
    (2, 'OS', 88),
    (2, 'DSA', 76),
    (3, 'DBMS', 72),
    (3, 'OS', 65),
    (3, 'DSA', 80),
    (4, 'DBMS', 95),
    (4, 'OS', 91),
    (4, 'DSA', 88),
    (5, 'DBMS', 60),
    (5, 'OS', 55),
    (5, 'DSA', 70);
