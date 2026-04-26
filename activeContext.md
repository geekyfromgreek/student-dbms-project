# Active Context

## Current Project Prompt
Build a DBMS-focused "Student Attendance and Grade Management System" mini-project with a heavy focus on clear SQL queries and simple UI execution.

## Tech Stack Decisions
- **Frontend**: React, Tailwind CSS (via Vite)
- **Backend**: Node.js, Express
- **Database**: MySQL (using `mysql2/promise`)
- **Animations**: Premium CSS + React "Spotlight" system, interactive "Glass Magnifier" lens effects.

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
- Full CRUD for Students (INSERT, SELECT, UPDATE, DELETE)
- Attendance Management (INSERT, UPDATE, DELETE, JOIN reports)
- Advanced Grades (INSERT, UPDATE, DELETE, Subject Selection, "Add New Subject")
- Dynamic Reports (calculates Attendance %, Avg Marks using JOIN, AVG, COUNT, GROUP BY queries)
- **Teacher's Guide**: Includes a "Terminal Demonstration (Live SQL)" section for presentation.

## Database Design
1. `students` (id PK, name, roll_number UNIQUE)
2. `attendance` (id PK, student_id FK, date, status ENUM('Present', 'Absent'))
3. `grades` (id PK, student_id FK, subject, marks CHECK)

- **Next Step:** Assist user with final presentation prep or hosting setup.
- **Recent Update:** Cleaned up UI (streamlined "INSERT" buttons) and added `workflow.md` to simplify technical concepts for presentation.
