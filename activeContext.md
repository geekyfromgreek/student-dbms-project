# Active Context

## Current Project Prompt
Build a DBMS-focused "Student Attendance and Grade Management System" mini-project with a heavy focus on clear SQL queries and simple UI execution.

## Tech Stack Decisions
- **Frontend**: React, Tailwind CSS (via Vite)
- **Backend**: Node.js, Express
- **Database**: MySQL (using `mysql2/promise`)
- **Animations**: Minimal CSS

## Folder Structure
```text
student-dbms-project/
 ├── frontend/       (React, Vite, Tailwind)
     ├── src/components/
     ├── src/pages/
     └── src/utils/
 ├── backend/        (Node.js, queries)
     ├── config/     (db.js, initDB.js)
     ├── controllers/
     ├── queries/    (Raw SQLs separated logically)
     └── routes/
```

## Features Complete
- Add Students (INSERT/SELECT queries)
- Mark Attendance (INSERT, fetching reports using JOINs)
- Record Grades (INSERT/SELECT)
- View Dashboard / Reports (calculates Attendance %, Avg Marks using JOIN, AVG, COUNT, GROUP BY queries)

## Database Design
1. `students` (id PK, name, roll_number UNIQUE)
2. `attendance` (id PK, student_id FK, date, status ENUM('Present', 'Absent'))
3. `grades` (id PK, student_id FK, subject, marks CHECK)

## Current Status
- Project is feature-complete and locally committed.
- GitHub remote set to `https://github.com/geekyfromgreek/student-dbms-project.git`.
- **Next Step:** User push to GitHub and Render setup.
