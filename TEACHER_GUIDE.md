# Project Teacher's Guide: Student DBMS

This document explains the technical architecture and database design of the project to help you present it effectively.

## 🏛 Software Architecture
This project follows a **Full-Stack MERN-style architecture** (replacing MongoDB with MySQL):
- **Frontend**: React.js (Component-based UI)
- **Backend API**: Node.js & Express (RESTful routes)
- **Database**: MySQL (Relational Data Storage)

## 🗄 Database Design (The "Heart" of the Project)
The project is built on **Rational Database Management System (RDBMS)** principles.

### 1. Schema Structure
We have three linked tables, which you can show in `backend/config/schema.sql`:
- **`students`**: The parent table. (id, name, roll_number).
- **`attendance`**: Linked via `student_id` (Foreign Key). Uses an `ENUM` for 'Present/Absent'.
- **`grades`**: Linked via `student_id` (Foreign Key). Includes a `CHECK` constraint on marks (0-100).

### 2. Key SQL Concepts Demonstrated
When explaining the code, point to these files in the `backend/queries/` folder:
- **`INSERT` Operations**: Used in all "Add" forms (Students, Attendance, Grades).
- **`SELECT` Operations**: Used to list records.
- **`JOINS`**: Used in `attendanceQueries.js` and `gradeQueries.js` to fetch student names along with their records.
- **`AGGREGATIONS`**: Used in `Reports.jsx` (via `getReports` controller):
  - `AVG(marks)`: To calculate performance.
  - `COUNT(*)`: To count total students/days.
  - `GROUP BY student_id`: To aggregate data per student.

## 🚀 Technical Highlights for Your Presentation
- **Data Integrity**: Using Foreign Keys with `ON DELETE CASCADE` ensures that if a student is removed, their attendance and grades are also automatically cleaned up.
- **Raw SQL**: Unlike many modern apps that use "ORM" tools, this project uses **Raw SQL**, proving your ability to write and optimize database queries manually.
- **Responsive UI**: Built with Tailwind CSS to ensure it looks professional on both laptops and tablets.

## 🛠 How to explain the DB storage?
If your teacher asks "Where is the data stored?":
> "The data is stored in a **MySQL Server instance**. The backend connects to it using a **Connection Pool** defined in `backend/config/db.js`, which manages database connections efficiently for multiple users."
